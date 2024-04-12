import comp from "/Users/yams/github/notes-fe/.vuepress/.temp/pages/工程架构/性能优化/2.2.2.优化FID.html.vue"
const data = JSON.parse("{\"path\":\"/%E5%B7%A5%E7%A8%8B%E6%9E%B6%E6%9E%84/%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96/2.2.2.%E4%BC%98%E5%8C%96FID.html\",\"title\":\"优化FID\",\"lang\":\"zh-CN\",\"frontmatter\":{\"description\":\"优化FID FID 延迟主要是由繁重的 JavaScript 导致的，主线程执行 JavaScript 时无法对用户输入作出响应。 优化 JavaScript 的解析、编译和执行将直接降低 FID。 分割长任务 执行时间 50ms 以上的任务称为长任务，将长任务分割为更小的任务可以有效减小 FID。 使用 Web Worker Web Worker 能...\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://yamsfeer.github.io/notes-fe/%E5%B7%A5%E7%A8%8B%E6%9E%B6%E6%9E%84/%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96/2.2.2.%E4%BC%98%E5%8C%96FID.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"yamsfeer\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"优化FID\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"优化FID FID 延迟主要是由繁重的 JavaScript 导致的，主线程执行 JavaScript 时无法对用户输入作出响应。 优化 JavaScript 的解析、编译和执行将直接降低 FID。 分割长任务 执行时间 50ms 以上的任务称为长任务，将长任务分割为更小的任务可以有效减小 FID。 使用 Web Worker Web Worker 能...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"优化FID\\\",\\\"image\\\":[\\\"\\\"],\\\"dateModified\\\":null,\\\"author\\\":[]}\"]]},\"headers\":[{\"level\":2,\"title\":\"分割长任务\",\"slug\":\"分割长任务\",\"link\":\"#分割长任务\",\"children\":[]},{\"level\":2,\"title\":\"使用 Web Worker\",\"slug\":\"使用-web-worker\",\"link\":\"#使用-web-worker\",\"children\":[]},{\"level\":2,\"title\":\"减少 JavaScript 执行时间\",\"slug\":\"减少-javascript-执行时间\",\"link\":\"#减少-javascript-执行时间\",\"children\":[]}],\"readingTime\":{\"minutes\":0.96,\"words\":287},\"filePathRelative\":\"工程架构/性能优化/2.2.2.优化FID.md\",\"autoDesc\":true}")
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
