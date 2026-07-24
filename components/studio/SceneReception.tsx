'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Hotspot from './Hotspot';
import SceneBackdrop from './SceneBackdrop';
import { ZONE_BACKDROPS } from './journey';
import { site } from '@/lib/site';

/**
 * ZONE 2 — the studio reception: a bespoke AI-rendered set (holographic
 * welcome desk, cyan/violet light columns, black marble reflections) whose
 * back wall carries a REAL cinema-scale LED video wall playing the Moon
 * Gleam showreel.
 *
 * Sound honesty: browsers block autoplay WITH audio until a user gesture, so
 * the wall autoplays MUTED the moment the visitor reaches reception, and a
 * director's-console control invites the first tap — which plays the studio
 * welcome voiceover (/studio/welcome.mp3) and unmutes the showreel.
 *
 * Layer contract (written by the engine every frame):
 *   rec        — group opacity/visibility (crossfade from exterior)
 *   recInner   — arrival settle: scale 1.22→1 + focus pull (blur→0)
 *   hotspotRec — hotspot appears with the welcome overlay
 */

/** The rendered reception plate is 1376×768 (1.7917:1). */
const PLATE_AR = 1376 / 768;

/** Send a command to the embedded YouTube player (enablejsapi bridge). */
const ytCmd = (frame: HTMLIFrameElement | null, func: string, args: unknown[] = []) => {
  frame?.contentWindow?.postMessage(
    JSON.stringify({ event: 'command', func, args }),
    'https://www.youtube-nocookie.com',
  );
};

