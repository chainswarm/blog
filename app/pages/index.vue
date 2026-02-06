<template>
  <div>
    <section class="py-8 sm:py-12">
      <h1 class="text-3xl sm:text-4xl font-bold text-gold">Chain Insights Blog</h1>
      <p class="mt-4 text-lg text-cream-muted max-w-2xl leading-relaxed">
        Project progress, architecture insights, and lessons learned as we build
        the Chain Insights Agent ($CIA).
      </p>
    </section>

    <section class="space-y-6">
      <BlogPostCard v-for="post in posts" :key="post.path" :post="post" />
      <p v-if="posts && posts.length === 0" class="text-cream-muted">
        No posts yet. Check back soon!
      </p>
    </section>
  </div>
</template>

<script setup lang="ts">
const { data: posts } = await useAsyncData('blog-list', () =>
  queryCollection('blog').order('date', 'DESC').all()
)
</script>
