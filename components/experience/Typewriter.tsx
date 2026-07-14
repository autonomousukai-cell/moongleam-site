'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Self-contained typewriter that types + cycles a set of lines with a blinking
 * caret. Wrapped in an aria-live region so screen readers hear the rotating text.
 * `isStatic` (used by the reduced-motion fallback) just prints the first line.
 */
export default function Typewriter({
  lines,
  className = '',
  typeSpeed = 45,
  deleteSpeed = 22,
  hold = 1500,
  loop = true,
  isStatic = false,
}: {
  lines: string[];
  className?: string;
  typeSpeed?: number;
  deleteSpeed?: number;
  hold?: number;
  loop?: boolean;
  isStatic?: boolean;
}) {
  const [text, setText] = useState(isStatic ? lines[0] ?? '' : '');
  const idx = useRef(0);
  const len = useRef(0);
  const del = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (isStatic) return;
    let mounted = true;

    const schedule = (fn: () => void, ms: number) => {
      timer.current = setTimeout(fn, ms);
    };

    const tick = () => {
      if (!mounted) return;
      const full = lines[idx.current % lines.length] ?? '';
      len.current = del.current
        ? Math.max(0, len.current - 1)
        : Math.min(full.length, len.current + 1);
      const cur = full.slice(0, len.current);
      setText(cur);

      if (!del.current && cur === full) {
        if (!loop && idx.current === lines.length - 1) return;
        schedule(() => {
          del.current = true;
          tick();
        }, hold);
        return;
      }
      if (del.current && cur === '') {
        del.current = false;
        idx.current += 1;
        schedule(tick, 260);
        return;
      }
      schedule(tick, del.current ? deleteSpeed : typeSpeed);
    };

    schedule(tick, 350);
    return () => {
      mounted = false;
      if (timer.current) clearTimeout(timer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <span className={className} aria-live="polite">
      {text}
      {!isStatic && <span className="ai-caret" aria-hidden="true" />}
    </span>
  );
}
