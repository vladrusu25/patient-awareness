// src/lib/services/admin.server.ts
import { supa } from '$lib/server/supabase';
import type { DateRange, MetricsSummary, PatientLike, TrendPoint } from '$lib/types/admin';
import { clamp, linearFitXY } from '$lib/utils/stats';

/* ---------- Row types by query ---------- */
type MetricsRow = { parts: { part1?: boolean; part2?: boolean; part3?: boolean } | null; computed_at: string; };
type PatientRow = {
  session_id: string;
  endopain_global: number | null;
  computed_at: string;
  sessions:
    | { public_token: string; created_at: string }
    | { public_token: string; created_at: string }[]
    | null;
};

/* ---------- Helpers ---------- */
function fromDays(days: number) { const d = new Date(); d.setUTCDate(d.getUTCDate() - days); return d.toISOString(); }
function anonFromToken(token: string) { const a = (token?.[0] ?? 'A').toUpperCase(); const b = (token?.[1] ?? 'B').toUpperCase(); return { initials: `${a}.${b}.`, name: `${a}.${b}.` }; }
function severityFromEndopain(g: number | null): 'low' | 'medium' | 'high' { if (g == null) return 'low'; if (g >= 40) return 'high'; if (g >= 20) return 'medium'; return 'low'; }
function normalizeSessionJoin(s: PatientRow['sessions'] | null): { public_token: string; created_at: string } | null {
  if (!s) return null; return Array.isArray(s) ? (s[0] ?? null) : s as { public_token: string; created_at: string };
}

/* ---------- Public API ---------- */
export function getDoctorDataSource() {
  return {
    async getMetrics(range: DateRange): Promise<MetricsSummary> {
      const since = fromDays(range.days);
      const { data, error } = await supa.from('session_scores').select('parts, computed_at').gte('computed_at', since).order('computed_at', { ascending: false });
      if (error) throw new Error(`metrics query failed: ${error.message}`);
      const rows = (data ?? []) as MetricsRow[];

      let completedAll = 0, part1Only = 0, pvvqContinued = 0;
      for (const r of rows) {
        const p = r.parts ?? {}; const p1 = p.part1 === true; const p2 = p.part2 === true; const p3 = p.part3 === true;
        if (p1) completedAll += 1; if (p1 && !p2 && !p3) part1Only += 1; if (p3) pvvqContinued += 1;
      }
      const conversionRatePct = completedAll ? (pvvqContinued / completedAll) * 100 : 0;
      return { completedAll, part1Only, pvvqContinued, conversionRatePct };
    },

    async getPatients(range: DateRange): Promise<PatientLike[]> {
      const since = fromDays(range.days);
      const { data, error } = await supa.from('session_scores')
        .select('session_id, endopain_global, computed_at, sessions!inner(public_token, created_at)')
        .gte('computed_at', since)
        .order('computed_at', { ascending: false })
        .limit(12);
      if (error) throw new Error(`patients query failed: ${error.message}`);

      const rows = (data ?? []) as unknown as PatientRow[];
      const patients: PatientLike[] = rows.map((r) => {
        const sj = normalizeSessionJoin(r.sessions);
        const token = sj?.public_token ?? ''; const { initials, name } = anonFromToken(token);
        const last = sj?.created_at ?? r.computed_at ?? null;
        return { id: r.session_id, initials, name, lastAssessmentAt: last, severity: severityFromEndopain(r.endopain_global), status: 'reviewed', flags: r.endopain_global != null && r.endopain_global >= 40 ? ['PCS+'] : undefined };
      });
      return patients.slice(0, 3);
    },

    /** Analytics: only sessions that completed all 3 parts + best-fit line */
    async getPainQoLTrend(range: DateRange): Promise<TrendPoint[]> {
      const since = fromDays(range.days);
      const { data, error } = await supa
        .from('session_scores')
        .select('endopain_global, pvvq_total, computed_at, parts')
        .contains('parts', { part1: true, part2: true, part3: true })
        .not('endopain_global', 'is', null)
        .not('pvvq_total', 'is', null)
        .gte('computed_at', since)
        .order('computed_at', { ascending: true })
        .limit(500);

      if (error) throw new Error(`trend query failed: ${error.message}`);

      const scatter: TrendPoint[] = (data ?? [])
        .filter((r: { endopain_global: number; pvvq_total: number }) => typeof r.endopain_global === 'number' && typeof r.pvvq_total === 'number')
        .map((r: { endopain_global: number; pvvq_total: number }) => ({ x: r.endopain_global, y: r.pvvq_total, series: 'data' as const }));

      const model = linearFitXY(scatter.map(({ x, y }) => ({ x, y })));
      const fit: TrendPoint[] = model
        ? [
            { x: 0, y: clamp(model.m * 0 + model.b, 20, 100), series: 'fit' },
            { x: 100, y: clamp(model.m * 100 + model.b, 20, 100), series: 'fit' }
          ]
        : [];

      return [...scatter, ...fit];
    }
  };
}
