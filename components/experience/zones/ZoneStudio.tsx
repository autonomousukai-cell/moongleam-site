'use client';

import Image from 'next/image';
import ZoneLayer from '../ZoneLayer';
import Typewriter from '../Typewriter';
import { seg, smooth } from '../scenes';
import { portfolio, ytThumb } from '@/lib/data';

const CLIPS = ['Script', 'Voiceover', 'B-roll', 'Grade', 'Render'];
const hero = portfolio[0];

/** Zone 3 — EDITING BAY (0.30–0.44) then PRESENT / ta-da (0.44–0.55). */
export default function ZoneStudio({ progress }: { progress: number }) {
  const edit = seg(progress, 0.3, 0.44);
  const present = seg(progress, 0.44, 0.55);
  const lift = smooth(present);

  return (
    <ZoneLayer progress={progress} start={0.3} end={0.55}>
      <div className="w-full max-w-4xl">
        {/* Floating brief line */}
        <div className="mx-auto mb-6 max-w-xl rounded-xl border border-ink-line bg-ink-soft/80 px-5 py-3 text-center backdrop-blur">
          <span className="mr-2 text-[11px] font-medium uppercase tracking-[0.2em] text-moon-faint">
            Brief
          </span>
          <span className="font-display text-sm text-moon sm:text-base">
            <Typewriter
              lines={['“A 30-second promo for my law firm — trustworthy, cinematic.”']}
              loop={false}
              typeSpeed={38}
            />
          </span>
        </div>

        {/* Editing timeline UI */}
        <div className="rounded-2xl border border-ink-line bg-ink-soft/70 p-4 backdrop-blur sm:p-6">
          <div className="mb-3 flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-gleam/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-moon/40" />
            <span className="h-2.5 w-2.5 rounded-full bg-moon/20" />
            <span className="ml-2 text-[10px] font-medium uppercase tracking-[0.2em] text-glow">
              Gleam is editing…
            </span>
          </div>
          <div className="space-y-2">
            {[0, 1].map((row) => (
              <div key={row} className="flex gap-2">
                {CLIPS.map((label, i) => {
                  const t = smooth(Math.min(1, Math.max(0, (edit - (i + row) * 0.09) / 0.24)));
                  return (
                    <div
                      key={label + row}
                      className="flex h-9 flex-1 items-center justify-center rounded-md border border-gleam/25 bg-gradient-to-r from-ink to-ink-soft text-[10px] font-medium text-moon-soft sm:text-xs"
                      style={{
                        opacity: 0.1 + t * 0.9,
                        transform: `translateX(${(1 - t) * -40}px)`,
                      }}
                    >
                      {row === 0 ? label : ''}
                    </div>
                  );
                })}
              </div>
            ))}
            {/* progress scrubber */}
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-ink">
              <div className="h-full bg-gleam" style={{ width: `${edit * 100}%` }} />
            </div>
          </div>
        </div>

        {/* Rendered video card — appears late in edit, lifts on present (ta-da) */}
        <div className="mt-6 flex justify-center">
          <div
            className="relative w-full max-w-md overflow-hidden rounded-2xl border border-gleam/40 bg-ink-soft shadow-gleam-glow"
            data-cursor="video"
            style={{
              opacity: Math.min(1, edit * 1.4) * (0.4 + 0.6),
              transform: `translateY(${-lift * 40}px) scale(${1 + lift * 0.05})`,
            }}
          >
            <div className="relative aspect-video">
              {hero && (
                <Image
                  src={ytThumb(hero.id)}
                  alt="Rendered promo — finished by Gleam"
                  fill
                  sizes="(max-width: 640px) 90vw, 28rem"
                  className="object-cover"
                />
              )}
              <div className="absolute inset-0 grid place-items-center bg-ink/30">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-gleam text-ink shadow-gleam-glow">
                  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </div>
              {lift > 0.2 && (
                <span className="absolute left-3 top-3 rounded-full bg-gleam px-3 py-1 text-[11px] font-semibold text-ink">
                  Delivered ✦
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </ZoneLayer>
  );
}
