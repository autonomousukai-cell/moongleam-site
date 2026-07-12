/**
 * Moon Gleam content data — company portfolio (YouTube IDs), services, sectors, FAQs.
 * COMPANY VOICE ONLY: no personal history, no individual credentials.
 * All clients listed are evidenced by the Moon Gleam portfolio catalogue.
 */

export type Sector =
  | 'legal'
  | 'accountancy'
  | 'charity'
  | 'education'
  | 'retail'
  | 'travel'
  | 'universal';

export type Category =
  | 'tvc'
  | 'documentary'
  | 'animation'
  | 'film'
  | 'ugc'
  | 'education'
  | 'charity'
  | 'brand';

export const categories: Record<Category, string> = {
  tvc: 'TVC & Commercials',
  documentary: 'Documentary',
  animation: 'Kids Animation',
  film: 'Short Film',
  ugc: 'UGC & Social',
  education: 'Education',
  charity: 'Charity',
  brand: 'Brand Films',
};

export const sectorLabels: Record<Sector, string> = {
  legal: 'Legal',
  accountancy: 'Accountancy',
  charity: 'Charity',
  education: 'Education',
  retail: 'Retail',
  travel: 'Travel',
  universal: 'Universal',
};

export type WorkItem = {
  id: string; // YouTube video id
  title: string;
  cat: Category;
  sector: Sector;
};

