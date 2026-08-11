const emailPattern = /^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)+$/

function readField(
  body: Record<string, unknown>,
  key: string,
) {
  const value = body[key]

  return typeof value === 'string'
    ? value.trim()
    : ''
}

function validate(
  body: Record<string, unknown>,
) {
  const name = readField(body, 'name')
  const email = readField(body, 'email')
  const subject = readField(body, 'subject')
  const message = readField(body, 'message')

  const errors: string[] = []

  if (name.length < 2 || name.length > 100) {
    errors.push(
      'Name must be between 2 and 100 characters.',
    )
  }

  if (!emailPattern.test(email) || email.length > 254) {
    errors.push(
      'A valid email address is required.',
    )
  }

  if (subject.length > 150) {
    errors.push(
      'Subject must be 150 characters or less.',
    )
  }

  if (message.length < 10 || message.length > 2000) {
    errors.push(
      'Message must be between 10 and 2000 characters.',
    )
  }

  if (errors.length) {
    throw createError({
      statusCode: 422,
      statusMessage: 'Invalid form submission',
      data: {
        errors,
      },
    })
  }

  return {
    name,
    email,
    subject: subject || 'New portfolio message',
    message,
  }
}

export default defineEventHandler(async (event) => {
  const {
    resend: options,
  } = useRuntimeConfig(event)

  if (
    !options.apiKey
    || !options.from
    || !options.to
  ) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Email service is not configured',
    })
  }

  const body = await readBody(event)

  const payload = validate(
    body ?? {},
  )

  const resend = useResend()

  const { error } = await resend.emails.send({
    from: options.from,
    to: [options.to],
    replyTo: payload.email,
    subject: `[Portfolio] ${payload.subject}`,
    text: [
      `Name: ${payload.name}`,
      `Email: ${payload.email}`,
      '',
      `Subject: ${payload.subject}`,
      '',
      payload.message,
    ].join('\n'),
  })

  if (error) {
    console.error(
      '[contact] Resend error:',
      error,
    )

    throw createError({
      statusCode: 502,
      statusMessage:
        'Unable to send your message right now',
    })
  }

  return {
    success: true,
  }
})