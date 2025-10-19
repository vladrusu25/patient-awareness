// src/routes/(website)/api/session/[token]/pdf/+server.ts
import type { RequestHandler } from './$types';
import { error, json } from '@sveltejs/kit';
import { buildAndUploadReport, fetchSessionByToken, streamReport } from '$lib/server/report.service';
import type { Language } from '$lib/i18n/types';

const TOKEN_RE = /^(?:[A-Z0-9]{10}|[A-Z0-9]{16})$/;

// GET => stream existing PDF inline (for preview)
export const GET: RequestHandler = async ({ params, url }) => {
  const token = params.token?.trim().toUpperCase() ?? '';
  if (!TOKEN_RE.test(token)) throw error(400, 'invalid_format');
  const secretParam = url.searchParams.get('s');
  const secret = secretParam && secretParam.trim().length ? secretParam.trim() : null;
  const session = await fetchSessionByToken(token, { secret });
  if (!session) throw error(404, 'not_found');

  const data = await streamReport(token);
  if (!data) throw error(404, 'not_found');

  return new Response(data, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename="patient-report-${token}.pdf"`,
      'Cache-Control': 'no-store'
    }
  });
};

// POST => generate, upload, return URLs (fast UX)
export const POST: RequestHandler = async ({ params, cookies, url }) => {
  const token = params.token?.trim().toUpperCase() ?? '';
  if (!TOKEN_RE.test(token)) throw error(400, 'invalid_format');
  const secretParam = url.searchParams.get('s');
  const secret = secretParam && secretParam.trim().length ? secretParam.trim() : null;
  const session = await fetchSessionByToken(token, { secret });
  if (!session) throw error(404, 'not_found');

  const langCookie = cookies.get('lang');
  const language: Language =
    langCookie === 'ru'
      ? 'ru'
      : langCookie === 'kz'
        ? 'kz'
        : langCookie === 'hr'
          ? 'hr'
          : langCookie === 'sk'
            ? 'sk'
            : 'en';

  const { downloadUrl } = await buildAndUploadReport(token, language, { secret });
  const viewUrl = secret
    ? `/api/session/${encodeURIComponent(token)}/pdf?s=${encodeURIComponent(secret)}`
    : `/api/session/${encodeURIComponent(token)}/pdf`;
  return json({
    ok: true,
    viewUrl,
    downloadUrl,
    ttlSeconds: 600
  });
};
