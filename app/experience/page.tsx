import type { Metadata } from 'next';
import StudioExperience from '@/components/experience/StudioExperience';

export const metadata: Metadata = {
  title: 'Studio Experience — Take a Tour With Gleam',
  description:
    "A cinematic, scroll-driven walk through the Moon Gleam AI studio, hosted by Gleam our robot creative — from brief to broadcast. See how we make studio-quality video in days.",
  alternates: { canonical: '/experience' },
  openGraph: {
    title: 'Moon Gleam Studio Experience — a tour with Gleam',
    description: 'Scroll through the AI studio with Gleam, from brief to broadcast.',
    url: '/experience',
    type: 'website',
  },
};

/**
 * /experience — the client-side scroll-driven experience is isolated in
 * <StudioExperience>. This server component keeps the metadata export (a client
 * component cannot export metadata in the App Router).
 */
export default function ExperiencePage() {
  return <StudioExperience />;
}
