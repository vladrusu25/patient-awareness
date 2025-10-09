<script lang="ts">
  import { t } from '$lib/i18n';
  import Footer from '$lib/components/Footer.svelte';

  const whatIsCauses = [
    'pcsPage.sections.whatIs.causes.pregnancy',
    'pcsPage.sections.whatIs.causes.estrogen',
    'pcsPage.sections.whatIs.causes.familyHistory'
  ] as const;

  const riskFactors = [
    'pcsPage.sections.risk.factors.pregnancies',
    'pcsPage.sections.risk.factors.venousHistory',
    'pcsPage.sections.risk.factors.hormones'
  ] as const;

  const symptomKeys = [
    'pcsPage.sections.symptoms.list.pelvicPain',
    'pcsPage.sections.symptoms.list.dyspareunia',
    'pcsPage.sections.symptoms.list.backPain',
    'pcsPage.sections.symptoms.list.giIssues',
    'pcsPage.sections.symptoms.list.bleeding',
    'pcsPage.sections.symptoms.list.fatigue',
    'pcsPage.sections.symptoms.list.heaviness'
  ] as const;

  const diagnosisFeatures = [
    'pcsPage.sections.diagnosis.features.veinSize',
    'pcsPage.sections.diagnosis.features.flow',
    'pcsPage.sections.diagnosis.features.dilation'
  ] as const;

  const treatmentBenefits = [
    'pcsPage.sections.treatment.benefits.painRelief',
    'pcsPage.sections.treatment.benefits.sexualHealth',
    'pcsPage.sections.treatment.benefits.fertility'
  ] as const;

  const scienceLinks = [
    {
      key: 'pcsPage.sections.science.links.study1',
      href: 'https://www.jvascsurg.org/article/S0741-5214(12)02294-5/fulltext'
    },
    {
      key: 'pcsPage.sections.science.links.study2',
      href: 'https://www.hindawi.com/journals/ijrmed/2014/124235/'
    }
  ] as const;
</script>

<section
  class="relative overflow-hidden py-20 lg:py-24"
  style="background: linear-gradient(90deg, #1B5E20 0%, #95C892 100%);"
