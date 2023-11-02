import { defineConfig, type DefaultTheme } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'en-US',
  title: 'Pointhub Dev',
  description: 'Platform',
  cleanUrls: true,
  srcDir: './src',
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
        {
          text: 'Starter Template',
          items: [
            { text: 'API Backend', link: 'https://github.com/point-hub/papi-starter' },
            { text: 'API Docs', link: 'https://github.com/point-hub/api-docs-starter' },
            { text: 'Web Application', link: 'https://github.com/point-hub/papp-starter' },
            { text: 'Web Marketing', link: 'https://github.com/point-hub/web-starter' },
            { text: 'Web Documentation', link: 'https://github.com/point-hub/docs-starter' },
          ],
        },
      ],
    },
    {
      text: 'Docs',
      items: [
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
      ],
    },
    {
      text: 'About',
      items: [
        { text: 'Community Guide', link: '/about/community-guide/' },
        { text: 'Assets', link: 'https://assets.pointhub.net' },
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
      ],
    },
    {
      text: 'Development Flow',
      collapsed: false,
      items: [
        { text: 'Design Requirement', link: '' },
        { text: 'API Development', link: '' },
        { text: 'UI/UX Development', link: '' },
        { text: 'Deployment', link: '' },
      ],
    },
    {
      text: 'Contribution Guide',
      collapsed: false,
      items: [{ text: 'Commit message convention', link: 'contribution-guide/commit-message-convention' }],
    },
  ]
}
