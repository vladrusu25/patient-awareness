import { randomBytes } from 'node:crypto';
import argon2 from 'argon2';
import { supa } from '$lib/server/supabase';

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const DIGITS = '0123456789';
const SECRET_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

export type DoctorRegion = 'en' | 'ru' | 'kz' | 'hr' | 'sk';

type DoctorRow = {
  id: string;
  username: string;
  doctor_code: string;
  region: DoctorRegion;
  link_secret: string;
};

type PatientRow = {
  id: string;
  public_id: string;
  doctor_user_id: string | null;
  first_session_id: string | null;
};

const REGION_TO_COUNTRY: Record<DoctorRegion, string> = {
  en: 'PL',
  ru: 'RU',
  kz: 'KZ',
  hr: 'HR',
  sk: 'SK'
};

function randomItem(set: string): string {
  const idx = randomBytes(1)[0] % set.length;
  return set[idx]!;
}

function randomDoctorCode(): string {
  return `${randomItem(LETTERS)}${randomItem(DIGITS)}${randomItem(DIGITS)}`;
}

async function ensureUniqueDoctorCode(): Promise<string> {
  for (let attempt = 0; attempt < 64; attempt += 1) {
    const code = randomDoctorCode();
    const { count } = await supa
      .from('doctor_users')
      .select('*', { count: 'exact', head: true })
      .eq('doctor_code', code);
    if ((count ?? 0) === 0) return code;
  }
  throw new Error('unable_to_allocate_doctor_code');
}

function randomLetters(count: number): string {
  let out = '';
  for (let i = 0; i < count; i += 1) out += randomItem(LETTERS);
  return out;
}

function randomDigits(count: number): string {
  let out = '';
  for (let i = 0; i < count; i += 1) out += randomItem(DIGITS);
  return out;
}

function randomSecret(count: number): string {
  let out = '';
  for (let i = 0; i < count; i += 1) {
    out += SECRET_ALPHABET[randomBytes(1)[0] % SECRET_ALPHABET.length]!;
  }
  return out;
}

async function ensureUniqueLinkSecret(): Promise<string> {
  for (let attempt = 0; attempt < 128; attempt += 1) {
    const secret = randomSecret(8);
    const { count } = await supa
      .from('doctor_users')
      .select('*', { count: 'exact', head: true })
      .eq('link_secret', secret);
    if ((count ?? 0) === 0) return secret;
  }
  throw new Error('unable_to_allocate_link_secret');
}

function generatePatientPublicId(doctorCode: string): string {
  return `${doctorCode}${randomLetters(2)}${randomDigits(3)}`;
}

function buildSessionToken(patientId: string, counter: number): string {
  return `${patientId}${counter.toString().padStart(2, '0')}`;
}

function assertRegion(region: string): asserts region is DoctorRegion {
  if (!['en', 'ru', 'kz', 'hr', 'sk'].includes(region)) {
    throw new Error('invalid_region');
  }
}

async function fetchLatestTemplateId(version = 'v1'): Promise<string> {
  const { data, error } = await supa
    .from('questionnaire_templates')
    .select('id')
    .eq('version', version)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error || !data) throw new Error('template_not_found');
  return data.id as string;
}

async function fetchDoctorByCode(code: string): Promise<DoctorRow | null> {
  const normalized = code.trim().toUpperCase();
  if (!/^[A-Z][0-9]{2}$/.test(normalized)) return null;
  const { data } = await supa
    .from('doctor_users')
    .select('id, username, doctor_code, region, link_secret')
    .eq('doctor_code', normalized)
    .maybeSingle();
  return (data as DoctorRow | null) ?? null;
}

export async function getDoctorShareInfo(code: string, secret: string) {
  const doctor = await fetchDoctorByCode(code);
  if (!doctor || doctor.link_secret !== secret) return null;
  return {
    id: doctor.id,
    doctorCode: doctor.doctor_code,
    region: doctor.region
  };
}

export async function getDoctorById(id: string): Promise<DoctorRow | null> {
  const { data, error } = await supa
    .from('doctor_users')
    .select('id, username, doctor_code, region, link_secret')
    .eq('id', id)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return (data as DoctorRow | null) ?? null;
}

async function fetchPatientByPublicId(publicId: string): Promise<PatientRow | null> {
  const normalized = publicId.trim().toUpperCase();
  const { data } = await supa
    .from('patients')
    .select('id, public_id, doctor_user_id, first_session_id')
    .eq('public_id', normalized)
    .maybeSingle();
  return (data as PatientRow | null) ?? null;
}

async function countSessionsForPatient(patientId: string): Promise<number> {
  const { count } = await supa
    .from('sessions')
    .select('id', { count: 'exact', head: true })
    .eq('patient_id', patientId);
  return count ?? 0;
}

export type DoctorUser = DoctorRow & { created_at?: string };

