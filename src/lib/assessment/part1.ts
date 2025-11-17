import rawPart1 from '$lib/data/endopain.part1.v1.json';
import type { AnswerMap } from './types';

type RawOption = {
  label?: string;
  value?: string;
};

type RawStep = {
  type?: string;
  key?: string;
  prompt?: string;
  options?: RawOption[];
};

export type Part1Question = {
  key: string;
  prompt: string;
  options: { label: string; value: string }[];
  isScale: boolean;
};

function normalizeOptions(step: RawStep): { label: string; value: string }[] {
  if (!Array.isArray(step.options)) return [];
  return step.options
    .map((opt) => {
      const label = typeof opt?.label === 'string' ? opt.label : null;
      const value = typeof opt?.value === 'string' ? opt.value : null;
      if (!label || !value) return null;
      return { label, value };
    })
    .filter((opt): opt is { label: string; value: string } => Boolean(opt));
}

function detectScale(options: { value: string }[]): boolean {
  const values = new Set(options.map((opt) => String(opt.value)));
  return values.has('0') && values.has('10');
}

const RAW_PART1_STEPS = rawPart1 as RawStep[];

export const PART1_QUESTIONS: Part1Question[] = RAW_PART1_STEPS.filter(
  (step): step is RawStep & { key: string; prompt: string } =>
    step?.type !== 'text' && typeof step?.key === 'string' && typeof step?.prompt === 'string'
).map((step) => {
  const options = normalizeOptions(step);
  return {
    key: step.key,
    prompt: step.prompt,
    options,
    isScale: detectScale(options)
  };
});

export const PART1_SCALE_KEYS = PART1_QUESTIONS.filter((q) => q.isScale).map((q) => q.key);
export const PART1_SCALE_KEY_SET = new Set(PART1_SCALE_KEYS);

type Part1SubEntryType = 'yesno' | 'scale';

export type Part1SubEntry = {
  code: string;
  key: string;
  label: string;
  type: Part1SubEntryType;
};

export type Part1Group = {
  entries: Part1SubEntry[];
  noteKey?: string;
  noteFormatter?: (value: string | null) => string | null;
};

export type Part1Section = {
  id: string;
  title: string;
  statusKey?: string;
  statusLabel?: string;
  groups: Part1Group[];
};

const formatPeriodsNote = (raw: string | null) => {
  if (!raw) return null;
  const value = raw.trim().toLowerCase();
  if (value === 'yes') return 'currently has menstrual periods';
  if (value === 'no') return 'currently no menstrual periods';
  return null;
};

