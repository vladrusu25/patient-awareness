<script lang="ts">
  export let active: 'patients' | 'analytics' = 'patients';
  // doctor QR data (could be doctor-specific invite URL)
  export let qrData = 'https://your.app/join?ref=doctor-123';
</script>

<aside class="w-[260px] shrink-0 border-r border-neutral-100 bg-neutral-25/60">
  <div class="px-5 h-16 flex items-center gap-3">
    <div class="h-9 w-9 rounded-lg bg-primary grid place-items-center">
      <svg viewBox="0 0 24 24" class="h-5 w-5 text-white" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 21s-6-4.35-8.485-6.835A6 6 0 1 1 12 5a6 6 0 1 1 8.485 9.165C18 16.65 12 21 12 21Z"/>
      </svg>
    </div>
    <span class="font-heading font-bold text-xl text-neutral-700">HealthCare</span>
  </div>

  <!-- Nav -->
  <nav class="px-3 pt-2 space-y-1">
    <a href="/doctor" class="flex items-center gap-3 rounded-xl px-3 py-2"
       class:bg-white={active==='patients'} class:shadow-sm={active==='patients'}>
      <div class="h-8 w-8 grid place-items-center rounded-lg bg-primary/10 text-primary">
        <svg viewBox="0 0 24 24" class="h-4 w-4" fill="currentColor"><path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm-7 9a7 7 0 0 1 14 0z"/></svg>
      </div>
      <span class="font-heading text-neutral-800">Patients</span>
    </a>

    <a href="/doctor/analytics" class="flex items-center gap-3 rounded-xl px-3 py-2"
       class:bg-white={active==='analytics'} class:shadow-sm={active==='analytics'}>
      <div class="h-8 w-8 grid place-items-center rounded-lg bg-primary/10 text-primary">
        <svg viewBox="0 0 24 24" class="h-4 w-4" fill="currentColor"><path d="M3 3h2v18H3zm8 6h2v12h-2zM19 12h2v6h-2z"/></svg>
      </div>
      <span class="font-heading text-neutral-800">Analytics</span>
    </a>
  </nav>

  <!-- Personal QR -->
  <div class="mt-6 px-4">
    <div class="rounded-2xl bg-white border border-neutral-100 p-4">
      <h4 class="font-heading text-neutral-700 mb-3">Personal QR</h4>

      <!-- Simple no-deps QR fallback (replace with your own generator later) -->
      <img
        class="mx-auto rounded-md border border-neutral-200"
        alt="QR"
        width="160" height="160"
        src={"https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=" + encodeURIComponent(qrData)}
      />

      <p class="mt-3 text-xs text-neutral-500 text-center">
        Scan to connect patients to you
      </p>

      <button
        class="mt-3 w-full h-10 rounded-lg bg-primary text-white hover:bg-primary-700"
        on:click={() => navigator.share?.({ title: 'My doctor QR', url: qrData }) ?? navigator.clipboard.writeText(qrData)}
        title="Share QR"
      >
        Share QR
      </button>
    </div>
  </div>
</aside>
