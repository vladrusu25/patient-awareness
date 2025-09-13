// src/routes/api/session/[token]/pdf/+server.ts
import type { RequestHandler } from './$types';
import { error, json } from '@sveltejs/kit';
import { supa } from '$lib/server/supabase';

import {
  buildPart1Lines, buildPart2Lines, buildPart3Lines, hasAny
} from '$lib/assessment/summary';

import {
  computeEndopainGlobalScore, computePcsYesCount, computePvvqTotal
} from '$lib/assessment/scoring';

import { PCS_ITEMS, PVVQ_ORDER } from '$lib/assessment/labels';
import { renderSummaryPdf } from '$lib/pdf/report';

export const GET: RequestHandler = async ({ params }) => {
  const token = params.token;
  if (!token) throw error(400, 'Missing token');

  // load session
  const { data: session, error: sErr } = await supa
    .from('sessions')
    .select('id, created_at')
    .eq('public_token', token)
    .maybeSingle();
  if (sErr) throw error(500, sErr.message);
  if (!session) throw error(404, 'Session not found');

  // load answers
  const { data: rows, error: aErr } = await supa
    .from('answers')
    .select('step_key, value_json')
    .eq('session_id', session.id)
    .order('created_at', { ascending: true });
  if (aErr) throw error(500, aErr.message);

  const answers: Record<string, unknown> = {};
  for (const r of rows ?? []) answers[r.step_key] = r.value_json;

  // Build pages
  const pages: Array<{ title: string; lines: string[]; scoring?: string }> = [];

  // Part 1 always included
  const p1Lines = buildPart1Lines(answers);
  const p1Score = computeEndopainGlobalScore(answers);
  pages.push({
    title: 'Part 1. ENDOPAIN-4D',
    lines: p1Lines,
    scoring: `Physician scoring (ENDOPAIN-4D Global Score, 0–100): ${p1Score}/100`
  });

  // Part 2 only if any answers exist
  if (hasAny(answers, PCS_ITEMS.map(([k]) => k))) {
    const p2Lines = buildPart2Lines(answers);
    const p2Yes = computePcsYesCount(answers);
    pages.push({
      title: 'Part 2. PCS Screening (5 items)',
      lines: p2Lines,
      scoring: `Physician scoring (PCS positive if >=2 Yes): ${p2Yes} Yes`
    });
  }

  // Part 3 only if any answers exist
  if (hasAny(answers, PVVQ_ORDER)) {
    const p3Lines = buildPart3Lines(answers);
    const p3Total = computePvvqTotal(answers);
    pages.push({
      title: 'Part 3. Pelvic Varicose Veins Questionnaire (PVVQ, 20 items)',
      lines: p3Lines,
      scoring: `Physician scoring (PVVQ Total, 20–100): ${p3Total}`
    });
  }

  // Generate PDF (multi-page)
  const bytes = await renderSummaryPdf({
    token,
    generatedAt: new Date(session.created_at),
    pages
  });

  // Upload to Supabase Storage
  const objectPath = `assessment-${token}.pdf`;
  const { error: upErr } = await supa.storage
    .from('pdf-results')
    .upload(objectPath, new Uint8Array(bytes), {
      upsert: true,
      contentType: 'application/pdf',
      cacheControl: 'public, max-age=31536000, immutable'
    });
  if (upErr) throw error(500, upErr.message);

  // return the public URL as JSON (works for public buckets)
  const { data: pub } = supa.storage.from('pdf-results').getPublicUrl(objectPath);
  return json({ publicUrl: pub?.publicUrl ?? null });
};
