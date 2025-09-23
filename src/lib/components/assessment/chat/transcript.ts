// Pure helpers for building the chat transcript (no network/DOM)

export type BotStep = { type: 'text'; key: string; bot: string[] };
export type Branching = { nextIf?: Record<string, string> };
export type Option = { label: string; value: string };
export type ChoiceStep = {
  type: 'single' | 'multi';
  key: string;
  prompt: string;
  options: Array<Option> | string[];
  progress?: boolean; // default true unless explicitly false
} & Branching;
export type InputStep = {
  type: 'input';
  key: string;
  prompt: string;
  placeholder?: string;
  progress?: boolean;
} & Branching;
export type QuestionStep = ChoiceStep | InputStep;
export type Step = BotStep | QuestionStep;
export type Message = { side: 'left' | 'right'; text: string };

export const END = '__END__';

export type SegmentId = 'part1' | 'part2' | 'part3';
export type SegmentProgress = { answered: number; total: number };
export type ProgressSnapshot = {
  bySegment: Record<SegmentId, SegmentProgress>;
  active: {
    id: SegmentId;
    answered: number;
    total: number;
    includesCurrent: boolean;
  };
};

const CONTINUE_SEGMENT_FLOW: Record<string, SegmentId> = {
  c1_continue_part2: 'part2',
  c2_continue_part3: 'part3'
};

const SEGMENT_ORDER: SegmentId[] = ['part1', 'part2', 'part3'];

export const isProgress = (s: Step) =>
  s.type !== 'text' && (s as QuestionStep).progress !== false;

export function normalizeOptions(step: QuestionStep): Option[] {
  if (step.type === 'input') return [];

  const raw = step.options;
  if (Array.isArray(raw) && typeof (raw as (string | Option)[])[0] === 'string') {
    return (raw as string[]).map((v) => ({ label: String(v), value: String(v) }));
  }
  return (raw as Option[]) ?? [];
}

export function labelFor(step: QuestionStep, value: unknown): string {
  if (step.type === 'input') {
    return String(value ?? '');
  }

  const opts = normalizeOptions(step);
  if (Array.isArray(value)) {
    const vs = value as string[];
    return opts.filter((o) => vs.includes(o.value)).map((o) => o.label).join(', ');
  }
  const pick = opts.find((o) => o.value === value);
  return pick?.label ?? String(value ?? '');
}

function hasAnswerValue(ans: unknown): boolean {
  if (ans === undefined || ans === null) return false;
  if (Array.isArray(ans)) return (ans as unknown[]).length > 0;
  if (typeof ans === 'string') return ans.trim().length > 0;
  return true;
}

function buildSegmentMap(steps: Step[]): Map<string, SegmentId> {
  const map = new Map<string, SegmentId>();
  let current: SegmentId = 'part1';
  for (const step of steps) {
    const key = (step as { key?: string }).key;
    if (!key) continue;
    map.set(key, current);
    const next = CONTINUE_SEGMENT_FLOW[key];
    if (next) current = next;
  }
  return map;
}

function initSegmentProgress(): Record<SegmentId, SegmentProgress> {
  return {
    part1: { answered: 0, total: 0 },
    part2: { answered: 0, total: 0 },
    part3: { answered: 0, total: 0 }
  };
}

export function resolveNextIndex(
  current: Step,
  pickedValue: string,
  fromIndex: number,
  steps: Step[]
): number {
  const nextKey = (current as Partial<QuestionStep>)?.nextIf?.[pickedValue];

  if (nextKey === END || nextKey === 'END' || nextKey === '__end__') {
    return steps.length;
  }

  if (nextKey) {
    const i = steps.findIndex((s) => 'key' in s && (s as any).key === nextKey);
    if (i !== -1) return i;
  }

  for (let i = fromIndex + 1; i < steps.length; i++) {
    if (steps[i].type !== 'text') return i;
  }
  return steps.length;
}

export function rebuildTranscript(
  steps: Step[],
  answers: Record<string, unknown>
): {
  history: Message[];
  currentQ: QuestionStep | null;
  answeredCount: number;
  finished: boolean;
  progress: ProgressSnapshot;
} {
  const history: Message[] = [];
  let answeredCount = 0;
  let currentQ: QuestionStep | null = null;

  const segmentByKey = buildSegmentMap(steps);

  let idx = 0;
  while (idx < steps.length) {
    const step = steps[idx];

    if (step.type === 'text') {
      for (const line of (step as BotStep).bot) history.push({ side: 'left', text: line });
      idx += 1;
      continue;
    }

    const q = step as QuestionStep;
    history.push({ side: 'left', text: q.prompt });

    const ans = answers[q.key];
    const hasAnswer = hasAnswerValue(ans);

    if (!hasAnswer) {
      currentQ = q;
      break;
    }

    history.push({ side: 'right', text: labelFor(q, ans) });

    if (isProgress(q)) answeredCount += 1;

    const picked = Array.isArray(ans)
      ? String((ans as (string | number | boolean)[])[0])
      : String(ans);
    idx = resolveNextIndex(q, picked, idx, steps);
  }

  const finished = !currentQ && idx >= steps.length;

  const segmentStats = initSegmentProgress();
  for (const step of steps) {
    if (step.type === 'text') continue;
    const q = step as QuestionStep;
    if (!isProgress(q)) continue;
    const segment = segmentByKey.get(q.key) ?? 'part1';
    const stats = segmentStats[segment];
    stats.total += 1;
    if (hasAnswerValue(answers[q.key])) stats.answered += 1;
  }

  let activeSegment: SegmentId;
  let includesCurrent = false;

  if (currentQ) {
    activeSegment = segmentByKey.get(currentQ.key) ?? 'part1';
    includesCurrent = isProgress(currentQ);
  } else {
    activeSegment = [...SEGMENT_ORDER].reverse().find((part) => segmentStats[part].total > 0) ?? 'part1';
  }

  const progress: ProgressSnapshot = {
    bySegment: segmentStats,
    active: {
      id: activeSegment,
      answered: segmentStats[activeSegment].answered,
      total: segmentStats[activeSegment].total,
      includesCurrent
    }
  };

  return { history, currentQ, answeredCount, finished, progress };
}
