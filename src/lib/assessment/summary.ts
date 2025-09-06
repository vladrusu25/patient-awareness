import type { AnswerMap } from './types';
import { LABELS, PAIRS, LIKERT_KEYS, LIKERT_LABELS } from './labels';

export function buildSummaryLines(answers: AnswerMap): string[] {
  const out: string[] = [];

  // paired yes/no + intensity
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

  // likert items
  for (const [key, lk] of LIKERT_KEYS) {
    const raw = (answers[key] ?? '').toString();
    const pretty = LIKERT_LABELS[raw] ?? (raw ? raw[0].toUpperCase() + raw.slice(1) : '—');
    out.push(`${LABELS[lk]}: ${pretty}`);
  }

  return out;
}
