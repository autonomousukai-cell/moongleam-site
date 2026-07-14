'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion, useMotionValue, useSpring } from 'framer-motion';

/**
 * Cinematic homepage entrance — the "AI studio doors".
 * On load the visitor faces two brushed-chrome doors with a glowing gold seam.
 * Scrolling, clicking "Enter the studio", or pressing a key slides the doors
 * apart (light blooms through the seam) to reveal the site. The centre panel
 * parallaxes to mouse movement. Plays once per session; skipped for
 * prefers-reduced-motion.
 */
export default function StudioDoorIntro() {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [phase, setPhase] = useState<'closed' | 'opening' | 'done'>('closed');

  // Mouse parallax for the centre panel.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 80, damping: 18 });
  const py = useSpring(my, { stiffness: 80, damping: 18 });

  useEffect(() => setMounted(true), []);

  // Decide whether to show the intro (once per session / not for reduced motion).
  useEffect(() => {
    if (!mounted) return;
    if (reduce || sessionStorage.getItem('mg-entered') === '1') {
      setPhase('done');
    }
  }, [mounted, reduce]);

  // Lock scroll while the doors are closed/opening.
  useEffect(() => {
    if (!mounted || phase === 'done') return;
    window.scrollTo(0, 0);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mounted, phase]);

  const open = () =>
    setPhase((p) => {
      if (p !== 'closed') return p;
      sessionStorage.setItem('mg-entered', '1');
      window.setTimeout(() => setPhase('done'), 1500);
      return 'opening';
    });

  // Enter on scroll / touch / key.
  useEffect(() => {
    if (!mounted || phase !== 'closed') return;
    const go = () => open();
    const onKey = (e: KeyboardEvent) => {
      if (['ArrowDown', 'PageDown', ' ', 'Enter'].includes(e.key)) go();
    };
    window.addEventListener('wheel', go, { passive: true });
    window.addEventListener('touchmove', go, { passive: true });
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('wheel', go);
      window.removeEventListener('touchmove', go);
      window.removeEventListener('keydown', onKey);
    };
  }, [mounted, phase]);

  const onMouseMove = (e: React.MouseEvent) => {
    const nx = e.clientX / window.innerWidth - 0.5;
    const ny = e.clientY / window.innerHeight - 0.5;
    mx.set(nx * 24);
    my.set(ny * 24);
  };

  if (!mounted || phase === 'done') return null;

  const doorEase = [0.76, 0, 0.24, 1] as const;
  const opening = phase === 'opening';

  return (
    <AnimatePresence>
      <motion.div
        key="door-intro"
        onMouseMove={onMouseMove}
        className="fixed inset-0 z-[200] overflow-hidden bg-ink"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Central light bloom that grows as the doors part */}
        <motion.div
          className="pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-gleam/30 to-transparent blur-2xl"
          initial={{ width: 8, opacity: 0.5 }}
          animate={{ width: opening ? '70%' : 8, opacity: opening ? 0 : 0.5 }}
          transition={{ duration: 1.4, ease: doorEase }}
        />

        {/* Left door */}
        <motion.div
          className="absolute inset-y-0 left-0 w-1/2"
          style={{ background: 'linear-gradient(90deg,#0A0A0B 0%,#141619 62%,#23262c 100%)' }}
          initial={{ x: 0 }}
          animate={{ x: opening ? '-100%' : 0 }}
          transition={{ duration: 1.4, ease: doorEase }}
        >
          <div className="absolute inset-0 opacity-[0.05] [background:repeating-linear-gradient(90deg,#fff_0,#fff_1px,transparent_1px,transparent_46px)]" />
          <div className="absolute right-0 top-0 h-full w-[2px] bg-gradient-to-b from-transparent via-gleam to-transparent shadow-[0_0_34px_7px_rgba(233,196,106,0.55)]" />
        </motion.div>

        {/* Right door */}
        <motion.div
          className="absolute inset-y-0 right-0 w-1/2"
          style={{ background: 'linear-gradient(270deg,#0A0A0B 0%,#141619 62%,#23262c 100%)' }}
          initial={{ x: 0 }}
          animate={{ x: opening ? '100%' : 0 }}
          transition={{ duration: 1.4, ease: doorEase }}
        >
          <div className="absolute inset-0 opacity-[0.05] [background:repeating-linear-gradient(90deg,#fff_0,#fff_1px,transparent_1px,transparent_46px)]" />
          <div className="absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b from-transparent via-gleam to-transparent shadow-[0_0_34px_7px_rgba(233,196,106,0.55)]" />
        </motion.div>

        {/* Centre panel — parallaxes to the mouse, fades as doors open */}
        <motion.div
          className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center"
          style={{ x: px, y: py }}
          animate={{ opacity: opening ? 0 : 1, scale: opening ? 1.12 : 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="flex flex-col items-center"
          >
            <Image
              src="/mg-logo.png"
              alt="Moon Gleam"
              width={96}
              height={96}
              priority
              className="mb-6 h-20 w-20 object-contain drop-shadow-[0_0_24px_rgba(233,196,106,0.35)]"
            />
            <p className="text-[11px] font-medium uppercase tracking-[0.5em] text-gleam">Moon Gleam</p>
            <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-moon sm:text-6xl">
              The AI Studio
            </h1>
            <p className="mt-3 text-sm text-moon-soft">Powered by Creative AI</p>

            <button
              onClick={open}
              className="mt-9 rounded-full border border-gleam/50 bg-gleam/10 px-8 py-3 text-sm font-semibold text-gleam backdrop-blur transition-all duration-300 hover:bg-gleam hover:text-ink"
            >
              Enter the studio
            </button>
            <motion.p
              animate={{ opacity: [0.35, 1, 0.35], y: [0, 4, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="mt-6 text-[10px] uppercase tracking-[0.35em] text-moon-faint"
            >
              Scroll to enter
            </motion.p>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
