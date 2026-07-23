'use client';

/**
 * Journey progress indicator — current location label, a vertical rail that
 * fills cyan→violet→amber as the visitor travels, and a percent readout.
 * All three are written directly by the engine ([data-mgst]) — zero
 * React re-renders while scrubbing.
 */
export default function ProgressRail() {
  return (
    <div className="absolute right-4 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-center gap-3 md:flex">
      <span
        data-mgst="zoneLabel"
        className="text-[10px] uppercase tracking-[0.32em] text-moon-soft [writing-mode:vertical-rl]"
      >
        Exterior
      </span>
      <div className="relative h-36 w-px overflow-hidden rounded-full bg-white/10">
        <div
          data-mgst="railFill"
          className="absolute inset-0 origin-top scale-y-0 bg-gradient-to-b from-[#5BE3FF] via-[#8B7CF6] to-[#E9C46A]"
        />
      </div>
      <span data-mgst="pct" className="text-[10px] tabular-nums text-moon-soft">
        00%
      </span>
    </div>
  );
}
