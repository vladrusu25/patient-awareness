<script lang="ts">
  import { t } from '$lib/i18n';
</script>

<section class="bg-neutral-25 py-16">
  <div class="mx-auto max-w-[1280px] px-6">
    <!-- Section Heading -->
    <h2 class="text-center font-heading text-3xl sm:text-4xl font-bold text-neutral-900 mb-12">
      {$t('knowledge.heading')}
    </h2>

    <!-- Icon Grid Section -->
    <div class="grid grid-cols-1 gap-12 md:grid-cols-3">
      
      <!-- First Stat: 1 in 3 -->
      <div class="bg-white rounded-lg shadow-lg p-8 text-center">
        <img src="/images/homepage/chart.png" alt={$t('knowledge.stat1.alt')} class="mx-auto h-16 w-16 mb-6" />
        <h3 class="text-green-900 text-3xl font-bold">{$t('knowledge.stat1.title')}</h3>
        <p class="text-neutral-600 text-base mt-2">
          {$t('knowledge.stat1.copy')}
        </p>
      </div>

      <!-- Second Stat: 50% -->
      <div class="bg-white rounded-lg shadow-lg p-8 text-center">
        <img src="/images/homepage/group.png" alt={$t('knowledge.stat2.alt')} class="mx-auto h-16 w-16 mb-6" />
        <h3 class="text-green-900 text-3xl font-bold">{$t('knowledge.stat2.title')}</h3>
        <p class="text-neutral-600 text-base mt-2">
          {$t('knowledge.stat2.copy')}
        </p>
      </div>

      <!-- Third Stat: 85% -->
      <div class="bg-white rounded-lg shadow-lg p-8 text-center">
        <img src="/images/homepage/heart.png" alt={$t('knowledge.stat3.alt')} class="mx-auto h-16 w-16 mb-6" />
        <h3 class="text-green-900 text-3xl font-bold">{$t('knowledge.stat3.title')}</h3>
        <p class="text-neutral-600 text-base mt-2">
          {$t('knowledge.stat3.copy')}
        </p>
      </div>

    </div>
  </div>
</section>
