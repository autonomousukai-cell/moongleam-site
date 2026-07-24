'use client';

import Link from 'next/link';
import SceneBackdrop from './SceneBackdrop';
import {
  ZW,
  ZONE_BACKDROPS,
  ABOUT_ROOM,
  type Layers,
  zoneShell,
  ovAlpha,
  setOverlay,
} from './journey';

/**
 * ROOM A — THE STUDIO STORY. The first room off reception: a dark gallery
 * hall where the studio's history hangs as backlit plates. Content mirrors
 * /about (single source: ABOUT_ROOM in journey.ts) — London, 500+ UK
 * businesses, six sectors, full A-to-Z in-house.
 *
 * Layer contract (written by renderAbout every frame):
 *   abt       — group opacity/visibility (zoneShell)
 *   abtInner  — walk-forward settle (zoneShell)
 *   abtG1/G2  — gallery-plate depth parallax
 *   abtOv     — headline + copy overlay
 *   abtHs     — glance-plaque wall gate
 */
export function renderAbout(el: Layers, p: number) {
  const { alpha, local } = zoneShell(el, 'abt', p, ZW.about);
  const ov = ovAlpha(local, 0.16, 0.36) * (alpha > 0 ? 1 : 0);
  setOverlay(el.abtOv, ov);
  if (el.abtHs) {
    el.abtHs.style.opacity = ov.toFixed(3);
    el.abtHs.style.pointerEvents = ov > 0.6 ? 'auto' : 'none';
  }
  if (alpha <= 0) return;
  const d = local - 0.5;
  if (el.abtG1) el.abtG1.style.transform = `translateY(${(d * -22).toFixed(1)}px)`;
  if (el.abtG2) el.abtG2.style.transform = `translateY(${(d * -38).toFixed(1)}px)`;
}

/** The story in three gallery stats — the numbers the plates celebrate. */
const STATS = [
  { n: '500+', l: 'UK businesses' },
  { n: '6', l: 'Sectors served' },
  { n: 'A–Z', l: 'In-house pipeline' },
] as const;

export default function SceneAbout() {
  return (
    <div
      data-mgst="abt"
      className="pointer-events-none absolute inset-0 opacity-0"
      style={{ visibility: 'hidden' }}
    >
      <div data-mgst="abtInner" className="absolute inset-0 origin-center will-change-transform">
        {/* the rendered set — the studio's story gallery */}
        <SceneBackdrop src={ZONE_BACKDROPS.about} />
      </div>

      {/* ---- overlay: the story ---- */}
      <div
        data-mgst="abtOv"
        className="pointer-events-none absolute inset-x-0 top-[7%] z-20 px-6 text-center opacity-0"
      >
        <p className="text-[10px] uppercase tracking-[0.5em] text-moon-soft">
          03 · The Studio Story
        </p>
        <h2 className="mx-auto mt-3 max-w-2xl text-balance text-[clamp(1.4rem,3vw,2.4rem)] font-medium leading-snug text-white [font-family:var(--font-studio-display)] [text-shadow:0_2px_30px_rgba(0,0,0,0.8)]">
          {ABOUT_ROOM.headline}
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-balance text-sm leading-relaxed text-moon [text-shadow:0_2px_24px_rgba(0,0,0,0.9)]">
          {ABOUT_ROOM.lead}
        </p>
      </div>

      {/* ---- the glance wall: stat plinths + backlit plaques ---- */}
      <div data-mgst="abtHs" className="absolute inset-0 z-20 opacity-0" style={{ pointerEvents: 'none' }}>
        <div className="absolute inset-x-0 bottom-[9%] flex flex-col items-center gap-5 px-6">
          <div data-mgst="abtG1" className="flex items-stretch gap-4 will-change-transform">
            {STATS.map((s) => (
              <div
                key={s.l}
                className="mgst-holo-panel min-w-[8.5rem] rounded-sm px-5 py-3.5 text-center"
              >
                <p className="text-2xl font-medium text-gleam [font-family:var(--font-studio-display)]">
                  {s.n}
                </p>
                <p className="mt-1 text-[9px] uppercase tracking-[0.26em] text-moon-soft">{s.l}</p>
              </div>
            ))}
          </div>
          <div
            data-mgst="abtG2"
            className="flex max-w-3xl flex-wrap items-center justify-center gap-2 will-change-transform"
          >
            {ABOUT_ROOM.glance.map((g) => (
              <span
                key={g}
                className="border border-white/15 bg-black/45 px-3.5 py-1.5 text-[10px] uppercase tracking-[0.16em] text-moon backdrop-blur-sm [clip-path:polygon(6px_0,100%_0,100%_calc(100%-6px),calc(100%-6px)_100%,0_100%,0_6px)]"
              >
                {g}
              </span>
            ))}
          </div>
          <Link
            href="/about"
            className="mgst-hud-btn-ghost pointer-events-auto !px-6 !py-2.5 !text-xs"
          >
            Read the full story
          </Link>
        </div>
      </div>
    </div>
  );
}
