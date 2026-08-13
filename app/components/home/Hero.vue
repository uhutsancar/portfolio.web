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
    orientation="horizontal"
    class="overflow-hidden"
    :ui="{
      container: 'gap-8 pb-10 sm:gap-y-12 sm:pb-12 lg:pb-16',
      headline: 'mb-2 text-sm font-medium text-primary',
      title: 'mx-0! text-left',
      description: 'mx-0! text-left',
      footer: 'mt-8',
      links: 'flex-col items-start gap-5',
    }"
  >
    <template #headline>
      <Motion v-bind="reveal(0.1)">
        {{ hero.headline }}
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
        <UButton
          :label="
            hero.availability.enabled
              ? hero.availability.availableLabel
              : hero.availability.unavailableLabel
          "
          :to="hero.availability.to"
          :color="hero.availability.enabled ? 'success' : 'error'"
          variant="link"
          class="px-0"
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
      </Motion>

      <Motion
        v-bind="reveal(0.6)"
        class="flex flex-wrap items-center gap-2"
      >
        <UButton
          :label="hero.primaryAction.label"
          :to="hero.primaryAction.to"
          :target="hero.primaryAction.target"
          :trailing-icon="hero.primaryAction.icon"
          color="neutral"
          class="group"
          :ui="{
            trailingIcon: 'transition-transform group-hover:translate-x-1',
          }"
        />

        <nav
          aria-label="Social media links"
          class="flex gap-1"
        >
          <UButton
            v-for="link in footer.links"
            :key="link.to"
            :icon="link.icon"
            :to="link.to"
            :target="link.target"
            :aria-label="link.ariaLabel"
            color="neutral"
            variant="ghost"
            class="transition-transform hover:-translate-y-0.5"
          />
        </nav>
      </Motion>
    </template>

    <Motion
      v-bind="reveal(0.3)"
      class="flex justify-center lg:justify-end"
    >
      <ClientOnly>
        <SignatureParticles class="aspect-square w-full max-w-sm" />

        <template #fallback>
          <div class="aspect-square w-full max-w-sm" />
        </template>
      </ClientOnly>
    </Motion>

    <template #bottom>
      <UMarquee
        pause-on-hover
        class="py-10 [--duration:40s] sm:py-14"
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
            class="
              aspect-square rounded-lg object-cover
              transition-transform duration-300 ease-out
              hover:scale-105 hover:rotate-0
            "
            :class="index % 2 === 0 ? '-rotate-2' : 'rotate-2'"
            loading="lazy"
            decoding="async"
          />
        </Motion>
      </UMarquee>
    </template>
  </UPageHero>
</template>
