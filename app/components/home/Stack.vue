<script setup lang="ts">
import type { HomeStack } from '~/types/portfolio'

defineProps<{
  stack: HomeStack
}>()
</script>

<template>
  <UPageSection
    :title="stack.title"
    :description="stack.description"
    :ui="{
      container: 'px-0 pt-0! sm:gap-6 lg:gap-8',
      title: 'text-left text-xl font-medium sm:text-xl lg:text-2xl',
      description: 'mt-2 text-left text-sm text-muted',
    }"
  >
    <UPageGrid class="gap-4 lg:grid-cols-2">
      <Motion
        v-for="(category, index) in stack.categories"
        :key="category.title"
        :initial="{
          opacity: 0,
          transform: 'translateY(20px)',
        }"
        :while-in-view="{
          opacity: 1,
          transform: 'translateY(0)',
        }"
        :transition="{
          delay: index * 0.1,
        }"
        :in-view-options="{
          once: true,
        }"
        class="h-full"
      >
        <UPageCard
          :icon="category.icon"
          :title="category.title"
          variant="subtle"
          spotlight
          class="h-full"
          :ui="{
            title: 'text-base font-medium',
            footer: 'flex flex-wrap gap-1.5 pt-3',
          }"
        >
          <template #footer>
            <UBadge
              v-for="item in category.items"
              :key="item"
              :label="item"
              color="neutral"
              variant="soft"
            />
          </template>
        </UPageCard>
      </Motion>
    </UPageGrid>
  </UPageSection>
</template>
