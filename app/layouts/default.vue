<template>
  <UContainer
    class="
      flex min-h-screen flex-col
      border-default
      pt-10 sm:border-x sm:pt-10
    "
  >
    <AppHeader />

    <UMain class="flex-1">
      <slot />
    </UMain>

    <AppFooter />
  </UContainer>
</template>
