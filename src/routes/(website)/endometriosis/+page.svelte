<script lang="ts">
  import { t } from '$lib/i18n';
  import Footer from '$lib/components/Footer.svelte';
</script>

<section
  class="relative overflow-hidden py-20 lg:py-24"
  style="background: linear-gradient(90deg, #1B5E20 0%, #95C892 100%);"
>
  <div class="mx-auto max-w-[1200px] px-6">
    <div class="grid gap-12 lg:grid-cols-12 lg:items-center">
      <div class="lg:col-span-6 text-center lg:text-left text-white">
        <h1 class="font-heading text-4xl sm:text-5xl font-extrabold leading-tight">
          {$t('endometriosisPage.hero.title')}
        </h1>
        <p class="mt-6 text-lg sm:text-xl text-white/90">
          {$t('endometriosisPage.hero.headline')}
        </p>
        <p class="mt-4 text-base sm:text-lg text-white/80">
          {$t('endometriosisPage.hero.description')}
        </p>
        <a
          class="mt-8 inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-base font-semibold text-primary shadow-lg transition hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          href="/assessment#chat"
        >
          {$t('endometriosisPage.hero.primaryCta')}
        </a>
      </div>

      <div class="lg:col-span-6 mt-10 lg:mt-0">
        <div class="relative mx-auto max-w-lg">
          <div class="absolute inset-0 rounded-3xl bg-white/10 blur-3xl"></div>
          <img
            src="/images/endo_hero.png"
            alt="Illustration of interconnected pelvic health"
            class="relative z-10 w-full rounded-3xl shadow-2xl ring-1 ring-white/15"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </div>
  </div>
</section>

<section class="bg-white py-16 lg:py-20">
  <div class="mx-auto max-w-[1100px] px-6">
    <h2 class="font-heading text-3xl sm:text-4xl font-bold text-neutral-900">
      {$t('endometriosisPage.sections.whatIs.headline')}
    </h2>
    <p class="mt-6 text-neutral-700 text-lg">
      {$t('endometriosisPage.sections.whatIs.body')}
    </p>
    <p class="mt-6 text-sm font-semibold uppercase tracking-wide text-neutral-500">
      {$t('endometriosisPage.sections.whatIs.symptomsTitle')}
    </p>
    <ul class="mt-4 grid gap-4 sm:grid-cols-3">
      <li class="rounded-2xl border border-neutral-100 bg-neutral-25 p-4 text-neutral-700">
        {$t('endometriosisPage.sections.whatIs.symptoms.pelvicPain')}
      </li>
      <li class="rounded-2xl border border-neutral-100 bg-neutral-25 p-4 text-neutral-700">
        {$t('endometriosisPage.sections.whatIs.symptoms.periodPain')}
      </li>
      <li class="rounded-2xl border border-neutral-100 bg-neutral-25 p-4 text-neutral-700">
        {$t('endometriosisPage.sections.whatIs.symptoms.discomfort')}
      </li>
    </ul>
  </div>
</section>

<section class="bg-neutral-25 py-16 lg:py-20">
  <div class="mx-auto max-w-[1100px] px-6">
    <div class="rounded-3xl bg-white border border-neutral-100 px-8 py-16 sm:px-12 shadow-xl">
      <div class="max-w-3xl">
        <h2 class="font-heading text-3xl sm:text-4xl font-bold text-neutral-900">
          {$t('endometriosisPage.sections.overlap.headline')}
        </h2>
        <p class="mt-6 text-neutral-700 text-lg">
          {$t('endometriosisPage.sections.overlap.body')}
        </p>
        <ul class="mt-6 space-y-3 text-neutral-700">
          <li class="flex items-start gap-3">
            <span class="mt-1 inline-block h-2 w-2 rounded-full bg-primary"></span>
            <span>{$t('endometriosisPage.sections.overlap.stats.first')}</span>
          </li>
          <li class="flex items-start gap-3">
            <span class="mt-1 inline-block h-2 w-2 rounded-full bg-primary"></span>
            <span>{$t('endometriosisPage.sections.overlap.stats.second')}</span>
          </li>
        </ul>
        <a
          class="mt-8 inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-base font-semibold text-white shadow-lg transition hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-300"
          href="/pcs"
        >
          {$t('endometriosisPage.sections.overlap.cta')}
        </a>
      </div>
    </div>
  </div>
</section>

<section class="bg-white py-16 lg:py-20">
  <div class="mx-auto max-w-[1100px] px-6">
    <div class="grid gap-10 lg:grid-cols-2 lg:items-center">
      <div>
        <h2 class="font-heading text-3xl sm:text-4xl font-bold text-neutral-900">
          {$t('endometriosisPage.sections.help.headline')}
        </h2>
        <p class="mt-6 text-neutral-700 text-lg">
          {$t('endometriosisPage.sections.help.body')}
        </p>
        <p class="mt-4 text-neutral-700">
          {$t('endometriosisPage.sections.help.body2')}
        </p>
        <a
          class="mt-8 inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-base font-semibold text-white shadow-lg transition hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-300"
          href="/assessment#chat"
        >
          {$t('endometriosisPage.sections.help.cta')}
        </a>
      </div>

      <div class="rounded-3xl border border-neutral-100 bg-neutral-25 p-8 shadow-lg">
        <h3 class="font-heading text-2xl font-semibold text-neutral-900">
          {$t('endometriosisPage.sections.science.headline')}
        </h3>
        <p class="mt-4 text-neutral-700">
          {$t('endometriosisPage.sections.science.intro')}
        </p>
        <ul class="mt-6 space-y-3 text-primary font-semibold">
          <li>
            <a class="hover:underline" href="https://journals.sagepub.com/doi/pdf/10.1177/17455057241248017" target="_blank" rel="noopener">
              {$t('endometriosisPage.sections.science.links.study1')}
            </a>
          </li>
          <li>
            <a class="hover:underline" href="https://www.intechopen.com/online-first/1209611" target="_blank" rel="noopener">
              {$t('endometriosisPage.sections.science.links.study2')}
            </a>
          </li>
          <li>
            <a class="hover:underline" href="https://www.cvmus.com/blog/endometriosis-vs-pelvic-congestion-syndrome-0" target="_blank" rel="noopener">
              {$t('endometriosisPage.sections.science.links.study3')}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</section>

<section class="bg-neutral-25 py-16 lg:py-20">
  <div class="mx-auto max-w-[900px] px-6">
    <div class="rounded-3xl bg-white shadow-xl border border-neutral-100 px-6 py-14 sm:px-10 text-center">
      <h2 class="font-heading text-3xl sm:text-4xl font-bold text-neutral-900">
        {$t('endometriosisPage.sections.voice.headline')}
      </h2>
      <p class="mt-6 text-neutral-700 text-lg">
        {$t('endometriosisPage.sections.voice.body')}
      </p>
      <p class="mt-4 text-neutral-600">
        {$t('endometriosisPage.sections.voice.body2')}
      </p>
      <a
        class="mt-8 inline-flex w-full sm:w-auto items-center justify-center rounded-xl bg-primary px-6 py-3 text-base font-semibold text-white shadow-lg transition hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-300"
        href="/assessment#chat"
      >
        {$t('endometriosisPage.sections.voice.cta')}
      </a>
    </div>
  </div>
</section>

<Footer />
