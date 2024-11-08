import { type DefaultTheme } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

// https://vitepress.dev/reference/site-config
export default withMermaid({
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
      '/guide/': { base: '/guide', items: sidebarGuide() },
      '/guide/essentials/': { base: '/guide/essentials', items: sidebarEssentials() },
      '/guide/pre-development/': { base: '/guide/pre-development/introduction', items: sidebarPreDevelopment() },
      '/guide/backend-development/': { base: '/guide/backend-development/introduction', items: sidebarBackend() },
      '/guide/frontend-development/': { base: '/guide/frontend-development/introduction', items: sidebarFrontend() },
      '/guide/deployment/': { base: '/guide/deployment/introduction', items: sidebarDeployment() },
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
    {
      text: 'Guide',
      items: [
        {
          text: 'Getting Started',
          items: [
            { text: 'Introduction', link: '/guide/getting-started/introduction' },
            { text: 'Essentials', link: '/guide/essentials/overview' },
          ],
        },
        {
          text: 'Development',
          items: [
            { text: 'Pre Development', link: '/guide/pre-development/' },
            { text: 'Backend Development', link: '/guide/backend-development/' },
            { text: 'Frontend Development', link: '/guide/frontend-development/' },
            { text: 'Deployment', link: '/guide/deployment/' },
          ],
        },
        {
          text: 'Contribution Guide',
          items: [
            { text: 'How do I ask a good question', link: '/guide/contribution-guide/how-do-i-ask-a-good-question' },
            { text: 'Commit message convention', link: '/guide/contribution-guide/commit-message-convention' },
          ],
        },
      ],
    },
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
      text: 'Getting Started',
      collapsed: false,
      items: [
        { text: 'Introduction', link: '/getting-started/introduction' },
        { text: 'Essentials', link: '/essentials/overview' },
      ],
    },
    {
      text: 'Development',
      collapsed: false,
      items: [
        { text: 'Pre Development', link: '/pre-development/introduction' },
        { text: 'Backend Development', link: '/backend-development/introduction' },
        { text: 'Frontend Development', link: '/frontend-development/introduction' },
        { text: 'Deployment', link: '/deployment/introduction' },
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
        { text: 'Builder Pattern', link: '/design-patterns/factory-pattern' },
      ],
    },
    {
      text: 'Best Practices',
      collapsed: false,
      items: [
        { text: 'Code Style', link: '' },
        { text: 'Naming Convention', link: '/best-practices/naming-convention' },
        { text: 'How to use If else correctly', link: '' },
      ],
    },
  ]
}

function sidebarPreDevelopment(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Pre Development',
      collapsed: false,
      items: [
        { text: 'Introduction', link: '/introduction' },
        { text: 'Directory Structure', link: '/directory-structure' },
      ],
    },
    {
      text: 'Framework',
      collapsed: false,
      items: [
        { text: 'Bun vs Node', link: '/framework/bun' },
        { text: 'MongoDB Database', link: '/framework/database' },
      ],
    },
  ]
}

function sidebarBackend(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Backend Development',
      collapsed: false,
      items: [
        { text: 'Introduction', link: '/introduction' },
        { text: 'Directory Structure', link: '/directory-structure' },
      ],
    },
    {
      text: 'Framework',
      collapsed: false,
      items: [
        { text: 'Bun vs Node', link: '/framework/bun' },
        { text: 'MongoDB Database', link: '/framework/database' },
      ],
    },
  ]
}

function sidebarFrontend(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Frontend Development',
      collapsed: false,
      items: [
        { text: 'Introduction', link: '/introduction' },
        { text: 'Directory Structure', link: '' },
      ],
    },
    {
      text: 'Framework',
      collapsed: false,
      items: [
        { text: 'Bun vs Node', link: '/framework/bun' },
        { text: 'MongoDB Database', link: '/framework/database' },
      ],
    },
  ]
}

function sidebarDeployment(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Deployment',
      collapsed: false,
      items: [
        { text: 'Introduction', link: '' },
        { text: 'Directory Structure', link: '' },
      ],
    },
    {
      text: 'Framework',
      collapsed: false,
      items: [
        { text: 'Bun vs Node', link: '/framework/bun' },
        { text: 'MongoDB Database', link: '/framework/database' },
      ],
    },
  ]
}
