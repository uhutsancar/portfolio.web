<script setup lang="ts">
import type { HomeAbout } from '~/types/portfolio'

defineProps<{
  about: HomeAbout
}>()
</script>

<template>
  <UPageSection
    :title="about.title"
    :description="about.description"
    :ui="{
      container: 'p-0!',
      title: [
        'text-left',
        'text-xl font-medium',
        'sm:text-xl lg:text-2xl',
      ].join(' '),
      description: [
        'mt-3 text-left',
        'text-sm leading-5 text-muted',
      ].join(' '),
    }"
  />
</template>