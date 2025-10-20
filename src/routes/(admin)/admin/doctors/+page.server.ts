import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { z } from 'zod';
import { requireRole } from '$lib/server/guard.server';
import {
  createDoctorUser,
  listDoctorUsers,
  type DoctorRegion
} from '$lib/server/doctor-users.server';

const CreateSchema = z.object({
  username: z.string().trim().min(3).max(64),
  password: z.string().min(8).max(256),
  region: z.enum(['en', 'ru', 'kz', 'hr', 'sk']),
  firstName: z
    .string()
    .optional()
    .transform((value) => (value && value.trim().length ? value.trim() : undefined)),
  lastName: z
    .string()
    .optional()
    .transform((value) => (value && value.trim().length ? value.trim() : undefined))
});

export const load: PageServerLoad = async (event) => {
  requireRole(event.locals, 'admin');

  const doctors = await listDoctorUsers();
  const createdCode = event.url.searchParams.get('created');

  return {
    doctors,
    origin: event.url.origin,
    createdCode
  };
};

export const actions: Actions = {
  create: async ({ locals, request, url }) => {
    requireRole(locals, 'admin');

    const formData = await request.formData();
    const parsed = CreateSchema.safeParse(Object.fromEntries(formData));

    if (!parsed.success) {
      return fail(400, { error: 'invalid_input' });
    }

    let doctor;
    try {
      doctor = await createDoctorUser(parsed.data as {
        username: string;
        password: string;
        region: DoctorRegion;
        firstName?: string;
        lastName?: string;
      });
    } catch (err: any) {
      const message: string = err?.message ?? 'create_failed';
      const code =
        message.includes('doctor_users_username_key') || message === 'duplicate_username'
          ? 'username_taken'
          : message.includes('invalid_region')
            ? 'invalid_input'
            : message.includes('unable_to_allocate_doctor_code') || message.includes('unable_to_allocate_link_secret')
              ? 'resource_exhausted'
              : 'create_failed';
      return fail(400, { error: code });
    }

    const redirectTarget = new URL(url);
    redirectTarget.searchParams.set('created', doctor.doctor_code);
    throw redirect(303, redirectTarget.pathname + redirectTarget.search);
  }
};
