import { randomBytes } from 'node:crypto';
import { supa } from './supabase';

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const DIGITS = '0123456789';

function randomPublicId(): string {
  const bytes = randomBytes(6);
  const letter = LETTERS[bytes[0] % LETTERS.length];
  let digits = '';
  for (let i = 1; i < 6; i += 1) {
    digits += DIGITS[bytes[i] % DIGITS.length];
  }
  return `${letter}${digits}`;
}

export async function createPatientForSession(
  sessionId: string,
  clinicId: string | null
): Promise<{ patientId: string; publicId: string }> {
  const now = new Date().toISOString();

  for (let attempt = 0; attempt < 6; attempt += 1) {
    const publicId = randomPublicId();
    const { data, error } = await supa
      .from('patients')
      .insert([
        {
          public_id: publicId,
          clinic_id: clinicId,
          first_session_id: sessionId,
          first_seen_at: now,
          last_seen_at: now
        }
      ])
      .select('id, public_id')
      .single();

    if (!error && data) {
      await supa.from('sessions').update({ patient_id: data.id }).eq('id', sessionId);
      return { patientId: data.id, publicId: data.public_id };
    }

    if (error?.code !== '23505') {
      throw new Error(error?.message ?? 'Failed to create patient record');
    }
  }

  throw new Error('Unable to allocate unique patient ID');
}

export async function attachPatientByPublicId(
  sessionId: string,
  clinicId: string | null,
  existingPatientId: string | null,
  publicId: string
): Promise<{ patientId: string; publicId: string } | null> {
  let query = supa
    .from('patients')
    .select('id, public_id, clinic_id')
    .eq('public_id', publicId)
    .limit(1);

  if (clinicId) {
    query = query.eq('clinic_id', clinicId);
  }

  const { data } = await query.maybeSingle();
  if (!data) return null;

  if (existingPatientId !== data.id) {
    await supa.from('sessions').update({ patient_id: data.id }).eq('id', sessionId);
  }

  await supa.from('patients').update({ last_seen_at: new Date().toISOString() }).eq('id', data.id);

  return { patientId: data.id, publicId: data.public_id };
}
