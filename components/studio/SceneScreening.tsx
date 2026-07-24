'use client';

import { useEffect, useState } from 'react';
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
  lerp,
} from './journey';

/**
 * ZONE 7 — Moon Gleam's private screening GALLERY. The rendered set is a
 * cinema room whose left wall carries a receding band of LED frames and
 * whose right wall holds the big amber-edged cinema screen; the HTML layer
 * welds onto that geometry: a perspective bank of live monitors (one real
 * portfolio work each) over the left wall, and a "Now Screening" beacon on
 * the cinema screen. Selecting anything dims the room into a cinematic
 * letterboxed lightbox and plays the film BIG (youtube-nocookie — sound is
 * fine, it's a user gesture). The visitor never leaves the journey.
 *
 * Layer contract (written by renderScreening every frame):
 *   scr      — group opacity/visibility (zoneShell)
 *   scrInner — walk-forward settle (zoneShell)
 *   scrWall  — monitor bank: perspective walk-past drift
 *   scrOv    — zone overlay (title + CTA)
 *   scrHs    — gallery power-on gate (opacity + pointer-events)
 */

/** The rendered screening plate is 1376×768 (1.7917:1). */
const PLATE_AR = 1376 / 768;

const pick = (id: string) => portfolio.find((w) => w.id === id) as WorkItem;

/** The cinema screen's feature — the studio showreel film. */
const FEATURED = pick('x9c5L7DncWk');

/** The monitor wall — a strong selection across every discipline. */
const WALL: WorkItem[] = [
  pick('kQKz4nE7ZxM'), // TVC — Bombay Jewellers
  pick('4HF3_eWN0sU'), // TVC — Cuisine Artist
  pick('HtkYON-hXeU'), // TVC — Bluestone Travel
  pick('wsVu1zJFt-k'), // Documentary — Lord Lucan
  pick('K4yxkk8cgkE'), // Documentary — Enigma Code
  pick('qSGqVKzREdQ'), // Short film — Time's Up
  pick('EIaa0ZCCyYM'), // Kids animation showcase
  pick('rJ8AD-ZHOuI'), // Kids animation story
  pick('yubYJ8DIjRQ'), // Charity — HRF Winter Souk
  pick('Afe2qXdodRM'), // Education — QNS Academy
  pick('P1PCjWxa5Jo'), // Brand — Netflix-quality ads
  pick('U6ADvdX701A'), // UGC — AI Animal Podcast
].filter(Boolean);

/** Shared with the mobile/static narrative fallback. */
export const SCREENING_WORKS: WorkItem[] = [FEATURED, ...WALL].filter(Boolean);

export function renderScreening(el: Layers, p: number) {
  const { alpha, local } = zoneShell(el, 'scr', p, ZW.screening);
  const ov = ovAlpha(local, 0.14, 0.32) * (alpha > 0 ? 1 : 0);
  setOverlay(el.scrOv, ov);
  if (el.scrHs) {
    el.scrHs.style.opacity = ov.toFixed(3);
    el.scrHs.style.pointerEvents = ov > 0.6 ? 'auto' : 'none';
  }
  if (alpha <= 0) return;
  // Walk-past drift: the monitor bank glides gently by as the visitor moves.
  if (el.scrWall)
    el.scrWall.style.transform = `perspective(1150px) rotateY(16deg) translate3d(${lerp(2.5, -2.5, local).toFixed(2)}%,0,0)`;
}

/** One LED gallery monitor. */
function MonitorTile({ work, onPlay }: { work: WorkItem; onPlay: () => void }) {
  return (
    <button
      type="button"
      onClick={onPlay}
      title={work.title}
      aria-label={`Screen this film: ${work.title}`}
      className="group relative block w-full overflow-hidden rounded-[3px] border border-[rgba(91,227,255,0.3)] bg-black text-left shadow-[0_0_26px_-8px_rgba(91,227,255,0.5)] transition-all hover:border-[rgba(91,227,255,0.75)] hover:shadow-[0_0_38px_-6px_rgba(91,227,255,0.7)]"
    >
      <span className="relative block aspect-video">
        <Image
          src={ytThumb(work.id)}
          alt=""
          fill
          sizes="200px"
          className="mgst-led object-cover opacity-85 transition-opacity group-hover:opacity-100"
        />
        {/* LED scanline texture + edge fall-off */}
        <span className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(180deg,rgba(0,0,0,0.16)_0_1px,transparent_1px_3px)] mix-blend-overlay" />
        <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(85%_65%_at_50%_45%,transparent_55%,rgba(0,0,0,0.42))]" />
        {/* play iris on hover/focus */}
        <span className="pointer-events-none absolute inset-0 grid place-items-center opacity-0 transition-opacity group-focus-visible:opacity-100 group-hover:opacity-100">
          <span className="grid h-8 w-8 place-items-center rounded-full border border-gleam/80 bg-black/55 text-[10px] text-gleam shadow-[0_0_16px_rgba(233,196,106,0.6)]">
            ▶
          </span>
        </span>
      </span>
      <span className="block truncate border-t border-white/10 bg-black/70 px-2 py-1 text-[8px] uppercase tracking-[0.16em] text-moon-soft">
        {categories[work.cat]}
      </span>
    </button>
  );
}

