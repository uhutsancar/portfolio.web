<script setup lang="ts">
import NumberFlow from '@number-flow/vue'

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

const postCount = computed(() => posts.value?.length ?? 0)

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

  twitterCard: 'summary_large_image',
})
</script>

<template>
  <UPage v-if="page">
    <UPageHero
      :title="page.title"
      :ui="{
        container: 'items-start',
        title: 'mx-0 text-left',
        description: 'mx-0 text-left',
      }"
    >
      <template #description>
        <p class="mx-0 text-left text-base text-muted">
          {{ page.description }}
        </p>
        <p class="mx-0 mt-3 flex items-center gap-1.5 text-left text-sm text-muted">
          <NumberFlow
            :value="postCount"
            class="font-semibold tabular-nums text-highlighted"
          />
          <span>posts published</span>
        </p>
      </template>
    </UPageHero>

    <UPageSection
      :ui="{
        container: 'pt-0!',
      }"
    >
      <UBlogPosts
        orientation="vertical"
        class="max-w-2xl"
      >
        <Motion
          v-for="(post, index) in posts"
          :key="post.id"
          :initial="{
            opacity: 0,
            transform: 'translateY(10px)',
          }"
          :while-in-view="{
            opacity: 1,
            transform: 'translateY(0)',
          }"
          :transition="{
            duration: 0.4,
            delay: index * 0.1,
          }"
          :in-view-options="{
            once: true,
          }"
        >
          <UBlogPost
            :title="post.title"
            :description="post.description"
            :image="post.image"
            :date="formatDate(post.date)"
            orientation="horizontal"
            variant="naked"
          />
        </Motion>
      </UBlogPosts>
    </UPageSection>
  </UPage>
</template>
