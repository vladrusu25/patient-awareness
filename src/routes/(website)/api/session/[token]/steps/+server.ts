// src/routes/api/session/[token]/steps/+server.ts
import type { RequestHandler } from './$types';
import { error, json } from '@sveltejs/kit';
import { supa } from '$lib/server/supabase';
import { composeSteps } from '$lib/assessment/composer';

export const GET: RequestHandler = async ({ params }) => {
  const token = params.token;
  if (!token) throw error(400, 'Missing token');

  const { data: session } = await supa
    .from('sessions')
    .select('id, created_at')
    .eq('public_token', token)
    .maybeSingle();

  if (!session) throw error(404, 'Session not found');

  const { data: rows } = await supa
    .from('answers')
    .select('step_key, value_json')
    .eq('session_id', session.id)
    .order('created_at', { ascending: true });

  const answers: Record<string, unknown> = {};
  for (const r of rows ?? []) answers[r.step_key] = r.value_json;

  const steps = composeSteps(answers);
  return json({ steps, answers });
};
