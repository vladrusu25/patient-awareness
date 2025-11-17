// src/lib/assessment/scoring.ts
import type { AnswerMap } from './types';
import { PCS_ITEMS, PVVQ_ORDER } from './labels';
import { PART1_SCALE_KEYS } from './part1';

const FERTILITY_KEY = 'q21a_difficulty_pregnancy';
export const PART1_MAX_SCORE = PART1_SCALE_KEYS.length * 10 + 10;

/** Part 1: sum of every 0-10 intensity answer */
export function computeEndopainGlobalScore(answers: AnswerMap): number {
  let sum = 0;
  for (const key of PART1_SCALE_KEYS) {
    const n = Number(answers[key]);
    if (!Number.isNaN(n)) {
      sum += Math.min(10, Math.max(0, n));
    }
  }
  const fertility = String(answers[FERTILITY_KEY] ?? '').toLowerCase();
  if (fertility === 'yes') {
    sum += 10;
  }
  return sum;
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
