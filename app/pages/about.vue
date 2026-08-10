<script setup lang="ts">
const { data: page } = await useAsyncData(
  'about-page',
  () => {
    return queryCollection('about')
      .first()
  },
)

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'About page not found',
    fatal: true,
  })
}

const title
  = page.value.seo?.title
    ?? page.value.title

const description
  = page.value.seo?.description
    ?? page.value.description

useSeoMeta({
  title,

  description,

  ogTitle: title,

  ogDescription: description,

  ogImage: page.value.profile.light,

  twitterTitle: title,

  twitterDescription: description,

  twitterImage: page.value.profile.light,

  twitterCard: 'summary_large_image',
})
</script>

<template>
  <UPage v-if="page">
    <UPageHero
      :title="page.title"
      :description="page.description"
      orientation="horizontal"
      :ui="{
        container:
          'items-center sm:flex-row lg:flex',

        title:
          'mx-0! text-left',

        description:
          'mx-0! text-left',

        links:
          'justify-start',
      }"
    >
      <UColorModeAvatar
        :light="page.profile.light"
        :dark="page.profile.dark"
        :alt="page.profile.alt"
        class="
          size-36 rounded-lg
          ring ring-default
          ring-offset-3 ring-offset-bg
          sm:rotate-4
        "
      />
    </UPageHero>

    <UPageSection
      :ui="{
        container: 'pt-0!',
      }"
    >
      <MDC
        :value="page.content"
        unwrap="p"
      />

      <section
        aria-label="Personal photo gallery"
        class="
          flex flex-row
          items-center justify-center
          -space-x-8 py-10
        "
      >
        <PolaroidItem
          v-for="(image, index) in page.images"
          :key="image.src"
          :image="image"
          :index="index"
        />
      </section>
    </UPageSection>
  </UPage>
</template>