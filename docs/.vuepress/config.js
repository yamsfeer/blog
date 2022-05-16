const { hopeTheme } = require("vuepress-theme-hope");
const { navbar, sidebar } = require('./menu');

module.exports = {
  // 发布到github page后路径需要有前缀'blog'
  // 应当总是以斜杠开始，并以斜杠结束
  // 一个 base 路径一旦被设置，它将会自动地作为前缀插入到 .vuepress/config.js 中所有以 / 开始的资源路径中
  base: '/blog/',
  title: 'yamsfeer',
  head: [
    ['link', { rel: 'icon', href: '/logo.ico' }]
  ],
  shouldPrefetch: false, // pwa
  theme: hopeTheme({
    navbar,
    sidebar,

    hostname: 'https://yamsfeer.github.io',
    repo: "https://github.com/yamsfeer",
    repoLabel: "GitHub",
    repoDisplay: true,

    /* 页面主题配置 */
    pageInfo: false,
    editLink: false,
    prevLink: false,
    nextLink: false,

    plugins: {
      mdEnhance: {
        tex: true,
        flowchart: true,
        demo: true,
      },
    },
  }),
}
