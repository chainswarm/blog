<template>
  <div>
    <section class="py-8">
      <NuxtLink to="/" class="text-sm text-cream-muted hover:text-gold transition-colors">
        &larr; Back to all posts
      </NuxtLink>
      <h1 class="mt-6 text-3xl font-bold text-gold">
        Posts tagged "{{ tag }}"
      </h1>
    </section>

    <section class="space-y-6">
      <BlogPostCard v-for="post in posts" :key="post.path" :post="post" />
      <p v-if="posts && posts.length === 0" class="text-cream-muted">
        No posts found with this tag.
      </p>
    </section>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const tag = route.params.tag as string

const { data: posts } = await useAsyncData(`tag-${tag}`, () =>
  queryCollection('blog').where('tags', 'LIKE', tag).order('date', 'DESC').all()
)

useHead({
  title: `Posts tagged "${tag}" - Chain Insights Blog`,
})
</script>
