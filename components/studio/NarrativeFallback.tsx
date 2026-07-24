'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import LeadForm from '@/components/LeadForm';
import SocialIcons from '@/components/SocialIcons';
import { tiers } from '@/components/Pricing';
import { site } from '@/lib/site';
import {
  portfolio,
  categories,
  services,
  sectorPages,
  ytThumb,
  type Category,
  type WorkItem,
} from '@/lib/data';
import { posts, formatDate } from '@/lib/posts';
import {
  ABOUT_ROOM,
  PIPELINE_STEPS,
  SUITE_PROOFS,
  ZONE_BACKDROPS,
} from './journey';

/**
 * Lightweight fallback for mobile (animate=true, gentle in-view reveals) and
 * prefers-reduced-motion (animate=false, fully static). Tells the same
 * whole-site story as the desktop tour — exterior → reception → studio story
 * (About) → service bays (Services + Sectors) → soundstage → pipeline →
 * suite → portfolio wall (full filterable archive + lightbox) → rate card
 * (Pricing, numbers imported from components/Pricing.tsx) → story archive
 * (Blog) → contact lobby / footer — as standard accessible sections over the
 * same AI-rendered studio sets, with the SEO page content (<StudioDetails/>)
 * rendered beneath by the page. Native scroll only — nothing here may ever
 * lock or intercept the page.
 */

/** A zone's rendered set as a section plate, darkened for legibility.
    `strong` = heavier scrim for rooms carrying dense small text (contact/footer). */
function Set({
  src,
  eager = false,
  alt = '',
  strong = false,
}: {
  src: string;
  eager?: boolean;
  alt?: string;
  strong?: boolean;
}) {
  return (
    <div className="absolute inset-0" aria-hidden={alt === ''}>
      {/* eslint-disable-next-line @next/next/no-img-element -- set plates share the desktop tour's pre-optimised WebP URLs */}
      <img
        src={src}
        alt={alt}
        draggable={false}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        className="h-full w-full select-none object-cover"
      />
      {/* minimal legibility gradient only — the sets must read crisp + vivid */}
      <div
        className={
          'absolute inset-0 ' +
          (strong
            ? 'bg-[linear-gradient(180deg,rgba(2,4,9,0.66),rgba(2,4,9,0.56)_38%,rgba(2,4,9,0.6)_62%,rgba(2,4,9,0.8))]'
            : 'bg-[linear-gradient(180deg,rgba(2,4,9,0.42),rgba(2,4,9,0.12)_38%,rgba(2,4,9,0.14)_62%,rgba(2,4,9,0.52))]')
        }
      />
    </div>
  );
}

/** A room's header block over its plate: the radial scrim behind the text
    guarantees contrast on any exposure (same grammar as the desktop TextHalo /
    the round-6 footer panel) without dimming the set itself. */
function RoomHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative z-0">
      <div
        aria-hidden
        className="absolute -inset-x-10 -inset-y-6 -z-10 bg-[radial-gradient(60%_85%_at_50%_50%,rgba(3,5,10,0.72),transparent_82%)]"
      />
      {children}
    </div>
  );
}

/** Reception LED wall, mobile edition: thumbnail facade → tap plays with
    sound (the tap is the user gesture browsers require for audio). */
function LiteShowreel() {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="relative mx-auto mt-7 w-full max-w-md overflow-hidden rounded-[3px] border border-[rgba(91,227,255,0.4)] bg-black shadow-[0_0_60px_-10px_rgba(91,227,255,0.5)]">
      <div className="relative aspect-video">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${site.showreelId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
            title="Moon Gleam — studio showreel"
            allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
            style={{ border: 0 }}
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label="Play the Moon Gleam showreel with sound"
            className="group absolute inset-0 block w-full"
          >
            <Image
              src={ytThumb(site.showreelId)}
              alt=""
              fill
              sizes="(max-width: 640px) 92vw, 448px"
              className="object-cover opacity-90"
            />
            <span className="absolute inset-0 bg-[radial-gradient(70%_70%_at_50%_50%,transparent_40%,rgba(0,0,0,0.45))]" />
            <span className="absolute inset-0 grid place-items-center">
              <span className="mgst-pulse grid h-14 w-14 place-items-center rounded-full border border-gleam/80 bg-black/55 text-base text-gleam shadow-[0_0_30px_rgba(233,196,106,0.65)]">
                ▶
              </span>
            </span>
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent px-3 pb-2.5 pt-8 text-left">
              <span className="block text-[9px] uppercase tracking-[0.26em] text-gleam/90">
                Welcome to Moon Gleam — tap for sound
              </span>
            </span>
          </button>
        )}
      </div>
    </div>
  );
}

