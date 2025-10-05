<script lang="ts">
  import { t } from '$lib/i18n';

  type Item = {
    icon: 'clock' | 'shield' | 'steth';
    title?: string;
    copy?: string;
    titleKey?: string;
    copyKey?: string;
    altKey?: string;
  };

  const defaultItems: Item[] = [
    {
      titleKey: 'valueProps.quickTitle',
      copyKey: 'valueProps.quickCopy',
      icon: 'clock',
      altKey: 'valueProps.quickAlt'
    },
    {
      titleKey: 'valueProps.privateTitle',
      copyKey: 'valueProps.privateCopy',
      icon: 'shield',
      altKey: 'valueProps.privateAlt'
    },
    {
      titleKey: 'valueProps.expertTitle',
      copyKey: 'valueProps.expertCopy',
      icon: 'steth',
      altKey: 'valueProps.expertAlt'
    }
  ];

  export let items: Item[] = defaultItems;

  const ICON_SRC: Record<Item['icon'], string> = {
    clock: '/images/clock.png',
    shield: '/images/shield.png',
    steth: '/images/medical_icon.png'
  };

  const ALT_FALLBACK: Record<Item['icon'], string> = {
    clock: 'Clock icon',
    shield: 'Shield icon',
    steth: 'Medical icon'
  };
</script>

<section class="py-14">
  <div class="mx-auto max-w-[1200px] px-6">
    <div class="grid grid-cols-1 gap-12 md:grid-cols-3">
      {#each items as item}
        <article class="text-center">
          <!-- Icon -->
          <div class="mx-auto mb-5 h-20 w-20 md:h-24 md:w-24">
            <img
              src={ICON_SRC[item.icon]}
              alt={item.altKey ? $t(item.altKey) : ALT_FALLBACK[item.icon]}
              class="h-full w-full object-contain select-none pointer-events-none"
              loading="lazy"
              decoding="async"
            />
          </div>

          <!-- Title -->
          <h3 class="font-heading text-xl font-semibold text-neutral-900">
            {item.title ?? (item.titleKey ? $t(item.titleKey) : '')}
          </h3>

          <!-- Copy -->
          <p class="mt-3 text-[17px] leading-7 text-neutral-600">
            {item.copy ?? (item.copyKey ? $t(item.copyKey) : '')}
          </p>
        </article>
      {/each}
    </div>
  </div>
</section>
