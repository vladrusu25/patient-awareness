// src/routes/(website)/api/session/[token]/answer/+server.ts
import type { RequestHandler } from './$types';
import { supa } from '$lib/server/supabase';
import { json } from '@sveltejs/kit';
import { recomputeAndUpsertScores } from '$lib/server/scores';
import { createPatientForSession, attachPatientByPublicId } from '$lib/server/patients';

const STATUS_KEY = 'p0_patient_status';
const PATIENT_ID_KEY = 'p0_patient_id_entry';

export const POST: RequestHandler = async ({ params, request }) => {
  const token = params.token;
  const body = await request.json().catch(() => ({}));
  const { step_key, value } = body;

  if (!step_key) {
    return json({ error: 'Missing step_key' }, { status: 400 });
  }

  const { data: session, error: sErr } = await supa
    .from('sessions')
    .select('id, clinic_id, patient_id')
    .eq('public_token', token)
    .maybeSingle();

  if (sErr || !session) {
    return json({ error: 'Invalid token' }, { status: 404 });
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

  if (!/^[A-Z][0-9]{5}$/.test(normalized)) {
    return json({ ok: false, message: 'That ID doesn’t match the format A12345. Please check and try again.' }, { status: 400 });
  }

    const attached = await attachPatientByPublicId(
      session.id,
      session.clinic_id ?? null,
      session.patient_id ?? null,
      normalized
    );

    if (!attached) {
    return json({ ok: false, message: 'We couldn’t find that ID. Please check the letters and digits and try again.' }, { status: 404 });
  }

    valueToPersist = normalized;
    responsePayload.patientPublicId = attached.publicId;
    session.patient_id = attached.patientId;
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

