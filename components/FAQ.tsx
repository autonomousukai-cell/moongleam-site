'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, stagger, inView } from '@/lib/motion';
import { faqs } from '@/lib/data';

/** FAQ accordion. FAQPage JSON-LD is rendered server-side by <FaqJsonLd /> (lib/seo.tsx). */
export default function FAQ({ items = faqs }: { items?: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={inView}
      className="mx-auto max-w-3xl space-y-3"
    >
      {items.map((f, i) => (
        <motion.div
          key={f.q}
          variants={fadeUp}
          className="overflow-hidden rounded-2xl border border-ink-line bg-ink-soft transition-colors duration-300 hover:border-gleam/40"
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
            aria-controls={`faq-answer-${i}`}
            className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
          >
            <span className="font-display font-semibold text-moon">{f.q}</span>
            <motion.span
              animate={{ rotate: open === i ? 45 : 0 }}
              transition={{ duration: 0.2 }}
              className="text-xl text-gleam"
            >
              +
            </motion.span>
          </button>
          {/* Answers stay in the HTML when collapsed so search engines and AI crawlers can read them. */}
          <motion.div
            id={`faq-answer-${i}`}
            initial={false}
            animate={{ height: open === i ? 'auto' : 0, opacity: open === i ? 1 : 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
            aria-hidden={open !== i}
          >
            <p className="px-6 pb-5 text-sm leading-relaxed text-moon-soft">{f.a}</p>
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  );
}
