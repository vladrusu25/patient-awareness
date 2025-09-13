// src/lib/assessment/summary.ts
import type { AnswerMap } from './types';
import {
  LABELS, PAIRS, LIKERT_KEYS, LIKERT_LABELS,
  PCS_ITEMS, PVVQ_ORDER, PVVQ_LABELS
} from './labels';

/** ---------------- Part 1 lines (existing) ---------------- */
export function buildPart1Lines(answers: AnswerMap): string[] {
  const out: string[] = [];

  for (const [ynKey, intKey, labelKey] of PAIRS) {
    const yn = (answers[ynKey] ?? '').toString();
    const label = LABELS[labelKey];
    if (yn === 'yes') {
      const intensity = (answers[intKey] ?? '—').toString();
      out.push(`${label}: Yes — ${intensity}/10`);
    } else if (yn === 'no') {
      out.push(`${label}: No`);
    } else {
      out.push(`${label}: —`);
    }
  }

  for (const [key, lk] of LIKERT_KEYS) {
    const raw = (answers[key] ?? '').toString();
    const pretty = LIKERT_LABELS[raw] ?? (raw ? raw[0].toUpperCase() + raw.slice(1) : '—');
    out.push(`${LABELS[lk]}: ${pretty}`);
  }

  return out;
}

/** ---------------- Part 2 (PCS) lines ---------------- */
export function buildPart2Lines(answers: AnswerMap): string[] {
  const toPretty = (v: unknown) =>
    v === 'yes' ? 'Yes' : v === 'no' ? 'No' : v === 'unsure' ? 'Unsure' : '—';

  const out: string[] = [];
  for (const [key, label] of PCS_ITEMS) {
    out.push(`${label}: ${toPretty(answers[key])}`);
  }
  return out;
}

/** ---------------- Part 3 (PVVQ) lines ---------------- */
export function buildPart3Lines(answers: AnswerMap): string[] {
  const out: string[] = [];
  for (const key of PVVQ_ORDER) {
    const label = PVVQ_LABELS[key] ?? key;
    const val = (answers[key] ?? '').toString();
    out.push(`${label}: ${val ? `${val}/5` : '—'}`);
  }
  return out;
}

/** Convenience helper to know if a part has any answers */
export function hasAny(answers: AnswerMap, keys: string[]): boolean {
  return keys.some((k) => answers[k] !== undefined && answers[k] !== null);
}
