# Coding Conventions

**Analysis Date:** 2026-02-06

## Naming Patterns

**Files:**
- Vue components use PascalCase: `BlogPostCard.vue`, `AppHeader.vue`, `TagBadge.vue`
- Page routes use kebab-case with brackets for dynamic routes: `[...slug].vue`, `[tag].vue`
- TypeScript config files use camelCase: `nuxt.config.ts`, `content.config.ts`
- CSS files use descriptive names: `main.css`

**Functions:**
- Use camelCase for function and method names
- Composable-style functions (Nuxt) use camelCase: `useRoute()`, `useAsyncData()`, `useHead()`, `queryCollection()`
- Constants in data arrays use descriptive names: `links`, `posts`

**Variables:**
- Use camelCase for local variables and data properties
- Component props use camelCase: `post`, `tag`, `linked`
- Component data/computed properties use camelCase

**Types:**
- Use inline type definitions with `defineProps<{...}>()` and `withDefaults(defineProps<{...}>(), {...})`
- Object properties use camelCase: `path`, `title`, `description`, `date`, `tags`, `author`
- Optional properties use TypeScript optional syntax: `tags?: string[]`, `image?: string`, `linked?: boolean`

## Code Style

**Formatting:**
- Tailwind CSS for all styling (no separate CSS classes except global theme definitions in `main.css`)
- Use Tailwind utility classes directly in templates: `class="mt-4 text-xl font-semibold text-cream"`
- Theme colors defined in CSS custom properties: `--color-dark`, `--color-gold`, `--color-cream`, etc.
- Template spacing with consistent indentation (2 spaces observed)

**Linting:**
- No explicit ESLint or Prettier configuration found - project follows Nuxt defaults
- TypeScript enabled with basic configuration in `tsconfig.json`
- Code appears to follow standard Vue 3 and Nuxt 4 conventions

## Import Organization

**Order:**
Vue components use standard ES6 module syntax:
1. Template block first
2. Script block with `<script setup lang="ts">` second
3. No explicit imports shown - uses Nuxt auto-imports for composables and components

**Path Aliases:**
- Nuxt auto-imports all components from `app/components/` directory
- Nuxt auto-imports all composables and components without explicit import statements
- Use `@` alias for assets (CSS): `@apply` in Tailwind directives
- Relative paths not used - rely on Nuxt auto-discovery

**Global Imports:**
The following are auto-imported by Nuxt across all files:
- `useRoute`, `useAsyncData`, `useHead`, `queryCollection`, `createError` - Nuxt composables
- `NuxtLayout`, `NuxtPage`, `NuxtLink`, `ContentRenderer` - Nuxt components
- Component names like `BlogPostCard`, `TagBadge`, `AppHeader` auto-resolved

## Error Handling

**Patterns:**
- Use `createError()` with status code and message for HTTP errors: `throw createError({ statusCode: 404, message: 'Post not found' })`
- Conditional rendering for missing data: `v-if="post"` with empty state fallback
- Null-safety with optional chaining: `post.tags?.length` and `v-if="posts && posts.length === 0"`
- Async data loading with `useAsyncData()` returns `{ data: ... }` destructuring

## Logging

**Framework:**
- No explicit logging framework detected in main application code
- Use Nuxt's built-in console for development purposes only
- No console.log statements found in components - prefer reactive data flow

**Patterns:**
- Avoid logging in component code; use dev tools and console for debugging
- Template rendering drives display logic; no need for imperative logging

## Comments

**When to Comment:**
- Comments used sparingly; CSS has explanatory comments for non-obvious styling:
  - `/* Prose dark gold theme overrides */`
  - `/* Scrollbar styling */`
- Vue templates are self-documenting via semantic HTML and clear variable names
- TypeScript types define structure clearly without needing comments

**JSDoc/TSDoc:**
- Not used in this project - TypeScript type definitions are inline and sufficient
- Component props documented via TypeScript interfaces in `defineProps<{...}>()`

## Function Design

**Size:**
- Keep functions small and focused on single responsibility
- Page components typically 20-50 lines (template + script)
- Component scripts use Nuxt composables rather than extracting logic functions

**Parameters:**
- Use TypeScript `defineProps<{...}>()` for component inputs
- Prefer destructuring over positional arguments: `{ post }`, `{ tag }`
- Use `withDefaults()` for optional props: `withDefaults(defineProps<{ linked?: boolean }>(), { linked: true })`

**Return Values:**
- Components render via template, no explicit return statements
- Composables return reactive state via `useAsyncData()` destructuring: `const { data: posts } = ...`
- Use optional chaining for null-safe property access

## Module Design

**Exports:**
- Vue components are default exports (implicit in `.vue` files)
- Content schema defined with `defineContentConfig()` and `defineCollection()` for schema validation
- Use TypeScript for schema validation: `z.object({ ... }).default([])` pattern with Zod

**Barrel Files:**
- No barrel files (`index.ts` re-exports) detected in this project
- Rely on Nuxt's auto-import system for components and composables
- Each component is a self-contained `.vue` file with no intermediate aggregation

## Vue 3 Composition API

**Pattern:**
- Use `<script setup lang="ts">` syntax exclusively
- Reactive state managed through Nuxt composables: `useAsyncData()`, `useRoute()`, `useHead()`
- Props defined with `defineProps<{...}>()` for type safety
- No explicit `reactive()` or `ref()` - let Nuxt handle reactivity

**Component Composition:**
- Pages in `app/pages/` use route-based composition
- Reusable components in `app/components/` are presentational (props-driven)
- Layouts in `app/layouts/` provide page structure with `<slot />`
- All components support TypeScript with proper type definitions

## Tailwind CSS Usage

**Pattern:**
- Use Tailwind v4 utility classes exclusively for styling
- Custom theme colors defined in CSS: `--color-dark`, `--color-gold`, `--color-cream`, `--color-gold-dim`, `--color-dark-surface`, `--color-dark-border`
- Typography plugin enabled: `@tailwindcss/typography` for prose styling
- Responsive prefixes: `sm:` for mobile-first responsive design

**Example:**
```vue
<h1 class="text-3xl sm:text-4xl font-bold text-gold">Title</h1>
<p class="mt-4 text-lg text-cream-muted max-w-2xl leading-relaxed">Description</p>
<div class="flex items-center gap-3">Content</div>
```

**Theme Application:**
- Dark theme with gold accents as primary color scheme
- Use semantic color names: `text-gold`, `text-cream-muted`, `bg-dark`, `border-dark-border`
- Pseudo-classes for interactivity: `hover:text-gold`, `hover:border-gold`, `transition-colors`

---

*Convention analysis: 2026-02-06*
