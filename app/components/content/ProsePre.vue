<template>
  <div class="group relative">
    <button
      class="absolute top-2 right-2 p-1.5 rounded bg-dark-elevated border border-dark-border text-cream-muted opacity-0 group-hover:opacity-100 hover:text-gold hover:border-gold/30 transition-all duration-200 ease-smooth cursor-pointer"
      aria-label="Copy code"
      @click="copy"
    >
      <svg v-if="!copied" xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
      <span v-else class="text-xs font-medium text-gold">Copied!</span>
    </button>
    <pre :class="$props.class"><slot /></pre>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  code: { type: String, default: '' },
  language: { type: String, default: null },
  filename: { type: String, default: null },
  highlights: { type: Array, default: () => [] },
  meta: { type: String, default: null },
  class: { type: String, default: null },
})

const copied = ref(false)

async function copy() {
  await navigator.clipboard.writeText(props.code)
  copied.value = true
  setTimeout(() => { copied.value = false }, 2000)
}
</script>

<style>
pre code .line { display: block; }
</style>
