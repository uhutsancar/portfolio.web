<script setup lang="ts">
const { data: page } = await useAsyncData(
  'home-page',
  () => {
    return queryCollection('index').first()
  },
)





if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Home page not found',
    fatal: true,
  })
}
</script>

<template>
  <UPage v-if="page">
    <HomeHero :hero="page.hero" />

    <UPageSection
      :ui="{
        container: [
          'pt-0!',
          'lg:grid',
          'lg:grid-cols-2',
          'lg:gap-8',
        ].join(' '),
      }"
    >
      <HomeAbout :about="page.about" />

      <HomeWorkExperience
        :experience="page.experience"
      />
    </UPageSection>

    <HomeBlog :blog="page.blog" />

    <HomeTestimonials
      :testimonials="page.testimonials"
    />

    <HomeFaq :faq="page.faq" />
  </UPage>
</template>
