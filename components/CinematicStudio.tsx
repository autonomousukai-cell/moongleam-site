'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { portfolio, ytThumb } from '@/lib/data';
import { cta } from '@/lib/site';

/* ------------------------------------------------------------------ *
 *  CinematicStudio — a HOLOGRAPHIC virtual AI film studio, rendered   *
 *  entirely in code (glowing grid floor, floating holo panels, scan   *
 *  lines, depth on mouse). One pinned screen; scrolling walks you      *
 *  through the studio as a story: boot → holo screen (welcome film) →  *
 *  vision → the production pipeline (idea → script → edit → produce →  *
 *  distribute) → work → pricing → book. Reduced-motion → plain page.   *
 * ------------------------------------------------------------------ */

const WELCOME_ID = 'x9c5L7DncWk';
type Item = (typeof portfolio)[number];
const WALL_IDS = ['kQKz4nE7ZxM', 'P1PCjWxa5Jo', 'wsVu1zJFt-k', 'Nm2uEJ6Q12M', 'yubYJ8DIjRQ', 'EIaa0ZCCyYM'];
const wall: Item[] = WALL_IDS.map((id) => portfolio.find((p) => p.id === id)).filter(
  (p): p is Item => Boolean(p),
);

const seg = (p: number, a: number, b: number) => Math.min(1, Math.max(0, (p - a) / (b - a)));
const fade = (p: number, a: number, b: number, c: number, d: number) => Math.min(seg(p, a, b), 1 - seg(p, c, d));

const STATIONS = [
  { k: 'Idea & Brief', d: 'Every film starts with your goal, audience and deadline — locked on a free call.' },
  { k: 'Scripting', d: 'AI-assisted scripts, human-crafted stories — built around why customers choose you.' },
  { k: 'Editing', d: 'Timeline, colour grade and sound design — broadcast standard, all in-house.' },
  { k: 'Final Production', d: 'Rendered to broadcast spec — cinema-grade output, delivered in days.' },
  { k: 'Distribution', d: 'Cutdowns mastered for TV, web, TikTok, Reels and Shorts — ready to ship.' },
];

const CHAP = [
  ['boot', 'Enter'],
  ['studio', 'The Studio'],
  ['vision', 'Vision'],
  ['pipeline', 'Pipeline'],
  ['work', 'The Work'],
  ['pricing', 'Pricing'],
  ['book', 'Book'],
] as const;
const BOUNDS = [0, 0.1, 0.28, 0.4, 0.74, 0.85, 0.93, 1.01];

export default function CinematicStudio() {
  const [reduce, setReduce] = useState<boolean | null>(null);
  useEffect(() => setReduce(window.matchMedia('(prefers-reduced-motion: reduce)').matches), []);
  if (reduce === null) return <div className="min-h-screen bg-[#05070c]" aria-hidden />;
  if (reduce) return <ReducedHome />;
  return <Stage />;
}

