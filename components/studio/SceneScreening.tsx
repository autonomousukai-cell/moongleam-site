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
} from './journey';

/**
 * ZONE 7 — Moon Gleam's private screening room, presented as a CLEAN LED
 * video wall (Azhar, 2026-07-24): a tidy, evenly spaced grid of individual
 * LED screens, each screen carrying exactly ONE portfolio work — subtle
 * bezel, gentle glow, readable label. No perspective drift, no crowding.
 * The showreel leads the wall on an amber-edged screen. Selecting any
 * screen dims the room into a cinematic letterboxed lightbox and plays the
 * film BIG (youtube-nocookie — sound is fine, it's a user gesture). The
 * visitor never leaves the journey.
 *
 * Layer contract (written by renderScreening every frame):
 *   scr      — group opacity/visibility (zoneShell)
 *   scrInner — walk-forward settle (zoneShell)
 *   scrOv    — zone overlay (title + CTA)
 *   scrHs    — video-wall power-on gate (opacity + pointer-events)
 */

const pick = (id: string) => portfolio.find((w) => w.id === id) as WorkItem;

/** The wall's lead screen — the studio showreel film. */
const FEATURED = pick('x9c5L7DncWk');

/** Seven works, one per discipline — clean and clear beats dense. */
const WALL: WorkItem[] = [
  pick('kQKz4nE7ZxM'), // TVC — Bombay Jewellers
  pick('wsVu1zJFt-k'), // Documentary — Lord Lucan
  pick('qSGqVKzREdQ'), // Short film — Time's Up
  pick('EIaa0ZCCyYM'), // Kids animation showcase
  pick('yubYJ8DIjRQ'), // Charity — HRF Winter Souk
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
}

/** One clean LED screen: bezel → panel → label. */
function LedScreen({
  work,
  featured = false,
  onPlay,
}: {
  work: WorkItem;
  featured?: boolean;
  onPlay: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onPlay}
      title={work.title}
      aria-label={`Screen this film: ${work.title}`}
      className="group relative block w-full text-left"
    >
      {/* the bezel — a slim dark frame with a gentle glow */}
      <span
        className={
          'block rounded-[6px] border bg-[#0B0D13] p-[3px] transition-all ' +
          (featured
            ? 'border-[rgba(233,196,106,0.55)] shadow-[0_0_44px_-10px_rgba(233,196,106,0.6)] group-hover:border-[rgba(233,196,106,0.9)] group-hover:shadow-[0_0_54px_-8px_rgba(233,196,106,0.75)]'
            : 'border-[rgba(91,227,255,0.35)] shadow-[0_0_36px_-12px_rgba(91,227,255,0.55)] group-hover:border-[rgba(91,227,255,0.8)] group-hover:shadow-[0_0_48px_-10px_rgba(91,227,255,0.7)]')
        }
      >
        <span className="relative block aspect-video overflow-hidden rounded-[3px] bg-black">
          <Image
            src={ytThumb(work.id)}
            alt=""
            fill
            sizes="(max-width: 1280px) 22vw, 280px"
            className="mgst-led object-cover opacity-90 transition-opacity group-hover:opacity-100"
          />
          {/* LED scanline texture + gentle edge fall-off */}
          <span className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(180deg,rgba(0,0,0,0.14)_0_1px,transparent_1px_3px)] mix-blend-overlay" />
          <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_70%_at_50%_45%,transparent_60%,rgba(0,0,0,0.35))]" />
          {/* play iris on hover/focus */}
          <span className="pointer-events-none absolute inset-0 grid place-items-center opacity-0 transition-opacity group-focus-visible:opacity-100 group-hover:opacity-100">
            <span className="grid h-10 w-10 place-items-center rounded-full border border-gleam/80 bg-black/55 text-xs text-gleam shadow-[0_0_18px_rgba(233,196,106,0.6)]">
              ▶
            </span>
          </span>
        </span>
      </span>
      {/* readable label under the screen */}
      <span className="mt-1.5 block px-0.5">
        <span
          className={
            'block text-[9px] uppercase tracking-[0.22em] ' +
            (featured ? 'text-gleam/90' : 'text-[rgba(91,227,255,0.75)]')
          }
        >
          {featured ? 'Now screening · showreel' : categories[work.cat]}
        </span>
        <span className="mt-0.5 block truncate text-[11px] text-moon-soft transition-colors group-hover:text-moon">
          {work.title}
        </span>
      </span>
    </button>
  );
}

export default function SceneScreening({ active }: { active: boolean }) {
  const [playing, setPlaying] = useState<WorkItem | null>(null);

  /* Walking out of the screening room kills playback (and its audio) instantly. */
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
        {/* the rendered set — the private cinema room */}
        <SceneBackdrop src={ZONE_BACKDROPS.screening} scrim="top" />

        {/* ---- the video wall powers on as the visitor settles ---- */}
        <div data-mgst="scrHs" className="absolute inset-0 opacity-0" style={{ pointerEvents: 'none' }}>
          <div className="absolute inset-x-0 bottom-[7%] top-[19%] flex items-center justify-center px-[6vw]">
            <div className="grid w-full max-w-[68rem] grid-cols-4 gap-x-[1.4vw] gap-y-[2.6vh]">
              {SCREENING_WORKS.map((w, i) => (
                <LedScreen
                  key={w.id}
                  work={w}
                  featured={i === 0}
                  onPlay={() => setPlaying(w)}
                />
              ))}
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
          07 · Screening Room
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
                Back to the wall
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
