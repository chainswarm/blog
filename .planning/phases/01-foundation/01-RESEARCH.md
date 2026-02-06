# Phase 1: Foundation - Research

**Researched:** 2026-02-06
**Domain:** Design tokens, typography system, and spatial rhythm via Tailwind CSS v4
**Confidence:** HIGH

## Summary

Phase 1 establishes the visual foundation for the entire blog overhaul. It covers three domains: (1) expanding the @theme design token system with surface elevations, additional color tiers, font tokens, shadow tokens, and easing curves; (2) loading and integrating the Inter font family with a deliberate typography scale and hierarchy; and (3) increasing spacing throughout the layout for a generous, premium feel. All 11 requirements (TYPO-01 through TYPO-04, SPAC-01 through SPAC-04, SURF-01 through SURF-03) are achievable through CSS modifications to `main.css` and Tailwind utility class updates in Vue templates, with zero new npm dependencies.

The current codebase has a solid starting point: the @theme block already defines core colors, the prose overrides already theme markdown content, and the utility-first approach in Vue templates is correct. The gaps are: (a) only 2 surface elevation levels exist (needs 3+), (b) no custom font is loaded (uses system defaults), (c) gold is overused (needs restraint -- cream for headings, gold for interactive only), (d) spacing is tight (hero py-8, cards space-y-6, need to roughly double), and (e) prose overrides use hardcoded hex instead of var() references.

The primary approach is to load Inter via Google Fonts CSS @import in main.css (no npm dependency needed), expand the @theme block with all required tokens, update prose overrides to reference theme variables, then update component templates with generous spacing and the correct color assignments.

**Primary recommendation:** Expand @theme tokens first (colors, fonts, shadows, easings), then load Inter font, then update prose overrides to use var() references, then update component spacing and color usage -- in that order, because every downstream change depends on stable tokens.

## Standard Stack

The established libraries/tools for this domain:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Tailwind CSS | ^4.1.18 | Utility CSS framework with @theme token system | Already installed; @theme directive is the v4 standard for design tokens |
| @tailwindcss/typography | ^0.5.19 | Prose styling for markdown content | Already installed; --tw-prose-* CSS variables are the official customization API |
| Inter (Google Fonts) | Variable font | Premium sans-serif for body and headings | Industry standard for screen UI; supports weights 100-900; designed for readability on screens; free SIL license |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| Google Fonts CDN | CSS API v2 | Font delivery with subsetting and font-display:swap | Load Inter weights 400, 500, 700 via @import URL in main.css |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Google Fonts CDN @import | Self-hosted WOFF2 files | Self-hosting gives more control but adds build complexity; CDN approach is simpler and "no new dependency" compliant |
| Google Fonts CDN @import | @nuxtjs/google-fonts module | Module adds npm dependency (violates constraint); manual link tags in nuxt.config also work but @import in CSS is simplest |
| Inter | Geist Sans | Geist is Vercel's own font and equally excellent; Inter has broader ecosystem adoption and is a better cultural fit for crypto/fintech |

**Installation:**
```bash
# Nothing to install. Inter loads via CSS @import from Google Fonts CDN.
# All other tools are already in the project.
```

## Architecture Patterns

### Recommended File Changes
```
app/assets/css/main.css     # PRIMARY: @theme expansion, font @import, prose overrides
app/pages/index.vue          # Spacing updates (hero section, card list gaps)
app/pages/post/[...slug].vue # Spacing updates (post header, prose area)
app/components/BlogPostCard.vue  # Surface color, spacing, gold restraint
app/layouts/default.vue      # Layout spacing adjustments
```

### Pattern 1: Font Loading via CSS @import (No New Dependencies)
**What:** Load Inter from Google Fonts using a CSS @import statement at the top of main.css, then define --font-sans in @theme to use it.
**When to use:** When you need a web font without adding an npm module.
**Example:**
```css
/* Source: https://tailwindcss.com/docs/font-family */
/* Source: https://developers.google.com/fonts/docs/css2 */

/* MUST be before @import "tailwindcss" */
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap");

@import "tailwindcss";
@plugin "@tailwindcss/typography";

@theme {
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}
```
**Critical:** The Google Fonts @import MUST come before `@import "tailwindcss"` because browsers require @import statements to come before other CSS rules.

