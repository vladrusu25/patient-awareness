<script lang="ts">
	import Footer from "$lib/components/Footer.svelte";

  let token = '';
  let loading = false;
  let errorMsg = '';
  let pdfUrl: string | null = null;

  async function onSearch(e: SubmitEvent) {
    e.preventDefault(); // IMPORTANT: prevent full page reload
    errorMsg = '';
    pdfUrl = null;

    const t = token.trim().toUpperCase();

    // simple guidance: your tokens are 16-char A–Z/2–9
    if (!/^[A-Z0-9]{16}$/.test(t)) {
      errorMsg = 'Please enter the 16-character token shown on your report.';
      return;
    }

    loading = true;
    try {
      const res = await fetch(`/api/pdf-search/${encodeURIComponent(t)}`, {
        headers: { 'cache-control': 'no-store' }
      });

      if (!res.ok) {
        if (res.status === 404) {
          errorMsg = 'No PDF found for that token.';
        } else {
          errorMsg = `Something went wrong (${res.status}). Please try again.`;
        }
        return;
      }

      const data = await res.json();
      if (data?.pdfFound && data?.pdfUrl) {
        pdfUrl = data.pdfUrl;
      } else {
        errorMsg = 'No PDF found for that token.';
      }
    } catch (err) {
      console.error(err);
      errorMsg = 'Network error. Please try again.';
    } finally {
      loading = false;
    }
  }
</script>

<section class="mx-auto max-w-[1024px] py-10 px-6">
  <h1 class="text-2xl font-heading font-semibold text-neutral-800">Find your PDF report</h1>
  <p class="mt-2 text-neutral-600">
    Enter your 16-character token (e.g. <code class="px-1 rounded bg-neutral-50">AB2C…</code>) to retrieve your report.
  </p>

  <form class="mt-6 flex gap-3" on:submit|preventDefault={onSearch}>
    <input
      class="flex-1 rounded-lg border border-neutral-300 px-4 py-3 outline-none focus:ring-2 focus:ring-mint-400"
      placeholder="Enter your token (16 characters)"
      bind:value={token}
      maxlength="16"
      autocomplete="off"
      autocapitalize="characters"
      spellcheck="false"
    />
    <button
      class="h-[46px] px-6 rounded-lg bg-primary text-white font-heading hover:bg-primary-700 disabled:opacity-50"
      type="submit"
      disabled={loading}
    >
      {loading ? 'Searching…' : 'Search'}
    </button>
  </form>

  {#if errorMsg}
    <div class="mt-3 text-sm text-red-600">{errorMsg}</div>
  {/if}

  {#if pdfUrl}
    <div class="mt-8 space-y-4">
      <a
        href={pdfUrl}
        target="_blank"
        rel="noopener"
        class="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-primary text-white hover:bg-primary-700"
      >
        Download PDF
        <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
      </a>

      <!-- quick inline preview (optional) -->
      <div class="rounded-lg border border-neutral-200 overflow-hidden">
        <iframe src={pdfUrl} class="w-full h-[600px]" title="PDF preview"></iframe>
      </div>
    </div>
  {/if}
</section>
<Footer></Footer>
