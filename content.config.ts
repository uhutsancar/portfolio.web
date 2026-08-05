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

const buttonSchema = z.object({
  label: z.string(),

  to: z.string(),

  icon: z.string()
    .editor({
      input: 'icon',
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

    about: defineCollection({
      type: 'page',

      source: 'about.yml',

      schema: z.object({
        profile: profileImageSchema,

        content: z.string()
          .nonempty(),

        images: z.array(
          imageSchema,
        ),
      }),
    }),
  },
})