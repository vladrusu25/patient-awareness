<script lang="ts">
  import Sidebar from '$lib/components/dashboard/admin/Sidebar.svelte';
  import Topbar from '$lib/components/dashboard/admin/Topbar.svelte';
  import StatCard from '$lib/components/dashboard/admin/Statcard.svelte';
  import PatientsPanel from '$lib/components/dashboard/admin/PatientsPanel.svelte';
  import AnalyticsPanel from '$lib/components/dashboard/admin/AnalyticsPanel.svelte';
  import type { PageData } from './$types';

  export let data: PageData;

  const nav = [
    { href: '/admin', label: 'Overview', active: true },
    { href: '/admin/patients', label: 'Patients' },
    { href: '/admin/analytics', label: 'Analytics' },
    { href: '/admin/reports', label: 'Reports' },
    { href: '/admin/settings', label: 'Settings' }
  ];

  function handleExport() {
    console.info('Export cohort PDF');
  }
</script>

<!-- Fill the slot height; prevent outer scroll -->
<div class="flex h-full gap-6 overflow-hidden">
  <Sidebar items={nav} />

  <!-- Only this column scrolls -->
  <div class="flex-1 min-w-0 overflow-y-auto">
    <Topbar rangeLabel={data.rangeLabel} onExport={handleExport} />

    <main class="p-4 md:p-6 space-y-4">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard value={data.metrics.completedAll} label="Completed All" />
        <StatCard value={data.metrics.part1Only} label="Part 1 Only" />
        <StatCard value={data.metrics.pvvqContinued} label="PVVQ Continued" />
        <StatCard value={`${data.metrics.conversionRatePct.toFixed(1)}%`} label="Conversion Rate" />
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <PatientsPanel patients={data.patients} onViewAll={() => (location.href = '/admin/patients')} />
        <AnalyticsPanel points={data.points} onViewAll={() => (location.href = '/admin/analytics')} />
      </div>

      <!-- keep or remove the spacer; it will scroll inside this column -->
      <div class="h-8"></div>
    </main>
  </div>
</div>
