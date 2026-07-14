'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  AnimatePresence,
} from 'framer-motion';
import Lenis from 'lenis';
import { portfolio, clients, ytThumb } from '@/lib/data';
import { cta } from '@/lib/site';
import GleamMascot from './GleamMascot';

/* ------------------------------------------------------------------ *
 *  /experience — an Apple-style cinematic scroll: statement hero →    *
 *  scaling showreel → real portfolio rail → animated proof → process  *
 *  → CTA. Real videos framed by minimal, high-contrast motion. Fully  *
 *  responsive. Gleam persists as a section-aware guide.               *
 * ------------------------------------------------------------------ */

const SHOWREEL_ID = 'x9c5L7DncWk'; // Moon Gleam brand film

// Curated, diverse real portfolio pieces for the work rail.
const FEATURED_IDS = [
  'kQKz4nE7ZxM', // Bombay Jewellers TVC
  'P1PCjWxa5Jo', // Netflix-Quality Ads, Made by AI
  'wsVu1zJFt-k', // Lord Lucan documentary
  'Nm2uEJ6Q12M', // Bluestone Travel — Istanbul
  'P2bAOlB58n8', // RK Motors — Animated TVC
  'yubYJ8DIjRQ', // HRF Winter Souk — Charity
  'EIaa0ZCCyYM', // 3D Kids Animation
  'agn6nuD_m_8', // Lawmatic Solicitors
  'Afe2qXdodRM', // QNS Academy brand film
];
const featured = FEATURED_IDS.map((id) => portfolio.find((p) => p.id === id)).filter(
  (p): p is (typeof portfolio)[number] => Boolean(p),
);

/* Gleam's line per section (driven by IntersectionObserver). */
const GLEAM = {
  hero: "Hi, I'm Gleam. Let me show you what this studio can do.",
  statement: 'We turn a brief into broadcast-quality video — in days, not months.',
  film: 'Press play. This is the kind of work we make every week.',
  work: 'Real projects, real UK businesses — swipe through a few of our favourites.',
  proof: '500+ businesses trust us. Numbers we’re proud of.',
  process: 'Five steps from your idea to a finished film. That simple.',
  cta: 'Ready to make yours? Let’s talk — I’ll introduce you to the team.',
};

export default function StudioExperience() {
  const reduce = useReducedMotion();
  const [line, setLine] = useState<string>(GLEAM.hero);
  const [lightbox, setLightbox] = useState<string | null>(null);

  // Smooth scroll (skipped for reduced motion).
  useEffect(() => {
    if (reduce) return;
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    let raf = 0;
    const loop = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, [reduce]);

  // Section-aware Gleam line.
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-gleam-line]'));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setLine(e.target.getAttribute('data-gleam-line') || '');
        });
      },
      { rootMargin: '-45% 0px -45% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="relative bg-ink text-moon">
      {/* ambient grain / vignette */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(120%_80%_at_50%_-10%,rgba(233,196,106,0.10),transparent_60%)]" />

      <HeroSection reduce={!!reduce} />
      <StatementSection reduce={!!reduce} />
      <FilmSection reduce={!!reduce} onPlay={() => setLightbox(SHOWREEL_ID)} />
      <WorkSection reduce={!!reduce} onPlay={setLightbox} />
      <ProofSection reduce={!!reduce} />
      <ProcessSection reduce={!!reduce} />
      <CtaSection reduce={!!reduce} onPlay={() => setLightbox(SHOWREEL_ID)} />

      {/* progress bar */}
      <ScrollBar />

      {/* Gleam guide */}
      <GleamMascot line={line} />

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && <Lightbox id={lightbox} onClose={() => setLightbox(null)} />}
      </AnimatePresence>
    </div>
  );
}

/* ============================ primitives ============================ */

function Reveal({
  children,
  reduce,
  delay = 0,
  className = '',
}: {
  children: ReactNode;
  reduce: boolean;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12% 0px' }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function ScrollBar() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="fixed left-0 top-0 z-40 h-0.5 w-full origin-left bg-gleam"
      style={{ scaleX: scrollYProgress }}
    />
  );
}

/* ============================ sections ============================ */

