/**
 * Moon Gleam blog — native content module.
 *
 * Replaces the old GoHighLevel reverse-proxy blog (blog.moongleam.co.uk) with
 * on-domain, on-theme posts. COMPANY VOICE ONLY: no personal history, no
 * individual credentials, no invented testimonials or new prices.
 *
 * Each post's `body` is Markdown (rendered to HTML with `marked` at build time —
 * see app/blog/[slug]/page.tsx). The Quick answer, FAQs, related links and CTA
 * are kept as structured fields so they can be rendered natively (AEO/FAQPage
 * schema, accordion, internal linking) rather than buried in the body.
 */

const COVER_BASE =
  'https://d8j0ntlcm91z4.cloudfront.net/user_3Aik900pJNIZAM1itTaGkIXE8Ga/';

/**
 * Cover images are AI-generated stills the client owns. Older posts are served
 * from CloudFront (bare filename → COVER_BASE is prepended); newer posts ship
 * a local file in /public/blog and set `coverFile` to a root-relative path
 * (starting with "/"), which is used as-is.
 */
function resolveCover(coverFile: string): string {
  return coverFile.startsWith('/') ? coverFile : `${COVER_BASE}${coverFile}`;
}
export type Faq = { q: string; a: string };

export type Post = {
  slug: string;
  title: string;
  description: string; // meta description
  keyword: string; // primary target keyword
  tags: string[];
  category: string; // first tag
  date: string; // ISO date (published)
  updated?: string; // ISO date (last substantive update)
  cover: string; // absolute image URL
  quickAnswer: string; // answer-first lead (AEO)
  body: string; // Markdown body (H2 sections, lists, one table)
  faqs: Faq[];
  related: string[]; // slugs of related posts (internal links)
};

type RawPost = Omit<Post, 'category' | 'cover'> & { coverFile: string };

