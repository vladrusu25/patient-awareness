function normalizeOrigin(value: string): string {
  return value.replace(/\/+$/, '');
}

export function resolveSiteOrigin(fallback: string): string {
  const configuredRaw = (import.meta.env.PUBLIC_SITE_ORIGIN ?? '').toString().trim();
  if (configuredRaw) {
    return normalizeOrigin(configuredRaw);
  }
  return normalizeOrigin(fallback);
}
