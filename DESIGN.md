# PdR — Design System (DESIGN.md)

> AI-readable design system for **PdR** (Private Dining Rooms) by *The Creative Connoisseur*.
> Grounding source: extracted from the existing PdR customer codebase (`approved-code/Codebase/Customer`)
> and evolved for the early-access launch page. Brand note: always **"PdR"** — lowercase `d`.

## 1. Brand essence

A discreet, members-club marketplace where **restaurants** list private dining rooms (and buyouts)
and **corporate / social event planners** discover, compare, and book them. The feeling is a
**dark, editorial luxury magazine** — confident, quiet, expensive. Never loud, never "startup-y".

- Voice: assured, concise, concierge-grade. Short lines. No exclamation marks. No hype words.
- Mood: candlelit dining room at night — black, gold, warm photography.

## 2. Color

Dark canvas with a single metallic accent. Light "cream" only for contrast sections.

| Token | Value | Use |
|---|---|---|
| `--color-ink` | `#0A0A0A` | Primary background (near-black) |
| `--color-ink-deep` | `#050505` | Deepest sections, footer |
| `--color-gold` | `#D4AF37` | Primary accent (CTAs, eyebrows, highlights) |
| `--color-gold-deep` | `#B8860B` | Accent hover / pressed, fine rules |
| `--color-cream` | `#FAF9F6` | Light section background (inverted blocks) |
| `--color-bone` | `#EFE9DD` | Cards/text on dark, warm off-white |
| `--text-on-dark` | `rgba(255,255,255,0.92)` | Body on dark |
| `--text-muted` | `rgba(255,255,255,0.55)` | Secondary copy |
| `--hairline` | `rgba(255,255,255,0.14)` | Borders / dividers on dark |

Rules: one accent only (gold). No green (`#07be8a` is template residue — do **not** use). No purple/blue
gradients. Gold is for emphasis, never large fills.

## 3. Typography

| Role | Font | Notes |
|---|---|---|
| Display | **Anton** (400) | Oversized headlines. Tight leading `0.9`, `tracking-tight`. |
| UI / body | **Oswald** (400–700) | All UI, labels, body. Condensed grotesk. |
| Editorial accent | **Cormorant Garamond** (italic) | Sparingly — one or two words in a headline for the "luxury" lift. |

- **Eyebrows / labels:** Oswald, uppercase, `text-[10px]–[11px]`, `tracking-[0.25em]–[0.5em]`, gold or muted.
- Display sizes are fluid: hero `clamp(3rem, 9vw, 8.5rem)`. Section H2 `clamp(2rem, 5vw, 4rem)`.
- Body: Oswald `text-base`–`text-lg`, `leading-relaxed`, muted on dark.

## 4. Spacing & layout

- Macro whitespace: sections `py-28` → `py-40`. Let it breathe.
- Container: `max-w-[1400px]` (`--spacing-8xl`), gutters `px-6 md:px-12 lg:px-20`.
- Layout archetypes: **Editorial Split** (huge type left / media right) and **Asymmetrical Bento**
  for the dual For-Restaurants / For-Planners tracks. Collapse to single column `w-full px-4` below `md`.
- Decorative thin vertical grid lines at low opacity (`opacity-10`) are part of the brand.

## 5. Components

- **Double-bezel cards:** outer shell `bg-white/[0.04] ring-1 ring-white/10 rounded-[2rem] p-1.5`,
  inner core own bg + `shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)]`, radius `calc(2rem-0.375rem)`.
- **Glass surfaces:** `backdrop-blur-2xl bg-white/[0.06] border border-white/20` (fixed/sticky only).
- **Primary CTA:** gold pill `rounded-full px-7 py-3.5 bg-gold text-ink`, hover `bg-gold-deep`,
  `active:scale-[0.98]`. Trailing arrow nested in its own circle (button-in-button).
- **Secondary CTA:** `border border-white/30 text-white` ghost pill.
- **Inputs:** dark `bg-black/40 border border-white/20 rounded-xl`, focus `border-gold`. Labels:
  uppercase `text-[10px] tracking-[0.2em] text-white/70`.
- **Eyebrow badge:** `rounded-full border border-white/15 px-3 py-1 text-[10px] uppercase tracking-[0.25em]`.

## 6. Motion

- Custom easing only: `cubic-bezier(0.32,0.72,0,1)`, durations `500–800ms`. No `linear`/`ease-in-out`.
- Scroll reveals via `IntersectionObserver`: `translate-y-12 blur-sm opacity-0` → resolved. Stagger children.
- Hover physics: magnetic CTA, nested icon translates `+x -y` + `scale-105`. Animate only `transform`/`opacity`.
- Hero photography cross-fades (`duration-1000`).

## 7. Imagery

Full-bleed, warm, low-key restaurant / private-dining photography under a `bg-black/45` scrim so
type stays legible. A fixed film-grain overlay (`opacity-[0.04]`, `pointer-events-none`) for paper feel.

## 8. Don'ts

- No green accent, no rounded "friendly" SaaS look, no thick Lucide icons (use Phosphor light via iconify).
- No stock "happy team" photos. No emoji. No drop-shadow `shadow-md`. No claims of partnerships not held.
- Keep copy honest (pre-launch / early access) — no fabricated metrics or testimonials.
