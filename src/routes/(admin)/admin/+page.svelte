<script lang="ts">
  import Sidebar from '$lib/components/dashboard/admin/Sidebar.svelte';
  import Topbar from '$lib/components/dashboard/admin/Topbar.svelte';
  import StatCard from '$lib/components/dashboard/admin/Statcard.svelte';
  import AnalyticsPanel from '$lib/components/dashboard/admin/AnalyticsPanel.svelte';
  import { t } from '$lib/i18n';
  import type { PageData } from './$types';

  export let data: PageData;

  const navBase = [{ href: '/admin', labelKey: 'admin.nav.overview', active: true }];

  $: nav = navBase.map((item) => ({ ...item, label: $t(item.labelKey) }));
    $: statLabels = {
    completedAll: $t('admin.stats.completedAll'),
    part1Only: $t('admin.stats.part1Only'),
    pvvqContinued: $t('admin.stats.pvvqContinued'),
    conversionRate: $t('admin.stats.conversionRate')
  };
  $: conversionValue = `${data.metrics.conversionRatePct.toFixed(1)}%`;
  $: analyticsStrings = {
    title: $t('admin.analytics.title'),
    datasetSessions: $t('admin.analytics.datasets.sessions'),
    datasetFit: $t('admin.analytics.datasets.fit'),
    axisX: $t('admin.analytics.axes.x'),
    axisY: $t('admin.analytics.axes.y'),
    tooltip: (label: string, x: number, y: number) =>
      $t('admin.analytics.tooltip', { label, x: x.toFixed(1), y: y.toFixed(1) }),
    empty: $t('admin.analytics.empty')
  };
</script>

<!-- Fill the slot height; prevent outer scroll -->
<div class="flex h-full gap-6 overflow-hidden">
  <Sidebar items={nav} />

  <!-- Only this column scrolls -->
  <div class="flex-1 min-w-0 overflow-y-auto">
    <Topbar rangeKey={data.rangeKey} ranges={data.ranges} />

    <main class="p-4 md:p-6 space-y-4">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard value={data.metrics.completedAll} label={statLabels.completedAll} />
        <StatCard value={data.metrics.part1Only} label={statLabels.part1Only} />
        <StatCard value={data.metrics.pvvqContinued} label={statLabels.pvvqContinued} />
        <StatCard value={conversionValue} label={statLabels.conversionRate} />
      </div>

      <AnalyticsPanel points={data.points} strings={analyticsStrings} />

      <!-- keep or remove the spacer; it will scroll inside this column -->
      <div class="h-8"></div>
    </main>
  </div>
</div>
