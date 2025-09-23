// src/lib/assessment/composer.ts
// Compose a linear step list from the 3 parts based on existing answers and patient context.

import part1 from '$lib/data/endopain.part1.v1.json';
import part2 from '$lib/data/pcs.part2.v1.json';
import part3 from '$lib/data/pvvq.part3.v1.json';

export type BotStep = { type: 'text'; key: string; bot: string[] };
export type Option = { label: string; value: string };
export type ChoiceStep = {
  type: 'single' | 'multi';
  key: string;
  prompt: string;
  options: Array<Option> | string[];
  progress?: boolean;
  nextIf?: Record<string, string>;
};
export type InputStep = {
  type: 'input';
  key: string;
  prompt: string;
  placeholder?: string;
  progress?: boolean;
  nextIf?: Record<string, string>;
};
export type Step = BotStep | ChoiceStep | InputStep;

const P2_FIRST = 'q22_pain_worse_standing';
const P3_FIRST = 'q27_lower_abdominal_pain';
const END = '__END__';

function keysOf(steps: Array<{ key?: string }>): Set<string> {
  const s = new Set<string>();
  for (const st of steps) if (st?.key) s.add(st.key);
  return s;
}

const P2_KEYS = keysOf(part2 as Step[]);
const P3_KEYS = keysOf(part3 as Step[]);

export type ComposeContext = {
  patientPublicId?: string | null;
};

function patientIntro(): Step[] {
  return [
    {
      type: 'text',
      key: 'p0_intro',
      bot: ['Hi! Before we begin, have you completed this questionnaire before?']
    },
    {
      type: 'single',
      key: 'p0_patient_status',
      prompt: 'Are you new here or do you have a Patient ID?',
      options: [
        { label: "I'm new", value: 'new' },
        { label: 'I have a Patient ID', value: 'returning' }
      ],
      progress: false,
      nextIf: { new: 'p0_patient_new_ack', returning: 'p0_patient_id_entry' }
    }
  ];
}

function privacyNote(): Step {
  return {
    type: 'text',
    key: 'p0_privacy',
    bot: ['We don’t collect personal details. Your Patient ID only links your own assessments.']
  };
}

function newPatientAck(publicId: string): Step {
  return {
    type: 'text',
    key: 'p0_patient_new_ack',
    bot: [
      "Great! I’ve created your Patient ID. Please save it. You’ll use it next time to see your progress.",
      `Patient ID: ${publicId} — save or take a screenshot.`
    ]
  };
}

const returningPatientPrompt: InputStep = {
  type: 'input',
  key: 'p0_patient_id_entry',
  prompt: 'Enter your Patient ID so we can link to your previous assessments (example: A12345).',
  placeholder: 'A12345',
  progress: false
};

function returningAck(publicId: string): Step {
  return {
    type: 'text',
    key: 'p0_patient_returning_ack',
    bot: [`Thanks! We’ve linked your previous results. Patient ID ${publicId} is all set — let’s continue.`]
  };
}

export function composeSteps(
  answers: Record<string, unknown>,
  ctx: ComposeContext = {}
): Step[] {
  const out: Step[] = [...patientIntro()];

  const statusRaw = answers['p0_patient_status'];
  const status = typeof statusRaw === 'string' ? statusRaw.toLowerCase() : '';
  const patientId = ctx.patientPublicId ?? null;

  if (!status) {
    return out;
  }

  if (status === 'new') {
    if (!patientId) {
      return out;
    }
    out.push(newPatientAck(patientId));
    out.push(privacyNote());
  }

  if (status === 'returning') {
    out.push(returningPatientPrompt);
    if (!patientId) {
      return out;
    }
    out.push(returningAck(patientId));
    out.push(privacyNote());
  }

  const part1Steps = part1 as Step[];
  out.push(...part1Steps);

  const enc2: BotStep = {
    type: 'text',
    key: 'bot_enc_part2',
    bot: ['Nice progress - Part 2 is just 5 quick questions that help identify pelvic vein involvement.']
  };
  const gate2: ChoiceStep = {
    type: 'single',
    key: 'c1_continue_part2',
    prompt: 'Would you like to continue with Part 2 (PCS screening)?',
    options: [
      { label: 'Yes', value: 'yes' },
      { label: 'No', value: 'no' }
    ],
    progress: false,
    nextIf: { yes: P2_FIRST, no: END }
  };

  out.push(enc2, gate2);

  const c1Answer = String(answers['c1_continue_part2'] ?? '');
  const userHasAnyP2Answer = [...P2_KEYS].some((k) => answers[k] !== undefined);

  if (c1Answer === 'yes' || userHasAnyP2Answer) {
    out.push(...(part2 as Step[]));

    const enc3: BotStep = {
      type: 'text',
      key: 'bot_enc_part3',
      bot: ['Great work - Part 3 (PVVQ) takes about 2-3 minutes and really strengthens your report.']
    };
    const gate3: ChoiceStep = {
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

  out.push({
    type: 'text',
    key: 'wrap_up',
    bot: [
      "Thanks - you've completed everything needed for now.",
      "We're preparing your PDF report next."
    ]
  });

  return out;
}
