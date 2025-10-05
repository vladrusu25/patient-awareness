<script lang="ts">
  import { t } from '$lib/i18n';

  type Side = 'left' | 'right';

  export let side: Side = 'left';
  export let text = '';
</script>

<div class="flex items-start gap-3" class:justify-end={side === 'right'} data-role="chat-bubble" data-side={side}>
  {#if side === 'left'}
  <!-- Doctor avatar (40x40) -->
  <div
    class="h-10 w-10 shrink-0 rounded-full ring-1 ring-black/5 overflow-hidden bg-primary/15"
    aria-hidden="true"
  >
    <img
      src="/images/assessment_page/doctor_avatar.png"
      alt={$t('chat.doctorAlt')}
      class="h-full w-full object-cover"
      width="40"
      height="40"
      loading="lazy"
      decoding="async"
    />
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
  <img
    src="/images/assessment_page/user_icon.png"  
    alt={$t('chat.userAlt')}
    class="h-10 w-10 shrink-0 rounded-full ring-1 ring-black/5 object-cover"
  />
{/if}
</div>
