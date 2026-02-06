<template>
  <footer class="mt-auto">
    <div class="h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent"></div>
    <div class="max-w-4xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-cream-muted">
      <span>&copy; {{ new Date().getFullYear() }} Chain Insights</span>
      <div class="flex items-center gap-4 sm:gap-6">
        <a href="https://chain-insights.chainswarm.xyz" target="_blank" rel="noopener" class="hover:text-gold transition-colors duration-200 ease-smooth min-h-[44px] inline-flex items-center">
          App
        </a>
        <a href="https://x.com/ChainInsightsAI" target="_blank" rel="noopener" class="hover:text-gold transition-colors duration-200 ease-smooth min-h-[44px] inline-flex items-center">
          X / Twitter
        </a>
        <a href="https://github.com/chainswarm" target="_blank" rel="noopener" class="hover:text-gold transition-colors duration-200 ease-smooth min-h-[44px] inline-flex items-center">
          GitHub
        </a>
      </div>
    </div>
  </footer>
</template>
