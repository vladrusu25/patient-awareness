// src/routes/api/pdf-search/[token]/+server.ts
import type { RequestHandler } from './$types'; // use route-local types
import { json } from '@sveltejs/kit';
import { supa } from '$lib/server/supabase';

export const GET: RequestHandler = async ({ params }) => {
  const token = params.token?.trim();
  if (!token) {
    return json({ pdfFound: false, reason: 'missing_token' }, { status: 400 });
  }

  // our files are stored as assessment-<token>.pdf
  const objectPath = `assessment-${token}.pdf`;

  const { data } = supa.storage.from('pdf-results').getPublicUrl(objectPath);
  const publicUrl = data?.publicUrl;

  if (!publicUrl) {
    return json({ pdfFound: false }, { status: 404 });
  }

  // For public buckets: verify it actually exists
  try {
    const head = await fetch(publicUrl, { method: 'HEAD', cache: 'no-store' });
    if (!head.ok) {
      return json({ pdfFound: false }, { status: 404 });
    }
  } catch {
    return json({ pdfFound: false }, { status: 404 });
  }

  return json({ pdfFound: true, pdfUrl: publicUrl }, { status: 200 });
};
