<script setup lang="ts">
import type { HomeExperience } from '~/types/portfolio'

defineProps<{
  experience: HomeExperience
}>()
</script>

<template>
  <UPageSection
    :title="experience.title"
    :ui="{
      container: 'p-0! gap-4',
      title: 'text-left text-xl font-medium sm:text-xl lg:text-2xl',
      description: 'mt-2',
    }"
  >
    <template #description>
      <div class="flex flex-col gap-2">
        <Motion
          v-for="(item, index) in experience.items"
          :key="item.company.name"
          :initial="{
            opacity: 0,
            transform: 'translateY(20px)',
          }"
          :while-in-view="{
            opacity: 1,
            transform: 'translateY(0)',
          }"
          :transition="{
            delay: 0.4 + index * 0.2,
          }"
          :in-view-options="{
            once: true,
          }"
          class="flex flex-wrap items-center gap-x-2 text-nowrap text-muted"
        >
          <time class="text-sm">
            {{ item.date }}
          </time>

          <USeparator />

          <ULink
            :to="item.company.url"
            target="_blank"
            class="flex items-center gap-1"
          >
            <span class="text-sm">
              {{ item.position }}
            </span>

            <span
              class="inline-flex items-center gap-1"
              :style="{
                color: item.company.color,
              }"
            >
              <span class="font-medium">
                {{ item.company.name }}
              </span>

              <UIcon :name="item.company.logo" />
            </span>
          </ULink>
        </Motion>
      </div>
    </template>
  </UPageSection>
</template>