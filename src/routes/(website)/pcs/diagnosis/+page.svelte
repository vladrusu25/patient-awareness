<script lang="ts">
  import { t } from '$lib/i18n';
  import Footer from '$lib/components/Footer.svelte';

  const suspectCriteria = [
    'pcsDiagnosisPage.sections.suspect.criteria.painProgression',
    'pcsDiagnosisPage.sections.suspect.criteria.painCharacter',
    'pcsDiagnosisPage.sections.suspect.criteria.postCoital',
    'pcsDiagnosisPage.sections.suspect.criteria.unilateralPain',
    'pcsDiagnosisPage.sections.suspect.criteria.palpation',
    'pcsDiagnosisPage.sections.suspect.criteria.varices',
    'pcsDiagnosisPage.sections.suspect.criteria.neurological',
    'pcsDiagnosisPage.sections.suspect.criteria.systemic',
    'pcsDiagnosisPage.sections.suspect.criteria.gi',
    'pcsDiagnosisPage.sections.suspect.criteria.gynecologic'
  ] as const;

  const ultrasoundBullets = [
    'pcsDiagnosisPage.sections.ultrasound.bullets.combo',
    'pcsDiagnosisPage.sections.ultrasound.bullets.positioning',
    'pcsDiagnosisPage.sections.ultrasound.bullets.mapping',
    'pcsDiagnosisPage.sections.ultrasound.bullets.predictiveValue'
  ] as const;

  const ultrasoundCriteria = [
    'pcsDiagnosisPage.sections.criteria.list.veinSize',
    'pcsDiagnosisPage.sections.criteria.list.flow',
    'pcsDiagnosisPage.sections.criteria.list.arcuate',
    'pcsDiagnosisPage.sections.criteria.list.ovarianChanges'
  ] as const;

  const workflowSteps = [
    'pcsDiagnosisPage.sections.workflow.steps.venography',
    'pcsDiagnosisPage.sections.workflow.steps.crossSectional',
    'pcsDiagnosisPage.sections.workflow.steps.predictiveModels'
  ] as const;

  const evidenceStudies = [
    'pcsDiagnosisPage.sections.evidence.studies.uip',
    'pcsDiagnosisPage.sections.evidence.studies.bookwalter',
    'pcsDiagnosisPage.sections.evidence.studies.kashef',
    'pcsDiagnosisPage.sections.evidence.studies.holdstock'
  ] as const;
</script>

<section
  class="relative overflow-hidden py-20 lg:py-24"
  style="background: linear-gradient(90deg, #1B5E20 0%, #95C892 100%);"
>
  <div class="mx-auto max-w-[1100px] px-6 text-white">
    <div class="max-w-3xl">
      <p class="text-sm font-semibold uppercase tracking-wide text-white/80">
        {$t('pcsDiagnosisPage.hero.subtitle')}
      </p>
      <h1 class="mt-4 font-heading text-4xl sm:text-5xl font-extrabold leading-tight">
        {$t('pcsDiagnosisPage.hero.title')}
      </h1>
      <p class="mt-6 text-lg sm:text-xl text-white/80">
        {$t('pcsDiagnosisPage.hero.intro')}
      </p>
      <a
        class="mt-8 inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-base font-semibold text-primary shadow-lg transition hover:opacity-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        href="/pcs"
      >
        {$t('pcsDiagnosisPage.hero.backCta')}
      </a>
    </div>
  </div>
</section>

