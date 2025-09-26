<script lang="ts">
  import Sidebar from '$lib/components/dashboard/doctor/Sidebar.svelte';
  import type {
    DoctorLookupResult,
    PatientAssessments,
    ScoreSummary
  } from '$lib/services/doctor.server';
  import { base } from '$app/paths';

  type ScoreKey = 'endopain' | 'pvvq' | 'pcsYes';
  const SCORE_KEYS: Array<{ key: ScoreKey; label: string; help: string }> = [
    { key: 'endopain', label: 'ENDOPAIN Global', help: '0-100 (lower is better)' },
    { key: 'pvvq', label: 'PVVQ Total', help: '20-100 (lower is better)' },
    { key: 'pcsYes', label: 'PCS Yes Count', help: 'Positive if >= 2 Yes' }
  ];

  let query = '';
  let loading = false;
  let errorMsg = '';
  let lookup: DoctorLookupResult | null = null;
  let kind: 'assessment' | 'patient' | null = null;
  let selectedToken: string | null = null;

  async function performLookup(value: string) {
    loading = true;
    errorMsg = '';
    try {
      const res = await fetch(`${base}/doctor/api/search?q=${encodeURIComponent(value)}`, {
        headers: { 'cache-control': 'no-store' }
      });
      const data = (await res.json().catch(() => null)) || { result: null, kind: null };
      if (!res.ok || !data || !data.ok) {
        errorMsg = data?.message ?? 'No results found.';
        lookup = null;
        kind = null;
        return;
      }
      lookup = data?.result as DoctorLookupResult || null;
      kind = data?.kind as 'assessment' | 'patient' || null;
    } catch (err) {
      console.error(err);
      errorMsg = 'Unable to reach lookup service.';
      lookup = null;
      kind = null;
    } finally {
      loading = false;
    }
  }

  function resetResults() {
    lookup = null;
    kind = null;
    selectedToken = null;
    errorMsg = '';
  }

  async function handleSearch(event: SubmitEvent) {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) {
      errorMsg = 'Enter an assessment token or patient ID.';
      return;
    }
    await performLookup(trimmed);
  }

  function formatNumber(value: number | null): string {
    if (value == null || Number.isNaN(value)) return 'n/a';
    return Number.isInteger(value) ? String(value) : value.toFixed(1);
  }

  function deltaTone(delta: number | null): string {
    if (delta == null || delta === 0) return 'bg-neutral-100 text-neutral-600';
    return delta < 0 ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700';
  }

  function deltaLabel(delta: number | null): string {
    if (delta == null) return 'No prior data';
    if (delta === 0) return 'No change';
    return delta < 0 ? 'Improved' : 'Worsened';
  }

  function deltaValue(delta: number | null): string {
    if (delta == null) return '--';
    const rounded = Number.isInteger(delta) ? delta : Number(delta.toFixed(1));
    return `${delta > 0 ? '+' : ''}${rounded}`;
  }

  function formatDate(iso?: string | null): string {
    if (!iso) return 'n/a';
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return 'n/a';
    return date.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
  }

  function pcsBadge(score: ScoreSummary): string {
    if (score.pcsYes == null) return 'bg-neutral-100 text-neutral-600';
    return score.pcsYes >= 2 ? 'bg-red-50 text-red-700' : 'bg-emerald-50 text-emerald-700';
  }

  $: patientData =
    kind === 'patient' && lookup?.type === 'patient' ? (lookup.patient as PatientAssessments) : null;

  $: if (patientData) {
    const tokens = patientData.assessments.map((a) => a.token);
    if (!selectedToken || !tokens.includes(selectedToken)) {
      selectedToken = patientData.assessments[0]?.token ?? null;
    }
  } else {
    selectedToken = null;
  }

  $: selectedAssessment =
    patientData && selectedToken
      ? patientData.assessments.find((a) => a.token === selectedToken) ?? null
      : null;
</script>