function Stage() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const target = useRef({ x: 0, y: 0 });
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
      end: '+=7200',
      pin: pinRef.current,
      scrub: 1,
      onUpdate: (self) => setP(Math.round(self.progress * 1000) / 1000),
    });
    ScrollTrigger.refresh();
    let id = 0;
    const loop = () => {
      setM((v) => ({ x: v.x + (target.current.x - v.x) * 0.07, y: v.y + (target.current.y - v.y) * 0.07 }));
      id = requestAnimationFrame(loop);
    };
    id = requestAnimationFrame(loop);
    return () => {
      st.kill();
      gsap.ticker.remove(raf);
      lenis.destroy();
      cancelAnimationFrame(id);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const onMove = (e: React.MouseEvent) => {
    target.current = { x: (e.clientX / window.innerWidth - 0.5) * 2, y: (e.clientY / window.innerHeight - 0.5) * 2 };
  };
  const px = (f: number) => `translate3d(${m.x * f}px, ${m.y * f}px, 0)`;

  const bootOp = 1 - seg(p, 0.05, 0.1);
  const studioOp = fade(p, 0.1, 0.16, 0.26, 0.32);
  const videoActive = p > 0.09 && p < 0.34;
  const videoScale = 0.5 + seg(p, 0.1, 0.24) * 0.55;
  const videoOp = seg(p, 0.1, 0.15);
  const visionOp = fade(p, 0.28, 0.34, 0.38, 0.42);
  const pipeOp = fade(p, 0.4, 0.45, 0.72, 0.75);
  const station = Math.min(4, Math.max(0, Math.floor(seg(p, 0.4, 0.74) * 5)));
  const workOp = fade(p, 0.74, 0.79, 0.83, 0.86);
  const priceOp = fade(p, 0.85, 0.89, 0.92, 0.94);
  const bookOp = seg(p, 0.93, 0.98);
  const active = BOUNDS.findIndex((_, i) => p >= BOUNDS[i] && p < BOUNDS[i + 1]);

  return (
    <div ref={wrapRef} className="relative">
      <div ref={pinRef} onMouseMove={onMove} className="relative h-screen w-full overflow-hidden bg-[#05070c] text-moon">
        <HoloEnvironment px={px} />

        {/* BOOT — studio initialising */}
        <Centre op={bootOp} t={px(4)}>
          <div className="flex flex-col items-center">
            <div className="mb-6 h-16 w-16 animate-spin rounded-full border-2 border-cyan-300/30 border-t-cyan-300 [animation-duration:2.5s]" />
            <p className="text-[11px] font-medium uppercase tracking-[0.5em] text-cyan-300">Moon Gleam</p>
            <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-6xl">
              Virtual AI Studio
            </h1>
            <p className="mt-3 text-sm text-moon-soft">Initialising the production stage…</p>
            <p className="mt-8 animate-pulse text-[10px] uppercase tracking-[0.35em] text-cyan-300/70">Scroll to step inside</p>
          </div>
        </Centre>

        {/* STUDIO — holo screen plays the welcome film + floating stat panels */}
        <div className="pointer-events-none absolute inset-0" style={{ opacity: studioOp }}>
          <div className="absolute left-[6%] top-[26%] hidden md:block" style={{ transform: px(20) }}>
            <StatPanel v="75%" l="Time saved" />
          </div>
          <div className="absolute right-[7%] top-[22%] hidden md:block" style={{ transform: px(26) }}>
            <StatPanel v="+200%" l="Content output" />
          </div>
          <div className="absolute right-[10%] bottom-[24%] hidden lg:block" style={{ transform: px(16) }}>
            <StatPanel v="92%" l="Quality score" />
          </div>
        </div>
        {videoActive && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div
              className="relative w-[88%] max-w-4xl"
              style={{ transform: `scale(${videoScale}) ${px(8)}`, opacity: videoOp, pointerEvents: videoOp > 0.6 ? 'auto' : 'none' }}
            >
              <HoloFrame>
                <div className="relative aspect-video w-full overflow-hidden rounded-md bg-black">
                  <iframe
                    className="pointer-events-none absolute inset-0 h-full w-full"
                    src={`https://www.youtube-nocookie.com/embed/${WELCOME_ID}?autoplay=1&mute=1&loop=1&playlist=${WELCOME_ID}&controls=0&modestbranding=1&playsinline=1&rel=0`}
                    title="Moon Gleam welcome film"
                    allow="autoplay; encrypted-media"
                  />
                  {/* Tap the holo screen to watch with sound */}
                  <button
                    onClick={() => setLightbox(true)}
                    aria-label="Play the welcome film with sound"
                    className="group absolute inset-0 flex items-end justify-between gap-3 p-4"
                  >
                    <span className="rounded-full border border-cyan-300/40 bg-[#05070c]/80 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.15em] text-cyan-200 backdrop-blur">
                      🔊 Tap for sound
                    </span>
                    <span className="grid h-12 w-12 place-items-center rounded-full bg-gleam text-ink shadow-lg transition-transform group-hover:scale-110">▶</span>
                  </button>
                </div>
                <div className="absolute -top-3 left-4 rounded-full border border-cyan-300/40 bg-[#05070c] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-cyan-300">
                  ● Live · Holographic stage
                </div>
              </HoloFrame>
            </div>
          </div>
        )}

        {/* VISION — hero message */}
        <Centre op={visionOp} t={px(10)}>
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-cyan-300">The vision</p>
          <h2 className="mt-3 max-w-3xl font-display text-3xl font-semibold leading-tight tracking-tight sm:text-6xl">
            Creative AI that makes your business{' '}
            <span className="text-gleam">impossible to scroll past.</span>
          </h2>
          <p className="mt-5 max-w-xl text-base text-moon-soft sm:text-lg">
            Broadcast-quality video — TVCs, promos, documentaries, animation — for 500+ UK businesses. Brief to delivery, in days.
          </p>
          <div className="pointer-events-auto mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href={cta.href} className="rounded-full bg-gleam px-7 py-3.5 text-sm font-semibold text-ink transition-transform hover:scale-[1.03]">{cta.label}</Link>
            <Link href="/work" className="rounded-full border border-cyan-300/40 px-7 py-3.5 text-sm font-semibold text-cyan-100 transition-colors hover:border-cyan-300">See the work</Link>
          </div>
        </Centre>

        {/* PIPELINE — the production stations, step by step */}
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6" style={{ opacity: pipeOp, transform: px(6) }}>
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-cyan-300">How we work</p>
          <h2 className="mt-3 text-center font-display text-2xl font-semibold tracking-tight sm:text-4xl">
            Inside the production pipeline.
          </h2>

          {/* Active station detail */}
          <div className="mt-8 w-full max-w-3xl">
            <HoloFrame>
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-md border border-cyan-300/40 text-sm font-semibold text-cyan-300">
                    {String(station + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-display text-xl font-semibold sm:text-2xl">{STATIONS[station].k}</h3>
                </div>
                <p className="mt-3 text-sm text-moon-soft sm:text-base">{STATIONS[station].d}</p>
                <StationMock i={station} />
              </div>
            </HoloFrame>
          </div>

          {/* Station stepper */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {STATIONS.map((s, i) => (
              <div key={s.k} className={'flex items-center gap-2 rounded-full border px-3 py-1 text-[10px] uppercase tracking-wide transition-colors ' + (i === station ? 'border-cyan-300/60 text-cyan-200' : i < station ? 'border-gleam/40 text-gleam/80' : 'border-ink-line/60 text-moon-faint')}>
                <span className={'h-1.5 w-1.5 rounded-full ' + (i === station ? 'bg-cyan-300' : i < station ? 'bg-gleam' : 'bg-moon-faint/50')} />
                {s.k}
              </div>
            ))}
          </div>
        </div>

        {/* WORK — holographic screening wall */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6" style={{ opacity: workOp, transform: px(6), pointerEvents: workOp > 0.5 ? 'auto' : 'none' }}>
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-cyan-300">The screening wall</p>
          <h2 className="mt-3 text-center font-display text-3xl font-semibold tracking-tight sm:text-5xl">Real films for real UK businesses.</h2>
          <div className="mt-8 grid w-full max-w-4xl grid-cols-2 gap-3 sm:grid-cols-3">
            {wall.map((w) => (
              <a key={w.id} href={`https://www.youtube.com/watch?v=${w.id}`} target="_blank" rel="noopener noreferrer" className="group relative aspect-video overflow-hidden rounded-md border border-cyan-300/25">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={ytThumb(w.id)} alt={w.title} loading="lazy" className="h-full w-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-105" />
                <span className="absolute inset-0 bg-cyan-400/10 opacity-0 transition-opacity group-hover:opacity-100" />
                <span className="absolute bottom-2 left-2 grid h-8 w-8 place-items-center rounded-full bg-gleam text-ink opacity-90">▶</span>
              </a>
            ))}
          </div>
          <Link href="/work" className="mt-6 text-sm font-medium text-cyan-300 hover:text-cyan-200">Full portfolio →</Link>
        </div>

        {/* PRICING */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6" style={{ opacity: priceOp, transform: px(6), pointerEvents: priceOp > 0.5 ? 'auto' : 'none' }}>
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-cyan-300">Pricing</p>
          <h2 className="mt-3 text-center font-display text-3xl font-semibold tracking-tight sm:text-5xl">Clear pricing. Serious quality.</h2>
          <div className="mt-8 grid w-full max-w-4xl gap-4 sm:grid-cols-3">
            {[['Social Pack', 'from £499', 'UGC & short-form'], ['Promotional Video', 'from £1,499', 'The hardest-working asset'], ['Broadcast TVC', 'from £3,999', 'Clearance-ready commercials']].map(([n, pr, d], i) => (
              <div key={n} className={'rounded-lg border p-5 text-left ' + (i === 1 ? 'border-gleam/50 bg-gleam/5' : 'border-cyan-300/25 bg-white/[0.02]')}>
                <p className="text-sm font-semibold">{n}</p>
                <p className="mt-2 text-2xl font-semibold text-gleam">{pr}</p>
                <p className="mt-1 text-xs text-moon-soft">{d}</p>
              </div>
            ))}
          </div>
          <Link href="/pricing" className="mt-6 text-sm font-medium text-cyan-300 hover:text-cyan-200">Full pricing →</Link>
        </div>

        {/* BOOK — client meeting */}
        <Centre op={bookOp} t={px(10)}>
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-cyan-300">The meeting room</p>
          <h2 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
            Ready to make <span className="text-gleam">yours?</span>
          </h2>
          <p className="mt-5 max-w-xl text-base text-moon-soft sm:text-lg">Book a free 15-minute call. We recommend the right format and send a written quote — no obligation.</p>
          <div className="pointer-events-auto mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href={cta.href} className="rounded-full bg-gleam px-8 py-3.5 text-sm font-semibold text-ink transition-transform hover:scale-[1.03]">{cta.label}</Link>
            <Link href="/blog" className="rounded-full border border-cyan-300/40 px-8 py-3.5 text-sm font-semibold text-cyan-100 transition-colors hover:border-cyan-300">From the studio — blog</Link>
          </div>
        </Centre>

        {/* Welcome film with sound */}
        {lightbox && <SoundLightbox onClose={() => setLightbox(false)} />}

        {/* Progress + chapter rail */}
        <div className="absolute left-0 top-0 z-30 h-0.5 w-full bg-cyan-300/10">
          <div className="h-full bg-cyan-300" style={{ width: `${p * 100}%` }} />
        </div>
        <div className="absolute right-5 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-3 md:flex">
          {CHAP.map(([k, label], i) => (
            <div key={k} className="flex items-center justify-end gap-2">
              <span className={'text-[10px] uppercase tracking-[0.2em] transition-colors ' + (i === active ? 'text-cyan-300' : 'text-transparent')}>{label}</span>
              <span className={'h-1.5 w-1.5 rounded-full transition-colors ' + (i === active ? 'bg-cyan-300' : 'bg-moon-faint/40')} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------- holographic building blocks ---------------- */

function HoloEnvironment({ px }: { px: (f: number) => string }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* ambient glows */}
      <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_0%,rgba(56,189,248,0.12),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(70%_50%_at_50%_110%,rgba(233,196,106,0.10),transparent_60%)]" />
      {/* floor grid */}
      <div className="absolute inset-x-0 bottom-0 h-[55%] [perspective:640px]" style={{ transform: px(-6) }}>
        <div
          className="absolute inset-0 opacity-50 [transform:rotateX(74deg)] [transform-origin:center_bottom]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(103,232,249,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(103,232,249,0.35) 1px,transparent 1px)',
            backgroundSize: '54px 54px',
            maskImage: 'linear-gradient(to top, black, transparent 85%)',
            WebkitMaskImage: 'linear-gradient(to top, black, transparent 85%)',
          }}
        />
      </div>
      {/* ceiling grid */}
      <div className="absolute inset-x-0 top-0 h-[35%] [perspective:640px]" style={{ transform: px(-4) }}>
        <div
          className="absolute inset-0 opacity-25 [transform:rotateX(-74deg)] [transform-origin:center_top]"
          style={{
            backgroundImage: 'linear-gradient(rgba(103,232,249,0.4) 1px,transparent 1px),linear-gradient(90deg,rgba(103,232,249,0.25) 1px,transparent 1px)',
            backgroundSize: '54px 54px',
            maskImage: 'linear-gradient(to bottom, black, transparent 85%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black, transparent 85%)',
          }}
        />
      </div>
      {/* scanlines */}
      <div className="absolute inset-0 opacity-[0.06] [background:repeating-linear-gradient(0deg,#fff_0,#fff_1px,transparent_1px,transparent_4px)]" />
      <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_50%,transparent_55%,rgba(5,7,12,0.9))]" />
    </div>
  );
}

function HoloFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative rounded-lg border border-cyan-300/30 bg-white/[0.03] shadow-[0_0_50px_-12px_rgba(56,189,248,0.5)]">
      <Bracket cn="-left-px -top-px border-l-2 border-t-2" />
      <Bracket cn="-right-px -top-px border-r-2 border-t-2" />
      <Bracket cn="-bottom-px -left-px border-b-2 border-l-2" />
      <Bracket cn="-bottom-px -right-px border-b-2 border-r-2" />
      {children}
    </div>
  );
}
function Bracket({ cn }: { cn: string }) {
  return <span className={'pointer-events-none absolute h-4 w-4 border-cyan-300/80 ' + cn} />;
}

