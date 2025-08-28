<script lang="ts">
  // No data needed yet — this is the pre-session landing
</script>

<div class="bg-neutral-25 min-h-[80vh] py-10 px-4">
  <div
    class="mx-auto max-w-[900px] rounded-2xl bg-white ring-1 ring-black/5 shadow-lg overflow-hidden"
  >
    <!-- Top bar -->
    <div class="bg-primary px-6 py-4 flex items-center justify-between">
      <div class="flex items-center gap-3 text-white">
        <!-- tiny logo mark -->
        <div class="h-8 w-8 rounded-md bg-white/15 grid place-items-center ring-1 ring-black/10">
          <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 21s-6-4.35-8.485-6.835A6 6 0 1 1 12 5a6 6 0 1 1 8.485 9.165C18 16.65 12 21 12 21Z" />
          </svg>
        </div>
        <div class="leading-tight">
          <div class="font-semibold">Health Assessment</div>
          <div class="text-xs opacity-80">private by design</div>
        </div>
      </div>

      <!-- 0% progress pill -->
      <div
        class="h-10 w-10 md:h-11 md:w-11 rounded-full bg-white/15 text-white grid place-items-center
               ring-1 ring-white/40"
        aria-label="Progress 0 percent"
      >
        <span class="text-sm font-semibold">0%</span>
      </div>
    </div>

    <!-- Body -->
    <div class="px-6 md:px-12 py-10 text-center">
      <!-- Optional brand mark -->
      <div class="mx-auto mb-6 h-12 w-12 rounded-full bg-primary/10 grid place-items-center text-primary">
        <svg viewBox="0 0 24 24" class="h-7 w-7" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 21s-6-4.35-8.485-6.835A6 6 0 1 1 12 5a6 6 0 1 1 8.485 9.165C18 16.65 12 21 12 21Z" />
        </svg>
      </div>

      <h1 class="font-heading text-2xl md:text-3xl font-semibold text-neutral-900">
        Health Assessment
      </h1>

      <p class="mt-4 text-neutral-600 max-w-[720px] mx-auto">
        This short assessment captures key information about your symptoms and experiences.
        It’s designed to be quick, private, and helpful for deciding the next steps.
      </p>

      <p class="mt-4 text-neutral-600 max-w-[720px] mx-auto">
        When you finish, you’ll get a result and resources tailored to your situation.
      </p>

      <!-- Start (posts to the "start" action you already built) -->
      <form method="POST" action="?/start" class="mt-8">
        <button
          type="submit"
          class="inline-flex items-center justify-center rounded-lg bg-primary text-white
                 px-6 py-3 text-base font-medium hover:bg-primary-700
                 focus-visible:ring-2 focus-visible:ring-mint-400"
        >
          Start
        </button>
      </form>

      <div class="mt-4 flex items-center justify-center gap-2 text-sm text-neutral-500">
        <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 8v5l3 3" />
          <circle cx="12" cy="12" r="9" />
        </svg>
        <span>Time to complete: ~5 minutes</span>
      </div>
    </div>
  </div>
</div>
