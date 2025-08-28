<script lang="ts">
  import ChatWindow from '$lib/components/chat/ChatWindow.svelte';
  import AssessmentIntro from '$lib/components/chat/AssessmentIntro.svelte';
  import { onMount } from 'svelte';
  import type { PageData } from './$types';

  // Use the generated SvelteKit type so TS matches your load result
  export let data: PageData;

  // If a session token is present but the URL doesn't have #chat,
  // scroll to the chat block when the page mounts.
  onMount(() => {
    if (data.token && location.hash !== '#chat') {
      requestAnimationFrame(() => {
        document.getElementById('chat')?.scrollIntoView({
          behavior: 'smooth',   // "auto" or "smooth" are valid
          block: 'start'
        });
        // Keep the URL consistent without reloading:
        history.replaceState(null, '', '#chat');
      });
    }
  });
</script>

{#if !data.token}
  <!-- Intro (no session) -->
  <section class="py-12 px-4">
    <div class="mx-auto max-w-[1280px]">
      <AssessmentIntro />
    </div>
  </section>
{:else}
  <!-- Chat (active session) -->
  <section id="chat" class="py-12 px-4">
    <div class="mx-auto max-w-[1280px]">
      <!-- If ChatWindow expects a non-null string, use the non-null assertion: token={data.token!} -->
      <ChatWindow token={data.token} />
    </div>
  </section>
{/if}
