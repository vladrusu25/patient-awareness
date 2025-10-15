import { browser } from '$app/environment';
import { derived, writable, get } from 'svelte/store';
import type { Language } from './types';
import { translations } from './translations';
import { translationsKz } from './translations.kz';

const DEFAULT_LANGUAGE: Language = 'en';
const STORAGE_KEY = 'patient-awareness:lang';

function isLanguage(value: unknown): value is Language {
  return value === 'en' || value === 'ru' || value === 'kz';
}

function format(template: string, params?: Record<string, string | number>): string {
  if (!params) return template;
  return template.replace(/{{\s*(\w+)\s*}}/g, (_, key: string) => {
    const value = params[key];
    return value == null ? '' : String(value);
  });
}

function resolvePath(key: string): unknown {
  return key.split('.').reduce<unknown>((acc, part) => {
    if (typeof acc === 'object' && acc && part in acc) {
      return (acc as Record<string, unknown>)[part];
    }
    return undefined;
  }, translations as unknown);
}

function resolvePathKz(key: string): unknown {
  return key.split('.').reduce<unknown>((acc, part) => {
    if (typeof acc === 'object' && acc && part in acc) {
      return (acc as Record<string, unknown>)[part];
    }
    return undefined;
  }, translationsKz as unknown);
}

function isLeaf(value: unknown): value is Record<Language, string> {
  if (!value || typeof value !== 'object') return false;
  return 'en' in (value as Record<string, unknown>);
}

export const language = writable<Language>(DEFAULT_LANGUAGE);

if (browser) {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (isLanguage(stored)) {
    language.set(stored);
  }

  language.subscribe((value) => {
    window.localStorage.setItem(STORAGE_KEY, value);
    document.documentElement.lang = value === 'kz' ? 'kk' : value;
  });
}

export const t = derived(language, ($language) => {
  return (key: string, params?: Record<string, string | number>): string => {
    const resolved = resolvePath(key);
    if ($language === 'kz') {
      const override = resolvePathKz(key);
      if (typeof override === 'string') {
        return format(override, params);
      }
    }
    if (typeof resolved === 'string') {
      return format(resolved, params);
    }
    if (isLeaf(resolved)) {
      if ($language === 'kz') {
        const override = resolvePathKz(key);
        if (typeof override === 'string') {
          return format(override, params);
        }
      }
      const template = resolved[$language] ?? resolved.en;
      return format(template, params);
    }
    if (resolved && typeof resolved === 'object') {
      const fallback = (resolved as Record<string, unknown>).en;
      if (typeof fallback === 'string') {
        return format(fallback, params);
      }
    }
    return format(key, params);
  };
});

export function getCurrentLanguage(): Language {
  return get(language);
}

export async function switchLanguage(lang: Language): Promise<void> {
  if (!isLanguage(lang)) return;
  language.set(lang);

  if (browser) {
    try {
      await fetch('/api/language', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ language: lang })
      });
    } catch (error) {
      console.error('Failed to persist language', error);
    }
  }
}
