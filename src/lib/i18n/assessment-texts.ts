import type { Language } from './types';

type RegexRule = {
  pattern: RegExp;
  translate: (lang: Language, match: RegExpExecArray) => string;
};

const EXACT_EN_TO_RU: Record<string, string> = {
  '1': '1',
  '2': '2',
  '3': '3',
  '4': '4',
  '5': '5',
  '6': '6',
  '7': '7',
  '8': '8',
  '9': '9',
  '0 - No pain': '0 - Боли нет',
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
  'Great job - Part 3 complete! We\'re preparing your full report.': 'Отличная работа — часть 3 завершена! Мы готовим полный отчёт.',
  'Household activities limited by pain: 1-5': 'Домашние дела ограничены из-за боли: 1-5',
  'I\'m here to understand your pelvic pain so we can guide next steps. This is quick and private. Let\'s begin.': 'Я здесь, чтобы разобраться в вашей тазовой боли и подсказать дальнейшие шаги. Это быстро и конфиденциально. Начнём.',
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
  'You\'re doing well - keep going!': 'Вы отлично справляетесь — продолжайте!',
  'Hi! Before we begin, are you new here or do you have a Patient ID?': 'Привет! Вы здесь впервые или у вас есть идентификатор пациента?',
  'I\'m new': 'Я здесь впервые',
  'I have a Patient ID': 'У меня есть идентификатор пациента',
  'We don\'t collect personal details. Your Patient ID only links your own assessments.': 'Мы не собираем персональные данные. Ваш идентификатор пациента используется только для ваших оценок.',
  'Enter your Patient ID so we can link to your previous assessments (example: A12345).': 'Введите идентификатор пациента, чтобы связать данные с предыдущими оценками (например, A12345).',
  'A12345': 'A12345',
  'Nice progress - Part 2 is just 5 quick questions that help identify pelvic vein involvement.': 'Отличный прогресс — часть 2 включает всего 5 вопросов и помогает выявить вовлечение тазовых вен.',
  'Great! I\'ve created your Patient ID. Please save it. You\'ll use it next time to see your progress.': 'Отлично! Я создал ваш идентификатор пациента. Сохраните его — он понадобится в следующий раз, чтобы увидеть ваш прогресс.',
  'Would you like to continue and see if pelvic congestion syndrome (PCS) might be affecting you?': 'Хотите продолжить и узнать, есть ли у вас подозрение на синдром тазового венозного застоя?',
  'Great work - Part 3 (PVVQ) takes about 2-3 minutes and really strengthens your report.': 'Прекрасно! Часть 3 (PVVQ) занимает около 2–3 минут и значительно усиливает ваш отчёт.',
  'Would you like to continue and understand how pelvic pain is impacting your daily life (PVVQ)?': 'Хотите продолжить и понять, как тазовая боль влияет на вашу повседневную жизнь (PVVQ)?',
  'Thanks - you\'ve completed everything needed for now.': 'Спасибо — на этом всё.',
  'We\'re preparing your PDF report next.': 'Сейчас мы подготовим ваш PDF-отчёт.',
  'It takes ~2–3 minutes and really strengthens your report.': 'Это занимает около 2–3 минут и значительно усиливает ваш отчёт.',
  'Excellent work — Part 1 complete!': 'Отличная работа — часть 1 завершена!',
  'Great job — Part 3 complete! We’re preparing your full report.': 'Отличная работа — часть 3 завершена! Мы готовим полный отчёт.',
  'You’re doing well — keep going!': 'Вы отлично справляетесь — продолжайте!',
  'Great! I’ve created your Patient ID. Please save it. You’ll use it next time to see your progress.': 'Отлично! Я создал ваш идентификатор пациента. Сохраните его — он понадобится в следующий раз, чтобы увидеть ваш прогресс.',
  'We don’t collect personal details. Your Patient ID only links your own assessments.': 'Мы не собираем персональные данные. Ваш идентификатор пациента используется только для ваших оценок.',
  '10 â€“ Worst pain': '10 – самая сильная боль'
};

