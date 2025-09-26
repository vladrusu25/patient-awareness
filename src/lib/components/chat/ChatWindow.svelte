<script lang="ts">
  import { onMount, tick } from 'svelte';
  import ChatHeader from './ChatHeader.svelte';
  import ChatBubble from './ChatBubble.svelte';

  import {
    type Step,
    type QuestionStep,
    type Message,
    type ProgressSnapshot,
    rebuildTranscript,
    normalizeOptions,
    labelFor
  } from '../assessment/chat/transcript';

  import { generateReportAndGetUrls } from '../assessment/report';

  export let title = 'Health Assessment';
  export let token: string;

  let steps: Step[] = [];
  let answers: Record<string, unknown> = {};
  let history: Message[] = [];

  const INITIAL_PROGRESS: ProgressSnapshot = {
    bySegment: {
      part1: { answered: 0, total: 0 },
      part2: { answered: 0, total: 0 },
      part3: { answered: 0, total: 0 }
    },
    active: { id: 'part1', answered: 0, total: 0, includesCurrent: false }
  };

  let progress: ProgressSnapshot = INITIAL_PROGRESS;
  let currentQ: QuestionStep | null = null;

  let headerQuestion = 0;
  let headerTotal = 0;

  let inputValue = '';
  let inputError = '';
  let inputSubmitting = false;

  let pdfUrl: string | null = null;
  type PdfStatus = 'idle' | 'generating' | 'ready' | 'error';
  let pdfStatus: PdfStatus = 'idle';
  let pdfError = '';
  let pdfRequested = false;
  let pdfReminderShown = false;

  let showRestartConfirm = false;
  let restartSubmitting = false;
  let restartError = '';

  let chatBodyEl: HTMLDivElement | null = null;
  let bottomEl: HTMLDivElement | null = null;

  const pdfReminderText = () =>
    `Please download and keep this PDF. Your Assessment ID is ${token}. Save it somewhere safe (note it down or take a screenshot) so you can use it on the PDF Search page if you misplace the download.`;

  function appendPdfReminder() {
    if (!pdfReminderShown || pdfStatus !== 'ready') return;

    const reminder = pdfReminderText();
    if (!history.some((m) => m.side === 'left' && m.text === reminder)) {
      history = [...history, { side: 'left', text: reminder }];
    }
  }

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

  const REFETCH_KEYS = new Set(['p0_patient_status', 'p0_patient_id_entry', 'c1_continue_part2', 'c2_continue_part3']);

  $: headerTotal = progress.active.total;
  $: headerQuestion = headerTotal
    ? Math.min(progress.active.answered + (progress.active.includesCurrent ? 1 : 0), headerTotal)
    : 0;

  $: if (currentQ?.type === 'input') {
    const stored = answers[currentQ.key];
    inputValue = typeof stored === 'string' ? stored : '';
    inputError = '';
  }

  function syncTranscript(options?: { allowCompletion?: boolean }) {
    const allowCompletion = options?.allowCompletion ?? true;

    const snap = rebuildTranscript(steps, answers);
    history = snap.history;
    appendPdfReminder();
    currentQ = snap.currentQ;
    progress = snap.progress;

    const hasQuestionSteps = steps.some((s) => s.type !== 'text');

    if (allowCompletion && snap.finished && hasQuestionSteps && !pdfRequested) {
      pdfRequested = true;
      history.push({
        side: 'left',
        text: "Thanks! You've completed the questions for now. Your assessment is complete."
      });
      startReportFlow();
    }
  }

  async function startReportFlow() {
    pdfStatus = 'generating'; pdfError = ''; pdfUrl = null;
    history.push({ side: 'left', text: 'Preparing your PDF report... this usually takes a few seconds.' });
    await tick(); scrollToLatestPrompt();

    const res = await generateReportAndGetUrls(token);
    if (res.ok) {
      pdfUrl = res.downloadUrl;
      pdfStatus = 'ready';
      history.push({ side: 'left', text: 'Your PDF report is ready. Use the button below to download it.' });
      pdfReminderShown = true;
      history = [...history, { side: 'left', text: pdfReminderText() }];
      await tick(); scrollToLatestPrompt();
      return;
    }

    pdfStatus = 'error';
    pdfError = res.status === 0 ? 'Network error while generating the report.' : `Could not generate report (${res.status}).`;
    history.push({ side: 'left', text: 'We had trouble generating your PDF. You can try again below.' });
    await tick(); scrollToLatestPrompt();
  }

  async function refetchSteps(): Promise<boolean> {
    try {
      const res = await fetch(`/api/session/${encodeURIComponent(token)}/steps?ts=${Date.now()}`, {
        headers: { 'cache-control': 'no-store' }
      });
      if (res.ok) {
        const data = await res.json();
        steps = (data?.steps ?? steps) as Step[];
        answers = (data?.answers ?? answers) as Record<string, unknown>;
        return true;
      }
    } catch {
      // ignore network failures
    }
    return false;
  }

  async function submitAnswer(value: string, options: { optimistic?: boolean } = {}) {
    if (!currentQ) return;

    const step = currentQ;
    const optimistic = options.optimistic ?? step.type !== 'input';
    const preview = labelFor(step, value);

    let previewIndex = -1;
    if (optimistic) {
      previewIndex = history.length;
      history = [...history, { side: 'right', text: preview }];
      await tick(); scrollToLatestPrompt();
    }

    let payload: any = null;
    try {
      const res = await fetch(`/api/session/${encodeURIComponent(token)}/answer`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ step_key: step.key, value })
      });
      payload = await res.json().catch(() => ({}));
      if (!res.ok || payload?.ok !== true) {
        throw new Error(payload?.message ?? payload?.error ?? 'Answer failed');
      }
    } catch (
      err
    ) {
      if (optimistic && previewIndex !== -1) {
        history = history.slice(0, previewIndex);
      }
      if (step.type === 'input') {
        inputError = payload?.message ?? payload?.error ?? 'We could not find that ID. Double-check and try again.';
      }
      return;
    }

    if (!REFETCH_KEYS.has(step.key)) {
      answers[step.key] = value;
    }

    if (step.type === 'input') {
      inputValue = value;
      inputError = '';
    }

    if (REFETCH_KEYS.has(step.key)) {
      await refetchSteps();
    }

    syncTranscript();
    await tick(); scrollToLatestPrompt();
  }

  async function handleSubmitInput(event: Event) {
    event.preventDefault();
    if (!currentQ || currentQ.type !== 'input' || inputSubmitting) return;

    const trimmed = inputValue.trim().toUpperCase().replace(/\s+/g, '');
    if (!trimmed) {
      inputError = 'Please enter your Patient ID to continue.';
      return;
    }

    inputSubmitting = true;
    await submitAnswer(trimmed, { optimistic: false });
    inputSubmitting = false;
  }

  onMount(async () => {
    const res = await fetch(`/api/session/${encodeURIComponent(token)}/steps`);
    const data = await res.json();
    steps = (data?.steps ?? []) as Step[];
    answers = (data?.answers ?? {}) as Record<string, unknown>;
    syncTranscript();
    await tick(); scrollToLatestPrompt();
  });

  function handleRestart() {
    restartError = '';
    showRestartConfirm = true;
  }

  function cancelRestart() {
    if (restartSubmitting) return;
    restartError = '';
    showRestartConfirm = false;
  }

  async function confirmRestart() {
    if (restartSubmitting) return;
    restartSubmitting = true;
    restartError = '';

    try {
      const res = await fetch('/api/session', {
        method: 'POST',
        headers: { 'cache-control': 'no-store' }
      });

      if (!res.ok) {
        throw new Error('Failed to start a new session.');
      }

      const body = (await res.json().catch(() => ({}))) as Partial<{ token: string }>;
      const newToken = typeof body.token === 'string' ? body.token : null;
      const dest = newToken ? `/api/session/${encodeURIComponent(newToken)}#chat` : '/assessment#chat';
      location.replace(dest);
    } catch (err) {
      console.error(err);
      restartError = err instanceof Error ? err.message : 'Failed to start a new session.';
      restartSubmitting = false;
    }
  }
