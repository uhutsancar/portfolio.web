<script setup lang="ts">
const { navigation } = useAppConfig()
</script>

<template>
  <header
    class="
      fixed inset-x-0 top-2 z-50
      flex justify-center px-2
      sm:top-4
    "
  >
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