const EXACT_EN_TO_KZ: Record<string, string> = {
  '1': '1',
  '2': '2',
  '3': '3',
  '4': '4',
  '5': '5',
  '6': '6',
  '7': '7',
  '8': '8',
  '9': '9',
  '0 - No pain': '0 - ауырсыну жоқ',
  '10 - Worst pain': '10 - ең жаман ауырсыну',
  '10 – Worst pain': '10 - ең жаман ауырсыну',
  'Always': 'Әрқашан',
  'Avoidance of social events: 1-5': 'Әлеуметтік шаралардың алдын алу: 1-5',
  'Avoidance of sport/exercise due to pain: 1-5': 'Ауырсыну салдарынан спорт / жаттығудан аулақ болу: 1-5',
  'Concern/fear about future health: 1-5': 'Болашақ денсаулық туралы алаңдаушылық / қорқыныш: 1-5',
  'Daily activities limited by pain:': 'Күнделікті іс-шаралар ауырсынумен шектелген:',
  'Difficulty with family responsibilities: 1-5': 'Отбасы міндеттерімен қиындық: 1-5',
  'Do you have lumbar (lower back) pain?': 'Сізде (төменгі арқа) ауырсыну бар ма?',
  'Do you have menstrual pain?': 'Сізде етеккір бар ма?',
  'Do you have pain after sexual intercourse?': 'Сізде жыныстық қатынасқа түскеннен кейін ауырсыну бар ма?',
  'Do you have pain during sexual intercourse?': 'Сізде жыныстық қатынас кезінде ауырсыну бар ма?',
  'Do you have pain on urination?': 'Сізде зәр шығару кезінде ауырсыну бар ма?',
  'Do you have spontaneous pelvic pain?': 'Сізде өз риясыз жамбас ауырсыну керек пе?',
  'Excellent work - Part 1 complete!': 'Тамаша жұмыс - 1 бөлім аяқталды!',
  'Feeling anxious/nervous due to pain: 1-5': 'Ауырсыну салдарынан алаңдаушылық / жүйке сезінуі: 1-5',
  'Feeling depressed/low due to symptoms: 1-5': 'Симптомдарға байланысты депрессияға ұшыраған / төмен сезіну: 1-5',
  'Feeling irritable/short-tempered: 1-5': 'Тұрқындық / қысқа сезіну: 1-5',
  'Feeling socially isolated: 1-5': 'Әлеуметтік оқшауланған сезім: 1-5',
  'Great job - Part 3 complete! We\'re preparing your full report.': 'Тамаша жұмыс - 3 бөлім аяқталды! Біз сіздің толық есеп дайындаймыз.',
  'Household activities limited by pain: 1-5': 'Тұрмыстық белсенділік Ауырсынумен шектелген: 1-5',
  'I\'m here to understand your pelvic pain so we can guide next steps. This is quick and private. Let\'s begin.': 'Мен сіздің жамбасыңыздың ауырсынуын түсінуге келдім, сондықтан біз келесі қадамдарды бағыттай аламыз. Бұл тез және жеке. Бастайық.',
  'If yes: Intensity (0-10)': 'Егер иә болса: қарқындылық (0-10)',
  'Intensity (0-10)': 'Қарқындылық (0-10)',
  'Intensity (0–10)': 'Қарқындылық (0-10)',
  'It only takes a minute and helps doctors spot patterns early.': 'Ол тек бір минутты алады және дәрігерлерге ерте тұруға көмектеседі.',
  'It takes ~2-3 minutes and really strengthens your report.': 'Ол ~ 2-3 минут кетеді және сіздің есебіңізді шынымен де жақсартады.',
  'Limitation of sexual life: 1-5': 'Жыныстық өмірді шектеу: 1-5',
  'Lower abdominal pain (second half of cycle): 1-5': 'Іштің төменгі ауыруы (циклдің екінші жартысы): 1-5',
  'Missed work or school due to pain:': 'Ауырғандықтан жұмыс істемеген жұмыс немесе мектеп:',
  'Need for frequent rest periods: 1-5': 'Жиі демалу кезеңі қажет: 1-5',
  'Never': 'Ешқашан',
  'No': 'Жоқ',
  'Often': 'Жиі',
  'Pain affecting sexual life:': 'Жыныстық өмірге әсер ететін ауырсыну:',
  'Pain affecting social/family life:': 'Әлеуметтік / отбасылық өмірге әсер ететін ауырсыну:',
  'Pain during prolonged sitting: 1-5': 'Ұзақ отыру кезінде ауырсыну: 1-5',
  'Pain during/after sexual intercourse: 1-5': 'Жыныстық қатынас кезінде / кейінгі ауырсыну: 1-5',
  'Pain improves when lying down?': 'Жалған кезде ауырсыну жақсарады ма?',
  'Pain in lumbar/sacral/inguinal area after exertion: 1-5': 'Лумбардағы ауырсыну / сакральды / ішек аймағындағы ауырсынудан кейін: 1-5',
  'Pain with bowel movement during menstruation?': 'Менструация кезінде ішектің қозғалысы бар ауырсыну?',
  'Pain with bowel movement outside menstruation?': 'Менструациядан тыс ішек қозғалысы бар ауырсыну?',
  'Pain worsens when standing/walking long periods?': 'Ауырсыну ұзақ уақыт жүру / жүру кезінде нашарлайды?',
  'Painkillers for pelvic pain (past month):': 'Жамбас ауыруы үшін ауырсыну құралдары (өткен ай):',
  'Part 2 is a quick 5-question screen for pelvic vein involvement (PCS).': '2-бөлім - бұл жамбас венасын тартуға арналған 5 сұраққа арналған 5 сұрақ.',
  'Part 3 is the PVVQ (20 items). It shows how pain affects daily life.': '3-бөлім - pvvq (20 зат). Бұл аурудың күнделікті өмірге қалай әсер ететінін көрсетеді.',
  'Pelvic heaviness/pressure at end of day?': 'Күннің соңындағы жамбасша ауырлық / қысым?',
  'Pelvic pain > 6 months?': 'Жамбас ауыруы> 6 ай?',
  'Reduced ability to perform daily physical activity: 1-5': 'Күнделікті физикалық белсенділікті арттыру мүмкіндігі: 1-5',
  'Reduced self-esteem/confidence: 1-5': 'Өзін-өзі бағалау / сенімділік: 1-5',
  'Sometimes': 'Кейде',
  'Strain in personal relationships: 1-5': 'Жеке қарым-қатынаста штамм: 1-5',
  'Tenderness in perineum/vulvar region: 1-5': 'Пернеумдағы нәзіктік / Вульвар аймағы: 1-5',
  'Unsure': 'Сенімсіз',
  'Varicose veins in vulva/buttocks/thighs?': 'Валлвадағы вульвадағы валска / жамбас па?',
  'Work/professional activities limited: 1-5': 'Жұмыс / кәсіби қызмет шектеулі: 1-5',
  'Yes': 'Иә',
  'You\'re doing well - keep going!': 'Сіз жақсы жұмыс істеп жатырсыз - жалғастырыңыз!',
  'Hi! Before we begin, are you new here or do you have a Patient ID?': 'Сәлем! Бастаудан бұрын, сіз осында жаңа болсаңыз немесе сізде пациент идентификаторы бар ма?',
  'I\'m new': 'Мен жаңамын',
  'I have a Patient ID': 'Менде пациент идентификаторы бар',
  'We don\'t collect personal details. Your Patient ID only links your own assessments.': 'Біз жеке мәліметтер жинаймыз. Сіздің пациент идентификаторыңыз сіздің жеке бағалауларыңызды ғана байланыстырады.',
  'Enter your Patient ID so we can link to your previous assessments (example: A12345).': 'Алдыңғы бағалауларыңызға сілтеме жасай отырып, пациент идентификаторын енгізіңіз (мысалы: A12345).',
  'A12345': 'A12345',
  'Nice progress - Part 2 is just 5 quick questions that help identify pelvic vein involvement.': 'Жақсы прогресс - 2-бөлім - жамбас тамырына тартуды анықтауға көмектесетін 5 жылдам сұрақтар.',
  'Great! I\'ve created your Patient ID. Please save it. You\'ll use it next time to see your progress.': 'Керемет! Мен пациент идентификаторын жаратып кеттім. Өтінемін, оны сақтаңыз. Сіз оны келесі жолы қолдануға болады.',
  'Would you like to continue and see if pelvic congestion syndrome (PCS) might be affecting you?': 'Сіз жалғастырғыңыз келеді және жамбас бітім синдромы (дана) сізге әсер етуі мүмкін бе?',
  'Great work - Part 3 (PVVQ) takes about 2-3 minutes and really strengthens your report.': 'Керемет жұмыс - 3-бөлім (PVVQ) шамамен 2-3 минутты алады және сіздің есебіңізді шынымен нығайтады.',
  'Would you like to continue and understand how pelvic pain is impacting your daily life (PVVQ)?': 'Жамбастың ауырсынуының күнделікті өміріне қалай әсер ететінін және қалай түскіңіз келеді?',
  'Thanks - you\'ve completed everything needed for now.': 'Рахмет - Сіз қазір қажет нәрсенің бәрін аяқтадыңыз.',
  'We\'re preparing your PDF report next.': 'Келесіде біз сіздің PDF туралы есепті келесіде дайындаймыз.',
  'It takes ~2–3 minutes and really strengthens your report.': 'Ол ~ 2-3 минут кетеді және сіздің есебіңізді шынымен де жақсартады.',
  'Excellent work — Part 1 complete!': 'Тамаша жұмыс - 1 бөлім аяқталды!',
  'Great job — Part 3 complete! We’re preparing your full report.': 'Тамаша жұмыс - 3 бөлім аяқталды! Біз сіздің толық есеп дайындаймыз.',
  'You’re doing well — keep going!': 'Сіз жақсы жұмыс істеп жатырсыз - жалғастырыңыз!',
  'Great! I’ve created your Patient ID. Please save it. You’ll use it next time to see your progress.': 'Керемет! Мен пациент идентификаторын жаратып кеттім. Өтінемін, оны сақтаңыз. Сіз оны келесі жолы қолдануға болады.',
  'We don’t collect personal details. Your Patient ID only links your own assessments.': 'Біз жеке мәліметтер жинаймыз. Сіздің пациент идентификаторыңыз сіздің жеке бағалауларыңызды ғана байланыстырады.',
  '10 â€“ Worst pain': '10 € «ең жаман ауырсыну'
};

