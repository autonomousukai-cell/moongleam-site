import type { Variants } from 'framer-motion';

/**
 * Shared Framer Motion variants.
 * Use these everywhere so motion is consistent across the site.
 * Rule (from CLAUDE.md): scroll-triggered fades, staggered reveals,
 * smooth hover transitions on interactive elements.
 */

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
};

// Parent container that staggers its children's reveal.
export const stagger: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

// Standard viewport config for scroll-triggered reveals.
export const inView = { once: true, amount: 0.3 } as const;
