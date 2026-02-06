# Phase 3: Interactions & Experience - Research

**Researched:** 2026-02-06
**Domain:** CSS micro-interactions, Nuxt page transitions, mobile responsiveness
**Confidence:** HIGH

## Summary

This phase adds hover micro-interactions to cards/badges/links, a subtle hero glow effect, Nuxt page transitions, and mobile responsiveness. The existing codebase is well-positioned: design tokens for shadows (`--shadow-card`, `--shadow-card-hover`), easing (`--ease-smooth`, `--ease-fluid`), and the elevated surface color (`--color-dark-elevated`) are already defined in `@theme` but unused. Tailwind v4 automatically generates utility classes from these tokens (e.g., `shadow-card-hover`, `ease-smooth`), so no new dependencies are needed.

The primary technical challenges are: (1) coordinating consistent transition timing across all interactive elements without creating a maintenance burden, (2) implementing the gold glow border effect using `box-shadow` rather than `border-color` for smoother rendering, and (3) configuring Nuxt page transitions correctly for a prerendered/SSG site deployed to GitHub Pages.

**Primary recommendation:** Use the existing Tailwind v4 theme tokens exclusively. All interactions are achievable with CSS transitions on `transform`, `box-shadow`, `opacity`, and `border-color`. The `transition` utility class already includes all needed properties with 150ms duration and the smooth easing curve. Page transitions use Nuxt's built-in `pageTransition` config with a simple opacity fade.

## Standard Stack

No new libraries required. Everything is built with what exists.

### Core (Already Installed)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Tailwind CSS | v4.1.18 | Utility-first CSS with `@theme` tokens | Already configured with all needed tokens |
| Nuxt | v4.3.0 | Page transitions via `pageTransition` config | Built-in Vue `<Transition>` wrapper |
| Vue 3 | v3.5.27 | Reactive components, CSS transition classes | Native transition support |

### Design Tokens Already Defined (in `@theme`)
| Token | Value | Phase 3 Use |
|-------|-------|-------------|
| `--shadow-card` | `0 1px 3px rgba(0,0,0,0.4)` | Card resting state shadow |
| `--shadow-card-hover` | `0 4px 12px rgba(0,0,0,0.5)` | Card lifted state shadow |
| `--ease-smooth` | `cubic-bezier(0.4, 0, 0.2, 1)` | Standard transition easing |
| `--ease-fluid` | `cubic-bezier(0.3, 0, 0, 1)` | Hero glow / page transitions |
| `--color-dark-elevated` | `#1A1A26` | Card hover background (reserved from Phase 1) |
| `--color-gold` | `#C9B88C` | Gold glow color source |

### Tailwind v4 Utility Classes Auto-Generated from Tokens
| Token | Generated Utility | Usage |
|-------|-------------------|-------|
| `--ease-smooth` | `ease-smooth` | `class="transition ease-smooth"` |
| `--ease-fluid` | `ease-fluid` | `class="transition ease-fluid"` |
| `--shadow-card` | `shadow-card` | `class="shadow-card"` |
| `--shadow-card-hover` | `shadow-card-hover` | `class="hover:shadow-card-hover"` |

**No installation needed.** All capabilities exist in current dependencies.

## Architecture Patterns

### Pattern 1: Consistent Transition Base Class
**What:** All interactive elements share the same transition timing to create a cohesive feel.
**When to use:** Every clickable/hoverable element.

The `transition` utility in Tailwind v4 already applies:
```css
transition-property: color, background-color, border-color, outline-color,
                     text-decoration-color, fill, stroke, opacity, box-shadow,
                     transform, translate, scale, rotate, filter, backdrop-filter,
                     display, content-visibility, overlay, pointer-events;
transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); /* matches --ease-smooth */
transition-duration: 150ms;
```

This means `transition` alone covers TRNS-01 requirement (150-200ms, ease-out-like). The default 150ms and the default easing `cubic-bezier(0.4, 0, 0.2, 1)` match the `--ease-smooth` token exactly. For elements needing 200ms, use `transition duration-200`.

**Recommended approach:** Use `transition duration-200 ease-smooth` as the standard interactive element base. 200ms is at the upper end of the 150-200ms range and feels slightly more polished for hover effects.

### Pattern 2: Card Hover Micro-Interaction (CARD-01, CARD-02)
**What:** Card lifts with translateY, shadow emerges, border transitions to gold glow.
**Implementation:**

