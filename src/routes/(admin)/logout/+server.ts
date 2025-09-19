// src/routes/(admin)/logout/+server.ts
import type { RequestHandler } from './$types.js';
import { clearSessionCookieHeader, readSessionCookie, destroySession } from '$lib/server/auth.server';

export const POST: RequestHandler = async ({ cookies }) => {
  const sid = readSessionCookie(cookies);
  if (sid) await destroySession(sid);

  return new Response(null, {
    status: 303,
    headers: {
      'set-cookie': clearSessionCookieHeader(),
      location: '/admin/login'
    }
  });
};
