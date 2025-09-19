<script lang="ts">
  import Header from '$lib/components/Header.svelte';
</script>

<div class="min-h-screen bg-neutral-25 flex flex-col">
  <Header />
  <main class="flex-1">
    <slot />
  </main>
</div>
