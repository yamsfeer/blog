module.exports = {
  // 发布到github page后路径需要有前缀'blog'
  // 应当总是以斜杠开始，并以斜杠结束
  // 一个 base 路径一旦被设置，它将会自动地作为前缀插入到 .vuepress/config.js 中所有以 / 开始的资源路径中
  base: '/blog/',
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
      '/articles/html/': [
        {
          title: 'html',
          collapsable: true,
          sidebarDepth: 2,
          children: [
            'blog1'
          ]
        }
      ],
      '/articles/css/': [
        {
          title: 'css',
          collapsable: true,
          sidebarDepth: 2,
          children: [
            ['blog1', 'blog1'],
            ['blog2', 'blog2']
          ]
        }
      ],
      '/articles/javascript/': [
        {
          title: 'javascript',
          collapsable: true,
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