const EXACT_TRANSLATIONS: Record<Exclude<Language, 'en'>, Record<string, string>> = {
  ru: EXACT_EN_TO_RU,
  kz: EXACT_EN_TO_KZ
};

const REGEX_RULES: RegexRule[] = [
  {
    pattern: /^Patient ID: (.+) — save or take a screenshot\.$/,
    translate: (lang, match) => {
      if (lang === 'ru') {
        return `Идентификатор пациента: ${match[1]} — сохраните его или сделайте скриншот.`;
      }
      if (lang === 'kz') {
        return `Пациент ID: ${match[1]} — сақтап қойыңыз немесе скриншот жасаңыз.`;
      }
      return match[0];
    }
  },
  {
    pattern: /^Thanks! We['']ve linked your previous results. Patient ID (.+) is all set — let's continue\.$/,
    translate: (lang, match) => {
      if (lang === 'ru') {
        return `Спасибо! Мы связали ваши предыдущие результаты. Идентификатор пациента ${match[1]} готов — продолжаем.`;
      }
      if (lang === 'kz') {
        return `Рахмет! Алдыңғы нәтижелеріңізді байланыстырдық. Пациент ID ${match[1]} дайын — жалғастырайық.`;
      }
      return match[0];
    }
  }
];

export function translateAssessmentText(text: string, lang: Language): string {
  if (lang === 'en') return text;
  const exactMap = EXACT_TRANSLATIONS[lang as Exclude<Language, 'en'>];
  if (exactMap) {
    const exact = exactMap[text];
    if (exact) return exact;
  }
  for (const rule of REGEX_RULES) {
    const match = rule.pattern.exec(text);
    if (match) return rule.translate(lang, match);
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
