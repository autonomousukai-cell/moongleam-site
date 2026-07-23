'use client';

import { useState } from 'react';

/**
 * Circular hotspot marker — the virtual-tour interaction points overlaid on
 * the scene. Click toggles a small info card. Phase 1 ships two of these;
 * later zones add video/service reveals through the same component.
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
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={`${label} — tour hotspot`}
        className="relative grid h-9 w-9 place-items-center rounded-full border border-white/40 bg-white/10 backdrop-blur-sm transition-transform hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5BE3FF]"
      >
        <span className="mgst-ping absolute inset-0 rounded-full border border-white/50" aria-hidden />
        <span className="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_8px_2px_rgba(255,255,255,0.7)]" aria-hidden />
      </button>
      {open && (
        <div
          className={
            'absolute top-1/2 z-40 w-60 -translate-y-1/2 rounded-xl border border-white/10 bg-black/75 p-4 backdrop-blur-md ' +
            (side === 'right' ? 'left-12' : 'right-12')
          }
        >
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gleam">{label}</p>
          <p className="mt-1.5 text-xs leading-relaxed text-moon">{body}</p>
        </div>
      )}
    </div>
  );
}
