<script lang="ts">
  import ChatWindow from '$lib/components/chat/ChatWindow.svelte';
  import AssessmentIntro from '$lib/components/chat/AssessmentIntro.svelte';
  import { onMount } from 'svelte';
	import ValueProps from '../../lib/components/ValueProps.svelte';
	import Testimonials from '$lib/components/Testimonials.svelte';
	import Footer from '$lib/components/Footer.svelte';
  export let data: { token: string | null };

  onMount(() => {
    if (data.token && location.hash !== '#chat') {
      document.getElementById('chat')?.scrollIntoView({ behavior: 'instant' as any });
    }
  });
</script>

{#if !data.token}
  <section class="bg-neutral-25 py-10 px-4">
    <AssessmentIntro />
  </section>
{:else}
  <section id="chat" class="bg-neutral-25 py-10 px-4">
    <ChatWindow />
  </section>
{/if} 
<div class="border-t border-neutral-100">
  <ValueProps />
</div>
<Testimonials />
<Footer />
