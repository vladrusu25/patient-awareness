<script lang="ts">
  import { t, language } from '$lib/i18n';
  import { get } from 'svelte/store';
  import { onMount } from 'svelte';
  import Footer from '$lib/components/Footer.svelte';

  const phonePrefixes: Array<{ code: string; label: string }> = [
    { code: '+7', label: '+7 (Russia / Kazakhstan)' },
    { code: '+48', label: '+48 (Poland)' },
    { code: '+370', label: '+370 (Lithuania)' },
    { code: '+371', label: '+371 (Latvia)' },
    { code: '+372', label: '+372 (Estonia)' },
    { code: '+31', label: '+31 (Netherlands)' },
    { code: '+1', label: '+1 (North America)' }
  ];

  let phonePrefix = phonePrefixes[0].code;
  let phoneNumber = '';
  let email = '';
  let message = '';
  let submitting = false;
  let status: 'idle' | 'success' | 'error' = 'idle';
  let errorMessage = '';
  let prefixMenuOpen = false;
  let prefixMenuEl: HTMLDivElement | null = null;
  let currentPrefix = phonePrefixes[0];

  $: currentPrefix = phonePrefixes.find((item) => item.code === phonePrefix) ?? phonePrefixes[0];
  $: languageCode = $language;

  onMount(() => {
    const handleClick = (event: MouseEvent) => {
      if (!prefixMenuOpen) return;
      if (prefixMenuEl && !prefixMenuEl.contains(event.target as Node)) {
        prefixMenuOpen = false;
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  });

  const resetStatus = () => {
    if (status !== 'idle') {
      status = 'idle';
      errorMessage = '';
    }
  };

  function validate(): string | null {
    const translate = get(t);
    const trimmedMessage = message.trim();
    const rawPhone = phoneNumber.trim();
    const hasPhone = Boolean(rawPhone);
    const combinedPhone = hasPhone ? `${phonePrefix}${rawPhone}`.replace(/[^\d+]/g, '') : '';
    const trimmedEmail = email.trim();

    if (!combinedPhone && !trimmedEmail) {
      return translate('contactPage.errors.contactRequired');
    }

    if (combinedPhone) {
      const digits = combinedPhone.replace(/[^0-9]/g, '');
      if (digits.length < 6 || digits.length > 15) {
        return translate('contactPage.errors.invalidPhone');
      }
    }

    if (trimmedEmail) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(trimmedEmail)) {
        return translate('contactPage.errors.invalidEmail');
      }
    }

    if (!trimmedMessage) {
      return translate('contactPage.errors.messageRequired');
    }

    return null;
  }

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    resetStatus();

    const error = validate();
    if (error) {
      status = 'error';
      errorMessage = error;
      return;
    }

    submitting = true;

    const trimmedMessage = message.trim();
    const trimmedEmail = email.trim();
    const payload = {
      phonePrefix,
      phoneNumber: phoneNumber.trim(),
      email: trimmedEmail,
      message: trimmedMessage,
      language: languageCode
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const body = await response.json().catch(() => null);
      if (!response.ok || !body?.ok) {
        throw new Error(body?.error ?? 'mail_failed');
      }

      status = 'success';
      phoneNumber = '';
      email = '';
      message = '';
      phonePrefix = phonePrefixes[0].code;
      prefixMenuOpen = false;
    } catch (err) {
      const translate = get(t);
      status = 'error';
      errorMessage = translate('contactPage.errors.submitFailed');
    } finally {
      submitting = false;
    }
  }
</script>

<section class="bg-neutral-25 py-16">
  <div class="mx-auto max-w-3xl px-6">
    <h1 class="text-3xl font-heading font-semibold text-neutral-900">
      {$t('contactPage.title')}
    </h1>
    <p class="mt-4 text-neutral-600 leading-relaxed">
      {$t('contactPage.description')}
    </p>

    <form class="mt-8 grid gap-6 max-w-xl" on:submit={handleSubmit}>
      <fieldset class="grid gap-2">
        <label class="text-sm font-medium text-neutral-700" for="contact-phone">
          {$t('contactPage.phoneLabel')}
        </label>
        <div class="flex gap-3">
          <div
            class="relative"
            role="presentation"
            bind:this={prefixMenuEl}
          >
            <button
              type="button"
              class="inline-flex w-28 items-center justify-between rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm font-medium text-neutral-800 outline-none focus:ring-2 focus:ring-mint-400"
              on:click={() => (prefixMenuOpen = !prefixMenuOpen)}
              on:keydown={(event) => event.key === 'Escape' && (prefixMenuOpen = false)}
              aria-haspopup="listbox"
              aria-expanded={prefixMenuOpen}
              aria-label={`${$t('contactPage.phoneLabel')} ${currentPrefix.label}`}
            >
              <span>{phonePrefix}</span>
              <svg class="h-3 w-3 text-neutral-500 transition-transform duration-200" class:rotate-180={prefixMenuOpen} viewBox="0 0 20 20" fill="none">
                <path d="M7 8l3 3 3-3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>

            {#if prefixMenuOpen}
              <div class="absolute left-0 z-20 mt-2 w-48 rounded-lg border border-neutral-200 bg-white py-1 shadow-lg">
                {#each phonePrefixes as option}
                  <button
                    type="button"
                    class="flex w-full items-center justify-between px-3 py-2 text-sm text-neutral-700 transition-colors hover:bg-neutral-25"
                    on:click={() => {
                      phonePrefix = option.code;
                      prefixMenuOpen = false;
                      resetStatus();
                    }}
                  >
                    <span class="font-medium text-neutral-800">{option.code}</span>
                    <span class="text-xs text-neutral-500">{option.label}</span>
                  </button>
                {/each}
              </div>
            {/if}
          </div>
          <input
            id="contact-phone"
            class="flex-1 rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-mint-400"
            type="tel"
            bind:value={phoneNumber}
            placeholder={$t('contactPage.phonePlaceholder')}
            on:input={resetStatus}
          />
        </div>
        <p class="text-xs text-neutral-500">{$t('contactPage.phoneHint')}</p>
      </fieldset>

      <div class="grid gap-2">
        <label class="text-sm font-medium text-neutral-700" for="contact-email">
          {$t('contactPage.emailLabel')}
        </label>
        <input
          id="contact-email"
          class="rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-mint-400"
          type="email"
          bind:value={email}
          placeholder={$t('contactPage.emailPlaceholder')}
          on:input={resetStatus}
        />
      </div>

      <div class="grid gap-2">
        <label class="text-sm font-medium text-neutral-700" for="contact-message">
          {$t('contactPage.messageLabel')}
        </label>
        <textarea
          id="contact-message"
          class="min-h-[140px] rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-mint-400"
          bind:value={message}
          placeholder={$t('contactPage.messagePlaceholder')}
          on:input={resetStatus}
        ></textarea>
      </div>

      {#if status === 'error'}
        <p class="text-sm text-red-600" aria-live="polite">{errorMessage}</p>
      {/if}

      {#if status === 'success'}
        <p class="text-sm text-emerald-600" aria-live="polite">{$t('contactPage.success')}</p>
      {/if}

      <button
        type="submit"
        class="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-3 text-sm font-heading text-white transition hover:bg-primary-700 disabled:opacity-60"
        disabled={submitting}
      >
        {submitting ? $t('contactPage.submitting') : $t('contactPage.submit')}
      </button>
    </form>
  </div>
</section>

<Footer />











