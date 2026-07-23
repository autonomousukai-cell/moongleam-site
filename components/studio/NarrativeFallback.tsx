'use client';

import { motion } from 'framer-motion';

/**
 * Lightweight fallback for mobile (animate=true, gentle in-view reveals) and
 * prefers-reduced-motion (animate=false, fully static). Tells the same
 * Phase-1 story — night exterior → doors → reception — as standard sections,
 * with the accessible page content (<StudioDetails/>) rendered beneath by
 * the page itself.
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
          <p className="text-[10px] uppercase tracking-[0.5em] text-moon-soft">
            Reception · AI Film Studio
          </p>
          <h2 className="mt-4 text-balance text-3xl font-medium leading-snug text-white [font-family:var(--font-studio-display)] [text-shadow:0_2px_30px_rgba(0,0,0,0.8)] sm:text-4xl">
            Welcome to the future of film production.
          </h2>
          <a
            href="#studio-details"
            className="mt-7 inline-block rounded-full border border-gleam/60 bg-gleam/10 px-8 py-3.5 text-sm font-semibold tracking-wide text-gleam backdrop-blur transition-colors hover:bg-gleam hover:text-ink"
          >
            Explore the studio
          </a>
          <p className="mt-5 text-[10px] uppercase tracking-[0.24em] text-moon-faint">
            Full cinematic tour available on desktop
          </p>
        </motion.div>
      </section>
    </div>
  );
}
