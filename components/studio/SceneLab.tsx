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

export default function SceneLab() {
  return (
    <div
      data-mgst="lab"
      className="pointer-events-none absolute inset-0 opacity-0"
      style={{ visibility: 'hidden' }}
    >
      <div data-mgst="labInner" className="absolute inset-0 origin-center will-change-transform">
        {/* the rendered set — holographic storyboards, concept screens, robot rig */}
        <SceneBackdrop src={ZONE_BACKDROPS.lab} />

        {/* prompt console, centre — live UI floating in the rendered room
            (parallax on the inner wrapper so the engine's translateY never
            clobbers the centring transform) */}
        <div className="absolute left-1/2 top-[54%] w-[min(42vw,520px)] -translate-x-1/2">
          <div data-mgst="labF3" className="will-change-transform">
          <div className="mgst-holo-panel rounded-sm p-4">
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
            <div className="mt-3 inline-block border border-gleam/50 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.22em] text-gleam [clip-path:polygon(6px_0,100%_0,100%_calc(100%-6px),calc(100%-6px)_100%,0_100%,0_6px)]">
              Generate
            </div>
          </div>
          </div>
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
