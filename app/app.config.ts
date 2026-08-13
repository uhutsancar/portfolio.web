import type {
  PortfolioAppConfig,
} from './types/portfolio'

const portfolioConfig = {
  navigation: [
    {
      label: 'Ana sayfa',
      to: '/',
    },
    {
      label: 'Projeler',
      to: '/projects',
    },
    {
      label: 'Blog',
      to: '/blog',
    },
    {
      label: 'Hakkımda',
      to: '/about',
    },
    {
      label: 'İletişim',
      to: '/contact',
    },
  ],

  footer: {
    credits:
      `© ${new Date().getFullYear()} Uhut Sancar`,

    links: [
      {
        icon: 'i-simple-icons-github',
        to: 'https://github.com/uhutsancar',
        ariaLabel: 'GitHub profilim',
        target: '_blank',
      },
      {
        icon: 'i-simple-icons-linkedin',
        to: 'https://www.linkedin.com/in/uhut-sancar',
        ariaLabel: 'LinkedIn profilim',
        target: '_blank',
      },
      {
        icon: 'i-lucide-mail',
        to: 'mailto:sancaruhut@gmail.com',
        ariaLabel: 'E-posta gönder',
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