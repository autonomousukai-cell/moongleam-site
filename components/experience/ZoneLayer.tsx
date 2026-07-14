'use client';

import type { CSSProperties, ReactNode } from 'react';
import { seg, smooth } from './scenes';

/**
 * A full-viewport overlay layer for one zone. Reveals/hides itself off the single
 * global `progress` value — no per-element scroll listeners. Only opacity/transform
 * animate (60fps), and pointer events are enabled only while the zone is visible so
 * hidden zones never intercept clicks.
 */
export function useZoneReveal(progress: number, start: number, end: number) {
  const local = seg(progress, start, end);
  const enter = smooth(Math.min(1, local / 0.26));
  const exit = smooth(Math.min(1, (1 - local) / 0.2));
  const vis = Math.min(enter, exit);
  return { local, vis, enter, y: (1 - enter) * 26 };
}

export default function ZoneLayer({
  progress,
  start,
  end,
  children,
  className = '',
  style,
}: {
  progress: number;
  start: number;
  end: number;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  const { vis, y } = useZoneReveal(progress, start, end);
  return (
    <div
      aria-hidden={vis < 0.05}
      className={`absolute inset-0 flex items-center justify-center px-5 ${className}`}
      style={{
        opacity: vis,
        transform: `translate3d(0, ${y}px, 0)`,
        pointerEvents: vis > 0.6 ? 'auto' : 'none',
        willChange: 'opacity, transform',
        ...style,
      }}
    >
      {children}
    </div>
  );
}
