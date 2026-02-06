# Codebase Structure

**Analysis Date:** 2026-02-06

## Directory Layout

```
blog/
├── app/                           # Nuxt application source code
│   ├── app.vue                    # Root component (layout wrapper)
│   ├── assets/
│   │   └── css/
│   │       └── main.css           # Global styles and Tailwind theme config
│   ├── components/                # Reusable Vue components
│   │   ├── AppHeader.vue          # Sticky navigation header
│   │   ├── AppFooter.vue          # Page footer
│   │   ├── BlogPostCard.vue       # Post preview card component
│   │   └── TagBadge.vue           # Tag display component
│   ├── layouts/
│   │   └── default.vue            # Default page layout (header/main/footer)
│   └── pages/                     # Auto-routed pages (file-based routing)
│       ├── index.vue              # Home page (/)
│       ├── about.vue              # About page (/about)
│       ├── post/
│       │   └── [...slug].vue      # Post detail page (/post/*)
│       └── tags/
│           └── [tag].vue          # Tag archive page (/tags/*)
│
├── content/                       # Blog content (markdown + frontmatter)
│   └── blog/
│       ├── welcome-to-chain-insights-blog.md
│       ├── architecture-overview.md
│       └── building-in-the-open.md
│
├── public/                        # Static assets (served as-is)
│   ├── logo.png                   # Site logo
│   ├── cover.png                  # Social share image
│   ├── favicon.ico                # Favicon
│   └── robots.txt                 # Search engine directives
│
├── .github/
│   └── workflows/                 # GitHub Actions CI/CD pipelines
│
├── .data/                         # Runtime data storage (SQLite from @nuxt/content)
│   └── content/                   # Indexed content database
│
├── .planning/                     # GSD planning documents
│   └── codebase/                  # Codebase analysis docs
│
├── .nuxt/                         # Generated Nuxt build artifacts (not committed)
│
├── .output/                       # Build output (static site)
│   └── public/                    # Generated static HTML files
│
├── nuxt.config.ts                 # Nuxt framework configuration
├── content.config.ts              # Content collection schema & config
├── tsconfig.json                  # TypeScript configuration (Nuxt-managed)
├── package.json                   # Project metadata and dependencies
└── package-lock.json              # Locked dependency versions
```

## Directory Purposes

**`app/`**
- Purpose: Nuxt application source code (pages, components, styling)
- Contains: Vue components, layouts, pages, global styles
- Key files:
  - `app.vue`: Root wrapper component
  - `pages/`: Auto-routed page components (becomes URL routes)
  - `components/`: Reusable components imported anywhere
  - `layouts/`: Layout templates for page structure

**`app/components/`**
- Purpose: Reusable Vue components shared across pages
- Contains: Button-like, card-like, layout helper components
- Key files:
  - `AppHeader.vue`: Navigation + logo (sticky)
  - `AppFooter.vue`: Copyright + social links
  - `BlogPostCard.vue`: Post preview card (title, date, tags)
  - `TagBadge.vue`: Tag pill with optional link

**`app/pages/`**
- Purpose: File-based routing (each .vue file becomes a URL route)
- Contains: Page-level components for each route
- Key files:
  - `index.vue` → `/`
  - `about.vue` → `/about`
  - `post/[...slug].vue` → `/post/*` (dynamic posts)
  - `tags/[tag].vue` → `/tags/{tag}` (dynamic tag archives)

**`app/layouts/`**
- Purpose: Page structure templates (headers, footers, sidebars)
- Contains: Layout wrapper components applied to pages
- Key files:
  - `default.vue`: Standard layout (header → main → footer)

**`app/assets/css/`**
- Purpose: Global CSS and design tokens (colors, fonts, spacing)
- Contains: Tailwind directives, custom CSS variables, prose overrides
- Key files:
  - `main.css`: Theme config (dark mode, gold/cream color palette)

**`content/blog/`**
- Purpose: Blog post content (markdown with YAML frontmatter)
- Contains: `.md` files representing individual posts
- Key files:
  - `*.md`: Each file = one blog post (name becomes URL slug)
  - Frontmatter: `title`, `description`, `date`, `tags`, `author`, optional `image`

**`public/`**
- Purpose: Static assets served directly by the web server (images, icons, robots.txt)
- Contains: Images, favicons, SEO files
- Key files:
  - `logo.png`: Header logo (8px h in AppHeader)
  - `cover.png`: Social share image (og:image)
  - `favicon.ico`: Browser tab icon
  - `robots.txt`: Search engine crawler directives

## Key File Locations

**Entry Points:**
- `app/app.vue`: Vue application root (mounted to DOM)
- `nuxt.config.ts`: Framework configuration and build settings
- `content.config.ts`: Content collection schema validation

**Configuration:**
- `nuxt.config.ts`: Nuxt app config, modules, CSS, routes, build settings
- `content.config.ts`: Content collection definitions and Zod schema
- `tsconfig.json`: TypeScript compiler options (managed by Nuxt)
- `package.json`: Dependencies and npm scripts

**Core Logic:**
- `app/pages/index.vue`: Home page (queries all posts, renders BlogPostCard grid)
- `app/pages/post/[...slug].vue`: Post detail (queries single post, renders markdown)
- `app/pages/tags/[tag].vue`: Tag archive (filters posts by tag)
- `app/components/BlogPostCard.vue`: Post preview component (reusable card)

