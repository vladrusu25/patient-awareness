// src/lib/server/scores.ts
import { supa } from '$lib/server/supabase';
import {
  computeEndopainGlobalScore,
  computePcsYesCount,
  computePvvqTotal
} from '$lib/assessment/scoring';

// Extract q-number from keys like "q23_pain_improves_lying"
function qNum(key: string): number | null {
  const m = /^q(\d+)_/.exec(key);
  return m ? Number(m[1]) : null;
}

function detectParts(keys: string[]) {
  let part1 = false, part2 = false, part3 = false;
  for (const k of keys) {
    const n = qNum(k);
    if (!n) continue;
    if (n >= 1 && n <= 21) part1 = true;
    else if (n >= 22 && n <= 26) part2 = true;
    else if (n >= 27 && n <= 46) part3 = true;
  }
  return { part1, part2, part3 };
}

export async function recomputeAndUpsertScores(sessionId: string) {
  // Pull answers
  const { data: rows, error } = await supa
    .from('answers')
    .select('step_key,value_json')
    .eq('session_id', sessionId);

  if (error) throw new Error(error.message);

  const answers: Record<string, unknown> = {};
  for (const r of rows ?? []) answers[r.step_key] = r.value_json;

  // Compute scores
  const endopain_global = computeEndopainGlobalScore(answers); // 0..80 (you display /100)
  const pcs_yes_count   = computePcsYesCount(answers);         // integer
  const pcs_positive    = pcs_yes_count >= 2;                   // boolean
  const pvvq_total      = computePvvqTotal(answers) ?? null;    // 20..100 or null

  // Parts flags
  const parts = detectParts(Object.keys(answers));

  // Upsert using your column names
  const { error: upErr } = await supa
    .from('session_scores')
    .upsert(
      [{
        session_id: sessionId,
        endopain_global,
        pcs_yes_count,
        pcs_positive,
        pvvq_total,
        parts,
        computed_at: new Date().toISOString(),
      }],
      { onConflict: 'session_id' }
    );

  if (upErr) throw new Error(upErr.message);
}
