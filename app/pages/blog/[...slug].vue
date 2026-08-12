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
