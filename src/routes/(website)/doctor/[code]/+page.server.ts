import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { getDoctorShareInfo } from '$lib/server/doctor-users.server';

const SUPPORTED_LANGS = new Set(['en', 'ru', 'kz', 'hr', 'sk']);

export const load: PageServerLoad = async ({ params, url, cookies }) => {
  const doctorCode = params.code?.trim().toUpperCase() ?? '';
  const secret = url.searchParams.get('k')?.trim() ?? '';

  if (!secret) {
    throw error(404, 'link_invalid');
  }

  const info = await getDoctorShareInfo(doctorCode, secret);
  if (!info) {
    throw error(404, 'link_invalid');
  }

  const doctorName =
    [info.firstName ?? '', info.lastName ?? ''].map((part) => part.trim()).filter(Boolean).join(' ') ||
    null;

  if (SUPPORTED_LANGS.has(info.region)) {
    cookies.set('lang', info.region, {
      path: '/',
      httpOnly: false,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 365
    });
  }

  return {
    doctorCode: info.doctorCode,
    secret,
    region: info.region,
    doctorName
  };
};
