import Link from 'next/link';
import { site } from '@/lib/site';
import { services, sectorPages, portfolio, categories } from '@/lib/data';
import { posts } from '@/lib/posts';
import { ABOUT_ROOM } from './journey';

/**
 * Accessible, server-rendered content beneath the tour — the homepage's
 * crawlable substance (SEO + screen readers). Carries the page's only <h1>,
 * real copy for every room of the tour (About, Services, Sectors, Portfolio,
 * Pricing, Blog, Contact) and internal links to every main section: the
 * classic nav/footer are hidden on the immersive homepage, so search engines
 * and keyboard users find the rest of the site from here.
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
    t: 'The Studio Story',
    d: 'A video studio built for the AI era — London-based, 500+ UK businesses served across six sectors, full A-to-Z production in-house.',
  },
  {
    n: '04',
    t: 'Service Bays',
    d: 'Every service under one roof — AI video production, promos, TVCs, UGC, documentary, animation and more, each in its own lit bay.',
  },
  {
    n: '05',
    t: 'Virtual Soundstage',
    d: 'LED walls and AI-generated sets. Anything you can imagine can become a set.',
  },
  {
    n: '06',
    t: 'Production Pipeline',
    d: 'Concept → Script → Visual Dev → AI Generation → Voice & Sound → Edit → Final Film. AI-powered, human-directed.',
  },
  {
    n: '07',
    t: 'Editing & Render Suite',
    d: 'Fast production, film-level detail — cinematic post-production and delivery built for every platform.',
  },
  {
    n: '08',
    t: 'Portfolio Wall',
    d: `The full archive — all ${portfolio.length} films on a filterable LED wall, from broadcast TVCs to documentary series.`,
  },
  {
    n: '09',
    t: 'The Rate Card',
    d: 'Transparent pricing on holographic plinths — social videos from £499, promo videos from £1,499, broadcast TVCs from £3,999.',
  },
  {
    n: '10',
    t: 'The Story Archive',
    d: `A reading lounge of ${posts.length} in-depth guides on AI video, pricing and what actually converts.`,
  },
  {
    n: '11',
    t: 'Contact & Exit Lobby',
    d: 'Ready to create what has never been seen? The illuminated front desk, contact wall and social beacons.',
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
          journey through the building where our AI films are made. The whole
          website lives inside it: the studio story, every service bay, the
          full portfolio wall, the rate card, the reading lounge and the
          contact lobby. Every room below is open; scroll back up or use the
          studio map to jump to any of them.
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

        {/* ---- the rooms' substance, crawlable ---- */}
        <div className="mt-16 grid gap-12 border-t border-ink-line/40 pt-12 lg:grid-cols-2">
          <div>
            <h2 className="text-xl font-semibold text-moon">{ABOUT_ROOM.headline}</h2>
            <p className="mt-3 text-sm leading-relaxed text-moon-soft">{ABOUT_ROOM.lead}</p>
            <p className="mt-3 text-sm leading-relaxed text-moon-soft">{ABOUT_ROOM.body}</p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {ABOUT_ROOM.glance.map((g) => (
                <li key={g} className="flex gap-2 text-sm text-moon-soft">
                  <span className="text-gleam">✓</span>
                  {g}
                </li>
              ))}
            </ul>
            <Link
              href="/about"
              className="mt-4 inline-block text-sm font-medium text-gleam hover:text-gleam-bright"
            >
              About the studio <span aria-hidden>→</span>
            </Link>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-moon">Clear pricing. Serious quality.</h2>
            <p className="mt-3 text-sm leading-relaxed text-moon-soft">
              Social videos from £499, promo videos from £1,499, broadcast TVCs from £3,999.
              Every project is scoped on a free call — honest starting points, not hidden-fee
              teasers. Documentary, kids animation, short film and monthly content engines are
              quoted per project.
            </p>
            <Link
              href="/pricing"
              className="mt-4 inline-block text-sm font-medium text-gleam hover:text-gleam-bright"
            >
              Full pricing <span aria-hidden>→</span>
            </Link>

            <h2 className="mt-8 text-xl font-semibold text-moon">The full portfolio</h2>
            <p className="mt-3 text-sm leading-relaxed text-moon-soft">
              {portfolio.length} films on the studio's LED portfolio wall —{' '}
              {Object.values(categories).join(', ')} — for clients across legal, accountancy,
              charity, education, retail and travel.
            </p>
            <Link
              href="/work"
              className="mt-4 inline-block text-sm font-medium text-gleam hover:text-gleam-bright"
            >
              Browse our work <span aria-hidden>→</span>
            </Link>
          </div>
        </div>

        <div className="mt-12 grid gap-12 border-t border-ink-line/40 pt-12 lg:grid-cols-2">
          <div>
            <h2 className="text-xl font-semibold text-moon">Services — everything under one roof</h2>
            <ul className="mt-4 space-y-2">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="text-sm text-moon-soft transition-colors hover:text-gleam"
                  >
                    {s.name}
                  </Link>
                  <span className="block text-xs text-moon-faint">{s.short}</span>
                </li>
              ))}
            </ul>
            <h2 className="mt-8 text-xl font-semibold text-moon">Six sectors, one standard</h2>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
              {sectorPages.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/sectors/${s.slug}`}
                    className="text-sm text-moon-soft transition-colors hover:text-gleam"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-moon">
              From the story archive — {posts.length} guides
            </h2>
            <ul className="mt-4 space-y-2">
              {posts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-sm text-moon-soft transition-colors hover:text-gleam"
                  >
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/blog"
              className="mt-4 inline-block text-sm font-medium text-gleam hover:text-gleam-bright"
            >
              All guides <span aria-hidden>→</span>
            </Link>
          </div>
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
