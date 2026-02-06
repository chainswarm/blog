---
created: 2026-02-06T21:55
title: Add hover-visible anchor links to prose headings
area: ui
files:
  - app/assets/css/main.css
  - app/pages/post/[...slug].vue
---

## Problem

Prose headings (h2, h3) in blog posts have no way to link directly to a section. Readers and sharers can't reference specific parts of articles.

## Solution

Nuxt Content already generates heading IDs. Add CSS for anchor link icons that appear on hover (using ::before or ::after pseudo-element with a `#` or link icon). Style with gold-dim color, transition to gold on hover. Keep hidden until heading is hovered.
