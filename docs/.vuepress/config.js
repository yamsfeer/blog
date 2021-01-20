module.exports = {
  // 发布到github page后路径需要有前缀'blog'
  // 应当总是以斜杠开始，并以斜杠结束
  // 一个 base 路径一旦被设置，它将会自动地作为前缀插入到 .vuepress/config.js 中所有以 / 开始的资源路径中
  base: '/blog/',
  title: `yams`,
  description: '记录些笔记、写点文章',
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
            ['javascript-note/1-2 词法作用域', '1-2 词法作用域'],
            ['javascript-note/1-3 函数作用域和块作用域', '1-3 函数作用域和块作用域'],
            ['javascript-note/1-4 声明提升', '1-4 声明提升'],
            ['javascript-note/1-5 作用域与闭包', '1-5 作用域与闭包'],
            ['javascript-note/2-1 this概览', '2-1 this概览'],
            ['javascript-note/2-2 this详解', '2-2 this详解'],
            ['javascript-note/2-3 对象', '2-3 对象'],
            ['javascript-note/2-3-2 对象的内容', '2-3-2 对象的内容'],
            ['javascript-note/2-4 “类”设计模式与JavaScript', '2-4 “类”设计模式与JavaScript'],
            ['javascript-note/2-5 原型', '2-5 原型'],
            ['javascript-note/2-6 委托', '2-6 委托'],
            ['javascript-note/附录', '附录'],
          ]
        }
      ]
    },
    smoothScroll: true
  }
}
