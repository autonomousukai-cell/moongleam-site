'use client';

import Hotspot from './Hotspot';
import {
  ZW,
  type Layers,
  zoneShell,
  ovAlpha,
  setOverlay,
  LAB_SERVICES,
} from './journey';

/**
 * ZONE 3 — placeholder "set": the AI Creative Lab. Floating concept screens,
 * a storyboard wall and a prompt console, all layered CSS like Phase 1.
 *
 * Layer contract (written by renderLab every frame):
 *   lab        — group opacity/visibility (zoneShell)
 *   labInner   — walk-forward settle (zoneShell)
 *   labF1..3   — floating-screen depth parallax
 *   labOv      — zone overlay (headline + services)
 *   labHs      — hotspots gate
 */
export function renderLab(el: Layers, p: number) {
  const { alpha, local } = zoneShell(el, 'lab', p, ZW.lab);
  const ov = ovAlpha(local) * (alpha > 0 ? 1 : 0);
  setOverlay(el.labOv, ov);
  if (el.labHs) {
    el.labHs.style.opacity = ov.toFixed(3);
    el.labHs.style.pointerEvents = ov > 0.6 ? 'auto' : 'none';
  }
  if (alpha <= 0) return;
  // Depth parallax — each screen drifts at its own rate as the camera passes.
  const d = local - 0.5;
  if (el.labF1) el.labF1.style.transform = `translateY(${(d * -26).toFixed(1)}px)`;
  if (el.labF2) el.labF2.style.transform = `translateY(${(d * -44).toFixed(1)}px)`;
  if (el.labF3) el.labF3.style.transform = `translateY(${(d * -14).toFixed(1)}px)`;
}

const BOARD_FRAMES = [
  'linear-gradient(140deg,#1A2340,#0C1220 60%)',
  'linear-gradient(140deg,#2A1D3E,#100A1E 60%)',
  'linear-gradient(140deg,#3A2A16,#150E06 60%)',
  'linear-gradient(140deg,#12303A,#08141A 60%)',
  'linear-gradient(140deg,#251B2E,#0D0913 60%)',
  'linear-gradient(140deg,#1C2B24,#0A120E 60%)',
];

