<script lang="ts">
  import '../app.css';
  import { language } from '$lib/i18n';

  export let data: { language?: 'en' | 'ru' };

  $: desired = data?.language ?? 'en';
  $: if ($language !== desired) {
    language.set(desired);
  }
</script>

<slot />
