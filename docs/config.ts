import { defineConfig, type DefaultTheme } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'en-US',
  title: 'Pointhub Dev',
  description: 'Platform',
  cleanUrls: true,
  srcDir: './src',
  base: '/',
  sitemap: {
    hostname: 'https://dev.pointhub.net',
  },
  head: [['link', { rel: 'icon', type: 'image/png', href: '/favicon-32x32.png' }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/icon.png',
    nav: nav(),
    sidebar: {
      '/guide/': { base: '/guide/', items: sidebarGuide() },
      '/guide/essentials/': { base: '/guide/essentials', items: sidebarEssentials() },
      '/guide/pre-development/prd/': { base: '/guide/pre-development/prd/', items: sidebarPrd() },
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/point-hub' }],
    search: {
      provider: 'local',
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023 Pointhub',
    },
  },
})

function nav(): DefaultTheme.NavItem[] {
  return [
    { text: 'Guide', link: '/guide/introduction/what-is-pointhub' },
    {
      text: 'Library',
      items: [
        { text: 'Pointhub App', link: 'https://dev.pointhub.net/library/papp' },
        { text: 'Starter Template', link: '/library/starter-template' },
      ],
    },
    {
      text: 'Service',
      items: [
        { text: 'Auth', link: '/service/auth/' },
        { text: 'Mail', link: '/service/mail/' },
        { text: 'Storage', link: '/service/storage/' },
      ],
    },
    {
      text: 'Apps',
      items: [{ text: 'ERP', link: '/apps/erp' }],
    },
    {
      text: 'About',
      items: [
        { text: 'Assets', link: 'https://assets.pointhub.net' },
        { text: 'Community Guide', link: '/about/community-guide/' },
      ],
    },
  ]
}

function sidebarGuide(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Introduction',
      collapsed: false,
      items: [
        { text: 'What is Pointhub', link: 'introduction/what-is-pointhub' },
        { text: 'Getting Started', link: 'introduction/getting-started' },
        { text: 'Bun vs Node', link: 'introduction/bun' },
        { text: 'MongoDB Database', link: 'introduction/database' },
        { text: 'Naming Convention', link: 'introduction/naming-convention' },
        { text: 'Essentials', link: 'introduction/naming-convention' },
      ],
    },
    {
      text: 'Essentials',
      collapsed: false,
      items: [
        { text: 'Design Principles', link: 'essentials/design-principles/solid-principles' },
        { text: 'Clean Architecture', link: '' },
      ],
    },
    {
      text: 'Development Flow',
      collapsed: false,
      items: [
        { text: 'Design Requirement', link: 'pre-development/prd/1-introduction' },
        { text: 'Backend Development', link: '' },
        { text: 'Frontend Development', link: '' },
        { text: 'Deployment', link: '' },
      ],
    },
    {
      text: 'Contribution Guide',
      collapsed: false,
      items: [
        { text: 'How do I ask a good question', link: 'contribution-guide/how-do-i-ask-a-good-question' },
        { text: 'Commit message convention', link: 'contribution-guide/commit-message-convention' },
      ],
    },
  ]
}

function sidebarPrd(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'PRD',
      collapsed: false,
      items: [
        { text: 'Introduction', link: '1-introduction' },
        { text: 'Mockups', link: '' },
        { text: 'Behavior Driven Development (BDD)', link: '' },
      ],
    },
    {
      text: 'Design Principles',
      collapsed: false,
      items: [
        { text: 'Clean Architecture', link: '' },
        { text: 'Solid Principles', link: '' },
        { text: 'Behavior Driven Development (BDD)', link: '' },
      ],
    },
    {
      text: 'Design Patterns',
      collapsed: false,
      items: [
        { text: 'Strategy Pattern', link: '' },
        { text: 'Provider Pattern', link: '' },
        { text: 'Facade Pattern', link: '' },
        { text: 'Repository Pattern', link: '' },
        { text: 'Factory Pattern', link: '' },
      ],
    },
    {
      text: 'Best Practices',
      collapsed: false,
      items: [
        { text: 'Code Style', link: '' },
        { text: 'How to use If else correctly', link: '' },
      ],
    },
  ]
}

function sidebarEssentials(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Essentials',
      collapsed: false,
      items: [
        { text: 'Overview', link: '/overview' },
        { text: 'Behavior', link: '' },
      ],
    },
    {
      text: 'Testing',
      collapsed: false,
      items: [
        { text: 'Introduction', link: '/testing/introduction' },
        { text: 'Test Driven Development', link: '/testing/test-driven-development' },
        { text: 'Behavior Driven Development', link: '/testing/behavior-driven-development' },
        { text: 'End-to-End Testing', link: '/testing/end-to-end-testing' },
        { text: 'Performance Testing', link: '/testing/performance-testing' },
        { text: 'Continuous Testing', link: '/testing/continuous-testing' },
      ],
    },
    {
      text: 'Design Principles',
      collapsed: false,
      items: [
        { text: 'Clean Architecture', link: '/design-principles/clean-architecture' },
        { text: 'Solid Principles', link: '/design-principles/solid-principles' },
        { text: 'KISS (Keep It Simple, Stupid)', link: '/design-principles/kiss' },
        { text: 'DRY (Don’t Repeat Yourself)', link: '/design-principles/dry' },
        { text: 'Separation of Concerns', link: '/design-principles/soc' },
        { text: 'Fail Fast', link: '/design-principles/fail-fast' },
        { text: 'Encapsulation', link: '/design-principles/encapsulation' },
      ],
    },
    {
      text: 'Design Patterns',
      collapsed: false,
      items: [
        { text: 'Strategy Pattern', link: '/design-patterns/strategy-pattern' },
        { text: 'Provider Pattern', link: '/design-patterns/provider-pattern' },
        { text: 'Facade Pattern', link: '/design-patterns/facade-pattern' },
        { text: 'Repository Pattern', link: '/design-patterns/repository-pattern' },
        { text: 'Factory Pattern', link: '/design-patterns/factory-pattern' },
      ],
    },
    {
      text: 'Best Practices',
      collapsed: false,
      items: [
        { text: 'Code Style', link: '' },
        { text: 'How to use If else correctly', link: '' },
      ],
    },
  ]
}
