<script setup lang="ts">
const { footer } = useAppConfig()
const { home } = useAppConfig()
</script>

<template>
  <UFooter
    :ui="{
      left: 'text-xs text-muted',
    }"
  >
    <template #left>
      {{ footer.credits }}
    </template>

    <template #right>
      <UButton
        v-for="link in footer.links"
        :key="link.to"
        :icon="link.icon"
        :to="link.to"
        :target="link.target"
        :aria-label="link.ariaLabel"
        color="neutral"
        variant="ghost"
        size="sm"
        class="p-1"
      />
 
    </template>
  </UFooter>
</template>