export default function SceneReception({ active }: { active: boolean }) {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const voRef = useRef<HTMLAudioElement | null>(null);
  /** Wall powers on the first time the visitor reaches reception, then stays. */
  const [powered, setPowered] = useState(false);
  const [soundOn, setSoundOn] = useState(false);

  useEffect(() => {
    if (active) setPowered(true);
  }, [active]);

  /* The showreel only runs (and only ever sounds) while the visitor is in
     the room — leaving reception mutes + pauses; returning resumes muted. */
  useEffect(() => {
    if (!powered) return;
    const frame = frameRef.current;
    if (active) {
      ytCmd(frame, 'playVideo');
    } else {
      ytCmd(frame, 'mute');
      ytCmd(frame, 'pauseVideo');
      voRef.current?.pause();
      setSoundOn(false);
    }
  }, [active, powered]);

  /** First tap: welcome voiceover over the reel, then full showreel audio. */
  const enableSound = useCallback(() => {
    const frame = frameRef.current;
    setSoundOn(true);
    ytCmd(frame, 'unMute');
    ytCmd(frame, 'setVolume', [25]); // ducked under the voiceover
    try {
      const vo = voRef.current ?? new Audio('/studio/welcome.mp3');
      voRef.current = vo;
      vo.currentTime = 0;
      vo.onended = () => ytCmd(frameRef.current, 'setVolume', [100]);
      void vo.play().catch(() => ytCmd(frame, 'setVolume', [100]));
    } catch {
      ytCmd(frame, 'setVolume', [100]); // VO missing → straight to reel audio
    }
  }, []);

  const muteAgain = useCallback(() => {
    voRef.current?.pause();
    ytCmd(frameRef.current, 'mute');
    setSoundOn(false);
  }, []);

  return (
    <div
      data-mgst="rec"
      className="pointer-events-none absolute inset-0 opacity-0"
      style={{ visibility: 'hidden' }}
    >
      <div data-mgst="recInner" className="absolute inset-0 origin-center will-change-transform">
        <SceneBackdrop src={ZONE_BACKDROPS.reception} scrim="bottom" />

        {/* Cover-box: replicates the backdrop's object-cover crop so the LED
            wall overlay stays welded to the rendered wall at any viewport. */}
        <div
          aria-hidden={!powered}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: `max(100%, calc(100vh * ${PLATE_AR}))`,
            height: `max(100%, calc(100vw / ${PLATE_AR}))`,
          }}
        >
          {/* the LED video wall — sits inside the plate's cyan bezel */}
          <div
            className="absolute"
            style={{
              left: '52.55%',
              top: '17.9%',
              width: '32.3%',
              height: '38.6%',
              transform: 'perspective(1400px) rotateY(-3.2deg)',
            }}
          >
            {/* the wall is scenery — all control goes through the HUD console,
                so stray clicks can never pause the reel mid-tour */}
            <div className="pointer-events-none relative h-full w-full overflow-hidden rounded-[2px] border border-[rgba(91,227,255,0.45)] bg-black shadow-[0_0_90px_-8px_rgba(91,227,255,0.55),inset_0_0_40px_rgba(0,0,0,0.6)]">
              {powered ? (
                <iframe
                  ref={frameRef}
                  src={`https://www.youtube-nocookie.com/embed/${site.showreelId}?autoplay=1&mute=1&controls=0&playsinline=1&rel=0&modestbranding=1&loop=1&playlist=${site.showreelId}&enablejsapi=1`}
                  title="Moon Gleam — studio showreel on the reception LED wall"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  loading="lazy"
                  className="absolute inset-0 h-full w-full"
                  style={{ border: 0 }}
                />
              ) : (
                <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_50%,rgba(91,227,255,0.1),transparent_75%)]" />
              )}
              {/* LED panel texture + glass sheen over the feed */}
              <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(180deg,rgba(0,0,0,0.14)_0_1px,transparent_1px_3px)] mix-blend-overlay" />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.06),transparent_38%)]" />
            </div>
            {/* light spill onto the marble floor */}
            <div className="pointer-events-none absolute -bottom-[46%] left-1/2 h-[44%] w-[112%] -translate-x-1/2 bg-[radial-gradient(50%_100%_at_50%_0%,rgba(91,227,255,0.16),transparent_75%)] blur-md" />
          </div>
        </div>

        {/* floating wordmark — the room's holographic signage */}
        <div className="absolute left-[24%] top-[10%] -translate-x-1/2 text-center">
          <div className="absolute left-1/2 top-1/2 h-[190%] w-[135%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(233,196,106,0.12),transparent_70%)] blur-xl" />
          <div className="relative text-[clamp(1.3rem,2.8vw,2.3rem)] font-medium tracking-[0.24em] text-moon drop-shadow-[0_0_30px_rgba(233,196,106,0.5)] [font-family:var(--font-studio-display)]">
            MOON&nbsp;GLEAM
          </div>
          <div className="relative mt-2 text-[clamp(0.5rem,0.9vw,0.7rem)] uppercase tracking-[0.72em] text-moon-soft">
            Reception · AI Film Studio
          </div>
        </div>
      </div>

      {/* ---- engine-gated interactives (opacity + pointer-events follow the
              welcome beat; pointer-events inherit, so no child overrides) ---- */}
      <div data-mgst="hotspotRec" className="absolute inset-0 z-30 opacity-0" style={{ pointerEvents: 'none' }}>
        {/* sound console — the honest unmute control, docked under the wall */}
        <div className="absolute left-[68%] top-[63%] flex -translate-x-1/2 justify-center">
          {!soundOn ? (
            <button
              type="button"
              onClick={enableSound}
              className="mgst-hud-btn mgst-pulse !px-7 !py-3 !text-xs shadow-[0_0_50px_-6px_rgba(233,196,106,0.9)]"
            >
              <span aria-hidden className="text-base leading-none">◉</span>
              Welcome to Moon Gleam — tap for sound
            </button>
          ) : (
            <button
              type="button"
              onClick={muteAgain}
              className="mgst-hud-btn-ghost !px-5 !py-2 !text-[11px]"
            >
              Sound on · tap to mute
            </button>
          )}
        </div>

        {/* hotspot — concierge desk */}
        <div className="absolute bottom-[34%] left-[18%]">
          <Hotspot
            label="Concierge desk"
            body="Every Moon Gleam production starts here — a 15-minute discovery call with the studio team."
          />
        </div>
      </div>
    </div>
  );
}
