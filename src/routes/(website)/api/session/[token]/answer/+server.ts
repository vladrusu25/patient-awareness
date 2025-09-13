// src/routes/(website)/api/session/[token]/answer/+server.ts
import type { RequestHandler } from './$types';
import { supa } from '$lib/server/supabase';
import { json } from '@sveltejs/kit';
import { recomputeAndUpsertScores } from '$lib/server/scores';

export const POST: RequestHandler = async ({ params, request }) => {
  const token = params.token;
  const body = await request.json().catch(() => ({}));
  const { step_key, value } = body;

  if (!step_key) {
    return json({ error: 'Missing step_key' }, { status: 400 });
  }

  const { data: session, error: sErr } = await supa
    .from('sessions')
    .select('id')
    .eq('public_token', token)
    .maybeSingle();

  if (sErr || !session) {
    return json({ error: 'Invalid token' }, { status: 404 });
  }

  const { error } = await supa
    .from('answers')
    .upsert(
      [{ session_id: session.id, step_key, value_json: value ?? null }],
      { onConflict: 'session_id,step_key' }
    );

  if (error) {
    return json({ error: error.message }, { status: 500 });
  }

  // Recompute all derived scores safely with the new API
  try {
    await recomputeAndUpsertScores(session.id);
  } catch (e: any) {
    // Non-fatal for answering; log and continue
    console.error('score recompute failed:', e?.message ?? e);
  }

  return json({ ok: true });
};
