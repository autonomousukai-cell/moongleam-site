'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import {
  T,
  TRACK_VH,
  seg,
  smooth,
  easeOut,
  lerp,
  zoneAt,
  zoneLabelAt,
} from './journey';
import FrameSequenceCanvas, { FrameSequence } from './FrameSequence';
import ParticleField from './ParticleField';
import SceneExterior from './SceneExterior';
import SceneReception from './SceneReception';
import StudioNav from './StudioNav';
import ProgressRail from './ProgressRail';

/**
 * The Phase-1 cinematic engine.
 *
 * One tall scroll track (TRACK_VH) + one sticky viewport. Lenis smooths the
 * wheel; a single GSAP ScrollTrigger scrubs progress 0–1; renderFrame() maps
 * that progress onto every layer with direct style writes (no React
 * re-renders while scrubbing). The journey is fully reversible.
 *
 * Camera path: night exterior → continuous dolly to the entrance → doors
 * slide open → threshold light bloom → settle inside the reception
 * (scale + focus pull). When real footage exists, FRAME_MANIFEST swaps the
 * procedural sets for a scrubbed frame sequence with no other changes.
 */
export default function CinematicJourney({ frames }: { frames: FrameSequence | null }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<Record<string, HTMLElement>>({});
  const progressRef = useRef(0);
  const lenisRef = useRef<Lenis | null>(null);
  const zoneRef = useRef<'exterior' | 'reception'>('exterior');
  const [zone, setZone] = useState<'exterior' | 'reception'>('exterior');

  /** Map scroll progress onto every layer. Called by ScrollTrigger only. */
  const renderFrame = useCallback((p: number) => {
    const el = layersRef.current;
    if (!el.ext && !el.title) return;
    progressRef.current = p;

    /* ---- camera dolly (exterior) ---- */
    const dolly = smooth(seg(p, T.dolly[0], T.dolly[1]));
    if (el.sky) el.sky.style.transform = `scale(${lerp(1, 1.18, dolly).toFixed(4)})`;
    if (el.bldg) el.bldg.style.transform = `scale(${lerp(1, 2.55, dolly).toFixed(4)})`;
    if (el.mist1)
      el.mist1.style.transform = `translate3d(0,${(dolly * 22).toFixed(2)}%,0) scale(${lerp(1, 1.9, dolly).toFixed(4)})`;
    if (el.mist2)
      el.mist2.style.transform = `translate3d(0,${(dolly * 34).toFixed(2)}%,0) scale(${lerp(1, 2.2, dolly).toFixed(4)})`;
    if (el.mist3)
      el.mist3.style.transform = `translate3d(0,${(dolly * 14).toFixed(2)}%,0) scale(${lerp(1, 1.6, dolly).toFixed(4)})`;

    /* ---- entrance doors ---- */
    const d = smooth(seg(p, T.doors[0], T.doors[1]));
    if (el.doorL) el.doorL.style.transform = `translateX(${(-d * 112).toFixed(2)}%)`;
    if (el.doorR) el.doorR.style.transform = `translateX(${(d * 112).toFixed(2)}%)`;
    if (el.doorSeam) el.doorSeam.style.opacity = String(1 - d);
    if (el.doorLight) el.doorLight.style.opacity = String(0.55 + 0.45 * d);

    /* ---- threshold light bloom ---- */
    const f = Math.sin(smooth(seg(p, T.flash[0], T.flash[1])) * Math.PI);
    if (el.flash) el.flash.style.opacity = (f * 0.85).toFixed(3);

    /* ---- exterior ⇄ reception crossfade ---- */
    const cross = smooth(seg(p, T.cross[0], T.cross[1]));
    if (el.ext) {
      el.ext.style.opacity = String(1 - cross);
      el.ext.style.visibility = cross >= 1 ? 'hidden' : 'visible';
    }
    if (el.rec) {
      el.rec.style.opacity = String(cross);
      el.rec.style.visibility = cross <= 0 ? 'hidden' : 'visible';
    }

    /* ---- arrival settle + focus pull ---- */
    const arr = easeOut(seg(p, T.arrive[0], T.arrive[1]));
    if (el.recInner) {
      el.recInner.style.transform = `scale(${lerp(1.22, 1, arr).toFixed(4)})`;
      const blur = lerp(9, 0, arr);
      el.recInner.style.filter =
        cross > 0 && blur > 0.4 ? `blur(${blur.toFixed(1)}px)` : 'none';
    }

    /* ---- overlays ---- */
    const titleFade = 1 - smooth(seg(p, T.titleOut[0], T.titleOut[1]));
    if (el.title) {
      el.title.style.opacity = String(titleFade);
      el.title.style.transform = `translateY(${((1 - titleFade) * -34).toFixed(1)}px)`;
    }
    const hintFade = 1 - smooth(seg(p, T.hintOut[0], T.hintOut[1]));
    if (el.hint) el.hint.style.opacity = String(hintFade);

    const bars =
      smooth(seg(p, T.bars[0], T.bars[1])) *
      (1 - smooth(seg(p, T.barsOut[0], T.barsOut[1])));
    if (el.barTop) el.barTop.style.transform = `translateY(${((bars - 1) * 100).toFixed(1)}%)`;
    if (el.barBot) el.barBot.style.transform = `translateY(${((1 - bars) * 100).toFixed(1)}%)`;

    const w = smooth(seg(p, T.welcome[0], T.welcome[1]));
    if (el.welcome) {
      el.welcome.style.opacity = String(w);
      el.welcome.style.transform = `translateY(${((1 - w) * 28).toFixed(1)}px)`;
      el.welcome.style.pointerEvents = w > 0.6 ? 'auto' : 'none';
    }

    /* ---- hotspots ---- */
    const hExt = 1 - smooth(seg(p, 0.24, 0.38));
    if (el.hotspotExt) {
      el.hotspotExt.style.opacity = String(hExt);
      el.hotspotExt.style.pointerEvents = hExt > 0.5 ? 'auto' : 'none';
    }
    if (el.hotspotRec) {
      el.hotspotRec.style.opacity = String(w);
      el.hotspotRec.style.pointerEvents = w > 0.6 ? 'auto' : 'none';
    }

    /* ---- progress rail ---- */
    if (el.pct) el.pct.textContent = `${String(Math.round(p * 100)).padStart(2, '0')}%`;
    if (el.railFill) el.railFill.style.transform = `scaleY(${p.toFixed(4)})`;
    if (el.zoneLabel) el.zoneLabel.textContent = zoneLabelAt(p);

    /* ---- nav highlight (only re-renders on zone change) ---- */
    const z = zoneAt(p);
    if (z !== zoneRef.current) {
      zoneRef.current = z;
      setZone(z);
    }
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    const track = trackRef.current;
    if (!stage || !track) return;

    // Collect every [data-mgst] layer once — the engine writes styles directly.
    const layers: Record<string, HTMLElement> = {};
    stage.querySelectorAll<HTMLElement>('[data-mgst]').forEach((n) => {
      const key = n.dataset.mgst;
      if (key) layers[key] = n;
    });
    layersRef.current = layers;

    gsap.registerPlugin(ScrollTrigger);

    // Lenis drives the scroll; GSAP's ticker drives Lenis — smooth + reversible.
    const lenis = new Lenis({ duration: 1.35, smoothWheel: true });
    lenisRef.current = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const st = ScrollTrigger.create({
      trigger: track,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => renderFrame(self.progress),
    });

    renderFrame(0);

    return () => {
      st.kill();
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [renderFrame]);

  /** Fly the camera to a journey point (nav panel). */
  const goTo = useCallback((target: number) => {
    const track = trackRef.current;
    const lenis = lenisRef.current;
    if (!track || !lenis) return;
    const max = track.offsetHeight - window.innerHeight;
    lenis.scrollTo(track.offsetTop + target * max, {
      duration: 2.4,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
    });
  }, []);

  /** "Explore the studio" → glide down to the accessible content below. */
  const explore = useCallback(() => {
    const lenis = lenisRef.current;
    const el = document.getElementById('studio-details');
    if (lenis && el) lenis.scrollTo(el, { offset: -40, duration: 1.8 });
    else el?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div ref={trackRef} style={{ height: `${TRACK_VH}vh` }} className="relative">
      <div ref={stageRef} className="sticky top-0 h-screen overflow-hidden bg-[#05060A]">
        {/* a11y escape hatch */}
        <a
          href="#studio-details"
          className="sr-only z-50 rounded-full bg-black/80 px-4 py-2 text-xs text-moon focus:not-sr-only focus:absolute focus:left-1/2 focus:top-20 focus:-translate-x-1/2"
        >
          Skip the tour
        </a>

        {/* scene — real frames if present, else procedural placeholder sets */}
        {frames ? (
          <FrameSequenceCanvas sequence={frames} progressRef={progressRef} />
        ) : (
          <>
            <SceneExterior />
            <SceneReception />
          </>
        )}

        {/* atmosphere: stars outside → dust motes inside */}
        <ParticleField progressRef={progressRef} />

        {/* threshold light bloom when passing through the doors */}
        <div
          data-mgst="flash"
          className="pointer-events-none absolute inset-0 z-10 opacity-0 bg-[radial-gradient(60%_60%_at_50%_55%,rgba(244,216,137,0.9),rgba(91,227,255,0.22)_60%,transparent_78%)]"
        />

        {/* cinematic letterbox during the transit */}
        <div
          data-mgst="barTop"
          className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[7vh] -translate-y-full bg-black"
        />
        <div
          data-mgst="barBot"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[7vh] translate-y-full bg-black"
        />

        {/* vignette + film grain */}
        <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(120%_90%_at_50%_45%,transparent_55%,rgba(0,0,0,0.55)_100%)]" />
        <div className="mgst-grain pointer-events-none absolute inset-0 z-10 opacity-[0.05] mix-blend-overlay" />

        {/* ---- ZONE 1 overlay ---- */}
        <div
          data-mgst="title"
          className="pointer-events-none absolute inset-x-0 top-[13%] z-20 px-6 text-center"
        >
          <h1 className="text-balance text-[clamp(2.2rem,5.5vw,4.6rem)] font-medium leading-[1.04] tracking-tight text-white [font-family:var(--font-studio-display)] [text-shadow:0_2px_40px_rgba(0,0,0,0.8)]">
            Moon Gleam AI Studio
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm uppercase tracking-[0.34em] text-moon sm:text-base">
            AI Films. Cinematic Stories. Limitless Worlds.
          </p>
        </div>
        <div
          data-mgst="hint"
          className="pointer-events-none absolute bottom-8 left-1/2 z-20 -translate-x-1/2 text-center"
        >
          <p className="text-[11px] uppercase tracking-[0.42em] text-moon-soft">Scroll to enter</p>
          <div className="mgst-bob mx-auto mt-3 h-5 w-5 rotate-45 border-b border-r border-moon/60" />
        </div>

        {/* ---- ZONE 2 overlay ---- */}
        <div
          data-mgst="welcome"
          className="pointer-events-none absolute inset-x-0 bottom-[9%] z-20 px-6 text-center opacity-0"
        >
          <p className="mx-auto max-w-2xl text-balance text-[clamp(1.4rem,3vw,2.4rem)] font-medium leading-snug text-white [font-family:var(--font-studio-display)] [text-shadow:0_2px_30px_rgba(0,0,0,0.8)]">
            Welcome to the future of film production.
          </p>
          <button
            type="button"
            onClick={explore}
            className="mt-6 rounded-full border border-gleam/60 bg-gleam/10 px-8 py-3.5 text-sm font-semibold tracking-wide text-gleam backdrop-blur transition-all hover:bg-gleam hover:text-ink hover:shadow-gleam-glow"
          >
            Explore the studio
          </button>
        </div>

        <StudioNav active={zone} onGo={goTo} />
        <ProgressRail />
      </div>
    </div>
  );
}
