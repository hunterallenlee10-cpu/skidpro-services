# SkidPro Services: concept site

Front-end-only concept website for **SkidPro Services LLC** (Enid, OK), built by Lee Enterprises Unlimited as a spec demo for the owner, Adam Anderson. It is marked `noindex, nofollow` so it never competes with the owner's own listings.

Plan, design tokens and checklist: [`implementation_kickstart.md`](implementation_kickstart.md).

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # production check
```

## Edit content

- **Business facts** (phone, email, services, lines): `lib/business.ts`
- **Photos** (paths, sizes, alt text): `lib/images.ts`
- **Sections**: one file each in `components/sections/`
- **Quote Planner**: `components/QuotePlanner/`

### Swap or add photos

1. Drop originals in `public/images/raw/` (git-ignored).
2. `npm run images` converts them to `.webp` in `public/images/`.
3. Update the width, height and alt text in `lib/images.ts`.
4. `node scripts/make-icons.mjs` rebuilds the favicon, Apple icon and OG logo if the logo changes.

## Deploy (Vercel)

Push to GitHub, then "Add New Project" in Vercel and import the repo. No environment variables needed. After the first deploy, set `siteUrl` in `lib/business.ts` to the real URL so canonical and Open Graph tags point to it. Vercel Analytics turns on automatically on Vercel deployments.

## What Adam needs to confirm or supply

**Photos**
- A real drone or wide shot of his machine for the hero (the current hero looks like an AI render). `lib/images.ts`, `Hero.tsx`
- A photo of Adam with his machine (About section placeholder). `About.tsx`
- A photo of his Deere 333G (Fleet placeholder). `Fleet.tsx`
- A snow plowing job photo (the Snow section uses the trailer shot for now). `Snow.tsx`
- Which machine is in photo 09 (the trailer shot).

**Copy marked DRAFT**
- About note in his voice ("I started SkidPro in 2025...", "When you call, you get me."). `About.tsx`
- "Same property. One day of SkidPro." Was each job really one day? `BeforeAfter.tsx`
- Quote success message: "Adam will reach out within one business day." `QuotePlanner.tsx`
- Which attachments go with which machine (listed on both for now). `Fleet.tsx`
- On-call and seasonal snow wording. `Snow.tsx`
- Contact tile notes ("Adam picks up.", "Send a photo of the job."). `ContactHero.tsx`

**Sample content to replace**
- 3 sample reviews, each labelled on the page. Replace with real Google reviews. `Reviews.tsx`
- "Leave us a review on Google" link (needs his Google Business Profile URL). `lib/business.ts`

**Before going live**
- Connect the Quote Planner to email or SMS (it is front-end only; the success screen offers Call and a prefilled Text). `QuotePlanner.tsx`
- Set `siteUrl` and remove the `noindex` robots setting in `app/layout.tsx` if this becomes his real site.
