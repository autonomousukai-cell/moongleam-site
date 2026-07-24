'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import LeadForm from '@/components/LeadForm';
import SocialIcons from '@/components/SocialIcons';
import { site } from '@/lib/site';
import { categories, ytThumb } from '@/lib/data';
import {
  LAB_SERVICES,
  PIPELINE_STEPS,
  SUITE_PROOFS,
  ZONE_BACKDROPS,
} from './journey';
import { SCREENING_WORKS } from './SceneScreening';

/**
 * Lightweight fallback for mobile (animate=true, gentle in-view reveals) and
 * prefers-reduced-motion (animate=false, fully static). Tells the full
 * 8-zone story — exterior → reception → lab → soundstage → pipeline →
 * suite → screening room → booking — as standard accessible sections over
 * the same AI-rendered studio sets as the desktop tour, with the SEO page
 * content (<StudioDetails/>) rendered beneath by the page. Native scroll
 * only — nothing here may ever lock or intercept the page.
 */

/** A zone's rendered set as a section plate, darkened for legibility. */
function Set({ src, eager = false }: { src: string; eager?: boolean }) {
  return (
    <div className="absolute inset-0" aria-hidden>
      {/* eslint-disable-next-line @next/next/no-img-element -- set plates share the desktop tour's pre-optimised WebP URLs */}
      <img
        src={src}
        alt=""
        draggable={false}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        className="h-full w-full select-none object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,4,9,0.72),rgba(2,4,9,0.3)_38%,rgba(2,4,9,0.35)_62%,rgba(2,4,9,0.82))]" />
    </div>
  );
}

