// src/lib/server/auth.server.ts  (rename was Admin -> Auth; add role support)
import { supa } from '$lib/server/supabase';
import argon2 from 'argon2';
import { randomUUID } from 'node:crypto';
import type { Role, AuthUser } from '$lib/types/auth';

const SESSION_COOKIE = 'pa_session';
const SESSION_TTL_SEC = 60 * 60; // 1h

// --- Users
export async function findUserByUsername(role: Role, username: string) {
  const table = role === 'admin' ? 'admin_users' : 'doctor_users';
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

  if (role === 'admin') {
    const { error } = await supa.from('admin_sessions').insert({ id, user_id: userId, role, expires_at });
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supa.from('doctor_sessions').insert({ id, user_id: userId, expires_at });
    if (error) throw new Error(error.message);
  }

  return { id, expires_at };
}

function isExpired(expires_at: string) {
  return new Date(expires_at).getTime() <= Date.now();
}

export async function getSession(sessionId: string) {
  const { data: adminSession } = await supa
    .from('admin_sessions')
    .select('id, user_id, role, expires_at')
    .eq('id', sessionId)
    .maybeSingle();

  if (adminSession) {
    if (isExpired(adminSession.expires_at)) {
      await supa.from('admin_sessions').delete().eq('id', adminSession.id);
      return null;
    }

    const { data: adminUser } = await supa
      .from('admin_users')
      .select('id, username')
      .eq('id', adminSession.user_id)
      .maybeSingle();

    if (!adminUser) return null;

    const role: Role = (adminSession.role ?? 'admin') as Role;
    return { id: adminSession.id, user: { id: adminUser.id, username: adminUser.username, role } as AuthUser };
  }

  const { data: doctorSession } = await supa
    .from('doctor_sessions')
    .select('id, user_id, expires_at')
    .eq('id', sessionId)
    .maybeSingle();

  if (!doctorSession) return null;
  if (isExpired(doctorSession.expires_at)) {
    await supa.from('doctor_sessions').delete().eq('id', doctorSession.id);
    return null;
  }

  const { data: doctorUser } = await supa
    .from('doctor_users')
    .select('id, username, doctor_code, region, link_secret')
    .eq('id', doctorSession.user_id)
    .maybeSingle();

  if (!doctorUser) return null;

  const user: AuthUser = {
    id: doctorUser.id,
    username: doctorUser.username,
    role: 'doctor',
    doctorCode: doctorUser.doctor_code ?? undefined,
    region: doctorUser.region ?? undefined,
    linkSecret: doctorUser.link_secret ?? undefined
  };

  return { id: doctorSession.id, user };
}

export async function destroySession(sessionId: string) {
  await supa.from('admin_sessions').delete().eq('id', sessionId);
  await supa.from('doctor_sessions').delete().eq('id', sessionId);
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
