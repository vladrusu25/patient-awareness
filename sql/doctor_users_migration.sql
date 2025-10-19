-- Doctor credentials & doctor-linked patient/session support
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS doctor_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text NOT NULL UNIQUE,
  password_hash text NOT NULL,
  doctor_code char(3) NOT NULL UNIQUE,
  region text NOT NULL,
  link_secret text NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE patients
  ADD COLUMN IF NOT EXISTS doctor_user_id uuid REFERENCES doctor_users(id);

CREATE INDEX IF NOT EXISTS patients_doctor_user_id_idx ON patients(doctor_user_id);

ALTER TABLE sessions
  ADD COLUMN IF NOT EXISTS doctor_user_id uuid REFERENCES doctor_users(id),
  ADD COLUMN IF NOT EXISTS token_secret text,
  ADD COLUMN IF NOT EXISTS token_counter smallint;

CREATE INDEX IF NOT EXISTS sessions_doctor_user_id_idx ON sessions(doctor_user_id);
CREATE INDEX IF NOT EXISTS sessions_token_secret_idx ON sessions(token_secret);
