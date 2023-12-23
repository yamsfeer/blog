import path from 'path'
import { readdirSync } from 'fs'

function dir(dirname) {
  return readdirSync(path.resolve(`${__dirname}/../${dirname}`))
    .filter((filename) => filename.includes('.md'))
    .map((filename) => {
      return {
        text: filename.split('.md')[0],
        link: filename,
      }
    })
}

function sort(files) {
  return files.sort((A, B) => {
    const { text: nameA } = A,
      { text: nameB } = B
    const reg = /[\d+.]+/
    if (nameA.match(reg) && nameB.match(reg)) {
      const indexA = nameA.match(reg)[0].split('.') // '12.1.3'
      const indexB = nameB.match(reg)[0].split('.')

      let i = 0
      let length = Math.max(indexA.length, indexB.length)
      while (i < length) {
        let A = indexA[i] || 0 // 超出的部分用 0 补充
        let B = indexB[i] || 0
        if (A === B) {
          i++
          continue
        }
        return A - B
      }
    }
  })
}

export const navbar = [
  {
    text: '计算机',
    children: [
      { text: '编译原理', link: '/计算机基础/编译原理/1. 编译器介绍' },
      { text: '计算机通识', link: '/计算机基础/计算机通识/RSA算法' },
      { text: '体系结构', link: '/计算机基础/计算机体系结构/冯诺依曼结构' },
      { text: '计算机科学', link: '/计算机基础/计算机科学/计算理论' },
      // { text: '汇编语言', link: '/计算机基础/汇编语言/MIPS汇编入门' },
      { text: '操作系统', link: '/计算机基础/操作系统/1.0计算机启动' },
    ],
  },
  {
    text: '编程',
    children: [
      { text: '编程概论', link: '/编程/编程概论/编程范式' },
      { text: 'leetcode', link: '/编程/leetcode/0.概述' },
      { text: '手写代码', link: '/编程/手写代码/防抖节流' },
      { text: '数据结构算法', link: '/编程/数据结构算法/堆' },
      { text: '算法分析', link: '/编程/算法设计与分析/1.概述' },
      { text: '设计模式', link: '/编程/设计模式/1.单例模式' },
    ],
  },
  {
    text: '前端',
    children: [
      {
        text: 'JS',
        children: [
          { text: 'ECMAScript', link: '/前端/ECMAScript/1.Overview' },
          // { text: '你不知道的JS', link: '/前端/YDKJS/YDKJS(上卷)/1-1 作用域与编译器' },
          { text: 'web API', link: '/前端/API/Page Lifecycle' },
        ],
      },
      {
        text: 'css',
        children: [
          { text: 'css2.1', link: '/前端/css/1.选择器' },
          { text: 'css世界', link: '/前端/css世界/1.块级元素与width、height' },
        ],
      },
      {
        text: '浏览器',
        children: [
          { text: 'chrome', link: '/前端/浏览器/chrome/1.浏览器基础' },
          // { text: 'webkit技术内幕', link: '/前端/浏览器/webkit技术内幕/1.浏览器和浏览器内核' },
          { text: '编写JS引擎', link: '/前端/浏览器/编写JS引擎/1.概述' },
        ],
      },
      {
        text: '源码',
        children: [
          { text: 'vue3', link: '/前端/vue3/1.overview' },
          { text: 'webpack', link: '/前端/webpack/1.overview' },
        ],
      },
      { text: '网络', link: '/前端/网络/http缓存' },
      { text: '框架', link: '/前端/框架/vue优化' },
    ],
  },
  {
    text: '解决方案',
    children: [
      { text: '低代码', link: '/解决方案/低代码/1.概述' },
      { text: '微前端', link: '/解决方案/微前端/1.微前端' },
      { text: '性能优化', link: '/解决方案/性能优化/1.性能概述' },
      { text: '前端监控', link: '/解决方案/前端监控/1.监控概览' },
      { text: '图片', link: '/解决方案/图片/1.图片格式' },
      { text: '多人协作', link: '/解决方案/多人协作/冲突' },
    ],
  },
  {
    text: '工程架构',
    children: [
      { text: '工程', link: '/工程架构/工程化/1.工程化' },
      // { text: '架构', link: '/工程架构/架构/架构模式' },
      { text: '组件化', link: '/工程架构/组件化/组件化' },
    ],
  },
  {
    text: '图形学',
    children: [
      { text: 'games101', link: '/图形学/games101/0.序言' },
      { text: 'games104', link: '/图形学/games104/1.导论' },
      { text: 'webGPU', link: '/图形学/webGPU/1.webGPU' },
      { text: '虚幻引擎', link: '/图形学/unreal/1.概览' },
      { text: '线性代数', link: '/图形学/数学/线性代数的本质/0.序言' },
      { text: '几何', link: '/图形学/数学/几何/欧几里得几何与非欧几何' },
    ],
  },
  { text: 'clutter', link: '/clutter/思维导图' },
]

