<script setup lang="ts">
import type {
  FormError,
  FormSubmitEvent,
} from '@nuxt/ui'

import type {
  ContactFormState,
} from '~/types/portfolio'

const {
  submitLabel,
  successMessage,
  errorMessage,
} = defineProps<{
  submitLabel: string
  successMessage: string
  errorMessage: string
}>()

const emailPattern = /^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)+$/

const state = reactive<ContactFormState>({
  name: '',
  email: '',
  subject: '',
  message: '',
})

const toast = useToast()
const pending = ref(false)

function validate(
  state: ContactFormState,
): FormError[] {
  const errors: FormError[] = []

  if (state.name.trim().length < 2) {
    errors.push({
      name: 'name',
      message: 'Please enter your name.',
    })
  }

  if (!emailPattern.test(state.email.trim())) {
    errors.push({
      name: 'email',
      message: 'Please enter a valid email address.',
    })
  }

  if (state.message.trim().length < 10) {
    errors.push({
      name: 'message',
      message: 'Please write at least 10 characters.',
    })
  }

  return errors
}

async function onSubmit(
  event: FormSubmitEvent<ContactFormState>,
) {
  pending.value = true

  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: event.data,
    })

    toast.add({
      title: 'Message sent',
      description: successMessage,
      icon: 'i-lucide-check',
      color: 'success',
    })

    Object.assign(state, {
      name: '',
      email: '',
      subject: '',
      message: '',
    })
  }
  catch (error) {
    toast.add({
      title: 'Message not sent',
      description: getErrorMessage(error),
      icon: 'i-lucide-triangle-alert',
      color: 'error',
    })
  }
  finally {
    pending.value = false
  }
}

function getErrorMessage(
  error: unknown,
) {
  const data = (error as {
    data?: {
      statusMessage?: string
      data?: {
        errors?: string[]
      }
    }
  })?.data

  return data?.data?.errors?.[0]
    ?? data?.statusMessage
    ?? errorMessage
}
</script>

<template>
  <UForm
    :state="state"
    :validate="validate"
    class="max-w-xl space-y-4"
    @submit="onSubmit"
  >
    <div
      class="
        grid grid-cols-1 gap-4
        sm:grid-cols-2
      "
    >
      <UFormField
        label="İsim"
        name="name"
        required
      >
        <UInput
          v-model="state.name"
          placeholder="İsim"
          autocomplete="name"
          class="w-full"
        />
      </UFormField>

      <UFormField
        label="Email"
        name="email"
        required
      >
        <UInput
          v-model="state.email"
          type="email"
          placeholder="info@gmail.com"
          autocomplete="email"
          class="w-full"
        />
      </UFormField>
    </div>

    <UFormField
      label="Konu"
      name="subject"
    >
      <UInput
        v-model="state.subject"
        placeholder="Hakkında"
        class="w-full"
      />
    </UFormField>

    <UFormField
      label="Mesaj"
      name="message"
      required
    >
      <UTextarea
        v-model="state.message"
        :rows="6"
        placeholder="Mesaj"
        class="w-full"
      />
    </UFormField>

    <UButton
      type="submit"
      :label="submitLabel"
      color="info"
      size="lg"
      :loading="pending"
      trailing-icon="i-lucide-send"
    />
  </UForm>
</template>
