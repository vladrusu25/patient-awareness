// src/routes/(admin)/admin/+page.server.ts
import type { PageServerLoad } from './$types.js';
import { requireRole } from '$lib/server/guard.server';
import { getDoctorDataSource } from '$lib/services/admin.server';

export const load: PageServerLoad = async (event) => {
  requireRole(event.locals, 'admin');

  const ds = getDoctorDataSource();
  const range = { label: 'Last 30 days', days: 30 as const };

  const [metrics, patients, points] = await Promise.all([
    ds.getMetrics(range),
    ds.getPatients(range),
    ds.getPainQoLTrend(range)
  ]);

  return { metrics, patients, points, rangeLabel: range.label };
};
