/**
 * Search-focused content for each sector page. Same rules as serviceContent.ts:
 * prices/timelines match components/Pricing.tsx; no invented clients or results.
 */
import type { Faq } from '@/lib/posts';

export type SectorContent = {
  title: string;
  description: string;
  h1: string;
  body: string;
  faqs: Faq[];
  services: string[]; // service slugs
  guides: string[]; // blog slugs
};

const PRICES = `## Prices and timelines

Most projects in this sector use one of our standard packages: a **Social Pack from £499** (three short videos, typically within a week), a **Promo Video from £1,499** (typically 7–14 days) or a **TV commercial from £3,999** (typically 2–3 weeks). Every project gets a written quote after a free call. See [pricing](/pricing).`;

export const sectorContent: Record<string, SectorContent> = {
  education: {
    title: 'Educational Video Production Company, London',
    description:
      'Educational video production for schools, academies, tutors and training providers: course promos, explainers, brand films and 3D animation for learners.',
    h1: 'Educational Video Production',
    body: `We produce video for schools, online academies, tuition centres and training providers: films that sell the institution, promos that fill courses, and teaching content that keeps learners watching.

## Videos we make for education

- **Course and enrolment promos** — what the course is, who it is for and how to join.
- **Brand and open-day films** — the people, the teaching and the atmosphere.
- **Explainer and lesson videos** — clear, captioned teaching content.
- **3D animation for young learners** — characters, songs and stories (see [kids animation](/services/kids-animation)).
- **Short social clips** — term starts, results days and reminders.

## How we make learning video clear

1. **One learning goal per video.**
2. **Plain language and captions**, so content works on mute and for every learner.
3. **Visuals that show, not tell** — animation or AI-generated scenes where filming is impractical.
4. **Accessible delivery** — subtitles and versions for your platform or VLE.

${PRICES}`,
    faqs: [
      {
        q: 'What does an educational video production company do?',
        a: 'It plans, scripts and produces video for schools, academies and training providers: course promos, brand films, explainers and teaching content.',
      },
      {
        q: 'Can you produce animated content for children?',
        a: 'Yes. We produce 3D animated stories, songs and learning content for young audiences.',
      },
      {
        q: 'How much does an education promo video cost?',
        a: 'A Promo Video starts from £1,499, typically delivered in 7 to 14 days. Animation and series are quoted per project.',
      },
      {
        q: 'Do videos include subtitles?',
        a: 'Yes. Captions are included so videos work on mute and for every learner.',
      },
    ],
    services: ['kids-animation', 'business-promo-videos', 'ai-video-production'],
    guides: ['explainer-video-production', 'video-marketing-by-sector'],
  },

  travel: {
    title: 'Travel Video Production Company for Tour Operators',
    description:
      'Travel video production for UK tour operators and travel agencies: destination commercials, package promos and social video for every route and season.',
    h1: 'Travel Video Production for Tour Operators',
    body: `We produce destination and campaign video for UK tour operators and travel agencies: commercials for routes and packages, seasonal promos and short-form social content.

## Videos we make for travel brands

- **Destination commercials** — a film per destination or package.
- **Seasonal campaign promos** — early-booking, summer, winter-sun and pilgrimage seasons.
- **Social cutdowns** — vertical edits for Reels, TikTok and Shorts.
- **Offer videos** — dates, prices and inclusions for paid ads.

## Why AI production suits travel

Filming every destination is expensive and slow. AI-generated and hybrid production lets a tour operator have a campaign film for each route and season without sending a crew abroad. Destinations should still be shown honestly: real landmarks, realistic hotels and accurate inclusions.

${PRICES}

Read our guide to [video marketing for travel and tour operators](/blog/travel-tour-operator-video-marketing).`,
    faqs: [
      {
        q: 'Can you make destination videos without filming abroad?',
        a: 'Yes. AI-generated and hybrid production can create destination films without a crew travelling, while keeping landmarks and inclusions accurate.',
      },
      {
        q: 'How much does a travel promo video cost?',
        a: 'A Promo Video starts from £1,499 and a TV commercial from £3,999. Batches of social videos start from £499.',
      },
      {
        q: 'Can you produce a series for multiple destinations?',
        a: 'Yes. We can produce a consistent series across routes and seasons, with a written quote for the full set.',
      },
    ],
    services: ['tv-commercials', 'ai-video-production', 'ugc-content'],
    guides: ['travel-tour-operator-video-marketing', 'tv-commercial-production-smb'],
  },

  charities: {
    title: 'Charity Video Production, London & UK',
    description:
      'Charity video production for UK charities and non-profits: appeal films, campaign TV adverts, event films and social video, produced to protect your budget.',
    h1: 'Charity Video Production',
    body: `We produce appeal films, campaign adverts and social video for UK charities and non-profits, using AI-assisted production so more of your budget stays with the cause.

## Videos we make for charities

- **Appeal and campaign films** — winter appeals, Ramadan campaigns and emergency appeals.
- **TV commercials** for campaigns that go on air.
- **Event films** — fundraising dinners and community events.
- **Impact stories** — how donations are used, told honestly.
- **Social cutdowns** for every platform.

## Getting charity video right

1. **One clear ask** — donate, sign up or share.
2. **Honest storytelling** — real need, shown with dignity and consent.
3. **Accurate claims** — figures and outcomes your charity can stand behind.
4. **Fast turnaround** — appeals must land while the moment matters.

${PRICES}`,
    faqs: [
      {
        q: 'How much does a charity appeal video cost?',
        a: 'A Promo Video starts from £1,499 and a campaign TV commercial from £3,999. Every project gets a written quote.',
      },
      {
        q: 'Can AI production keep charity video costs down?',
        a: 'Yes. AI-assisted and hybrid production reduce crew, location and travel costs, so budgets go further.',
      },
      {
        q: 'Do you make Ramadan and winter appeal videos?',
        a: 'Yes. Seasonal appeals are a core part of our charity work.',
      },
    ],
    services: ['tv-commercials', 'documentary', 'ai-video-production'],
    guides: ['video-marketing-by-sector', 'tv-commercial-production-smb'],
  },

  'law-firms': {
    title: 'Law Firm Video Production for UK Solicitors',
    description:
      'Video production for UK law firms and solicitors: firm profiles, plain-English legal explainers, practice-area promos and ad campaigns that build trust.',
    h1: 'Video Production for Law Firms',
    body: `We produce video for UK law firms and solicitors: firm profiles, plain-English explainers for each practice area and campaign adverts.

## Videos we make for law firms

- **Firm profile films** — your people, approach and credentials.
- **Practice-area explainers** — "what happens after you instruct us", in plain English.
- **FAQ clips** — short answers to the questions clients ask most.
- **Advertising campaigns** — promos for paid social, web and TV.

## What matters in legal video

1. **Plain English** — clients are often anxious and new to the process.
2. **Accuracy** — content reviewed by your solicitors before release.
3. **Regulatory care** — advertising must follow SRA and advertising rules; we plan scripts with that in mind.
4. **Trust signals** — real people, real offices and a professional finish.

${PRICES}

See our guide to [explainer video production](/blog/explainer-video-production).`,
    faqs: [
      {
        q: 'What videos should a law firm make first?',
        a: 'A firm profile and an explainer for your highest-value practice area, placed on the matching service page.',
      },
      {
        q: 'Do you check legal content for accuracy?',
        a: 'Scripts are approved by your firm before production, so legal content is checked by your solicitors.',
      },
      {
        q: 'How much does law firm video cost?',
        a: 'A Promo Video or explainer starts from £1,499; a TV commercial from £3,999.',
      },
    ],
    services: ['business-promo-videos', 'tv-commercials', 'ai-video-production'],
    guides: ['explainer-video-production', 'how-video-increases-conversion'],
  },

  accountants: {
    title: 'Video Production for Accountancy Firms',
    description:
      'Video production for UK accountants and bookkeepers: firm profiles, tax-deadline explainers and social clips that make your practice the obvious choice.',
    h1: 'Video Production for Accountancy Firms',
    body: `We produce video for UK accountancy and bookkeeping practices: firm profiles, short explainers on deadlines and tax topics, and social clips that keep your practice front of mind.

## Videos we make for accountants

- **Firm profile films** — who you work with and how.
- **One-answer explainers** — deadlines, allowable expenses, switching accountant.
- **Service promos** — bookkeeping, payroll, tax returns and advisory.
- **Social clips** around key dates in the tax year.

## Making accounting video work

1. **One topic per clip**, answered in under a minute.
2. **Accurate, dated content** — figures and deadlines checked by your team.
3. **Consistent posting** around the tax calendar.
4. **A clear next step** — book a call or request a quote.

${PRICES}`,
    faqs: [
      {
        q: 'What video content works for accountants?',
        a: 'Short, accurate explainers on the questions clients ask, plus a firm profile for your website.',
      },
      {
        q: 'Who checks the tax content?',
        a: 'Your team approves every script, so figures and deadlines are correct before production.',
      },
      {
        q: 'How much does it cost?',
        a: 'A batch of three social videos starts from £499; a firm profile or explainer from £1,499.',
      },
    ],
    services: ['business-promo-videos', 'ugc-content', 'ai-video-production'],
    guides: ['explainer-video-production', 'video-marketing-by-sector'],
  },

  retail: {
    title: 'Retail, Grocery & Jeweller Video Production, London',
    description:
      'Video for UK retailers, grocers, jewellers and restaurants: TV adverts, product promos and social video that bring customers through the door.',
    h1: 'Video Production for Retailers, Grocers & Jewellers',
    body: `We produce TV adverts, product promos and social video for independent retailers, grocers, jewellers and restaurants across the UK.

## Videos we make for retail

- **TV commercials** for launches, festivals and seasonal sales.
- **Product promos** — collections, ranges and hero products.
- **Offer videos** — time-limited deals for social and in-store screens.
- **Social content** — weekly short-form video to stay visible.

## What works for local retail

1. **Show the product honestly** — prices and offers must match what's in store.
2. **Plan around the calendar** — festivals, holidays and seasonal peaks.
3. **One production, many placements** — TV, web, social and in-store screens.
4. **A clear reason to visit** — the offer, the location and the opening hours.

${PRICES}

Read our guides to [product promotional videos](/blog/product-promotional-videos) and [restaurant video marketing](/blog/restaurant-video-marketing).`,
    faqs: [
      {
        q: 'Can a local shop afford a TV advert?',
        a: 'Our TV commercials start from £3,999 for production. Airtime is separate and depends on channel and region.',
      },
      {
        q: 'What video should a retailer make first?',
        a: 'Usually a product or offer promo with social cutdowns, timed for your next seasonal peak.',
      },
      {
        q: 'How fast can you turn around a seasonal promo?',
        a: 'A Social Pack is typically delivered within a week and a Promo Video in 7 to 14 days.',
      },
    ],
    services: ['product-promo-videos', 'tv-commercials', 'ugc-content'],
    guides: ['product-promotional-videos', 'restaurant-video-marketing'],
  },
};
