// src/routes/(admin)/+layout.server.ts
import type { LayoutServerLoad } from './$types.js';
import { requireRoleOrRedirect } from '$lib/server/guard.server';

export const load: LayoutServerLoad = async (event) => {
  const { locals, url } = event;

  requireRoleOrRedirect(
    locals,
    'admin',
    `/admin/login?next=${encodeURIComponent(url.pathname)}`
  );

  return { user: locals.auth!.user };
};
