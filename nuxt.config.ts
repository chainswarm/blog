import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: ['@nuxt/content'],

  app: {
    baseURL: '/blog/',
    pageTransition: {
      name: 'page',
      mode: 'out-in',
    },
    head: {
      title: 'Chain Insights Blog',
      meta: [
        { name: 'description', content: 'Project progress, architecture insights, and lessons learned building the Chain Insights Agent ($CIA).' },
        { property: 'og:title', content: 'Chain Insights Blog' },
        { property: 'og:description', content: 'Project progress, architecture insights, and lessons learned building the Chain Insights Agent ($CIA).' },
        { property: 'og:image', content: '/blog/cover.png' },
        { name: 'theme-color', content: '#0A0A0F' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/blog/favicon.ico' },
      ],
    },
  },

  content: {
    build: {
      markdown: {
        highlight: {
          theme: 'github-dark',
        },
      },
    },
  },

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  nitro: {
    preset: 'github-pages',
  },

  routeRules: {
    '/': { prerender: true },
    '/about': { prerender: true },
    '/post/**': { prerender: true },
    '/tags/**': { prerender: true },
  },
})