export default function NarrativeFallback({ animate }: { animate: boolean }) {
  const reveal = (delay = 0) =>
    animate
      ? {
          initial: { opacity: 0, y: 26 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: '-12% 0px' },
          transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as const },
        }
      : {};

  const kicker = 'text-[10px] uppercase tracking-[0.5em] text-moon-soft';
  const headline =
    'mt-4 text-balance text-3xl font-medium leading-snug text-white [font-family:var(--font-studio-display)] [text-shadow:0_2px_30px_rgba(0,0,0,0.8)] sm:text-4xl';
  const chip =
    'border border-white/15 bg-black/40 px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] text-moon [clip-path:polygon(6px_0,100%_0,100%_calc(100%-6px),calc(100%-6px)_100%,0_100%,0_6px)]';

  return (
    <div className="bg-[#05060A] text-moon">
      {/* -------- ZONE 1 · EXTERIOR -------- */}
      <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 text-center">
        <Set src={ZONE_BACKDROPS.exterior} eager />

        <motion.div {...reveal()} className="relative z-10">
          <h1 className="text-balance text-4xl font-medium leading-tight tracking-tight text-white [font-family:var(--font-studio-display)] [text-shadow:0_2px_36px_rgba(0,0,0,0.8)] sm:text-5xl">
            Moon Gleam AI Studio
          </h1>
          <p className="mx-auto mt-4 max-w-md text-xs uppercase tracking-[0.3em] text-moon sm:text-sm">
            AI Films. Cinematic Stories. Limitless Worlds.
          </p>
        </motion.div>

        <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-center">
          <p className="text-[10px] uppercase tracking-[0.4em] text-moon-soft">Scroll to enter</p>
          <div
            className={
              'mx-auto mt-2.5 h-4 w-4 rotate-45 border-b border-r border-moon/60 ' +
              (animate ? 'mgst-bob' : '')
            }
          />
        </div>
      </section>

      {/* -------- ZONE 2 · RECEPTION -------- */}
      <section className="relative flex min-h-[92svh] flex-col items-center justify-center overflow-hidden px-6 text-center">
        <Set src={ZONE_BACKDROPS.reception} />

        <motion.div {...reveal()} className="relative z-10">
          <p className={kicker}>Reception · AI Film Studio</p>
          <h2 className={headline}>Welcome to the future of film production.</h2>
          <p className="mt-5 text-[10px] uppercase tracking-[0.24em] text-moon-faint">
            Full cinematic tour available on desktop
          </p>
        </motion.div>
      </section>

      {/* -------- ZONE 3 · AI CREATIVE LAB -------- */}
      <section className="relative flex min-h-[88svh] flex-col items-center justify-center overflow-hidden px-6 text-center">
        <Set src={ZONE_BACKDROPS.lab} />

        <motion.div {...reveal()} className="relative z-10">
          <p className={kicker}>03 · AI Creative Lab</p>
          <h2 className={headline}>From an idea to a cinematic universe.</h2>
          <div className="mx-auto mt-6 flex max-w-sm flex-wrap items-center justify-center gap-2">
            {LAB_SERVICES.map((s) => (
              <span key={s} className={chip}>
                {s}
              </span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* -------- ZONE 4 · VIRTUAL SOUNDSTAGE -------- */}
      <section className="relative flex min-h-[88svh] flex-col items-center justify-center overflow-hidden px-6 text-center">
        <Set src={ZONE_BACKDROPS.soundstage} />

        <motion.div {...reveal()} className="relative z-10">
          <p className={kicker}>04 · Virtual Soundstage</p>
          <h2 className={headline}>Anything you can imagine can become a set.</h2>
          <a
            href={site.social.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="mgst-hud-btn-ghost mt-6 !px-6 !py-2.5 !text-xs"
          >
            Watch the showreel
          </a>
        </motion.div>
      </section>

      {/* -------- ZONE 5 · PRODUCTION PIPELINE -------- */}
      <section className="relative flex min-h-[88svh] flex-col items-center justify-center overflow-hidden px-6 text-center">
        <Set src={ZONE_BACKDROPS.pipeline} />

        <motion.div {...reveal()} className="relative z-10">
          <p className={kicker}>05 · Production Pipeline</p>
          <h2 className={headline}>AI-powered. Human-directed.</h2>
          <ol className="mx-auto mt-8 max-w-xs space-y-0 text-left">
            {PIPELINE_STEPS.map((step, i) => (
              <li key={step} className="flex items-start gap-3">
                <span className="flex flex-col items-center">
                  <span
                    className="mt-1 h-2.5 w-2.5 rounded-full"
                    style={{
                      background: ['#5BE3FF', '#5BE3FF', '#8B7CF6', '#8B7CF6', '#B58FD8', '#E9C46A', '#E9C46A'][i],
                      boxShadow: '0 0 10px 2px rgba(139,124,246,0.35)',
                    }}
                  />
                  {i < PIPELINE_STEPS.length - 1 && (
                    <span className="h-6 w-px bg-gradient-to-b from-white/25 to-white/5" />
                  )}
                </span>
                <span className="text-sm tracking-wide text-moon">{step}</span>
              </li>
            ))}
          </ol>
        </motion.div>
      </section>

      {/* -------- ZONE 6 · EDITING & RENDER SUITE -------- */}
      <section className="relative flex min-h-[80svh] flex-col items-center justify-center overflow-hidden px-6 text-center">
        <Set src={ZONE_BACKDROPS.suite} />

        <motion.div {...reveal()} className="relative z-10">
          <p className={kicker}>06 · Editing &amp; Render Suite</p>
          <h2 className={headline}>Fast production. Film-level detail.</h2>
          <div className="mx-auto mt-6 flex max-w-sm flex-wrap items-center justify-center gap-2">
            {SUITE_PROOFS.map((s) => (
              <span key={s} className={chip}>
                {s}
              </span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* -------- ZONE 7 · SCREENING ROOM -------- */}
      <section className="relative flex min-h-[92svh] flex-col items-center justify-center overflow-hidden px-6 text-center">
        <Set src={ZONE_BACKDROPS.screening} />

        <motion.div {...reveal()} className="relative z-10 w-full max-w-md">
          <p className={kicker}>07 · Screening Room</p>
          <h2 className={headline}>Selected worlds we have brought to life.</h2>
          <div className="mt-7 grid grid-cols-2 gap-3">
            {SCREENING_WORKS.slice(0, 4).map((w) => (
              <Link
                key={w.id}
                href="/work"
                className="group overflow-hidden rounded-lg border border-white/10 bg-black/50 text-left transition-colors hover:border-gleam/50"
              >
                <div className="relative aspect-video">
                  <Image
                    src={ytThumb(w.id)}
                    alt={w.title}
                    fill
                    sizes="(max-width: 640px) 45vw, 220px"
                    className="object-cover opacity-80 transition-opacity group-hover:opacity-100"
                  />
                </div>
                <div className="bg-black/60 px-2.5 py-1.5">
                  <p className="text-[8px] uppercase tracking-[0.16em] text-gleam/80">
                    {categories[w.cat]}
                  </p>
                  <p className="truncate text-[11px] text-moon">{w.title}</p>
                </div>
              </Link>
            ))}
          </div>
          <Link href="/work" className="mgst-hud-btn mt-6 !px-7 !py-3">
            View our work
          </Link>
        </motion.div>
      </section>

      {/* -------- ZONE 8 · BOOKING -------- */}
      <section className="relative overflow-hidden px-6 py-20 sm:py-24">
        <Set src={ZONE_BACKDROPS.booking} />

        <motion.div {...reveal()} className="relative z-10 mx-auto max-w-md text-center">
          <p className={kicker}>08 · Booking</p>
          <h2 className={headline}>Ready to create what has never been seen?</h2>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link href="/contact" className="mgst-hud-btn">
              Start your project
            </Link>
            <Link href="/contact" className="mgst-hud-btn-ghost">
              Book a discovery call
            </Link>
            <a
              href={site.contact.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mgst-hud-btn-ghost"
            >
              WhatsApp us
            </a>
          </div>
          <div className="mt-7 space-y-1.5 text-sm text-moon-soft">
            <p>
              <a href={site.contact.phoneHref} className="hover:text-gleam">
                {site.contact.phone}
              </a>
            </p>
            <p>
              <a href={`mailto:${site.contact.email}`} className="hover:text-gleam">
                {site.contact.email}
              </a>
            </p>
            <p className="text-moon-faint">{site.contact.address}</p>
          </div>
          <div className="mt-6 flex justify-center">
            <SocialIcons />
          </div>
          <div className="mt-10 text-left">
            <LeadForm />
          </div>
        </motion.div>
      </section>
    </div>
  );
}