function HeroSection({ reduce }: { reduce: boolean }) {
  return (
    <section
      data-gleam-line={GLEAM.hero}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6"
    >
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mb-5 text-xs font-medium uppercase tracking-[0.35em] text-gleam"
        >
          Moon Gleam · The Studio
        </motion.p>
        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 28 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-moon sm:text-6xl md:text-7xl"
        >
          Where your brand
          <br className="hidden sm:block" /> becomes <span className="text-gleam">cinema.</span>
        </motion.h1>
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          className="mx-auto mt-6 max-w-xl text-base text-moon-soft sm:text-lg"
        >
          A London AI video studio. Brief to broadcast — for 500+ UK businesses.
          Scroll to take the tour.
        </motion.p>
      </div>

      {/* scroll cue */}
      {!reduce && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="flex h-9 w-6 items-start justify-center rounded-full border border-ink-line/60 p-1.5"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-gleam" />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}

function StatementSection({ reduce }: { reduce: boolean }) {
  return (
    <section
      data-gleam-line={GLEAM.statement}
      className="flex min-h-[80svh] items-center justify-center px-6"
    >
      <Reveal reduce={reduce} className="mx-auto max-w-4xl text-center">
        <h2 className="text-balance text-3xl font-semibold leading-tight tracking-tight text-moon sm:text-5xl md:text-6xl">
          Studio-quality video,{' '}
          <span className="text-moon-soft">without the studio timeline or budget.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-base text-moon-soft sm:text-lg">
          Creative AI plus a real production team. The result: broadcast standards,
          delivered in days.
        </p>
      </Reveal>
    </section>
  );
}

/** Showreel that scales up into frame as you scroll (Apple product-reveal). */
function FilmSection({ reduce, onPlay }: { reduce: boolean; onPlay: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '-20% 0px' });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const scale = useTransform(scrollYProgress, [0, 0.5], [reduce ? 1 : 0.78, 1]);
  const radius = useTransform(scrollYProgress, [0, 0.5], [reduce ? 12 : 28, 12]);

  return (
    <section
      ref={ref}
      data-gleam-line={GLEAM.film}
      className="relative flex min-h-[110svh] items-center justify-center px-4 py-16 sm:px-6"
    >
      <motion.div
        style={reduce ? undefined : { scale, borderRadius: radius }}
        className="relative aspect-video w-full max-w-5xl overflow-hidden rounded-2xl border border-ink-line/40 bg-black shadow-2xl"
      >
        {/* Ambient autoplay (muted) once in view — the film comes alive. */}
        {inView ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${SHOWREEL_ID}?autoplay=1&mute=1&loop=1&playlist=${SHOWREEL_ID}&controls=0&modestbranding=1&playsinline=1&rel=0`}
            title="Moon Gleam showreel"
            allow="autoplay; encrypted-media; picture-in-picture"
            loading="lazy"
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={ytThumb(SHOWREEL_ID)}
            alt="Moon Gleam showreel"
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
        <button
          onClick={onPlay}
          className="group absolute inset-0 flex items-end justify-between gap-4 p-5 text-left sm:p-7"
          aria-label="Play showreel with sound"
        >
          <span className="max-w-md">
            <span className="block text-lg font-semibold text-white sm:text-2xl">
              The Moon Gleam showreel
            </span>
            <span className="mt-1 block text-xs text-moon-soft sm:text-sm">
              Tap to watch with sound
            </span>
          </span>
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gleam text-ink shadow-lg transition-transform group-hover:scale-110 sm:h-14 sm:w-14">
            <PlayIcon />
          </span>
        </button>
      </motion.div>
    </section>
  );
}

function WorkSection({ reduce, onPlay }: { reduce: boolean; onPlay: (id: string) => void }) {
  return (
    <section data-gleam-line={GLEAM.work} className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal reduce={reduce}>
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-gleam">
            Selected work
          </p>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-moon sm:text-5xl">
            Real films for real UK businesses.
          </h2>
        </Reveal>
      </div>

      {/* Horizontal snap rail — premium on desktop, swipeable on mobile. */}
      <div className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 [scrollbar-width:none] sm:mt-14 sm:gap-6 [&::-webkit-scrollbar]:hidden">
        {featured.map((item, i) => (
          <Reveal
            reduce={reduce}
            delay={reduce ? 0 : Math.min(i * 0.05, 0.3)}
            key={item.id}
            className="w-[78vw] shrink-0 snap-center sm:w-[380px]"
          >
            <button
              onClick={() => onPlay(item.id)}
              className="group block w-full text-left"
              aria-label={`Play ${item.title}`}
            >
              <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-ink-line/40 bg-black">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={ytThumb(item.id)}
                  alt={item.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-full bg-gleam/95 text-ink opacity-90 transition-transform group-hover:scale-110">
                  <PlayIcon />
                </span>
              </div>
              <p className="mt-3 text-sm font-medium text-moon">{item.title}</p>
            </button>
          </Reveal>
        ))}
      </div>

      <div className="mx-auto mt-10 max-w-6xl px-6">
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-sm font-medium text-gleam hover:text-gleam-bright"
        >
          See the full portfolio <span aria-hidden>→</span>
        </Link>
      </div>
    </section>
  );
}

function ProofSection({ reduce }: { reduce: boolean }) {
  const stats = [
    { to: 500, suffix: '+', label: 'UK businesses served' },
    { to: 44, suffix: '+', label: 'productions in portfolio' },
    { to: 8, suffix: '', label: 'sectors covered' },
    { to: 7, suffix: ' days', label: 'typical turnaround' },
  ];
  return (
    <section
      data-gleam-line={GLEAM.proof}
      className="border-y border-ink-line/20 bg-ink-soft/40 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal reduce={reduce} delay={reduce ? 0 : i * 0.08} key={s.label}>
              <Stat {...s} />
            </Reveal>
          ))}
        </div>

        <Reveal reduce={reduce} className="mt-16">
          <p className="mb-5 text-center text-xs uppercase tracking-[0.3em] text-moon-soft">
            Trusted by
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-moon-soft sm:text-base">
            {clients.map((c) => (
              <span key={c} className="whitespace-nowrap">
                {c}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Stat({ to, suffix, label }: { to: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1400;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl font-semibold tracking-tight text-moon sm:text-5xl md:text-6xl">
        {n}
        <span className="text-gleam">{suffix}</span>
      </div>
      <div className="mt-2 text-xs text-moon-soft sm:text-sm">{label}</div>
    </div>
  );
}

function ProcessSection({ reduce }: { reduce: boolean }) {
  const steps = [
    { n: '01', t: 'Brief', d: 'A free 15-minute call. We learn your goal, audience and deadline.' },
    { n: '02', t: 'Script & storyboard', d: 'We write and board it around what makes customers choose you.' },
    { n: '03', t: 'Shoot or generate', d: 'Filmed, fully AI, or hybrid — the right route for your budget.' },
    { n: '04', t: 'Edit & grade', d: 'Broadcast-standard cut, sound design and colour.' },
    { n: '05', t: 'Deliver', d: 'Master plus cutdowns for every platform — in days.' },
  ];
  return (
    <section data-gleam-line={GLEAM.process} className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal reduce={reduce}>
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-gleam">
            How it works
          </p>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-moon sm:text-5xl">
            Five steps from idea to finished film.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((s, i) => (
            <Reveal reduce={reduce} delay={reduce ? 0 : i * 0.07} key={s.n}>
              <div className="h-full rounded-2xl border border-ink-line/30 bg-ink-soft/40 p-5">
                <div className="text-sm font-semibold text-gleam">{s.n}</div>
                <div className="mt-2 text-lg font-semibold text-moon">{s.t}</div>
                <p className="mt-2 text-sm text-moon-soft">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaSection({ reduce, onPlay }: { reduce: boolean; onPlay: () => void }) {
  return (
    <section
      data-gleam-line={GLEAM.cta}
      className="flex min-h-[90svh] items-center justify-center px-6 py-24 text-center"
    >
      <Reveal reduce={reduce} className="mx-auto max-w-3xl">
        <h2 className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-moon sm:text-6xl md:text-7xl">
          Ready to make <span className="text-gleam">yours?</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-base text-moon-soft sm:text-lg">
          Book a free 15-minute call. We’ll recommend the right format and give you a
          written quote — no obligation.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link
            href={cta.href}
            className="rounded-full bg-gleam px-7 py-3.5 text-sm font-semibold text-ink transition-transform hover:scale-[1.03]"
          >
            {cta.label}
          </Link>
          <button
            onClick={onPlay}
            className="rounded-full border border-ink-line/50 px-7 py-3.5 text-sm font-semibold text-moon transition-colors hover:border-gleam/60 hover:text-gleam"
          >
            Watch the showreel
          </button>
        </div>
      </Reveal>
    </section>
  );
}

/* ============================ lightbox ============================ */

function Lightbox({ id, onClose }: { id: string; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/90 p-4 backdrop-blur"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        aria-label="Close video"
        className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-ink-line/50 text-moon hover:text-gleam"
      >
        ✕
      </button>
      <motion.div
        initial={{ scale: 0.94, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.94, opacity: 0 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="aspect-video w-full max-w-5xl overflow-hidden rounded-xl border border-ink-line/40 bg-black"
        onClick={(e) => e.stopPropagation()}
      >
        <iframe
          className="h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
          title="Moon Gleam video"
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      </motion.div>
    </motion.div>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}
