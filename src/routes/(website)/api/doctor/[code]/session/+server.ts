import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { z } from 'zod';
import { startDoctorSession } from '$lib/server/doctor-users.server';

const BodySchema = z.object({
  secret: z.string().trim().min(6).max(24),
  mode: z.enum(['new', 'returning']),
  patientId: z
    .string()
    .trim()
    .toUpperCase()
    .min(8)
    .max(8)
    .regex(/^[A-Z][0-9]{2}[A-Z]{2}[0-9]{3}$/)
    .optional()
});

export const POST: RequestHandler = async ({ params, request }) => {
  const doctorCode = params.code?.trim().toUpperCase() ?? '';
  if (!/^[A-Z][0-9]{2}$/.test(doctorCode)) {
    return json({ ok: false, error: 'invalid_doctor_code' }, { status: 400 });
  }

  const body = await request.json().catch(() => ({}));
  const parsed = BodySchema.safeParse(body);

  if (!parsed.success) {
    return json({ ok: false, error: 'invalid_payload' }, { status: 400 });
  }

  const payload = parsed.data;

  if (payload.mode === 'returning' && !payload.patientId) {
    return json({ ok: false, error: 'patient_id_required' }, { status: 400 });
  }

  try {
    const result = await startDoctorSession({
      doctorCode,
      linkSecret: payload.secret,
      mode: payload.mode,
      patientPublicId: payload.patientId
    });

    return json({ ok: true, ...result });
  } catch (err: any) {
    const message = err?.message ?? 'session_create_failed';
    const status =
      message === 'doctor_not_found' || message === 'invalid_secret' || message === 'patient_not_found'
        ? 403
        : message === 'assessment_limit_reached'
          ? 409
          : 400;
    return json({ ok: false, error: message }, { status });
  }
};
