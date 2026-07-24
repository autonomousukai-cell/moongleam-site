# MOON GLEAM — IMMERSIVE STUDIO WEBSITE (BUILD BRIEF, from Azhar 2026-07-23)

Studio: **Moon Gleam AI Studio** — AI film production studio.

## CORE EXPERIENCE
NOT a standard scrolling site with stacked sections. It must feel like a high-end
property-development virtual tour / cinematic digital twin of an AI film studio.
Mouse-wheel scroll controls a CONTINUOUS camera journey through ONE connected
futuristic studio building: start outside → through the entrance → room by room.
Every scroll advances/reverses the camera smoothly; scroll up moves naturally
backwards through the same journey.

## APPROACH (v1 decision)
Preferred build: Next.js + React + Three.js / React Three Fiber + GSAP ScrollTrigger,
scroll-linked 3D camera path through a connected environment.
FALLBACK (recommended for v1, per brief): pre-rendered cinematic AI video sequences
or an image frame sequence scrubbed precisely by scroll position, with interactive
HTML overlays + hotspots above the scene. Moon Gleam can AI-generate the walkthrough
footage via its own Veo/Higgsfield pipeline.

## DO NOT
- No full-screen cards that replace each other. No click-through slideshow.
- Visitor must feel they are physically travelling through a premium AI film studio.

## JOURNEY (zones)
1. EXTERIOR/HERO — night, futuristic studio building, logo on building/LED sign,
   atmospheric light, rain/mist, reflections, dark luxury architecture.
   "Moon Gleam AI Studio" · "AI Films. Cinematic Stories. Limitless Worlds." · "Scroll to enter"
2. ENTRANCE — camera glides in, doors open, luxury reception.
   "Welcome to the future of film production." · Button "Explore the studio"
3. AI CREATIVE LAB — floating screens, storyboards, AI concept art, prompt interfaces.
   "From an idea to a cinematic universe." Services: AI commercials, music videos,
   brand films, social content, virtual production.
4. VIRTUAL SOUNDSTAGE — LED walls, cinematic AI sets, lighting rigs, showreel hotspot.
   "Anything you can imagine can become a set."
5. PRODUCTION PIPELINE — animated connected light nodes:
   Concept → Script → Visual Dev → AI Generation → Voice & Sound → Edit → Final Film.
   "AI-powered. Human-directed."
6. EDITING & RENDER SUITE — dark premium screens, timelines, colour grading, renders.
   "Fast production. Film-level detail." Proof points: Creative direction ·
   Cinematic post-production · Delivery built for every platform.
7. SCREENING ROOM / PORTFOLIO — private cinema, big screen with portfolio, clickable
   project cards/hotspots. "Selected worlds we have brought to life." CTA "View our work"
8. BOOKING / CONTACT — premium illuminated reception desk / rooftop scene. Contact,
   booking form, WhatsApp CTA, social links. "Ready to create what has never been seen?"
   Primary "Start your project" · Secondary "Book a discovery call"

## DESIGN
Dark luxury cinematic. Black/charcoal/silver/deep navy. Accents: electric cyan, violet,
warm amber. Premium editorial typography, modern sans-serif. Minimal text — visuals +
camera movement tell the story. Smooth slow camera motion, no abrupt transitions.
Cinematic depth of field, reflections, volumetric light, subtle particles. No stock
photography, no SaaS layout.

## INTERACTIONS
Persistent nav: Exterior · Lab · Soundstage · Process · Portfolio · Contact (smoothly
moves visitor to the selected camera point). Hotspot markers reveal info/videos/services.
Progress indicator of location in the studio. Smooth reversible scroll. Branded loading
sequence + preload critical visuals. Respect prefers-reduced-motion. Mobile: lightweight
video/image-sequence fallback with same narrative + accessible standard page content beneath.

## BUILD PROCESS (STAGE-GATE)
Phase 1 = camera path + EXTERIOR→RECEPTION sequence ONLY, with placeholders for video/
logo/portfolio. Make it fully functional + performant. THEN get Azhar's approval before
building the remaining zones.

## REFERENCE
Primary behaviour/pacing = Azhar's supplied reference reels (property-tour "explore a real
building" feel). Recreate the premium immersive feeling; do NOT copy branding/layout/images/content.
(Reference stills to be added to Drive Moon Gleam folder.)

## NOTES
- Repo already has components/experience/ (Framer Motion + GSAP + Lenis) as a scaffold; no
  Three.js or 3D assets yet.
- Deploy = Vercel auto-build on GitHub push (needs push token when ready). Cloudflare DNS
  currently points moongleam.co.uk at the broken Hostinger WordPress; real site lives at
  moongleam-site.vercel.app — repoint DNS to Vercel to restore.
- Model for the build: Sofia on Fable 5 (switch back to Opus 4.8 when done).

---
## REFERENCE ANALYSIS (Claude viewed the 2 reels, 2026-07-23)
Reference videos in brands/moongleam-ai-studio/refs/ (2 mp4, 720x1280).

**Video 1 — "VELA ARMORY" ("The era of boring websites is over"):** the DESIGN LANGUAGE.
Dark cinematic luxury agency site, full-bleed immersive sections per vertical (Residences,
Horology/watch-gears, Yachts, Aviation runway+plane+clouds), editorial serif+sans typography,
"Who We Are" stat block (24/7 · 50+ · 10+), "A reputation built on trust." Deep blacks/navy,
warm+cool cinematic imagery, big confident type, lots of negative space.

