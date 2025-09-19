// src/routes/(website)/api/pdf-search/[token]/+server.ts
import type { RequestHandler } from './$types.js';
import { json } from '@sveltejs/kit';
import { supa } from '$lib/server/supabase';
import { enforceFixedWindow, hashIp } from '$lib/server/rateLimit.server';

const BUCKET = 'pdf-results';
const TOKEN_RE = /^[A-Z0-9]{16}$/;

export const GET: RequestHandler = async (event) => {
  const token = event.params.token?.trim().toUpperCase() ?? '';

  // 1) format check (fast fail)
  if (!TOKEN_RE.test(token)) {
    return json(
      { ok: false, code: 'invalid_format', message: 'Token must be 16 characters [A–Z0–9].' },
      { status: 400, headers: { 'Cache-Control': 'no-store' } }
    );
  }

  // 2) RATE LIMIT per IP (10 req / min)
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

  // 3) verify session exists for this token
  const { data: sess } = await supa
    .from('sessions')
    .select('id')
    .eq('public_token', token)
    .single();

  if (!sess) {
    return json(
      { ok: false, code: 'not_found', message: 'Token does not exist.' },
      { status: 404, headers: { 'Cache-Control': 'no-store' } }
    );
  }

  // 4) signed download (and same-origin view route if you use it)
  const objectPath = `assessment-${token}.pdf`;

  // View (inline preview) served by /api/session/[token]/pdf (GET)
  const viewUrl = `/api/session/${encodeURIComponent(token)}/pdf`;

  // Download (signed)
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
// Note: this is a public endpoint; do NOT return sensitive info
// The token is a short-lived random value that only the user should know
// (it’s included in the PDF report URL and email they receive)