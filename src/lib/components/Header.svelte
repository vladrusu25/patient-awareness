<script lang="ts">
  import { page } from '$app/stores';
  import { browser } from '$app/environment';
  import { t, language, switchLanguage } from '$lib/i18n';
  import type { Language } from '$lib/i18n/types';
  import { onMount } from 'svelte';

  type MenuLink = { href: string; labelKey: string };
  type NavItem =
    | { id: string; type: 'link'; href: string; labelKey: string }
    | { id: string; type: 'menu'; labelKey: string; items: MenuLink[] };

  const navItems: NavItem[] = [
    { id: 'home', type: 'link', href: '/', labelKey: 'nav.home' },
    {
      id: 'assessment',
      type: 'menu',
      labelKey: 'nav.assessmentMenu',
      items: [
        { href: '/assessment', labelKey: 'nav.assessment' },
        { href: '/api/pdf-search', labelKey: 'nav.pdfSearch' }
      ]
    },
    {
      id: 'conditions',
      type: 'menu',
      labelKey: 'nav.conditionsMenu',
      items: [
        { href: '/endometriosis', labelKey: 'nav.endometriosis' },
        { href: '/pcs', labelKey: 'nav.pcs' },
        { href: '/pcs/diagnosis', labelKey: 'nav.pcsDiagnosis' }
      ]
    },
    {
      id: 'dashboard',
      type: 'menu',
      labelKey: 'nav.dashboardMenu',
      items: [
        { href: '/doctor', labelKey: 'nav.dashboardDoctors' },
        { href: '/admin', labelKey: 'nav.dashboardAdmins' }
      ]
    },
    { id: 'contact', type: 'link', href: '/contact', labelKey: 'nav.contact' }
  ];

  const languages: { value: Language; label: string }[] = [
    { value: 'en', label: 'EN' },
    { value: 'ru', label: 'RU' },
    { value: 'kz', label: 'KZ' },
    { value: 'hr', label: 'HR' },
    { value: 'sk', label: 'SK' }
  ];

  $: pathname = $page.url.pathname;
  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));
  const isMenuActive = (items: MenuLink[]) => items.some((link) => isActive(link.href));

  let mobileOpen = false;
  let mobileLanguageOpen = false;
  let desktopLanguageOpen = false;
  let openDesktopMenu: string | null = null;
  let openMobileMenu: string | null = null;
  let selectedLanguage: Language = 'en';
  let desktopMenuEl: HTMLDivElement | null = null;

  $: selectedLanguage = $language;
  $: activeLanguageLabel =
    languages.find((lang) => lang.value === selectedLanguage)?.label ?? selectedLanguage.toUpperCase();

  const closeMobileMenu = () => {
    mobileOpen = false;
    mobileLanguageOpen = false;
    openMobileMenu = null;
  };

  let desktopCloseTimeout: ReturnType<typeof setTimeout> | null = null;

  const clearDesktopCloseTimer = () => {
    if (desktopCloseTimeout) {
      clearTimeout(desktopCloseTimeout);
      desktopCloseTimeout = null;
    }
  };

  const openDesktopDropdown = (id: string) => {
    clearDesktopCloseTimer();
    openDesktopMenu = id;
  };

  const closeDesktopDropdown = () => {
    clearDesktopCloseTimer();
    openDesktopMenu = null;
  };

  const scheduleDesktopClose = () => {
    clearDesktopCloseTimer();
    desktopCloseTimeout = setTimeout(() => {
      openDesktopMenu = null;
    }, 120);
  };

  const toggleDesktopMenu = (id: string) => {
    if (openDesktopMenu === id) {
      closeDesktopDropdown();
    } else {
      openDesktopDropdown(id);
    }
  };

  const toggleMobileMenu = (id: string) => {
    openMobileMenu = openMobileMenu === id ? null : id;
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

  onMount(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeDesktopDropdown();
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  });
</script>

