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
  ],

  link: [
    {
      rel: 'icon',
      href: '/favicon.ico',
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
