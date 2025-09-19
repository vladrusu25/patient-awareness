<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import type { TrendPoint } from '$lib/types/admin';
  import Chart from 'chart.js/auto';

  export let points: TrendPoint[] = [];
  export let title = 'Analytics';
  export let onViewAll: (() => void) | undefined;

  let canvas: HTMLCanvasElement;
  let chart: Chart | null = null;

  function splitData(src: TrendPoint[]) {
    const scatter = src.filter((p) => p.series === 'data').map(({ x, y }) => ({ x, y }));
    const fit = src.filter((p) => p.series === 'fit').map(({ x, y }) => ({ x, y })).sort((a, b) => a.x - b.x);
    return { scatter, fit };
  }

  function buildChart() {
    const { scatter, fit } = splitData(points);
    chart?.destroy();

    chart = new Chart(canvas, {
      type: 'scatter',
      data: {
        datasets: [
          { type: 'scatter', label: 'Sessions', data: scatter, pointRadius: 3, pointHoverRadius: 5 },
          ...(fit.length === 2
            ? [{
                type: 'line',
                label: 'Normal line',
                data: fit,
                pointRadius: 0,
                borderWidth: 2,
                borderDash: [6, 6] as number[],
                tension: 0,
                fill: false
              } as const]
            : [])
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        plugins: {
          legend: { display: true },
          tooltip: {
            callbacks: {
              label: (ctx) => {
                const p = ctx.parsed;
                return `${ctx.dataset.label}: Endopain ${p.x}, PVVQ ${p.y}`;
              }
            }
          }
        },
        scales: {
          x: { type: 'linear', min: 0, max: 100, title: { display: true, text: 'ENDOPAIN-4D Global Score (0–100)' } },
          y: { type: 'linear', min: 20, max: 100, title: { display: true, text: 'PVVQ Total Score (20–100)' } }
        }
      }
    });
  }

  onMount(buildChart);
  onDestroy(() => chart?.destroy());
  $: if (canvas && points) buildChart();
</script>

<div class="rounded-2xl bg-white ring-1 ring-black/5 p-5 md:p-6 flex flex-col w-full">
  <div class="flex items-center justify-between mb-4">
    <h2 class="text-lg font-semibold">{title}</h2>
    <button
      class="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-700"
      on:click={() => onViewAll?.()}
    >View all</button>
  </div>

  <!-- taller canvas -->
  <div class="relative h-[340px] md:h-[400px]">
    <canvas bind:this={canvas} aria-label="Endopain vs PVVQ trend"></canvas>
  </div>
</div>
