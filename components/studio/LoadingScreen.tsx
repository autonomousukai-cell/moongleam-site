'use client';

import Image from 'next/image';

/** The studio "boots" in stages while assets preload. */
const STATUS = [
  [0.25, 'Powering the stage'],
  [0.5, 'Calibrating lenses'],
  [0.85, 'Loading the sets'],
  [1.01, 'Rolling'],
] as const;

/**
 * Branded loading sequence — an academy film-leader countdown crossed with a
 * studio boot screen: sweep hand, crosshair reticle, staged status readout
 * and a light-path progress strip. `progress` is 0–1; `leaving` fades the
 * whole screen out once the studio is ready.
 */
export default function LoadingScreen({
  progress,
  leaving = false,
}: {
  progress: number;
  leaving?: boolean;
}) {
  const p = Math.min(1, Math.max(0, progress));
  const pct = Math.round(p * 100);
  const status = STATUS.find(([end]) => p < end)?.[1] ?? 'Rolling';

  return (
    <div
      aria-hidden={leaving}
      className={
        'fixed inset-0 z-[70] flex flex-col items-center justify-center bg-[#05060A] transition-opacity duration-700 ' +
        (leaving ? 'pointer-events-none opacity-0' : 'opacity-100')
      }
    >
      {/* film-leader ring: reticle + sweep hand around the logo */}
      <div className="relative grid h-40 w-40 place-items-center">
        <svg viewBox="0 0 160 160" className="absolute inset-0" fill="none" aria-hidden>
          {/* leader crosshair */}
          <path d="M80 2v22M80 136v22M2 80h22M136 80h22" stroke="rgba(199,204,209,0.25)" strokeWidth="1" />
          <circle cx="80" cy="80" r="66" stroke="rgba(199,204,209,0.18)" strokeWidth="1" />
          <circle cx="80" cy="80" r="52" stroke="rgba(91,227,255,0.25)" strokeWidth="1" />
          {/* progress arc — fills as the studio loads */}
          <circle
            cx="80"
            cy="80"
            r="66"
            stroke="url(#mgstLeaderGrad)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={`${(p * 2 * Math.PI * 66).toFixed(1)} ${(2 * Math.PI * 66).toFixed(1)}`}
            transform="rotate(-90 80 80)"
          />
          <defs>
            <linearGradient id="mgstLeaderGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#5BE3FF" />
              <stop offset="0.55" stopColor="#8B7CF6" />
              <stop offset="1" stopColor="#E9C46A" />
            </linearGradient>
          </defs>
        </svg>
        {/* sweep hand */}
        <svg viewBox="0 0 160 160" className="mgst-sweep absolute inset-0" fill="none" aria-hidden>
          <path d="M80 80 L80 16" stroke="rgba(91,227,255,0.35)" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <Image
          src="/mg-logo.png"
          alt="Moon Gleam"
          width={56}
          height={56}
          priority
          className="h-14 w-14 object-contain drop-shadow-[0_0_24px_rgba(233,196,106,0.45)]"
        />
      </div>

      {/* no name wordmark — the studio name reads off the building signage
          in the exterior plate; the logo mark above carries the brand */}
      <p className="mgst-sheen mt-6 bg-[linear-gradient(100deg,#8A9099_35%,#F4D889_50%,#8A9099_65%)] bg-clip-text text-[11px] uppercase tracking-[0.5em] text-transparent">
        AI Film Studio
      </p>

      <div
        className="mt-9 h-px w-56 overflow-hidden rounded-full bg-white/10"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Loading the studio"
      >
        <div
          className="h-full bg-gradient-to-r from-[#5BE3FF] via-[#8B7CF6] to-[#E9C46A] transition-[width] duration-200 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="mt-4 text-[10px] uppercase tracking-[0.3em] text-moon-soft">
        {status}&hellip;{' '}
        <span className="font-mono tabular-nums tracking-normal text-moon-faint">
          {String(pct).padStart(3, '0')}
        </span>
      </p>
    </div>
  );
}
