import type { Language } from '$lib/i18n/types';
import { PCS_ITEMS, PVVQ_LABELS } from './labels';

type ReportLocale = {
  summaryTitle: string;
  headers: {
    assessmentId: string;
    patientId: string;
    doctorName?: string;
    generated: string;
    patientNotProvided: string;
  };
  bool: {
    yes: string;
    no: string;
    unsure: string;
    na: string;
  };
  partTitles: {
    part1: string;
    part2: string;
    part3: string;
  };
  part3Interpretation: string;
  pcsLabels: Record<string, string>;
  pvvqLabels: Record<string, string>;
  scoring: {
    part1: (score: number, max: number) => string;
    part2: (count: number, yesWord: string) => string;
    part3: (total: number) => string;
  };
  formatPart3Value: (value: string) => string;
};

const PCS_LABELS_EN = Object.fromEntries(PCS_ITEMS) as Record<string, string>;
const PVVQ_LABELS_EN = PVVQ_LABELS;


const HR_PCS_LABELS: Record<string, string> = {
  q22_pain_worse_standing: 'Bol se pogoršava pri dugotrajnom stajanju ili hodanju',
  q23_pain_improves_lying: 'Bol se smanjuje pri ležanju',
  q24_pelvic_heaviness_end_day: 'Osjećaj težine/pritiska u zdjelici na kraju dana',
  q25_varicose_vulva_buttocks_thighs: 'Proširene vene na vulvi, stražnjici ili bedrima',
  q26_pelvic_pain_6months: 'Bol u zdjelici dulja od 6 mjeseci'
};

const HR_PVVQ_LABELS: Record<string, string> = {
  q27_lower_abdominal_pain: 'Bol u donjem dijelu trbuha (druga polovica ciklusa)',
  q28_pain_during_intercourse: 'Bol tijekom/nakon spolnog odnosa',
  q29_sitting_pain: 'Bol tijekom dugotrajnog sjedenja',
  q30_lumbosacral_inguinal_exertion_pain: 'Bol u lumbalnom/sakralnom/ingvinalnom području nakon napora',
  q31_perineum_vulvar_tenderness: 'Osjetljivost u perineumu/vulvarnoj regiji',
  q32_household_activities_limit: 'Kućanski poslovi ograničeni zbog boli',
  q33_work_activities_limit: 'Radne/profesionalne aktivnosti ograničene',
  q34_reduced_physical_activity: 'Smanjena sposobnost obavljanja svakodnevne tjelesne aktivnosti',
  q35_avoid_sport_exercise: 'Izbjegavanje sporta/tjelovježbe zbog boli',
  q36_need_frequent_rest: 'Potreba za čestim razdobljima odmora',
  q37_avoid_social_events: 'Izbjegavanje društvenih događanja',
  q38_family_responsibilities_difficult: 'Poteškoće s obiteljskim obvezama',
  q39_limitation_of_sexual_life: 'Ograničenje seksualnog života',
  q40_feeling_socially_isolated: 'Osjećaj društvene izoliranosti',
  q41_strain_personal_relationships: 'Napetost u osobnim odnosima',
  q42_feeling_anxious_due_to_pain: 'Osjećaj tjeskobe/nervoze zbog boli',
  q43_feeling_depressed_symptoms: 'Osjećaj potištenosti zbog simptoma',
  q44_concern_about_future_health: 'Zabrinutost/strah za buduće zdravlje',
  q45_feeling_irritable_short_tempered: 'Osjećaj razdražljivosti/kratkog temperamenta',
  q46_reduced_self_esteem: 'Smanjeno samopoštovanje/samopouzdanje'
};


const SK_PCS_LABELS: Record<string, string> = {
  q22_pain_worse_standing: 'Bolesť sa zhoršuje pri dlhom státí alebo chôdzi',
  q23_pain_improves_lying: 'Bolesť ustupuje v ľahu',
  q24_pelvic_heaviness_end_day: 'Pocit ťažoby/tlaku v panve na konci dňa',
  q25_varicose_vulva_buttocks_thighs: 'Kŕčové žily na vulve, zadku alebo stehnách',
  q26_pelvic_pain_6months: 'Bolesť panvy dlhšia ako 6 mesiacov'
};

