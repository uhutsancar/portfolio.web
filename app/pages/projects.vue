<script setup lang="ts">
const { data: page } = await useAsyncData(
  'projects-page',
  () => {
    return queryCollection('pages')
      .path('/projects')
      .first()
  },
)

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Projects page not found',
    fatal: true,
  })
}

const { data: projects } = await useAsyncData(
  'projects',
  () => {
    return queryCollection('projects').all()
  },
)

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
      :description="page.description"
      :links="page.links"
      :ui="{
        title: 'mx-0! text-left',
        description: 'mx-0! text-left',
        links: 'justify-start',
      }"
    />

    <UPageSection
      :ui="{
        container: 'pt-0!',
      }"
    >
      <Motion
        v-for="(project, index) in projects"
        :key="project.title"
        :initial="{
          opacity: 0,
          transform: 'translateY(10px)',
        }"
        :while-in-view="{
          opacity: 1,
          transform: 'translateY(0)',
        }"
        :transition="{
          delay: 0.2 * index,
        }"
        :in-view-options="{
          once: true,
        }"
      >
        <UPageCard
          :title="project.title"
          :description="project.description"
          :to="project.url"
          orientation="horizontal"
          variant="naked"
          :reverse="index % 2 === 1"
          class="group"
          :ui="{
            wrapper: 'max-sm:order-last',
          }"
        >
          <template #leading>
            <span class="text-sm text-muted">
              {{
                new Date(
                  project.date,
                ).getFullYear()
              }}
            </span>
          </template>

          <template #footer>
            <ULink
              :to="project.url"
              class="flex items-center text-sm text-primary"
            >
              View Project

              <UIcon
                name="i-lucide-arrow-right"
                class="
                  size-4 opacity-0
                  transition-all
                  group-hover:translate-x-1
                  group-hover:opacity-100
                "
              />
            </ULink>
          </template>

          <img
            :src="project.image"
            :alt="project.title"
            class="
              h-48 w-full
              rounded-lg object-cover
            "
          >
        </UPageCard>
      </Motion>
    </UPageSection>
  </UPage>
</template>