**Styling:**
- `app/assets/css/main.css`: Tailwind config, color theme, prose overrides

**Content:**
- `content/blog/*.md`: Individual blog posts (source of truth for posts)

## Naming Conventions

**Files:**
- Pages: PascalCase with brackets for dynamic segments (`[...slug].vue`, `[tag].vue`)
- Components: PascalCase (`BlogPostCard.vue`, `AppHeader.vue`)
- Content: kebab-case (`welcome-to-chain-insights-blog.md`)
- CSS: lowercase (`main.css`)
- Config: lowercase with `.config.` suffix (`nuxt.config.ts`, `content.config.ts`)

**Directories:**
- Standard Nuxt: lowercase (`pages`, `components`, `layouts`, `assets`)
- Nested content: kebab-case slugs (`blog/`, no subdirs under blog/)
- Assets: lowercase with type subdir (`assets/css/`, `assets/images/` if it existed)

**Routes (auto-generated from pages/):**
- Home: `/` (from `index.vue`)
- About: `/about` (from `about.vue`)
- Post: `/post/{slug}` (from `post/[...slug].vue`, slug from content file path)
- Tags: `/tags/{tag}` (from `tags/[tag].vue`, tag from route param)

## Where to Add New Code

**New Blog Post:**
1. Create file: `content/blog/{title-slug}.md`
2. Add YAML frontmatter:
   ```markdown
   ---
   title: "Post Title"
   description: "Short summary"
   date: "YYYY-MM-DD"
   tags: ["tag1", "tag2"]
   author: "Author Name"  # Optional, defaults to "Chain Insights Team"
   image: "url"          # Optional, for og:image
   ---

   # Markdown content here
   ```
3. Automatic: Post appears on home page and tag pages after rebuild

**New Page:**
1. Create component: `app/pages/{page-name}.vue`
2. Route auto-generated: `/{page-name}`
3. Example structure:
   ```vue
   <template>
     <div>
       <h1>Page Title</h1>
       <!-- content here -->
     </div>
   </template>

   <script setup lang="ts">
   useHead({
     title: 'Page Title - Chain Insights Blog',
     meta: [{ name: 'description', content: '...' }],
   })
   </script>
   ```

**New Reusable Component:**
1. Create component: `app/components/{ComponentName}.vue`
2. Automatically registered and can be used in any page/component without import
3. Example (card component):
   ```vue
   <template>
     <div class="border rounded-lg p-4">
       <slot />
     </div>
   </template>

   <script setup lang="ts">
   defineProps<{
     title: string
   }>()
   </script>
   ```

**New Layout (if needed):**
1. Create layout: `app/layouts/{LayoutName}.vue`
2. Use in page: `<NuxtLayout name="LayoutName">`
3. Default layout (`default.vue`) auto-applied to all pages unless overridden

**New Page Section/Sub-route:**
1. Nested pages: Create `app/pages/section/[...slug].vue` or `app/pages/section/page.vue`
2. Route becomes `/section/{slug}` or `/section`
3. Can share layout via wrapper component or layout file

**Global Styling:**
1. Add to `app/assets/css/main.css` (Tailwind directives or custom CSS)
2. Colors: Add to `@theme` block if site-wide color needed
3. Prose styling: Override `.prose` CSS variables for markdown rendering

**Static Assets:**
1. Place images/icons in `public/` directory
2. Reference in templates: `<img src="/logo.png">`
3. Can be grouped by type: `public/images/`, `public/icons/` (not currently used)

## Special Directories

**`.nuxt/`**
- Purpose: Nuxt build artifacts (auto-generated during dev/build)
- Generated: Yes
- Committed: No (in .gitignore)
- Contains: Compiled components, type declarations, dev server files

**`.output/`**
- Purpose: Static site build output (result of `nuxt generate`)
- Generated: Yes
- Committed: No (in .gitignore)
- Contains: HTML, CSS, JS files ready for deployment to GitHub Pages

**`.data/`**
- Purpose: Runtime SQLite database with indexed content
- Generated: Yes (created by @nuxt/content at build time)
- Committed: No (in .gitignore)
- Contains: Binary SQLite file with post metadata and content

**`.planning/`**
- Purpose: GSD planning and analysis documents
- Generated: Yes (by GSD commands)
- Committed: Yes (in .gitignore, actually not committed typically)
- Contains: ARCHITECTURE.md, STRUCTURE.md, CONVENTIONS.md, TESTING.md, CONCERNS.md

**.github/workflows/**
- Purpose: GitHub Actions CI/CD automation
- Contains: Build and deploy pipeline configurations
- Typical workflow: Trigger on push → npm install → npm run generate → deploy to GitHub Pages

## Build and Pre-rendering

**Build Process:**
```
npm run build    # Build for production (server-side rendering)
npm run generate # Generate static site (pre-render all routes to HTML)
npm run preview  # Preview generated static site locally
```

**Pre-rendered Routes:**
- All routes explicitly listed in `nuxt.config.ts` `routeRules`:
  ```typescript
  routeRules: {
    '/': { prerender: true },
    '/about': { prerender: true },
    '/post/**': { prerender: true },    # All dynamic post routes
    '/tags/**': { prerender: true },    # All tag archive routes
  }
  ```
- Result: Static HTML files generated for each route, served directly from GitHub Pages

---

*Structure analysis: 2026-02-06*
