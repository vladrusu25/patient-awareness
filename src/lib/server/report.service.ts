// src/lib/server/report.service.ts
import { supa } from '$lib/server/supabase';
import { buildPart1Lines, buildPart2Lines, buildPart3Lines, hasAny } from '$lib/assessment/summary';
import { computeEndopainGlobalScore, computePcsYesCount, computePvvqTotal } from '$lib/assessment/scoring';
import { PCS_ITEMS, PVVQ_ORDER } from '$lib/assessment/labels';
import { renderSummaryPdf } from '$lib/pdf/report';

const BUCKET = 'pdf-results';

export async function fetchSessionByToken(token: string) {
  const { data, error } = await supa
    .from('sessions')
    .select('id, created_at, patient_id')
    .eq('public_token', token)
    .single();
  if (error || !data) return null;
  return data as { id: string; created_at: string; patient_id: string | null };
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
export async function buildAndUploadReport(token: string) {
  const session = await fetchSessionByToken(token);
  if (!session) throw new Error('session_not_found');

  const patientPublicId = session.patient_id ? await fetchPatientPublicId(session.patient_id) : null;
  const answers = await fetchAnswers(session.id);

  const pages: Array<{ title: string; lines: string[]; scoring?: string }> = [];

  // Part 1
  const p1Lines = buildPart1Lines(answers);
  const p1Score = computeEndopainGlobalScore(answers);
  pages.push({
    title: 'Part 1. ENDOPAIN-4D',
    lines: p1Lines,
    scoring: `Physician scoring (ENDOPAIN-4D Global Score, 0–100): ${p1Score}/100`
  });

  // Part 2 if any answers exist
  if (hasAny(answers, PCS_ITEMS.map(([k]) => k))) {
    const p2Lines = buildPart2Lines(answers);
    const p2Yes = computePcsYesCount(answers);
    pages.push({
      title: 'Part 2. PCS Screening (5 items)',
      lines: p2Lines,
      scoring: `Physician scoring (PCS positive if >=2 Yes): ${p2Yes} Yes`
    });
  }

  // Part 3 if any answers exist
  if (hasAny(answers, PVVQ_ORDER)) {
    const p3Lines = buildPart3Lines(answers);
    const p3Total = computePvvqTotal(answers);
    pages.push({
      title: 'Part 3. Pelvic Varicose Veins Questionnaire (PVVQ, 20 items)',
      lines: p3Lines,
      scoring: `Physician scoring (PVVQ Total, 20–100): ${p3Total}`
    });
  }

  // Render & upload (private bucket)
  const bytes = await renderSummaryPdf({
    token,
    patientId: patientPublicId,
    generatedAt: new Date(session.created_at),
    pages
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

  return { objectPath, downloadUrl: dl?.signedUrl ?? null };
}

/** Download blob to stream inline (returns null if not found) */
export async function streamReport(token: string) {
  const objectPath = `assessment-${token}.pdf`;
  const { data, error } = await supa.storage.from(BUCKET).download(objectPath);
  if (error || !data) return null;
  return data;
}