export default function SceneLab() {
  return (
    <div
      data-mgst="lab"
      className="pointer-events-none absolute inset-0 opacity-0"
      style={{ visibility: 'hidden' }}
    >
      <div data-mgst="labInner" className="absolute inset-0 origin-center will-change-transform">
        {/* room shell — cool charcoal, deeper than reception */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#080B12_0%,#0D1119_55%,#070A0E_100%)]" />
        <div className="absolute inset-y-0 left-0 w-[18%] bg-[linear-gradient(90deg,#04050A,transparent)]" />
        <div className="absolute inset-y-0 right-0 w-[18%] bg-[linear-gradient(-90deg,#04050A,transparent)]" />
        {/* cyan cove light — this is the "thinking" room */}
        <div className="absolute inset-x-[12%] top-0 h-[10%] bg-[linear-gradient(180deg,rgba(91,227,255,0.12),transparent)] blur-md" />
        <div className="absolute inset-x-[20%] top-[6%] h-px bg-[rgba(91,227,255,0.45)] shadow-[0_0_24px_6px_rgba(91,227,255,0.2)]" />

        {/* F1 — large concept-art screen, floating left */}
        <div
          data-mgst="labF1"
          className="absolute left-[9%] top-[24%] w-[26%] will-change-transform"
        >
          <div className="mgst-float overflow-hidden rounded-xl border border-white/10 shadow-[0_0_50px_-8px_rgba(139,124,246,0.35)]">
            <div className="relative aspect-[16/10] bg-[radial-gradient(85%_70%_at_60%_30%,rgba(139,124,246,0.55),rgba(24,18,52,0.9)_55%,#0A0816_100%)]">
              {/* nebula highlights */}
              <div className="absolute left-[18%] top-[30%] h-8 w-8 rounded-full bg-[rgba(91,227,255,0.5)] blur-xl" />
              <div className="absolute right-[22%] bottom-[24%] h-10 w-10 rounded-full bg-[rgba(233,196,106,0.35)] blur-xl" />
              <div className="absolute bottom-2 left-3 text-[9px] uppercase tracking-[0.28em] text-white/60">
                Concept 014 · World-build
              </div>
            </div>
          </div>
        </div>

        {/* F2 — storyboard wall, floating right */}
        <div
          data-mgst="labF2"
          className="absolute right-[9%] top-[18%] w-[24%] will-change-transform"
        >
          <div className="mgst-float-slow rounded-xl border border-white/10 bg-[#0B0E15]/90 p-3 shadow-[0_0_46px_-10px_rgba(91,227,255,0.3)]">
            <div className="grid grid-cols-3 gap-1.5">
              {BOARD_FRAMES.map((bg, i) => (
                <div
                  key={i}
                  className="relative aspect-video overflow-hidden rounded-[4px] border border-white/5"
                  style={{ background: bg }}
                >
                  <span className="absolute bottom-0.5 right-1 text-[7px] tabular-nums text-white/40">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-2 text-[8px] uppercase tracking-[0.3em] text-moon-soft">
              Storyboard · Scene 04
            </div>
          </div>
        </div>

        {/* F3 — prompt console, centre (parallax on the inner wrapper so the
            engine's translateY never clobbers the centring transform) */}
        <div className="absolute left-1/2 top-[52%] w-[min(46vw,560px)] -translate-x-1/2">
          <div data-mgst="labF3" className="will-change-transform">
          <div className="rounded-xl border border-[rgba(91,227,255,0.25)] bg-[#070A10]/95 p-4 shadow-[0_0_60px_-10px_rgba(91,227,255,0.25)] backdrop-blur">
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#5BE3FF]/70" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#8B7CF6]/70" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#E9C46A]/70" />
              <span className="ml-2 text-[8px] uppercase tracking-[0.3em] text-moon-faint">
                Moon Gleam · Prompt console
              </span>
            </div>
            <p className="mt-3 font-mono text-[11px] leading-relaxed text-moon">
              &gt; a rain-lit city of glass at blue hour, anamorphic, volumetric
              neon, slow crane down to street level…
              <span className="mgst-caret ml-0.5 inline-block h-3 w-[7px] translate-y-0.5 bg-[#5BE3FF]" />
            </p>
            <div className="mt-3 inline-block rounded-full border border-gleam/50 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.22em] text-gleam">
              Generate
            </div>
          </div>
          </div>
        </div>

        {/* reflective floor */}
        <div className="absolute inset-x-0 bottom-0 h-[16%] bg-[linear-gradient(180deg,#0A0C10,#05060A)]">
          <div className="absolute left-1/2 top-0 h-[80%] w-[min(50vw,620px)] -translate-x-1/2 bg-[linear-gradient(180deg,rgba(91,227,255,0.1),transparent_75%)] blur-lg" />
        </div>
      </div>

      {/* ---- overlay ---- */}
      <div
        data-mgst="labOv"
        className="pointer-events-none absolute inset-x-0 top-[8%] z-20 px-6 text-center opacity-0"
      >
        <p className="text-[10px] uppercase tracking-[0.5em] text-moon-soft">
          03 · AI Creative Lab
        </p>
        <p className="mx-auto mt-3 max-w-2xl text-balance text-[clamp(1.4rem,3vw,2.4rem)] font-medium leading-snug text-white [font-family:var(--font-studio-display)] [text-shadow:0_2px_30px_rgba(0,0,0,0.8)]">
          From an idea to a cinematic universe.
        </p>
        <div className="mx-auto mt-4 flex max-w-2xl flex-wrap items-center justify-center gap-2">
          {LAB_SERVICES.map((s) => (
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
      <div data-mgst="labHs" className="absolute inset-0 z-30 opacity-0" style={{ pointerEvents: 'none' }}>
        <div className="pointer-events-auto absolute left-[30%] top-[62%]">
          <Hotspot
            label="Prompt craft"
            body="Every film starts as language. Our directors write, iterate and art-direct with AI — from the first prompt to the final frame."
          />
        </div>
        <div className="pointer-events-auto absolute right-[28%] top-[30%]">
          <Hotspot
            side="left"
            label="Storyboards"
            body="Commercials, documentaries, kids animation, short films — every Moon Gleam production is boarded here before a single frame is generated."
          />
        </div>
      </div>
    </div>
  );
}
