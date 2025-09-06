<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  // Props
  export let title = 'Health Assessment';
  export let question = 1;
  export let total = 10;
  export let showRestart = false;

  // When provided, a download icon will appear and link to this URL
  export let downloadUrl: string | null = null;

  const dispatch = createEventDispatcher<{ restart: void }>();

  // Derived progress (0–100)
  $: pct = Math.max(0, Math.min(100, Math.round((question / Math.max(1, total)) * 100)));

  function onRestart() {
    dispatch('restart');
  }
</script>

<header
  class="bg-primary text-white h-14 md:h-16 flex items-center justify-between px-4 md:px-6"
  aria-label="Assessment header"
>
  <h3 class="font-semibold text-base md:text-lg">{title}</h3>

  <div class="flex items-center gap-2 md:gap-3 w-auto">
    <span class="text-white/90 text-xs md:text-sm whitespace-nowrap">
      Question {question} of {total}
    </span>

    <div class="h-2 rounded-full bg-white/30 w-[120px] md:w-[180px] overflow-hidden">
      <div class="h-full bg-white rounded-full" style={`width:${pct}%`}></div>
    </div>

    {#if downloadUrl}
      <a
        href={downloadUrl}
        class="ml-1 inline-flex items-center justify-center h-8 w-8 rounded-md bg-white/10 hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
        aria-label="Download assessment PDF"
        title="Download PDF"
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
        class="ml-1 inline-flex items-center justify-center h-8 w-8 rounded-md bg-white/10 hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
        aria-label="Restart assessment"
        title="Restart"
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
</header>
