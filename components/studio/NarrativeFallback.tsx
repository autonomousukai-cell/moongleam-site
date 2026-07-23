'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import LeadForm from '@/components/LeadForm';
import SocialIcons from '@/components/SocialIcons';
import { site } from '@/lib/site';
import { categories, ytThumb } from '@/lib/data';
import { LAB_SERVICES, PIPELINE_STEPS, SUITE_PROOFS } from './journey';
import { SCREENING_WORKS } from './SceneScreening';

/**
 * Lightweight fallback for mobile (animate=true, gentle in-view reveals) and
 * prefers-reduced-motion (animate=false, fully static). Tells the full
 * 8-zone story — exterior → reception → lab → soundstage → pipeline →
 * suite → screening room → booking — as standard accessible sections, with
 * the SEO page content (<StudioDetails/>) rendered beneath by the page.
 */
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

  return (
    <div className="bg-[#05060A] text-moon">
      {/* -------- ZONE 1 · EXTERIOR -------- */}
      <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 text-center">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#020409_0%,#070B14_46%,#0C0F18_72%,#05060A_100%)]" />
        {/* moon */}
        <div className="absolute right-[12%] top-[8%] h-14 w-14 rounded-full bg-[radial-gradient(circle_at_38%_35%,#F5F7FA_0%,#D9DEE6_55%,#AEB4BB_100%)] opacity-90 shadow-[0_0_70px_20px_rgba(221,230,242,0.2)]" />
        {/* building silhouette + lit entrance at the bottom */}
        <div className="absolute inset-x-0 bottom-0 h-[34%]">
          <div className="absolute inset-x-[6%] bottom-[24%] top-0 border-t border-white/5 bg-[linear-gradient(180deg,#10131C,#080A10)] [background-image:repeating-linear-gradient(90deg,rgba(199,204,209,0.05)_0_1.5px,transparent_1.5px_36px),repeating-linear-gradient(180deg,rgba(199,204,209,0.06)_0_1.5px,transparent_1.5px_26px)]" />
          <div className="mgst-led absolute left-1/2 top-[16%] -translate-x-1/2 bg-[linear-gradient(92deg,#5BE3FF_0%,#C7CCD1_38%,#E9C46A_68%,#8B7CF6_100%)] bg-clip-text text-lg font-semibold tracking-[0.22em] text-transparent drop-shadow-[0_0_16px_rgba(91,227,255,0.45)] [font-family:var(--font-studio-display)]">
            MOON&nbsp;GLEAM
          </div>
          {/* glowing entrance */}
          <div className="absolute bottom-[24%] left-1/2 h-[34%] w-24 -translate-x-1/2 overflow-hidden rounded-t-2xl border border-white/10 bg-[radial-gradient(75%_95%_at_50%_85%,rgba(233,196,106,0.75),rgba(233,196,106,0.2)_55%,rgba(7,11,20,0.95))]">
            <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[#5BE3FF] shadow-[0_0_14px_4px_rgba(91,227,255,0.5)]" />
          </div>
          {/* forecourt + light spill */}
          <div className="absolute inset-x-0 bottom-0 h-[24%] bg-[linear-gradient(180deg,#0B0D12,#05060A)]">
            <div className="absolute left-1/2 top-0 h-full w-28 -translate-x-1/2 bg-[linear-gradient(180deg,rgba(233,196,106,0.25),transparent_85%)] blur-md" />
          </div>
          {/* mist */}
          <div className="mgst-drift absolute inset-x-[-10%] bottom-[18%] h-[22%] rounded-full bg-[radial-gradient(60%_100%_at_50%_50%,rgba(199,204,209,0.12),transparent_70%)] blur-2xl" />
        </div>

        <motion.div {...reveal()} className="relative z-10 -mt-[16vh]">
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
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#0B0D13_0%,#10131A_55%,#080A0E_100%)]" />
        <div className="absolute inset-y-0 left-0 w-[16%] bg-[linear-gradient(90deg,#04050A,transparent)]" />
        <div className="absolute inset-y-0 right-0 w-[16%] bg-[linear-gradient(-90deg,#04050A,transparent)]" />
        <div className="absolute inset-x-[12%] top-0 h-[10%] bg-[linear-gradient(180deg,rgba(233,196,106,0.15),transparent)] blur-md" />
        <div className="absolute left-[10%] top-[16%] h-[46%] w-[3px] rounded-full bg-[linear-gradient(180deg,#5BE3FF,rgba(91,227,255,0.04))] shadow-[0_0_22px_4px_rgba(91,227,255,0.3)]" />
        <div className="absolute right-[10%] top-[16%] h-[46%] w-[3px] rounded-full bg-[linear-gradient(180deg,#8B7CF6,rgba(139,124,246,0.04))] shadow-[0_0_22px_4px_rgba(139,124,246,0.3)]" />
        {/* desk + reflection */}
        <div className="absolute bottom-[16%] left-1/2 h-[9%] w-[78%] max-w-md -translate-x-1/2 rounded-xl border-t border-[rgba(199,204,209,0.4)] bg-[linear-gradient(180deg,#171A22,#0C0E14)] shadow-[0_18px_50px_-10px_rgba(233,196,106,0.4)]" />
        <div className="absolute inset-x-0 bottom-0 h-[16%] bg-[linear-gradient(180deg,#0A0C10,#05060A)]">
          <div className="absolute left-1/2 top-0 h-[80%] w-[70%] max-w-sm -translate-x-1/2 bg-[linear-gradient(180deg,rgba(233,196,106,0.12),transparent_78%)] blur-lg" />
        </div>

        <motion.div {...reveal()} className="relative z-10 -mt-[8vh]">
          <p className={kicker}>Reception · AI Film Studio</p>
          <h2 className={headline}>Welcome to the future of film production.</h2>
          <p className="mt-5 text-[10px] uppercase tracking-[0.24em] text-moon-faint">
            Full cinematic tour available on desktop
          </p>
        </motion.div>
      </section>

      {/* -------- ZONE 3 · AI CREATIVE LAB -------- */}
      <section className="relative flex min-h-[88svh] flex-col items-center justify-center overflow-hidden px-6 text-center">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#080B12_0%,#0D1119_55%,#070A0E_100%)]" />
        <div className="absolute inset-x-[14%] top-0 h-[9%] bg-[linear-gradient(180deg,rgba(91,227,255,0.12),transparent)] blur-md" />
        {/* floating concept screens */}
        <div className={'absolute left-[8%] top-[14%] w-[34%] max-w-[220px] ' + (animate ? 'mgst-float' : '')}>
          <div className="aspect-[16/10] rounded-lg border border-white/10 bg-[radial-gradient(85%_70%_at_60%_30%,rgba(139,124,246,0.5),rgba(24,18,52,0.9)_55%,#0A0816_100%)] shadow-[0_0_40px_-8px_rgba(139,124,246,0.35)]" />
        </div>
        <div className={'absolute right-[8%] top-[20%] w-[30%] max-w-[190px] ' + (animate ? 'mgst-float-slow' : '')}>
          <div className="grid aspect-[16/10] grid-cols-3 gap-1 rounded-lg border border-white/10 bg-[#0B0E15]/90 p-1.5 shadow-[0_0_36px_-8px_rgba(91,227,255,0.3)]">
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i} className="rounded-[3px] border border-white/5 bg-[#131A2C]" />
            ))}
          </div>
        </div>

        <motion.div {...reveal()} className="relative z-10 mt-[8vh]">
          <p className={kicker}>03 · AI Creative Lab</p>
          <h2 className={headline}>From an idea to a cinematic universe.</h2>
          <div className="mx-auto mt-6 flex max-w-sm flex-wrap items-center justify-center gap-2">
            {LAB_SERVICES.map((s) => (
              <span
                key={s}
                className="rounded-full border border-white/15 bg-black/40 px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] text-moon"
              >
                {s}
              </span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* -------- ZONE 4 · VIRTUAL SOUNDSTAGE -------- */}
      <section className="relative flex min-h-[88svh] flex-col items-center justify-center overflow-hidden px-6 text-center">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#040507_0%,#090B10_60%,#04050A_100%)]" />
        {/* LED wall band */}
        <div className="absolute inset-x-[8%] top-[12%] h-[30%] overflow-hidden rounded-lg border border-[#1A1E28] shadow-[0_0_60px_-14px_rgba(91,227,255,0.3)]">
          <div className="absolute inset-0 bg-[radial-gradient(100%_75%_at_50%_18%,#F2B25C_0%,#8A4B2A_38%,#2A1220_72%,#12080E_100%)]" />
          <div className="absolute inset-0 opacity-25 [background-image:repeating-linear-gradient(90deg,rgba(0,0,0,0.5)_0_1px,transparent_1px_4px),repeating-linear-gradient(180deg,rgba(0,0,0,0.5)_0_1px,transparent_1px_4px)]" />
          <span className="absolute bottom-2 left-3 text-[9px] uppercase tracking-[0.3em] text-white/55">
            Set 01 · Desert dusk
          </span>
        </div>

        <motion.div {...reveal()} className="relative z-10 mt-[14vh]">
          <p className={kicker}>04 · Virtual Soundstage</p>
          <h2 className={headline}>Anything you can imagine can become a set.</h2>
          <a
            href={site.social.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block rounded-full border border-gleam/60 bg-gleam/10 px-6 py-2.5 text-xs font-semibold tracking-wide text-gleam transition-colors hover:bg-gleam hover:text-ink"
          >
            Watch the showreel
          </a>
        </motion.div>
      </section>

      {/* -------- ZONE 5 · PRODUCTION PIPELINE -------- */}
      <section className="relative flex min-h-[88svh] flex-col items-center justify-center overflow-hidden px-6 text-center">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#06080D_0%,#0B0E15_55%,#05060A_100%)]" />

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
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#030405_0%,#08090D_60%,#040507_100%)]" />
        <div className="absolute inset-x-[16%] top-[14%] h-[26%] bg-[radial-gradient(60%_60%_at_50%_50%,rgba(233,196,106,0.08),transparent_75%)] blur-2xl" />

        <motion.div {...reveal()} className="relative z-10">
          <p className={kicker}>06 · Editing &amp; Render Suite</p>
          <h2 className={headline}>Fast production. Film-level detail.</h2>
          <div className="mx-auto mt-6 flex max-w-sm flex-wrap items-center justify-center gap-2">
            {SUITE_PROOFS.map((s) => (
              <span
                key={s}
                className="rounded-full border border-white/15 bg-black/40 px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] text-moon"
              >
                {s}
              </span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* -------- ZONE 7 · SCREENING ROOM -------- */}
      <section className="relative flex min-h-[92svh] flex-col items-center justify-center overflow-hidden px-6 text-center">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#020304_0%,#07080C_55%,#030405_100%)]" />

        <motion.div {...reveal()} className="relative z-10 w-full max-w-md">
          <p className={kicker}>07 · Screening Room</p>
          <h2 className={headline}>Selected worlds we have brought to life.</h2>
          <div className="mt-7 grid grid-cols-2 gap-3">
            {SCREENING_WORKS.slice(0, 4).map((w) => (
              <Link
                key={w.id}
                href="/work"
                className="group overflow-hidden rounded-lg border border-white/10 text-left transition-colors hover:border-gleam/50"
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
          <Link
            href="/work"
            className="mt-6 inline-block rounded-full border border-gleam/60 bg-gleam/10 px-7 py-3 text-sm font-semibold tracking-wide text-gleam transition-colors hover:bg-gleam hover:text-ink"
          >
            View our work
          </Link>
        </motion.div>
      </section>

      {/* -------- ZONE 8 · BOOKING -------- */}
      <section className="relative overflow-hidden px-6 py-20 sm:py-24">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#020409_0%,#070B14_50%,#0B0D13_100%)]" />
        <div className="absolute left-[10%] top-[5%] h-12 w-12 rounded-full bg-[radial-gradient(circle_at_38%_35%,#F5F7FA_0%,#D9DEE6_55%,#AEB4BB_100%)] opacity-90 shadow-[0_0_60px_18px_rgba(221,230,242,0.2)]" />

        <motion.div {...reveal()} className="relative z-10 mx-auto max-w-md text-center">
          <p className={kicker}>08 · Booking</p>
          <h2 className={headline}>Ready to create what has never been seen?</h2>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="rounded-full bg-gleam px-7 py-3 text-sm font-semibold text-ink transition-transform hover:scale-[1.03]"
            >
              Start your project
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-moon/30 px-7 py-3 text-sm font-semibold text-moon transition-colors hover:border-gleam/60 hover:text-gleam"
            >
              Book a discovery call
            </Link>
            <a
              href={site.contact.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-moon/30 px-7 py-3 text-sm font-semibold text-moon transition-colors hover:border-gleam/60 hover:text-gleam"
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
