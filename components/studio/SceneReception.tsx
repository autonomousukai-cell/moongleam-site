'use client';

import Hotspot from './Hotspot';
import SceneBackdrop from './SceneBackdrop';
import { ZONE_BACKDROPS } from './journey';

/**
 * ZONE 2 — the studio reception: a bespoke AI-rendered set (holographic
 * welcome desk, cyan/violet light columns, black marble reflections). The
 * engine's arrival settle (scale + focus pull) plays on the whole plate;
 * a floating wordmark keeps the room unmistakably Moon Gleam.
 *
 * Layer contract (written by the engine every frame):
 *   rec        — group opacity/visibility (crossfade from exterior)
 *   recInner   — arrival settle: scale 1.22→1 + focus pull (blur→0)
 *   hotspotRec — hotspot appears with the welcome overlay
 */
export default function SceneReception() {
  return (
    <div
      data-mgst="rec"
      className="pointer-events-none absolute inset-0 opacity-0"
      style={{ visibility: 'hidden' }}
    >
      <div data-mgst="recInner" className="absolute inset-0 origin-center will-change-transform">
        <SceneBackdrop src={ZONE_BACKDROPS.reception} />

        {/* floating wordmark — the room's holographic signage */}
        <div className="absolute left-1/2 top-[13%] -translate-x-1/2 text-center">
          <div className="absolute left-1/2 top-1/2 h-[190%] w-[135%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(233,196,106,0.12),transparent_70%)] blur-xl" />
          <div className="relative text-[clamp(1.5rem,3.4vw,2.8rem)] font-medium tracking-[0.24em] text-moon drop-shadow-[0_0_30px_rgba(233,196,106,0.5)] [font-family:var(--font-studio-display)]">
            MOON&nbsp;GLEAM
          </div>
          <div className="relative mt-2 text-[clamp(0.5rem,0.9vw,0.7rem)] uppercase tracking-[0.72em] text-moon-soft">
            Reception · AI Film Studio
          </div>
        </div>
      </div>

      {/* hotspot — concierge desk (appears with the welcome overlay) */}
      <div
        data-mgst="hotspotRec"
        className="pointer-events-auto absolute bottom-[30%] left-[30%] z-30 opacity-0"
      >
        <Hotspot
          label="Concierge desk"
          body="Every Moon Gleam production starts here — a 15-minute discovery call with the studio team."
        />
      </div>
    </div>
  );
}
