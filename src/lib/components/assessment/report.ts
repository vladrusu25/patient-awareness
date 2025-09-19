// API client for report generation (no UI/DOM)
export type GenerateReportResult =
  | { ok: true; viewUrl: string; downloadUrl: string | null; ttlSeconds: number }
  | { ok: false; status: number; code?: string; message?: string };

export async function generateReportAndGetUrls(token: string): Promise<GenerateReportResult> {
  try {
    const res = await fetch(`/api/session/${encodeURIComponent(token)}/pdf`, {
      method: 'POST',
      headers: { 'cache-control': 'no-store' }
    });
    if (!res.ok) {
      return { ok: false, status: res.status };
    }
    const data = await res.json().catch(() => null);
    if (data?.ok && (data.viewUrl || data.downloadUrl)) {
      return {
        ok: true,
        viewUrl: data.viewUrl ?? '',
        downloadUrl: data.downloadUrl ?? null,
        ttlSeconds: Number(data.ttlSeconds ?? 600)
      };
    }
    return { ok: false, status: 500, code: 'bad_payload' };
  } catch {
    return { ok: false, status: 0, code: 'network' };
  }
}
