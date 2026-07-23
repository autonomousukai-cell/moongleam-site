'use client';

import { useState } from 'react';
import Image from 'next/image';
import Hotspot from './Hotspot';
import { site } from '@/lib/site';
import { ytThumb } from '@/lib/data';
import {
  ZW,
  type Layers,
  zoneShell,
  ovAlpha,
  setOverlay,
  smooth,
  seg,
} from './journey';

/**
 * ZONE 4 — placeholder "set": the virtual LED soundstage. One huge LED wall
 * whose "set" morphs as you walk past — desert dusk → deep ocean → neon city —
 * under a lighting-rig truss, plus a showreel panel hotspot (real showreel,
 * lazy YouTube embed on click).
 *
 * Layer contract (written by renderSoundstage every frame):
 *   stg          — group opacity/visibility (zoneShell)
 *   stgInner     — walk-forward settle (zoneShell)
 *   stgSetA/B/C  — LED-wall set crossfades (scroll-scrubbed)
 *   stgOv        — zone overlay
 *   stgHs        — hotspots + showreel panel gate
 */
export function renderSoundstage(el: Layers, p: number) {
  const { alpha, local } = zoneShell(el, 'stg', p, ZW.stage);
  const ov = ovAlpha(local) * (alpha > 0 ? 1 : 0);
  setOverlay(el.stgOv, ov);
  if (el.stgHs) {
    el.stgHs.style.opacity = ov.toFixed(3);
    el.stgHs.style.pointerEvents = ov > 0.6 ? 'auto' : 'none';
  }
  if (alpha <= 0) return;
  // The wall re-dresses itself as the visitor walks the stage.
  const ab = smooth(seg(local, 0.3, 0.5));
  const bc = smooth(seg(local, 0.62, 0.82));
  if (el.stgSetA) el.stgSetA.style.opacity = (1 - ab).toFixed(3);
  if (el.stgSetB) el.stgSetB.style.opacity = (ab * (1 - bc)).toFixed(3);
  if (el.stgSetC) el.stgSetC.style.opacity = bc.toFixed(3);
}

