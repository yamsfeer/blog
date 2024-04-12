import comp from "/Users/yams/github/notes-fe/.vuepress/.temp/pages/工程架构/性能优化/2.2.4.优化INP.html.vue"
const data = JSON.parse("{\"path\":\"/%E5%B7%A5%E7%A8%8B%E6%9E%B6%E6%9E%84/%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96/2.2.4.%E4%BC%98%E5%8C%96INP.html\",\"title\":\"优化 INP\",\"lang\":\"zh-CN\",\"frontmatter\":{\"description\":\"优化 INP 在优化 INP 之前，我们需要收集导致 INP 值高的交互的详细信息。 真实用户监测 ( Real User Monitoring, RUM ) 数据不仅提供 INP 值，还提供上下文数据。比如 INP 是由哪些交互引起的、交互是在页面加载期间还是之后发生、交互类型是 click、keydown 还是 tap 等。 优化 交互延迟由三部分...\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://yamsfeer.github.io/notes-fe/%E5%B7%A5%E7%A8%8B%E6%9E%B6%E6%9E%84/%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96/2.2.4.%E4%BC%98%E5%8C%96INP.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"yamsfeer\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"优化 INP\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"优化 INP 在优化 INP 之前，我们需要收集导致 INP 值高的交互的详细信息。 真实用户监测 ( Real User Monitoring, RUM ) 数据不仅提供 INP 值，还提供上下文数据。比如 INP 是由哪些交互引起的、交互是在页面加载期间还是之后发生、交互类型是 click、keydown 还是 tap 等。 优化 交互延迟由三部分...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:image\",\"content\":\"https://raw.githubusercontent.com/yamsfeer/pic-bed/master/Ng0j5yaGYZX9Bm3VQ70c.svg\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"优化 INP\\\",\\\"image\\\":[\\\"https://raw.githubusercontent.com/yamsfeer/pic-bed/master/Ng0j5yaGYZX9Bm3VQ70c.svg\\\",\\\"https://raw.githubusercontent.com/yamsfeer/pic-bed/master/Me4oU1cqMPOqEaEg2XAP.svg\\\",\\\"https://raw.githubusercontent.com/yamsfeer/pic-bed/master/06CXJcBsqO6kdj1Bjml7.png\\\"],\\\"dateModified\\\":null,\\\"author\\\":[]}\"]]},\"headers\":[{\"level\":2,\"title\":\"优化\",\"slug\":\"优化\",\"link\":\"#优化\",\"children\":[{\"level\":3,\"title\":\"减少输入延迟\",\"slug\":\"减少输入延迟\",\"link\":\"#减少输入延迟\",\"children\":[]},{\"level\":3,\"title\":\"优化事件回调\",\"slug\":\"优化事件回调\",\"link\":\"#优化事件回调\",\"children\":[]},{\"level\":3,\"title\":\"减少呈现延迟\",\"slug\":\"减少呈现延迟\",\"link\":\"#减少呈现延迟\",\"children\":[]}]},{\"level\":2,\"title\":\"总结\",\"slug\":\"总结\",\"link\":\"#总结\",\"children\":[]},{\"level\":2,\"title\":\"参考\",\"slug\":\"参考\",\"link\":\"#参考\",\"children\":[]}],\"readingTime\":{\"minutes\":2.92,\"words\":875},\"filePathRelative\":\"工程架构/性能优化/2.2.4.优化INP.md\",\"autoDesc\":true}")
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
