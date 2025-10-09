import type { Language } from './types';

type RegexRule = {
  pattern: RegExp;
  translate: (lang: Language, match: RegExpExecArray) => string;
};

const EXACT_EN_TO_RU: Record<string, string> = {
  '0 - No pain': '0 - Боли нет',
  '1': '1',
  '2': '2',
  '3': '3',
  '4': '4',
  '5': '5',
  '6': '6',
  '7': '7',
  '8': '8',
  '9': '9',
  '10 - Worst pain': '10 - Сильнейшая боль',
  '10 – Worst pain': '10 - Сильнейшая боль',
  'Always': 'Всегда',
  'Avoidance of social events: 1-5': 'Избегаю социальных мероприятий: 1-5',
  'Avoidance of sport/exercise due to pain: 1-5': 'Избегаю спорта/упражнений из-за боли: 1-5',
  'Concern/fear about future health: 1-5': 'Беспокойство о будущем здоровье: 1-5',
  'Daily activities limited by pain:': 'Ежедневная активность ограничена болью:',
  'Difficulty with family responsibilities: 1-5': 'Трудности с семейными обязанностями: 1-5',
  'Do you have lumbar (lower back) pain?': 'Есть ли у вас боль в пояснице (нижней части спины)?',
  'Do you have menstrual pain?': 'Есть ли у вас менструальная боль?',
  'Do you have pain after sexual intercourse?': 'Болит ли у вас после полового акта?',
  'Do you have pain during sexual intercourse?': 'Болит ли у вас во время полового акта?',
  'Do you have pain on urination?': 'Испытываете ли вы боль при мочеиспускании?',
  'Do you have spontaneous pelvic pain?': 'Есть ли у вас спонтанная тазовая боль?',
  'Excellent work - Part 1 complete!': 'Отлично! Часть 1 завершена.',
  'Feeling anxious/nervous due to pain: 1-5': 'Тревога/нервозность из-за боли: 1-5',
  'Feeling depressed/low due to symptoms: 1-5': 'Упадок настроения из-за симптомов: 1-5',
  'Feeling irritable/short-tempered: 1-5': 'Раздражительность/вспыльчивость: 1-5',
  'Feeling socially isolated: 1-5': 'Чувство социальной изоляции: 1-5',
  "Great job - Part 3 complete! We're preparing your full report.": 'Отличная работа — часть 3 завершена! Мы готовим полный отчёт.',
  'Household activities limited by pain: 1-5': 'Домашние дела ограничены из-за боли: 1-5',
  "I'm here to understand your pelvic pain so we can guide next steps. This is quick and private. Let's begin.": 'Я здесь, чтобы разобраться в вашей тазовой боли и подсказать дальнейшие шаги. Это быстро и конфиденциально. Начнём.',
  'If yes: Intensity (0-10)': 'Если да: интенсивность (0–10)',
  'Intensity (0-10)': 'Интенсивность (0–10)',
  'Intensity (0–10)': 'Интенсивность (0–10)',
  'It only takes a minute and helps doctors spot patterns early.': 'Это занимает всего минуту и помогает врачам заметить закономерности заранее.',
  'It takes ~2-3 minutes and really strengthens your report.': 'Это занимает около 2–3 минут и значительно усиливает ваш отчёт.',
  'Limitation of sexual life: 1-5': 'Ограничения в сексуальной жизни: 1-5',
  'Lower abdominal pain (second half of cycle): 1-5': 'Боль в нижней части живота (вторая половина цикла): 1-5',
  'Missed work or school due to pain:': 'Пропуски работы или учёбы из-за боли:',
  'Need for frequent rest periods: 1-5': 'Необходимость частого отдыха: 1-5',
  'Never': 'Никогда',
  'No': 'Нет',
  'Often': 'Часто',
  'Pain affecting sexual life:': 'Боль влияет на сексуальную жизнь:',
  'Pain affecting social/family life:': 'Боль влияет на социальную и семейную жизнь:',
  'Pain during prolonged sitting: 1-5': 'Боль при длительном сидении: 1-5',
  'Pain during/after sexual intercourse: 1-5': 'Боль во время/после полового акта: 1-5',
  'Pain improves when lying down?': 'Боль уменьшается в положении лёжа?',
  'Pain in lumbar/sacral/inguinal area after exertion: 1-5': 'Боль в пояснично-крестцовой/паховой области после нагрузки: 1-5',
  'Pain with bowel movement during menstruation?': 'Есть ли боль при дефекации во время менструации?',
  'Pain with bowel movement outside menstruation?': 'Есть ли боль при дефекации вне менструации?',
  'Pain worsens when standing/walking long periods?': 'Боль усиливается при длительном стоянии или ходьбе?',
  'Painkillers for pelvic pain (past month):': 'Обезболивающие от тазовой боли (за последний месяц):',
  'Part 2 is a quick 5-question screen for pelvic vein involvement (PCS).': 'Часть 2 — короткий скрининг из 5 вопросов на вовлечение тазовых вен (PCS).',
  'Part 3 is the PVVQ (20 items). It shows how pain affects daily life.': 'Часть 3 — опросник PVVQ (20 пунктов), показывающий, как боль влияет на повседневную жизнь.',
  'Pelvic heaviness/pressure at end of day?': 'Чувствуете ли тяжесть/давление в тазу к концу дня?',
  'Pelvic pain > 6 months?': 'Боль в тазу более 6 месяцев?',
  'Reduced ability to perform daily physical activity: 1-5': 'Снижена способность к повседневной физической активности: 1-5',
  'Reduced self-esteem/confidence: 1-5': 'Сниженная самооценка/уверенность: 1-5',
  'Sometimes': 'Иногда',
  'Strain in personal relationships: 1-5': 'Напряжение в личных отношениях: 1-5',
  'Tenderness in perineum/vulvar region: 1-5': 'Чувствительность в области промежности/вульвы: 1-5',
  'Unsure': 'Не уверен(а)',
  'Varicose veins in vulva/buttocks/thighs?': 'Есть ли варикоз в области вульвы/ягодиц/бёдер?',
  'Work/professional activities limited: 1-5': 'Работа/профессиональная деятельность ограничены: 1-5',
  'Yes': 'Да',
  "You're doing well - keep going!": 'Вы отлично справляетесь — продолжайте!',
  'Hi! Before we begin, have you completed this questionnaire before?': 'Привет! Вы уже проходили этот опрос раньше?',
  'Are you new here or do you have a Patient ID?': 'Вы здесь впервые или у вас есть идентификатор пациента?',
  "I'm new": 'Я здесь впервые',
  'I have a Patient ID': 'У меня есть идентификатор пациента',
  "We don't collect personal details. Your Patient ID only links your own assessments.": 'Мы не собираем персональные данные. Ваш идентификатор пациента используется только для ваших оценок.',
  "Enter your Patient ID so we can link to your previous assessments (example: A12345).": 'Введите идентификатор пациента, чтобы связать данные с предыдущими оценками (например, A12345).',
  'A12345': 'A12345',
  'Nice progress - Part 2 is just 5 quick questions that help identify pelvic vein involvement.': 'Отличный прогресс — часть 2 включает всего 5 вопросов и помогает выявить вовлечение тазовых вен.',
  "Great! I've created your Patient ID. Please save it. You'll use it next time to see your progress.": 'Отлично! Я создал ваш идентификатор пациента. Сохраните его — он понадобится в следующий раз, чтобы увидеть ваш прогресс.',
  'Would you like to continue with Part 2 (PCS screening)?': 'Хотите продолжить и пройти часть 2 (скрининг PCS)?',
  'Great work - Part 3 (PVVQ) takes about 2-3 minutes and really strengthens your report.': 'Прекрасно! Часть 3 (PVVQ) занимает около 2–3 минут и значительно усиливает ваш отчёт.',
  'Would you like to continue with Part 3 (PVVQ)?': 'Хотите продолжить и пройти часть 3 (PVVQ)?',
  "Thanks - you've completed everything needed for now.": 'Спасибо — на этом всё.',
  "We're preparing your PDF report next.": 'Сейчас мы подготовим ваш PDF-отчёт.',
  "It takes ~2–3 minutes and really strengthens your report.": 'Это занимает около 2–3 минут и значительно усиливает ваш отчёт.',
  "Excellent work — Part 1 complete!": 'Отличная работа — часть 1 завершена!',
  "Great job — Part 3 complete! We’re preparing your full report.": 'Отличная работа — часть 3 завершена! Мы готовим полный отчёт.',
  "You’re doing well — keep going!": 'Вы отлично справляетесь — продолжайте!',
  "Great! I’ve created your Patient ID. Please save it. You’ll use it next time to see your progress.": 'Отлично! Я создал ваш идентификатор пациента. Сохраните его — он понадобится в следующий раз, чтобы увидеть ваш прогресс.',
  "We don’t collect personal details. Your Patient ID only links your own assessments.": 'Мы не собираем персональные данные. Ваш идентификатор пациента используется только для ваших оценок.',
  '10 â€“ Worst pain': '10 – самая сильная боль',
};

