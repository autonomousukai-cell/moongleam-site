'use client';

import { motion } from 'framer-motion';
import { fadeUp, stagger, inView } from '@/lib/motion';

type Card = { title: string; body: string; tag?: string };

/**
 * Reusable scroll-reveal section with a heading and a stagger-animated card grid.
 * Demonstrates the required motion pattern: scroll-triggered fades + staggered reveals.
 */
export default function Section({
  id,
  eyebrow,
  title,
  cards,
}: {
  id: string;
  eyebrow: string;
  title: string;
  cards: Card[];
}) {
  return (
    <section id={id} className="border-t border-ink-line/60 py-20 md:py-28">
      <div className="container-content">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mb-12 max-w-2xl"
        >
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-glow">
            {eyebrow}
          </p>
          <h2 className="font-display text-heading font-semibold text-moon">{title}</h2>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {cards.map((c) => (
            <motion.article
              key={c.title}
              variants={fadeUp}
              className="group rounded-2xl border border-ink-line bg-ink-soft p-6 transition-colors duration-300 hover:border-gleam/50"
            >
              {c.tag && (
                <span className="mb-4 inline-block rounded-full bg-gleam/10 px-3 py-1 text-xs font-medium text-gleam">
                  {c.tag}
                </span>
              )}
              <h3 className="font-display text-lg font-semibold text-moon">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-moon-soft">{c.body}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
