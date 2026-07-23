'use client';

import { STUDIO_ZONES } from './journey';

/**
 * Persistent tour navigation — Exterior · Reception · Lab · Soundstage ·
 * Process · Portfolio · Contact. Clicking a wired zone flies the camera there
 * (via Lenis scrollTo in CinematicJourney); Phase-2 zones are shown but
 * disabled with a "soon" tag, per the stage-gate brief.
 */
export default function StudioNav({
  active,
  onGo,
}: {
  active: string;
  onGo: (target: number) => void;
}) {
  return (
    <nav
      aria-label="Studio tour zones"
      className="absolute left-4 top-1/2 z-30 hidden -translate-y-1/2 lg:block"
    >
      <ul className="flex flex-col gap-0.5 rounded-2xl border border-white/10 bg-black/45 p-2 backdrop-blur-md">
        {STUDIO_ZONES.map((z) => {
          const wired = z.target !== null;
          const isActive = active === z.key;
          return (
            <li key={z.key}>
              <button
                type="button"
                disabled={!wired}
                onClick={() => wired && onGo(z.target as number)}
                title={wired ? `Go to ${z.label}` : `${z.label} — opening in Phase 2`}
                aria-current={isActive ? 'location' : undefined}
                className={
                  'group flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-xs tracking-wide transition-colors ' +
                  (isActive
                    ? 'bg-white/10 text-white'
                    : wired
                      ? 'text-moon-soft hover:bg-white/5 hover:text-moon'
                      : 'cursor-not-allowed text-moon-faint')
                }
              >
                <span
                  aria-hidden
                  className={
                    'h-1.5 w-1.5 shrink-0 rounded-full transition-colors ' +
                    (isActive
                      ? 'bg-gleam shadow-[0_0_8px_2px_rgba(233,196,106,0.5)]'
                      : wired
                        ? 'bg-moon-soft/60'
                        : 'bg-moon-faint/40')
                  }
                />
                {z.label}
                {!wired && (
                  <span className="ml-auto rounded-full border border-white/10 px-1.5 py-px text-[8px] uppercase tracking-[0.14em] text-moon-faint">
                    soon
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
