-- Session storage for doctor users (parallel to admin_sessions)
CREATE TABLE IF NOT EXISTS doctor_sessions (
  id uuid PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES doctor_users(id) ON DELETE CASCADE,
  expires_at timestamptz NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS doctor_sessions_user_id_idx ON doctor_sessions(user_id);