export const portfolio: WorkItem[] = [
  // TVC & Commercials
  { id: 'kQKz4nE7ZxM', title: 'Bombay Jewellers — Live-Action TVC', cat: 'tvc', sector: 'retail' },
  { id: 'agn6nuD_m_8', title: 'Lawmatic Solicitors — Ad Campaign', cat: 'tvc', sector: 'legal' },
  { id: 'pYGiJi86zIw', title: 'Grameen Grocery — Live-Action TVC', cat: 'tvc', sector: 'retail' },
  { id: 'qCTupFehy2o', title: 'Bazar Shodai — Live-Action TVC', cat: 'tvc', sector: 'retail' },
  { id: 'P2bAOlB58n8', title: 'RK Motors London — Animated Automotive TVC', cat: 'tvc', sector: 'retail' },
  { id: '4HF3_eWN0sU', title: 'Cuisine Artist — Cinematic Website TVC', cat: 'tvc', sector: 'retail' },
  { id: 'FITzMRpaLHs', title: 'Cuisine Artist — Ramadan Festive TVC', cat: 'tvc', sector: 'retail' },
  { id: 'HtkYON-hXeU', title: 'Bluestone Travel — Website Promo TVC', cat: 'tvc', sector: 'travel' },
  { id: 'Nm2uEJ6Q12M', title: 'Bluestone Travel — Istanbul Wonder TVC', cat: 'tvc', sector: 'travel' },
  { id: 'tXVrzlzWQXg', title: 'Bluestone Travel — Istanbul Holiday TVC', cat: 'tvc', sector: 'travel' },
  { id: 'FePvzaK-NqI', title: 'Ansarey Travels — Umrah & Seerah Tour TVC', cat: 'tvc', sector: 'travel' },

  // Documentary
  { id: 'wsVu1zJFt-k', title: "Lord Lucan — Britain's Most Mysterious Disappearance", cat: 'documentary', sector: 'universal' },
  { id: 'K4yxkk8cgkE', title: 'The Unsung Heroes Who Broke the Enigma Code', cat: 'documentary', sector: 'universal' },
  { id: 'H_6mJKLUOhQ', title: "The Zodiac Killer — History's Most Elusive Mystery", cat: 'documentary', sector: 'universal' },
  { id: 'fqQ3x-bgi1M', title: 'The Shroud of Turin — An Unsolvable Mystery', cat: 'documentary', sector: 'universal' },
  { id: 'Ld7SBS6ciVM', title: 'The 72-Second Message — The "Wow!" Signal', cat: 'documentary', sector: 'universal' },
  { id: 'Dt_YFOTutI4', title: 'Mystery in History — Official Series Trailer', cat: 'documentary', sector: 'universal' },

  // Kids Animation
  { id: 'EIaa0ZCCyYM', title: '3D Animation Studio — Kids Educational Shorts', cat: 'animation', sector: 'education' },
  { id: '8ZyytmwOn6w', title: 'Salaam Kids — Animated Theme Song', cat: 'animation', sector: 'education' },
  { id: 'rJ8AD-ZHOuI', title: 'The Elephant Army & The Tiny Birds — Kids Story', cat: 'animation', sector: 'education' },
  { id: 'te9Xzb-VCvo', title: 'Prophet Yunus and the Whale — Kids Story', cat: 'animation', sector: 'education' },
  { id: 'kstRbHVoh_s', title: 'The Leader Who Cared — Story of Umar RA', cat: 'animation', sector: 'education' },

  // Short Film & Drama
  { id: '-knjWaN1Xvs', title: 'The Villain Files — Series Intro Trailer', cat: 'film', sector: 'universal' },
  { id: 'qSGqVKzREdQ', title: "TIME'S UP — Official Short Film Trailer", cat: 'film', sector: 'universal' },
  { id: 'Djv3gufkmmo', title: 'The Story of Iblis — The Villain Files Ep. 1', cat: 'film', sector: 'universal' },
  { id: 'ZDiHp1DBG2g', title: 'Story of Firaun — The Villain Files Ep. 2', cat: 'film', sector: 'universal' },

  // UGC & Social
  { id: '12AV3J4zWdw', title: 'Syed Arif & Co — Professional Services Promo', cat: 'ugc', sector: 'accountancy' },
  { id: 'g9ND48yyqJY', title: 'Lead-Gen Video for Professional Services', cat: 'ugc', sector: 'legal' },
  { id: 'QJAUCmecwsg', title: 'Social Media Marketing for Restaurants', cat: 'ugc', sector: 'retail' },
  { id: 'U6ADvdX701A', title: 'AI Animal Podcast — Studio Showcase', cat: 'ugc', sector: 'universal' },
  { id: 'BVAWfIbwXfI', title: 'AI Just Broke the Rules — Product Promo', cat: 'ugc', sector: 'universal' },

  // Education
  { id: 'Afe2qXdodRM', title: 'QNS Academy — Knowledge City Brand Film', cat: 'education', sector: 'education' },
  { id: 'lQdmf1Z976M', title: 'QNS Academy — Building an Online University', cat: 'education', sector: 'education' },
  { id: 'eTOTPPhikK4', title: 'Selling Books with Video — Book Promo', cat: 'education', sector: 'education' },
  { id: 'N4eSoP_giWs', title: 'High-Converting Promos for Kids Courses', cat: 'education', sector: 'education' },

  // Charity
  { id: 'yubYJ8DIjRQ', title: 'HRF Winter Souk — AI-Powered Charity TVC', cat: 'charity', sector: 'charity' },
  { id: 'mqhDbEQQcC0', title: 'QNS Al-Khayr — Fully AI-Powered Campaign', cat: 'charity', sector: 'charity' },
  { id: 'TWrylGu6dmc', title: 'Non-Profit Video Marketing', cat: 'charity', sector: 'charity' },
  { id: 'OAYTsJmJgjI', title: 'Short-Form Charity Campaigns', cat: 'charity', sector: 'charity' },

  // Brand Films
  { id: 'x9c5L7DncWk', title: 'Moon Gleam — The Future of Media is Powered by AI', cat: 'brand', sector: 'universal' },
  { id: 'P1PCjWxa5Jo', title: 'Netflix-Quality Ads, Made by AI', cat: 'brand', sector: 'universal' },
  { id: 'S_wyLW4sjeI', title: 'Moon Gleam — Brand Video', cat: 'brand', sector: 'universal' },
  { id: '62y12g4qK34', title: 'The Voice of Oneness — TV Show Title Intro', cat: 'brand', sector: 'universal' },
];

