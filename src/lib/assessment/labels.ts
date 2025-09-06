import type { LabelKey, Pair } from './types';

export const LABELS: Record<LabelKey, string> = {
  q1:  'Spontaneous pelvic pain',
  q3:  'Menstrual pain',
  q5:  'Pain during sexual intercourse',
  q7:  'Pain after sexual intercourse',
  q9:  'Pain with bowel movement during menstruation',
  q11: 'Pain with bowel movement outside menstruation',
  q13: 'Pain with urination',
  q15: 'Lumbar (lower back) pain',
  q17: 'Painkillers for pelvic pain (past month)',
  q18: 'Missed work or school due to pain',
  q19: 'Daily activities limited by pain',
  q20: 'Pain affecting sexual life',
  q21: 'Pain affecting social/family life'
};

export const PAIRS: Pair[] = [
  ['q1_spontaneous_pelvic_pain', 'q2_spontaneous_pelvic_intensity', 'q1'],
  ['q3_menstrual_pain',          'q4_menstrual_intensity',          'q3'],
  ['q5_dyspareunia_pain',        'q6_dyspareunia_intensity',        'q5'],
  ['q7_postcoital_pain',         'q8_postcoital_intensity',         'q7'],
  ['q9_bowel_menses_pain',       'q10_bowel_menses_intensity',            'q9'],
  ['q11_bowel_outside_pain',     'q12_bowel_outside_intensity',     'q11'],
  ['q13_urination_pain',         'q14_urination_intensity',         'q13'],
  ['q15_lumbar_pain',            'q16_lumbar_intensity',            'q15']
];

export const LIKERT_LABELS: Record<string, string> = {
  never: 'Never',
  sometimes: 'Sometimes',
  often: 'Often',
  always: 'Always'
};

export const LIKERT_KEYS: Array<[key: string, labelKey: LabelKey]> = [
  ['q17_analgesics_freq',     'q17'],
  ['q18_absence_freq',        'q18'],
  ['q19_activities_limit_freq','q19'],
  ['q20_sex_life_impact',     'q20'],
  ['q21_social_family_impact','q21']
];
