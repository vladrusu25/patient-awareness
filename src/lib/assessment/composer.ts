// src/lib/assessment/composer.ts
// Compose a linear step list from the 3 parts based on existing answers.
//
// It adds two continue gates with short encouragement:
//   - c1_continue_part2  (after Part 1)  -> Part 2
//   - c2_continue_part3  (after Part 2)  -> Part 3
//
// If the user answered "no" we end the flow. If they answered "yes" (or they
// already have answers in that part) we include the part's steps.
//
// NOTE: We keep the continue steps in the composed result so the transcript
// will show the user's "Yes/No" answer.

type BotStep = { type: 'text'; key: string; bot: string[] };
type SingleStep = {
  type: 'single' | 'multi';
  key: string;
  prompt: string;
  options: Array<{ label: string; value: string }>;
  progress?: boolean;
  nextIf?: Record<string, string>;
};
type Step = BotStep | SingleStep;

import part1 from '$lib/data/endopain.part1.v1.json';
import part2 from '$lib/data/pcs.part2.v1.json';
import part3 from '$lib/data/pvvq.part3.v1.json';

// First keys in each part (used by nextIf when user selects "Yes")
const P2_FIRST = 'q22_pain_worse_standing';
const P3_FIRST = 'q27_lower_abdominal_pain';
const END = '__END__';

function keysOf(steps: any[]): Set<string> {
  const s = new Set<string>();
  for (const st of steps) if (st?.key) s.add(st.key);
  return s;
}

const P2_KEYS = keysOf(part2 as any[]);
const P3_KEYS = keysOf(part3 as any[]);

export function composeSteps(answers: Record<string, unknown>): Step[] {
  const out: Step[] = [...(part1 as Step[])];

  // ----- Continue to Part 2
  const enc2: BotStep = {
    type: 'text',
    key: 'bot_enc_part2',
    bot: ['Nice progress — Part 2 is just 5 quick questions that help identify pelvic vein involvement.']
  };
  const gate2: SingleStep = {
    type: 'single',
    key: 'c1_continue_part2',
    prompt: 'Would you like to continue with Part 2 (PCS screening)?',
    options: [
      { label: 'Yes', value: 'yes' },
      { label: 'No', value: 'no' }
    ],
    progress: false, // don’t count toward the progress bar
    nextIf: { yes: P2_FIRST, no: END }
  };

  // Show the encouragement + gate always (so the transcript contains it)
  out.push(enc2, gate2);

  // Include Part 2 if:
  //   - user already answered "yes", OR
  //   - user has already answered at least one step from Part 2 (resume case)
  const c1Answer = String(answers['c1_continue_part2'] ?? '');
  const userHasAnyP2Answer = [...P2_KEYS].some((k) => answers[k] !== undefined);

  if (c1Answer === 'yes' || userHasAnyP2Answer) {
    out.push(...(part2 as Step[]));

    // ----- Continue to Part 3
    const enc3: BotStep = {
      type: 'text',
      key: 'bot_enc_part3',
      bot: ['Great work — Part 3 (PVVQ) takes about 2–3 minutes and really strengthens your report.']
    };
    const gate3: SingleStep = {
      type: 'single',
      key: 'c2_continue_part3',
      prompt: 'Would you like to continue with Part 3 (PVVQ)?',
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ],
      progress: false,
      nextIf: { yes: P3_FIRST, no: END }
    };
    out.push(enc3, gate3);

    const c2Answer = String(answers['c2_continue_part3'] ?? '');
    const userHasAnyP3Answer = [...P3_KEYS].some((k) => answers[k] !== undefined);

    if (c2Answer === 'yes' || userHasAnyP3Answer) {
      out.push(...(part3 as Step[]));
    }
  }

  return out;
}
