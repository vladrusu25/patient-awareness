<script lang="ts">
  import { page } from '$app/stores';

  const links = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/assessment', label: 'Assessment' },
    { href: '/contact', label: 'Contact' },
    { href: '/api/pdf-search', label: 'PDF Search' }  // <-- Add this line
  ];

  $: pathname = $page.url.pathname;
  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  let mobileOpen = false;
</script>

<header class="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-neutral-100">
  <div class="mx-auto max-w-[1280px] px-6 h-16 flex items-center justify-between">
    <!-- Brand -->
    <a href="/" class="flex items-center gap-3">
      <div class="h-10 w-10 rounded-lg bg-primary grid place-items-center">
        <svg viewBox="0 0 24 24" class="h-5 w-5 text-white" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 21s-6-4.35-8.485-6.835A6 6 0 1 1 12 5a6 6 0 1 1 8.485 9.165C18 16.65 12 21 12 21Z" />
        </svg>
      </div>
      <span class="font-heading font-bold text-xl leading-7 text-neutral-600">HealthCare</span>
    </a>

    <!-- Desktop nav -->
    <nav class="hidden md:flex items-center gap-8">
      {#each links as l}
        <a
          href={l.href}
          class="text-base font-heading transition-colors"
          class:text-neutral-900={isActive(l.href)}
          class:text-neutral-600={!isActive(l.href)}
        >
          {l.label}
        </a>
      {/each}

      <!-- POST to the start action -->
      <form method="POST" action="/assessment?/start" class="ml-2">
        <button
          type="submit"
          class="h-10 px-6 rounded-lg bg-primary text-white text-base font-heading
                 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-mint-400"
        >
          Start Assessment
        </button>
      </form>
    </nav>

    <!-- Mobile hamburger -->
    <button
      class="md:hidden inline-flex items-center justify-center rounded-lg p-2 text-neutral-700
             hover:bg-neutral-25 focus:outline-none focus:ring-2 focus:ring-mint-400"
      aria-label="Toggle menu"
      aria-expanded={mobileOpen}
      on:click={() => (mobileOpen = !mobileOpen)}
    >
      {#if !mobileOpen}
        <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      {:else}
        <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M6 6l12 12M6 18L18 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      {/if}
    </button>
  </div>

  {#if mobileOpen}
    <div class="md:hidden border-t border-neutral-100 bg-white">
      <nav class="mx-auto max-w-[1280px] px-6 py-3 flex flex-col gap-2">
        {#each links as l}
          <a
            href={l.href}
            class="rounded-lg px-2 py-2 text-base font-heading"
            class:bg-neutral-25={isActive(l.href)}
            class:text-neutral-900={isActive(l.href)}
            class:text-neutral-600={!isActive(l.href)}
            on:click={() => (mobileOpen = false)}
          >
            {l.label}
          </a>
        {/each}

        <!-- Mobile POST button -->
        <form method="POST" action="/assessment?/start" class="mt-2">
          <button
            type="submit"
            class="h-10 w-full px-6 rounded-lg bg-primary text-white text-base font-heading hover:bg-primary-700
                   focus:outline-none focus:ring-2 focus:ring-mint-400"
            on:click={() => (mobileOpen = false)}
          >
            Start Assessment
          </button>
        </form>
      </nav>
    </div>
  {/if}
</header>
