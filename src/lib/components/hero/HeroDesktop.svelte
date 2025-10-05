<script lang="ts">
  import { t } from '$lib/i18n';
  import HeroWaves from '$lib/components/hero/HeroWaves.svelte';
</script>

<section
  class="relative overflow-hidden"
  style="
    height: 480px;
    background: linear-gradient(90deg, #1B5E20 0%, #95C892 100%);
  "
>
  <!-- Figma-style waves overlay -->
  <div class="pointer-events-none">
    <HeroWaves
      topOpacity={0.07}
      midOpacity={0.06}
      bottomOpacity={0.08}
    />
  </div>

  <div class="relative z-10 max-w-[1200px] mx-auto h-full px-6 grid grid-cols-12">
    <div class="col-span-7 flex flex-col justify-center">
      <h1 class="text-white font-heading font-extrabold leading-tight text-[56px] md:text-[72px]">
        {$t('hero.title')}
      </h1>

      <p class="mt-5 text-white/90 text-xl max-w-[760px]">
        {$t('hero.copy')}
      </p>

      <form method="POST" action="/assessment?/start" class="mt-8">
        <button
          type="submit"
          class="h-12 md:h-14 px-6 md:px-8 rounded-xl bg-white text-primary text-base md:text-lg font-semibold shadow-lg hover:opacity-95"
        >
          {$t('actions.startAssessment')}
        </button>
      </form>
    </div>

    <div class="col-span-5 relative">
      <img
        src="/images/doctor.webp"
        alt=""
        role="presentation"
        class="absolute bottom-[-8px] right-[-32px] max-h-[480px] w-auto pointer-events-none select-none drop-shadow-sm"
        loading="eager"
        decoding="async"
      />
    </div>
  </div>
</section>
