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
        viewport: [
          '-mx-4 sm:-mx-12 lg:-mx-16',
          'max-w-(--ui-container)',
          'bg-elevated/50',
        ].join(' '),
      }"
    >
      <UPageCTA
        :description="item.quote"
        variant="naked"
        class="rounded-none"
        :ui="{
          container: [
            'sm:gap-8',
            'sm:py-12 lg:py-12',
          ].join(' '),
          description: [
            'text-base! text-balance',
            'before:absolute',
            'before:-mt-2',
            'before:-ml-6',
            'before:inline-block',
            'before:text-5xl',
            'before:text-dimmed',
            'before:content-[open-quote]',
            'lg:before:-mt-4',
            'lg:before:-ml-10',
            'lg:before:text-7xl',
            'after:absolute',
            'after:mt-1',
            'after:ml-1',
            'after:inline-block',
            'after:text-5xl',
            'after:text-dimmed',
            'after:content-[close-quote]',
            'lg:after:mt-0',
            'lg:after:ml-2',
            'lg:after:text-7xl',
          ].join(' '),
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