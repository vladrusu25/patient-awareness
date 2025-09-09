<script lang="ts">
  export let variant: 'primary' | 'ghost' | 'soft' = 'primary';
  export let size: 'sm' | 'md' = 'md';
  export let type: 'button' | 'submit' = 'button';
  export let disabled = false;

  const base =
    'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-mint-400';

  $: padd = size === 'sm' ? 'px-3 py-1.5 text-sm' : 'px-4 py-2';
  $: theme =
    variant === 'primary'
      ? 'bg-primary text-white hover:bg-primary-700'
      : variant === 'soft'
      ? 'bg-neutral-50 text-neutral-800 hover:bg-neutral-100 border border-neutral-200'
      : 'text-neutral-700 hover:bg-neutral-50';

  $: cls = `${base} ${padd} ${theme}`;
</script>

<button {type} class={cls} {disabled}>
  <slot />
</button>
