'use client';

import { motion } from 'framer-motion';
import { fadeUp, inView } from '@/lib/motion';

/** Reusable animated section heading: eyebrow + title + optional answer-first lead. */
export default function SectionHeading({
  eyebrow,
  title,
  lead,
  center = false,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  center?: boolean;
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={inView}
      className={`mb-12 max-w-2xl ${center ? 'mx-auto text-center' : ''}`}
    >
      <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-glow">{eyebrow}</p>
      <h2 className="font-display text-heading font-semibold text-moon">{title}</h2>
      {lead && <p className="mt-4 leading-relaxed text-moon-soft">{lead}</p>}
    </motion.div>
  );
}