```html
<article class="
  bg-dark-surface border border-dark-border rounded-lg p-8
  shadow-card
  transition duration-200 ease-smooth
  hover:-translate-y-0.5 hover:shadow-card-hover hover:border-gold/30
  hover:shadow-[0_4px_12px_rgba(0,0,0,0.5),0_0_0_1px_rgba(201,184,140,0.15)]
">
```

Key decisions for gold glow border:
- **Do NOT use `hover:border-gold`** -- this creates a hard gold border (violates CARD-02 "soft gold glow, not hard gold border")
- **Use `box-shadow` for the glow** -- a second `box-shadow` layer with gold at low opacity creates a soft diffused glow around the border
- The gold glow is achieved by stacking shadows: the lift shadow + an inset or spread shadow in gold

**Preferred gold glow approach using box-shadow spread:**
```css
/* Resting state */
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);

/* Hover state -- lift shadow + gold glow */
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5), 0 0 8px rgba(201, 184, 140, 0.12);
```

This creates a soft gold glow emanating from the card edges. The gold component (`rgba(201, 184, 140, 0.12)`) is barely visible but creates warmth.

**Important:** Since the current card has `hover:border-gold/50`, this needs to change. The border should transition to a very subtle gold tint (`hover:border-gold/20`) while the box-shadow handles the visible glow effect.

### Pattern 3: Tag Badge Glow (CARD-03)
**What:** Tag badges get a subtle gold glow on hover.
**Implementation:**

```html
<span class="
  inline-block text-xs px-2.5 py-1 rounded-full
  border border-gold/30 text-gold-dim
  transition duration-200 ease-smooth
  hover:border-gold hover:text-gold hover:shadow-[0_0_6px_rgba(201,184,140,0.2)]
">
```

The `box-shadow` with 0 offset and 6px blur creates a soft halo glow around the badge. At `0.2` opacity it is subtle but noticeable.

### Pattern 4: Hero Radial Glow (HERO-01, HERO-02)
**What:** A barely perceptible radial gold glow behind the hero heading.
**When to use:** Index page hero section only.

**Implementation using pseudo-element or wrapper div:**
```html
<section class="py-12 sm:py-20 relative">
  <!-- Gold radial glow -- felt, not seen -->
  <div class="absolute inset-0 flex items-start justify-start pointer-events-none"
       aria-hidden="true">
    <div class="w-96 h-48 rounded-full opacity-[0.07]"
         style="background: radial-gradient(ellipse at center, rgba(201,184,140,0.6) 0%, transparent 70%);
                filter: blur(40px);">
    </div>
  </div>
  <h1 class="relative text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gold">
    Chain Insights Blog
  </h1>
  ...
</section>
```

Key parameters for "felt, not seen":
- **Opacity:** 0.05-0.10 range (requirement specifies this). Start with `opacity-[0.07]`
- **Blur:** Large blur radius (30-50px) to diffuse the glow
- **Size:** Wider than the heading, roughly 384px wide x 192px tall ellipse
- **Color:** Gold at moderate opacity inside the gradient, then total opacity controlled by the wrapper
- **Position:** Behind/around the heading text, not centered on the page
- The `pointer-events-none` and `aria-hidden="true"` ensure it is decorative only

**Alternative pure-CSS approach (simpler):**
```css
.hero-glow {
  position: relative;
}
.hero-glow::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 20%;
  width: 400px;
  height: 200px;
  transform: translate(-50%, -50%);
  background: radial-gradient(ellipse at center, rgba(201,184,140,0.5) 0%, transparent 70%);
  filter: blur(40px);
  opacity: 0.07;
  pointer-events: none;
}
```

### Pattern 5: Nuxt Page Transitions (TRNS-03)
**What:** Subtle opacity fade between routes (200-300ms).
**Implementation:**

In `nuxt.config.ts`:
```ts
app: {
  pageTransition: { name: 'page', mode: 'out-in' },
  // ... existing head config
}
```

In `app/assets/css/main.css` (or `app/app.vue` style block):
```css
.page-enter-active,
.page-leave-active {
  transition: opacity 250ms var(--ease-fluid);
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}
```

Key decisions:
- **Use `mode: 'out-in'`** so the old page fades out before the new one fades in (prevents layout overlap)
- **Duration: 250ms** -- middle of the 200-300ms range specified
- **Use `--ease-fluid`** for page transitions (slightly different feel than element hover transitions)
- **Do NOT add blur** -- the requirement says "subtle opacity fade", not blur
- **Each page must have a single root element** -- verified: all pages (`index.vue`, `about.vue`, `post/[...slug].vue`, `tags/[tag].vue`) already have a single root `<div>` or `<article>`
- This works with SSG/prerendered sites on GitHub Pages because client-side navigation still uses Vue Router

