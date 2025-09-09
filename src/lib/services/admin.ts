/* eslint-disable @typescript-eslint/no-unused-vars */
import type { CohortMetrics, DateRange, Patient, ChartPoint } from '$lib/types/admin';

export interface DoctorDataSource {
  getMetrics(range: DateRange): Promise<CohortMetrics>;
  getPatients(range: DateRange): Promise<Patient[]>;
  getPainQoLTrend(range: DateRange): Promise<ChartPoint[]>;
}

/** Replace this with a Supabase-backed impl later – UI won’t change */
class DemoDoctorDataSource implements DoctorDataSource {
  async getMetrics(_range: DateRange): Promise<CohortMetrics> {
    return {
      completedAll: 247,
      part1Only: 189,
      pvvqContinued: 156,
      conversionRatePct: 82.5,
    };
  }

  async getPatients(_range: DateRange): Promise<Patient[]> {
    const now = new Date();
    return [
      {
        id: 'p1',
        initials: 'S.J.',
        lastAssessmentAt: now,
        severity: 'high',
        status: 'reviewed',
      },
      {
        id: 'p2',
        initials: 'M.Ch.',
        lastAssessmentAt: new Date(now.getTime() - 8 * 3600 * 1000),
        severity: 'medium',
        status: 'pending',
      },
      {
        id: 'p3',
        initials: 'E.D.',
        lastAssessmentAt: new Date(now.getTime() - 2 * 86400 * 1000),
        severity: 'low',
        status: 'new',
      },
    ];
  }

  async getPainQoLTrend(_range: DateRange): Promise<ChartPoint[]> {
    // Tiny demo scatter
    const pts: ChartPoint[] = [];
    for (let i = 0; i < 14; i++) pts.push({ x: 20 + i * 5, y: 25 + i * 3, series: 'pre' });
    for (let i = 0; i < 14; i++) pts.push({ x: 25 + i * 5, y: 35 + i * 3.6, series: 'post' });
    return pts;
  }
}

let instance: DoctorDataSource | null = null;
export function getDoctorDataSource(): DoctorDataSource {
  if (!instance) instance = new DemoDoctorDataSource();
  return instance;
}
