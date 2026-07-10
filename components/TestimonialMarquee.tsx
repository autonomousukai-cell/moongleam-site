import { reviews, sectorLabels } from '@/lib/data';

/** Sector-tagged testimonial marquee — duplicated track, CSS loop, pauses on hover. */
export default function TestimonialMarquee() {
  const track = [...reviews, ...reviews];
  return (
    <div className="marquee-mask overflow-hidden py-2">
      <div className="marquee-track marquee-slow flex w-max gap-6">
        {track.map((r, i) => (
          <figure
            key={`${r.name}-${i}`}
            className="w-[340px] shrink-0 rounded-2xl border border-ink-line bg-ink-soft p-6 transition-colors duration-300 hover:border-gleam/50"
          >
            <span className="mb-3 inline-block rounded-full bg-glow/10 px-3 py-1 text-xs font-medium text-glow">
              {sectorLabels[r.sector]}
            </span>
            <blockquote className="text-sm leading-relaxed text-moon-soft">“{r.quote}”</blockquote>
            <figcaption className="mt-4 flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-gleam/15 font-display text-sm font-semibold text-gleam">
                {r.name.charAt(0)}
              </span>
              <span>
                <span className="block text-sm font-semibold text-moon">{r.name}</span>
                <span className="block text-xs text-moon-faint">{r.role}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
