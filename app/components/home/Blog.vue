<script setup lang="ts">
import type { HomeBlog } from '~/types/portfolio'

defineProps<{
  blog: HomeBlog
}>()
</script>

<template>
  <UPageSection
    :title="blog.title"
    :description="blog.description"
    :ui="{
      container: 'px-0 pt-0! sm:gap-6 lg:gap-8',
      title: 'text-left text-xl font-medium sm:text-xl lg:text-2xl',
      description: 'mt-2 text-left text-sm text-muted',
    }"
  >
    <UBlogPosts
      orientation="vertical"
      class="gap-4 lg:gap-y-4"
    >
      <UBlogPost
        v-for="article in blog.items"
        :key="article.to"
        :title="article.title"
        :description="article.description"
        :date="article.date"
        :to="article.to"
        orientation="horizontal"
        variant="naked"
        :ui="{
          root: 'group relative ring-0 hover:ring-0 lg:flex lg:items-start',
          body: 'px-0!',
          header: 'hidden',
        }"
      >
        <template #footer>
          <UButton
            label="Read Article"
            size="xs"
            variant="link"
            class="gap-0 px-0"
          >
            <template #trailing>
              <UIcon
                name="i-lucide-arrow-right"
                class="
                  size-4 text-primary opacity-0
                  transition-all
                  group-hover:translate-x-1
                  group-hover:opacity-100
                "
              />
            </template>
          </UButton>
        </template>
      </UBlogPost>
    </UBlogPosts>
  </UPageSection>
</template>