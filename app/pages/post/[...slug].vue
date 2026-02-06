<template>
  <article v-if="post" class="py-6">
    <!-- Reading progress bar -->
    <div
      class="fixed top-0 left-0 h-0.5 bg-gold z-[60] transition-[width] duration-100 ease-linear"
      :style="{ width: `${readProgress}%` }"
    ></div>

    <NuxtLink to="/" class="inline-flex items-center min-h-[44px] sm:min-h-0 text-sm text-cream-muted hover:text-gold transition-colors duration-200 ease-smooth">
      &larr; Back to all posts
    </NuxtLink>

    <header class="mt-6 sm:mt-8 mb-8 sm:mb-12">
      <div class="flex items-center gap-3 text-sm text-cream-muted">
        <time>{{ post.date }}</time>
        <span>&middot;</span>
        <span>{{ post.author }}</span>
        <span>&middot;</span>
        <span>{{ readingTime }} min read</span>
      </div>
      <h1 class="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gold">
        {{ post.title }}
      </h1>
      <p class="mt-4 text-lg text-cream-muted">{{ post.description }}</p>
      <div v-if="post.tags?.length" class="mt-4 flex flex-wrap gap-2">
        <TagBadge v-for="tag in post.tags" :key="tag" :tag="tag" />
      </div>
    </header>

    <div class="prose prose-lg max-w-none">
      <ContentRenderer :value="post" />
    </div>

    <!-- Back to top button -->
    <button
      v-show="showBackToTop"
      class="fixed bottom-6 right-6 w-10 h-10 rounded-full bg-dark-surface border border-dark-border shadow-card flex items-center justify-center text-cream-muted hover:text-gold hover:border-gold/30 hover:shadow-card-glow transition-all duration-200 ease-smooth cursor-pointer"
      :class="showBackToTop ? 'opacity-100' : 'opacity-0'"
      aria-label="Back to top"
      @click="scrollToTop"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  </article>
</template>

<script setup lang="ts">
const route = useRoute()

const { data: post } = await useAsyncData(`blog-${route.path}`, () =>
  queryCollection('blog').path(route.path).first()
)

if (!post.value) {
  throw createError({ statusCode: 404, message: 'Post not found' })
}

useHead({
  title: post.value.title + ' - Chain Insights Blog',
  meta: [
    { name: 'description', content: post.value.description },
    { property: 'og:title', content: post.value.title },
    { property: 'og:description', content: post.value.description },
  ],
})

// Reading time estimate (avg 200 words per minute)
const readingTime = computed(() => {
  if (!post.value?.body) return 1
  const text = JSON.stringify(post.value.body)
  const words = text.split(/\s+/).length
  return Math.max(1, Math.ceil(words / 200))
})

// Reading progress
const readProgress = ref(0)
const showBackToTop = ref(false)

function updateProgress() {
  const scrollTop = window.scrollY
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  readProgress.value = docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0
  showBackToTop.value = scrollTop > 400
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', updateProgress, { passive: true })
  updateProgress()
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateProgress)
})
</script>
