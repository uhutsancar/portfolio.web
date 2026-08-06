import {
  defineCollection,
  defineContentConfig,
  z,
} from '@nuxt/content'

const altTextSchema = z.string().editor({
  label: 'Alt text',
  description:
    'Describes the image for screen readers and search engines.',
})

const imageSchema = z.object({
  src: z.string().editor({
    input: 'media',
    label: 'Image',
  }),

  alt: altTextSchema,
})

const profileImageSchema = z.object({
  light: z.string().editor({
    input: 'media',
    label: 'Light mode image',
  }),

  dark: z.string().editor({
    input: 'media',
    label: 'Dark mode image',
  }),

  alt: altTextSchema,
})

const buttonSchema = z.object({
  label: z.string().editor({
    label: 'Button text',
  }),

  to: z.string().editor({
    label: 'Link',
    description:
      'An internal path such as /contact, or a full https:// URL.',
  }),

  icon: z.string()
    .editor({
      input: 'icon',
      label: 'Icon',
    })
    .optional(),

  color: z.enum([
    'primary',
    'neutral',
    'success',
    'warning',
    'error',
    'info',
  ]).optional(),

  size: z.enum([
    'xs',
    'sm',
    'md',
    'lg',
    'xl',
  ]).optional(),

  variant: z.enum([
    'solid',
    'outline',
    'subtle',
    'soft',
    'ghost',
    'link',
  ]).optional(),

  target: z.enum([
    '_blank',
    '_self',
  ]).optional(),
})

const availabilitySchema = z.object({
  enabled: z.boolean().editor({
    label: 'Available for work',
    description:
      'Switches the hero badge between the two labels below.',
  }),

  availableLabel: z.string().editor({
    label: 'Label when available',
  }),

  unavailableLabel: z.string().editor({
    label: 'Label when unavailable',
  }),

  to: z.string()
    .optional()
    .editor({
      label: 'Badge link',
      description:
        'Optional. Where the badge points, e.g. /contact.',
    }),
})

const articleSchema = z.object({
  title: z.string(),

  description: z.string(),

  date: z.string(),

  to: z.string(),
})

const testimonialSchema = z.object({
  quote: z.string().editor({
    input: 'textarea',
    label: 'Quote',
  }),

  author: z.object({
    name: z.string(),

    description: z.string(),

    avatar: z.object({
      src: z.string().editor({
        input: 'media',
      }),

      srcset: z.string().optional(),

      alt: z.string().optional(),
    }),
  }),
})

const faqQuestionSchema = z.object({
  label: z.string().editor({
    label: 'Question',
  }),

  content: z.string().editor({
    input: 'textarea',
    label: 'Answer',
  }),
})

const blogAuthorSchema = z.object({
  name: z.string(),

  description: z.string().optional(),

  username: z.string().optional(),

  twitter: z.string().optional(),

  to: z.string().optional(),

  avatar: imageSchema.optional(),
})

export default defineContentConfig({
  collections: {
    index: defineCollection({
      type: 'page',

      source: 'index.yml',

      schema: z.object({
        hero: z.object({
          title: z.string(),

          description: z.string(),

          profile: profileImageSchema,

          primaryAction: buttonSchema,

          availability: availabilitySchema,

          images: z.array(
            imageSchema,
          ),
        }),

        about: z.object({
          title: z.string(),

          description: z.string(),
        }),

        experience: z.object({
          title: z.string(),

          items: z.array(
            z.object({
              position: z.string(),

              date: z.string(),

              company: z.object({
                name: z.string(),

                logo: z.string().editor({
                  input: 'icon',
                }),

                url: z.string(),

                color: z.string(),
              }),
            }),
          ),
        }),

        blog: z.object({
          title: z.string(),

          description: z.string(),

          items: z.array(
            articleSchema,
          ),
        }),

        testimonials: z.array(
          testimonialSchema,
        ),

        faq: z.object({
          title: z.string(),

          description: z.string(),

          categories: z.array(
            z.object({
              title: z.string(),

              questions: z.array(
                faqQuestionSchema,
              ),
            }),
          ),
        }),
      }),
    }),

    pages: defineCollection({
      type: 'page',

      source: [
        {
          include: 'projects.yml',
        },
        {
          include: 'blog.yml',
        },
      ],

      schema: z.object({
        links: z.array(
          buttonSchema,
        ).optional(),
      }),
    }),

    projects: defineCollection({
      type: 'data',

      source: 'projects/*.yml',

      schema: z.object({
        title: z.string()
          .nonempty(),

        description: z.string()
          .nonempty(),

        image: z.string()
          .nonempty()
          .editor({
            input: 'media',
          }),

        url: z.string()
          .nonempty(),

        tags: z.array(
          z.string(),
        ),

        date: z.date(),
      }),
    }),

    blog: defineCollection({
      type: 'page',

      source: 'blog/*.md',

      schema: z.object({
        minRead: z.number(),

        date: z.date(),

        image: z.string()
          .nonempty()
          .editor({
            input: 'media',
          }),

        author: blogAuthorSchema,
      }),
    }),

    speaking: defineCollection({
      type: 'page',

      source: 'speaking.yml',

      schema: z.object({
        links: z.array(
          buttonSchema,
        ),

        events: z.array(
          z.object({
            category: z.enum([
              'Conference',
              'Live talk',
              'Podcast',
            ]),

            title: z.string()
              .nonempty(),

            date: z.date(),

            location: z.string()
              .nonempty(),

            url: z.string()
              .optional(),
          }),
        ),
      }),
    }),

    contact: defineCollection({
      type: 'page',

      source: 'contact.yml',

      schema: z.object({
        form: z.object({
          submitLabel: z.string()
            .nonempty()
            .editor({
              label: 'Submit button',
            }),

          successMessage: z.string()
            .nonempty()
            .editor({
              input: 'textarea',
              label: 'Success message',
              description:
                'Shown once a message has been delivered.',
            }),

          errorMessage: z.string()
            .nonempty()
            .editor({
              input: 'textarea',
              label: 'Error message',
              description:
                'Shown when the message could not be sent.',
            }),
        }),
      }),
    }),

    about: defineCollection({
      type: 'page',

      source: 'about.yml',

      schema: z.object({
        profile: profileImageSchema,

        content: z.string()
          .nonempty()
          .editor({
            input: 'textarea',
            label: 'Body',
            description:
              'Markdown is supported, including [links](/contact).',
          }),

        images: z.array(
          imageSchema,
        ),
      }),
    }),
  },
})
