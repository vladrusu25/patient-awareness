<script lang="ts">
  import '../app.css';
  import { language } from '$lib/i18n';
  import { onMount } from 'svelte';
  import { injectAnalytics } from '@vercel/analytics';

  export let data: { language?: 'en' | 'ru' };

  $: desired = data?.language ?? 'en';
  $: if ($language !== desired) {
    language.set(desired);
  }

  onMount(() => {
    if (import.meta.env.PROD) {
      injectAnalytics();
    }
  });
</script>

<slot />
