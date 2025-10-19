import { json, type RequestHandler } from '@sveltejs/kit';
import type { Language } from '$lib/i18n/types';

const SUPPORTED = new Set<Language>(['en', 'ru', 'kz', 'hr', 'sk']);
const COOKIE_NAME = 'lang';
const ONE_YEAR = 60 * 60 * 24 * 365;

export const POST: RequestHandler = async ({ request, cookies }) => {
  let language: unknown;

  try {
    const data = await request.json();
    language = data?.language;
  } catch {
    return json({ error: 'Invalid payload' }, { status: 400 });
  }

  if (!SUPPORTED.has(language as Language)) {
    return json({ error: 'Unsupported language' }, { status: 400 });
  }

  cookies.set(COOKIE_NAME, language as Language, {
    path: '/',
    httpOnly: false,
    sameSite: 'lax',
    maxAge: ONE_YEAR
  });

  return json({ ok: true });
};
