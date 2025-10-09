// src/lib/assessment/summary.ts
import type { AnswerMap, LikertValue } from './types';
import { PAIRS, LIKERT_KEYS, PCS_ITEMS, PVVQ_ORDER } from './labels';
import type { Language } from '$lib/i18n/types';
import { getReportLocale } from './report-i18n';

const EN_LOCALE = getReportLocale('en');

/** ---------------- Part 1 lines (existing) ---------------- */
export function buildPart1Lines(answers: AnswerMap, lang: Language = 'en'): string[] {
  const out: string[] = [];
  const locale = getReportLocale(lang);

  for (const [ynKey, intKey, labelKey] of PAIRS) {
    const yn = (answers[ynKey] ?? '').toString().toLowerCase();
    const label = locale.part1Labels[labelKey] ?? EN_LOCALE.part1Labels[labelKey];

    if (yn === 'yes') {
      const intensityRaw = (answers[intKey] ?? '').toString().trim();
      const intensity = intensityRaw ? `${intensityRaw}/10` : locale.bool.na;
      out.push(`${label}: ${locale.bool.yes} - ${intensity}`);
    } else if (yn === 'no') {
      out.push(`${label}: ${locale.bool.no}`);
    } else {
      out.push(`${label}: ${locale.bool.na}`);
    }
  }

  for (const [key, lk] of LIKERT_KEYS) {
    const label = locale.part1Labels[lk] ?? EN_LOCALE.part1Labels[lk];
    const rawValue = (answers[key] ?? '').toString().trim().toLowerCase();

    let pretty = locale.bool.na;
    if (rawValue === 'never' || rawValue === 'sometimes' || rawValue === 'often' || rawValue === 'always') {
      pretty = locale.likert[rawValue as keyof typeof locale.likert];
    } else if (rawValue) {
      pretty = rawValue[0].toUpperCase() + rawValue.slice(1);
    }

    out.push(`${label}: ${pretty}`);
  }

  return out;
}

/** ---------------- Part 2 (PCS) lines ---------------- */
export function buildPart2Lines(answers: AnswerMap, lang: Language = 'en'): string[] {
  const locale = getReportLocale(lang);
  const out: string[] = [];

  for (const [key] of PCS_ITEMS) {
    const raw = (answers[key] ?? '').toString().trim().toLowerCase();
    let pretty = locale.bool.na;
    if (raw === 'yes') pretty = locale.bool.yes;
    else if (raw === 'no') pretty = locale.bool.no;
    else if (raw === 'unsure') pretty = locale.bool.unsure;

    const label = locale.pcsLabels[key] ?? EN_LOCALE.pcsLabels[key] ?? key;
    out.push(`${label}: ${pretty}`);
  }
  return out;
}

/** ---------------- Part 3 (PVVQ) lines ---------------- */
export function buildPart3Lines(answers: AnswerMap, lang: Language = 'en'): string[] {
  const locale = getReportLocale(lang);
  const out: string[] = [];

  for (const key of PVVQ_ORDER) {
    const label = locale.pvvqLabels[key] ?? EN_LOCALE.pvvqLabels[key] ?? key;
    const raw = (answers[key] ?? '').toString().trim();
    const display = raw ? locale.formatPart3Value(raw) : locale.bool.na;
    out.push(`${label}: ${display}`);
  }
  return out;
}

/** Convenience helper to know if a part has any answers */
export function hasAny(answers: AnswerMap, keys: string[]): boolean {
  return keys.some((k) => answers[k] !== undefined && answers[k] !== null);
}
