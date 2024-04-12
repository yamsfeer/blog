import comp from "/Users/yams/github/notes-fe/.vuepress/.temp/pages/工程架构/性能优化/3.3.资源缓存.html.vue"
const data = JSON.parse("{\"path\":\"/%E5%B7%A5%E7%A8%8B%E6%9E%B6%E6%9E%84/%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96/3.3.%E8%B5%84%E6%BA%90%E7%BC%93%E5%AD%98.html\",\"title\":\"资源缓存\",\"lang\":\"zh-CN\",\"frontmatter\":{\"description\":\"资源缓存 浏览器有 4 级缓存，按优先级排列如下： Service Worker Cache Memory Cache HTTP Cache ( Disk Cache ) Push Cache 如果缓存命中，则使用缓存资源，否则发起 http 请求。\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://yamsfeer.github.io/notes-fe/%E5%B7%A5%E7%A8%8B%E6%9E%B6%E6%9E%84/%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96/3.3.%E8%B5%84%E6%BA%90%E7%BC%93%E5%AD%98.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"yamsfeer\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"资源缓存\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"资源缓存 浏览器有 4 级缓存，按优先级排列如下： Service Worker Cache Memory Cache HTTP Cache ( Disk Cache ) Push Cache 如果缓存命中，则使用缓存资源，否则发起 http 请求。\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"资源缓存\\\",\\\"image\\\":[\\\"\\\"],\\\"dateModified\\\":null,\\\"author\\\":[]}\"]]},\"headers\":[],\"readingTime\":{\"minutes\":0.18,\"words\":55},\"filePathRelative\":\"工程架构/性能优化/3.3.资源缓存.md\",\"autoDesc\":true}")
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