export const PART1_SECTIONS: Part1Section[] = [
  {
    id: 'I',
    title: 'Spontaneous pelvic pain',
    groups: [
      {
        noteKey: 'q_periods_currently',
        noteFormatter: formatPeriodsNote,
        entries: [
          { code: '1a', key: 'q1a_severe_period_pain', label: 'Severe period pain', type: 'yesno' },
          { code: '1b', key: 'q1b_severe_period_pain_usual', label: 'Usual intensity', type: 'scale' },
          { code: '1c', key: 'q1c_severe_period_pain_worst', label: 'Worst intensity', type: 'scale' }
        ]
      },
      {
        entries: [
          { code: '2a', key: 'q2a_between_periods_pain', label: 'Severe pain between periods', type: 'yesno' },
          { code: '2b', key: 'q2b_between_periods_pain_usual', label: 'Usual intensity', type: 'scale' },
          { code: '2c', key: 'q2c_between_periods_pain_worst', label: 'Worst intensity', type: 'scale' }
        ]
      },
      {
        entries: [
          { code: '3a', key: 'q3a_pain_very_intense', label: 'Pain unbearable/cannot be ignored', type: 'yesno' },
          { code: '3b', key: 'q3b_pain_very_intense_rating', label: 'Match to description', type: 'scale' }
        ]
      },
      {
        entries: [
          { code: '4a', key: 'q4a_pain_getting_worse', label: 'Pain worsening over the years', type: 'yesno' },
          { code: '4b', key: 'q4b_pain_getting_worse_rating', label: 'Match to description', type: 'scale' }
        ]
      },
      {
        entries: [
          { code: '5a', key: 'q5a_pain_around_period_days', label: 'Pain around period days', type: 'yesno' },
          { code: '5b', key: 'q5b_pain_around_period_days_rating', label: 'Match to description', type: 'scale' }
        ]
      },
      {
        entries: [
          { code: '6a', key: 'q6a_stabbing_pain', label: 'Stabbing pelvic pain episodes', type: 'yesno' },
          { code: '6b', key: 'q6b_stabbing_pain_rating', label: 'Match to description', type: 'scale' }
        ]
      },
      {
        entries: [
          { code: '7a', key: 'q7a_pain_spreads_back', label: 'Pain spreads to lower back', type: 'yesno' },
          { code: '7b', key: 'q7b_pain_spreads_back_rating', label: 'Match to description', type: 'scale' }
        ]
      },
      {
        entries: [
          { code: '8a', key: 'q8a_pain_spreads_legs_hips', label: 'Pain spreads to legs/hips', type: 'yesno' },
          { code: '8b', key: 'q8b_pain_spreads_legs_hips_rating', label: 'Match to description', type: 'scale' }
        ]
      },
      {
        entries: [
          { code: '9a', key: 'q9a_pain_disabling_activities', label: 'Pain disabling daily activities', type: 'yesno' },
          { code: '9b', key: 'q9b_pain_disabling_activities_discomfort', label: 'Daily activity discomfort', type: 'scale' }
        ]
      },
      {
        entries: [
          { code: '10a', key: 'q10a_pain_prevents_moving', label: 'Pain prevents moving/standing', type: 'yesno' },
          { code: '10b', key: 'q10b_pain_prevents_moving_discomfort', label: 'Discomfort from immobility', type: 'scale' }
        ]
      }
    ]
  },
  {
    id: 'II',
    title: 'Pain during sexual intercourse',
    statusKey: 'q_sexually_active',
    statusLabel: 'Sexual activity status',
    groups: [
      {
        entries: [
          { code: '11a', key: 'q11a_deep_intercourse_pain', label: 'Deep internal pain', type: 'yesno' },
          { code: '11b', key: 'q11b_deep_intercourse_pain_usual', label: 'Usual intensity', type: 'scale' },
          { code: '11c', key: 'q11c_deep_intercourse_pain_worst', label: 'Worst intensity', type: 'scale' }
        ]
      },
      {
        entries: [
          { code: '12a', key: 'q12a_position_dependent_pain', label: 'Position-dependent pain', type: 'yesno' },
          { code: '12b', key: 'q12b_position_dependent_pain_rating', label: 'Match to description', type: 'scale' }
        ]
      },
      {
        entries: [
          { code: '13a', key: 'q13a_intercourse_upsetting_pain', label: 'Pain disrupts intercourse', type: 'yesno' },
          { code: '13b', key: 'q13b_intercourse_upsetting_discomfort', label: 'Discomfort score', type: 'scale' }
        ]
      }
    ]
  },
  {
    id: 'III',
    title: 'Bowel pain and symptoms',
    groups: [
      {
        entries: [
          { code: '14a', key: 'q14a_pain_passing_stool_period', label: 'Pain passing stool during period', type: 'yesno' },
          { code: '14b', key: 'q14b_pain_passing_stool_usual', label: 'Usual intensity', type: 'scale' },
          { code: '14c', key: 'q14c_pain_passing_stool_worst', label: 'Worst intensity', type: 'scale' }
        ]
      },
      {
        entries: [
          { code: '15a', key: 'q15a_bowel_spasms_period', label: 'Bowel spasms/cramps', type: 'yesno' },
          { code: '15b', key: 'q15b_bowel_spasms_usual', label: 'Usual intensity', type: 'scale' },
          { code: '15c', key: 'q15c_bowel_spasms_worst', label: 'Worst intensity', type: 'scale' }
        ]
      },
      {
        entries: [
          { code: '16a', key: 'q16a_diarrhoea_constipation_period', label: 'Diarrhoea/constipation during period', type: 'yesno' },
          { code: '16b', key: 'q16b_diarrhoea_constipation_usual', label: 'Usual discomfort', type: 'scale' },
          { code: '16c', key: 'q16c_diarrhoea_constipation_worst', label: 'Worst discomfort', type: 'scale' }
        ]
      }
    ]
  },
  {
    id: 'IV',
    title: 'Other symptoms',
    groups: [
      {
        entries: [
          { code: '17a', key: 'q17a_urination_difficulty_period', label: 'Pain/difficulty when urinating', type: 'yesno' },
          { code: '17b', key: 'q17b_urination_difficulty_usual', label: 'Usual discomfort', type: 'scale' },
          { code: '17c', key: 'q17c_urination_difficulty_worst', label: 'Worst discomfort', type: 'scale' }
        ]
      },
      {
        entries: [
          { code: '18a', key: 'q18a_bladder_pain_period', label: 'Bladder pain/urgency', type: 'yesno' },
          { code: '18b', key: 'q18b_bladder_pain_usual', label: 'Usual discomfort', type: 'scale' },
          { code: '18c', key: 'q18c_bladder_pain_worst', label: 'Worst discomfort', type: 'scale' }
        ]
      },
      {
        entries: [
          { code: '19a', key: 'q19a_sciatica_period', label: 'Sciatica during period', type: 'yesno' },
          { code: '19b', key: 'q19b_sciatica_usual', label: 'Usual discomfort', type: 'scale' },
          { code: '19c', key: 'q19c_sciatica_worst', label: 'Worst discomfort', type: 'scale' }
        ]
      },
      {
        entries: [
          { code: '20a', key: 'q20a_right_shoulder_pain_period', label: 'Right shoulder/rib pain', type: 'yesno' },
          { code: '20b', key: 'q20b_right_shoulder_pain_usual', label: 'Usual intensity', type: 'scale' },
          { code: '20c', key: 'q20c_right_shoulder_pain_worst', label: 'Worst intensity', type: 'scale' }
        ]
      },
      {
        entries: [{ code: '21a', key: 'q21a_difficulty_pregnancy', label: 'Difficulty conceiving', type: 'yesno' }]
      }
    ]
  }
];

