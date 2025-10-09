<script context="module" lang="ts">
  export type NavItem = { href: string; label: string; active?: boolean; icon?: string };
</script>

<script lang="ts">
  import { t } from '$lib/i18n';
  export let items: NavItem[] = [];
</script>

<aside class="h-full w-[260px] shrink-0 border-r border-neutral-100 bg-white overflow-y-auto">
  <div class="px-4 py-4 flex items-center gap-3">
    <img
      src="/images/logo.png"
      alt="Smart Health logo"
      class="h-9 w-auto"
      loading="lazy"
      decoding="async"
    />
    <span class="font-heading font-bold text-lg text-neutral-700">{$t('common.brand')}</span>
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
