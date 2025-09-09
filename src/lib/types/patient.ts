export type Severity = 'low' | 'medium' | 'high';
export type Status = 'new' | 'reviewed';

export type PatientRow = {
  id: string;
  initials: string;         // e.g. "S.J."
  avatarColor?: string;     // optional bg color
  lastAssessment?: string;  // ISO date; undefined = never
  severity: Severity;
  flags: string[];          // e.g. ['PCS+']
  status: Status;
};
