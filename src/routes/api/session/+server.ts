import type { RequestHandler } from './$types';
import { json, error } from '@sveltejs/kit';
import { supa } from '$lib/server/supabase';
import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('ABCDEFGHJKLMNPQRSTUVWXYZ23456789', 16);

// Creates a session with the latest questionnaire template.
// Sets an httpOnly cookie "pa_token" and returns { token }.
export const POST: RequestHandler = async ({ cookies }) => {
  // 1) pick latest template
  const { data: tmpl, error: tmplErr } = await supa
    .from('questionnaire_templates')
    .select('id')
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (tmplErr) throw error(500, 'Failed to load template');
  if (!tmpl) throw error(500, 'No questionnaire template configured');

  // 2) create session
  const token = nanoid();
  const { error: insertErr } = await supa
    .from('sessions')
    .insert({
      public_token: token,
      template_id: tmpl.id,
      country_code: 'PL',
      status: 'active'
    });

  if (insertErr) throw error(500, insertErr.message);

  // 3) set cookie so server load can pick it up
  cookies.set('pa_token', token, {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 
  });

  return json({ token });
};
