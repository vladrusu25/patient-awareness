<script context="module" lang="ts">
  export type NavItem = { href: string; label: string; active?: boolean; icon?: string };
</script>

<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { t } from '$lib/i18n';
  export let items: NavItem[] = [];
  export let classes = '';
  export let showClose = false;
  const dispatch = createEventDispatcher();
</script>

<aside class={`h-full w-[260px] shrink-0 border-r border-neutral-100 bg-white overflow-y-auto ${classes}`}>
  <div class="px-4 py-4 flex items-center justify-between gap-3">
    <div class="flex items-center gap-3">
      <img
        src="/images/logo.png"
        alt="Smart Health logo"
        class="h-9 w-auto"
        loading="lazy"
        decoding="async"
      />
      <span class="font-heading font-bold text-lg text-neutral-700">{$t('common.brand')}</span>
    </div>
    {#if showClose}
      <button
        type="button"
        class="inline-flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 text-neutral-500 hover:text-neutral-700 hover:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-mint-400"
        on:click={() => dispatch('close')}
      >
        <span class="sr-only">{$t('common.close')}</span>
        <svg class="h-4 w-4" viewBox="0 0 20 20" fill="none">
          <path
            d="M6 6l8 8M14 6l-8 8"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    {/if}
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
