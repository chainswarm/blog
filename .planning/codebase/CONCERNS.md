# Codebase Concerns

**Analysis Date:** 2026-02-06

## Tech Debt

**Unused Dependency - better-sqlite3:**
- Issue: `better-sqlite3@12.6.2` is declared as a dependency but is never imported or used anywhere in the application code
- Files: `package.json`, `package-lock.json`
- Impact: Adds unnecessary weight to deployment bundle and increases build complexity. This is a native Node.js module that compiles during installation, slowing down CI/CD pipeline and increasing final output size on GitHub Pages.
- Fix approach: Remove `better-sqlite3` from dependencies. The application uses Nuxt Content v3's native query interface (`queryCollection`) which does not require external database drivers. Verify no hidden imports exist before removal.

**Extraneous Packages in node_modules:**
- Issue: Multiple packages are marked as extraneous: `@emnapi/core`, `@emnapi/runtime`, `@emnapi/wasi-threads`, `@napi-rs/wasm-runtime`, `@tybys/wasm-util`, and `tslib`
- Files: `package-lock.json`
- Impact: These are dependency artifacts from `better-sqlite3` (WASM runtime support) and unused transitive dependencies. They contribute to bloated `node_modules` and increase development environment setup time.
- Fix approach: Run `npm prune` after removing `better-sqlite3`. These should be automatically cleaned up once the native module dependency is removed.

**Package Override Without Documentation:**
- Issue: `confbox@0.2.2` is pinned via override in `package.json` without comment explaining why
- Files: `package.json` (lines 22-24)
- Impact: Future maintainers won't understand the rationale for the override, making it risky to remove or update during dependency upgrades.
- Fix approach: Add a comment explaining the confbox override reason (likely version compatibility with Nuxt Content or build tool).

## Potential Data Consistency Issues

**Unused .data Directory:**
- Issue: `.data/` directory exists with empty structure (only `.data/content/` subfolder) but is not referenced in any configuration or code
- Files: `.data/` (root level), `.gitignore`
- Impact: Directory suggests historical usage (possibly for cached content or build artifacts) but serves no current purpose. Creates confusion about build process and increases repo footprint.
- Fix approach: Remove `.data/` directory if confirmed unused. If it's needed for caching in CI/CD, document its purpose in a comment in `.gitignore` or create a `.gitkeep` with explanation.

## Testing & Quality Gaps

**No Test Suite:**
- Issue: No test files (`*.test.ts`, `*.spec.ts`) or test framework configuration found
- Files: Entire `/app` directory
- Impact: Any refactoring of components or page logic risks undetected regressions. Content schema validation errors won't be caught until runtime.
- Priority: **Medium** - Blog content is relatively simple, but as post volume grows, broken metadata schemas or rendering issues could go unnoticed.
- Recommendation: Add basic tests using Vitest for:
  - Content schema validation (`content.config.ts`)
  - Tag filtering logic in `pages/tags/[tag].vue`
  - Data loading in index and post pages

**No Error Boundary Components:**
- Issue: Only one error is explicitly thrown (`createError` in `pages/post/[...slug].vue` for 404), but no global error handling for:
  - Failed content queries
  - Missing required frontmatter fields
  - Corrupted markdown files
- Files: `app/pages/`, `app/layouts/default.vue`
- Impact: Build-time errors in markdown frontmatter won't be caught until site generation fails. Runtime query failures lack user-friendly error UI.
- Safe modification: Create `app/error.vue` as a catch-all error page, and add console logging to `useAsyncData` calls.

## Deployment & Environment Concerns

**Potential Base URL Inconsistency:**
- Issue: `nuxt.config.ts` hardcodes `baseURL: '/blog/'`, and the GitHub Actions workflow explicitly sets `NUXT_APP_BASE_URL: /blog/` as env var, and the build command uses `--preset github_pages`
- Files: `nuxt.config.ts` (line 10), `.github/workflows/deploy.yml` (line 32)
- Impact: Triple-definition of the same value creates maintenance burden. If GitHub repo is moved from `chainswarm.github.io/blog` to a subdomain, three places must be updated.
- Fix approach: Remove the env var from workflow and rely solely on `nuxt.config.ts` with a comment explaining the `/blog/` path is required for GitHub Pages subpath deployment.

**GitHub Actions Node Version Mismatch Risk:**
- Issue: Workflow uses `node-version: 22`, but no `.nvmrc` or `engines` field in `package.json` to enforce version consistency
- Files: `.github/workflows/deploy.yml` (line 25), `package.json`
- Impact: Local development with different Node version (e.g., Node 20) could produce different build outputs. Build succeeds in CI but fails locally.
- Fix approach: Add `.nvmrc` with `22` or add `"engines": { "node": ">=22.0.0" }` to `package.json`.

## Content Management Concerns

