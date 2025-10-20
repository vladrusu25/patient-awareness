<script lang="ts">
  import Sidebar from '$lib/components/dashboard/doctor/Sidebar.svelte';
  import { t, language, switchLanguage } from '$lib/i18n';
  import type { Language } from '$lib/i18n/types';
  import { onMount } from 'svelte';
  import { get } from 'svelte/store';
  import type { PageData, ActionData } from './$types';

  export let data: PageData;
  export let form: ActionData | null = null;

  let selectedRegion: Language = (data.region ?? 'en') as Language;
  let lastRegionFromServer: Language | null = (data.region ?? null) as Language | null;
  let mobileNavOpen = false;

  const regionValues = [
    { value: 'en', labelKey: 'admin.doctors.region.en', fallback: 'Poland (English)' },
    { value: 'ru', labelKey: 'admin.doctors.region.ru', fallback: 'Russia (Russian)' },
    { value: 'kz', labelKey: 'admin.doctors.region.kz', fallback: 'Kazakhstan (Kazakh)' },
    { value: 'hr', labelKey: 'admin.doctors.region.hr', fallback: 'Croatia (Croatian)' },
    { value: 'sk', labelKey: 'admin.doctors.region.sk', fallback: 'Slovakia (Slovak)' }
  ];

  const translateOr = (key: string, fallback: string) => {
    const value = $t(key);
    return value === key ? fallback : value;
  };

  $: regionOptions = regionValues.map((opt) => ({
    value: opt.value,
    label: translateOr(opt.labelKey, opt.fallback)
  }));

  const shareOrigin = data.shareOrigin.replace(/\/$/, '');
  const doctorCode = data.doctorCode ?? null;
  const linkSecret = data.linkSecret ?? null;
  $: shareLink = doctorCode && linkSecret ? `${shareOrigin}/doctor/${doctorCode}?k=${linkSecret}` : null;
  $: qrValue = shareLink ?? `${shareOrigin}/doctor/login`;

  const translateText = (key: string, fallback: string, params?: Record<string, string | number>) => {
    const value = $t(key, params);
    return value === key ? fallback : value;
  };

  onMount(async () => {
    if (data.region) {
      const current = get(language) as Language;
      if (current !== data.region) {
        await switchLanguage(data.region as Language);
      }
    }
  });

  $: errorKey = form?.error ?? null;
  $: errorMessage =
    errorKey === 'invalid_region'
      ? translateText('doctor.settings.errors.invalidRegion', 'Please select a valid language.')
      : errorKey === 'update_failed'
        ? translateText(
            'doctor.settings.errors.updateFailed',
            'Could not update the language. Please try again.'
          )
        : errorKey === 'unauthorized'
          ? translateText(
              'doctor.settings.errors.unauthorized',
              'You are not authorized to change this setting.'
            )
          : null;

  $: updatedLanguageLabel = data.updated
    ? translateOr(`admin.doctors.region.${data.updated}`, data.updated)
    : null;

  $: successMessage =
    !errorMessage && updatedLanguageLabel
      ? translateText(
          'doctor.settings.success',
          `Language updated to ${updatedLanguageLabel}`,
          { language: updatedLanguageLabel }
        )
      : null;

  $: {
    const incomingRegion = (data.region ?? null) as Language | null;
    if (incomingRegion !== null && incomingRegion !== lastRegionFromServer) {
      selectedRegion = incomingRegion;
      lastRegionFromServer = incomingRegion;
    } else if (incomingRegion === null && lastRegionFromServer !== null) {
      selectedRegion = 'en';
      lastRegionFromServer = null;
    }
  }

  function closeMobileNav() {
    mobileNavOpen = false;
  }

  function handleOverlayKey(event: KeyboardEvent) {
    if (event.key === 'Escape' || event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      closeMobileNav();
    }
  }
</script>

