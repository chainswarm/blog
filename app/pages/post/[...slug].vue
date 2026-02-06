<template>
  <article v-if="post" class="py-8">
    <NuxtLink to="/" class="text-sm text-cream-muted hover:text-gold transition-colors">
      &larr; Back to all posts
    </NuxtLink>

    <header class="mt-6 mb-8">
      <div class="flex items-center gap-3 text-sm text-cream-muted">
        <time>{{ post.date }}</time>
        <span>&middot;</span>
        <span>{{ post.author }}</span>
      </div>
      <h1 class="mt-3 text-3xl sm:text-4xl font-bold text-gold">
        {{ post.title }}
      </h1>
      <p class="mt-3 text-lg text-cream-muted">{{ post.description }}</p>
      <div v-if="post.tags?.length" class="mt-4 flex flex-wrap gap-2">
        <TagBadge v-for="tag in post.tags" :key="tag" :tag="tag" />
      </div>
    </header>

    <div class="prose prose-lg max-w-none">
      <ContentRenderer :value="post" />
    </div>
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
</script>
