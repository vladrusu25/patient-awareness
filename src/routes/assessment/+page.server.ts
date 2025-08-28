// /routes/assessment/+page.server.ts
import type { Actions, PageServerLoad } from './$types';
import { redirect, error } from '@sveltejs/kit';
import { supa } from '$lib/server/supabase';
import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('ABCDEFGHJKLMNPQRSTUVWXYZ23456789', 16);
const COOKIE = 'pa_session_token';

export const load: PageServerLoad = async ({ cookies }) => {
  // If there is a session cookie, the +page.svelte can show the chat UI
  const token = cookies.get(COOKIE) ?? null;
  return { token };
};

export const actions: Actions = {
  start: async ({ cookies }) => {
    // --- 1) Load the latest template (same behavior you had) ---
    const { data: tmpl, error: tmplErr } = await supa
      .from('questionnaire_templates')
      .select('id')
      // choose the "latest" – adjust to 'updated_at' if that's your canonical column
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (tmplErr) {
      console.error(tmplErr);
      throw error(500, 'Failed to load template');
    }
    if (!tmpl) throw error(500, 'No questionnaire template configured');

    // --- 2) Create a session with a public token ---
    const token = nanoid();
    const { error: insertErr } = await supa
      .from('sessions')
      .insert({
        public_token: token,
        template_id: tmpl.id,
        country_code: 'PL', // TODO: detect or pass from UI
        status: 'active'
      });

    if (insertErr) {
      console.error(insertErr);
      throw error(500, insertErr.message);
    }

    // --- 3) Store token in a cookie so /assessment can render the chat ---
    cookies.set(COOKIE, token, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 // 1 day
    });

    // --- 4) Land directly on the chat section ---
    throw redirect(303, '/assessment#chat');
  },

  // Optional: if you ever want to reset back to the intro card
  end: async ({ cookies }) => {
    cookies.delete(COOKIE, { path: '/' });
    throw redirect(303, '/assessment');
  }
};
