# PdR — Early-Access Launch Page

A standalone, dark-luxury launch page for **PdR** (Private Dining Rooms) by *The Creative
Connoisseur* — the marketplace where restaurants list private dining rooms and event planners
discover, compare, and book them. This page replaces the current search-first hero and exists to
capture **early-access registrations** from both restaurants and planners.

Built to match the existing PdR stack so it ports cleanly into the real Customer codebase.

## Stack

- **Next.js 15** (App Router) · **React 19**
- **Tailwind CSS v4** (`@theme` tokens in `src/app/globals.css`)
- **@iconify/react** (Phosphor icon set)
- Fonts: **Anton** (display) · **Oswald** (UI) · **Cormorant Garamond** (italic accent)

The design system is documented in [`DESIGN.md`](./DESIGN.md).

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build      # static export -> ./out
```

## Deploy (GitHub Pages)

Live demo: **https://apurvrdx1.github.io/pdr-launch/**

The app is a fully static export (`output: 'export'` in `next.config.ts`, images
unoptimized). It's published to the `gh-pages` branch and served by GitHub Pages.
Because a project site lives under `/<repo>/`, the build prefixes assets via the
`PAGES_BASE_PATH` env var (set to the repo name).

To redeploy after changes:

```bash
PAGES_BASE_PATH=pdr-launch npm run build   # -> ./out
touch out/.nojekyll
( cd out && git init -b gh-pages -q && git add -A \
    && git commit -qm deploy \
    && git push -f https://github.com/apurvrdx1/pdr-launch.git gh-pages \
    && rm -rf .git )
```

Optional — auto-deploy on push via GitHub Actions instead: grant the CLI the
workflow scope (`gh auth refresh -h github.com -s workflow`), then add a Pages
Actions workflow and switch the Pages source to "GitHub Actions". (When this moves
into the main app repo, deploy via Vercel instead — zero-config for Next.js.)

## Structure

```
src/
├── app/
│   ├── globals.css      # design tokens, grain overlay, reveal/motion primitives
│   ├── layout.tsx       # fonts + metadata
│   └── page.tsx         # section composition
├── components/launch/
│   ├── Nav.tsx          # floating glass pill + mobile overlay
│   ├── Hero.tsx         # full-bleed photo hero, dual role CTAs
│   ├── Marquee.tsx      # credibility strip
│   ├── ValueTracks.tsx  # For Restaurants / For Planners (bento)
│   ├── HowItWorks.tsx   # 3 steps
│   ├── EarlyAccess.tsx  # role toggle + registration form
│   ├── Faq.tsx          # accordion
│   ├── Footer.tsx
│   └── Reveal.tsx       # IntersectionObserver scroll-reveal
└── lib/content.ts       # all copy + data (single source of truth)
```

## Notes

- **Form is front-end only.** `EarlyAccess.tsx` validates and shows a success state; it does not
  call a backend yet. The real PdR codebase already has a matching endpoint —
  `pdrConsultationService.submitConsultation({ userType, fullName, email, companyName, title })` —
  so wiring it up is a one-function swap in `submit()`.
- Hero / track CTAs preset the form's role via a `pdr:role` `CustomEvent` and smooth-scroll to it.
- Copy is intentionally honest for a pre-launch product — no fabricated metrics or testimonials.
- Respects `prefers-reduced-motion`.
```
