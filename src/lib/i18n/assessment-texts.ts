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
  '0 - No discomfort': '0 - Дискомфорта нет',
  '0 - No discomfort/pain': '0 - Нет дискомфорта/боли',
  '0 - Not at all like that': '0 - Совсем не похоже',
  '10 - Worst pain': '10 - Сильнейшая боль',
  '10 – Worst pain': '10 - Сильнейшая боль',
  '10 - Exactly like that': '10 - Точно так же',
  '10 - Worst discomfort imaginable': '10 - Наихудший возможный дискомфорт',
  '10 - Worst discomfort/pain imaginable': '10 - Наихудший возможный дискомфорт/боль',
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
  'How would you rate your usual pain during your period? (0-10)': 'Как бы вы оценили свою обычную боль во время менструации? (0–10)',
  'How would you rate your pain at its worst during your period? (0-10)': 'Как бы вы оценили самую сильную боль во время менструации? (0–10)',
  'How would you rate your usual pain between periods? (0-10)': 'Как бы вы оценили обычную боль между менструациями? (0–10)',
  'How would you rate your pain at its worst between periods? (0-10)': 'Как бы вы оценили самую сильную боль между менструациями? (0–10)',
  'How much does this description fit what you feel? (0-10)': 'Насколько это описание соответствует вашим ощущениям? (0–10)',
  'How much discomfort does this cause you in your daily activities? (0-10)': 'Насколько это мешает вашим повседневным делам? (0–10)',
  'How much discomfort does this cause you? (0-10)': 'Насколько сильный дискомфорт это вызывает? (0–10)',
  'How would you rate your usual pain during intercourse? (0-10)': 'Как бы вы оценили обычную боль во время полового акта? (0–10)',
  'How would you rate your pain at its worst during intercourse? (0-10)': 'Как бы вы оценили самую сильную боль во время полового акта? (0–10)',
  'How would you rate your usual pain when passing a stool? (0-10)': 'Как бы вы оценили обычную боль при дефекации? (0–10)',
  'How would you rate your pain at its worst when passing a stool? (0-10)': 'Как бы вы оценили самую сильную боль при дефекации? (0–10)',
  'How would you rate your usual pain from these bowel spasms/cramps? (0-10)': 'Как бы вы оценили обычную боль от этих спазмов/судорог кишечника? (0–10)',
  'How would you rate your pain at its worst from these bowel spasms/cramps? (0-10)': 'Как бы вы оценили самую сильную боль от этих спазмов/судорог кишечника? (0–10)',
  'How would you rate your usual discomfort or pain from this? (0-10)': 'Как бы вы оценили обычный дискомфорт или боль от этого? (0–10)',
  'How would you rate your discomfort or pain at its worst? (0-10)': 'Как бы вы оценили максимальный дискомфорт или боль? (0–10)',
  'How would you rate your usual pain or discomfort when urinating? (0-10)': 'Как бы вы оценили обычную боль или дискомфорт при мочеиспускании? (0–10)',
  'How would you rate your pain or discomfort at its worst when urinating? (0-10)': 'Как бы вы оценили максимальную боль или дискомфорт при мочеиспускании? (0–10)',
  'How would you rate your usual bladder pain or discomfort? (0-10)': 'Как бы вы оценили обычную боль или дискомфорт в мочевом пузыре? (0–10)',
  'How would you rate your bladder pain or discomfort at its worst? (0-10)': 'Как бы вы оценили максимальную боль или дискомфорт в мочевом пузыре? (0–10)',
  'How would you rate your usual pain or discomfort from sciatica? (0-10)': 'Как бы вы оценили обычную боль или дискомфорт от ишиаса? (0–10)',
  'How would you rate your pain or discomfort at its worst from sciatica? (0-10)': 'Как бы вы оценили максимальную боль или дискомфорт от ишиаса? (0–10)',
  'How would you rate your usual pain in this area? (0-10)': 'Как бы вы оценили обычную боль в этой области? (0–10)',
  'How would you rate your pain at its worst in this area? (0-10)': 'Как бы вы оценили максимальную боль в этой области? (0–10)',
  'Over the past few months, have you regularly had severe, violent pain in the lower abdomen during your period?':
    'За последние несколько месяцев у вас регулярно была сильная, резкая боль внизу живота во время менструации?',
  'Over the past few months, have you regularly had severe, violent pain in the lower abdomen between periods?':
    'За последние несколько месяцев у вас регулярно была сильная, резкая боль внизу живота между менструациями?',
  'Is the pain very intense, violent, cannot be ignored, and unbearable?':
    'Боль очень сильная, резкая, её невозможно игнорировать и терпеть?',
  'As the years go by, is your pain getting worse?': 'С годами ваша боль усиливается?',
  'Does the pain come a few days before your period and/or continue for a few days after your period?':
    'Появляется ли боль за несколько дней до менструации и/или сохраняется несколько дней после неё?',
  'Does the pain come and go suddenly, like a stabbing pain?':
    'Появляется ли боль внезапно и исчезает, словно колющая?',
  'Does the pain spread to your lower back?': 'Распространяется ли боль в поясницу?',
  'Does the pain spread to your legs and hips?': 'Распространяется ли боль в ноги и тазобедренную область?',
  'Does the pain become disabling for your everyday activities?': 'Боль мешает выполнять повседневные дела?',
  'Does the pain prevent you from standing, walking, or moving?': 'Боль мешает стоять, ходить или двигаться?',
  'Are you currently sexually active?': 'Вы сейчас сексуально активны?',
  'Do you have severe, sharp, deep internal pain during sexual intercourse?':
    'Испытываете ли вы сильную, острую, глубокую внутреннюю боль во время полового акта?',
  'Do you feel pain in certain positions during sexual intercourse?':
    'Чувствуете ли вы боль в определённых позах во время полового акта?',
  'Does the pain upset, prevent, or interrupt sexual intercourse?': 'Боль мешает, прерывает или делает невозможным половой акт?',
  'Do you have pain when passing a stool, particularly during your period?':
    'Есть ли у вас боль при дефекации, особенно во время менструации?',
  'Do you have spasms, cramps, or bowel pain before a bowel movement, particularly during your period?':
    'Бывают ли у вас спазмы, судороги или боль в кишечнике перед стулом, особенно во время менструации?',
  'Do you have diarrhoea and/or constipation, particularly during your period?':
    'Беспокоят ли вас диарея и/или запор, особенно во время менструации?',
  'Do you have difficulty and/or pain when urinating, particularly during your period?':
    'Испытываете ли вы затруднение и/или боль при мочеиспускании, особенно во время менструации?',
  'Do you have pain in the bladder when you want to urinate or when holding back, particularly during your period?':
    'Есть ли боль в мочевом пузыре, когда хочется мочиться или приходится терпеть, особенно во время менструации?',
  'Do you have sciatica (pain radiating along the sciatic nerve), particularly during your period?':
    'Беспокоит ли вас ишиас (боль по ходу седалищного нерва), особенно во время менструации?',
  'Do you have pain in the right shoulder or under the right rib cage, particularly during your period?':
    'Есть ли боль в правом плече или под правой рёберной дугой, особенно во время менструации?',
  'Have you had difficulty becoming pregnant, or failure to conceive despite trying for several months or years?':
    'Испытывали ли вы трудности с беременностью или безуспешные попытки зачать ребёнка в течение нескольких месяцев или лет?',
  'Do you currently have menstrual periods?': 'Сейчас у вас есть менструации?',
  'Yes, I have periods': 'Да, менструации есть',
  'No, I do not have periods': 'Нет, менструации отсутствуют',
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

