<template>
  <NuxtLink
    v-if="linked"
    :to="`/tags/${tag}`"
    class="inline-block text-xs px-2.5 py-1 rounded-full border border-gold/30 text-gold-dim hover:border-gold hover:text-gold transition-colors"
  >
    {{ tag }}
  </NuxtLink>
  <span
    v-else
    class="inline-block text-xs px-2.5 py-1 rounded-full border border-gold/30 text-gold-dim"
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
