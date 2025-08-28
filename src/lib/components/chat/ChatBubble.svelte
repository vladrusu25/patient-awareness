<script lang="ts">
  type Side = 'left' | 'right';

  export let side: Side = 'left';
  export let text = '';
</script>

<div class="flex items-start gap-3" class:justify-end={side === 'right'}>
  {#if side === 'left'}
    <!-- Doctor avatar -->
    <div class="h-10 w-10 shrink-0 rounded-full bg-primary/15 grid place-items-center ring-1 ring-black/5">
      <span class="text-lg">🩺</span>
    </div>
  {/if}

  <!-- Bubble -->
  <div
    class="max-w-[85%] sm:max-w-[75%] px-4 py-3 shadow-sm leading-relaxed
           rounded-2xl text-base"
    class:bg-gray-100={side === 'left'}
    class:text-neutral-700={side === 'left'}
    class:rounded-tl-sm={side === 'left'}
    class:bg-primary={side === 'right'}
    class:text-white={side === 'right'}
    class:rounded-tr-sm={side === 'right'}
  >
    {text}
  </div>

  {#if side === 'right'}
    <!-- User avatar -->
    <div class="h-10 w-10 shrink-0 rounded-full bg-primary/15 grid place-items-center ring-1 ring-black/5">
      <span class="text-lg">🙂</span>
    </div>
  {/if}
</div>