type SectionScoreDefinition = {
  key: string;
  sectionId: string;
  title: string;
  scaleKeys: string[];
};

function collectScaleKeys(section: Part1Section | undefined): string[] {
  if (!section) return [];
  const keys: string[] = [];
  for (const group of section.groups) {
    for (const entry of group.entries) {
      if (entry.type === 'scale') keys.push(entry.key);
    }
  }
  return keys;
}

const SECTION_LOOKUP = Object.fromEntries(PART1_SECTIONS.map((section) => [section.id, section]));

export const PART1_SECTION_SCORE_DEFS: SectionScoreDefinition[] = [
  { key: 'pelvicPain', sectionId: 'I', title: 'Spontaneous pelvic pain', scaleKeys: [] },
  { key: 'sexualPain', sectionId: 'II', title: 'Pain during sexual intercourse', scaleKeys: [] },
  { key: 'bowelSymptoms', sectionId: 'III', title: 'Bowel pain and symptoms', scaleKeys: [] },
  { key: 'otherSymptoms', sectionId: 'IV', title: 'Other symptoms', scaleKeys: [] }
].map((def) => ({
  ...def,
  scaleKeys: collectScaleKeys(SECTION_LOOKUP[def.sectionId])
}));

export type Part1SectionScores = Record<string, number | null>;

export function computePart1SectionScores(answers: AnswerMap): Part1SectionScores {
  const result: Part1SectionScores = {};
  for (const def of PART1_SECTION_SCORE_DEFS) {
    let sum = 0;
    let count = 0;
    for (const key of def.scaleKeys) {
      const n = Number(answers[key]);
      if (!Number.isNaN(n)) {
        sum += Math.min(10, Math.max(0, n));
        count += 1;
      }
    }
    result[def.key] = count ? Number((sum / count).toFixed(1)) : null;
  }
  return result;
}
