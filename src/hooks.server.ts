// src/hooks.server.ts
import type { Handle } from '@sveltejs/kit';
import { getSession, readSessionCookie } from '$lib/server/auth.server';

const LOGIN_ROUTE_IDS = new Set([
  '/(website)/admin/login',
  '/(website)/doctor/login'
]);

function needsAuth(routeId: string | null) {
  if (!routeId) return false;
  if (routeId.startsWith('/(admin)')) return true;
  return LOGIN_ROUTE_IDS.has(routeId);
}

export const handle: Handle = async ({ event, resolve }) => {
  event.locals.auth = null;

  const sid = readSessionCookie(event.cookies);
  const routeId = event.route?.id ?? null;

  if (sid && needsAuth(routeId)) {
    const sess = await getSession(sid);
    if (sess?.user) {
      event.locals.auth = { user: sess.user };
    }
  }

  return resolve(event, {
    filterSerializedResponseHeaders: (name) => name === 'content-type'
  });
};
