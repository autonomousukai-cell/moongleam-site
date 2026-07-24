'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { portfolio, categories, ytThumb, type WorkItem } from '@/lib/data';
import SceneBackdrop from './SceneBackdrop';
import {
  ZW,
  ZONE_BACKDROPS,
  type Layers,
  zoneShell,
  ovAlpha,
  setOverlay,
  seg,
} from './journey';

/**
 * ZONE 7 — placeholder "set": the private screening room. A projector beam,
 * rows of seats and one big screen playing a scrubbed slideshow of REAL
 * Moon Gleam portfolio work. Project cards along the bottom open a detail
 * panel over the screen without ever leaving the journey.
 *
 * Layer contract (written by renderScreening every frame):
 *   scr         — group opacity/visibility (zoneShell)
 *   scrInner    — walk-forward settle (zoneShell)
 *   scrShot0..N — big-screen slideshow crossfade (scroll-scrubbed)
 *   scrOv       — zone overlay
 *   scrHs       — project cards gate
 */

/** Selected worlds on the big screen — one per discipline. */
const SELECTED_IDS = [
  'x9c5L7DncWk', // Moon Gleam — brand film
  'P1PCjWxa5Jo', // Netflix-quality ads
  'wsVu1zJFt-k', // Lord Lucan documentary
  'kQKz4nE7ZxM', // Bombay Jewellers TVC
  'EIaa0ZCCyYM', // kids animation
];
export const SCREENING_WORKS: WorkItem[] = SELECTED_IDS.map(
  (id) => portfolio.find((w) => w.id === id) as WorkItem,
).filter(Boolean);

const N = SCREENING_WORKS.length;

export function renderScreening(el: Layers, p: number) {
  const { alpha, local } = zoneShell(el, 'scr', p, ZW.screening);
  const ov = ovAlpha(local, 0.14, 0.32) * (alpha > 0 ? 1 : 0);
  setOverlay(el.scrOv, ov);
  if (el.scrHs) {
    el.scrHs.style.opacity = ov.toFixed(3);
    el.scrHs.style.pointerEvents = ov > 0.6 ? 'auto' : 'none';
  }
  if (alpha <= 0) return;
  // The reel advances with the visitor: nearest shot fully lit, neighbours dim.
  const idx = seg(local, 0.1, 0.92) * (N - 1);
  for (let i = 0; i < N; i++) {
    const shot = el[`scrShot${i}`];
    if (shot) shot.style.opacity = Math.max(0, 1 - Math.abs(idx - i) * 1.5).toFixed(3);
  }
}

export default function SceneScreening() {
  const [selected, setSelected] = useState<WorkItem | null>(null);

  return (
    <div
      data-mgst="scr"
      className="pointer-events-none absolute inset-0 opacity-0"
      style={{ visibility: 'hidden' }}
    >
      <div data-mgst="scrInner" className="absolute inset-0 origin-center will-change-transform">
        {/* the rendered set — private cinema, projector beam through haze */}
        <SceneBackdrop src={ZONE_BACKDROPS.screening} scrim="top" />

        {/* the reel — a holographic screen floating over the auditorium */}
        <div className="absolute left-1/2 top-[15%] h-[42%] w-[min(58vw,820px)] -translate-x-1/2 overflow-hidden rounded-md border border-[rgba(91,227,255,0.3)] bg-black shadow-[0_0_100px_-10px_rgba(91,227,255,0.35)]">
          {SCREENING_WORKS.map((w, i) => (
            <div key={w.id} data-mgst={`scrShot${i}`} className="absolute inset-0 opacity-0">
              <Image
                src={ytThumb(w.id)}
                alt={w.title}
                fill
                sizes="(max-width: 1400px) 66vw, 900px"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent px-4 pb-3 pt-10">
                <p className="text-[9px] uppercase tracking-[0.3em] text-gleam/90">
                  {categories[w.cat]}
                </p>
                <p className="mt-0.5 text-sm font-medium text-white">{w.title}</p>
              </div>
            </div>
          ))}
          {/* screen glass sheen */}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.05),transparent_35%)]" />

          {/* selected-project detail — covers the screen, journey untouched */}
          {selected && (
            <div className="pointer-events-auto absolute inset-0 z-10 bg-black/92 backdrop-blur-sm">
              <Image
                src={ytThumb(selected.id)}
                alt={selected.title}
                fill
                sizes="(max-width: 1400px) 66vw, 900px"
                className="object-cover opacity-35"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
                <p className="text-[10px] uppercase tracking-[0.4em] text-gleam">
                  {categories[selected.cat]}
                </p>
                <p className="mt-3 max-w-xl text-balance text-[clamp(1.1rem,2.2vw,1.8rem)] font-medium leading-snug text-white [font-family:var(--font-studio-display)]">
                  {selected.title}
                </p>
                <div className="mt-5 flex items-center gap-3">
                  <a
                    href={`https://www.youtube.com/watch?v=${selected.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mgst-hud-btn !px-5 !py-2 !text-xs"
                  >
                    Watch the film
                  </a>
                  <button
                    type="button"
                    onClick={() => setSelected(null)}
                    className="mgst-hud-btn-ghost !px-5 !py-2 !text-xs"
                  >
                    Back to the reel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* ---- overlay ---- */}
      <div
        data-mgst="scrOv"
        className="pointer-events-none absolute inset-x-0 top-[4%] z-20 px-6 text-center opacity-0"
      >
        <p className="text-[10px] uppercase tracking-[0.5em] text-moon-soft">
          07 · Screening Room
        </p>
        <p className="mx-auto mt-2 max-w-2xl text-balance text-[clamp(1.2rem,2.4vw,1.9rem)] font-medium leading-snug text-white [font-family:var(--font-studio-display)] [text-shadow:0_2px_30px_rgba(0,0,0,0.8)]">
          Selected worlds we have brought to life.
        </p>
        <Link href="/work" className="mgst-hud-btn-ghost mt-3 !px-6 !py-2.5 !text-xs">
          View our work
        </Link>
      </div>

      {/* ---- project cards (hotspots) ---- */}
      <div
        data-mgst="scrHs"
        className="absolute inset-x-0 bottom-[3%] z-30 opacity-0"
        style={{ pointerEvents: 'none' }}
      >
        <div className="mgst-holo-panel pointer-events-auto mx-auto flex w-fit max-w-[92vw] items-stretch gap-2 rounded-sm p-2">
          {SCREENING_WORKS.map((w) => (
            <button
              key={w.id}
              type="button"
              onClick={() => setSelected(w)}
              title={w.title}
              className={
                'group w-[9.5vw] max-w-[132px] overflow-hidden rounded-lg border text-left transition-colors ' +
                (selected?.id === w.id
                  ? 'border-gleam/70'
                  : 'border-white/10 hover:border-white/35')
              }
            >
              <div className="relative aspect-video">
                <Image
                  src={ytThumb(w.id)}
                  alt=""
                  fill
                  sizes="132px"
                  className="object-cover opacity-75 transition-opacity group-hover:opacity-100"
                />
              </div>
              <p className="truncate bg-black/60 px-2 py-1 text-[8px] uppercase tracking-[0.14em] text-moon-soft">
                {categories[w.cat]}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
