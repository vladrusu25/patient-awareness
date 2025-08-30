<script lang="ts">
  import ChatHeader from './ChatHeader.svelte';
  import ChatBubble from './ChatBubble.svelte';

  export let title = 'Health Assessment';
  export let question = 3;
  export let total = 10;

  // must be `let` so parent can pass/replace it
  export const token: string | null = null;

  type Side = 'left' | 'right';
  const messages: { side: Side; text: string }[] = [
    {
      side: 'left',
      text: "Hello! I'm here to help assess your health. How are you feeling today?"
    },
    {
      side: 'right',
      text: "I've been experiencing some headaches lately."
    },
    {
      side: 'left',
      text: 'I understand. Can you describe when these headaches typically occur?'
    }
  ];

  function onSubmit(e: Event) {
    e.preventDefault();
    // no-op for now
  }

  function handleRestart() {
    // bubble up and let the page create a new session
    const ev = new CustomEvent('restart', { bubbles: true });
    dispatchEvent(ev);
  }
</script>

<section class="mx-auto max-w-[1024px]">
  <!-- single, balanced wrapper -->
  <div
    class="rounded-2xl bg-neutral-25 ring-1 ring-black/5 shadow-lg overflow-hidden
           flex flex-col h-[560px] md:h-[600px]"
  >
    <!-- Header component -->
    <!-- set showRestart to true when you wire restart -->
    <ChatHeader
      {title}
      {question}
      {total}
      showRestart={true}
      on:restart={handleRestart}
    />

    <!-- Messages -->
    <div class="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 bg-white">
      {#each messages as m}
        <ChatBubble side={m.side} text={m.text} />
      {/each}
    </div>

    <!-- Composer -->
    <form
      class="border-t border-neutral-100 p-3 md:p-4 flex items-center gap-3 bg-white"
      on:submit|preventDefault={onSubmit}
      aria-label="Message composer"
    >
      <input
        class="flex-1 h-10 md:h-11 rounded-lg border border-neutral-300 px-4
               outline-none focus-visible:ring-2 focus-visible:ring-mint-400"
        type="text"
        placeholder="Type your response…"
        aria-label="Type your response"
      />

      <button
        type="submit"
        class="h-10 w-10 md:h-11 md:w-11 rounded-lg bg-primary text-white
               grid place-items-center hover:bg-primary-700 focus-visible:ring-2
               focus-visible:ring-mint-400"
        aria-label="Send"
      >
        <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M22 2L11 13" />
          <path d="M22 2l-7 20-4-9-9-4 20-7z" />
        </svg>
      </button>
    </form>
  </div>
</section>
