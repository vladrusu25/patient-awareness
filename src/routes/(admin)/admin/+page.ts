import type { PageLoad } from './$types';
import { getDoctorDataSource } from '$lib/services/admin';

export const load: PageLoad = async () => {
  const ds = getDoctorDataSource();
  const range = { label: 'Last 30 days' }; // extend later

  const [metrics, patients, points] = await Promise.all([
    ds.getMetrics(range), ds.getPatients(range), ds.getPainQoLTrend(range)
  ]);

  return { metrics, patients, points, rangeLabel: range.label };
};
