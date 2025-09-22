<script lang="ts">
  import { onMount, tick } from 'svelte';
  import ChatHeader from './ChatHeader.svelte';
  import ChatBubble from './ChatBubble.svelte';

  import {
    type Step,
    type SingleStep,
    type Message,
    rebuildTranscript,
    normalizeOptions,
    labelFor,
    isProgress
  } from '../assessment/chat/transcript';

  import { generateReportAndGetUrls } from '../assessment/report';

  export let title = 'Health Assessment';
  export let token: string;

  let steps: Step[] = [];
  let answers: Record<string, unknown> = {};
  let history: Message[] = [];

  let totalQuestions = 0;
  let answeredCount = 0;
  let currentQ: SingleStep | null = null;

  // PDF state
  let pdfUrl: string | null = null; // signed download URL
  type PdfStatus = 'idle' | 'generating' | 'ready' | 'error';
  let pdfStatus: PdfStatus = 'idle';
  let pdfError = '';
  let pdfRequested = false;

  let chatBodyEl: HTMLDivElement | null = null;
  let bottomEl: HTMLDivElement | null = null;

  const scrollToLatestPrompt = () => {
    if (chatBodyEl) {
      const prompts = chatBodyEl.querySelectorAll('[data-role="chat-bubble"][data-side="left"]');
      const target = prompts.item(prompts.length - 1) as HTMLElement | null;
      if (target) {
        const parent = chatBodyEl;
        const parentRect = parent.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();
        const currentTop = targetRect.top - parentRect.top + parent.scrollTop;
        const margin = 32;
        const maxScroll = parent.scrollHeight - parent.clientHeight;
        const desiredTop = Math.min(Math.max(currentTop - margin, 0), Math.max(maxScroll, 0));
        parent.scrollTo({ top: desiredTop, behavior: 'smooth' });
        return;
      }
    }

    bottomEl?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  };

  const CONTINUE_GATES = new Set(['c1_continue_part2', 'c2_continue_part3']);

  function syncTranscript() {
    const snap = rebuildTranscript(steps, answers);
    history = snap.history;
    currentQ = snap.currentQ;
    answeredCount = snap.answeredCount;

    if (snap.finished && !pdfRequested) {
      pdfRequested = true;
      history.push({
        side: 'left',
        text: 'Thanks! You’ve completed the questions for now. Your assessment is complete.'
      });
      // kick off report
      startReportFlow();
    }
  }

  async function startReportFlow() {
    pdfStatus = 'generating'; pdfError = ''; pdfUrl = null;
    history.push({ side: 'left', text: 'Preparing your PDF report… this usually takes a few seconds.' });
    await tick(); scrollToLatestPrompt();

    const res = await generateReportAndGetUrls(token);
    if (res.ok) {
      pdfUrl = res.downloadUrl;
      pdfStatus = 'ready';
      history.push({ side: 'left', text: 'Your PDF report is ready. Use the button below to download it.' });
      await tick(); scrollToLatestPrompt();
      return;
    }

    pdfStatus = 'error';
    pdfError = res.status === 0 ? 'Network error while generating the report.' : `Could not generate report (${res.status}).`;
    history.push({ side: 'left', text: 'We had trouble generating your PDF. You can try again below.' });
    await tick(); scrollToLatestPrompt();
  }

  async function selectOption(value: string) {
    if (!currentQ) return;

    // optimistic bubble
    const preview = labelFor(currentQ, value);
    history.push({ side: 'right', text: preview });
    await tick(); scrollToLatestPrompt();

    // persist
    try {
      await fetch(`/api/session/${encodeURIComponent(token)}/answer`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ step_key: currentQ.key, value })
      });
      answers[currentQ.key] = value;
    } catch {
      // could add a toast later
    }

    // If continue gate, re-fetch authoritative steps+answers
    if (CONTINUE_GATES.has(currentQ.key)) {
      try {
        const res = await fetch(`/api/session/${encodeURIComponent(token)}/steps?ts=${Date.now()}`, {
          headers: { 'cache-control': 'no-store' }
        });
        if (res.ok) {
          const data = await res.json();
          steps = (data?.steps ?? steps) as Step[];
          answers = (data?.answers ?? answers) as Record<string, unknown>;
        }
      } catch {}
    }

    syncTranscript();
    await tick(); scrollToLatestPrompt();
  }

  onMount(async () => {
    const res = await fetch(`/api/session/${encodeURIComponent(token)}/steps`);
    const data = await res.json();
    steps = (data?.steps ?? []) as Step[];
    answers = (data?.answers ?? {}) as Record<string, unknown>;
    totalQuestions = steps.filter(isProgress).length;
    syncTranscript();
    await tick(); scrollToLatestPrompt();
  });

  function handleRestart() { location.reload(); }
</script>

<section class="mx-auto max-w-[1024px]">
  <div class="rounded-2xl bg-neutral-25 ring-1 ring-black/5 shadow-lg overflow-hidden flex flex-col h-[560px] md:h-[600px]">
    <ChatHeader
      {title}
      question={Math.min(answeredCount + (currentQ ? 1 : 0), totalQuestions)}
      total={totalQuestions}
      showRestart={true}
      on:restart={handleRestart}
    />

    <div bind:this={chatBodyEl} class="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 bg-white">
      {#each history as m}
        <ChatBubble side={m.side} text={m.text} />
      {/each}

      {#if pdfStatus === 'generating'}
        <div class="text-sm text-neutral-600">
          <div class="inline-flex items-center gap-2 rounded-lg border border-neutral-200 px-3 py-2 bg-neutral-25">
            <span class="animate-pulse h-2 w-2 rounded-full bg-primary"></span>
            Preparing your PDF…
          </div>
        </div>
      {/if}

      {#if pdfStatus === 'ready' && pdfUrl}
        <div>
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener"
            class="inline-flex items-center gap-2 px-6 py-3 text-white bg-primary rounded-lg hover:bg-primary-700"
          >
            Download your PDF
            <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </a>
        </div>
      {/if}

      {#if pdfStatus === 'error'}
        <div class="space-y-2">
          <div class="text-sm text-red-600">{pdfError}</div>
          <button
            class="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-neutral-300 hover:bg-neutral-50"
            on:click={startReportFlow}
          >
            Try again
          </button>
        </div>
      {/if}

      {#if currentQ}
        {#each normalizeOptions(currentQ.options) as opt}
          <button
            class="block w-full text-left rounded-lg border border-neutral-300 px-4 py-3 mb-2 hover:bg-neutral-50 focus-visible:ring-2 focus-visible:ring-mint-400"
            on:click={() => selectOption(opt.value)}
          >
            {opt.label}
          </button>
        {/each}
      {/if}

      <div bind:this={bottomEl}></div>
    </div>
  </div>
</section>
