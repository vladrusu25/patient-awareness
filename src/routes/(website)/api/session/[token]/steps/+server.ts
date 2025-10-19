// src/routes/(website)/api/session/[token]/steps/+server.ts
import type { RequestHandler } from './$types';
import { error, json } from '@sveltejs/kit';
import { supa } from '$lib/server/supabase';
import { composeSteps } from '$lib/assessment/composer';

const TOKEN_RE = /^(?:[A-Z0-9]{10}|[A-Z0-9]{16})$/;

export const GET: RequestHandler = async ({ params, url }) => {
  const token = params.token?.trim().toUpperCase() ?? '';
  if (!TOKEN_RE.test(token)) throw error(400, 'invalid_token');

  const secretParam = url.searchParams.get('s');
  const secret = secretParam && secretParam.trim().length ? secretParam.trim() : null;

  const { data: session } = await supa
    .from('sessions')
    .select('id, clinic_id, patient_id, token_secret')
    .eq('public_token', token)
    .maybeSingle();

  if (!session) throw error(404, 'Session not found');
  if (session.token_secret && session.token_secret !== secret) throw error(403, 'Forbidden');

  let patientPublicId: string | null = null;
  if (session.patient_id) {
    const { data: patient } = await supa
      .from('patients')
      .select('public_id')
      .eq('id', session.patient_id)
      .maybeSingle();
    patientPublicId = patient?.public_id ?? null;
  }

  const { data: rows } = await supa
    .from('answers')
    .select('step_key, value_json')
    .eq('session_id', session.id)
    .order('created_at', { ascending: true });

  const answers: Record<string, unknown> = {};
  for (const r of rows ?? []) answers[r.step_key] = r.value_json;

  const steps = composeSteps(answers, { patientPublicId });
  return json({ steps, answers });
};