### Pattern 2: Surface Elevation via Color Token Tiers
**What:** Define 3+ surface colors in @theme that create visual depth through progressively lighter backgrounds, not shadows.
**When to use:** Always for dark themes. Shadows are invisible on dark backgrounds.
**Example:**
```css
/* Source: Material Design dark theme guidance */
/* Source: .planning/research/STACK.md */
@theme {
  --color-dark: #0A0A0F;          /* Level 0: Page background */
  --color-dark-surface: #12121A;   /* Level 1: Cards, content areas */
  --color-dark-elevated: #1A1A26;  /* Level 2: Hover states, elevated elements */
  --color-dark-border: #1E1E2A;    /* Default borders */
}
```

### Pattern 3: Gold Restraint via Token Naming Convention
**What:** Define color tokens that make the gold usage policy self-documenting. Interactive gold for links/buttons, cream for headings/body.
**When to use:** To prevent gold overload -- the #1 risk identified in prior research.
**Example:**
```css
@theme {
  /* Gold for INTERACTIVE elements only */
  --color-gold: #C9B88C;
  --color-gold-dim: #A89A6E;

  /* Cream for HEADINGS and BODY text */
  --color-cream: #E8E6E3;
  --color-cream-muted: #B0ADA8;
}
```

### Pattern 4: Typography Scale with Bundled Properties
**What:** Define custom text sizes in @theme with associated line-height, letter-spacing, and font-weight.
**When to use:** When you need a custom typography scale beyond Tailwind defaults.
**Example:**
```css
/* Source: https://tailwindcss.com/docs/font-size */
@theme {
  --text-heading-1: 2.25rem;
  --text-heading-1--line-height: 1.2;
  --text-heading-1--letter-spacing: -0.025em;
  --text-heading-1--font-weight: 700;

  --text-heading-2: 1.5rem;
  --text-heading-2--line-height: 1.3;
  --text-heading-2--letter-spacing: -0.025em;
  --text-heading-2--font-weight: 700;
}
```
**Note:** Whether to define a full custom scale vs. using Tailwind defaults with explicit tracking/leading classes is a tradeoff. For a blog with few text sizes, using Tailwind's built-in `text-3xl tracking-tight font-bold` with `leading-relaxed` on body is simpler and equally effective. The custom scale approach is better if you need consistent bundles.

### Pattern 5: Prose Overrides Referencing Theme Tokens
**What:** Update the .prose block to use var(--color-*) instead of hardcoded hex values.
**When to use:** Always. This creates a single source of truth for colors.
**Example:**
```css
/* Source: https://github.com/tailwindlabs/tailwindcss-typography */
.prose {
  --tw-prose-body: var(--color-cream);
  --tw-prose-headings: var(--color-cream);        /* Changed from gold to cream */
  --tw-prose-lead: var(--color-cream-muted);
  --tw-prose-links: var(--color-gold);             /* Links stay gold (interactive) */
  --tw-prose-bold: var(--color-cream);
  --tw-prose-counters: var(--color-cream-muted);   /* Changed from gold-dim */
  --tw-prose-bullets: var(--color-cream-muted);    /* Changed from gold-dim */
  --tw-prose-hr: var(--color-dark-border);
  --tw-prose-quotes: var(--color-cream);           /* Changed from gold */
  --tw-prose-quote-borders: var(--color-dark-border); /* Changed from gold */
  --tw-prose-captions: var(--color-cream-muted);
  --tw-prose-kbd: var(--color-cream);
  --tw-prose-code: var(--color-gold);              /* Code stays gold (semantic highlight) */
  --tw-prose-pre-code: var(--color-cream);
  --tw-prose-pre-bg: var(--color-dark-surface);
  --tw-prose-th-borders: var(--color-dark-border);
  --tw-prose-td-borders: var(--color-dark-border);
}
```
**Key change from current:** Prose headings change from gold to cream. Quote text and borders change from gold to cream/border. Bullets and counters change from gold-dim to cream-muted. This is the primary gold restraint mechanism.

