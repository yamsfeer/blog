import comp from "/Users/yams/github/notes-fe/.vuepress/.temp/pages/工程架构/性能优化/TTFB.html.vue"
const data = JSON.parse("{\"path\":\"/%E5%B7%A5%E7%A8%8B%E6%9E%B6%E6%9E%84/%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96/TTFB.html\",\"title\":\"TTFB 第一字节时间\",\"lang\":\"zh-CN\",\"frontmatter\":{\"description\":\"TTFB 第一字节时间 什么是 TTFB TTFB ( Time to First Byte ) 第一字节时间，从资源请求开始到第一个字节到达的时间。 上图中 startTime 到 responseStart 的时间就是 TTFB。 具体来说，TTFB 包含以下时间损耗： Redirect 重定向 Service worker 启动 DNS 查询 建...\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://yamsfeer.github.io/notes-fe/%E5%B7%A5%E7%A8%8B%E6%9E%B6%E6%9E%84/%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96/TTFB.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"yamsfeer\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"TTFB 第一字节时间\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"TTFB 第一字节时间 什么是 TTFB TTFB ( Time to First Byte ) 第一字节时间，从资源请求开始到第一个字节到达的时间。 上图中 startTime 到 responseStart 的时间就是 TTFB。 具体来说，TTFB 包含以下时间损耗： Redirect 重定向 Service worker 启动 DNS 查询 建...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:image\",\"content\":\"https://raw.githubusercontent.com/yamsfeer/pic-bed/master/timestamp-diagram.svg\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"TTFB 第一字节时间\\\",\\\"image\\\":[\\\"https://raw.githubusercontent.com/yamsfeer/pic-bed/master/timestamp-diagram.svg\\\"],\\\"dateModified\\\":null,\\\"author\\\":[]}\"]]},\"headers\":[{\"level\":2,\"title\":\"什么是 TTFB\",\"slug\":\"什么是-ttfb\",\"link\":\"#什么是-ttfb\",\"children\":[]},{\"level\":2,\"title\":\"TTFB 阈值\",\"slug\":\"ttfb-阈值\",\"link\":\"#ttfb-阈值\",\"children\":[]},{\"level\":2,\"title\":\"如何测量 TTFB\",\"slug\":\"如何测量-ttfb\",\"link\":\"#如何测量-ttfb\",\"children\":[{\"level\":3,\"title\":\"测量资源请求\",\"slug\":\"测量资源请求\",\"link\":\"#测量资源请求\",\"children\":[]}]},{\"level\":2,\"title\":\"如何优化 TTFB\",\"slug\":\"如何优化-ttfb\",\"link\":\"#如何优化-ttfb\",\"children\":[]}],\"readingTime\":{\"minutes\":1.38,\"words\":415},\"filePathRelative\":\"工程架构/性能优化/TTFB.md\",\"autoDesc\":true}")
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
