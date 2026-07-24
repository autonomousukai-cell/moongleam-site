'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import {
  T,
  TRACK_VH,
  P1_END,
  XFADE,
  ZW,
  ZONE_STARTS,
  STUDIO_ZONES,
  clamp01,
  seg,
  smooth,
  easeOut,
  lerp,
  zoneAt,
  zoneLabelAt,
  timecodeAt,
  type Layers,
} from './journey';
import FrameSequenceCanvas, { FrameSequence } from './FrameSequence';
import ParticleField from './ParticleField';
import SceneExterior from './SceneExterior';
import SceneReception from './SceneReception';
import SceneLab, { renderLab } from './SceneLab';
import SceneSoundstage, { renderSoundstage } from './SceneSoundstage';
import ScenePipeline, { renderPipeline } from './ScenePipeline';
import SceneSuite, { renderSuite } from './SceneSuite';
import SceneScreening, { renderScreening } from './SceneScreening';
import SceneBooking, { renderBooking } from './SceneBooking';
import StudioNav from './StudioNav';
import ProgressRail from './ProgressRail';

/**
 * The cinematic engine — now the full 8-zone journey.
 *
 * One tall scroll track (TRACK_VH) + one sticky viewport. Lenis smooths the
 * wheel; a single GSAP ScrollTrigger scrubs progress 0–1; renderFrame() maps
 * that progress onto every layer with direct style writes (no React
 * re-renders while scrubbing). The journey is fully reversible.
 *
 * Camera path: night exterior → dolly to the entrance → doors open →
 * reception (the approved Phase-1 choreography, remapped into [0, P1_END])
 * → creative lab → soundstage → pipeline → render suite → screening room →
 * rooftop booking. Each room transition shares one walk-forward grammar
 * (zoneShell) so the whole building reads as one continuous camera move.
 * When real footage exists, FRAME_MANIFEST swaps the procedural sets for a
 * scrubbed frame sequence with no other changes.
 */
