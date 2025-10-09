<script lang="ts">
  import { t, language, switchLanguage } from '$lib/i18n';
  import type { Language } from '$lib/i18n/types';
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';

  export let data: { user: { id: string; username: string; role: 'admin' | 'doctor' } };

  const languages: { value: Language; label: string }[] = [
    { value: 'en', label: 'EN' },
    { value: 'ru', label: 'РУ' }
  ];

  let selectedLanguage: Language = 'en';
  let languageMenuOpen = false;
  let languageMenuEl: HTMLDivElement | null = null;

  $: selectedLanguage = $language;

  const changeLanguage = async (lang: Language) => {
    if (lang === $language) return;
    await switchLanguage(lang);
    if (browser) {
      window.location.reload();
    }
  };

  const toggleLanguageMenu = () => {
    languageMenuOpen = !languageMenuOpen;
  };

  const selectLanguageAndClose = async (lang: Language) => {
    await changeLanguage(lang);
    languageMenuOpen = false;
  };

  onMount(() => {
    const handleClick = (event: MouseEvent) => {
      if (!languageMenuOpen) return;
      const target = event.target as Node | null;
      if (languageMenuEl && target && !languageMenuEl.contains(target)) {
        languageMenuOpen = false;
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  });
</script>

<!-- Admin shell with sticky header; allow page scrolling -->
<div class="min-h-screen bg-neutral-25">
  <!-- 56px header -->
  <header class="sticky top-0 z-30 w-full bg-primary text-white shadow-sm h-14">
    <div class="mx-auto max-w-screen-2xl h-full flex items-center justify-between px-5">
      <div class="flex items-center gap-3">
        <img
          src="/images/logo.png"
          alt="{$t('common.brand')} logo"
          class="h-8 w-auto"
          loading="lazy"
          decoding="async"
        />
        <div class="font-semibold tracking-tight">{$t('common.brand')}</div>
      </div>

      <div class="flex items-center gap-3">
        <div
          class="relative"
          bind:this={languageMenuEl}
        >
          <button
            type="button"
            class="inline-flex items-center gap-2 rounded-lg border border-white/30 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase text-white focus:outline-none focus:ring-2 focus:ring-white/40"
            aria-haspopup="true"
            aria-expanded={languageMenuOpen}
            on:click={toggleLanguageMenu}
          >
            <span>{languages.find((lang) => lang.value === selectedLanguage)?.label ?? selectedLanguage.toUpperCase()}</span>
            <svg
              class="h-3 w-3 text-white transition-transform duration-200"
              class:rotate-180={languageMenuOpen}
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

          {#if languageMenuOpen}
            <div class="absolute right-0 mt-2 w-28 rounded-lg border border-neutral-200 bg-white py-1 shadow-lg">
              {#each languages as lang}
                <button
                  type="button"
                  class="flex w-full items-center justify-between px-3 py-2 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-25"
                  class:text-neutral-900={selectedLanguage === lang.value}
                  on:click={() => selectLanguageAndClose(lang.value)}
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

        <span class="hidden md:inline text-sm/none opacity-90">{data.user.username}</span>
        <form method="POST" action="/logout">
          <button
            class="inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-1.5 text-sm hover:bg-white/15"
            type="submit"
          >
            Logout
          </button>
        </form>
      </div>
    </div>
  </header>

  <!-- Provide roomy content area below the sticky header -->
  <main class="mx-auto w-full max-w-screen-2xl px-6 py-5 min-h-[calc(100vh-56px)] pb-4">
    <slot />
  </main>
</div>
