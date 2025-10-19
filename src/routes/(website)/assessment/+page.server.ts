import type { Actions, PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';
import { supa } from '$lib/server/supabase';
import { generateStandaloneToken } from '$lib/server/token.server';

export const load: PageServerLoad = async ({ cookies, url }) => {
  const secretParam = url.searchParams.get('s');
  const secret = secretParam && secretParam.trim().length ? secretParam.trim() : null;
  return { token: cookies.get('pa_token') ?? null, secret };
};

export const actions: Actions = {
  start: async ({ cookies }) => {
    const { data: tmpl, error: tmplErr } = await supa
      .from('questionnaire_templates')
      .select('id')
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (tmplErr) throw error(500, 'Failed to load template');
    if (!tmpl) throw error(500, 'No questionnaire template configured');

    const token = generateStandaloneToken();
    const { error: insErr } = await supa
      .from('sessions')
      .insert({
        public_token: token,
        template_id: tmpl.id,
        country_code: 'PL',
        status: 'active'
      });

    if (insErr) throw error(500, insErr.message);

    cookies.set('pa_token', token, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60
    });

    throw redirect(303, '/assessment#chat');
  }
};