**Important for app.vue:** The current `app.vue` uses `<NuxtLayout><NuxtPage /></NuxtLayout>`. The `pageTransition` config in `nuxt.config.ts` is the cleanest approach -- it does NOT require modifying the `<NuxtPage>` component directly. Nuxt applies the transition automatically.

### Pattern 6: Mobile Touch Targets (RESP-01)
**What:** All interactive elements have minimum 44x44px touch targets on mobile.
**Implementation:**

For small elements (tag badges, nav links), ensure minimum touch target with padding or min-height:
```html
<!-- Nav links: add min-h-[44px] and flex items-center on mobile -->
<NuxtLink class="text-sm text-cream-muted hover:text-gold transition-colors
                  min-h-[44px] flex items-center">
  {{ link.label }}
</NuxtLink>

<!-- Tag badges: already have py-1 px-2.5 but need min-h-[44px] min-w-[44px] on mobile -->
<span class="inline-flex items-center justify-center min-h-[44px] text-xs px-3 py-1.5 rounded-full ...">
```

The Apple Human Interface Guidelines and WCAG 2.5.8 both specify 44x44px as the minimum touch target size. On mobile (default/sm breakpoint), ensure all interactive elements meet this via `min-h-[44px]` and adequate horizontal padding.

### Anti-Patterns to Avoid
- **Using `border-color` for glow effects:** Border transitions look sharp/hard. Use `box-shadow` for soft diffused glows.
- **Animating `filter: blur()`:** Very expensive to animate. Use static blur with opacity transition instead.
- **Using JavaScript for hover effects:** Pure CSS transitions are more performant and work with SSG.
- **Nesting `<Transition>` inside `<NuxtPage>`:** Nuxt handles this automatically via config.
- **Gold overload:** Prior decision states gold is reserved for interactive elements only. The hero glow at 0.05-0.10 opacity is intentionally subtle.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Page transitions | Custom JS transition system | Nuxt `pageTransition` config | Built into framework, handles SSG correctly |
| Transition timing consistency | Manual CSS on each element | Tailwind `transition` utility class | Default 150ms + ease matches requirements |
| Card shadow animation | Custom shadow keyframes | `shadow-card` / `shadow-card-hover` tokens | Already defined, auto-generates utilities |
| Gold glow border | Custom `border-image` or gradients | `box-shadow` with gold rgba | Simpler, better performance, softer appearance |
| Touch target sizing | Custom mobile styles | `min-h-[44px]` utility | Standard a11y pattern, no abstraction needed |
| Responsive typography | Custom viewport-based calc() | Tailwind responsive prefixes (`sm:`, `lg:`) | Already used throughout codebase |

## Common Pitfalls

### Pitfall 1: Hard Gold Border Instead of Soft Glow
**What goes wrong:** Using `hover:border-gold` or `hover:border-gold/50` creates a sharp, clearly visible gold border line.
**Why it happens:** Border is a 1px hard-edged property. Glow requires diffusion.
**How to avoid:** Use `box-shadow` with gold color at low opacity (0.10-0.15) and 6-12px blur for the glow effect. Keep the border subtle (`border-gold/20` at most).
**Warning signs:** If you can clearly see the border color change, it is too strong.

### Pitfall 2: Gold Overload from Hero Glow
**What goes wrong:** The hero radial glow is too visible, making the page feel garish.
**Why it happens:** Opacity values that look good on a designer's calibrated monitor look too bright on consumer screens.
**How to avoid:** Start at `opacity: 0.05` and increase to max `0.10`. The requirement says "felt, not seen" and specifies the 0.05-0.10 range. Test on multiple screens.
**Warning signs:** If you notice the glow without looking for it, the opacity is too high.

### Pitfall 3: Page Transition Flicker on SSG
**What goes wrong:** On first page load of a prerendered page, the transition CSS causes a flash or fade-in.
**Why it happens:** The transition classes may apply during initial SSR hydration.
**How to avoid:** The `mode: 'out-in'` and Nuxt's built-in handling should prevent this. The transition only activates on client-side navigation between pages, not on initial page load. If flickering occurs, ensure the CSS only targets `.page-enter-from` / `.page-leave-to` (not a generic fade on load).
**Warning signs:** Pages flash white/transparent on direct URL access.

