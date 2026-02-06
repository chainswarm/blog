# Requirements: Chain Insights Blog — Visual Polish

**Defined:** 2026-02-06
**Core Value:** The blog must look polished and premium — a credible, professional presence that reflects the Chain Insights brand.

## v1 Requirements

### Typography

- [x] **TYPO-01**: Blog uses Inter font family loaded via Google Fonts with proper font-display and subsetting
- [x] **TYPO-02**: Headings use tighter letter-spacing (tracking-tight) and deliberate size scale with clear hierarchy
- [x] **TYPO-03**: Body text uses relaxed line-height (1.6-1.75) for comfortable dark-mode reading
- [x] **TYPO-04**: Font weights limited to 3 (400 regular, 500 medium, 700 bold) for clean hierarchy

### Spacing

- [x] **SPAC-01**: Hero section uses generous vertical padding (py-12 sm:py-20) creating visual breathing room
- [x] **SPAC-02**: Post card list uses increased gaps (space-y-8 or greater) between cards
- [x] **SPAC-03**: Prose content has expanded margins between elements for comfortable reading
- [x] **SPAC-04**: Cards have increased internal padding for spacious feel

### Surface & Color

- [x] **SURF-01**: Three distinct surface elevation levels used consistently (dark base, surface, elevated)
- [x] **SURF-02**: Cards use surface background color instead of sitting flat on base
- [x] **SURF-03**: Gold accent usage is restrained — not every element uses gold (prevent gaudy overload)

### Card Interactions

- [ ] **CARD-01**: Post cards have hover micro-interaction: subtle translateY lift + shadow emergence
- [ ] **CARD-02**: Card border transitions to soft gold glow on hover (not hard gold border)
- [ ] **CARD-03**: Tag badges have subtle gold glow effect on hover

### Dividers & Borders

- [x] **DIVD-01**: Section dividers use horizontal gradient fade (transparent → gold/20 → transparent) instead of hard borders
- [x] **DIVD-02**: Footer and header borders replaced with gradient fade dividers

### Prose Styling

- [x] **PROS-01**: Blockquotes styled with gold left border, subtle background tint, and refined typography
- [x] **PROS-02**: Images in posts have subtle border treatment and proper rounded corners
- [x] **PROS-03**: Prose links have refined underline style with smooth hover transitions
- [x] **PROS-04**: Prose CSS variables reference theme tokens (var()) instead of hardcoded hex values

### Code Blocks

- [x] **CODE-01**: Code blocks have refined border, padding, and border-radius treatment
- [x] **CODE-02**: Code block styling harmonizes with gold/cream palette

### Transitions

- [ ] **TRNS-01**: All interactive elements have consistent transition timing (150-200ms ease-out)
- [ ] **TRNS-02**: Nav links, footer links, and tag badges all use coordinated hover transitions
- [ ] **TRNS-03**: Page transitions use subtle opacity fade between routes (200-300ms)

### Hero & Ambient

- [ ] **HERO-01**: Hero section has subtle radial gradient glow using gold at very low opacity behind heading
- [ ] **HERO-02**: Glow effect is barely perceptible — felt, not seen (opacity 0.05-0.10 range)

### Responsive

- [ ] **RESP-01**: All interactive elements have minimum 44px touch targets on mobile
- [ ] **RESP-02**: Typography scale adjusts appropriately for mobile screens
- [ ] **RESP-03**: Spacing reduces proportionally on mobile while maintaining breathing room
- [ ] **RESP-04**: Header navigation works cleanly on mobile viewports

## v2 Requirements

### Enhanced Features

- **READ-01**: Reading progress indicator (gold bar at top of post pages)
- **READ-02**: Estimated reading time displayed in post metadata
- **ANCH-01**: Prose headings get hover-visible anchor links for section linking
- **COPY-01**: Code blocks get copy-to-clipboard button
- **BACK-01**: Back-to-top floating button on long posts

## Out of Scope

| Feature | Reason |
|---------|--------|
| Dark mode toggle | Anti-feature — dark IS the brand identity |
| Parallax scrolling | Motion sickness risk, poor mobile performance, distracts from content |
| Particle/star animations | Dates the design, massive performance cost, zero content value |
| Neon glow effects | Garish, fatiguing, turns gold palette into casino aesthetic |
| Scroll-triggered reveal animations | Gates content, annoying on repeat visits, accessibility issue |
| Heavy glassmorphism | Expensive, muddy, ages quickly — keep to header only |
| Multiple font families | Visual noise — one family (Inter) with 3 weights covers everything |
| Animated gradient backgrounds | Distracting, GPU drain, competes with content |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| TYPO-01 | Phase 1 | Complete |
| TYPO-02 | Phase 1 | Complete |
| TYPO-03 | Phase 1 | Complete |
| TYPO-04 | Phase 1 | Complete |
| SPAC-01 | Phase 1 | Complete |
| SPAC-02 | Phase 1 | Complete |
| SPAC-03 | Phase 1 | Complete |
| SPAC-04 | Phase 1 | Complete |
| SURF-01 | Phase 1 | Complete |
| SURF-02 | Phase 1 | Complete |
| SURF-03 | Phase 1 | Complete |
| CARD-01 | Phase 3 | Pending |
| CARD-02 | Phase 3 | Pending |
| CARD-03 | Phase 3 | Pending |
| DIVD-01 | Phase 2 | Complete |
| DIVD-02 | Phase 2 | Complete |
| PROS-01 | Phase 2 | Complete |
| PROS-02 | Phase 2 | Complete |
| PROS-03 | Phase 2 | Complete |
| PROS-04 | Phase 2 | Complete |
| CODE-01 | Phase 2 | Complete |
| CODE-02 | Phase 2 | Complete |
| TRNS-01 | Phase 3 | Pending |
| TRNS-02 | Phase 3 | Pending |
| TRNS-03 | Phase 3 | Pending |
| HERO-01 | Phase 3 | Pending |
| HERO-02 | Phase 3 | Pending |
| RESP-01 | Phase 3 | Pending |
| RESP-02 | Phase 3 | Pending |
| RESP-03 | Phase 3 | Pending |
| RESP-04 | Phase 3 | Pending |

**Coverage:**
- v1 requirements: 31 total
- Mapped to phases: 31
- Unmapped: 0

---
*Requirements defined: 2026-02-06*
*Last updated: 2026-02-06 after roadmap creation*
