export type Severity = 'low' | 'medium' | 'high';
export type ReviewStatus = 'new' | 'pending' | 'reviewed';

export interface Patient {
  id: string;
  initials: string;            // “S.J.”
  lastAssessmentAt: Date | null;
  severity: Severity | null;
  status: ReviewStatus;        // new | pending | reviewed
}

export interface CohortMetrics {
  completedAll: number;
  part1Only: number;
  pvvqContinued: number;
  conversionRatePct: number;   // 0…100
}

export interface DateRange {
  label: string;               // e.g. "Last 30 days"
  from?: Date;
  to?: Date;
}

export interface ChartPoint {
  x: number; // ENDOPAIN global 0..100
  y: number; // PVVQ 0..100
  series: 'pre' | 'post';
}
