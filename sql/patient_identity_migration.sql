-- Enable UUID generation if not already available
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 1. New patients table to track reusable identifiers
CREATE TABLE IF NOT EXISTS patients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  public_id text NOT NULL UNIQUE,
  clinic_id uuid REFERENCES clinics(id),
  first_session_id uuid REFERENCES sessions(id),
  first_seen_at timestamptz NOT NULL DEFAULT now(),
  last_seen_at timestamptz NOT NULL DEFAULT now(),
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS patients_clinic_id_idx ON patients(clinic_id);

-- 2. Sessions now link to patients
ALTER TABLE sessions
  ADD COLUMN IF NOT EXISTS patient_id uuid;

ALTER TABLE sessions
  ADD CONSTRAINT sessions_patient_id_fkey
  FOREIGN KEY (patient_id) REFERENCES patients(id);

CREATE INDEX IF NOT EXISTS sessions_patient_id_idx ON sessions(patient_id);

-- 3. Backfill existing sessions with one patient per session
WITH seeded AS (
  INSERT INTO patients (public_id, clinic_id, first_session_id, first_seen_at, last_seen_at)
  SELECT
    'PA' || upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 8)) AS public_id,
    s.clinic_id,
    s.id,
    s.created_at,
    s.created_at
  FROM sessions s
  WHERE s.patient_id IS NULL
  RETURNING id, first_session_id
)
UPDATE sessions s
SET patient_id = seeded.id
FROM seeded
WHERE s.id = seeded.first_session_id;

-- 4. (Optional, run after verifying no NULLs remain)
-- ALTER TABLE sessions ALTER COLUMN patient_id SET NOT NULL;