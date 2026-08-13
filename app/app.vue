<script setup lang="ts">
const colorMode = useColorMode()

const themeColor = computed(() => {
  return colorMode.value === 'dark'
    ? '#18181b'
    : '#ffffff'
})

useHead({
  htmlAttrs: {
    lang: 'tr',
  },

  titleTemplate: (title) => title ? `${title} — Uhut Sancar` : 'Uhut Sancar — Frontend Developer',

  meta: [
    {
      charset: 'utf-8',
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      name: 'theme-color',
      content: themeColor,
    },
    {
      name: 'robots',
      content: 'index, follow',
    },
  ],

  link: [
    {
      rel: 'icon',
      sizes: 'any',
      href: '/favicon.ico',
    },
    {
      rel: 'icon',
      type: 'image/png',
      media: '(prefers-color-scheme: light)',
      href: '/profile_black.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      media: '(prefers-color-scheme: dark)',
      href: '/profile_white.png',
    },
    {
      rel: 'apple-touch-icon',
      href: '/profile_black.png',
    },
    {
      rel: 'alternate',
      type: 'application/rss+xml',
      title: 'Uhut Sancar — Blog',
      href: '/rss.xml',
    },
    {
      rel: 'sitemap',
      type: 'application/xml',
      href: '/sitemap.xml',
    },
  ],
})

</script>



<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
