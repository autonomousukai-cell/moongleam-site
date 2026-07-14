'use client';

import Link from 'next/link';
import ZoneLayer from '../ZoneLayer';
import Typewriter from '../Typewriter';

const LINES = [
  "Hi, I'm Gleam — I make videos for brands like yours.",
  'Studio-quality video. Zero crew, zero delays.',
  'One AI. Infinite creative output.',
  "Give me a brief. I'll give you a video by tomorrow.",
];

/** Zone 1 — HERO. Gleam operates the camera. */
export default function ZoneHero({ progress }: { progress: number }) {
  return (
    <ZoneLayer progress={progress} start={0.0} end={0.14}>
      <div className="w-full max-w-3xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-gleam/30 bg-ink-soft/60 px-4 py-1.5 text-xs font-medium text-moon-soft backdrop-blur">
          <span className="h-2 w-2 rounded-full bg-gleam" />
          A guided tour of the studio
        </span>

        <h1 className="mt-6 min-h-[4.5em] font-display text-[clamp(1.8rem,5vw,3.5rem)] font-semibold leading-tight text-moon sm:min-h-[2.4em]">
          <Typewriter lines={LINES} />
        </h1>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/contact"
            data-cursor="cta"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gleam px-7 py-3 font-semibold text-ink shadow-gleam-glow transition-transform duration-200 hover:scale-[1.03] hover:bg-gleam-bright"
          >
            <span className="exp-clap h-4 w-4 rounded-sm" aria-hidden="true" />
            Book a Free Demo
          </Link>
          <Link
            href="/work"
            data-cursor="cta"
            className="rounded-full border border-moon/30 bg-ink/40 px-7 py-3 font-medium text-moon backdrop-blur transition-colors duration-200 hover:border-gleam/60 hover:text-gleam"
          >
            See Our Work
          </Link>
        </div>

        <div className="mt-14 flex flex-col items-center gap-2 text-moon-faint">
          <span className="text-[11px] font-medium uppercase tracking-[0.25em]">
            Scroll to see how
          </span>
          <svg className="exp-bob h-6 w-6 text-gleam" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <path d="M12 5v14M6 13l6 6 6-6" />
          </svg>
        </div>
      </div>
    </ZoneLayer>
  );
}
