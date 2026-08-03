import {
  defineCollection,
  defineContentConfig,
  z,
} from '@nuxt/content'

const imageSchema = z.object({
  src: z.string().editor({
    input: 'media',
  }),

  alt: z.string(),
})

const profileImageSchema = z.object({
  light: z.string().editor({
    input: 'media',
  }),

  dark: z.string().editor({
    input: 'media',
  }),

  alt: z.string(),
})

const actionSchema = z.object({
  label: z.string(),
  to: z.string(),

  icon: z.string()
    .editor({
      input: 'icon',
    })
    .optional(),

  target: z.enum([
    '_blank',
    '_self',
  ]).optional(),
})

const availabilitySchema = z.object({
  enabled: z.boolean(),
  availableLabel: z.string(),
  unavailableLabel: z.string(),
  to: z.string().optional(),
})

const articleSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.string(),
  to: z.string(),
})

const testimonialSchema = z.object({
  quote: z.string(),

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
  label: z.string(),
  content: z.string(),
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

          primaryAction: actionSchema,

          availability: availabilitySchema,

          images: z.array(imageSchema),
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
          items: z.array(articleSchema),
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
  },
})