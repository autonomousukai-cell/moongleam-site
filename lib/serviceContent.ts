/**
 * Long-form, search-focused content for each service page.
 *
 * Rules: company voice; prices and timelines must match components/Pricing.tsx
 * (Social Pack £499 · within 1 week; Promo Video £1,499 · 7–14 days;
 * TVC / Campaign £3,999 · 2–3 weeks). No invented clients, statistics or results.
 */
import type { Faq } from '@/lib/posts';

export type ServiceContent = {
  title: string; // <title> without the " | Moon Gleam" suffix (added by the layout template)
  description: string; // meta description, ≤ 160 chars
  h1: string;
  body: string; // Markdown, rendered with marked
  faqs: Faq[];
  guides: string[]; // blog slugs
  sectors: string[]; // sector page slugs
};

const HOW_WE_CHOOSE = `## AI, filmed or hybrid: how we choose

- **AI-generated** suits concepts, product visuals, locations you can't film and fast variations for testing.
- **Filmed** suits real people, real places and anything where authenticity is the point.
- **Hybrid** mixes both scene by scene, and is the right answer for most commercial briefs.

We recommend a route on the first call and explain the trade-offs in plain English, so you are never pushed into AI when filming would serve you better.`;

export const serviceContent: Record<string, ServiceContent> = {
  'ai-video-production': {
    title: 'AI Video Production Company in London',
    description:
      'AI video production from a London studio: AI-generated, filmed or hybrid brand videos, scripted and directed by people. Promo videos from £1,499.',
    h1: 'AI Video Production Company in London',
    body: `Moon Gleam is a London AI video production company. We use AI where it saves time and money, and human creative direction for the idea, the script, the brand and the final edit, so UK businesses get professional video in days rather than months.

## What AI video production with us includes

- **Creative development:** concept, hook-led script and storyboard, signed off before production starts.
- **Production:** AI-generated scenes, filmed footage or a hybrid of both.
- **Voice and sound:** voiceover, music and sound design.
- **Finishing:** colour grade, captions and cutdowns for website, social, ads and TV.
- **Usage rights:** you receive full usage rights to the final delivered files.

## How a project runs

1. **Free scoping call** — your goal, audience, where the video will be used and your budget.
2. **Script and storyboard** — written and approved before anything is generated or filmed.
3. **Production** — AI generation, filming or both.
4. **Edit and review** — grade, sound, captions, then your feedback.
5. **Delivery** — the master film plus platform versions.

${HOW_WE_CHOOSE}

## Prices and timelines

| Package | From | Typical timeline |
|---|---|---|
| Social Pack (3 short-form videos) | £499 | Within 1 week |
| Promo Video (30–90 sec, with cutdowns) | £1,499 | 7–14 days |
| TV Commercial / Campaign | £3,999 | 2–3 weeks |

Documentaries, kids animation, short films and monthly content are quoted per project. See [full pricing](/pricing) or our [UK video production cost guide](/blog/video-production-cost-uk).

## Who we make AI video for

We work with UK businesses and organisations across retail, professional services, charities, education and travel. Browse [video by sector](/sectors) or see [our work](/work).`,
    faqs: [
      {
        q: 'What is an AI video production company?',
        a: 'A studio that uses AI tools for parts of production, such as generating scenes, voiceovers and versions, while people handle the creative direction, script and edit. Read our guide: what is AI video production.',
      },
      {
        q: 'How much does AI video production cost in the UK?',
        a: 'Our Social Pack starts from £499, Promo Videos from £1,499 and TV commercials from £3,999. Every project gets a written quote after a free call.',
      },
      {
        q: 'How long does an AI video take to make?',
        a: 'A Social Pack is typically delivered within a week, a Promo Video in 7 to 14 days and a TV commercial in 2 to 3 weeks.',
      },
      {
        q: 'Can you mix AI with real filming?',
        a: 'Yes. Hybrid production is the most common route: we film what needs to be real and use AI for scenes, backgrounds and versions.',
      },
      {
        q: 'Who owns the finished video?',
        a: 'You do. You receive full usage rights to the final delivered files.',
      },
    ],
    guides: ['what-is-ai-video-production', 'ai-vs-traditional-video-production', 'video-production-cost-uk'],
    sectors: ['retail', 'law-firms', 'charities', 'education', 'travel', 'accountants'],
  },

  'business-promo-videos': {
    title: 'Business Promo Video Production, London & UK',
    description:
      'Promotional videos for UK businesses, scripted around what makes customers choose you. AI, filmed or hybrid, with cutdowns for every platform. From £1,499.',
    h1: 'Business Promo Video Production',
    body: `A business promo video explains who you are, what you do and why a customer should choose you, in 30 to 90 seconds. It works on your website, social channels, ads and email, so one production goes a long way.

## What's included in a Promo Video

- Script, storyboard and creative direction.
- AI, filmed or hybrid production.
- Voiceover, music and sound design.
- Cutdowns for every platform.
- Revisions until you're happy.

The Promo Video package starts from **£1,499** and is typically delivered in **7 to 14 days**. See [pricing](/pricing).

## What makes a promo work

1. **A hook in the first three seconds** — the problem your customer recognises.
2. **One clear message** — the single reason to choose you.
3. **Proof** — something the viewer can believe.
4. **One call to action** — call, book, visit or buy.

Read more in [promotional videos that convert](/blog/promotional-videos-that-convert).

${HOW_WE_CHOOSE}

## Where to use your promo

- **Website homepage and service pages** — next to the enquiry button.
- **Social media** — vertical cutdowns for Reels, TikTok and Shorts.
- **Paid ads** — 15 and 30-second versions for testing.
- **Email and sales** — a link in proposals and follow-ups.`,
    faqs: [
      {
        q: 'How long should a business promo video be?',
        a: 'Usually 30 to 90 seconds for a website, and 15 to 30 seconds for social and ads. We deliver both from one production.',
      },
      {
        q: 'How much does a promo video cost?',
        a: 'Our Promo Video package starts from £1,499, including script, storyboard, production, voiceover, music and platform cutdowns.',
      },
      {
        q: 'How quickly can I get a promo video?',
        a: 'Typically 7 to 14 days from brief, once the script is approved.',
      },
      {
        q: 'Do I need to be filmed?',
        a: 'No. We can produce the whole video with AI and graphics, film you and your team, or mix the two.',
      },
    ],
    guides: ['promotional-videos-that-convert', 'video-production-cost-uk', 'how-video-increases-conversion'],
    sectors: ['retail', 'law-firms', 'accountants'],
  },

  'product-promo-videos': {
    title: 'Product Video Production in London',
    description:
      'Product promo videos for retail, jewellery, food and e-commerce brands. Cinematic product shots, AI or filmed, cut for TV, web, social and in-store screens.',
    h1: 'Product Video Production',
    body: `Product videos make the product the hero: how it looks, moves and is used. We produce them for retailers, jewellers, food brands and online shops, for launches, seasonal offers and everyday selling.

## What we produce

- **Hero product films** for launches and campaigns.
- **Short product loops** for websites, marketplaces and in-store screens.
- **Social cutdowns** for Reels, TikTok and Shorts.
- **Offer and seasonal promos** for time-limited pushes.

## How product videos are made

1. **Brief** — the product, the buyer and the one thing they must notice.
2. **Shot list and storyboard** — the angles, motion and moments that sell it.
3. **Production** — filmed product shots, AI-generated scenes and environments, or both.
4. **Finish** — lighting, grade, motion graphics and sound design.
5. **Versions** — every aspect ratio and length you need.

${HOW_WE_CHOOSE}

## Prices and timelines

Product videos are usually produced as a Promo Video (from **£1,499**, typically **7–14 days**) or, for short-form batches, a Social Pack (from **£499**, typically **within a week**). Broadcast product commercials use the TVC package from **£3,999**. See [pricing](/pricing).

Read our guide to [product promotional videos](/blog/product-promotional-videos).`,
    faqs: [
      {
        q: 'Do you need the physical product?',
        a: 'For filmed shots, yes. For AI-generated scenes we work from product photos and references, and confirm accuracy with you before delivery.',
      },
      {
        q: 'How much does a product video cost?',
        a: 'Short-form batches start from £499, a full product promo from £1,499 and a broadcast product commercial from £3,999.',
      },
      {
        q: 'Can one shoot cover web, social and in-store screens?',
        a: 'Yes. We plan every placement at brief stage and deliver each version from the same production.',
      },
      {
        q: 'Will the product look accurate?',
        a: 'It must. Products are shown as they are sold, and we check colours, details and claims with you before delivery.',
      },
    ],
    guides: ['product-promotional-videos', 'promotional-videos-that-convert', 'video-production-cost-uk'],
    sectors: ['retail'],
  },

  'tv-commercials': {
    title: 'TV Commercial Production for UK Businesses',
    description:
      'Broadcast-standard TV adverts from concept and script to broadcast-ready delivery. AI, live-action or hybrid, for UK businesses. TVCs from £3,999.',
    h1: 'TV Commercial Production for UK Businesses',
    body: `We produce TV commercials for UK businesses, from concept and script through to broadcast-ready technical delivery, with campaign cutdowns for social and web.

## What the TVC package includes

- Full concept, script and storyboard.
- Live-action with models, AI-generated or hybrid production.
- Broadcast-ready technical delivery.
- Campaign cutdowns for social and web.
- Priority production.

The TVC / Campaign package starts from **£3,999**, for a 30 to 60-second commercial, typically delivered in **2 to 3 weeks**. See [pricing](/pricing).

## How a TV commercial project runs

1. **Scoping call** — objective, audience, channels and airtime plans.
2. **Concept and script** — one or more routes, then a chosen script.
3. **Storyboard** — every shot agreed before production.
4. **Production** — filming, AI generation or both.
5. **Post-production** — edit, grade, sound mix and graphics.
6. **Delivery** — broadcast master plus social and web versions.

${HOW_WE_CHOOSE}

## Before your advert airs

Adverts shown on UK television must meet advertising rules and be cleared before broadcast. Talk to us early about your channel and airtime plans so the script and claims are planned with clearance in mind.

Read our guide to [affordable TV commercial production for small businesses](/blog/tv-commercial-production-smb).`,
    faqs: [
      {
        q: 'How much does a TV commercial cost to produce?',
        a: 'Our TVC / Campaign package starts from £3,999. The final cost depends on filming, talent, locations and the versions you need. Airtime is separate.',
      },
      {
        q: 'How long does TV advert production take?',
        a: 'Typically 2 to 3 weeks from approved script to delivery.',
      },
      {
        q: 'Can an AI-generated advert be shown on TV?',
        a: 'Yes, provided it meets broadcast technical standards and advertising rules like any other advert.',
      },
      {
        q: 'Do you also make the social versions?',
        a: 'Yes. Campaign cutdowns for social and web are included in the TVC package.',
      },
    ],
    guides: ['tv-commercial-production-smb', 'video-production-cost-uk', 'ai-vs-traditional-video-production'],
    sectors: ['retail', 'travel', 'charities', 'law-firms'],
  },

  'ugc-content': {
    title: 'UGC & Social Video Production UK',
    description:
      'UGC-style and short-form social video for brands: hooks, captions and formats for TikTok, Reels and Shorts. Social Packs from £499; monthly packages available.',
    h1: 'UGC & Social Video Production',
    body: `UGC-style content looks and sounds like it was made by a real customer rather than a brand. We produce it in batches, with hooks and captions built for TikTok, Instagram Reels and YouTube Shorts, so your channels stay active every week.

## What the Social Pack includes

- Three short-form videos (15 to 60 seconds each).
- Hooks and captions written for retention.
- Scripts built around your offers.
- Platform-ready formats.

The Social Pack starts from **£499** and is typically delivered **within a week**. Monthly packages are available. See [pricing](/pricing).

## What good UGC-style content looks like

- Handheld or selfie-style framing and natural light.
- A real-sounding voice and on-screen captions.
- A clear but casual call to action.
- Honest representation of the product or service.

Read more in [UGC explained](/blog/ugc-content-explained).

${HOW_WE_CHOOSE}

## Using UGC well

- **Organic social** — post consistently rather than occasionally.
- **Paid social** — test several hooks and keep the winners.
- **Product and landing pages** — short clips beside the buy or enquiry button.`,
    faqs: [
      {
        q: 'What is UGC-style content?',
        a: 'Casual, authentic-looking video that feels like a customer recommendation rather than a polished advert.',
      },
      {
        q: 'How much does UGC video cost?',
        a: 'Our Social Pack starts from £499 for three short-form videos. Monthly packages are available.',
      },
      {
        q: 'How fast is delivery?',
        a: 'A Social Pack is typically delivered within a week.',
      },
      {
        q: 'Is AI-generated UGC allowed in ads?',
        a: 'It must not mislead. Content should not present invented customers or fake reviews as real; we keep UGC-style ads honest about what they are.',
      },
    ],
    guides: ['ugc-content-explained', 'promotional-videos-that-convert', 'how-video-increases-conversion'],
    sectors: ['retail', 'education'],
  },

  documentary: {
    title: 'Documentary Production Company, London',
    description:
      'Short and long-form documentary from a London studio: research, scripting, narration, archive-style visuals and the full edit, for brands, charities and channels.',
    h1: 'Documentary Production',
    body: `We produce short and long-form documentaries: brand and heritage stories, charity films and episodic series. The studio handles research, scripting, narration and the complete edit in-house.

## What's included

- Research and story development.
- Scripting and narration.
- Archive-style and AI-assisted visuals where filming isn't possible.
- Interviews and filmed footage where real people tell the story.
- Full edit, grade and sound mix.
- Single films, series and episodic formats.

## How a documentary project runs

1. **Story call** — the subject, audience and where it will be shown.
2. **Research and treatment** — the structure and the key moments.
3. **Script** — narration and interview plan.
4. **Production** — interviews, filming and visual reconstruction.
5. **Edit** — rough cut, review, fine cut.
6. **Delivery** — masters for web, broadcast or festival use, plus social trailers.

${HOW_WE_CHOOSE}

## Pricing

Documentaries are quoted per project, because length, research and filming vary widely. [Book a free call](/contact) for a written quote, or see [pricing](/pricing) for our standard packages.`,
    faqs: [
      {
        q: 'How much does a documentary cost to produce?',
        a: 'Documentaries are quoted per project, depending on length, research, interviews and filming. Every quote is written and itemised.',
      },
      {
        q: 'Can you make a documentary without archive footage?',
        a: 'Yes. Where footage does not exist, we can reconstruct scenes with AI-assisted and archive-style visuals, clearly as illustration.',
      },
      {
        q: 'Do you make documentary series?',
        a: 'Yes. We produce single films, series and episodic formats.',
      },
    ],
    guides: ['video-marketing-by-sector', 'ai-vs-traditional-video-production'],
    sectors: ['charities', 'education'],
  },

  'kids-animation': {
    title: "Kids' 3D Animation Studio, London",
    description:
      "3D animated stories, songs and learning content for children's brands, publishers, schools and channels. Values-led, produced in-house in London.",
    h1: "Kids' 3D Animation Studio",
    body: `We produce 3D animation for young audiences: animated stories, songs and educational content for education brands, publishers and channels.

## What we make

- **3D character animation** — original characters designed for your brand or series.
- **Songs and nursery content** — animated music videos for young viewers.
- **Educational storytelling** — lessons and stories that keep children watching.
- **Series production** — consistent characters and style across episodes and courses.

## How an animation project runs

1. **Concept** — audience age, learning goals and tone.
2. **Characters and world** — designs approved before animation.
3. **Script and storyboard** — every scene planned.
4. **Animation** — 3D animation with AI-assisted production to keep series budgets realistic.
5. **Voice, music and sound** — voices, songs and effects.
6. **Delivery** — episodes, shorts and platform versions.

## Safe, values-driven content

Content for children needs extra care: age-appropriate language, positive values and no misleading claims. We agree the content standards with you at concept stage.

## Pricing

Kids animation is quoted per project, depending on length, number of characters and series size. [Book a free call](/contact) for a written quote.`,
    faqs: [
      {
        q: 'What age groups do you make animation for?',
        a: 'Young children through primary age. We agree the target age at concept stage because it shapes pace, language and visuals.',
      },
      {
        q: 'Can you create original characters for our brand?',
        a: 'Yes. Characters are designed and approved before animation starts, and kept consistent across a series.',
      },
      {
        q: 'How much does kids animation cost?',
        a: 'It is quoted per project, based on length, characters and the number of episodes.',
      },
    ],
    guides: ['video-marketing-by-sector', 'what-is-ai-video-production'],
    sectors: ['education'],
  },

  'short-film': {
    title: 'Short Film & Drama Production, London',
    description:
      'Narrative short films, drama and cinematic series, developed, scripted and produced in-house in London, with festival and broadcast-ready delivery.',
    h1: 'Short Film & Drama Production',
    body: `We develop and produce narrative short films, drama and cinematic series, with direction, performance and pacing at the centre of every project.

## What's included

- Narrative development and scripting.
- Cinematic direction and pacing.
- AI-powered production design for worlds and scenes that would be costly to build or film.
- Edit, grade, sound design and music.
- Festival and broadcast-ready delivery.

## How a short film project runs

1. **Development** — idea, characters and treatment.
2. **Script** — drafts and a locked shooting script.
3. **Pre-production** — storyboard, casting and production design.
4. **Production** — filming, AI-generated environments, or both.
5. **Post-production** — edit, grade, sound and music.
6. **Delivery** — festival, broadcast and online masters, plus a trailer.

${HOW_WE_CHOOSE}

## Pricing

Short films and drama are quoted per project, depending on length, cast and locations. [Book a free call](/contact) for a written quote.`,
    faqs: [
      {
        q: 'Do you produce branded short films?',
        a: 'Yes. Brands use short narrative films to tell a story an advert cannot. We develop the idea with you from the start.',
      },
      {
        q: 'Can AI be used in a short film?',
        a: 'Yes, mainly for production design: environments, period settings and effects that would be expensive to build or film.',
      },
      {
        q: 'How much does a short film cost?',
        a: 'Short films are quoted per project, depending on length, cast, locations and post-production.',
      },
    ],
    guides: ['ai-vs-traditional-video-production', 'what-is-ai-video-production'],
    sectors: [],
  },
};
