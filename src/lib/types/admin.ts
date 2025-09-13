export type Severity = 'low' | 'medium' | 'high';
export type ReviewStatus = 'new' | 'reviewed' | 'pending';

export type PatientLike = {
  id: string;
  initials: string;
  name: string;
  // allow ISO string or Date (or null) from the DB/join
  lastAssessmentAt: string | Date | null;
  severity: 'low' | 'medium' | 'high';
  status: 'new' | 'pending' | 'reviewed';
  flags?: string[];
};

export type MetricsSummary = {
  completedAll: number;
  part1Only: number;
  pvvqContinued: number;
  conversionRatePct: number;
};

export type TrendPoint = { x: number; y: number; series: 'pre' | 'post' };

export type DateRange = { label: string; days: number };
