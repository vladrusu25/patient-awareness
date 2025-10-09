<script lang="ts">
  import Sidebar from '$lib/components/dashboard/doctor/Sidebar.svelte';
  import type {
    DoctorLookupResult,
    PatientAssessments,
    ScoreSummary
  } from '$lib/services/doctor.server';
  import { base } from '$app/paths';
  import { t, language } from '$lib/i18n';
  import type { Language } from '$lib/i18n/types';

  type ScoreKey = 'endopain' | 'pvvq' | 'pcsYes';
  let scoreKeys: Array<{ key: ScoreKey; label: string; help: string }> = [];

  let query = '';
  let loading = false;
  let errorMsg = '';
  let lookup: DoctorLookupResult | null = null;
  let kind: 'assessment' | 'patient' | null = null;
  let selectedToken: string | null = null;
  let currentLanguage: Language = 'en';

  $: currentLanguage = $language;
  $: locale = currentLanguage === 'ru' ? 'ru-RU' : 'en-US';
  $: dateFormatter = new Intl.DateTimeFormat(locale, { dateStyle: 'medium', timeStyle: 'short' });
  $: scoreKeys = [
    { key: 'endopain', label: $t('doctor.scores.endopain.label'), help: $t('doctor.scores.endopain.help') },
    { key: 'pvvq', label: $t('doctor.scores.pvvq.label'), help: $t('doctor.scores.pvvq.help') },
    { key: 'pcsYes', label: $t('doctor.scores.pcsYes.label'), help: $t('doctor.scores.pcsYes.help') }
  ];
  $: scoreMap = Object.fromEntries(scoreKeys.map((s) => [s.key, s]));
  $: texts = {
    headerTitle: $t('doctor.header.title'),
    headerSubtitle: $t('doctor.header.subtitle'),
    searchPlaceholder: $t('doctor.search.placeholder'),
    searchButton: $t('doctor.search.button'),
    searchLoading: $t('doctor.search.buttonLoading'),
    clear: $t('doctor.search.clear'),
    loading: $t('doctor.status.loading'),
    download: $t('doctor.misc.download'),
    open: $t('doctor.misc.open'),
    selectPrompt: $t('doctor.misc.selectPrompt'),
    notAvailable: $t('doctor.misc.notAvailable'),
    delta: {
      none: $t('doctor.delta.none'),
      noChange: $t('doctor.delta.noChange'),
      improved: $t('doctor.delta.improved'),
      worsened: $t('doctor.delta.worsened'),
      noValue: $t('doctor.delta.noValue')
    },
    pcs: {
      positive: $t('doctor.scores.pcsYes.positive'),
      below: $t('doctor.scores.pcsYes.below')
    },
    assessmentInfo: (token: string, suffix: string) => $t('doctor.search.infoAssessment', { token, suffix }),
    assessmentSuffix: (patient: string) => $t('doctor.search.infoAssessmentSuffix', { patient }),
    patientInfo: (patient: string, count: number) => $t('doctor.search.infoPatient', { patient, count }),
    assessmentTitle: (token: string) => $t('doctor.misc.assessmentTitle', { token }),
    completedLabel: (date: string) => $t('doctor.misc.completed', { date }),
    latestMetric: (metric: string) => $t('doctor.misc.latest', { metric }),
    listItemTitle: (token: string) => $t('doctor.misc.listItemTitle', { token })
  };

  async function performLookup(value: string) {
    loading = true;
    errorMsg = '';
    try {
      const res = await fetch(`${base}/doctor/api/search?q=${encodeURIComponent(value)}`, {
        headers: { 'cache-control': 'no-store' }
      });
      const data = (await res.json().catch(() => null)) || { result: null, kind: null };
      if (!res.ok || !data || !data.ok) {
        errorMsg = $t('doctor.search.errors.notFound');
        lookup = null;
        kind = null;
        return;
      }
      lookup = data?.result as DoctorLookupResult || null;
      kind = data?.kind as 'assessment' | 'patient' || null;
    } catch (err) {
      console.error(err);
      errorMsg = $t('doctor.search.errors.unreachable');
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
      errorMsg = $t('doctor.search.errors.emptyInput');
      return;
    }
    await performLookup(trimmed);
  }

  function formatNumber(value: number | null): string {
    if (value == null || Number.isNaN(value)) return texts.notAvailable;
    return Number.isInteger(value) ? String(value) : value.toFixed(1);
  }

  function deltaTone(delta: number | null): string {
    if (delta == null || delta === 0) return 'bg-neutral-100 text-neutral-600';
    return delta < 0 ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700';
  }

  function deltaLabel(delta: number | null): string {
    if (delta == null) return texts.delta.none;
    if (delta === 0) return texts.delta.noChange;
    return delta < 0 ? texts.delta.improved : texts.delta.worsened;
  }

  function deltaValue(delta: number | null): string {
    if (delta == null) return texts.delta.noValue;
    const rounded = Number.isInteger(delta) ? delta : Number(delta.toFixed(1));
    return `${delta > 0 ? '+' : ''}${rounded}`;
  }

  function formatDate(iso?: string | null): string {
    if (!iso) return texts.notAvailable;
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return texts.notAvailable;
    return dateFormatter.format(date);
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
          <h1 class="font-heading text-xl text-neutral-800">{texts.headerTitle}</h1>
          <p class="text-sm text-neutral-500">{texts.headerSubtitle}</p>
        </div>
      </header>

      <div class="p-6 space-y-6">
        <section class="rounded-2xl border border-neutral-100 bg-white p-5 shadow-sm">
          <form class="flex flex-col gap-3 sm:flex-row sm:items-center" on:submit|preventDefault={handleSearch}>
            <div class="relative flex-1">
              <input
                class="w-full h-12 rounded-xl border border-neutral-200 pl-10 pr-3 outline-none focus:ring-2 focus:ring-primary/30"
                placeholder={texts.searchPlaceholder}
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
                {loading ? texts.searchLoading : texts.searchButton}
              </button>
              {#if lookup}
                <button
                  type="button"
                  class="h-12 px-4 rounded-xl border border-neutral-300 hover:bg-neutral-50"
                  on:click={resetResults}
                >
                  {texts.clear}
                </button>
              {/if}
            </div>
          </form>

          {#if errorMsg}
            <p class="mt-2 text-sm text-red-600">{errorMsg}</p>
          {/if}

          {#if kind === 'assessment' && lookup?.type === 'assessment'}
            <p class="mt-3 text-sm text-neutral-500">
              {texts.assessmentInfo(
                lookup.assessment.token,
                lookup.assessment.patientPublicId ? texts.assessmentSuffix(lookup.assessment.patientPublicId) : ''
              )}
            </p>
          {/if}

          {#if kind === 'patient' && lookup?.type === 'patient'}
            <p class="mt-3 text-sm text-neutral-500">
              {texts.patientInfo(lookup.patient.publicId, lookup.patient.totalAssessments)}
            </p>
          {/if}
        </section>

        {#if loading}
          <section class="rounded-2xl border border-neutral-100 bg-white p-6 text-neutral-600 shadow-sm">
            <div class="flex items-center gap-3">
              <span class="h-3 w-3 animate-pulse rounded-full bg-primary"></span>
              {texts.loading}
            </div>
          </section>
        {:else if kind === 'assessment' && lookup?.type === 'assessment'}
          <section class="space-y-4">
            <div class="rounded-2xl border border-neutral-100 bg-white p-5 shadow-sm">
              <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 class="font-heading text-lg text-neutral-800">{texts.assessmentTitle(lookup.assessment.token)}</h2>
                  <p class="text-sm text-neutral-500">{texts.completedLabel(formatDate(lookup.assessment.createdAt))}</p>
                </div>
                <div class="flex items-center gap-2">
                  {#if lookup.assessment.downloadUrl}
                    <a
                      href={lookup.assessment.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      class="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-heading text-white hover:bg-primary-700"
                    >
                      {texts.download}
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
                    {texts.open}
                  </a>
                </div>
              </div>

              <div class="mt-5 grid gap-4 md:grid-cols-3">
                {#each scoreKeys as item}
                  <div class="rounded-xl border border-neutral-100 bg-neutral-25/60 p-4">
                    <p class="text-xs uppercase text-neutral-500">{item.label}</p>
                    <p class="mt-2 text-2xl font-heading text-neutral-800">
                      {formatNumber(lookup.assessment.scores[item.key])}
                    </p>
                    <p class="text-xs text-neutral-500">{item.help}</p>
                    {#if item.key === 'pcsYes'}
                      <span class={`mt-3 inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${pcsBadge(lookup.assessment.scores)}`}>
                        {lookup.assessment.scores.pcsYes != null && lookup.assessment.scores.pcsYes >= 2 ? texts.pcs.positive : texts.pcs.below}
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
                title={texts.assessmentTitle(lookup.assessment.token)}
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
                  {#each scoreKeys as item}
                    <div class="rounded-xl border border-neutral-100 bg-neutral-25/60 p-4">
                      <p class="text-xs uppercase text-neutral-500">{texts.latestMetric(item.label)}</p>
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
                        <p class="font-heading text-sm text-neutral-700">{texts.listItemTitle(assessment.token)}</p>
                        <p class="text-xs text-neutral-500">{texts.completedLabel(formatDate(assessment.createdAt))}</p>
                      </div>
                      <span class={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${deltaTone(assessment.delta?.endopain ?? null)}`}>
                        {deltaLabel(assessment.delta?.endopain ?? null)}
                        <span>{deltaValue(assessment.delta?.endopain ?? null)}</span>
                      </span>
                    </div>

                    <div class="mt-3 grid gap-2 text-xs text-neutral-600">
                      <div class="flex items-center justify-between">
                        <span>{scoreMap.endopain?.label}</span>
                        <span class="font-medium text-neutral-800">{formatNumber(assessment.scores.endopain)}</span>
                      </div>
                      <div class="flex items-center justify-between">
                        <span>{scoreMap.pvvq?.label}</span>
                        <span class="font-medium text-neutral-800">{formatNumber(assessment.scores.pvvq)}</span>
                      </div>
                      <div class="flex items-center justify-between">
                        <span>{scoreMap.pcsYes?.label}</span>
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
                        <h3 class="font-heading text-lg text-neutral-800">{texts.assessmentTitle(selectedAssessment.token)}</h3>
                        <p class="text-sm text-neutral-500">{texts.completedLabel(formatDate(selectedAssessment.createdAt))}</p>
                      </div>
                      <div class="flex items-center gap-2">
                        {#if selectedAssessment.downloadUrl}
                          <a
                            href={selectedAssessment.downloadUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            class="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-heading text-white hover:bg-primary-700"
                          >
                            {texts.download}
                          </a>
                        {/if}
                        <a
                          href={selectedAssessment.viewUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          class="inline-flex items-center gap-2 rounded-lg border border-neutral-300 px-4 py-2 text-sm hover:bg-neutral-50"
                        >
                          {texts.open}
                        </a>
                      </div>
                    </div>

                    <div class="mt-4 grid gap-3 sm:grid-cols-3">
                      {#each scoreKeys as item}
                        <div class="rounded-xl border border-neutral-100 bg-neutral-25/60 p-4">
                          <p class="text-xs uppercase text-neutral-500">{item.label}</p>
                          <p class="mt-2 text-2xl font-heading text-neutral-800">
                            {formatNumber(selectedAssessment.scores[item.key])}
                          </p>
                          <p class="text-xs text-neutral-500">{item.help}</p>
                          {#if item.key === 'pcsYes'}
                            <span class={`mt-3 inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${pcsBadge(selectedAssessment.scores)}`}>
                              {selectedAssessment.scores.pcsYes != null && selectedAssessment.scores.pcsYes >= 2 ? texts.pcs.positive : texts.pcs.below}
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
                      title={texts.assessmentTitle(selectedAssessment.token)}
                    ></iframe>
                  </div>
                {:else}
                  <div class="rounded-2xl border border-neutral-100 bg-white p-6 text-neutral-500 shadow-sm">
                    {texts.selectPrompt}
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






