<script lang="ts">
  import { t } from '$lib/i18n';
  import type { PageData } from './$types';

  export let data: PageData;

  const PATIENT_RE = /^[A-Z][0-9]{2}[A-Z]{2}[0-9]{3}$/;

  let patientId = '';
  let error: string | null = null;
  let submitting: 'new' | 'returning' | null = null;

  async function startSession(mode: 'new' | 'returning') {
    if (submitting) return;
    error = null;

    const body: Record<string, unknown> = {
      secret: data.secret,
      mode
    };

    if (mode === 'returning') {
      const normalized = patientId.trim().toUpperCase();
      if (!PATIENT_RE.test(normalized)) {
        error = $t('doctor_invite.errors.patientFormat');
        return;
      }
      body.patientId = normalized;
    }

    submitting = mode;

    try {
      const res = await fetch(`/api/doctor/${encodeURIComponent(data.doctorCode)}/session`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body)
      });

      const payload = await res.json().catch(() => ({}));
      if (!res.ok || !payload?.ok) {
        const code: string = payload?.error ?? 'session_create_failed';
        if (code === 'patient_not_found') {
          error = $t('doctor_invite.errors.patientNotFound');
        } else if (code === 'assessment_limit_reached') {
          error = $t('doctor_invite.errors.assessmentLimit');
        } else if (code === 'invalid_secret' || code === 'doctor_not_found') {
          error = $t('doctor_invite.errors.linkExpired');
        } else {
          error = $t('doctor_invite.errors.generic');
        }
        submitting = null;
        return;
      }

      const next = new URL(`/session/${encodeURIComponent(payload.token)}`, window.location.origin);
      if (payload.tokenSecret) {
        next.searchParams.set('s', payload.tokenSecret);
      }
      window.location.assign(next.toString());
    } catch (err) {
      console.error(err);
      error = $t('doctor_invite.errors.network');
    } finally {
      submitting = null;
    }
  }

  const buttonLabel = (mode: 'new' | 'returning') =>
    submitting === mode ? $t('doctor_invite.buttons.loading') : $t(`doctor_invite.buttons.${mode}`);
</script>

<main class="mx-auto max-w-xl px-6 py-16 space-y-8">
  <header class="space-y-2 text-center">
    <p class="text-xs uppercase text-neutral-500 tracking-wide">
      {$t('doctor_invite.meta', { code: data.doctorCode })}
    </p>
    <h1 class="text-3xl font-heading font-semibold text-neutral-900">
      {$t('doctor_invite.title')}
    </h1>
    <p class="text-sm text-neutral-600">
      {$t('doctor_invite.subtitle')}
    </p>
  </header>

  <section class="space-y-4">
    <div class="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm space-y-4">
      <h2 class="text-lg font-semibold text-neutral-900">
        {$t('doctor_invite.newTitle')}
      </h2>
      <p class="text-sm text-neutral-600">
        {$t('doctor_invite.newDescription')}
      </p>
      <button
        type="button"
        class="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-70"
        on:click={() => startSession('new')}
        disabled={submitting !== null}
      >
        {buttonLabel('new')}
      </button>
    </div>

    <div class="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm space-y-4">
      <h2 class="text-lg font-semibold text-neutral-900">
        {$t('doctor_invite.returningTitle')}
      </h2>
      <p class="text-sm text-neutral-600">
        {$t('doctor_invite.returningDescription')}
      </p>
      <form
        class="space-y-3"
        on:submit|preventDefault={() => startSession('returning')}
      >
        <div class="space-y-1">
          <label class="text-sm font-medium text-neutral-800" for="patient-id">
            {$t('doctor_invite.patientLabel')}
          </label>
          <input
            id="patient-id"
            name="patient-id"
            class="w-full rounded-lg border border-neutral-300 px-3 py-2 uppercase outline-none focus:ring-2 focus:ring-mint-400"
            bind:value={patientId}
            placeholder={$t('doctor_invite.patientPlaceholder')}
            maxlength="8"
            autocomplete="off"
          />
          <p class="text-xs text-neutral-500">
            {$t('doctor_invite.patientHint')}
          </p>
        </div>
        <button
          type="submit"
          class="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-neutral-300 px-4 py-2.5 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 disabled:opacity-70"
          disabled={submitting !== null}
        >
          {buttonLabel('returning')}
        </button>
      </form>
    </div>

    {#if error}
      <div class="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
        {error}
      </div>
    {/if}
  </section>

  <footer class="rounded-2xl border border-neutral-200 bg-neutral-25 px-5 py-4 text-xs text-neutral-500">
    {$t('doctor_invite.footer')}
  </footer>
</main>