<section class="bg-white py-16 lg:py-20">
  <div class="mx-auto max-w-[1100px] px-6">
    <h2 class="font-heading text-3xl sm:text-4xl font-bold text-neutral-900">
      {$t('pcsDiagnosisPage.sections.suspect.headline')}
    </h2>
    <p class="mt-6 text-neutral-700 text-lg">
      {$t('pcsDiagnosisPage.sections.suspect.intro')}
    </p>
    <p class="mt-6 text-sm font-semibold uppercase tracking-wide text-neutral-500">
      {$t('pcsDiagnosisPage.sections.suspect.criteriaTitle')}
    </p>
    <ul class="mt-4 grid gap-4 sm:grid-cols-2">
      {#each suspectCriteria as criterion}
        <li class="rounded-2xl border border-neutral-100 bg-neutral-25 p-4 text-neutral-700">
          {$t(criterion)}
        </li>
      {/each}
    </ul>
    <div class="mt-8 rounded-2xl border border-primary/20 bg-primary/5 p-6 text-primary-900">
      {$t('pcsDiagnosisPage.sections.suspect.note')}
    </div>
  </div>
</section>

<section class="bg-neutral-25 py-16 lg:py-20">
  <div class="mx-auto max-w-[1100px] px-6">
    <div class="grid gap-10 lg:grid-cols-2 lg:items-start">
      <div class="rounded-3xl bg-white border border-neutral-100 p-8 shadow-lg">
        <h2 class="font-heading text-3xl sm:text-4xl font-bold text-neutral-900">
          {$t('pcsDiagnosisPage.sections.ultrasound.headline')}
        </h2>
        <p class="mt-6 text-neutral-700 text-lg">
          {$t('pcsDiagnosisPage.sections.ultrasound.intro')}
        </p>
      </div>
      <div class="rounded-3xl bg-white border border-neutral-100 p-8 shadow-lg">
        <p class="text-sm font-semibold uppercase tracking-wide text-neutral-500">
          {$t('pcsDiagnosisPage.sections.ultrasound.bulletsTitle')}
        </p>
        <ul class="mt-4 space-y-4 text-neutral-700">
          {#each ultrasoundBullets as bullet}
            <li class="flex gap-3">
              <span class="mt-1 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-primary"></span>
              <span>{$t(bullet)}</span>
            </li>
          {/each}
        </ul>
        <p class="mt-6 text-neutral-600">
          {$t('pcsDiagnosisPage.sections.ultrasound.reference')}
        </p>
      </div>
    </div>
  </div>
</section>

<section class="bg-white py-16 lg:py-20">
  <div class="mx-auto max-w-[1100px] px-6">
    <div class="rounded-3xl border border-neutral-100 bg-neutral-25 p-10 shadow-lg">
      <h2 class="font-heading text-3xl sm:text-4xl font-bold text-neutral-900">
        {$t('pcsDiagnosisPage.sections.criteria.headline')}
      </h2>
      <p class="mt-6 text-neutral-700 text-lg">
        {$t('pcsDiagnosisPage.sections.criteria.intro')}
      </p>
      <ul class="mt-6 space-y-3 text-neutral-700">
        {#each ultrasoundCriteria as item}
          <li class="flex gap-3">
            <span class="mt-1 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-primary"></span>
            <span>{$t(item)}</span>
          </li>
        {/each}
      </ul>
      <p class="mt-6 text-sm font-semibold uppercase tracking-wide text-neutral-500">
        {$t('pcsDiagnosisPage.sections.criteria.citations')}
      </p>
    </div>
  </div>
</section>

<section class="bg-neutral-25 py-16 lg:py-20">
  <div class="mx-auto max-w-[1100px] px-6">
    <div class="grid gap-8 lg:grid-cols-3">
      {#each workflowSteps as step}
        <div class="rounded-3xl border border-neutral-100 bg-white p-8 shadow-lg">
          <p class="text-neutral-700">
            {$t(step)}
          </p>
        </div>
      {/each}
    </div>
  </div>
</section>

<section class="bg-white py-16 lg:py-20">
  <div class="mx-auto max-w-[1100px] px-6">
    <div class="grid gap-10 lg:grid-cols-2 lg:items-start">
      <div>
        <h2 class="font-heading text-3xl sm:text-4xl font-bold text-neutral-900">
          {$t('pcsDiagnosisPage.sections.evidence.headline')}
        </h2>
        <p class="mt-6 text-neutral-700 text-lg">
          {$t('pcsDiagnosisPage.sections.evidence.intro')}
        </p>
        <ul class="mt-6 space-y-4 text-neutral-700">
          {#each evidenceStudies as item}
            <li class="flex gap-3">
              <span class="mt-1 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-primary"></span>
              <span>{$t(item)}</span>
            </li>
          {/each}
        </ul>
      </div>
      <div class="rounded-3xl border border-primary/20 bg-primary/5 p-8 text-primary-900 shadow-inner">
        <p class="text-lg">
          {$t('pcsDiagnosisPage.sections.evidence.closing')}
        </p>
      </div>
    </div>
  </div>
</section>

<Footer />
