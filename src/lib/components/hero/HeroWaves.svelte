<script lang="ts">
  // You can tweak these if you want slightly lighter/darker ribbons
  export let topOpacity = 0.04;    // very soft band near the top
  export let midOpacity = 0.05;    // thin highlight band
  export let bottomOpacity = 0.06; // large sweeping base ribbon
</script>

<svg
  class="absolute inset-0 w-full h-full"
  viewBox="0 0 1440 420"
  preserveAspectRatio="none"
  aria-hidden="true"
>
  <defs>
    <!-- soft white tint grads so the base gradient shows through -->
    <linearGradient id="wf-top" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0"   stop-color="#FFFFFF" stop-opacity="{topOpacity}" />
      <stop offset="1"   stop-color="#FFFFFF" stop-opacity="0" />
    </linearGradient>

    <linearGradient id="wf-mid" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0"   stop-color="#FFFFFF" stop-opacity="{midOpacity}" />
      <stop offset="1"   stop-color="#FFFFFF" stop-opacity="0" />
    </linearGradient>

    <linearGradient id="wf-bot" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0"   stop-color="#FFFFFF" stop-opacity="{bottomOpacity}" />
      <stop offset="1"   stop-color="#FFFFFF" stop-opacity="0" />
    </linearGradient>
  </defs>

  <!-- TOP RIBBON (thin, gently sagging) -->
  <!-- Matches the “slim arc” that starts high left then dips then rises right -->
  <path
    fill="url(#wf-top)"
    d="
      M0,70
      C 320,95 760,120 1110,105
      C 1270,98 1375,85 1440,78
      L 1440,0 L 0,0 Z
    "
  />

  <!-- MID HIGHLIGHT (subtle, sits behind headline line) -->
  <path
    fill="url(#wf-mid)"
    d="
      M0,180
      C 240,205 520,220 820,230
      C 1060,238 1240,228 1440,200
      L 1440,250
      C 1250,288 1010,300 740,292
      C 430,283 180,250 0,230 Z
    "
  />

  <!-- LARGE BOTTOM SWEEP (broad curve that “hugs” the bottom edge) -->
  <path
    fill="url(#wf-bot)"
    d="
      M0,310
      C 260,380 820,420 1200,410
      C 1340,406 1440,392 1440,392
      L 1440,420 L 0,420 Z
    "
  />
</svg>
