<script lang="ts">
  import { createEventDispatcher, onDestroy } from 'svelte';
  import { t, language } from '$lib/i18n';
  import type { Language } from '$lib/i18n/types';

  export let active: 'patients' | 'settings' = 'patients';
  export let qrData = 'https://your.app/join?ref=doctor-123';
  export let classes = '';
  export let showClose = false;
  export let doctorName: string | null = null;
  export let doctorCode: string | null = null;
  const dispatch = createEventDispatcher();

  const SETTINGS_FALLBACK: Record<Language, string> = {
    en: 'Settings',
    ru: 'Настройки',
    kz: 'Settings',
    hr: 'Settings',
    sk: 'Settings'
  };

  const NAME_FALLBACK: Record<Language, string> = {
    en: 'Doctor',
    ru: 'Врач',
    kz: 'Doctor',
    hr: 'Doctor',
    sk: 'Doctor'
  };

  let currentLanguage: Language = 'en';
  const unsubscribeLang = language.subscribe((value) => {
    currentLanguage = value as Language;
  });

  onDestroy(() => {
    unsubscribeLang();
  });

  const translateWithFallback = (key: string, fallback: string) => {
    const value = $t(key);
    return value === key ? fallback : value;
  };

  $: displayName =
    doctorName && doctorName.trim().length ? doctorName.trim() : null;
</script>

<aside class={`w-[260px] shrink-0 border-r border-neutral-100 bg-neutral-25/60 overflow-y-auto ${classes}`}>
  <div class="px-5 h-16 flex items-center justify-between gap-3 bg-white">
    <div class="flex items-center gap-3">
      <img
        src="/images/logo.png"
        alt="{$t('common.brand')} logo"
        class="h-9 w-auto"
        loading="lazy"
        decoding="async"
      />
      <span class="font-heading font-bold text-lg text-neutral-700">{$t('common.brand')}</span>
    </div>
    {#if showClose}
      <button
        type="button"
        class="inline-flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 text-neutral-500 hover:text-neutral-700 hover:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-mint-400"
        on:click={() => dispatch('close')}
      >
        <span class="sr-only">{$t('common.close')}</span>
        <svg class="h-4 w-4" viewBox="0 0 20 20" fill="none">
          <path
            d="M6 6l8 8M14 6l-8 8"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    {/if}
  </div>

  {#if displayName || doctorCode}
    <div class="px-5 py-3 bg-white">
      <p class="text-xs uppercase text-neutral-500 font-medium">
        {translateWithFallback('doctor.profile.nameLabel', NAME_FALLBACK[currentLanguage] ?? 'Doctor')}
      </p>
      <p class="text-sm font-semibold text-neutral-800">
        {displayName ?? doctorCode}
      </p>
    </div>
  {/if}

  <nav class="px-3 pt-2 space-y-1">
    <a href="/doctor" class="flex items-center gap-3 rounded-xl px-3 py-2"
       class:bg-white={active==='patients'} class:shadow-sm={active==='patients'}>
      <div class="h-8 w-8 grid place-items-center rounded-lg bg-primary/10 text-primary">
        <svg viewBox="0 0 24 24" class="h-4 w-4" fill="currentColor"><path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm-7 9a7 7 0 0 1 14 0z"/></svg>
      </div>
      <span class="font-heading text-neutral-800">{$t('doctor.sidebar.patients')}</span>
    </a>
    <a href="/doctor/settings" class="flex items-center gap-3 rounded-xl px-3 py-2"
       class:bg-white={active==='settings'} class:shadow-sm={active==='settings'}>
      <div class="h-8 w-8 grid place-items-center rounded-lg bg-primary/10 text-primary">
        <svg viewBox="0 0 24 24" class="h-4 w-4" fill="currentColor">
          <path d="M19.14 12.94a7.07 7.07 0 0 0 .05-.94 7.07 7.07 0 0 0-.05-.94l2.11-1.65a.5.5 0 0 0 .12-.64l-2-3.46a.5.5 0 0 0-.6-.22l-2.49 1a6.86 6.86 0 0 0-1.63-.94l-.38-2.65A.5.5 0 0 0 13.87 3h-3.74a.5.5 0 0 0-.5.43l-.38 2.65a6.86 6.86 0 0 0-1.63.94l-2.49-1a.5.5 0 0 0-.6.22l-2 3.46a.5.5 0 0 0 .12.64L4.86 11.06a7.07 7.07 0 0 0-.05.94 7.07 7.07 0 0 0 .05.94l-2.11 1.65a.5.5 0 0 0-.12.64l2 3.46a.5.5 0 0 0 .6.22l2.49-1a6.86 6.86 0 0 0 1.63.94l.38 2.65a.5.5 0 0 0 .5.43h3.74a.5.5 0 0 0 .5-.43l.38-2.65a6.86 6.86 0 0 0 1.63-.94l2.49 1a.5.5 0 0 0 .6-.22l2-3.46a.5.5 0 0 0-.12-.64Zm-7.14 2.56a3.5 3.5 0 1 1 3.5-3.5 3.5 3.5 0 0 1-3.5 3.5Z"/>
        </svg>
      </div>
      <span class="font-heading text-neutral-800">
        {translateWithFallback('doctor.sidebar.settings', SETTINGS_FALLBACK[currentLanguage] ?? SETTINGS_FALLBACK.en)}
      </span>
    </a>
  </nav>

  <div class="mt-6 px-4 pb-6">
    <div class="rounded-2xl bg-white border border-neutral-100 p-4 shadow-sm">
      <h4 class="font-heading text-neutral-700 mb-3">{$t('doctor.sidebar.qrTitle')}</h4>

      <img
        class="mx-auto rounded-md border border-neutral-200"
        alt="QR"
        width="160" height="160"
        src={"https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=" + encodeURIComponent(qrData)}
      />

      <p class="mt-3 text-xs text-neutral-500 text-center">
        {$t('doctor.sidebar.qrHint')}
      </p>

      <button
        class="mt-3 w-full h-10 rounded-lg bg-primary text-white hover:bg-primary-700"
        on:click={() => navigator.share?.({ title: $t('doctor.sidebar.share'), url: qrData }) ?? navigator.clipboard.writeText(qrData)}
        title={$t('doctor.sidebar.share')}
      >
        {$t('doctor.sidebar.share')}
      </button>
    </div>
  </div>
</aside>
