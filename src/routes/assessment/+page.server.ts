import type { Actions, PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';
import { supa } from '$lib/server/supabase';
import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('ABCDEFGHJKLMNPQRSTUVWXYZ23456789', 16);

export const load: PageServerLoad = async ({ cookies }) => {
  return { token: cookies.get('pa_token') ?? null };
};

export const actions: Actions = {
  start: async ({ cookies }) => {
    // pick latest template
    const { data: tmpl, error: tmplErr } = await supa
      .from('questionnaire_templates')
      .select('id')
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (tmplErr) throw error(500, 'Failed to load template');
    if (!tmpl) throw error(500, 'No questionnaire template configured');

    // create session
    const token = nanoid();
    const { error: insErr } = await supa
      .from('sessions')
      .insert({
        public_token: token,
        template_id: tmpl.id,
        country_code: 'PL',
        status: 'active'
      });

    if (insErr) throw error(500, insErr.message);

    // store token so the page can render Chat
    cookies.set('pa_token', token, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 
    });

    // go straight to chat section on the same page
    throw redirect(303, '/assessment#chat');
  }
};
