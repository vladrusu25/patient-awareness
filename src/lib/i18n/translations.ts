import type { Language } from './types';

type Leaf = { en: string; ru: string } & Partial<Record<Language, string>>;

type Node = Leaf | { [key: string]: Node };

export const translations: Record<string, Node> = {
  common: {
    brand: { en: 'Smart Health', ru: 'Smart Health' },
    privacyTagline: {
      en: 'private by design',
      ru: 'конфиденциально по задумке'
    },
    close: { en: 'Close', ru: 'Закрыть' },
    selectLanguage: { en: 'Language', ru: 'Язык' },
    english: { en: 'English', ru: 'Английский' },
    slovak: { en: 'Slovak', ru: 'Словацкий' }
  },
  nav: {
    home: { en: 'Home', ru: 'Главная' },
    assessment: { en: 'Assessment', ru: 'Оценка' },
    pdfSearch: { en: 'PDF Search', ru: 'Поиск PDF' },
    pcs: { en: 'PCS', ru: 'СТВЗ' },
    pcsDiagnosis: { en: 'PCS Diagnosis', ru: 'Диагностика СТВЗ' },
    endometriosis: { en: 'Endometriosis', ru: 'Эндометриоз' },
    dashboard: { en: 'Dashboard', ru: 'Панель' },
    assessmentMenu: { en: 'Assessment', ru: 'Оценка' },
    conditionsMenu: { en: 'Conditions', ru: 'Состояния' },
    dashboardMenu: { en: 'Dashboard', ru: 'Панели' },
    dashboardDoctors: { en: 'For doctors', ru: 'Для врачей' },
    dashboardAdmins: { en: 'For admins', ru: 'Для администраторов' },
    about: { en: 'About', ru: 'О нас' },
    contact: { en: 'Contact', ru: 'Контакты' }
  },
  actions: {
    startAssessment: { en: 'Start Assessment', ru: 'Начать оценку' },
    start: { en: 'Start', ru: 'Начать' },
    submit: { en: 'Submit', ru: 'Отправить' },
    checking: { en: 'Checking...', ru: 'Проверяем...' },
    tryAgain: { en: 'Try again', ru: 'Попробовать снова' },
    keepSession: { en: 'Keep session', ru: 'Сохранить сессию' },
    forfeit: {
      en: 'Forfeit & start over',
      ru: 'Сбросить и начать заново'
    },
    confirmRestart: { en: 'Start a new session?', ru: 'Начать новую сессию?' },
    downloadPdf: { en: 'Download your PDF', ru: 'Скачать PDF' },
    starting: { en: 'Starting...', ru: 'Запуск...' },
    restart: { en: 'Restart', ru: 'Перезапуск' },
    continue: { en: 'Continue', ru: 'Продолжить' },
    next: { en: 'Next', ru: 'Далее' }
  },
  header: {
    private: { en: 'private by design', ru: 'конфиденциально по задумке' },
    progress: { en: 'Progress', ru: 'Прогресс' },
    question: { en: 'Question', ru: 'Вопрос' },
    of: { en: 'of', ru: 'из' },
    toggleMenu: { en: 'Toggle menu', ru: 'Переключить меню' }
  },
  footer: {
    tagline: {
      en: 'Empowering individuals with personalized health insights through AI-powered assessments.',
      ru: 'Помогаем людям получать персональные рекомендации о здоровье с помощью AI-оценок.'
    },
    navigationHeading: { en: 'Navigation', ru: 'Навигация' },
    supportHeading: { en: 'Support', ru: 'Поддержка' },
    contactHeading: { en: 'Contact', ru: 'Контакты' },
    rights: { en: 'All rights reserved.', ru: 'Все права защищены.' },
    navItems: {
      home: { en: 'Home', ru: 'Главная' },
      assessment: { en: 'Assessment', ru: 'Оценка' },
      contact: { en: 'Contact', ru: 'Контакты' }
    }
  },
  hero: {
    badge: { en: 'Private by design', ru: 'Конфиденциально по задумке' },
    title: { en: 'Your Health Matters', ru: 'Ваше здоровье — наш приоритет' },
    copy: {
      en: 'Get personalized health insights through our AI-powered assessment. Quick, private, and designed by medical experts.',
      ru: 'Персональные рекомендации по здоровью на основе ИИ. Быстро, конфиденциально и составлено врачами.'
    },
    subtitle: {
      en: 'Quick, private AI-powered insights.',
      ru: 'Понятные шаги всего за несколько минут.'
    },
    meta: {
      en: '~5 minutes · No sign-up · Free of charge',
      ru: '~5 минут · Без регистрации · Бесплатно'
    }
  },
  pdfSearch: {
    title: { en: 'Find your PDF report', ru: 'Найдите свой PDF-отчёт' },
    description: {
      en: 'Enter your token (10 or 16 characters, e.g. <code class="px-1 rounded bg-neutral-50">AB2C...</code>) to retrieve your report.',
      ru: 'Введите токен (10 или 16 символов, например <code class="px-1 rounded bg-neutral-50">AB2C...</code>), чтобы получить отчёт.'
    },
    placeholder: { en: 'Enter your token (10 or 16 characters)', ru: 'Введите токен (10 или 16 символов)' },
    search: { en: 'Search', ru: 'Найти' },
    searching: { en: 'Searching...', ru: 'Поиск...' },
    found: { en: 'Found PDF — ready to download.', ru: 'PDF найден — готов к загрузке.' },
    download: { en: 'Download PDF', ru: 'Скачать PDF' },
    previewTitle: { en: 'PDF preview', ru: 'Предпросмотр PDF' },
    errors: {
      invalidFormat: { en: 'Token must be 10 or 16 characters (A-Z, 0-9).', ru: 'Токен должен содержать 10 или 16 символов (A-Z, 0-9).' },
      notFound: { en: 'Invalid token — this token does not exist.', ru: 'Недействительный токен — такого токена не существует.' },
      rateLimited: { en: 'Too many attempts. Try again in {{seconds}} seconds.', ru: 'Слишком много попыток. Повторите через {{seconds}} секунд.' },
      noPdf: { en: 'Report not available yet. Please try again later.', ru: 'Отчёт пока недоступен. Попробуйте позже.' },
      protected: {
        en: 'This report is only available via the private doctor link. Please ask your doctor for their QR code or link.',
        ru: 'Этот отчёт доступен только по приватной ссылке врача. Попросите у врача его QR‑код или ссылку.'
      },
      generic: { en: 'An error occurred — please try again.', ru: 'Произошла ошибка — попробуйте ещё раз.' }
    }
  },
  knowledge: {
    heading: {
      en: 'Empower Yourself with Knowledge About Pelvic Health',
      ru: 'Расширяйте знания о здоровье тазового дна'
    },
    cards: {
      card1: {
        iconAlt: {
          en: 'Icon representing how common these conditions are',
          ru: 'Иконка, отражающая распространённость состояний'
        },
        title: {
          en: '1. How common are these conditions?',
          ru: '1. Насколько часто встречаются эти состояния?'
        },
        bullet1: {
          en: 'Endometriosis affects about 1 in 10 women of reproductive age.',
          ru: 'Эндометриоз встречается примерно у 1 из 10 женщин репродуктивного возраста.'
        },
        bullet2: {
          en: 'Pelvic Congestion Syndrome (PCS) may account for up to 30% of women with chronic pelvic pain seen in gynecology clinics. Read more about this: <a class="text-green-900 underline" href="https://icarebetter.com/endometriosis/education/related-conditions/pelvic-congestion-syndrome-another-cause-of-chronic-pelvic-pain-2/" target="_blank" rel="noopener noreferrer">icarebetter.com</a>.',
          ru: 'Синдром тазового венозного застоя (СТВЗ) может быть причиной до 30% случаев хронической тазовой боли у женщин на приёме у гинеколога. Подробнее: <a class="text-green-900 underline" href="https://icarebetter.com/endometriosis/education/related-conditions/pelvic-congestion-syndrome-another-cause-of-chronic-pelvic-pain-2/" target="_blank" rel="noopener noreferrer">icarebetter.com</a>.'
        }
      },
      card2: {
        iconAlt: {
          en: 'Icon illustrating overlapping symptoms',
          ru: 'Иконка, показывающая пересечение симптомов'
        },
        title: {
          en: '2. They share similar symptoms',
          ru: '2. Симптомы часто пересекаются'
        },
        intro: {
          en: 'Both conditions can cause:',
          ru: 'Оба состояния могут вызывать:'
        },
        bullet1: {
          en: 'Chronic pelvic pain (lasting more than 6 months)',
          ru: 'Хроническую тазовую боль (длится более 6 месяцев)'
        },
        bullet2: {
          en: 'Pain that worsens before periods or after sex',
          ru: 'Боль, усиливающуюся перед менструацией или после полового акта'
        },
        bullet3: {
          en: 'Lower back or abdominal discomfort',
          ru: 'Дискомфорт в пояснице или нижней части живота'
        },
        note: {
          en: 'This overlap can make diagnosis challenging. Read more about this: <a class="text-green-900 underline" href="https://www.healthline.com/health/pelvic-congestion-syndrome-and-endometriosis" target="_blank" rel="noopener noreferrer">healthline.com</a>.',
          ru: 'Из-за сходства симптомов постановка диагноза затруднена. Подробнее: <a class="text-green-900 underline" href="https://www.healthline.com/health/pelvic-congestion-syndrome-and-endometriosis" target="_blank" rel="noopener noreferrer">healthline.com</a>.'
        }
      },
      card3: {
        iconAlt: {
          en: 'Icon representing ultrasound imaging',
          ru: 'Иконка, обозначающая ультразвуковое исследование'
        },
        title: {
          en: '3. Ultrasound can help',
          ru: '3. УЗИ помогает в диагностике'
        },
        description: {
          en: 'Modern transvaginal ultrasound is a key, non-invasive tool for detecting signs of endometriosis and PCS, helping doctors plan the right treatment and avoid delays. Read more about this: <a class="text-green-900 underline" href="https://link.springer.com/article/10.1007/s13669-025-00424-2" target="_blank" rel="noopener noreferrer">springer.com</a>.',
          ru: 'Современное трансвагинальное УЗИ — важный неинвазивный метод для выявления признаков эндометриоза и СТВЗ, который помогает врачу выбрать правильное лечение и избежать задержки диагностики. Подробнее: <a class="text-green-900 underline" href="https://link.springer.com/article/10.1007/s13669-025-00424-2" target="_blank" rel="noopener noreferrer">springer.com</a>.'
        }
      }
    }
  },
  pelvicPainInfo: {
    heading: {
      en: 'Chronic Pelvic Pain: Get Clarity and Next Steps',
      ru: 'Хроническая тазовая боль: Поймите причину и сделайте первый шаг'
    },
    introPrimary: {
      en: 'Chronic pelvic pain can have more than one cause at the same time.',
      ru: 'Хроническая боль в тазу может иметь несколько причин одновременно.'
    },
    introSecondary: {
      en: 'Pelvic Congestion Syndrome (PCS)—enlarged veins in the pelvis—often overlaps with conditions like:',
      ru: 'Синдром тазового венозного застоя (СТВЗ) — расширение вен в области таза — часто сочетается с другими гинекологическими заболеваниями, такими как:'
    },
    conditions: {
      endometriosis: { en: 'Endometriosis', ru: 'Эндометриоз' },
      adenomyosis: { en: 'Adenomyosis', ru: 'Аденомиоз' },
      fibroids: { en: 'Uterine fibroids', ru: 'Миома матки' },
      adhesions: { en: 'Pelvic adhesions (scar tissue)', ru: 'Тазовые спайки (рубцовая ткань после операций или воспалений)' },
      pid: { en: 'Pelvic inflammatory disease (PID)', ru: 'Воспалительные заболевания органов малого таза (ВЗОМТ)' }
    },
    outlook: {
      en: 'Because these conditions share similar symptoms, it’s important to look at the whole picture—not just one possible cause.',
      ru: 'Поскольку симптомы этих состояний могут быть похожи, важно рассматривать всю картину, а не только одну возможную причину.'
    },
    learnMore: {
      endometriosis: { en: 'Learn more about Endometriosis', ru: 'Узнайте больше об эндометриозе' },
      pcs: { en: 'Learn more about Pelvic Congestion Syndrome (PCS)', ru: 'Узнайте больше о синдроме тазового венозного застоя (СТВЗ)' }
    },
    helpHeading: {
      en: 'How we help',
      ru: 'Как мы помогаем'
    },
    helpBody: {
      en: 'We use a team approach. Gynecologists, radiologists, vascular specialists, pain experts, and psychologists work together to provide an accurate diagnosis and a personalized treatment plan.',
      ru: 'Мы используем междисциплинарный подход. Гинекологи, радиологи, сосудистые специалисты, специалисты по боли и психологи работают вместе, чтобы обеспечить точный диагноз и подобрать персональный план лечения.'
    },
    ctaHeading: {
      en: 'Start your assessment',
      ru: 'Пройдите оценку'
    },
    ctaBody: {
      en: 'The short questionnaire below helps us understand your symptoms and supports this team-based care.',
      ru: 'Короткая анкета ниже поможет нам лучше понять ваши симптомы и поддержит этот командный подход к вашему лечению.'
    },
    ctaButton: {
      en: 'Start your assessment →',
      ru: 'Пройти оценку →'
    }
  },
  pcsPage: {
    hero: {
      title: {
        en: 'Pelvic Congestion Syndrome (PCS): Understanding the Condition and Its Impact',
        ru: 'Синдром тазового венозного застоя (СТВЗ): понимание состояния и его влияния'
      },
      headline: {
        en: 'Pelvic Congestion Syndrome: Unveiling the Hidden Cause of Chronic Pelvic Pain',
        ru: 'Синдром тазового венозного застоя: скрытая причина хронической тазовой боли'
      },
      subheadline: {
        en: 'Learn how PCS causes persistent discomfort and how its symptoms overlap with other conditions like endometriosis, affecting daily life and fertility.',
        ru: 'Узнайте, как СТВЗ вызывает постоянный дискомфорт, пересекается с эндометриозом и влияет на повседневную жизнь и фертильность.'
      },
      cta: { en: 'Take the Symptom Questionnaire', ru: 'Пройдите опрос по симптомам' },
      imageAlt: {
        en: 'Illustration of pelvic veins highlighting pelvic congestion syndrome',
        ru: 'Иллюстрация тазовых вен при синдроме венозного застоя'
      }
    },
    sections: {
      whatIs: {
        headline: { en: 'What is Pelvic Congestion Syndrome?', ru: 'Что такое синдром тазового венозного застоя?' },
        intro: {
          en: 'Pelvic Congestion Syndrome (PCS) is a condition characterized by chronic pelvic pain caused by enlarged and dysfunctional veins in the pelvic area. When these veins fail to carry blood back to the heart, blood pools and creates ongoing discomfort. PCS primarily affects women of childbearing age, with symptoms often worsening after pregnancy.',
          ru: 'Синдром тазового венозного застоя (СТВЗ) сопровождается хронической тазовой болью из-за расширенных и дисфункциональных вен в малом тазу. Когда кровь не возвращается по ним к сердцу, она застаивается и вызывает стойкий дискомфорт. Чаще всего СТВЗ встречается у женщин репродуктивного возраста, а симптомы нередко усиливаются после беременности.'
        },
        causesTitle: { en: 'Common causes include:', ru: 'Распространённые причины:' },
        causes: {
          pregnancy: { en: 'Enlarged veins related to pregnancy or hormonal changes', ru: 'Расширение вен на фоне беременности или гормональных изменений' },
          estrogen: { en: 'Elevated estrogen levels that increase vein dilation', ru: 'Повышенный уровень эстрогенов, усиливающий дилатацию вен' },
          familyHistory: { en: 'Family history of varicose veins or PCS', ru: 'Наследственная предрасположенность к варикозной болезни или СТВЗ' }
        }
      },
      risk: {
        headline: { en: 'Who is at Risk of Developing PCS?', ru: 'Кто находится в группе риска?' },
        intro: {
          en: 'Certain factors make PCS more likely to develop or worsen over time:',
          ru: 'Эти факторы повышают вероятность возникновения или прогрессирования СТВЗ:'
        },
        factors: {
          pregnancies: { en: 'Multiple pregnancies, with risk increasing after each pregnancy', ru: 'Многократные беременности, при которых риск растёт с каждой последующей' },
          venousHistory: { en: 'Family history of venous issues such as varicose veins', ru: 'Семейный анамнез венозных нарушений, включая варикоз' },
          hormones: { en: 'Hormonal influences in women of childbearing age', ru: 'Гормональные влияния у женщин репродуктивного возраста' }
        }
      },
      symptoms: {
        headline: { en: 'Symptoms of PCS', ru: 'Симптомы СТВЗ' },
        intro: {
          en: 'PCS symptoms can look a lot like endometriosis and other pelvic conditions. Many people experience some combination of the following:',
          ru: 'Проявления СТВЗ нередко напоминают эндометриоз и другие заболевания малого таза. Часто наблюдается сочетание следующих симптомов:'
        },
        list: {
          pelvicPain: { en: 'Chronic pelvic pain that intensifies toward the end of the day', ru: 'Хроническая тазовая боль, усиливающаяся к концу дня' },
          dyspareunia: { en: 'Pain or discomfort during sexual intercourse (dyspareunia)', ru: 'Боль или дискомфорт во время полового акта (диспареуния)' },
          backPain: { en: 'Lower back pain that can radiate into the hips or legs', ru: 'Боль в пояснице с иррадиацией в бёдра или ноги' },
          giIssues: { en: 'Digestive discomfort such as bloating or constipation', ru: 'Диспепсия, вздутие живота и запоры' },
          bleeding: { en: 'Irregular vaginal bleeding or increased discharge', ru: 'Нерегулярные вагинальные кровотечения или усиление выделений' },
          fatigue: { en: 'Fatigue, brain fog, or difficulty sleeping', ru: 'Усталость, туман в голове или нарушения сна' },
          heaviness: { en: 'A sense of heaviness or fullness in the lower abdomen', ru: 'Ощущение тяжести или распирания в нижней части живота' }
        },
        cta: { en: 'Explore PCS Symptoms in Detail', ru: 'Подробнее о симптомах СТВЗ' }
      },
      diagnosis: {
        headline: { en: 'Diagnosis of PCS', ru: 'Диагностика СТВЗ' },
        intro: {
          en: 'Diagnosis relies on a mix of clinical evaluation and imaging. Pain must persist for more than six months and center on the pelvis.',
          ru: 'Диагностика опирается на клиническую оценку и визуализирующие методы. Боль должна сохраняться более шести месяцев и локализоваться в области таза.'
        },
        featuresTitle: { en: 'Key diagnostic features include:', ru: 'Ключевые диагностические признаки:' },
        features: {
          veinSize: { en: 'Tortuous pelvic veins measuring 6 mm or larger', ru: 'Извилистые тазовые вены диаметром 6 мм и более' },
          flow: { en: 'Slow or reversed venous blood flow on Doppler studies', ru: 'Замедленный или обратный венозный кровоток по данным допплерографии' },
          dilation: { en: 'Dilated ovarian veins or polycystic ovarian changes', ru: 'Расширенные яичниковые вены или поликистозные изменения яичников' }
        },
        cta: { en: 'Read More About Diagnosis', ru: 'Подробнее о диагностике' }
      },
      treatment: {
        headline: { en: 'Treatment Options for PCS', ru: 'Варианты лечения СТВЗ' },
        intro: {
          en: 'Ovarian vein embolization (OVE) is the most common and effective treatment for PCS. It is a minimally invasive procedure that targets the problem veins directly.',
          ru: 'Эмболизация яичниковых вен (OVE) - самый распространённый и эффективный способ лечения СТВЗ. Это малоинвазивная процедура, воздействующая напрямую на патологические сосуды.'
        },
        benefitsTitle: { en: 'OVE can provide:', ru: 'Эмболизация яичниковых вен позволяет:' },
        benefits: {
          painRelief: { en: 'Significant pain reduction and relief during daily activities', ru: 'Существенно снизить боль и облегчить повседневную активность' },
          sexualHealth: { en: 'Improved comfort during sexual activity and intimacy', ru: 'Повысить комфорт в интимной жизни и качество близости' },
          fertility: { en: 'Potential improvements in fertility for people affected by PCS', ru: 'Повысить шансы на беременность у пациенток с СТВЗ' }
        },
        otherOptions: {
          en: 'Additional options can include medication, hormone management, or pelvic physical therapy to support recovery.',
          ru: 'Дополнительно применяют медикаментозную терапию, гормональную коррекцию и тазовую физиотерапию для поддержки восстановления.'
        }
      },
      quality: {
        headline: { en: 'Improving Quality of Life', ru: 'Повышение качества жизни' },
        body: {
          en: 'PCS affects more than just physical comfort. People frequently report disruptions to relationships, mental health, and sexual wellbeing. After OVE, many regain confidence, intimacy, and connection with their partners.',
          ru: 'СТВЗ влияет не только на физическое состояние. Пациентки часто отмечают сложности в отношениях, эмоциональном благополучии и сексуальном здоровье. После эмболизации многие возвращают уверенность, близость и связь с партнёром.'
        }
      },
      science: {
        headline: { en: 'Backed by Science', ru: 'Научные данные' },
        intro: {
          en: 'Explore clinical research that validates PCS diagnosis and treatment:',
          ru: 'Изучите клинические исследования, подтверждающие диагностику и лечение СТВЗ:'
        },
        links: {
          study1: {
            en: 'Ovarian Vein Embolization and Pain Relief (Journal of Vascular Surgery)',
            ru: 'Эмболизация яичниковых вен и снижение боли (Journal of Vascular Surgery)'
          },
          study2: {
            en: 'Pelvic Congestion Syndrome and Fertility Outcomes (International Journal of Reproductive Medicine)',
            ru: 'СТВЗ и репродуктивные исходы (International Journal of Reproductive Medicine)'
          }
        }
      },
      voice: {
        headline: { en: 'Your Voice Can Change Care', ru: 'Ваш голос помогает улучшать помощь пациентам' },
        body: {
          en: 'By completing the symptom questionnaire, you help build the data needed for faster diagnosis, better treatment options, and more informed care models for PCS.',
          ru: 'Отвечая на вопросы опросника, вы помогаете собирать данные для более быстрой диагностики, улучшения терапии и развития мультидисциплинарной помощи при СТВЗ.'
        },
        cta: { en: 'Share Your Symptoms', ru: 'Поделитесь своими симптомами' }
      }
    }
  },
  pcsDiagnosisPage: {
    hero: {
      title: {
        en: 'PCS Diagnosis: Clinical and Imaging Guide',
        ru: 'Диагностика СТВЗ: клинический и визуализационный гид'
      },
      subtitle: {
        en: 'How clinicians confirm pelvic congestion syndrome when symptoms overlap with other pelvic pain disorders.',
        ru: 'Как врачи подтверждают синдром тазового венозного застоя, когда симптомы пересекаются с другими причинами тазовой боли.'
      },
      intro: {
        en: 'Use this overview to recognise red flags, choose the right imaging pathway, and understand the evidence that supports a PCS diagnosis.',
        ru: 'Эта памятка помогает заметить настораживающие признаки, выбрать оптимальный путь визуализации и понять доказательную базу диагностики СТВЗ.'
      },
      backCta: { en: 'Return to PCS Overview', ru: 'Вернуться к обзору СТВЗ' }
    },
    sections: {
      suspect: {
        headline: { en: 'When to Suspect PCS', ru: 'Когда подозревать СТВЗ' },
        intro: {
          en: 'PCS is often suspected when pelvic pain persists despite a normal pelvic exam. Key symptom patterns include:',
          ru: 'СТВЗ предполагают, если хроническая тазовая боль сохраняется при нормальном гинекологическом осмотре. Обратите внимание на следующие паттерны:'
        },
        criteriaTitle: { en: 'Frequent clinical clues:', ru: 'Частые клинические подсказки:' },
        criteria: {
          painProgression: {
            en: 'Pelvic pain beginning after pregnancy and worsening with each subsequent pregnancy.',
            ru: 'Тазовая боль, появившаяся после беременности и усиливающаяся с каждой последующей.'
          },
          painCharacter: {
            en: 'Dull, aching pain that can flare to sharp or throbbing sensations, often worsening later in the day or after prolonged standing or sitting and easing when lying down.',
            ru: 'Тупая ноющая боль с острыми или пульсирующими всплесками; усиливается к концу дня или после длительного стояния/сидения и ослабевает в положении лёжа.'
          },
          postCoital: {
            en: 'Pain that intensifies during or after sexual intercourse.',
            ru: 'Боль, усиливающаяся во время или после полового акта.'
          },
          unilateralPain: {
            en: 'Symptoms frequently present on one side of the pelvis.',
            ru: 'Симптомы часто локализуются на одной стороне таза.'
          },
          palpation: {
            en: 'Pain reproduced on deep palpation of the ovaries during examination.',
            ru: 'Болезненность при глубокой пальпации яичников во время осмотра.'
          },
          varices: {
            en: 'Visible varicose veins affecting the vulva, buttocks, or lower extremities.',
            ru: 'Видимые варикозные узлы вульвы, ягодиц или нижних конечностей.'
          },
          neurological: {
            en: 'Associated lumbosacral neuropathy or radiating lower back pain, especially when standing upright.',
            ru: 'Сопутствующая пояснично-крестцовая нейропатия или иррадиирующая поясничная боль, особенно в вертикальном положении.'
          },
          systemic: {
            en: 'Systemic complaints such as fatigue, insomnia, headaches, depression, or bowel and bladder dysfunction.',
            ru: 'Системные жалобы: усталость, бессонница, головные боли, признаки депрессии, нарушения работы кишечника и мочевого пузыря.'
          },
          gi: {
            en: 'Gastrointestinal discomfort, rectal pressure, and abdominal bloating.',
            ru: 'Желудочно-кишечный дискомфорт, давление в прямой кишке и вздутие живота.'
          },
          gynecologic: {
            en: 'Dysmenorrhea, abnormal vaginal discharge or bleeding, and vulvar edema.',
            ru: 'Дисменорея, патологические вагинальные выделения или кровотечения, отёк вульвы.'
          }
        },
        note: {
          en: 'Chronic pelvic pain must persist for more than six months with no inflammatory findings on pelvic exam to formally suspect PCS.',
          ru: 'Для постановки предварительного диагноза боль должна продолжаться более шести месяцев и не сопровождаться воспалительными находками при осмотре.'
        }
      },
      ultrasound: {
        headline: { en: 'Ultrasound First-Line', ru: 'Ультразвук как метод первой линии' },
        intro: {
          en: 'Transabdominal ultrasound (TAU) helps visualise pelvic varices, while transvaginal ultrasound (TVU) provides higher-resolution views of the pelvic venous plexus.',
          ru: 'Трансабдоминальное УЗИ (ТАУ) визуализирует тазовые варикозные вены, а трансвагинальное УЗИ (ТВУ) обеспечивает более детальное изображение венозных сплетений.'
        },
        bulletsTitle: { en: 'Practical tips from clinical protocols:', ru: 'Практические рекомендации из клинических протоколов:' },
        bullets: {
          combo: {
            en: 'Combine TAU and TVU with colour Doppler imaging and spectral analysis to characterise reflux patterns (Kuligowska 2005; Stones 1990; Hodgson 1991; Lemasle 2017).',
            ru: 'Комбинируйте ТАУ и ТВУ с цветовым допплером и спектральным анализом, чтобы определить характер рефлюкса (Kuligowska 2005; Stones 1990; Hodgson 1991; Lemasle 2017).'
          },
          positioning: {
            en: 'Use patient positioning (standing or Valsalva manoeuvre) to provoke venous filling when assessing reflux.',
            ru: 'Используйте положения стоя и пробу Вальсальвы, чтобы спровоцировать венозное наполнение при оценке рефлюкса.'
          },
          mapping: {
            en: 'Identify superficial pelvic leak points that may feed lower-limb varicose veins before planning treatment.',
            ru: 'Выявляйте поверхностные точки венозных утечек в малом тазу, питающих варикоз нижних конечностей, до планирования лечения.'
          },
          predictiveValue: {
            en: 'An ovarian vein diameter ≥ 6 mm on TAU carries a reported 96% positive predictive value for pelvic varices.',
            ru: 'Диаметр яичниковой вены ≥ 6 мм по данным ТАУ даёт 96% положительную прогностическую ценность для тазовых варикозов.'
          }
        },
        reference: {
          en: 'Villalba (2018) and South Coast Vascular protocols outline recommended ultrasound equipment, settings, and step-by-step approaches.',
          ru: 'Протоколы Villalba (2018) и South Coast Vascular описывают оборудование, настройки и пошаговую методику ультразвукового исследования.'
        }
      },
      criteria: {
        headline: { en: 'Ultrasound Diagnostic Criteria', ru: 'Ультразвуковые критерии диагностики' },
        intro: {
          en: 'Multiple studies converge on a core set of ultrasound findings that support a PCS diagnosis:',
          ru: 'Ряд исследований сходится во мнении, что следующие признаки подтверждают диагноз СТВЗ:'
        },
        list: {
          veinSize: { en: 'Tortuous pelvic veins measuring greater than 6 mm in diameter.', ru: 'Извилистые тазовые вены диаметром более 6 мм.' },
          flow: { en: 'Slow venous flow under 3 cm/sec or reversed caudal flow.', ru: 'Замедленный венозный ток менее 3 см/с или ретроградное каудальное течение.' },
          arcuate: { en: 'Dilated arcuate veins in the myometrium communicating between bilateral pelvic varices.', ru: 'Расширенные дугообразные вены миометрия, соединяющие двусторонние тазовые варикозы.' },
          ovarianChanges: { en: 'Polycystic changes in the ovaries associated with venous stasis.', ru: 'Поликистозные изменения яичников, связанные с венозным стазом.' }
        },
        citations: {
          en: 'Key references: Park et al. (AJR 2004); Lemasle & Greiner (Phlebolymphology 2017).',
          ru: 'Ключевые источники: Park и др. (AJR 2004); Lemasle & Greiner (Phlebolymphology 2017).'
        }
      },
      workflow: {
        headline: { en: 'Escalating to Advanced Imaging', ru: 'Переход к расширенным методам визуализации' },
        intro: {
          en: 'When ultrasound findings and clinical suspicion align, additional imaging clarifies anatomy and treatment planning.',
          ru: 'Когда клиника и УЗ-данные согласуются, дополнительные методы помогают уточнить анатомию и подготовить план лечения.'
        },
        steps: {
          venography: {
            en: 'Hyperselective descending pelvic venography remains the gold standard for mapping reflux and planning embolisation when intervention is considered.',
            ru: 'Гиперселективная нисходящая тазовая венография остаётся золотым стандартом картирования рефлюкса и планирования эмболизации при выборе вмешательства.'
          },
          crossSectional: {
            en: 'CT or MR imaging (including MR venography) helps characterise venous dilation, rule out compressive syndromes, and support multidisciplinary decisions.',
            ru: 'КТ или МР-исследования (включая МР-венографию) позволяют оценить степень дилатации, исключить компрессионные синдромы и поддержать мультидисциплинарные решения.'
          },
          predictiveModels: {
            en: 'Recent TVU predictive models (Valero 2022; Garcia-Jimenez 2023) assist in triaging who truly needs invasive venography.',
            ru: 'Новые предиктивные модели ТВУ (Valero 2022; Garcia-Jimenez 2023) помогают определить, кому действительно требуется инвазивная венография.'
          }
        }
      },
      evidence: {
        headline: { en: 'Evidence Base', ru: 'Доказательная база' },
        intro: {
          en: 'International guidelines and consensus documents recognise ultrasound—especially TVU—as a reliable screening tool, with venography reserved for definitive confirmation and treatment planning.',
          ru: 'Международные рекомендации и консенсусы признают УЗИ, особенно ТВУ, надёжным скрининговым инструментом; венография остаётся для окончательного подтверждения и планирования вмешательства.'
        },
        studies: {
          uip: {
            en: 'UIP Consensus (2019): Endorses combined TAU/TVU protocols and highlights the diagnostic value of standing and Valsalva assessments.',
            ru: 'Консенсус UIP (2019): поддерживает комбинированные протоколы ТАУ/ТВУ и подчёркивает ценность исследований стоя и при пробе Вальсальвы.'
          },
          bookwalter: {
            en: 'Bookwalter (2019): Notes emerging agreement that transvaginal duplex ultrasound can replace venography as the first-line haemodynamic study.',
            ru: 'Bookwalter (2019): подчёркивает, что трансвагинальное дуплексное УЗИ постепенно заменяет венографию как первичное гемодинамическое исследование.'
          },
          kashef: {
            en: 'Kashef (2023): Recommends pairing ultrasound modalities with colour Doppler for comprehensive venous assessment.',
            ru: 'Kashef (2023): рекомендует сочетать ультразвуковые методики с цветовым допплером для комплексной оценки венозного русла.'
          },
          holdstock: {
            en: 'Holdstock et al. (2015) and Whiteley et al. (2015): Link haemorrhoids and pelvic reflux, reinforcing the need to evaluate pelvic veins in complex varicose presentations.',
            ru: 'Holdstock и др. (2015), Whiteley и др. (2015): связывают геморрой с рефлюксом внутренних подвздошных вен и подчёркивают необходимость оценки тазовых вен при сложных формах варикоза.'
          }
        },
        closing: {
          en: 'Together, these findings support a progressive diagnostic pathway: recognise symptom clusters, document reflux on ultrasound, then escalate to venography or advanced imaging when intervention is planned.',
          ru: 'В совокупности данные поддерживают пошаговый алгоритм: распознать симптомокомплекс, подтвердить рефлюкс на УЗИ и при планировании вмешательства дополнить обследование венографией или КТ/МР-методами.'
        }
      }
    }
  },
  endometriosisPage: {
    hero: {
      title: {
        en: 'Endometriosis: Understanding the Condition and Its Overlap with Other Diseases',
        ru: 'Эндометриоз: понимание состояния и его пересечения с другими заболеваниями'
      },
      headline: {
        en: 'Endometriosis is more than one disease—it’s part of a bigger picture.',
        ru: 'Эндометриоз — это больше, чем одно заболевание: это часть более широкой картины.'
      },
      description: {
        en: 'Discover how endometriosis can overlap with Pelvic Congestion Syndrome (PCS) and why understanding these links matters for better care.',
        ru: 'Узнайте, как эндометриоз пересекается с синдромом тазового венозного застоя (СТВЗ) и почему понимание этих связей важно для лучшего лечения.'
      },
      primaryCta: { en: 'Take the Symptom Questionnaire', ru: 'Пройдите опрос по симптомам' }
    },
    sections: {
      whatIs: {
        headline: { en: 'What is Endometriosis?', ru: 'Что такое эндометриоз?' },
        body: {
          en: 'Endometriosis occurs when tissue similar to the lining of the uterus grows outside it, causing pain, inflammation, and sometimes infertility.',
          ru: 'Эндометриоз возникает, когда ткань, похожая на слизистую оболочку матки, растет вне её пределов, вызывая боль, воспаление и иногда бесплодие.'
        },
        symptomsTitle: { en: 'Common symptoms include:', ru: 'К распространённым симптомам относятся:' },
        symptoms: {
          pelvicPain: { en: 'Chronic pelvic pain', ru: 'Хроническая тазовая боль' },
          periodPain: { en: 'Pain during periods or intercourse', ru: 'Боль во время менструаций или при половом акте' },
          discomfort: { en: 'Digestive or urinary discomfort', ru: 'Дискомфорт со стороны пищеварительной или мочевой систем' }
        }
      },
      overlap: {
        headline: { en: 'Why Overlap Matters', ru: 'Почему важно учитывать сопутствующие заболевания' },
        body: {
          en: 'Endometriosis rarely acts alone. Conditions like Pelvic Congestion Syndrome (PCS) often coexist, intensifying pain and delaying diagnosis.',
          ru: 'Эндометриоз редко бывает единственной причиной хронической тазовой боли. Такие состояния, как синдром тазового венозного застоя (СТВЗ), часто присутствуют одновременно, усиливая боль и затрудняя диагностику.'
        },
        stats: {
          first: { en: 'Up to 80% of women with endometriosis show signs of PCS (ovarian varices).', ru: 'До 80% женщин с эндометриозом имеют признаки СТВЗ (варикоз вен малого таза).' },
          second: { en: 'Overlapping conditions can lead to years of delayed treatment.', ru: 'Сопутствующие заболевания могут приводить к многолетним задержкам в лечении.' }
        },
        cta: { en: 'Learn About PCS', ru: 'Узнать о СТВЗ' }
      },
      help: {
        headline: { en: 'How We Help', ru: 'Как мы помогаем' },
        body: {
          en: 'Our platform uses validated Endopain-4D and PVVQ questionnaires to map symptoms and uncover possible overlaps.',
          ru: 'Мы используем валидированные опросники Endopain-4D и PVVQ, чтобы картировать ваши симптомы и выявлять возможные пересечения.'
        },
        body2: {
          en: 'Your input supports integrated care models—gynecologists, vascular specialists, and pain experts working together.',
          ru: 'Ваш вклад поддерживает интегрированные модели помощи, где гинекологи, сосудистые хирурги и интервенционные радиологи работают вместе.'
        },
        cta: { en: 'Start Your Questionnaire Now', ru: 'Начните опрос сейчас' }
      },
      science: {
        headline: { en: 'Backed by Science', ru: 'Подтверждено наукой' },
        intro: {
          en: 'Explore clinical research confirming the link between endometriosis and PCS:',
          ru: 'Изучите клинические исследования, подтверждающие связь между эндометриозом и СТВЗ:'
        },
        links: {
          study1: { en: 'Endometriosis and PCS Overlap Study (Women’s Health Journal)', ru: 'Исследование пересечения эндометриоза и СТВЗ (Women’s Health Journal)' },
          study2: { en: 'PCS as Differential Diagnosis in Chronic Pelvic Pain', ru: 'СТВЗ как дифференциальный диагноз хронической тазовой боли' },
          study3: { en: 'Endometriosis vs PCS Explained', ru: 'Эндометриоз против СТВЗ: объяснение' }
        }
      },
      voice: {
        headline: { en: 'Your Voice Can Change Care', ru: 'Ваш голос может изменить подход к помощи' },
        body: {
          en: 'Every questionnaire completed brings us closer to proving what many women already feel: endometriosis and PCS often go hand in hand.',
          ru: 'Каждый заполненный опрос приближает нас к подтверждению того, что эндометриоз и СТВЗ часто идут рука об руку.'
        },
        body2: {
          en: 'Together, we can push for faster diagnosis, better treatment, and improved quality of life.',
          ru: 'Вместе мы можем добиться более быстрой диагностики, лучшего лечения и повышения качества жизни.'
        },
        cta: { en: 'Join the Movement – Share Your Symptoms', ru: 'Присоединяйтесь — поделитесь своими симптомами' }
      }
    }
  },
  video: {
    heading: {
      en: "Pelvic Health is Essential for Women's Wellness",
      ru: 'Здоровье тазового дна — ключ к благополучию женщины'
    },
    description: {
      en: 'Learn why pelvic health is fundamental to your overall wellness and quality of life. This educational video explains the importance of maintaining strong pelvic floor muscles throughout different life stages.',
      ru: 'Узнайте, почему здоровье тазового дна является основой общего самочувствия и качества жизни. Это обучающее видео объясняет, как важно поддерживать мышцы тазового дна сильными на разных этапах жизни.'
    },
    title: { en: 'Pelvic Health Video', ru: 'Видео о здоровье тазового дна' }
  },
  valueProps: {
    quickTitle: { en: 'Quick & Easy', ru: 'Быстро и просто' },
    quickCopy: {
      en: 'Complete your assessment in just 5-10 minutes',
      ru: 'Пройдите оценку всего за 5–10 минут'
    },
    quickAlt: { en: 'Clock icon - Quick & Easy', ru: 'Значок часов — быстро и просто' },
    privateTitle: { en: 'Private & Secure', ru: 'Приватно и безопасно' },
    privateCopy: {
      en: 'Your data is encrypted and completely confidential',
      ru: 'Ваши данные зашифрованы и полностью конфиденциальны'
    },
    privateAlt: { en: 'Shield icon - Private & Secure', ru: 'Значок щита — приватно и безопасно' },
    expertTitle: { en: 'Expert Insights', ru: 'Экспертные рекомендации' },
    expertCopy: {
      en: 'Recommendations backed by medical professionals',
      ru: 'Рекомендации, основанные на мнении медицинских специалистов'
    },
    expertAlt: { en: 'Medical icon - Expert Insights', ru: 'Медицинский значок — экспертные рекомендации' }
  },
  testimonials: {
    heading: { en: 'What Our Patients Say', ru: 'Что говорят наши пациенты' },
    default1: {
      en: 'The chat-style questions were easy to follow on my phone, and I finally see how my symptoms connect.',
      ru: 'Вопросы в формате чата легко проходить на телефоне — теперь понимаю, как мои симптомы связаны.'
    },
    default2: {
      en: 'I love that it creates a private patient ID with no sign-up. Everything stays confidential yet organized.',
      ru: 'Понравилось, что создаётся личный идентификатор без регистрации: всё конфиденциально и легко продолжить позже.'
    },
    default3: {
      en: 'The PDF summary with PCS and endometriosis guidance helped me prepare for my gynecologist visit.',
      ru: 'PDF-отчёт с подсказками по СТВЗ и эндометриозу помог подготовиться к визиту к гинекологу.'
    },
    ratingLabel: {
      en: 'Rated {{rating}} out of 5',
      ru: 'Оценка {{rating}} из 5'
    }
  },
  auth: {
    adminTitle: { en: 'Admin login', ru: 'Вход для администратора' },
    adminSubtitle: { en: 'Sign in to access the dashboard.', ru: 'Войдите, чтобы получить доступ к панели.' },
    doctorTitle: { en: 'Doctor login', ru: 'Вход для врача' },
    doctorSubtitle: {
      en: 'Access your patient dashboard with the credentials provided by the admin.',
      ru: 'Используйте выданные администратором данные, чтобы открыть панель пациента.'
    },
    username: { en: 'Username', ru: 'Имя пользователя' },
    password: { en: 'Password', ru: 'Пароль' },
    signIn: { en: 'Sign in', ru: 'Войти' },
    errors: {
      rateLimit: { en: 'Too many attempts. Try again later.', ru: 'Слишком много попыток. Попробуйте позже.' },
      invalidInput: { en: 'Invalid input.', ru: 'Некорректные данные.' },
      invalidCredentials: { en: 'Invalid credentials.', ru: 'Неверные учетные данные.' }
    }
  },
  assessmentIntro: {
    title: { en: 'Health Assessment', ru: 'Оценка состояния здоровья' },
    intro1: {
      en: 'This short assessment captures key information about your symptoms and experiences.',
      ru: 'Эта короткая оценка собирает ключевую информацию о ваших симптомах и опыте.'
    },
    intro2: {
      en: "It's designed to be quick, private, and helpful for deciding the next steps.",
      ru: 'Она создана, чтобы быть быстрой, конфиденциальной и помочь определить дальнейшие шаги.'
    },
    intro3: {
      en: "When you finish, you'll get a result and resources tailored to your situation.",
      ru: 'По завершении вы получите результат и рекомендации, адаптированные под вашу ситуацию.'
    },
    timeEstimate: { en: 'Time to complete: ~5 minutes', ru: 'Время прохождения: ~5 минут' }
  },
  share: {
    invalidTitle: { en: 'Invalid link', ru: 'Недействительная ссылка' },
    invalidDescription: { en: 'Please check the code you received.', ru: 'Проверьте полученный код.' },
    heading: { en: 'Pelvic Health Check', ru: 'Проверка здоровья тазового дна' },
    disclaimer: { en: 'Informational only — not a medical diagnosis.', ru: 'Только для информации — не является медицинским диагнозом.' }
  },
  assessment: {
    title: { en: 'Health Assessment', ru: 'Оценка состояния здоровья' },
    header: {
      aria: { en: 'Assessment header', ru: 'Заголовок оценки' },
      questionProgress: {
        en: 'Question {{current}} of {{total}}',
        ru: 'Вопрос {{current}} из {{total}}'
      },
      downloadAria: { en: 'Download assessment PDF', ru: 'Скачать PDF отчёта' },
      downloadTitle: { en: 'Download PDF', ru: 'Скачать PDF' },
      restartAria: { en: 'Restart assessment', ru: 'Перезапустить оценку' },
      restartTitle: { en: 'Restart', ru: 'Перезапуск' }
    },
    restart: {
      warning: {
        en: 'Starting over will discard your current answers. You can keep this session if you want to return later.',
        ru: 'Если начать заново, текущие ответы будут удалены. Вы можете сохранить эту сессию, чтобы вернуться позже.'
      }
    },
    inputPlaceholder: { en: 'Enter value', ru: 'Введите значение' },
    noSteps: { en: 'No steps configured.', ru: 'Шаги не настроены.' }
  },
  chat: {
    completion: {
      en: "Thanks! You've completed the questions for now. Your assessment is complete.",
      ru: 'Спасибо! Вы ответили на все вопросы. Оценка завершена.'
    },
    preparingReport: {
      en: 'Preparing your PDF report... this usually takes a few seconds.',
      ru: 'Готовим ваш PDF-отчёт... обычно это занимает несколько секунд.'
    },
    preparingShort: {
      en: 'Preparing your PDF...',
      ru: 'Готовим ваш PDF...'
    },
    pdfReminder: {
      en: 'Please download and keep this PDF. Your Assessment ID is {{token}}. Save it somewhere safe (note it down or take a screenshot) so you can use it on the PDF Search page if you misplace the download.',
      ru: 'Пожалуйста, скачайте и сохраните этот PDF. Ваш идентификатор оценки — {{token}}. Сохраните его в надёжном месте (запишите или сделайте скриншот), чтобы при необходимости найти файл на странице поиска PDF.'
    },
    reportReady: {
      en: 'Your PDF report is ready. Use the button below to download it.',
      ru: 'Ваш PDF-отчёт готов. Используйте кнопку ниже, чтобы скачать его.'
    },
    reportError: {
      en: 'We had trouble generating your PDF. You can try again below.',
      ru: 'Не удалось сформировать PDF. Попробуйте ещё раз ниже.'
    },
    networkError: {
      en: 'Network error while generating the report.',
      ru: 'Сетевая ошибка при создании отчёта.'
    },
    statusError: {
      en: 'Could not generate report ({{status}}).',
      ru: 'Не удалось создать отчёт ({{status}}).'
    },
    answerFailed: {
      en: 'Answer failed',
      ru: 'Не удалось сохранить ответ'
    },
    idNotFound: {
      en: 'We could not find that ID. Double-check and try again.',
      ru: 'Не удалось найти этот идентификатор. Проверьте и попробуйте снова.'
    },
    patientIdPrompt: {
      en: 'Please enter your Patient ID to continue.',
      ru: 'Введите идентификатор пациента, чтобы продолжить.'
    },
    sessionStartFailed: {
      en: 'Failed to start a new session.',
      ru: 'Не удалось запустить новую сессию.'
    },
    doctorAlt: {
      en: 'Doctor avatar',
      ru: 'Аватар врача'
    },
    userAlt: {
      en: 'You',
      ru: 'Вы'
    }
  }
,
  admin: {
    nav: {
      overview: { en: 'Overview', ru: 'Обзор' },
      doctors: { en: 'Doctors', ru: 'Врачи' }
    },
    range: {
      selectLabel: { en: 'Date range', ru: 'Период' },
      all: { en: 'All time', ru: 'За всё время' },
      last30: { en: 'Last 30 days', ru: 'Последние 30 дней' },
      last7: { en: 'Last 7 days', ru: 'Последние 7 дней' },
      today: { en: 'Today', ru: 'Сегодня' }
    },
    stats: {
      completedAll: { en: 'Completed all parts', ru: 'Завершили все части' },
      part1Only: { en: 'Part 1 only', ru: 'Только часть 1' },
      pvvqContinued: { en: 'PVVQ continued', ru: 'Продолжили PVVQ' },
      conversionRate: { en: 'PVVQ conversion rate', ru: 'Конверсия в PVVQ' }
    },
    patients: {
      title: { en: 'Recent patients', ru: 'Недавние пациенты' },
      empty: { en: 'No recent patients yet.', ru: 'Недавних пациентов пока нет.' },
      headers: {
        patient: { en: 'Patient', ru: 'Пациент' },
        severity: { en: 'Severity', ru: 'Тяжесть' },
        status: { en: 'Status', ru: 'Статус' },
        lastSeen: { en: 'Last assessment', ru: 'Последняя оценка' }
      },
      severity: {
        low: { en: 'Low', ru: 'Низкая' },
        medium: { en: 'Medium', ru: 'Средняя' },
        high: { en: 'High', ru: 'Высокая' }
      },
      status: {
        new: { en: 'New', ru: 'Новый' },
        pending: { en: 'Pending', ru: 'В ожидании' },
        reviewed: { en: 'Reviewed', ru: 'Просмотрено' }
      },
      noDate: { en: '—', ru: '—' }
    },
    analytics: {
      title: { en: 'Endopain vs PVVQ trend', ru: 'Соотношение Endopain и PVVQ' },
      datasets: {
        sessions: { en: 'Sessions', ru: 'Сессии' },
        fit: { en: 'Trend line', ru: 'Линия тренда' }
      },
      axes: {
        x: { en: 'ENDOPAIN-4D Global Score (0–100)', ru: 'Общий балл ENDOPAIN-4D (0–100)' },
        y: { en: 'PVVQ Total Score (20–100)', ru: 'Суммарный балл PVVQ (20–100)' }
      },
      tooltip: { en: '{{label}}: Endopain {{x}}, PVVQ {{y}}', ru: '{{label}}: Endopain {{x}}, PVVQ {{y}}' },
      empty: { en: 'Not enough data yet.', ru: 'Недостаточно данных.' }
    },
    doctors: {
      title: { en: 'Doctor access', ru: 'Доступ врачей' },
      subtitle: { en: 'Create logins and share links for each doctor.', ru: 'Создавайте логины и приватные ссылки для врачей.' },
      created: { en: 'Doctor {{code}} created successfully.', ru: 'Доктор {{code}} успешно создан.' },
      errors: {
        invalidInput: { en: 'Check the username, password, and region.', ru: 'Проверьте логин, пароль и регион.' },
        usernameTaken: { en: 'That username is already in use.', ru: 'Такой логин уже используется.' },
        resourceExhausted: { en: 'Could not allocate a new doctor ID. Please try again.', ru: 'Не удалось выделить новый ID врача. Попробуйте снова.' },
        generic: { en: 'Unable to create doctor credentials. Please try again.', ru: 'Не удалось создать учетную запись врача. Попробуйте снова.' }
      },
      createTitle: { en: 'Create doctor credentials', ru: 'Создать учетную запись врача' },
      createHint: { en: 'Set a username, password, and default region. The doctor receives a private link and QR code to share with patients.', ru: 'Укажите логин, пароль и регион. Врач получит приватную ссылку и QR-код для пациентов.' },
      username: { en: 'Username', ru: 'Логин' },
      password: { en: 'Password', ru: 'Пароль' },
      passwordHint: { en: 'Minimum 8 characters. Share securely with the doctor.', ru: 'Минимум 8 символов. Передавайте врачу безопасным способом.' },
      regionLabel: { en: 'Region / language', ru: 'Регион / язык' },
      regionHint: { en: 'Determines the language doctors see in their dashboard.', ru: 'Определяет язык интерфейса врача.' },
      region: {
        en: { en: 'Poland (English)', ru: 'Польша (англ.)' },
        ru: { en: 'Russia (Russian)', ru: 'Россия (рус.)' },
        kz: { en: 'Kazakhstan (Kazakh)', ru: 'Казахстан (каз.)' },
        hr: { en: 'Croatia (Croatian)', ru: 'Хорватия (хорв.)' },
        sk: { en: 'Slovakia (Slovak)', ru: 'Словакия (словац.)' }
      },
      createSubmit: { en: 'Create doctor', ru: 'Создать врача' },
      instructions: {
        title: { en: 'How it works', ru: 'Как это работает' },
        line1: { en: 'Each doctor receives a three-character ID and private share link.', ru: 'Каждый врач получает трёхсимвольный ID и приватную ссылку.' },
        line2: { en: 'Share the link or QR code so patients are linked automatically.', ru: 'Передавайте ссылку или QR-код, чтобы пациенты автоматически связывались с врачом.' },
        line3: { en: 'You can reset passwords or revoke access any time via Supabase.', ru: 'Вы можете сбросить пароль или закрыть доступ через Supabase.' }
      },
      listTitle: { en: 'Active doctors', ru: 'Активные врачи' },
      listCount: { en: '{{count}} total', ru: 'Всего: {{count}}' },
      empty: { en: 'No doctors yet. Create the first credentials above.', ru: 'Врачи ещё не созданы. Создайте первую учетную запись выше.' },
      doctorId: { en: 'Doctor ID', ru: 'ID врача' },
      createdAt: { en: 'Created', ru: 'Создан' },
      usernameLabel: { en: 'Username', ru: 'Логин' },
      shareLink: { en: 'Share link', ru: 'Ссылка для пациентов' },
      copyLink: { en: 'Copy link', ru: 'Скопировать ссылку' },
      copied: { en: 'Copied!', ru: 'Скопировано!' },
      openLink: { en: 'Open link', ru: 'Открыть ссылку' },
      qrAlt: { en: 'QR code for doctor {{code}}', ru: 'QR-код для врача {{code}}' }
    }
  },
  contactPage: {
    title: { en: 'Contact our team', ru: 'Связаться с нашей командой' },
    description: {
      en: 'Leave your contact details and a short note. A member of the Smart Health team will reach out soon.',
      ru: 'Оставьте свои контакты и короткое сообщение. Специалист Smart Health свяжется с вами в ближайшее время.'
    },
    phoneLabel: { en: 'Phone / WhatsApp (optional)', ru: 'Телефон / WhatsApp (необязательно)' },
    phonePlaceholder: { en: 'Phone number', ru: 'Номер телефона' },
    phoneHint: {
      en: 'Optional — include your country prefix if you prefer a call or WhatsApp message.',
      ru: 'Необязательно — укажите международный код, если хотите, чтобы мы связались по телефону или WhatsApp.'
    },
    emailLabel: { en: 'Email', ru: 'Email' },
    emailPlaceholder: { en: 'name@example.com', ru: 'name@example.com' },
    messageLabel: { en: 'Message', ru: 'Сообщение' },
    messagePlaceholder: {
      en: 'Tell us how we can help...',
      ru: 'Расскажите, чем мы можем помочь...'
    },
    submit: { en: 'Send message', ru: 'Отправить сообщение' },
    submitting: { en: 'Sending...', ru: 'Отправка...' },
    success: {
      en: 'Thanks! Your message was sent. We will get back to you shortly.',
      ru: 'Спасибо! Ваше сообщение отправлено. Мы свяжемся с вами в ближайшее время.'
    },
    errors: {
      contactRequired: {
        en: 'Please provide either a phone number with prefix or an email address.',
        ru: 'Пожалуйста, укажите телефон с кодом страны или адрес электронной почты.'
      },
      invalidPhone: {
        en: 'That phone number does not look valid.',
        ru: 'Этот номер телефона выглядит некорректным.'
      },
      invalidEmail: {
        en: 'Please enter a valid email address.',
        ru: 'Введите корректный адрес электронной почты.'
      },
      messageRequired: {
        en: 'Let us know how we can help.',
        ru: 'Напишите, чем мы можем помочь.'
      }
    }
  },
  doctor_invite: {
    meta: { en: 'Doctor ID {{code}}', ru: 'ID врача {{code}}' },
    title: { en: 'Start your assessment', ru: 'Начните опрос' },
    subtitle: {
      en: 'Answer a few questions to generate a personalized report linked to your doctor.',
      ru: 'Ответьте на несколько вопросов, чтобы получить персональный отчет, привязанный к вашему врачу.'
    },
    newTitle: { en: 'New patient', ru: 'Новый пациент' },
    newDescription: {
      en: 'We will create a new patient ID that is linked to this doctor. You can reuse it next time.',
      ru: 'Мы создадим новый ID пациента, связанный с этим врачом. Его можно использовать в следующий раз.'
    },
    returningTitle: { en: 'Returning patient', ru: 'Возвращающийся пациент' },
    returningDescription: {
      en: 'Enter your existing patient ID to continue where you left off.',
      ru: 'Введите существующий ID пациента, чтобы продолжить с того места, где остановились.'
    },
    buttons: {
      new: { en: 'Start as new patient', ru: 'Начать как новый пациент' },
      returning: { en: 'Continue with my ID', ru: 'Продолжить с моим ID' },
      loading: { en: 'Please wait...', ru: 'Пожалуйста, подождите...' }
    },
    errors: {
      patientFormat: { en: 'Patient ID should look like A12AB123.', ru: 'ID пациента должен выглядеть как A12AB123.' },
      patientNotFound: { en: 'We could not find that patient ID. Please double-check the letters and digits.', ru: 'Мы не нашли такой ID пациента. Проверьте буквы и цифры.' },
      assessmentLimit: { en: 'This patient has reached the maximum number of linked assessments.', ru: 'Для этого пациента достигнут лимит связанных опросов.' },
      linkExpired: { en: 'This link is no longer valid. Please request a new QR code from your doctor.', ru: 'Срок действия ссылки истек. Попросите у врача новый QR-код.' },
      generic: { en: 'Unable to start the session. Please try again.', ru: 'Не удалось начать сессию. Попробуйте еще раз.' },
      network: { en: 'Network error. Please try again.', ru: 'Ошибка сети. Попробуйте еще раз.' }
    },
    patientLabel: { en: 'Patient ID', ru: 'ID пациента' },
    patientPlaceholder: { en: 'A12AB123', ru: 'A12AB123' },
    patientHint: { en: 'Example format: A12AB123', ru: 'Пример формата: A12AB123' },
    footer: {
      en: 'Your answers remain private. You can stop at any time and download a PDF report at the end.',
      ru: 'Ваши ответы остаются конфиденциальными. Вы можете остановиться в любой момент и скачать PDF-отчет.'
    }
  },
  doctor: {
    sidebar: {
      patients: { en: 'Assessments', ru: 'Оценки' },
      qrTitle: { en: 'Personal QR', ru: 'Персональный QR' },
      qrHint: { en: 'Scan to connect patients to you', ru: 'Отсканируйте, чтобы пациенты могли подключиться к вам' },
      share: { en: 'Share QR', ru: 'Поделиться QR' }
    },
    profile: {
      idLabel: { en: 'Doctor ID', ru: 'ID врача' },
      copy: { en: 'Copy share link', ru: 'Скопировать ссылку' },
      copied: { en: 'Copied!', ru: 'Скопировано!' },
      shareHint: {
        en: 'Share this private link or QR code so new patients are linked to you automatically.',
        ru: 'Передавайте эту приватную ссылку или QR-код, чтобы новые пациенты автоматически связывались с вами.'
      },
      qrAlt: { en: 'QR code for doctor {{code}}', ru: 'QR-код для врача {{code}}' }
    },
    header: {
      title: { en: 'Doctor Dashboard', ru: 'Панель врача' },
      subtitle: { en: 'Search assessments by patient or assessment ID.', ru: 'Ищите оценки по пациенту или идентификатору оценки.' }
    },
    search: {
      placeholder: { en: 'Enter assessment token (10 or 16 chars) or patient ID (e.g. A12AB123)', ru: 'Введите токен оценки (10 или 16 символов) или ID пациента (например, A12AB123)' },
      button: { en: 'Search', ru: 'Поиск' },
      buttonLoading: { en: 'Searching...', ru: 'Поиск...' },
      clear: { en: 'Clear', ru: 'Очистить' },
      infoAssessment: { en: 'Showing assessment token {{token}}{{suffix}}', ru: 'Показана оценка с токеном {{token}}{{suffix}}' },
      infoAssessmentSuffix: { en: ' for patient {{patient}}', ru: ' для пациента {{patient}}' },
      infoPatient: { en: 'Showing patient {{patient}} with {{count}} assessments.', ru: 'Показан пациент {{patient}} (оценок: {{count}}).' },
      errors: {
        emptyInput: { en: 'Enter an assessment token or patient ID.', ru: 'Введите токен оценки или ID пациента.' },
        notFound: { en: 'No results found.', ru: 'Ничего не найдено.' },
        noAccess: { en: 'You do not have access to this patient.', ru: 'У вас нет доступа к этому пациенту.' },
        unreachable: { en: 'Unable to reach lookup service.', ru: 'Не удалось связаться со службой поиска.' }
      }
    },
    status: {
      loading: { en: 'Fetching data...', ru: 'Загрузка данных...' }
    },
    scores: {
      endopain: {
        label: { en: 'ENDOPAIN Global', ru: 'ENDOPAIN Global' },
        help: { en: '0-100 (lower is better)', ru: '0-100 (ниже — лучше)' }
      },
      pvvq: {
        label: { en: 'PVVQ Total', ru: 'PVVQ Total' },
        help: { en: '20-100 (lower is better)', ru: '20-100 (ниже — лучше)' }
      },
      pcsYes: {
        label: { en: 'PCS Yes Count', ru: 'Количество ответов «Да» PCS' },
        help: { en: 'Positive if ≥ 2 Yes', ru: 'Положительно при ≥ 2 ответах «Да»' },
        positive: { en: 'Positive screen', ru: 'Положительный скрининг' },
        below: { en: 'Below threshold', ru: 'Ниже порога' }
      }
    },
    delta: {
      none: { en: 'No prior data', ru: 'Нет предыдущих данных' },
      noChange: { en: 'No change', ru: 'Без изменений' },
      improved: { en: 'Improved', ru: 'Улучшение' },
      worsened: { en: 'Worsened', ru: 'Ухудшение' },
      noValue: { en: '--', ru: '--' }
    },
    misc: {
      notAvailable: { en: 'n/a', ru: '—' },
      selectPrompt: { en: 'Select an assessment to preview its PDF.', ru: 'Выберите оценку, чтобы просмотреть её PDF.' },
      download: { en: 'Download PDF', ru: 'Скачать PDF' },
      open: { en: 'Open in new tab', ru: 'Открыть в новой вкладке' },
      completed: { en: 'Completed {{date}}', ru: 'Завершено {{date}}' },
      assessmentTitle: { en: 'Assessment {{token}}', ru: 'Оценка {{token}}' },
      latest: { en: 'Latest {{metric}}', ru: 'Последний показатель {{metric}}' },
      listItemTitle: { en: 'Assessment {{token}}', ru: 'Оценка {{token}}' }
    }
  }
};





