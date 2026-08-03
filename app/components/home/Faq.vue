<script setup lang="ts">
import type { HomeFaq } from '~/types/portfolio'

const props = defineProps<{
  faq: HomeFaq
}>()

const items = computed(() => {
  return props.faq.categories.map(category => ({
    label: category.title,
    value: category.title,
    questions: category.questions,
  }))
})

const activeCategory = ref(
  props.faq.categories[0]?.title ?? '',
)

const tabsUi = {
  root: 'flex w-full items-center gap-4',

  list: [
    'relative flex gap-2',
    'bg-transparent px-0',
    'dark:bg-transparent',
  ].join(' '),

  indicator: [
    'absolute top-1',
    'rounded-lg bg-elevated/60',
    'duration-200 ease-out',
  ].join(' '),

  trigger: [
    'rounded-lg px-3 py-2',
    'hover:bg-muted/50',
    'data-[state=active]:text-highlighted',
    'data-[state=inactive]:text-muted',
  ].join(' '),

  label: 'truncate',
}
</script>

<template>
  <UPageSection
    :title="faq.title"
    :description="faq.description"
    :ui="{
      container: 'px-0 pt-0! gap-4',
      title: 'text-left text-xl font-medium sm:text-xl lg:text-2xl',
      description: 'mt-2 text-left text-sm text-muted',
    }"
  >
    <UTabs
      v-model="activeCategory"
      :items="items"
      orientation="horizontal"
      :ui="tabsUi"
    >
      <template #content="{ item }">
        <UAccordion
          :items="item.questions"
          trailing-icon="i-lucide-plus"
          :unmount-on-hide="false"
          :ui="{
            item: 'border-none',

            trigger: [
              'group mb-2 rounded-lg border-0',
              'bg-elevated/60 px-4 text-base',
              'hover:bg-muted/50',
            ].join(' '),

            trailingIcon: [
              'text-base text-muted',
              'group-data-[state=closed]:rotate-0',
              'group-data-[state=open]:rotate-135',
            ].join(' '),
          }"
        >
          <template #body="{ item: question }">
            <MDC
              :value="question.content"
              unwrap="p"
              class="px-4"
            />
          </template>
        </UAccordion>
      </template>
    </UTabs>
  </UPageSection>
</template>