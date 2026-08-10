<script setup lang="ts">
const colorMode = useColorMode()

const themeColor = computed(() => {
  return colorMode.value === 'dark'
    ? '#18181b'
    : '#ffffff'
})

useHead({
  htmlAttrs: {
    lang: 'en',
  },

  titleTemplate: (title) => title ? `${title} — Emma Thompson` : 'Emma Thompson — UX/UI Designer',

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
      href: '/favicon.ico',
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com',
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossorigin: '',
    },
    {
      rel: 'dns-prefetch',
      href: 'https://fonts.googleapis.com',
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