export const sidebar = {
  '/clutter/': [{ text: 'clutter', children: dir('clutter') }],

  /* 前端 */
  '/前端/YDKJS/': [
    {
      text: '你不知道的JS(上)',
      prefix: '/YDKJS/YDKJS(上卷)/',
      children: dir('前端/YDKJS/YDKJS(上卷)'),
    },
    {
      text: '你不知道的JS(中)',
      prefix: '/YDKJS/YDKJS(中卷)/',
      children: dir('前端/YDKJS/YDKJS(中卷)'),
    },
    {
      text: '你不知道的JS(下)',
      prefix: '/YDKJS/YDKJS(下卷)/',
      children: dir('前端/YDKJS/YDKJS(下卷)'),
    },
  ],
  '/前端/css': [{ text: 'css', children: sort(dir('前端/css')) }],
  '/前端/css世界': [{ text: 'css 世界', children: dir('前端/css世界') }],
  '/前端/ECMAScript/': [
    { text: 'ECMAScript', children: sort(dir('前端/ECMAScript')) },
  ],
  '/前端/API/': [{ text: 'API', children: dir('前端/API') }],
  '/前端/网络/': [{ text: '网络', children: dir('前端/网络') }],
  '/前端/框架/': [{ text: '框架', children: dir('前端/框架') }],

  '/前端/浏览器/chrome': [
    { text: 'chrome', children: sort(dir('前端/浏览器/chrome')) },
  ],
  '/前端/浏览器/编写JS引擎': [
    { text: '编写JS引擎', children: sort(dir('前端/浏览器/编写JS引擎')) },
  ],
  '/前端/浏览器/webkit技术内幕': [
    { text: 'webkit技术内幕', children: dir('前端/浏览器/webkit技术内幕') },
  ],
  '/前端/vue2': [{ text: 'vue2', children: dir('前端/vue2') }],
  '/前端/vue3': [{ text: 'vue3', children: sort(dir('前端/vue3')) }],
  '/前端/webpack': [{ text: 'webpack', children: sort(dir('前端/webpack')) }],

  /* 编程 */
  '/编程/算法设计与分析/': [
    { text: '算法设计与分析', children: sort(dir('编程/算法设计与分析/')) },
  ],
  '/编程/leetcode/': [
    { text: 'leetcode', children: sort(dir('编程/leetcode')) },
  ],
  '/编程/数据结构算法/': [
    { text: '数据结构算法', children: dir('编程/数据结构算法') },
  ],
  '/编程/手写代码/': [{ text: '手写代码', children: dir('编程/手写代码') }],
  '/编程/设计模式/': [
    { text: '设计模式', children: sort(dir('编程/设计模式')) },
  ],
  '/编程/编程概论/': [
    { text: '编程概论', children: sort(dir('编程/编程概论')) },
  ],

  /* 计算机基础 */
  '/计算机基础/计算机科学': [
    { text: '计算机科学', children: dir('计算机基础/计算机科学') },
  ],
  '/计算机基础/计算机体系结构': [
    { text: '计算机体系结构', children: dir('计算机基础/计算机体系结构') },
  ],
  '/计算机基础/计算机通识': [
    { text: '计算机通识', children: dir('计算机基础/计算机通识') },
  ],
  '/计算机基础/汇编语言': [
    { text: '汇编语言', children: dir('计算机基础/汇编语言') },
  ],
  '/计算机基础/操作系统': [
    { text: '操作系统', children: dir('计算机基础/操作系统') },
  ],
  '/计算机基础/编译原理': [
    { text: '编译原理', children: dir('计算机基础/编译原理') },
  ],

  /* 工程架构 */
  '/工程架构/工程化': [
    { text: '工程化', children: sort(dir('工程架构/工程化')) },
  ],
  '/工程架构/架构': [{ text: '架构', children: sort(dir('工程架构/架构')) }],
  '/工程架构/组件化': [{ text: '组件化', children: dir('工程架构/组件化') }],

  /* 解决方案 */
  '/解决方案/低代码': [{ text: '低代码', children: dir('解决方案/低代码') }],
  '/解决方案/微前端': [{ text: '微前端', children: dir('解决方案/微前端') }],

  '/解决方案/性能优化': [
    { text: '性能优化', children: sort(dir('解决方案/性能优化')) },
  ],
  '/解决方案/前端监控': [
    { text: '前端监控', children: dir('解决方案/前端监控') },
  ],
  '/解决方案/图片': [{ text: '图片', children: dir('解决方案/图片') }],
  '/解决方案/多人协作': [
    { text: '多人协作', children: dir('解决方案/多人协作') },
  ],

  /* 图形学 */
  '/图形学/games101': [{ text: 'games101', children: dir('图形学/games101') }],
  '/图形学/games104': [{ text: 'games104', children: dir('图形学/games104') }],
  '/图形学/webGPU': [{ text: 'webGPU', children: dir('图形学/webGPU') }],
  '/图形学/unreal': [{ text: 'unreal', children: dir('图形学/unreal') }],
  '/图形学/数学/线性代数的本质/': [
    {
      text: '线性代数的本质',
      children: sort(dir('图形学/数学/线性代数的本质')),
    },
  ],
  '/图形学/数学/几何/': [{ text: '几何', children: dir('图形学/数学/几何') }],
  '/图形学/数学/微积分/': [
    { text: '微积分', children: dir('图形学/数学/微积分') },
  ],
  '/图形学/数学/傅里叶变换/': [
    { text: '傅里叶变换', children: dir('图形学/数学/傅里叶变换') },
  ],
}