export async function listDoctorUsers(): Promise<DoctorUser[]> {
  const { data, error } = await supa
    .from('doctor_users')
    .select('id, username, doctor_code, region, link_secret, created_at')
    .order('created_at', { ascending: true });
  if (error) throw new Error(error.message);
  return (data ?? []) as DoctorUser[];
}

export async function createDoctorUser(input: {
  username: string;
  password: string;
  region: DoctorRegion;
}): Promise<DoctorUser> {
  const username = input.username.trim().toLowerCase();
  const password = input.password;
  const region = input.region;

  if (!username || !password) throw new Error('missing_credentials');
  assertRegion(region);

  const doctorCode = await ensureUniqueDoctorCode();
  const linkSecret = await ensureUniqueLinkSecret();
  const password_hash = await argon2.hash(password);

  const { data, error } = await supa
    .from('doctor_users')
    .insert({
      username,
      password_hash,
      doctor_code: doctorCode,
      region,
      link_secret: linkSecret
    })
    .select('id, username, doctor_code, region, link_secret, created_at')
    .single();

  if (error || !data) throw new Error(error?.message ?? 'create_failed');
  return data as DoctorUser;
}

export async function startDoctorSession(params: {
  doctorCode: string;
  linkSecret: string;
  mode: 'new' | 'returning';
  patientPublicId?: string;
}) {
  const doctor = await fetchDoctorByCode(params.doctorCode);
  if (!doctor) throw new Error('doctor_not_found');
  if (doctor.link_secret !== params.linkSecret) throw new Error('invalid_secret');

  const templateId = await fetchLatestTemplateId();
  const countryCode = REGION_TO_COUNTRY[doctor.region] ?? 'PL';
  const sessionSecret = randomSecret(6);
  const now = new Date().toISOString();

  if (params.mode === 'new') {
    for (let attempt = 0; attempt < 64; attempt += 1) {
      const candidate = generatePatientPublicId(doctor.doctor_code);
      const existingPatient = await fetchPatientByPublicId(candidate);
      if (existingPatient) continue;

      const { data: patientData, error: patientErr } = await supa
        .from('patients')
        .insert({
          public_id: candidate,
          doctor_user_id: doctor.id,
          first_seen_at: now,
          last_seen_at: now
        })
        .select('id, public_id')
        .single();
      if (patientErr || !patientData) throw new Error(patientErr?.message ?? 'patient_create_failed');

      const token = buildSessionToken(candidate, 1);
      const { data: sessionData, error: sessionErr } = await supa
        .from('sessions')
        .insert({
          public_token: token,
          template_id: templateId,
          country_code: countryCode,
          doctor_user_id: doctor.id,
          patient_id: patientData.id,
          token_secret: sessionSecret,
          token_counter: 1,
          status: 'active'
        })
        .select('id')
        .single();
      if (sessionErr || !sessionData) throw new Error(sessionErr?.message ?? 'session_create_failed');

      await supa
        .from('patients')
        .update({ first_session_id: sessionData.id, last_seen_at: now })
        .eq('id', patientData.id);

      const { error: ansErr } = await supa.from('answers').insert([
        {
          session_id: sessionData.id,
          step_key: 'p0_patient_status',
          value_json: 'new'
        }
      ]);
      if (ansErr) throw new Error(ansErr.message);

      return {
        patientPublicId: patientData.public_id,
        token,
        tokenSecret: sessionSecret
      };
    }
    throw new Error('unable_to_allocate_patient_id');
  }

  if (!params.patientPublicId) throw new Error('missing_patient_id');
  const patient = await fetchPatientByPublicId(params.patientPublicId);
  if (!patient || patient.doctor_user_id !== doctor.id) throw new Error('patient_not_found');

  const existingCount = await countSessionsForPatient(patient.id);
  const counter = existingCount + 1;
  if (counter > 99) throw new Error('assessment_limit_reached');

  const token = buildSessionToken(patient.public_id, counter);

  const { data: sessionData, error: sessionErr } = await supa
    .from('sessions')
    .insert({
      public_token: token,
      template_id: templateId,
      country_code: countryCode,
      doctor_user_id: doctor.id,
      patient_id: patient.id,
      token_secret: sessionSecret,
      token_counter: counter,
      status: 'active'
    })
    .select('id')
    .single();

  if (sessionErr || !sessionData) throw new Error(sessionErr?.message ?? 'session_create_failed');

  const update: Record<string, unknown> = { last_seen_at: now };
  if (!patient.first_session_id) {
    update.first_session_id = sessionData.id;
  }
  await supa.from('patients').update(update).eq('id', patient.id);

  const { error: ansErr } = await supa.from('answers').insert([
    {
      session_id: sessionData.id,
      step_key: 'p0_patient_status',
      value_json: 'returning'
    },
    {
      session_id: sessionData.id,
      step_key: 'p0_patient_id_entry',
      value_json: patient.public_id
    }
  ]);
  if (ansErr) throw new Error(ansErr.message);

  return {
    patientPublicId: patient.public_id,
    token,
    tokenSecret: sessionSecret
  };
}
