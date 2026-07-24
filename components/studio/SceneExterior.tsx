'use client';

import Hotspot from './Hotspot';
import SceneBackdrop from './SceneBackdrop';
import { ZONE_BACKDROPS } from './journey';

/**
 * ZONE 1 — the Moon Gleam studio building at night: a bespoke AI-rendered
 * set (the studio's own pipeline) with "MOON GLEAM AI STUDIO" channel-letter
 * signage on the facade — the name lives on the building, not in overlay
 * copy — and a centred, amber-lit entrance. The engine dollies straight into that
 * entrance; mist banks parallax over the plate, and a pair of viewport-level
 * glass door panels materialise and slide apart as the camera crosses the
 * threshold — so the "doors open" beat lands regardless of plate geometry.
 *
 * Layer contract (written by the engine every frame):
 *   ext        — group opacity/visibility (crossfade into reception)
 *   bldg       — main dolly scale (origin = the entrance)
 *   mist1..3   — mid/foreground mist parallax
 *   doorGrp    — door panels materialise/dissolve at the threshold
 *   doorL/R    — door panels slide apart
 *   doorLight  — interior spill brightens as doors open
 *   doorSeam   — cyan seam glow between the doors
 *   hotspotExt — hotspot fades once the dolly is under way
 */
export default function SceneExterior() {
  return (
    <div data-mgst="ext" className="pointer-events-none absolute inset-0">
      {/* ---------------- the rendered set — camera dollies in ---------------- */}
      <div data-mgst="bldg" className="absolute inset-0 origin-[50%_64%] will-change-transform">
        <SceneBackdrop
          src={ZONE_BACKDROPS.exterior}
          scrim="none"
          alt="Moon Gleam AI Studio building — illuminated studio signage on the facade at night"
        />
      </div>

      {/* ------------------------------ mist ------------------------------- */}
      <div data-mgst="mist1" className="absolute inset-x-[-12%] bottom-[16%] h-[16%] will-change-transform">
        <div className="mgst-drift h-full w-full rounded-full bg-[radial-gradient(60%_100%_at_50%_50%,rgba(199,204,209,0.1),transparent_70%)] blur-2xl" />
      </div>
      <div data-mgst="mist2" className="absolute inset-x-[-16%] bottom-[6%] h-[14%] will-change-transform">
        <div className="mgst-drift-slow h-full w-full rounded-full bg-[radial-gradient(55%_100%_at_45%_50%,rgba(199,204,209,0.14),transparent_72%)] blur-2xl" />
      </div>
      <div data-mgst="mist3" className="absolute inset-x-[-10%] bottom-[30%] h-[10%] will-change-transform">
        <div className="mgst-drift h-full w-full rounded-full bg-[radial-gradient(50%_100%_at_60%_50%,rgba(139,124,246,0.06),transparent_70%)] blur-2xl" />
      </div>

      {/* --------- threshold doors — full-viewport glass, slide apart --------- */}
      <div
        data-mgst="doorGrp"
        className="absolute inset-0 opacity-0"
        style={{ visibility: 'hidden' }}
      >
        {/* warm reception light behind the parting panels */}
        <div
          data-mgst="doorLight"
          className="absolute inset-0 bg-[radial-gradient(60%_80%_at_50%_60%,rgba(233,196,106,0.55),rgba(233,196,106,0.14)_55%,rgba(7,11,20,0.9))]"
        />
        <div
          data-mgst="doorL"
          className="absolute inset-y-0 left-0 w-1/2 border-r border-[rgba(91,227,255,0.45)] bg-[linear-gradient(105deg,rgba(10,13,20,0.92),rgba(22,26,36,0.88)_60%,rgba(38,44,58,0.82))] backdrop-blur-[2px] will-change-transform"
        >
          <div className="absolute right-[8%] top-1/2 h-[22%] w-px -translate-y-1/2 bg-[rgba(199,204,209,0.5)]" />
          <div className="absolute inset-y-[12%] right-0 w-[18%] bg-[linear-gradient(90deg,transparent,rgba(91,227,255,0.06))]" />
        </div>
        <div
          data-mgst="doorR"
          className="absolute inset-y-0 right-0 w-1/2 border-l border-[rgba(91,227,255,0.45)] bg-[linear-gradient(-105deg,rgba(10,13,20,0.92),rgba(22,26,36,0.88)_60%,rgba(38,44,58,0.82))] backdrop-blur-[2px] will-change-transform"
        >
          <div className="absolute left-[8%] top-1/2 h-[22%] w-px -translate-y-1/2 bg-[rgba(199,204,209,0.5)]" />
          <div className="absolute inset-y-[12%] left-0 w-[18%] bg-[linear-gradient(-90deg,transparent,rgba(91,227,255,0.06))]" />
        </div>
        {/* cyan seam between the doors */}
        <div
          data-mgst="doorSeam"
          className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[#5BE3FF] shadow-[0_0_18px_5px_rgba(91,227,255,0.5)]"
        />
      </div>

      {/* hotspot — LED marquee (fades once the dolly is under way) */}
      <div data-mgst="hotspotExt" className="pointer-events-auto absolute left-[64%] top-[28%] z-30">
        <Hotspot
          label="Studio signage"
          body="Our name in lights — the Moon Gleam sign above the entrance, glowing rain or shine."
        />
      </div>
    </div>
  );
}
