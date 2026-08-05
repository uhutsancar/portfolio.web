<script setup lang="ts">
defineProps<{
  image: {
    src: string
    alt: string
  }

  index: number
}>()
</script>

<template>
  <figure
    class="
      flex flex-col bg-white p-2
      drop-shadow-2xl
      transition-transform duration-300 ease-in-out
      hover:z-10 hover:scale-105 hover:rotate-0
    "
    :class="[
      index % 2 === 0
        ? '-rotate-5 hover:-translate-x-4'
        : 'rotate-5 hover:translate-x-4',
    ]"
  >
    <NuxtImg
      :src="image.src"
      :alt="image.alt"
      width="128"
      height="128"
      class="size-32 object-cover"
    />

    <figcaption
      class="
        mt-2 w-32
        text-center font-serif
        text-xs font-medium text-black
      "
    >
      {{ image.alt }}
    </figcaption>
  </figure>
</template>