const SK_PVVQ_LABELS: Record<string, string> = {
  q27_lower_abdominal_pain: 'Bolesť v podbrušku (druhá polovica cyklu)',
  q28_pain_during_intercourse: 'Bolesť počas alebo po pohlavnom styku',
  q29_sitting_pain: 'Bolesť pri dlhom sedení',
  q30_lumbosacral_inguinal_exertion_pain: 'Bolesť v driekovej/sakrálnej/trieslovej oblasti po námahe',
  q31_perineum_vulvar_tenderness: 'Citlivosť v hrádzi alebo vo vulve',
  q32_household_activities_limit: 'Domáce práce obmedzené bolesťou',
  q33_work_activities_limit: 'Pracovné/profesijné aktivity obmedzené',
  q34_reduced_physical_activity: 'Znížená schopnosť vykonávať každodennú fyzickú aktivitu',
  q35_avoid_sport_exercise: 'Vyhýbanie sa športu/cvičeniu kvôli bolesti',
  q36_need_frequent_rest: 'Potreba častých prestávok na oddych',
  q37_avoid_social_events: 'Vyhýbanie sa spoločenským udalostiam',
  q38_family_responsibilities_difficult: 'Ťažkosti s rodinnými povinnosťami',
  q39_limitation_of_sexual_life: 'Obmedzenie sexuálneho života',
  q40_feeling_socially_isolated: 'Pocit spoločenskej izolácie',
  q41_strain_personal_relationships: 'Napätie v osobných vzťahoch',
  q42_feeling_anxious_due_to_pain: 'Pocit úzkosti/nervozity kvôli bolesti',
  q43_feeling_depressed_symptoms: 'Pocit depresie kvôli symptómom',
  q44_concern_about_future_health: 'Obavy/strach o budúce zdravie',
  q45_feeling_irritable_short_tempered: 'Pocit podráždenosti/krátka trpezlivosť',
  q46_reduced_self_esteem: 'Znížené sebavedomie/sebaúcta'
};


const RU_PCS_LABELS: Record<string, string> = {
  q22_pain_worse_standing: 'Боль усиливается при длительном стоянии/ходьбе',
  q23_pain_improves_lying: 'Боль уменьшается лёжа',
  q24_pelvic_heaviness_end_day: 'Чувство тяжести/давления в тазу к концу дня',
  q25_varicose_vulva_buttocks_thighs: 'Варикозное расширение вен вульвы/ягодиц/бёдер',
  q26_pelvic_pain_6months: 'Тазовая боль более 6 месяцев'
};
const KZ_PCS_LABELS: Record<string, string> = {
  q22_pain_worse_standing: 'Ұзақ уақыт тұрғанда немесе жүргенде ауырсыну күшейеді',
  q23_pain_improves_lying: 'Жатқанда ауырсыну жеңілдейді',
  q24_pelvic_heaviness_end_day: 'Күн соңында жамбас аймағында ауырлық/қысым сезімі',
  q25_varicose_vulva_buttocks_thighs: 'Вульвада, бөкседе немесе санында көк тамырлардың пайда болуы',
  q26_pelvic_pain_6months: 'Жамбас ауыруы 6 айдан артық'
};

const RU_PVVQ_LABELS: Record<string, string> = {
  q27_lower_abdominal_pain: 'Боль в нижней части живота (вторая половина цикла)',
  q28_pain_during_intercourse: 'Боль во время/после полового акта',
  q29_sitting_pain: 'Боль при длительном сидении',
  q30_lumbosacral_inguinal_exertion_pain: 'Боль в пояснично-крестцовой/паховой области после нагрузки',
  q31_perineum_vulvar_tenderness: 'Чувствительность в области промежности/вульвы',
  q32_household_activities_limit: 'Боль ограничивает домашние дела',
  q33_work_activities_limit: 'Боль ограничивает работу/проф. деятельность',
  q34_reduced_physical_activity: 'Снижение возможности выполнять физическую активность',
  q35_avoid_sport_exercise: 'Избегание спорта/упражнений из-за боли',
  q36_need_frequent_rest: 'Нужда в частом отдыхе',
  q37_avoid_social_events: 'Избегание социальных мероприятий',
  q38_family_responsibilities_difficult: 'Сложности с семейными обязанностями',
  q39_limitation_of_sexual_life: 'Ограничение половой жизни',
  q40_feeling_socially_isolated: 'Ощущение социальной изоляции',
  q41_strain_personal_relationships: 'Напряжённость в личных отношениях',
  q42_feeling_anxious_due_to_pain: 'Тревога/нервозность из-за боли',
  q43_feeling_depressed_symptoms: 'Пониженное настроение из-за симптомов',
  q44_concern_about_future_health: 'Беспокойство о будущем здоровье',
  q45_feeling_irritable_short_tempered: 'Раздражительность/вспыльчивость',
  q46_reduced_self_esteem: 'Пониженная самооценка/уверенность'
};
const KZ_PVVQ_LABELS: Record<string, string> = {
  q27_lower_abdominal_pain: 'Төменгі іш аймағындағы ауырсыну (циклдің екінші жартысы)',
  q28_pain_during_intercourse: 'Жыныстық қатынас кезінде/кейінгі ауырсыну',
  q29_sitting_pain: 'Ұзақ отыру кезіндегі ауырсыну',
  q30_lumbosacral_inguinal_exertion_pain: 'Күш түскеннен кейін бел, сегізкөз немесе шап аймағындағы ауырсыну',
  q31_perineum_vulvar_tenderness: 'Аралық және вульва аймағындағы сезімталдық/ауырсыну',
  q32_household_activities_limit: 'Үй шаруасындағы белсенділікті ауырсыну шектейді',
  q33_work_activities_limit: 'Жұмыс/кәсіби белсенділікті ауырсыну шектейді',
  q34_reduced_physical_activity: 'Күнделікті физикалық белсенділікті орындау қабілетінің төмендеуі',
  q35_avoid_sport_exercise: 'Ауырсынуға байланысты спорт/жаттығудан бас тарту',
  q36_need_frequent_rest: 'Жиі демалуға мұқтаждық',
  q37_avoid_social_events: 'Әлеуметтік шаралардан бас тарту',
  q38_family_responsibilities_difficult: 'Отбасылық міндеттерді орындаудағы қиындықтар',
  q39_limitation_of_sexual_life: 'Жыныстық өмірдің шектелуі',
  q40_feeling_socially_isolated: 'Әлеуметтік оқшаулануды сезіну',
  q41_strain_personal_relationships: 'Жеке қарым-қатынастардағы шиеленіс',
  q42_feeling_anxious_due_to_pain: 'Ауырсынуға байланысты мазасыздану/жүйке кернеуі',
  q43_feeling_depressed_symptoms: 'Симптомдарға байланысты көңіл-күйдің түсуі',
  q44_concern_about_future_health: 'Болашақ денсаулық туралы алаңдау/қорқыныш',
  q45_feeling_irritable_short_tempered: 'Тітіркенгіштік/ашушаңдық',
  q46_reduced_self_esteem: 'Өзін-өзі бағалау/сенімнің төмендеуі'
};






