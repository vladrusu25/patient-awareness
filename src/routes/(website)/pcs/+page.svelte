<script lang="ts">
  import { t } from '$lib/i18n';
  import Footer from '$lib/components/Footer.svelte';
</script>

<section
  class="relative overflow-hidden py-20 lg:py-24"
  style="background: linear-gradient(90deg, #1B5E20 0%, #95C892 100%);"
>
  <div class="mx-auto max-w-[1100px] px-6">
    <div class="grid gap-10 lg:grid-cols-2 lg:items-center">
      <div class="text-center lg:text-left text-white">
        <h1 class="font-heading text-4xl sm:text-5xl font-extrabold leading-tight">
          {$t('pcsPage.hero.title')}
        </h1>
        <p class="mt-6 text-lg sm:text-xl text-white/90">
          {$t('pcsPage.hero.description')}
        </p>
        <a
          class="mt-8 inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-base font-semibold text-primary shadow-lg transition hover:opacity-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          href="/assessment#chat"
        >
          {$t('pcsPage.hero.cta')}
        </a>
      </div>

      <div class="rounded-3xl bg-white/15 p-8 backdrop-blur-sm shadow-xl">
        <h2 class="font-heading text-2xl font-semibold text-white">
          {$t('pelvicPainInfo.helpHeading')}
        </h2>
        <p class="mt-4 text-white/90">
          {$t('pelvicPainInfo.helpBody')}
        </p>
      </div>
    </div>
  </div>
</section>

<Footer />