const rawPosts: RawPost[] = [
  {
    slug: 'what-is-ai-video-production',
    title: 'What Is AI Video Production? A UK Guide',
    description:
      'AI video production explained for UK businesses: how it works, where AI is used, when filming is still better, costs, rights and how to choose a studio.',
    keyword: 'AI video production',
    tags: ['AI Video', 'Video Production', 'Guides'],
    date: '2026-06-03',
    updated: '2026-10-28',
    coverFile: 'hf_20260712_232957_78b34b4d-c0cd-4460-b8d2-87aba8b073ba.png',
    quickAnswer:
      'AI video production is making professional video with artificial intelligence tools for some or all of the work, such as generating scenes, voiceovers, music, translations and edits, while people direct the story, brand and final cut. For UK businesses it usually means faster turnaround and lower cost than a full shoot, with filming still used where real people or places matter.',
    body: `## What "AI video production" actually means

AI video production doesn't mean a robot makes your advert. It means using AI at the stages where it saves the most time and money, while a creative team stays responsible for the idea, the script, the brand and the edit. At Moon Gleam we describe this as **Creative AI**: AI speed, human craft. (Looking for a studio rather than an explainer? See our [AI video production agency services](/services/ai-video-production).)

In practice, a project can be:

- **Fully AI-generated:** every scene is generated, then directed, edited and sound-designed by people.
- **Hybrid:** filmed footage combined with AI-generated scenes, backgrounds, product shots or effects.
- **AI-assisted:** a conventional production that uses AI for tasks such as captioning, translation, clean-up or versioning.

## Where AI is used in the production process

| Stage | What AI can do | What people still do |
|---|---|---|
| Concept and script | Draft ideas, variations and outlines | Decide the message, write the final script, check claims |
| Visuals | Generate scenes, characters, products and environments | Art direction, consistency, brand fit, rejecting weak shots |
| Voice | Synthetic voiceover and multiple languages | Choose the voice, direct the delivery, check pronunciation |
| Music and sound | Generated music beds and effects | Sound design, mix and licensing checks |
| Edit and versions | Cutdowns, resizing, captions, translations | Story, pacing, final grade and quality control |

## How the process works

1. **Brief.** A short call to understand your business, customer and goal.
2. **Script.** A hook-led script written to hold attention and drive one action.
3. **Storyboard.** A scene-by-scene plan so you approve the look before production.
4. **Generate, shoot or both.** AI-generated scenes, filmed footage, or a hybrid.
5. **Edit.** Grade, sound design, captions and platform cutdowns.
6. **Deliver.** Final video plus versions for web, social, TV and ads.

## Why UK businesses use AI video production

- **Speed.** Fewer shoot days to schedule means shorter timelines. Our promo videos are typically delivered in 7 to 14 days.
- **Cost.** Less crew, kit, location and travel spend, so budgets go further.
- **Volume.** It is practical to produce several variations for testing, audiences and channels.
- **Flexibility.** Scenes, products or settings that would be expensive or impossible to film can be created.

## When filming is still the better choice

AI is excellent for concepts, explainers, product visuals and social content. Filming still wins when authenticity is the point:

- Real customer testimonials and case studies.
- Founder or team introductions, where people want to see the real person.
- Real locations, venues and properties that buyers will visit.
- Live events.

That is why we offer AI, filmed and hybrid production, and recommend whichever suits the brief.

## Quality, honesty and rights

Using AI responsibly matters as much as using it well. Things to check with any studio:

- **No misleading visuals.** UK advertising rules on misleading ads apply to AI-generated images just as they do to any other. A product should not be shown doing something it can't do.
- **Real people's likenesses.** Never use a real person's face or voice without their permission.
- **Tools and licences.** Ask which tools are used and what their terms allow for commercial use.
- **Ownership.** Make sure the contract states who owns the final files and where you can use them. With Moon Gleam, you receive full usage rights to the final delivered files.
- **Disclosure.** Decide with your studio whether and how to label AI-generated content, especially in sensitive sectors.

## How much does AI video production cost in the UK?

It depends on the scope, but removing shoot days usually lowers the cost compared with a fully filmed production. Our published starting prices are £499 for a Social Pack, £1,499 for a Promo Video and £3,999 for a TV commercial. See our [video production cost guide](/blog/video-production-cost-uk) for what drives the price, or our [pricing page](/pricing) for what each package includes.

## How to choose an AI video production studio

- Look at finished work, not just demo clips. Consistency across a full film is harder than one impressive shot.
- Ask who writes the script and who directs the edit.
- Check what is included: storyboard, revisions, voiceover, music and cutdowns.
- Ask how they handle rights, likeness and licensing.
- Make sure they can also film, so you are not pushed into AI when filming would be better.

Read more in [how to choose a video production company](/blog/how-to-choose-video-production-company), or compare approaches in [AI vs traditional video production](/blog/ai-vs-traditional-video-production).

## Work with Moon Gleam

We are a creative AI studio producing promos, explainers, TV commercials and social content for UK businesses. See our [AI video production services in London](/services/ai-video-production), browse [our work](/work) or [book a free call](/contact).`,
    faqs: [
      {
        q: 'Is AI video production suitable for small businesses?',
        a: 'Yes. It is often most useful for small and medium-sized businesses, because it delivers professional video without the cost of a full crew and shoot.',
      },
      {
        q: 'Does AI video look fake?',
        a: 'It can when it is poorly directed. Strong art direction, consistent characters, careful editing, grading and sound design are what make AI video look professional.',
      },
      {
        q: 'How much does AI video production cost in the UK?',
        a: 'It depends on scope. Our starting prices are £499 for a Social Pack, £1,499 for a Promo Video and £3,999 for a TV commercial, with a written quote for every project.',
      },
      {
        q: 'Who owns the finished video?',
        a: 'You do. You receive full usage rights to the final delivered files.',
      },
      {
        q: 'Can AI video be used for TV adverts?',
        a: 'Yes, provided it meets broadcast technical standards and passes clearance like any other advert. Our TVC package includes broadcast-ready technical delivery.',
      },
      {
        q: 'When should I film instead of using AI?',
        a: 'Film when authenticity is the point: real testimonials, founder introductions, real locations and live events. Many projects combine both.',
      },
    ],
    related: [
      'ai-vs-traditional-video-production',
      'video-production-cost-uk',
      'explainer-video-production',
    ],
  },
  {
    slug: 'promotional-videos-that-convert',
    title: "Promotional Videos That Actually Convert: A UK Owner's Guide",
    description:
      'How to make a promotional video that turns viewers into customers — structure, length, hooks and CTAs, with examples for UK businesses.',
    keyword: 'promotional video production',
    tags: ['Promotional Video', 'Conversion', 'Guides'],
    date: '2026-06-09',
    coverFile: 'hf_20260712_233005_4513a278-8788-4026-a793-0f54bce28055.png',
    quickAnswer:
      'A promotional video converts when it hooks the viewer in the first three seconds, tells one clear story, and ends with a single obvious action. Most business promos fail because they list features instead of selling an outcome.',
    body: `## The anatomy of a converting promo

- **Hook (0–3s):** A bold visual or question that stops the scroll.
- **Problem (3–10s):** Name the pain your customer feels.
- **Solution (10–40s):** Show your product or service solving it.
- **Proof (40–55s):** A result, review or recognisable client.
- **CTA (last 5s):** One action — call, book, visit or buy.

## How long should a promotional video be?

- **Social ads:** 15–30 seconds.
- **Website hero:** 30–60 seconds.
- **Sales / explainer:** 60–90 seconds.

Anything longer needs a very good reason.

## The most common mistakes

1. Leading with your logo instead of a hook.
2. Talking about *you* instead of the customer.
3. Cramming in five messages when one would convert better.
4. No clear call to action.

## Where to use it

One promo becomes many assets: a website hero, a paid social ad, an email header, and vertical cutdowns for Reels, TikTok and Shorts. Always brief the edit with every placement in mind.`,
    faqs: [
      {
        q: 'What makes a promotional video "high-converting"?',
        a: 'A single message, an early hook, social proof, and one clear CTA — produced well enough to earn trust.',
      },
      {
        q: 'How much does a promotional video cost?',
        a: 'It depends on length and production style; AI and hybrid production make professional promos far more affordable. See our pricing guide.',
      },
      {
        q: 'How quickly can I get a promo video?',
        a: 'At Moon Gleam, most promos are delivered within two weeks of the brief.',
      },
    ],
    related: [
      'how-video-increases-conversion',
      'product-promotional-videos',
      'video-production-cost-uk',
    ],
  },
  {
    slug: 'video-production-cost-uk',
    title: 'Video Production Costs UK (2026): Price Ranges',
    description:
      'What video production costs in the UK in 2026: our published from-prices (£499, £1,499, £3,999), what drives the price, and how to get more from your budget.',
    keyword: 'video production cost UK',
    tags: ['Pricing', 'Video Production', 'Guides'],
    date: '2026-06-15',
    updated: '2026-10-17',
    coverFile: 'hf_20260712_233028_4de2610b-265a-4109-89af-7f4d710bc5da.png',
    quickAnswer:
      'Video production in the UK can cost anything from a few hundred pounds for short social clips to many thousands for a filmed brand film or TV commercial. The price depends on production method, length, crew, post-production and how many versions you need. Moon Gleam publishes its starting prices: social packs from £499, promo and explainer videos from £1,499, and TV commercials from £3,999.',
    body: `## Our published starting prices

We publish honest starting points so you can plan a budget before the first call. Every project still gets a written quote, because scope varies.

| Package | From | What it is | Typical length | Typical timeline |
|---|---|---|---|---|
| Social Pack | £499 | 3 short-form videos for Reels, TikTok and Shorts | 15–60 sec each | Within 1 week |
| Promo Video | £1,499 | 1 promotional or explainer video with script, storyboard, voiceover and platform cutdowns | 30–90 sec | 7–14 days |
| TVC / Campaign | £3,999 | Broadcast-standard TV commercial with concept, script, storyboard and campaign cutdowns | 30–60 sec | 2–3 weeks |

Documentaries, kids animation, short films and monthly content retainers are quoted per project. Full details are on our [pricing page](/pricing).

## What actually drives the price

Whichever studio you use, the same factors decide the bill:

- **Production method.** AI-generated, filmed or hybrid. A filmed shoot adds crew, equipment, location and travel for every shoot day. AI-generated scenes remove most of those costs but still need skilled direction and editing.
- **Length and complexity.** The number of scenes, locations, characters and visual effects matters more than running time alone.
- **People on screen.** Actors, presenters or models bring fees, and broadcast or long-term paid use often costs more than organic social use.
- **Script and creative development.** Concept, scriptwriting and storyboarding are where a film is won or lost. Cheap quotes often skip this step.
- **Post-production.** Editing, colour grading, motion graphics, sound design, music licensing and captions.
- **Voiceover.** A professional voice artist, extra languages or multiple reads.
- **Deliverables.** Each extra aspect ratio, cutdown or language version adds editing time.
- **Revisions.** Find out how many review rounds are included and what happens after that.
- **Broadcast delivery.** TV commercials need technical delivery to broadcast standards and clearance before they can air.

## Indicative ranges by video type

Market prices vary widely by region, studio size and production method, so treat these as a guide to how budgets scale rather than a quote.

- **Short social videos:** usually the most affordable format. Our Social Pack starts from £499 for three videos.
- **Business promo or explainer:** typically in the low thousands for professional work. Ours start from £1,499.
- **Brand film or documentary:** more scenes, interviews and editing time mean higher budgets. Usually quoted per project.
- **TV commercial:** the widest range of all, from AI-led commercials to multi-day filmed productions. Ours start from £3,999.

## AI, filmed or hybrid: how the method changes the cost

| | AI-generated | Filmed | Hybrid |
|---|---|---|---|
| Crew and kit | Minimal | Required for every shoot day | Only where filming adds value |
| Locations | Generated or composited | Booked, travelled to and permitted | Mixed |
| Speed | Fastest | Slowest, depends on scheduling | In between |
| Best for | Concepts, product visuals, explainers, social content | Real people, testimonials, real places | Most commercial briefs |

AI does not make video free. Direction, scripting, editing and sound design still take skilled time, and that is where quality comes from. For a deeper comparison, read [AI vs traditional video production](/blog/ai-vs-traditional-video-production).

## What should be included in a quote

Before you compare prices, check each quote states:

1. The deliverables: number of videos, lengths, aspect ratios and languages.
2. Whether script and storyboard are included, and who writes them.
3. The number of revision rounds.
4. Music and voiceover licensing, and where you are allowed to use the video.
5. Who owns the final files.
6. The timeline, and what you need to provide to keep to it.
7. Whether VAT is included.

## How to get more value from your budget

1. **Shoot once, cut many.** Plan every placement at brief stage so one production gives you website, social and ad versions.
2. **Use AI where it adds speed, film where it adds trust.** Concepts, product shots and variations suit AI; real testimonials suit filming.
3. **Spend on the first ten seconds.** The hook decides whether anyone sees the rest.
4. **Keep one message per video.** Two short focused films usually outperform one long one that tries to say everything.
5. **Get feedback in one place.** Consolidated feedback from one decision-maker saves revision rounds.

## How to get an accurate quote

Book a free 15-minute call. We will ask about your goal, audience, where the video will be used and your timeline, then send a written quote. You can also see our [AI video production services](/services/ai-video-production) or browse [our work](/work).`,
    faqs: [
      {
        q: 'How much does a promotional video cost in the UK?',
        a: 'Our promo videos start from £1,499, including script, storyboard, production, voiceover, music and platform cutdowns. Filmed shoots, actors and extra versions increase the price.',
      },
      {
        q: 'How much does a TV commercial cost?',
        a: 'Our TV commercials start from £3,999. The final cost depends on whether it is AI-led, filmed or hybrid, the talent involved, and the media usage you need.',
      },
      {
        q: 'Why do video production quotes vary so much?',
        a: 'Quotes reflect different production methods, crew sizes, creative development and deliverables. Compare quotes line by line: deliverables, revisions, licensing, ownership and timeline.',
      },
      {
        q: 'Can I get a professional video on a small budget?',
        a: 'Yes. AI-generated and hybrid production can keep costs down. Our Social Pack starts from £499 for three short-form videos.',
      },
      {
        q: 'Do you offer fixed pricing?',
        a: 'We publish starting prices and give every project a written quote after a free call, so you know the cost before work begins.',
      },
    ],
    related: [
      'ai-vs-traditional-video-production',
      'explainer-video-production',
      'how-to-choose-video-production-company',
    ],
  },
  {
    slug: 'ugc-content-explained',
    title: 'UGC Explained: Why "Real" Content Outperforms Polished Ads',
    description:
      'What UGC (user-generated content) is, why it converts better than polished ads, and how UK businesses can produce it at scale with AI.',
    keyword: 'UGC content',
    tags: ['UGC', 'Social Media', 'Guides'],
    date: '2026-06-20',
    coverFile: 'hf_20260712_233000_91028a40-7a51-402c-872f-dab85c81f6ce.png',
    quickAnswer:
      'UGC (user-generated content) is authentic, casual-style video that looks like it was filmed by a real customer, not a brand. It converts because audiences trust people over polished advertising — and in 2026, AI lets businesses produce UGC-style content at scale without a huge shoot.',
    body: `## Why UGC outperforms traditional ads

- **Trust:** It feels like a recommendation, not a sales pitch.
- **Native feel:** It blends into social feeds instead of interrupting them.
- **Cost:** No studio, no crew — quick to produce and test.
- **Volume:** Easy to make many versions for different audiences.

## What good UGC looks like

Handheld or selfie-style framing, natural lighting, a genuine-sounding voice, on-screen captions, and a clear but casual call to action. The goal is *credibility*, not gloss.

## UGC use cases for UK businesses

- A jeweller showing a ring "unboxing".
- A local shop owner giving a quick product tip.
- A charity supporter sharing why they give.
- An accountant answering one common client question.

## How AI changes UGC

AI now generates realistic UGC-style presenters and voiceovers, so you can produce a week's worth of authentic-feeling content without filming — then film real customers where genuine faces matter most.`,
    faqs: [
      {
        q: 'Is UGC only for TikTok and Instagram?',
        a: 'No — it works in paid ads, on product pages, in emails and on YouTube Shorts too.',
      },
      {
        q: 'Does UGC work for professional services like law or accountancy?',
        a: 'Yes. A quick, human answer to a common question builds more trust than a corporate video.',
      },
      {
        q: 'Can AI really produce believable UGC?',
        a: 'Directed well, yes — realistic presenters and voices, produced far faster than a shoot.',
      },
    ],
    related: [
      'promotional-videos-that-convert',
      'how-video-increases-conversion',
      'video-marketing-by-sector',
    ],
  },
  {
    slug: 'how-video-increases-conversion',
    title: 'How Video Increases Conversion Rates: The Numbers That Matter',
    description:
      'How video boosts conversion rates on landing pages, ads and emails — the mechanisms, best practices and where to place video for maximum ROI.',
    keyword: 'video marketing conversion',
    tags: ['Conversion', 'Video Marketing', 'Guides'],
    date: '2026-06-25',
    coverFile: 'hf_20260712_233026_f95067d9-5001-43ed-8848-446659e0000b.png',
    quickAnswer:
      'Video increases conversion because it builds trust faster, explains value more clearly, and holds attention longer than text or images. Placing a relevant video on a landing page, product page or ad routinely lifts conversion rates and time-on-page.',
    body: `## Why video converts

- **Faster trust:** Faces, voices and motion feel human.
- **Clearer value:** Show the product working instead of describing it.
- **Emotion:** Story and sound create feeling that drives action.
- **Attention:** A good hook keeps people watching to the CTA.

## Where to place video for maximum impact

1. **Landing page hero** — communicate value in 30–60 seconds.
2. **Product pages** — demonstrate the product in use.
3. **Paid ads** — stop the scroll and qualify the click.
4. **Email** — a thumbnail with a play button lifts click-through.
5. **Checkout / booking** — a reassurance video reduces drop-off.

## Best practices that actually move the needle

- Lead with the hook, not the intro.
- Keep it to one message and one CTA.
- Add captions — most social video is watched on mute.
- Test multiple cutdowns and let the data pick the winner.

## Measuring video ROI

Track conversion rate, watch-time, click-through and cost-per-lead before and after adding video. Small improvements compound across every visitor.`,
    faqs: [
      {
        q: 'Does adding video really increase conversions?',
        a: 'Yes — relevant, well-placed video consistently improves conversion and engagement metrics.',
      },
      {
        q: 'Where does video have the biggest impact?',
        a: 'Usually landing pages, product pages and paid social ads.',
      },
      {
        q: 'How long should a conversion video be?',
        a: 'Short — 30 to 60 seconds for most pages, 15 to 30 for ads.',
      },
    ],
    related: [
      'promotional-videos-that-convert',
      'ugc-content-explained',
      'product-promotional-videos',
    ],
  },
  {
    slug: 'how-to-choose-video-production-company',
    title: 'How to Choose the Right Video Production Company (10-Point Checklist)',
    description:
      'A 10-point checklist for choosing the right video production company in the UK — what to ask, red flags to avoid, and how to judge value.',
    keyword: 'how to choose a video production company',
    tags: ['Guides', 'Video Production'],
    date: '2026-06-30',
    coverFile: 'hf_20260712_233024_ff7550e0-4372-4673-84a4-32db9e165731.png',
    quickAnswer:
      'Choose a video production company by judging its portfolio relevance, understanding of your sector, transparency on price and timelines, ownership of rights, and whether it handles the full process in-house. Avoid anyone vague on cost or unable to show results.',
    body: `## The 10-point checklist

1. **Relevant portfolio** — work for businesses like yours.
2. **Sector understanding** — do they get your customer?
3. **Clear process** — brief to delivery, explained upfront.
4. **Transparent pricing** — honest starting points, no hidden fees.
5. **Realistic timelines** — and do they hit them?
6. **In-house production** — fewer handoffs, better consistency.
7. **Strategy, not just cameras** — do they think about conversion?
8. **Rights and ownership** — you should own the final files.
9. **Revisions policy** — what's included?
10. **Proof** — named clients, reviews, measurable results.

## Red flags to avoid

- Won't discuss price until you're deep in the funnel.
- A showreel with no businesses resembling yours.
- Vague deliverables and no timeline commitment.
- Unclear who owns the finished video.

## Questions to ask on the first call

"Can you show similar work? What's the honest starting price? How long from brief to delivery? Do I own the files? What's your revision process?"`,
    faqs: [
      {
        q: "What's the most important factor?",
        a: 'Relevant proof — work and results for businesses like yours beats a flashy generic reel.',
      },
      {
        q: 'Should I choose local or national?',
        a: 'Location matters less than understanding your sector and delivering on time.',
      },
      {
        q: 'How do I know if the price is fair?',
        a: 'Compare against transparent from-prices and judge value, not just headline cost.',
      },
    ],
    related: [
      'video-production-cost-uk',
      'ai-vs-traditional-video-production',
      'video-marketing-by-sector',
    ],
  },
  {
    slug: 'tv-commercial-production-smb',
    title: 'Affordable TV Commercial Production UK: What a TV Advert Costs',
    description:
      'What a TV advert costs to produce in the UK in 2026, how small businesses keep TV commercial production costs down, and how AI and hybrid production get you on air.',
    keyword: 'affordable TV commercial production',
    tags: ['TVC', 'AI Video', 'Guides'],
    date: '2026-07-03',
    updated: '2026-10-28',
    coverFile: 'hf_20260712_233003_d25cc2f8-4b70-46f5-903a-43bc8e1a3d63.png',
    quickAnswer:
      'A TV advert has two separate costs: producing the commercial and buying the airtime. With AI and hybrid production, a broadcast-standard 30 to 60-second TV commercial from Moon Gleam starts from £3,999, including concept, script, storyboard, broadcast-ready delivery and social cutdowns, typically delivered in 2 to 3 weeks from approved script. Airtime is bought separately, and connected TV and streaming now let smaller UK businesses buy targeted slots rather than national campaigns.',
    body: `## What a TV advert costs in the UK: production vs airtime

When people ask how much a TV advert costs, they are usually asking two questions at once.

- **Production** is the cost of making the commercial: concept, script, storyboard, filming or AI generation, edit, grade, sound, voiceover and the broadcast master.
- **Airtime** is the cost of showing it. It is bought from broadcasters, streaming platforms or a media agency, and it depends on channel, region, time slot, audience and how many times the advert runs.

The two are budgeted separately. A small business can keep production lean and start with a modest, targeted airtime test, then scale what works.

## What affordable TV commercial production looks like in 2026

Traditional TV commercial production was priced for big brands: large crews, studio days, location fees and weeks of post-production. AI and hybrid workflows change the maths. Scenes that once needed a set, a location or a reshoot can be generated or extended, and editing, grading and voiceover move faster.

Our TVC / Campaign package starts from **£3,999** for a 30 to 60-second commercial. It includes:

- Full concept, script and storyboard.
- Live-action with models, fully AI-generated or hybrid production.
- Broadcast-ready technical delivery.
- Campaign cutdowns for social and web.

The final quote depends on filming days, talent, locations and the number of versions you need. See our [pricing page](/pricing) for every package, or our [UK video production cost guide](/blog/video-production-cost-uk) for what drives price across all video types.

| Option | Starts from | Typical turnaround | Best for |
|---|---|---|---|
| Social video pack | £499 | Within a week | Testing an idea on social before TV |
| Promotional video | £1,499 | 7 to 14 days | Website, YouTube and paid social |
| TVC / Campaign | £3,999 | 2 to 3 weeks from approved script | Broadcast and connected TV, plus cutdowns |

## How to keep TV commercial production costs down

1. **Start from one clear idea.** One message, one hook, one call to action. Every extra idea adds scenes, time and cost.
2. **Lock the script and storyboard before production.** Changes after filming or generation are the most expensive changes.
3. **Use AI where it adds value, film where trust matters.** Product hero shots, settings and stylised scenes suit AI. Real people, real premises and real products often suit live action. Hybrid gets the best of both. Our guide to [AI vs traditional video production](/blog/ai-vs-traditional-video-production) explains the trade-offs.
4. **Plan every version at the start.** A 30-second master, a shorter edit and vertical social cutdowns cost far less when they are planned into one production.
5. **Keep claims simple and provable.** Adverts must be cleared before broadcast. Claims you cannot evidence cause delays and re-edits.

## Is a TV commercial right for your business?

A TV commercial builds trust and reach quickly. It suits growing businesses, professional firms and local brands that want to look established next to bigger competitors. If your customers watch streaming TV, a targeted connected-TV campaign lets you reach a region or audience without paying for national coverage.

It is less suitable if you have no clear offer yet, or if your budget would leave nothing for airtime. In that case, start with a [promotional video](/services/business-promo-videos) or a [social video pack](/services/ugc-content) and move to TV when the message is proven.

## Can an AI-generated advert be shown on TV?

Yes, provided it meets broadcast technical standards and UK advertising rules like any other advert. TV adverts in the UK must be cleared before they air, so tell us your channel and airtime plans early. We plan the script, claims and supers with clearance in mind from day one.

## From idea to on air

1. **Scoping call** covering objective, audience, channels and airtime plans.
2. **Concept and script**, with one or more creative routes.
3. **Storyboard sign-off**, so every shot is agreed before production.
4. **Production**: filming, AI generation or both.
5. **Post-production**: edit, grade, sound mix, voiceover and graphics.
6. **Delivery** of the broadcast master plus social and web versions.

See TV commercials we have produced for retail, travel and charity clients on our [work page](/work), or read more about our [TV commercial production service](/services/tv-commercials).`,
    faqs: [
      {
        q: 'How much does a TV advert cost to produce in the UK?',
        a: 'Our TVC / Campaign package starts from £3,999 for a 30 to 60-second commercial, including concept, script, storyboard, broadcast-ready delivery and social cutdowns. The final cost depends on filming, talent, locations and versions. Airtime is bought separately.',
      },
      {
        q: 'Is airtime included in the production price?',
        a: 'No. Production and airtime are separate costs. Airtime is bought from broadcasters, streaming platforms or a media agency and depends on channel, region, slot and frequency.',
      },
      {
        q: 'How can a small business keep TV commercial production costs down?',
        a: 'Keep to one clear idea, lock the script and storyboard before production, use AI where it adds value and film where trust matters, and plan all versions and cutdowns at the start.',
      },
      {
        q: 'How long does TV commercial production take?',
        a: 'Typically 2 to 3 weeks from approved script to delivery.',
      },
      {
        q: 'Can an AI-generated advert be shown on UK TV?',
        a: 'Yes, provided it meets broadcast technical standards and UK advertising rules and is cleared before broadcast, like any other advert.',
      },
      {
        q: 'Do I need a big brand to advertise on TV?',
        a: 'No. Connected TV and streaming let smaller businesses buy targeted airtime by region or audience rather than national campaigns.',
      },
    ],
    related: [
      'video-production-cost-uk',
      'ai-vs-traditional-video-production',
      'what-is-ai-video-production',
    ],
  },
  {
    slug: 'ai-vs-traditional-video-production',
    title: 'AI vs Traditional Video Production: Which Is Right for You?',
    description:
      'AI vs traditional video production compared — cost, speed, quality and when to use each, so UK businesses can choose the right approach.',
    keyword: 'AI vs traditional video production',
    tags: ['AI Video', 'Video Production', 'Guides'],
    date: '2026-07-06',
    coverFile: 'hf_20260712_233029_94ae9073-c4a1-4855-994e-a534cf659a67.png',
    quickAnswer:
      'AI video production is faster and cheaper and excels at concepts, explainers and social content; traditional filming wins for authentic people, real locations and physical products. For most UK businesses, a hybrid of the two delivers the best result.',
    body: `## Head to head

| Factor | AI production | Traditional filming |
|---|---|---|
| Cost | Lower | Higher |
| Speed | Days | Weeks |
| Authenticity | Good, improving | Highest |
| Variations | Easy, cheap | Costly |
| Real people/places | Limited | Best |

## When AI is the right call

Concept films, explainers, product visuals, social content, and any project needing many variations or a fast turnaround on a tight budget.

## When filming still wins

Founder or customer testimonials, real location shoots, tactile product demos, and anything where genuine human presence is the whole point.

## Why hybrid usually wins

Film the moments that must be real; generate everything else. You get authenticity where it matters and speed and savings everywhere else — the approach Moon Gleam calls Creative AI.`,
    faqs: [
      {
        q: 'Is AI video cheaper than filming?',
        a: 'Generally yes — it removes crew, kit and studio costs.',
      },
      {
        q: 'Is traditional video still worth it?',
        a: 'Absolutely, for authentic people, locations and products. Often the best answer is hybrid.',
      },
      {
        q: 'How do I know which my project needs?',
        a: 'A short brief call is enough to recommend AI, filmed or hybrid.',
      },
    ],
    related: [
      'what-is-ai-video-production',
      'video-production-cost-uk',
      'how-to-choose-video-production-company',
    ],
  },
  {
    slug: 'video-marketing-by-sector',
    title: 'Video Marketing by Sector: Law, Accountancy, Charity, Education & Retail',
    description:
      'How video marketing works for UK law firms, accountants, charities, schools and shops — sector-specific ideas that build trust and win customers.',
    keyword: 'video marketing for small business',
    tags: ['Sectors', 'Video Marketing', 'Guides'],
    date: '2026-07-09',
    coverFile: 'hf_20260712_232959_595d745f-b15a-4f46-8fd3-5f37ca11d80c.png',
    quickAnswer:
      "The best video marketing speaks to a sector's specific buyer. A law firm needs trust; a charity needs emotion; a shop needs footfall. Matching format and message to your sector is what turns views into customers.",
    body: `## Law firms

Trust is everything. Use plain-English explainer videos ("What to do after an accident"), partner introductions, and client-story films (anonymised where needed). Avoid jargon; sound human.

## Accountancy firms

Answer the questions clients actually ask — tax deadlines, allowable expenses, switching accountants. Short "one answer" videos position you as the approachable expert.

## Charities

Lead with emotion and outcome. Documentary-style films showing real impact drive donations far better than statistics alone.

## Education

Recruitment and open-day videos, student stories and campus tours fill seats. Show the experience, not just the buildings.

## Retail, grocers and jewellers

Drive footfall and online orders with product videos, UGC-style tips and seasonal promos. Show the product in motion and make the next step obvious.`,
    faqs: [
      {
        q: 'Does video marketing work for professional services?',
        a: 'Yes — trust-led explainer and Q&A videos are ideal for law and accountancy.',
      },
      {
        q: 'What type of video suits a charity?',
        a: 'Documentary and impact stories that lead with emotion and a clear ask.',
      },
      {
        q: 'How can a local shop use video?',
        a: 'Product demos, UGC-style tips and seasonal promos for social and Google.',
      },
    ],
    related: [
      'ugc-content-explained',
      'promotional-videos-that-convert',
      'how-to-choose-video-production-company',
    ],
  },
  {
    slug: 'product-promotional-videos',
    title: 'Product Promotional Videos: Turning Browsers Into Buyers',
    description:
      'How product promotional videos increase online sales — what to show, ideal length, and where to place them to turn browsers into buyers.',
    keyword: 'product video production',
    tags: ['Product Video', 'E-commerce', 'Guides'],
    date: '2026-07-11',
    coverFile: 'hf_20260712_233023_e51ac888-9020-440e-9a0f-52fe9f27148f.png',
    quickAnswer:
      'A product promotional video turns browsers into buyers by showing the product in real use, answering objections, and making the next step obvious. On product pages, video routinely lifts conversion and reduces returns.',
    body: `## What a great product video shows

- The product **in use**, not just spinning on a plinth.
- The **benefit**, not only the feature.
- **Scale, texture and detail** a photo can't convey.
- A clear **call to action** — buy, book or enquire.

## Ideal length and format

15–30 seconds for social ads and product pages; up to 60 for a fuller demo. Always produce vertical cutdowns for Reels, TikTok and Shorts, and add captions for mute viewing.

## Where product videos work hardest

1. Product pages (lifts conversion, cuts returns).
2. Paid social ads (stops the scroll).
3. Marketplace and email.
4. In-store screens and QR codes.

## Common mistakes

Over-styling until it looks like a generic advert, hiding the product's real benefit, forgetting mobile-first vertical formats, and leaving out the CTA.`,
    faqs: [
      {
        q: 'Do product videos increase sales?',
        a: 'Yes — showing a product in use builds confidence and lifts conversion.',
      },
      {
        q: 'How long should a product video be?',
        a: '15–30 seconds for most placements; longer only for detailed demos.',
      },
      {
        q: 'Can AI produce product videos?',
        a: 'Yes — AI and hybrid production create polished product videos quickly and affordably.',
      },
    ],
    related: [
      'how-video-increases-conversion',
      'promotional-videos-that-convert',
      'ugc-content-explained',
    ],
  },
  {
    slug: 'restaurant-video-marketing',
    title: 'Restaurant Video Marketing UK: 5 Videos That Fill Tables',
    description:
      'Restaurant video marketing for UK restaurants, cafés and takeaways: the five videos to make first, where to post them, what they cost and how to brief them.',
    keyword: 'restaurant video marketing',
    tags: ['Restaurants', 'Video Marketing', 'Sectors'],
    date: '2026-07-24',
    updated: '2026-10-26',
    coverFile: '/blog/restaurant-video-marketing.webp',
    quickAnswer:
      'Restaurant video marketing is short, appetite-led video (dishes in motion, kitchen craft, the room and real diners) placed where people decide where to eat: Instagram, TikTok, your Google Business Profile, delivery apps and your booking page. Start with a signature-dish reel and a short ambience film, cut them vertically with captions, and give every video one action: book, order or visit.',
    body: `## What counts as restaurant video marketing

Restaurant video marketing is any video made to put diners in seats or orders through the kitchen door. For a UK restaurant, café, takeaway or bar it usually means five kinds of content:

- **Dish reels:** signature plates in motion, such as the pour, the flame or the slice.
- **Ambience films:** the room, the lighting, the music and the buzz that make people book for occasions.
- **Chef and owner stories:** who is behind the pass and why the food is worth travelling for.
- **Diner-style clips:** casual, phone-shot-style videos that feel like a recommendation rather than an advert.
- **Seasonal and offer promos:** Christmas menus, Valentine's Day, lunch deals, set menus and new openings.

The common thread is appetite first. A good restaurant video makes someone hungry within the first three seconds, then tells them exactly what to do about it.

## The 5 videos to make first

| Video | Where it works hardest | Job it does | Typical length |
|---|---|---|---|
| Ambience film | Website and booking page | Sells the occasion and gives the booking a final push | 30–60 sec |
| Signature-dish reels | Instagram, TikTok, Shorts | Builds appetite, shares and a local following | 10–20 sec |
| Google Business Profile clip | Google Search and Maps | Stands out when people search for somewhere to eat nearby | 10–30 sec |
| Seasonal or offer promo | Paid social and email | Fills quiet nights and sells event menus | 15–30 sec |
| Diner-style clips | Organic social and ads | Adds trust by feeling like a friend's tip | 15–30 sec |

Start with the two that match your biggest gap. Quiet midweek covers usually call for an offer promo and a stronger Google presence. A weak social following calls for dish reels and diner-style clips.

## Where to post restaurant video

- **Instagram and TikTok:** vertical 9:16, captioned, with the hook in the first second. Post dish reels consistently rather than one big film a year.
- **Google Business Profile:** add short clips of the food and the room. Many independent restaurants have photos but no video, so a good clip helps you stand out.
- **Your website and booking page:** place the ambience film next to the "Book a table" button, and keep it short and silent-friendly.
- **Paid social:** dish reels make strong ad creative because the product is the hook. Test two or three versions rather than one.
- **Delivery apps and in-venue screens:** short loops of best-sellers on menus, screens and window displays.

One production session can feed all of these placements if the edit is briefed with every platform in mind.

## What good food video gets right

1. **Food in motion.** Steam, pours, slices and sizzle trigger appetite in a way still photos can't.
2. **Warm, natural light.** Harsh overhead lighting flattens food on camera.
3. **Sound.** The sizzle, the clink and the hum of the room do half the selling when sound is on.
4. **Vertical, captioned and mobile-first.** Most viewers start on mute.
5. **Honest representation.** Show dishes as they are served. Portions, ingredients and prices in the video should match the menu.
6. **One call to action.** Book, order or visit, never all three at once.

## How to brief a restaurant video

Have these ready before the first call and the shoot or production day will go further:

- Your three best-selling or most photogenic dishes.
- Your quietest days or services, and what you want to fill them with.
- The occasion you want to own: date night, family Sunday, office lunch, late-night takeaway.
- Where the video will be used, so we can plan aspect ratios and lengths.
- Any brand assets: logo, fonts, colours, music you like.
- Practical details: opening hours, booking link, delivery partners and any dishes to avoid showing.

## Filmed, AI or hybrid?

For restaurants, real food usually matters most. We film your actual dishes, kitchen and room where authenticity is the point, and use AI where it saves time and budget: animated menu graphics, seasonal backdrops, extra versions and edits for each platform. Most restaurant projects end up hybrid. Read more in our guide to [AI vs traditional video production](/blog/ai-vs-traditional-video-production).

## What restaurant video costs

Our published starting prices are:

- **Social Pack from £499:** three short-form videos for Reels, TikTok and Shorts, typically delivered within a week.
- **Promo Video from £1,499:** one promotional film with script, storyboard, voiceover or music, and cutdowns for each platform, typically delivered in 7 to 14 days.

Filming days, multiple locations and extra versions change the price. Every project gets a written quote after a free call. See our [pricing page](/pricing) for what each package includes, or our [UK video production cost guide](/blog/video-production-cost-uk) for what drives the price.

## Measuring whether it works

Pick one number per video before you post it, so you know what to keep making:

- **Dish reels:** saves, shares and profile visits.
- **Google Business Profile clips:** calls, direction requests and website clicks in your profile's performance report.
- **Ambience film on the booking page:** bookings per visit, compared with the month before.
- **Offer promos:** redemptions of a code or a named offer.

## How we help restaurants

We produce restaurant video from brief to delivery: appetite-led concepts, dish reels, ambience films and seasonal promos, cut for the platforms where diners decide. See our [business promo video service](/services/business-promo-videos), our [UGC-style content service](/services/ugc-content) and the guide to [why UGC-style content works](/blog/ugc-content-explained). Tell us your quiet nights and your signature dishes, and we will recommend the videos that fill the gap. [Book a free call](/contact).`,
    faqs: [
      {
        q: 'Does video help restaurants get more bookings?',
        a: 'It can, when it reaches people while they are deciding where to eat: on Instagram, TikTok, Google and your booking page. Measure it: compare bookings, calls and direction requests before and after you start posting video.',
      },
      {
        q: 'What type of video works best for a restaurant on Instagram and TikTok?',
        a: 'Short vertical dish reels with the food in motion, captions and a hook in the first second, plus casual diner-style clips that feel like a recommendation.',
      },
      {
        q: 'How much does a restaurant promo video cost in the UK?',
        a: 'Our Social Pack starts from £499 for three short videos and our Promo Video from £1,499, including platform cutdowns. Every project gets a written quote after a free call.',
      },
      {
        q: 'How quickly can restaurant videos be produced?',
        a: 'Our Social Pack is typically delivered within a week and a Promo Video in 7 to 14 days, so seasonal promos can go out while the menu is still running.',
      },
      {
        q: 'Can you film our real dishes and kitchen, or is it all AI?',
        a: 'Both. We film your real dishes, kitchen and room where authenticity matters, and use AI for graphics, backdrops and extra versions. Most restaurant projects are hybrid.',
      },
    ],
    related: [
      'video-marketing-by-sector',
      'ugc-content-explained',
      'promotional-videos-that-convert',
    ],
  },
  {
    slug: 'explainer-video-production',
    title: 'Explainer Video Production UK: Process & Costs',
    description:
      'Explainer video production in the UK: styles compared, the six-step process, what drives cost (ours start from £1,499), timelines and how to brief a studio.',
    keyword: 'explainer video production',
    tags: ['Explainer Video', 'Video Production', 'Guides'],
    date: '2026-07-24',
    updated: '2026-10-17',
    coverFile: '/blog/explainer-video-production.webp',
    quickAnswer:
      'An explainer video is a short film, usually 30 to 90 seconds, that makes a product, service or process clear to someone who has never heard of it. Production follows six steps: brief, script, storyboard, production, edit and delivery. At Moon Gleam, explainer videos start from £1,499 and are typically delivered in 7 to 14 days once the script is signed off.',
    body: `## What an explainer video is (and when you need one)

Explainer video production is the craft of compressing something complicated into a short film that a stranger understands in under a minute. It is not a brand film and it is not an advert. Its only job is clarity: by the end, the viewer should know what you do, who it is for and what to do next.

You probably need one when:

- You are launching a **new service** that people don't yet have a mental model for.
- Your offer involves a **multi-step process**, such as a legal claim, a tax return, onboarding or a subscription.
- You sell a **considered purchase**, where confusion is the main reason people don't enquire.
- You need to **onboard** customers, staff or students the same way every time.

A simple test: if prospects regularly ask "so what exactly do you do?", an explainer is worth making before almost any other video.

## Types of explainer video

| Style | Best for | Feel | Watch-outs |
|---|---|---|---|
| Animated (2D / motion graphics) | Abstract services, processes, finance and legal | Clear, friendly, brand-led | Can feel generic without a strong visual style |
| AI-presenter or live-action | Trust-led services where a face helps | Human, direct, personal | Needs a natural script; stiff delivery kills trust |
| Screen or product walkthrough | Software, apps, online services | Practical, show-don't-tell | Must be re-cut when the interface changes |
| Hybrid | Most real-world briefs | The right tool scene by scene | Needs tighter direction to stay coherent |

There is no universally "best" style. Animate it if the offer is abstract, show a person if the offer depends on trust, and demonstrate it if the offer is visual.

## What goes into a great explainer

- **One idea.** The most common failure is trying to fit three messages into 60 seconds. Choose the one that matters most to the buyer.
- **A hook in the first three seconds.** Open with the problem your customer recognises, not your logo.
- **Problem, solution, proof, call to action.** A simple structure that keeps the viewer moving towards the next step.
- **Plain English.** Write for the ear, not the page. Short sentences, everyday words, no jargon.
- **Captions and sound design.** Most social viewing starts on mute, so the film must work silently. With sound on, voiceover and music should feel considered.
- **A single next step.** Book a call, get a quote, start a trial. One action, said and shown.

## How long should an explainer video be?

- **Social and paid ads:** 15 to 30 seconds, built around one benefit.
- **Homepage or landing page:** 60 to 90 seconds, covering the full problem-to-solution story.
- **Onboarding or how-to:** as long as the task needs, split into short chapters.

A useful rule of thumb is that a natural speaking pace is roughly 140 to 160 words per minute, so a 60-second explainer script is about 150 words. If your draft is 300 words, either the film is two minutes long or the message needs cutting.

## The explainer video production process, step by step

1. **Brief.** A short call to agree the offer, the audience, where the video will live and the one action you want viewers to take.
2. **Script.** A hook-led, benefit-first script, written to be heard. This is where most of the value is created, so it is signed off before anything else happens.
3. **Storyboard.** A scene-by-scene plan showing what is on screen against each line of the script. You approve the look before production starts.
4. **Production.** Animation, AI-generated scenes, AI-presenter footage, screen capture or filmed footage, depending on the agreed style.
5. **Edit.** Voiceover, music, captions, colour grade and sound design, followed by a review round.
6. **Delivery.** The master film plus cutdowns and aspect ratios for your website, social channels and ads.

Because sign-off happens at script and storyboard stage, changes are made when they are cheap, and there are few surprises at the end.

## How to brief an explainer video

You will get a better film, faster, if you can answer these before the first call:

- Who is the viewer, and what do they already know?
- What problem are they trying to solve when they find you?
- What is the one thing they must remember?
- What should they do after watching?
- Where will the video be used (website, ads, sales emails, social, events)?
- Do you have brand guidelines, fonts, colours or existing footage?
- Are there words, claims or visuals you must avoid, for example for regulatory reasons?

## How much does explainer video production cost in the UK?

Our explainer videos fall under our Promo Video package, which starts from **£1,499** (see [our pricing](/pricing)). That starting point includes script, storyboard and creative direction, AI, filmed or hybrid production, voiceover, music and sound design, and cutdowns for each platform.

What moves the price up or down:

- **Length and number of scenes.** More scenes means more to design, generate or film.
- **Style.** Custom character animation, filmed presenters and location work take longer than motion graphics or AI-generated scenes.
- **Voiceover.** A professional voice artist, multiple languages or celebrity voices change the budget.
- **Versions.** Extra aspect ratios, languages or audience-specific edits.
- **Usage.** Broadcast or large paid-media campaigns may need additional licensing for music or talent.

For a fuller breakdown of how video budgets work, read our [UK video production cost guide](/blog/video-production-cost-uk).

## How long does it take?

For our Promo Video package the typical timeline is **7 to 14 days**, assuming feedback is returned promptly at script and storyboard stage. Projects with filming, multiple languages or several stakeholders take longer, and we will give you a realistic schedule on the first call.

## Explainer videos by sector

- **Law firms:** plain-English process explainers, such as "what happens after you instruct us", that reassure anxious searchers. See our page on [video for law firms](/sectors/law-firms).
- **Accountants:** short one-answer clips on deadlines, allowable expenses or switching accountant. See [video for accountants](/sectors/accountants).
- **Software and tech:** product walkthroughs that show the core value quickly.
- **Education:** course, open-day and enrolment explainers. See [video for education](/sectors/education).

For more examples across industries, read our [video marketing by sector guide](/blog/video-marketing-by-sector).

## How we produce explainer videos

We handle explainer video production end to end: brief, script, storyboard, production, voiceover and edit, delivered with platform cutdowns. We use AI where it saves time and money, and human creative direction for the story, brand and final edit. One call is usually enough for us to recommend a style and give you a written quote and timeline. You can see the full scope of our [AI video production services](/services/ai-video-production) or [book a free call](/contact).`,
    faqs: [
      {
        q: 'How long should an explainer video be?',
        a: 'Usually 30 to 90 seconds. Social versions work best at 15 to 30 seconds; homepage explainers at 60 to 90 seconds. At a natural pace, 60 seconds is roughly 150 words of script.',
      },
      {
        q: 'How much does explainer video production cost in the UK?',
        a: 'Our explainers start from £1,499 as part of the Promo Video package. Price depends on length, style, voiceover and the number of versions. Every project gets a written quote after a free call.',
      },
      {
        q: "What's the difference between an animated and an AI or live-action explainer?",
        a: 'Animation suits abstract services and processes. AI-presenter or live-action suits trust-led offers where a human face helps. Many explainers are hybrid, choosing the right approach scene by scene.',
      },
      {
        q: 'How long does it take to produce an explainer video?',
        a: 'Typically 7 to 14 days for our Promo Video package once the script is signed off. Filming, multiple languages or many reviewers add time.',
      },
      {
        q: 'What do I need to provide?',
        a: 'Answers to a short brief (audience, problem, key message, call to action, where it will be used), plus any brand guidelines, logos or existing footage. We write the script.',
      },
      {
        q: 'Do explainer videos increase conversions?',
        a: 'They can, when they remove the confusion that stops people enquiring. The only reliable way to know for your site is to measure it: compare enquiry rates on the page before and after adding the video.',
      },
    ],
    related: [
      'video-production-cost-uk',
      'what-is-ai-video-production',
      'video-marketing-by-sector',
    ],
  },
  {
    slug: 'estate-agent-video-marketing',
    title:
      'Estate Agent Video Marketing: Property Video Tours That Sell Homes Faster (2026)',
    description:
      'Estate agent video marketing guide for UK agencies — the five property videos that win instructions, video vs 360° tours, real costs and turnaround times.',
    keyword: 'estate agent video marketing',
    tags: ['Property', 'Video Marketing', 'Sectors'],
    date: '2026-07-27',
    coverFile: '/blog/estate-agent-video-marketing.webp',
    quickAnswer:
      'Estate agent video marketing means using short property tour videos, agent intro and valuation videos, and social listing reels to win more instructions and sell or let homes faster. Listings with video attract more enquiries than photo-only listings, and vendors increasingly choose the agent whose marketing looks the part — which makes video as much a pitch-winning tool as a selling one.',
    body: `## What estate agent video marketing actually covers

Estate agent video marketing is every video an agency uses to win instructions and move property: cinematic tour films for the listings themselves, "just listed" reels for social, agent and area introductions that put a face to the brand, and market updates that keep you in a vendor's mind months before they instruct anyone.

The mistake most agencies make is treating video as a luxury reserved for the £1m+ listing. In 2026 it's the opposite: buyers scroll portals and social feeds the way they scroll everything else, and the listing that moves is the listing that gets the click, the share and the viewing request. The agency that shows vendors a video-led marketing pack wins the instruction over the one that shows a photo set.

## The five property videos every agent needs

- **Signature property tour** — a 60–90 second cinematic walkthrough of the home, led by light, flow and lifestyle rather than a room-by-room inventory. This is the film that makes a buyer book a viewing before they've read the floorplan.
- **"Just listed" social reel** — a vertical 15–30 second cutdown for Instagram, TikTok and Facebook that announces the listing where local buyers (and watching vendors) actually scroll.
- **Vendor valuation video** — a short film you send before or after a valuation appointment showing exactly how you'd market their home. Few agencies do this; the ones that do stand out immediately.
- **Agent and area intro** — you, your team and your patch. Vendors instruct people, not portals, and an area film doubles as evergreen content for every listing in that postcode.
- **Market-update explainer** — a monthly 60-second piece to camera or animated update on local prices and demand. It keeps your brand in front of would-be vendors for months before they're ready to move.

Start with the two that match your biggest gap: struggling to win instructions points to valuation and agent-intro videos; listings sticking on the market points to property tours and social reels.

## Why video wins more instructions, not just faster sales

Selling the house is only half the job — first you have to win the right to sell it. When a vendor invites three agents to value their home, the fees and the valuations are usually within touching distance. What separates the pitches is the marketing.

Turning up with a portfolio of property films — and a plan to make one for *their* home — reframes the conversation from "what will you charge?" to "look how you'll present my house". Video also compounds: every tour film you produce becomes proof in the next valuation pitch, every area film works for every future listing on that street, and every reel grows the local following that vendors quietly check before they call you.

For letting agents the same logic applies with a twist: a good tour video pre-qualifies applicants, cuts wasted viewings, and lets a property go under offer to a relocating tenant who never set foot in it.

## Property video vs a 360° virtual tour — what's the difference

They're different tools and agencies frequently conflate them. A **360° virtual tour** is a functional, self-guided walkthrough — the buyer controls it, clicks room to room and checks the layout. It answers "does this house work for me?". A **property video** is a directed, edited, music-and-motion film — it sells the feeling of living there and works everywhere a 360° tour can't: social feeds, ads, email and the top of the listing. It answers "do I want this house?".

The strongest listings use both, but if the budget covers one, the video wins more attention because it travels. A 360° tour waits to be clicked; a tour film goes out and finds buyers.

## What property video costs and how fast it ships

| Video type | Best use | Typical turnaround |
|---|---|---|
| "Just listed" social reel | Instagram, TikTok, Facebook launch | Days |
| Signature property tour | Portals, website, email to applicants | Under two weeks |
| Agent / area intro film | Valuation pitches, website, social | Under two weeks |
| Market-update explainer | Monthly social and email content | Days |
| Brand or TV-quality campaign | New developments, brand launches | Two to four weeks |

On price: our social video packs start from **£499**, full promotional films from **£1,499**, and TV-quality commercial production from **£3,999** — with platform cutdowns included, so one production covers the portal listing, Instagram, TikTok and your website. Speed matters more in property than almost any sector: a tour film delivered three weeks after launch has missed the listing's most-viewed window. Our full breakdown of what drives price is in our UK video production cost guide.

## Filmed, AI or hybrid — what fits property

Not every video needs a shoot. The property tour itself should be filmed — buyers are rightly sceptical of anything that misrepresents a real home. But market updates, area films, valuation explainers and brand content are ideal for Creative AI production — AI speed, human craft — which is how a monthly content programme stays affordable next to a one-off shoot. Most agency programmes end up hybrid: filmed tours for the stock, AI-assisted content for the brand.

## How we produce property video

We handle property video end to end, in-house: brief, script, shoot or AI production, edit, and cutdowns for portals, social and your website. For agencies we build repeatable systems rather than one-offs — a consistent tour format your negotiators can brief in minutes, plus a monthly content rhythm that keeps winning instructions between listings. Tell us your patch and your average stock, and we'll recommend the package that fits.`,
    faqs: [
      {
        q: 'Do property listings with video really sell faster?',
        a: 'Listings with video consistently attract more enquiries and viewing requests than photo-only listings, and better-qualified buyers arrive at viewings already sold on the feel of the home — which shortens time on market.',
      },
      {
        q: "What's the difference between a property video tour and a 360° virtual tour?",
        a: 'A 360° tour is a self-guided layout walkthrough the buyer controls; a property video is a directed, edited film that sells the lifestyle and works on social, in ads and at the top of the listing. The best listings use both.',
      },
      {
        q: 'How much does an estate agent property video cost in the UK?',
        a: 'Our social video packs start from £499, full promotional films from £1,499 and TV-quality production from £3,999, all with platform cutdowns. Every project gets a tailored quote on a free call.',
      },
      {
        q: 'Can you produce video for a whole portfolio of listings each month?',
        a: 'Yes — that’s how we prefer to work with agencies. A repeatable tour format plus a monthly content rhythm costs far less per video than one-off commissions and keeps quality consistent across your stock.',
      },
      {
        q: 'Do we need to film every property, or can some be AI or hybrid?',
        a: 'Property tours should be filmed — buyers need to trust what they see. Market updates, area films and brand content are ideal for Creative AI production, so most agency programmes are hybrid.',
      },
    ],
    related: [
      'video-marketing-by-sector',
      'video-production-cost-uk',
      'how-video-increases-conversion',
    ],
  },
  {
    slug: 'travel-tour-operator-video-marketing',
    title:
      'Travel & Tour Operator Video Marketing: Destination Videos That Fill Bookings (2026)',
    description:
      'Tour operator video marketing guide for UK travel brands — the five videos that fill bookings, filmed vs AI destination footage, real costs and turnarounds.',
    keyword: 'tour operator video marketing',
    tags: ['Travel', 'Video Marketing', 'Sectors'],
    date: '2026-07-29',
    coverFile: '/blog/travel-tour-operator-video-marketing.webp',
    quickAnswer:
      'Tour operator video marketing means using destination films, itinerary teasers and social reels to sell the feeling of a trip — the light, the pace, the atmosphere — so travellers book. Video communicates a destination faster than any brochure or photo gallery, and in 2026 it is what buyers expect to see before they pay for a holiday.',
    body: `## What tour operator video marketing actually is

Tour operator video marketing is every video a travel brand uses to turn browsers into bookers: cinematic destination films, itinerary and tour teasers, social reels, traveller stories and seasonal campaign cutdowns. It applies just as much to travel agencies, DMCs and destination brands as to operators — anyone whose product is a trip someone has to imagine before they can buy it.

That last part is the whole game. Nobody test-drives a holiday. A traveller pays hundreds or thousands of pounds for something they have only ever seen in your marketing — which means the brand that makes the destination *felt* wins the booking. Video is the only format that carries motion, sound, pace and atmosphere at once, and that's why travel is one of the sectors where video outsells everything else.

## The five videos every travel brand needs

- **Flagship destination film** — a 60–90 second cinematic film for a destination or signature trip. It anchors your website, tops the itinerary page and gives every ad and reel a source to cut from.
- **Itinerary / tour teaser** — a 30–45 second version of a specific package: the route, the highlights, the moments. This is the video that sits next to the "Enquire" button and pushes a considering buyer over the line.
- **"Book now" social reel** — vertical 15–30 second cutdowns for TikTok, Instagram Reels and YouTube Shorts, hook-first and captioned. Travel is one of the most-watched categories on short-form video; this is where new travellers discover you.
- **Traveller story** — a past guest's trip told in their words over real or recreated footage. It converts because it reads as a recommendation, not an advert.
- **Seasonal / offer campaign cutdown** — summer sale, early-bird, last-minute availability. Fast-turnaround versions of your flagship assets that fill departures in the windows that matter.

Start with the gap that costs you most: strong traffic but weak conversion points to itinerary teasers on your booking pages; a quiet top of funnel points to destination films and social reels.

## Why video sells trips photos can't

A photo shows a beach. A film shows the light moving across it, the sound of the water, the pace of the place — and lets a traveller rehearse the feeling of being there. That rehearsal is what a booking actually buys.

It matters most as trip value climbs. A £99 day tour can sell on a photo grid; a £3,000 multi-stop itinerary has to be *felt* before anyone commits, because the buyer's real question isn't "what will I see?" but "what will it be like?". Video also carries trust: an operator confident enough to show its destinations in motion looks established, and travellers quietly use production quality as a proxy for how well-run the trip will be. Motion holds attention longer on every platform too — which compounds into cheaper paid reach and more organic shares than photo posts earn.

## Filmed, AI-generated or hybrid — destination footage without flying a crew

The traditional blocker for travel video is obvious: your product is 3,000 miles away, and flying a crew there costs more than the campaign. In 2026 there are three ways round it:

1. **Filmed** — a crew on location. Unbeatable for authenticity when the destination is close, the budget allows, or you can capture trips already running.
2. **AI-generated** — cinematic destination footage built with Creative AI, directed and graded by humans. No flights, no permits, no weather risk, clearance-safe, and delivered in days. Ideal for destination films, teasers and campaign content across a wide portfolio of routes.
3. **Hybrid** — the usual answer. Real footage where you have it (guides, guests, unique moments — even good phone footage from trips), AI-generated scenes for the destinations and seasons you couldn't capture, one consistent grade across everything.

The practical difference is portfolio coverage. An operator selling 20 destinations could never afford 20 shoots; a hybrid programme can put a film on every itinerary page for a fraction of one traditional production.

## What travel video costs and how fast it ships

| Video type | Best use | Typical turnaround |
|---|---|---|
| "Book now" social reel | TikTok, Reels, Shorts, paid social | Days |
| Itinerary / tour teaser | Booking pages, email, ads | Under two weeks |
| Flagship destination film | Website, campaigns, trade shows | Under two weeks |
| Traveller story | Organic social, remarketing | Under two weeks |
| Seasonal campaign cutdown | Paid social and email pushes | Days |

On price: our social video packs start from **£499** and full promotional films from **£1,499**, with platform cutdowns included — so one production covers the itinerary page, TikTok, Instagram and your email campaigns. Speed is the quiet advantage: travel demand moves in windows, and a summer campaign film delivered in August is worthless. Creative AI production means seasonal content ships while the booking window is still open. The full breakdown of what drives price is in our UK video production cost guide.

## How we produce travel video

We take travel video from brief to delivery in-house: brief and goal, script and storyboard, then filmed, AI-generated or hybrid production, followed by edit, grade, sound design and cutdowns for every platform you sell on. Travel is one of our core sectors — you'll find work for **Bluestone Travel** and **Ansarey Travels** in our portfolio.

The most effective way to work with us isn't a one-off film but a rhythm: flagship destination films as the foundation, then a steady flow of teasers, reels and seasonal cutdowns built from them, timed to your booking windows. Tell us your destinations and your key seasons, and we'll recommend the videos that fill the gap.`,
    faqs: [
      {
        q: 'Does destination video actually increase travel bookings?',
        a: 'Yes — travellers buy trips on feeling, and video is the only format that carries motion, sound and atmosphere at once. Destination films and itinerary teasers placed on booking pages and social feeds reach buyers at the moment they decide, and consistently outperform photo-only marketing for engagement and enquiries.',
      },
      {
        q: 'Do you have to film abroad, or can travel video be made with AI?',
        a: 'You no longer have to fly a crew anywhere. We build cinematic AI-generated destination footage — directed, graded and clearance-safe — or blend it with real footage you already have from trips. Most travel projects end up hybrid.',
      },
      {
        q: 'How much does a travel or tour video cost in the UK?',
        a: 'Our social video packs start from £499 and full promotional films from £1,499, including platform cutdowns. Every project gets a tailored quote on a free call — see our UK video production cost guide for what drives price.',
      },
      {
        q: 'What video works best for selling tours and itineraries on social media?',
        a: 'Short vertical reels for TikTok, Instagram Reels and YouTube Shorts — hook in the first second, captioned, 15–30 seconds — plus itinerary teasers as ad creative for remarketing people who visited a trip page without enquiring.',
      },
      {
        q: 'Can you produce ongoing seasonal campaign videos, not just a one-off film?',
        a: 'Yes — that’s how travel video works best. Flagship destination films become the foundation, and we cut teasers, reels and seasonal offers from them in days, timed to your booking windows across the year.',
      },
    ],
    related: [
      'video-marketing-by-sector',
      'how-video-increases-conversion',
      'video-production-cost-uk',
    ],
  },
  {
    slug: 'dental-practice-video-marketing',
    title:
      'Dental Practice Video Marketing: How UK Practices Win More New Patients With Video (2026)',
    description:
      'Dental practice video marketing guide for UK practices — the five videos that win new patients, filmed vs AI treatment explainers, GDC/ASA compliance and real costs.',
    keyword: 'dental practice video marketing',
    tags: ['Dental', 'Video Marketing', 'Sectors'],
    date: '2026-07-31',
    coverFile: '/blog/dental-practice-video-marketing.webp',
    quickAnswer:
      'Dental practice video marketing works because choosing a dentist is a trust decision made locally: before anyone books a consultation, they want to see the practice, the faces and what treatment is really like. Meet-the-team films, treatment explainers, patient stories and social reels answer those questions faster than any web page — and because a single implant or Invisalign patient is worth thousands of pounds to a practice, even a modest lift in enquiries pays for the videos many times over.',
    body: `## What dental practice video marketing actually is

Dental practice video marketing is every video a practice uses to win and keep patients: meet-the-team and practice tour films, new-patient welcome videos, treatment explainers, patient stories and short social reels. Nobody chooses a dentist the way they choose a takeaway — it's a trust decision, made locally, usually after quietly researching who you are, what your practice looks like and what the treatment they're worried about actually involves. Video answers all three at once, which is why it converts nervous browsers into booked consultations better than any amount of text.

The commercial logic is stronger in dentistry than in almost any local sector. A practice competing on Invisalign, implants and cosmetic work is competing for patients whose treatment plans run into the thousands — so the practice whose marketing builds the most trust before the first phone call wins cases the others never even hear about. Most practices already pay for Google Ads and local SEO; video is what makes that traffic convert once it lands.

## The five videos every UK dental practice needs

- **Meet-the-team and practice tour** — the faces, the rooms, the atmosphere. Dental anxiety is real, and the single most reassuring thing you can show a prospective patient is that your practice is calm, modern and run by approachable people. This film belongs on your homepage and your Google Business Profile.
- **New-patient welcome ("what to expect")** — a short walkthrough of the first visit: where to park, who greets you, what the examination involves. It removes the unknowns that stop anxious patients booking, and it cuts front-desk questions too.
- **Treatment explainers** — one clear, calm video each for implants, Invisalign and whitening: what the treatment is, how long it takes, what it feels like. These sit on treatment pages, play in consultations and run as ads to people searching for exactly that treatment.
- **Patient story** — a real patient, with written consent, describing their experience and result in their own words. Nothing else carries the same weight with someone weighing up a big treatment plan.
- **Short social reels** — vertical 15–30 second cutdowns for Instagram, TikTok and Meta ads: smile transformations, day-in-the-practice moments, quick myth-busting from the dentist. This is where under-40s actually find their next practice.

Start with the gap that costs you most. If the phones are quiet, the team film and social reels build local visibility; if enquiries come in but don't convert to high-value treatment plans, treatment explainers and patient stories do the heavy lifting.

## Filmed vs AI dental video — which to use where

The team, the practice and the patients should be filmed. Trust is the product, and a prospective patient needs to see the real reception desk and the real dentist who'll treat them — a half-day shoot covers the tour, the welcome video and team pieces in one visit without disrupting a clinical day.

Treatment explainers are the opposite case. Filming chairside is disruptive, consent-heavy and rarely flattering — and what patients actually want is a clear picture of the process, not close-up clinical footage. AI-generated and animated explainers show how an implant or aligner works cleanly and calmly, are clearance-safe with no patient identifiable, and ship in days. We produce these with Creative AI — AI speed, human craft — then cut ad-length versions from the same material, so one explainer covers your treatment page, your consultation room and your Meta campaigns.

Most practice programmes end up hybrid: one filmed day for the human content, AI production for the explainers and the ongoing ad creative.

## Staying compliant: GDC and ASA advertising rules

Dental marketing in the UK sits under the General Dental Council's guidance on ethical advertising and the ASA's CAP Code, and video is no exception. The principles are plain:

- **Claims must be truthful and capable of substantiation** — avoid guarantees of results and absolute words like "painless" or "perfect".
- **Before-and-after material must be genuine and not misleading** — real cases, honest lighting, no retouching that flatters the result.
- **Patient testimonials need written consent** and must reflect the patient's genuine experience, not a script that oversells.

None of this makes video harder than any other marketing — it just needs to be built in at the script stage rather than patched at the edit. That's how we work: compliance considerations are part of the brief, so nothing reaches your channels that shouldn't. (This is general guidance, not legal or regulatory advice — the GDC and CAP websites carry the definitive rules.)

## What dental video marketing costs — and the ROI maths

| Video type | Best use | Typical turnaround |
|---|---|---|
| Social reel pack | Instagram, TikTok, Meta ads | Days |
| Meet-the-team / practice tour | Homepage, Google Business Profile | Under two weeks |
| Treatment explainer | Treatment pages, consultations, ads | Under two weeks |
| Patient story | Website, remarketing | Under two weeks |
| Brand / TV-quality film | Multi-site groups, campaigns | Two to four weeks |

On price: our social video packs start from **£499**, full promotional films from **£1,499**, and TV-quality commercial production from **£3,999** — with platform cutdowns included, so one production covers your website, Instagram, TikTok and your ad accounts. The full breakdown of what drives price is in our UK video production cost guide.

The maths is unusually kind to dentists. A single accepted implant or Invisalign plan is commonly worth more than an entire starter video package — so the question isn't whether video pays for itself, but how many high-value consultations it needs to influence per year to do so. For most practices the honest answer is: one or two.

## How to get started

You don't need a content strategy to start — you need one good production decision. A sensible first move:

1. **Pick your money treatment** — the one where a single new patient matters most.
2. **Book one filming half-day** — team, tour and welcome video captured in one visit.
3. **Add an AI treatment explainer** for that money treatment, with ad cutdowns.
4. **Put the films where decisions happen** — homepage, treatment page, Google Business Profile, and one always-on social ad.

We handle all of it in-house, from brief and script to filming, AI production, edit and cutdowns. Tell us your practice, your patient mix and the treatment you most want to grow, and we'll recommend the package that fits.`,
    faqs: [
      {
        q: 'How much does dental video marketing cost in the UK?',
        a: 'Our social video packs start from £499, full promotional films from £1,499 and TV-quality production from £3,999, all with platform cutdowns included. Every project gets a tailored quote on a free call — see our UK video production cost guide for what drives price.',
      },
      {
        q: 'What type of video gets a dental practice the most new patients?',
        a: 'For most practices, a meet-the-team and practice tour film converts best, because choosing a dentist is a trust decision and seeing the people and the place removes the biggest barrier to booking. Treatment explainers convert highest for specific high-value treatments like implants and Invisalign.',
      },
      {
        q: 'Can we use AI video for treatment explainers instead of filming?',
        a: 'Yes — and it is usually the better option. AI and animated explainers show how a treatment works clearly and calmly, need no chairside filming or patient consent, and ship in days. We recommend filming the team and practice, and using Creative AI for explainers and ad creative.',
      },
      {
        q: 'Are patient testimonial videos allowed under GDC and ASA rules?',
        a: 'Yes, provided the patient gives written consent and the testimonial reflects their genuine experience without misleading claims about results. We build these requirements in at the script stage so the finished video is compliant before it reaches your channels.',
      },
      {
        q: 'How long does it take to produce a dental practice video?',
        a: 'Social reels and ad cutdowns ship in days; practice tours, treatment explainers and patient stories typically deliver in under two weeks; TV-quality brand films take two to four weeks. A single filming half-day usually captures the tour, team and welcome videos together.',
      },
    ],
    related: [
      'video-marketing-by-sector',
      'video-production-cost-uk',
      'how-video-increases-conversion',
    ],
  },
];

/** All posts, newest first. */
export const posts: Post[] = rawPosts
  .map((p) => ({
    ...p,
    category: p.tags[0],
    cover: resolveCover(p.coverFile),
  }))
  .sort((a, b) => (a.date < b.date ? 1 : -1));

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

/** Resolve related-post slugs to full posts (skips any that no longer exist). */
export function getRelated(post: Post): Post[] {
  return post.related
    .map((slug) => posts.find((p) => p.slug === slug))
    .filter((p): p is Post => Boolean(p));
}

/** Human-readable British date, e.g. "9 July 2026". */
export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/** Rough reading time from the Markdown body (~200 wpm). */
export function readingTime(body: string): number {
  const words = body.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}
