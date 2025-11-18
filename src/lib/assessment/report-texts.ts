import type { Language } from '/i18n/types';

const REPORT_TEXT_RU: Record<string, string> = {
  'Spontaneous pelvic pain': 'Спонтанная тазовая боль',
  'Severe period pain': 'Сильная боль во время менструации',
  'Severe pain between periods': 'Сильная боль между менструациями',
  'Pain unbearable/cannot be ignored': 'Боль нестерпимая/невозможно игнорировать',
  'Pain worsening over the years': 'Боль усиливается с годами',
  'Pain around period days': 'Боль в дни менструации',
  'Stabbing pelvic pain episodes': 'Приступы колющей тазовой боли',
  'Pain spreads to lower back': 'Боль распространяется в поясницу',
  'Pain spreads to legs/hips': 'Боль распространяется в ноги/тазобедренную область',
  'Pain disabling daily activities': 'Боль ограничивает повседневную активность',
  'Pain prevents moving/standing': 'Боль мешает двигаться/стоять',
  'Deep internal pain': 'Глубокая внутренняя боль',
  'Position-dependent pain': 'Боль зависит от позы',
  'Pain disrupts intercourse': 'Боль нарушает половую жизнь',
  'Pain passing stool during period': 'Боль при дефекации во время менструации',
  'Bowel spasms/cramps': 'Спазмы/судороги кишечника',
  'Diarrhoea/constipation during period': 'Диарея/запор во время менструации',
  'Pain/difficulty when urinating': 'Боль/затруднение при мочеиспускании',
  'Bladder pain/urgency': 'Боль/позывы в мочевом пузыре',
  'Sciatica during period': 'Ишиас во время менструации',
  'Right shoulder/rib pain': 'Боль в правом плече/рёбрах',
  'Difficulty conceiving': 'Трудности с зачатием',
  'Usual intensity': 'Обычная интенсивность',
  'Worst intensity': 'Максимальная интенсивность',
  'Match to description': 'Насколько соответствует описанию',
  'Daily activity discomfort': 'Дискомфорт в повседневных делах',
  'Discomfort from immobility': 'Дискомфорт из-за обездвиженности',
  'Sexual activity status': 'Сексуальная активность',
  'Discomfort score': 'Оценка дискомфорта',
  'Usual discomfort': 'Обычный дискомфорт',
  'Worst discomfort': 'Максимальный дискомфорт',
  'Status': 'Статус',
  'currently has menstrual periods': 'в настоящее время есть менструации',
  'currently no menstrual periods': 'в настоящее время менструации отсутствуют',
  'Pain during sexual intercourse': 'Боль во время полового акта',
  'Bowel pain and symptoms': 'Кишечные боли и симптомы',
  'Other symptoms': 'Другие симптомы'
};

const REPORT_TRANSLATIONS: Record<Exclude<Language, 'en'>, Record<string, string>> = {
  ru: REPORT_TEXT_RU
};

export function translateReportText(text: string, lang: Language): string {
  if (!text || lang === 'en') return text;
  const map = REPORT_TRANSLATIONS[lang as Exclude<Language, 'en'>];
  return map?.[text] ?? text;
}
