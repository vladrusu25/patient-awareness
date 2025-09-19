<script context="module" lang="ts">
  export type NavItem = { href: string; label: string; active?: boolean; icon?: string };
</script>

<script lang="ts">
  export let items: NavItem[] = [];
</script>

<aside class="h-full w-[260px] shrink-0 border-r border-neutral-100 bg-white overflow-y-auto">
  <div class="px-4 py-4 flex items-center gap-3">
    <div class="h-9 w-9 rounded-lg bg-primary grid place-items-center">
      <svg viewBox="0 0 24 24" class="h-5 w-5 text-white" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 21s-6-4.35-8.485-6.835A6 6 0 1 1 12 5a6 6 0 1 1 8.485 9.165C18 16.65 12 21 12 21Z" />
      </svg>
    </div>
    <span class="font-heading font-bold text-lg text-neutral-700">HealthCare</span>
  </div>

  <nav class="px-3 space-y-2">
    {#each items as it}
      <a
        href={it.href}
        class="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors"
        class:bg-neutral-25={it.active}
        class:text-neutral-900={it.active}
        class:text-neutral-600={!it.active}
      >
        {#if it.icon}<span class="h-4 w-4">{@html it.icon}</span>{/if}
        {it.label}
      </a>
    {/each}
  </nav>

  <div class="px-4 py-6">
    <slot name="qr" />
  </div>
</aside>
