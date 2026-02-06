# Architecture

**Analysis Date:** 2026-02-06

## Pattern Overview

**Overall:** JAMstack blog with static generation via Nuxt Content v3 and content-driven data fetching

**Key Characteristics:**
- Content-first architecture using markdown files as source of truth
- Runtime query API via `@nuxt/content` for flexible data filtering and ordering
- Pre-rendered static pages deployed to GitHub Pages
- Component-driven UI with reusable page and layout abstractions
- Zero backend API complexity (content queries are build-time)

## Layers

**Content Layer:**
- Purpose: Stores and serves blog posts with metadata (title, date, author, tags)
- Location: `content/blog/`
- Contains: Markdown files with YAML frontmatter
- Depends on: Nothing (source files)
- Used by: Content module via `queryCollection()` API

**Data Query Layer:**
- Purpose: Query and filter blog content using collection API
- Location: Implicit in `@nuxt/content` module
- Contains: `queryCollection('blog')`, `.order()`, `.where()`, `.path()`, `.first()`, `.all()` methods
- Depends on: Content Layer
- Used by: Pages and components for data fetching

**Page Layer:**
- Purpose: Renders routes and composes content into template markup
- Location: `app/pages/`
- Contains:
  - `index.vue` - Home page listing all posts sorted by date (DESC)
  - `post/[...slug].vue` - Dynamic post detail page with full markdown rendering
  - `tags/[tag].vue` - Dynamic tag archive filtering posts by tag
  - `about.vue` - Static about page with project context
- Depends on: Data Query Layer, Component Layer
- Used by: Router (Nuxt auto-routes these files)

**Component Layer:**
- Purpose: Reusable UI components used across pages
- Location: `app/components/`
- Contains:
  - `AppHeader.vue` - Sticky navigation header with logo and nav links
  - `AppFooter.vue` - Footer with copyright and social links
  - `BlogPostCard.vue` - Card component displaying post preview (title, date, description, tags)
  - `TagBadge.vue` - Tag display component with optional linking to tag page
- Depends on: Nothing (pure presentation)
- Used by: Layouts and Pages

**Layout Layer:**
- Purpose: Wrapper template providing consistent page structure
- Location: `app/layouts/default.vue`
- Contains: Header, main content area, footer with vertical flex layout
- Depends on: Component Layer (imports AppHeader, AppFooter)
- Used by: All pages via `<NuxtLayout>` wrapper

**Root Component:**
- Purpose: Application entry point
- Location: `app/app.vue`
- Contains: `<NuxtLayout>` and `<NuxtPage>` composables for routing
- Depends on: Layout Layer
- Used by: Nuxt runtime as app root

**Styling Layer:**
- Purpose: Theme configuration and global styles
- Location: `app/assets/css/main.css`
- Contains: Tailwind directives, custom CSS variables (colors), prose theme overrides
- Depends on: Tailwind CSS v4 + @tailwindcss/typography plugin
- Used by: All components via Tailwind utilities

## Data Flow

**Blog Post List (Home Page):**

1. User navigates to `/` (home page)
2. `app/pages/index.vue` executes in SSR/pre-render:
   - `useAsyncData('blog-list', ...)` fetches all posts from `content/blog/`
   - `queryCollection('blog').order('date', 'DESC').all()` retrieves posts sorted newest first
3. Data updates `posts` reactive variable
4. Template iterates with `v-for post in posts`
5. Each post rendered via `<BlogPostCard :post="post" />`
6. Cards link to `/post/{slug}` dynamic route

**Blog Post Detail:**

1. User clicks post card or navigates directly to `/post/{slug}`
2. `app/pages/post/[...slug].vue` executes:
   - Route param `route.path` captured
   - `useAsyncData()` with key `blog-${route.path}` fetches single post
   - `queryCollection('blog').path(route.path).first()` retrieves exact post
   - Error thrown if post not found (404)
3. `post` object contains markdown content + frontmatter
4. `<ContentRenderer :value="post" />` renders markdown as HTML with prose styling
5. Post metadata (title, date, author, tags) rendered in header
6. Tags rendered via `<TagBadge>` components linking to tag page

**Tag Archive:**

1. User clicks tag badge or navigates to `/tags/{tag}`
2. `app/pages/tags/[tag].vue` executes:
   - Route param `tag` captured from `route.params.tag`
   - `useAsyncData()` with key `tag-${tag}` fetches all posts matching tag
   - `queryCollection('blog').where('tags', 'LIKE', tag).order('date', 'DESC').all()` filters by tag, sorts by date
