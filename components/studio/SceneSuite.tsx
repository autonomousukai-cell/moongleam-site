'use client';

import Hotspot from './Hotspot';
import {
  ZW,
  type Layers,
  zoneShell,
  ovAlpha,
  setOverlay,
  seg,
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
  if (alpha <= 0) return;
  // The ungraded half wipes away as the visitor crosses the room.
  if (el.suiteSplit) {
    const wipe = 62 - seg(local, 0.15, 0.8) * 62;
    el.suiteSplit.style.width = `${wipe.toFixed(1)}%`;
  }
}

const TIMELINE_ROWS = [
  ['#5BE3FF', [14, 22, 9, 18, 12]],
  ['#8B7CF6', [20, 10, 16, 8, 21]],
  ['#E9C46A', [8, 17, 12, 24, 10]],
] as const;

export default function SceneSuite() {
  return (
    <div
      data-mgst="suite"
      className="pointer-events-none absolute inset-0 opacity-0"
      style={{ visibility: 'hidden' }}
    >
      <div data-mgst="suiteInner" className="absolute inset-0 origin-center will-change-transform">
        {/* grading-theatre shell — the darkest room so far */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#030405_0%,#08090D_60%,#040507_100%)]" />
        {/* low amber bias light behind the monitor wall */}
        <div className="absolute inset-x-[18%] top-[16%] h-[46%] bg-[radial-gradient(60%_60%_at_50%_50%,rgba(233,196,106,0.07),transparent_75%)] blur-2xl" />

        {/* hero grade monitor */}
        <div className="absolute left-1/2 top-[17%] w-[min(46vw,640px)] -translate-x-1/2">
          <div className="overflow-hidden rounded-lg border border-[#181B22] shadow-[0_0_70px_-14px_rgba(233,196,106,0.35)]">
            <div className="relative aspect-video bg-[radial-gradient(110%_80%_at_50%_20%,#E9B45C_0%,#8A4A34_34%,#31182E_68%,#0C0714_100%)]">
              {/* subject silhouette on a ridge */}
              <div className="absolute inset-x-0 bottom-0 h-[30%] bg-[radial-gradient(130%_100%_at_40%_100%,#120A12_35%,transparent_72%)]" />
              <div className="absolute bottom-[26%] left-[44%] h-[16%] w-[3%] rounded-t-full bg-[#0D0810]" />
              {/* ungraded half — wiped away by scroll */}
              <div
                data-mgst="suiteSplit"
                className="absolute inset-y-0 left-0 w-[62%] overflow-hidden border-r border-white/40 backdrop-grayscale backdrop-brightness-[0.85]"
              >
                <span className="absolute left-2 top-2 rounded-sm bg-black/60 px-1.5 py-0.5 text-[8px] uppercase tracking-[0.24em] text-white/60">
                  Source
                </span>
              </div>
              <span className="absolute right-2 top-2 rounded-sm bg-black/60 px-1.5 py-0.5 text-[8px] uppercase tracking-[0.24em] text-gleam/80">
                Graded · Rec.709
              </span>
            </div>
          </div>
          {/* render bar under the hero monitor */}
          <div className="mx-auto mt-3 w-[70%]">
            <div className="flex items-center justify-between text-[8px] uppercase tracking-[0.28em] text-moon-faint">
              <span>Rendering — final film</span>
              <span className="text-gleam/80">4K · 24fps</span>
            </div>
            <div className="relative mt-1.5 h-[3px] overflow-hidden rounded-full bg-white/10">
              <div className="mgst-render absolute inset-y-0 w-1/3 rounded-full bg-gradient-to-r from-transparent via-[#E9C46A] to-transparent" />
            </div>
          </div>
        </div>

        {/* timeline wall — left */}
        <div className="absolute left-[7%] top-[30%] w-[20%] rounded-lg border border-[#161922] bg-[#07080C]/95 p-3 shadow-[0_0_40px_-12px_rgba(91,227,255,0.25)]">
          <p className="text-[8px] uppercase tracking-[0.28em] text-moon-faint">Edit · Timeline</p>
          <div className="mt-2.5 space-y-1.5">
            {TIMELINE_ROWS.map(([color, widths], r) => (
              <div key={r} className="flex h-2.5 gap-1">
                {widths.map((w, i) => (
                  <div
                    key={i}
                    className="rounded-[2px]"
                    style={{ width: `${w}%`, background: color, opacity: 0.55 }}
                  />
                ))}
              </div>
            ))}
          </div>
          {/* playhead */}
          <div className="relative mt-1 h-px bg-white/10">
            <div className="absolute -top-9 left-[38%] h-9 w-px bg-white/50" />
          </div>
        </div>

        {/* scopes — right */}
        <div className="absolute right-[7%] top-[30%] w-[17%] rounded-lg border border-[#161922] bg-[#07080C]/95 p-3 shadow-[0_0_40px_-12px_rgba(139,124,246,0.25)]">
          <p className="text-[8px] uppercase tracking-[0.28em] text-moon-faint">Scopes</p>
          {/* vectorscope */}
          <div className="mx-auto mt-2.5 aspect-square w-[62%] rounded-full border border-white/10 bg-[radial-gradient(circle_at_50%_50%,rgba(91,227,255,0.16),rgba(139,124,246,0.1)_45%,transparent_70%)]">
            <div className="mx-auto mt-[42%] h-3 w-3 rotate-45 bg-[rgba(233,196,106,0.35)] blur-[2px]" />
          </div>
          {/* waveform */}
          <div className="mt-2.5 flex h-6 items-end gap-[2px]">
            {[40, 65, 30, 80, 55, 70, 45, 60, 35, 75, 50, 28].map((v, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-[1px] bg-[rgba(91,227,255,0.4)]"
                style={{ height: `${v}%` }}
              />
            ))}
          </div>
        </div>

        {/* desk silhouette + floor */}
        <div className="absolute bottom-[12%] left-1/2 h-[7%] w-[min(52vw,660px)] -translate-x-1/2 rounded-[0.9rem] border-t border-white/10 bg-[linear-gradient(180deg,#101218,#08090D)] shadow-[0_16px_50px_-12px_rgba(233,196,106,0.25)]" />
        <div className="absolute inset-x-0 bottom-0 h-[12%] bg-[linear-gradient(180deg,#07080C,#030405)]" />
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
