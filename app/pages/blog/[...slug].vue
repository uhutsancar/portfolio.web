<script setup lang="ts">
const route = useRoute()

const { data: page } = await useAsyncData(
  route.path,
  () => queryCollection('blog').path(route.path).first(),
)

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true,
  })
}

const { data: surround } = await useAsyncData(
  `${route.path}-surround`,
  () =>
    queryCollectionItemSurroundings('blog', route.path, {
      fields: ['description'],
    }).order('date', 'DESC'),
)

const title = page.value.title
const description = page.value.description

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: page.value.image,
  twitterTitle: title,
  twitterDescription: description,
  twitterCard: 'summary_large_image',
  twitterImage: page.value.image,
})

function formatDate(value: Date | string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(value))
}
</script>

<template>
  <UMain class="mt-20 px-2">
    <UContainer class="relative min-h-screen">
      <UPage v-if="page">
        <ULink
          to="/blog"
          class="flex items-center gap-1 text-sm"
        >
          <UIcon name="lucide:chevron-left" />
          Blog
        </ULink>

        <div class="mt-8 flex flex-col gap-3">
          <div class="flex items-center justify-center gap-2 text-xs text-muted">
            <span>{{ formatDate(page.date) }}</span>
            <span v-if="page.minRead">-</span>
            <span v-if="page.minRead">
              {{ page.minRead }} MIN READ
            </span>
          </div>

          <NuxtImg
            v-if="page.image"
            :src="page.image"
            :alt="page.title"
            class="h-75 w-full rounded-lg object-cover object-center"
          />

          <h1 class="mx-auto mt-4 max-w-3xl text-center text-4xl font-medium">
            {{ page.title }}
          </h1>

          <p class="mx-auto max-w-2xl text-center text-muted">
            {{ page.description }}
          </p>

          <div class="mt-2 flex items-center justify-center">
            <UUser
              v-if="page.author"
              v-bind="page.author"
              orientation="vertical"
              color="neutral"
              variant="outline"
              class="items-center justify-center text-center"
            />
          </div>
        </div>

        <UPageBody class="mx-auto max-w-3xl">
          <ContentRenderer
            v-if="page.body"
            :value="page"
          />

          <div class="flex justify-end text-sm text-muted">
            <UButton
              size="sm"
              variant="link"
              color="neutral"
              label="Copy link"
            />
          </div>

          <UContentSurround :surround="surround" />
        </UPageBody>
      </UPage>
    </UContainer>
  </UMain>
</template>
