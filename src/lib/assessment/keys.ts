import type { AnswerMap } from './types';

// Import your JSON templates (you already have Part1 JSON)
import part1 from '$lib/data/endopain.part1.v1.json';
import part2 from '$lib/data/pcs.part2.v1.json';
import part3 from '$lib/data/pvvq.part3.v1.json';

// Helper to extract all question keys of type 'single'/'multi' from a template
function keysFrom(steps: any[]): string[] {
  return steps
    .filter((s) => s.type === 'single' || s.type === 'multi')
    .map((s) => s.key);
}

export const PART1_KEYS = keysFrom(part1);
// ENDOPAIN: 8 yes/no (+ intensity) pairs – you already compute via PAIRS.
// Optionally expose the yes/no keys for convenience:
export const PART1_YESNO_KEYS = [
  'q1_spontaneous_pelvic_pain','q3_menstrual_pain','q5_dyspareunia_pain','q7_postcoital_pain',
  'q9_bowel_menses_pain','q11_bowel_outside_pain','q13_urination_pain','q15_lumbar_pain'
];

export const PART2_KEYS = keysFrom(part2); // the 5 PCS items (yes/no)
export const PART3_KEYS = keysFrom(part3); // the 20 PVVQ items (1..5)

export const CONTINUE_P2_KEY = 'c1_continue_part2';
export const CONTINUE_P3_KEY = 'c2_continue_part3';

export function hasAny(answers: AnswerMap, keys: string[]) {
  return keys.some((k) => answers[k] !== undefined && answers[k] !== null);
}
