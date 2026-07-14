'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { scenes, zoneOf, zoneLabels, type ZoneKey } from './scenes';
import CustomCursor from './CustomCursor';
import ReducedExperience from './ReducedExperience';
import ZoneHero from './zones/ZoneHero';
import ZoneProblems from './zones/ZoneProblems';
import ZoneStudio from './zones/ZoneStudio';
import ZoneScreening from './zones/ZoneScreening';
import ZonePricing from './zones/ZonePricing';
import ZoneExit from './zones/ZoneExit';

/**
 * Cinematic scroll-driven "AI studio walkthrough". A fixed full-viewport stage
 * holds the seven Gleam scene layers; a tall (700vh) spacer supplies the scroll
 * distance; ONE master GSAP ScrollTrigger (scrub) cross-fades the scenes and
 * publishes a single `progress` (0–1) that drives every overlay. Lenis smooths
 * the scroll and is tied to gsap.ticker.
 */
export default function StudioExperience() {
  const [reduced, setReduced] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  if (reduced === null) return <div className="min-h-screen bg-ink" aria-hidden />;
  if (reduced) return <ReducedExperience />;
  return <ScrubStage />;
}

function ScrubStage() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const sceneRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lastSet = useRef(-1);
  const [progress, setProgress] = useState(0);
  const [zone, setZone] = useState<ZoneKey>('z1');

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // 1) Lenis smooth scroll, tied to gsap.ticker + ScrollTrigger.
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const ctx = gsap.context(() => {
      // 2) Master timeline: scene cross-fade + Ken-Burns/parallax + progress.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          onUpdate: (self) => {
            const p = self.progress; // 0..1
            // Spec formula reproduced by GSAP:
            //   scrollPercentage = window.scrollY / (scrollHeight - innerHeight) * 100
            //
            // RIVE UPGRADE POINT ─────────────────────────────────────────────
            // Everything downstream reads ONLY this single progress value, so a
            // real Rive state-machine can replace the image cross-fade with zero
            // refactor. Drop the .riv in and drive it here instead of React state:
            //   riveInput.value = p * 100;   // scrollProgress 0–100
            // ─────────────────────────────────────────────────────────────────
            const rounded = Math.round(p * 1000) / 1000;
            if (rounded !== lastSet.current) {
              lastSet.current = rounded;
              setProgress(rounded);
              const z = zoneOf(rounded);
              setZone((prev) => (prev === z ? prev : z));
            }
          },
        },
      });

      const fade = 0.05;
      scenes.forEach((s, i) => {
        const el = sceneRefs.current[i];
        if (!el) return;
        const kb = el.querySelector('.exp-kb');
        gsap.set(el, { opacity: i === 0 ? 1 : 0 });
        if (i > 0) tl.to(el, { opacity: 1, ease: 'none', duration: fade }, s.start - fade * 0.5);
        if (i < scenes.length - 1)
          tl.to(el, { opacity: 0, ease: 'none', duration: fade }, s.end - fade * 0.5);
        if (kb)
          tl.fromTo(
            kb,
            { scale: 1.0, yPercent: -2.5 },
            { scale: 1.06, yPercent: 2.5, ease: 'none', duration: s.end - s.start },
            s.start,
          );
      });
    }, wrapper);

    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
      gsap.ticker.remove(raf);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="relative bg-ink">
      <CustomCursor />

      {/* Fixed stage — seven cross-fading scene layers */}
      <div className="fixed inset-0 z-0 bg-ink">
        {scenes.map((s, i) => (
          <div
            key={s.key}
            ref={(el) => {
              sceneRefs.current[i] = el;
            }}
            className="absolute inset-0"
            style={{ opacity: i === 0 ? 1 : 0, willChange: 'opacity' }}
          >
            <div className="exp-kb absolute inset-0" style={{ willChange: 'transform' }}>
              <Image
                src={s.src}
                alt={s.alt}
                fill
                priority={s.priority}
                quality={72}
                sizes="100vw"
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-ink/75 via-ink/35 to-ink/90" />
          </div>
        ))}
      </div>

      {/* Overlays — one fixed layer; each zone reveals off `progress` */}
      <div className="pointer-events-none fixed inset-0 z-10">
        <ZoneHero progress={progress} />
        <ZoneProblems progress={progress} />
        <ZoneStudio progress={progress} />
        <ZoneScreening progress={progress} />
        <ZonePricing progress={progress} />
        <ZoneExit progress={progress} />
      </div>

      {/* Top progress bar + zone label */}
      <div className="fixed left-0 top-0 z-30 h-0.5 w-full bg-ink-line/40">
        <div className="h-full bg-gleam transition-[width] duration-75" style={{ width: `${progress * 100}%` }} />
      </div>
      <div className="fixed right-4 top-3 z-30 rounded-full border border-ink-line/70 bg-ink/60 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-moon-soft backdrop-blur">
        {zoneLabels[zone]}
      </div>

      {/* Tall scroll spacer — supplies the scroll distance for the master trigger */}
      <div ref={wrapperRef} style={{ height: '700vh' }} aria-hidden />
    </div>
  );
}
