<script lang="ts">
  import Sidebar from '$lib/components/dashboard/doctor/Sidebar.svelte';
  import Pill from '$lib/components/dashboard/doctor/Pill.svelte';
  import Avatar from '$lib/components/dashboard/doctor/Avatar.svelte';
  import type { PatientRow, Severity } from '$lib/types/patient';

  // ----- Demo data (replace with load() + Supabase later)
  let patients: PatientRow[] = [
    {
      id: 'p1',
      initials: 'S.J.',
      avatarColor: 'bg-emerald-500',
      lastAssessment: new Date(Date.now() - 1000*60*60*26).toISOString(),
      severity: 'high',
      flags: ['PCS+'],
      status: 'new'
    },
    {
      id: 'p2',
      initials: 'M.Ch.',
      avatarColor: 'bg-emerald-400',
      lastAssessment: new Date(Date.now() - 1000*60*60*8).toISOString(),
      severity: 'high',
      flags: [],
      status: 'new'
    },
    {
      id: 'p3',
      initials: 'M.Rod',
      avatarColor: 'bg-emerald-600',
      lastAssessment: new Date(Date.now() - 1000*60*60*72).toISOString(),
      severity: 'medium',
      flags: ['menstrual ×3'],
      status: 'reviewed'
    },
    {
      id: 'p4',
      initials: 'M.Rs',
      avatarColor: 'bg-emerald-700',
      lastAssessment: new Date(Date.now() - 1000*60*60*3).toISOString(),
      severity: 'low',
      flags: [],
      status: 'reviewed'
    }
  ];

  // ----- Local state (filters, search)
  let dateRange: '7d' | '30d' | 'all' = '7d';
  let selectedSeverities = new Set<Severity>(); // empty = all
  let q = '';

  function toggleSeverity(s: Severity) {
    if (selectedSeverities.has(s)) selectedSeverities.delete(s);
    else selectedSeverities.add(s);
  }

  function withinRange(iso?: string) {
    if (!iso || dateRange==='all') return true;
    const dt = new Date(iso).getTime();
    const now = Date.now();
    const days = dateRange==='7d' ? 7 : 30;
    return now - dt <= days * 24 * 3600 * 1000;
    // NOTE: If you want "never" to be excluded, keep iso? true : false.
  }

  function prettyWhen(iso?: string) {
    if (!iso) return '—';
    const diff = (Date.now() - new Date(iso).getTime())/1000;
    if (diff < 3600) return `${Math.floor(diff/60)} min ago`;
    if (diff < 24*3600) return `${Math.floor(diff/3600)} h ago`;
    const d = new Date(iso);
    return d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
  }

  $: filtered = patients.filter(p => {
    if (q && !p.initials.toLowerCase().includes(q.toLowerCase())) return false;
    if (!withinRange(p.lastAssessment)) return false;
    if (selectedSeverities.size && !selectedSeverities.has(p.severity)) return false;
    return true;
  });

  function severityTone(s: Severity): 'green'|'yellow'|'red' {
    return s==='low' ? 'green' : s==='medium' ? 'yellow' : 'red';
  }

  function statusTone(st: 'new'|'reviewed'): 'neutral'|'green' {
    return st==='new' ? 'neutral' : 'green';
  }

  function viewPatientAssessments(id: string) {
    // navigate to doctor view for this patient
    // example route – adjust to your real route
    window.location.href = `/doctor/patient/${id}`;
  }
</script>

