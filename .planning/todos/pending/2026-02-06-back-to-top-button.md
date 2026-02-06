---
created: 2026-02-06T21:55
title: Add back-to-top floating button on long posts
area: ui
files:
  - app/pages/post/[...slug].vue
  - app/assets/css/main.css
---

## Problem

Long blog posts require extensive scrolling to return to the top. No quick navigation shortcut exists for readers who want to jump back to the header or navigate away.

## Solution

Floating button (fixed position, bottom-right corner) that appears after scrolling past a threshold (e.g., 500px). Smooth scroll to top on click. Style with dark-surface background, gold border/icon, subtle shadow. Fade in/out with opacity transition matching the 200ms ease-smooth standard. Only on post pages.
