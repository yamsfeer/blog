import comp from "/Users/yams/github/notes-fe/.vuepress/.temp/pages/工程架构/性能优化/3.2.3.延迟加载.html.vue"
const data = JSON.parse("{\"path\":\"/%E5%B7%A5%E7%A8%8B%E6%9E%B6%E6%9E%84/%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96/3.2.3.%E5%BB%B6%E8%BF%9F%E5%8A%A0%E8%BD%BD.html\",\"title\":\"延迟加载\",\"lang\":\"zh-CN\",\"frontmatter\":{\"description\":\"延迟加载 延迟加载 JavaScript 浏览器解析 HTML 时遇到 script 标签，就会暂停构建 DOM，转而下载并执行 JavaScript，执行完成后，继续处理剩余页面。也就是说，script 会阻塞 HTML 的解析过程。 将 script 放在页面底部虽然可以解决但是并不完美，因为浏览器只有在解析了全部 HTML 之后才会获知 scri...\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://yamsfeer.github.io/notes-fe/%E5%B7%A5%E7%A8%8B%E6%9E%B6%E6%9E%84/%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96/3.2.3.%E5%BB%B6%E8%BF%9F%E5%8A%A0%E8%BD%BD.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"yamsfeer\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"延迟加载\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"延迟加载 延迟加载 JavaScript 浏览器解析 HTML 时遇到 script 标签，就会暂停构建 DOM，转而下载并执行 JavaScript，执行完成后，继续处理剩余页面。也就是说，script 会阻塞 HTML 的解析过程。 将 script 放在页面底部虽然可以解决但是并不完美，因为浏览器只有在解析了全部 HTML 之后才会获知 scri...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"延迟加载\\\",\\\"image\\\":[\\\"\\\"],\\\"dateModified\\\":null,\\\"author\\\":[]}\"]]},\"headers\":[{\"level\":2,\"title\":\"延迟加载 JavaScript\",\"slug\":\"延迟加载-javascript\",\"link\":\"#延迟加载-javascript\",\"children\":[{\"level\":3,\"title\":\"defer\",\"slug\":\"defer\",\"link\":\"#defer\",\"children\":[]},{\"level\":3,\"title\":\"async\",\"slug\":\"async\",\"link\":\"#async\",\"children\":[]},{\"level\":3,\"title\":\"动态脚本\",\"slug\":\"动态脚本\",\"link\":\"#动态脚本\",\"children\":[]},{\"level\":3,\"title\":\"总结\",\"slug\":\"总结\",\"link\":\"#总结\",\"children\":[]}]},{\"level\":2,\"title\":\"延迟加载图片\",\"slug\":\"延迟加载图片\",\"link\":\"#延迟加载图片\",\"children\":[]},{\"level\":2,\"title\":\"参考\",\"slug\":\"参考\",\"link\":\"#参考\",\"children\":[]}],\"readingTime\":{\"minutes\":2.78,\"words\":835},\"filePathRelative\":\"工程架构/性能优化/3.2.3.延迟加载.md\",\"autoDesc\":true}")
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
