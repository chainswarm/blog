<template>
  <NuxtLink
    v-if="linked"
    :to="`/tags/${tag}`"
    class="inline-flex items-center min-h-[44px] sm:min-h-0 text-xs px-2.5 py-1 rounded-full border border-gold/30 text-gold-dim hover:text-gold hover:border-gold/50 hover:shadow-[0_0_8px_rgba(201,184,140,0.2)] transition-all duration-200 ease-smooth"
  >
    {{ tag }}
  </NuxtLink>
  <span
    v-else
    class="inline-flex items-center text-xs px-2.5 py-1 rounded-full border border-gold/30 text-gold-dim"
  >
    {{ tag }}
  </span>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  tag: string
  linked?: boolean
}>(), {
  linked: true,
})
</script>