const EXACT_EN_TO_HR: Record<string, string> = {
  '1': '1',
  '2': '2',
  '3': '3',
  '4': '4',
  '5': '5',
  '6': '6',
  '7': '7',
  '8': '8',
  '9': '9',
  '0 - No pain': '0 - Nema boli',
  '10 - Worst pain': '10 - Najgora bol',
  '10 – Worst pain': '10 – Najgora bol',
  'Always': 'Uvijek',
  'Avoidance of social events: 1-5': 'Izbjegavanje društvenih događanja: 1-5',
  'Avoidance of sport/exercise due to pain: 1-5': 'Izbjegavanje sporta/tjelovježbe zbog boli: 1-5',
  'Concern/fear about future health: 1-5': 'Zabrinutost/strah za buduće zdravlje: 1-5',
  'Daily activities limited by pain:': 'Dnevne aktivnosti ograničene bolom:',
  'Difficulty with family responsibilities: 1-5': 'Poteškoće s obiteljskim obavezama: 1-5',
  'Do you have lumbar (lower back) pain?': 'Imate li lumbalni (donji dio leđa) bol?',
  'Do you have menstrual pain?': 'Imate li menstrualne bolove?',
  'Do you have pain after sexual intercourse?': 'Imate li bolove nakon spolnog odnosa?',
  'Do you have pain during sexual intercourse?': 'Imate li bolove tijekom spolnog odnosa?',
  'Do you have pain on urination?': 'Imate li bolove pri mokrenju?',
  'Do you have spontaneous pelvic pain?': 'Imate li spontanu bol u zdjelici?',
  'Excellent work - Part 1 complete!': 'Izvrstan rad - 1. dio dovršen!',
  'Feeling anxious/nervous due to pain: 1-5': 'Osjećaj tjeskobe/nervoze zbog boli: 1-5',
  'Feeling depressed/low due to symptoms: 1-5': 'Osjećaj potištenosti/slabosti zbog simptoma: 1-5',
  'Feeling irritable/short-tempered: 1-5': 'Osjećaj razdražljivosti/napadljivosti: 1-5',
  'Feeling socially isolated: 1-5': 'Osjećaj društvene izoliranosti: 1-5',
  'Great job - Part 3 complete! We\'re preparing your full report.': 'Sjajno - treći dio dovršen! Pripremamo vaše potpuno izvješće.',
  'Household activities limited by pain: 1-5': 'Kućanske aktivnosti ograničene bolom: 1-5',
  'I\'m here to understand your pelvic pain so we can guide next steps. This is quick and private. Let\'s begin.': 'Ovdje sam da razumijem vašu bol u zdjelici kako bismo vas mogli uputiti u sljedeće korake.Ovo je brzo i privatno.Počnimo.',
  'If yes: Intensity (0-10)': 'Ako da: Intenzitet (0-10)',
  'Intensity (0-10)': 'Intenzitet (0-10)',
  'Intensity (0–10)': 'Intenzitet (0-10)',
  'It only takes a minute and helps doctors spot patterns early.': 'Traje samo minutu i pomaže liječnicima da rano uoče uzorke.',
  'It takes ~2-3 minutes and really strengthens your report.': 'Traje ~2-3 minute i stvarno ojačava vaše izvješće.',
  'Limitation of sexual life: 1-5': 'Ograničenje spolnog života: 1-5',
  'Lower abdominal pain (second half of cycle): 1-5': 'Bol u donjem dijelu trbuha (druga polovica ciklusa): 1-5',
  'Missed work or school due to pain:': 'Izostanak s posla ili škole zbog boli:',
  'Need for frequent rest periods: 1-5': 'Potreba za čestim odmorima: 1-5',
  'Never': 'Nikada',
  'No': 'Ne',
  'Often': 'Često',
  'Pain affecting sexual life:': 'Bol koja utječe na seksualni život:',
  'Pain affecting social/family life:': 'Bol koja utječe na društveni/obiteljski život:',
  'Pain during prolonged sitting: 1-5': 'Bol tijekom dugotrajnog sjedenja: 1-5',
  'Pain during/after sexual intercourse: 1-5': 'Bol tijekom/nakon spolnog odnosa: 1-5',
  'Pain improves when lying down?': 'Bol se smanjuje kada ležite?',
  'Pain in lumbar/sacral/inguinal area after exertion: 1-5': 'Bol u lumbalnom/sakralnom/ingvinalnom području nakon napora: 1-5',
  'Pain with bowel movement during menstruation?': 'Bolovi kod pražnjenja crijeva tijekom menstruacije?',
  'Pain with bowel movement outside menstruation?': 'Bol kod pražnjenja crijeva izvan menstruacije?',
  'Pain worsens when standing/walking long periods?': 'Bol se pogoršava tijekom dužeg stajanja/hodanja?',
  'Painkillers for pelvic pain (past month):': 'Lijekovi protiv bolova u zdjelici (prošli mjesec):',
  'Part 2 is a quick 5-question screen for pelvic vein involvement (PCS).': 'Drugi dio je brzi pregled s 5 pitanja za provjeru zahvaćenosti zdjeličnih vena (PCS).',
  'Part 3 is the PVVQ (20 items). It shows how pain affects daily life.': 'Dio 3 je PVVQ (20 stavki).Pokazuje kako bol utječe na svakodnevni život.',
  'Pelvic heaviness/pressure at end of day?': 'Težina/pritisak u zdjelici na kraju dana?',
  'Pelvic pain > 6 months?': 'Bol u zdjelici > 6 mjeseci?',
  'Reduced ability to perform daily physical activity: 1-5': 'Smanjena sposobnost obavljanja dnevne tjelesne aktivnosti: 1-5',
  'Reduced self-esteem/confidence: 1-5': 'Smanjeno samopoštovanje/pouzdanje: 1-5',
  'Sometimes': 'Ponekad',
  'Strain in personal relationships: 1-5': 'Napetost u osobnim odnosima: 1-5',
  'Tenderness in perineum/vulvar region: 1-5': 'Osjetljivost u regiji perineuma/vulve: 1-5',
  'Unsure': 'nesigurno',
  'Varicose veins in vulva/buttocks/thighs?': 'Proširene vene na vulvi/stražnjici/bedrima?',
  'Work/professional activities limited: 1-5': 'Ograničene radne/profesionalne aktivnosti: 1-5',
  'Yes': 'Da',
  'You\'re doing well - keep going!': 'Dobro ti ide - samo tako nastavi!',
  'Hi! Before we begin, are you new here or do you have a Patient ID?': 'Bok!Prije nego što počnemo, jeste li novi ovdje ili imate ID pacijenta?',
  'I\'m new': 'nova sam',
  'I have a Patient ID': 'Imam ID pacijenta',
  'We don\'t collect personal details. Your Patient ID only links your own assessments.': 'Ne prikupljamo osobne podatke. Vaš ID pacijenta povezuje samo vaše procjene.',
  'Enter your Patient ID so we can link to your previous assessments (example: A12345).': 'Unesite svoj ID pacijenta kako bismo se mogli povezati s vašim prethodnim procjenama (primjer: A12345).',
  'A12345': 'A12345',
  'Nice progress - Part 2 is just 5 quick questions that help identify pelvic vein involvement.': 'Odličan napredak - dio 2 sadrži samo 5 brzih pitanja koja pomažu prepoznati zahvaćenost zdjeličnih vena.',
  'Great! I\'ve created your Patient ID. Please save it. You\'ll use it next time to see your progress.': 'Odlično! Izradio sam vaš ID pacijenta. Molim vas spremite ga. Sljedeći put ćete ga koristiti kako biste vidjeli svoj napredak.',
  'Would you like to continue and see if pelvic congestion syndrome (PCS) might be affecting you?': 'Želite li nastaviti i vidjeti utječe li možda na vas sindrom zagušenja zdjelice (PCS)?',
  'Great work - Part 3 (PVVQ) takes about 2-3 minutes and really strengthens your report.': 'Sjajan rad - dio 3 (PVVQ) traje oko 2-3 minute i zaista osnažuje vaše izvješće.',
  'Would you like to continue and understand how pelvic pain is impacting your daily life (PVVQ)?': 'Želite li nastaviti i razumjeti kako bol u zdjelici utječe na vaš svakodnevni život (PVVQ)?',
  'Thanks - you\'ve completed everything needed for now.': 'Hvala - dovršili ste sve što je potrebno za sada.',
  'We\'re preparing your PDF report next.': 'Sljedeće pripremamo vaše PDF izvješće.',
  'It takes ~2–3 minutes and really strengthens your report.': 'Traje ~2–3 minute i stvarno osnažuje vaše izvješće.',
  'Excellent work — Part 1 complete!': 'Izvrstan rad — 1. dio dovršen!',
  'Great job — Part 3 complete! We’re preparing your full report.': 'Sjajno - treći dio dovršen! Pripremamo vaše potpuno izvješće.',
  'You’re doing well — keep going!': 'Dobro ti ide - samo tako nastavi!',
  'Great! I’ve created your Patient ID. Please save it. You’ll use it next time to see your progress.': 'Odlično! Izradio sam vaš ID pacijenta. Molim vas spremite ga. Sljedeći put ćete ga koristiti kako biste vidjeli svoj napredak.',
  'We don’t collect personal details. Your Patient ID only links your own assessments.': 'Ne prikupljamo osobne podatke. Vaš ID pacijenta povezuje samo vaše procjene.',
  '10 â€“ Worst pain': '10 – Najgora bol'
};

