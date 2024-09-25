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
      items: [
        { text: 'How do i ask a good question', link: 'contribution-guide/how-do-i-ask-a-good-question' },
        { text: 'Commit message convention', link: 'contribution-guide/commit-message-convention' },
      ],
    },
  ]
}
