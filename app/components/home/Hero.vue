<script setup lang="ts">
import type { HomeHero } from '~/types/portfolio'

defineProps<{
  hero: HomeHero
}>()

const { footer } = useAppConfig()

function createRevealAnimation(delay = 0) {
  return {
    initial: {
      opacity: 0,
      scale: 1.08,
      filter: 'blur(18px)',
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
      container: [
        'pt-20 pb-0',
        'sm:pt-28 sm:pb-0',
      ].join(' '),

      headline: 'flex justify-center',

      title: [
        'mx-auto max-w-xl',
        'text-balance',
        'text-4xl font-bold tracking-tight',
        'sm:text-5xl',
      ].join(' '),

      description: [
        'mx-auto max-w-2xl',
        'text-pretty text-sm text-muted',
        'sm:text-base',
      ].join(' '),

      links: 'mt-5 flex flex-col items-center',
    }"
  >
    <template #headline>
      <Motion v-bind="createRevealAnimation(0.1)">
        <UColorModeAvatar
          :light="hero.profile.light"
          :dark="hero.profile.dark"
          :alt="hero.profile.alt"
          class="
            size-18
            ring ring-default
            ring-offset-3 ring-offset-bg
          "
        />
      </Motion>
    </template>

    <template #title>
      <Motion v-bind="createRevealAnimation(0.15)">
        {{ hero.title }}
      </Motion>
    </template>

    <template #description>
      <Motion v-bind="createRevealAnimation(0.3)">
        {{ hero.description }}
      </Motion>
    </template>

    <template #links>
      <Motion v-bind="createRevealAnimation(0.45)">
        <div
          class="
            flex flex-col items-center gap-2
            sm:flex-row
          "
        >
          <UButton
            :label="hero.primaryAction.label"
            :to="hero.primaryAction.to"
            :target="hero.primaryAction.target"
            :icon="hero.primaryAction.icon"
            color="neutral"
            variant="solid"
          />

          <UButton
            :to="hero.availability.to"
            :color="
              hero.availability.enabled
                ? 'success'
                : 'error'
            "
            variant="ghost"
            class="gap-2"
          >
            <template #leading>
              <span class="relative flex size-2">
                <span
                  class="
                    absolute inline-flex size-full
                    rounded-full opacity-75
                  "
                  :class="
                    hero.availability.enabled
                      ? 'animate-ping bg-success'
                      : 'bg-error'
                  "
                />

                <span
                  class="
                    relative inline-flex size-2
                    scale-90 rounded-full
                  "
                  :class="
                    hero.availability.enabled
                      ? 'bg-success'
                      : 'bg-error'
                  "
                />
              </span>
            </template>

            {{
              hero.availability.enabled
                ? hero.availability.availableLabel
                : hero.availability.unavailableLabel
            }}
          </UButton>
        </div>
      </Motion>

      <nav
        aria-label="Social media links"
        class="mt-4 inline-flex gap-x-2"
      >
        <Motion
          v-for="(link, index) in footer.links"
          :key="link.to"
          v-bind="
            createRevealAnimation(
              0.55 + index * 0.1,
            )
          "
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
      class="
        mt-20 py-2
        -mx-8 sm:-mx-12 lg:-mx-16
        [--duration:40s]
      "
    >
      <Motion
        v-for="(image, index) in hero.images"
        :key="image.src"
        v-bind="
          createRevealAnimation(
            0.1 + index * 0.08,
          )
        "
      >
        <NuxtImg
          :src="image.src"
          :alt="image.alt"
          width="234"
          height="234"
          loading="eager"
          class="
            size-52 rounded-lg object-cover
            sm:size-58
          "
          :class="
            index % 2 === 0
              ? '-rotate-2'
              : 'rotate-2'
          "
        />
      </Motion>
    </UMarquee>
  </UPageHero>
</template>
