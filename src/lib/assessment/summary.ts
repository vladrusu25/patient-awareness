// src/lib/assessment/summary.ts
import type { AnswerMap } from './types';
import { PCS_ITEMS, PVVQ_ORDER } from './labels';
import { PART1_SECTIONS, Part1Group, Part1SubEntry } from './part1';
import type { Language } from '$lib/i18n/types';
import { getReportLocale } from './report-i18n';
import { translateReportText } from './report-texts';

const EN_LOCALE = getReportLocale('en');

/** ---------------- Part 1 lines (existing) ---------------- */
export function buildPart1Lines(answers: AnswerMap, lang: Language = 'en'): string[] {
  const out: string[] = [];
  const locale = getReportLocale(lang);
  const translate = (value: string) => translateReportText(value, lang);

  let isFirstSection = true;
  for (const section of PART1_SECTIONS) {
    if (!isFirstSection) {
      out.push('');
    }
    isFirstSection = false;

    out.push(`**${section.id}. ${translate(section.title)}**`);

    let sectionNote: string | null = null;
    if (section.statusKey) {
      const statusValue = formatYesNo(answers[section.statusKey], locale);
      if (statusValue && statusValue !== locale.bool.na) {
        const label = section.statusLabel ?? 'Status';
        sectionNote = `${translate(label)}: ${statusValue}`;
      }
    }

    let isFirstGroup = true;
    for (const group of section.groups) {
      renderGroup(out, group, answers, locale, translate, isFirstGroup ? sectionNote : null);
      isFirstGroup = false;
      sectionNote = null;
    }
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

function renderGroup(
  out: string[],
  group: Part1Group,
  answers: AnswerMap,
  locale: ReturnType<typeof getReportLocale>,
  translate: (text: string) => string,
  extraNote?: string | null
) {
  const [primary, ...children] = group.entries;
  const primaryRaw = answers[primary.key];
  const primaryDisplay = formatEntryValue(primary, primaryRaw, locale);
  let line = `${primary.code}. ${translate(primary.label)}: ${primaryDisplay}`;

  const notes: string[] = [];
  if (group.noteKey) {
    const rawNote = answers[group.noteKey];
    const text =
      typeof group.noteFormatter === 'function'
        ? group.noteFormatter(rawNote == null ? null : String(rawNote))
        : null;
    if (text) {
      notes.push(translate(text));
    }
  }
  if (extraNote) {
    notes.push(extraNote);
  }
  if (notes.length) {
    line += ` (${notes.join('; ')})`;
  }

  const parentAffirmative = isAffirmative(primaryRaw);
  if (!parentAffirmative && children.length) {
    out.push(line);
    return;
  }

  out.push(line);

  for (const entry of children) {
    const value = formatEntryValue(entry, answers[entry.key], locale);
    out.push(`${entry.code}. ${translate(entry.label)}: ${value}`);
  }
}

function isAffirmative(raw: unknown): boolean {
  if (typeof raw !== 'string') return false;
  const value = raw.trim().toLowerCase();
  return value === 'yes';
}

function formatEntryValue(
  entry: Part1SubEntry,
  raw: unknown,
  locale: ReturnType<typeof getReportLocale>
): string {
  return entry.type === 'scale' ? formatScale(raw, locale) : formatYesNo(raw, locale);
}

function formatYesNo(raw: unknown, locale: ReturnType<typeof getReportLocale>): string {
  if (raw === undefined || raw === null) return locale.bool.na;
  const value = String(raw).trim().toLowerCase();
  if (value === 'yes') return locale.bool.yes;
  if (value === 'no') return locale.bool.no;
  if (value === 'unsure') return locale.bool.unsure;
  if (value) return value[0].toUpperCase() + value.slice(1);
  return locale.bool.na;
}

function formatScale(raw: unknown, locale: ReturnType<typeof getReportLocale>): string {
  if (raw === undefined || raw === null) return locale.bool.na;
  const numeric = Number(raw);
  if (!Number.isNaN(numeric)) {
    const clamped = Math.max(0, Math.min(10, numeric));
    return `${clamped}/10`;
  }
  const text = String(raw).trim();
  return text ? text : locale.bool.na;
}
