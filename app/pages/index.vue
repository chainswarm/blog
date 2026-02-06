<template>
  <div>
    <section class="relative py-12 sm:py-20">
      <div
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] opacity-[0.07] blur-[40px] pointer-events-none"
        style="background: radial-gradient(ellipse at center, var(--color-gold), transparent 70%)"
        aria-hidden="true"
      ></div>
      <h1 class="relative text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gold">Chain Insights Blog</h1>
      <p class="relative mt-4 text-lg text-cream-muted max-w-2xl leading-relaxed">
        Project progress, architecture insights, and lessons learned as we build
        the Chain Insights Agent ($CIA).
      </p>
    </section>

    <section class="space-y-8">
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
