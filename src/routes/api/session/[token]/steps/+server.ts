import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { supa } from '$lib/server/supabase';

export const GET: RequestHandler = async ({ params }) => {
  const { token } = params;

  // Find template for the session
  const { data: sess, error: sErr } = await supa
    .from('sessions')
    .select('template_id')
    .eq('public_token', token)
    .maybeSingle();

  if (sErr || !sess) return json({ steps: [] });

  const { data: tmpl, error: tErr } = await supa
    .from('questionnaire_templates')
    .select('steps_json')
    .eq('id', sess.template_id)
    .maybeSingle();

  if (tErr || !tmpl?.steps_json || !Array.isArray(tmpl.steps_json)) {
    return json({ steps: [] });
  }

  return json({ steps: tmpl.steps_json });
};
