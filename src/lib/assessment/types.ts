export type AnswerMap = Record<string, unknown>;

export type LabelKey =
  | 'q1' | 'q3' | 'q5' | 'q7' | 'q9' | 'q11' | 'q13' | 'q15'
  | 'q17' | 'q18' | 'q19' | 'q20' | 'q21';

export type Pair = [ynKey: string, intensityKey: string, labelKey: LabelKey];

export type LikertValue = 'never' | 'sometimes' | 'often' | 'always';
