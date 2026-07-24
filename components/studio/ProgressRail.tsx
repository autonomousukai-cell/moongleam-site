'use client';

import { ZONE_TICKS } from './journey';

/**
 * Film-timeline progress — the visitor's position in the studio read as a
 * reel of film: a scroll-driven reel that spins as the journey advances, a
 * vertical film-strip rail (sprocket holes + cyan→violet→amber light-path
 * fill), one clickable frame-tick per room, and an SMPTE-style timecode.
 * Label, fill, reel rotation and timecode are written directly by the
 * engine ([data-mgst]) — zero React re-renders while scrubbing.
 */
export default function ProgressRail({ onGo }: { onGo?: (target: number) => void }) {
  return (
    <div className="absolute right-5 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-center gap-3 md:flex">
      {/* current room, set vertically like a film-can label */}
      <span
        data-mgst="zoneLabel"
        className="text-[10px] uppercase tracking-[0.32em] text-moon-soft [writing-mode:vertical-rl]"
      >
        Exterior
      </span>

      {/* take-up reel — the engine rotates it with progress */}
      <svg
        data-mgst="reel"
        viewBox="0 0 24 24"
        className="h-6 w-6 text-moon-soft will-change-transform"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        aria-hidden
      >
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="1.6" />
        <circle cx="12" cy="6.4" r="1.5" />
        <circle cx="12" cy="17.6" r="1.5" />
        <circle cx="6.4" cy="12" r="1.5" />
        <circle cx="17.6" cy="12" r="1.5" />
      </svg>

      {/* the film strip */}
      <div className="relative h-52 w-4">
        {/* sprocket holes either side */}
        <div className="absolute inset-y-0 left-0 w-[3px] [background-image:repeating-linear-gradient(180deg,rgba(199,204,209,0.35)_0_3px,transparent_3px_9px)]" />
        <div className="absolute inset-y-0 right-0 w-[3px] [background-image:repeating-linear-gradient(180deg,rgba(199,204,209,0.35)_0_3px,transparent_3px_9px)]" />
        {/* frame channel + light-path fill */}
        <div className="absolute inset-y-0 left-1/2 w-[3px] -translate-x-1/2 overflow-hidden rounded-full bg-white/10">
          <div
            data-mgst="railFill"
            className="absolute inset-0 origin-top scale-y-0 bg-gradient-to-b from-[#5BE3FF] via-[#8B7CF6] to-[#E9C46A] shadow-[0_0_10px_1px_rgba(139,124,246,0.5)]"
          />
        </div>
        {/* one frame-tick per room — click to fly there */}
        {ZONE_TICKS.map((t) => (
          <button
            key={t.key}
            type="button"
            title={t.label}
            aria-label={`Go to ${t.label}`}
            onClick={onGo ? () => onGo(t.at) : undefined}
            className="absolute left-1/2 h-[7px] w-[9px] -translate-x-1/2 -translate-y-1/2 border border-white/30 bg-[#05060A] transition-colors hover:border-gleam/80 hover:bg-gleam/20 focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#5BE3FF]"
            style={{ top: `${t.at * 100}%` }}
          />
        ))}
      </div>

      {/* SMPTE-ish timecode readout, written by the engine */}
      <span
        data-mgst="pct"
        className="font-mono text-[9px] tabular-nums tracking-[0.14em] text-moon-soft"
      >
        00:00:00:00
      </span>
    </div>
  );
}
