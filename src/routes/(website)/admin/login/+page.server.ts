// src/routes/(website)/admin/login/+page.server.ts
import type { Actions, PageServerLoad } from './$types.js';
import { fail, redirect } from '@sveltejs/kit';
import { z } from 'zod';
import type { Role } from '$lib/types/auth';
import { supa } from '$lib/server/supabase';
import { findUserByUsername, createSession, verifyPassword } from '$lib/server/auth.server';
import { enforceFixedWindow, hashIp } from '$lib/server/rateLimit.server';

const ROLE: Role = 'admin';
const SESSION_COOKIE = 'pa_session';

export const load: PageServerLoad = async ({ locals }) => {
  if (locals.auth?.user?.role === ROLE) throw redirect(302, '/admin');
  return {};
};

const Schema = z.object({
  username: z.string().min(1).max(64),
  password: z.string().min(1).max(256)
});

export const actions: Actions = {
  default: async (event) => {
    const { request, getClientAddress, url, cookies } = event;

    const rl = await enforceFixedWindow({
      supa,
      key: `login:${ROLE}:${hashIp(getClientAddress?.() || '0.0.0.0')}`,
      max: 10,
      windowMs: 10 * 60_000
    });
    if (!rl.ok) return fail(429, { errorCode: 'auth.errors.rateLimit' });

    const formData = await request.formData();
    const parsed = Schema.safeParse(Object.fromEntries(formData));
    if (!parsed.success) return fail(400, { errorCode: 'auth.errors.invalidInput' });

    const username = parsed.data.username.trim().toLowerCase();
    const password = parsed.data.password;

    const user = await findUserByUsername(ROLE, username);
    if (!user) return fail(400, { errorCode: 'auth.errors.invalidCredentials' });

    const ok = await verifyPassword(user.password_hash, password);
    if (!ok) return fail(400, { errorCode: 'auth.errors.invalidCredentials' });

    const sess = await createSession(user.id, ROLE);

    cookies.set(SESSION_COOKIE, sess.id, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
      maxAge: 60 * 60
    });

    throw redirect(302, url.searchParams.get('next') ?? '/admin');
  }
};

