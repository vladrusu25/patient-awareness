<script>
  import '../app.css';
  import Header from '$lib/components/Header.svelte';
  import Hero from '$lib/components/hero/Hero.svelte';
	import Knowledge from '$lib/components/homepage/Knowledge.svelte';
	
</script>

<Header />
<Hero />

<slot />
