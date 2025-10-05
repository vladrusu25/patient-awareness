<script lang="ts">
  import { t } from '$lib/i18n';
  import Footer from "$lib/components/Footer.svelte";

  const TOKEN_PATTERN = /^[A-Z0-9]{16}$/;

  let token = '';
  let loading = false;
  let errorMsg: string | null = null;
  let foundMsg: string | null = null;
  let viewUrl: string | null = null;
  let downloadUrl: string | null = null;

  async function onSearch(e: SubmitEvent) {
    e.preventDefault();
    errorMsg = null;
    foundMsg = null;
    viewUrl = null;
    downloadUrl = null;

    const trimmed = token.trim().toUpperCase();

    if (!TOKEN_PATTERN.test(trimmed)) {
      errorMsg = $t('pdfSearch.errors.invalidFormat');
      return;
    }

    loading = true;
    try {
      const res = await fetch(`/api/pdf-search/${encodeURIComponent(trimmed)}`, {
        headers: { 'cache-control': 'no-store' }
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        if (data?.code === 'invalid_format') {
          errorMsg = $t('pdfSearch.errors.invalidFormat');
        } else if (data?.code === 'not_found') {
          errorMsg = $t('pdfSearch.errors.notFound');
        } else if (data?.code === 'rate_limited') {
          const seconds = typeof data?.retryAfter === 'number' ? data.retryAfter : 60;
          errorMsg = $t('pdfSearch.errors.rateLimited', { seconds: String(seconds) });
        } else if (data?.code === 'no_pdf') {
          errorMsg = $t('pdfSearch.errors.noPdf');
        } else {
          errorMsg = $t('pdfSearch.errors.generic');
        }
        return;
      }

      if (data?.ok && data?.viewUrl && data?.downloadUrl) {
        viewUrl = data.viewUrl;
        downloadUrl = data.downloadUrl;
        foundMsg = $t('pdfSearch.found');
      } else {
        errorMsg = $t('pdfSearch.errors.generic');
      }
    } catch (err) {
      console.error(err);
      errorMsg = $t('pdfSearch.errors.generic');
    } finally {
      loading = false;
    }
  }
</script>

<section class="mx-auto max-w-[1024px] py-10 px-4 sm:px-6">
  <h1 class="text-2xl font-heading font-semibold text-neutral-800">{$t('pdfSearch.title')}</h1>
  <p class="mt-2 text-neutral-600">
    {@html $t('pdfSearch.description')}
  </p>

  <form class="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center" on:submit|preventDefault={onSearch}>
    <input
      class="w-full rounded-lg border border-neutral-300 px-4 py-3 outline-none focus:ring-2 focus:ring-mint-400"
      placeholder={$t('pdfSearch.placeholder')}
      bind:value={token}
      maxlength="16"
      autocomplete="off"
      autocapitalize="characters"
      spellcheck="false"
    />
    <button
      class="h-[46px] w-full sm:w-auto px-6 rounded-lg bg-primary text-white font-heading hover:bg-primary-700 disabled:opacity-50"
      type="submit"
      disabled={loading}
    >
      {loading ? $t('pdfSearch.searching') : $t('pdfSearch.search')}
    </button>
  </form>

  {#if errorMsg}
    <div class="mt-3 text-sm text-red-600">{errorMsg}</div>
  {/if}

  {#if foundMsg}
    <div class="mt-3 text-sm text-emerald-700">{foundMsg}</div>
  {/if}

  {#if viewUrl}
    <div class="mt-8 space-y-4">
      <a
        href={downloadUrl ?? '#'}
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-primary text-white hover:bg-primary-700"
      >
        {$t('pdfSearch.download')}
        <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
      </a>

      <!-- Inline preview via same-origin streaming route (always inline) -->
      <div class="rounded-lg border border-neutral-200 overflow-hidden">
        <iframe src={viewUrl} class="w-full h-[360px] sm:h-[480px] md:h-[600px]" title={$t('pdfSearch.previewTitle')}></iframe>
      </div>
    </div>
  {/if}
</section>

<Footer />
