# Architecture Research

**Domain:** CSS/Styling architecture for a premium Tailwind v4 dark theme blog
**Researched:** 2026-02-06
**Confidence:** HIGH

## Standard Architecture

### System Overview

```
+---------------------------------------------------------------+
|                       main.css (Entry Point)                  |
|  @import "tailwindcss"                                        |
|  @plugin "@tailwindcss/typography"                            |
+---------------------------------------------------------------+
|                       @theme { ... }                          |
|  Design tokens: colors, spacing, fonts, radii, shadows,      |
|  easings, animations, breakpoints                             |
+---------------------------------------------------------------+
|                     Base Styles (body, html)                  |
|  Applied via @apply or direct CSS                             |
+---------------------------------------------------------------+
|                    Prose Overrides (.prose)                    |
|  --tw-prose-* variable overrides for typography plugin        |
+---------------------------------------------------------------+
|                  @utility / Component Styles                  |
|  Custom utilities, scrollbar styling, reusable patterns       |
+---------------------------------------------------------------+
|                                                               |
|   Vue Components (utility-first in templates)                 |
|   - AppHeader.vue    - BlogPostCard.vue                       |
|   - AppFooter.vue    - TagBadge.vue                           |
|   - Pages: index, post/[...slug], about, tags/[tag]          |
|                                                               |
+---------------------------------------------------------------+
```

### Component Responsibilities

| Component | Styling Responsibility | Typical Implementation |
|-----------|------------------------|------------------------|
| `main.css` @theme | Design token source of truth -- all colors, fonts, spacing, shadows | `--color-*`, `--font-*`, `--shadow-*` CSS variables in @theme block |
| `main.css` prose overrides | Typography plugin theming for markdown content | `--tw-prose-*` variable overrides referencing @theme tokens |
| `main.css` base styles | Global defaults (body bg, text color, antialiasing) | `body { @apply bg-dark text-cream antialiased; }` |
| `main.css` custom utilities | Scrollbars, any reusable patterns not covered by Tailwind | @utility blocks or plain CSS at end of file |
| Vue component templates | All component-specific styling | Tailwind utility classes directly in markup |

## Recommended Project Structure

### Current Structure (Keep -- It Works)

```
app/
  assets/
    css/
      main.css           # Single CSS entry point (theme + prose + base + utilities)
  components/
    AppHeader.vue        # Utility classes in template
    AppFooter.vue        # Utility classes in template
    BlogPostCard.vue     # Utility classes in template
    TagBadge.vue         # Utility classes in template
  layouts/
    default.vue          # Layout shell with utility classes
  pages/
    index.vue            # Page with utility classes
    post/[...slug].vue   # Prose content rendering
    about.vue            # Static page
    tags/[tag].vue       # Tag filtering page
```

### Structure Rationale

**Do NOT split main.css into multiple files.** The project has a single theme, a small number of components, and one CSS file. Splitting into `theme.css`, `prose.css`, `utilities.css` etc. is over-engineering for a blog with ~4 components and ~4 pages. The single-file approach is the right call here.

**Do NOT add `<style scoped>` blocks to Vue components.** The entire codebase currently uses utility-first markup with zero component-scoped CSS. This is correct. Adding `<style>` blocks would require `@reference` imports, slow down builds (each scoped block runs Tailwind separately), and go against the utility-first approach that Tailwind v4 is optimized for.

## Architectural Patterns

### Pattern 1: Theme Tokens via @theme (Use This)

**What:** Define all design tokens as `--color-*`, `--font-*`, `--shadow-*` etc. inside a single `@theme { }` block. Tailwind v4 automatically generates utility classes from these tokens AND exposes them as CSS custom properties.

**When to use:** Always. This is the v4 way. Every color, font, shadow, and spacing value the design system uses goes here.

**Trade-offs:** Centralizes all tokens in one place (good for consistency). Cannot be nested under selectors or media queries (by design -- forces top-level declaration).

**Example -- Recommended token expansion for the blog:**

