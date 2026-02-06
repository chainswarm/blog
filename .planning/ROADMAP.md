# Roadmap: Chain Insights Blog — Visual Polish

## Overview

Transform the existing Chain Insights blog from functional MVP to a premium dark-themed experience on par with vercel.com/blog. The work flows foundation-first: establish design tokens, typography, and spacing; then polish content rendering (prose, code blocks, dividers); then layer on interactions, ambient effects, and responsive refinement. All 31 visual requirements are CSS-driven with no new dependencies.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Foundation** - Design tokens, typography system, and spatial rhythm
- [ ] **Phase 2: Content Polish** - Prose styling, code blocks, and section dividers
- [ ] **Phase 3: Interactions & Experience** - Card effects, transitions, hero glow, and responsive refinement

## Phase Details

### Phase 1: Foundation
**Goal**: The blog has a complete design token system, premium typography, and generous spacing that establish the visual rhythm everything else builds on
**Depends on**: Nothing (first phase)
**Requirements**: TYPO-01, TYPO-02, TYPO-03, TYPO-04, SPAC-01, SPAC-02, SPAC-03, SPAC-04, SURF-01, SURF-02, SURF-03
**Success Criteria** (what must be TRUE):
  1. Blog uses Inter font family with visible size hierarchy — headings are tight-tracked and bold, body text is relaxed and readable on dark background
  2. Three distinct surface elevation levels are visually distinguishable (page background, card surface, elevated surface)
  3. Hero section, post cards, and prose content all have generous breathing room — the page feels spacious, not cramped
  4. Gold accent is used selectively on interactive elements only — headings and body text use cream/white, preventing gaudy overload
**Plans**: TBD

Plans:
- [ ] 01-01: Design tokens and color system (@theme expansion, surface elevations, font loading)
- [ ] 01-02: Typography scale and spacing overhaul (heading hierarchy, body rhythm, section whitespace)

### Phase 2: Content Polish
**Goal**: Blog post content renders with premium-quality styling — prose elements, code blocks, and section dividers all feel refined and intentional
**Depends on**: Phase 1
**Requirements**: PROS-01, PROS-02, PROS-03, PROS-04, CODE-01, CODE-02, DIVD-01, DIVD-02
**Success Criteria** (what must be TRUE):
  1. Blockquotes have gold left border with subtle background tint, and images have rounded corners with border treatment
  2. Code blocks have refined borders, padding, and colors that harmonize with the gold/cream palette
  3. Section dividers between header/content/footer use gradient fades (transparent to gold to transparent) instead of hard borders
  4. All prose CSS variables reference theme tokens — no hardcoded hex values remain in prose overrides
**Plans**: TBD

Plans:
- [ ] 02-01: Prose styling and dividers (blockquotes, images, links, prose tokens, gradient dividers)
- [ ] 02-02: Code block refinement (borders, padding, palette harmonization)

### Phase 3: Interactions & Experience
**Goal**: Every interactive element responds with polished, consistent micro-interactions, the hero section has ambient presence, and the entire experience works flawlessly on mobile
**Depends on**: Phase 2
**Requirements**: CARD-01, CARD-02, CARD-03, TRNS-01, TRNS-02, TRNS-03, HERO-01, HERO-02, RESP-01, RESP-02, RESP-03, RESP-04
**Success Criteria** (what must be TRUE):
  1. Post cards lift with shadow emergence on hover and card borders transition to soft gold glow — tag badges also glow subtly on hover
  2. All interactive elements (nav links, footer links, cards, badges) share consistent transition timing (150-200ms) and coordinated hover behavior
  3. Hero section has a barely perceptible radial gold glow behind the heading — felt, not seen
  4. On mobile, all touch targets are at least 44px, typography scales appropriately, spacing adjusts proportionally, and header navigation works cleanly
  5. Page transitions use subtle opacity fade between routes

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation | 0/2 | Not started | - |
| 2. Content Polish | 0/2 | Not started | - |
| 3. Interactions & Experience | 0/3 | Not started | - |
