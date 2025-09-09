<script lang="ts">
  import ChatWindow from '$lib/components/chat/ChatWindow.svelte';
  import { onMount } from 'svelte';

  export let data: { token: string };

  // Ensure we land on the chat area
  onMount(() => {
    document.getElementById('chat')?.scrollIntoView({ behavior: 'instant' as any });
  });
</script>

<section id="chat" class="py-10 px-4">
  <div class="mx-auto max-w-[1024px]">
    <!-- Pass the token to your chat component -->
    <ChatWindow token={data.token} />
  </div>
</section>
