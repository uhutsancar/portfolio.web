<script setup lang="ts">
const { data: page } = await useAsyncData(
  'home-page',
  () => queryCollection('index').first(),
)

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Home page not found',
    fatal: true,
  })
}

const title
  = page.value.seo?.title
    ?? page.value.hero.title

const description
  = page.value.seo?.description
    ?? page.value.hero.description

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  twitterTitle: title,
  twitterDescription: description,
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <UPage v-if="page">
    <HomeHero :hero="page.hero" />

    <UPageSection
      :ui="{
        container:
          'pt-0! lg:grid lg:grid-cols-2 lg:gap-8',
      }"
    >
      <HomeAbout :about="page.about" />

      <HomeWorkExperience
        :experience="page.experience"
      />
    </UPageSection>

    <HomeBlog :blog="page.blog" />

    <HomeStack :stack="page.stack" />

    <HomeFaq :faq="page.faq" />
  </UPage>
</template>

