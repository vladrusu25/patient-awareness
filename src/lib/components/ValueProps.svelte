<script lang="ts">
  type Item = { title: string; copy: string; icon: 'clock' | 'shield' | 'steth' };

  export let items: Item[] = [
    {
      title: 'Quick & Easy',
      copy: 'Complete your assessment in just 5-10 minutes',
      icon: 'clock'
    },
    {
      title: 'Private & Secure',
      copy: 'Your data is encrypted and completely confidential',
      icon: 'shield'
    },
    {
      title: 'Expert Insights',
      copy: 'Recommendations backed by medical professionals',
      icon: 'steth'
    }
  ];

  // Map icon keys to static PNGs
  const ICON_SRC: Record<Item['icon'], string> = {
    clock: '/images/clock.png',
    shield: '/images/shield.png',
    steth: '/images/medical_icon.png'
  };

  const ALT: Record<Item['icon'], string> = {
    clock: 'Clock icon - Quick & Easy',
    shield: 'Shield icon - Private & Secure',
    steth: 'Medical icon - Expert Insights'
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
              alt={ALT[item.icon]}
              class="h-full w-full object-contain select-none pointer-events-none"
              loading="lazy"
              decoding="async"
            />
          </div>

          <!-- Title -->
          <h3 class="font-heading text-xl font-semibold text-neutral-900">
            {item.title}
          </h3>

          <!-- Copy -->
          <p class="mt-3 text-[17px] leading-7 text-neutral-600">
            {item.copy}
          </p>
        </article>
      {/each}
    </div>
  </div>
</section>