/** The full portfolio wall, mobile edition: filter chips + every work +
    the same letterboxed lightbox as the desktop screening room. */
function LitePortfolio() {
  const [filter, setFilter] = useState<Category | 'all'>('all');
  const [playing, setPlaying] = useState<WorkItem | null>(null);

  const works = useMemo(
    () => (filter === 'all' ? portfolio : portfolio.filter((w) => w.cat === filter)),
    [filter],
  );

  return (
    <div className="mt-6 w-full">
      {/* filter rail */}
      <div className="flex flex-wrap items-center justify-center gap-1.5">
        {(
          [
            { key: 'all', label: 'All films' },
            ...(Object.entries(categories) as Array<[Category, string]>).map(
              ([key, label]) => ({ key, label }),
            ),
          ] as Array<{ key: Category | 'all'; label: string }>
        ).map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setFilter(f.key as Category | 'all')}
            aria-pressed={filter === f.key}
            className={
              'border px-2.5 py-1.5 text-[9px] uppercase tracking-[0.14em] transition-colors [clip-path:polygon(5px_0,100%_0,100%_calc(100%-5px),calc(100%-5px)_100%,0_100%,0_5px)] ' +
              (filter === f.key
                ? 'border-gleam/70 bg-gleam/15 text-gleam'
                : 'border-white/15 bg-black/45 text-moon-soft')
            }
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        {works.map((w) => (
          <button
            key={w.id}
            type="button"
            onClick={() => setPlaying(w)}
            className="group overflow-hidden rounded-lg border border-white/10 bg-black/50 text-left transition-colors hover:border-gleam/50"
            aria-label={`Screen this film: ${w.title}`}
          >
            <div className="relative aspect-video">
              <Image
                src={ytThumb(w.id)}
                alt={w.title}
                fill
                sizes="(max-width: 640px) 45vw, 220px"
                className="object-cover opacity-80 transition-opacity group-hover:opacity-100"
              />
            </div>
            <div className="bg-black/60 px-2.5 py-1.5">
              <p className="text-[9px] uppercase tracking-[0.16em] text-gleam/90">
                {categories[w.cat]}
              </p>
              <p className="truncate text-[12px] text-moon">{w.title}</p>
            </div>
          </button>
        ))}
      </div>

      {/* the screening — room dims, letterbox, film plays big */}
      {playing && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Now screening: ${playing.title}`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 px-3"
        >
          <div className="w-full max-w-2xl">
            <div className="flex items-baseline justify-between gap-3 pb-2">
              <p className="min-w-0 truncate text-left">
                <span className="text-[9px] uppercase tracking-[0.3em] text-gleam">
                  Now screening
                </span>
                <span className="mt-0.5 block truncate text-sm font-medium text-white [font-family:var(--font-studio-display)]">
                  {playing.title}
                </span>
              </p>
              <button
                type="button"
                onClick={() => setPlaying(null)}
                className="mgst-hud-btn-ghost shrink-0 !px-4 !py-1.5 !text-[10px]"
              >
                Close
              </button>
            </div>
            <div className="relative aspect-video overflow-hidden rounded-[3px] border border-[rgba(233,196,106,0.4)] bg-black">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${playing.id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                title={`Now screening: ${playing.title}`}
                allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
                style={{ border: 0 }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function NarrativeFallback({ animate }: { animate: boolean }) {
  /* The first-screen scroll cue hides as soon as the visitor starts moving. */
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const reveal = (delay = 0) =>
    animate
      ? {
          initial: { opacity: 0, y: 26 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: '-12% 0px' },
          transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as const },
        }
      : {};

  const kicker =
    'text-[11px] font-semibold uppercase tracking-[0.44em] text-gleam [text-shadow:0_2px_16px_rgba(0,0,0,0.95)]';
  const headline =
    'mt-4 text-balance text-3xl font-medium leading-snug text-white [font-family:var(--font-studio-display)] [text-shadow:0_2px_30px_rgba(0,0,0,0.85)] sm:text-4xl';
  const lead =
    'mx-auto mt-4 max-w-sm text-balance text-base leading-relaxed text-moon [text-shadow:0_2px_24px_rgba(0,0,0,0.9)]';
  const chip =
    'border border-white/15 bg-black/40 px-3 py-1.5 text-[11px] uppercase tracking-[0.16em] text-moon [clip-path:polygon(6px_0,100%_0,100%_calc(100%-6px),calc(100%-6px)_100%,0_100%,0_6px)]';

  return (
    <div className="bg-[#05060A] text-moon">
      {/* -------- 01 · EXTERIOR -------- */}
      <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-[#05060A] text-center">
        {/* establishing shot, framed on the facade so the WHOLE "MOON GLEAM
            AI STUDIO" sign reads on a portrait screen (a full-bleed cover
            crop can only ever show ~20% of this 2.35:1 plate) */}
        <div className="relative w-full">
          {/* eslint-disable-next-line @next/next/no-img-element -- shares the desktop tour's pre-optimised WebP plate */}
          <img
            src={ZONE_BACKDROPS.exterior}
            alt="Moon Gleam AI Studio building — the illuminated MOON GLEAM AI STUDIO signage on the facade at night"
            draggable={false}
            decoding="async"
            className="aspect-[5/4] w-full select-none object-cover [object-position:47%_36%]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,4,9,0.32),transparent_28%,transparent_58%,#05060A_97%)]" />
        </div>

        {/* hero value proposition — what Moon Gleam is, at first glance
            (the name itself stays on the building signage above; the real
            <h1> is SSR'd in StudioDetails) */}
        <motion.div
          {...reveal()}
          className="relative z-10 -mt-4 flex flex-1 flex-col items-center justify-center px-6 pb-32"
        >
          <p className="text-[11px] uppercase tracking-[0.28em] text-moon-soft [text-shadow:0_2px_20px_rgba(0,0,0,0.9)]">
            AI Films. Cinematic Stories. Limitless Worlds.
          </p>
          <p className="mt-3 max-w-sm text-balance text-[1.7rem] font-medium leading-tight text-white [font-family:var(--font-studio-display)] [text-shadow:0_2px_30px_rgba(0,0,0,0.85)]">
            AI-Powered Cinematic Video Production
          </p>
          <p className="mt-3 max-w-xs text-balance text-base leading-relaxed text-moon [text-shadow:0_2px_24px_rgba(0,0,0,0.9)]">
            Studio-quality films for 500+ UK businesses — from brief to broadcast.
          </p>
        </motion.div>

        {/* scroll cue — visible on load, hides once the visitor starts scrolling */}
        <div
          className={
            'absolute bottom-6 left-1/2 z-10 w-max -translate-x-1/2 text-center transition-opacity duration-500 ' +
            (scrolled ? 'pointer-events-none opacity-0' : 'opacity-100')
          }
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-moon [text-shadow:0_2px_18px_rgba(0,0,0,0.9)]">
            Scroll to enter the studio
          </p>
          <p className="mt-1 text-[10px] uppercase tracking-[0.22em] text-moon-soft">
            Explore all 11 rooms below
          </p>
          <svg
            viewBox="0 0 24 24"
            className={'mx-auto mt-2 h-7 w-7 text-gleam ' + (animate ? 'mgst-bob' : '')}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M5 7.5l7 6 7-6" />
            <path d="M5 13.5l7 6 7-6" opacity="0.45" />
          </svg>
        </div>
      </section>

      {/* -------- 02 · RECEPTION -------- */}
      <section className="relative flex min-h-[92svh] flex-col items-center justify-center overflow-hidden px-6 text-center">
        <Set src={ZONE_BACKDROPS.reception} />

        <motion.div {...reveal()} className="relative z-10 w-full">
          <RoomHeader>
            <p className={kicker}>Reception · AI Film Studio</p>
            <h2 className={headline}>Welcome to the future of film production.</h2>
            <p className={lead}>
              The showreel is already up on the reception wall — tap it for sound
              and see what we make for UK businesses.
            </p>
          </RoomHeader>
          <LiteShowreel />
          <p className="mt-5 text-[11px] uppercase tracking-[0.24em] text-moon-soft [text-shadow:0_2px_14px_rgba(0,0,0,0.9)]">
            Full cinematic tour available on desktop
          </p>
        </motion.div>
      </section>

      {/* -------- 03 · THE STUDIO STORY (About) -------- */}
      <section className="relative flex min-h-[88svh] flex-col items-center justify-center overflow-hidden px-6 py-16 text-center">
        <Set src={ZONE_BACKDROPS.about} />

        <motion.div {...reveal()} className="relative z-10 max-w-md">
          <RoomHeader>
            <p className={kicker}>03 · The Studio Story</p>
            <h2 className={headline}>{ABOUT_ROOM.headline}</h2>
            <p className={lead}>{ABOUT_ROOM.lead}</p>
          </RoomHeader>
          <div className="mx-auto mt-6 flex flex-wrap items-center justify-center gap-2">
            {ABOUT_ROOM.glance.map((g) => (
              <span key={g} className={chip}>
                {g}
              </span>
            ))}
          </div>
          <Link href="/about" className="mgst-hud-btn-ghost mt-6 !px-6 !py-2.5 !text-xs">
            Read the full story
          </Link>
        </motion.div>
      </section>

      {/* -------- 04 · SERVICE BAYS (Services + Sectors) -------- */}
      <section className="relative flex min-h-[92svh] flex-col items-center justify-center overflow-hidden px-6 py-16 text-center">
        <Set src={ZONE_BACKDROPS.services} />

        <motion.div {...reveal()} className="relative z-10 w-full max-w-md">
          <RoomHeader>
            <p className={kicker}>04 · Service Bays</p>
            <h2 className={headline}>Everything under one roof.</h2>
            <p className={lead}>
              Eight production bays — TVCs to UGC — plus six sector specialisms,
              all produced in-house. Tap a bay to explore.
            </p>
          </RoomHeader>
          <div className="mt-6 grid grid-cols-2 gap-2.5 text-left">
            {services.map((s, i) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="mgst-holo-panel rounded-sm p-3 transition-colors hover:border-gleam/60"
              >
                <span className="block text-[9px] font-semibold uppercase tracking-[0.26em] text-[rgba(91,227,255,0.85)]">
                  Bay {String(i + 1).padStart(2, '0')}
                </span>
                <span className="mt-1 block text-sm font-medium leading-snug text-white [font-family:var(--font-studio-display)]">
                  {s.name}
                </span>
                <span className="mt-1 line-clamp-2 block text-[11px] leading-snug text-moon">
                  {s.short}
                </span>
              </Link>
            ))}
          </div>
          <p className="mt-6 text-[10px] uppercase tracking-[0.4em] text-moon [text-shadow:0_2px_14px_rgba(0,0,0,0.9)]">
            Six sectors · one standard
          </p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
            {sectorPages.map((s) => (
              <Link key={s.slug} href={`/sectors/${s.slug}`} className={chip}>
                {s.name}
              </Link>
            ))}
          </div>
        </motion.div>
      </section>

      {/* -------- 05 · VIRTUAL SOUNDSTAGE -------- */}
      <section className="relative flex min-h-[88svh] flex-col items-center justify-center overflow-hidden px-6 text-center">
        <Set src={ZONE_BACKDROPS.soundstage} />

        <motion.div {...reveal()} className="relative z-10">
          <RoomHeader>
            <p className={kicker}>05 · Virtual Soundstage</p>
            <h2 className={headline}>Anything you can imagine can become a set.</h2>
            <p className={lead}>
              The LED volume plays AI-generated environments live behind the
              action — any location, any era, re-dressed in minutes.
            </p>
          </RoomHeader>
          <a
            href={site.social.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="mgst-hud-btn-ghost mt-6 !px-6 !py-2.5 !text-xs"
          >
            Watch the showreel
          </a>
        </motion.div>
      </section>

      {/* -------- 06 · PRODUCTION PIPELINE -------- */}
      <section className="relative flex min-h-[88svh] flex-col items-center justify-center overflow-hidden px-6 text-center">
        <Set src={ZONE_BACKDROPS.pipeline} />

        <motion.div {...reveal()} className="relative z-10">
          <RoomHeader>
            <p className={kicker}>06 · Production Pipeline</p>
            <h2 className={headline}>AI-powered. Human-directed.</h2>
            <p className={lead}>
              Seven stations from concept to final film — a director&rsquo;s eye
              on every frame, before and after the AI.
            </p>
          </RoomHeader>
          <ol className="mx-auto mt-8 max-w-xs space-y-0 rounded-xl border border-white/10 bg-[rgba(4,6,11,0.68)] px-6 py-5 text-left backdrop-blur-md">
            {PIPELINE_STEPS.map((step, i) => (
              <li key={step} className="flex items-start gap-3">
                <span className="flex flex-col items-center">
                  <span
                    className="mt-1 h-2.5 w-2.5 rounded-full"
                    style={{
                      background: ['#5BE3FF', '#5BE3FF', '#8B7CF6', '#8B7CF6', '#B58FD8', '#E9C46A', '#E9C46A'][i],
                      boxShadow: '0 0 10px 2px rgba(139,124,246,0.35)',
                    }}
                  />
                  {i < PIPELINE_STEPS.length - 1 && (
                    <span className="h-6 w-px bg-gradient-to-b from-white/25 to-white/5" />
                  )}
                </span>
                <span className="text-base tracking-wide text-moon [text-shadow:0_2px_14px_rgba(0,0,0,0.9)]">
                  {step}
                </span>
              </li>
            ))}
          </ol>
        </motion.div>
      </section>

      {/* -------- 07 · EDITING & RENDER SUITE -------- */}
      <section className="relative flex min-h-[80svh] flex-col items-center justify-center overflow-hidden px-6 text-center">
        <Set src={ZONE_BACKDROPS.suite} />

        <motion.div {...reveal()} className="relative z-10">
          <RoomHeader>
            <p className={kicker}>07 · Editing &amp; Render Suite</p>
            <h2 className={headline}>Fast production. Film-level detail.</h2>
            <p className={lead}>
              Edit, grade, sound and mastering in one suite — a broadcast-standard
              finish on every delivery.
            </p>
          </RoomHeader>
          <div className="mx-auto mt-6 flex max-w-sm flex-wrap items-center justify-center gap-2">
            {SUITE_PROOFS.map((s) => (
              <span key={s} className={chip}>
                {s}
              </span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* -------- 08 · PORTFOLIO WALL (full filterable archive) -------- */}
      <section className="relative overflow-hidden px-6 py-16 text-center">
        <Set src={ZONE_BACKDROPS.screening} />

        <motion.div {...reveal()} className="relative z-10 mx-auto w-full max-w-md">
          <RoomHeader>
            <p className={kicker}>08 · Portfolio Wall</p>
            <h2 className={headline}>Selected worlds we have brought to life.</h2>
            <p className={lead}>
              The full archive — {portfolio.length} films across commercials, documentary,
              animation, film, social and charity. Tap any screen to watch.
            </p>
          </RoomHeader>
          <LitePortfolio />
          <Link href="/work" className="mgst-hud-btn mt-7 inline-block !px-7 !py-3">
            Browse the portfolio page
          </Link>
        </motion.div>
      </section>

      {/* -------- 09 · THE RATE CARD (Pricing) -------- */}
      <section className="relative overflow-hidden px-6 py-16 text-center">
        <Set src={ZONE_BACKDROPS.pricing} />

        <motion.div {...reveal()} className="relative z-10 mx-auto w-full max-w-md">
          <RoomHeader>
            <p className={kicker}>09 · The Rate Card</p>
            <h2 className={headline}>Clear pricing. Serious quality.</h2>
            <p className={lead}>
              Honest starting points for every format — scoped on a free call, no
              hidden fees.
            </p>
          </RoomHeader>
          <div className="mt-7 space-y-5 text-left">
            {tiers.map((t) => (
              <div
                key={t.name}
                className={
                  'mgst-holo-panel relative rounded-sm p-5 ' +
                  (t.featured
                    ? '!border-gleam/50 shadow-[0_0_44px_-10px_rgba(233,196,106,0.55)]'
                    : '')
                }
              >
                {t.featured && (
                  <span className="absolute -top-3 left-4 border border-gleam/70 bg-black/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-gleam [clip-path:polygon(4px_0,100%_0,100%_calc(100%-4px),calc(100%-4px)_100%,0_100%,0_4px)]">
                    Most popular
                  </span>
                )}
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[rgba(91,227,255,0.9)]">
                  {t.name}
                </p>
                <p className="mt-1.5 text-[15px] leading-snug text-moon">{t.forWho}</p>
                <p className="mt-3 text-[11px] uppercase tracking-[0.2em] text-moon-soft">
                  Starting at
                </p>
                <p className="text-[2.6rem] font-medium leading-tight text-white [font-family:var(--font-studio-display)]">
                  {t.price}
                </p>
                <ul className="mt-3 space-y-2">
                  {t.features.map((f) => (
                    <li key={f} className="flex gap-2 text-base leading-snug text-moon">
                      <span className="text-gleam">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex justify-between border-t border-white/10 pt-3 text-xs text-moon-soft">
                  <span>
                    Duration
                    <span className="mt-0.5 block text-sm text-moon">{t.meta.duration}</span>
                  </span>
                  <span className="text-right">
                    Timeline
                    <span className="mt-0.5 block text-sm text-moon">{t.meta.timeline}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-6 max-w-sm text-sm leading-relaxed text-moon">
            Documentary, kids animation, short film and monthly content engines are quoted per
            project.
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <Link href="/contact" className="mgst-hud-btn !px-6 !py-2.5 !text-xs">
              Book a call
            </Link>
            <Link href="/pricing" className="mgst-hud-btn-ghost !px-6 !py-2.5 !text-xs">
              Full pricing detail
            </Link>
          </div>
        </motion.div>
      </section>

      {/* -------- 10 · THE STORY ARCHIVE (Blog) -------- */}
      <section className="relative overflow-hidden px-6 py-16 text-center">
        <Set src={ZONE_BACKDROPS.blog} />

        <motion.div {...reveal()} className="relative z-10 mx-auto w-full max-w-md">
          <RoomHeader>
            <p className={kicker}>10 · The Story Archive</p>
            <h2 className={headline}>Guides that grow UK businesses.</h2>
            <p className={lead}>
              {posts.length} in-depth guides on AI video, pricing, promos and what actually
              converts — written for owners, not filmmakers.
            </p>
          </RoomHeader>
          <div className="mt-6 grid grid-cols-2 gap-3 text-left">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group overflow-hidden rounded-lg border border-white/10 bg-black/50 transition-colors hover:border-gleam/50"
              >
                <div className="relative aspect-[16/10]">
                  <Image
                    src={post.cover}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 45vw, 220px"
                    className="object-cover opacity-85 transition-opacity group-hover:opacity-100"
                  />
                </div>
                <div className="bg-black/60 px-2.5 py-2">
                  <p className="text-[9px] uppercase tracking-[0.16em] text-[rgba(160,148,250,0.95)]">
                    {post.category} · {formatDate(post.date)}
                  </p>
                  <p className="mt-0.5 line-clamp-2 text-[12px] leading-snug text-moon">
                    {post.title}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <Link href="/blog" className="mgst-hud-btn-ghost mt-6 inline-block !px-6 !py-2.5 !text-xs">
            Enter the reading lounge — all guides
          </Link>
        </motion.div>
      </section>

      {/* -------- 11 · CONTACT & EXIT LOBBY (footer as a room) -------- */}
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-24">
        <Set src={ZONE_BACKDROPS.booking} strong />

        {/* scrim panel keeps every footer line WCAG-readable over the bright skyline */}
        <motion.div
          {...reveal()}
          className="relative z-10 mx-auto max-w-md rounded-2xl bg-[rgba(4,6,11,0.72)] px-5 py-8 text-center ring-1 ring-white/10 backdrop-blur-md"
        >
          <p className={kicker}>11 · Contact</p>
          <h2 className={headline}>Ready to create what has never been seen?</h2>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link href="/contact" className="mgst-hud-btn">
              Start your project
            </Link>
            <Link href="/contact" className="mgst-hud-btn-ghost">
              Book a discovery call
            </Link>
            <a
              href={site.contact.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mgst-hud-btn-ghost"
            >
              WhatsApp us
            </a>
          </div>

          {/* the footer wall */}
          <div className="mt-9 border-t border-white/10 pt-6 text-left">
            <div className="flex items-center justify-center gap-2.5">
              <Image
                src="/mg-logo.png"
                alt="Moon Gleam logo"
                width={36}
                height={36}
                className="h-9 w-9 object-contain"
              />
              <div>
                <p className="text-base font-semibold text-moon [font-family:var(--font-studio-display)]">
                  Moon <span className="text-gleam">Gleam</span>
                </p>
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-moon-soft">
                  Powered by Creative AI
                </p>
              </div>
            </div>
            <p className="mt-3 text-center text-sm leading-relaxed text-moon">
              AI-powered video production studio in London. Cinematic film for 500+ UK businesses
              — from brief to broadcast.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-6">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gleam">
                  Services
                </p>
                <ul className="mt-2.5 space-y-2">
                  {services.slice(0, 6).map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/services/${s.slug}`}
                        className="text-sm leading-snug text-moon transition-colors hover:text-gleam"
                      >
                        {s.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gleam">
                  Sectors
                </p>
                <ul className="mt-2.5 space-y-2">
                  {sectorPages.map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/sectors/${s.slug}`}
                        className="text-sm leading-snug text-moon transition-colors hover:text-gleam"
                      >
                        {s.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 space-y-2 text-center text-base text-moon">
              <p>
                <a href={site.contact.phoneHref} className="hover:text-gleam">
                  {site.contact.phone}
                </a>
              </p>
              <p>
                <a href={`mailto:${site.contact.email}`} className="hover:text-gleam">
                  {site.contact.email}
                </a>
              </p>
              <p>
                <a
                  href={site.contact.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gleam"
                >
                  WhatsApp
                </a>
              </p>
              <p className="text-sm text-moon-soft">{site.contact.address}</p>
            </div>

            <div className="mt-5 flex flex-col items-center gap-3">
              <SocialIcons />
              <p className="text-sm text-moon">
                <a
                  href={site.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gleam"
                >
                  YouTube
                </a>
                {' · '}
                <a
                  href={site.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gleam"
                >
                  Facebook
                </a>
                {' · '}
                <Link href="/blog" className="hover:text-gleam">
                  Blog
                </Link>
              </p>
            </div>
          </div>

          <div className="mt-10 text-left">
            <LeadForm />
          </div>
        </motion.div>
      </section>
    </div>
  );
}
