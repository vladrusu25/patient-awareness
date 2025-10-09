<script>
  import Header from '$lib/components/Header.svelte';
  import Hero from '$lib/components/hero/Hero.svelte';
  import { page } from '$app/stores';

  const heroRoutes = ['/', '/assessment', '/api/pdf-search'];

  $: pathname = $page.url.pathname;
  $: showHero = heroRoutes.some((route) =>
    route === '/' ? pathname === '/' : pathname.startsWith(route)
  );
</script>

<Header />
{#if showHero}
  <Hero />
{/if}

<slot />
