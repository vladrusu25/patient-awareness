<script lang="ts">
  // Local type
  type Step =
    | { key: string; type: 'message'; text: string }
    | { key: string; type: 'number'; prompt: string; min?: number; max?: number }
    | { key: string; type: 'checkbox'; prompt: string; options: { value: string; label: string }[] }
    | { key: string; type: 'single'; prompt: string; options: { value: string; label: string }[] };

  export let token: string;
  export let steps: { steps: Step[] };
  export let previous: { step_key: string; value_json: any }[] = [];

  // Resume from first unanswered
  const answered = new Map(previous.map((a) => [a.step_key, a.value_json]));
  let index = steps.steps.findIndex((s) => !answered.has(s.key));
  if (index < 0) index = 0;

  // Current step (reactive)
  let current: Step | undefined;
  $: current = steps.steps[index];

  // Buffer for the current answer
  let localValue: any = null;

  async function save(step: Step, value: any) {
    await fetch(`/api/session/${token}/answer`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ step_key: step.key, value })
    });
    answered.set(step.key, value);
    index = Math.min(index + 1, steps.steps.length - 1);
    localValue = null;
  }

  function toggleMulti(value: string, checked: boolean) {
    const set = new Set<string>(Array.isArray(localValue) ? localValue : []);
    checked ? set.add(value) : set.delete(value);
    localValue = Array.from(set);
  }
</script>

{#if !current}
  <p>No steps configured.</p>

{:else if current.type === 'message'}
  <div class="space-y-4">
    <p>{current.text}</p>
    <button
      class="rounded-lg bg-neutral-900 text-white px-4 py-2"
      on:click={() => (index = Math.min(index + 1, steps.steps.length - 1))}
    >
      Continue
    </button>
  </div>

{:else if current.type === 'number'}
  <div class="space-y-3">
    <label class="block text-sm text-neutral-700" for={"num-" + current.key}>
      {current.prompt}
    </label>
    <input
      id={"num-" + current.key}
      class="block w-full rounded-lg border p-2"
      type="number"
      bind:value={localValue}
      min={current.min}
      max={current.max}
    />
    <button
      class="rounded-lg bg-neutral-900 text-white px-4 py-2"
      on:click={() => save(current, Number(localValue))}
      disabled={localValue === null || localValue === ''}
    >
      Next
    </button>
  </div>

{:else if current.type === 'checkbox'}
  <div class="space-y-3">
    <p class="text-sm text-neutral-700">{current.prompt}</p>
    {#each current.options as opt, i}
      <div class="flex items-center gap-2">
        <input
          id={`cb-${current.key}-${i}`}
          type="checkbox"
          value={opt.value}
          on:change={(e) => toggleMulti(opt.value, (e.target as HTMLInputElement).checked)}
        />
        <label for={`cb-${current.key}-${i}`}>{opt.label}</label>
      </div>
    {/each}
    <button
      class="rounded-lg bg-neutral-900 text-white px-4 py-2"
      on:click={() => save(current, Array.isArray(localValue) ? localValue : [])}
    >
      Next
    </button>
  </div>

{:else if current.type === 'single'}
  <div class="space-y-3">
    <p class="text-sm text-neutral-700">{current.prompt}</p>
    {#each current.options as opt, i}
      <div class="flex items-center gap-2">
        <input
          id={`r-${current.key}-${i}`}
          name={`single-${current.key}`}
          type="radio"
          value={opt.value}
          on:change={() => (localValue = opt.value)}
        />
        <label for={`r-${current.key}-${i}`}>{opt.label}</label>
      </div>
    {/each}
    <button
      class="rounded-lg bg-neutral-900 text-white px-4 py-2"
      on:click={() => save(current, localValue)}
      disabled={!localValue}
    >
      Next
    </button>
  </div>
{/if}
