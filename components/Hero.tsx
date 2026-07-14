'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeUp, stagger } from '@/lib/motion';
import { cta, site } from '@/lib/site';
import Showreel from '@/components/Showreel';
import AITyper from '@/components/AITyper';

/**
 * AI Creative Studio hero. Static hook headline + a dark "studio display" panel
 * in which an AI types out rotating, pain-point-led headlines with a blinking
 * caret. Dual CTA with a pulsing gold accent, showreel and stats below.
 */
const headlines = [
  'Turn your service into a broadcast-quality advert — in days, not months.',
  'A TV-ready commercial for your law firm, without the agency price tag.',
  'Make your product sell itself — AI-crafted, human-directed.',
  'A charity story that moves people to give.',
  'From brief to broadcast, produced at AI speed.',
  '500+ UK businesses. One studio. Powered by Creative AI.',
];

const stats = [
  ['500+', 'UK businesses'],
  ['8', 'video formats in-house'],
  ['Days', 'not months'],
] as const;

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="container-content grid items-center gap-12 pb-16 pt-16 md:pb-24 md:pt-24 lg:grid-cols-2">
        {/* Copy */}
        <motion.div variants={stagger} initial="hidden" animate="show">
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-ink-line bg-ink-soft/60 px-4 py-1.5 text-xs font-medium text-moon-soft"
          >
            <span className="h-2 w-2 rounded-full bg-gleam" />
            London · AI Creative Studio
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="mt-6 font-display text-display-lg font-semibold text-moon"
          >
            Creative AI that makes your business{' '}
            <span className="text-gleam">impossible to scroll past</span>.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl text-lg leading-relaxed text-moon-soft"
          >
            Broadcast-quality video — TVCs, promos, documentaries, animation — for 500+ UK
            businesses. Brief to delivery, in days.
          </motion.p>

          {/* Studio display / terminal — AI types rotating headlines */}
          <motion.div
            variants={fadeUp}
            className="relative mt-8 overflow-hidden rounded-2xl border border-gleam/25 bg-ink-soft/80 shadow-glow"
          >
            <div className="pointer-events-none absolute inset-0 studio-grid" />
            <div className="pointer-events-none absolute inset-0 studio-scan" />
            <div className="relative flex items-center gap-2 border-b border-ink-line/70 px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-gleam/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-moon/40" />
              <span className="h-2.5 w-2.5 rounded-full bg-moon/20" />
              <span className="ml-2 text-[10px] font-medium uppercase tracking-[0.2em] text-glow">
                ▍ AI Creative Studio
              </span>
            </div>
            <div className="relative min-h-[112px] px-5 py-5 sm:min-h-[96px]">
              <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.18em] text-moon-faint">
                &gt; generating…
              </p>
              <p className="font-display text-lg font-semibold leading-snug sm:text-xl">
                <AITyper lines={headlines} />
              </p>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href={cta.href}
              className="relative inline-flex items-center gap-2 rounded-full bg-gleam px-7 py-3 font-semibold text-ink shadow-gleam-glow transition-transform duration-200 hover:scale-[1.03] hover:bg-gleam-bright"
            >
              <span className="dot-pulse h-2 w-2 rounded-full bg-ink/70" />
              Book a demo
            </Link>
            <Link
              href="/pricing"
              className="rounded-full border border-ink-line px-7 py-3 font-medium text-moon transition-colors duration-200 hover:border-gleam/60 hover:text-gleam"
            >
              See pricing
            </Link>
          </motion.div>

          {/* Inline stats */}
          <motion.dl
            variants={fadeUp}
            className="mt-10 flex flex-wrap gap-x-10 gap-y-4 border-t border-ink-line/60 pt-6"
          >
            {stats.map(([value, label]) => (
              <div key={label}>
                <dt className="sr-only">{label}</dt>
                <dd className="font-display text-2xl font-semibold text-gleam">{value}</dd>
                <dd className="text-xs uppercase tracking-[0.14em] text-moon-faint">{label}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        {/* Media panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        >
          <Showreel videoId={site.showreelId} caption="Studio showreel — Powered by Creative AI" />
          <p className="mt-4 text-center text-[11px] font-medium uppercase tracking-[0.2em] text-moon-faint">
            Legal · Accountancy · Charity · Education · Retail · Travel
          </p>
        </motion.div>
      </div>
    </section>
  );
}