**Video 2 — "ICE GALLERY" ("Can you believe Claude did this?"):** THE CORE BEHAVIOUR (primary ref).
A continuous, smooth, SCROLL-LINKED CAMERA JOURNEY gliding through a connected luxury building
interior — showroom → lounge (sofa+plant) → games room (pool table) → bedroom → gallery walls.
Room-by-room, seamless camera movement (looks like pre-rendered/3D architectural walkthrough
scrubbed by scroll). Small circular HOTSPOT markers overlaid on the scene. Warm luxury lighting.
This is the "explore a real building" virtual-tour feel to recreate.

**TAKEAWAY for Moon Gleam build:** combine Video 2's camera-through-a-connected-building tour
behaviour with Video 1's dark cinematic luxury design language — themed as a FUTURISTIC AI FILM
STUDIO (dark, charcoal, cyan/violet/amber accents). Confirms Approach A (scroll-scrubbed cinematic
sequence + HTML hotspots). Do NOT copy their branding/content — recreate the feeling only.

---
## ⚠️ CRITICAL CLARIFICATION (Azhar, 2026-07-23) — READ FIRST
1. **The reference reels are STYLE + BEHAVIOUR reference ONLY.** Follow their FEEL — the immersive
   cinematic quality, the smooth scroll-linked camera journey through a connected building, the
   premium dark luxury polish, the hotspot interactions. **Do NOT reuse their theme, elements,
   content, branding, layout or imagery** (no real-estate/residences, no yachts, no watches, no
   gallery, no "VELA"/"ICE" names). Take the *how it moves and feels*, not the *what it shows*.
2. **This site is for MOON GLEAM AI FILM STUDIO — not Autonomous AI.** Every element, room, label,
   service and visual must be relevant to an **AI film production studio**: the futuristic studio
   building, AI creative lab, virtual LED soundstage/film sets, the AI production pipeline, editing/
   render suite, private screening room with Moon Gleam's showreel/portfolio, booking. Moon Gleam's
   own brand (dark cinematic; cyan/violet/amber accents) and services (AI films, commercials, music
   videos, brand films, social content, virtual production). Pull real content from the existing repo
   (lib/data.ts, lib/site.ts, current pages) — it is already Moon Gleam's.
3. Do NOT bring in anything from autonomousai.systems (that is a separate brand/site). This is
   moongleam.co.uk / the moongleam-site Next.js repo.

---
## 🔁 REFINEMENT PASS (Azhar, 2026-07-24) — priorities in order

### R1 — FIX THE SCROLL (CRITICAL, DO FIRST, must pass build)
Live /studio: users see ONLY the first zone; scroll does not advance through the other 7. Fix so the full 8-zone journey works on BOTH desktop (scroll-scrub) and mobile (NarrativeFallback scrolls all zones). Root cause is almost certainly: StudioTour sets `document.documentElement.style.overflow='hidden'` during the loader, and the Lenis + GSAP ScrollTrigger in CinematicJourney measure the 2480vh track BEFORE layout settles / before overflow is restored, so progress is frozen at 0. Fix: after the loader releases and CinematicJourney mounts, call `ScrollTrigger.refresh()` (deferred via rAF + a short timeout) and `lenis.resize()`, add a resize listener, and guarantee html overflow is restored. Verify the mobile fallback page actually scrolls. Make it bulletproof. Sanity-check by reasoning through the scroll math.

### R2 — RICH STUDIO INTERIORS (replace the flat CSS placeholder sets)
Azhar added reference images in brands/moongleam-ai-studio/refs/ (viewed): futuristic cinematic AI-film-studio interiors — cinema cameras/clapperboards/reels/LED walls/lighting rigs/broadcast desks fused with holographic UIs, robots operating cameras, AI faces on screens, data-viz, holographic portals; premium reflective spaces, dark with cyan/violet/amber glow. Each zone must LOOK like a real rendered studio space in that aesthetic — NOT gradients. GENERATE bespoke on-brand scene images per zone with Moon Gleam's OWN pipeline (`bash bin/genimg.sh "<cinematic prompt>" /paperclip/team/moongleam-site/public/studio/<zone>.png`) in this reference style — unique, owned, no licensing issue. Then use them as the zone scene backdrops layered with the existing depth/particles/parallax/letterbox. Per-zone prompts: exterior=night futuristic AI film studio building, LED signage, rain/mist, dark luxury; reception=luxury AI-studio reception, holographic welcome desk; lab=AI creative lab, floating screens, concept art, prompt UIs; soundstage=virtual LED-wall soundstage, cinematic set, lighting rigs; pipeline=stylised production pipeline space, glowing connected nodes; suite=cinematic dark edit/render suite, timelines, colour grading; screening=private cinema screening room, big screen; booking=premium illuminated rooftop studio reception desk. All 16:9-ish, dark, cyan/violet/amber accents.

### R3 — CREATIVE, NON-TRADITIONAL UI (no standard website chrome anywhere)
Reimagine ALL nav + UI as an AI-film-studio control interface. The nav is NOT a plain top bar — make it a cinematic HUD / holographic studio blueprint / waypoint selector; each item evokes its room (lens, clapperboard, LED wall, pipeline node, film reel, contact beacon). Progress = film timeline / reel / light-path (not a plain bar). Buttons = director's-console glass HUD. Hotspots = lens flares / holographic markers. Themed cursor, loaders, transitions. Premium editorial typography. Every element must read as "high-tech AI film studio." Keep performant + accessible. `npm run build` MUST pass.
