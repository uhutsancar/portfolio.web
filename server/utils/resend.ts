import { Resend } from 'resend'

export function useResend() {
  const { resend } = useRuntimeConfig()

  return new Resend(resend.apiKey)
}