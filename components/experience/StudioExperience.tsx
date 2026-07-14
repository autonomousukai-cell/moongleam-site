'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  AnimatePresence,
} from 'framer-motion';
import Lenis from 'lenis';
import { portfolio, clients, ytThumb, categories, services, faqs, sectorPages, type Category } from '@/lib/data';
import { cta } from '@/lib/site';
import GleamMascot from './GleamMascot';

/* ------------------------------------------------------------------ *
 *  /experience — an advanced, interactive Apple-style cinematic tour: *
 *  cursor spotlight, scaling showreel, a filterable 3D-tilt gallery   *
 *  that previews on hover, animated proof + moving client marquee.    *
 *  Fully responsive. Gleam persists as a section-aware guide.         *
 * ------------------------------------------------------------------ */

const SHOWREEL_ID = 'x9c5L7DncWk';

const FEATURED_IDS = [
  'kQKz4nE7ZxM', 'P1PCjWxa5Jo', 'wsVu1zJFt-k', 'Nm2uEJ6Q12M', 'P2bAOlB58n8',
  'yubYJ8DIjRQ', 'EIaa0ZCCyYM', 'agn6nuD_m_8', 'Afe2qXdodRM', 'H_6mJKLUOhQ',
  'mqhDbEQQcC0', 'rJ8AD-ZHOuI', 'BVAWfIbwXfI', 'x9c5L7DncWk',
];
type Item = (typeof portfolio)[number];
const featured: Item[] = FEATURED_IDS.map((id) => portfolio.find((p) => p.id === id)).filter(
  (p): p is Item => Boolean(p),
);
const featuredCats = Array.from(new Set(featured.map((f) => f.cat)));

const previewSrc = (id: string) =>
  `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&modestbranding=1&playsinline=1&rel=0`;

const GLEAM = {
  hero: "Hi, I'm Gleam. Let me show you what this studio can do.",
  statement: 'We turn a brief into broadcast-quality video — in days, not months.',
  film: 'Press play. This is the kind of work we make every week.',
  work: 'Filter by type, hover to preview, click to watch. Go explore.',
  services: 'Here’s everything we make — tap any service to see what’s included.',
  sectors: 'From law firms to jewellers — pick your world and see how we help.',
  proof: '500+ businesses trust us. Numbers we’re proud of.',
  process: 'Five steps from your idea to a finished film. That simple.',
  pricing: 'Honest starting prices. Every project gets a tailored quote.',
  faq: 'Questions? Tap any one and I’ll answer it.',
  cta: 'Ready to make yours? Let’s talk — I’ll introduce you to the team.',
};

export default function StudioExperience() {
  const reduce = useReducedMotion();
  const [line, setLine] = useState<string>(GLEAM.hero);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [fine, setFine] = useState(false);

  useEffect(() => {
    setFine(window.matchMedia('(pointer: fine)').matches);
  }, []);

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
      {fine && !reduce && <MouseSpotlight />}
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(120%_80%_at_50%_-10%,rgba(233,196,106,0.08),transparent_60%)]" />

      <HeroSection reduce={!!reduce} />
      <StatementSection reduce={!!reduce} />
      <FilmSection reduce={!!reduce} onPlay={() => setLightbox(SHOWREEL_ID)} />
      <WorkSection reduce={!!reduce} onPlay={setLightbox} />
      <ServicesSection reduce={!!reduce} />
      <SectorsSection reduce={!!reduce} />
      <ProofSection reduce={!!reduce} />
      <ProcessSection reduce={!!reduce} />
      <PricingSection reduce={!!reduce} />
      <FaqSection reduce={!!reduce} />
      <CtaSection reduce={!!reduce} onPlay={() => setLightbox(SHOWREEL_ID)} />

      <ScrollBar />
      <GleamMascot line={line} />

      <AnimatePresence>
        {lightbox && <Lightbox id={lightbox} onClose={() => setLightbox(null)} />}
      </AnimatePresence>
    </div>
  );
}

