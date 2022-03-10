const { defineHopeConfig } = require("vuepress-theme-hope");
const { navbar, sidebar } = require('./menu');

module.exports = defineHopeConfig({
  // 发布到github page后路径需要有前缀'blog'
  // 应当总是以斜杠开始，并以斜杠结束
  // 一个 base 路径一旦被设置，它将会自动地作为前缀插入到 .vuepress/config.js 中所有以 / 开始的资源路径中
  base: '/blog/',
  title: 'yams',
  head: [
    ['link', { rel: 'icon', href: '/logo.ico' }]
  ],
  theme: 'vuepress-theme-hope',
  themeConfig: {
    navbar,
    sidebar,

    hostname: 'https://melogra.github.io',
    plugins: {
      blog: true,
      mdEnhance: {
        tex: true,
        flowchart: true,
        demo: true,
      },
    },
  }
})
