import { clients } from '@/lib/data';

/** Client name marquee — pure CSS animation, duplicated track for a seamless loop. */
export default function LogoMarquee() {
  const track = [...clients, ...clients];
  return (
    <div className="marquee-mask overflow-hidden border-y border-ink-line/60 py-6">
      <div className="marquee-track flex w-max items-center gap-14">
        {track.map((c, i) => (
          <span
            key={`${c}-${i}`}
            className="whitespace-nowrap font-display text-sm font-medium text-moon-faint transition-colors duration-200 hover:text-moon-soft"
          >
            {c}
          </span>
        ))}
      </div>
    </div>
  );
}
