<script setup lang="ts">
import type { HomeHero } from '~/types/portfolio'

defineProps<{
  hero: HomeHero
}>()

const { footer } = useAppConfig()

function reveal(delay = 0) {
  return {
    initial: {
      opacity: 0,
      scale: 1.1,
      filter: 'blur(20px)',
    },

    animate: {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
    },

    transition: {
      duration: 0.6,
      delay,
    },
  }
}
</script>

<template>
  <UPageHero
    class="overflow-hidden"
    :ui="{
      headline: 'flex justify-center',
      title: 'mx-auto max-w-lg',
      links: 'mt-4 flex-col items-center',
    }"
  >
    <template #headline>
      <Motion v-bind="reveal(0.1)">
        <UColorModeAvatar
          :light="hero.profile.light"
          :dark="hero.profile.dark"
          :alt="hero.profile.alt"
          size="3xl"
          class="ring ring-default ring-offset-3 ring-offset-bg"
          :img-attrs="{ fetchpriority: 'high', loading: 'eager' }"
        />
      </Motion>
    </template>

    <template #title>
      <Motion v-bind="reveal(0.1)">
        {{ hero.title }}
      </Motion>
    </template>

    <template #description>
      <Motion v-bind="reveal(0.3)">
        {{ hero.description }}
      </Motion>
    </template>

    <template #links>
      <Motion v-bind="reveal(0.5)">
        <div class="flex flex-wrap items-center justify-center gap-2">
          <UButton
            :label="hero.primaryAction.label"
            :to="hero.primaryAction.to"
            :target="hero.primaryAction.target"
            :icon="hero.primaryAction.icon"
            color="neutral"
          />

          <UButton
            :label="
              hero.availability.enabled
                ? hero.availability.availableLabel
                : hero.availability.unavailableLabel
            "
            :to="hero.availability.to"
            :color="hero.availability.enabled ? 'success' : 'error'"
            variant="ghost"
          >
            <template #leading>
              <span class="relative flex size-2">
                <span
                  class="absolute size-full rounded-full opacity-75"
                  :class="
                    hero.availability.enabled
                      ? 'animate-ping bg-success'
                      : 'bg-error'
                  "
                />

                <span
                  class="relative size-2 rounded-full"
                  :class="
                    hero.availability.enabled
                      ? 'bg-success'
                      : 'bg-error'
                  "
                />
              </span>
            </template>
          </UButton>
        </div>
      </Motion>

      <nav
        aria-label="Social media links"
        class="mt-4 flex gap-2"
      >
        <Motion
          v-for="(link, index) in footer.links"
          :key="link.to"
          v-bind="reveal(0.5 + index * 0.1)"
        >
          <UButton
            :icon="link.icon"
            :to="link.to"
            :target="link.target"
            :aria-label="link.ariaLabel"
            color="neutral"
            variant="ghost"
            size="md"
          />
        </Motion>
      </nav>
    </template>

    <UMarquee
      pause-on-hover
      class="-mx-8 py-2 sm:-mx-12 lg:-mx-16 [--duration:40s]"
    >
      <Motion
        v-for="(image, index) in hero.images"
        :key="image.src"
        v-bind="reveal(index * 0.1)"
      >
        <NuxtImg
          v-bind="image"
          width="234"
          height="234"
          class="aspect-square rounded-lg object-cover"
          :class="index % 2 === 0 ? '-rotate-2' : 'rotate-2'"
          loading="lazy"
          decoding="async"
        />
      </Motion>
    </UMarquee>
  </UPageHero>
</template>
