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
  // theme: 'vuepress-theme-blog',
  themeConfig: {
    searchMaxSuggestions: 10,
    lastUpdated: '上次更新时间',
    nav: [
      { text: 'Github', link: 'https://github.com/melogra' }
    ],
    sidebar: {
      '/articles/': [
        {
          title: '你不知道的JS笔记',
          collapsable: true,
          children: [
            ['javascript-note/1-1 作用域与编译器', '1-1 作用域与编译器'],
            ['javascript-note/1.5作用域与闭包', '1.5作用域与闭包']
          ]
        }
      ]
    },
    smoothScroll: true
  }
}
