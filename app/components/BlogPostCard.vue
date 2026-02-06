<template>
  <NuxtLink :to="post.path" class="block group">
    <article class="bg-dark-surface border border-dark-border rounded-lg p-5 sm:p-8 shadow-card transition-all duration-200 ease-smooth hover:-translate-y-0.5 hover:shadow-card-glow hover:border-transparent">
      <time class="text-sm text-cream-muted">{{ post.date }}</time>
      <h2 class="mt-3 text-xl font-semibold tracking-tight text-cream group-hover:text-gold transition-colors duration-200 ease-smooth">
        {{ post.title }}
      </h2>
      <p class="mt-3 text-cream-muted leading-relaxed">
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
