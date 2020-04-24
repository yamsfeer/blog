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
      '/articles/': [
        {
          title: 'html',
          collapsable: true,
          sidebarDepth: 2,
          children: [
            'html/blog1'
          ]
        },
        {
          title: 'css',
          collapsable: true,
          sidebarDepth: 2,
          children: [
            ['css/blog1']
          ]
        },
        {
          title: 'javascript',
          collapsable: true,
          sidebarDepth: 2,
          children: [
            ['javascript/blog1']
          ]
        }
      ]
    },
    smoothScroll: true
  }
}