**URL Slug Pattern Inconsistency:**
- Issue: README states "filename becomes the URL slug (e.g., `my-post.md` → `/blog/blog/my-post`)" — note the double `/blog/blog/` — which suggests confusion about URL routing
- Files: `README.md`, `content.config.ts` (prefix: '/post'), `nuxt.config.ts` (baseURL: '/blog/')
- Impact: When writing new posts, authors may be confused about actual post URLs. Posts are at `/blog/post/{slug}` not `/blog/blog/{slug}`.
- Fix approach: Update README.md to clarify the routing: `my-post.md` → `/blog/post/my-post`. Verify the `prefix: '/post'` in `content.config.ts` is intentional.

**No Frontmatter Validation at Development Time:**
- Issue: Content schema (`content.config.ts`) defines required fields (title, description, date) but there's no pre-commit hook or dev-time validation to catch missing/malformed frontmatter before push
- Files: `content.config.ts`, `content/blog/*.md`
- Impact: Posts with missing metadata silently fail to render in certain views or break build. Example: If `date` field is invalid format (not matching ISO 8601), `order('date', 'DESC')` in index page may fail.
- Fix approach: Add a simple build-time check or pre-commit hook that validates all `.md` files in `content/blog/` against the schema.

## Missing Features & Gaps

**No Sitemap or SEO Metadata:**
- Issue: No `sitemap.xml` generation and minimal structured data (only basic OpenGraph meta tags in `nuxt.config.ts`)
- Files: `nuxt.config.ts` (meta tags only)
- Impact: Search engines have harder time discovering new posts. No JSON-LD schema for blog posts.
- Priority: **Low** — Fine for a small internal/product blog, but limits organic discoverability.

**No RSS Feed:**
- Issue: No RSS feed generation configured; readers must visit site to see new posts
- Files: `app/pages/`
- Impact: Blog lacks a standard subscription mechanism. Users must remember to check back manually.
- Priority: **Low** — Can be added if subscription functionality becomes important.

**No Search Functionality:**
- Issue: No search bar or tags-based filtering beyond the tag page
- Files: `app/` — No search component or endpoint
- Impact: With growing post volume, finding old posts becomes difficult. Users must scroll through homepage or remember tags.
- Priority: **Medium** — Recommend adding a search component when post count exceeds 20-30.

## Fragile Areas

**Tag Filtering Using LIKE Query:**
- Files: `app/pages/tags/[tag].vue` (line 26)
- Why fragile: The `.where('tags', 'LIKE', tag)` query assumes the `tags` array is stored in a way that supports substring matching. This is brittle if:
  - Tag names contain special regex characters
  - Array serialization format changes
  - A tag "react" would also match "react-dom" if both are in same post
- Safe modification: Use proper array element matching instead of LIKE. Verify Nuxt Content API supports array field predicates (e.g., `.where('tags', 'contains', tag)` or similar).
- Test coverage gap: No tests for tag filtering with edge cases (special chars, partial matches, etc.).

**No Null/Undefined Checks on Post Data:**
- Files: `app/pages/post/[...slug].vue` (lines 39-46), `app/components/BlogPostCard.vue` (line 12)
- Why fragile: While `v-if="post.tags?.length"` uses optional chaining, the `post.title` and `post.description` are accessed without checks. If schema validation fails and these fields are missing, page renders but looks broken.
- Safe modification: Add fallback values in component or ensure schema validation is strict at build time.

## Performance & Scale Concerns

**All Posts Loaded on Index Page:**
- Files: `app/pages/index.vue` (line 22)
- Issue: `.all()` loads every blog post into memory and renders on homepage. With 100+ posts, this becomes slow.
- Current impact: **Minimal** — Only 3 posts exist currently
- Scaling limit: Will cause noticeable slowdown around 100+ posts
- Improvement path: Implement pagination (e.g., 10 posts per page) or lazy loading when post count exceeds threshold.

**No Build-Time Validation:**
- Issue: Content schema is validated at query-time, not at build-time. If a post has invalid frontmatter, the build may succeed but generate broken pages.
- Files: `nuxt.config.ts`, `content.config.ts`
- Impact: **Low for current state**, but increases risk with more contributors adding posts
- Fix approach: Add a Nitro plugin or build hook that pre-validates all content before generation completes.

## Security Considerations

**Unrestricted External Links:**
- Issue: External links in content (footer, about page) open with `target="_blank" rel="noopener"` but some links lack `rel="noopener noreferrer"`
- Files: `app/components/AppFooter.vue`, `app/pages/about.vue`
- Risk: Minor — `noopener` is present, preventing `window.opener` access, but `noreferrer` should also be set for maximum privacy
- Current mitigation: `noopener` is set
- Recommendation: Add `noreferrer` to all external links for consistency and to prevent referrer leakage.

**No Content Security Policy:**
- Issue: No CSP headers configured in deployment
- Files: `.github/workflows/deploy.yml`, `nuxt.config.ts`
- Risk: **Low** for a static blog, but good practice
- Recommendation: Add CSP headers via `.github/` metadata or static file deployment config if supported.

---

*Concerns audit: 2026-02-06*