export default function SceneScreening({ active }: { active: boolean }) {
  const [playing, setPlaying] = useState<WorkItem | null>(null);

  /* Walking out of the gallery kills playback (and its audio) instantly. */
  useEffect(() => {
    if (!active) setPlaying(null);
  }, [active]);

  /* Lights down: Escape leaves the screening. */
  useEffect(() => {
    if (!playing) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setPlaying(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [playing]);

  return (
    <div
      data-mgst="scr"
      className="pointer-events-none absolute inset-0 opacity-0"
      style={{ visibility: 'hidden' }}
    >
      <div data-mgst="scrInner" className="absolute inset-0 origin-center will-change-transform">
        {/* the rendered set — LED-framed gallery wall + cinema screen */}
        <SceneBackdrop src={ZONE_BACKDROPS.screening} scrim="top" />

        {/* Cover-box mirrors the backdrop's object-cover crop, welding the
            monitors + beacon to the room's geometry at any viewport. */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: `max(100%, calc(100vh * ${PLATE_AR}))`,
            height: `max(100%, calc(100vw / ${PLATE_AR}))`,
          }}
        >
          {/* ---- the gallery powers on as the visitor settles ---- */}
          <div data-mgst="scrHs" className="absolute inset-0 opacity-0" style={{ pointerEvents: 'none' }}>
            {/* monitor bank over the left wall's LED frame band */}
            <div
              data-mgst="scrWall"
              className="absolute left-[12.5%] top-[21%] w-[42%] origin-left"
              style={{ transform: 'perspective(1150px) rotateY(16deg)' }}
            >
              <div className="grid grid-cols-6 gap-[0.55vw]">
                {WALL.map((w) => (
                  <MonitorTile key={w.id} work={w} onPlay={() => setPlaying(w)} />
                ))}
              </div>
            </div>

            {/* "Now Screening" beacon on the amber cinema screen */}
            <div className="absolute left-[84%] top-[38%]">
              <button
                type="button"
                onClick={() => setPlaying(FEATURED)}
                aria-label={`Play the featured film: ${FEATURED.title}`}
                className="group relative grid place-items-center"
              >
                <span
                  aria-hidden
                  className="mgst-flare absolute left-1/2 top-1/2 h-px w-28 -translate-x-1/2 -translate-y-1/2 bg-[linear-gradient(90deg,transparent,rgba(233,196,106,0.85),transparent)]"
                />
                <span className="mgst-pulse relative grid h-14 w-14 place-items-center rounded-full border border-gleam/80 bg-black/55 text-sm text-gleam shadow-[0_0_30px_rgba(233,196,106,0.7)] transition-transform group-hover:scale-110">
                  ▶
                </span>
                <span className="mt-2 block whitespace-nowrap rounded-sm bg-black/60 px-2.5 py-1 text-[9px] uppercase tracking-[0.28em] text-gleam/90">
                  Now screening · the showreel
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ---- overlay ---- */}
      <div
        data-mgst="scrOv"
        className="pointer-events-none absolute inset-x-0 top-[4%] z-20 px-6 text-center opacity-0"
      >
        <p className="text-[10px] uppercase tracking-[0.5em] text-moon-soft">
          07 · Screening Gallery
        </p>
        <p className="mx-auto mt-2 max-w-2xl text-balance text-[clamp(1.2rem,2.4vw,1.9rem)] font-medium leading-snug text-white [font-family:var(--font-studio-display)] [text-shadow:0_2px_30px_rgba(0,0,0,0.8)]">
          Selected worlds we have brought to life.
        </p>
        <Link href="/work" className="mgst-hud-btn-ghost mt-3 !px-6 !py-2.5 !text-xs">
          View our work
        </Link>
      </div>

      {/* ---- the screening itself: room dims, letterbox, film plays BIG ---- */}
      {playing && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Now screening: ${playing.title}`}
          className="pointer-events-auto absolute inset-0 z-40 flex items-center justify-center bg-black/92 backdrop-blur-sm"
        >
          {/* letterbox bars — the projector takes over the room */}
          <div aria-hidden className="absolute inset-x-0 top-0 h-[6vh] bg-black" />
          <div aria-hidden className="absolute inset-x-0 bottom-0 h-[6vh] bg-black" />

          <div className="w-[min(78vw,calc(72vh*1.7778))]">
            <div className="flex items-baseline justify-between gap-4 pb-2.5">
              <p className="min-w-0 truncate text-left">
                <span className="text-[9px] uppercase tracking-[0.34em] text-gleam">
                  Now screening · {categories[playing.cat]}
                </span>
                <span className="mt-0.5 block truncate text-sm font-medium text-white [font-family:var(--font-studio-display)]">
                  {playing.title}
                </span>
              </p>
              <button
                type="button"
                onClick={() => setPlaying(null)}
                className="mgst-hud-btn-ghost shrink-0 !px-4 !py-1.5 !text-[10px]"
              >
                Back to the gallery
              </button>
            </div>
            <div className="relative aspect-video overflow-hidden rounded-[3px] border border-[rgba(233,196,106,0.4)] bg-black shadow-[0_0_130px_-16px_rgba(233,196,106,0.45)]">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${playing.id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                title={`Now screening: ${playing.title}`}
                allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
                style={{ border: 0 }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
