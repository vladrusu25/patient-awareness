import type { PageServerLoad } from './$types';
import { getDoctorDataSource } from '$lib/services/admin.server';

export const load: PageServerLoad = async () => {
  const ds = getDoctorDataSource();

  // You can wire the range selector later
  const range = { label: 'Last 30 days', days: 30 as const };

  const [metrics, patients, points] = await Promise.all([
    ds.getMetrics(range),
    ds.getPatients(range),
    ds.getPainQoLTrend(range)
  ]);

  return {
    metrics,
    patients,         // <- PatientsPanel remains unchanged
    points,
    rangeLabel: range.label
  };
};
