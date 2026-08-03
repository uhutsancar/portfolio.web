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
      title: 'text-left text-xl font-medium sm:text-xl lg:text-2xl',
      description: 'mt-3 text-left text-sm text-muted',
    }"
  />
</template>