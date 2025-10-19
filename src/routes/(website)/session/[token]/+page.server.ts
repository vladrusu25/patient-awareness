import type { PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';
import { fetchSessionByToken } from '$lib/server/report.service';

const TOKEN_RE = /^(?:[A-Z0-9]{10}|[A-Z0-9]{16})$/;
const SESSION_COOKIE = 'pa_token';

export const load: PageServerLoad = async ({ params, url, cookies }) => {
  const token = params.token?.trim().toUpperCase() ?? '';
  if (!TOKEN_RE.test(token)) throw error(400, 'invalid_token');

  const secretParam = url.searchParams.get('s');
  const secret = secretParam && secretParam.trim().length ? secretParam.trim() : null;

  const session = await fetchSessionByToken(token, { secret: secret ?? null });
  if (!session) throw error(404, 'session_not_found');

  cookies.set(SESSION_COOKIE, token, {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    secure: url.protocol === 'https:',
    maxAge: 60 * 60
  });

  const target = new URL('/assessment', url);
  if (secret) {
    target.searchParams.set('s', secret);
  }
  target.hash = 'chat';

  throw redirect(302, target.toString());
};
