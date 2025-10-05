<script lang="ts">
  import { t } from '$lib/i18n';
  import { createEventDispatcher } from 'svelte';

  // Props
  export let title: string | null = null;
  export let question = 1;
  export let total = 10;
  export let showRestart = false;

  // When provided, a download icon will appear and link to this URL
  export let downloadUrl: string | null = null;

  const dispatch = createEventDispatcher<{ restart: void }>();

  // Derived progress (0–100)
  $: pct = Math.max(0, Math.min(100, Math.round((question / Math.max(1, total)) * 100)));

  let progressLabel = '';
  let displayTitle = '';
  let downloadAria = '';
  let downloadTitle = '';
  let restartAria = '';
  let restartTitle = '';

  $: progressLabel = $t('assessment.header.questionProgress', {
    current: String(question),
    total: String(total)
  });
  $: displayTitle = title ?? $t('assessment.title');
  $: downloadAria = $t('assessment.header.downloadAria');
  $: downloadTitle = $t('assessment.header.downloadTitle');
  $: restartAria = $t('assessment.header.restartAria');
  $: restartTitle = $t('actions.restart');

  function onRestart() {
    dispatch('restart');
  }
</script>

<header
  class="bg-primary text-white px-4 py-3 md:px-6 md:py-0 md:h-16 flex flex-col gap-2 md:flex-row md:items-center md:justify-between"
  aria-label={$t('assessment.header.aria')}
>
  <h3 class="font-semibold text-base md:text-lg">{displayTitle}</h3>

  <div class="flex w-full flex-col gap-2 md:w-auto md:flex-row md:items-center md:justify-end md:gap-3">
    <div class="flex w-full items-center gap-2 text-xs text-white/90 md:w-auto md:text-sm">
      <span class="whitespace-nowrap">{progressLabel}</span>
      <div class="flex-1 h-2 rounded-full bg-white/30 overflow-hidden min-w-[120px] md:flex-none md:w-[180px]">
        <div class="h-full bg-white rounded-full" style={`width:${pct}%`}></div>
      </div>
    </div>

    <div class="flex items-center justify-end gap-1 md:gap-2">
      {#if downloadUrl}
        <a
          href={downloadUrl}
          class="inline-flex h-8 w-8 items-center justify-center rounded-md bg-white/10 hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          aria-label={downloadAria}
          title={downloadTitle}
          rel="noopener"
        >
          <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
        </a>
      {/if}

      {#if showRestart}
        <button
          type="button"
          class="inline-flex h-8 w-8 items-center justify-center rounded-md bg-white/10 hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          aria-label={restartAria}
          title={restartTitle}
          on:click={onRestart}
        >
          <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="23 4 23 10 17 10" />
            <polyline points="1 20 1 14 7 14" />
            <path d="M3.51 9a9 9 0 0 1 14.13-3.36L23 10" />
            <path d="M20.49 15a9 9 0 0 1-14.13 3.36L1 14" />
          </svg>
        </button>
      {/if}
    </div>
  </div>
</header>
