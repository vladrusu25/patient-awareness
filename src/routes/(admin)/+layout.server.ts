// src/routes/(admin)/+layout.server.ts
import type { LayoutServerLoad } from './$types.js';
import { redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ locals, url }) => {
  const path = url.pathname;
  const user = locals.auth?.user;
  if (!user) {
    const login = path.startsWith('/doctor') ? '/doctor/login' : '/admin/login';
    throw redirect(302, `${login}?next=${encodeURIComponent(path)}`);
  }

  if (path.startsWith('/admin') && user.role !== 'admin') {
    throw redirect(302, `/admin/login?next=${encodeURIComponent(url.pathname)}`);
  }
  if (path.startsWith('/doctor') && user.role !== 'doctor' && user.role !== 'admin') {
    throw redirect(302, `/doctor/login?next=${encodeURIComponent(url.pathname)}`);
  }

  return { user };
};
