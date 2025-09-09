<script lang="ts">
  export let color: 'green' | 'yellow' | 'red' | 'gray' = 'gray';
  const map = {
    green: 'bg-green-50 text-green-700',
    yellow: 'bg-amber-50 text-amber-700',
    red: 'bg-red-50 text-red-700',
    gray: 'bg-neutral-50 text-neutral-600',
  };
</script>

<span class={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${map[color]}`}>
  <slot />
</span>
