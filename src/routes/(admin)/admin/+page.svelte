<script lang="ts">
  import Sidebar from '$lib/components/dashboard/admin/Sidebar.svelte';
  import Topbar from '$lib/components/dashboard/admin/Topbar.svelte';
  import StatCard from '$lib/components/dashboard/admin/Statcard.svelte';
  import AnalyticsPanel from '$lib/components/dashboard/admin/AnalyticsPanel.svelte';
  import { t } from '$lib/i18n';
  import type { PageData } from './$types';

  export let data: PageData;

  const navBase = [
    { href: '/admin', labelKey: 'admin.nav.overview', active: true },
    { href: '/admin/doctors', labelKey: 'admin.nav.doctors', active: false }
  ];
  let mobileNavOpen = false;

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

  function openMobileNav() {
    mobileNavOpen = true;
  }

  function closeMobileNav() {
    mobileNavOpen = false;
  }

  function handleOverlayKey(event: KeyboardEvent) {
    if (event.key === 'Escape' || event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      closeMobileNav();
    }
  }
</script>

<!-- Mobile header -->
<div class="lg:hidden sticky top-0 z-20 border-b border-neutral-100 bg-white">
  <div class="flex items-center justify-between px-4 py-3">
    <div class="flex items-center gap-3">
      <img src="/images/logo.png" alt="Smart Health logo" class="h-8 w-auto" />
      <span class="font-heading font-semibold text-base text-neutral-700">{$t('common.brand')}</span>
    </div>
    <button
      type="button"
      class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 text-neutral-600 hover:text-neutral-800 hover:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-mint-400"
      on:click={openMobileNav}
    >
      <span class="sr-only">{$t('header.toggleMenu')}</span>
      <svg class="h-5 w-5" viewBox="0 0 20 20" fill="none">
        <path
          d="M4 6h12M4 10h12M4 14h12"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
        />
      </svg>
    </button>
  </div>
</div>

{#if mobileNavOpen}
  <div
    class="fixed inset-0 z-40 bg-neutral-900/40"
    role="button"
    tabindex="0"
    aria-label={$t('common.close')}
    on:click={closeMobileNav}
    on:keydown={handleOverlayKey}
  ></div>
  <div class="fixed inset-y-0 left-0 z-50 w-[260px]" role="dialog" aria-modal="true">
    <Sidebar items={nav} classes="shadow-xl" showClose on:close={closeMobileNav} />
  </div>
{/if}

<!-- Desktop shell -->
<div class="lg:flex lg:h-full lg:gap-6 lg:overflow-hidden">
  <Sidebar items={nav} classes="hidden lg:block" />

  <div class="flex-1 min-w-0 lg:overflow-y-auto">
    <main class="p-4 md:p-6 space-y-6">
      <Topbar rangeKey={data.rangeKey} ranges={data.ranges} />
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard value={data.metrics.completedAll} label={statLabels.completedAll} />
        <StatCard value={data.metrics.part1Only} label={statLabels.part1Only} />
        <StatCard value={data.metrics.pvvqContinued} label={statLabels.pvvqContinued} />
        <StatCard value={conversionValue} label={statLabels.conversionRate} />
      </div>

      <AnalyticsPanel points={data.points} strings={analyticsStrings} />
    </main>
  </div>
</div>
