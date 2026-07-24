'use client';

import { STUDIO_ZONES } from './journey';

/**
 * Studio waypoint selector — not a website menu but the tour's holographic
 * "studio blueprint": a vertical light-path with one waypoint per room, each
 * carrying a glyph that evokes the space (building, desk beacon, holo lab,
 * LED wall, pipeline nodes, grade timeline, film reel, contact beacon).
 * Clicking a waypoint flies the camera there (Lenis scrollTo in
 * CinematicJourney). Labels slide out on hover/focus; the active room glows.
 */

/** One 16×16 glyph per room — stroke inherits currentColor. */
const GLYPHS: Record<string, JSX.Element> = {
  exterior: (
    // the studio building under the moon
    <>
      <path d="M2.5 13.5V7l5-3 5 3v6.5" />
      <path d="M6 13.5v-3h3v3" />
      <circle cx="13" cy="3.5" r="1.6" />
    </>
  ),
  reception: (
    // concierge desk beacon
    <>
      <path d="M2.5 11h11v2.5h-11z" />
      <path d="M8 11V8.2" />
      <circle cx="8" cy="5.8" r="1.8" />
      <path d="M4.6 3.4 5.7 4.5M11.4 3.4 10.3 4.5" />
    </>
  ),
  lab: (
    // floating holo screens
    <>
      <rect x="2" y="3" width="7.5" height="5" rx="0.8" />
      <rect x="6.5" y="8" width="7.5" height="5" rx="0.8" />
      <path d="M4 5.5h3.5M8.5 10.5H12" />
    </>
  ),
  soundstage: (
    // LED volume + camera dot
    <>
      <path d="M2 4.5c4-2 8-2 12 0v7c-4-2-8-2-12 0z" />
      <circle cx="8" cy="8" r="1.4" />
    </>
  ),
  process: (
    // connected pipeline nodes
    <>
      <circle cx="3" cy="8" r="1.5" />
      <circle cx="8" cy="8" r="1.5" />
      <circle cx="13" cy="8" r="1.5" />
      <path d="M4.5 8h2M9.5 8h2" />
    </>
  ),
  suite: (
    // edit timeline + playhead
    <>
      <rect x="2" y="4" width="12" height="8" rx="1" />
      <path d="M4 7h4M9.5 7H12M4 9.5h2.5M8 9.5h4M6.8 4v8" />
    </>
  ),
  portfolio: (
    // film reel
    <>
      <circle cx="8" cy="8" r="5.8" />
      <circle cx="8" cy="8" r="1.2" />
      <circle cx="8" cy="4.6" r="1" />
      <circle cx="8" cy="11.4" r="1" />
      <circle cx="4.6" cy="8" r="1" />
      <circle cx="11.4" cy="8" r="1" />
    </>
  ),
  contact: (
    // contact beacon signal
    <>
      <circle cx="8" cy="10.5" r="1.5" />
      <path d="M4.8 8.2a4.5 4.5 0 0 1 6.4 0M2.8 5.8a7.4 7.4 0 0 1 10.4 0" />
    </>
  ),
};

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
      className="absolute left-5 top-1/2 z-30 hidden -translate-y-1/2 lg:block"
    >
      <div className="mgst-holo-panel rounded-sm px-2.5 pb-3 pt-2.5">
        <p className="px-1 pb-2 text-center text-[8px] uppercase tracking-[0.4em] text-moon-faint">
          Studio<br />Map
        </p>
        <ul className="relative flex flex-col gap-1">
          {/* light-path spine connecting the waypoints */}
          <span
            aria-hidden
            className="mgst-path absolute bottom-4 left-[17px] top-4 w-px opacity-70"
          />
          {STUDIO_ZONES.map((z) => {
            const isActive = active === z.key;
            return (
              <li key={z.key} className="relative">
                <button
                  type="button"
                  onClick={() => onGo(z.target)}
                  aria-current={isActive ? 'location' : undefined}
                  aria-label={`Go to ${z.label}`}
                  className={
                    'group relative flex items-center gap-0 rounded-[3px] p-1 transition-colors ' +
                    (isActive ? 'text-gleam' : 'text-moon-soft hover:text-moon')
                  }
                >
                  {/* waypoint glyph */}
                  <span
                    className={
                      'relative grid h-7 w-7 shrink-0 place-items-center border transition-all ' +
                      '[clip-path:polygon(4px_0,100%_0,100%_calc(100%-4px),calc(100%-4px)_100%,0_100%,0_4px)] ' +
                      (isActive
                        ? 'border-gleam/70 bg-gleam/10 shadow-[0_0_14px_-2px_rgba(233,196,106,0.7)]'
                        : 'border-white/15 bg-black/45 group-hover:border-[rgba(91,227,255,0.5)]')
                    }
                  >
                    <svg
                      viewBox="0 0 16 16"
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden
                    >
                      {GLYPHS[z.key]}
                    </svg>
                  </span>
                  {/* label slides out like a HUD readout */}
                  <span
                    className={
                      'pointer-events-none max-w-0 overflow-hidden whitespace-nowrap text-[10px] uppercase tracking-[0.24em] transition-all duration-300 ' +
                      'group-hover:ml-2.5 group-hover:max-w-[9rem] group-focus-visible:ml-2.5 group-focus-visible:max-w-[9rem] ' +
                      (isActive ? 'ml-2.5 max-w-[9rem]' : '')
                    }
                  >
                    {z.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
