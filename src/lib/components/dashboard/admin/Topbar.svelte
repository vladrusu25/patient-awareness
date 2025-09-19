<!-- src/lib/components/dashboard/admin/Topbar.svelte -->
<script lang="ts">
  export let rangeLabel: string = 'Last 30 days';
  export let onExport: () => void = () => {};
</script>

<div class="mb-4 flex flex-wrap items-center gap-3">
  <!-- Range selector (static for now; wire later) -->
  <button
    class="inline-flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm hover:bg-neutral-50"
    type="button"
    aria-label="Change range"
  >
    {rangeLabel}
    <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2">
      <path d="m6 9 6 6 6-6" />
    </svg>
  </button>

  <!-- Search -->
  <div class="relative">
    <input
      class="w-[220px] rounded-lg border border-neutral-200 bg-white px-3 py-2 pl-9 text-sm outline-none focus:ring-2 focus:ring-mint-400"
      placeholder="Search patients..."
      type="search"
    />
    <svg viewBox="0 0 24 24" class="pointer-events-none absolute left-2 top-2.5 h-4 w-4 opacity-60" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21 16.65 16.65" />
    </svg>
  </div>

  <div class="ml-auto"></div>

  <!-- Export -->
  <button
    class="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-white hover:bg-primary-700"
    on:click={onExport}
    type="button"
  >
    Export cohort PDF
  </button>

  {#if false}
    <!-- intentionally removed logout button from the toolbar -->
  {/if}
</div>
