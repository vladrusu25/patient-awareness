import type { Step } from '$libtypes';

async function loadJson(path: string): Promise<Step[]> {
  const mod = await import(/* @vite-ignore */ path);
  return (mod.default as Step[]) ?? [];
}

function firstQuestionKey(steps: Step[]): string | null {
  return steps.find((s) => s.type !== 'text')?.key ?? null;
}

export async function composeMultiPart(): Promise<Step[]> {
  // Load each part from JSON
  const part1 = await loadJson('$lib/data/endopain.part1.v1.json');
  const part2 = await loadJson('$lib/data/pcs.part2.v1.json');
  const part3 = await loadJson('$lib/data/pvvq.part3.v1.json');

  const p2First = firstQuestionKey(part2);
  const p3First = firstQuestionKey(part3);

  const gateP2: Step[] = [
    {
      type: 'text',
      key: 'gate_p2_msg',
      bot: [
        "Great start — you're doing really well!",
        "Would you like to continue with a short 5-question PCS screening? It's quick and helps rule out vein involvement."
      ]
    },
    {
      type: 'single',
      key: 'gate_p2',
      prompt: 'Continue to Part 2 (PCS)?',
      options: [
        { label: 'Yes, continue', value: 'yes' },
        { label: 'No, finish for now', value: 'no' }
      ],
      progress: false,
      nextIf: { yes: p2First ?? 'wrap_up', no: 'wrap_up' }
    }
  ];

  const gateP3: Step[] = [
    {
      type: 'text',
      key: 'gate_p3_msg',
      bot: [
        'Nice progress — almost there!',
        'Part 3 takes just a couple minutes and really strengthens your report.'
      ]
    },
    {
      type: 'single',
      key: 'gate_p3',
      prompt: 'Continue to Part 3 (PVVQ, 20 items)?',
      options: [
        { label: 'Yes, continue', value: 'yes' },
        { label: 'No, finish for now', value: 'no' }
      ],
      progress: false,
      nextIf: { yes: p3First ?? 'wrap_up', no: 'wrap_up' }
    }
  ];

  const wrapUp: Step = {
    type: 'text',
    key: 'wrap_up',
    bot: [
      "Thanks — you've completed everything needed for now.",
      'We’re preparing your PDF report next.'
    ]
  };

  // Part1 → GateP2 → Part2 → GateP3 → Part3 → Wrap
  return [...part1, ...gateP2, ...part2, ...gateP3, ...part3, wrapUp];
}
