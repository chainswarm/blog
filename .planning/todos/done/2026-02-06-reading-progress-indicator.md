---
created: 2026-02-06T21:55
title: Add reading progress indicator
area: ui
files:
  - app/pages/post/[...slug].vue
  - app/assets/css/main.css
---

## Problem

Post pages have no visual indicator of reading progress. A thin gold bar at the top of the viewport that fills as the user scrolls would reinforce the premium feel and help readers gauge article length.

## Solution

Scroll-driven progress bar using `scroll()` timeline or JS scroll listener. Gold color matching `--color-gold` token. Fixed position at top of viewport, 2-3px height. Only visible on post pages.
