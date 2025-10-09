import type { Language } from './types';

type Leaf = Record<Language, string>;

type Node = Leaf | { [key: string]: Node };

export const translations: Record<string, Node> = {
  common: {
    brand: { en: 'Smart Health', ru: 'Smart Health' },
    privacyTagline: {
      en: 'private by design',
      ru: 'конфиденциально по задумке'
    },
    selectLanguage: { en: 'Language', ru: 'Язык' },
    english: { en: 'English', ru: 'Английский' },
    russian: { en: 'Russian', ru: 'Русский' }
  },
  nav: {
    home: { en: 'Home', ru: 'Главная' },
    assessment: { en: 'Assessment', ru: 'Оценка' },
    pdfSearch: { en: 'PDF Search', ru: 'Поиск PDF' },
    pcs: { en: 'PCS', ru: 'СТВЗ' },
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
    title: { en: 'Your Health Matters', ru: 'Ваше здоровье имеет значение' },
    copy: {
      en: 'Get personalized health insights through our AI-powered assessment. Quick, private, and designed by medical experts.',
      ru: 'Получите персональные рекомендации о здоровье с помощью нашей AI-оценки. Быстро, конфиденциально и создано медицинскими экспертами.'
    },
    subtitle: {
      en: 'Quick, private AI-powered insights.',
      ru: 'Быстрые конфиденциальные рекомендации на основе ИИ.'
    },
    meta: {
      en: '~5 minutes · No sign-up · Free of charge',
      ru: '~5 минут · Без регистрации · Бесплатно'
    }
  },
  pdfSearch: {
    title: { en: 'Find your PDF report', ru: 'Найдите свой PDF-отчёт' },
    description: {
      en: 'Enter your 16-character token (e.g. <code class="px-1 rounded bg-neutral-50">AB2C...</code>) to retrieve your report.',
      ru: 'Введите свой 16-значный токен (например, <code class="px-1 rounded bg-neutral-50">AB2C...</code>), чтобы получить отчёт.'
    },
    placeholder: { en: 'Enter your token (16 characters)', ru: 'Введите токен (16 символов)' },
    search: { en: 'Search', ru: 'Найти' },
    searching: { en: 'Searching...', ru: 'Поиск...' },
    found: { en: 'Found PDF - ready to download.', ru: 'PDF найден — готов к загрузке.' },
    download: { en: 'Download PDF', ru: 'Скачать PDF' },
    previewTitle: { en: 'PDF preview', ru: 'Предпросмотр PDF' },
    errors: {
      invalidFormat: { en: 'Token must be 16 characters (A-Z, 0-9).', ru: 'Токен должен содержать 16 символов (A-Z, 0-9).' },
      notFound: { en: 'Invalid token - this token does not exist.', ru: 'Недействительный токен — такого токена не существует.' },
      rateLimited: { en: 'Too many attempts. Try again in {{seconds}} seconds.', ru: 'Слишком много попыток. Повторите через {{seconds}} секунд.' },
      noPdf: { en: 'Report not available yet. Please try again later.', ru: 'Отчёт пока недоступен. Попробуйте позже.' },
      generic: { en: 'An error occurred - please try again.', ru: 'Произошла ошибка — попробуйте ещё раз.' }
    }
  },
  knowledge: {
    heading: {
      en: 'Empower Yourself with Knowledge About Pelvic Health',
      ru: 'Расширяйте знания о здоровье тазового дна'
    },
    stat1: {
      title: { en: '1 in 3', ru: '1 из 3' },
      copy: {
        en: 'Women experience pelvic floor dysfunction during their lifetime',
        ru: 'Женщины сталкиваются с дисфункцией тазового дна в течение жизни'
      },
      alt: { en: 'Chart icon', ru: 'Значок диаграммы' }
    },
    stat2: {
      title: { en: '50%', ru: '50%' },
      copy: {
        en: 'Of women over 50 experience some form of pelvic organ prolapse',
        ru: 'У 50% женщин старше 50 лет наблюдается форма пролапса органов малого таза'
      },
      alt: { en: 'Group icon', ru: 'Значок группы' }
    },
    stat3: {
      title: { en: '85%', ru: '85%' },
      copy: {
        en: 'Improvement rate with proper pelvic floor therapy and care',
        ru: 'Показатель улучшения при правильной терапии и уходе за тазовым дном'
      },
      alt: { en: 'Heart icon', ru: 'Значок сердца' }
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
      title: { en: 'Pelvic Congestion Syndrome (PCS)', ru: 'Синдром тазового венозного застоя (СТВЗ)' },
      description: {
        en: 'Understand how PCS can drive chronic pelvic pain and what collaborative care can do to help.',
        ru: 'Поймите, как СТВЗ влияет на хроническую тазовую боль и как междисциплинарная помощь может помочь.'
      },
      cta: { en: 'Start the assessment', ru: 'Начать оценку' }
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
        headline: { en: 'Why Overlap Matters', ru: 'Почему важно учитывать пересечения' },
        body: {
          en: 'Endometriosis rarely acts alone. Conditions like Pelvic Congestion Syndrome (PCS) often coexist, intensifying pain and delaying diagnosis.',
          ru: 'Эндометриоз редко действует в одиночку. Такие состояния, как синдром тазового венозного застоя (СТВЗ), часто присутствуют одновременно, усиливая боль и затрудняя диагностику.'
        },
        stats: {
          first: { en: 'Up to 80% of women with endometriosis show signs of PCS (ovarian varices).', ru: 'До 80% женщин с эндометриозом имеют признаки СТВЗ (оварикоз).' },
          second: { en: 'Overlapping conditions can lead to years of delayed treatment.', ru: 'Пересекающиеся состояния могут приводить к многолетним задержкам в лечении.' }
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
          ru: 'Ваш вклад поддерживает интегрированные модели помощи, где гинекологи, сосудистые специалисты и эксперты по боли работают вместе.'
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
      en: 'The assessment was so easy to use and gave me valuable insights about my health. Highly recommend!',
      ru: 'Оценка оказалась очень простой в использовании и дала ценные сведения о моём здоровье. Очень рекомендую!'
    },
    default2: {
      en: 'Quick, private, and the recommendations were spot on. This tool is a game-changer.',
      ru: 'Быстро, конфиденциально, а рекомендации действительно точные. Этот инструмент меняет правила игры.'
    },
    default3: {
      en: 'I love how comprehensive yet simple the assessment is. Great user experience!',
      ru: 'Мне нравится, что оценка одновременно подробная и простая. Отличный пользовательский опыт!'
    },
    ratingLabel: {
      en: 'Rated {{rating}} out of 5',
      ru: 'Оценка {{rating}} из 5'
    }
  },
  auth: {
    adminTitle: { en: 'Admin login', ru: 'Вход для администратора' },
    adminSubtitle: { en: 'Sign in to access the dashboard.', ru: 'Войдите, чтобы получить доступ к панели.' },
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
      overview: { en: 'Overview', ru: 'Обзор' }
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
  doctor: {
    sidebar: {
      patients: { en: 'Assessments', ru: 'Оценки' },
      qrTitle: { en: 'Personal QR', ru: 'Персональный QR' },
      qrHint: { en: 'Scan to connect patients to you', ru: 'Отсканируйте, чтобы пациенты могли подключиться к вам' },
      share: { en: 'Share QR', ru: 'Поделиться QR' }
    },
    header: {
      title: { en: 'Doctor Dashboard', ru: 'Панель врача' },
      subtitle: { en: 'Search assessments by patient or assessment ID.', ru: 'Ищите оценки по пациенту или идентификатору оценки.' }
    },
    search: {
      placeholder: { en: 'Enter assessment token (16 chars) or patient ID (e.g. A12345)', ru: 'Введите токен оценки (16 символов) или ID пациента (например, A12345)' },
      button: { en: 'Search', ru: 'Поиск' },
      buttonLoading: { en: 'Searching...', ru: 'Поиск...' },
      clear: { en: 'Clear', ru: 'Очистить' },
      infoAssessment: { en: 'Showing assessment token {{token}}{{suffix}}', ru: 'Показана оценка с токеном {{token}}{{suffix}}' },
      infoAssessmentSuffix: { en: ' for patient {{patient}}', ru: ' для пациента {{patient}}' },
      infoPatient: { en: 'Showing patient {{patient}} with {{count}} assessments.', ru: 'Показан пациент {{patient}} (оценок: {{count}}).' },
      errors: {
        emptyInput: { en: 'Enter an assessment token or patient ID.', ru: 'Введите токен оценки или ID пациента.' },
        notFound: { en: 'No results found.', ru: 'Ничего не найдено.' },
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




