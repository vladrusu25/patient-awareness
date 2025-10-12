# Patient Awareness

Chat-style **pelvic health assessment** web app built with **SvelteKit + TypeScript + Supabase**.  
Patients answer a 3-part questionnaire (ENDOPAIN-4D, PCS, PVVQ); scores are computed live and a professional **multi-page PDF** is generated via `pdf-lib`.  
An **Admin** dashboard shows cohorts, metrics, and an Endopain vs PVVQ scatter plot.

---

## ✨ Features

- **Chat-like UX** for 3 questionnaires (ENDOPAIN-4D, PCS, PVVQ)
- **Live scoring**: updates `session_scores` after every answer
- **PDF generation** with `pdf-lib` (multi-page; WinAnsi font-safe)
- **Admin dashboard**: cohorts, date ranges, scatter plot, patients panel
- **Supabase Postgres**: sessions, answers, scores, clinics; RLS-ready
- **API routes** under `/(website)/api/session/*`
- **Planned**: Supabase Auth for Admin, multi-tenant RLS via `clinic_id`,
  real date ranges/cohorts, filled patients panel, i18n, signed URLs for PDFs

---

## 🧱 Tech Stack

- **Frontend**: SvelteKit, TypeScript, Tailwind (utility-first)
- **DB**: Supabase (Postgres + Row-Level Security)
- **Storage**: (optional) Supabase Storage for PDFs
- **PDF**: `pdf-lib` (note: use **WinAnsi**-safe glyphs for `>=`, etc.)
- **Charts**: (Admin) scatter + timeseries (e.g., Recharts/Carbon Charts)
- **Deployment**: SvelteKit adapter (Node/Edge), Supabase hosted DB

---

---

## 🌐 Live Demo
Deployed on Vercel: https://pelviccongestionsyndrome.eu/

---

## 🚀 Run Locally (npm)

### Prerequisites
- Node.js **18+** (or 20+ recommended)
- A Supabase project (or use your existing one)

### 1) Clone

git clone https://github.com/vladrusu25/patient-awareness.git
cd patient-awareness

### 2) Install deps
npm install

### 3) Environment
Create a .env file at the project root and set your keys:
# Public keys are safe for the browser; service role must be used server-side only
PUBLIC_SUPABASE_URL=https://<project>.supabase.co
PUBLIC_SUPABASE_ANON_KEY=<anon-key>
SUPABASE_SERVICE_ROLE=<service-role-key>

### 4) Dev server
npm run dev

### 5) Build & Preview
npm run build
npm run preview

