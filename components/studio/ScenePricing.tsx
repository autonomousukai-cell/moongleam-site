'use client';

import Link from 'next/link';
import { tiers } from '@/components/Pricing';
import { site } from '@/lib/site';
import SceneBackdrop, { TextHalo } from './SceneBackdrop';
import {
  ZW,
  ZONE_BACKDROPS,
  type Layers,
  zoneShell,
  ovAlpha,
  setOverlay,
} from './journey';

/**
 * ROOM D — THE RATE CARD. The studio's commissions lounge: three floating
 * holographic price plinths. The numbers are NOT authored here — the cards
 * render `tiers` imported from components/Pricing.tsx, so the tour can never
 * drift from the live /pricing page (social from £499, promo from £1,499,
 * broadcast TVC from £3,999).
 *
 * Layer contract (written by renderPricing every frame):
 *   prc       — group opacity/visibility (zoneShell)
 *   prcInner  — walk-forward settle (zoneShell)
 *   prcC1/C2  — plinth depth parallax
 *   prcOv     — headline overlay
 *   prcHs     — price-plinth gate
 */
export function renderPricing(el: Layers, p: number) {
  const { alpha, local } = zoneShell(el, 'prc', p, ZW.pricing);
  const ov = ovAlpha(local, 0.14, 0.32) * (alpha > 0 ? 1 : 0);
  setOverlay(el.prcOv, ov);
  if (el.prcHs) {
    el.prcHs.style.opacity = ov.toFixed(3);
    el.prcHs.style.pointerEvents = ov > 0.6 ? 'auto' : 'none';
  }
  if (alpha <= 0) return;
  const d = local - 0.5;
  if (el.prcC1) el.prcC1.style.transform = `translateY(${(d * -18).toFixed(1)}px)`;
  if (el.prcC2) el.prcC2.style.transform = `translateY(${(d * -30).toFixed(1)}px)`;
}

export default function ScenePricing({ onBook }: { onBook?: () => void }) {
  return (
    <div
      data-mgst="prc"
      className="pointer-events-none absolute inset-0 opacity-0"
      style={{ visibility: 'hidden' }}
    >
      <div data-mgst="prcInner" className="absolute inset-0 origin-center will-change-transform">
        {/* the rendered set — the private commissions lounge */}
        <SceneBackdrop src={ZONE_BACKDROPS.pricing} />
      </div>

      {/* ---- overlay ---- */}
      <div
        data-mgst="prcOv"
        className="pointer-events-none absolute inset-x-0 top-[5%] z-20 px-6 text-center opacity-0"
      >
        <TextHalo />
        <p className="text-[11px] font-semibold uppercase tracking-[0.5em] text-gleam [text-shadow:0_2px_16px_rgba(0,0,0,0.95)]">
          09 · The Rate Card
        </p>
        <h2 className="mx-auto mt-3 max-w-2xl text-balance text-[clamp(1.5rem,2.8vw,2.2rem)] font-medium leading-snug text-white [font-family:var(--font-studio-display)] [text-shadow:0_2px_30px_rgba(0,0,0,0.85)]">
          Clear pricing. Serious quality.
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-balance text-[15px] leading-relaxed text-moon [text-shadow:0_2px_20px_rgba(0,0,0,0.9)]">
          Honest starting points for every format — scoped on a free call, no
          hidden fees.
        </p>
      </div>

      {/* ---- the holographic price plinths ---- */}
      <div data-mgst="prcHs" className="absolute inset-0 z-20 opacity-0" style={{ pointerEvents: 'none' }}>
        <div className="absolute inset-x-0 bottom-[6%] top-[20%] flex flex-col items-center justify-end gap-4 px-[6vw]">
          <div
            data-mgst="prcC1"
            className="grid w-full max-w-4xl grid-cols-3 items-stretch gap-4 will-change-transform"
          >
            {tiers.map((t) => (
              <div
                key={t.name}
                className={
                  'mgst-holo-panel pointer-events-auto relative flex flex-col rounded-sm p-4 text-left ' +
                  (t.featured
                    ? '!border-gleam/50 shadow-[0_0_44px_-10px_rgba(233,196,106,0.55)]'
                    : '')
                }
              >
                {t.featured && (
                  <span className="absolute -top-3 left-4 border border-gleam/70 bg-black/80 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-gleam [clip-path:polygon(4px_0,100%_0,100%_calc(100%-4px),calc(100%-4px)_100%,0_100%,0_4px)]">
                    Most popular
                  </span>
                )}
                <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[rgba(91,227,255,0.9)]">
                  {t.name}
                </p>
                <p className="mt-1 text-xs leading-snug text-moon">{t.forWho}</p>
                <p className="mt-2.5 text-[10px] uppercase tracking-[0.2em] text-moon-soft">
                  Starting at
                </p>
                <p className="text-[2rem] font-medium leading-tight text-white [font-family:var(--font-studio-display)]">
                  {t.price}
                </p>
                {t.featured && (
                  <p className="mt-1 inline-flex items-center gap-1.5 text-[10px] font-medium text-gleam">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gleam" />
                    {site.slotsLeft} project slots left this month
                  </p>
                )}
                <ul className="mt-2.5 flex-1 space-y-1.5">
                  {t.features.map((f) => (
                    <li key={f} className="flex gap-1.5 text-[13px] leading-snug text-moon">
                      <span className="text-gleam">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-3 flex justify-between border-t border-white/10 pt-2 text-[10px] text-moon-soft">
                  <span>
                    Duration
                    <span className="block text-xs text-moon">{t.meta.duration}</span>
                  </span>
                  <span className="text-right">
                    Timeline
                    <span className="block text-xs text-moon">{t.meta.timeline}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div data-mgst="prcC2" className="flex flex-col items-center gap-3 will-change-transform">
            <p className="max-w-2xl text-center text-sm leading-relaxed text-moon [text-shadow:0_2px_20px_rgba(0,0,0,0.9)]">
              Documentary, kids animation, short film and monthly content engines are quoted per
              project. Every project is scoped on a free call — honest starting points, no
              hidden-fee teasers.
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onBook}
                className="mgst-hud-btn pointer-events-auto !px-6 !py-2.5 !text-xs"
              >
                Book a call
              </button>
              <Link
                href="/pricing"
                className="mgst-hud-btn-ghost pointer-events-auto !px-6 !py-2.5 !text-xs"
              >
                Full pricing detail
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
