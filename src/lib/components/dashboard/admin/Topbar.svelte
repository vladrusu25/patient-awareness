<script lang="ts">
  import Button from '$lib/components/ui/Button.svelte';

  export let dateLabel = 'Last 30 days';
  export let onExport: () => void = () => {};
  export let onLogout: () => void = () => {};
</script>

<header class="h-14 border-b border-neutral-100 bg-white px-4 flex items-center gap-3">
  <div class="ml-auto flex items-center gap-3">
    <!-- Date range -->
    <div class="relative">
      <button class="rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-sm text-neutral-700 hover:bg-neutral-50">
        {dateLabel}
        <svg class="ml-1 inline h-4 w-4 opacity-70" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5"/></svg>
      </button>
    </div>

    <!-- Search -->
    <label class="relative">
      <span class="absolute left-3 top-2.5 opacity-50">
        <svg class="h-4 w-4" viewBox="0 0 24 24"><path d="M21 21l-4.3-4.3M10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z" fill="none" stroke="currentColor" stroke-width="2"/></svg>
      </span>
      <input
        placeholder="Search patients..."
        class="h-9 w-[260px] rounded-lg border border-neutral-200 bg-white pl-9 pr-3 text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-mint-400"
      />
    </label>

    <Button variant="soft" on:click={() => onExport()}>Export cohort PDF</Button>
    <Button variant="primary" on:click={() => onLogout()}>Logout</Button>
  </div>
</header>
