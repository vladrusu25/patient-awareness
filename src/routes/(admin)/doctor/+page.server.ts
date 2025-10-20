import type { PageServerLoad } from './$types';
import { getDoctorById } from '$lib/server/doctor-users.server';
import { resolveSiteOrigin } from '$lib/config/site';

export const load: PageServerLoad = async ({ locals, url }) => {
  const user = locals.auth?.user ?? null;
  let doctorProfile: {
    doctor_code: string;
    link_secret: string;
    region: string;
    first_name: string | null;
    last_name: string | null;
  } | null = null;

  if (user?.role === 'doctor') {
    const record = await getDoctorById(user.id);
    if (record) {
      doctorProfile = {
        doctor_code: record.doctor_code,
        link_secret: record.link_secret,
        region: record.region,
        first_name: record.first_name ?? null,
        last_name: record.last_name ?? null
      };
    }
  }

  return {
    doctorProfile,
    shareOrigin: resolveSiteOrigin(url.origin)
  };
};
