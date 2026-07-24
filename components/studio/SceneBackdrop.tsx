'use client';

/**
 * The rendered "set" behind a zone — one of the bespoke AI-rendered studio
 * scenes (Moon Gleam's own pipeline), full-bleed under the zone's depth /
 * particle / letterbox grammar. A plain <img> on purpose: the URLs are
 * preloaded byte-for-byte by StudioTour's branded loader, so the journey
 * never pops in. Scrims keep overlay type legible over any exposure.
 */
/**
 * Soft radial halo behind a room's header copy — guarantees contrast over a
 * bright/busy plate without dimming the whole set. Drop it as the first child
 * of any positioned overlay that already creates a stacking context (z-*);
 * the -z-10 keeps it under the text but over the scene.
 */
export function TextHalo() {
  return (
    <div
      aria-hidden
      className="absolute inset-x-0 -inset-y-8 -z-10 bg-[radial-gradient(46%_100%_at_50%_50%,rgba(3,5,10,0.68),transparent_80%)]"
    />
  );
}

export default function SceneBackdrop({
  src,
  scrim = 'both',
  alt = '',
}: {
  src: string;
  /** Where overlay copy sits — darkens that edge of the frame. */
  scrim?: 'top' | 'bottom' | 'both' | 'none';
  /** Set on SEO-bearing plates (e.g. the exterior signage); decorative otherwise. */
  alt?: string;
}) {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element -- preloaded set plate; the optimizer would fork the URL away from the loader's preload */}
      <img
        src={src}
        alt={alt}
        aria-hidden={alt === ''}
        draggable={false}
        decoding="async"
        className="absolute inset-0 h-full w-full select-none object-cover"
      />
      {/* Minimal legibility gradients only — the imagery must stay crisp and
          vivid; overlay copy carries its own text-shadow for the rest. */}
      {(scrim === 'top' || scrim === 'both') && (
        <div className="absolute inset-x-0 top-0 h-[22%] bg-[linear-gradient(180deg,rgba(2,4,9,0.32),transparent)]" />
      )}
      {(scrim === 'bottom' || scrim === 'both') && (
        <div className="absolute inset-x-0 bottom-0 h-[24%] bg-[linear-gradient(0deg,rgba(2,4,9,0.36),transparent)]" />
      )}
      {/* whisper of an edge vignette — frames the set without dimming it */}
      <div className="absolute inset-0 bg-[radial-gradient(140%_110%_at_50%_45%,transparent_72%,rgba(0,0,0,0.22)_100%)]" />
    </>
  );
}
