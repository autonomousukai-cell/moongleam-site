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
  smooth,
  seg,
  PIPELINE_STEPS,
} from './journey';

/**
 * ZONE 5 — placeholder "set": the production pipeline. A dark process
 * corridor where seven connected light nodes — Concept → Script → Visual
 * Development → AI Generation → Voice & Sound → Edit → Final Film — ignite
 * one by one as the visitor walks (scrubs) through, joined by a filling
 * light path.
 *
 * Layer contract (written by renderPipeline every frame):
 *   pipe        — group opacity/visibility (zoneShell)
 *   pipeInner   — walk-forward settle (zoneShell)
 *   pipeFill    — connector line fill (scaleX 0→1)
 *   pipeN0..6   — node dot ignition (opacity + scale)
 *   pipeL0..6   — node label ignition (opacity)
 *   pipeOv      — zone overlay
 *   pipeHs      — hotspots gate
 */
const N = PIPELINE_STEPS.length;

export function renderPipeline(el: Layers, p: number) {
  const { alpha, local } = zoneShell(el, 'pipe', p, ZW.pipeline);
  const ov = ovAlpha(local, 0.16, 0.34) * (alpha > 0 ? 1 : 0);
  setOverlay(el.pipeOv, ov);
  if (el.pipeHs) {
    el.pipeHs.style.opacity = ov.toFixed(3);
    el.pipeHs.style.pointerEvents = ov > 0.6 ? 'auto' : 'none';
  }
  if (alpha <= 0) return;

  // Nodes ignite in sequence across the dwell; the line fills just ahead.
  const t = seg(local, 0.2, 0.86);
  if (el.pipeFill)
    el.pipeFill.style.transform = `translateY(-50%) scaleX(${smooth(t).toFixed(4)})`;
  for (let i = 0; i < N; i++) {
    const a = smooth(seg(t, i / N, i / N + 0.1));
    const node = el[`pipeN${i}`];
    if (node) {
      node.style.opacity = (0.25 + 0.75 * a).toFixed(3);
      node.style.transform = `scale(${(0.7 + 0.5 * a).toFixed(3)})`;
    }
    const label = el[`pipeL${i}`];
    if (label) label.style.opacity = (0.3 + 0.7 * a).toFixed(3);
  }
}

const NODE_COLORS = [
  '#5BE3FF', '#5BE3FF', '#8B7CF6', '#8B7CF6', '#B58FD8', '#E9C46A', '#E9C46A',
];

export default function ScenePipeline() {
  return (
    <div
      data-mgst="pipe"
      className="pointer-events-none absolute inset-0 opacity-0"
      style={{ visibility: 'hidden' }}
    >
      <div data-mgst="pipeInner" className="absolute inset-0 origin-center will-change-transform">
        {/* the rendered set — glowing node stream in a dark process hall;
            the live path below annotates it station by station */}
        <SceneBackdrop src={ZONE_BACKDROPS.pipeline} />

        {/* the pipeline path */}
        <div className="absolute left-[9%] right-[9%] top-1/2 -translate-y-1/2">
          {/* base + fill line */}
          <div className="absolute inset-x-[3%] top-1/2 h-px -translate-y-1/2 bg-white/10" />
          <div
            data-mgst="pipeFill"
            className="absolute inset-x-[3%] top-1/2 h-[2px] origin-left -translate-y-1/2 scale-x-0 bg-gradient-to-r from-[#5BE3FF] via-[#8B7CF6] to-[#E9C46A] shadow-[0_0_14px_2px_rgba(139,124,246,0.4)] will-change-transform"
          />
          {/* nodes */}
          {PIPELINE_STEPS.map((step, i) => {
            const x = 3 + (i / (N - 1)) * 94;
            const above = i % 2 === 0;
            return (
              <div
                key={step}
                className="absolute top-1/2"
                style={{ left: `${x}%` }}
              >
                {/* outer span holds the centring; the engine scales the inner dot */}
                <span className="absolute block h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2">
                  <div
                    data-mgst={`pipeN${i}`}
                    className="mgst-pulse h-full w-full rounded-full will-change-transform"
                    style={{ background: NODE_COLORS[i], opacity: 0.25 }}
                  />
                </span>
                <div
                  data-mgst={`pipeL${i}`}
                  className={
                    'absolute w-32 -translate-x-1/2 text-center opacity-30 ' +
                    (above ? 'bottom-5' : 'top-5')
                  }
                >
                  <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-moon">
                    {step}
                  </span>
                  <span className="mt-0.5 block text-[8px] tabular-nums text-moon-faint">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ---- overlay ---- */}
      <div
        data-mgst="pipeOv"
        className="pointer-events-none absolute inset-x-0 top-[10%] z-20 px-6 text-center opacity-0"
      >
        <p className="text-[10px] uppercase tracking-[0.5em] text-moon-soft">
          06 · Production Pipeline
        </p>
        <p className="mx-auto mt-3 max-w-2xl text-balance text-[clamp(1.4rem,3vw,2.4rem)] font-medium leading-snug text-white [font-family:var(--font-studio-display)] [text-shadow:0_2px_30px_rgba(0,0,0,0.8)]">
          AI-powered. Human-directed.
        </p>
      </div>

      {/* ---- hotspots ---- */}
      <div data-mgst="pipeHs" className="absolute inset-0 z-30 opacity-0" style={{ pointerEvents: 'none' }}>
        <div className="pointer-events-auto absolute left-[48%] top-[64%]">
          <Hotspot
            label="AI Generation"
            body="Generation is only the middle of the pipeline. Every frame passes a director's eye before and after the AI — that's how it stays cinema, not content."
          />
        </div>
      </div>
    </div>
  );
}
