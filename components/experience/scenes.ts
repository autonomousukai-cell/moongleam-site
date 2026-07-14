/**
 * Scene + zone configuration for the /experience "AI studio walkthrough".
 *
 * The entire experience is driven by ONE value: `scrollProgress` (0–1), produced
 * by a single master GSAP ScrollTrigger in <StudioExperience>. Spec formula the
 * scrub reproduces:
 *   scrollPercentage = window.scrollY / (scrollHeight - innerHeight) * 100
 *
 * RIVE UPGRADE POINT (architecture): because every layer reads from this single
 * 0–1 progress, the image cross-fade below can later be swapped for a Rive
 * state-machine with a one-line change — `riveInput.value = progress * 100` — and
 * zero refactor of the zone/overlay logic. See StudioExperience.onUpdate.
 */

const CDN =
  'https://d8j0ntlcm91z4.cloudfront.net/user_3Aik900pJNIZAM1itTaGkIXE8Ga/';

export type SceneKey =
  | 'hero'
  | 'problems'
  | 'editing'
  | 'present'
  | 'screening'
  | 'pricing'
  | 'exit';

export type Scene = {
  key: SceneKey;
  src: string;
  alt: string;
  /** Active scroll-progress range (0–1) — when this scene is the hero image. */
  start: number;
  end: number;
  priority?: boolean;
};

export const scenes: Scene[] = [
  {
    key: 'hero',
    src: CDN + 'hf_20260714_003239_51f80628-eeb5-4648-be4a-4961559f402c.png',
    alt: 'Gleam the robot host operating a studio camera',
    start: 0.0,
    end: 0.14,
    priority: true,
  },
  {
    key: 'problems',
    src: CDN + 'hf_20260714_004016_df15e96b-5e63-4803-b078-969ad89594e5.png',
    alt: 'Gleam walking a wall of glowing problem cards',
    start: 0.14,
    end: 0.3,
  },
  {
    key: 'editing',
    src: CDN + 'hf_20260714_004019_97bab655-0d74-4b35-98c8-47337e514b5a.png',
    alt: 'Gleam typing at a video editing console',
    start: 0.3,
    end: 0.44,
  },
  {
    key: 'present',
    src: CDN + 'hf_20260714_004021_0186099e-d5b5-47ec-a332-b1dba1e0dfd1.png',
    alt: 'Gleam presenting a finished video, arms open in a ta-da',
    start: 0.44,
    end: 0.55,
  },
  {
    key: 'screening',
    src: CDN + 'hf_20260714_004024_fd82a06d-65e4-4354-87a7-5b09a0540280.png',
    alt: 'Gleam gesturing at a gallery wall of finished videos',
    start: 0.55,
    end: 0.72,
  },
  {
    key: 'pricing',
    src: CDN + 'hf_20260714_004027_6a5f0ae5-5342-41ac-b73d-d5c93818a15e.png',
    alt: 'Gleam at a pricing comparison desk',
    start: 0.72,
    end: 0.86,
  },
  {
    key: 'exit',
    src: CDN + 'hf_20260714_004029_7896195e-bac3-42af-8552-692dbb351968.png',
    alt: 'Gleam waving goodbye beside a booking desk',
    start: 0.86,
    end: 1.0,
  },
];

export type ZoneKey =
  | 'z1'
  | 'z2'
  | 'z3edit'
  | 'z3present'
  | 'z4'
  | 'z5'
  | 'z6';

/** Zone boundaries (match the scene ranges / brief). */
export function zoneOf(p: number): ZoneKey {
  if (p < 0.14) return 'z1';
  if (p < 0.3) return 'z2';
  if (p < 0.44) return 'z3edit';
  if (p < 0.55) return 'z3present';
  if (p < 0.72) return 'z4';
  if (p < 0.86) return 'z5';
  return 'z6';
}

export const zoneLabels: Record<ZoneKey, string> = {
  z1: 'Meet Gleam',
  z2: 'The Problem',
  z3edit: 'The Studio',
  z3present: 'The Reveal',
  z4: 'The Work',
  z5: 'The Value',
  z6: "Let's Talk",
};

/** Local progress (0–1) of `p` within a [start,end] window. */
export function seg(p: number, start: number, end: number): number {
  if (end <= start) return 0;
  return Math.min(1, Math.max(0, (p - start) / (end - start)));
}

/** Ease helper (smoothstep) for gentle reveals. */
export function smooth(t: number): number {
  const x = Math.min(1, Math.max(0, t));
  return x * x * (3 - 2 * x);
}
