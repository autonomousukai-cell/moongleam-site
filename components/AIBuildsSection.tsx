'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { fadeUp, inView } from '@/lib/motion';
import { portfolio, ytThumb, categories, sectorLabels } from '@/lib/data';
import WorkGrid from '@/components/WorkGrid';

/**
 * Scroll-driven "watch AI build your video" section. A sticky narrative column
 * reveals a handful of the studio's real portfolio films one at a time as the
 * user scrolls, each with an "AI rendering…" style label, then unfolds the full
 * gallery grid below. Thumbnails only — nothing autoplays; clicking opens the
 * film on YouTube in a new tab (the grid below has its own lightbox).
 */

// A curated reel of strong, varied work to reveal one-by-one.
const reel = portfolio.filter((w) =>
  ['agn6nuD_m_8', 'kQKz4nE7ZxM', 'HtkYON-hXeU', 'yubYJ8DIjRQ', 'EIaa0ZCCyYM', 'wsVu1zJFt-k'].includes(
    w.id,
  ),
);

export default function AIBuildsSection() {
  return (
    <section
      id="ai-builds"
      className="relative overflow-hidden border-t border-ink-line/60 py-20 md:py-28"
    >
      <div className="pointer-events-none absolute inset-0 studio-grid opacity-40" />
      <div className="container-content relative">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Sticky narrative column */}
          <div className="lg:sticky lg:top-24 lg:h-fit">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={inView}
            >
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-glow">
                ▍ Watch AI build your video
              </p>
              <h2 className="font-display text-heading font-semibold text-moon">
                From brief to broadcast — <span className="text-gleam">rendered before your eyes</span>.
              </h2>
              <p className="mt-4 max-w-md leading-relaxed text-moon-soft">
                Real films from the Moon Gleam catalogue. Scroll to see them render in — TVCs,
                promos, charity campaigns, animation and documentary, all produced at AI speed.
              </p>
              <Link
                href="/work"
                className="mt-6 inline-block rounded-full border border-ink-line px-6 py-2.5 text-sm font-medium text-moon transition-colors duration-200 hover:border-gleam/60 hover:text-gleam"
              >
                See all work
              </Link>
            </motion.div>
          </div>

          {/* Reveal-on-scroll cards */}
          <div className="flex flex-col gap-8">
            {reel.map((w, i) => (
              <motion.a
                key={w.id}
                href={`https://www.youtube.com/watch?v=${w.id}`}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 40, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="group relative block aspect-video overflow-hidden rounded-2xl border border-ink-line bg-ink-soft shadow-glow transition-colors duration-300 hover:border-gleam/50"
              >
                <Image
                  src={ytThumb(w.id)}
                  alt={`${w.title} — ${categories[w.cat]}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 560px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-transparent" />

                {/* "AI rendering…" label */}
                <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-gleam/30 bg-ink/70 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-glow backdrop-blur-sm">
                  <span className="dot-pulse h-1.5 w-1.5 rounded-full bg-gleam" />
                  AI rendering · {String(i + 1).padStart(2, '0')}/{String(reel.length).padStart(2, '0')}
                </span>

                <span className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-gleam text-sm text-ink opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  ▶
                </span>

                <span className="absolute inset-x-5 bottom-4">
                  <span className="mb-1 block text-[10px] font-medium uppercase tracking-[0.2em] text-glow">
                    {categories[w.cat]} · {sectorLabels[w.sector]}
                  </span>
                  <span className="block font-display text-base font-semibold leading-snug text-moon">
                    {w.title}
                  </span>
                </span>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Full gallery reveal */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-20"
        >
          <div className="mb-8 flex flex-col items-center text-center">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-glow">
              The full gallery
            </p>
            <h3 className="font-display text-heading font-semibold text-moon">
              Every film, one studio
            </h3>
          </div>
          <WorkGrid mode="category" />
          <div className="mt-10 text-center">
            <Link
              href="/work"
              className="inline-block rounded-full border border-ink-line px-7 py-3 font-medium text-moon transition-colors duration-200 hover:border-gleam/50 hover:text-gleam"
            >
              See all work
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
