import type { RequestHandler } from './$types';
import { supa } from '$lib/server/supabase';
import { SITE_COUNTRY } from '$env/static/private';
import { resolveSiteOrigin } from '$lib/config/site';
import { generateStandaloneToken } from '$lib/server/token.server';

export const POST: RequestHandler = async ({ request, url }) => {
  // optional clinicId in body; version default 'v1'
  const { clinicId, templateVersion = 'v1' } = await request.json().catch(() => ({}));

  // find the latest template by version
  const { data: tmpl, error: tErr } = await supa
    .from('questionnaire_templates')
    .select('id')
    .eq('version', templateVersion)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (tErr || !tmpl) {
    return new Response(JSON.stringify({ error: 'Template not found' }), { status: 404 });
  }

  const publicToken = generateStandaloneToken();
  const country = SITE_COUNTRY || 'PL';

  const { data: session, error } = await supa
    .from('sessions')
    .insert({
      public_token: publicToken,
      template_id: tmpl.id,
      clinic_id: clinicId ?? null,
      country_code: country
    })
    .select('public_token')
    .single();

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  const origin = resolveSiteOrigin(url.origin);
  const link = `${origin}/session/${session.public_token}`;
  return new Response(JSON.stringify({ token: session.public_token, url: link }), {
    headers: { 'content-type': 'application/json' }
  });
};
