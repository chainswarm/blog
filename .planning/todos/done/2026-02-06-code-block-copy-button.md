---
created: 2026-02-06T21:55
title: Add copy-to-clipboard button on code blocks
area: ui
files:
  - app/components/ProseCode.vue
  - app/assets/css/main.css
---

## Problem

Code blocks in blog posts have no copy button. Readers with technical content need to manually select and copy code snippets, which is tedious especially on mobile.

## Solution

Create a custom `ProseCode.vue` component that wraps Nuxt Content's default code rendering. Add a copy button (clipboard icon) positioned absolute top-right of code blocks. Use navigator.clipboard API. Show brief "Copied!" feedback. Style with cream-muted color, gold on hover, matching the existing code block palette.
