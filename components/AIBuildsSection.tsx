'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeUp, inView } from '@/lib/motion';
import WorkGrid from '@/components/WorkGrid';

/**
 * Homepage portfolio section: a centered intro, then the FULL filterable gallery
 * of the entire Moon Gleam catalogue. (Replaced the old sticky two-column reveal,
 * which left a large empty gutter beside the cards.) Fully responsive — the grid
 * is 1 column on mobile, 2 on tablet, 3 on desktop.
 */
export default function AIBuildsSection() {
  return (
    <section
      id="ai-builds"
      className="relative overflow-hidden border-t border-ink-line/60 py-20 md:py-28"
    >
      <div className="pointer-events-none absolute inset-0 studio-grid opacity-40" />
      <div className="container-content relative">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-glow">
            ▍ The full gallery
          </p>
          <h2 className="font-display text-heading font-semibold text-moon">
            Every film, <span className="text-gleam">one studio</span>.
          </h2>
          <p className="mx-auto mt-4 max-w-md leading-relaxed text-moon-soft">
            The complete Moon Gleam catalogue — TVCs, promos, charity campaigns, animation and
            documentary. Filter by format and tap any film to watch.
          </p>
        </motion.div>

        <div className="mt-12">
          <WorkGrid mode="category" />
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/work"
            className="inline-block rounded-full border border-ink-line px-7 py-3 font-medium text-moon transition-colors duration-200 hover:border-gleam/50 hover:text-gleam"
          >
            See all work
          </Link>
        </div>
      </div>
    </section>
  );
}
