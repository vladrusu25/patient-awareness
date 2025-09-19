// src/lib/server/guard.server.ts
import { redirect, error } from '@sveltejs/kit';
import type { Role } from '$lib/types/auth';

export function requireRoleOrRedirect(locals: App.Locals, role: Role, to: string) {
  if (!locals.auth || locals.auth.user.role !== role) {
    throw redirect(302, to);
  }
  return locals.auth.user;
}

export function requireRole(locals: App.Locals, role: Role) {
  if (!locals.auth || locals.auth.user.role !== role) {
    throw error(403, 'Forbidden');
  }
  return locals.auth.user;
}
