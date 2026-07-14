'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Typewriter effect for the AI Creative Studio hero: types a line, holds, then
 * deletes and types the next — looping through the supplied lines. Pure
 * useState/useEffect (no deps). Respects prefers-reduced-motion by showing the
 * first line statically instead of animating.
 */
export default function AITyper({
  lines,
  typeSpeed = 42,
  deleteSpeed = 22,
  holdTime = 1600,
}: {
  lines: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  holdTime?: number;
}) {
  const [text, setText] = useState('');
  const [lineIndex, setLineIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced.current) setText(lines[0] ?? '');
  }, [lines]);

  useEffect(() => {
    if (reduced.current || lines.length === 0) return;

    const current = lines[lineIndex % lines.length];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), holdTime);
    } else if (deleting && text === '') {
      setDeleting(false);
      setLineIndex((i) => (i + 1) % lines.length);
    } else {
      const next = deleting
        ? current.slice(0, text.length - 1)
        : current.slice(0, text.length + 1);
      timeout = setTimeout(() => setText(next), deleting ? deleteSpeed : typeSpeed);
    }

    return () => clearTimeout(timeout);
  }, [text, deleting, lineIndex, lines, typeSpeed, deleteSpeed, holdTime]);

  return (
    <span className="text-moon">
      {text}
      <span className="ai-caret" aria-hidden>
        ▍
      </span>
    </span>
  );
}
