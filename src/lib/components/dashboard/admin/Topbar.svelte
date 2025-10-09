<script lang="ts">
  import { t } from '$lib/i18n';

  export let rangeKey: string;
  export let ranges: Array<{ key: string; labelKey: string }>;
</script>

<div class="mb-4 flex flex-wrap items-center gap-3">
  <form method="GET" class="relative">
    <label class="sr-only" for="admin-range-select">{$t('admin.range.selectLabel')}</label>
    <div class="relative">
      <select
        id="admin-range-select"
        name="range"
        class="appearance-none rounded-lg border border-neutral-200 bg-white pr-8 pl-3 py-2 text-sm text-neutral-700 focus:outline-none focus:ring-2 focus:ring-mint-400"
        value={rangeKey}
        on:change={(event) => (event.currentTarget.form as HTMLFormElement)?.submit()}
      >
        {#each ranges as option}
          <option value={option.key}>{$t(option.labelKey)}</option>
        {/each}
      </select>
      <svg
        class="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500"
        viewBox="0 0 20 20"
        fill="none"
      >
        <path
          d="M7 8l3 3 3-3"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  </form>
</div>