const EXACT_EN_TO_SK: Record<string, string> = {
  '1': '1',
  '2': '2',
  '3': '3',
  '4': '4',
  '5': '5',
  '6': '6',
  '7': '7',
  '8': '8',
  '9': '9',
  '0 - No pain': '0 - Bez bolesti',
  '10 - Worst pain': '10 - Najhoršia bolesť',
  '10 – Worst pain': '10 - Najhoršia bolesť',
  'Always': 'Vždy',
  'Avoidance of social events: 1-5': 'Vyhýbanie sa spoločenským udalostiam: 1-5',
  'Avoidance of sport/exercise due to pain: 1-5': 'Vyhýbanie sa športu/cvičeniu kvôli bolesti: 1-5',
  'Concern/fear about future health: 1-5': 'Obava/strach o budúce zdravie: 1-5',
  'Daily activities limited by pain:': 'Denné aktivity obmedzené bolesťou:',
  'Difficulty with family responsibilities: 1-5': 'Ťažkosti s rodinnými povinnosťami: 1-5',
  'Do you have lumbar (lower back) pain?': 'Máte bolesti v krížovej oblasti (spodnej časti chrbta)?',
  'Do you have menstrual pain?': 'Máte menštruačné bolesti?',
  'Do you have pain after sexual intercourse?': 'Máte bolesti po pohlavnom styku?',
  'Do you have pain during sexual intercourse?': 'Máte bolesti pri pohlavnom styku?',
  'Do you have pain on urination?': 'Máte bolesti pri močení?',
  'Do you have spontaneous pelvic pain?': 'Máte spontánne bolesti panvy?',
  'Excellent work - Part 1 complete!': 'Skvelá práca - 1. časť dokončená!',
  'Feeling anxious/nervous due to pain: 1-5': 'Pocit úzkosti/nervóznosti v dôsledku bolesti: 1-5',
  'Feeling depressed/low due to symptoms: 1-5': 'Pocit depresie/nízke v dôsledku symptómov: 1-5',
  'Feeling irritable/short-tempered: 1-5': 'Pocit podráždenosti/vzrušenosti: 1-5',
  'Feeling socially isolated: 1-5': 'Pocit sociálnej izolácie: 1-5',
  'Great job - Part 3 complete! We\'re preparing your full report.': 'Skvelá práca – 3. časť dokončená! ',
  'Household activities limited by pain: 1-5': 'Aktivity v domácnosti obmedzené bolesťou: 1-5',
  'I\'m here to understand your pelvic pain so we can guide next steps. This is quick and private. Let\'s begin.': 'Som tu, aby som pochopil vašu panvovú bolesť, aby sme mohli viesť ďalšie kroky. ',
  'If yes: Intensity (0-10)': 'Ak áno: Intenzita (0-10)',
  'Intensity (0-10)': 'Intenzita (0-10)',
  'Intensity (0–10)': 'Intenzita (0–10)',
  'It only takes a minute and helps doctors spot patterns early.': 'Trvá to len minútu a pomáha lekárom včas rozpoznať vzorce.',
  'It takes ~2-3 minutes and really strengthens your report.': 'Trvá to ~2-3 minúty a skutočne posilní vašu správu.',
  'Limitation of sexual life: 1-5': 'Obmedzenie sexuálneho života: 1-5',
  'Lower abdominal pain (second half of cycle): 1-5': 'Bolesť v podbrušku (druhá polovica cyklu): 1-5',
  'Missed work or school due to pain:': 'Zmeškanie práce alebo školy kvôli bolesti:',
  'Need for frequent rest periods: 1-5': 'Potreba častých prestávok na odpočinok: 1-5',
  'Never': 'Nikdy',
  'No': 'Nie',
  'Often': 'Často',
  'Pain affecting sexual life:': 'Bolesť ovplyvňujúca sexuálny život:',
  'Pain affecting social/family life:': 'Bolesť ovplyvňujúca spoločenský/rodinný život:',
  'Pain during prolonged sitting: 1-5': 'Bolesť pri dlhšom sedení: 1-5',
  'Pain during/after sexual intercourse: 1-5': 'Bolesť počas/po pohlavnom styku: 1-5',
  'Pain improves when lying down?': 'Zlepšuje sa bolesť pri ležaní?',
  'Pain in lumbar/sacral/inguinal area after exertion: 1-5': 'Bolesť v driekovej/sakrálnej/inguinálnej oblasti po námahe: 1-5',
  'Pain with bowel movement during menstruation?': 'Bolesť s pohybom čriev počas menštruácie?',
  'Pain with bowel movement outside menstruation?': 'Bolesť s pohybom čriev mimo menštruácie?',
  'Pain worsens when standing/walking long periods?': 'Zhoršuje sa bolesť pri dlhom státí/chôdzi?',
  'Painkillers for pelvic pain (past month):': 'Lieky proti bolesti panvy (posledný mesiac):',
  'Part 2 is a quick 5-question screen for pelvic vein involvement (PCS).': 'Časť 2 je rýchly 5-otázkový screening pre postihnutie panvových žíl (PCS).',
  'Part 3 is the PVVQ (20 items). It shows how pain affects daily life.': 'Časť 3 je PVVQ (20 položiek). ',
  'Pelvic heaviness/pressure at end of day?': 'Ťažkosť/tlak panvy na konci dňa?',
  'Pelvic pain > 6 months?': 'Bolesť panvy > 6 mesiacov?',
  'Reduced ability to perform daily physical activity: 1-5': 'Znížená schopnosť vykonávať každodennú fyzickú aktivitu: 1-5',
  'Reduced self-esteem/confidence: 1-5': 'Znížená sebaúcta/dôvera: 1-5',
  'Sometimes': 'Niekedy',
  'Strain in personal relationships: 1-5': 'Napätie v osobných vzťahoch: 1-5',
  'Tenderness in perineum/vulvar region: 1-5': 'Citlivosť v perineu/vulválnej oblasti: 1-5',
  'Unsure': 'neistý',
  'Varicose veins in vulva/buttocks/thighs?': 'Kŕčové žily na vulve/zadku/stehnách?',
  'Work/professional activities limited: 1-5': 'Pracovné/profesionálne činnosti obmedzené: 1-5',
  'Yes': 'Áno',
  'You\'re doing well - keep going!': 'Ide ti to dobre - pokračuj!',
  'Hi! Before we begin, are you new here or do you have a Patient ID?': 'Ahoj! Skôr než začneme, ste tu prvýkrát alebo máte ID pacienta?',
  'I\'m new': 'Som tu prvýkrát',
  'I have a Patient ID': 'Mám ID pacienta',
  'We don\'t collect personal details. Your Patient ID only links your own assessments.': 'Nezhromažďujeme osobné údaje. ',
  'Enter your Patient ID so we can link to your previous assessments (example: A12345).': 'Zadajte svoje ID pacienta, aby sme mohli prepojiť vaše predchádzajúce hodnotenia (príklad: A12345).',
  'A12345': 'A12345',
  'Nice progress - Part 2 is just 5 quick questions that help identify pelvic vein involvement.': 'Pekný pokrok - Časť 2 je len 5 rýchlych otázok, ktoré pomáhajú identifikovať postihnutie panvových žíl.',
  'Great! I\'ve created your Patient ID. Please save it. You\'ll use it next time to see your progress.': 'Skvelé! ',
  'Would you like to continue and see if pelvic congestion syndrome (PCS) might be affecting you?': 'Chceli by ste pokračovať a zistiť, či vás syndróm prekrvenia panvy (PCS) neovplyvňuje?',
  'Great work - Part 3 (PVVQ) takes about 2-3 minutes and really strengthens your report.': 'Skvelá práca – 3. časť (PVVQ) trvá asi 2-3 minúty a skutočne posilní vašu správu.',
  'Would you like to continue and understand how pelvic pain is impacting your daily life (PVVQ)?': 'Chceli by ste pokračovať a pochopiť, ako bolesť panvy ovplyvňuje váš každodenný život (PVVQ)?',
  'Thanks - you\'ve completed everything needed for now.': 'Ďakujeme - zatiaľ ste dokončili všetko potrebné.',
  'We\'re preparing your PDF report next.': 'Ďalej pripravujeme vašu správu vo formáte PDF.',
  'It takes ~2–3 minutes and really strengthens your report.': 'Trvá to približne 2–3 minúty a skutočne posilní vašu správu.',
  'Excellent work — Part 1 complete!': 'Skvelá práca – 1. časť dokončená!',
  'Great job — Part 3 complete! We’re preparing your full report.': 'Skvelá práca – 3. časť dokončená! ',
  'You’re doing well — keep going!': 'Ide ti to dobre – pokračuj!',
  'Great! I’ve created your Patient ID. Please save it. You’ll use it next time to see your progress.': 'Skvelé! ',
  'We don’t collect personal details. Your Patient ID only links your own assessments.': 'Nezhromažďujeme osobné údaje. ',
  '10 â€“ Worst pain': '10 – Najhoršia bolesť',
};




const EXACT_TRANSLATIONS: Record<Exclude<Language, 'en'>, Record<string, string>> = {
  ru: EXACT_EN_TO_RU,
  kz: EXACT_EN_TO_KZ,
  hr: EXACT_EN_TO_HR,
  sk: EXACT_EN_TO_SK
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
      if (lang === 'hr') {
        return `ID pacijenta: ${match[1]} - spremite ili snimite zaslon.`;
      }
      if (lang === 'sk') {
        return `ID pacienta: ${match[1]} - uložte si ho alebo urobte snímku obrazovky.`;
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
      if (lang === 'hr') {
        return `Hvala! Povezali smo vaše prethodne rezultate. ID pacijenta ${match[1]} je spreman - nastavimo.`;
      }
      if (lang === 'sk') {
        return `Ďakujeme! Prepojili sme vaše predchádzajúce výsledky. ID pacienta ${match[1]} je pripravené - pokračujme.`;
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
