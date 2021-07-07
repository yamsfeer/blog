const { config, sidebarConfig } = require("vuepress-theme-hope");
const { nav, sidebar } = require('./menu');

module.exports = config({
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
  plugins: [
    'mermaidjs',
  ],
  theme: 'vuepress-theme-hope',
  themeConfig: {
    displayAllHeaders: true,
    searchMaxSuggestions: 10,
    nav,
    sidebar: sidebarConfig(sidebar),
    smoothScroll: true,
    // theme-hope
    hostname: 'https://melogra.github.io',
    mdEnhance: {
      tex: true,
      flowchart: true,
    },
  }
})
