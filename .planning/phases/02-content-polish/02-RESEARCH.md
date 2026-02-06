# Phase 2: Content Polish - Research

**Researched:** 2026-02-06
**Domain:** Prose element styling, code block refinement, gradient dividers via Tailwind CSS v4 + @tailwindcss/typography
**Confidence:** HIGH

## Summary

Phase 2 polishes the blog post content rendering. It covers four domains: (1) blockquote styling with gold left border and background tint, (2) code block refinement with palette-harmonized borders and padding, (3) gradient fade dividers replacing hard borders on header and footer, and (4) prose link hover transitions and image border treatments. All 8 requirements (PROS-01 through PROS-04, CODE-01, CODE-02, DIVD-01, DIVD-02) are achievable through CSS modifications to `main.css` and minor template updates to AppHeader.vue and AppFooter.vue, with zero new dependencies.

The current codebase is well-positioned: Phase 1 established all design tokens and prose variable overrides using `var()` references. The typography plugin's `--tw-prose-quote-borders` variable currently points to `var(--color-dark-border)` (a dark muted border), which needs to change to gold. Blockquote background tint, image borders, link transitions, and code block refinement all require adding CSS rules to the existing `.prose` override block in main.css. The gradient dividers for header/footer require replacing `border-b border-dark-border` and `border-t border-dark-border` with pseudo-elements or dedicated divider elements using `background: linear-gradient(to right, transparent, var(--color-gold)/20%, transparent)`.

The key constraint is "gold restraint" from Phase 1 research: gold should be used sparingly. For this phase, gold at low opacity (20%) is appropriate for blockquote borders and gradient dividers since these are decorative accents, not text elements. Code blocks should use the existing dark-surface and dark-border tokens, not gold, to maintain the palette hierarchy.

**Primary recommendation:** Add all prose element overrides in main.css (blockquote, code, images, links), then replace header/footer hard borders with gradient fade dividers -- CSS-only changes with two small template edits.

## Standard Stack

The established libraries/tools for this domain:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Tailwind CSS | ^4.1.18 | Utility CSS + @theme tokens | Already installed; CSS-first config with v4 |
| @tailwindcss/typography | ^0.5.19 | Prose styling for markdown | Already installed; --tw-prose-* CSS variables are the customization API |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| Nuxt Content v3 / @nuxtjs/mdc | bundled | Prose component rendering | Default Prose components (ProseBlockquote, ProseImg, etc.) render markdown elements; can be overridden in components/content/ |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| CSS overrides in main.css | Custom Prose components (components/content/ProseBlockquote.vue, etc.) | Component overrides give full control but add files and complexity. CSS overrides in main.css are simpler for styling changes and keep everything centralized. Use component overrides only if structural HTML changes are needed. |
| Pseudo-element gradient dividers | Dedicated `<div>` gradient elements | Pseudo-elements keep templates cleaner but require more complex CSS. A thin `<div>` with gradient background is simpler to implement and easier to maintain. Recommend the `<div>` approach for header/footer dividers. |
| border-image with gradient | background gradient on separate element | border-image cannot use border-radius and has limited browser control. A 1px-height div with linear-gradient background is the standard approach. |

**Installation:**
```bash
# Nothing to install. All tools already in the project.
```

## Architecture Patterns

### Recommended File Changes
```
app/assets/css/main.css          # PRIMARY: All prose element overrides (blockquote, code, images, links)
app/components/AppHeader.vue     # Replace border-b with gradient divider element
app/components/AppFooter.vue     # Replace border-t with gradient divider element
```

### Pattern 1: Prose Element Overrides via CSS Selectors in main.css
**What:** Target specific HTML elements within `.prose` using descendant selectors to override the typography plugin's defaults. This is the standard approach for customizing prose styling without needing component overrides.
**When to use:** When you need to change visual styling (colors, borders, backgrounds, transitions) but not HTML structure.
**Why not prose-* modifiers:** The `prose-blockquote:` element modifiers work in template classes (e.g., `prose prose-blockquote:border-gold`), but our blog applies `prose` in a single place (`post/[...slug].vue`), and stacking many modifiers in the class attribute becomes unreadable. CSS rules in main.css are cleaner for comprehensive overrides.
**Example:**
```css
/* Source: @tailwindcss/typography source (styles.js) */
/* Typography plugin default blockquote styles:
   fontWeight: 500, fontStyle: italic,
   color: var(--tw-prose-quotes),
   borderInlineStartWidth: 0.25rem,
   borderInlineStartColor: var(--tw-prose-quote-borders)
*/

/* Override quote borders to gold */
.prose {
  --tw-prose-quote-borders: var(--color-gold);
}

/* Add background tint to blockquotes */
.prose blockquote {
  background-color: color-mix(in srgb, var(--color-gold) 5%, transparent);
  border-radius: 0 0.5rem 0.5rem 0;
  padding: 1rem 1.25rem;
}
```

