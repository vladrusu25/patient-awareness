import { supa } from '$lib/server/supabase';
import { fetchSessionByToken } from '$lib/server/report.service';

const TOKEN_RE = /^[A-Z0-9]{16}$/;
const PATIENT_RE = /^[A-Z][0-9]{5}$/;
const BUCKET = 'pdf-results';

type ScoreRow = {
  endopain_global: number | null;
  pcs_yes_count: number | null;
  pcs_positive: boolean | null;
  pvvq_total: number | null;
  computed_at: string | null;
};

type SessionRow = {
  id: string;
  public_token: string;
  created_at: string;
  patient_id: string | null;
  session_scores: ScoreRow | ScoreRow[] | null;
};

type PatientRow = {
  id: string;
  public_id: string;
  first_seen_at: string | null;
  last_seen_at: string | null;
};

export type ScoreSummary = {
  endopain: number | null;
  pcsYes: number | null;
  pcsPositive: boolean | null;
  pvvq: number | null;
};

export type ScoreDelta = {
  endopain: number | null;
  pvvq: number | null;
};

export type AssessmentPreview = {
  sessionId: string;
  token: string;
  createdAt: string;
  viewUrl: string;
  downloadUrl: string | null;
  scores: ScoreSummary;
  delta: ScoreDelta | null;
};

export type PatientAssessments = {
  patientId: string;
  publicId: string;
  totalAssessments: number;
  firstSeenAt: string | null;
  lastSeenAt: string | null;
  assessments: AssessmentPreview[];
  latestSummary: {
    scores: ScoreSummary | null;
    changeFromPrevious: ScoreDelta | null;
  } | null;
};

export type DoctorLookupAssessment = AssessmentPreview & {
  patientPublicId: string | null;
};

export type DoctorLookupResult =
  | { type: 'assessment'; assessment: DoctorLookupAssessment }
  | { type: 'patient'; patient: PatientAssessments };

function unpackScore(score: SessionRow['session_scores']): ScoreRow | null {
  if (!score) return null;
  return Array.isArray(score) ? score[0] ?? null : score;
}

function toScoreSummary(score: ScoreRow | null): ScoreSummary {
  return {
    endopain: score?.endopain_global ?? null,
    pcsYes: score?.pcs_yes_count ?? null,
    pcsPositive: score?.pcs_positive ?? null,
    pvvq: score?.pvvq_total ?? null
  };
}

function calcDelta(current: ScoreSummary, previous: ScoreSummary | null): ScoreDelta | null {
  if (!previous) return null;
  const endopain =
    typeof current.endopain === 'number' && typeof previous.endopain === 'number'
      ? current.endopain - previous.endopain
      : null;
  const pvvq =
    typeof current.pvvq === 'number' && typeof previous.pvvq === 'number'
      ? current.pvvq - previous.pvvq
      : null;
  if (endopain == null && pvvq == null) return null;
  return { endopain, pvvq };
}

export function classifyQuery(raw: string): 'assessment' | 'patient' | null {
  const normalized = raw.trim().toUpperCase();
  if (TOKEN_RE.test(normalized)) return 'assessment';
  if (PATIENT_RE.test(normalized)) return 'patient';
  return null;
}

async function fetchPatientByPublicId(publicId: string): Promise<PatientRow | null> {
  const { data, error } = await supa
    .from('patients')
    .select('id, public_id, first_seen_at, last_seen_at')
    .eq('public_id', publicId)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data as PatientRow | null;
}

async function fetchPatientPublicId(patientId: string | null): Promise<string | null> {
  if (!patientId) return null;
  const { data, error } = await supa
    .from('patients')
    .select('public_id')
    .eq('id', patientId)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data?.public_id ?? null;
}

async function getDownloadUrl(token: string): Promise<string | null> {
  const objectPath = `assessment-${token}.pdf`;
  const { data, error } = await supa
    .storage
    .from(BUCKET)
    .createSignedUrl(objectPath, 60 * 10, { download: `patient-report-${token}.pdf` });
  if (error) return null;
  return data?.signedUrl ?? null;
}

