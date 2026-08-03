<script setup lang="ts">
const colorMode = useColorMode()

const isDark = computed(() => {
  return colorMode.value === 'dark'
})

const buttonIcon = computed(() => {
  return isDark.value
    ? 'i-lucide-moon'
    : 'i-lucide-sun'
})

const buttonLabel = computed(() => {
  return isDark.value
    ? 'Switch to light mode'
    : 'Switch to dark mode'
})

function changeColorMode() {
  colorMode.preference = isDark.value
    ? 'light'
    : 'dark'
}

function startViewTransition(event: MouseEvent) {
  if (!document.startViewTransition) {
    changeColorMode()
    return
  }

  const x = event.clientX
  const y = event.clientY

  const endRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y),
  )

  const transition = document.startViewTransition(() => {
    changeColorMode()
  })

  void transition.ready.then(() => {
    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 600,
        easing: 'cubic-bezier(.76, .32, .29, .99)',
        pseudoElement: '::view-transition-new(root)',
      },
    )
  })
}
</script>

<template>
  <ClientOnly>
    <UButton
      :aria-label="buttonLabel"
      :icon="buttonIcon"
      color="neutral"
      variant="ghost"
      size="sm"
      class="rounded-full"
      @click="startViewTransition"
    />

    <template #fallback>
      <span class="block size-8" />
    </template>
  </ClientOnly>
</template>

<style>
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-new(root) {
  z-index: 9999;
}

::view-transition-old(root) {
  z-index: 1;
}
</style>