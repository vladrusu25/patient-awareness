<script lang="ts">
  export let value: number | string = 0;
  export let label = '';
  export let emphasis = false;
</script>

<div class="rounded-xl bg-white shadow-sm ring-1 ring-black/5 p-4">
  <div class="text-2xl font-semibold text-neutral-900">{value}</div>
  <div class="mt-1 text-sm" class:text-neutral-700={!emphasis} class:text-neutral-500={emphasis === false}>{label}</div>
</div>