```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";

@theme {
  /* === Palette === */
  --color-dark: #0A0A0F;
  --color-dark-surface: #12121A;
  --color-dark-border: #1E1E2A;
  --color-dark-hover: #252535;

  --color-gold: #C9B88C;
  --color-gold-dim: #A89A6E;
  --color-gold-bright: #DDD0A8;

  --color-cream: #E8E6E3;
  --color-cream-muted: #B0ADA8;
  --color-cream-faint: #8A8780;

  /* === Typography === */
  --font-body: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-heading: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;

  /* === Shadows === */
  --shadow-card: 0 1px 3px rgba(0, 0, 0, 0.4);
  --shadow-card-hover: 0 4px 12px rgba(0, 0, 0, 0.5);

  /* === Border Radius === */
  --radius-card: 0.5rem;
  --radius-badge: 9999px;

  /* === Transitions === */
  --ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);

  /* === Animations (optional, add when needed) === */
  --animate-fade-in: fade-in 0.3s var(--ease-smooth);

  @keyframes fade-in {
    from { opacity: 0; transform: translateY(4px); }
    to { opacity: 1; transform: translateY(0); }
  }
}
```

**Key decisions in this token set:**

1. **Added `--color-dark-hover`:** The current codebase has no hover state for dark surfaces. Cards that elevate on hover need a distinct surface color.
2. **Added `--color-gold-bright`:** For hover states on gold elements. Currently the code uses `#E8E6E3` (cream) as hover for gold links, which breaks the gold identity.
3. **Added `--color-cream-faint`:** A third cream tier for truly secondary text (dates, metadata).
4. **Font tokens:** Even if keeping the same font, defining `--font-body` and `--font-heading` as tokens means a font change later is a one-line edit.
5. **Shadow tokens:** Cards and elevated elements need consistent shadow language.
6. **Radius tokens:** Named radii prevent inconsistent rounding across components.

### Pattern 2: Prose Variable Overrides (Use This)

**What:** Override `--tw-prose-*` variables in a `.prose { }` rule to theme the typography plugin. Reference @theme tokens by their CSS variable names for consistency.

**When to use:** For all markdown-rendered content (blog posts, about page). The typography plugin uses these variables to style `<h1>` through `<h6>`, `<p>`, `<a>`, `<code>`, `<pre>`, `<blockquote>`, etc.

**Trade-offs:** Prose overrides are verbose (many variables) but are the official way to theme @tailwindcss/typography for dark backgrounds. The alternative -- using element modifiers like `prose-headings:text-gold` inline -- scatters theme decisions into templates.

**Example -- Improved prose theming using token references:**

```css
.prose {
  --tw-prose-body: var(--color-cream);
  --tw-prose-headings: var(--color-gold);
  --tw-prose-lead: var(--color-cream-muted);
  --tw-prose-links: var(--color-gold);
  --tw-prose-bold: var(--color-cream);
  --tw-prose-counters: var(--color-gold-dim);
  --tw-prose-bullets: var(--color-gold-dim);
  --tw-prose-hr: var(--color-dark-border);
  --tw-prose-quotes: var(--color-gold);
  --tw-prose-quote-borders: var(--color-gold);
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

**Why this matters:** The current code hardcodes hex values in prose overrides (e.g., `--tw-prose-body: #E8E6E3`). This means changing the cream color requires updating it in both `@theme` AND the prose block. Referencing `var(--color-cream)` creates a single source of truth.

### Pattern 3: Utility-First Component Styling (Keep Doing This)

**What:** All component-specific styling lives in Vue template markup as Tailwind utility classes. No `<style>` blocks.

**When to use:** Always, for this project. The blog has ~4 components and ~4 pages. Utility-first is the right level of abstraction.

**Trade-offs:** Long class strings in templates (mitigated by keeping components small). No style isolation issues. No build performance overhead from scoped CSS processing.

**The current codebase already follows this perfectly.** Every component uses utility classes only. Do not change this approach.

### Pattern 4: Consistent Spacing and Max-Width via Layout

**What:** The layout (`default.vue`) sets `max-w-4xl mx-auto px-4 sm:px-6` once. Individual pages do not repeat container constraints.

**When to use:** Always. Container width and horizontal padding are layout concerns, not page concerns.

**The current codebase already does this correctly.** The header also independently sets `max-w-4xl mx-auto` to align with the content area.

## Data Flow

### Style Resolution Flow

```
@theme tokens (CSS custom properties)
    |
    +--> Tailwind utility classes (bg-dark, text-gold, border-dark-border)
    |       Used directly in Vue templates
    |
    +--> Prose variable overrides (.prose { --tw-prose-*: var(--color-*) })
    |       Applied to markdown content via <div class="prose">
    |
    +--> Custom CSS (scrollbar styles, base body styles)
            Applied globally
```

