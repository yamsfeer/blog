module.exports = {
  title: `yams's blog`,
  description: `yams's blog`,
  head: [
    ['link', { rel: 'icon', href: '/logo.ico' }]
  ],
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    searchMaxSuggestions: 10,
    nav: [
      { text: 'Github', link: 'https://github.com/melogra' }
    ],
    sidebar: {
      '/articles/': [
        {
          title: 'group1',
          collapsable: false,
          sidebarDepth: 2,
          children: [
            ['blog1', 'blog1'],
            ['blog2', 'blog2']
          ]
        }
      ]
    },
    smoothScroll: true
  }
}
