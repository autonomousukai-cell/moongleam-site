'use client';

import { useEffect, useRef } from 'react';
import { seg, smooth } from './journey';

/**
 * Atmosphere canvas for the /studio journey — stars + drifting night mist
 * outside, warm dust motes inside. Reads the shared progress ref every frame
 * (no React re-renders) and cross-fades the two systems around the doorway.
 * Counts are deliberately small; the whole thing costs well under a ms.
 */

type Star = { x: number; y: number; r: number; tw: number; ph: number };
type Mote = { x: number; y: number; r: number; vx: number; vy: number; a: number };

const STAR_COUNT = 130;
const MOTE_COUNT = 46;

/** Deterministic pseudo-random so SSR/replays are stable. */
const rand = (() => {
  let s = 42;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
})();

export default function ParticleField({
  progressRef,
}: {
  progressRef: React.MutableRefObject<number>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 0;
    let h = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const stars: Star[] = Array.from({ length: STAR_COUNT }, () => ({
      x: rand(),
      y: rand() * 0.62, // keep stars in the sky band
      r: 0.4 + rand() * 1.1,
      tw: 0.5 + rand() * 2.2,
      ph: rand() * Math.PI * 2,
    }));

    const motes: Mote[] = Array.from({ length: MOTE_COUNT }, () => ({
      x: rand(),
      y: rand(),
      r: 0.6 + rand() * 1.8,
      vx: (rand() - 0.5) * 0.012,
      vy: -0.004 - rand() * 0.01,
      a: 0.12 + rand() * 0.3,
    }));

    let raf = 0;
    let t = 0;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (document.hidden) return;
      t += 1 / 60;
      const p = progressRef.current;
      // Exterior fades out through the doorway (now at ~15% of the full
      // 8-zone journey); warm dust motes carry through every interior room.
      const extAlpha = 1 - smooth(seg(p, 0.145, 0.18));
      const intAlpha = smooth(seg(p, 0.155, 0.195));

      ctx.clearRect(0, 0, w, h);

      if (extAlpha > 0.01) {
        for (const s of stars) {
          const twinkle = 0.55 + 0.45 * Math.sin(t * s.tw + s.ph);
          ctx.globalAlpha = extAlpha * twinkle * 0.9;
          ctx.fillStyle = '#DDE6F2';
          ctx.beginPath();
          ctx.arc(s.x * w, s.y * h, s.r, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      if (intAlpha > 0.01) {
        for (const m of motes) {
          m.x += m.vx / 60;
          m.y += m.vy / 60;
          if (m.y < -0.02) {
            m.y = 1.02;
            m.x = rand();
          }
          if (m.x < -0.02) m.x = 1.02;
          if (m.x > 1.02) m.x = -0.02;
          ctx.globalAlpha = intAlpha * m.a;
          ctx.fillStyle = '#F4D889';
          ctx.beginPath();
          ctx.arc(m.x * w, m.y * h, m.r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [progressRef]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden
    />
  );
}
