# Moon Gleam Site

Marketing site for **Moon Gleam AI Studio**, scaffolded with the "$10K Website in Claude Code"
stack: **Claude Code + Framer Motion + a frontend-design Skill + 21st.dev components**.

This repo already has layers 2–4 wired up. You supply layer 1 (Claude Code) and start building.

## Quick start

```bash
# 1. Install dependencies
npm install

# 2. Run the dev server
npm run dev
# open http://localhost:3000
```

Requires **Node.js 18+** (you have v22).

## The 4-layer stack (from the guide)

| Layer | Tool | Status in this repo |
|-------|------|--------------------|
| Code generation | Claude Code | Run `claude` in this folder |
| Animation | Framer Motion | ✅ installed + `lib/motion.ts` variants ready |
| Design system | Frontend Design Skill | ✅ `.claude/skills/frontend-design/SKILL.md` |
| Components | 21st.dev | Browse https://21st.dev and drop into `components/` |

## Build with Claude Code

From this folder, run `claude`, then paste the **starter prompt** in `STARTER_PROMPT.md`.

## Structure

```
app/            Routes: layout.tsx, page.tsx, globals.css
components/      Nav, Hero, Section (animated, on-brand)
lib/motion.ts    Shared Framer Motion variants
tailwind.config.ts   Design tokens (ink / gleam / moon / glow)
.claude/skills/  frontend-design skill Claude Code auto-references
CLAUDE.md        Project rules Claude Code reads on every run
```

## Common mistakes to avoid

- Skipping the design skill → generic "AI-generated" look.
- Vague prompts → be specific about sections, animation, and copy.
- Not iterating → refine spacing, contrast, and motion.
- Forgetting performance → lazy-load images, optimise fonts, run Lighthouse.
