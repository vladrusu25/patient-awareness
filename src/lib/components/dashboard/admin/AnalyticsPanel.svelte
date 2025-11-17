<script lang="ts">
  import { onDestroy } from 'svelte';
  import Chart from 'chart.js/auto';
  import type { TrendPoint } from '$lib/types/admin';

  export let points: TrendPoint[] = [];
  export let strings: {
    title: string;
    datasetSessions: string;
    datasetFit: string;
    axisX: string;
    axisY: string;
    tooltip: (label: string, x: number, y: number) => string;
    empty: string;
  } = {
    title: 'Analytics',
    datasetSessions: 'Sessions',
    datasetFit: 'Trend line',
    axisX: 'ENDOPAIN-4D Global Score (0-310)',
    axisY: 'PVVQ Total Score (20-100)',
    tooltip: (label, x, y) => `${label}: Endopain ${x}, PVVQ ${y}`,
    empty: 'No data yet.'
  };

  let canvas: HTMLCanvasElement | null = null;
  let chart: Chart | null = null;

  let scatter: { x: number; y: number }[] = [];
  let fit: { x: number; y: number }[] = [];
  let hasData = false;

  function splitData(src: TrendPoint[]) {
    const scatter = src.filter((p) => p.series === 'data').map(({ x, y }) => ({ x, y }));
    const fit = src.filter((p) => p.series === 'fit').map(({ x, y }) => ({ x, y })).sort((a, b) => a.x - b.x);
    return { scatter, fit };
  }

  function buildChart() {
    if (!canvas || !hasData) return;
    chart?.destroy();
    chart = new Chart(canvas, {
      type: 'scatter',
      data: {
        datasets: [
          {
            type: 'scatter',
            label: strings.datasetSessions,
            data: scatter,
            pointRadius: 3,
            pointHoverRadius: 5
          },
          ...(fit.length === 2
            ? [{
                type: 'line',
                label: strings.datasetFit,
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
                return strings.tooltip(ctx.dataset.label ?? '', p.x, p.y);
              }
            }
          }
        },
        scales: {
          x: { type: 'linear', min: 0, max: 100, title: { display: true, text: strings.axisX } },
          y: { type: 'linear', min: 20, max: 100, title: { display: true, text: strings.axisY } }
        }
      }
    });
  }

  $: ({ scatter, fit } = splitData(points));
  $: hasData = scatter.length > 0;
$: {
    void strings;
    if (!canvas) {
      if (chart) {
        chart.destroy();
        chart = null;
      }
    } else if (hasData) {
      buildChart();
    } else if (chart) {
      chart.destroy();
      chart = null;
    }
  }

  onDestroy(() => chart?.destroy());
</script>

<div class="rounded-2xl bg-white ring-1 ring-black/5 p-5 md:p-6 flex flex-col w-full">
  <h2 class="text-lg font-semibold mb-4">{strings.title}</h2>

  {#if hasData}
    <div class="relative h-[340px] md:h-[400px]">
      <canvas bind:this={canvas} aria-label={strings.title}></canvas>
    </div>
  {:else}
    <p class="text-sm text-neutral-500">{strings.empty}</p>
  {/if}
</div>






