import path from 'path'
import { readdirSync } from 'fs'

function dir(dirname) {
  return readdirSync(path.resolve(`${__dirname}/../${dirname}`))
    .filter(filename => filename.includes('.md'))
    .map(filename => {
      return {
        text: filename.split('.md')[0],
        link: filename
      }
    })
}

function sort(files) {
  return files.sort((A, B) => {
    const { text: nameA } = A, { text: nameB } = B
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
      { text: '汇编语言', link: '/计算机基础/汇编语言/MIPS汇编入门' },
      { text: '操作系统', link: '/计算机基础/操作系统/1.0计算机启动' },
    ]
  },
  {
    text: '编程',
    children: [
      { text: 'leetcode', link: '/编程/leetcode/0.概述' },
      { text: '手写代码', link: '/编程/手写代码/防抖节流' },
      { text: '数据结构', link: '/编程/数据结构/堆' },
      // { text: '经典算法', link: '/编程/经典算法/排序算法' },
      { text: '算法分析', link: '/编程/算法设计与分析/开始' },
      { text: '设计模式', link: '/编程/设计模式/1.单例模式' },
    ]
  },
  {
    text: '前端',
    children: [
      { text: 'ECMAScript', link: '/前端/ECMAScript/1.Overview' },
      { text: 'API', link: '/前端/API/PageLifecycle' },
      {
        text: '浏览器', children: [
          { text: 'V8引擎', link: '/前端/浏览器/V8引擎/1.execution pipeline' },
          { text: '编写JS引擎', link: '/前端/浏览器/编写JS引擎/1.概述' },
          { text: '渲染引擎', link: '/前端/浏览器/渲染引擎/渲染引擎原理' },
          // { text: 'webkit技术内幕', link: '/前端/浏览器/webkit技术内幕/1.浏览器和浏览器内核' },
        ]
      },
      // { text: '你不知道的JS', link: '/前端/YDKJS/YDKJS(上卷)/1-1 作用域与编译器' },
      { text: 'css世界', link: '/前端/css世界/1.块级元素与width、height' },
    ]
  },
  {
    text: '源码',
    children: [
      // { text: 'vue2', link: '/源码/vue2/1.准备工作' },
      { text: 'vue3', link: '/源码/vue3/1.overview' },
      { text: 'webpack', link: '/源码/webpack/1.overview' },
    ]
  },
  {
    text: '解决方案',
    children: [
      { text: '工程', link: '/解决方案/工程化/工具链' },
      { text: '架构', link: '/解决方案/架构/架构模式' },
      { text: '性能', link: '/解决方案/性能优化/1.性能概述' },
      { text: '监控', link: '/解决方案/前端监控/1.监控概览' },
      { text: '图片', link: '/解决方案/图片/1.图片格式' },
    ]
  },
  {
    text: '领域',
    children: [
      { text: '游戏', link: '/领域/游戏/游戏引擎' },
      {
        text: '图形学',
        children: [
          { text: 'games101', link: '/计算机基础/图形学/现代计算机图形学入门/0.序言' },
          { text: '线性代数', link: '/计算机基础/数学/线性代数的本质/0.序言' },
          { text: '几何', link: '/计算机基础/数学/几何/欧几里得几何与非欧几何' },
          // { text: '图形学API', link: '/图形学/图形学API/webGL' },
          // { text: '傅里叶变换', link: '/数学/傅里叶变换/傅里叶变换' },
          // { text: '微积分', link: '/数学/微积分/微积分基本概念' },
        ]
      },
      // { text: '颜色', link: '/领域/颜色/颜色' },
    ]
  },
  { text: 'clutter', link: '/clutter/思维导图' },
];

