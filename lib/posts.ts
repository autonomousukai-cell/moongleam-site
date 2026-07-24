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
  {
    slug: 'restaurant-video-marketing',
    title:
      'Restaurant Video Marketing: How UK Restaurants Fill Tables With Video (2026)',
    description:
      'Restaurant video marketing guide for UK restaurants — the five videos that fill tables, where to post them, what it costs and how fast we deliver.',
    keyword: 'restaurant video marketing',
    tags: ['Restaurants', 'Video Marketing', 'Sectors'],
    date: '2026-07-24',
    coverFile: '/blog/restaurant-video-marketing.webp',
    quickAnswer:
      'Restaurant video marketing means short, appetite-led video — dishes in motion, kitchen craft, ambience and reviews — placed where diners decide: Instagram, TikTok, Google Business Profile and your booking page. Done well, it lifts bookings, delivery orders and footfall, because people choose restaurants with their eyes before they ever read a menu.',
    body: `## What counts as restaurant video marketing

Restaurant video marketing is any video made to put diners in seats or orders in the kitchen. In practice that means five kinds of content:

- **Menu and dish reels** — signature dishes in motion: the pour, the flame, the cheese pull.
- **Ambience films** — the room, the music, the buzz; the reason people book for occasions.
- **Chef and owner story** — who's behind the pass and why the food is worth crossing town for.
- **UGC-style diner clips** — casual, phone-shot-feel videos that read as recommendations, not adverts.
- **Seasonal and offer promos** — Christmas menus, Valentine's, lunch deals, new openings.

The common thread: appetite first. A great restaurant video makes someone hungry within three seconds, then tells them exactly what to do about it.

## The 5 videos every restaurant should have

| Video | Where it works hardest | What it does |
|---|---|---|
| Hero ambience film | Website / booking page | Sells the occasion; converts lookers into bookers |
| Signature-dish reels | Instagram & TikTok | Builds appetite and following; earns shares |
| Google Business Profile clip | Google Maps / local search | Wins the "restaurants near me" decision moment |
| Seasonal / offer promo | Paid social & email | Fills quiet periods and event bookings |
| UGC-style diner clips | Organic social & ads | Adds trust; feels like a friend's recommendation |

Start with the two that match your biggest gap: quiet midweek covers usually means promos and Google presence; a weak social following means dish reels and UGC-style clips.

## Where to put restaurant video

- **Instagram and TikTok** — vertical, captioned, hook in the first second. This is where local food discovery happens in 2026.
- **Google Business Profile** — most restaurants still have zero video here, so one good clip stands out immediately in local search.
- **Your website and booking page** — an ambience film next to the "Book a table" button gives the booking a final push.
- **Paid social** — dish reels make unusually strong ad creative because the product *is* the hook.
- **Delivery platforms and in-store screens** — short loops that lift order value and keep queues patient.

One production session can feed all five placements — brief the edit with every platform in mind.

## What great food video gets right

1. **Food in motion.** Steam, pours, slices, sizzle — movement triggers appetite in a way stills can't.
2. **Natural, warm light.** Harsh overhead lighting kills food on camera.
3. **Sound design.** The sizzle and the room's hum do half the selling.
4. **Vertical, mobile-first, captioned.** Most viewers are scrolling on mute.
5. **One clear call to action.** Book, order or visit — never all three at once.

## How much restaurant video marketing costs (and how fast)

Restaurant video marketing is far more affordable than most owners expect. Our social video packs start from **£499**, and a full promotional film from **£1,499** — with platform cutdowns so one production covers Instagram, TikTok, Google and your website. Because we produce with Creative AI — AI speed, human craft — delivery is measured in days, not the weeks a traditional crew shoot takes. That matters in hospitality: a seasonal menu promo is worthless if it arrives after the season.

## How we help restaurants

We produce restaurant video from brief to delivery in-house: appetite-led concepts, dish reels, ambience films and seasonal promos, all cut for the platforms where diners actually decide. Hospitality is one of our core sectors — you'll find work like **Cuisine Artist** in our portfolio. Tell us your quiet nights and your signature dishes, and we'll recommend the videos that fill the gap.`,
    faqs: [
      {
        q: 'Does video marketing actually bring in more restaurant bookings?',
        a: 'Yes — diners choose with their eyes. Appetite-led video on Instagram, TikTok, Google Business Profile and your booking page reaches people at the exact moment they decide where to eat, and it consistently outperforms photos for engagement and shares.',
      },
      {
        q: 'What type of video works best for a restaurant on Instagram and TikTok?',
        a: 'Short vertical dish reels — food in motion, captioned, with a hook in the first second — plus UGC-style diner clips that feel like recommendations rather than adverts.',
      },
      {
        q: 'How much does a restaurant promo video cost in the UK?',
        a: 'Our social video packs start from £499 and full promotional films from £1,499, including platform cutdowns. Every project gets a tailored quote on a free call.',
      },
      {
        q: 'How quickly can we get restaurant videos produced?',
        a: 'Days, not weeks. Creative AI production means seasonal promos and dish reels arrive while the season — or the new menu — is still live.',
      },
      {
        q: 'Can you film our real dishes and kitchen, or is it all AI?',
        a: 'Both. We film where authenticity matters — your real dishes, kitchen and room — and use AI where it saves time and budget. Most restaurant projects are hybrid.',
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
    title:
      'Explainer Video Production: The UK Business Guide to Videos That Sell the Idea',
    description:
      'Explainer video production for UK businesses — what explainers are, the styles compared, the step-by-step process, real costs and typical timelines.',
    keyword: 'explainer video production',
    tags: ['Explainer Video', 'Video Production', 'Guides'],
    date: '2026-07-24',
    coverFile: '/blog/explainer-video-production.webp',
    quickAnswer:
      'An explainer video is a short (30–90 second) video that makes a product, service or process instantly clear — usually a scripted story with visuals, voiceover and captions. Explainer video production works because it turns a complex offer into one obvious benefit and one clear next step, which is why explainers sit on the highest-converting pages of the web.',
    body: `## What an explainer video is (and when you need one)

Explainer video production is the craft of compressing something complicated into a short video a stranger understands in under a minute. You need one when:

- You're launching a **new service** people don't yet have a mental model for.
- Your offer involves a **complex process** — legal claims, tax planning, onboarding.
- You sell a **high-consideration purchase** where confusion kills conversion.
- You need to **onboard** new customers, staff or students consistently.

If prospects regularly ask "so what exactly do you do?", an explainer pays for itself quickly.

## Types of explainer video

| Style | Best for | Feel |
|---|---|---|
| Animated | Abstract services, processes, finance & legal | Clear, friendly, brand-led |
| AI-presenter / live-action | Trust-led services where a face helps | Human, direct, personal |
| Screen / product walkthrough | Software, apps, online services | Practical, show-don't-tell |
| Hybrid | Most real-world briefs | Best of each, scene by scene |

There's no universally "best" style — the right choice depends on whether your offer is abstract (animate it), trust-driven (show a person) or visual (demonstrate it).

## What goes into a great explainer

- **One idea.** The single most common failure is cramming three messages into 60 seconds.
- **A hook in the first 3 seconds** — the problem your customer recognises instantly.
- **Problem → solution → proof → CTA.** The structure that has sold ideas for a century.
- **Plain English.** If a 12-year-old can't follow it, neither can a busy decision-maker.
- **Captions and sound design.** Watched on mute, it must still work; with sound, it must feel premium.

## The explainer video production process, step by step

1. **Brief.** A short call: your offer, your customer, the one action you want.
2. **Script.** Hook-led, benefit-first, written for the ear, not the page.
3. **Storyboard.** Scene-by-scene sign-off before anything is produced.
4. **Generate or shoot.** Animation, AI-presenter scenes, screen capture or filmed footage.
5. **Edit.** Voiceover, music, captions, grade and sound design.
6. **Deliver.** The master film plus cutdowns for your website, social channels and ads.

Because sign-off happens at script and storyboard stage, revisions are cheap and late surprises are rare.

## How much does explainer video production cost in the UK?

Our explainer video production starts from **£1,499**. The main cost drivers are length, style (animation and AI-presenter work price differently), the number of platform versions, and voiceover requirements. Traditional agencies often quote five figures and months of lead time for the same brief; Creative AI production — AI speed, human craft — delivers in days, at a price a UK SMB can justify, without the quality trade-off.

## Explainer videos by sector

- **Law firms:** "What to do after an accident" and plain-English process explainers that turn anxious searchers into enquiries.
- **Accountancy:** one-answer clips — deadlines, allowable expenses, switching accountants — that position you as the approachable expert.
- **SaaS and tech:** product walkthroughs that show the value in 60 seconds flat.
- **Education:** course, open-day and enrolment explainers that fill seats.

We've covered how video works across these industries in our sector guide — the explainer is usually the first video each of them should make.

## How we produce explainer videos

We handle explainer video production end to end, in-house: brief, script, storyboard, production, voiceover and edit, delivered with platform cutdowns. One call is enough for us to recommend the right style — animated, AI-presenter, walkthrough or hybrid — and give you an honest quote and timeline.`,
    faqs: [
      {
        q: 'How long should an explainer video be?',
        a: '30–90 seconds. Under 30 rarely explains enough; over 90 loses viewers before the call to action. Homepage explainers sit best at 60–75 seconds.',
      },
      {
        q: 'How much does explainer video production cost in the UK?',
        a: 'Our explainers start from £1,499. Price varies with length, style and the number of platform versions — every project gets a tailored quote on a free call.',
      },
      {
        q: "What's the difference between an animated and an AI/live-action explainer?",
        a: 'Animation suits abstract services and processes; AI-presenter or live-action suits trust-led offers where a human face helps. Many of the best explainers are hybrid.',
      },
      {
        q: 'How long does it take to produce an explainer video?',
        a: 'Days, not months. With script and storyboard signed off, Creative AI production typically delivers the finished film and cutdowns inside two weeks.',
      },
      {
        q: 'Do explainer videos actually increase conversions?',
        a: 'Yes — a clear explainer on a landing or service page routinely lifts conversion, because it removes the confusion that stops people enquiring.',
      },
    ],
    related: [
      'how-video-increases-conversion',
      'video-marketing-by-sector',
      'video-production-cost-uk',
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
