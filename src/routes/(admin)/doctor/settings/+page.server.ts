import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { requireRole } from '$lib/server/guard.server';
import { getDoctorById, updateDoctorRegion, type DoctorRegion } from '$lib/server/doctor-users.server';
import { z } from 'zod';
import { resolveSiteOrigin } from '$lib/config/site';

const UpdateSchema = z.object({
  region: z.enum(['en', 'ru', 'kz', 'hr', 'sk'])
});

export const load: PageServerLoad = async (event) => {
  requireRole(event.locals, 'doctor');

  const user = event.locals.auth?.user;
  if (!user) {
    throw redirect(303, '/doctor/login');
  }

  const record = await getDoctorById(user.id);
  if (!record) {
    throw redirect(303, '/doctor/login');
  }

  const updated = event.url.searchParams.get('updated') ?? null;

  return {
    region: record.region,
    updated,
    doctorCode: record.doctor_code,
    linkSecret: record.link_secret,
    shareOrigin: resolveSiteOrigin(event.url.origin)
  };
};

export const actions: Actions = {
  update: async ({ locals, request, url, cookies }) => {
    requireRole(locals, 'doctor');

    const user = locals.auth?.user;
    if (!user) {
      return fail(401, { error: 'unauthorized' });
    }

    const formData = await request.formData();
    const parsed = UpdateSchema.safeParse(Object.fromEntries(formData));
    if (!parsed.success) {
      return fail(400, { error: 'invalid_region' });
    }

    const region = parsed.data.region as DoctorRegion;
    try {
      await updateDoctorRegion(user.id, region);
      if (locals.auth?.user) {
        locals.auth.user = { ...locals.auth.user, region };
      }
    } catch (err) {
      console.error('Failed to update doctor region', err);
      return fail(500, { error: 'update_failed' });
    }

    cookies.set('lang', region, {
      path: '/',
      httpOnly: false,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 365
    });

    const target = new URL(url);
    target.searchParams.set('updated', region);
    throw redirect(303, target.toString());
  }
};
