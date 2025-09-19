// Pure helpers for building the chat transcript (no network/DOM)

export type BotStep = { type: 'text'; key: string; bot: string[] };
export type Branching = { nextIf?: Record<string, string> };
export type Option = { label: string; value: string };
export type SingleStep = {
  type: 'single' | 'multi';
  key: string;
  prompt: string;
  options: Array<Option> | string[];
  progress?: boolean; // default true unless explicitly false
} & Branching;
export type Step = BotStep | SingleStep;
export type Message = { side: 'left' | 'right'; text: string };

export const END = '__END__';

export const isProgress = (s: Step) =>
  s.type !== 'text' && (s as SingleStep).progress !== false;

export function normalizeOptions(opts: SingleStep['options']): Option[] {
  if (Array.isArray(opts) && typeof (opts as (string | Option)[])[0] === 'string') {
    return (opts as string[]).map((v) => ({ label: String(v), value: String(v) }));
  }
  return (opts as Option[]) ?? [];
}

export function labelFor(step: SingleStep, value: unknown): string {
  const opts = normalizeOptions(step.options);
  if (Array.isArray(value)) {
    const vs = value as string[];
    return opts.filter((o) => vs.includes(o.value)).map((o) => o.label).join(', ');
  }
  const pick = opts.find((o) => o.value === value);
  return pick?.label ?? String(value ?? '');
}

export function resolveNextIndex(
  current: Step,
  pickedValue: string,
  fromIndex: number,
  steps: Step[]
): number {
  const nextKey = (current as Partial<SingleStep>)?.nextIf?.[pickedValue];

  // Respect explicit end sentinels
  if (nextKey === END || nextKey === 'END' || nextKey === '__end__') {
    return steps.length; // finish immediately
  }

  if (nextKey) {
    const i = steps.findIndex((s) => 'key' in s && s.key === nextKey);
    if (i !== -1) return i;
  }

  // Fallback: next question linearly
  for (let i = fromIndex + 1; i < steps.length; i++) {
    if (steps[i].type !== 'text') return i;
  }
  return steps.length; // finished
}

/**
 * Walk steps and answers to build a transcript until the first unanswered question.
 * Returns a pure snapshot; caller decides UI side-effects (messages, scrolling, report, etc.).
 */
export function rebuildTranscript(
  steps: Step[],
  answers: Record<string, unknown>
): { history: Message[]; currentQ: SingleStep | null; answeredCount: number; finished: boolean } {
  const history: Message[] = [];
  let answeredCount = 0;
  let currentQ: SingleStep | null = null;

  let idx = 0;
  while (idx < steps.length) {
    const step = steps[idx];

    if (step.type === 'text') {
      for (const line of (step as BotStep).bot) history.push({ side: 'left', text: line });
      idx += 1;
      continue;
    }

    const q = step as SingleStep;
    history.push({ side: 'left', text: q.prompt });

    const ans = answers[q.key];
    const hasAnswer = ans !== undefined && ans !== null && !(Array.isArray(ans) && (ans as unknown[]).length === 0);

    if (!hasAnswer) {
      currentQ = q;
      break; // stop at first unanswered
    }

    // answered bubble
    history.push({ side: 'right', text: labelFor(q, ans) });

    // progress count
    if (isProgress(q)) answeredCount += 1;

    // branch/advance
    const picked = Array.isArray(ans) ? String((ans as (string | number | boolean)[])[0]) : String(ans);
    idx = resolveNextIndex(q, picked, idx, steps);
  }

  const finished = !currentQ && idx >= steps.length;
  return { history, currentQ, answeredCount, finished };
}
