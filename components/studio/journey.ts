/**
 * /studio — journey configuration + math helpers.
 *
 * The whole cinematic tour is driven by ONE value: scroll progress (0–1) over
 * the tall scroll track in <CinematicJourney>. Every layer, overlay, door and
 * particle system derives its state from that value, so the journey is fully
 * reversible and scrub-accurate.
 *
 * PHASE 2: the journey now spans all 8 zones. Phase-1 (exterior → reception)
 * keeps its exact internal beat structure, remapped into the global window
 * [0, P1_END]; the six new rooms each occupy an equal window after it and
 * share one "walk-forward" transition grammar (zoneShell).
 *
 * REAL-FOOTAGE DROP-IN POINT: when the AI-generated walkthrough frames exist
 * (Veo/Higgsfield pipeline), export them as a numbered image sequence into
 * /public/studio/frames/ and list the URLs in FRAME_MANIFEST below. The
 * <FrameSequenceCanvas> engine (already wired in CinematicJourney) preloads
 * and scrubs them by the same progress value — the procedural CSS sets are
 * then automatically replaced. Zero refactor of overlays/nav/zones needed.
 */

/* ------------------------------ math helpers ------------------------------ */

export const clamp01 = (x: number) => Math.min(1, Math.max(0, x));

/** Local progress (0–1) of `p` within the [a, b] window. */
export const seg = (p: number, a: number, b: number) =>
  b <= a ? 0 : clamp01((p - a) / (b - a));

/** Smoothstep — gentle ease for camera moves. */
export const smooth = (t: number) => {
  const x = clamp01(t);
  return x * x * (3 - 2 * x);
};

/** Cubic ease-out — for "arriving"/settling moves. */
export const easeOut = (t: number) => 1 - Math.pow(1 - clamp01(t), 3);

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/* ------------------------------ frame manifest ---------------------------- */

/**
 * Real cinematic frames (empty = procedural placeholder sets render instead).
 * Expected: 120–240 frames, e.g.
 *   Array.from({ length: 180 }, (_, i) =>
 *     `/studio/frames/tour_${String(i).padStart(4, '0')}.webp`)
 */
export const FRAME_MANIFEST: string[] = [];

/* ----------------------------- zone backdrops ----------------------------- */

/**
 * Bespoke AI-rendered studio scenes (Moon Gleam's own pipeline, one per zone)
 * — the real "sets" behind every room, layered under the depth/particle/
 * letterbox grammar. Preloaded by StudioTour during the branded loader.
 */
export const ZONE_BACKDROPS = {
  exterior: '/studio/exterior.webp',
  reception: '/studio/reception.webp',
  about: '/studio/about.webp',
  services: '/studio/services.webp',
  soundstage: '/studio/soundstage.webp',
  pipeline: '/studio/pipeline.webp',
  suite: '/studio/suite.webp',
  screening: '/studio/screening.webp',
  pricing: '/studio/pricing.webp',
  blog: '/studio/blog.webp',
  booking: '/studio/booking.webp',
} as const;

/** Timecode readout for the film-timeline rail — the journey as a 60s reel. */
export const timecodeAt = (p: number): string => {
  const frames = Math.round(clamp01(p) * 60 * 24);
  const ss = Math.floor(frames / 24);
  const ff = frames % 24;
  return `00:00:${String(ss).padStart(2, '0')}:${String(ff).padStart(2, '0')}`;
};

/* ------------------------------ scroll track ------------------------------ */

/**
 * Height of the scroll track in vh — sets the pace of the whole journey.
 * Phase 1 keeps its approved 620vh of travel (= P1_END of the track); the
 * nine rooms after it get ~293vh each — the same dwell rhythm the six-room
 * cut shipped with.
 */
export const TRACK_VH = 3260;

/* ------------------------- Phase-1 timeline (local) ----------------------- *
 * Progress windows for each beat of the Phase-1 sequence, in PHASE-1 LOCAL   *
 * space (0–1 across [0, P1_END] of the global journey). The engine feeds     *
 * them p1 = p / P1_END so the exterior → reception choreography is           *
 * byte-for-byte the approved Phase-1 experience.                             */
