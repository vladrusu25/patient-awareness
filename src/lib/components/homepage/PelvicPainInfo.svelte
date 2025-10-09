<script lang="ts">
  import { t } from '$lib/i18n';
</script>

<section class="bg-white py-16 md:py-20">
  <div class="mx-auto max-w-[1200px] px-6">
    <div class="mx-auto max-w-3xl text-center">
      <h2 class="font-heading text-3xl sm:text-4xl font-bold text-neutral-900">
        {$t('pelvicPainInfo.heading')}
      </h2>
      <p class="mt-6 text-lg text-neutral-700">
        {$t('pelvicPainInfo.introPrimary')}
      </p>
      <p class="mt-4 text-neutral-600">
        {$t('pelvicPainInfo.introSecondary')}
      </p>
    </div>

    <div class="mx-auto mt-8 max-w-3xl">
      <ul class="mt-6 list-disc space-y-3 pl-6 text-left text-neutral-700">
        <li>{$t('pelvicPainInfo.conditions.endometriosis')}</li>
        <li>{$t('pelvicPainInfo.conditions.adenomyosis')}</li>
        <li>{$t('pelvicPainInfo.conditions.fibroids')}</li>
        <li>{$t('pelvicPainInfo.conditions.adhesions')}</li>
        <li>{$t('pelvicPainInfo.conditions.pid')}</li>
      </ul>
      <p class="mt-6 text-neutral-600">
        {$t('pelvicPainInfo.outlook')}
      </p>

      <div class="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
        <a
          class="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
          href='/endometriosis'
        >
          {$t('pelvicPainInfo.learnMore.endometriosis')}
          <span aria-hidden="true">→</span>
        </a>
        <a
          class="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
          href='/pcs'
        >
          {$t('pelvicPainInfo.learnMore.pcs')}
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>

    <div class="mt-12 grid gap-6 lg:grid-cols-2">
      <div class="rounded-2xl border border-neutral-100 bg-neutral-25 p-8 md:p-10">
        <h3 class="font-heading text-2xl font-semibold text-neutral-900">
          {$t('pelvicPainInfo.helpHeading')}
        </h3>
        <p class="mt-4 text-neutral-700">
          {$t('pelvicPainInfo.helpBody')}
        </p>
      </div>
      <div class="rounded-2xl border border-neutral-100 bg-white p-8 md:p-10 shadow-lg">
        <h3 class="font-heading text-2xl font-semibold text-neutral-900">
          {$t('pelvicPainInfo.ctaHeading')}
        </h3>
        <p class="mt-4 text-neutral-700">
          {$t('pelvicPainInfo.ctaBody')}
        </p>
        <a
          class="mt-6 inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-300"
          href="/assessment#chat"
        >
          {$t('pelvicPainInfo.ctaButton')}
        </a>
      </div>
    </div>
  </div>
</section>

