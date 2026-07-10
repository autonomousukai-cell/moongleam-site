'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
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
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <p className="px-6 pb-5 text-sm leading-relaxed text-moon-soft">{f.a}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </motion.div>
  );
}
