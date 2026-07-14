'use client';

import ZoneLayer, { useZoneReveal } from '../ZoneLayer';
import { site } from '@/lib/site';

const ROWS: { label: string; trad: string; mg: string }[] = [
  { label: 'Turnaround', trad: 'Weeks to months', mg: 'Days' },
  { label: 'Cost', trad: '£5,000 – £50,000+', mg: 'From £499' },
  { label: 'Crew', trad: 'Full crew & kit hire', mg: 'One AI studio + human direction' },
  { label: 'Formats', trad: 'One deliverable', mg: 'Every platform, instantly' },
  { label: 'Revisions', trad: 'Reshoots cost extra', mg: 'Revised until you approve' },
];

/** Zone 5 — PRICING DESK. Traditional vs Moon Gleam AI comparison. */
export default function ZonePricing({ progress }: { progress: number }) {
  const { local } = useZoneReveal(progress, 0.72, 0.86);
  return (
    <ZoneLayer progress={progress} start={0.72} end={0.86}>
      <div className="w-full max-w-3xl">
        <p className="mb-6 text-center text-xs font-medium uppercase tracking-[0.25em] text-gleam">
          The value, side by side
        </p>

        <div className="overflow-hidden rounded-2xl border border-ink-line bg-ink-soft/80 backdrop-blur">
          <div className="grid grid-cols-3 border-b border-ink-line text-xs font-semibold uppercase tracking-wide">
            <div className="p-3 text-moon-faint">&nbsp;</div>
            <div className="p-3 text-center text-moon-soft">Traditional Production</div>
            <div className="bg-gleam/10 p-3 text-center text-gleam">Moon Gleam AI</div>
          </div>
          {ROWS.map((r, i) => {
            const t = Math.min(1, Math.max(0, (local - i * 0.12) / 0.3));
            return (
              <div
                key={r.label}
                className="grid grid-cols-3 border-b border-ink-line/60 text-sm last:border-0"
                style={{ opacity: 0.12 + t * 0.88, transform: `translateX(${(1 - t) * 18}px)` }}
              >
                <div className="p-3 text-[11px] font-medium uppercase tracking-wide text-moon-faint">
                  {r.label}
                </div>
                <div className="p-3 text-center text-moon-soft line-through decoration-moon-faint/50">
                  {r.trad}
                </div>
                <div className="bg-gleam/5 p-3 text-center font-medium text-moon">{r.mg}</div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex justify-center">
          <a
            href={site.messenger}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="cta"
            className="exp-float inline-flex items-center gap-2 rounded-full border border-gleam/50 bg-ink/50 px-6 py-2.5 text-sm font-semibold text-gleam backdrop-blur transition-colors hover:bg-gleam hover:text-ink"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
              <path d="M12 2C6.2 2 2 6.34 2 11.85c0 3.14 1.44 5.94 3.7 7.77V22l3.38-1.86c.9.25 1.86.38 2.92.38 5.8 0 10-4.34 10-9.85S17.8 2 12 2Z" />
            </svg>
            Ask me what fits your budget
          </a>
        </div>
      </div>
    </ZoneLayer>
  );
}