<header class="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-neutral-100">
  <div class="mx-auto max-w-[1280px] px-6 h-16 flex items-center justify-between">
    <a href="/" class="flex items-center gap-3">
      <img
        src="/images/logo.png"
        alt={$t('common.brand') + ' logo'}
        class="h-10 w-auto"
        loading="lazy"
        decoding="async"
      />
      <span class="font-heading font-bold text-xl leading-7 text-neutral-600">{$t('common.brand')}</span>
    </a>

    <div class="hidden md:flex items-center gap-6">
      <nav class="flex items-center gap-6">
        {#each navItems as item}
          {#if item.type === 'link'}
            <a
              href={item.href}
              class="text-base font-heading transition-colors"
              class:text-neutral-900={isActive(item.href)}
              class:text-neutral-600={!isActive(item.href)}
            >
              {$t(item.labelKey)}
            </a>
          {:else}
            <div
              class="relative"
              data-nav-menu
              role="presentation"
              on:mouseenter={() => openDesktopDropdown(item.id)}
              on:mouseleave={scheduleDesktopClose}
              on:focusin={() => openDesktopDropdown(item.id)}
              on:focusout={(event) => {
                const related = event.relatedTarget as Node | null;
                if (!(event.currentTarget as HTMLElement).contains(related)) {
                  scheduleDesktopClose();
                }
              }}
            >
              <button
                type="button"
                class="inline-flex items-center gap-2 text-base font-heading transition-colors"
                class:text-neutral-900={isMenuActive(item.items) || openDesktopMenu === item.id}
                class:text-neutral-600={!isMenuActive(item.items) && openDesktopMenu !== item.id}
                on:click={() => toggleDesktopMenu(item.id)}
                aria-haspopup="true"
                aria-expanded={openDesktopMenu === item.id}
              >
                {$t(item.labelKey)}
                <svg
                  class="h-4 w-4 transition-transform duration-200"
                  class:rotate-180={openDesktopMenu === item.id}
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

              {#if openDesktopMenu === item.id}
                <div class="absolute left-0 mt-2 w-44 rounded-lg border border-neutral-200 bg-white py-1 shadow-lg">
                  {#each item.items as child}
                    <a
                      href={child.href}
                      class="flex items-center justify-between px-4 py-2 text-sm text-neutral-600 transition-colors hover:bg-neutral-25 hover:text-neutral-900"
                      class:text-neutral-900={isActive(child.href)}
                      on:click={() => (openDesktopMenu = null)}
                    >
                      {$t(child.labelKey)}
                    </a>
                  {/each}
                </div>
              {/if}
            </div>
          {/if}
        {/each}

        <form method="POST" action="/assessment?/start" class="ml-3">
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
        {#each navItems as item}
          {#if item.type === 'link'}
            <a
              href={item.href}
              class="rounded-lg px-2 py-2 text-base font-heading"
              class:bg-neutral-25={isActive(item.href)}
              class:text-neutral-900={isActive(item.href)}
              class:text-neutral-600={!isActive(item.href)}
              on:click={closeMobileMenu}
            >
              {$t(item.labelKey)}
            </a>
          {:else}
            <div>
              <button
                type="button"
                class="flex w-full items-center justify-between rounded-lg px-2 py-2 text-base font-heading text-neutral-700"
                class:bg-neutral-25={isMenuActive(item.items)}
                on:click={() => toggleMobileMenu(item.id)}
                aria-expanded={openMobileMenu === item.id}
              >
                <span>{$t(item.labelKey)}</span>
                <svg
                  class="h-4 w-4 transition-transform duration-200"
                  class:rotate-180={openMobileMenu === item.id}
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

              {#if openMobileMenu === item.id}
                <div class="ml-3 mt-1 flex flex-col gap-1 border-l border-neutral-200 pl-3">
                  {#each item.items as child}
                    <a
                      href={child.href}
                      class="rounded-lg px-2 py-1.5 text-sm font-heading text-neutral-600 hover:bg-neutral-25 hover:text-neutral-900"
                      class:text-neutral-900={isActive(child.href)}
                      on:click={closeMobileMenu}
                    >
                      {$t(child.labelKey)}
                    </a>
                  {/each}
                </div>
              {/if}
            </div>
          {/if}
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

