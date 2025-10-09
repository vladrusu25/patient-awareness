// src/routes/(admin)/admin/+page.server.ts
import type { PageServerLoad } from './$types.js';
import { requireRole } from '$lib/server/guard.server';
import { getDoctorDataSource } from '$lib/services/admin.server';

const RANGE_PRESETS: Record<string, { labelKey: string; days: number | null }> = {
  all: { labelKey: 'admin.range.all', days: null },
  '30': { labelKey: 'admin.range.last30', days: 30 },
  '7': { labelKey: 'admin.range.last7', days: 7 },
  today: { labelKey: 'admin.range.today', days: 1 }
};
//a
export const load: PageServerLoad = async (event) => {
  requireRole(event.locals, 'admin');

  const rangeKey = event.url.searchParams.get('range') ?? '30';
  const preset = RANGE_PRESETS[rangeKey] ?? RANGE_PRESETS['30'];
  const ds = getDoctorDataSource();

  const range = { key: rangeKey, labelKey: preset.labelKey, days: preset.days } as const;

  const [metrics, points] = await Promise.all([
    ds.getMetrics(range),
    ds.getPainQoLTrend(range)
  ]);

  const ranges = Object.entries(RANGE_PRESETS).map(([key, value]) => ({
    key,
    labelKey: value.labelKey
  }));

  return { metrics, points, rangeKey: range.key, ranges };
};
