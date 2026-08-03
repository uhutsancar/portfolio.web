import type {
  NavigationMenuItem,
} from '@nuxt/ui'

export interface PortfolioImage {
  src: string
  alt: string
}

export interface PortfolioProfileImage {
  light: string
  dark: string
  alt: string
}

export interface PortfolioAction {
  label: string
  to: string
  icon?: string
  target?: '_blank' | '_self'
}

export interface PortfolioAvailability {
  enabled: boolean
  availableLabel: string
  unavailableLabel: string
  to?: string
}

export interface PortfolioSocialLink {
  icon: string
  to: string
  ariaLabel: string
  target?: '_blank' | '_self'
}

export interface HomeHero {
  title: string
  description: string
  profile: PortfolioProfileImage
  primaryAction: PortfolioAction
  availability: PortfolioAvailability
  images: PortfolioImage[]
}

export interface HomeAbout {
  title: string
  description: string
}

export interface ExperienceCompany {
  name: string
  logo: string
  url: string
  color: string
}

export interface ExperienceItem {
  position: string
  date: string
  company: ExperienceCompany
}

export interface HomeExperience {
  title: string
  items: ExperienceItem[]
}

export interface HomeArticle {
  title: string
  description: string
  date: string
  to: string
}

export interface HomeBlog {
  title: string
  description: string
  items: HomeArticle[]
}

export interface TestimonialAvatar {
  src: string
  srcset?: string
  alt?: string
}

export interface TestimonialAuthor {
  name: string
  description: string
  avatar: TestimonialAvatar
}

export interface HomeTestimonial {
  quote: string
  author: TestimonialAuthor
}

export interface HomeFaqQuestion {
  label: string
  content: string
}

export interface HomeFaqCategory {
  title: string
  questions: HomeFaqQuestion[]
}

export interface HomeFaq {
  title: string
  description: string
  categories: HomeFaqCategory[]
}

export interface PortfolioAppConfig {
  navigation: NavigationMenuItem[]

  footer: {
    credits: string
    links: PortfolioSocialLink[]
  }
}
