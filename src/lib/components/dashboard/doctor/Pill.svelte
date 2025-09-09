<script lang="ts">
  export let tone: 'neutral'|'green'|'yellow'|'red' = 'neutral';
</script>

<span
  class="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium"
  class:bg-neutral-100={tone==='neutral'}
  class:text-neutral-700={tone==='neutral'}
  class:bg-green-100={tone==='green'}
  class:text-green-800={tone==='green'}
  class:bg-yellow-100={tone==='yellow'}
  class:text-yellow-800={tone==='yellow'}
  class:bg-red-100={tone==='red'}
  class:text-red-800={tone==='red'}
>
  <slot />
</span>