### Where Styles Live (Decision Tree)

```
Is it a design token (color, font, shadow, radius)?
  YES --> @theme block
  NO  --> Continue

Is it a prose/typography override?
  YES --> .prose {} block using var(--color-*) references
  NO  --> Continue

Is it a global default (body bg, antialiasing, scrollbar)?
  YES --> Base styles in main.css (outside @theme)
  NO  --> Continue

Is it component-specific?
  YES --> Utility classes in the Vue template
  NO  --> It probably does not need to exist
```

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| Current (1 blog, ~10 posts) | Single main.css, utility-first components. No changes needed. |
| 20-50 posts, 8-10 components | Still single main.css. Add semantic color aliases if needed (e.g., `--color-accent: var(--color-gold)`). |
| Multi-theme or brand variants | Split @theme into `theme.css` import. Use `@theme inline` with CSS variable indirection for runtime switching. |
| Design system shared across apps | Extract theme tokens to a shared package CSS file. Import via `@import "../brand/theme.css"`. |

### Scaling Priorities

1. **First bottleneck:** Token drift -- colors hardcoded in multiple places instead of referencing @theme variables. Fix: Use `var(--color-*)` everywhere, never raw hex in component code or prose overrides.
2. **Second bottleneck:** Prose customization limits -- if markdown content needs richer styling than typography plugin provides. Fix: Create custom prose component overrides in Nuxt Content.

## Anti-Patterns

### Anti-Pattern 1: Splitting CSS Into Many Files Prematurely

**What people do:** Create `theme.css`, `prose.css`, `scrollbar.css`, `base.css`, `utilities.css` for a small project.
**Why it is wrong:** Adds import chains, makes it harder to see the full picture, and provides zero benefit when the total CSS is under 100 lines. The @import order matters in Tailwind v4, so more files means more ordering footguns.
**Do this instead:** Keep one `main.css` until it exceeds ~200 lines of custom CSS. The current file is 74 lines. It has room to grow.

### Anti-Pattern 2: Using `<style scoped>` Blocks in Vue Components

**What people do:** Add `<style scoped>` with `@apply` directives or custom CSS to Vue components.
**Why it is wrong in this context:** Each scoped style block requires `@reference "../../assets/css/main.css"` to access theme tokens. Each block is processed separately by Tailwind, slowing builds. It mixes two styling paradigms (utility-first + scoped CSS) making the codebase inconsistent.
**Do this instead:** Use utility classes in templates. If a pattern repeats across many components, extract a Vue component (you already do this with `TagBadge`), not a CSS class.

### Anti-Pattern 3: Hardcoding Hex Values Outside @theme

**What people do:** Write `color: #C9B88C` or `text-decoration-color: #A89A6E` directly in CSS rules instead of referencing theme tokens.
**Why it is wrong:** Creates multiple sources of truth. Changing the gold color means finding and replacing every hardcoded instance.
**Do this instead:** Reference theme variables: `color: var(--color-gold)` or use Tailwind utility `text-gold`. The current codebase has this issue in the `.prose a` rule (`text-decoration-color: #A89A6E` should be `text-decoration-color: var(--color-gold-dim)`).

### Anti-Pattern 4: Using `prose-invert` for a Dark-Only Site

**What people do:** Add `dark:prose-invert` class as if they have a light/dark toggle.
**Why it is wrong for this project:** The blog is dark-only. There is no light mode. Using `prose-invert` means relying on the typography plugin's default dark palette instead of the custom gold/cream palette already defined. The current approach of overriding `--tw-prose-*` variables directly is correct for a dark-only custom theme.
**Do this instead:** Keep the current prose variable override approach. It gives full control over every prose element color.

### Anti-Pattern 5: Over-Tokenizing (Too Many Semantic Aliases)

**What people do:** Create `--color-primary`, `--color-secondary`, `--color-surface-1`, `--color-surface-2`, `--color-text-primary`, `--color-text-secondary`, `--color-text-tertiary` etc. for a single-theme site.
**Why it is wrong:** Adds a layer of indirection that provides no value when there is only one theme. You end up checking "wait, what color IS `--color-primary`?" instead of seeing `--color-gold` and knowing immediately.
**Do this instead:** Use descriptive token names (`--color-gold`, `--color-dark-surface`) for a single theme. Only add semantic aliases (`--color-primary`) if you are building a multi-theme system.

