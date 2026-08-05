<script setup lang="ts">
const { data: page } = await useAsyncData(
  'speaking-page',
  () => {
    return queryCollection('speaking')
      .first()
  },
)

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Speaking page not found',
    fatal: true,
  })
}

const categories = [
  {
    value: 'Conference',
    label: 'Conferences',
  },
  {
    value: 'Live talk',
    label: 'Live talks',
  },
  {
    value: 'Podcast',
    label: 'Podcasts',
  },
] as const

const eventGroups = computed(() => {
  return categories.map(category => ({
    ...category,

    events: page.value?.events.filter(
      event => event.category === category.value,
    ) ?? [],
  }))
})

function getDate(
  value: Date | string,
) {
  return value instanceof Date
    ? value
    : new Date(value)
}

function formatDate(
  value: Date | string,
) {
  return new Intl.DateTimeFormat(
    'en-US',
    {
      month: 'long',
      year: 'numeric',
      timeZone: 'UTC',
    },
  ).format(
    getDate(value),
  )
}

function getDateTime(
  value: Date | string,
) {
  return getDate(value)
    .toISOString()
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
      :links="page.links"
      :ui="{
        title: 'mx-0! text-left',
        description: 'mx-0! text-left',
        links: 'justify-start ',
      }"
    />

    <UPageSection
      :ui="{
        container: 'pt-0!',
      }"
    >
      <section
        v-for="group in eventGroups"
        :key="group.value"
        class="
          mb-16 grid grid-cols-1 gap-4
          last:mb-0
          lg:grid-cols-3 lg:gap-8
        "
      >
        <h2
          class="
            text-xl font-semibold
            tracking-tight text-highlighted
            lg:sticky lg:top-16 lg:self-start
          "
        >
          {{ group.label }}
        </h2>

        <ul
          class="
            space-y-8
            lg:col-span-2
          "
        >
          <li
            v-for="event in group.events"
            :key="`${event.category}-${event.title}`"
            class="
              group border-l
              border-default pl-6
            "
          >
            <p
              class="
                mb-1 text-sm
                font-medium text-muted
              "
            >
              <span>
                {{ event.location }}
              </span>

              <span
                aria-hidden="true"
                class="mx-1"
              >
                ·
              </span>

              <time
                :datetime="getDateTime(event.date)"
              >
                {{ formatDate(event.date) }}
              </time>
            </p>

            <h3
              class="
                text-lg font-semibold
                text-highlighted
              "
            >
              {{ event.title }}
            </h3>

            <UButton
              v-if="event.url"
              :label="
                event.category === 'Podcast'
                  ? 'Listen'
                  : 'Watch'
              "
              :to="event.url"
              target="_blank"
              variant="link"
              class="mt-2 gap-0 p-0"
            >
              <template #trailing>
                <UIcon
                  name="i-lucide-arrow-right"
                  class="
                    size-4 opacity-0
                    transition-all
                    group-hover:translate-x-1
                    group-hover:opacity-100
                  "
                />
              </template>
            </UButton>
          </li>
        </ul>
      </section>
    </UPageSection>
  </UPage>
</template>
