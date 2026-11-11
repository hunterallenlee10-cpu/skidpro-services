# SkidPro Services: Implementation Kickstart

Front-end-only concept site for SkidPro Services LLC (Enid, OK). Built by Lee Enterprises Unlimited as a spec demo for the owner, Adam Anderson.

**One goal:** every action leads to "Get a Free Quote" (the Quote Planner). Call or text is the always-visible second path.

## Stack

- Next.js 16 (App Router) + TypeScript + Tailwind CSS v4
- Framer Motion: hero and before/after only
- `lucide-react` icons only
- `sharp` for image conversion (`npm run images`)
- `@vercel/analytics` (the only script)
- No backend, no database, no API keys

## Design tokens: "Red Dirt Industrial"

| Token | Value | Use |
|---|---|---|
| `bg` | `#0E0C0A` | Page background (warm near-black) |
| `surface` | `#1A1612` | Cards, panels |
| `accent` | `#F47B20` | CTAs, highlights, key numbers, active states only |
| `text` | `#F4EEE6` | Body and headings (logo cream) |
| `muted` | `#A89F94` | Secondary text |
| `line` | `#2A241E` | 1px borders |
| `dirt` | `#1F1510` | One red-dirt tinted section (Contract Work) |

- Text on orange is `#0E0C0A` (white on orange fails AA).
- Fonts: **Big Shoulders** (Google merged "Big Shoulders Display" into it; pinned to the display cut with `opsz 72`), 800/900, uppercase, tight tracking. **Archivo** 400/500/600 for body.
- Radius 4 to 6px. 1px `line` borders. 8px spacing grid. Sections 128px desktop / 64px mobile.
- Texture: SVG film grain at ~4% on dark sections. Topographic contour SVG behind 2 sections.
- Hazard stripe: thin orange accent in 2 places max (hero fact strip, Contract Work).
- Motion: hero (20s push-in, rotating word) and before/after (auto-sweep) only. Hover/press states elsewhere. `prefers-reduced-motion` respected.

## File map

```
lib/business.ts            all business facts (edit here)
lib/images.ts              photo map: src, width, height, alt
app/layout.tsx             fonts, metadata, JSON-LD, noindex, analytics, QuoteProvider
app/page.tsx               landing page (sections in order)
app/contact/page.tsx       Talk to Adam page
app/opengraph-image.tsx    1200x630 OG image (next/og)
components/Nav.tsx, Footer.tsx, MobileBar.tsx, BackToTop.tsx
components/QuotePlanner/   context, modal, 5-step form, success state
components/sections/       one file per section
scripts/optimize-images.mjs
```

## Photo map

| File | Where |
|---|---|
| 00 logo | Nav, footer, favicon, OG |
| 01 hero (likely AI render) | Hero only. `// TODO: swap for a real drone shot of Adam's machine` |
| 02 / 03 | Before/after #1. 03 also Land Clearing tile and Recent Work |
| 04 wide banner | Cinematic strip |
| 05 portrait | Building Pad Prep tile |
| 06 / 07 | Before/after #2. 07 also Recent Work |
| 08 Ringwood grapple | Recent Work, Fleet (329E, confirmed by file name) |
| 09 trailer at sunset, snow | Snow spotlight |

Real photos (02 to 09) never display larger than native size. Missing photos are labelled placeholders.

## Build checklist

- [x] Phase 1: scaffold, design tokens, fonts, grain texture, nav, hero, footer
- [ ] Phase 2: services bento, before/after slider, cinematic strip
- [ ] Phase 3: recent work, fleet, contract work, snow spotlight
- [ ] Phase 4: about, how it works, sample reviews, service area, FAQ, final CTA
- [ ] Phase 5: Quote Planner modal, wire every CTA (with service pre-select), mobile sticky bar, `/contact`
- [ ] Phase 6: metadata, OG image, favicon, JSON-LD, noindex, image optimization, Lighthouse 90+
- [ ] Phase 7: final review, commit, ready for GitHub and Vercel

## Final review checklist

- [ ] The hero alone would sell the job. Headline readable over the image on mobile.
- [ ] Every "Get a Free Quote" opens the Planner. Phone and text links work.
- [ ] Both before/after sliders work with mouse, touch and keyboard.
- [ ] Zero em dashes, zero "--", zero stock or AI images added, zero invented facts.
- [ ] Sample reviews and draft copy are visibly labelled.
- [ ] Max 2 fonts, 3 colors plus text, motion in only 2 sections, no cursor effects or loading intro.
- [ ] Mobile at 375px: no overflow, burger works, sticky call bar works.
- [ ] Footer on both pages with the concept line. noindex present.
- [ ] Lighthouse 90+.
