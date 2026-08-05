<script setup lang="ts">
const { data: page } = await useAsyncData(
  'blog-page',
  () => {
    return queryCollection('pages')
      .path('/blog')
      .first()
  },
)

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Blog page not found',
    fatal: true,
  })
}

const { data: posts } = await useAsyncData(
  'blog-posts',
  () => {
    return queryCollection('blog')
      .order('date', 'DESC')
      .all()
  },
)

function formatDate(
  value: Date | string,
) {
  return new Intl.DateTimeFormat(
    'en-US',
    {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      timeZone: 'UTC',
    },
  ).format(
    new Date(value),
  )
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
        container: 'items-start',
        title: 'mx-0 text-left',
        description: 'mx-0 text-left',
      }"
    />

    <UPageSection
      :ui="{
        container: 'pt-0!',
      }"
    >
      <UBlogPosts
        orientation="vertical"
        class="max-w-2xl"
      >
        <UBlogPost
          v-for="post in posts"
          :key="post.id"
          :title="post.title"
          :description="post.description"
          :image="post.image"
          :date="formatDate(post.date)"
          orientation="horizontal"
          variant="naked"
        />
      </UBlogPosts>
    </UPageSection>
  </UPage>
</template>
