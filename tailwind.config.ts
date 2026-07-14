import type { Config } from 'tailwindcss';

/**
 * Moon Gleam design tokens.
 * Matched to the chrome-silver + gold MG logo: dark base + gleam-gold primary
 * accent + moon-silver neutral + a brushed-chrome `glow` secondary. No blue.
 * Do NOT hardcode hex values in components — use these tokens.
 */
const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Base surfaces
        ink: {
          DEFAULT: '#0A0A0B', // page background
          soft: '#111214',    // raised surface / cards
          line: '#1E2024',    // borders / dividers
        },
        // Primary accent — gleam gold
        gleam: {
          DEFAULT: '#E9C46A',
          bright: '#F4D889',
          deep: '#C9A24B',
        },
        // Neutral — moon silver
        moon: {
          DEFAULT: '#C7CCD1',
          soft: '#8A9099',
          faint: '#5A5F66',
        },
        // Secondary accent — brushed chrome (repurposed from the old blue "glow").
        // Kept the `glow` token name so every existing text-glow/border-glow/
        // shadow-glow usage now renders silver instead of blue.
        glow: {
          DEFAULT: '#D7DBE0',
          deep: '#AEB4BB',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-sans)', 'sans-serif'],
      },
      // 8px base spacing scale is Tailwind default (0.25rem steps); named steps for rhythm
      fontSize: {
        'display-lg': ['clamp(2.75rem, 6vw, 5rem)', { lineHeight: '1.02', letterSpacing: '-0.02em' }],
        'display': ['clamp(2.25rem, 4.5vw, 3.5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'heading': ['clamp(1.5rem, 3vw, 2.25rem)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
      },
      boxShadow: {
        // Warm gold glow (was electric-blue). Silver variant for chrome surfaces.
        glow: '0 0 60px -12px rgba(233, 196, 106, 0.30)',
        'gleam-glow': '0 0 50px -12px rgba(233, 196, 106, 0.35)',
        'chrome-glow': '0 0 50px -12px rgba(199, 204, 209, 0.25)',
      },
      maxWidth: {
        content: '1200px',
      },
    },
  },
  plugins: [],
};

export default config;
