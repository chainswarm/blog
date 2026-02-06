# Chain Insights Blog — Visual Polish

## What This Is

The Chain Insights company blog, a public-facing Nuxt Content v3 static site deployed to GitHub Pages at `chainswarm.github.io/blog/`. This milestone is a comprehensive visual overhaul — taking the existing functional MVP to a dark & premium look inspired by sites like vercel.com/blog.

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

### Active

- [ ] Premium home page — refined hero section, polished post cards with hover effects, visual hierarchy
- [ ] Premium post pages — better typography, spacing, heading styles, code block styling, image treatment
- [ ] Stronger brand presence — logo treatment, header/footer refinement, consistent use of gold accents
- [ ] Mobile experience — responsive navigation, proper touch targets, mobile-optimized typography and spacing
- [ ] Subtle premium effects — transitions, hover states, backdrop blur, border glow, smooth interactions

### Out of Scope

- New features (RSS, search, reading time, ToC, newsletter, comments) — this milestone is visual only
- Content changes — existing 3 posts stay as-is
- Backend or infrastructure changes — deployment stays on GitHub Pages
- SEO/meta improvements beyond what visual changes naturally affect

## Context

- The blog MVP is live at `https://chainswarm.github.io/blog/` with 3 sample posts
- Built with Nuxt Content v3, Tailwind CSS v4, deployed to GitHub Pages
- Brand colors: dark bg (#0A0A0F), gold (#C9B88C), cream (#E8E6E3), surface (#12121A), border (#1E1E2A)
- Current components: AppHeader, AppFooter, BlogPostCard, TagBadge
- Current pages: index, post/[...slug], tags/[tag], about
- The `confbox` 0.2.2 override is required in package.json (0.2.3 has a broken rolldown build)
- Target aesthetic: dark & premium like vercel.com/blog — clean, spacious, refined

## Constraints

- **Tech stack**: Nuxt Content v3 + Tailwind CSS v4 — no new dependencies unless essential for visual effects
- **Deployment**: GitHub Pages static site — no server-side features
- **Brand**: Must use existing Chain Insights color palette (dark/gold/cream)
- **Compatibility**: Must work on modern browsers, mobile-first responsive

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Visual-only milestone | Focus delivers maximum brand impact without feature complexity | — Pending |
| Dark & premium aesthetic | Matches Chain Insights brand identity and crypto/fintech space expectations | — Pending |
| No new dependencies | Keep the stack lean, achieve polish through CSS/Tailwind refinement | — Pending |

---
*Last updated: 2026-02-06 after initialization*
