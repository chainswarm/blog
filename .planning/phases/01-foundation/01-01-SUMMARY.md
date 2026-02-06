# Plan 01-01 Summary: Design Tokens & Font Loading

**Status:** Complete
**Phase:** 01-foundation
**Files modified:** app/assets/css/main.css

## What was done

1. **Inter font loaded** via Google Fonts @import (weights 400, 500, 700 with display=swap), placed before `@import "tailwindcss"` per CSS spec requirements
2. **@theme block expanded** with:
   - Surface elevation: `--color-dark-elevated` (#1A1A26) added — now 3 distinct levels (dark, dark-surface, dark-elevated)
   - Font family: `--font-sans` token with Inter as primary
   - Shadows: `--shadow-card` and `--shadow-card-hover` for card depth
   - Easing: `--ease-smooth` and `--ease-fluid` for transitions
3. **Prose overrides converted** from hardcoded hex to `var(--color-*)` references (22 var() references total)
4. **Gold restraint applied** in prose:
   - Headings: cream (was gold)
   - Quotes: cream (was gold)
   - Quote borders: dark-border (was gold)
   - Counters/bullets: cream-muted (was gold-dim)
   - Only links and inline code remain gold
5. **Scrollbar styling** converted to var() references

## Requirements addressed

- **TYPO-01**: Inter font loaded via Google Fonts with display=swap
- **SURF-01**: Three surface elevation levels defined (dark, dark-surface, dark-elevated)
- **SURF-03**: Gold restraint implemented in prose overrides
- **PROS-04**: All prose CSS variables reference theme tokens via var()

## Verification

- Build passes: 29 routes prerendered successfully
- 22 var(--color-*) references in main.css (target was 16+)
- No hardcoded hex in .prose block except --tw-prose-kbd-shadows (required RGB triplet)
- Inter font @import is first line of file
