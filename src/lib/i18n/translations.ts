import type { Language } from './types';

type Leaf = Record<Language, string>;

type Node = Leaf | { [key: string]: Node };

export const translations: Record<string, Node> = {
  common: {
    brand: { en: 'HealthCare', ru: 'HealthCare' },
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
    dashboard: { en: 'Dashboard', ru: 'Панель' },
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
      about: { en: 'About', ru: 'О нас' },
      assessment: { en: 'Assessment', ru: 'Оценка' },
      contact: { en: 'Contact', ru: 'Контакты' }
    },
    supportItems: {
      helpCenter: { en: 'Help Center', ru: 'Центр помощи' },
      privacyPolicy: { en: 'Privacy Policy', ru: 'Политика конфиденциальности' },
      terms: { en: 'Terms of Service', ru: 'Условия использования' },
      faq: { en: 'FAQ', ru: 'Частые вопросы' }
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
};