export const ytThumb = (id: string) => `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

/* ============ CLIENTS — Moon Gleam portfolio projects only ============ */
export const clients = [
  'Bombay Jewellers', 'Lawmatic Solicitors', 'Bluestone Travel', 'Ansarey Travels',
  'RK Motors London', 'Cuisine Artist', 'Grameen Grocery', 'Bazar Shodai',
  'QNS Academy', 'HRF', 'QNS Al-Khayr', 'Syed Arif & Co',
];

/* ============ SERVICES ============ */
export type Service = {
  slug: string;
  name: string;
  short: string;
  desc: string;
  points: string[];
  cat: Category;
  sector: Sector;
};

export const services: Service[] = [
  {
    slug: 'ai-video-production',
    name: 'AI-Powered Video Production',
    short: 'Broadcast-quality video without the broadcast budget — fully AI, filmed, or hybrid.',
    desc: 'Broadcast production standards combined with the latest creative AI. Fully AI-generated, traditionally filmed with real models, or a hybrid of both — the studio recommends the right route for your goal and budget, and delivers cinema-grade results at a fraction of traditional cost and time.',
    points: ['Fully AI, filmed or hybrid production', 'Script, storyboard and creative direction included', 'Broadcast-standard grade, sound and finish', 'Delivered in days, not months'],
    cat: 'brand',
    sector: 'universal',
  },
  {
    slug: 'business-promo-videos',
    name: 'Business Promotion Videos',
    short: 'Promo films that make local customers choose you over the competitor next door.',
    desc: "A promo video is the hardest-working asset a UK business can own — on your website, your Google profile, your socials and your ads. We script it around what makes customers pick you, then produce it to a standard your competitors can't match.",
    points: ['Built for website, Google Business and social ads', 'Scripted around your real differentiators', 'AI-powered speed: days from brief to delivery', 'Cutdowns included for every platform'],
    cat: 'ugc',
    sector: 'universal',
  },
  {
    slug: 'product-promo-videos',
    name: 'Product Promotional Videos',
    short: 'Make your product the hero — jewellery, food, retail, anything worth showing off.',
    desc: 'From gold jewellery to grocery ranges, we make products look irresistible. Cinematic lighting, motion and sound design that gives a local shop the production value of a national brand.',
    points: ['Cinematic product shots — AI or filmed', 'Perfect for launches, offers and seasonal pushes', 'Versions for TV, web, social and in-store screens', 'Fast turnaround for time-sensitive promotions'],
    cat: 'tvc',
    sector: 'retail',
  },
  {
    slug: 'tv-commercials',
    name: 'TV Commercials (TVC)',
    short: 'Broadcast-standard TVCs — concept to clearance-ready delivery.',
    desc: 'Every commercial is produced to broadcast technical and creative standards — fully AI-generated, filmed with real models, or hybrid. The studio handles the full pipeline from concept and script to clearance-ready delivery.',
    points: ['Broadcast-standard production and delivery', 'Fully AI, live-action with models, or hybrid', 'Concept, script, storyboard and direction included', 'TVC experience across retail, travel, legal and charity'],
    cat: 'tvc',
    sector: 'universal',
  },
  {
    slug: 'ugc-content',
    name: 'UGC & Social Content',
    short: 'Authentic, scroll-stopping content that feels native and converts.',
    desc: 'UGC-style videos that feel real, not corporate — ideal for social ads, awareness and engagement. Produced quickly and affordably in batches, so your brand stays active every week without draining your time.',
    points: ['Native-feel content for TikTok, Reels, Shorts', 'Batch production for consistent posting', 'Hooks and captions engineered for retention', 'Monthly content packages available'],
    cat: 'ugc',
    sector: 'universal',
  },
  {
    slug: 'documentary',
    name: 'Documentary',
    short: 'Long and short-form documentary with authority, research and cinematic storytelling.',
    desc: 'From brand documentaries to full historical series, the studio handles research, scripting, narration and the complete edit. Our AI-powered documentary series prove the format: cinema-grade storytelling produced at a pace traditional crews cannot match.',
    points: ['Brand, heritage and story documentaries', 'Full research and scripting included', 'AI-powered archive-style visuals', 'Series and episodic formats'],
    cat: 'documentary',
    sector: 'universal',
  },
  {
    slug: 'kids-animation',
    name: 'Kids Animation',
    short: '3D animated stories, songs and educational content children actually watch.',
    desc: 'Pixar-style 3D animation for education brands, publishers and channels. Characters, songs and stories crafted for young audiences — with the pace and polish of a major studio, at a fraction of the cost.',
    points: ['3D character animation and songs', 'Educational storytelling for young audiences', 'Series production for channels and courses', 'Safe, values-driven content'],
    cat: 'animation',
    sector: 'education',
  },
  {
    slug: 'short-film',
    name: 'Short Film & Drama',
    short: 'Narrative shorts with cinematic direction, performance and pacing.',
    desc: 'Story-first filmmaking: narrative shorts, drama and cinematic series with real direction behind every frame — developed, scripted and produced end to end in-house.',
    points: ['Narrative development and scripting', 'Cinematic direction and pacing', 'AI-powered production design', 'Festival and broadcast-ready delivery'],
    cat: 'film',
    sector: 'universal',
  },
];

/* ============ SECTOR PAGES ============ */
export type SectorPage = {
  slug: string;
  name: string;
  short: string;
  desc: string;
  sector: Sector;
  proof: string;
};

export const sectorPages: SectorPage[] = [
  {
    slug: 'law-firms',
    name: 'Law Firms & Solicitors',
    short: "Video that wins clients' trust before they ever call your office.",
    desc: 'Legal clients choose the firm that feels most credible. A professional video on your website and Google profile does that job around the clock — explaining your services in plain English while looking every bit the established firm. Our solicitor campaigns are built to turn searches into consultations.',
    sector: 'legal',
    proof: 'Lawmatic Solicitors ad campaign · professional services lead-gen films',
  },
  {
    slug: 'accountants',
    name: 'Accountancy Firms',
    short: 'Turn a trust-based service into a visible, referable brand.',
    desc: 'Accountancy is bought on trust and referral — video multiplies both. Client-facing explainers, firm profiles and social content that make you the obvious choice when a business owner needs an accountant.',
    sector: 'accountancy',
    proof: 'Syed Arif & Co — professional services brand films',
  },
  {
    slug: 'charities',
    name: 'Charities & Non-Profits',
    short: 'Campaign films that move donors — at a budget that protects your cause.',
    desc: 'Donation campaigns live or die on emotion. AI-powered production means charities get broadcast-grade campaign films — winter appeals, Ramadan campaigns, fundraising events — without spending donor money on a film crew.',
    sector: 'charity',
    proof: 'HRF Winter Souk TVC · QNS Al-Khayr campaign',
  },
  {
    slug: 'education',
    name: 'Education & Training',
    short: 'Course promos, brand films and kids content that fill classrooms.',
    desc: 'From online academies to kids courses, the studio produces the full stack: brand films that sell the institution, promos that sell the course, and animated content that keeps young learners engaged.',
    proof: 'QNS Academy brand film · kids course promos · 3D educational animation',
    sector: 'education',
  },
  {
    slug: 'retail',
    name: 'Retail, Grocers & Jewellers',
    short: 'TVCs and promos that bring footfall through your door.',
    desc: 'Local retail is a footfall game. Our live-action and AI-generated TVCs for jewellers, grocers and restaurants put local shops on screens looking like national brands.',
    sector: 'retail',
    proof: 'Bombay Jewellers TVC · Grameen Grocery · Bazar Shodai · Cuisine Artist',
  },
  {
    slug: 'travel',
    name: 'Travel & Tour Operators',
    short: 'Destination films that sell the holiday before the customer books.',
    desc: 'Travel is sold on the dream. AI-powered destination commercials — Istanbul, Antalya, Umrah packages — give tour operators cinematic campaign films for every route and season, produced in days.',
    sector: 'travel',
    proof: 'Bluestone Travel TVC series · Ansarey International Travels',
  },
];

/* ============ FAQ — company voice ============ */
export const faqs = [
  { q: 'How much does a video cost?', a: 'Transparent starting points: social packs from £499, promotional videos from £1,499, broadcast TVCs from £3,999. Every project gets a tailored written quote after a free 15-minute call — no obligation, no hidden fees.' },
  { q: 'How fast can you deliver?', a: 'Days, not months. A social pack ships within a week; a promotional video typically takes 7–14 days; a full TVC 2–3 weeks from approved script. Hard deadline? Tell us — we build the timeline around it.' },
  { q: 'AI, filmed, or hybrid — which do I need?', a: 'It depends on the job. Fully AI is fastest and most affordable — ideal for promos, explainers and destination films. Live-action with real models suits brands that need real people and premises on screen. Hybrid combines both. We recommend the right route on your free call.' },
  { q: 'Are your TV commercials broadcast-ready?', a: 'Yes. Every TVC is produced to broadcast technical and creative standards, with clearance-ready delivery — the same pipeline used for the retail, travel and charity commercials in our portfolio.' },
  { q: 'Who owns the final files?', a: 'You do — the moment we deliver. Full usage rights, source files on request, plus cutdowns for every platform you need.' },
  { q: 'How many revisions do I get?', a: 'We revise until you approve. Most projects wrap in one or two rounds because the script and storyboard are locked with you before production starts.' },
  { q: 'What kind of businesses do you work with?', a: 'UK SMBs and organisations: shops, grocers, jewellers, restaurants, law firms, accountancy practices, charities, schools and tour operators — 500+ UK businesses served so far.' },
  { q: 'Do I need to understand AI to work with you?', a: 'Not at all. You brief us like any production company and we handle the technical side, explained in plain English. The AI simply makes production faster and more affordable.' },
];
