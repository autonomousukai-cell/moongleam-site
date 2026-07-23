/**
 * /studio — journey configuration + math helpers.
 *
 * The whole cinematic tour is driven by ONE value: scroll progress (0–1) over
 * the tall scroll track in <CinematicJourney>. Every layer, overlay, door and
 * particle system derives its state from that value, so the journey is fully
 * reversible and scrub-accurate.
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

/* ------------------------------ scroll track ------------------------------ */

/** Height of the scroll track in vh — sets the pace of the whole journey. */
export const TRACK_VH = 620;

/* ------------------------------ timeline ---------------------------------- *
 * Progress windows for each beat of the Phase-1 journey                      *
 * (exterior night → dolly to entrance → doors open → luxury reception).      */
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

/* ------------------------------ zones + nav ------------------------------- */

export type StudioZone = {
  key: string;
  label: string;
  /** Progress the camera flies to when clicked (null = Phase-2, not wired). */
  target: number | null;
};

/** Persistent nav panel. Phase 1 wires Exterior + Reception; rest upcoming. */
export const STUDIO_ZONES: StudioZone[] = [
  { key: 'exterior', label: 'Exterior', target: 0 },
  { key: 'reception', label: 'Reception', target: 0.88 },
  { key: 'lab', label: 'Lab', target: null },
  { key: 'soundstage', label: 'Soundstage', target: null },
  { key: 'process', label: 'Process', target: null },
  { key: 'portfolio', label: 'Portfolio', target: null },
  { key: 'contact', label: 'Contact', target: null },
];

/** Where the camera currently is, for the progress rail + nav highlight. */
export const zoneAt = (p: number): 'exterior' | 'reception' =>
  p < 0.6 ? 'exterior' : 'reception';

export const zoneLabelAt = (p: number) =>
  p < 0.46 ? 'Exterior' : p < 0.66 ? 'Entrance' : 'Reception';

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