const REGEX_RULES: RegexRule[] = [
  {
    pattern: /^Patient ID: (.+) [-–—] save or take a screenshot\.$/,
    translate: (lang, match) => {
      if (lang === 'ru') {
        return `Идентификатор пациента: ${match[1]} — сохраните его или сделайте скриншот.`;
      }
      return match[0];
    }
  },
  {
    pattern: /^Thanks! We['’]ve linked your previous results. Patient ID (.+) is all set [-–—] let's continue\.$/,
    translate: (lang, match) => {
      if (lang === 'ru') {
        return `Спасибо! Мы связали ваши предыдущие результаты. Идентификатор ${match[1]} готов — продолжим.`;
      }
      return match[0];
    }
  }
];

export function translateAssessmentText(text: string, lang: Language): string {
  if (lang === 'ru') {
    const exact = EXACT_EN_TO_RU[text];
    if (exact) return exact;
    for (const rule of REGEX_RULES) {
      const match = rule.pattern.exec(text);
      if (match) return rule.translate(lang, match);
    }
  }
  return text;
}

function cloneStep<T>(step: T): T {
  return JSON.parse(JSON.stringify(step));
}

export function translateStep<T extends { type?: string }>(step: T, lang: Language): T {
  if (lang === 'en') return step;
  const copy: any = cloneStep(step);

  if (Array.isArray(copy.bot)) {
    copy.bot = copy.bot.map((line: string) => translateAssessmentText(line, lang));
  }
  if (typeof copy.prompt === 'string') {
    copy.prompt = translateAssessmentText(copy.prompt, lang);
  }
  if (typeof copy.placeholder === 'string') {
    copy.placeholder = translateAssessmentText(copy.placeholder, lang);
  }
  if (Array.isArray(copy.options)) {
    copy.options = copy.options.map((opt: any) => {
      if (typeof opt === 'string') {
        return translateAssessmentText(opt, lang);
      }
      if (opt && typeof opt.label === 'string') {
        return { ...opt, label: translateAssessmentText(opt.label, lang) };
      }
      return opt;
    });
  }
  return copy;
}

export function translateSteps<T extends { type?: string }>(steps: T[], lang: Language): T[] {
  if (lang === 'en') return steps;
  return steps.map((step) => translateStep(step, lang));
}
