'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeUp, stagger, inView } from '@/lib/motion';
import { site, cta } from '@/lib/site';

/**
 * Transparent £ pricing (MZ-style) with slots-left scarcity.
 * NOTE: starting prices are provisional — confirm before launch.
 * SINGLE SOURCE OF TRUTH for prices: the homepage tour's rate-card room
 * (components/studio/ScenePricing) imports `tiers` from here — never fork
 * the numbers.
 */
export type PricingTier = {
  name: string;
  forWho: string;
  price: string;
  featured: boolean;
  features: string[];
  meta: { duration: string; timeline: string };
};

export const tiers: PricingTier[] = [
  {
    name: 'Social Pack',
    forWho: 'Consistent social presence — shops, restaurants, services',
    price: '£499',
    featured: false,
    features: [
      '3x short-form videos (Reels / TikTok / Shorts)',
      'Hooks & captions engineered for retention',
      'Scripted around your offers',
      'Platform-ready formats included',
      'Monthly packages available',
    ],
    meta: { duration: '15–60 sec each', timeline: 'Within 1 week' },
  },
  {
    name: 'Promo Video',
    forWho: 'Websites, Google profiles, launches and ads',
    price: '£1,499',
    featured: true,
    features: [
      '1x polished promotional video',
      'Script, storyboard & creative direction',
      'AI, filmed or hybrid production',
      'Voiceover, music & sound design',
      'Cutdowns for every platform',
      "Revisions until you're happy",
    ],
    meta: { duration: '30–90 sec', timeline: '7–14 days' },
  },
  {
    name: 'TVC / Campaign',
    forWho: 'Broadcast, big launches and full campaigns',
    price: '£3,999',
    featured: false,
    features: [
      'Broadcast-standard TV commercial',
      'Full concept, script & storyboard',
      'Live-action with models, AI or hybrid',
      'Broadcast-ready technical delivery',
      'Campaign cutdowns for social & web',
      'Priority production',
    ],
    meta: { duration: '30–60 sec', timeline: '2–3 weeks' },
  },
];

export default function Pricing() {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={inView}
      className="grid gap-6 lg:grid-cols-3"
    >
      {tiers.map((t) => (
        <motion.div
          key={t.name}
          variants={fadeUp}
          className={`relative flex flex-col rounded-2xl border bg-ink-soft p-8 transition-colors duration-300 ${
            t.featured
              ? 'border-gleam/60 shadow-gleam-glow'
              : 'border-ink-line hover:border-gleam/40'
          }`}
        >
          {t.featured && (
            <span className="absolute -top-3 left-8 rounded-full bg-gleam px-3 py-1 text-xs font-semibold text-ink">
              Most popular
            </span>
          )}
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-gleam">{t.name}</p>
          <p className="mt-2 text-sm text-moon-faint">{t.forWho}</p>
          <p className="mt-5 text-xs uppercase tracking-[0.14em] text-moon-faint">Starting at</p>
          <p className="font-display text-4xl font-semibold text-moon">{t.price}</p>

          {t.featured && (
            <p className="mt-3 inline-flex items-center gap-2 text-xs font-medium text-gleam">
              <span className="h-2 w-2 animate-pulse rounded-full bg-gleam" />
              {site.slotsLeft} project slots left this month
            </p>
          )}

          <ul className="mt-6 flex-1 space-y-2.5">
            {t.features.map((f) => (
              <li key={f} className="flex gap-2 text-sm leading-relaxed text-moon-soft">
                <span className="text-gleam">✓</span>
                {f}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex justify-between border-t border-ink-line pt-4 text-xs text-moon-faint">
            <span>
              Duration
              <span className="block font-medium text-moon-soft">{t.meta.duration}</span>
            </span>
            <span className="text-right">
              Timeline
              <span className="block font-medium text-moon-soft">{t.meta.timeline}</span>
            </span>
          </div>

          <Link
            href={cta.href}
            className={`mt-6 rounded-full py-3 text-center font-semibold transition-transform duration-200 hover:scale-[1.02] ${
              t.featured
                ? 'bg-gleam text-ink hover:bg-gleam-bright'
                : 'border border-ink-line text-moon hover:border-gleam/50'
            }`}
          >
            {cta.label}
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}
