'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeUp, stagger } from '@/lib/motion';
import { cta } from '@/lib/site';

const trustPills = [
  'Trusted by 500+ UK businesses',
  'Aired on UK TV channels',
  '20+ years broadcast craft',
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="container-content flex flex-col items-center pb-16 pt-20 text-center md:pb-24 md:pt-28">
        {/* Trust strip — proof above the headline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-8 flex flex-wrap items-center justify-center gap-3"
        >
          {trustPills.map((t) => (
            <span
              key={t}
              className="rounded-full border border-ink-line bg-ink-soft/60 px-4 py-1.5 text-xs font-medium text-moon-soft"
            >
              {t}
            </span>
          ))}
        </motion.div>

        <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-4xl">
          <motion.h1
            variants={fadeUp}
            className="font-display text-display-lg font-semibold text-moon"
          >
            AI-powered videos that{' '}
            <span className="text-gleam">grow UK businesses</span>.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-moon-soft"
          >
            Full production — brief to delivery — for 500+ UK businesses. TVCs, promos,
            documentaries and animation at AI speed, from a London studio.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              href={cta.href}
              className="rounded-full bg-gleam px-7 py-3 font-semibold text-ink shadow-gleam-glow transition-transform duration-200 hover:scale-[1.03] hover:bg-gleam-bright"
            >
              {cta.label}
            </Link>
            <a
              href="#showreel"
              className="group inline-flex items-center gap-2 rounded-full border border-ink-line px-7 py-3 font-medium text-moon transition-colors duration-200 hover:border-glow hover:text-glow"
            >
              <span className="grid h-6 w-6 place-items-center rounded-full bg-glow/15 text-glow transition-transform duration-200 group-hover:scale-110">
                ▶
              </span>
              Watch the showreel
            </a>
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="mt-10 text-[11px] font-medium uppercase tracking-[0.2em] text-moon-faint"
          >
            Legal · Accountancy · Charity · Education · Retail · Travel
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
