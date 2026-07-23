import type { Metadata } from 'next';
import { Marcellus } from 'next/font/google';
import StudioTourLoader from '@/components/studio/StudioTourLoader';
import StudioDetails from '@/components/studio/StudioDetails';

/** Premium editorial display face — /studio only, exposed as a CSS variable. */
const display = Marcellus({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-studio-display',
});

export const metadata: Metadata = {
  title: 'Studio Tour — Step Inside Moon Gleam',
  description:
    'A cinematic virtual tour of the Moon Gleam AI film studio. Scroll from the night-lit exterior through the doors into reception — where AI films, commercials and limitless worlds are made.',
  alternates: { canonical: '/studio' },
  openGraph: {
    title: 'Moon Gleam AI Studio — Virtual Studio Tour',
    description:
      'AI Films. Cinematic Stories. Limitless Worlds. Scroll to enter the studio.',
    url: '/studio',
    type: 'website',
  },
};

/**
 * /studio — Phase 1 of the immersive virtual studio tour (isolated route;
 * the rest of the site is untouched). Server component keeps metadata + the
 * SEO-visible details section; the scroll engine hydrates client-side.
 */
export default function StudioPage() {
  return (
    <main className={`${display.variable} bg-ink`}>
      <StudioTourLoader />
      <StudioDetails />
    </main>
  );
}
