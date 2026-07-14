'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { portfolio, ytThumb } from '@/lib/data';
import { cta } from '@/lib/site';

/* ------------------------------------------------------------------ *
 *  CinematicStudio — the homepage as ONE pinned screen. Scrolling      *
 *  scrubs a camera aperture open, walks you into the AI studio, zooms  *
 *  the LED wall (welcome video plays), then reveals hero → portfolio → *
 *  pricing → contact as chapters that change IN PLACE. Mouse movement  *
 *  parallaxes every layer. A reduced-motion fallback renders a plain   *
 *  stacked page.                                                       *
 * ------------------------------------------------------------------ */

const CDN = 'https://d8j0ntlcm91z4.cloudfront.net/user_3Aik900pJNIZAM1itTaGkIXE8Ga/';
const STUDIO_IMG = CDN + 'hf_20260714_003239_51f80628-eeb5-4648-be4a-4961559f402c.png';
const SCREEN_IMG = CDN + 'hf_20260714_004024_fd82a06d-65e4-4354-87a7-5b09a0540280.png';
const WELCOME_ID = 'x9c5L7DncWk';

type Item = (typeof portfolio)[number];
const WALL_IDS = ['kQKz4nE7ZxM', 'P1PCjWxa5Jo', 'wsVu1zJFt-k', 'Nm2uEJ6Q12M', 'yubYJ8DIjRQ', 'EIaa0ZCCyYM'];
const wall: Item[] = WALL_IDS.map((id) => portfolio.find((p) => p.id === id)).filter(
  (p): p is Item => Boolean(p),
);

const seg = (p: number, a: number, b: number) => Math.min(1, Math.max(0, (p - a) / (b - a)));
const between = (p: number, a: number, b: number) => (p >= a && p <= b ? 1 : 0);
const fade = (p: number, a: number, b: number, c: number, d: number) =>
  Math.min(seg(p, a, b), 1 - seg(p, c, d));

const CHAPTERS = [
  { key: 'aperture', label: 'Enter' },
  { key: 'studio', label: 'The Studio' },
  { key: 'welcome', label: 'Welcome' },
  { key: 'hero', label: 'What we do' },
  { key: 'work', label: 'The Work' },
  { key: 'pricing', label: 'Pricing' },
  { key: 'contact', label: 'Book' },
];

export default function CinematicStudio() {
  const [reduce, setReduce] = useState<boolean | null>(null);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduce(mq.matches);
  }, []);
  if (reduce === null) return <div className="min-h-screen bg-ink" aria-hidden />;
  if (reduce) return <ReducedHome />;
  return <Stage />;
}

