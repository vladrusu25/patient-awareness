// src/lib/assessment/scoring.ts
import type { AnswerMap } from './types';
import { PAIRS, PCS_ITEMS, PVVQ_ORDER } from './labels';

/** Part 1: ENDOPAIN-4D Global score (sum of intensities of "yes") */
export function computeEndopainGlobalScore(answers: AnswerMap): number {
  let sum = 0;
  for (const [ynKey, intensityKey] of PAIRS) {
    const yn = String(answers[ynKey] ?? '');
    if (yn === 'yes') {
      const n = Number(answers[intensityKey]);
      if (!Number.isNaN(n)) sum += Math.min(10, Math.max(0, n));
    }
  }
  return sum; // 0..80; we show `${sum}/100`
}

/** Part 2: number of YES (PCS positive if ≥ 2 Yes) */
export function computePcsYesCount(answers: AnswerMap): number {
  let yes = 0;
  for (const [key] of PCS_ITEMS) {
    if (String(answers[key] ?? '') === 'yes') yes += 1;
  }
  return yes;
}

/** Part 3: PVVQ total (sum of 1..5) */
export function computePvvqTotal(answers: AnswerMap): number {
  let total = 0;
  for (const key of PVVQ_ORDER) {
    const n = Number(answers[key]);
    if (!Number.isNaN(n)) total += Math.min(5, Math.max(1, n));
  }
  return total; // 20..100 when all 20 answered
}
