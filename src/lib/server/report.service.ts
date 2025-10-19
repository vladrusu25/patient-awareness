// src/lib/server/report.service.ts
import { supa } from '$lib/server/supabase';
import { buildPart1Lines, buildPart2Lines, buildPart3Lines, hasAny } from '$lib/assessment/summary';
import { computeEndopainGlobalScore, computePcsYesCount, computePvvqTotal } from '$lib/assessment/scoring';
import { PCS_ITEMS, PVVQ_ORDER } from '$lib/assessment/labels';
import { renderSummaryPdf } from '$lib/pdf/report';
import type { Language } from '$lib/i18n/types';
import { getReportLocale } from '$lib/assessment/report-i18n';

const BUCKET = 'pdf-results';

type SessionRow = {
  id: string;
  created_at: string;
  patient_id: string | null;
  status: string | null;
  token_secret: string | null;
  doctor_user_id: string | null;
};

export async function fetchSessionByToken(
  token: string,
  options: { secret?: string | null; bypassSecret?: boolean } = {}
) {
  const normalized = token.trim().toUpperCase();
  const { data, error } = await supa
    .from('sessions')
    .select('id, created_at, patient_id, status, token_secret, doctor_user_id')
    .eq('public_token', normalized)
    .maybeSingle();
  if (error || !data) return null;

  const session = data as SessionRow;

  if (!options.bypassSecret) {
    const expected = session.token_secret ?? null;
    const provided = options.secret ?? null;

    if (expected && expected !== provided) {
      return null;
    }
  }

  return session;
}

export async function fetchAnswers(sessionId: string) {
  const { data, error } = await supa
    .from('answers')
    .select('step_key, value_json')
    .eq('session_id', sessionId)
    .order('created_at', { ascending: true });

  if (error) throw new Error(error.message);
  interface AnswerRecord {
    step_key: string;
    value_json: unknown;
  }

  const answers: Record<string, unknown> = {};
  for (const r of (data ?? []) as AnswerRecord[]) answers[r.step_key] = r.value_json;
  return answers;
}

async function fetchPatientPublicId(patientId: string): Promise<string | null> {
  const { data } = await supa
    .from('patients')
    .select('public_id')
    .eq('id', patientId)
    .maybeSingle();

  return data?.public_id ?? null;
}

/** Build/Upload report for a token; returns signed download URL */
export async function buildAndUploadReport(
  token: string,
  language: Language = 'en',
  options: { secret?: string | null } = {}
) {
  const session = await fetchSessionByToken(token, { secret: options.secret ?? null });
  if (!session) throw new Error('session_not_found');

  const patientPublicId = session.patient_id ? await fetchPatientPublicId(session.patient_id) : null;
  const answers = await fetchAnswers(session.id);

  const pages: Array<{ title: string; lines: string[]; scoring?: string; intro?: string[] }> = [];
  const locale = getReportLocale(language);

  // Part 1
  const p1Lines = buildPart1Lines(answers, language);
  const p1Score = computeEndopainGlobalScore(answers);
  pages.push({
    title: locale.partTitles.part1,
    lines: p1Lines,
    scoring: locale.scoring.part1(p1Score)
  });

  // Part 2 if any answers exist
  if (hasAny(answers, PCS_ITEMS.map(([k]) => k))) {
    const p2Lines = buildPart2Lines(answers, language);
    const p2Yes = computePcsYesCount(answers);
    pages.push({
      title: locale.partTitles.part2,
      lines: p2Lines,
      scoring: locale.scoring.part2(p2Yes, locale.bool.yes)
    });
  }

  // Part 3 if any answers exist
  if (hasAny(answers, PVVQ_ORDER)) {
    const p3Lines = buildPart3Lines(answers, language);
    const p3Total = computePvvqTotal(answers);
    pages.push({
      title: locale.partTitles.part3,
      lines: p3Lines,
      intro: [locale.part3Interpretation],
      scoring: locale.scoring.part3(p3Total)
    });
  }

  // Render & upload (private bucket)
  const bytes = await renderSummaryPdf({
    token,
    patientId: patientPublicId,
    generatedAt: new Date(session.created_at),
    pages,
    language
  });

  const objectPath = `assessment-${token}.pdf`;
  const { error: upErr } = await supa.storage
    .from(BUCKET)
    .upload(objectPath, new Uint8Array(bytes), {
      upsert: true,
      contentType: 'application/pdf',
      cacheControl: 'no-store'
    });
  if (upErr) throw new Error(upErr.message);

  // Signed URL for download
  const { data: dl } = await supa
    .storage
    .from(BUCKET)
    .createSignedUrl(objectPath, 60 * 10, { download: `patient-report-${token}.pdf` });

  if (session.status !== 'ended') {
    await markSessionEnded(session.id);
  }

  return { objectPath, downloadUrl: dl?.signedUrl ?? null };
}

/** Download blob to stream inline (returns null if not found) */
export async function streamReport(token: string) {
  const objectPath = `assessment-${token}.pdf`;
  const { data, error } = await supa.storage.from(BUCKET).download(objectPath);
  if (error || !data) return null;
  return data;
}

export async function markSessionStatus(sessionId: string, status: string) {
  const { error } = await supa
    .from('sessions')
    .update({ status })
    .eq('id', sessionId);
  if (error) throw new Error(error.message);
}

export async function markSessionEnded(sessionId: string) {
  await markSessionStatus(sessionId, 'ended');
}

export async function markSessionEndedByToken(token: string, options: { secret?: string | null } = {}) {
  const normalized = token.trim().toUpperCase();
  if (!normalized) return false;
  const session = await fetchSessionByToken(normalized, { secret: options.secret ?? null });
  if (!session) return false;
  if (session.status !== 'ended') {
    await markSessionEnded(session.id);
  }
  return true;
}