<div class="lg:flex lg:h-full lg:gap-6 lg:overflow-hidden">
  <div class="lg:hidden sticky top-0 z-20 border-b border-neutral-100 bg-white">
    <div class="flex items-center justify-between px-4 py-3">
      <div class="flex items-center gap-3">
        <img src="/images/logo.png" alt="Smart Health logo" class="h-8 w-auto" />
        <span class="font-heading font-semibold text-base text-neutral-700">{$t('common.brand')}</span>
      </div>
      <button
        type="button"
        class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 text-neutral-600 hover:text-neutral-800 hover:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-mint-400"
        on:click={() => (mobileNavOpen = true)}
      >
        <span class="sr-only">{$t('header.toggleMenu')}</span>
        <svg class="h-5 w-5" viewBox="0 0 20 20" fill="none">
          <path
            d="M4 6h12M4 10h12M4 14h12"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
          />
        </svg>
      </button>
    </div>
  </div>

  {#if mobileNavOpen}
    <div
      class="fixed inset-0 z-40 bg-neutral-900/40"
      role="button"
      tabindex="0"
      aria-label={$t('common.close')}
      on:click={closeMobileNav}
      on:keydown={handleOverlayKey}
    ></div>
    <div class="fixed inset-y-0 left-0 z-50 flex max-w-full pl-0 pr-4 sm:pr-6" role="dialog" aria-modal="true">
      <Sidebar
        active="settings"
        variant="mobile"
        classes="shadow-xl"
        showClose
        on:close={closeMobileNav}
        qrData={qrValue}
        doctorCode={doctorCode}
      />
    </div>
  {/if}

  <Sidebar active="settings" classes="hidden lg:block" qrData={qrValue} doctorCode={doctorCode} />

  <div class="flex-1 min-w-0 lg:overflow-y-auto">
    <main class="p-4 md:p-6 space-y-6">
      <section class="space-y-2">
        <h1 class="text-2xl font-heading font-semibold text-neutral-900">
          {translateText('doctor.settings.title', 'Dashboard settings')}
        </h1>
        <p class="text-sm text-neutral-600 max-w-2xl">
          {translateText('doctor.settings.subtitle', 'Choose the default language you see when opening your doctor dashboard.')}
        </p>

        {#if successMessage}
          <div class="mt-3 rounded-lg border border-mint-300 bg-mint-50 px-4 py-3 text-sm text-mint-900">
            {successMessage}
          </div>
        {/if}
        {#if errorMessage}
          <div class="mt-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {errorMessage}
          </div>
        {/if}
      </section>

      <section class="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <form method="POST" action="?/update" class="rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm space-y-4">
          <h2 class="text-lg font-semibold text-neutral-900">
            {translateText('doctor.settings.languageTitle', 'Dashboard language')}
          </h2>
          <p class="text-sm text-neutral-600">
            {translateText('doctor.settings.languageHint', 'This language loads automatically each time you log in. You can still switch temporarily using the language selector in the header.')}
          </p>

          <div class="space-y-1">
            <label class="text-sm font-medium text-neutral-800" for="region">
              {translateText('doctor.settings.languageLabel', 'Preferred language')}
            </label>
            <select
              id="region"
              name="region"
              class="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-mint-400"
              bind:value={selectedRegion}
            >
              {#each regionOptions as opt}
                <option value={opt.value}>{opt.label}</option>
              {/each}
            </select>
          </div>

          <button
            type="submit"
            class="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-white font-medium hover:bg-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint-400"
          >
            {translateText('doctor.settings.submit', 'Save changes')}
          </button>
        </form>

        <div class="rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm space-y-3">
          <h2 class="text-lg font-semibold text-neutral-900">
            {translateText('doctor.settings.tipsTitle', 'Helpful tips')}
          </h2>
          <ul class="list-disc pl-5 text-sm text-neutral-600 space-y-2">
            <li>{translateText('doctor.settings.tipsApply', 'Changes apply immediately to new pages you open.')}</li>
            <li>{translateText('doctor.settings.tipsSelector', 'The header language selector only affects the current session.')}</li>
            <li>{translateText('doctor.settings.tipsSupport', 'If you need another language, contact support.')}</li>
          </ul>
        </div>
      </section>
    </main>
  </div>
</div>

<style>
  form {
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }
</style>
