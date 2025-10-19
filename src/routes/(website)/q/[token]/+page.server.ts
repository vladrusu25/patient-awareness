import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { supa } from '$lib/server/supabase';

const TOKEN_RE = /^(?:[A-Z0-9]{10}|[A-Z0-9]{16})$/;

export const load: PageServerLoad = async ({ params, url }) => {
  const token = params.token?.trim().toUpperCase() ?? '';
  if (!TOKEN_RE.test(token)) {
    return { notFound: true, token, steps: { steps: [] }, previous: [], secret: null };
  }

  const secretParam = url.searchParams.get('s');
  const secret = secretParam && secretParam.trim().length ? secretParam.trim() : null;

  const { data: session, error: sessionErr } = await supa
    .from('sessions')
    .select('id, template_id, status, token_secret')
    .eq('public_token', token)
    .maybeSingle();

  if (sessionErr) {
    console.error('sessions query failed:', sessionErr);
    throw error(500, 'Failed to load session');
  }

  if (!session || (session.token_secret && session.token_secret !== secret)) {
    return { notFound: true, token, steps: { steps: [] }, previous: [], secret: null };
  }

  const { data: tmpl, error: tmplErr } = await supa
    .from('questionnaire_templates')
    .select('steps_json')
    .eq('id', session.template_id)
    .maybeSingle();

  if (tmplErr) {
    console.error('template query failed:', tmplErr);
    throw error(500, 'Failed to load questionnaire template');
  }

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
    secret,
    sessionId: session.id,
    steps: tmpl?.steps_json ?? { steps: [] },
    previous: prev ?? []
  };
};