## Build Order for Visual Changes

This is the recommended sequence for implementing the visual overhaul:

### Phase 1: Token Foundation (Change First)

Modify the `@theme` block in `main.css`:
- Expand color palette (add hover states, faint tiers)
- Add font tokens (even if keeping same fonts, define them)
- Add shadow, radius, and easing tokens
- Add animation tokens if using transitions

**Why first:** Everything else references these tokens. Getting them right means every subsequent change is consistent.

### Phase 2: Prose Overrides (Change Second)

Update `.prose` block to reference `var(--color-*)` tokens:
- Replace all hardcoded hex values with `var()` references
- Add any new prose styling (blockquote decoration, table styling)
- Fix the `.prose a` hover/underline to use token references

**Why second:** Prose styling affects all blog post content. It has the highest visual surface area.

### Phase 3: Layout and Global Elements (Change Third)

Update `default.vue`, `AppHeader.vue`, `AppFooter.vue`:
- Apply any font, spacing, or structural changes
- Refine header backdrop effect
- Update footer styling
- Adjust responsive breakpoints if needed

**Why third:** These are the persistent chrome around every page.

### Phase 4: Component Polish (Change Last)

Update `BlogPostCard.vue`, `TagBadge.vue`, page templates:
- Apply shadow, hover, and transition tokens
- Refine card hover states
- Polish tag badge styling
- Add any new visual elements (gradients, borders, decorative elements)

**Why last:** Components sit within the foundation. Changing them before tokens are stable means double work.

## Responsive Design Approach

### Current Breakpoint Usage

The codebase uses Tailwind's default breakpoints with a mobile-first approach:
- `sm:` -- Used for padding adjustments (`px-4 sm:px-6`), text sizing (`text-3xl sm:text-4xl`), and footer layout (`flex-col sm:flex-row`)
- No usage of `md:`, `lg:`, `xl:`, or `2xl:`

### Recommendation: Keep Default Breakpoints

**Do not customize breakpoints** for this project. The blog uses `max-w-4xl` (56rem / 896px) as its content width. The default Tailwind breakpoints (`sm: 40rem`, `md: 48rem`, `lg: 64rem`) provide adequate responsive control for this layout.

If adding a wider hero or full-bleed images later, `md:` and `lg:` breakpoints are already available without configuration.

### Responsive Strategy

- **Mobile-first always:** Base styles are mobile. Layer up with `sm:`, `md:` as needed.
- **Content width is the constraint:** At `max-w-4xl`, the design naturally works well from `sm:` upward. Below `sm:`, the `px-4` padding handles mobile.
- **Avoid breakpoint proliferation:** Two breakpoints (`default` + `sm:`) cover the current design. Add `md:` or `lg:` only when a specific visual change requires it.

## Sources

- [Tailwind CSS v4 Theme Variables](https://tailwindcss.com/docs/theme) -- Official documentation (HIGH confidence)
- [Tailwind CSS v4 Functions and Directives](https://tailwindcss.com/docs/functions-and-directives) -- Official @theme, @utility, @reference, @variant docs (HIGH confidence)
- [Tailwind CSS v4 Adding Custom Styles](https://tailwindcss.com/docs/adding-custom-styles) -- Official @layer, @utility, component patterns (HIGH confidence)
- [Tailwind CSS v4 Dark Mode](https://tailwindcss.com/docs/dark-mode) -- Official dark mode configuration (HIGH confidence)
- [Tailwind CSS v4 Responsive Design](https://tailwindcss.com/docs/responsive-design) -- Official breakpoint documentation (HIGH confidence)
- [Tailwind Typography Plugin](https://github.com/tailwindlabs/tailwindcss-typography) -- Official prose customization docs (HIGH confidence)
- [Theming Best Practices v4 Discussion](https://github.com/tailwindlabs/tailwindcss/discussions/18471) -- Community patterns for multi-theme (MEDIUM confidence)
- [Tailwind v4 Vue Scoped Styles Discussion](https://github.com/tailwindlabs/tailwindcss/discussions/15205) -- @reference usage in Vue (MEDIUM confidence)

---
*Architecture research for: Chain Insights Blog CSS/styling premium dark theme*
*Researched: 2026-02-06*
