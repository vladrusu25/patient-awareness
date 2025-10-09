<script lang="ts">
  import { t } from '$lib/i18n';

  export let active: 'patients' = 'patients';
  export let qrData = 'https://your.app/join?ref=doctor-123';
</script>

<aside class="w-[260px] shrink-0 border-r border-neutral-100 bg-neutral-25/60">
  <div class="px-5 h-16 flex items-center gap-3">
    <img
      src="/images/logo.png"
      alt="{$t('common.brand')} logo"
      class="h-9 w-auto"
      loading="lazy"
      decoding="async"
    />
    <span class="font-heading font-bold text-xl text-neutral-700">{$t('common.brand')}</span>
  </div>

  <nav class="px-3 pt-2 space-y-1">
    <a href="/doctor" class="flex items-center gap-3 rounded-xl px-3 py-2"
       class:bg-white={active==='patients'} class:shadow-sm={active==='patients'}>
      <div class="h-8 w-8 grid place-items-center rounded-lg bg-primary/10 text-primary">
        <svg viewBox="0 0 24 24" class="h-4 w-4" fill="currentColor"><path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm-7 9a7 7 0 0 1 14 0z"/></svg>
      </div>
      <span class="font-heading text-neutral-800">{$t('doctor.sidebar.patients')}</span>
    </a>
  </nav>

  <div class="mt-6 px-4">
    <div class="rounded-2xl bg-white border border-neutral-100 p-4">
      <h4 class="font-heading text-neutral-700 mb-3">{$t('doctor.sidebar.qrTitle')}</h4>

      <img
        class="mx-auto rounded-md border border-neutral-200"
        alt="QR"
        width="160" height="160"
        src={"https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=" + encodeURIComponent(qrData)}
      />

      <p class="mt-3 text-xs text-neutral-500 text-center">
        {$t('doctor.sidebar.qrHint')}
      </p>

      <button
        class="mt-3 w-full h-10 rounded-lg bg-primary text-white hover:bg-primary-700"
        on:click={() => navigator.share?.({ title: $t('doctor.sidebar.share'), url: qrData }) ?? navigator.clipboard.writeText(qrData)}
        title={$t('doctor.sidebar.share')}
      >
        {$t('doctor.sidebar.share')}
      </button>
    </div>
  </div>
</aside>
