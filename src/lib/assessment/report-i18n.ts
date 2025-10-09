import type { Language } from '$lib/i18n/types';
import { LABELS, PCS_ITEMS, PVVQ_LABELS } from './labels';
import type { LabelKey, LikertValue } from './types';

type LikertTranslations = Record<LikertValue, string>;

type ReportLocale = {
  summaryTitle: string;
  headers: {
    assessmentId: string;
    patientId: string;
    generated: string;
    patientNotProvided: string;
  };
  bool: {
    yes: string;
    no: string;
    unsure: string;
    na: string;
  };
  likert: LikertTranslations;
  partTitles: {
    part1: string;
    part2: string;
    part3: string;
  };
  part3Interpretation: string;
  part1Labels: Record<LabelKey, string>;
  pcsLabels: Record<string, string>;
  pvvqLabels: Record<string, string>;
  scoring: {
    part1: (score: number) => string;
    part2: (count: number, yesWord: string) => string;
    part3: (total: number) => string;
  };
  formatPart3Value: (value: string) => string;
};

const PCS_LABELS_EN = Object.fromEntries(PCS_ITEMS) as Record<string, string>;
const PVVQ_LABELS_EN = PVVQ_LABELS;

const RU_PART1_LABELS: Record<LabelKey, string> = {
  q1: 'Спонтанная тазовая боль',
  q3: 'Менструальная боль',
  q5: 'Боль во время полового акта',
  q7: 'Боль после полового акта',
  q9: 'Боль при дефекации во время менструации',
  q11: 'Боль при дефекации вне менструации',
  q13: 'Боль при мочеиспускании',
  q15: 'Боль в пояснице',
  q17: 'Обезболивающие от тазовой боли (последний месяц)',
  q18: 'Пропуски работы или учебы из-за боли',
  q19: 'Боль ограничивает повседневную активность',
  q20: 'Боль влияет на интимную жизнь',
  q21: 'Боль влияет на социальную/семейную жизнь'
};

const RU_PCS_LABELS: Record<string, string> = {
  q22_pain_worse_standing: 'Боль усиливается при длительном стоянии или ходьбе',
  q23_pain_improves_lying: 'Боль уменьшается в положении лежа',
  q24_pelvic_heaviness_end_day: 'Чувство тяжести или давления в тазу к концу дня',
  q25_varicose_vulva_buttocks_thighs: 'Варикозные вены в области вульвы, ягодиц или бедер',
  q26_pelvic_pain_6months: 'Тазовая боль более 6 месяцев'
};

const RU_PVVQ_LABELS: Record<string, string> = {
  q27_lower_abdominal_pain: 'Боль внизу живота (во второй половине цикла)',
  q28_pain_during_intercourse: 'Боль во время или после полового акта',
  q29_sitting_pain: 'Боль при длительном сидении',
  q30_lumbosacral_inguinal_exertion_pain: 'Боль в пояснично-крестцовой или паховой области после нагрузки',
  q31_perineum_vulvar_tenderness: 'Чувствительность в промежности или области вульвы',
  q32_household_activities_limit: 'Боль ограничивает бытовую активность',
  q33_work_activities_limit: 'Боль ограничивает работу или профессиональную активность',
  q34_reduced_physical_activity: 'Снижена способность к повседневной физической активности',
  q35_avoid_sport_exercise: 'Из-за боли избегаю спорта или упражнений',
  q36_need_frequent_rest: 'Необходимость часто отдыхать',
  q37_avoid_social_events: 'Из-за боли избегаю социальных мероприятий',
  q38_family_responsibilities_difficult: 'Сложно выполнять семейные обязанности',
  q39_limitation_of_sexual_life: 'Ограничение интимной жизни',
  q40_feeling_socially_isolated: 'Чувство социальной изоляции',
  q41_strain_personal_relationships: 'Напряжение в личных отношениях',
  q42_feeling_anxious_due_to_pain: 'Тревога или нервозность из-за боли',
  q43_feeling_depressed_symptoms: 'Подавленность из-за симптомов',
  q44_concern_about_future_health: 'Тревога за здоровье в будущем',
  q45_feeling_irritable_short_tempered: 'Раздражительность или вспыльчивость',
  q46_reduced_self_esteem: 'Сниженная самооценка или уверенность'
};

