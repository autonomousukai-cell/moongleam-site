'use client';

import Image from 'next/image';

/**
 * Branded Moon Gleam loading sequence — shown while the tour code chunk and
 * critical visuals preload. `progress` is 0–1; `leaving` fades the whole
 * screen out once the studio is ready.
 */
export default function LoadingScreen({
  progress,
  leaving = false,
}: {
  progress: number;
  leaving?: boolean;
}) {
  const pct = Math.round(Math.min(1, Math.max(0, progress)) * 100);
  return (
    <div
      aria-hidden={leaving}
      className={
        'fixed inset-0 z-[70] flex flex-col items-center justify-center bg-[#05060A] transition-opacity duration-700 ' +
        (leaving ? 'pointer-events-none opacity-0' : 'opacity-100')
      }
    >
      <Image
        src="/mg-logo.png"
        alt="Moon Gleam"
        width={64}
        height={64}
        priority
        className="h-16 w-16 object-contain drop-shadow-[0_0_24px_rgba(233,196,106,0.45)]"
      />
      <p className="mgst-sheen mt-6 bg-[linear-gradient(100deg,#8A9099_35%,#F4D889_50%,#8A9099_65%)] bg-clip-text text-xl font-medium tracking-[0.32em] text-transparent [font-family:var(--font-studio-display)]">
        MOON&nbsp;GLEAM
      </p>
      <p className="mt-2 text-[10px] uppercase tracking-[0.5em] text-moon-faint">
        AI Film Studio
      </p>

      <div
        className="mt-10 h-px w-56 overflow-hidden rounded-full bg-white/10"
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
      <p className="mt-4 text-[11px] tracking-[0.2em] text-moon-soft">
        Preparing the studio&hellip; <span className="tabular-nums">{pct}%</span>
      </p>
    </div>
  );
}