export const T = {
  /** Zone-1 hero titles visible, then fade as the dolly starts. */
  titleOut: [0.05, 0.18] as const,
  hintOut: [0.02, 0.1] as const,
  /** Continuous dolly-in toward the entrance. */
  dolly: [0, 0.66] as const,
  /** Cinematic letterbox bars during the transit. */
  bars: [0.22, 0.4] as const,
  barsOut: [0.8, 0.92] as const,
  /** Entrance doors slide open as the camera reaches them. */
  doors: [0.46, 0.64] as const,
  /** Threshold light bloom while passing through the doorway. */
  flash: [0.54, 0.78] as const,
  /** Exterior fades out / reception fades in. */
  cross: [0.6, 0.72] as const,
  /** Camera settles inside: scale 1.22→1, focus pull 10px→0. */
  arrive: [0.62, 0.9] as const,
  /** Zone-2 welcome overlay. */
  welcome: [0.82, 0.93] as const,
};

/** Global progress where Phase 1 (exterior → reception) ends. */
export const P1_END = 0.19;

/* --------------------------- Phase-2 zone windows -------------------------- */

/** Length of the walk-forward crossfade between rooms (global progress). */
export const XFADE = 0.05;

/**
 * Global [start, end] windows for the nine Phase-2 rooms. A room fades in
 * over [start, start+XFADE], dwells, and fades out over [end, end+XFADE]
 * (which is the next room's fade-in — one continuous walk). Booking's end
 * sits beyond 1 so the journey finishes inside it.
 *
 * Journey (whole-site edition): exterior → reception → studio story (About)
 * → service bays (Services + Sectors) → soundstage → pipeline → render suite
 * → portfolio wall (full archive) → rate card (Pricing) → story archive
 * (Blog) → contact lobby / footer wall. The old Creative Lab beat is
 * consolidated into the service bays so the pacing stays cinematic.
 */
export const ZW = {
  about: [0.19, 0.28] as const,
  services: [0.28, 0.37] as const,
  stage: [0.37, 0.46] as const,
  pipeline: [0.46, 0.55] as const,
  suite: [0.55, 0.64] as const,
  screening: [0.64, 0.73] as const,
  pricing: [0.73, 0.82] as const,
  blog: [0.82, 0.91] as const,
  booking: [0.91, 1.2] as const,
};

/** Room boundaries — used for the transit letterbox bars. */
export const ZONE_STARTS = [
  ZW.about[0],
  ZW.services[0],
  ZW.stage[0],
  ZW.pipeline[0],
  ZW.suite[0],
  ZW.screening[0],
  ZW.pricing[0],
  ZW.blog[0],
  ZW.booking[0],
];

/* ------------------------- shared render helpers --------------------------- */

/** The engine's layer registry: [data-mgst] key → element. */
export type Layers = Record<string, HTMLElement>;

/**
 * The shared room grammar: drives `{prefix}` (group opacity/visibility) and
 * `{prefix}Inner` (walk-forward settle: scale 1.16→1 + focus pull on entry,
 * scale up 1→1.18 on exit) from the room's global window. Returns the room's
 * current alpha and local progress for zone-specific choreography.
 */
export function zoneShell(
  el: Layers,
  prefix: string,
  p: number,
  window: readonly [number, number],
): { alpha: number; local: number } {
  const [start, end] = window;
  const alpha =
    smooth(seg(p, start, start + XFADE)) * (1 - smooth(seg(p, end, end + XFADE)));
  const local = seg(p, start, Math.min(end, 1));

  const g = el[prefix];
  if (g) {
    g.style.opacity = alpha.toFixed(3);
    g.style.visibility = alpha <= 0 ? 'hidden' : 'visible';
  }
  const inner = el[`${prefix}Inner`];
  if (inner) {
    const settle = easeOut(seg(p, start, start + XFADE * 1.7));
    const exit = smooth(seg(p, end, end + XFADE));
    const scale = lerp(1.16, 1, settle) * lerp(1, 1.18, exit);
    inner.style.transform = `scale(${scale.toFixed(4)})`;
    const blur = lerp(8, 0, settle);
    inner.style.filter =
      alpha > 0 && blur > 0.4 ? `blur(${blur.toFixed(1)}px)` : 'none';
  }
  return { alpha, local };
}

/** Overlay reveal — fades/rises in once the camera has settled in the room. */
export const ovAlpha = (local: number, from = 0.22, to = 0.44) =>
  smooth(seg(local, from, to));

/** Write an overlay layer: fade + rise + pointer-events gate. */
export const setOverlay = (n: HTMLElement | undefined, a: number, rise = 26) => {
  if (!n) return;
  n.style.opacity = a.toFixed(3);
  n.style.transform = `translateY(${((1 - a) * rise).toFixed(1)}px)`;
  n.style.pointerEvents = a > 0.6 ? 'auto' : 'none';
};

