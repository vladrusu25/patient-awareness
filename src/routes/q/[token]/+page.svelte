<script lang="ts">
  import StepRenderer from '$lib/StepRenderer.svelte';

  // matches what +page.server.ts returns
  export let data: {
    notFound: boolean;
    token: string;
    sessionId: string | null;
    steps: { steps: any[] };
    previous: { step_key: string; value_json: any }[];
  };
</script>

{#if data.notFound}
  <main class="mx-auto max-w-xl p-6">
    <h1 class="text-2xl font-semibold">Invalid link</h1>
    <p class="mt-2 text-sm text-neutral-600">Please check the code you received.</p>
  </main>
{:else}
  <main class="mx-auto max-w-xl p-6 space-y-6">
    <header class="space-y-1">
      <h1 class="text-2xl font-semibold">Pelvic Health Check</h1>
      <p class="text-sm text-neutral-600">Informational only — not a medical diagnosis.</p>
    </header>

    <section class="rounded-2xl bg-white p-5 shadow">
      <StepRenderer
        token={data.token}
        steps={data.steps}
        previous={data.previous}
      />
    </section>
  </main>
{/if}
