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
 * Cover images are AI-generated stills the client owns, currently served from
 * CloudFront. They can later be localised into /public/blog and swapped here
 * without touching the page components.
 */
export type Faq = { q: string; a: string };

export type Post = {
  slug: string;
  title: string;
  description: string; // meta description
  keyword: string; // primary target keyword
  tags: string[];
  category: string; // first tag
  date: string; // ISO date (published)
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
    title: 'What Is AI Video Production? A 2026 Guide for UK Businesses',
    description:
      'AI video production explained for UK businesses — what it is, how it works, what it costs, and how to use it to win more customers in 2026.',
    keyword: 'AI video production',
    tags: ['AI Video', 'Video Production', 'Guides'],
    date: '2026-06-03',
    coverFile: 'hf_20260712_232957_78b34b4d-c0cd-4460-b8d2-87aba8b073ba.png',
    quickAnswer:
      'AI video production is the process of creating professional video content using artificial intelligence tools — for scripting, generating footage, voiceovers, editing and localisation — usually combined with human direction. For UK businesses it means broadcast-quality video in days instead of weeks, at a fraction of traditional cost.',
    body: `## What "AI video production" actually means

AI video production doesn't mean a robot makes your advert. It means using AI at the stages where it saves the most time and money — generating scenes, creating realistic voiceovers, producing variations for different platforms — while a human team directs the story, brand and edit. At Moon Gleam we call this **Creative AI**: AI speed, human craft.

## How the process works

1. **Brief.** A short call to understand your business, customer and goal.
2. **Script.** A hook-led script written to hold attention and drive action.
3. **Generate or shoot.** AI-generated scenes, filmed footage, or a hybrid.
4. **Edit.** Grade, sound design, captions and platform cutdowns.
5. **Deliver.** Final video plus versions for web, social, TV and ads.

## Why UK businesses are switching in 2026

- **Speed:** Most projects ship inside two weeks.
- **Cost:** No large crew or studio-day fees, so budgets stretch further.
- **Volume:** Easy to produce many variations for testing and different channels.
- **Quality:** Modern AI models produce broadcast-grade results when directed properly.

## When AI isn't the right tool

AI is superb for concepts, explainers, product visuals and social content. For a founder's authentic testimonial or a real location shoot, filming still wins — which is why the best studios offer both.`,
    faqs: [
      {
        q: 'Is AI video production suitable for small businesses?',
        a: "Yes — it's often most valuable for SMBs, because it delivers agency-quality video at a price a local shop, law firm or charity can justify.",
      },
      {
        q: 'Does AI video look fake?',
        a: 'Not when it’s directed well. Poor prompts produce generic clips; experienced direction, grading and sound design make it look premium.',
      },
      {
        q: 'How much does AI video production cost in the UK?',
        a: 'It varies by scope, but it’s typically far cheaper than a traditional shoot. See our UK video pricing guide.',
      },
      {
        q: 'Who owns the finished video?',
        a: 'You do. You receive full usage rights to the final delivered files.',
      },
    ],
    related: [
      'ai-vs-traditional-video-production',
      'video-production-cost-uk',
      'promotional-videos-that-convert',
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
    title: 'How Much Does Video Production Cost in the UK? (2026 Guide)',
    description:
      'A transparent 2026 guide to video production costs in the UK — what drives price, typical ranges, and how AI production lowers the bill.',
    keyword: 'video production cost UK',
    tags: ['Pricing', 'Video Production', 'Guides'],
    date: '2026-06-15',
    coverFile: 'hf_20260712_233028_4de2610b-265a-4109-89af-7f4d710bc5da.png',
    quickAnswer:
      'In the UK, professional video production typically ranges from a few hundred pounds for a simple AI-generated or social video to several thousand for a filmed brand film or TV commercial. AI and hybrid production have lowered entry prices dramatically in 2026.',
    body: `## What actually drives the price

- **Production type:** AI-generated, filmed, or hybrid.
- **Length and complexity:** Number of scenes, locations, actors.
- **Crew and kit:** Camera operators, lighting, sound, studio hire.
- **Post-production:** Editing, grading, motion graphics, voiceover.
- **Deliverables:** How many platform versions you need.

## Typical UK ranges (2026)

- **Social / AI-generated video:** £ hundreds.
- **Business promo / explainer:** low £ thousands.
- **Brand film / documentary:** mid £ thousands.
- **TV commercial (TVC):** varies widely; AI production has cut this significantly.

*(Ranges are indicative — always get a tailored quote.)*

## Why transparent pricing matters

Many UK agencies hide pricing to anchor you high. Owner-operators — law partners, accountants, shop owners — are sophisticated buyers who want a clear starting point. That's why Moon Gleam publishes honest from-prices and quotes every project on a free call.

## How to get more value from your budget

1. Shoot once, cut many — get platform versions from one production.
2. Use AI for concepts and variations, filming only where it adds authenticity.
3. Prioritise the hook and first 10 seconds over expensive extras.`,
    faqs: [
      {
        q: 'Why is video production so expensive traditionally?',
        a: 'Crew, kit, studio days and lengthy post-production add up. AI production removes much of that overhead.',
      },
      {
        q: 'Can I get a professional video on a small budget?',
        a: 'Yes — AI-generated and hybrid videos deliver professional results at SMB-friendly prices.',
      },
      {
        q: 'Do you offer fixed pricing?',
        a: 'We publish honest starting points and give a tailored quote per project — no hidden fees.',
      },
    ],
    related: [
      'ai-vs-traditional-video-production',
      'what-is-ai-video-production',
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
    title: 'TV Commercial Production for SMBs: You No Longer Need a £100k Budget',
    description:
      'How AI production makes TV commercials (TVCs) affordable for UK small businesses — what’s changed, what it costs, and how to get on air.',
    keyword: 'TV commercial production UK',
    tags: ['TVC', 'AI Video', 'Guides'],
    date: '2026-07-03',
    coverFile: 'hf_20260712_233003_d25cc2f8-4b70-46f5-903a-43bc8e1a3d63.png',
    quickAnswer:
      'TV commercial production used to cost tens of thousands because of crews, studios and post-production. In 2026, AI and hybrid production let UK small businesses produce broadcast-quality TVCs for a fraction of that — and connected TV makes airtime more accessible than ever.',
    body: `## What's changed

- **Production:** AI-generated scenes replace expensive shoots where suitable.
- **Post:** Faster editing, grading and voiceover.
- **Distribution:** Connected TV and streaming open affordable, targeted airtime.

## What makes a TVC work

A single memorable idea, a strong hook, brand consistency, and a clear call to action — produced to broadcast quality. The craft still matters; AI just lowers the cost of achieving it.

## Is a TVC right for your business?

TVCs build trust and reach fast. They suit growing SMBs, professional firms and local brands wanting authority. If your buyers watch streaming TV, a well-targeted TVC can punch far above its budget.

## From idea to on-air

1. Concept and script.
2. Storyboard sign-off.
3. AI generation and/or filming.
4. Edit, grade, sound, voiceover.
5. Broadcast-ready delivery in the right formats.`,
    faqs: [
      {
        q: 'How much does a TV commercial cost in the UK now?',
        a: 'Far less than the traditional tens of thousands — AI production has cut costs dramatically. Get a tailored quote.',
      },
      {
        q: 'Do I need a big brand to advertise on TV?',
        a: 'No. Connected TV makes targeted airtime accessible to smaller budgets.',
      },
      {
        q: 'How long does TVC production take?',
        a: 'Often a couple of weeks with AI and hybrid workflows, versus months traditionally.',
      },
    ],
    related: [
      'what-is-ai-video-production',
      'video-production-cost-uk',
      'ai-vs-traditional-video-production',
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
];

/** All posts, newest first. */
export const posts: Post[] = rawPosts
  .map((p) => ({
    ...p,
    category: p.tags[0],
    cover: `${COVER_BASE}${p.coverFile}`,
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
