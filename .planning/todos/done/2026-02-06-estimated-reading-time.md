---
created: 2026-02-06T21:55
title: Add estimated reading time to posts
area: ui
files:
  - app/pages/post/[...slug].vue
  - content.config.ts
---

## Problem

Post metadata shows date and author but no reading time estimate. Readers can't quickly gauge article length before committing to read.

## Solution

Calculate reading time from word count (avg 200-250 wpm). Display as "X min read" in post header metadata next to date/author. Could use Nuxt Content's built-in body text access or a custom computed property.
