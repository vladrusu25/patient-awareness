// src/routes/(website)/api/pdf-search/[token]/+server.ts
import type { RequestHandler } from './$types.js';
import { json } from '@sveltejs/kit';
import { supa } from '$lib/server/supabase';
import { enforceFixedWindow, hashIp } from '$lib/server/rateLimit.server';

const BUCKET = 'pdf-results';
const TOKEN_RE = /^(?:[A-Z0-9]{10}|[A-Z0-9]{16})$/;

export const GET: RequestHandler = async (event) => {
  const token = event.params.token?.trim().toUpperCase() ?? '';

  if (!TOKEN_RE.test(token)) {
    return json(
      {
        ok: false,
        code: 'invalid_format',
        message: 'Token must be 10 or 16 characters (A-Z, 0-9).'
      },
      { status: 400, headers: { 'Cache-Control': 'no-store' } }
    );
  }

  {
    const ip = event.getClientAddress?.() || '0.0.0.0';
    const key = `pdf-search:${hashIp(ip)}`;
    const rl = await enforceFixedWindow({ supa, key, max: 10, windowMs: 60_000 });
    if (!rl.ok) {
      return json(
        { ok: false, code: 'rate_limited', message: 'Too many attempts. Try again soon.' },
        { status: 429, headers: rl.headers ?? { 'Cache-Control': 'no-store' } }
      );
    }
  }

  const { data: sess } = await supa
    .from('sessions')
    .select('id, token_secret')
    .eq('public_token', token)
    .maybeSingle();

  if (!sess) {
    return json(
      { ok: false, code: 'not_found', message: 'Token does not exist.' },
      { status: 404, headers: { 'Cache-Control': 'no-store' } }
    );
  }

  const objectPath = `assessment-${token}.pdf`;
  const viewUrl = sess.token_secret
    ? `/api/session/${encodeURIComponent(token)}/pdf?s=${encodeURIComponent(sess.token_secret)}`
    : `/api/session/${encodeURIComponent(token)}/pdf`;

  const { data: dlSigned, error: signErr } = await supa
    .storage.from(BUCKET)
    .createSignedUrl(objectPath, 60 * 10, { download: `patient-report-${token}.pdf` });

  if (signErr || !dlSigned?.signedUrl) {
    return json(
      { ok: false, code: 'no_pdf', message: 'Report not available yet.' },
      { status: 404, headers: { 'Cache-Control': 'no-store' } }
    );
  }

  return json(
    { ok: true, code: 'ok', viewUrl, downloadUrl: dlSigned.signedUrl, ttlSeconds: 600 },
    { status: 200, headers: { 'Cache-Control': 'no-store' } }
  );
};
