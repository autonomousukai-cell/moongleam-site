'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { fadeUp, stagger, inView } from '@/lib/motion';
import {
  portfolio,
  ytThumb,
  categories,
  sectorLabels,
  type WorkItem,
  type Sector,
  type Category,
} from '@/lib/data';

type FilterMode = 'sector' | 'category';

/**
 * Filterable portfolio grid + lightbox player.
 * mode="sector" filters by industry (homepage), mode="category" by format (work page).
 */
export default function WorkGrid({
  mode = 'sector',
  limit,
  items,
}: {
  mode?: FilterMode;
  limit?: number;
  items?: WorkItem[];
}) {
  const [filter, setFilter] = useState<string>('all');
  const [active, setActive] = useState<WorkItem | null>(null);

  const source = items ?? portfolio;

  const filterOptions: [string, string][] =
    mode === 'sector'
      ? (['legal', 'accountancy', 'charity', 'education', 'retail', 'travel'] as Sector[]).map(
          (s) => [s, sectorLabels[s]],
        )
      : (Object.keys(categories) as Category[]).map((c) => [c, categories[c]]);

  const visible = useMemo(() => {
    const list =
      filter === 'all'
        ? source
        : source.filter((w) => (mode === 'sector' ? w.sector === filter : w.cat === filter));
    return limit ? list.slice(0, limit) : list;
  }, [filter, limit, mode, source]);

  return (
    <div>
      {/* Filter bar */}
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {[['all', 'All'] as [string, string], ...filterOptions].map(([value, label]) => (
          <button
            key={value}
            onClick={() => setFilter(value)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-200 ${
              filter === value
                ? 'bg-gleam text-ink'
                : 'border border-ink-line text-moon-soft hover:border-gleam/50 hover:text-moon'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={inView}
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {visible.map((w) => (
            <motion.button
              layout
              key={w.id + w.title}
              variants={fadeUp}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.25 }}
              onClick={() => setActive(w)}
              aria-label={`Play: ${w.title}`}
              className="group relative aspect-video overflow-hidden rounded-2xl border border-ink-line bg-ink-soft text-left transition-colors duration-300 hover:border-gleam/50"
            >
              <Image
                src={ytThumb(w.id)}
                alt={`${w.title} — ${categories[w.cat]}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
              <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-gleam text-xs text-ink opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                ▶
              </span>
              <span className="absolute inset-x-4 bottom-3">
                <span className="mb-1 block text-[10px] font-medium uppercase tracking-[0.2em] text-glow">
                  {categories[w.cat]} · {sectorLabels[w.sector]}
                </span>
                <span className="block text-sm font-semibold leading-snug text-moon">
                  {w.title}
                </span>
              </span>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[100] grid place-items-center bg-ink/95 p-4 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label={active.title}
          >
            <motion.div
              initial={{ scale: 0.95, y: 12 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 12 }}
              onClick={(e) => e.stopPropagation()}
              className="relative aspect-video w-full max-w-4xl"
            >
              <button
                onClick={() => setActive(null)}
                aria-label="Close"
                className="absolute -top-10 right-0 text-xl text-moon transition-colors hover:text-gleam"
              >
                ✕
              </button>
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${active.id}?autoplay=1&rel=0`}
                allow="autoplay; encrypted-media; fullscreen"
                title={active.title}
                className="h-full w-full rounded-2xl border-0"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
