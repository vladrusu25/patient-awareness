// src/lib/server/auth.server.ts  (rename was Admin -> Auth; add role support)
import { supa } from '$lib/server/supabase';
import argon2 from 'argon2';
import { randomUUID } from 'node:crypto';
import type { Role, AuthUser } from '$lib/types/auth';

const SESSION_COOKIE = 'pa_session';
const SESSION_TTL_SEC = 60 * 60; // 1h

// --- Users (for now you will only call with role='admin')
export async function findUserByUsername(role: Role, username: string) {
  const table = role === 'admin' ? 'admin_users' : 'doctor_users'; // doctor table not created yet
  const { data } = await supa
    .from(table)
    .select('id, username, password_hash')
    .eq('username', username)
    .maybeSingle();
  // attach role in memory; storage remains per-table
  return data ? ({ ...data, role } as (AuthUser & { password_hash: string })) : null;
}

export async function verifyPassword(hash: string, plain: string) {
  try { return await argon2.verify(hash, plain); } catch { return false; }
}

// --- Sessions carry the role so hooks can gate by role later
export async function createSession(userId: string, role: Role) {
  const id = randomUUID();
  const expires_at = new Date(Date.now() + SESSION_TTL_SEC * 1000).toISOString();
  const { error } = await supa
    .from('admin_sessions')             // keep your existing table; later: unify/rename if desired
    .insert({ id, user_id: userId, role, expires_at }); // add 'role' column when you’re ready
  if (error) throw new Error(error.message);
  return { id, expires_at };
}

// Session lookup joins the right user table based on the stored role
export async function getSession(sessionId: string) {
  // Read session row (expects a 'role' column; until you add it, default 'admin')
  const { data: s } = await supa
    .from('admin_sessions')
    .select('id, user_id, role, expires_at')
    .eq('id', sessionId)
    .maybeSingle();
  if (!s) return null;
  if (new Date(s.expires_at).getTime() <= Date.now()) {
    await supa.from('admin_sessions').delete().eq('id', s.id);
    return null;
  }
  const role: Role = (s.role ?? 'admin') as Role;

  // Resolve the user from the proper table
  const table = role === 'admin' ? 'admin_users' : 'doctor_users';
  const { data: u } = await supa
    .from(table)
    .select('id, username')
    .eq('id', s.user_id)
    .maybeSingle();
  if (!u) return null;

  return { id: s.id, user: { ...u, role } as AuthUser };
}

export async function destroySession(sessionId: string) {
  await supa.from('admin_sessions').delete().eq('id', sessionId);
}

export function sessionCookieHeader(id: string) {
  return [
    `${SESSION_COOKIE}=${encodeURIComponent(id)}`,
    `Path=/`,
    `HttpOnly`,
    `SameSite=Lax`,
    `Secure`,
    `Max-Age=${SESSION_TTL_SEC}`
  ].join('; ');
}
export function clearSessionCookieHeader() {
  return [`pa_session=; Path=/; HttpOnly; SameSite=Lax; Secure; Max-Age=0`].join('; ');
}
export function readSessionCookie(cookies: { get: (k: string) => string | undefined }) {
  const v = cookies.get('pa_session');
  return v ? decodeURIComponent(v) : null;
}