### Anti-Patterns to Avoid
- **Splitting main.css into multiple files:** Over-engineering for a blog with ~4 components. Keep one file until it exceeds ~200 lines.
- **Adding `<style scoped>` blocks to Vue components:** The utility-first approach is correct. Scoped styles require @reference imports and slow builds.
- **Using `prose-invert` for a dark-only site:** The blog has no light mode. Direct --tw-prose-* overrides give full control over the custom palette.
- **Defining --font-sans with `@theme inline`:** Not needed here because the font value is a literal string, not a reference to another CSS variable. Use regular `@theme`.
- **Adding a Google Fonts npm module:** Violates the "no new dependencies" constraint. CSS @import achieves the same result.

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Font loading optimization | Custom preload/prefetch logic | Google Fonts CSS API v2 with `&display=swap` | Google Fonts automatically subsets, caches, and serves the optimal format per browser |
| Typography scale | Manual pixel calculations for each heading | Tailwind's built-in `text-{size}/{lineHeight}` shorthand + tracking utilities | The shorthand bundles font-size and line-height; no need for a custom scale unless you want non-standard sizes |
| Surface elevation system | Custom shadow calculations for dark mode | Color-based elevation via --color-dark, --color-dark-surface, --color-dark-elevated | Shadows are invisible on dark backgrounds; surface color tiers are the standard dark-mode depth technique |
| Prose styling | Manual CSS for every markdown element | @tailwindcss/typography with --tw-prose-* variable overrides | The plugin handles 30+ HTML elements with tested defaults; overriding variables is simpler than writing all the CSS |
| Easing curves | Guessing cubic-bezier values | Vercel-style --ease-fluid: cubic-bezier(0.3, 0, 0, 1) | Well-tested easing curves from Vercel's design guidelines feel intentional and premium |

**Key insight:** This phase is entirely CSS token work. Every effect (surface elevation, typography hierarchy, gold restraint, spacing) is achieved by defining the right @theme tokens and referencing them consistently. There is no JavaScript, no build configuration, and no new dependency involved.

## Common Pitfalls

### Pitfall 1: Google Fonts @import Order in main.css
**What goes wrong:** The Google Fonts @import is placed after `@import "tailwindcss"`, causing the browser to ignore it or fail silently. The font never loads but no error appears.
**Why it happens:** CSS spec requires all @import rules before other rules. Tailwind's @import counts as a rule.
**How to avoid:** Place the Google Fonts @import on the FIRST line of main.css, before `@import "tailwindcss"`.
**Warning signs:** Font falls back to system sans-serif; Inter is not visible in DevTools computed styles.

### Pitfall 2: Gold Overload -- Changing Tokens but Not Usage
**What goes wrong:** New tokens are defined (cream for headings, cream-muted for bullets) but components still use `text-gold` for headings in templates. The prose overrides are updated but the page headings are not.
**Why it happens:** Tokens and usage are separate concerns. Defining a token does not automatically apply it.
**How to avoid:** Update BOTH the @theme/prose tokens AND the component templates. Specifically: index.vue h1 (`text-gold` -> `text-cream`), post/[...slug].vue h1 (`text-gold` -> `text-cream`).
**Warning signs:** The squint test shows gold blobs; more than 3 gold elements visible in any viewport.

### Pitfall 3: Forgetting font-display:swap Causes Flash of Invisible Text
**What goes wrong:** Google Fonts loads without `display=swap`, causing text to be invisible until the font downloads (FOIT -- Flash of Invisible Text). On slow connections, the page appears blank for 1-3 seconds.
**Why it happens:** Default font-display is "auto" which most browsers treat as "block" (hide text until font loads).
**How to avoid:** Always include `&display=swap` in the Google Fonts URL. This shows system font immediately, then swaps to Inter when loaded.
**Warning signs:** Text flickers or disappears briefly on first load; Lighthouse flags "Ensure text remains visible during webfont load."

### Pitfall 4: --tw-prose-kbd-shadows Expects RGB Triplet, Not var()
**What goes wrong:** You try to replace `--tw-prose-kbd-shadows: 201 184 140` with `var(--color-gold)` and it breaks because the typography plugin expects a raw RGB triplet for this specific variable, not a color value.
**Why it happens:** The plugin uses this value inside an rgb() function internally.
**How to avoid:** Keep `--tw-prose-kbd-shadows` as a raw RGB triplet. It cannot reference a @theme color variable. This is the one exception to the "use var() everywhere" rule.
**Warning signs:** Kbd elements have no visible shadow or have broken styling.

### Pitfall 5: Spacing Changes Without Responsive Consideration
**What goes wrong:** Hero padding is increased to py-24 on all screens. On mobile (375px viewport), the hero takes up the entire screen and the first post card is not visible without scrolling.
**Why it happens:** Spacing values are set at desktop scale without mobile overrides.
**How to avoid:** Use responsive spacing: `py-12 sm:py-20 lg:py-24`. Always check mobile viewport first.
**Warning signs:** Hero or content sections feel oversized on phones; excessive scrolling to reach primary content.

### Pitfall 6: Prose Heading Color Conflicts with Page Title Color
**What goes wrong:** --tw-prose-headings is set to cream, but the page's h1 title (outside prose) is also cream, making it hard to distinguish the page title from article h2 headings.
**Why it happens:** Both use the same color with similar sizes.
**How to avoid:** The page h1 title (in templates) should be visually distinct from prose headings. Options: larger size, different weight, or keep page h1 as the one gold heading per page while prose headings are cream.
**Warning signs:** Page title and first article h2 look like the same element.