<div class="min-h-screen bg-neutral-25">
  <div class="flex">
    <Sidebar active="patients" />

    <main class="flex-1 min-h-screen">
      <header class="h-16 px-6 border-b border-neutral-100 bg-white flex items-center justify-between">
        <div>
          <h1 class="font-heading text-xl text-neutral-800">Doctor Dashboard</h1>
          <p class="text-sm text-neutral-500">Search assessments by patient or assessment ID.</p>
        </div>
      </header>

      <div class="p-6 space-y-6">
        <section class="rounded-2xl border border-neutral-100 bg-white p-5 shadow-sm">
          <form class="flex flex-col gap-3 sm:flex-row sm:items-center" on:submit|preventDefault={handleSearch}>
            <div class="relative flex-1">
              <input
                class="w-full h-12 rounded-xl border border-neutral-200 pl-10 pr-3 outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="Enter assessment token (16 chars) or patient ID (e.g. A12345)"
                bind:value={query}
                autocomplete="off"
                spellcheck={false}
              />
              <svg
                viewBox="0 0 24 24"
                class="h-5 w-5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m21 21-3.9-3.9" />
              </svg>
            </div>

            <div class="flex items-center gap-2 sm:flex-none">
              <button
                type="submit"
                class="h-12 px-5 rounded-xl bg-primary text-white font-heading hover:bg-primary-700 disabled:opacity-60"
                disabled={loading}
              >
                {loading ? 'Searching...' : 'Search'}
              </button>
              {#if lookup}
                <button
                  type="button"
                  class="h-12 px-4 rounded-xl border border-neutral-300 hover:bg-neutral-50"
                  on:click={resetResults}
                >
                  Clear
                </button>
              {/if}
            </div>
          </form>

          {#if errorMsg}
            <p class="mt-2 text-sm text-red-600">{errorMsg}</p>
          {/if}

          {#if kind === 'assessment' && lookup?.type === 'assessment'}
            <p class="mt-3 text-sm text-neutral-500">
              Showing assessment token <span class="font-medium text-neutral-700">{lookup.assessment.token}</span>
              {#if lookup.assessment.patientPublicId}
                for patient <span class="font-medium text-neutral-700">{lookup.assessment.patientPublicId}</span>
              {/if}
            </p>
          {/if}

          {#if kind === 'patient' && lookup?.type === 'patient'}
            <p class="mt-3 text-sm text-neutral-500">
              Showing patient <span class="font-medium text-neutral-700">{lookup.patient.publicId}</span> with
              {lookup.patient.totalAssessments} assessments.
            </p>
          {/if}
        </section>

        {#if loading}
          <section class="rounded-2xl border border-neutral-100 bg-white p-6 text-neutral-600 shadow-sm">
            <div class="flex items-center gap-3">
              <span class="h-3 w-3 animate-pulse rounded-full bg-primary"></span>
              Fetching data...
            </div>
          </section>
        {:else if kind === 'assessment' && lookup?.type === 'assessment'}
          <section class="space-y-4">
            <div class="rounded-2xl border border-neutral-100 bg-white p-5 shadow-sm">
              <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 class="font-heading text-lg text-neutral-800">Assessment {lookup.assessment.token}</h2>
                  <p class="text-sm text-neutral-500">Completed {formatDate(lookup.assessment.createdAt)}</p>
                </div>
                <div class="flex items-center gap-2">
                  {#if lookup.assessment.downloadUrl}
                    <a
                      href={lookup.assessment.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      class="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-heading text-white hover:bg-primary-700"
                    >
                      Download PDF
                      <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                    </a>
                  {/if}
                  <a
                    href={lookup.assessment.viewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-2 rounded-lg border border-neutral-300 px-4 py-2 text-sm hover:bg-neutral-50"
                  >
                    Open in new tab
                  </a>
                </div>
              </div>

              <div class="mt-5 grid gap-4 md:grid-cols-3">
                {#each SCORE_KEYS as item}
                  <div class="rounded-xl border border-neutral-100 bg-neutral-25/60 p-4">
                    <p class="text-xs uppercase text-neutral-500">{item.label}</p>
                    <p class="mt-2 text-2xl font-heading text-neutral-800">
                      {formatNumber(lookup.assessment.scores[item.key])}
                    </p>
                    <p class="text-xs text-neutral-500">{item.help}</p>
                    {#if item.key === 'pcsYes'}
                      <span class={`mt-3 inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${pcsBadge(lookup.assessment.scores)}`}>
                        {lookup.assessment.scores.pcsYes != null && lookup.assessment.scores.pcsYes >= 2 ? 'Positive screen' : 'Below threshold'}
                      </span>
                    {/if}
                  </div>
                {/each}
              </div>
            </div>

            <div class="rounded-2xl border border-neutral-100 bg-white p-5 shadow-sm">
              <iframe
                src={lookup.assessment.viewUrl}
                class="w-full h-[520px] rounded-xl border border-neutral-200"
                title={`Assessment PDF ${lookup.assessment.token}`}
              ></iframe>
            </div>
          </section>
        {:else if patientData}
          <section class="space-y-5">
            <div class="rounded-2xl border border-neutral-100 bg-white p-5 shadow-sm">
              <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 class="font-heading text-lg text-neutral-800">Patient {patientData.publicId}</h2>
                  <p class="text-sm text-neutral-500">
                    First seen {formatDate(patientData.firstSeenAt)} - Last seen {formatDate(patientData.lastSeenAt)}
                  </p>
                </div>
                <div class="flex gap-3">
                  <div class="rounded-xl bg-neutral-100 px-4 py-2 text-sm text-neutral-700">
                    {patientData.totalAssessments} assessments
                  </div>
                  {#if patientData.latestSummary?.changeFromPrevious}
                    <div class={`rounded-xl px-4 py-2 text-sm font-medium ${deltaTone(patientData.latestSummary.changeFromPrevious.endopain ?? null)}`}>
                      Endopain {deltaValue(patientData.latestSummary.changeFromPrevious.endopain ?? null)}
                    </div>
                  {/if}
                </div>
              </div>

              {#if patientData.latestSummary?.scores}
                <div class="mt-4 grid gap-3 sm:grid-cols-3">
                  {#each SCORE_KEYS as item}
                    <div class="rounded-xl border border-neutral-100 bg-neutral-25/60 p-4">
                      <p class="text-xs uppercase text-neutral-500">Latest {item.label}</p>
                      <p class="mt-2 text-2xl font-heading text-neutral-800">
                        {formatNumber(patientData.latestSummary.scores[item.key])}
                      </p>
                      <p class="text-xs text-neutral-500">{item.help}</p>
                    </div>
                  {/each}
                </div>
              {/if}
            </div>

            <div class="grid gap-5 lg:grid-cols-5">
              <div class="lg:col-span-2 space-y-3">
                {#each patientData.assessments as assessment (assessment.token)}
                  <button
                    type="button"
                    class="w-full rounded-2xl border px-4 py-4 text-left transition shadow-sm focus-visible:outline-none"
                    class:border-primary-60={selectedToken === assessment.token}
                    class:ring-2={selectedToken === assessment.token}
                    class:ring-primary-40={selectedToken === assessment.token}
                    class:bg-white={selectedToken === assessment.token}
                    class:border-neutral-100={selectedToken !== assessment.token}
                    class:bg-white-60={selectedToken !== assessment.token}
                    on:click={() => (selectedToken = assessment.token)}
                  >
                    <div class="flex items-center justify-between gap-3">
                      <div>
                        <p class="font-heading text-sm text-neutral-700">Assessment {assessment.token}</p>
                        <p class="text-xs text-neutral-500">{formatDate(assessment.createdAt)}</p>
                      </div>
                      <span class={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${deltaTone(assessment.delta?.endopain ?? null)}`}>
                        {deltaLabel(assessment.delta?.endopain ?? null)}
                        <span>{deltaValue(assessment.delta?.endopain ?? null)}</span>
                      </span>
                    </div>

                    <div class="mt-3 grid gap-2 text-xs text-neutral-600">
                      <div class="flex items-center justify-between">
                        <span>ENDOPAIN</span>
                        <span class="font-medium text-neutral-800">{formatNumber(assessment.scores.endopain)}</span>
                      </div>
                      <div class="flex items-center justify-between">
                        <span>PVVQ</span>
                        <span class="font-medium text-neutral-800">{formatNumber(assessment.scores.pvvq)}</span>
                      </div>
                      <div class="flex items-center justify-between">
                        <span>PCS Yes</span>
                        <span class={`inline-flex items-center gap-1 rounded-full px-2 py-1 ${pcsBadge(assessment.scores)}`}>
                          {formatNumber(assessment.scores.pcsYes)}
                        </span>
                      </div>
                    </div>
                  </button>
                {/each}
              </div>

              <div class="lg:col-span-3 space-y-3">
                {#if selectedAssessment}
                  <div class="rounded-2xl border border-neutral-100 bg-white p-5 shadow-sm">
                    <div class="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                      <div>
                        <h3 class="font-heading text-lg text-neutral-800">Assessment {selectedAssessment.token}</h3>
                        <p class="text-sm text-neutral-500">Completed {formatDate(selectedAssessment.createdAt)}</p>
                      </div>
                      <div class="flex items-center gap-2">
                        {#if selectedAssessment.downloadUrl}
                          <a
                            href={selectedAssessment.downloadUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            class="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-heading text-white hover:bg-primary-700"
                          >
                            Download PDF
                          </a>
                        {/if}
                        <a
                          href={selectedAssessment.viewUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          class="inline-flex items-center gap-2 rounded-lg border border-neutral-300 px-4 py-2 text-sm hover:bg-neutral-50"
                        >
                          Open in new tab
                        </a>
                      </div>
                    </div>

                    <div class="mt-4 grid gap-3 sm:grid-cols-3">
                      {#each SCORE_KEYS as item}
                        <div class="rounded-xl border border-neutral-100 bg-neutral-25/60 p-4">
                          <p class="text-xs uppercase text-neutral-500">{item.label}</p>
                          <p class="mt-2 text-2xl font-heading text-neutral-800">
                            {formatNumber(selectedAssessment.scores[item.key])}
                          </p>
                          <p class="text-xs text-neutral-500">{item.help}</p>
                          {#if item.key === 'pcsYes'}
                            <span class={`mt-3 inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${pcsBadge(selectedAssessment.scores)}`}>
                              {selectedAssessment.scores.pcsYes != null && selectedAssessment.scores.pcsYes >= 2 ? 'Positive screen' : 'Below threshold'}
                            </span>
                          {:else if item.key === 'endopain'}
                            {#if selectedAssessment.delta?.endopain != null}
                              <span class={`mt-3 inline-flex items-center gap-2 rounded-full px-2 py-1 text-xs font-medium ${deltaTone(selectedAssessment.delta.endopain)}`}>
                                {deltaLabel(selectedAssessment.delta.endopain)}
                                <span>{deltaValue(selectedAssessment.delta.endopain)}</span>
                              </span>
                            {/if}
                          {:else if item.key === 'pvvq'}
                            {#if selectedAssessment.delta?.pvvq != null}
                              <span class={`mt-3 inline-flex items-center gap-2 rounded-full px-2 py-1 text-xs font-medium ${deltaTone(selectedAssessment.delta.pvvq)}`}>
                                {deltaLabel(selectedAssessment.delta.pvvq)}
                                <span>{deltaValue(selectedAssessment.delta.pvvq)}</span>
                              </span>
                            {/if}
                          {/if}
                        </div>
                      {/each}
                    </div>
                  </div>

                  <div class="rounded-2xl border border-neutral-100 bg-white p-5 shadow-sm">
                    <iframe
                      src={selectedAssessment.viewUrl}
                      class="w-full h-[500px] rounded-xl border border-neutral-200"
                      title={`Assessment PDF ${selectedAssessment.token}`}
                    ></iframe>
                  </div>
                {:else}
                  <div class="rounded-2xl border border-neutral-100 bg-white p-6 text-neutral-500 shadow-sm">
                    Select an assessment to preview its PDF.
                  </div>
                {/if}
              </div>
            </div>
          </section>
        {/if}
      </div>
    </main>
  </div>
</div>






