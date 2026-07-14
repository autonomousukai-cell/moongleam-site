import CinematicStudio from '@/components/CinematicStudio';
import { FaqJsonLd } from '@/lib/seo';
import { faqs } from '@/lib/data';

/**
 * Homepage — a single pinned, scroll-scrubbed cinematic journey through the
 * Moon Gleam AI studio (aperture opens → studio → LED wall welcome film → hero →
 * work → pricing → contact). Deeper corporate detail lives on the dedicated
 * routes (Work, Services, Sectors, Pricing, About, Blog) linked in the nav.
 */
export default function Home() {
  return (
    <main>
      <FaqJsonLd items={faqs} />
      <CinematicStudio />
    </main>
  );
}
