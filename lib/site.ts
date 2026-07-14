/**
 * Single source of truth for site + GoHighLevel configuration.
 * Nothing GHL-related is hardcoded in components — it all reads from here.
 * Values come from env where secret/deploy-specific; sensible live defaults otherwise.
 */

export const site = {
  name: 'Moon Gleam AI Studio',
  legalName: 'Moon Gleam',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://moongleam.co.uk',
  slogan: 'Powered by Creative AI',
  description:
    'AI-powered videos that grow UK businesses. Full production — brief to delivery — for 500+ UK businesses. London-based AI video studio.',

  contact: {
    email: 'info@moongleam.co.uk',
    phone: '+44 7512 484040',
    phoneHref: 'tel:+447512484040',
    whatsapp: '447512484040',
    whatsappHref: 'https://wa.me/447512484040',
    address: '208-214 Romford Road, London, E7 9HY',
    addressLocality: 'London',
    postalCode: 'E7 9HY',
  },

  social: {
    facebook: 'https://www.facebook.com/moongleamaistudio/',
    youtube: 'https://www.youtube.com/@moongleamaistudio',
    instagram: 'https://www.instagram.com/moongleamuk/',
    tiktok: 'https://www.tiktok.com/@moongleamaistudio',
    linkedin: 'https://www.linkedin.com/company/moongleam/',
  },

  /** Facebook Messenger deep-link for the floating chat button. */
  messenger: 'https://m.me/moongleamaistudio',

  ghl: {
    /** Moon Gleam sub-account location id (agency: Autonomous AI). */
    locationId: 'pWZRI2SHu2ZfzmsqaFKj',
    /** Live booking widget — every "Book a Call" CTA leads here (contact page embed). */
    bookingWidgetId: 'AGYO4pQgpOP4NpJbsnLv',
    bookingUrl:
      process.env.NEXT_PUBLIC_GHL_BOOKING_URL ??
      'https://api.leadconnectorhq.com/widget/booking/AGYO4pQgpOP4NpJbsnLv',
    /** GHL universal form-embed helper script (required by booking/form iframes). */
    formEmbedJs: 'https://link.msgsndr.com/js/form_embed.js',
    /** Optional: GHL form iframe src — if set, contact page shows it instead of the custom form. */
    formSrc: process.env.NEXT_PUBLIC_GHL_FORM_SRC ?? '',
    /** Optional: GHL chat widget script src — loaded site-wide when set. */
    chatSrc: process.env.NEXT_PUBLIC_GHL_CHAT_SRC ?? '',
    /** GHL chat widget id ("Moon Gleam Chat") — renders the LeadConnector loader with data attributes. */
    chatWidgetId: process.env.NEXT_PUBLIC_GHL_CHAT_WIDGET_ID ?? '6a504c2b49fe6f51cea5e847',
    /** Blog id (content managed entirely in GHL). */
    blogId: '2nubBFbULnmwtai66Gzw',
  },

  blog: {
    /** Live GHL blog origin — reverse-proxied under /blog (see next.config.mjs). */
    origin: process.env.GHL_BLOG_ORIGIN ?? 'https://blog.moongleam.co.uk',
    path: '/blog',
  },

  /** Homepage showreel (YouTube). */
  showreelId: process.env.NEXT_PUBLIC_SHOWREEL_ID ?? 'x9c5L7DncWk',

  /** Pricing scarcity counter — update monthly. */
  slotsLeft: Number(process.env.NEXT_PUBLIC_SLOTS_LEFT ?? 4),
} as const;

export const nav = [
  { label: 'Work', href: '/work' },
  { label: 'Services', href: '/services' },
  { label: 'Sectors', href: '/sectors' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
] as const;

/** The one CTA. Everything books a call. */
export const cta = { label: 'Book a Call', href: '/contact' } as const;
