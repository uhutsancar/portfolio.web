<script setup lang="ts">
const { navigation, logo } = useAppConfig()

const signing = ref(false)

const mark = computed(() => {
  return signing.value
    ? {
        light: logo.animatedLight,
        dark: logo.animatedDark,
      }
    : logo
})
</script>

<template>
  <header
    class="
      fixed inset-x-0 top-2 z-50
      flex items-center justify-center px-2
      sm:top-4
    "
  >
    <ULink
      to="/"
      :aria-label="logo.alt"
      class="absolute left-3 sm:left-6"
      @mouseenter="signing = true"
      @mouseleave="signing = false"
    >
      <img
        :src="mark.light"
        :alt="logo.alt"
        width="128"
        height="128"
        class="size-9 dark:hidden"
      >

      <img
        :src="mark.dark"
        :alt="logo.alt"
        width="128"
        height="128"
        class="hidden size-9 dark:block"
      >
    </ULink>

    <UNavigationMenu
      :items="navigation"
      aria-label="Main navigation"
      color="neutral"
      variant="link"
      class="
        max-w-full rounded-full
        border border-default/70
        bg-muted/80 px-4
        shadow-lg shadow-neutral-950/5
        backdrop-blur-md
        sm:px-4
      "
      :ui="{
        list: 'gap-0.5',
        link: [
          'px-1 py-1',
          'text-xs sm:px-2 sm:text-sm',
        ].join(' '),
        linkLeadingIcon: 'hidden',
      }"
    >
      <template #list-trailing>
        <ColorModeButton />
      </template>
    </UNavigationMenu>
  </header>
</template>