## Code Examples

Verified patterns from official sources:

### Complete @theme Block Expansion
```css
/* Source: https://tailwindcss.com/docs/theme */
/* Source: .planning/research/STACK.md, .planning/research/ARCHITECTURE.md */

@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap");

@import "tailwindcss";
@plugin "@tailwindcss/typography";

@theme {
  /* === Colors: Surface Elevation === */
  --color-dark: #0A0A0F;
  --color-dark-surface: #12121A;
  --color-dark-elevated: #1A1A26;
  --color-dark-border: #1E1E2A;

  /* === Colors: Brand === */
  --color-gold: #C9B88C;
  --color-gold-dim: #A89A6E;

  /* === Colors: Text === */
  --color-cream: #E8E6E3;
  --color-cream-muted: #B0ADA8;

  /* === Typography === */
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";

  /* === Shadows (for cards on dark) === */
  --shadow-card: 0 1px 3px rgba(0, 0, 0, 0.4);
  --shadow-card-hover: 0 4px 12px rgba(0, 0, 0, 0.5);

  /* === Easing Curves === */
  --ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-fluid: cubic-bezier(0.3, 0, 0, 1);
}
```

### Prose Overrides with var() References
```css
/* Source: https://github.com/tailwindlabs/tailwindcss-typography */
.prose {
  --tw-prose-body: var(--color-cream);
  --tw-prose-headings: var(--color-cream);
  --tw-prose-lead: var(--color-cream-muted);
  --tw-prose-links: var(--color-gold);
  --tw-prose-bold: var(--color-cream);
  --tw-prose-counters: var(--color-cream-muted);
  --tw-prose-bullets: var(--color-cream-muted);
  --tw-prose-hr: var(--color-dark-border);
  --tw-prose-quotes: var(--color-cream);
  --tw-prose-quote-borders: var(--color-dark-border);
  --tw-prose-captions: var(--color-cream-muted);
  --tw-prose-kbd: var(--color-cream);
  --tw-prose-kbd-shadows: 201 184 140;
  --tw-prose-code: var(--color-gold);
  --tw-prose-pre-code: var(--color-cream);
  --tw-prose-pre-bg: var(--color-dark-surface);
  --tw-prose-th-borders: var(--color-dark-border);
  --tw-prose-td-borders: var(--color-dark-border);
}
```

### Hero Section with Generous Spacing
```html
<!-- Source: Current index.vue, updated for SPAC-01 -->
<section class="py-12 sm:py-20">
  <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-cream">
    Chain Insights Blog
  </h1>
  <p class="mt-4 text-lg text-cream-muted max-w-2xl leading-relaxed">
    Project progress, architecture insights, and lessons learned...
  </p>
</section>
```

### Blog Post Card with Surface Elevation and Spacing
```html
<!-- Source: Current BlogPostCard.vue, updated for SURF-02, SPAC-04 -->
<article class="bg-dark-surface border border-dark-border rounded-lg p-8
               transition-colors hover:border-gold/50">
  <time class="text-sm text-cream-muted">{{ post.date }}</time>
  <h2 class="mt-3 text-xl font-semibold text-cream group-hover:text-gold transition-colors">
    {{ post.title }}
  </h2>
  <p class="mt-3 text-cream-muted leading-relaxed">
    {{ post.description }}
  </p>
</article>
```

