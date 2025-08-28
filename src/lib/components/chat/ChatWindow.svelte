<script lang="ts">
  import ChatBubble from './ChatBubble.svelte';

  export let title = 'Health Assessment';
  export let question = 3;
  export let total = 10;
  export const token: string | null | undefined = null;

  const pct = Math.max(0, Math.min(100, Math.round((question / total) * 100)));

  // Temporary placeholder messages (static UI only)
  const messages = [
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
      text:
        'I understand. Can you describe when these headaches typically occur?'
    }
  ] as const;

  function onSubmit(e: Event) {
    e.preventDefault();
    // frontend-only for now — no-op
  }
</script>

<section class="mx-auto max-w-[1024px] px-4 md:px-6 py-6 md:py-10">
  <div
    class="rounded-2xl bg-white ring-1 ring-black/5 shadow-lg overflow-hidden
           flex flex-col h-[560px] md:h-[600px]"
  >
    <!-- Header -->
    <header
      class="bg-primary text-white h-14 md:h-16 flex items-center justify-between px-4 md:px-6"
    >
      <h3 class="font-semibold text-base md:text-lg">{title}</h3>

      <div class="flex items-center gap-3 w-[180px] md:w-[220px]">
        <span class="text-white/90 text-xs md:text-sm whitespace-nowrap">
          Question {question} of {total}
        </span>
        <div class="h-2 rounded-full bg-white/30 flex-1 overflow-hidden">
          <div class="h-full bg-white rounded-full" style={`width:${pct}%`} ></div>
        </div>
      </div>
    </header>

    <!-- Messages -->
    <div class="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 bg-white">
      {#each messages as m}
        <ChatBubble side={m.side as 'left'|'right'} text={m.text} />
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
        <!-- Paper plane icon -->
        <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M22 2L11 13" />
          <path d="M22 2l-7 20-4-9-9-4 20-7z" />
        </svg>
      </button>
    </form>
  </div>
</section>
