'use client';

import { useEffect, useRef } from 'react';
import { clamp01 } from './journey';

/**
 * Frame-sequence scrubbing engine.
 *
 * Given a manifest of image URLs (one per frame of the rendered walkthrough),
 * this preloads every frame and draws the one matching the current scroll
 * progress to a full-viewport canvas, cover-fitted and DPR-aware. It only
 * repaints when the frame index changes, so scrubbing is cheap.
 *
 * Phase 1 ships with an empty manifest (procedural CSS sets render instead) —
 * this is the drop-in point for the real AI-generated footage. See
 * FRAME_MANIFEST in journey.ts.
 */
export class FrameSequence {
  private imgs: (HTMLImageElement | null)[];
  private loadedCount = 0;

  constructor(private urls: string[]) {
    this.imgs = urls.map(() => null);
  }

  get length() {
    return this.urls.length;
  }

  /** Preload all frames; onProgress receives 0–1. Missing frames are skipped. */
  preload(onProgress?: (p: number) => void): Promise<void> {
    if (!this.urls.length) return Promise.resolve();
    return new Promise((resolve) => {
      this.urls.forEach((url, i) => {
        const img = new Image();
        const done = () => {
          this.loadedCount += 1;
          onProgress?.(this.loadedCount / this.urls.length);
          if (this.loadedCount === this.urls.length) resolve();
        };
        img.onload = () => {
          this.imgs[i] = img;
          done();
        };
        img.onerror = done;
        img.decoding = 'async';
        img.src = url;
      });
    });
  }

  /** Frame index for a given progress (0–1). */
  indexFor(progress: number) {
    return Math.round(clamp01(progress) * (this.urls.length - 1));
  }

  /** Draw the frame for `progress` cover-fitted into the canvas. */
  draw(ctx: CanvasRenderingContext2D, w: number, h: number, progress: number) {
    const img = this.imgs[this.indexFor(progress)];
    if (!img) return;
    const scale = Math.max(w / img.width, h / img.height);
    const dw = img.width * scale;
    const dh = img.height * scale;
    ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
  }
}

/**
 * Canvas host for a FrameSequence, scrubbed by the shared progress ref.
 * Rendered by CinematicJourney only when a manifest exists.
 */
export default function FrameSequenceCanvas({
  sequence,
  progressRef,
}: {
  sequence: FrameSequence;
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
      lastIndex = -1; // force repaint at new size
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    let lastIndex = -1;
    let raf = 0;
    const loop = () => {
      const idx = sequence.indexFor(progressRef.current);
      if (idx !== lastIndex) {
        lastIndex = idx;
        ctx.clearRect(0, 0, w, h);
        sequence.draw(ctx, w, h, progressRef.current);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [sequence, progressRef]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden
    />
  );
}
