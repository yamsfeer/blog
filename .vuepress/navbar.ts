import { navbar } from 'vuepress-theme-hope'

export default navbar([
  {
    text: 'JS',
    children: [
      { text: 'ECMAScript', link: '/ECMAScript/1.Overview' },
      // { text: '你不知道的JS', link: '/YDKJS/YDKJS(上卷)/1-1 作用域与编译器' },
      { text: 'web API', link: '/API/Page Lifecycle' },
    ],
  },
  {
    text: 'css',
    children: [
      { text: 'css2.1', link: '/css/1.选择器' },
      { text: 'css世界', link: '/css世界/1.块级元素与width、height' },
    ],
  },
  {
    text: '浏览器',
    children: [
      { text: 'chrome', link: '/浏览器/chrome/1.浏览器基础' },
      // { text: 'webkit技术内幕', link: '/浏览器/webkit技术内幕/1.浏览器和浏览器内核' },
      { text: '编写JS引擎', link: '/浏览器/编写JS引擎/1.概述' },
    ],
  },
  {
    text: '源码',
    children: [{ text: 'vue3', link: '/vue3/1.overview' }],
  },
  { text: '框架', link: '/框架/vue' },
  {
    text: '工程架构',
    children: [
      { text: 'devops', link: '/工程架构/devops/1.概述' },
      { text: 'node', link: '/工程架构/node/1.模块化' },
      { text: 'webpack', link: '/工程架构/webpack/1.overview' },
      { text: '前端监控', link: '/工程架构/前端监控/1.监控概览' },
      { text: '图片', link: '/工程架构/图片/1.图片格式' },
      { text: '微前端', link: '/工程架构/微1.微前端' },
      { text: '性能优化', link: '/工程架构/性能优化/1.性能概述' },
      { text: '架构', link: '/工程架构/架构/架构模式' },
    ],
  },
  {
    text: '解决方案',
    children: [
      { text: '多人协作', link: '/解决方案/多人协作/冲突' },
      { text: '自动化方案', link: '/解决方案/自动化方案/自动化方案' },
    ],
  },
])
