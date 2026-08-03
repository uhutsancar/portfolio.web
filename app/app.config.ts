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
      primary: 'neutral',
      neutral: 'zinc',
    },
  },

  ...portfolioConfig,
})
