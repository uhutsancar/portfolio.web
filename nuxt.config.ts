// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  css: ['~/assets/css/main.css'],

  app: {
    pageTransition: {
      name: 'page',
      mode: 'out-in',
    },
  },

  modules: [
    '@nuxt/ui',
    '@nuxt/image',
    '@nuxt/content',
    'motion-v/nuxt',
    'nuxt-studio',
    // '@vercel/analytics',
  ],

  studio: {
    route: '/admin',
  },

  content: {
    experimental: {
      sqliteConnector: 'native',
    },
  },

  image: {
    format: ['webp', 'avif'],
    quality: 80,
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
  },

  nitro: {
    routeRules: {
      '/sitemap.xml': {
        headers: {
          'Cache-Control': 'public, max-age=86400',
        },
      },

      '/robots.txt': {
        headers: {
          'Cache-Control': 'public, max-age=86400',
        },
      },

      '/rss.xml': {
        headers: {
          'Cache-Control': 'public, max-age=3600',
        },
      },

      '/': {
        isr: 3600,
      },

      '/about': {
        isr: 3600,
      },

      '/projects': {
        isr: 3600,
      },

      '/blog': {
        isr: 3600,
      },

      '/blog/**': {
        isr: 3600,
      },

      '/speaking': {
        isr: 3600,
      },

      '/contact': {
        isr: 3600,
      },
    },
  },

  runtimeConfig: {
    resend: {
      apiKey: '',
      from: '',
      to: '',
    },
  },
})
