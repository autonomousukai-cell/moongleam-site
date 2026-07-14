'use client';

import { useState } from 'react';
import Image from 'next/image';
import ZoneLayer, { useZoneReveal } from '../ZoneLayer';
import { portfolio, ytThumb, type Category } from '@/lib/data';

const TABS: { label: string; cat: Category | 'all' }[] = [
  { label: 'All', cat: 'all' },
  { label: 'TVC', cat: 'tvc' },
  { label: 'UGC', cat: 'ugc' },
  { label: 'Documentary', cat: 'documentary' },
  { label: 'Animation', cat: 'animation' },
  { label: 'Brand', cat: 'brand' },
];

/** Zone 4 — SCREENING ROOM. Portfolio wall + filter tabs + Gleam callout. */
export default function ZoneScreening({ progress }: { progress: number }) {
  const [active, setActive] = useState<Category | 'all'>('all');
  const { local } = useZoneReveal(progress, 0.55, 0.72);

  const items = (active === 'all' ? portfolio : portfolio.filter((p) => p.cat === active)).slice(0, 12);

  return (
    <ZoneLayer progress={progress} start={0.55} end={0.72}>
      <div className="w-full max-w-5xl">
        {/* Gleam speech bubble */}
        <div className="mb-5 flex justify-center">
          <div className="exp-float relative rounded-2xl border border-gleam/40 bg-ink-soft/90 px-5 py-2.5 text-sm font-medium text-moon backdrop-blur">
            <span className="text-gleam">Gleam:</span> “This one took 2 days.”
            <span className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-b border-r border-gleam/40 bg-ink-soft" />
          </div>
        </div>

        {/* Filter tabs with animated underline */}
        <div className="mb-6 flex flex-wrap items-center justify-center gap-1">
          {TABS.map((t) => {
            const on = active === t.cat;
            return (
              <button
                key={t.label}
                data-cursor="cta"
                onClick={() => setActive(t.cat)}
                className={`relative rounded-full px-4 py-1.5 text-sm transition-colors ${
                  on ? 'text-ink' : 'text-moon-soft hover:text-moon'
                }`}
              >
                {on && <span className="absolute inset-0 -z-0 rounded-full bg-gleam" />}
                <span className="relative z-10">{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* Masonry-ish grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {items.map((item, i) => {
            const t = Math.min(1, Math.max(0, (local - i * 0.05) / 0.3));
            return (
              <a
                key={item.id}
                href={`https://www.youtube.com/watch?v=${item.id}`}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="video"
                className="group relative block overflow-hidden rounded-xl border border-ink-line bg-ink-soft"
                style={{
                  opacity: t,
                  transform: `translateY(${(1 - t) * 20}px) scale(${0.94 + t * 0.06})`,
                }}
              >
                <div className="relative aspect-video">
                  <Image
                    src={ytThumb(item.id)}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 45vw, 22vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-transparent" />
                  <span className="absolute inset-x-2 bottom-2 line-clamp-2 text-[11px] font-medium text-moon">
                    {item.title}
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </ZoneLayer>
  );
}
