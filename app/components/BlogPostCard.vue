<template>
  <NuxtLink :to="post.path" class="block group">
    <article class="border border-dark-border rounded-lg p-6 transition-colors hover:border-gold/50">
      <time class="text-sm text-cream-muted">{{ post.date }}</time>
      <h2 class="mt-2 text-xl font-semibold text-cream group-hover:text-gold transition-colors">
        {{ post.title }}
      </h2>
      <p class="mt-2 text-cream-muted leading-relaxed">
        {{ post.description }}
      </p>
      <div v-if="post.tags?.length" class="mt-4 flex flex-wrap gap-2">
        <TagBadge v-for="tag in post.tags" :key="tag" :tag="tag" />
      </div>
    </article>
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
  post: {
    path: string
    title: string
    description: string
    date: string
    tags?: string[]
  }
}>()
</script>
