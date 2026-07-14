'use client';

import Link from 'next/link';
import ZoneLayer from '../ZoneLayer';
import Typewriter from '../Typewriter';
import { site } from '@/lib/site';

/** Zone 6 — EXIT. Gleam waves; final call to action. */
export default function ZoneExit({ progress }: { progress: number }) {
  return (
    <ZoneLayer progress={progress} start={0.86} end={1.0}>
      <div className="w-full max-w-2xl text-center">
        <h2 className="min-h-[2.4em] font-display text-[clamp(1.6rem,4.5vw,3rem)] font-semibold leading-tight text-moon">
          <Typewriter
            lines={["Ready to see your brand come to life? Let's talk."]}
            loop={false}
          />
        </h2>
        <p className="mt-4 text-moon-soft">
          Book a free 15-minute demo and Gleam will show you exactly what your first video could look like.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/contact"
            data-cursor="cta"
            className="inline-flex items-center gap-2 rounded-full bg-gleam px-8 py-3.5 font-semibold text-ink shadow-gleam-glow transition-transform duration-200 hover:scale-[1.03] hover:bg-gleam-bright"
          >
            <span className="exp-clap h-4 w-4 rounded-sm" aria-hidden="true" />
            Book a Free Demo
          </Link>
          <a
            href={site.messenger}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="cta"
            className="rounded-full border border-moon/30 bg-ink/40 px-8 py-3.5 font-medium text-moon backdrop-blur transition-colors duration-200 hover:border-gleam/60 hover:text-gleam"
          >
            Chat on Messenger
          </a>
        </div>
      </div>
    </ZoneLayer>
  );
}