function StatPanel({ v, l }: { v: string; l: string }) {
  return (
    <div className="rounded-lg border border-cyan-300/30 bg-white/[0.03] px-5 py-3 shadow-[0_0_40px_-14px_rgba(56,189,248,0.6)]">
      <p className="font-display text-2xl font-semibold text-cyan-200">{v}</p>
      <p className="text-[10px] uppercase tracking-[0.2em] text-moon-soft">{l}</p>
    </div>
  );
}

/** Tiny holographic UI mockups per pipeline station. */
function StationMock({ i }: { i: number }) {
  if (i === 1) {
    // scripting — lines "typing"
    return (
      <div className="mt-5 space-y-2">
        {[92, 78, 85, 60].map((w, k) => (
          <div key={k} className="h-2 rounded bg-cyan-300/25" style={{ width: `${w}%` }} />
        ))}
      </div>
    );
  }
  if (i === 2) {
    // editing — timeline tracks
    return (
      <div className="mt-5 space-y-2">
        {[['bg-cyan-300/40', 70], ['bg-gleam/50', 45], ['bg-cyan-300/30', 90]].map(([c, w], k) => (
          <div key={k} className="flex items-center gap-2">
            <span className="h-3 w-8 rounded-sm border border-cyan-300/30" />
            <div className={'h-3 rounded-sm ' + c} style={{ width: `${w}%` }} />
          </div>
        ))}
      </div>
    );
  }
  if (i === 3) {
    // final production — render bar
    return (
      <div className="mt-5">
        <div className="h-2 w-full overflow-hidden rounded-full bg-cyan-300/15">
          <div className="h-full w-[86%] rounded-full bg-gradient-to-r from-cyan-300 to-gleam" />
        </div>
        <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-moon-soft">Rendering · broadcast master · 86%</p>
      </div>
    );
  }
  if (i === 4) {
    // distribution — platform tiles
    return (
      <div className="mt-5 flex flex-wrap gap-2">
        {['TV', 'Web', 'TikTok', 'Reels', 'Shorts'].map((t) => (
          <span key={t} className="rounded border border-cyan-300/30 bg-white/[0.03] px-3 py-1 text-[10px] uppercase tracking-wide text-cyan-200">{t}</span>
        ))}
      </div>
    );
  }
  // idea & brief — checklist
  return (
    <div className="mt-5 space-y-2">
      {['Goal & audience', 'Deadline', 'AI · filmed · hybrid'].map((t) => (
        <div key={t} className="flex items-center gap-2 text-sm text-moon-soft">
          <span className="grid h-4 w-4 place-items-center rounded-sm border border-cyan-300/50 text-[9px] text-cyan-300">✓</span>
          {t}
        </div>
      ))}
    </div>
  );
}

