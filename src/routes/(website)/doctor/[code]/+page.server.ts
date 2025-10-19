import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { getDoctorShareInfo } from '$lib/server/doctor-users.server';

export const load: PageServerLoad = async ({ params, url }) => {
  const doctorCode = params.code?.trim().toUpperCase() ?? '';
  const secret = url.searchParams.get('k')?.trim() ?? '';

  if (!secret) {
    throw error(404, 'link_invalid');
  }

  const info = await getDoctorShareInfo(doctorCode, secret);
  if (!info) {
    throw error(404, 'link_invalid');
  }

  return {
    doctorCode: info.doctorCode,
    secret,
    region: info.region
  };
};
