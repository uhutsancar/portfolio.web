<script setup lang="ts">
import type { HomeTestimonial } from '~/types/portfolio'

defineProps<{
  testimonials: HomeTestimonial[]
}>()
</script>

<template>
  <UPageSection
    :ui="{
      container: 'px-0 pt-0!',
    }"
  >
    <UCarousel
      v-slot="{ item }"
      :items="testimonials"
      :autoplay="{
        delay: 4000,
      }"
      loop
      dots
      :ui="{
        viewport:
          '-mx-4 max-w-(--ui-container) bg-elevated/50 sm:-mx-12 lg:-mx-16',
      }"
    >
      <UPageCTA
        :description="item.quote"
        variant="naked"
        class="rounded-none"
        :ui="{
          container: 'gap-8 py-12',
          description: 'text-base! text-balance',
        }"
      >
        <UUser
          v-bind="item.author"
          size="xl"
          class="justify-center"
        />
      </UPageCTA>
    </UCarousel>
  </UPageSection>
</template>