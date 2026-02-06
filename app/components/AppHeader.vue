<template>
  <header class="sticky top-0 z-50 bg-dark/80 backdrop-blur-md">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
      <NuxtLink to="/" class="flex items-center gap-3 min-h-[44px]">
        <img src="/logo.png" alt="Chain Insights" class="h-8" />
      </NuxtLink>
      <nav class="flex items-center gap-4 sm:gap-6">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="text-sm text-cream-muted hover:text-gold transition-colors duration-200 ease-smooth min-h-[44px] flex items-center"
          active-class="!text-gold"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>
    </div>
    <div class="h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent"></div>
  </header>
</template>

<script setup lang="ts">
const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
]
</script>
