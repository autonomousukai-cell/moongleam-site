'use client';

import { useEffect, useRef, useState } from 'react';
import { useRive, Layout, Fit, Alignment } from '@rive-app/react-canvas';

/**
 * Gleam — the rigged Rive guide.
 * - Desktop (fine pointer): follows the cursor along the bottom ("walking"),
 *   flipping to face travel direction.
 * - Mobile / touch (coarse pointer): pins to the bottom-left, smaller.
 * - Always shows a speech bubble with the current section's line (passed in).
 */
export default function GleamMascot({ line }: { line?: string }) {
  const { rive, RiveComponent } = useRive({
    src: '/gleam.riv?v=5',
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

  const [fine, setFine] = useState(false);
  useEffect(() => {
    setFine(window.matchMedia('(pointer: fine)').matches);
  }, []);

  const wrapRef = useRef<HTMLDivElement>(null);
  const faceRef = useRef<HTMLDivElement>(null);

  // Cursor-follow (desktop only).
  useEffect(() => {
    if (!fine) return;
    const state = { x: 180, tx: 180, facing: 1 };
    const onMove = (e: MouseEvent) => {
      state.tx = e.clientX;
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    let raf = 0;
    const tick = () => {
      const el = wrapRef.current;
      if (el) {
        const halfW = el.offsetWidth / 2 || 90;
        const target = Math.min(Math.max(state.tx, halfW + 4), window.innerWidth - halfW - 4);
        const dx = target - state.x;
        if (Math.abs(dx) > 0.5) {
          state.facing = dx > 0 ? 1 : -1;
          state.x += dx * 0.05;
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
  }, [fine]);

  return (
    <div
      ref={wrapRef}
      className={
        fine
          ? 'pointer-events-none fixed bottom-1 left-0 z-40 will-change-transform'
          : 'pointer-events-none fixed bottom-2 left-2 z-40'
      }
      aria-hidden
    >
      {line ? (
        <div className="absolute bottom-full left-1/2 mb-1 w-52 -translate-x-1/2 rounded-2xl border border-gleam/30 bg-ink/85 px-3 py-2 text-center text-[11px] leading-snug text-moon-soft shadow-lg backdrop-blur sm:w-72 sm:text-xs">
          {line}
        </div>
      ) : null}
      <div
        ref={faceRef}
        className={fine ? 'h-40 w-32 sm:h-56 sm:w-44' : 'h-24 w-20'}
      >
        <RiveComponent className="h-full w-full [filter:drop-shadow(0_12px_30px_rgba(233,196,106,0.28))]" />
      </div>
    </div>
  );
}
