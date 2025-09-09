<script lang="ts">
  import Badge from '$lib/components/ui/Badge.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import type { Patient } from '$lib/types/admin';

  export let patients: Patient[] = [];
  export let onViewAll: () => void = () => {};

  function fmtWhen(d: Date | null) {
    if (!d) return '—';
    const diff = Date.now() - d.getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins} min ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours} h ago`;
    const days = Math.floor(hours / 24);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  }
</script>

<section class="rounded-xl bg-white shadow-sm ring-1 ring-black/5 p-4 flex flex-col">
  <div class="mb-3 text-neutral-900 font-semibold">Patients</div>

  <div class="divide-y divide-neutral-100">
    {#each patients as p}
      <div class="flex items-center justify-between py-3">
        <div class="flex items-center gap-3">
          <div class="h-8 w-8 rounded-full bg-neutral-100 grid place-items-center text-neutral-700 text-sm font-semibold">
            {p.initials}
          </div>
          <div class="text-sm text-neutral-900">{p.initials}</div>
        </div>

        <div class="text-sm text-neutral-500">{fmtWhen(p.lastAssessmentAt)}</div>

        <div class="w-[90px] flex justify-center">
          {#if p.severity === 'low'}
            <Badge color="green">Low</Badge>
          {:else if p.severity === 'medium'}
            <Badge color="yellow">Medium</Badge>
          {:else if p.severity === 'high'}
            <Badge color="red">High</Badge>
          {:else}
            <Badge color="gray">—</Badge>
          {/if}
        </div>

        <div class="w-[96px] flex justify-end">
          {#if p.status === 'reviewed'}
            <Badge color="green">Reviewed</Badge>
          {:else if p.status === 'pending'}
            <Badge color="yellow">Pending</Badge>
          {:else}
            <Badge color="gray">New</Badge>
          {/if}
        </div>
      </div>
    {/each}
  </div>

  <div class="mt-4 flex justify-end">
    <Button on:click={() => onViewAll()}>View all</Button>
  </div>
</section>