export const sidebar = {
  '/clutter/': [{ text: 'clutter', children: dir('clutter') }],

  /* 前端 */
  '/前端/YDKJS/': [
    { text: '你不知道的JS(上)', prefix: '/YDKJS/YDKJS(上卷)/', children: dir('前端/YDKJS/YDKJS(上卷)') },
    { text: '你不知道的JS(中)', prefix: '/YDKJS/YDKJS(中卷)/', children: dir('前端/YDKJS/YDKJS(中卷)') },
    { text: '你不知道的JS(下)', prefix: '/YDKJS/YDKJS(下卷)/', children: dir('前端/YDKJS/YDKJS(下卷)') },
  ],
  '/前端/css世界/': [{ text: 'css', children: dir('前端/css世界') }],
  '/前端/ECMAScript/': [{ text: 'ECMAScript', children: sort(dir('前端/ECMAScript')) }],
  '/前端/API/': [{ text: 'API', children: dir('前端/API') }],
  '/前端/浏览器/渲染引擎': [{ text: '渲染引擎', children: dir('前端/浏览器/渲染引擎') }],
  '/前端/浏览器/编写JS引擎': [{ text: '编写JS引擎', children: sort(dir('前端/浏览器/编写JS引擎')) }],
  '/前端/浏览器/V8引擎': [{ text: 'V8引擎', children: sort(dir('前端/浏览器/V8引擎')) }],
  '/前端/浏览器/webkit技术内幕': [{ text: 'webkit技术内幕', children: dir('前端/浏览器/webkit技术内幕') }],

  /* 编程 */
  '/编程/算法设计与分析/': [
    { text: '开始', children: [{ text: '开始', link: '编程//算法设计与分析/开始.md' }] },
    { text: '分治', prefix: '分治/', children: dir('编程/算法设计与分析/分治') },
    { text: '动态规划', prefix: '动态规划/', children: dir('编程/算法设计与分析/动态规划') },
    { text: '贪心', prefix: '贪心/', children: dir('编程/算法设计与分析/贪心') },
    { text: '回溯', prefix: '回溯/', children: dir('编程/算法设计与分析/回溯') },
    { text: '分支限界', prefix: '分支限界/', children: dir('编程/算法设计与分析/分支限界') },
    { text: '总结', children: [{ text: '总结', link: '编程//算法设计与分析/总结.md' }] },
  ],
  '/编程/数据结构/': [{ text: '数据结构', children: dir('编程/数据结构') }],
  '/编程/经典算法/': [{ text: '经典算法', children: dir('编程/经典算法') }],
  '/编程/leetcode/': [{ text: 'leetcode', children: sort(dir('编程/leetcode')) }],
  '/编程/手写代码/': [{ text: '手写代码', children: dir('编程/手写代码') }],
  '/编程/设计模式/': [{ text: '设计模式', children: sort(dir('编程/设计模式')) }],

  /* 计算机基础 */
  '/计算机基础/计算机科学': [{ text: '计算机科学', children: dir('计算机基础/计算机科学') }],
  '/计算机基础/计算机体系结构': [{ text: '计算机体系结构', children: dir('计算机基础/计算机体系结构') }],
  '/计算机基础/计算机通识': [{ text: '计算机通识', children: dir('计算机基础/计算机通识') }],
  '/计算机基础/汇编语言': [{ text: '汇编语言', children: dir('计算机基础/汇编语言') }],
  '/计算机基础/操作系统': [{ text: '操作系统', children: dir('计算机基础/操作系统') }],
  '/计算机基础/编译原理': [{ text: '编译原理', children: dir('计算机基础/编译原理') }],
  // '/计算机基础/计算机网络': [{ text: '计算机网络', children: dir('计算机基础/计算机网络') }],

  '/计算机基础/数学/线性代数的本质/': [{ text: '线性代数的本质', children: sort(dir('计算机基础/数学/线性代数的本质')) }],
  '/计算机基础/数学/几何/': [{ text: '几何', children: dir('计算机基础/数学/几何') }],
  '/计算机基础/数学/微积分/': [{ text: '微积分', children: dir('计算机基础/数学/微积分') }],
  '/计算机基础/数学/傅里叶变换/': [{ text: '傅里叶变换', children: dir('计算机基础/数学/傅里叶变换') }],

  /* 源码 */
  '/源码/vue2': [{ text: 'vue2', children: dir('源码/vue2') }],
  '/源码/vue3': [{ text: 'vue3', children: sort(dir('源码/vue3')) }],
  '/源码/webpack': [{ text: 'webpack', children: sort(dir('源码/webpack')) }],

  /* 解决方案 */
  '/解决方案/工程化': [{ text: '工程化', children: dir('解决方案/工程化') }],
  '/解决方案/架构': [{ text: '架构', children: sort(dir('解决方案/架构')) }],
  '/解决方案/性能优化': [{ text: '性能优化', children: sort(dir('解决方案/性能优化')) }],
  '/解决方案/前端监控': [{ text: '前端监控', children: dir('解决方案/前端监控') }],
  '/解决方案/图片': [{ text: '图片', children: dir('解决方案/图片') }],

  /* 领域 */
  // '/领域/颜色': [{ text: '颜色', children: dir('领域/颜色') }],
  '/领域/游戏': [{ text: '游戏', children: dir('领域/游戏') }],
  '/计算机基础/图形学/现代计算机图形学入门': [{ text: '现代计算机图形学入门', children: dir('计算机基础/图形学/现代计算机图形学入门') }],
  '/计算机基础/图形学/图形学API': [{ text: '图形学API', children: dir('计算机基础/图形学/图形学API') }],
};
