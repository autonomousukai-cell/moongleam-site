'use client';

import { site } from '@/lib/site';

/**
 * Floating Facebook Messenger button — site-wide, fixed bottom-right.
 * Gold/dark circular button that gently pulses and expands on hover to reveal
 * "Talk to a creative expert". Sits above the footer; nudged up on mobile so it
 * doesn't collide with sticky CTAs.
 */
export default function MessengerFab() {
  return (
    <a
      href={site.messenger}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Message Moon Gleam on Facebook Messenger"
      className="group fixed bottom-5 right-5 z-[90] flex items-center gap-0 overflow-hidden rounded-full border border-gleam/40 bg-ink-soft/95 shadow-gleam-glow backdrop-blur-md transition-all duration-300 hover:gap-2 hover:pr-5 md:bottom-6 md:right-6"
    >
      <span className="dot-pulse grid h-14 w-14 shrink-0 place-items-center rounded-full bg-gleam text-ink">
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7" aria-hidden>
          <path d="M12 2C6.2 2 2 6.34 2 11.85c0 3.14 1.44 5.94 3.7 7.77V22l3.38-1.86c.9.25 1.86.38 2.92.38 5.8 0 10-4.34 10-9.85S17.8 2 12 2Zm1.02 13.26-2.56-2.73-4.99 2.73 5.49-5.83 2.62 2.73 4.93-2.73-5.49 5.83Z" />
        </svg>
      </span>
      <span className="max-w-0 whitespace-nowrap pr-0 text-sm font-semibold text-moon opacity-0 transition-all duration-300 group-hover:max-w-[200px] group-hover:pr-1 group-hover:opacity-100">
        Talk to a creative expert
      </span>
    </a>
  );
}
