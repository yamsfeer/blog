const { getSidebar } = require('./utils')

const nav = [
  {
    text: 'YDKJS笔记',
    ariaLabel: 'Language Menu',
    items: [
      { text: '上卷', link: '/YDKJS笔记（上卷）/1-1 作用域与编译器' },
      { text: '中卷', link: '/YDKJS笔记（中卷）/1-1 类型' },
      { text: '下卷', link: '/YDKJS笔记（下卷）/1-1 深入编程' },
    ]
  },
  {
    text: '计算机基础',
    items: [
      { text: '计算机科学', link: '/计算机基础/计算机科学/计算理论.md' },
      { text: '计算机体系结构', link: '/计算机基础/计算机体系结构/冯诺依曼结构.md' },
      { text: '汇编语言', link: '/计算机基础/汇编语言/x86.md' },
      { text: '操作系统', link: '/计算机基础/操作系统/进程.md' },
      { text: '编译原理', link: '/计算机基础/编译原理/1. 编译器介绍.md' },
      { text: '计算机图形学', link: '/计算机基础/计算机图形学/渲染管道.md' },
      { text: '计算机网络', link: '/计算机基础/计算机网络/' },
    ]
  },
  { text: '算法', link: '/算法设计与分析/开始' },
  { text: '浏览器', link: '/浏览器/webkit技术内幕/1. 浏览器和浏览器内核' },
  { text: '杂谈', link: '/杂谈/网址收藏' },
  { text: 'Github', link: 'https://github.com/melogra' },
];

const sidebar = {
  '/杂谈/': [
    {
      title: '杂谈',
      collapsable: false,
      children: getSidebar('杂谈')
    }
  ],
  '/YDKJS笔记（上卷）/': [
    {
      title: '你不知道的JS笔记（上卷）',
      collapsable: false,
      children: [
        ...getSidebar('YDKJS笔记（上卷）')
      ]
    }
  ],
  '/YDKJS笔记（中卷）/': [
    {
      title: '你不知道的JS笔记（中卷）',
      collapsable: false,
      children: [
        ...getSidebar('YDKJS笔记（中卷）')
      ]
    }
  ],
  '/YDKJS笔记（下卷）/': [
    {
      title: '你不知道的JS笔记（下卷）',
      collapsable: false,
      children: [
        ...getSidebar('YDKJS笔记（下卷）')
      ]
    }
  ],
  '/算法设计与分析/': [
    {
      title: '开始',
      collapsable: false,
      children: [['开始', '开始']]
    },
    {
      title: '分治',
      collapsable: false,
      prefix: '分治/',
      children: getSidebar('算法设计与分析/分治')
    },
    {
      title: '动态规划',
      collapsable: false,
      prefix: '动态规划/',
      children: getSidebar('算法设计与分析/动态规划')
    },
    {
      title: '贪心',
      collapsable: false,
      prefix: '贪心/',
      children: getSidebar('算法设计与分析/贪心')
    },
    {
      title: '回溯',
      collapsable: false,
      prefix: '回溯/',
      children: getSidebar('算法设计与分析/回溯')
    },
    {
      title: '分支限界',
      collapsable: false,
      prefix: '分支限界/',
      children: getSidebar('算法设计与分析/分支限界')
    },
    {
      title: '总结',
      collapsable: false,
      children: [['总结', '总结']]
    },
  ],
  '/计算机基础/': [
    {
      title: '计算机科学',
      collapsable: false,
      prefix: '计算机科学/',
      children: getSidebar('计算机基础/计算机科学')
    },
    {
      title: '计算机体系结构',
      collapsable: false,
      prefix: '计算机体系结构/',
      children: getSidebar('计算机基础/计算机体系结构')
    },
    {
      title: '汇编语言',
      collapsable: false,
      prefix: '汇编语言/',
      children: getSidebar('计算机基础/汇编语言')
    },
    {
      title: '操作系统',
      collapsable: false,
      prefix: '操作系统/',
      children: getSidebar('计算机基础/操作系统')
    },
    {
      title: '编译原理',
      collapsable: false,
      prefix: '编译原理/',
      children: getSidebar('计算机基础/编译原理')
    },
    {
      title: '计算机图形学',
      collapsable: false,
      prefix: '计算机图形学/',
      children: getSidebar('计算机基础/计算机图形学')
    },
    {
      title: '计算机网络',
      prefix: '计算机网络/',
      collapsable: false,
      children: getSidebar('计算机基础/计算机网络')
    },
  ],
  '/浏览器/': [
    {
      title: 'webkit技术内幕',
      prefix: 'webkit技术内幕/',
      collapsable: false,
      children: getSidebar('浏览器/webkit技术内幕')
    }
  ]
};

module.exports = {
  nav,
  sidebar
};
