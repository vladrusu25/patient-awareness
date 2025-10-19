// src/routes/(admin)/logout/+server.ts
import type { RequestHandler } from './$types.js';
import { clearSessionCookieHeader, readSessionCookie, destroySession, getSession } from '$lib/server/auth.server';

export const POST: RequestHandler = async ({ cookies }) => {
  const sid = readSessionCookie(cookies);
  let redirectTo = '/admin/login';

  if (sid) {
    const session = await getSession(sid);
    if (session?.user?.role === 'doctor') {
      redirectTo = '/doctor/login';
    }
    await destroySession(sid);
  }

  return new Response(null, {
    status: 303,
    headers: {
      'set-cookie': clearSessionCookieHeader(),
      location: redirectTo
    }
  });
};
