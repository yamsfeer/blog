import { defineUserConfig } from 'vuepress'
import { hopeTheme } from "vuepress-theme-hope"
// import { searchPlugin } from '@vuepress/plugin-search'
import { searchProPlugin } from 'vuepress-plugin-search-pro'

import { navbar, sidebar } from './menu';

const config = {
  // 发布到github page后路径需要有前缀'blog'
  // 应当总是以斜杠开始，并以斜杠结束
  // 一个 base 路径一旦被设置，它将会自动地作为前缀插入到 .vuepress/config.js 中所有以 / 开始的资源路径中
  base: '/blog/',
  title: 'yamsfeer',
  head: [
    ['link', { rel: 'icon', href: '/logo.ico' }],
  ],
  shouldPrefetch: false, // pwa

  plugins: [searchProPlugin({ indexContent: true })],

  markdown: {
    code: {
      lineNumbers: false,
    },
  },

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
    title: false,
    // navbarAutoHide: 'always',

    plugins: {
      mdEnhance: {
        katex: true,
        flowchart: true,
        mermaid: true,
        demo: true,
      },
    },
  }),
}

export default defineUserConfig(config)
