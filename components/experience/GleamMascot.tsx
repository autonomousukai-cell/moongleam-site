'use client';

import { useEffect, useRef } from 'react';
import { useRive, Layout, Fit, Alignment } from '@rive-app/react-canvas';

/**
 * Gleam — the rigged Rive robot who GUIDES you through /experience.
 * - Loads public/gleam.riv (cache-busted) and plays its state machine
 *   (name-agnostic: plays stateMachineNames[0]).
 * - Follows the mouse cursor along the bottom of the screen ("walking"),
 *   flipping to face the direction he moves.
 * - Shows a speech bubble that changes per scroll zone, explaining each section.
 */

const ZONE_LINES: Record<string, string> = {
  z1: "Hi, I'm Gleam 👋 Welcome to the Moon Gleam studio. Scroll — I'll walk you through it.",
  z2: 'Most business video is slow, pricey and forgettable. That’s exactly what we fix.',
  z3: 'This is the edit bay — AI plus real editors turn raw footage into scroll-stopping cuts.',
  z4: 'Screening room: the finished films that actually win attention and customers.',
  z5: 'Simple pricing, studio quality, delivered in days — not months.',
  z6: 'Like what you saw? Book a call and let’s make yours.',
};

export default function GleamMascot({ zone = 'z1' }: { zone?: string }) {
  const { rive, RiveComponent } = useRive({
    // ?v cache-bust — forces browsers/CDN to fetch the current character.
    src: '/gleam.riv?v=4',
    autoplay: true,
    layout: new Layout({ fit: Fit.Contain, alignment: Alignment.BottomCenter }),
  });

  useEffect(() => {
    if (!rive) return;
    const names = rive.stateMachineNames;
    if (names && names.length) {
      try {
        rive.play(names[0]);
      } catch {
        /* falls back to autoplayed timeline */
      }
    }
  }, [rive]);

  const wrapRef = useRef<HTMLDivElement>(null);
  const faceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Start near the left; ease toward the cursor's X each frame = "walking".
    const state = { x: 160, tx: 160, facing: 1 };
    const onMove = (e: MouseEvent) => {
      state.tx = e.clientX;
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    let raf = 0;
    const tick = () => {
      const el = wrapRef.current;
      if (el) {
        const halfW = el.offsetWidth / 2 || 80;
        const min = halfW + 4;
        const max = window.innerWidth - halfW - 4;
        const target = Math.min(Math.max(state.tx, min), max);
        const dx = target - state.x;
        if (Math.abs(dx) > 0.5) {
          state.facing = dx > 0 ? 1 : -1;
          state.x += dx * 0.05; // lerp = walking speed
        }
        el.style.transform = `translateX(${state.x - halfW}px)`;
        if (faceRef.current) faceRef.current.style.transform = `scaleX(${state.facing})`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="pointer-events-none fixed bottom-1 left-0 z-30 will-change-transform"
      aria-hidden
    >
      {/* Speech bubble — explains the current section (never mirrored). */}
      <div className="absolute bottom-full left-1/2 mb-1 w-60 -translate-x-1/2 rounded-2xl border border-gleam/30 bg-ink/85 px-4 py-2 text-center text-[11px] leading-snug text-moon-soft shadow-lg backdrop-blur sm:w-72 sm:text-xs">
        {ZONE_LINES[zone] ?? ZONE_LINES.z1}
      </div>
      {/* The robot — this layer flips to face travel direction. */}
      <div ref={faceRef} className="h-44 w-36 sm:h-60 sm:w-48">
        <RiveComponent className="h-full w-full [filter:drop-shadow(0_12px_30px_rgba(233,196,106,0.28))]" />
      </div>
    </div>
  );
}
