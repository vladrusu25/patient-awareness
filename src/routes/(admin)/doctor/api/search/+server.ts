import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { classifyQuery, doctorLookup, DoctorAccessError } from '$lib/services/doctor.server';

export const GET: RequestHandler = async ({ url, locals }) => {
  const user = locals.auth?.user;
  if (!user) {
    return json({ ok: false, code: 'unauthorized', message: 'Unauthorized' }, { status: 401 });
  }

  const raw = url.searchParams.get('q') ?? '';
  const query = raw.trim();

  if (!query) {
    return json(
      { ok: false, code: 'missing_query', message: 'Enter an assessment or patient ID.' },
      { status: 400, headers: { 'Cache-Control': 'no-store' } }
    );
  }

  const kind = classifyQuery(query);
  if (!kind) {
    return json(
      { ok: false, code: 'invalid_query', message: 'Use a 16-character assessment token or patient ID (e.g. A12345).' },
      { status: 400, headers: { 'Cache-Control': 'no-store' } }
    );
  }

  try {
    const doctorId = user.role === 'doctor' ? user.id : null;
    const result = await doctorLookup(query, { doctorId });
    if (!result) {
      return json(
        { ok: false, code: 'not_found', message: 'No results for that identifier.' },
        { status: 404, headers: { 'Cache-Control': 'no-store' } }
      );
    }

    return json(
      { ok: true, code: 'ok', kind: result.type, result },
      { status: 200, headers: { 'Cache-Control': 'no-store' } }
    );
  } catch (err) {
    if (err instanceof DoctorAccessError) {
      const code = err.resource === 'assessment' ? 'forbidden_assessment' : 'forbidden_patient';
      return json(
        { ok: false, code, message: err.message },
        { status: 403, headers: { 'Cache-Control': 'no-store' } }
      );
    }
    console.error('doctor lookup failed', err);
    return json(
      { ok: false, code: 'server_error', message: 'Unable to complete lookup.' },
      { status: 500, headers: { 'Cache-Control': 'no-store' } }
    );
  }
};