### Pitfall 4: Touch Target Breaking Desktop Layout
**What goes wrong:** Adding `min-h-[44px]` to all elements makes desktop layout too spaced out.
**Why it happens:** 44px touch targets are needed on mobile but not desktop.
**How to avoid:** Apply touch target sizing only on mobile using default (mobile-first) styles and override on `sm:` breakpoint. Example: `min-h-[44px] sm:min-h-0`.
**Warning signs:** Desktop navigation looks overly padded.

### Pitfall 5: Transition Properties Conflicting
**What goes wrong:** Using `transition-colors` on some elements and `transition` on others creates inconsistent behavior.
**Why it happens:** `transition-colors` only transitions color properties, missing `box-shadow` and `transform`.
**How to avoid:** Use the generic `transition` utility everywhere for Phase 3 elements, which covers color, box-shadow, transform, and opacity. This ensures all hover effects (color change, shadow emergence, lift) transition together.
**Warning signs:** Some properties snap while others transition smoothly.

### Pitfall 6: Existing hover:border-gold/50 on BlogPostCard
**What goes wrong:** The current `hover:border-gold/50` on BlogPostCard conflicts with the new soft glow approach.
**Why it happens:** Phase 2 already added this hover style.
**How to avoid:** Replace `hover:border-gold/50` with the new box-shadow-based glow. Don't stack both.

## Code Examples

### Complete BlogPostCard Hover (CARD-01 + CARD-02)
```vue
<article class="
  bg-dark-surface border border-dark-border rounded-lg p-8
  shadow-card
  transition duration-200 ease-smooth
  hover:-translate-y-0.5
  hover:bg-dark-elevated
  hover:shadow-[0_4px_12px_rgba(0,0,0,0.5),0_0_8px_rgba(201,184,140,0.12)]
  hover:border-gold/20
">
```

Breakdown:
- `shadow-card` -- resting shadow from theme token
- `transition duration-200 ease-smooth` -- consistent 200ms with smooth easing
- `hover:-translate-y-0.5` -- 2px lift (subtle, not jarring)
- `hover:bg-dark-elevated` -- uses the reserved elevated surface color
- `hover:shadow-[...]` -- compound shadow: depth shadow + gold glow halo
- `hover:border-gold/20` -- very faint border tint (glow is from shadow)

### Complete TagBadge Hover (CARD-03)
```vue
<!-- Linked variant -->
<NuxtLink class="
  inline-flex items-center text-xs px-3 py-1.5 rounded-full
  border border-gold/30 text-gold-dim
  transition duration-200 ease-smooth
  hover:border-gold hover:text-gold
  hover:shadow-[0_0_8px_rgba(201,184,140,0.2)]
">
```

### Nav/Footer Link Transitions (TRNS-02)
```vue
<!-- Already uses transition-colors, upgrade to transition for full coverage -->
<NuxtLink class="
  text-sm text-cream-muted
  transition duration-200 ease-smooth
  hover:text-gold
">
```

### Hero Radial Glow (HERO-01 + HERO-02)
```vue
<section class="py-12 sm:py-20 relative overflow-hidden">
  <div
    class="absolute -top-10 -left-10 w-[28rem] h-52 pointer-events-none opacity-[0.07]"
    aria-hidden="true"
    style="background: radial-gradient(ellipse at center, rgba(201,184,140,0.6) 0%, transparent 70%); filter: blur(40px);"
  ></div>
  <h1 class="relative text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gold">
    Chain Insights Blog
  </h1>
  <p class="relative mt-4 text-lg text-cream-muted max-w-2xl leading-relaxed">
    ...
  </p>
</section>
```

Notes:
- `overflow-hidden` on section prevents glow from creating horizontal scroll
- `relative` on text elements ensures they render above the glow
- `-top-10 -left-10` positions the glow slightly off-center, behind the heading area
- `opacity-[0.07]` is in the 0.05-0.10 range

### Page Transition CSS
```css
/* In main.css */
.page-enter-active,
.page-leave-active {
  transition: opacity 250ms var(--ease-fluid);
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}
```

### Mobile Touch Targets (RESP-01)
```vue
<!-- Header nav links -->
<NuxtLink class="text-sm text-cream-muted hover:text-gold transition duration-200 ease-smooth
                  min-h-[44px] inline-flex items-center sm:min-h-0">
  {{ link.label }}
</NuxtLink>

<!-- Footer links -->
<a class="hover:text-gold transition duration-200 ease-smooth
          min-h-[44px] inline-flex items-center sm:min-h-0">
  App
</a>
```

