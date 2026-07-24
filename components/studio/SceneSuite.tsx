'use client';

import Hotspot from './Hotspot';
import SceneBackdrop from './SceneBackdrop';
import {
  ZW,
  ZONE_BACKDROPS,
  type Layers,
  zoneShell,
  ovAlpha,
  setOverlay,
  SUITE_PROOFS,
} from './journey';

/**
 * ZONE 6 — placeholder "set": the editing & render suite. A dark grading
 * theatre — one hero grade monitor flanked by a timeline wall and scopes,
 * with a live render bar. Cinematic, not a software dashboard: everything
 * is glow, glass and deep black.
 *
 * Layer contract (written by renderSuite every frame):
 *   suite       — group opacity/visibility (zoneShell)
 *   suiteInner  — walk-forward settle (zoneShell)
 *   suiteSplit  — grade screen before/after wipe (scroll-scrubbed)
 *   suiteOv     — zone overlay
 *   suiteHs     — hotspots gate
 */
export function renderSuite(el: Layers, p: number) {
  const { alpha, local } = zoneShell(el, 'suite', p, ZW.suite);
  const ov = ovAlpha(local) * (alpha > 0 ? 1 : 0);
  setOverlay(el.suiteOv, ov);
  if (el.suiteHs) {
    el.suiteHs.style.opacity = ov.toFixed(3);
    el.suiteHs.style.pointerEvents = ov > 0.6 ? 'auto' : 'none';
  }
}

export default function SceneSuite() {
  return (
    <div
      data-mgst="suite"
      className="pointer-events-none absolute inset-0 opacity-0"
      style={{ visibility: 'hidden' }}
    >
      <div data-mgst="suiteInner" className="absolute inset-0 origin-center will-change-transform">
        {/* the rendered set — grading desk, timelines, AI render farm */}
        <SceneBackdrop src={ZONE_BACKDROPS.suite} scrim="bottom" />

        {/* live render readout — floating console HUD over the desk */}
        <div className="mgst-holo-panel absolute left-1/2 top-[12%] w-[min(30vw,340px)] -translate-x-1/2 rounded-sm p-3">
          <div className="flex items-center justify-between text-[8px] uppercase tracking-[0.28em] text-moon-faint">
            <span>Rendering — final film</span>
            <span className="text-gleam/80">4K · 24fps</span>
          </div>
          <div className="relative mt-1.5 h-[3px] overflow-hidden rounded-full bg-white/10">
            <div className="mgst-render absolute inset-y-0 w-1/3 rounded-full bg-gradient-to-r from-transparent via-[#E9C46A] to-transparent" />
          </div>
        </div>
      </div>

      {/* ---- overlay ---- */}
      <div
        data-mgst="suiteOv"
        className="pointer-events-none absolute inset-x-0 bottom-[6%] z-20 px-6 text-center opacity-0"
      >
        <p className="text-[10px] uppercase tracking-[0.5em] text-moon-soft">
          06 · Editing &amp; Render Suite
        </p>
        <p className="mx-auto mt-3 max-w-2xl text-balance text-[clamp(1.4rem,3vw,2.4rem)] font-medium leading-snug text-white [font-family:var(--font-studio-display)] [text-shadow:0_2px_30px_rgba(0,0,0,0.8)]">
          Fast production. Film-level detail.
        </p>
        <div className="mx-auto mt-4 flex max-w-3xl flex-wrap items-center justify-center gap-2">
          {SUITE_PROOFS.map((s) => (
            <span
              key={s}
              className="rounded-full border border-white/15 bg-black/40 px-3.5 py-1.5 text-[10px] uppercase tracking-[0.18em] text-moon backdrop-blur-sm"
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* ---- hotspots ---- */}
      <div data-mgst="suiteHs" className="absolute inset-0 z-30 opacity-0" style={{ pointerEvents: 'none' }}>
        <div className="pointer-events-auto absolute left-[38%] top-[28%]">
          <Hotspot
            label="Colour grading"
            body="Every delivery is graded shot by shot — the same finishing pass whether it's a 15-second social cut or a broadcast TVC."
          />
        </div>
      </div>
    </div>
  );
}
