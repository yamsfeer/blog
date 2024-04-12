import comp from "/Users/yams/github/notes-fe/.vuepress/.temp/pages/工程架构/性能优化/3.5.1.渲染.html.vue"
const data = JSON.parse("{\"path\":\"/%E5%B7%A5%E7%A8%8B%E6%9E%B6%E6%9E%84/%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96/3.5.1.%E6%B8%B2%E6%9F%93.html\",\"title\":\"对渲染的性能优化\",\"lang\":\"zh-CN\",\"frontmatter\":{\"description\":\"对渲染的性能优化 布局 所谓布局 ( layout ) 就是浏览器计算元素几何信息，即页面中元素的大小和位置。 布局是非常耗时的，因为布局几乎总是针对整个文档，文档的元素越多，所需时间越长。因此，我们需要减少不必要的 layout 操作。 下面是几种不必要的 layout 操作，应尽量避免。 强制同步布局 在获取 offsetLeft、offsetTo...\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://yamsfeer.github.io/notes-fe/%E5%B7%A5%E7%A8%8B%E6%9E%B6%E6%9E%84/%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96/3.5.1.%E6%B8%B2%E6%9F%93.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"yamsfeer\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"对渲染的性能优化\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"对渲染的性能优化 布局 所谓布局 ( layout ) 就是浏览器计算元素几何信息，即页面中元素的大小和位置。 布局是非常耗时的，因为布局几乎总是针对整个文档，文档的元素越多，所需时间越长。因此，我们需要减少不必要的 layout 操作。 下面是几种不必要的 layout 操作，应尽量避免。 强制同步布局 在获取 offsetLeft、offsetTo...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"对渲染的性能优化\\\",\\\"image\\\":[\\\"\\\"],\\\"dateModified\\\":null,\\\"author\\\":[]}\"]]},\"headers\":[{\"level\":2,\"title\":\"布局\",\"slug\":\"布局\",\"link\":\"#布局\",\"children\":[{\"level\":3,\"title\":\"强制同步布局\",\"slug\":\"强制同步布局\",\"link\":\"#强制同步布局\",\"children\":[]},{\"level\":3,\"title\":\"layout trashing\",\"slug\":\"layout-trashing\",\"link\":\"#layout-trashing\",\"children\":[]}]},{\"level\":2,\"title\":\"参考\",\"slug\":\"参考\",\"link\":\"#参考\",\"children\":[]}],\"readingTime\":{\"minutes\":0.84,\"words\":251},\"filePathRelative\":\"工程架构/性能优化/3.5.1.渲染.md\",\"autoDesc\":true}")
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
