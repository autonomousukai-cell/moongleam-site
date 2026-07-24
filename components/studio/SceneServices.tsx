'use client';

import Link from 'next/link';
import { services, sectorPages } from '@/lib/data';
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
 * ROOM B — SERVICE BAYS. The corridor of illuminated production stations:
 * one glowing bay per service (ALL of lib/data.ts `services`, each linking
 * to its /services/[slug] page) and one sector beacon per vertical
 * (`sectorPages` → /sectors/[slug]). This room also absorbs the old
 * Creative Lab beat — the bays ARE the lab's disciplines, now with the
 * site's real service catalogue.
 *
 * Layer contract (written by renderServices every frame):
 *   svc       — group opacity/visibility (zoneShell)
 *   svcInner  — walk-forward settle (zoneShell)
 *   svcB1/B2  — bay-row depth parallax
 *   svcOv     — headline overlay
 *   svcHs     — bays + sector beacons gate
 */
export function renderServices(el: Layers, p: number) {
  const { alpha, local } = zoneShell(el, 'svc', p, ZW.services);
  const ov = ovAlpha(local, 0.14, 0.32) * (alpha > 0 ? 1 : 0);
  setOverlay(el.svcOv, ov);
  if (el.svcHs) {
    el.svcHs.style.opacity = ov.toFixed(3);
    el.svcHs.style.pointerEvents = ov > 0.6 ? 'auto' : 'none';
  }
  if (alpha <= 0) return;
  const d = local - 0.5;
  if (el.svcB1) el.svcB1.style.transform = `translateY(${(d * -20).toFixed(1)}px)`;
  if (el.svcB2) el.svcB2.style.transform = `translateY(${(d * -34).toFixed(1)}px)`;
}

export default function SceneServices() {
  return (
    <div
      data-mgst="svc"
      className="pointer-events-none absolute inset-0 opacity-0"
      style={{ visibility: 'hidden' }}
    >
      <div data-mgst="svcInner" className="absolute inset-0 origin-center will-change-transform">
        {/* the rendered set — the services hall, one glowing bay per craft */}
        <SceneBackdrop src={ZONE_BACKDROPS.services} />
      </div>

      {/* ---- overlay ---- */}
      <div
        data-mgst="svcOv"
        className="pointer-events-none absolute inset-x-0 top-[6%] z-20 px-6 text-center opacity-0"
      >
        <TextHalo />
        <p className="text-[11px] font-semibold uppercase tracking-[0.5em] text-gleam [text-shadow:0_2px_16px_rgba(0,0,0,0.95)]">
          04 · Service Bays
        </p>
        <h2 className="mx-auto mt-3 max-w-2xl text-balance text-[clamp(1.5rem,2.8vw,2.2rem)] font-medium leading-snug text-white [font-family:var(--font-studio-display)] [text-shadow:0_2px_30px_rgba(0,0,0,0.85)]">
          Everything under one roof.
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-balance text-base leading-relaxed text-moon [text-shadow:0_2px_24px_rgba(0,0,0,0.9)]">
          Eight production bays — TVCs to UGC — plus six sector specialisms, all
          produced end-to-end by one in-house team.
        </p>
      </div>

      {/* ---- the bays + sector beacons ---- */}
      <div data-mgst="svcHs" className="absolute inset-0 z-20 opacity-0" style={{ pointerEvents: 'none' }}>
        <div className="absolute inset-x-0 bottom-[7%] top-[22%] flex flex-col items-center justify-end gap-5 px-[6vw]">
          {/* service bays — every service, each its own lit station */}
          <div
            data-mgst="svcB1"
            className="grid w-full max-w-5xl grid-cols-4 gap-3 will-change-transform"
          >
            {services.map((s, i) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="mgst-holo-panel group pointer-events-auto rounded-sm p-3.5 transition-colors hover:border-gleam/60"
              >
                <span className="flex items-baseline justify-between">
                  <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[rgba(91,227,255,0.8)]">
                    Bay {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] text-moon-faint transition-colors group-hover:text-gleam" aria-hidden>
                    →
                  </span>
                </span>
                <span className="mt-2 block text-sm font-medium leading-snug text-white [font-family:var(--font-studio-display)] transition-colors group-hover:text-gleam">
                  {s.name}
                </span>
                <span className="mt-1.5 line-clamp-2 block text-[11px] leading-relaxed text-moon">
                  {s.short}
                </span>
              </Link>
            ))}
          </div>

          {/* sector beacons — six verticals, one standard */}
          <div
            data-mgst="svcB2"
            className="flex flex-col items-center gap-2.5 will-change-transform"
          >
            <p className="text-[10px] uppercase tracking-[0.4em] text-moon [text-shadow:0_2px_16px_rgba(0,0,0,0.9)]">
              Six sectors · one standard
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {sectorPages.map((s) => (
                <Link
                  key={s.slug}
                  href={`/sectors/${s.slug}`}
                  className="pointer-events-auto border border-white/15 bg-black/45 px-3.5 py-1.5 text-[11px] uppercase tracking-[0.16em] text-moon backdrop-blur-sm transition-colors [clip-path:polygon(6px_0,100%_0,100%_calc(100%-6px),calc(100%-6px)_100%,0_100%,0_6px)] hover:border-[rgba(91,227,255,0.6)] hover:text-white"
                >
                  {s.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