>
  <div class="mx-auto max-w-[1200px] px-6">
    <div class="grid gap-12 lg:grid-cols-12 lg:items-center">
      <div class="lg:col-span-6 text-center lg:text-left text-white">
        <h1 class="font-heading text-4xl sm:text-5xl font-extrabold leading-tight">
          {$t('pcsPage.hero.title')}
        </h1>
        <p class="mt-6 text-lg sm:text-xl text-white/90">
          {$t('pcsPage.hero.headline')}
        </p>
        <p class="mt-4 text-base sm:text-lg text-white/80">
          {$t('pcsPage.hero.subheadline')}
        </p>
        <a
          class="mt-8 inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-base font-semibold text-primary shadow-lg transition hover:opacity-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          href="/assessment#chat"
        >
          {$t('pcsPage.hero.cta')}
        </a>
      </div>

      <div class="lg:col-span-6 mt-10 lg:mt-0">
        <div class="relative mx-auto max-w-lg">
          <div class="absolute inset-0 rounded-3xl bg-white/10 blur-3xl"></div>
          <div class="relative z-10 overflow-hidden rounded-3xl bg-white/10 p-8 shadow-2xl ring-1 ring-white/15 backdrop-blur">
            <img
              src="/images/endo_hero.png"
              alt={$t('pcsPage.hero.imageAlt')}
              class="w-full rounded-2xl border border-white/20 object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="what-is" class="bg-white py-16 lg:py-20">
  <div class="mx-auto max-w-[1100px] px-6">
    <h2 class="font-heading text-3xl sm:text-4xl font-bold text-neutral-900">
      {$t('pcsPage.sections.whatIs.headline')}
    </h2>
    <p class="mt-6 text-neutral-700 text-lg">
      {$t('pcsPage.sections.whatIs.intro')}
    </p>
    <p class="mt-6 text-sm font-semibold uppercase tracking-wide text-neutral-500">
      {$t('pcsPage.sections.whatIs.causesTitle')}
    </p>
    <ul class="mt-4 grid gap-4 sm:grid-cols-3">
      {#each whatIsCauses as cause}
        <li class="rounded-2xl border border-neutral-100 bg-neutral-25 p-4 text-neutral-700">
          {$t(cause)}
        </li>
      {/each}
    </ul>
  </div>
</section>

<section id="risk" class="bg-neutral-25 py-16 lg:py-20">
  <div class="mx-auto max-w-[1100px] px-6">
    <div class="rounded-3xl bg-white border border-neutral-100 px-8 py-14 sm:px-12 shadow-xl">
      <div class="max-w-3xl">
        <h2 class="font-heading text-3xl sm:text-4xl font-bold text-neutral-900">
          {$t('pcsPage.sections.risk.headline')}
        </h2>
        <p class="mt-6 text-neutral-700 text-lg">
          {$t('pcsPage.sections.risk.intro')}
        </p>
        <ul class="mt-6 space-y-3 text-neutral-700">
          {#each riskFactors as factor}
            <li class="flex items-start gap-3">
              <span class="mt-1 inline-block h-2 w-2 rounded-full bg-primary"></span>
              <span>{$t(factor)}</span>
            </li>
          {/each}
        </ul>
      </div>
    </div>
  </div>
</section>

<section id="symptoms" class="bg-white py-16 lg:py-20">
  <div class="mx-auto max-w-[1100px] px-6">
    <div class="grid gap-10 lg:grid-cols-2 lg:items-center">
      <div>
        <h2 class="font-heading text-3xl sm:text-4xl font-bold text-neutral-900">
          {$t('pcsPage.sections.symptoms.headline')}
        </h2>
        <p class="mt-6 text-neutral-700 text-lg">
          {$t('pcsPage.sections.symptoms.intro')}
        </p>
        <a
          class="mt-8 inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-base font-semibold text-white shadow-lg transition hover:bg-primary-700 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-primary-300"
          href="/assessment#chat"
        >
          {$t('pcsPage.sections.symptoms.cta')}
        </a>
      </div>
      <ul class="grid gap-4 sm:grid-cols-2">
        {#each symptomKeys as key}
          <li class="rounded-2xl border border-neutral-100 bg-neutral-25 p-4 text-neutral-700">
            {$t(key)}
          </li>
        {/each}
      </ul>
    </div>
  </div>
</section>

<section id="diagnosis" class="bg-neutral-25 py-16 lg:py-20">
  <div class="mx-auto max-w-[1100px] px-6">
    <div class="grid gap-10 lg:grid-cols-2 lg:items-center">
      <div class="rounded-3xl bg-white border border-neutral-100 p-10 shadow-lg">
        <h2 class="font-heading text-3xl sm:text-4xl font-bold text-neutral-900">
          {$t('pcsPage.sections.diagnosis.headline')}
        </h2>
        <p class="mt-6 text-neutral-700 text-lg">
          {$t('pcsPage.sections.diagnosis.intro')}
        </p>
        <p class="mt-6 text-sm font-semibold uppercase tracking-wide text-neutral-500">
          {$t('pcsPage.sections.diagnosis.featuresTitle')}
        </p>
        <ul class="mt-4 space-y-3 text-neutral-700">
          {#each diagnosisFeatures as feature}
            <li class="flex items-start gap-3">
              <span class="mt-1 inline-block h-2 w-2 rounded-full bg-primary"></span>
              <span>{$t(feature)}</span>
            </li>
          {/each}
        </ul>
        <a
          class="mt-8 inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-base font-semibold text-white shadow-lg transition hover:bg-primary-700 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-primary-300"
          href="/pcs/diagnosis"
        >
          {$t('pcsPage.sections.diagnosis.cta')}
        </a>
      </div>
      <div class="rounded-3xl border border-primary/20 bg-primary/5 p-10 text-primary-900 shadow-inner">
        <h3 class="font-heading text-2xl font-semibold text-primary-900">
          {$t('pcsPage.sections.treatment.headline')}
        </h3>
        <p class="mt-4 text-base text-primary-900/80">
          {$t('pcsPage.sections.treatment.intro')}
        </p>
        <p class="mt-6 text-sm font-semibold uppercase tracking-wide text-primary-800/80">
          {$t('pcsPage.sections.treatment.benefitsTitle')}
        </p>
        <ul class="mt-4 space-y-3 text-primary-900">
          {#each treatmentBenefits as benefit}
            <li class="flex items-start gap-3">
              <span class="mt-1 inline-block h-2 w-2 rounded-full bg-primary"></span>
              <span>{$t(benefit)}</span>
            </li>
          {/each}
        </ul>
        <p class="mt-6 text-primary-900/80">
          {$t('pcsPage.sections.treatment.otherOptions')}
        </p>
      </div>
    </div>
  </div>
</section>

<section class="bg-white py-16 lg:py-20">
  <div class="mx-auto max-w-[900px] px-6">
    <div class="rounded-3xl bg-neutral-25 border border-neutral-100 px-8 py-12 sm:px-12 shadow-lg">
      <h2 class="font-heading text-3xl sm:text-4xl font-bold text-neutral-900">
        {$t('pcsPage.sections.quality.headline')}
      </h2>
      <p class="mt-6 text-neutral-700 text-lg">
        {$t('pcsPage.sections.quality.body')}
      </p>
    </div>
  </div>
</section>

<section class="bg-neutral-25 py-16 lg:py-20">
  <div class="mx-auto max-w-[1100px] px-6">
    <div class="rounded-3xl bg-white border border-neutral-100 px-8 py-14 sm:px-12 shadow-xl">
      <div class="max-w-3xl">
        <h2 class="font-heading text-3xl sm:text-4xl font-bold text-neutral-900">
          {$t('pcsPage.sections.science.headline')}
        </h2>
        <p class="mt-6 text-neutral-700 text-lg">
          {$t('pcsPage.sections.science.intro')}
        </p>
        <ul class="mt-6 space-y-3 text-primary font-semibold">
          {#each scienceLinks as link}
            <li>
              <a class="hover:underline" href={link.href} target="_blank" rel="noopener noreferrer">
                {$t(link.key)}
              </a>
            </li>
          {/each}
        </ul>
      </div>
    </div>
  </div>
</section>

<section class="bg-white py-16 lg:py-20">
  <div class="mx-auto max-w-[900px] px-6">
    <div class="rounded-3xl bg-neutral-25 border border-neutral-100 px-6 py-14 sm:px-10 text-center shadow-xl">
      <h2 class="font-heading text-3xl sm:text-4xl font-bold text-neutral-900">
        {$t('pcsPage.sections.voice.headline')}
      </h2>
      <p class="mt-6 text-neutral-700 text-lg">
        {$t('pcsPage.sections.voice.body')}
      </p>
      <a
        class="mt-8 inline-flex w-full sm:w-auto items-center justify-center rounded-xl bg-primary px-6 py-3 text-base font-semibold text-white shadow-lg transition hover:bg-primary-700 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-primary-300"
        href="/assessment#chat"
      >
        {$t('pcsPage.sections.voice.cta')}
      </a>
    </div>
  </div>
</section>

<Footer />
