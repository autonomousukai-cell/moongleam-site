'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeUp, stagger } from '@/lib/motion';
import { cta, site } from '@/lib/site';
import Showreel from '@/components/Showreel';

/**
 * Split hero — 21st.dev marketing-hero pattern (badge + display headline +
 * dual CTA + inline stats, media panel right), adapted to Moon Gleam tokens.
 */
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
            London · AI Video Production Studio
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="mt-6 font-display text-display-lg font-semibold text-moon"
          >
            AI-powered videos that{' '}
            <span className="text-gleam">grow UK businesses</span>.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl text-lg leading-relaxed text-moon-soft"
          >
            Full production — brief to delivery — for 500+ UK businesses. TVCs, promos,
            documentaries and animation, produced at AI speed to broadcast standard.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-4">
            <Link
              href={cta.href}
              className="rounded-full bg-gleam px-7 py-3 font-semibold text-ink shadow-gleam-glow transition-transform duration-200 hover:scale-[1.03] hover:bg-gleam-bright"
            >
              {cta.label}
            </Link>
            <Link
              href="/pricing"
              className="rounded-full border border-ink-line px-7 py-3 font-medium text-moon transition-colors duration-200 hover:border-glow hover:text-glow"
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
