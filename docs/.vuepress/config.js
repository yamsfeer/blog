module.exports = {
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
  plugins: ['@vuepress/back-to-top'],
  // theme: 'vuepress-theme-blog',
  themeConfig: {
    displayAllHeaders: true,
    searchMaxSuggestions: 10,
    lastUpdated: '上次更新时间',
    nav: [
      {
        text: 'YDKJS笔记',
        ariaLabel: 'Language Menu',
        items: [
          { text: '上卷', link: '/YDKJS笔记（上卷）/1-1 作用域与编译器' },
          { text: '中卷', link: '/YDKJS笔记(中卷)/1-1 作用域与编译器' },
          { text: '下卷', link: '/YDKJS笔记(下卷)/1-1 作用域与编译器' },
        ]
      },
      { text: '经典算法', link: '/algorithm/相关概念' },
      { text: 'Github', link: 'https://github.com/melogra' },
    ],
    sidebar: {
      '/YDKJS笔记（上卷）/': [
        {
          title: '你不知道的JS笔记（上卷）',
          collapsable: false,
          children: [
            ['1-1 作用域与编译器', '1-1 作用域与编译器'],
            ['1-2 词法作用域', '1-2 词法作用域'],
            ['1-3 函数作用域和块作用域', '1-3 函数作用域和块作用域'],
            ['1-4 声明提升', '1-4 声明提升'],
            ['1-5 作用域与闭包', '1-5 作用域与闭包'],
            ['2-1 this概览', '2-1 this概览'],
            ['2-2 this详解', '2-2 this详解'],
            ['2-3 对象', '2-3 对象'],
            ['2-3-2 对象的内容', '2-3-2 对象的内容'],
            ['2-4 “类”设计模式与JavaScript', '2-4 “类”设计模式与JavaScript'],
            ['2-5 原型', '2-5 原型'],
            ['2-6 委托', '2-6 委托'],
            ['附录', '附录'],
          ]
        }
      ],
      '/algorithm/': [
        {
          title: '开始',
          collapsable: false,
          children: [
            ['相关概念', '相关概念'],
          ]
        },
        {
          title: '分治',
          collapsable: false,
          children: [
            ['分治/分治', '分治'],
            ['分治/k-selection', 'k-selection'],
            ['分治/卷积计算', '卷积计算'],
            ['分治/平面点集凸包算法', '平面点集凸包算法'],
            ['分治/快速傅立叶变换FFT算法', '快速傅立叶变换FFT算法'],
          ]
        },
        {
          title: '动态规划',
          collapsable: false,
          children: [
            ['动态规划/动态规划', '动态规划'],
            ['动态规划/背包问题', '背包问题'],
            ['动态规划/投资问题', '投资问题'],
            ['动态规划/序列比对', '序列比对'],
            ['动态规划/图像压缩', '图像压缩'],
            ['动态规划/最优二叉搜索树', '最优二叉搜索树'],
            ['动态规划/最大子段和', '最大子段和'],
            ['动态规划/最长公共子序列', '最长公共子序列'],
            ['动态规划/RNA二级结构预测', 'RNA二级结构预测'],
          ]
        },
        {
          title: '贪心',
          collapsable: false,
          children: [
            ['贪心/贪心', '贪心'],
            ['贪心/最小延迟调度', '最小延迟调度'],
            ['贪心/最优装载问题', '最优装载问题'],
            ['贪心/Dijkstra', 'Dijkstra'],
            ['贪心/Haffman', 'Haffman'],
            ['贪心/Prim', 'Prim'],
            ['贪心/Kruskal', 'Kruskal'],
          ]
        },
        {
          title: '回溯',
          collapsable: false,
          children: [
            ['回溯/回溯', '回溯'],
            ['回溯/0-1背包问题', '0-1背包问题'],
            ['回溯/n皇后问题', 'n皇后问题'],
            ['回溯/图的着色', '图的着色'],
            ['回溯/旅行问题', '旅行问题'],
          ]
        },
        {
          title: '分支限界',
          collapsable: false,
          children: [
            ['分支限界/分支限界', '分支限界'],
            ['分支限界/旅行问题', '旅行问题'],
            ['分支限界/最大团问题', '最大团问题'],
            ['分支限界/圆排列问题', '圆排列问题'],
            ['分支限界/连续邮资问题', '连续邮资问题'],
          ]
        },
        {
          title: '总结',
          collapsable: false,
          children: [
            ['总结', '总结'],
          ]
        },
      ]
    },
    smoothScroll: true
  }
}
