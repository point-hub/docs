import { type DefaultTheme } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

// https://vitepress.dev/reference/site-config
export default withMermaid({
  lang: 'en-US',
  title: 'Development Portal',
  description: 'Platform',
  cleanUrls: true,
  srcDir: './src',
  base: '/',
  lastUpdated: true,
  sitemap: {
    hostname: 'https://dev.pointhub.net',
  },
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/favicon-32x32.png' }],
    ['link', { rel: 'stylesheet', href: 'https://assets.pointhub.net/assets/fontawesome-6/css/all.min.css' }],
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/icon.png',
    nav: nav(),
    sidebar: {
      '/guide/': { base: '/guide', items: sidebarGuide() },
      '/guide/essentials/': { base: '/guide/essentials', items: sidebarEssentials() },
      '/guide/pre-development/': { base: '/guide/pre-development', items: sidebarPreDevelopment() },
      '/guide/backend-development/': {
        base: '/guide/backend-development',
        items: sidebarBackendDevelopment(),
      },
      '/guide/frontend-development/': {
        base: '/guide/frontend-development',
        items: sidebarFrontendDevelopment(),
      },
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
            { text: 'Pre Development', link: '/guide/pre-development/introduction' },
            { text: 'Backend Development', link: '/guide/backend-development/introduction' },
            { text: 'Frontend Development', link: '/guide/frontend-development/introduction' },
            { text: 'Deployment', link: '/guide/deployment/introduction' },
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
      text: 'Ecosystem',
      items: [
        { text: 'Dev Documentation', link: 'https://dev.pointhub.net/' },
        // TODO: finish the content first before adding this link
        // {
        //   text: 'Apps',
        //   items: [{ text: 'ERP', link: 'https://dev.pointhub.net/apps/erp/' }],
        // },
        // {
        //   text: 'Services',
        //   items: [
        //     { text: 'Auth', link: 'https://dev.pointhub.net/services/auth/' },
        //     { text: 'Storage', link: 'https://dev.pointhub.net/services/storage/' },
        //     { text: 'Mail', link: 'https://dev.pointhub.net/services/mail/' },
        //   ],
        // },
        // TODO: finish the content first before adding this link
        // {
        //   text: 'Apps',
        //   items: [{ text: 'ERP', link: 'https://dev.pointhub.net/apps/erp/' }],
        // },
        {
          text: 'Libraries',
          items: [{ text: 'UI Library', link: 'https://dev.pointhub.net/library/papp' }],
        },
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
    // TODO: finish the content first before adding this link
    // {
    //   text: 'Development',
    //   collapsed: false,
    //   items: [
    //     { text: 'Pre Development', link: '/pre-development/introduction' },
    //     { text: 'Backend Development', link: '/backend-development/introduction' },
    //     { text: 'Frontend Development', link: '/frontend-development/introduction' },
    //     { text: 'Deployment', link: '/deployment/introduction' },
    //   ],
    // },
    {
      text: 'Contribution Guide',
      collapsed: false,
      items: [
        { text: 'How do I ask a good question', link: '/contribution-guide/how-do-i-ask-a-good-question' },
        { text: 'Commit message convention', link: '/contribution-guide/commit-message-convention' },
      ],
    },
  ]
}

function sidebarEssentials(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Essentials',
      collapsed: false,
      items: [{ text: 'Overview', link: '/overview' }],
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
        { text: 'Introduction', link: '/design-patterns/introduction' },
        { text: 'Builder Pattern', link: '/design-patterns/builder-pattern' },
        { text: 'Factory Pattern', link: '/design-patterns/factory-pattern' },
        { text: 'Provider Pattern', link: '/design-patterns/provider-pattern' },
        { text: 'Singleton Pattern', link: '/design-patterns/singleton-pattern' },
        { text: 'Adapter Pattern', link: '/design-patterns/adapter-pattern' },
        { text: 'Facade Pattern', link: '/design-patterns/facade-pattern' },
        { text: 'Repository Pattern', link: '/design-patterns/repository-pattern' },
        { text: 'Strategy Pattern', link: '/design-patterns/strategy-pattern' },
      ],
    },
    {
      text: 'Testing',
      collapsed: false,
      items: [
        { text: 'Introduction', link: '/testing/introduction' },
        // TODO: finish the content first before adding this link
        // { text: 'Test Driven Development', link: '/testing/test-driven-development' },
        // { text: 'Behavior Driven Development', link: '/testing/behavior-driven-development' },
        // { text: 'End-to-End Testing', link: '/testing/end-to-end-testing' },
        // { text: 'Performance Testing', link: '/testing/performance-testing' },
        // { text: 'Continuous Testing', link: '/testing/continuous-testing' },
      ],
    },
    {
      text: 'Best Practices',
      collapsed: false,
      items: [
        { text: 'Code Style', link: '/best-practices/code-style' },
        { text: 'Deep Nesting', link: '/best-practices/deep-nesting' },
        { text: 'Environment Varialbe', link: '/best-practices/environment-variable' },
        { text: 'Magic Number', link: '/best-practices/magic-number' },
        { text: 'Naming Convention', link: '/best-practices/naming-convention' },
      ],
    },
  ]
}

function sidebarPreDevelopment(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Pre Development',
      collapsed: false,
      items: [{ text: 'Introduction', link: '/introduction' }],
    },
  ]
}

function sidebarBackendDevelopment(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Backend Development',
      collapsed: false,
      items: [{ text: 'Introduction', link: '/introduction' }],
    },
  ]
}

function sidebarFrontendDevelopment(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Frontend Development',
      collapsed: false,
      items: [{ text: 'Introduction', link: '/introduction' }],
    },
  ]
}

function sidebarDeployment(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Deployment',
      collapsed: false,
      items: [{ text: 'Introduction', link: '/introduction' }],
    },
  ]
}