### Pattern 2: Gradient Fade Divider (Replacing Hard Borders)
**What:** Replace `border-b border-dark-border` on header and `border-t border-dark-border` on footer with a thin element that uses a horizontal linear gradient from transparent to gold/20% to transparent.
**When to use:** When you want a soft, premium-feeling divider instead of a solid border line.
**Implementation approach:** Use a dedicated `<div>` element with 1px height and gradient background. This is simpler and more maintainable than pseudo-elements.
**Example:**
```html
<!-- In AppHeader.vue: Replace border-b border-dark-border with gradient divider -->
<header class="sticky top-0 z-50 bg-dark/80 backdrop-blur-md">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
    <!-- ... nav content ... -->
  </div>
  <div class="h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent"></div>
</header>
```
```html
<!-- In AppFooter.vue: Replace border-t border-dark-border with gradient divider -->
<footer class="py-8 mt-auto">
  <div class="h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent"></div>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 pt-8 flex ...">
    <!-- ... footer content ... -->
  </div>
</footer>
```
**CSS equivalent:** `background: linear-gradient(to right, transparent, color-mix(in srgb, var(--color-gold) 20%, transparent), transparent);`

### Pattern 3: Prose Link Hover Transitions
**What:** Add smooth transition for underline color and text color on hover for links inside prose content. The typography plugin does not add transitions by default.
**When to use:** For all `.prose a` elements to create refined interactive feedback.
**Example:**
```css
.prose a {
  text-decoration-color: var(--color-gold-dim);
  text-underline-offset: 3px;
  text-decoration-thickness: 1px;
  transition: color 0.2s var(--ease-smooth), text-decoration-color 0.2s var(--ease-smooth);
}

.prose a:hover {
  color: var(--color-cream);
  text-decoration-color: var(--color-gold);
}
```

### Pattern 4: Image Border Treatment in Prose
**What:** Add subtle border and rounded corners to images within prose content.
**When to use:** To give images a refined, contained look within blog posts.
**Example:**
```css
.prose img {
  @apply rounded-lg;
  border: 1px solid var(--color-dark-border);
}
```

### Anti-Patterns to Avoid
- **Creating custom Prose components for pure styling changes:** Do not create `components/content/ProseBlockquote.vue` just to add a background color. CSS overrides in main.css are simpler and keep styling centralized. Only create component overrides if the HTML structure needs to change.
- **Using border-image for gradient dividers:** `border-image` cannot be combined with `border-radius` and has inconsistent rendering. Use a dedicated element or pseudo-element with `background: linear-gradient(...)` instead.
- **Over-applying gold to code blocks:** Code blocks should use dark-surface/dark-border tokens, not gold borders. The gold is already used for inline `code` text color (`--tw-prose-code: var(--color-gold)`). Adding gold borders to code blocks would violate gold restraint.
- **Using `rgba()` instead of `color-mix()` for opacity:** Tailwind v4 uses `color-mix()` natively for the `/opacity` syntax. For CSS-level mixing, `color-mix(in srgb, var(--color-gold) 5%, transparent)` works with CSS variables, whereas `rgba()` requires raw RGB values.
- **Hardcoding hex values in new CSS rules:** Per PROS-04, all new CSS must use `var(--color-*)` references. The only hex values allowed are the token definitions in @theme.

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Blockquote left border color | Custom border-left CSS from scratch | `--tw-prose-quote-borders` CSS variable | Typography plugin already applies border-left; just change the variable value |
| Code block background/text | Custom pre styling from scratch | `--tw-prose-pre-bg` and `--tw-prose-pre-code` variables | Plugin already applies bg and text color; override variables for colors, add `.prose pre {}` for border/padding refinement |
| Prose link styling | Custom link component | `.prose a` and `.prose a:hover` CSS rules | Plugin already generates the a element styling; add transition and hover refinement |
| Horizontal gradient divider | SVG or canvas | `bg-gradient-to-r from-transparent via-gold/20 to-transparent` | Tailwind v4 gradient utilities handle this in a single class string |
| Image rounded corners | Custom ProseImg component | `.prose img { @apply rounded-lg; border: ... }` | CSS selector override is simpler than component override for a purely visual change |