function ShowreelPanel() {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="w-[min(24vw,300px)] overflow-hidden rounded-xl border border-white/10 bg-black/70 shadow-[0_0_46px_-8px_rgba(233,196,106,0.3)] backdrop-blur">
      <div className="relative aspect-video">
        {playing ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${site.showreelId}?autoplay=1&rel=0`}
            title="Moon Gleam showreel"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label="Play the Moon Gleam showreel"
            className="group absolute inset-0"
          >
            <Image
              src={ytThumb(site.showreelId)}
              alt="Moon Gleam showreel"
              fill
              sizes="300px"
              className="object-cover opacity-80 transition-opacity group-hover:opacity-100"
            />
            <span className="absolute inset-0 grid place-items-center">
              <span className="grid h-11 w-11 place-items-center rounded-full border border-gleam/70 bg-black/60 transition-transform group-hover:scale-110">
                <span className="ml-0.5 border-y-[7px] border-l-[11px] border-y-transparent border-l-gleam" />
              </span>
            </span>
          </button>
        )}
      </div>
      <p className="px-3 py-2 text-[9px] uppercase tracking-[0.28em] text-moon-soft">
        Studio showreel
      </p>
    </div>
  );
}

export default function SceneSoundstage() {
  return (
    <div
      data-mgst="stg"
      className="pointer-events-none absolute inset-0 opacity-0"
      style={{ visibility: 'hidden' }}
    >
      <div data-mgst="stgInner" className="absolute inset-0 origin-center will-change-transform">
        {/* stage void — near-black, the wall is the only light source */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#040507_0%,#090B10_60%,#04050A_100%)]" />

        {/* lighting-rig truss */}
        <div className="absolute inset-x-[10%] top-[9%] h-1.5 rounded-full bg-[#14171E] shadow-[0_1px_0_rgba(255,255,255,0.06)]" />
        {[22, 50, 78].map((x) => (
          <div key={x} className="absolute top-[10%]" style={{ left: `${x}%` }}>
            <div className="h-4 w-px bg-white/15" />
            <div className="-ml-1.5 h-2.5 w-3 rounded-sm bg-[#1A1E28] shadow-[0_0_8px_rgba(233,196,106,0.35)]" />
            {/* light cone */}
            <div className="mgst-beam absolute left-1/2 top-4 h-[38vh] w-[16vw] -translate-x-1/2 bg-[conic-gradient(from_180deg_at_50%_0%,transparent_42%,rgba(233,196,106,0.08)_50%,transparent_58%)] mix-blend-screen" />
          </div>
        ))}

        {/* the LED wall */}
        <div className="absolute left-1/2 top-[18%] h-[52%] w-[min(72vw,980px)] -translate-x-1/2 overflow-hidden rounded-lg border border-[#1A1E28] shadow-[0_0_90px_-16px_rgba(91,227,255,0.3)]">
          {/* SET A — desert dusk */}
          <div
            data-mgst="stgSetA"
            className="absolute inset-0 bg-[radial-gradient(100%_75%_at_50%_18%,#F2B25C_0%,#8A4B2A_38%,#2A1220_72%,#12080E_100%)]"
          >
            <div className="absolute inset-x-0 bottom-0 h-[36%] bg-[radial-gradient(120%_100%_at_30%_100%,#1C0F14_30%,transparent_70%)]" />
            <div className="absolute inset-x-0 bottom-[8%] h-[16%] bg-[radial-gradient(80%_100%_at_70%_100%,#241318_40%,transparent_75%)]" />
            <div className="absolute right-[24%] top-[16%] h-10 w-10 rounded-full bg-[#FBE1B0] opacity-90 blur-[1px] shadow-[0_0_50px_14px_rgba(242,178,92,0.5)]" />
            <span className="absolute bottom-2 left-3 text-[9px] uppercase tracking-[0.3em] text-white/55">
              Set 01 · Desert dusk
            </span>
          </div>
          {/* SET B — deep ocean */}
          <div
            data-mgst="stgSetB"
            className="absolute inset-0 opacity-0 bg-[radial-gradient(110%_90%_at_50%_0%,#0E4B5E_0%,#07293C_45%,#03101C_100%)]"
          >
            <div className="absolute inset-x-0 top-[10%] h-[30%] bg-[radial-gradient(60%_100%_at_50%_0%,rgba(91,227,255,0.35),transparent_70%)] blur-md" />
            <div className="absolute left-[20%] top-[45%] h-14 w-36 rounded-full bg-[rgba(91,227,255,0.12)] blur-xl" />
            <div className="absolute right-[18%] bottom-[20%] h-10 w-28 rounded-full bg-[rgba(139,124,246,0.14)] blur-xl" />
            <span className="absolute bottom-2 left-3 text-[9px] uppercase tracking-[0.3em] text-white/55">
              Set 02 · Deep ocean
            </span>
          </div>
          {/* SET C — neon city */}
          <div
            data-mgst="stgSetC"
            className="absolute inset-0 opacity-0 bg-[linear-gradient(180deg,#0B0716_0%,#150C2A_55%,#08040F_100%)]"
          >
            {/* tower bars */}
            <div className="absolute inset-x-0 bottom-0 h-[62%] [background-image:repeating-linear-gradient(90deg,rgba(139,124,246,0.28)_0_14px,transparent_14px_30px,rgba(91,227,255,0.2)_30px_40px,transparent_40px_66px)] [mask-image:linear-gradient(180deg,transparent,black_35%)]" />
            <div className="absolute inset-x-0 bottom-0 h-[30%] bg-[linear-gradient(180deg,transparent,rgba(139,124,246,0.25))] blur-md" />
            <div className="absolute left-[30%] top-[22%] h-8 w-8 rounded-full bg-[rgba(233,196,106,0.5)] blur-lg" />
            <span className="absolute bottom-2 left-3 text-[9px] uppercase tracking-[0.3em] text-white/55">
              Set 03 · Neon city
            </span>
          </div>
          {/* LED pixel grid + bezel sheen */}
          <div className="absolute inset-0 opacity-25 [background-image:repeating-linear-gradient(90deg,rgba(0,0,0,0.5)_0_1px,transparent_1px_4px),repeating-linear-gradient(180deg,rgba(0,0,0,0.5)_0_1px,transparent_1px_4px)]" />
        </div>

        {/* stage floor — wall glow mirrored */}
        <div className="absolute inset-x-0 bottom-0 h-[24%] bg-[linear-gradient(180deg,#0A0C10,#04050A)]">
          <div className="absolute left-1/2 top-0 h-[70%] w-[min(66vw,900px)] -translate-x-1/2 scale-y-[-1] bg-[radial-gradient(80%_100%_at_50%_0%,rgba(91,227,255,0.1),rgba(139,124,246,0.06)_50%,transparent_80%)] blur-lg" />
          {/* floor marks */}
          <div className="absolute left-[28%] top-[38%] h-3 w-6 border-l border-t border-gleam/40" />
          <div className="absolute right-[28%] top-[44%] h-3 w-6 border-r border-t border-gleam/40" />
        </div>
      </div>

      {/* ---- overlay ---- */}
      <div
        data-mgst="stgOv"
        className="pointer-events-none absolute inset-x-0 bottom-[7%] z-20 px-6 text-center opacity-0"
      >
        <p className="text-[10px] uppercase tracking-[0.5em] text-moon-soft">
          04 · Virtual Soundstage
        </p>
        <p className="mx-auto mt-3 max-w-2xl text-balance text-[clamp(1.4rem,3vw,2.4rem)] font-medium leading-snug text-white [font-family:var(--font-studio-display)] [text-shadow:0_2px_30px_rgba(0,0,0,0.8)]">
          Anything you can imagine can become a set.
        </p>
      </div>

      {/* ---- hotspots + showreel panel ---- */}
      <div data-mgst="stgHs" className="absolute inset-0 z-30 opacity-0" style={{ pointerEvents: 'none' }}>
        <div className="pointer-events-auto absolute left-[16%] top-[34%]">
          <Hotspot
            label="LED volume"
            body="Virtual production: AI-generated environments play live behind the action — any location, any era, re-dressed in minutes."
          />
        </div>
        <div className="pointer-events-auto absolute right-[4%] top-[24%] hidden xl:block">
          <ShowreelPanel />
        </div>
        <div className="pointer-events-auto absolute right-[16%] top-[60%] xl:hidden">
          <Hotspot
            side="left"
            label="Showreel"
            body="The Moon Gleam showreel plays in the Screening Room ahead — or watch it any time on our YouTube channel."
          />
        </div>
      </div>
    </div>
  );
}