const LIKERT_EN: LikertTranslations = {
  never: 'Never',
  sometimes: 'Sometimes',
  often: 'Often',
  always: 'Always'
};

const LIKERT_RU: LikertTranslations = {
  never: 'Никогда',
  sometimes: 'Иногда',
  often: 'Часто',
  always: 'Всегда'
};

const LOCALES: Record<Language, ReportLocale> = {
  en: {
    summaryTitle: 'Health Assessment Summary',
    headers: {
      assessmentId: 'Assessment ID',
      patientId: 'Patient ID',
      generated: 'Generated',
      patientNotProvided: 'Not provided'
    },
    bool: {
      yes: 'Yes',
      no: 'No',
      unsure: 'Unsure',
      na: 'N/A'
    },
    likert: LIKERT_EN,
    partTitles: {
      part1: 'Part 1. ENDOPAIN-4D',
      part2: 'Part 2. PCS Screening (5 items)',
      part3: 'Part 3. Pelvic Varicose Veins Questionnaire (PVVQ, 20 items)'
    },
    part3Interpretation:
      'Lower totals indicate better quality of life. PVVQ (20 items) total is interpreted as: 20 – best quality of life; 21–40 – mild impairment; 41–60 – moderate impairment; 61–80 – severe impairment; 81–100 – very severe impairment.',
    part1Labels: LABELS,
    pcsLabels: PCS_LABELS_EN,
    pvvqLabels: PVVQ_LABELS_EN,
    scoring: {
      part1: (score) => `Physician scoring (ENDOPAIN-4D Global Score, 0-100): ${score}/100`,
      part2: (count, yesWord) =>
        `Physician scoring (PCS positive if >=2 ${yesWord}): ${count} ${yesWord}`,
      part3: (total) => `Physician scoring (PVVQ Total, 20-100): ${total}`
    },
    formatPart3Value: (value) => (value ? `${value}/5` : 'N/A')
  },
  ru: {
    summaryTitle: 'Итоговый отчет оценки здоровья',
    headers: {
      assessmentId: 'ID оценки',
      patientId: 'ID пациента',
      generated: 'Создано',
      patientNotProvided: 'Не указано'
    },
    bool: {
      yes: 'Да',
      no: 'Нет',
      unsure: 'Не уверен(а)',
      na: 'Нет данных'
    },
    likert: LIKERT_RU,
    partTitles: {
      part1: 'Часть 1. ENDOPAIN-4D',
      part2: 'Часть 2. Скрининг PCS (5 вопросов)',
      part3: 'Часть 3. Опросник PVVQ (20 вопросов)'
    },
    part3Interpretation:
      'Чем ниже суммарный балл, тем лучше качество жизни пациента. Суммарный балл по 20 вопросам PVVQ интерпретируется так: 20 — наивысшее качество жизни; 21–40 — лёгкое ухудшение качества жизни; 41–60 — умеренное ухудшение качества жизни; 61–80 — тяжёлое ухудшение качества жизни; 81–100 — грубое нарушение качества жизни.',
    part1Labels: RU_PART1_LABELS,
    pcsLabels: RU_PCS_LABELS,
    pvvqLabels: RU_PVVQ_LABELS,
    scoring: {
      part1: (score) => `Врачебная оценка (ENDOPAIN-4D, общий балл 0-100): ${score}/100`,
      part2: (count, yesWord) =>
        `Врачебная оценка (PCS положительный при 2 или более ответах "${yesWord}"): ${count} ${yesWord}`,
      part3: (total) => `Врачебная оценка (PVVQ, суммарный балл 20-100): ${total}`
    },
    formatPart3Value: (value) => (value ? `${value} из 5` : 'Нет данных')
  }
};

export function getReportLocale(lang: Language): ReportLocale {
  return LOCALES[lang] ?? LOCALES.en;
}
