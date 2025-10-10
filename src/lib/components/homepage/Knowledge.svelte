<script lang="ts">
  import { t } from '$lib/i18n';

  const cards = [
    {
      icon: '/images/homepage/chart.png',
      altKey: 'knowledge.cards.card1.iconAlt',
      titleKey: 'knowledge.cards.card1.title',
      bulletKeys: ['knowledge.cards.card1.bullet1', 'knowledge.cards.card1.bullet2']
    },
    {
      icon: '/images/homepage/group.png',
      altKey: 'knowledge.cards.card2.iconAlt',
      titleKey: 'knowledge.cards.card2.title',
      introKey: 'knowledge.cards.card2.intro',
      bulletKeys: [
        'knowledge.cards.card2.bullet1',
        'knowledge.cards.card2.bullet2',
        'knowledge.cards.card2.bullet3'
      ],
      noteKey: 'knowledge.cards.card2.note'
    },
    {
      icon: '/images/homepage/heart.png',
      altKey: 'knowledge.cards.card3.iconAlt',
      titleKey: 'knowledge.cards.card3.title',
      descriptionKey: 'knowledge.cards.card3.description'
    }
  ];
</script>

<section class="bg-neutral-25 py-16">
  <div class="mx-auto max-w-[1280px] px-6">
    <h2 class="mb-12 text-center font-heading text-3xl font-bold text-neutral-900 sm:text-4xl">
      {$t('knowledge.heading')}
    </h2>

    <div class="grid grid-cols-1 gap-12 md:grid-cols-3">
      {#each cards as card (card.titleKey)}
        <div class="flex h-full flex-col rounded-lg bg-white p-8 shadow-lg">
          <img
            src={card.icon}
            alt={$t(card.altKey)}
            class="mx-auto mb-6 h-16 w-16"
          />
          <h3 class="text-center text-2xl font-bold text-green-900 md:text-left">
            {$t(card.titleKey)}
          </h3>

          <div class="mt-4 flex-1 space-y-4 text-neutral-600">
            {#if card.introKey}
              <p class="text-base">
                {$t(card.introKey)}
              </p>
            {/if}

            {#if card.bulletKeys}
              <ul class="list-inside list-disc space-y-2 text-base">
                {#each card.bulletKeys as bulletKey}
                  <li>{@html $t(bulletKey)}</li>
                {/each}
              </ul>
            {/if}

            {#if card.descriptionKey}
              <p class="text-base">
                {@html $t(card.descriptionKey)}
              </p>
            {/if}

            {#if card.noteKey}
              <p class="text-base">
                {@html $t(card.noteKey)}
              </p>
            {/if}
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>
