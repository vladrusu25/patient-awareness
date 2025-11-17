// src/lib/assessment/labels.ts

/** ---------------- Part 2 (PCS screening) ---------------- */
export const PCS_ITEMS: Array<[key: string, label: string]> = [
  ['q22_pain_worse_standing', 'Pain worsens when standing/walking long periods'],
  ['q23_pain_improves_lying', 'Pain improves when lying down'],
  ['q24_pelvic_heaviness_end_day', 'Pelvic heaviness/pressure at end of day'],
  ['q25_varicose_vulva_buttocks_thighs', 'Varicose veins in vulva/buttocks/thighs'],
  ['q26_pelvic_pain_6months', 'Pelvic pain > 6 months']
];

/** ---------------- Part 3 (PVVQ) ---------------- */
export const PVVQ_ORDER: string[] = [
  'q27_lower_abdominal_pain',
  'q28_pain_during_intercourse',
  'q29_sitting_pain',
  'q30_lumbosacral_inguinal_exertion_pain',
  'q31_perineum_vulvar_tenderness',
  'q32_household_activities_limit',
  'q33_work_activities_limit',
  'q34_reduced_physical_activity',
  'q35_avoid_sport_exercise',
  'q36_need_frequent_rest',
  'q37_avoid_social_events',
  'q38_family_responsibilities_difficult',
  'q39_limitation_of_sexual_life',
  'q40_feeling_socially_isolated',
  'q41_strain_personal_relationships',
  'q42_feeling_anxious_due_to_pain',
  'q43_feeling_depressed_symptoms',
  'q44_concern_about_future_health',
  'q45_feeling_irritable_short_tempered',
  'q46_reduced_self_esteem'
];

export const PVVQ_LABELS: Record<string, string> = {
  q27_lower_abdominal_pain: 'Lower abdominal pain (second half of cycle)',
  q28_pain_during_intercourse: 'Pain during/after sexual intercourse',
  q29_sitting_pain: 'Pain during prolonged sitting',
  q30_lumbosacral_inguinal_exertion_pain: 'Pain in lumbar/sacral/inguinal area after exertion',
  q31_perineum_vulvar_tenderness: 'Tenderness in perineum/vulvar region',

  q32_household_activities_limit: 'Household activities limited by pain',
  q33_work_activities_limit: 'Work/professional activities limited',
  q34_reduced_physical_activity: 'Reduced ability to perform daily physical activity',
  q35_avoid_sport_exercise: 'Avoidance of sport/exercise due to pain',
  q36_need_frequent_rest: 'Need for frequent rest periods',

  q37_avoid_social_events: 'Avoidance of social events',
  q38_family_responsibilities_difficult: 'Difficulty with family responsibilities',
  q39_limitation_of_sexual_life: 'Limitation of sexual life',
  q40_feeling_socially_isolated: 'Feeling socially isolated',
  q41_strain_personal_relationships: 'Strain in personal relationships',

  q42_feeling_anxious_due_to_pain: 'Feeling anxious/nervous due to pain',
  q43_feeling_depressed_symptoms: 'Feeling depressed/low due to symptoms',
  q44_concern_about_future_health: 'Concern/fear about future health',
  q45_feeling_irritable_short_tempered: 'Feeling irritable/short-tempered',
  q46_reduced_self_esteem: 'Reduced self-esteem/confidence'
};