/* ============================ interactive bits ============================ */

function MouseSpotlight() {
  const x = useMotionValue(-600);
  const y = useMotionValue(-600);
  useEffect(() => {
    const on = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener('mousemove', on, { passive: true });
    return () => window.removeEventListener('mousemove', on);
  }, [x, y]);
  const bg = useMotionTemplate`radial-gradient(560px circle at ${x}px ${y}px, rgba(233,196,106,0.10), transparent 55%)`;
  return <motion.div className="pointer-events-none fixed inset-0 z-0" style={{ background: bg }} />;
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
            className="flex h-9 w-6 items-start justify-center rounded-full border border-moon/30 p-1.5"
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

function FilmSection({ reduce, onPlay }: { reduce: boolean; onPlay: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '-20% 0px' });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
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
        {inView ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={previewSrc(SHOWREEL_ID)}
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
  const [cat, setCat] = useState<Category | 'all'>('all');
  const shown = cat === 'all' ? featured : featured.filter((f) => f.cat === cat);

  return (
    <section data-gleam-line={GLEAM.work} className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal reduce={reduce}>
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-gleam">Selected work</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-moon sm:text-5xl">
            Real films for real UK businesses.
          </h2>
        </Reveal>

        {/* Interactive filter chips */}
        <Reveal reduce={reduce} className="mt-8 flex flex-wrap gap-2">
          <Chip active={cat === 'all'} onClick={() => setCat('all')}>
            All
          </Chip>
          {featuredCats.map((c) => (
            <Chip key={c} active={cat === c} onClick={() => setCat(c)}>
              {categories[c]}
            </Chip>
          ))}
        </Reveal>

        {/* Filterable 3D-tilt gallery with hover-preview */}
        <motion.div layout className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {shown.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={reduce ? false : { opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? undefined : { opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <TiltCard item={item} reduce={reduce} onPlay={onPlay} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <Reveal reduce={reduce} className="mt-10">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-sm font-medium text-gleam hover:text-gleam-bright"
          >
            See the full portfolio <span aria-hidden>→</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={
        'rounded-full border px-4 py-1.5 text-xs font-medium transition-colors ' +
        (active
          ? 'border-gleam bg-gleam text-ink'
          : 'border-ink-line/60 text-moon-soft hover:border-gleam/50 hover:text-moon')
      }
    >
      {children}
    </button>
  );
}

function TiltCard({
  item,
  reduce,
  onPlay,
}: {
  item: Item;
  reduce: boolean;
  onPlay: (id: string) => void;
}) {
  const [hover, setHover] = useState(false);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 150, damping: 15 });
  const sry = useSpring(ry, { stiffness: 150, damping: 15 });

  const onMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 10);
    rx.set(-py * 10);
  };
  const reset = () => {
    rx.set(0);
    ry.set(0);
    setHover(false);
  };

  return (
    <motion.button
      onMouseMove={onMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={reset}
      onClick={() => onPlay(item.id)}
      style={reduce ? undefined : { rotateX: srx, rotateY: sry, transformPerspective: 900 }}
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
        {hover && !reduce && (
          <iframe
            className="pointer-events-none absolute inset-0 h-full w-full"
            src={previewSrc(item.id)}
            title={item.title}
            allow="autoplay; encrypted-media"
          />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-transparent" />
        <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-ink/70 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-gleam backdrop-blur">
          {categories[item.cat]}
        </span>
        <span className="pointer-events-none absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-full bg-gleam/95 text-ink transition-transform group-hover:scale-110">
          <PlayIcon />
        </span>
      </div>
      <p className="mt-3 text-sm font-medium text-moon">{item.title}</p>
    </motion.button>
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
      </div>

      <Reveal reduce={reduce} className="mt-16">
        <p className="mb-5 text-center text-xs uppercase tracking-[0.3em] text-moon-soft">Trusted by</p>
        <ClientMarquee reduce={reduce} />
      </Reveal>
    </section>
  );
}

function ClientMarquee({ reduce }: { reduce: boolean }) {
  const row = [...clients, ...clients];
  if (reduce) {
    return (
      <div className="mx-auto flex max-w-5xl flex-wrap justify-center gap-x-8 gap-y-2 px-6 text-sm text-moon-soft">
        {clients.map((c) => (
          <span key={c}>{c}</span>
        ))}
      </div>
    );
  }
  return (
    <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <motion.div
        className="flex w-max gap-12 whitespace-nowrap pr-12 text-base text-moon-soft"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
      >
        {row.map((c, i) => (
          <span key={`${c}-${i}`} className="transition-colors hover:text-gleam">
            {c}
          </span>
        ))}
      </motion.div>
    </div>
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
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-gleam">How it works</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-moon sm:text-5xl">
            Five steps from idea to finished film.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((s, i) => (
            <Reveal reduce={reduce} delay={reduce ? 0 : i * 0.07} key={s.n}>
              <div className="h-full rounded-2xl border border-ink-line/30 bg-ink-soft/40 p-5 transition-colors hover:border-gleam/40">
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
            className="rounded-full border border-moon/30 px-7 py-3.5 text-sm font-semibold text-moon transition-colors hover:border-gleam/60 hover:text-gleam"
          >
            Watch the showreel
          </button>
        </div>
      </Reveal>
    </section>
  );
}

/* ============================ informative + interactive ============================ */

function Accordion({
  items,
  reduce,
}: {
  items: { head: string; body: ReactNode }[];
  reduce: boolean;
}) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="border-y border-ink-line/40">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className="border-b border-ink-line/40 last:border-b-0">
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 py-5 text-left"
              aria-expanded={isOpen}
            >
              <span className="text-base font-medium text-moon sm:text-lg">{it.head}</span>
              <span
                className={
                  'grid h-7 w-7 shrink-0 place-items-center rounded-full border border-ink-line/60 text-lg text-gleam transition-transform ' +
                  (isOpen ? 'rotate-45' : '')
                }
              >
                +
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={reduce ? false : { height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={reduce ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pb-6 text-sm text-moon-soft sm:text-base">{it.body}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

function ServicesSection({ reduce }: { reduce: boolean }) {
  const items = services.map((s) => ({
    head: s.name,
    body: (
      <div>
        <p>{s.desc}</p>
        <ul className="mt-3 grid gap-1.5 sm:grid-cols-2">
          {s.points.map((p) => (
            <li key={p} className="flex items-start gap-2">
              <span className="mt-0.5 text-gleam">▸</span>
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </div>
    ),
  }));
  return (
    <section data-gleam-line={GLEAM.services} className="py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-6">
        <Reveal reduce={reduce}>
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-gleam">What we make</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-moon sm:text-5xl">
            Every format, one studio.
          </h2>
          <p className="mt-4 max-w-2xl text-base text-moon-soft">
            From a single social clip to a broadcast TV commercial — tap any service to see what’s included.
          </p>
        </Reveal>
        <Reveal reduce={reduce} className="mt-8">
          <Accordion items={items} reduce={reduce} />
        </Reveal>
      </div>
    </section>
  );
}

function SectorsSection({ reduce }: { reduce: boolean }) {
  const [active, setActive] = useState(0);
  const s = sectorPages[active];
  return (
    <section
      data-gleam-line={GLEAM.sectors}
      className="border-y border-ink-line/20 bg-ink-soft/30 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-5xl px-6">
        <Reveal reduce={reduce}>
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-gleam">Who we help</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-moon sm:text-5xl">
            Built for your world.
          </h2>
        </Reveal>
        <Reveal reduce={reduce} className="mt-8 flex flex-wrap gap-2">
          {sectorPages.map((sp, i) => (
            <Chip key={sp.slug} active={active === i} onClick={() => setActive(i)}>
              {sp.name}
            </Chip>
          ))}
        </Reveal>
        <Reveal reduce={reduce} className="mt-6">
          <motion.div
            key={s.slug}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl border border-ink-line/40 bg-ink/40 p-6 sm:p-8"
          >
            <h3 className="text-xl font-semibold text-moon">{s.name}</h3>
            <p className="mt-1 text-sm font-medium text-gleam">{s.short}</p>
            <p className="mt-3 text-sm text-moon-soft sm:text-base">{s.desc}</p>
            <p className="mt-4 text-xs uppercase tracking-wide text-moon-faint">Proof · {s.proof}</p>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}

function PricingSection({ reduce }: { reduce: boolean }) {
  const tiers = [
    {
      name: 'Social Pack',
      price: '£499',
      tagline: 'UGC & short-form that keeps you posting',
      featured: false,
      points: [
        'Batch of scroll-stopping clips',
        'Hooks + captions built for retention',
        'Cutdowns for TikTok, Reels & Shorts',
        'Delivered within a week',
      ],
    },
    {
      name: 'Promotional Video',
      price: '£1,499',
      tagline: 'The hardest-working asset you own',
      featured: true,
      points: [
        'Scripted around your differentiators',
        'AI, filmed or hybrid production',
        'Broadcast-standard grade & sound',
        'Delivered in 7–14 days',
      ],
    },
    {
      name: 'Broadcast TVC',
      price: '£3,999',
      tagline: 'Clearance-ready TV commercials',
      featured: false,
      points: [
        'Full concept, script & storyboard',
        'Broadcast technical standards',
        'Versions for TV, web, social & in-store',
        '2–3 weeks from approved script',
      ],
    },
  ];
  return (
    <section data-gleam-line={GLEAM.pricing} className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal reduce={reduce} className="text-center">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-gleam">Pricing</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-moon sm:text-5xl">
            Clear pricing. Serious quality.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-moon-soft">
            Honest starting points — every project gets a tailored written quote on your free call.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {tiers.map((t, i) => (
            <Reveal reduce={reduce} delay={reduce ? 0 : i * 0.08} key={t.name}>
              <div
                className={
                  'flex h-full flex-col rounded-2xl border p-6 transition-transform hover:-translate-y-1 ' +
                  (t.featured
                    ? 'border-gleam/60 bg-ink-soft/60 shadow-gleam-glow'
                    : 'border-ink-line/40 bg-ink-soft/30')
                }
              >
                {t.featured && (
                  <span className="mb-3 w-fit rounded-full bg-gleam px-3 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-ink">
                    Most popular
                  </span>
                )}
                <h3 className="text-lg font-semibold text-moon">{t.name}</h3>
                <p className="mt-1 text-sm text-moon-soft">{t.tagline}</p>
                <p className="mt-4 text-3xl font-semibold text-moon">
                  from <span className="text-gleam">{t.price}</span>
                </p>
                <ul className="mt-5 flex-1 space-y-2 text-sm text-moon-soft">
                  {t.points.map((p) => (
                    <li key={p} className="flex items-start gap-2">
                      <span className="mt-0.5 text-gleam">✓</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={cta.href}
                  className={
                    'mt-6 rounded-full px-6 py-3 text-center text-sm font-semibold transition-transform hover:scale-[1.02] ' +
                    (t.featured
                      ? 'bg-gleam text-ink'
                      : 'border border-ink-line/60 text-moon hover:border-gleam/60 hover:text-gleam')
                  }
                >
                  {cta.label}
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqSection({ reduce }: { reduce: boolean }) {
  const items = faqs.map((f) => ({ head: f.q, body: <p>{f.a}</p> }));
  return (
    <section data-gleam-line={GLEAM.faq} className="py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-6">
        <Reveal reduce={reduce}>
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-gleam">Questions</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-moon sm:text-5xl">
            Frequently asked.
          </h2>
        </Reveal>
        <Reveal reduce={reduce} className="mt-8">
          <Accordion items={items} reduce={reduce} />
        </Reveal>
      </div>
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
        className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-moon/30 text-moon hover:text-gleam"
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
