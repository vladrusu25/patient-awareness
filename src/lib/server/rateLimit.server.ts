// src/lib/server/rateLimit.server.ts
import type { SupabaseClient } from '@supabase/supabase-js';
import crypto from 'node:crypto';

export const hashIp = (ip: string) =>
  crypto.createHash('sha256').update(ip).digest('base64url').slice(0, 22);

type RlRow = { window_start: string | null; count: number | null };

export async function enforceFixedWindow(opts: {
  supa: SupabaseClient;
  key: string;        // e.g. 'pdf-search:<hash>'
  max: number;        // allowed requests per window
  windowMs: number;   // window size in ms
}) {
  const { supa, key, max, windowMs } = opts;

  const { data } = await supa
    .from('api_rate_limits')
    .select('window_start, count')
    .eq('key', key)
    .maybeSingle();

  const rl = (data ?? null) as RlRow | null;
  const now = new Date();
  const ws = rl?.window_start ? new Date(rl.window_start) : null;
  const inWindow = ws ? now.getTime() - ws.getTime() < windowMs : false;

  if (!rl) {
    await supa.from('api_rate_limits').insert({
      key,
      window_start: now.toISOString(),
      count: 1
    });
    return { ok: true as const };
  }

  if (inWindow) {
    const used = rl.count ?? 0;
    if (used >= max) {
      const retryAfter = Math.ceil((ws!.getTime() + windowMs - now.getTime()) / 1000);
      return {
        ok: false as const,
        retryAfter,
        headers: { 'Retry-After': String(retryAfter), 'Cache-Control': 'no-store' }
      };
    }
    await supa.from('api_rate_limits').update({ count: used + 1 }).eq('key', key);
    return { ok: true as const };
  }

  await supa
    .from('api_rate_limits')
    .update({ window_start: now.toISOString(), count: 1 })
    .eq('key', key);

  return { ok: true as const };
}
