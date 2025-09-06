<script lang="ts">
  import { onMount, tick } from 'svelte';
  import ChatHeader from './ChatHeader.svelte';
  import ChatBubble from './ChatBubble.svelte';

  export let title = 'Health Assessment';
  export let token: string;

  /** ---------- Types ---------- */
  type BotStep = { type: 'text'; key: string; bot: string[] };
  type Branching = { nextIf?: Record<string, string> };
  type Option = { label: string; value: string };

  type SingleStep = {
    type: 'single' | 'multi';
    key: string;
    prompt: string;
    options: Array<Option> | string[];
    progress?: boolean; // default true unless explicitly false
  } & Branching;

  type Step = BotStep | SingleStep;
  type Message = { side: 'left' | 'right'; text: string };

  /** ---------- State ---------- */
  let steps: Step[] = [];
  let answers: Record<string, unknown> = {}; // from server
  let history: Message[] = [];

  let totalQuestions = 0;  // only progress steps
  let answeredCount = 0;   // answered progress steps along the path
  let currentQ: SingleStep | null = null;

  // PDF generation state
  let pdfUrl: string | null = null;
  type PdfStatus = 'idle' | 'generating' | 'ready' | 'error';
  let pdfStatus: PdfStatus = 'idle';
  let pdfError = '';
  let pdfRequested = false; // prevent duplicate flows

  // anchor for auto-scroll
  let bottomEl: HTMLDivElement | null = null;
  function scrollToBottom() {
    bottomEl?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }

  /** Helpers */
  const isProgress = (s: Step) => s.type !== 'text' && (s as SingleStep).progress !== false;

  function normalizeOptions(opts: SingleStep['options']): Option[] {
    if (Array.isArray(opts) && typeof opts[0] === 'string') {
      return (opts as string[]).map((v) => ({ label: String(v), value: String(v) }));
    }
    return (opts as Option[]) ?? [];
  }

  function labelFor(step: SingleStep, value: unknown): string {
    const opts = normalizeOptions(step.options);
    if (Array.isArray(value)) {
      const vs = value as string[];
      return opts
        .filter((o) => vs.includes(o.value))
        .map((o) => o.label)
        .join(', ');
    }
    const pick = opts.find((o) => o.value === value);
    return pick?.label ?? String(value ?? '');
  }

  function resolveNextIndex(current: Step, pickedValue: string, fromIndex: number) {
    const nextKey = (current as Partial<SingleStep>)?.nextIf?.[pickedValue];
    if (nextKey) {
      const i = steps.findIndex((s) => s.key === nextKey);
      if (i !== -1) return i;
    }
    // Fallback: next question linearly
    for (let i = fromIndex + 1; i < steps.length; i++) {
      if (steps[i].type !== 'text') return i;
    }
    return steps.length; // finished
  }

  /**
   * Build the transcript by walking steps and following branches until
   * the first unanswered question. Counts only "progress" questions.
   */
  function rebuildTranscript() {
    history = [];
    answeredCount = 0;
    currentQ = null;

    let idx = 0;
    while (idx < steps.length) {
      const step = steps[idx];

      if (step.type === 'text') {
        for (const line of step.bot) history.push({ side: 'left', text: line });
        idx += 1;
        continue;
      }

      // question
      history.push({ side: 'left', text: step.prompt });

      const ans = answers[step.key];
      const hasAnswer =
        ans !== undefined && ans !== null && !(Array.isArray(ans) && ans.length === 0);

      if (!hasAnswer) {
        currentQ = step;
        break; // stop at first unanswered
      }

      // user answer bubble
      history.push({ side: 'right', text: labelFor(step, ans) });

      // count only progress questions
      if (isProgress(step)) answeredCount += 1;

      // follow branch or next question
      const pickedValue = Array.isArray(ans) ? String(ans[0]) : String(ans);
      idx = resolveNextIndex(step, pickedValue, idx);
    }

    // Finished all steps
    if (!currentQ && idx >= steps.length) {
      history.push({
        side: 'left',
        text: 'Thanks! You’ve completed the questions for now. Your assessment is complete.'
      });

      if (!pdfRequested) {
        pdfRequested = true;
        startReportFlow(); // robust generation + polling
      }
    }
  }

  /** Robust report flow: show "generating", call generator, then poll for presence */
  async function startReportFlow() {
    pdfStatus = 'generating';
    pdfError = '';
    pdfUrl = null;

    // Immediately show a bot hint
    history.push({
      side: 'left',
      text: 'Preparing your PDF report… this usually takes a few seconds.'
    });
    await tick();
    scrollToBottom();

    // Kick off generation (JSON result)
    try {
      const gen = await fetch(`/api/session/${token}/pdf`, { method: 'GET', headers: { 'cache-control': 'no-store' } });
      if (!gen.ok) {
        pdfStatus = 'error';
        pdfError = `Could not generate report (${gen.status}).`;
        history.push({ side: 'left', text: 'We had trouble generating your PDF. You can try again below.' });
        await tick();
        scrollToBottom();
        return;
      }
      // We don't *need* the returned URL here; we'll still poll to be safe.
      // const { publicUrl } = await gen.json();
    } catch (e) {
      pdfStatus = 'error';
      pdfError = 'Network error while generating the report.';
      history.push({ side: 'left', text: 'We had trouble generating your PDF. You can try again below.' });
      await tick();
      scrollToBottom();
      return;
    }

    // Poll for existence via /api/pdf-search/[token]
    const found = await pollForPdf(15, 1500); // up to ~22s
    if (found) {
      pdfStatus = 'ready';
      history.push({ side: 'left', text: 'Your PDF report is ready. Use the button below to download it.' });
      await tick();
      scrollToBottom();
    } else {
      pdfStatus = 'error';
      pdfError = 'Your report is taking longer than expected. Please try again.';
      history.push({ side: 'left', text: 'Your report is taking longer than expected. You can try again below.' });
      await tick();
      scrollToBottom();
    }
  }

  async function pollForPdf(maxTries: number, delayMs: number): Promise<boolean> {
    for (let i = 0; i < maxTries; i++) {
      try {
        const res = await fetch(`/api/pdf-search/${token}`, { headers: { 'cache-control': 'no-store' } });
        if (res.ok) {
          const data = await res.json();
          if (data?.pdfFound && data?.pdfUrl) {
            pdfUrl = data.pdfUrl;
            return true;
          }
        }
      } catch {
        // ignore transient failures and keep polling
      }
      await new Promise((r) => setTimeout(r, delayMs));
    }
    return false;
  }

  /** Persist an answer, then rebuild transcript */
  async function selectOption(value: string) {
    if (!currentQ) return;

    // optimistic bubble
    const preview = labelFor(currentQ, value);
    history.push({ side: 'right', text: preview });
    await tick();
    scrollToBottom();

    // persist
    try {
      await fetch(`/api/session/${token}/answer`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ step_key: currentQ.key, value })
      });
      answers[currentQ.key] = value;
    } catch {
      // TODO: toast/error UI if desired
    }

    // refresh transcript
    rebuildTranscript();
    await tick();
    scrollToBottom();
  }

  onMount(async () => {
    const res = await fetch(`/api/session/${token}/steps`);
    const data = await res.json();

    steps = (data?.steps ?? []) as Step[];
    answers = (data?.answers ?? {}) as Record<string, unknown>;

    // total progress questions
    totalQuestions = steps.filter(isProgress).length;

    rebuildTranscript();
    await tick();
    scrollToBottom();
  });

  function handleRestart() {
    location.reload();
  }
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

    <!-- Transcript -->
    <div class="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 bg-white">
      {#each history as m}
        <ChatBubble side={m.side} text={m.text} />
      {/each}

      <!-- PDF area -->
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

      <!-- Choices -->
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