function Stage() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);
  const mouse = useRef({ x: 0, y: 0 });
  const [m, setM] = useState({ x: 0, y: 0 });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    const raf = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const st = ScrollTrigger.create({
      trigger: wrapRef.current,
      start: 'top top',
      end: '+=6400',
      pin: pinRef.current,
      scrub: 1,
      onUpdate: (self) => setP(Math.round(self.progress * 1000) / 1000),
    });
    ScrollTrigger.refresh();

    let rafId = 0;
    const loop = () => {
      setM((prev) => ({
        x: prev.x + (mouse.current.x - prev.x) * 0.08,
        y: prev.y + (mouse.current.y - prev.y) * 0.08,
      }));
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    return () => {
      st.kill();
      gsap.ticker.remove(raf);
      lenis.destroy();
      cancelAnimationFrame(rafId);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const onMove = (e: React.MouseEvent) => {
    mouse.current = {
      x: (e.clientX / window.innerWidth - 0.5) * 2,
      y: (e.clientY / window.innerHeight - 0.5) * 2,
    };
  };

  // Aperture opening (0 → .12). Hole radius grows from tiny to full-cover.
  const ap = seg(p, 0.0, 0.12);
  const holeR = 3 + ap * 82; // % of viewport min-dim

  // Studio depth push (parallax + slow zoom) active through studio/welcome.
  const studioScale = 1.04 + seg(p, 0.0, 0.5) * 0.12;

  // LED wall zoom (0.24 → 0.46): a framed screen scales up to fill.
  const led = seg(p, 0.24, 0.44);
  const ledActive = p > 0.22 && p < 0.52;
  const ledScale = 0.42 + led * 0.62; // 0.42 → ~1.04
  const heroOp = fade(p, 0.5, 0.6, 0.62, 0.68);
  const workOp = fade(p, 0.62, 0.7, 0.78, 0.84);
  const priceOp = fade(p, 0.8, 0.86, 0.92, 0.95);
  const contactOp = seg(p, 0.93, 0.99);
  const studioCaptionOp = fade(p, 0.12, 0.18, 0.22, 0.28);

  const px = (f: number) => `translate3d(${m.x * f}px, ${m.y * f}px, 0)`;
  const active = CHAPTERS.findIndex((_, i) => {
    const bounds = [0, 0.12, 0.24, 0.5, 0.62, 0.8, 0.93, 1.01];
    return p >= bounds[i] && p < bounds[i + 1];
  });

  return (
    <div ref={wrapRef} className="relative">
      <div
        ref={pinRef}
        onMouseMove={onMove}
        className="relative h-screen w-full overflow-hidden bg-ink text-moon"
      >
        {/* Studio interior (always behind) */}
        <div
          className="absolute inset-0"
          style={{ transform: `scale(${studioScale}) ${px(14)}`, transition: 'transform 0.1s linear' }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={STUDIO_IMG} alt="Inside the Moon Gleam AI studio — robotic camera and lighting" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/25 to-ink/85" />
        </div>

        {/* Aperture mask — the lens opening you into the studio */}
        {ap < 1 && (
          <svg className="pointer-events-none absolute inset-0 h-full w-full" preserveAspectRatio="none">
            <defs>
              <mask id="aperture">
                <rect width="100%" height="100%" fill="white" />
                <circle cx="50%" cy="50%" r={`${holeR}%`} fill="black" />
              </mask>
            </defs>
            <rect width="100%" height="100%" fill="#050506" mask="url(#aperture)" />
            {/* aperture ring */}
            <circle
              cx="50%"
              cy="50%"
              r={`${holeR}%`}
              fill="none"
              stroke="rgba(233,196,106,0.55)"
              strokeWidth={2}
            />
          </svg>
        )}

        {/* Intro label over the closing aperture */}
        <div
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center"
          style={{ opacity: 1 - seg(p, 0.02, 0.1) }}
        >
          <p className="text-[11px] font-medium uppercase tracking-[0.5em] text-gleam">Moon Gleam</p>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-6xl">
            The AI Studio
          </h1>
          <p className="mt-3 text-sm text-moon-soft">Powered by Creative AI · London</p>
          <p className="mt-8 animate-pulse text-[10px] uppercase tracking-[0.35em] text-moon-faint">
            Scroll to step inside
          </p>
        </div>

        {/* Studio caption */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-24 flex justify-center px-6 text-center"
          style={{ opacity: studioCaptionOp, transform: px(8) }}
        >
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-gleam">Step inside</p>
            <h2 className="mt-2 font-display text-2xl font-semibold sm:text-4xl">
              A studio where AI runs the camera.
            </h2>
          </div>
        </div>

        {/* LED WALL — welcome video */}
        {ledActive && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div
              className="relative aspect-video w-[86%] max-w-5xl overflow-hidden rounded-xl border border-gleam/30 shadow-[0_0_80px_-10px_rgba(233,196,106,0.4)]"
              style={{ transform: `scale(${ledScale}) ${px(6)}`, opacity: seg(p, 0.22, 0.3) }}
            >
              <iframe
                className="pointer-events-none absolute inset-0 h-full w-full"
                src={`https://www.youtube-nocookie.com/embed/${WELCOME_ID}?autoplay=1&mute=1&loop=1&playlist=${WELCOME_ID}&controls=0&modestbranding=1&playsinline=1&rel=0`}
                title="Moon Gleam welcome film"
                allow="autoplay; encrypted-media"
              />
              <div className="absolute bottom-3 left-4 rounded-full bg-ink/70 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-gleam backdrop-blur">
                ● Now playing on the studio wall
              </div>
            </div>
          </div>
        )}

        {/* HERO message */}
        <ChapterCentre op={heroOp} parallax={px(10)}>
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-gleam">What we do</p>
          <h2 className="mt-3 max-w-3xl font-display text-3xl font-semibold leading-tight tracking-tight sm:text-6xl">
            Creative AI that makes your business{' '}
            <span className="text-gleam">impossible to scroll past.</span>
          </h2>
          <p className="mt-5 max-w-xl text-base text-moon-soft sm:text-lg">
            Broadcast-quality video — TVCs, promos, documentaries, animation — for 500+ UK
            businesses. Brief to delivery, in days.
          </p>
          <div className="pointer-events-auto mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href={cta.href} className="rounded-full bg-gleam px-7 py-3.5 text-sm font-semibold text-ink transition-transform hover:scale-[1.03]">
              {cta.label}
            </Link>
            <Link href="/work" className="rounded-full border border-moon/30 px-7 py-3.5 text-sm font-semibold text-moon transition-colors hover:border-gleam/60 hover:text-gleam">
              See the work
            </Link>
          </div>
        </ChapterCentre>

        {/* THE WORK — screening wall */}
        <ChapterCentre op={workOp} parallax={px(6)}>
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-gleam">The screening wall</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-5xl">
            Real films for real UK businesses.
          </h2>
          <div className="pointer-events-auto mt-8 grid w-full max-w-4xl grid-cols-2 gap-3 sm:grid-cols-3">
            {wall.map((w) => (
              <a
                key={w.id}
                href={`https://www.youtube.com/watch?v=${w.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-video overflow-hidden rounded-lg border border-ink-line/50"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={ytThumb(w.id)} alt={w.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <span className="absolute inset-0 grid place-items-center bg-ink/30 opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-gleam text-ink">▶</span>
                </span>
              </a>
            ))}
          </div>
          <Link href="/work" className="pointer-events-auto mt-6 text-sm font-medium text-gleam hover:text-gleam-bright">
            See the full portfolio →
          </Link>
        </ChapterCentre>

        {/* PRICING */}
        <ChapterCentre op={priceOp} parallax={px(6)}>
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-gleam">Pricing</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-5xl">
            Clear pricing. Serious quality.
          </h2>
          <div className="pointer-events-auto mt-8 grid w-full max-w-4xl gap-4 sm:grid-cols-3">
            {[
              ['Social Pack', 'from £499', 'UGC & short-form'],
              ['Promotional Video', 'from £1,499', 'The hardest-working asset'],
              ['Broadcast TVC', 'from £3,999', 'Clearance-ready commercials'],
            ].map(([n, pr, d], i) => (
              <div key={n} className={'rounded-2xl border p-5 text-left ' + (i === 1 ? 'border-gleam/60 bg-ink-soft/60' : 'border-ink-line/50 bg-ink-soft/30')}>
                <p className="text-sm font-semibold text-moon">{n}</p>
                <p className="mt-2 text-2xl font-semibold text-gleam">{pr}</p>
                <p className="mt-1 text-xs text-moon-soft">{d}</p>
              </div>
            ))}
          </div>
          <Link href="/pricing" className="pointer-events-auto mt-6 text-sm font-medium text-gleam hover:text-gleam-bright">
            Full pricing →
          </Link>
        </ChapterCentre>

        {/* CONTACT / BOOK */}
        <ChapterCentre op={contactOp} parallax={px(10)}>
          <h2 className="max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
            Ready to make <span className="text-gleam">yours?</span>
          </h2>
          <p className="mt-5 max-w-xl text-base text-moon-soft sm:text-lg">
            Book a free 15-minute call. We recommend the right format and send a written quote — no obligation.
          </p>
          <div className="pointer-events-auto mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href={cta.href} className="rounded-full bg-gleam px-8 py-3.5 text-sm font-semibold text-ink transition-transform hover:scale-[1.03]">
              {cta.label}
            </Link>
            <Link href="/blog" className="rounded-full border border-moon/30 px-8 py-3.5 text-sm font-semibold text-moon transition-colors hover:border-gleam/60 hover:text-gleam">
              From the studio — blog
            </Link>
          </div>
        </ChapterCentre>

        {/* Progress bar + chapter rail */}
        <div className="absolute left-0 top-0 z-30 h-0.5 w-full bg-ink-line/40">
          <div className="h-full bg-gleam" style={{ width: `${p * 100}%` }} />
        </div>
        <div className="absolute right-5 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-3 md:flex">
          {CHAPTERS.map((c, i) => (
            <div key={c.key} className="flex items-center justify-end gap-2">
              <span className={'text-[10px] uppercase tracking-[0.2em] transition-colors ' + (i === active ? 'text-gleam' : 'text-transparent')}>
                {c.label}
              </span>
              <span className={'h-1.5 w-1.5 rounded-full transition-colors ' + (i === active ? 'bg-gleam' : 'bg-moon-faint/50')} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ChapterCentre({ op, parallax, children }: { op: number; parallax: string; children: React.ReactNode }) {
  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
      style={{ opacity: op, transform: parallax, pointerEvents: op > 0.5 ? 'auto' : 'none' }}
    >
      {children}
    </div>
  );
}

/** Plain, accessible fallback for reduced-motion / no-JS-motion users. */
function ReducedHome() {
  return (
    <div className="bg-ink text-moon">
      <section className="mx-auto max-w-3xl px-6 py-24 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-gleam">Moon Gleam · AI Studio</p>
        <h1 className="mt-3 font-display text-4xl font-semibold sm:text-6xl">
          Creative AI that makes your business impossible to scroll past.
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-moon-soft">
          A London AI video studio. Broadcast-quality video for 500+ UK businesses — brief to delivery, in days.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href={cta.href} className="rounded-full bg-gleam px-7 py-3 text-sm font-semibold text-ink">{cta.label}</Link>
          <Link href="/work" className="rounded-full border border-ink-line px-7 py-3 text-sm font-medium text-moon">See the work</Link>
        </div>
      </section>
    </div>
  );
}
