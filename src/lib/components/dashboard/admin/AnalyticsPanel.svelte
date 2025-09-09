<script lang="ts">
  import Button from '$lib/components/ui/Button.svelte';
  import type { ChartPoint } from '$lib/types/admin';

  export let points: ChartPoint[] = [];
  export let onViewAll: () => void = () => {};

  // simple linear scales for demo
  const W = 520, H = 220, PAD = 28;
  const XMIN = 0, XMAX = 100, YMIN = 0, YMAX = 100;

  const sx = (x: number) => PAD + ((x - XMIN) / (XMAX - XMIN)) * (W - 2 * PAD);
  const sy = (y: number) => H - PAD - ((y - YMIN) / (YMAX - YMIN)) * (H - 2 * PAD);
</script>

<section class="rounded-xl bg-white shadow-sm ring-1 ring-black/5 p-4 flex flex-col">
  <div class="mb-3 text-neutral-900 font-semibold">Analytics</div>

  <div class="overflow-x-auto">
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} class="max-w-full">
      <!-- axes -->
      <line x1={PAD} y1={H-PAD} x2={W-PAD} y2={H-PAD} stroke="#ddd" />
      <line x1={PAD} y1={PAD}   x2={PAD}   y2={H-PAD} stroke="#ddd" />

      {#each points as p, i}
        <circle cx={sx(p.x)} cy={sy(p.y)} r="3.2" fill={p.series === 'pre' ? '#60a5fa' : '#22c55e'} opacity="0.9">
          <title>{`${p.series.toUpperCase()}  ENDOPAIN ${p.x} | PVVQ ${p.y}`}</title>
        </circle>
      {/each}

      <!-- labels -->
      <text x={W/2} y={H-6} text-anchor="middle" class="fill-neutral-400 text-[10px]">ENDOPAIN-4D Global Score (0–100)</text>
      <text x="12" y={H/2} transform={`rotate(-90 12 ${H/2})`} class="fill-neutral-400 text-[10px]">
        PVVQ Total Score (0–100)
      </text>
    </svg>
  </div>

  <div class="mt-4 flex justify-end">
    <Button on:click={() => onViewAll()}>View all</Button>
  </div>
</section>
