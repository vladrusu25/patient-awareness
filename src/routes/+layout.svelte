<script lang="ts">
  import '../app.css';
  import { language } from '$lib/i18n';
  import { onMount } from 'svelte';
  import type { Language } from '$lib/i18n/types';
  import { injectAnalytics } from '@vercel/analytics/sveltekit';

  export let data: { language?: Language };

  $: desired = (data?.language ?? 'en') as Language;
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
