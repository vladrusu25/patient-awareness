<script lang="ts">
  import { t } from '$lib/i18n';
  import StepRenderer from '$lib/StepRenderer.svelte';

  // matches what +page.server.ts returns
  export let data: {
    notFound: boolean;
    token: string;
    secret: string | null;
    sessionId: string | null;
    steps: { steps: any[] };
    previous: { step_key: string; value_json: any }[];
  };
</script>

{#if data.notFound}
  <main class="mx-auto max-w-xl p-6">
    <h1 class="text-2xl font-semibold">{$t('share.invalidTitle')}</h1>
    <p class="mt-2 text-sm text-neutral-600">{$t('share.invalidDescription')}</p>
  </main>
{:else}
  <main class="mx-auto max-w-xl p-6 space-y-6">
    <header class="space-y-1">
      <h1 class="text-2xl font-semibold">{$t('share.heading')}</h1>
      <p class="text-sm text-neutral-600">{$t('share.disclaimer')}</p>
    </header>

    <section class="rounded-2xl bg-white p-5 shadow">
      <StepRenderer
        token={data.token}
        secret={data.secret}
        steps={data.steps}
        previous={data.previous}
      />
    </section>
  </main>
{/if}
