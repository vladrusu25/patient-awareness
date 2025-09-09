<script lang="ts">
  import Sidebar from '$lib/components/dashboard/admin/Sidebar.svelte';
  import Topbar from '$lib/components/dashboard/admin/Topbar.svelte';
  import StatCard from '$lib/components/dashboard/admin/Statcard.svelte';
  import PatientsPanel from '$lib/components/dashboard/admin/PatientsPanel.svelte';
  import AnalyticsPanel from '$lib/components/dashboard/admin/AnalyticsPanel.svelte';
  import '../../../app.css';

  
  import type { PageData } from './$types';

  export let data: PageData;

  const nav = [
    { href: '/doctor', label: 'Overview', active: true },
    { href: '/doctor/patients', label: 'Patients' },
    { href: '/doctor/analytics', label: 'Analytics' },
    { href: '/doctor/reports', label: 'Reports' },
    { href: '/doctor/settings', label: 'Settings' },
  ];

  function handleExport() {
    // TODO hook PDF export
    console.info('Export cohort PDF');
  }

  function handleLogout() {
    // TODO your sign-out
    location.href = '/';
  }
</script>

<div class="min-h-[calc(100vh-64px)] bg-neutral-25">
  <div class="flex">
    <Sidebar items={nav}>
    </Sidebar>

    <div class="flex-1 min-w-0">
      <Topbar dateLabel={data.rangeLabel} onExport={handleExport} onLogout={handleLogout} />

      <main class="p-4 md:p-6 space-y-4">
        <!-- Stat cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard value={data.metrics.completedAll} label="Completed All" />
          <StatCard value={data.metrics.part1Only} label="Part 1 Only" />
          <StatCard value={data.metrics.pvvqContinued} label="PVVQ Continued" />
          <StatCard value={`${data.metrics.conversionRatePct.toFixed(1)}%`} label="Conversion Rate" />
        </div>

        <!-- Two top quadrants -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <PatientsPanel patients={data.patients} onViewAll={() => (location.href = '/doctor/patients')} />
          <AnalyticsPanel points={data.points} onViewAll={() => (location.href = '/doctor/analytics')} />
        </div>

        <!-- bottom quadrants reserved (empty space by design) -->
        <div class="h-48 lg:h-56"></div>
      </main>
    </div>
  </div>
</div>
