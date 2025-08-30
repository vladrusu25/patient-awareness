import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { supa } from '$lib/server/supabase';

export const load: PageServerLoad = async ({ params }) => {
  const { token } = params;
  if (!token) throw error(400, 'Missing session token');

  // Optional: validate token exists
  const { data, error: dErr } = await supa
    .from('sessions')
    .select('id, status')
    .eq('public_token', token)
    .maybeSingle();

  if (dErr) throw error(500, dErr.message);
  if (!data) throw error(404, 'Session not found');

  // If you want, guard status here:
  // if (data.status !== 'active') throw error(410, 'Session inactive');

  return { token };
};