/* ------------------------------ zones + nav ------------------------------- */

export type StudioZone = {
  key: string;
  label: string;
  /** Progress the camera flies to when clicked. */
  target: number;
};

/**
 * The holographic Studio Map — one waypoint per destination so every room of
 * the site is one click away (Azhar: Home, About, Services, Portfolio,
 * Pricing, Blog, Contact — plus the cinematic production run in between).
 * Targets land mid-dwell, where each room's overlay is fully revealed.
 */
export const STUDIO_ZONES: StudioZone[] = [
  { key: 'exterior', label: 'Home', target: 0 },
  { key: 'about', label: 'About', target: 0.235 },
  { key: 'services', label: 'Services', target: 0.325 },
  { key: 'production', label: 'Production', target: 0.415 },
  { key: 'portfolio', label: 'Portfolio', target: 0.685 },
  { key: 'pricing', label: 'Pricing', target: 0.775 },
  { key: 'blog', label: 'Blog', target: 0.865 },
  { key: 'contact', label: 'Contact', target: 0.96 },
];

/** Where the camera currently is, for the progress rail + nav highlight.
    Boundaries sit mid-crossfade (window start + XFADE/2). The three
    cinematic rooms (soundstage/pipeline/suite) share the 'production'
    waypoint on the map. */
const ZONE_AT: Array<[number, string]> = [
  [0.135, 'exterior'],
  [0.215, 'reception'],
  [0.305, 'about'],
  [0.395, 'services'],
  [0.665, 'production'],
  [0.755, 'portfolio'],
  [0.845, 'pricing'],
  [0.935, 'blog'],
  [Infinity, 'contact'],
];
export const zoneAt = (p: number): string =>
  (ZONE_AT.find(([end]) => p < end) as [number, string])[1];

const ZONE_LABEL_AT: Array<[number, string]> = [
  [0.088, 'Exterior'],
  [0.125, 'Entrance'],
  [0.215, 'Reception'],
  [0.305, 'Studio Story'],
  [0.395, 'Service Bays'],
  [0.485, 'Soundstage'],
  [0.575, 'Pipeline'],
  [0.665, 'Render Suite'],
  [0.755, 'Portfolio Wall'],
  [0.845, 'Rate Card'],
  [0.935, 'Story Archive'],
  [Infinity, 'Contact'],
];
export const zoneLabelAt = (p: number): string =>
  (ZONE_LABEL_AT.find(([end]) => p < end) as [number, string])[1];

/** Rail tick positions (fraction of the journey) — one per zone. */
export const ZONE_TICKS = STUDIO_ZONES.map((z) => ({
  key: z.key,
  label: z.label,
  at: z.target,
}));

/* --------------------------- shared zone content --------------------------- */

/** Zone 5 — the production pipeline stations, in order. */
export const PIPELINE_STEPS = [
  'Concept',
  'Script',
  'Visual Development',
  'AI Generation',
  'Voice & Sound',
  'Edit',
  'Final Film',
];

/** The Studio Story room — copy mirrored from /about (single source: that
    page's approved wording; update both together). */
export const ABOUT_ROOM = {
  headline: 'A video studio built for the AI era.',
  lead:
    'Moon Gleam is a London AI video production studio serving UK businesses — from local shops and restaurants to law firms, charities and schools. 500+ served and counting.',
  body:
    'Broadcast production standards combined with genuine command of creative AI — one in-house pipeline from concept, script and storyboard through production, edit, grade, sound and delivery. One team, from brief to broadcast.',
  glance: [
    '500+ UK businesses served',
    'Eight video formats produced in-house',
    'Broadcast-standard, clearance-ready TVCs',
    'AI, live-action and hybrid workflows',
    'Full A-to-Z pipeline — no outsourcing',
    'Based in London, working UK-wide',
  ],
} as const;

/** The render-suite proof points. */
export const SUITE_PROOFS = [
  'Creative direction',
  'Cinematic post-production',
  'Delivery built for every platform',
];

/* ------------------------------ palette ----------------------------------- *
 * Studio accents per the brief: black/charcoal/silver/deep navy base with    *
 * electric cyan, violet and warm amber accents. Amber = brand `gleam` token. */
export const PALETTE = {
  navy: '#070B14',
  charcoal: '#0E1016',
  cyan: '#5BE3FF',
  violet: '#8B7CF6',
  amber: '#E9C46A', // = tailwind `gleam`
  silver: '#C7CCD1', // = tailwind `moon`
};
