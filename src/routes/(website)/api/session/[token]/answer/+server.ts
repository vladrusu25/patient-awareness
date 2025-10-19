// src/routes/(website)/api/session/[token]/answer/+server.ts
import type { RequestHandler } from './$types';
import { supa } from '$lib/server/supabase';
import { json } from '@sveltejs/kit';
import { recomputeAndUpsertScores } from '$lib/server/scores';
import { createPatientForSession, attachPatientByPublicId } from '$lib/server/patients';

const STATUS_KEY = 'p0_patient_status';
const PATIENT_ID_KEY = 'p0_patient_id_entry';
const TOKEN_RE = /^(?:[A-Z0-9]{10}|[A-Z0-9]{16})$/;
const LEGACY_PATIENT_RE = /^[A-Z][0-9]{5}$/;
const DOCTOR_PATIENT_RE = /^[A-Z][0-9]{2}[A-Z]{2}[0-9]{3}$/;

function buildDoctorToken(patientPublicId: string, counter: number): string {
  return `${patientPublicId}${counter.toString().padStart(2, '0')}`;
}

export const POST: RequestHandler = async ({ params, request, url }) => {
  const token = params.token?.trim().toUpperCase() ?? '';
  if (!TOKEN_RE.test(token)) {
    return json({ error: 'Invalid token' }, { status: 400 });
  }

  const secretParam = url.searchParams.get('s');
  const secret = secretParam && secretParam.trim().length ? secretParam.trim() : null;

  const body = await request.json().catch(() => ({}));
  const { step_key, value } = body;

  if (!step_key) {
    return json({ error: 'Missing step_key' }, { status: 400 });
  }

  const { data: session, error: sErr } = await supa
    .from('sessions')
    .select('id, clinic_id, patient_id, token_secret, doctor_user_id, token_counter')
    .eq('public_token', token)
    .maybeSingle();

  if (sErr || !session) {
    return json({ error: 'Invalid token' }, { status: 404 });
  }

  if (session.token_secret && session.token_secret !== secret) {
    return json({ error: 'Forbidden' }, { status: 403 });
  }

  let valueToPersist: unknown = value ?? null;
  const responsePayload: Record<string, unknown> = { ok: true };

  if (step_key === STATUS_KEY) {
    const normalized = String(value).toLowerCase() === 'returning' ? 'returning' : 'new';
    valueToPersist = normalized;

    if (normalized === 'new' && !session.patient_id) {
      try {
        const created = await createPatientForSession(session.id, session.clinic_id ?? null);
        responsePayload.patientPublicId = created.publicId;
        session.patient_id = created.patientId;
      } catch (err: any) {
        return json({ ok: false, message: err?.message ?? 'Could not create patient record' }, { status: 500 });
      }
    }
  }

  if (step_key === PATIENT_ID_KEY) {
    if (typeof value !== 'string') {
      return json({ ok: false, message: 'Patient ID must be a string.' }, { status: 400 });
    }

    const normalized = value.trim().toUpperCase().replace(/\s+/g, '');
    if (!normalized) {
      return json({ ok: false, message: 'Please enter your Customer ID.' }, { status: 400 });
    }

    if (!LEGACY_PATIENT_RE.test(normalized) && !DOCTOR_PATIENT_RE.test(normalized)) {
      return json(
        { ok: false, message: 'That ID format is not recognized. Please check and try again.' },
        { status: 400 }
      );
    }

    const attached = await attachPatientByPublicId(
      session.id,
      session.clinic_id ?? null,
      session.patient_id ?? null,
      normalized
    );

    if (!attached) {
      return json(
        { ok: false, message: "We couldn't find that ID. Please check the letters and digits and try again." },
        { status: 404 }
      );
    }

    valueToPersist = normalized;
    responsePayload.patientPublicId = attached.publicId;
    session.patient_id = attached.patientId;
    session.doctor_user_id = attached.doctorUserId ?? session.doctor_user_id ?? null;

    if (attached.doctorUserId) {
      try {
        const { count: existingCount, error: countErr } = await supa
          .from('sessions')
          .select('id', { count: 'exact', head: true })
          .eq('patient_id', attached.patientId)
          .eq('doctor_user_id', attached.doctorUserId)
          .neq('id', session.id);

        if (countErr) {
          console.error('failed to count existing sessions for patient', countErr.message ?? countErr);
        } else {
          const counter = (existingCount ?? 0) + 1;
          if (counter <= 99) {
            const desiredToken = buildDoctorToken(attached.publicId, counter);
            if (token !== desiredToken) {
              const { error: updateErr } = await supa
                .from('sessions')
                .update({ public_token: desiredToken, token_counter: counter })
                .eq('id', session.id);

              if (updateErr) {
                console.error('failed to align session token for doctor patient', updateErr.message ?? updateErr);
              } else {
                const redirectPath = `/session/${encodeURIComponent(desiredToken)}${
                  session.token_secret
                    ? `?s=${encodeURIComponent(session.token_secret as string)}`
                    : ''
                }`;
                responsePayload.redirectTo = redirectPath;
              }
            } else if ((session.token_counter ?? null) !== counter) {
              await supa.from('sessions').update({ token_counter: counter }).eq('id', session.id);
            }
          }
        }
      } catch (err: any) {
        console.error('doctor patient token sync failed', err?.message ?? err);
      }
    }
  }

  const { error } = await supa
    .from('answers')
    .upsert(
      [{ session_id: session.id, step_key, value_json: valueToPersist ?? null }],
      { onConflict: 'session_id,step_key' }
    );

  if (error) {
    return json({ error: error.message }, { status: 500 });
  }

  try {
    await recomputeAndUpsertScores(session.id);
  } catch (e: any) {
    console.error('score recompute failed:', e?.message ?? e);
  }

  return json(responsePayload);
};

