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
      container: 'p-0! gap-4 sm:gap-4',
      title: [
        'text-left',
        'text-xl font-medium',
        'sm:text-xl lg:text-2xl',
      ].join(' '),
    }"
  >
    <ul class="flex flex-col gap-2">
      <Motion
        v-for="(item, index) in experience.items"
        :key="item.company.name"
        as="li"
        :initial="{
          opacity: 0,
          transform: 'translateY(20px)',
        }"
        :while-in-view="{
          opacity: 1,
          transform: 'translateY(0)',
        }"
        :transition="{
          duration: 0.45,
          delay: 0.2 + index * 0.15,
        }"
        :in-view-options="{
          once: true,
        }"
        class="
          flex items-center gap-2
          text-nowrap text-muted
        "
      >
        <time class="shrink-0 text-sm">
          {{ item.date }}
        </time>

        <USeparator class="min-w-6 flex-1" />

        <ULink
          :to="item.company.url"
          target="_blank"
          class="
            flex shrink-0 items-center gap-1
            text-sm
          "
        >
          <span>
            {{ item.position }}
          </span>

          <span
            class="inline-flex items-center gap-1 font-medium"
            :style="{
              color: item.company.color,
            }"
          >
            {{ item.company.name }}

            <UIcon :name="item.company.logo" />
          </span>
        </ULink>
      </Motion>
    </ul>
  </UPageSection>
</template>