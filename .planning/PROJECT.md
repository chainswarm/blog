# Chain Insights Blog

## What This Is

The Chain Insights company blog, a public-facing Nuxt Content v3 static site deployed to GitHub Pages at `chainswarm.github.io/blog/`. A premium dark-themed blog with polished typography, refined prose styling, hover micro-interactions, ambient hero glow, and full mobile responsiveness.

## Core Value

The blog must look polished and premium — a credible, professional presence that reflects the Chain Insights brand.

## Requirements

### Validated

- ✓ Blog posts authored in Markdown with frontmatter (title, description, date, tags, author) — existing
- ✓ Home page lists all posts sorted by date (newest first) — existing
- ✓ Individual post pages with full Markdown rendering and syntax highlighting — existing
- ✓ Tag filtering pages — existing
- ✓ Static about page — existing
- ✓ Dark theme with gold (#C9B88C) / cream (#E8E6E3) / dark bg (#0A0A0F) brand colors — existing
- ✓ GitHub Pages deployment via Actions — existing
- ✓ Responsive layout with header, footer, max-w-4xl content area — existing
- ✓ Premium typography with Inter font, tight-tracked headings, relaxed body text — v1.0
- ✓ Design token system with 3 surface elevations, shadow tokens, easing tokens — v1.0
- ✓ Gold restraint: gold for interactive elements only, cream for headings/body — v1.0
- ✓ Prose styling: gold blockquotes, bordered images, smooth link transitions — v1.0
- ✓ Code blocks: refined borders, padding, gold/cream palette harmony — v1.0
- ✓ Gradient fade dividers replacing hard borders on header/footer — v1.0
- ✓ Card hover: translateY lift + gold glow shadow + coordinated transitions — v1.0
- ✓ Tag badge hover glow effect — v1.0
- ✓ 200ms ease-smooth coordinated transition timing across all interactive elements — v1.0
- ✓ Hero radial gold glow at opacity 0.07 — v1.0
- ✓ 250ms opacity page transitions between routes — v1.0
- ✓ 44px mobile touch targets on all interactive elements — v1.0
- ✓ Responsive typography and proportional spacing on mobile — v1.0

### Active

(None — ready for next milestone)

### Out of Scope

- Dark mode toggle — dark IS the brand identity
- Parallax scrolling — motion sickness risk, poor mobile performance
- Particle/star animations — dates the design, performance cost
- Neon glow effects — garish, turns gold palette into casino aesthetic
- Scroll-triggered reveal animations — gates content, accessibility issue
- Heavy glassmorphism — expensive, ages quickly
- Multiple font families — one family (Inter) with 3 weights covers everything
- Animated gradient backgrounds — distracting, GPU drain

## Context

Shipped v1.0 Visual Polish with 380 LOC (Vue/CSS/TypeScript).
Tech stack: Nuxt Content v3, Tailwind CSS v4, GitHub Pages.
Live at: https://chainswarm.github.io/blog/
3 sample blog posts. All 31 visual requirements complete.
The `confbox` 0.2.2 override is required in package.json.
Node 22 required for builds (better-sqlite3 native module).

## Constraints

- **Tech stack**: Nuxt Content v3 + Tailwind CSS v4 — no new dependencies unless essential
- **Deployment**: GitHub Pages static site — no server-side features
- **Brand**: Must use existing Chain Insights color palette (dark/gold/cream)
- **Compatibility**: Must work on modern browsers, mobile-first responsive

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Visual-only milestone | Focus delivers maximum brand impact without feature complexity | ✓ Good — 31/31 reqs shipped |
| Dark & premium aesthetic | Matches Chain Insights brand identity and crypto/fintech space expectations | ✓ Good — consistent premium feel |
| No new dependencies | Keep the stack lean, achieve polish through CSS/Tailwind refinement | ✓ Good — zero new deps added |
| Gold restraint | Prevent gaudy overload by reserving gold for interactive elements only | ✓ Good — clean, professional look |
| Box-shadow for card glow | Softer diffused glow than border-color transition | ✓ Good — compound shadow token works well |
| Hero glow at 0.07 opacity | "Felt, not seen" ambient warmth | ✓ Good — subtle warmth without noise |
| Touch targets merged into Plan 03-01 | Avoid file overlap conflicts between plans | ✓ Good — clean execution |

---
*Last updated: 2026-02-06 after v1.0 milestone*
