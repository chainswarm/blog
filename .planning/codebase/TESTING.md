# Testing Patterns

**Analysis Date:** 2026-02-06

## Test Framework

**Status:** Not configured

This project does not currently have a test framework configured. No testing infrastructure is present.

**Test Runner:** Not detected
- No Vitest, Jest, or other test runner configured
- No test npm scripts in `package.json`

**Assertion Library:** Not applicable

**Run Commands:** Not available

The following npm scripts are available for development:
```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run generate  # Generate static site (GitHub Pages)
npm run preview   # Preview built site locally
```

## Test File Organization

**Location:** Not applicable - no test files exist

**Naming:** Not applicable

**Structure:** Not applicable

## Test Structure

**Pattern:** Not applicable

No test files are present in the codebase.

## Mocking

**Framework:** Not applicable

No mocking framework is configured.

**Patterns:** Not applicable

## Fixtures and Factories

**Test Data:** Not applicable

No test fixtures exist.

**Location:** Not applicable

## Coverage

**Requirements:** Not enforced

No code coverage tooling is configured.

## Test Types

**Unit Tests:**
- Not implemented

**Integration Tests:**
- Not implemented

**E2E Tests:**
- Not implemented

## Manual Testing Approach

Since automated tests are not configured, the project relies on:

1. **Manual Development Testing:**
   - Run `npm run dev` to start the development server
   - View changes in browser with hot module reloading
   - Test content rendering via `npm run generate` (GitHub Pages prerender)

2. **Content Validation:**
   - Blog content in `content/blog/` validated via Zod schema in `content.config.ts`
   - Schema enforces: `title`, `description`, `date`, `author`, `tags` (optional), `image` (optional)
   - Invalid content will fail at build time

3. **Route Prerendering:**
   - Routes configured for prerendering in `nuxt.config.ts`:
     - `'/'`: Home page
     - `'/about'`: About page
     - `'/post/**'`: All blog posts
     - `'/tags/**'`: All tag pages
   - Prerendering validates route generation without runtime errors

## Recommended Testing Strategy

For adding tests to this project, consider:

**For Component Testing:**
- Use Vitest with Vue Test Utils for component unit tests
- Place test files co-located with components: `BlogPostCard.vue` and `BlogPostCard.spec.ts`
- Test component props, event handling, and conditional rendering

**For Content/Schema Validation:**
- Use Vitest for schema validation tests
- Test `content.config.ts` Zod schema against valid and invalid content
- Verify collection queries work correctly

**For Route Generation:**
- Test that all expected routes are prerendered
- Verify 404 handling for non-existent posts
- Test tag filtering and sorting logic

**For Integration:**
- Test data flow from `useAsyncData()` to component rendering
- Verify tag filtering returns correct posts
- Test pagination if implemented

## Checking Content Validity

The project uses Zod schema validation in `content.config.ts` to ensure content quality:

```typescript
schema: z.object({
  title: z.string(),
  description: z.string(),
  date: z.string(),
  tags: z.array(z.string()).default([]),
  image: z.string().optional(),
  author: z.string().default('Chain Insights Team'),
})
```

**Validation occurs at:**
- Build time: `npm run build` and `npm run generate`
- Development: `npm run dev` (lazy validation)
- Invalid content blocks build with schema error messages

## Deployment Validation

The GitHub Pages deployment (`nitro.preset: 'github-pages'`) validates:
- All prerendered routes are static HTML files
- CSS is bundled and loaded correctly
- Assets reference correct base URL: `/blog/`
- Links use correct paths for GitHub Pages subdirectory

---

*Testing analysis: 2026-02-06*
