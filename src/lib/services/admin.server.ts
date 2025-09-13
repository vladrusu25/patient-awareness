import { supa } from '$lib/server/supabase';
import type { DateRange, MetricsSummary, PatientLike, TrendPoint } from '$lib/types/admin';

/* ---------- Row types by query ---------- */

// For metrics (we only need `parts`)
type MetricsRow = {
  parts: { part1?: boolean; part2?: boolean; part3?: boolean } | null;
  computed_at: string;
};

// For patients panel list (need endopain + joined session info)
type PatientRow = {
  session_id: string;
  endopain_global: number | null;
  computed_at: string;
  // Supabase join can come back as an object or an array depending on the relation metadata.
  sessions:
    | { public_token: string; created_at: string }
    | { public_token: string; created_at: string }[]
    | null;
};

// For analytics trend preview (need both scores)
type TrendRow = {
  endopain_global: number | null;
  pvvq_total: number | null;
  computed_at: string;
};

/* ---------- Helpers ---------- */

function fromDays(days: number) {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - days);
  return d.toISOString();
}

/** A tiny anonymizer since we don't store PII */
function anonFromToken(token: string): { initials: string; name: string } {
  const a = (token?.[0] ?? 'A').toUpperCase();
  const b = (token?.[1] ?? 'B').toUpperCase();
  const initials = `${a}.${b}.`;
  return { initials, name: `${a}.${b}.` };
}

function severityFromEndopain(g: number | null): 'low' | 'medium' | 'high' {
  if (g == null) return 'low';
  if (g >= 40) return 'high';
  if (g >= 20) return 'medium';
  return 'low';
}

/** Normalize the sessions join into a single object or null */
function normalizeSessionJoin(
  s:
    | PatientRow['sessions']
    | {
        public_token?: string;
        created_at?: string;
      }
    | null
): { public_token: string; created_at: string } | null {
  if (!s) return null;
  if (Array.isArray(s)) return s[0] ?? null;
  return s as any;
}

/* ---------- Public API ---------- */

export function getDoctorDataSource() {
  return {
    /** KPI tiles */
    async getMetrics(range: DateRange): Promise<MetricsSummary> {
      const since = fromDays(range.days);

      const { data, error } = await supa
        .from('session_scores')
        .select('parts, computed_at')
        .gte('computed_at', since)
        .order('computed_at', { ascending: false });

      if (error) throw new Error(`metrics query failed: ${error.message}`);

      const rows = (data ?? []) as MetricsRow[];

      let completedAll = 0;
      let part1Only = 0;
      let pvvqContinued = 0;

      for (const r of rows) {
        const p = r.parts ?? {};
        const p1 = p.part1 === true;
        const p2 = p.part2 === true;
        const p3 = p.part3 === true;

        if (p1) completedAll += 1;
        if (p1 && !p2 && !p3) part1Only += 1;
        if (p3) pvvqContinued += 1;
      }

      const conversionRatePct = completedAll ? (pvvqContinued / completedAll) * 100 : 0;

      return {
        completedAll,
        part1Only,
        pvvqContinued,
        conversionRatePct
      };
    },

    /** Left quadrant list – keeps your current PatientsPanel API */
    async getPatients(range: DateRange): Promise<PatientLike[]> {
      const since = fromDays(range.days);

      const { data, error } = await supa
        .from('session_scores')
        .select('session_id, endopain_global, computed_at, sessions!inner(public_token, created_at)')
        .gte('computed_at', since)
        .order('computed_at', { ascending: false })
        .limit(12);

      if (error) throw new Error(`patients query failed: ${error.message}`);

      const rows = (data ?? []) as unknown as PatientRow[];

      const patients: PatientLike[] = rows.map((r) => {
        const sj = normalizeSessionJoin(r.sessions);
        const token = sj?.public_token ?? '';
        const { initials, name } = anonFromToken(token);
        const last = sj?.created_at ?? r.computed_at ?? null;

        return {
          id: r.session_id,
          initials,
          name,
          lastAssessmentAt: last,
          severity: severityFromEndopain(r.endopain_global),
          status: 'reviewed', // adjust if you add review status later
          flags: r.endopain_global != null && r.endopain_global >= 40 ? ['PCS+'] : undefined
        };
      });

      return patients.slice(0, 3);
    },

    /** Right quadrant preview chart – ENDOPAIN (x) vs PVVQ (y) */
    async getPainQoLTrend(range: DateRange): Promise<TrendPoint[]> {
      const since = fromDays(range.days);

      const { data, error } = await supa
        .from('session_scores')
        .select('endopain_global, pvvq_total, computed_at')
        .not('endopain_global', 'is', null)
        .not('pvvq_total', 'is', null)
        .gte('computed_at', since)
        .order('computed_at', { ascending: true })
        .limit(120);

      if (error) throw new Error(`trend query failed: ${error.message}`);

      const rows = (data ?? []) as TrendRow[];

      const points: TrendPoint[] = rows
        .filter((r) => typeof r.endopain_global === 'number' && typeof r.pvvq_total === 'number')
        .map((r) => ({
          x: r.endopain_global as number,
          y: r.pvvq_total as number,
          series: 'pre'
        }));

      return points;
    }
  };
}
