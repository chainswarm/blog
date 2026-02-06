# External Integrations

**Analysis Date:** 2026-02-06

## APIs & External Services

**No external APIs integrated.** The blog is a completely static, self-contained application with no outbound API calls to third-party services.

## Data Storage

**Databases:**
- SQLite (embedded via better-sqlite3)
  - Purpose: Cache layer only - generated at build time from markdown files
  - Location: `.data/content/contents.sqlite` (77KB cache file)
  - Client: better-sqlite3 12.6.2
  - Lifecycle: Regenerated on build, not deployed, not required for runtime

**File Storage:**
- Local filesystem only
  - Source files: `content/blog/` - Markdown blog posts
  - Static assets: `public/` - Images, favicon
  - Styles: `app/assets/css/` - CSS configuration
  - No cloud storage integration (AWS S3, Cloudinary, etc.)

**Caching:**
- None (build-time static generation)

## Authentication & Identity

**Auth Provider:**
- None - No authentication system
- Implementation: Public blog, no user login or access control
- All content is publicly readable

## Monitoring & Observability

**Error Tracking:**
- None configured (no Sentry, Rollbar, etc.)
- Client-side errors logged to browser console only

**Logs:**
- Build logs: GitHub Actions workflow logs (GitHub-hosted)
- Runtime: No server-side logging (static site)
- Development: Console output from `npm run dev`

## CI/CD & Deployment

**Hosting:**
- GitHub Pages - Static hosting
- Repository: `chainswarm/blog` on GitHub
- Custom domain: Not configured (uses `chainswarm.github.io/blog/`)
- HTTPS: Automatic (GitHub Pages provides TLS)

**CI Pipeline:**
- GitHub Actions
- Workflow file: `.github/workflows/deploy.yml`
- Trigger: Push to `main` branch or manual workflow dispatch
- Build steps:
  1. Checkout code (actions/checkout@v4)
  2. Setup Node.js 22 with npm cache (actions/setup-node@v4)
  3. Install dependencies (`npm ci`)
  4. Build: `npx nuxt build --preset github_pages`
  5. Upload artifact: `.output/public/` (actions/upload-pages-artifact@v3)
  6. Deploy: Automatic via actions/deploy-pages@v4
- Permissions: read:contents, write:pages, write:id-token

## Environment Configuration

**Required env vars:**
- `NUXT_APP_BASE_URL=/blog/` - Set in GitHub Actions workflow during build (not runtime)
- No other environment variables needed

**Secrets location:**
- None required - No API keys, database credentials, or secrets
- `.env` and `.env.*` files listed in `.gitignore` but not used/committed

## Webhooks & Callbacks

**Incoming:**
- None

**Outgoing:**
- None

---

*Integration audit: 2026-02-06*
