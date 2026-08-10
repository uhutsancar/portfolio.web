export default defineNuxtSchema({
  appConfig: {
    ui: {
      $schema: {
        title: 'UI Theme',
        description: 'Global UI color settings.',
      },

      colors: {
        $schema: {
          title: 'Colors',
        },

        primary: {
          $default: 'blue',

          $schema: {
            title: 'Primary color',
            description:
              'Main accent color used for buttons, links and highlights. '
              + 'Accepts any Tailwind color name (e.g. blue, violet, emerald).',
            type: 'string',
            tags: ['$color'],
          },
        },

        neutral: {
          $default: 'neutral',

          $schema: {
            title: 'Neutral color',
            description:
              'Base gray used for backgrounds and borders. '
              + 'Accepts any Tailwind gray scale (e.g. neutral, slate, zinc).',
            type: 'string',
            tags: ['$color'],
          },
        },
      },
    },

    footer: {
      $schema: {
        title: 'Footer',
        description: 'Footer section configuration.',
      },

      credits: {
        $default: '',

        $schema: {
          title: 'Credits text',
          description:
            'Short text displayed at the bottom of every page, '
            + 'e.g. "Built with Nuxt UI • © 2025".',
          type: 'string',
        },
      },

      links: {
        $default: [],

        $schema: {
          title: 'Social links',
          description:
            'Icon links shown in the footer (GitHub, X, Discord, etc.).',
          type: 'array',
          items: {
            type: 'object',
            properties: {
              icon: {
                title: 'Icon',
                description: 'Iconify icon name, e.g. i-simple-icons-github',
                type: 'string',
              },
              to: {
                title: 'URL',
                description: 'Full URL, e.g. https://github.com/yourname',
                type: 'string',
              },
              ariaLabel: {
                title: 'Aria label',
                description: 'Accessibility label for screen readers.',
                type: 'string',
              },
              target: {
                title: 'Open in',
                type: 'string',
                enum: ['_blank', '_self'],
              },
            },
          },
        },
      },
    },
  },
})
