import { json } from '@sveltejs/kit';
import { supa } from '$lib/server/supabase';   // <-- use your export
import { randomUUID } from 'crypto';

export async function POST() {
  // latest questionnaire template
  const { data: tmpl, error: tErr } = await supa
    .from('questionnaire_templates')
    .select('id')
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (tErr || !tmpl) {
    return new Response(tErr?.message ?? 'No questionnaire template found', { status: 500 });
  }

  // generate token
  const token = randomUUID().replace(/-/g, '').slice(0, 16).toUpperCase();

  // create session
  const { error: sErr } = await supa.from('sessions').insert({
    token,
    template_id: tmpl.id,
    status: 'active'
  });

  if (sErr) return new Response(sErr.message, { status: 500 });

  return json({ token });
}
