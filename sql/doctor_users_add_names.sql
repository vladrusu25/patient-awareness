ALTER TABLE doctor_users
  ADD COLUMN IF NOT EXISTS first_name TEXT;

ALTER TABLE doctor_users
  ADD COLUMN IF NOT EXISTS last_name TEXT;