**Key insight:** The typography plugin handles 80% of the styling through CSS variables. This phase is mostly about (a) changing variable values and (b) adding a few targeted CSS rules for effects the plugin does not provide (background tints, transitions, gradient dividers).

## Common Pitfalls

### Pitfall 1: Blockquote Background Breaks Padding
**What goes wrong:** Adding `background-color` to blockquote without adjusting padding creates cramped text. The default blockquote has `padding-inline-start` but no vertical padding or right padding, so the background tint only extends to the text boundary on top, right, and bottom.
**Why it happens:** The typography plugin only sets `paddingInlineStart` on blockquotes (e.g., `1em` for prose-lg). Top/bottom/right padding are 0.
**How to avoid:** When adding a background color, also add explicit padding on all sides: `padding: 1rem 1.25rem`. The border-radius should be `0 0.5rem 0.5rem 0` (flat left edge to align with border, rounded right edge).
**Warning signs:** Background tint hugs text too tightly on right/top/bottom; looks unfinished.

### Pitfall 2: color-mix() Browser Support
**What goes wrong:** Using `color-mix()` for background tints fails in older browsers.
**Why it happens:** `color-mix()` has ~95% browser support as of 2025, but Safari < 16.4 and Firefox < 113 don't support it.
**How to avoid:** For a blog targeting modern browsers, this is acceptable. Alternatively, define a dedicated token like `--color-gold-5: rgba(201, 184, 140, 0.05)` in @theme for the background tint. However, Tailwind v4 already uses color-mix() internally for the `/opacity` syntax (e.g., `bg-gold/20`), so if Tailwind works, color-mix() works.
**Warning signs:** Background appears transparent in older browsers. Not a concern for this project's target audience.