export async function lookupAssessment(tokenRaw: string): Promise<DoctorLookupAssessment | null> {
  const token = tokenRaw.trim().toUpperCase();
  if (!TOKEN_RE.test(token)) return null;

  const session = await fetchSessionByToken(token);
  if (!session) return null;

  const { data: scoreData, error } = await supa
    .from('session_scores')
    .select('endopain_global, pcs_yes_count, pcs_positive, pvvq_total, computed_at')
    .eq('session_id', session.id)
    .maybeSingle();
  if (error) throw new Error(error.message);

  const scores = toScoreSummary((scoreData as ScoreRow | null) ?? null);
  const downloadUrl = await getDownloadUrl(token);
  const patientPublicId = await fetchPatientPublicId(session.patient_id ?? null);

  return {
    sessionId: session.id,
    token,
    createdAt: session.created_at,
    viewUrl: `/api/session/${encodeURIComponent(token)}/pdf`,
    downloadUrl,
    scores,
    delta: null,
    patientPublicId
  };
}

export async function lookupPatient(publicIdRaw: string): Promise<PatientAssessments | null> {
  const publicId = publicIdRaw.trim().toUpperCase();
  if (!PATIENT_RE.test(publicId)) return null;

  const patient = await fetchPatientByPublicId(publicId);
  if (!patient) return null;

  const { data, error } = await supa
    .from('sessions')
    .select('id, public_token, created_at, patient_id, session_scores(endopain_global, pcs_yes_count, pcs_positive, pvvq_total, computed_at)')
    .eq('patient_id', patient.id)
    .order('created_at', { ascending: true });

  if (error) throw new Error(error.message);

  const rows = (data ?? []) as unknown as SessionRow[];
  const ordered = rows.map((row) => {
    const score = unpackScore(row.session_scores);
    const scores = toScoreSummary(score);
    return {
      sessionId: row.id,
      token: row.public_token,
      createdAt: row.created_at,
      viewUrl: `/api/session/${encodeURIComponent(row.public_token)}/pdf`,
      downloadUrl: null as string | null,
      scores,
      delta: null as ScoreDelta | null
    } as AssessmentPreview;
  });

  let previousScores: ScoreSummary | null = null;
  for (const entry of ordered) {
    entry.delta = calcDelta(entry.scores, previousScores);
    previousScores = entry.scores;
  }

  const downloads = await Promise.all(
    ordered.map(async (entry) => ({ token: entry.token, url: await getDownloadUrl(entry.token) }))
  );
  const downloadMap = new Map(downloads.map((d) => [d.token, d.url] as const));
  for (const entry of ordered) {
    entry.downloadUrl = downloadMap.get(entry.token) ?? null;
  }

  const totalAssessments = ordered.length;
  const latest = totalAssessments ? ordered[totalAssessments - 1] : null;
  const previous = totalAssessments > 1 ? ordered[totalAssessments - 2] : null;

  return {
    patientId: patient.id,
    publicId: patient.public_id,
    totalAssessments,
    firstSeenAt: patient.first_seen_at,
    lastSeenAt: patient.last_seen_at,
    assessments: ordered.slice().reverse(),
    latestSummary: latest
      ? {
          scores: latest.scores,
          changeFromPrevious: latest.delta ?? (previous ? calcDelta(latest.scores, previous.scores) : null)
        }
      : null
  };
}

export async function doctorLookup(raw: string): Promise<DoctorLookupResult | null> {
  const mode = classifyQuery(raw);
  if (mode === 'assessment') {
    const assessment = await lookupAssessment(raw);
    if (!assessment) return null;
    return { type: 'assessment', assessment };
  }

  if (mode === 'patient') {
    const patient = await lookupPatient(raw);
    if (!patient) return null;
    return { type: 'patient', patient };
  }

  return null;
}