### Mobile Typography Scale (RESP-02)
Current responsive typography is already in place:
- Hero: `text-3xl sm:text-4xl lg:text-5xl` (good)
- Post title: `text-3xl sm:text-4xl lg:text-5xl` (good)
- Card titles: `text-xl` (consider `text-lg sm:text-xl` if needed)
- Body: `text-lg` in prose (good)

The existing responsive prefixes handle typography scaling. Verify the base (mobile) sizes look appropriate.

### Mobile Spacing (RESP-03)
Current responsive spacing:
- Layout padding: `px-4 sm:px-6` (good)
- Hero: `py-12 sm:py-20` (good)
- Main: `py-6 sm:py-8` (good)

These already reduce spacing on mobile. The pattern is established and should be followed for any new spacing added in this phase.

### Mobile Header Navigation (RESP-04)
Current header: `gap-6` between nav links with `h-16` height. With only 2 links ("Home", "About"), this fits cleanly on mobile. The links should get 44px touch targets. If more links are added in the future, a hamburger menu would be needed, but with 2 links this is not necessary now.

Verify: logo (`h-8`) + 2 links + gaps fit within 320px viewport (minimum mobile width).

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| JS animation libraries for hover | CSS transitions with `transition` shorthand | Always for simple hovers | Zero JS, better performance |
| Custom transition class per element | Tailwind `transition` utility (covers all properties) | Tailwind v4 | Single class covers all needed properties |
| `will-change: transform` on hover elements | Not needed for simple CSS transitions | Modern browsers | Browser already optimizes short transitions |
| Tailwind v3 config-based easing | Tailwind v4 `@theme { --ease-* }` | 2025 | CSS-first, generates utilities automatically |
| Manual `box-shadow` values everywhere | Theme tokens `--shadow-card` | This project | Consistent shadows via utility classes |

## Open Questions

1. **Compound box-shadow in Tailwind arbitrary value syntax**
   - What we know: Tailwind v4 supports `shadow-[value]` for arbitrary shadows
   - What's unclear: Whether commas in compound shadows (two shadow layers) work correctly in class attributes. The syntax `hover:shadow-[0_4px_12px_rgba(0,0,0,0.5),0_0_8px_rgba(201,184,140,0.12)]` uses underscores for spaces and a comma to separate layers.
   - Recommendation: Test this first. If Tailwind parsing has issues with compound shadows in brackets, define a custom `--shadow-card-glow` token in `@theme` instead:
     ```css
     --shadow-card-glow: 0 4px 12px rgba(0, 0, 0, 0.5), 0 0 8px rgba(201, 184, 140, 0.12);
     ```
     Then use `hover:shadow-card-glow` -- this is cleaner regardless.

2. **Hero glow opacity calibration**
   - What we know: 0.05-0.10 range specified
   - What's unclear: Exact value depends on monitor calibration and viewing conditions
   - Recommendation: Start at 0.07, visually verify in dev tools by toggling, adjust as needed

3. **Tag badge touch target sizing**
   - What we know: Badges are small (`text-xs px-2.5 py-1`) and need 44px height on mobile
   - What's unclear: Whether `min-h-[44px]` on inline badges within card hover areas creates layout issues
   - Recommendation: Apply `min-h-[44px]` only to standalone linked badges (tag page links), not badges inside cards (since the entire card is the click target)

## Sources

### Primary (HIGH confidence)
- Tailwind CSS v4 official docs -- transition-property, transition-duration, transition-timing-function, theme variables
- Nuxt v4 official docs -- page transitions, NuxtPage component
- Codebase analysis -- all component files, main.css, nuxt.config.ts

### Secondary (MEDIUM confidence)
- MDN Web Docs -- box-shadow, radial-gradient
- WCAG 2.5.8 -- 44px touch target minimum
- Apple HIG -- touch target guidelines

### Tertiary (LOW confidence)
- WebSearch for card hover patterns -- community examples verified against official CSS specs

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- no new deps, all existing tokens verified in codebase
- Architecture (card/badge hover): HIGH -- standard CSS transitions, verified Tailwind v4 utility mapping
- Architecture (page transitions): HIGH -- official Nuxt v4 docs confirm approach
- Architecture (hero glow): MEDIUM -- CSS technique is standard, but exact visual tuning needs iteration
- Pitfalls: HIGH -- based on codebase analysis and known CSS behavior
- Mobile responsiveness: HIGH -- existing responsive patterns in codebase, standard Tailwind approach

**Research date:** 2026-02-06
**Valid until:** 2026-03-06 (stable domain, CSS patterns do not change rapidly)
