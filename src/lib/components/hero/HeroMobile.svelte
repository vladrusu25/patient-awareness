<script lang="ts">
  // Keep these tunable from where you render the component
  export let heightVh: number = 40;   // hero height (vh)
  export let padTop: number = 28;      // EXTRA padding above title (px)
  export let showBadge: boolean = true;
  export let showGlow: boolean = true; // subtle background accent
</script>

<section
  class="relative overflow-hidden bg-gradient-to-b from-primary-700 via-primary-600/75 to-mint-400"
  style={`min-height:${heightVh}vh`}
>
  <div class="relative mx-auto max-w-[680px] px-5"
       style={`min-height:${heightVh}vh; padding-top:${padTop}px;`}>

    {#if showGlow}
      <!-- soft corner glow (very subtle) -->
      <div class="pointer-events-none absolute -top-10 -left-10 h-28 w-28 rounded-full
                  bg-white/15 blur-2xl opacity-40"></div>
    {/if}

    <div class="flex flex-col items-center text-center pb-6">
      {#if showBadge}
        <div class="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20
                    bg-white/15 px-3 py-1 text-[12px] text-white/90 backdrop-blur">
          <!-- lock/heart icon -->
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2" class="opacity-90">
            <path d="M12 21s-6-4.35-8.485-6.835A6 6 0 1 1 12 5a6 6 0 1 1 8.485 9.165C18 16.65 12 21 12 21Z"/>
          </svg>
          Private by design
        </div>
      {/if}

      <h1 class="text-white font-heading font-bold leading-tight
                 text-[clamp(28px,8vw,40px)]">
        Your Health Matters
      </h1>

      <p class="mt-2 text-white/90 text-[clamp(14px,3.8vw,16px)] leading-snug">
        Quick, private AI-powered insights.
      </p>
      <p class="mt-1 text-white/80 text-[clamp(12px,3.4vw,14px)]">
        ~5 minutes • No sign-up • Free of charge
      </p>

      <form method="POST" action="/assessment?/start" class="mt-5">
        <button
          type="submit"
          class="h-11 px-5 rounded-lg bg-white/95 text-primary font-heading font-semibold
                 shadow-sm hover:bg-white focus:outline-none focus:ring-2 focus:ring-mint-400"
        >
          Start Assessment
        </button>
      </form>
    </div>
  </div>
  <svg
    class="pointer-events-none absolute bottom-[-1px] left-0 w-full h-12 sm:h-16 text-white"
    viewBox="0 0 1440 120"
    preserveAspectRatio="none"
    aria-hidden="true"
  >
    <!-- main wave into the next section color -->
    <path
      fill="currentColor"
      d="M0,64 C240,96 360,16 600,40 C840,64 960,96 1200,72 C1320,60 1380,50 1440,64 L1440,120 L0,120 Z"
    />
    <!-- soft second ridge for depth (optional) -->
    <path
      fill="currentColor"
      class="opacity-40"
      d="M0,80 C220,110 380,30 600,56 C860,86 990,110 1200,88 C1320,76 1380,70 1440,84 L1440,120 L0,120 Z"
    />
  </svg>
</section>
