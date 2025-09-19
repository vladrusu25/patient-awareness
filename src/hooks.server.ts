// src/hooks.server.ts
import type { Handle } from '@sveltejs/kit';
import { getSession, readSessionCookie } from '$lib/server/auth.server';

export const handle: Handle = async ({ event, resolve }) => {
  event.locals.auth = null;

  const sid = readSessionCookie(event.cookies);
  if (sid) {
    const sess = await getSession(sid);
    if (sess?.user) {
      event.locals.auth = { user: sess.user };
    }
  }

  return resolve(event, {
    filterSerializedResponseHeaders: (name) => name === 'content-type'
  });
};
