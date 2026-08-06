<script setup lang="ts">
const { data: page } = await useAsyncData(
  'contact-page',
  () => {
    return queryCollection('contact')
      .first()
  },
)

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Contact page not found',
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
  twitterTitle: title,
  twitterDescription: description,
})
</script>

<template>
  <UPage v-if="page">
    <UPageHero
      :title="page.title"
      :description="page.description"
      :ui="{
        title: 'mx-0! text-left',
        description: 'mx-0! text-left',
      }"
    />

    <UPageSection
      :ui="{
        container: 'pt-0!',
      }"
    >
      <ContactForm
        :submit-label="page.form.submitLabel"
        :success-message="page.form.successMessage"
        :error-message="page.form.errorMessage"
      />
    </UPageSection>
  </UPage>
</template>
