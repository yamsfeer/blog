import path from 'path'
import { readdirSync, stat } from 'fs'

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

export const navbar = [
  {
    text: '计算机基础',
    children: [
      { text: '计算机科学', link: '/计算机基础/计算机科学/计算理论.md' },
      { text: '计算机体系结构', link: '/计算机基础/计算机体系结构/冯诺依曼结构.md' },
      { text: '汇编语言', link: '/计算机基础/汇编语言/MIPS汇编入门.md' },
      { text: '操作系统', link: '/计算机基础/操作系统/1.0计算机启动.md' },
      { text: '编译原理', link: '/计算机基础/编译原理/1. 编译器介绍.md' },
      // { text: '计算机网络', link: '/计算机基础/计算机网络/' },
    ]
  },
  {
    text: '编程',
    children: [
      { text: 'leetcode', link: '/leetcode/0.开始.md' },
      { text: '手写代码', link: '/手写代码/防抖节流.md' },
      { text: '算法设计与分析', link: '/算法设计与分析/开始.md' },
      // { text: '经典算法', link: '/经典算法/KMP.md' },
      { text: '设计模式', link: '/设计模式/观察者模式VS发布订阅.md' },
    ]
  },
  {
    text: '源码',
    children: [
      { text: 'vue', link: '/源码/vue/1. 准备工作.md' },
      { text: 'vue3', link: '/源码/vue3/vue3的改进.md' },
    ]
  },
  {
    text: '图形学',
    children: [
      { text: 'games101', link: '/图形学/现代计算机图形学入门/0.序言.md' },
      // { text: '图形学API', link: '/图形学/图形学API/webGL.md' },
      { text: '线性代数', link: '/数学/线性代数的本质/0.序言.md' },
      { text: '几何', link: '/数学/几何/欧几里得几何与非欧几何.md' },
      // { text: '傅里叶变换', link: '/数学/傅里叶变换/傅里叶变换.md' },
      // { text: '微积分', link: '/数学/微积分/微积分基本概念.md' },
    ]
  },
  {
    text: '前端',
    children: [
      { text: '你不知道的JS', link: '/YDKJS(上卷)/1-1 作用域与编译器.md' },
      { text: 'css世界', link: '/css世界/1.块级元素与width、height.md' },
      { text: '浏览器', link: '/浏览器/图解V8/1.图解V8.md' },
    ]
  },
  {
    text: '领域',
    children: [
      { text: '工程化', link: '/领域/工程化/工具链' },
      { text: '架构', link: '/领域/架构/组件化' },
      { text: '性能优化', link: '/领域/性能优化/性能优化' },
      { text: 'lowcode', link: '/领域/lowcode/逻辑编排' },
      // { text: '其他', link: '/领域/其他/lowcode' },
    ]
  },
  { text: 'clutter', link: '/clutter/思维导图.md' },
];

export const sidebar = {
  '/clutter/': [{ text: 'clutter', children: dir('clutter') }],

  '/': [
    { text: '你不知道的JS(上)', prefix: '/YDKJS(上卷)/', children: dir('YDKJS(上卷)') },
    { text: '你不知道的JS(中)', prefix: '/YDKJS(中卷)/', children: dir('YDKJS(中卷)') },
    { text: '你不知道的JS(下)', prefix: '/YDKJS(下卷)/', children: dir('YDKJS(下卷)') },
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
  '/经典算法/': [{ text: '经典算法', children: dir('经典算法') }],
  '/leetcode/': [{ text: 'leetcode', children: dir('leetcode') }],
  '/手写代码/': [{ text: '手写代码', children: dir('手写代码') }],
  '/设计模式/': [{ text: '设计模式', children: dir('设计模式') }],

  '/计算机基础/计算机科学': [{ text: '计算机科学', children: dir('计算机基础/计算机科学') }],
  '/计算机基础/计算机体系结构': [{ text: '计算机体系结构', children: dir('计算机基础/计算机体系结构') }],
  '/计算机基础/汇编语言': [{ text: '汇编语言', children: dir('计算机基础/汇编语言') }],
  '/计算机基础/操作系统': [{ text: '操作系统', children: dir('计算机基础/操作系统') }],
  '/计算机基础/编译原理': [{ text: '编译原理', children: dir('计算机基础/编译原理') }],
  '/计算机基础/计算机网络': [{ text: '计算机网络', children: dir('计算机基础/计算机网络') }],

  '/数学/线性代数的本质/': [{ text: '线性代数的本质', children: dir('数学/线性代数的本质') }],
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
  '/领域/': [
    { text: '概述', link: '/领域/概述.md' },
    { text: '工程化', prefix: '工程化', children: dir('领域/工程化') },
    { text: '架构', prefix: '架构', children: dir('领域/架构') },
    { text: '性能优化', prefix: '性能优化', children: dir('领域/性能优化') },
    { text: 'lowcode', prefix: 'lowcode', children: dir('领域/lowcode') },
  ],
  '/源码/vue': [{ text: 'vue', children: dir('源码/vue') }],
  '/源码/vue3': [{ text: 'vue3', children: dir('源码/vue3') }],
  '/css世界/': [{ text: 'css', children: dir('css世界') }]
};