const LOCALES: Record<Language, ReportLocale> = {
  en: {
    summaryTitle: 'Health Assessment Summary',
    headers: {
      assessmentId: 'Assessment ID',
      patientId: 'Patient ID',
      doctorName: 'Doctor',
      generated: 'Generated',
      patientNotProvided: 'Not provided'
    },
    bool: {
      yes: 'Yes',
      no: 'No',
      unsure: 'Unsure',
      na: 'N/A'
    },
    partTitles: {
      part1: 'Part 1. ENDOPAIN-4D',
      part2: 'Part 2. PCS Screening (5 items)',
      part3: 'Part 3. Pelvic Varicose Veins Questionnaire (PVVQ, 20 items)'
    },
    part3Interpretation:
      'Lower totals indicate better quality of life. PVVQ (20 items) total is interpreted as: 20 – best quality of life; 21–40 – mild impairment; 41–60 – moderate impairment; 61–80 – severe impairment; 81–100 – very severe impairment.',
    pcsLabels: PCS_LABELS_EN,
    pvvqLabels: PVVQ_LABELS_EN,
    scoring: {
      part1: (score, max) => `ENDOPAIN-4D Part 1 total score: ${score} / ${max}`,
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
    partTitles: {
      part1: 'Часть 1. ENDOPAIN-4D',
      part2: 'Часть 2. Скрининг PCS (5 вопросов)',
      part3: 'Часть 3. Опросник PVVQ (20 вопросов)'
    },
    part3Interpretation:
      'Чем ниже суммарный балл, тем лучше качество жизни пациента. Суммарный балл по 20 вопросам PVVQ интерпретируется так: 20 — наивысшее качество жизни; 21–40 — лёгкое ухудшение качества жизни; 41–60 — умеренное ухудшение качества жизни; 61–80 — тяжёлое ухудшение качества жизни; 81–100 — грубое нарушение качества жизни.',
    pcsLabels: RU_PCS_LABELS,
    pvvqLabels: RU_PVVQ_LABELS,
    scoring: {
      part1: (score, max) => `Суммарный балл ENDOPAIN-4D, часть 1: ${score} / ${max}`,
      part2: (count, yesWord) =>
        `Врачебная оценка (PCS положительный при 2 или более ответах "${yesWord}"): ${count} ${yesWord}`,
      part3: (total) => `Врачебная оценка (PVVQ, суммарный балл 20-100): ${total}`
    },
    formatPart3Value: (value) => (value ? `${value} из 5` : 'Нет данных')
  },
  kz: {
    summaryTitle: 'Денсаулық бағалауының қысқаша есебі',
    headers: {
      assessmentId: 'Бағалау ID',
      patientId: 'Пациент ID',
      generated: 'Жасалған күні',
      patientNotProvided: 'Көрсетілмеген'
    },
    bool: {
      yes: 'Иә',
      no: 'Жоқ',
      unsure: 'Нақты емес',
      na: 'Қолданылмайды'
    },
    partTitles: {
      part1: '1-бөлім. ENDOPAIN-4D',
      part2: '2-бөлім. PCS скринингі (5 сұрақ)',
      part3: '3-бөлім. Жамбас көктамыр сауалнамасы (PVVQ, 20 сұрақ)'
    },
    part3Interpretation:
      'Ұпай неғұрлым төмен болса, өмір сапасы соғұрлым жоғары. PVVQ (20 сұрақ) бойынша жалпы ұпай былай түсіндіріледі: 20 – ең жоғары өмір сапасы; 21–40 – жеңіл төмендеу; 41–60 – орташа төмендеу; 61–80 – айқын төмендеу; 81–100 – өте қатты төмендеу.',
    pcsLabels: KZ_PCS_LABELS,
    pvvqLabels: KZ_PVVQ_LABELS,
    scoring: {
      part1: (score, max) => `ENDOPAIN-4D 1-бөлімінің жалпы балы: ${score} / ${max}`,
      part2: (count, yesWord) =>
        `Дәрігерлік баға (PCS оң деп саналады, егер ${yesWord} жауаптары ≥2 болса): ${count} ${yesWord}`,
      part3: (total) => `Дәрігерлік баға (PVVQ, 20-100): ${total}`
    },
    formatPart3Value: (value) => (value ? `${value}/5` : 'Қолданылмайды')
  },
  hr: {
    summaryTitle: 'Sažetak zdravstvene procjene',
    headers: {
      assessmentId: 'ID procjene',
      patientId: 'ID pacijenta',
      generated: 'Generirano',
      patientNotProvided: 'Nije navedeno'
    },
    bool: {
      yes: 'Da',
      no: 'Ne',
      unsure: 'Nisam sigurna',
      na: 'N/P'
    },
    partTitles: {
      part1: 'Dio 1. ENDOPAIN-4D',
      part2: 'Dio 2. PCS probir (5 pitanja)',
      part3: 'Dio 3. Upitnik o varikozitetima zdjelice (PVVQ, 20 pitanja)'
    },
    part3Interpretation:
      'Niži ukupni rezultat znači bolju kvalitetu života. Zbroj PVVQ (20 stavki) tumači se ovako: 20 – najbolja kvaliteta života; 21–40 – blago narušena; 41–60 – umjereno narušena; 61–80 – teško narušena; 81–100 – izrazito teško narušena.',
    pcsLabels: HR_PCS_LABELS,
    pvvqLabels: HR_PVVQ_LABELS,
    scoring: {
      part1: (score, max) => `ENDOPAIN-4D, dio 1 – ukupni rezultat: ${score} / ${max}`,
      part2: (count, yesWord) =>
        `Rezultat (PCS probir; pozitivan je ako su najmanje 2 odgovora "${yesWord}"): ${count} ${yesWord}`,
      part3: (total) => `Rezultat (PVVQ, raspon 20-100): ${total}`
    },
    formatPart3Value: (value) => (value ? `${value}/5` : 'N/P')
  },
  sk: {
    summaryTitle: 'Súhrn zdravotného hodnotenia',
    headers: {
      assessmentId: 'ID hodnotenia',
      patientId: 'ID pacienta',
      generated: 'Vygenerované',
      patientNotProvided: 'Neuvádzané'
    },
    bool: {
      yes: 'Áno',
      no: 'Nie',
      unsure: 'Neisté',
      na: 'N/A'
    },
    partTitles: {
      part1: 'Časť 1. ENDOPAIN-4D',
      part2: 'Časť 2. Skríning PCS (5 otázok)',
      part3: 'Časť 3. Dotazník panvových varixov (PVVQ, 20 otázok)'
    },
    part3Interpretation:
      'Nižší celkový výsledok znamená lepšiu kvalitu života. Súčet PVVQ (20 položiek) interpretujeme takto: 20 – najlepšia kvalita života; 21–40 – mierne zhoršená; 41–60 – stredne zhoršená; 61–80 – výrazne zhoršená; 81–100 – závažné zhoršenie.',
    pcsLabels: SK_PCS_LABELS,
    pvvqLabels: SK_PVVQ_LABELS,
    scoring: {
      part1: (score, max) => `ENDOPAIN-4D, časť 1 – celkové skóre: ${score} / ${max}`,
      part2: (count, yesWord) =>
        `Skóre (skríning PCS; pozitívny pri aspoň 2 odpovediach "${yesWord}"): ${count} ${yesWord}`,
      part3: (total) => `Skóre (PVVQ, rozsah 20-100): ${total}`
    },
    formatPart3Value: (value) => (value ? `${value}/5` : 'N/A')
  }
};

export function getReportLocale(lang: Language): ReportLocale {
  return LOCALES[lang] ?? LOCALES.en;
}
