'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeUp, inView } from '@/lib/motion';
import { cta } from '@/lib/site';

export default function CTABand({
  title = "Let's make something worth watching.",
  lead = "Book a free 15-minute call. We'll show you exactly what video can do for your business — no obligation, genuinely useful.",
}: {
  title?: string;
  lead?: string;
}) {
  return (
    <section className="relative overflow-hidden border-t border-ink-line/60 py-20 md:py-28">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-gleam/[0.06] to-transparent" />
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={inView}
        className="container-content text-center"
      >
        <h2 className="mx-auto max-w-2xl font-display text-display font-semibold text-moon">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-xl leading-relaxed text-moon-soft">{lead}</p>
        <Link
          href={cta.href}
          className="mt-8 inline-block rounded-full bg-gleam px-8 py-3.5 font-semibold text-ink shadow-gleam-glow transition-transform duration-200 hover:scale-[1.03] hover:bg-gleam-bright"
        >
          {cta.label}
        </Link>
      </motion.div>
    </section>
  );
}
