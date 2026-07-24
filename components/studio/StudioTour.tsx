'use client';

import { useEffect, useRef, useState } from 'react';
import { FRAME_MANIFEST, ZONE_BACKDROPS } from './journey';
import { FrameSequence } from './FrameSequence';
import LoadingScreen from './LoadingScreen';
import CinematicJourney from './CinematicJourney';
import NarrativeFallback from './NarrativeFallback';

type Mode = 'detect' | 'full' | 'mobile' | 'static';

/** Minimum branded loading beat so the intro never flashes. */
const MIN_LOAD_MS = 1500;

/**
 * /studio orchestrator — picks the right experience, runs the branded
 * loading sequence (preloading real frames when the manifest is filled),
 * locks scroll until the studio is ready, then reveals.
 *
 *  - prefers-reduced-motion → static narrative, no scrubbing, no canvas
 *  - small screens / coarse pointers → lightweight animated narrative
 *  - desktop → full scroll-scrubbed cinematic journey
 */
export default function StudioTour() {
  const [mode, setMode] = useState<Mode>('detect');
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);
  const [loaderGone, setLoaderGone] = useState(false);
  const framesRef = useRef<FrameSequence | null>(null);

  /* Detect capability once on mount (SSR is disabled for this tree). */
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const small = window.matchMedia('(max-width: 900px), (pointer: coarse)').matches;
    setMode(reduced ? 'static' : small ? 'mobile' : 'full');
  }, []);

  /* Branded preload: min beat + real frame assets (when manifest is filled). */
  useEffect(() => {
    if (mode === 'detect') return;
    let cancelled = false;

    if (mode !== 'full') {
      // Fallbacks are asset-free — short branded beat only.
      const t = window.setTimeout(() => {
        if (cancelled) return;
        setProgress(1);
        setReady(true);
      }, 500);
      return () => {
        cancelled = true;
        window.clearTimeout(t);
      };
    }

    const seq = FRAME_MANIFEST.length > 0 ? new FrameSequence(FRAME_MANIFEST) : null;
    framesRef.current = seq;
    let assetProgress = 0;
    if (seq) {
      seq.preload((p) => {
        assetProgress = p;
      });
    } else {
      // Preload the 8 AI-rendered zone backdrops so the journey never pops in.
      const urls = Object.values(ZONE_BACKDROPS);
      let done = 0;
      const bump = () => {
        done += 1;
        assetProgress = done / urls.length;
      };
      urls.forEach((url) => {
        const img = new window.Image();
        img.onload = bump;
        img.onerror = bump; // a missing backdrop must never stall the tour
        img.src = url;
      });
    }

    const started = performance.now();
    const timer = window.setInterval(() => {
      if (cancelled) return;
      const timeP = Math.min(1, (performance.now() - started) / MIN_LOAD_MS);
      const p = Math.min(timeP, 0.25 + assetProgress * 0.75);
      setProgress(p);
      if (p >= 1) {
        window.clearInterval(timer);
        setReady(true);
      }
    }, 80);

    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, [mode]);

  /* Hold the visitor at the top while the studio loads; no layout shift. */
  useEffect(() => {
    if (ready || mode === 'detect') return;
    window.scrollTo(0, 0);
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [ready, mode]);

  /* GUARANTEE the scroll lock is released once the studio is ready. The
     cleanup above already restores it, but effect ordering across the newly
     mounted journey/fallback tree must never be able to leave the page
     frozen — this ran hot on the live site (only zone 1 reachable). */
  useEffect(() => {
    if (!ready) return;
    const release = () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
    release();
    const raf = requestAnimationFrame(release);
    const t = window.setTimeout(release, 350);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(t);
    };
  }, [ready]);

  /* Absolute backstop: leaving /studio must always hand back a scrollable page. */
  useEffect(
    () => () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    },
    [],
  );

  /* Remove the loader from the tree after its fade-out completes. */
  useEffect(() => {
    if (!ready) return;
    const t = window.setTimeout(() => setLoaderGone(true), 750);
    return () => window.clearTimeout(t);
  }, [ready]);

  return (
    <>
      {!loaderGone && <LoadingScreen progress={progress} leaving={ready} />}
      {mode === 'full' && ready && <CinematicJourney frames={framesRef.current} />}
      {mode === 'mobile' && ready && <NarrativeFallback animate />}
      {mode === 'static' && ready && <NarrativeFallback animate={false} />}
      {/* reserve the viewport while loading so the footer never flashes up */}
      {!ready && <div className="h-screen bg-[#05060A]" aria-hidden />}
    </>
  );
}
