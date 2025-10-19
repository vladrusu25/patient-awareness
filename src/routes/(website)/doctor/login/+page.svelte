<script lang="ts">
  import { t } from '$lib/i18n';
  export let form: { error?: string; errorCode?: string } | undefined;

  let errorMessage: string | null = null;
  $: errorMessage = form?.errorCode ? $t(form.errorCode) : form?.error ?? null;
</script>

<section class="mx-auto max-w-[420px] px-6 py-16">
  <div class="rounded-2xl bg-white ring-1 ring-black/5 shadow-sm p-6 md:p-8">
    <div class="mb-6">
      <h1 class="mt-3 text-xl font-semibold text-neutral-900">{$t('auth.doctorTitle')}</h1>
      <p class="mt-1 text-sm text-neutral-600">{$t('auth.doctorSubtitle')}</p>
    </div>

    {#if errorMessage}
      <div class="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
        {errorMessage}
      </div>
    {/if}

    <form method="POST" class="space-y-3">
      <div>
        <label class="block text-sm font-medium text-neutral-800 mb-1" for="username">{$t('auth.username')}</label>
        <input
          id="username"
          name="username"
          autocomplete="username"
          class="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-mint-400"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-neutral-800 mb-1" for="password">{$t('auth.password')}</label>
        <input
          id="password"
          type="password"
          name="password"
          autocomplete="current-password"
          class="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-mint-400"
        />
      </div>

      <button
        type="submit"
        class="mt-2 w-full rounded-lg bg-primary px-4 py-2.5 font-medium text-white hover:bg-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint-400"
      >
        {$t('auth.signIn')}
      </button>
    </form>
  </div>
</section>
