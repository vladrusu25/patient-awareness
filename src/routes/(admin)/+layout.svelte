<script lang="ts">
  export let data: { user: { id: string; username: string; role: 'admin' | 'doctor' } };
</script>

<!-- Lock to viewport; no body scroll -->
<div class="h-screen overflow-hidden bg-neutral-25">
  <!-- 56px header -->
  <header class="sticky top-0 z-30 w-full bg-primary text-white shadow-sm h-14">
    <div class="mx-auto max-w-screen-2xl h-full flex items-center justify-between px-5">
      <div class="flex items-center gap-3">
        <div class="h-8 w-8 rounded-full bg-white/15 grid place-items-center">🏥</div>
        <div class="font-semibold tracking-tight">HealthCare</div>
      </div>

      <div class="flex items-center gap-3">
        <span class="hidden md:inline text-sm/none opacity-90">{data.user.username}</span>
        <form method="POST" action="/logout">
          <button
            class="inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-1.5 text-sm hover:bg-white/15"
            type="submit"
          >
            Logout
          </button>
        </form>
      </div>
    </div>
  </header>

  <!-- Slot gets exact remaining height; parent keeps overflow hidden -->
  <main class="mx-auto w-full max-w-screen-2xl px-6 py-5 h-[calc(100vh-56px)] overflow-hidden">
    <slot />
  </main>
</div>