</script>

<section class="mx-auto max-w-[1024px]">
  <div class="rounded-2xl bg-neutral-25 ring-1 ring-black/5 shadow-lg overflow-hidden flex flex-col h-[560px] md:h-[600px]">
    <ChatHeader
      {title}
      question={headerQuestion}
      total={headerTotal}
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
            Preparing your PDF...
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
        {#if currentQ.type === 'input'}
          <form class="space-y-2" on:submit|preventDefault={handleSubmitInput}>
            <input
              class="w-full rounded-lg border border-neutral-300 px-4 py-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-mint-400"
              type="text"
              bind:value={inputValue}
              placeholder={currentQ.placeholder ?? 'Enter value'}
              autocomplete="off"
              autocapitalize="characters"
              spellcheck={false}
              disabled={inputSubmitting}
            />
            {#if inputError}
              <div class="text-sm text-red-600">{inputError}</div>
            {/if}
            <button
              class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-700 disabled:opacity-70"
              type="submit"
              disabled={inputSubmitting}
            >
              {inputSubmitting ? 'Checking...' : 'Submit'}
            </button>
          </form>
        {:else}
          {#each normalizeOptions(currentQ) as opt}
            <button
              class="block w-full text-left rounded-lg border border-neutral-300 px-4 py-3 mb-2 hover:bg-neutral-50 focus-visible:ring-2 focus-visible:ring-mint-400"
              on:click={() => submitAnswer(opt.value, { optimistic: true })}
            >
              {opt.label}
            </button>
          {/each}
        {/if}
      {/if}

      <div bind:this={bottomEl}></div>
    </div>
  </div>
</section>

{#if showRestartConfirm}
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
    role="dialog"
    aria-modal="true"
    on:click={() => {
      if (!restartSubmitting) cancelRestart();
    }}
  >
    <div
      class="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl space-y-4"
      on:click|stopPropagation
    >
      <h2 class="text-lg font-semibold text-neutral-900">Start a new session?</h2>
      <p class="text-sm text-neutral-600">
        Starting over will discard your current answers. You can keep this session if you want to return later.
      </p>
      {#if restartError}
        <p class="text-sm text-red-600">{restartError}</p>
      {/if}
      <div class="flex justify-end gap-3 pt-2">
        <button
          type="button"
          class="inline-flex items-center rounded-lg border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 disabled:opacity-70"
          on:click={cancelRestart}
          disabled={restartSubmitting}
        >
          Keep session
        </button>
        <button
          type="button"
          class="inline-flex items-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 disabled:opacity-70"
          on:click={confirmRestart}
          disabled={restartSubmitting}
        >
          {restartSubmitting ? 'Starting...' : 'Forfeit & start over'}
        </button>
      </div>
    </div>
  </div>
{/if}




