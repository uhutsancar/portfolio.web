import type {
  PortfolioAppConfig,
} from './types/portfolio'

const portfolioConfig = {
  navigation: [
    {
      label: 'Home',
      to: '/',
    },
    {
      label: 'Projects',
      to: '/projects',
    },
    {
      label: 'Blog',
      to: '/blog',
    },
    {
      label: 'Speaking',
      to: '/speaking',
    },
    {
      label: 'About',
      to: '/about',
    },
    {
      label: 'Contact',
      to: '/contact',
    },
  ],

  footer: {
    credits:
      `Built with Nuxt UI • © ${new Date().getFullYear()}`,

    links: [
      {
        icon: 'i-simple-icons-discord',
        to: 'https://go.nuxt.com/discord',
        ariaLabel: 'Nuxt on Discord',
        target: '_blank',
      },
      {
        icon: 'i-simple-icons-x',
        to: 'https://go.nuxt.com/x',
        ariaLabel: 'Nuxt on X',
        target: '_blank',
      },
      {
        icon: 'i-simple-icons-github',
        to: 'https://github.com/nuxt/ui',
        ariaLabel: 'Nuxt UI on GitHub',
        target: '_blank',
      },
    ],
  },
} satisfies PortfolioAppConfig

export default defineAppConfig({
  ui: {
    colors: {
      primary: 'blue',
      neutral: 'neutral',
    },

    pageHero: {
      slots: {
        container: 'py-18 sm:py-24 lg:py-32',

        title: [
          'mx-auto max-w-xl',
          'text-pretty text-3xl',
          'sm:text-4xl lg:text-5xl',
        ].join(' '),

        description: [
          'mx-auto mt-2 max-w-2xl',
          'text-pretty text-base text-muted',
        ].join(' '),
      },
    },
  },

  ...portfolioConfig,
})