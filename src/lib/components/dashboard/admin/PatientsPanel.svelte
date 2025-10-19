<script lang="ts">
  import { t, language } from '$lib/i18n';
  import type { PatientLike } from '$lib/types/admin';

  export let patients: PatientLike[] = [];

  $: locale =
    $language === 'ru'
      ? 'ru-RU'
      : $language === 'kz'
        ? 'kk-KZ'
        : $language === 'hr'
          ? 'hr-HR'
          : $language === 'sk'
            ? 'sk-SK'
            : 'en-US';
  $: rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
  $: dateFormatter = new Intl.DateTimeFormat(locale, { year: 'numeric', month: 'short', day: 'numeric' });

  function fmtWhen(d: string | Date | null | undefined): string {
    if (!d) return $t('admin.patients.noDate');
    const dt = d instanceof Date ? d : new Date(d);
    if (Number.isNaN(dt.getTime())) return $t('admin.patients.noDate');

    const diffMs = Date.now() - dt.getTime();
    const diffMinutes = Math.round(diffMs / 60000);
    if (Math.abs(diffMinutes) < 60) return rtf.format(-diffMinutes, 'minute');

    const diffHours = Math.round(diffMinutes / 60);
    if (Math.abs(diffHours) < 24) return rtf.format(-diffHours, 'hour');

    const diffDays = Math.round(diffHours / 24);
    if (Math.abs(diffDays) <= 30) return rtf.format(-diffDays, 'day');

    return dateFormatter.format(dt);
  }

  const severityClasses: Record<'low' | 'medium' | 'high', string> = {
    low: 'bg-emerald-50 text-emerald-700',
    medium: 'bg-amber-50 text-amber-700',
    high: 'bg-red-50 text-red-700'
  };
</script>

<div class="rounded-2xl bg-white ring-1 ring-black/5 p-5 md:p-6 flex flex-col w-full">
  <h2 class="text-lg font-semibold mb-4">{$t('admin.patients.title')}</h2>

  {#if patients.length === 0}
    <p class="text-sm text-neutral-500">{$t('admin.patients.empty')}</p>
  {:else}
    <ul class="space-y-3">
      {#each patients as p}
        <li class="flex items-center gap-3 rounded-xl border border-neutral-100 p-3">
          <div class="flex items-center gap-3 flex-1 min-w-0">
            <div class="h-10 w-10 rounded-full bg-primary/10 text-primary grid place-items-center font-semibold">{p.initials}</div>
            <div class="min-w-0">
              <div class="font-heading text-sm text-neutral-900 truncate">{p.name}</div>
              <div class="text-xs text-neutral-500">{$t('admin.patients.headers.lastSeen')}: {fmtWhen(p.lastAssessmentAt)}</div>
            </div>
          </div>

          <div class="flex items-center gap-3 text-xs">
            <span class={`rounded-full px-2 py-1 ${severityClasses[p.severity]}`}>{$t(`admin.patients.severity.${p.severity}`)}</span>
            <span class="rounded-full px-2 py-1 bg-neutral-100 text-neutral-600">{$t(`admin.patients.status.${p.status}`)}</span>
            {#if p.flags?.length}
              <span class="rounded-full px-2 py-1 bg-purple-50 text-purple-600 uppercase text-[11px]">{p.flags.join(', ')}</span>
            {/if}
          </div>
        </li>
      {/each}
    </ul>
  {/if}
</div>
