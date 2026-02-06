# Chain Insights Blog

The official blog for [Chain Insights](https://chain-insights.chainswarm.xyz) — project progress, architecture deep dives, and lessons learned building the Chain Insights Agent ($CIA).

**Live at:** [chainswarm.github.io/blog](https://chainswarm.github.io/blog/)

## Tech Stack

- [Nuxt Content v3](https://content.nuxt.com/) — Markdown-based blog with Vue components
- [Tailwind CSS v4](https://tailwindcss.com/) — Styling with `@tailwindcss/typography` for prose
- [GitHub Pages](https://pages.github.com/) — Static deployment via GitHub Actions

## Development

```bash
npm install
npm run dev
```

The dev server starts at `http://localhost:3000/blog/`.

## Writing a New Post

Create a markdown file in `content/blog/`:

```markdown
---
title: "Your Post Title"
description: "A short summary of the post."
date: "2026-02-06"
tags: ["tag1", "tag2"]
author: "Chain Insights Team"
---

Your post content here...
```

The filename becomes the URL slug (e.g., `my-post.md` → `/blog/blog/my-post`).

## Building for Production

```bash
npx nuxt build --preset github_pages
```

Output is generated in `.output/public/`.

## Deployment

Deployment is automatic via GitHub Actions on push to `main`. The workflow builds the site and deploys to GitHub Pages.

**First-time setup:** Go to repo Settings > Pages and set Source to **GitHub Actions**.
