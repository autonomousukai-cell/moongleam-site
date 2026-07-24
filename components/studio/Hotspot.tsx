'use client';

import { useState } from 'react';

/**
 * Tour hotspot — a lens-flare marker in the scene: an anamorphic flare line,
 * a pulsing diffraction ring and an aperture-iris core. Click toggles a
 * holographic tour-point card. The same component carries info, video and
 * service reveals across every zone.
 */
export default function Hotspot({
  label,
  body,
  side = 'right',
}: {
  label: string;
  body: string;
  /** Which side the info card opens on. */
  side?: 'left' | 'right';
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      {/* anamorphic flare line through the marker */}
      <span
        aria-hidden
        className="mgst-flare pointer-events-none absolute left-1/2 top-1/2 h-px w-24 -translate-x-1/2 -translate-y-1/2 bg-[linear-gradient(90deg,transparent,rgba(91,227,255,0.8),transparent)]"
      />
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={`${label} — tour hotspot`}
        className="relative grid h-9 w-9 place-items-center rounded-full transition-transform hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5BE3FF]"
      >
        {/* pulsing diffraction ring */}
        <span className="mgst-ping absolute inset-0 rounded-full border border-[rgba(91,227,255,0.6)]" aria-hidden />
        {/* aperture iris */}
        <svg
          viewBox="0 0 24 24"
          className="h-7 w-7 text-white/80 drop-shadow-[0_0_6px_rgba(91,227,255,0.7)]"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.1"
          aria-hidden
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M12 3v6.2M19.8 7.5l-5.4 3.1M19.8 16.5l-5.4-3.1M12 21v-6.2M4.2 16.5l5.4-3.1M4.2 7.5l5.4 3.1" />
        </svg>
        <span
          className="absolute h-1.5 w-1.5 rounded-full bg-[#E9C46A] shadow-[0_0_8px_2px_rgba(233,196,106,0.8)]"
          aria-hidden
        />
      </button>
      {open && (
        <div
          className={
            'mgst-holo-panel absolute top-1/2 z-40 w-60 -translate-y-1/2 rounded-sm p-4 ' +
            (side === 'right' ? 'left-12' : 'right-12')
          }
        >
          <p className="text-[8px] uppercase tracking-[0.34em] text-moon-faint">Tour point</p>
          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-gleam">{label}</p>
          <p className="mt-1.5 text-xs leading-relaxed text-moon">{body}</p>
        </div>
      )}
    </div>
  );
}
