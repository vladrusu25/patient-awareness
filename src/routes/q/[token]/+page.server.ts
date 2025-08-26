import type { PageServerLoad } from './$types';
import { supa } from '$lib/server/supabase';

export const load: PageServerLoad = async ({ params }) => {
  const { token } = params;

  const { data: session } = await supa
    .from('sessions')
    .select('id, template_id')
    .eq('public_token', token)
    .maybeSingle();

  if (!session) return { notFound: true, token };

  const { data: tmpl } = await supa
    .from('questionnaire_templates')
    .select('steps_json')
    .eq('id', session.template_id)
    .maybeSingle();

  const { data: prev } = await supa
    .from('answers')
    .select('step_key, value_json')
    .eq('session_id', session.id)
    .order('created_at', { ascending: true });

  return {
    notFound: false,
    token,
    sessionId: session.id,
    steps: tmpl?.steps_json ?? { steps: [] },
    previous: prev ?? []
  };
};
