<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />
    <main class="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