function Centre({ op, t, children }: { op: number; t: string; children: React.ReactNode }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center" style={{ opacity: op, transform: t, pointerEvents: op > 0.5 ? 'auto' : 'none' }}>
      {children}
    </div>
  );
}

function SoundLightbox({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);
  return (
    <div className="pointer-events-auto absolute inset-0 z-50 flex items-center justify-center bg-[#05070c]/95 p-4" onClick={onClose}>
      <button onClick={onClose} aria-label="Close" className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-cyan-300/40 text-cyan-100 hover:text-cyan-300">✕</button>
      <div className="aspect-video w-full max-w-5xl overflow-hidden rounded-lg border border-cyan-300/30 bg-black shadow-[0_0_60px_-10px_rgba(56,189,248,0.5)]" onClick={(e) => e.stopPropagation()}>
        <iframe
          className="h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${WELCOME_ID}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
          title="Moon Gleam welcome film"
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      </div>
    </div>
  );
}

function ReducedHome() {
  return (
    <div className="bg-[#05070c] text-moon">
      <section className="mx-auto max-w-3xl px-6 py-24 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-cyan-300">Moon Gleam · Virtual AI Studio</p>
        <h1 className="mt-3 font-display text-4xl font-semibold sm:text-6xl">Creative AI that makes your business impossible to scroll past.</h1>
        <p className="mx-auto mt-5 max-w-xl text-moon-soft">A London AI video studio. Broadcast-quality video for 500+ UK businesses — brief to delivery, in days.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href={cta.href} className="rounded-full bg-gleam px-7 py-3 text-sm font-semibold text-ink">{cta.label}</Link>
          <Link href="/work" className="rounded-full border border-cyan-300/40 px-7 py-3 text-sm font-medium text-cyan-100">See the work</Link>
        </div>
      </section>
    </div>
  );
}
