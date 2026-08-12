<!-- <script setup lang="ts">
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
    }),
)

const title = page.value.seo?.title || page.value.title
const description = page.value.seo?.description || page.value.description

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

function formatDate(date: Date | string) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(date))
}

async function copyLink() {
  if (!import.meta.client)
    return

  await navigator.clipboard.writeText(window.location.href)
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
          <UIcon name="i-lucide-chevron-left" />
          Blog
        </ULink>

        <div class="mt-8 flex flex-col gap-3">
          <div class="flex items-center justify-center gap-2 text-xs text-muted">
            <span v-if="page.date">
              {{ formatDate(page.date) }}
            </span>

            <span v-if="page.date && page.minRead">
              -
            </span>

            <span v-if="page.minRead">
              {{ page.minRead }} MIN READ
            </span>
          </div>

          <NuxtImg
            v-if="page.image"
            :src="page.image"
            :alt="page.title"
            class="w-full rounded-lg object-cover object-center"
            height="300"
          />

          <h1 class="mx-auto mt-4 max-w-3xl text-center text-4xl font-medium">
            {{ page.title }}
          </h1>

          <p class="mx-auto max-w-2xl text-center text-muted">
            {{ page.description }}
          </p>

          <div class="mt-2 flex items-center justify-center">
            <UUser
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

          <div class="flex items-center justify-end gap-2 text-sm text-muted">
            <UButton
              size="sm"
              variant="link"
              color="neutral"
              label="Copy link"
              @click="copyLink"
            />
          </div>

          <UContentSurround :surround="surround" />
        </UPageBody>
      </UPage>
    </UContainer>
  </UMain>
</template> -->









<script setup lang="ts">
const route = useRoute()
const toast = useToast()

const { data: pageData } = await useAsyncData(
  `blog-post-${route.path}`,
  () => queryCollection('blog').path(route.path).first(),
)

if (!pageData.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true,
  })
}

const page = pageData.value

const { data: posts } = await useAsyncData(
  'blog-posts-navigation',
  () =>
    queryCollection('blog')
      .order('date', 'DESC')
      .select('title', 'description', 'path')
      .all(),
)

const currentIndex = computed(() => {
  if (!posts.value)
    return -1

  return posts.value.findIndex(post => post.path === page.path)
})

const surround = computed(() => {
  if (!posts.value || currentIndex.value === -1)
    return [null, null]

  const index = currentIndex.value

  const previous = index > 0
    ? posts.value[index - 1]
    : null

  const next = index < posts.value.length - 1
    ? posts.value[index + 1]
    : null

  return [previous, next]
})

function formatDate(value: Date | string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(value))
}

useSeoMeta({
  title: page.title,
  description: page.description,
  ogTitle: page.title,
  ogDescription: page.description,
  ogImage: page.image,
  twitterTitle: page.title,
  twitterDescription: page.description,
  twitterCard: 'summary_large_image',
  twitterImage: page.image,
})

async function copyLink() {
  try {
    await navigator.clipboard.writeText(window.location.href)

    toast.add({
      title: 'Link copied to clipboard!',
      icon: 'i-lucide-check-circle',
      color: 'success',
    })
  }
  catch {
    toast.add({
      title: 'Failed to copy link',
      icon: 'i-lucide-x-circle',
      color: 'error',
    })
  }
}
</script>

<template>
  <UPage>
    <UContainer class="max-w-3xl py-12">
      <div class="mb-10 flex items-center justify-between">
        <UButton
          to="/blog"
          icon="i-lucide-chevron-left"
          color="neutral"
          variant="ghost"
          label="Blog"
        />

        <div class="flex items-center justify-center gap-2 text-sm text-muted">
          <time>
            {{ formatDate(page.date) }}
          </time>

          <span v-if="page.minRead">
            •
          </span>

          <span v-if="page.minRead">
            {{ page.minRead }} MIN READ
          </span>
        </div>

        <div class="w-18" />
      </div>

      <NuxtImg
        v-if="page.image"
        :src="page.image"
        :alt="page.title"
        class="mb-12 aspect-2/1 w-full rounded-2xl object-cover"
      />

      <div class="mb-16 text-center">
        <h1
          class="mb-6 text-3xl font-bold tracking-tight text-highlighted sm:text-4xl lg:text-5xl"
        >
          {{ page.title }}
        </h1>

        <p class="mx-auto mb-8 max-w-2xl text-lg text-muted">
          {{ page.description }}
        </p>

        <div
          v-if="page.author"
          class="flex flex-col items-center justify-center gap-3"
        >
          <UAvatar
            v-if="page.author.avatar"
            :src="page.author.avatar.src"
            :alt="page.author.avatar.alt || page.author.name"
            size="md"
          />

          <span class="text-sm font-semibold text-highlighted">
            {{ page.author.name }}
          </span>
        </div>
      </div>

      <UPageBody prose>
        <ContentRenderer :value="page" />
      </UPageBody>

      <div class="mb-16 flex justify-end">
        <UButton
          color="neutral"
          variant="link"
          label="Copy link"
          @click="copyLink"
        />
      </div>

      <UContentSurround :surround="surround as any" />
    </UContainer>
  </UPage>
</template>