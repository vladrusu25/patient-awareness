<script lang="ts">
  import type { PatientLike } from '$lib/types/admin';

  export let patients: PatientLike[] = [];
  export let onViewAll: () => void = () => {};

  // Accepts Date, ISO string, or null and returns a small "when" label
  function fmtWhen(d: string | Date | null | undefined): string {
    if (!d) return '—';
    const dt = d instanceof Date ? d : new Date(d);
    if (Number.isNaN(dt.getTime())) return '—';

    const now = Date.now();
    const diffMs = now - dt.getTime();
    const diffMin = Math.floor(diffMs / (60 * 1000));
    const diffHr = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHr / 24);

    if (diffMin < 1) return 'now';
    if (diffMin < 60) return `${diffMin} min ago`;
    if (diffHr < 24) return `${diffHr} h ago`;
    if (diffDay === 1) return 'yesterday';
    return `${diffDay} days ago`;
  }
</script>

<!-- rest of your component stays the same; use {fmtWhen(p.lastAssessmentAt)} where needed -->
