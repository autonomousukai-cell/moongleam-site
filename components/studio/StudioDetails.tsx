import Link from 'next/link';
import { site } from '@/lib/site';

/**
 * Accessible, server-rendered content beneath the tour — the homepage's
 * crawlable substance (SEO + screen readers). Carries the page's only <h1>,
 * real service copy and internal links to every main section: the classic
 * nav/footer are hidden on the immersive homepage, so search engines and
 * keyboard users find the rest of the site from here.
 */
const tourZones = [
  {
    n: '01',
    t: 'The Studio',
    d: 'A night-lit futuristic studio building — the front door of Moon Gleam AI Studio, London.',
  },
  {
    n: '02',
    t: 'Reception',
    d: 'Welcome to the future of film production — the LED wall plays our studio showreel.',
  },
  {
    n: '03',
    t: 'AI Creative Lab',
    d: 'From an idea to a cinematic universe — concept art, storyboards and prompt-craft on floating screens.',
  },
  {
    n: '04',
    t: 'Virtual Soundstage',
    d: 'LED walls and AI-generated sets. Anything you can imagine can become a set.',
  },
  {
    n: '05',
    t: 'Production Pipeline',
    d: 'Concept → Script → Visual Dev → AI Generation → Voice & Sound → Edit → Final Film. AI-powered, human-directed.',
  },
  {
    n: '06',
    t: 'Editing & Render Suite',
    d: 'Fast production, film-level detail — cinematic post-production and delivery built for every platform.',
  },
  {
    n: '07',
    t: 'Screening Room',
    d: 'A private cinema for the Moon Gleam portfolio — selected worlds we have brought to life.',
  },
  {
    n: '08',
    t: 'Booking',
    d: 'Ready to create what has never been seen? Start your project from the illuminated front desk.',
  },
];

const siteLinks = [
  { label: 'Our work', href: '/work' },
  { label: 'Services', href: '/services' },
  { label: 'Sectors', href: '/sectors' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'About the studio', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export default function StudioDetails() {
  return (
    <section
      id="studio-details"
      className="relative border-t border-ink-line/40 bg-ink px-6 py-20 scroll-mt-16 sm:py-28"
    >
      <div className="mx-auto max-w-content">
        <p className="text-xs font-medium uppercase tracking-[0.32em] text-gleam">
          Moon Gleam AI Studio · London
        </p>
        <h1 className="mt-3 max-w-3xl text-3xl font-medium tracking-tight text-white [font-family:var(--font-studio-display)] sm:text-5xl">
          AI Films. Cinematic Stories. Limitless Worlds.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-moon-soft">
          Moon Gleam is a London-based AI film studio producing AI-powered
          video that grows UK businesses — TV commercials, brand films,
          promotional and social content, documentaries, kids animation and
          UGC — full production from brief to delivery, powered by creative
          AI and directed by humans.
        </p>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-moon-soft">
          What you just walked is our virtual studio — a scroll-driven camera
          journey through the building where our AI films are made, from the
          night-lit exterior to the rooftop booking desk. Every room below is
          open; scroll back up or use the studio map to revisit any of them.
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tourZones.map((z) => (
            <div
              key={z.n}
              className="rounded-2xl border border-ink-line/40 bg-ink-soft/40 p-5 transition-colors hover:border-gleam/30"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gleam">{z.n}</span>
                <span className="rounded-full border border-gleam/30 px-2.5 py-0.5 text-[9px] uppercase tracking-[0.16em] text-gleam/80">
                  Open
                </span>
              </div>
              <h2 className="mt-3 text-lg font-semibold text-moon">{z.t}</h2>
              <p className="mt-2 text-sm leading-relaxed text-moon-soft">{z.d}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap items-center gap-3">
          <Link
            href="/contact"
            className="rounded-full bg-gleam px-7 py-3.5 text-sm font-semibold text-ink transition-transform hover:scale-[1.03]"
          >
            Start your project
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-moon/30 px-7 py-3.5 text-sm font-semibold text-moon transition-colors hover:border-gleam/60 hover:text-gleam"
          >
            Book a discovery call
          </Link>
          <a
            href={site.contact.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-moon/30 px-7 py-3.5 text-sm font-semibold text-moon transition-colors hover:border-gleam/60 hover:text-gleam"
          >
            WhatsApp us
          </a>
          <Link
            href="/work"
            className="ml-auto text-sm font-medium text-gleam hover:text-gleam-bright"
          >
            View our work <span aria-hidden>→</span>
          </Link>
        </div>

        {/* the homepage's site index — nav/footer are hidden on this route */}
        <nav
          aria-label="Site sections"
          className="mt-14 border-t border-ink-line/40 pt-8"
        >
          <ul className="flex flex-wrap gap-x-7 gap-y-3">
            {siteLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-sm text-moon-soft transition-colors hover:text-gleam"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs text-moon-faint">
            {site.name} · {site.contact.address} ·{' '}
            <a href={site.contact.phoneHref} className="hover:text-gleam">
              {site.contact.phone}
            </a>{' '}
            ·{' '}
            <a href={`mailto:${site.contact.email}`} className="hover:text-gleam">
              {site.contact.email}
            </a>
          </p>
        </nav>
      </div>
    </section>
  );
}
