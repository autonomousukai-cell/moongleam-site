import type { Metadata } from 'next';
import { Marcellus } from 'next/font/google';
import StudioTourLoader from '@/components/studio/StudioTourLoader';
import StudioDetails from '@/components/studio/StudioDetails';

/** Premium editorial display face for the studio — exposed as a CSS variable. */
const display = Marcellus({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-studio-display',
});

export const metadata: Metadata = {
  title: {
    absolute: 'Moon Gleam AI Studio — AI-Powered Video Production, London',
  },
  description:
    'AI-powered video production for UK businesses — TV commercials, brand films, documentaries, kids animation, UGC and social content, brief to delivery. Step inside our virtual studio: a cinematic tour from the night-lit exterior to the screening room.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Moon Gleam AI Studio',
    description:
      'AI Films. Cinematic Stories. Limitless Worlds. Scroll to enter the studio.',
    url: '/',
    type: 'website',
  },
};

/**
 * Homepage — the immersive 8-zone virtual studio tour IS the site's front
 * door (Azhar, 2026-07-24). The scroll engine hydrates client-side inside
 * <StudioTourLoader>; <StudioDetails> keeps the homepage crawlable with
 * server-rendered headings, service copy and internal links (the classic
 * nav/footer are hidden on this route — the holographic Studio Map is the
 * only navigation on the tour).
 */
export default function Home() {
  return (
    <main className={`${display.variable} bg-ink`}>
      <StudioTourLoader />
      <StudioDetails />
    </main>
  );
}
