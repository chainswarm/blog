# Plan 01-02 Summary: Template Spacing, Typography & Surface Elevation

**Status:** Complete
**Phase:** 01-foundation
**Files modified:** app/pages/index.vue, app/components/BlogPostCard.vue, app/pages/post/[...slug].vue, app/layouts/default.vue

## What was done

1. **index.vue hero section**: Generous responsive padding (py-12 sm:py-20), heading with tracking-tight and 3-step responsive scale (3xl/4xl/5xl), card list gaps increased to space-y-8
2. **BlogPostCard.vue**: Surface elevation via bg-dark-surface, padding increased to p-8, heading h2 gets tracking-tight, internal element spacing increased (mt-2 → mt-3)
3. **post/[...slug].vue**: Article wrapper py-6 (avoids double-stacking with layout), header spacing expanded (mt-8 mb-12), h1 gets tracking-tight + lg:text-5xl, description spacing mt-4
4. **default.vue**: Main padding made responsive (py-6 sm:py-8)

## Requirements addressed

- **TYPO-02**: Headings use tracking-tight with clear size hierarchy (3xl → 4xl → 5xl)
- **TYPO-03**: Body text uses prose-lg (1.6-1.75 line-height) for comfortable reading
- **TYPO-04**: Font weights limited to 400/500/700 (no changes needed — already correct)
- **SPAC-01**: Hero section uses generous vertical padding (py-12 sm:py-20)
- **SPAC-02**: Post card list uses space-y-8 gaps
- **SPAC-03**: Prose content spacing handled by prose-lg defaults + expanded header margins
- **SPAC-04**: Cards have p-8 internal padding
- **SURF-02**: Cards use bg-dark-surface background (visually lifted off base)
- **SURF-03**: Gold restrained to page h1 titles and hover states only

## Verification

- Build passes: 29 routes prerendered successfully
- All expected classes confirmed present in target files
- Gold only on page h1 headings (index + post) and interactive hover states
- Card h2 and all body text use cream/cream-muted