export default function CinematicJourney({ frames }: { frames: FrameSequence | null }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<Layers>({});
  const progressRef = useRef(0);
  const lenisRef = useRef<Lenis | null>(null);
  const zoneRef = useRef('exterior');
  const [zone, setZone] = useState('exterior');

  /** Map scroll progress onto every layer. Called by ScrollTrigger only. */
  const renderFrame = useCallback((p: number) => {
    const el = layersRef.current;
    if (!el.ext && !el.title) return;
    progressRef.current = p;

    /* ================= PHASE 1 (exterior → reception), local space ======= */
    const p1 = clamp01(p / P1_END);

    /* ---- camera dolly (exterior) ---- */
    const dolly = smooth(seg(p1, T.dolly[0], T.dolly[1]));
    if (el.sky) el.sky.style.transform = `scale(${lerp(1, 1.18, dolly).toFixed(4)})`;
    if (el.bldg) el.bldg.style.transform = `scale(${lerp(1, 2.55, dolly).toFixed(4)})`;
    if (el.mist1)
      el.mist1.style.transform = `translate3d(0,${(dolly * 22).toFixed(2)}%,0) scale(${lerp(1, 1.9, dolly).toFixed(4)})`;
    if (el.mist2)
      el.mist2.style.transform = `translate3d(0,${(dolly * 34).toFixed(2)}%,0) scale(${lerp(1, 2.2, dolly).toFixed(4)})`;
    if (el.mist3)
      el.mist3.style.transform = `translate3d(0,${(dolly * 14).toFixed(2)}%,0) scale(${lerp(1, 1.6, dolly).toFixed(4)})`;

    /* ---- entrance doors ----
       The doors are viewport-level glass panels now that the exterior is a
       real rendered set: they materialise as the dolly reaches the entrance,
       then slide apart as the camera passes through. */
    const d = smooth(seg(p1, T.doors[0], T.doors[1]));
    const dIn = smooth(seg(p1, T.doors[0] - 0.1, T.doors[0]));
    if (el.doorGrp) {
      const a = dIn * (1 - smooth(seg(p1, T.doors[1] - 0.02, T.doors[1] + 0.04)));
      el.doorGrp.style.opacity = a.toFixed(3);
      el.doorGrp.style.visibility = a <= 0 ? 'hidden' : 'visible';
    }
    if (el.doorL) el.doorL.style.transform = `translateX(${(-d * 112).toFixed(2)}%)`;
    if (el.doorR) el.doorR.style.transform = `translateX(${(d * 112).toFixed(2)}%)`;
    if (el.doorSeam) el.doorSeam.style.opacity = String(1 - d);
    if (el.doorLight) el.doorLight.style.opacity = String(0.55 + 0.45 * d);

    /* ---- threshold light bloom ---- */
    const f = Math.sin(smooth(seg(p1, T.flash[0], T.flash[1])) * Math.PI);
    if (el.flash) el.flash.style.opacity = (f * 0.85).toFixed(3);

    /* ---- exterior ⇄ reception crossfade ---- */
    const cross = smooth(seg(p1, T.cross[0], T.cross[1]));
    if (el.ext) {
      el.ext.style.opacity = String(1 - cross);
      el.ext.style.visibility = cross >= 1 ? 'hidden' : 'visible';
    }
    /* Reception hands over to the lab at the end of Phase 1. */
    const recExit = smooth(seg(p, ZW.lab[0], ZW.lab[0] + XFADE));
    const recAlpha = cross * (1 - recExit);
    if (el.rec) {
      el.rec.style.opacity = recAlpha.toFixed(3);
      el.rec.style.visibility = recAlpha <= 0 ? 'hidden' : 'visible';
    }

    /* ---- arrival settle + focus pull, then walk-out toward the lab ---- */
    const arr = easeOut(seg(p1, T.arrive[0], T.arrive[1]));
    if (el.recInner) {
      const scale = lerp(1.22, 1, arr) * lerp(1, 1.18, recExit);
      el.recInner.style.transform = `scale(${scale.toFixed(4)})`;
      const blur = lerp(9, 0, arr);
      el.recInner.style.filter =
        cross > 0 && blur > 0.4 ? `blur(${blur.toFixed(1)}px)` : 'none';
    }

    /* ---- overlays ---- */
    const titleFade = 1 - smooth(seg(p1, T.titleOut[0], T.titleOut[1]));
    if (el.title) {
      el.title.style.opacity = String(titleFade);
      el.title.style.transform = `translateY(${((1 - titleFade) * -34).toFixed(1)}px)`;
    }
    const hintFade = 1 - smooth(seg(p1, T.hintOut[0], T.hintOut[1]));
    if (el.hint) el.hint.style.opacity = String(hintFade);

    const w = smooth(seg(p1, T.welcome[0], T.welcome[1])) * (1 - recExit);
    if (el.welcome) {
      el.welcome.style.opacity = String(w);
      el.welcome.style.transform = `translateY(${((1 - w) * 28).toFixed(1)}px)`;
      el.welcome.style.pointerEvents = w > 0.6 ? 'auto' : 'none';
    }

    /* ---- Phase-1 hotspots ---- */
    const hExt = 1 - smooth(seg(p1, 0.24, 0.38));
    if (el.hotspotExt) {
      el.hotspotExt.style.opacity = String(hExt);
      el.hotspotExt.style.pointerEvents = hExt > 0.5 ? 'auto' : 'none';
    }
    if (el.hotspotRec) {
      el.hotspotRec.style.opacity = String(w);
      el.hotspotRec.style.pointerEvents = w > 0.6 ? 'auto' : 'none';
    }

    /* ================= PHASE 2 rooms ===================================== */
    renderLab(el, p);
    renderSoundstage(el, p);
    renderPipeline(el, p);
    renderSuite(el, p);
    renderScreening(el, p);
    renderBooking(el, p);

    /* ---- cinematic letterbox: Phase-1 transit + every room threshold ---- */
    let bars =
      smooth(seg(p1, T.bars[0], T.bars[1])) *
      (1 - smooth(seg(p1, T.barsOut[0], T.barsOut[1])));
    for (const b of ZONE_STARTS) {
      bars = Math.max(bars, Math.sin(Math.PI * seg(p, b - 0.018, b + 0.062)) * 0.8);
    }
    if (el.barTop) el.barTop.style.transform = `translateY(${((bars - 1) * 100).toFixed(1)}%)`;
    if (el.barBot) el.barBot.style.transform = `translateY(${((1 - bars) * 100).toFixed(1)}%)`;

    /* ---- film-timeline rail ---- */
    if (el.pct) el.pct.textContent = timecodeAt(p);
    if (el.railFill) el.railFill.style.transform = `scaleY(${p.toFixed(4)})`;
    if (el.zoneLabel) el.zoneLabel.textContent = zoneLabelAt(p);
    if (el.reel) el.reel.style.transform = `rotate(${(p * 720).toFixed(1)}deg)`;

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
    const layers: Layers = {};
    stage.querySelectorAll<HTMLElement>('[data-mgst]').forEach((n) => {
      const key = n.dataset.mgst;
      if (key) layers[key] = n;
    });
    layersRef.current = layers;

    gsap.registerPlugin(ScrollTrigger);

    /* SCROLL-FIX (R1) — three guarantees before the engine can run:
       1. The loader's `overflow: hidden` on <html> must be gone, whatever the
          effect ordering of the mount was, or the window can never scroll.
       2. `scroll-behavior` must be `auto` while Lenis owns the scroll: Lenis
          writes window.scrollTo() every frame, and CSS smooth-scrolling would
          animate each write from a barely-moved position — the net effect is
          a page frozen at the top while the wheel does nothing.
       3. ScrollTrigger must re-measure the 2480vh track after layout settles
          (fonts/loader teardown), or its start/end — and therefore progress —
          can be computed from a half-settled document. */
    const html = document.documentElement;
    html.style.overflow = '';
    document.body.style.overflow = '';
    const prevScrollBehavior = html.style.scrollBehavior;
    html.style.scrollBehavior = 'auto';

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

    /* Re-measure once the browser has painted the mounted tree, and again
       after the loader's fade-out window — both are cheap and idempotent. */
    const remeasure = () => {
      lenis.resize();
      ScrollTrigger.refresh();
      renderFrame(st.progress);
    };
    const raf = requestAnimationFrame(remeasure);
    const settle = window.setTimeout(remeasure, 300);
    const late = window.setTimeout(remeasure, 1200);
    window.addEventListener('resize', remeasure);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(settle);
      window.clearTimeout(late);
      window.removeEventListener('resize', remeasure);
      st.kill();
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
      html.style.scrollBehavior = prevScrollBehavior;
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

  /** "Explore the studio" → the journey continues into the Creative Lab. */
  const explore = useCallback(() => {
    goTo(STUDIO_ZONES.find((z) => z.key === 'lab')?.target ?? 0.33);
  }, [goTo]);

  return (
    <div ref={trackRef} style={{ height: `${TRACK_VH}vh` }} className="relative">
      <div ref={stageRef} className="mgst-cursor sticky top-0 h-screen overflow-hidden bg-[#05060A]">
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
            <SceneReception active={zone === 'reception'} />
            <SceneLab />
            <SceneSoundstage />
            <ScenePipeline />
            <SceneSuite />
            <SceneScreening active={zone === 'portfolio'} />
            <SceneBooking />
          </>
        )}

        {/* atmosphere: stars outside → dust motes inside */}
        <ParticleField progressRef={progressRef} />

        {/* threshold light bloom when passing through the doors */}
        <div
          data-mgst="flash"
          className="pointer-events-none absolute inset-0 z-10 opacity-0 bg-[radial-gradient(60%_60%_at_50%_55%,rgba(244,216,137,0.9),rgba(91,227,255,0.22)_60%,transparent_78%)]"
        />

        {/* cinematic letterbox during transits */}
        <div
          data-mgst="barTop"
          className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[7vh] -translate-y-full bg-black"
        />
        <div
          data-mgst="barBot"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[7vh] translate-y-full bg-black"
        />

        {/* vignette + film grain — kept featherlight so the sets stay vivid */}
        <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(130%_100%_at_50%_45%,transparent_74%,rgba(0,0,0,0.28)_100%)]" />
        <div className="mgst-grain pointer-events-none absolute inset-0 z-10 opacity-[0.05] mix-blend-overlay" />

        {/* ---- ZONE 1 overlay ---- */}
        <div
          data-mgst="title"
          className="pointer-events-none absolute inset-x-0 top-[13%] z-20 px-6 text-center"
        >
          {/* no name title card — the studio name reads off the building
              signage in the exterior plate; the homepage's real <h1> is
              SSR'd in StudioDetails */}
          <p className="mx-auto max-w-xl text-balance text-sm uppercase tracking-[0.34em] text-moon [text-shadow:0_2px_30px_rgba(0,0,0,0.85)] sm:text-base">
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
          <button type="button" onClick={explore} className="mgst-hud-btn mt-6">
            Explore the studio
          </button>
        </div>

        <StudioNav active={zone} onGo={goTo} />
        <ProgressRail onGo={goTo} />
      </div>
    </div>
  );
}