### Post List with Generous Gaps
```html
<!-- Source: Current index.vue, updated for SPAC-02 -->
<section class="space-y-8">
  <BlogPostCard v-for="post in posts" :key="post.path" :post="post" />
</section>
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Tailwind v3 config.js theme extension | Tailwind v4 @theme CSS directive | v4.0 (Jan 2025) | Design tokens live in CSS, not JS config. Auto-generates utilities. |
| `bg-opacity-50` utility class | `bg-gold/50` slash opacity syntax | v4.0 (Jan 2025) | Uses native color-mix(); more intuitive; supports CSS variables |
| tailwind.config.js for fonts | `--font-sans` in @theme block | v4.0 (Jan 2025) | CSS-first configuration; no JS config file needed |
| prose-invert class for dark | Direct --tw-prose-* variable overrides | @tailwindcss/typography v0.5+ | Full control over every prose element color; appropriate for dark-only sites |
| Fixed spacing scale (needs config for custom values) | Dynamic spacing (any number works) | v4.0 (Jan 2025) | `mt-18`, `py-22`, `gap-14` work without configuration |

**Deprecated/outdated:**
- `bg-opacity-*`, `text-opacity-*` utilities: Replaced by slash syntax (`bg-gold/50`). Still work but deprecated.
- `tailwind.config.js` theme customization: Replaced by @theme CSS directive in v4.
- `@apply` in @theme blocks: Not allowed. @theme blocks can only contain CSS custom properties and @keyframes.

## Open Questions

Things that could not be fully resolved:

1. **Background color halation (#0A0A0F vs #111118)**
   - What we know: Prior research flags #0A0A0F as potentially causing halation on OLED screens. Material Design recommends #121212 minimum.
   - What is unclear: Whether to change it in Phase 1 or defer to testing. Changing it affects every surface color.
   - Recommendation: Keep #0A0A0F for now but note it for visual testing. If halation is detected, the fix is a one-line token change. The surface elevation system (adding --color-dark-surface on cards) already mitigates this by reducing the area of near-black visible.

2. **Prose heading color: cream vs. allowing one gold heading**
   - What we know: The "gold restraint" rule says headings should be cream. But the page title (h1) on index and post pages is currently gold and serves as a focal point.
   - What is unclear: Whether page titles (outside prose) should remain gold as the "one gold heading per page" exception.
   - Recommendation: Keep page h1 titles (in Vue templates) as gold since they are the singular focal point. All prose headings (h2-h6 inside markdown) should be cream. This gives one gold element per page in the heading area.

3. **Custom typography scale vs. Tailwind defaults**
   - What we know: Tailwind v4 supports custom --text-* sizes with bundled line-height, tracking, and weight. But the blog only uses ~5 distinct text sizes.
   - What is unclear: Whether defining a custom scale provides benefit over using Tailwind's built-in text-3xl/text-xl/text-lg/text-base/text-sm with explicit tracking and leading classes.
   - Recommendation: Use Tailwind defaults with explicit modifiers (e.g., `text-3xl tracking-tight font-bold leading-tight` for headings). A custom scale adds complexity without proportional benefit for a blog with 4 pages.

## Sources

### Primary (HIGH confidence)
- [Tailwind CSS v4 Theme Variables](https://tailwindcss.com/docs/theme) -- @theme directive syntax, namespaces, limitations, @theme inline
- [Tailwind CSS v4 Font Family](https://tailwindcss.com/docs/font-family) -- --font-* namespace, @font-face, Google Fonts @import ordering
- [Tailwind CSS v4 Font Size](https://tailwindcss.com/docs/font-size) -- --text-* namespace with bundled line-height/tracking/weight
- [Tailwind CSS v4 Letter Spacing](https://tailwindcss.com/docs/letter-spacing) -- --tracking-* namespace, default scale values
- [Tailwind CSS v4 Line Height](https://tailwindcss.com/docs/line-height) -- leading-* utilities, text-size/line-height shorthand
- [@tailwindcss/typography GitHub](https://github.com/tailwindlabs/tailwindcss-typography) -- --tw-prose-* CSS variable list, v4 @plugin usage
- [Google Fonts CSS API v2](https://developers.google.com/fonts/docs/css2) -- URL format for specific weights with display=swap
- [Inter font GitHub (rsms/inter)](https://github.com/rsms/inter) -- Variable font, weights 100-900, CSS integration
- Prior project research: .planning/research/STACK.md, ARCHITECTURE.md, PITFALLS.md, SUMMARY.md (HIGH confidence, verified)

### Secondary (MEDIUM confidence)
- [Tailwind v4 @theme vs @theme inline Discussion](https://github.com/tailwindlabs/tailwindcss/discussions/18560) -- When to use inline keyword
- [Tailwind v4 Custom Font Discussion](https://github.com/tailwindlabs/tailwindcss/discussions/15415) -- Inter font integration specifics
- [Harrison Broadbent - Custom fonts in Tailwind v4](https://harrisonbroadbent.com/blog/tailwind-custom-fonts/) -- Verified patterns

### Tertiary (LOW confidence)
- None. All findings verified with primary or secondary sources.

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- All tools already installed; Inter loading pattern verified via official Tailwind docs and Google Fonts API
- Architecture: HIGH -- @theme patterns, prose overrides, and font loading all verified via official documentation with code examples
- Pitfalls: HIGH -- Gold overload, @import ordering, font-display, and spacing pitfalls identified from prior codebase audit and official documentation

**Research date:** 2026-02-06
**Valid until:** 2026-03-06 (30 days -- stable domain, no fast-moving dependencies)
