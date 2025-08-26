import type { RequestHandler } from './$types';
import { supa } from '$lib/server/supabase';

export const POST: RequestHandler = async ({ params, request }) => {
  const token = params.token;
  const body = await request.json().catch(() => ({}));
  const { step_key, value } = body;

  if (!step_key) {
    return new Response(JSON.stringify({ error: 'Missing step_key' }), { status: 400 });
  }

  // 1) find session by token
  const { data: session, error: sErr } = await supa
    .from('sessions')
    .select('id')
    .eq('public_token', token)
    .maybeSingle();

  if (sErr || !session) {
    return new Response(JSON.stringify({ error: 'Invalid token' }), { status: 404 });
  }

  // 2) upsert answer (so re-answering overwrites)
  const { error } = await supa
    .from('answers')
    .upsert(
      [{ session_id: session.id, step_key, value_json: value ?? null }],
      { onConflict: 'session_id,step_key' }
    );

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify({ ok: true }), {
    headers: { 'content-type': 'application/json' }
  });
};