<div class="min-h-screen bg-neutral-25">
  <div class="flex">
    <Sidebar active="patients" />

    <main class="flex-1">
      <!-- Top bar -->
      <div class="h-16 px-6 border-b border-neutral-100 bg-white flex items-center justify-between">
        <h1 class="font-heading text-xl text-neutral-800">Patients</h1>

        <div class="relative w-[320px]">
          <input
            placeholder="Search patients…"
            bind:value={q}
            class="w-full h-10 rounded-xl border border-neutral-200 pl-10 pr-3 outline-none
                   focus:ring-2 focus:ring-primary/30"
          />
          <svg viewBox="0 0 24 24" class="h-4 w-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2"
               fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>
          </svg>
        </div>
      </div>

      <!-- Controls + table -->
      <div class="p-6">
        <!-- Filters -->
        <div class="rounded-2xl bg-white border border-neutral-100 p-4 mb-4 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <!-- Date -->
            <div class="relative">
              <select bind:value={dateRange}
                class="h-10 rounded-xl border border-neutral-200 bg-white px-3 pr-8 outline-none
                       focus:ring-2 focus:ring-primary/30">
                <option value="7d">Date Range: Last 7 days</option>
                <option value="30d">Date Range: Last 30 days</option>
                <option value="all">Date Range: All time</option>
              </select>
            </div>

            <!-- Severity chips -->
            <button
              class="h-8 px-3 rounded-full text-sm"
              class:bg-green-100={selectedSeverities.has('low')}
              class:text-green-800={selectedSeverities.has('low')}
              class:bg-neutral-100={!selectedSeverities.has('low')}
              class:text-neutral-700={!selectedSeverities.has('low')}
              on:click={() => toggleSeverity('low')}
            >Low</button>

            <button
              class="h-8 px-3 rounded-full text-sm"
              class:bg-yellow-100={selectedSeverities.has('medium')}
              class:text-yellow-800={selectedSeverities.has('medium')}
              class:bg-neutral-100={!selectedSeverities.has('medium')}
              class:text-neutral-700={!selectedSeverities.has('medium')}
              on:click={() => toggleSeverity('medium')}
            >Medium</button>

            <button
              class="h-8 px-3 rounded-full text-sm"
              class:bg-red-100={selectedSeverities.has('high')}
              class:text-red-800={selectedSeverities.has('high')}
              class:bg-neutral-100={!selectedSeverities.has('high')}
              class:text-neutral-700={!selectedSeverities.has('high')}
              on:click={() => toggleSeverity('high')}
            >High</button>
          </div>
        </div>

        <!-- Table -->
        <div class="rounded-2xl bg-white border border-neutral-100 overflow-hidden">
          <div class="px-5 py-4 border-b border-neutral-100">
            <h3 class="font-heading text-neutral-800">Patients</h3>
          </div>

          <div class="overflow-x-auto">
            <table class="min-w-full text-sm">
              <thead class="text-neutral-500">
                <tr class="border-b border-neutral-100">
                  <th class="text-left font-medium px-5 py-3">Patient</th>
                  <th class="text-left font-medium px-5 py-3">Last Assessment</th>
                  <th class="text-left font-medium px-5 py-3">Severity</th>
                  <th class="text-left font-medium px-5 py-3">Flags</th>
                  <th class="text-left font-medium px-5 py-3">Status</th>
                  <th class="text-left font-medium px-5 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {#each filtered as p (p.id)}
                  <tr class="border-b border-neutral-100 hover:bg-neutral-25/40">
                    <td class="px-5 py-3">
                      <div class="flex items-center gap-3">
                        <Avatar initials={p.initials} color={p.avatarColor ?? 'bg-emerald-500'} />
                        <div class="font-medium text-neutral-800">{p.initials}</div>
                      </div>
                    </td>

                    <td class="px-5 py-3 text-neutral-700">{prettyWhen(p.lastAssessment)}</td>

                    <td class="px-5 py-3">
                      <Pill tone={severityTone(p.severity)}>
                        {p.severity === 'low' ? 'Low' : p.severity === 'medium' ? 'Medium' : 'High'}
                      </Pill>
                    </td>

                    <td class="px-5 py-3">
                      <div class="flex flex-wrap gap-1">
                        {#if p.flags.length === 0}
                          <span class="text-neutral-400">—</span>
                        {:else}
                          {#each p.flags as f}
                            <Pill tone="neutral">{f}</Pill>
                          {/each}
                        {/if}
                      </div>
                    </td>

                    <td class="px-5 py-3">
                      <Pill tone={statusTone(p.status)}>
                        {p.status === 'new' ? 'New' : 'Reviewed'}
                      </Pill>
                    </td>

                    <td class="px-5 py-3">
                      <button
                        class="h-9 px-3 rounded-lg border border-neutral-300 hover:bg-neutral-50"
                        on:click={() => viewPatientAssessments(p.id)}
                      >
                        View assessments
                      </button>
                    </td>
                  </tr>
                {/each}
              </tbody>
            </table>
          </div>

          <!-- Footer / pagination placeholder -->
          <div class="px-5 py-3 text-xs text-neutral-500 flex items-center justify-between">
            <span>Showing {filtered.length} of {patients.length} results</span>
            <div class="flex items-center gap-2">
              <button class="h-8 w-8 rounded-lg border border-neutral-200 hover:bg-neutral-50">{'<'}</button>
              <button class="h-8 w-8 rounded-lg bg-primary text-white">1</button>
              <button class="h-8 w-8 rounded-lg border border-neutral-200 hover:bg-neutral-50">{'>'}</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</div>
