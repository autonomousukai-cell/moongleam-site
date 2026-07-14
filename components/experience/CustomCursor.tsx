'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

type Mode = 'default' | 'video' | 'cta';

/**
 * Glowing gold dot + ring that follows the pointer with a spring. Morphs to a
 * camera-shutter glyph over video elements and a chat glyph over CTAs. Hidden on
 * touch devices (no hover / coarse pointer).
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<Mode>('default');
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!fine.matches) return;
    setEnabled(true);
    document.documentElement.classList.add('exp-cursor-none');

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target as HTMLElement | null;
      const hit = el?.closest?.('[data-cursor]') as HTMLElement | null;
      const next = (hit?.dataset.cursor as Mode) || 'default';
      setMode(next);
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => {
      window.removeEventListener('pointermove', move);
      document.documentElement.classList.remove('exp-cursor-none');
    };
  }, [x, y]);

  if (!enabled) return null;

  const ring =
    mode === 'video' ? 46 : mode === 'cta' ? 42 : 30;

  return (
    <div className="pointer-events-none fixed inset-0 z-[95] hidden md:block" aria-hidden="true">
      <motion.div
        className="absolute left-0 top-0 grid place-items-center rounded-full border border-gleam/70"
        style={{
          x: sx,
          y: sy,
          width: ring,
          height: ring,
          translateX: '-50%',
          translateY: '-50%',
          boxShadow: '0 0 24px -4px rgba(233,196,106,0.6)',
          backdropFilter: 'invert(4%)',
        }}
      >
        {mode === 'video' && (
          <svg viewBox="0 0 24 24" className="h-4 w-4 text-gleam" fill="none" stroke="currentColor" strokeWidth="1.6">
            <circle cx="12" cy="12" r="8" />
            <path d="M12 4v4M20 12h-4M12 20v-4M4 12h4" />
          </svg>
        )}
        {mode === 'cta' && (
          <svg viewBox="0 0 24 24" className="h-4 w-4 text-gleam" fill="currentColor">
            <path d="M4 4h16v11H8l-4 4z" />
          </svg>
        )}
      </motion.div>
      <motion.div
        className="absolute left-0 top-0 h-1.5 w-1.5 rounded-full bg-gleam"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
      />
    </div>
  );
}