3. Results rendered as list of `<BlogPostCard>` components
4. Empty state shown if no posts match tag

**State Management:**

- **Reactive Data:** Each page uses `useAsyncData()` to manage fetched content reactively
- **No Global State:** No Vuex, Pinia, or global stores needed (content is static after build)
- **Pre-rendering:** All routes pre-rendered at build time (Nuxt `generate` command)
- **Caching:** Build-time query results cached; runtime queries read pre-computed data

## Key Abstractions

**Post Object:**
- Purpose: Structured representation of blog post metadata and content
- Examples: `content/blog/welcome-to-chain-insights-blog.md`
- Pattern: YAML frontmatter defines schema, parsed by `content.config.ts`
- Schema defined in `content.config.ts`:
  ```typescript
  {
    title: string              // Post headline
    description: string        // SEO description
    date: string              // Publication date (YYYY-MM-DD format)
    tags: string[]            // Category tags for filtering
    author: string            // Byline (default: "Chain Insights Team")
    image?: string            // Optional featured image URL
    // + markdown body content
  }
  ```

**queryCollection() API:**
- Purpose: Fluent content query builder from @nuxt/content
- Methods:
  - `.order(field, direction)` - Sort by date, title, etc.
  - `.where(field, operator, value)` - Filter by tags, author, etc.
  - `.path(route)` - Find post by exact route path
  - `.first()` - Return single result
  - `.all()` - Return array of all results
- Usage: `queryCollection('blog').order('date', 'DESC').where('tags', 'LIKE', 'architecture').all()`

**NuxtLink Component:**
- Purpose: Client-side navigation with active-class detection
- Usage: All navigation and post links use `<NuxtLink :to="path">` for SPA-like behavior

**ContentRenderer Component:**
- Purpose: Renders markdown content with prose-styled HTML
- Usage: `<ContentRenderer :value="post" />` in post detail page
- Applies `.prose` class for typography styling

## Entry Points

**Build Entry:**
- Location: `nuxt.config.ts`
- Triggers: `npm run generate` or `npm run build`
- Responsibilities:
  - Configure Nuxt framework
  - Define base URL (`/blog/` for GitHub Pages)
  - Enable Tailwind v4 via vite plugin
  - Set Nitro preset to `github-pages`
  - Define route rules for prerendering (all routes static)

**Runtime Entry:**
- Location: `app/app.vue`
- Triggers: Browser loads application
- Responsibilities:
  - Mount root component
  - Provide `<NuxtLayout>` and `<NuxtPage>` for routing
  - Initialize Vue Router for client-side navigation

**Content Entry:**
- Location: `content.config.ts`
- Triggers: Build phase
- Responsibilities:
  - Define `blog` collection
  - Map `content/blog/**/*.md` to routes prefixed with `/post`
  - Validate posts match Zod schema
  - Configure markdown parsing (GitHub Dark syntax highlighting)

## Error Handling

**Strategy:** Explicit error throwing for missing content

**Patterns:**
- Post not found (404):
  ```typescript
  // app/pages/post/[...slug].vue
  if (!post.value) {
    throw createError({ statusCode: 404, message: 'Post not found' })
  }
  ```
  This triggers Nuxt error page

- Empty tag results: Graceful empty state rendered
  ```html
  <p v-if="posts && posts.length === 0" class="text-cream-muted">
    No posts found with this tag.
  </p>
  ```

## Cross-Cutting Concerns

**Logging:** None configured (static site, no runtime logs)

**Validation:** Schema validation via Zod in `content.config.ts`:
- Enforces required fields: `title`, `description`, `date`
- Type-checks `tags` as string array
- Provides defaults: `author` defaults to "Chain Insights Team"
- Optional fields: `image`

**Authentication:** Not applicable (public blog, no auth required)

**SEO/Meta:**
- Global meta tags in `nuxt.config.ts` for home page
- Dynamic meta tags set per-page using `useHead()`:
  - Post detail: Sets title, description, OG tags from post frontmatter
  - Tag page: Sets title with tag name
  - About page: Sets description

**Styling:** Tailwind CSS v4 with typography plugin:
- Custom color variables defined in `app/assets/css/main.css` (@theme block)
- Dark theme: dark background (#0A0A0F), gold accents (#C9B88C), cream text (#E8E6E3)
- Prose dark theme overrides for markdown rendering
- No component-scoped styles (all utilities-based)

---

*Architecture analysis: 2026-02-06*
