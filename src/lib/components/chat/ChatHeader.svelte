<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let title = 'Health Assessment';
  export let question = 1;
  export let total = 10;

  // Show a restart button if the parent wants to handle it
  export let showRestart = false;

  const dispatch = createEventDispatcher<{ restart: void }>();

  $: pct = Math.max(0, Math.min(100, Math.round((question / total) * 100)));

  function onRestart() {
    dispatch('restart');
  }
</script>

<header
  class="bg-primary text-white h-14 md:h-16 flex items-center justify-between px-4 md:px-6"
>
  <h3 class="font-semibold text-base md:text-lg">{title}</h3>

  <div class="flex items-center gap-3 w-[180px] md:w-[220px]">
    <span class="text-white/90 text-xs md:text-sm whitespace-nowrap">
      Question {question} of {total}
    </span>
    <div class="h-2 rounded-full bg-white/30 flex-1 overflow-hidden">
      <div class="h-full bg-white rounded-full" style={`width:${pct}%`}></div>
    </div>

    {#if showRestart}
    <form method="POST" action="/assessment?/restart">
      <button
        type="button"
        class="ml-1 inline-flex items-center justify-center h-8 w-8 rounded-md bg-white/10 hover:bg-white/20"
        aria-label="Restart assessment"
        title="Restart"
        on:click={onRestart}
      >
        <!-- refresh icon -->
        <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="23 4 23 10 17 10" />
          <polyline points="1 20 1 14 7 14" />
          <path d="M3.51 9a9 9 0 0 1 14.13-3.36L23 10" />
          <path d="M20.49 15a9 9 0 0 1-14.13 3.36L1 14" />
        </svg>
      </button>
      </form>
    {/if}
  </div>
</header>
