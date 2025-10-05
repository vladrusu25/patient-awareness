<script lang="ts">
  import { page } from '$app/stores';
  import { browser } from '$app/environment';
  import { t, language, switchLanguage } from '$lib/i18n';
  import type { Language } from '$lib/i18n/types';

  const links = [
    { href: '/', labelKey: 'nav.home' },
    { href: '/assessment', labelKey: 'nav.assessment' },
    { href: '/api/pdf-search', labelKey: 'nav.pdfSearch' },
    { href: '/admin', labelKey: 'nav.dashboard' }
  ];

  const languages: { value: Language; label: string }[] = [
    { value: 'en', label: 'EN' },
    { value: 'ru', label: 'РУ' }
  ];

  $: pathname = $page.url.pathname;
  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  let mobileOpen = false;
  let mobileLanguageOpen = false;
  let desktopLanguageOpen = false;
  let selectedLanguage: Language = 'en';
  let desktopMenuEl: HTMLDivElement | null = null;

  $: selectedLanguage = $language;
  $: activeLanguageLabel =
    languages.find((lang) => lang.value === selectedLanguage)?.label ?? selectedLanguage.toUpperCase();

  const closeMobileMenu = () => {
    mobileOpen = false;
    mobileLanguageOpen = false;
  };

  const changeLanguage = async (lang: Language) => {
    if (lang === $language) return;
    await switchLanguage(lang);
    if (browser) {
      window.location.reload();
    }
  };

  const selectLanguage = async (lang: Language) => {
    await changeLanguage(lang);
    desktopLanguageOpen = false;
    mobileLanguageOpen = false;
  };

  const toggleDesktopLanguageMenu = () => {
    desktopLanguageOpen = !desktopLanguageOpen;
  };

  const handleDesktopMenuFocusOut = (event: FocusEvent) => {
    const related = event.relatedTarget as Node | null;
    if (!desktopMenuEl?.contains(related)) {
      desktopLanguageOpen = false;
    }
  };
</script>

<header class="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-neutral-100">
  <div class="mx-auto max-w-[1280px] px-6 h-16 flex items-center justify-between">
    <a href="/" class="flex items-center gap-3">
      <div class="h-10 w-10 rounded-lg bg-primary grid place-items-center">
        <svg viewBox="0 0 24 24" class="h-5 w-5 text-white" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 21s-6-4.35-8.485-6.835A6 6 0 1 1 12 5a6 6 0 1 1 8.485 9.165C18 16.65 12 21 12 21Z" />
        </svg>
      </div>
      <span class="font-heading font-bold text-xl leading-7 text-neutral-600">HealthCare</span>
    </a>

    <div class="hidden md:flex items-center gap-6">
      <nav class="flex items-center gap-8">
        {#each links as l}
          <a
            href={l.href}
            class="text-base font-heading transition-colors"
            class:text-neutral-900={isActive(l.href)}
            class:text-neutral-600={!isActive(l.href)}
          >
            {$t(l.labelKey)}
          </a>
        {/each}

        <form method="POST" action="/assessment?/start" class="ml-2">
          <button
            type="submit"
            class="h-10 px-6 rounded-lg bg-primary text-white text-base font-heading
                   hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-mint-400"
          >
            {$t('actions.startAssessment')}
          </button>
        </form>
      </nav>

      <div
        class="relative"
        bind:this={desktopMenuEl}
        on:focusout={handleDesktopMenuFocusOut}
      >
        <button
          type="button"
          class="inline-flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm font-semibold uppercase text-neutral-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-mint-400"
          on:click={toggleDesktopLanguageMenu}
          aria-haspopup="true"
          aria-expanded={desktopLanguageOpen}
          aria-label={$t('common.selectLanguage')}
        >
          <span>{activeLanguageLabel}</span>
          <svg
            class="h-4 w-4 text-neutral-500 transition-transform duration-200"
            class:rotate-180={desktopLanguageOpen}
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M7 8l3 3 3-3"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>

        {#if desktopLanguageOpen}
          <div class="absolute right-0 mt-2 w-28 rounded-lg border border-neutral-200 bg-white py-1 shadow-lg">
            {#each languages as lang}
              <button
                type="button"
                class="flex w-full items-center justify-between px-3 py-2 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-25"
                class:text-neutral-900={selectedLanguage === lang.value}
                on:click={() => selectLanguage(lang.value)}
              >
                <span>{lang.label}</span>
                {#if selectedLanguage === lang.value}
                  <svg class="h-4 w-4 text-primary" viewBox="0 0 20 20" fill="none">
                    <path d="M5 10l3 3 7-7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                {/if}
              </button>
            {/each}
          </div>
        {/if}
      </div>
    </div>

    <button
      class="md:hidden inline-flex items-center justify-center rounded-lg p-2 text-neutral-700
             hover:bg-neutral-25 focus:outline-none focus:ring-2 focus:ring-mint-400"
      aria-label={$t('header.toggleMenu')}
      aria-expanded={mobileOpen}
      on:click={() => {
        desktopLanguageOpen = false;
        mobileLanguageOpen = false;
        mobileOpen = !mobileOpen;
      }}
    >
      {#if !mobileOpen}
        <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      {:else}
        <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M6 6l12 12M6 18L18 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      {/if}
    </button>
  </div>

  {#if mobileOpen}
    <div class="md:hidden border-t border-neutral-100 bg-white">
      <nav class="mx-auto max-w-[1280px] px-6 py-3 flex flex-col gap-2">
        {#each links as l}
          <a
            href={l.href}
            class="rounded-lg px-2 py-2 text-base font-heading"
            class:bg-neutral-25={isActive(l.href)}
            class:text-neutral-900={isActive(l.href)}
            class:text-neutral-600={!isActive(l.href)}
            on:click={closeMobileMenu}
          >
            {$t(l.labelKey)}
          </a>
        {/each}

        <div class="relative mt-1">
          <button
            type="button"
            class="flex w-full items-center justify-between rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm font-semibold uppercase text-neutral-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-mint-400"
            on:click={() => (mobileLanguageOpen = !mobileLanguageOpen)}
            aria-haspopup="true"
            aria-expanded={mobileLanguageOpen}
            aria-label={$t('common.selectLanguage')}
          >
            <span>{activeLanguageLabel}</span>
            <svg
              class="h-4 w-4 text-neutral-500 transition-transform duration-200"
              class:rotate-180={mobileLanguageOpen}
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M7 8l3 3 3-3"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>

          {#if mobileLanguageOpen}
            <div class="mt-2 rounded-lg border border-neutral-200 bg-white shadow-sm">
              {#each languages as lang}
                <button
                  type="button"
                  class="w-full px-3 py-2 text-left text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-25"
                  class:text-neutral-900={selectedLanguage === lang.value}
                  on:click={() => selectLanguage(lang.value)}
                >
                  {lang.label}
                </button>
              {/each}
            </div>
          {/if}
        </div>

        <form method="POST" action="/assessment?/start" class="mt-2">
          <button
            type="submit"
            class="h-10 w-full px-6 rounded-lg bg-primary text-white text-base font-heading hover:bg-primary-700
                   focus:outline-none focus:ring-2 focus:ring-mint-400"
            on:click={closeMobileMenu}
          >
            {$t('actions.startAssessment')}
          </button>
        </form>
      </nav>
    </div>
  {/if}
</header>
