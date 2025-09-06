import type { RequestHandler } from './$types';
import { error, json } from '@sveltejs/kit';
import { supa } from '$lib/server/supabase';
import { buildSummaryLines } from '$lib/assessment/summary';
import { renderSummaryPdf } from '$lib/pdf/report';

export const GET: RequestHandler = async ({ params }) => {
  const token = params.token;
  if (!token) throw error(400, 'Missing token');

  // Load session
  const { data: session, error: sErr } = await supa
    .from('sessions')
    .select('id, created_at')
    .eq('public_token', token)
    .maybeSingle();
  if (sErr) throw error(500, sErr.message);
  if (!session) throw error(404, 'Session not found');

  // Load answers
  const { data: rows, error: aErr } = await supa
    .from('answers')
    .select('step_key, value_json')
    .eq('session_id', session.id)
    .order('created_at', { ascending: true });
  if (aErr) throw error(500, aErr.message);

  const answers: Record<string, unknown> = {};
  for (const r of rows ?? []) answers[r.step_key] = r.value_json;

  // Build lines & render PDF
  const lines = buildSummaryLines(answers);
  const bytes = await renderSummaryPdf({
    token,
    generatedAt: new Date(session.created_at),
    lines
  });

  // Upload to Supabase Storage as assessment-${token}.pdf
  const objectPath = `assessment-${token}.pdf`;
  const { error: upErr } = await supa.storage
    .from('pdf-results')
    .upload(objectPath, new Uint8Array(bytes), {
      upsert: true,
      contentType: 'application/pdf',
      cacheControl: 'public, max-age=31536000, immutable'
    });
  if (upErr) throw error(500, upErr.message);

  // Return public URL (for public bucket); for private, return a signed URL instead
  const { data: pub } = supa.storage.from('pdf-results').getPublicUrl(objectPath);
  return json({ publicUrl: pub?.publicUrl ?? null });
};
