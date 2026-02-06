# Technology Stack

**Analysis Date:** 2026-02-06

## Languages

**Primary:**
- TypeScript - Full codebase including Vue components, config files, and build setup

**Secondary:**
- Vue 3.5.27 - Component framework (Template Syntax Language)
- Markdown - Content layer via Nuxt Content for blog posts

## Runtime

**Environment:**
- Node.js v20.20.0 - Primary runtime (confirmed via `node --version`)
- Browser (ES2020+ via Vue 3 and Nuxt transpilation)

**Package Manager:**
- npm 10.8.2
- Lockfile: `package-lock.json` (501KB, present)

## Frameworks

**Core:**
- Nuxt 4.3.0 - Full-stack Vue framework
- Vue 3.5.27 - Reactive component framework
- Vue Router 4.6.4 - Client-side routing (bundled with Nuxt)

**Content:**
- @nuxt/content 3.11.2 - Markdown/YAML content management system
  - Provides static content querying without database
  - Generates SQLite cache in `.data/content/contents.sqlite`
  - Uses Zod for schema validation (via schema definition in `content.config.ts`)

**Styling:**
- Tailwind CSS 4.1.18 - Utility-first CSS framework
- @tailwindcss/vite 4.1.18 - Vite integration plugin for Tailwind v4
- @tailwindcss/typography 0.5.19 - Prose styling for markdown content

**Build/Dev:**
- Vite - Build tool (bundled with Nuxt)
- Nitro - Server engine (bundled with Nuxt)

## Key Dependencies

**Critical:**
- @nuxt/content 3.11.2 - Why it matters: Powers entire content layer, enables static blog without database
- @tailwindcss/vite 4.1.18 - Why it matters: Required for Tailwind CSS v4 integration via Vite
- better-sqlite3 12.6.2 - Why it matters: Optimized SQLite client for Nuxt Content cache generation

**Infrastructure:**
- vue-router 4.6.4 - Client-side navigation and page routing
- tailwindcss 4.1.18 - CSS utility generation and custom theme

## Configuration

**Environment:**
- No runtime environment configuration required
- Static build approach - no database connection strings, API keys, or secrets needed at runtime
- GitHub Pages base URL configured in `nuxt.config.ts`: `baseURL: '/blog/'`

**Build:**
- `nuxt.config.ts` - Main Nuxt configuration
  - Preset: `github-pages` (Nitro static export preset)
  - CSS entry: `~/assets/css/main.css` (Tailwind configuration)
  - Vite plugins: `@tailwindcss/vite` plugin configured
  - Route prerendering rules for all static routes (/, /about, /post/**, /tags/**)

- `content.config.ts` - Nuxt Content configuration
  - Single collection: `blog` (type: page)
  - Source: `content/blog/**` with `/post` prefix
  - Schema validation using Zod for title, description, date, tags, image, author

- `tsconfig.json` - TypeScript references (.nuxt generated configs)
  - Managed by Nuxt auto-generation

- `app/assets/css/main.css` - Tailwind CSS v4 with custom theme
  - Imports: `@import "tailwindcss"` (CSS-first v4 syntax)
  - Custom theme variables: dark colors (#0A0A0F), gold accents (#C9B88C), cream text (#E8E6E3)
  - Plugin: `@plugin "@tailwindcss/typography"`

## Platform Requirements

**Development:**
- Node.js 20.x (or compatible versions)
- npm 10.x
- 100MB+ disk space (node_modules)

**Production:**
- Deployment target: GitHub Pages (static hosting)
- Output: Static HTML/CSS/JS generated to `.output/public/`
- Build system: GitHub Actions (Node.js 22, npm cache)
- No server runtime required (fully static)

---

*Stack analysis: 2026-02-06*
