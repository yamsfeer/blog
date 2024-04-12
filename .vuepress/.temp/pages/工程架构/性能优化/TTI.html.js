import comp from "/Users/yams/github/notes-fe/.vuepress/.temp/pages/工程架构/性能优化/TTI.html.vue"
const data = JSON.parse("{\"path\":\"/%E5%B7%A5%E7%A8%8B%E6%9E%B6%E6%9E%84/%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96/TTI.html\",\"title\":\"TTI 可交互时间\",\"lang\":\"zh-CN\",\"frontmatter\":{\"description\":\"TTI 可交互时间 什么是 TTI TTI ( Time to Interactive ) 可交互时间，从页面开始加载，到主要资源渲染完成并能快速响应用户输入的时间。 具体来说，可以用以下步骤测量 TTI。 从 FCP 开始 向右寻找至少 5 秒的安静窗口 ( 没有长任务且不超过两个正在处理的 GET 请求 )。 向左寻找安静窗口前的最后一个长任务，如...\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://yamsfeer.github.io/notes-fe/%E5%B7%A5%E7%A8%8B%E6%9E%B6%E6%9E%84/%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96/TTI.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"yamsfeer\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"TTI 可交互时间\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"TTI 可交互时间 什么是 TTI TTI ( Time to Interactive ) 可交互时间，从页面开始加载，到主要资源渲染完成并能快速响应用户输入的时间。 具体来说，可以用以下步骤测量 TTI。 从 FCP 开始 向右寻找至少 5 秒的安静窗口 ( 没有长任务且不超过两个正在处理的 GET 请求 )。 向左寻找安静窗口前的最后一个长任务，如...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:image\",\"content\":\"https://raw.githubusercontent.com/yamsfeer/pic-bed/master/TTI-acceptable-score.png\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"TTI 可交互时间\\\",\\\"image\\\":[\\\"https://raw.githubusercontent.com/yamsfeer/pic-bed/master/TTI-acceptable-score.png\\\"],\\\"dateModified\\\":null,\\\"author\\\":[]}\"]]},\"headers\":[{\"level\":2,\"title\":\"什么是 TTI\",\"slug\":\"什么是-tti\",\"link\":\"#什么是-tti\",\"children\":[{\"level\":3,\"title\":\"为什么要优化 TTI\",\"slug\":\"为什么要优化-tti\",\"link\":\"#为什么要优化-tti\",\"children\":[]}]},{\"level\":2,\"title\":\"TTI 阈值\",\"slug\":\"tti-阈值\",\"link\":\"#tti-阈值\",\"children\":[]},{\"level\":2,\"title\":\"如何测量\",\"slug\":\"如何测量\",\"link\":\"#如何测量\",\"children\":[]},{\"level\":2,\"title\":\"如何优化 TTI\",\"slug\":\"如何优化-tti\",\"link\":\"#如何优化-tti\",\"children\":[]}],\"readingTime\":{\"minutes\":1.6,\"words\":480},\"filePathRelative\":\"工程架构/性能优化/TTI.md\",\"autoDesc\":true}")
export { comp, data }

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
