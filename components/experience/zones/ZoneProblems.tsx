'use client';

import ZoneLayer, { useZoneReveal } from '../ZoneLayer';

const CARDS: { problem: string; solution: string }[] = [
  { problem: 'Traditional video takes weeks', solution: 'We deliver in days.' },
  { problem: 'Agencies charge £1000s', solution: 'AI cuts costs up to 70%.' },
  { problem: 'One video, one use case', solution: 'Multiple formats instantly.' },
  { problem: 'Creative bottlenecks slow growth', solution: 'AI + human creatives = unlimited output.' },
];

/** Zone 2 — PROBLEM WALL. Cards light up / flip in sequence as you scroll. */
export default function ZoneProblems({ progress }: { progress: number }) {
  const { local } = useZoneReveal(progress, 0.14, 0.3);
  return (
    <ZoneLayer progress={progress} start={0.14} end={0.3}>
      <div className="w-full max-w-5xl">
        <p className="mb-8 text-center text-xs font-medium uppercase tracking-[0.25em] text-gleam">
          Why brands are switching
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {CARDS.map((c, i) => {
            const reveal = Math.min(1, Math.max(0, (local - i * 0.18) / 0.22));
            const flipped = reveal > 0.55;
            return (
              <div
                key={c.problem}
                className="rounded-2xl border border-ink-line bg-ink-soft/80 p-6 backdrop-blur transition-colors duration-300"
                style={{
                  opacity: 0.15 + reveal * 0.85,
                  transform: `translateY(${(1 - reveal) * 24}px)`,
                  borderColor: flipped ? 'rgba(233,196,106,0.55)' : undefined,
                  boxShadow: flipped ? '0 0 40px -18px rgba(233,196,106,0.5)' : undefined,
                }}
              >
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-ink text-xs font-semibold text-moon-faint">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-sm text-moon-soft line-through decoration-moon-faint/60">
                      {c.problem}
                    </p>
                    <p
                      className="mt-1 font-display text-lg font-semibold text-gleam transition-opacity duration-300"
                      style={{ opacity: flipped ? 1 : 0.25 }}
                    >
                      {c.solution}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </ZoneLayer>
  );
}