### Pitfall 3: Gradient Divider Not Visible
**What goes wrong:** The gradient divider (`from-transparent via-gold/20 to-transparent`) is invisible or barely visible because 20% opacity gold on a dark background has very low contrast.
**Why it happens:** Gold (#C9B88C) at 20% opacity on near-black (#0A0A0F) produces an extremely subtle color.
**How to avoid:** Test the opacity value. Start with `via-gold/20` and increase if needed. `via-gold/30` may be more visible while still being subtle. The exact value should be tuned visually.
**Warning signs:** Divider appears invisible at normal viewing distance; looks like borders were simply removed.

### Pitfall 4: Code Block Border Conflicts with Plugin Defaults
**What goes wrong:** Adding border styles to `.prose pre` in main.css does not take effect because the existing rule `.prose pre { @apply border border-dark-border rounded-lg; }` is already in main.css from Phase 1.
**Why it happens:** The rule already exists. Phase 2 needs to refine it, not add a duplicate.
**How to avoid:** Modify the existing `.prose pre` rule in place rather than adding a new one. Check for existing rules before adding.
**Warning signs:** Duplicate selectors in main.css; styles not applying as expected.

### Pitfall 5: Prose Quote Variables Already Correct
**What goes wrong:** Developer changes `--tw-prose-quote-borders` to gold but forgets that `--tw-prose-quotes` (the text color) is already set to `var(--color-cream)` from Phase 1. The blockquote text stays cream, which is correct per gold restraint -- only the border should be gold.
**Why it happens:** Confusion between `--tw-prose-quotes` (text color) and `--tw-prose-quote-borders` (border color). They sound similar.
**How to avoid:** Change ONLY `--tw-prose-quote-borders` to gold. Leave `--tw-prose-quotes` as cream. The blockquote text should remain cream; only the left border accent is gold.
**Warning signs:** Blockquote text turns gold (too much gold; violates restraint).

### Pitfall 6: Footer Gradient Divider Spacing
**What goes wrong:** After removing `border-t` from the footer and adding a gradient divider `<div>`, the vertical spacing changes because `border-t` contributed 1px to the box model, and the new div is a separate block element.
**Why it happens:** The gradient div is outside the main padding container, changing the spacing relationship.
**How to avoid:** When restructuring the footer template, ensure the `pt-8` (or equivalent padding) is on the content container below the gradient div, not on the footer element itself. Test that visual spacing matches the original.
**Warning signs:** Footer content appears higher/lower than before; gap between divider and content is wrong.

## Code Examples

Verified patterns from official sources and codebase analysis:

### Complete Blockquote Styling (PROS-01)
```css
/* Source: @tailwindcss/typography styles.js (verified), modified for gold/cream palette */

/* Step 1: Change the quote border variable from dark-border to gold */
.prose {
  --tw-prose-quote-borders: var(--color-gold);
  /* --tw-prose-quotes stays var(--color-cream) -- text remains cream */
}

/* Step 2: Add background tint and refined padding */
.prose blockquote {
  background-color: color-mix(in srgb, var(--color-gold) 5%, transparent);
  border-radius: 0 0.5rem 0.5rem 0;
  padding: 1rem 1.25rem;
  /* Note: border-inline-start-width (0.25rem) and border-inline-start-color
     are handled by the typography plugin via --tw-prose-quote-borders */
}
```

### Image Border Treatment (PROS-02)
```css
/* Source: Current main.css .prose img rule, enhanced */

.prose img {
  @apply rounded-lg;
  border: 1px solid var(--color-dark-border);
}
```

### Prose Link Transitions (PROS-03)
```css
/* Source: Current main.css .prose a rules, enhanced with transitions */

.prose a {
  text-decoration-color: var(--color-gold-dim);
  text-underline-offset: 3px;
  text-decoration-thickness: 1px;
  transition: color 0.2s var(--ease-smooth), text-decoration-color 0.2s var(--ease-smooth);
}

.prose a:hover {
  color: var(--color-cream);
  text-decoration-color: var(--color-gold);
}
```

### Code Block Refinement (CODE-01, CODE-02)
```css
/* Source: Current main.css .prose pre rule, refined */
/* The typography plugin (prose-lg) defaults:
   border-radius: 0.375rem, padding: 1em 1.5em,
   bg: var(--tw-prose-pre-bg) = var(--color-dark-surface) */

.prose pre {
  @apply border border-dark-border rounded-lg;
  padding: 1.25rem 1.5rem;
  /* background-color is already var(--color-dark-surface) via --tw-prose-pre-bg */
  /* text color is already var(--color-cream) via --tw-prose-pre-code */
}

/* Inline code styling refinement */
.prose :where(code):not(:where(pre code)) {
  background-color: var(--color-dark-surface);
  padding: 0.2em 0.4em;
  border-radius: 0.25rem;
  font-weight: 500;
  /* color is already var(--color-gold) via --tw-prose-code */
}
```

### Gradient Fade Divider - Header (DIVD-01, DIVD-02)
```html
<!-- AppHeader.vue -->
<template>
  <header class="sticky top-0 z-50 bg-dark/80 backdrop-blur-md">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
      <!-- nav content unchanged -->
    </div>
    <div class="h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent"></div>
  </header>
</template>
```

### Gradient Fade Divider - Footer (DIVD-01, DIVD-02)
```html
<!-- AppFooter.vue -->
<template>
  <footer class="mt-auto">
    <div class="h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent"></div>
    <div class="max-w-4xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-cream-muted">
      <!-- footer content unchanged -->
    </div>
  </footer>
</template>
```

### PROS-04 Verification: No Hardcoded Hex in Prose Overrides
```css
/* Phase 1 already converted all prose variables to var() references.
   Phase 2 audit confirms: only @theme token definitions contain hex values.
   All new CSS rules in Phase 2 must use var(--color-*) references.

   Current state (verified):
   - All 14 --tw-prose-* variables use var(--color-*) references
   - The only exception is --tw-prose-kbd-shadows: 201 184 140 (raw RGB triplet, required by plugin)
   - No hex values exist outside of @theme block
*/
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `rgba(r, g, b, a)` for variable opacity | `color-mix(in srgb, var(--color) %, transparent)` | 2023+ (CSS Color Level 5) | Works with CSS custom properties unlike rgba() |
| `border-image: linear-gradient(...)` for gradient borders | Separate 1px-height div with `background: linear-gradient(...)` | N/A (best practice) | border-image cannot use border-radius; separate element is more flexible |
| Tailwind `bg-opacity-*` utilities | Tailwind v4 slash syntax `bg-gold/20` | v4.0 (Jan 2025) | Uses color-mix() internally; more intuitive |
| Static underline on links | `text-decoration-color` + `transition` for smooth hover | CSS3+ | Enables animated underline color transitions |

**Deprecated/outdated:**
- `border-image` for gradient effects: Cannot combine with border-radius. Use background gradient on separate elements instead.
- `rgba(201, 184, 140, 0.05)` for gold tint: Does not work with CSS custom properties. Use `color-mix()` or Tailwind's `/opacity` syntax.

## Open Questions

Things that could not be fully resolved:

1. **Gold opacity for gradient dividers: 20% vs 30%**
   - What we know: `via-gold/20` creates a very subtle gradient on the dark background. This may be too subtle to notice at normal viewing distance.
   - What is unclear: Whether 20% opacity provides sufficient visual distinction, or if 30% is needed.
   - Recommendation: Start with `via-gold/20` as specified in the requirements. If barely visible during implementation, increase to `via-gold/30`. This is a single-value tweak that does not affect architecture.

2. **Blockquote background tint intensity: 5% vs 8%**
   - What we know: Gold at 5% opacity (`color-mix(in srgb, var(--color-gold) 5%, transparent)`) creates a barely-there warm tint. At 8-10%, it becomes more noticeable.
   - What is unclear: The exact opacity that feels "subtle" versus "visible" on the dark background.
   - Recommendation: Start with 5% and increase if the effect is invisible. The CSS is a single value change. Alternative: use `var(--color-dark-surface)` as the blockquote background instead of a gold tint, if gold proves too warm.

3. **Inline code background: dark-surface vs dark-elevated**
   - What we know: `--color-dark-surface` (#12121A) is the standard card background. `--color-dark-elevated` (#1A1A26) is one step lighter. Inline code within prose body text could use either.
   - What is unclear: Which provides better visual distinction for inline code spans without being too prominent.
   - Recommendation: Use `var(--color-dark-surface)` for inline code background. It provides subtle distinction from the page background (#0A0A0F) without being as prominent as `dark-elevated`. Note: `--color-dark-elevated` was explicitly reserved for Phase 3 per STATE.md.

## Detailed Requirements Mapping

| Requirement | Implementation Approach | Files Changed |
|-------------|------------------------|---------------|
| PROS-01: Blockquote gold border + background tint | Change `--tw-prose-quote-borders` to gold, add `.prose blockquote` background + padding | main.css |
| PROS-02: Image border treatment + rounded corners | Enhance `.prose img` with border | main.css |
| PROS-03: Link underline + hover transitions | Enhance `.prose a` and `.prose a:hover` with transition and decoration-thickness | main.css |
| PROS-04: Prose CSS variables use var() tokens | Already done in Phase 1; Phase 2 verifies and ensures new rules follow pattern | main.css (audit) |
| CODE-01: Code block border/padding/radius | Refine existing `.prose pre` rule; add inline code background | main.css |
| CODE-02: Code block palette harmony | Verify --tw-prose-pre-bg and --tw-prose-pre-code use theme tokens (already true) | main.css (verify) |
| DIVD-01: Gradient fade dividers | Replace hard borders with gradient div elements | AppHeader.vue, AppFooter.vue |
| DIVD-02: Header/footer gradient borders | Remove border-b/border-t, add gradient divider elements | AppHeader.vue, AppFooter.vue |

## Sources

### Primary (HIGH confidence)
- [@tailwindcss/typography source code](https://github.com/tailwindlabs/tailwindcss-typography) - styles.js inspected directly in node_modules. Verified blockquote default styles (borderInlineStartWidth: 0.25rem, borderInlineStartColor: var(--tw-prose-quote-borders)), pre defaults (color: var(--tw-prose-pre-code), backgroundColor: var(--tw-prose-pre-bg)), and img defaults (empty style object with only margin).
- [Tailwind CSS v4 Gradient documentation](https://tailwindcss.com/docs/background-image) - `bg-gradient-to-r`, `from-transparent`, `via-{color}/{opacity}`, `to-transparent` utility classes.
- [Nuxt Content Prose Components](https://content.nuxt.com/docs/components/prose) - Override location: `components/content/Prose*.vue`. Not needed for this phase (CSS-only approach recommended).
- Phase 1 codebase analysis - Verified all existing prose overrides, design tokens, and component templates.

### Secondary (MEDIUM confidence)
- [CSS-Tricks: Gradient Borders in CSS](https://css-tricks.com/gradient-borders-in-css/) - Confirmed border-image limitations with border-radius; validated separate-element approach.
- [MDN: linear-gradient()](https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/linear-gradient) - Verified gradient syntax: `linear-gradient(to right, transparent, color, transparent)`.
- [MDN: color-mix()](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color-mix) - Verified syntax: `color-mix(in srgb, color percentage, transparent)`.

### Tertiary (LOW confidence)
- None. All findings verified with primary or secondary sources.

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- No new dependencies; all styling via existing Tailwind CSS v4 + typography plugin, verified against source code
- Architecture: HIGH -- CSS override patterns verified against typography plugin source (styles.js); gradient divider technique verified against MDN and CSS-Tricks
- Pitfalls: HIGH -- Identified from direct codebase inspection (existing rules that need modification, not duplication) and typography plugin source analysis
- Code examples: HIGH -- All examples reference existing tokens and verified CSS patterns; tested against current main.css structure

**Research date:** 2026-02-06
**Valid until:** 2026-03-06 (30 days -- stable domain, no fast-moving dependencies)
