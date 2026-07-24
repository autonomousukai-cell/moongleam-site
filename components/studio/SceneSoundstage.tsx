'use client';

import { useState } from 'react';
import Image from 'next/image';
import Hotspot from './Hotspot';
import SceneBackdrop, { TextHalo } from './SceneBackdrop';
import { site } from '@/lib/site';
import { ytThumb } from '@/lib/data';
import {
  ZW,
  ZONE_BACKDROPS,
  type Layers,
  zoneShell,
  ovAlpha,
  setOverlay,
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
}

function ShowreelPanel() {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="mgst-holo-panel w-[min(24vw,300px)] overflow-hidden rounded-sm">
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
        {/* the rendered set — LED volume, robotic camera crane, truss rig */}
        <SceneBackdrop src={ZONE_BACKDROPS.soundstage} scrim="bottom" />
        {/* set slate — the volume is playing Set 01 */}
        <span className="absolute left-[12%] top-[16%] text-[9px] uppercase tracking-[0.3em] text-white/55">
          Set 01 · Desert dusk
        </span>
      </div>

      {/* ---- overlay ---- */}
      <div
        data-mgst="stgOv"
        className="pointer-events-none absolute inset-x-0 bottom-[7%] z-20 px-6 text-center opacity-0"
      >
        <TextHalo />
        <p className="text-[11px] font-semibold uppercase tracking-[0.5em] text-gleam [text-shadow:0_2px_16px_rgba(0,0,0,0.95)]">
          05 · Virtual Soundstage
        </p>
        <p className="mx-auto mt-3 max-w-2xl text-balance text-[clamp(1.5rem,3vw,2.4rem)] font-medium leading-snug text-white [font-family:var(--font-studio-display)] [text-shadow:0_2px_30px_rgba(0,0,0,0.85)]">
          Anything you can imagine can become a set.
        </p>
        <p className="mx-auto mt-3 max-w-xl text-balance text-base leading-relaxed text-moon [text-shadow:0_2px_24px_rgba(0,0,0,0.9)]">
          The LED volume plays AI-generated environments live behind the action —
          any location, any era, re-dressed in minutes.
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
