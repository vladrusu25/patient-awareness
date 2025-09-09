import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { supa } from '$lib/server/supabase';

export const load: PageServerLoad = async ({ params }) => {
  const { token } = params;

  // 1) Find the session by public token
  const { data: session, error: sessionErr } = await supa
    .from('sessions')
    .select('id, template_id, status')
    .eq('public_token', token)
    .maybeSingle();

  if (sessionErr) {
    console.error('sessions query failed:', sessionErr);
    throw error(500, 'Failed to load session');
  }

  if (!session) {
    // Token not found – your +page.svelte can handle notFound === true
    return { notFound: true, token, steps: { steps: [] }, previous: [] };
  }

  // Optional: block inactive/closed sessions
  // if (session.status && session.status !== 'active') {
  //   return { notFound: true, token, steps: { steps: [] }, previous: [] };
  // }

  // 2) Get the template steps
  const { data: tmpl, error: tmplErr } = await supa
    .from('questionnaire_templates')
    .select('steps_json')
    .eq('id', session.template_id)
    .maybeSingle();

  if (tmplErr) {
    console.error('template query failed:', tmplErr);
    throw error(500, 'Failed to load questionnaire template');
  }

  // 3) Load previous answers in chronological order
  const { data: prev, error: ansErr } = await supa
    .from('answers')
    .select('step_key, value_json, created_at')
    .eq('session_id', session.id)
    .order('created_at', { ascending: true });

  if (ansErr) {
    console.error('answers query failed:', ansErr);
    throw error(500, 'Failed to load answers');
  }

  return {
    notFound: false,
    token,
    sessionId: session.id,
    steps: tmpl?.steps_json ?? { steps: [] },
    previous: prev ?? []
  };
};
