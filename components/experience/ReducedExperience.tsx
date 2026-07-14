'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { scenes } from './scenes';
import { site } from '@/lib/site';
import { portfolio, ytThumb } from '@/lib/data';

/**
 * prefers-reduced-motion fallback. NO pinning / scrubbing — the seven zones are
 * rendered as ordinary stacked sections that simply fade in on scroll-into-view
 * (framer-motion whileInView). Typewriters degrade to their first line shown
 * statically; each Gleam pose is a single static image per zone.
 */
const COPY: { title: string; body: string }[] = [
  { title: "Hi, I'm Gleam — I make videos for brands like yours.", body: 'Studio-quality video. Zero crew, zero delays. Give me a brief, I’ll give you a video by tomorrow.' },
  { title: 'The problem with traditional video', body: 'It takes weeks and costs thousands. AI cuts that to days and up to 70% less — in every format you need.' },
  { title: 'Inside the studio', body: 'You send a brief. Gleam scripts, edits, grades and renders it — the whole pipeline, in-house.' },
  { title: 'Ta-da — your video, delivered', body: 'A finished, broadcast-quality cut, ready for web, TV and social.' },
  { title: 'The work speaks for itself', body: 'TVCs, documentaries, UGC, animation and brand films for 500+ UK businesses.' },
  { title: 'A fraction of the cost', body: 'Traditional production runs into the thousands and takes weeks. Moon Gleam starts from £499 and ships in days.' },
  { title: "Ready to see your brand come to life? Let's talk.", body: 'Book a free 15-minute demo and see what your first video could look like.' },
];

export default function ReducedExperience() {
  return (
    <main className="relative">
      {scenes.map((s, i) => (
        <section
          key={s.key}
          className="relative flex min-h-[86vh] items-center justify-center overflow-hidden border-b border-ink-line/50 py-20"
        >
          <Image
            src={s.src}
            alt={s.alt}
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-ink/70" />
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="container-content relative z-10 max-w-2xl text-center"
          >
            <h2 className="font-display text-[clamp(1.6rem,4vw,2.75rem)] font-semibold leading-tight text-moon">
              {COPY[i].title}
            </h2>
            <p className="mt-4 text-moon-soft">{COPY[i].body}</p>

            {i === 4 && (
              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {portfolio.slice(0, 6).map((item) => (
                  <a
                    key={item.id}
                    href={`https://www.youtube.com/watch?v=${item.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative block aspect-video overflow-hidden rounded-lg border border-ink-line"
                  >
                    <Image src={ytThumb(item.id)} alt={item.title} fill sizes="30vw" className="object-cover" />
                  </a>
                ))}
              </div>
            )}

            {(i === 0 || i === 6) && (
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="rounded-full bg-gleam px-7 py-3 font-semibold text-ink transition-transform hover:scale-[1.03] hover:bg-gleam-bright"
                >
                  Book a Free Demo
                </Link>
                <Link
                  href="/work"
                  className="rounded-full border border-moon/30 px-7 py-3 font-medium text-moon transition-colors hover:border-gleam/60 hover:text-gleam"
                >
                  See Our Work
                </Link>
              </div>
            )}
          </motion.div>
        </section>
      ))}
    </main>
  );
}
