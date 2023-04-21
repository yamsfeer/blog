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
    return nameA.split('.')[0] - nameB.split('.')[0]
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
      { text: 'leetcode', link: '/leetcode/0.开始' },
      { text: '手写代码', link: '/手写代码/防抖节流' },
      { text: '数据结构', link: '/数据结构/堆' },
      { text: '经典算法', link: '/经典算法/排序算法' },
      { text: '算法分析', link: '/算法设计与分析/开始' },
      { text: '设计模式', link: '/设计模式/1.单例模式' },
    ]
  },
  {
    text: '图形学',
    children: [
      { text: 'games101', link: '/图形学/现代计算机图形学入门/0.序言' },
      { text: '线性代数', link: '/数学/线性代数的本质/0.序言' },
      { text: '几何', link: '/数学/几何/欧几里得几何与非欧几何' },
      // { text: '图形学API', link: '/图形学/图形学API/webGL' },
      // { text: '傅里叶变换', link: '/数学/傅里叶变换/傅里叶变换' },
      // { text: '微积分', link: '/数学/微积分/微积分基本概念' },
    ]
  },
  {
    text: '前端',
    children: [
      { text: '你不知道的JS', link: '/YDKJS/YDKJS(上卷)/1-1 作用域与编译器' },
      { text: 'ECMAScript', link: '/ECMAScript/执行上下文' },
      { text: 'css世界', link: '/css世界/1.块级元素与width、height' },
      { text: '浏览器', link: '/浏览器/图解V8/1.图解V8' },
      { text: '源码', link: '/源码/vue3/0.vue3的改进' },
    ]
  },
  {
    text: '领域',
    children: [
      { text: '工程', link: '/领域/工程化/工具链' },
      { text: '架构', link: '/领域/架构/组件化' },
      { text: '性能', link: '/领域/性能优化/性能优化' },
      { text: '监控', link: '/领域/前端监控/1.监控概览' },
    ]
  },
  { text: 'clutter', link: '/clutter/思维导图' },
];

export const sidebar = {
  '/clutter/': [{ text: 'clutter', children: dir('clutter') }],

  '/': [
    { text: '你不知道的JS(上)', prefix: '/YDKJS/YDKJS(上卷)/', children: dir('/YDKJS/YDKJS(上卷)') },
    { text: '你不知道的JS(中)', prefix: '/YDKJS/YDKJS(中卷)/', children: dir('/YDKJS/YDKJS(中卷)') },
    { text: '你不知道的JS(下)', prefix: '/YDKJS/YDKJS(下卷)/', children: dir('/YDKJS/YDKJS(下卷)') },
  ],

  '/算法设计与分析/': [
    { text: '开始', children: [{ text: '开始', link: '/算法设计与分析/开始.md' }] },
    { text: '分治', prefix: '分治/', children: dir('算法设计与分析/分治') },
    { text: '动态规划', prefix: '动态规划/', children: dir('算法设计与分析/动态规划') },
    { text: '贪心', prefix: '贪心/', children: dir('算法设计与分析/贪心') },
    { text: '回溯', prefix: '回溯/', children: dir('算法设计与分析/回溯') },
    { text: '分支限界', prefix: '分支限界/', children: dir('算法设计与分析/分支限界') },
    { text: '总结', children: [{ text: '总结', link: '/算法设计与分析/总结.md' }] },
  ],
  '/数据结构/': [{ text: '数据结构', children: dir('数据结构') }],
  '/经典算法/': [{ text: '经典算法', children: dir('经典算法') }],
  '/leetcode/': [{ text: 'leetcode', children: dir('leetcode') }],
  '/手写代码/': [{ text: '手写代码', children: dir('手写代码') }],
  '/设计模式/': [{ text: '设计模式', children: sort(dir('设计模式')) }],

  '/计算机基础/计算机科学': [{ text: '计算机科学', children: dir('计算机基础/计算机科学') }],
  '/计算机基础/计算机体系结构': [{ text: '计算机体系结构', children: dir('计算机基础/计算机体系结构') }],
  '/计算机基础/计算机通识': [{ text: '计算机通识', children: dir('计算机基础/计算机通识') }],
  '/计算机基础/汇编语言': [{ text: '汇编语言', children: dir('计算机基础/汇编语言') }],
  '/计算机基础/操作系统': [{ text: '操作系统', children: dir('计算机基础/操作系统') }],
  '/计算机基础/编译原理': [{ text: '编译原理', children: dir('计算机基础/编译原理') }],
  // '/计算机基础/计算机网络': [{ text: '计算机网络', children: dir('计算机基础/计算机网络') }],

  '/数学/线性代数的本质/': [{ text: '线性代数的本质', children: sort(dir('数学/线性代数的本质')) }],
  '/数学/几何/': [{ text: '几何', children: dir('数学/几何') }],
  '/数学/微积分/': [{ text: '微积分', children: dir('数学/微积分') }],
  '/数学/傅里叶变换/': [{ text: '傅里叶变换', children: dir('数学/傅里叶变换') }],

  '/图形学/现代计算机图形学入门': [{ text: '现代计算机图形学入门', children: dir('图形学/现代计算机图形学入门') }],
  '/图形学/图形学API': [{ text: '图形学API', children: dir('图形学/图形学API') }],

  '/浏览器': [
    { text: 'webkit技术内幕', prefix: 'webkit技术内幕', children: dir('浏览器/webkit技术内幕') },
    { text: '图解V8', prefix: '图解V8', children: dir('浏览器/图解V8') },
    { text: '浏览器', children: dir('浏览器') }
  ],

  '/领域/工程化': [{ text: '工程化', children: dir('领域/工程化') }],
  '/领域/架构': [{ text: '架构', children: dir('领域/架构') }],
  '/领域/性能优化': [{ text: '性能优化', children: dir('领域/性能优化') }],
  '/领域/前端监控': [{ text: '前端监控', children: dir('领域/前端监控') }],

  '/源码': [
    { text: 'vue3', prefix: 'vue3', children: dir('源码/vue3') },
    { text: 'vue', prefix: 'vue', children: dir('源码/vue') }
  ],
  '/css世界/': [{ text: 'css', children: dir('css世界') }],

  '/ECMAScript/': [{ text: 'ECMAScript', children: dir('ECMAScript') }],
};
