import comp from "/Users/yams/github/notes-fe/.vuepress/.temp/pages/工程架构/性能优化/3.3.3.HTTP Cache.html.vue"
const data = JSON.parse("{\"path\":\"/%E5%B7%A5%E7%A8%8B%E6%9E%B6%E6%9E%84/%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96/3.3.3.HTTP%20Cache.html\",\"title\":\"HTTP Cache\",\"lang\":\"zh-CN\",\"frontmatter\":{\"description\":\"HTTP Cache HTTP Cache 会存储与 HTTP 请求关联的响应，并复用于后续请求。由于这些响应存储在磁盘上，所以又称 Disk Cache。 HTTP Cache 可以分为两种：强缓存和协商缓存。 强缓存 Expires 这是 HTTP 1.0 的响应头，表示缓存的过期时间。 Cache-control 协商缓存 If-Modified...\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://yamsfeer.github.io/notes-fe/%E5%B7%A5%E7%A8%8B%E6%9E%B6%E6%9E%84/%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96/3.3.3.HTTP%20Cache.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"yamsfeer\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"HTTP Cache\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"HTTP Cache HTTP Cache 会存储与 HTTP 请求关联的响应，并复用于后续请求。由于这些响应存储在磁盘上，所以又称 Disk Cache。 HTTP Cache 可以分为两种：强缓存和协商缓存。 强缓存 Expires 这是 HTTP 1.0 的响应头，表示缓存的过期时间。 Cache-control 协商缓存 If-Modified...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"HTTP Cache\\\",\\\"image\\\":[\\\"\\\"],\\\"dateModified\\\":null,\\\"author\\\":[]}\"]]},\"headers\":[{\"level\":2,\"title\":\"强缓存\",\"slug\":\"强缓存\",\"link\":\"#强缓存\",\"children\":[{\"level\":3,\"title\":\"Expires\",\"slug\":\"expires\",\"link\":\"#expires\",\"children\":[]},{\"level\":3,\"title\":\"Cache-control\",\"slug\":\"cache-control\",\"link\":\"#cache-control\",\"children\":[]}]},{\"level\":2,\"title\":\"协商缓存\",\"slug\":\"协商缓存\",\"link\":\"#协商缓存\",\"children\":[{\"level\":3,\"title\":\"If-Modified-Since & Last-Modified\",\"slug\":\"if-modified-since-last-modified\",\"link\":\"#if-modified-since-last-modified\",\"children\":[]},{\"level\":3,\"title\":\"If-None-match & ETag\",\"slug\":\"if-none-match-etag\",\"link\":\"#if-none-match-etag\",\"children\":[]}]},{\"level\":2,\"title\":\"参考\",\"slug\":\"参考\",\"link\":\"#参考\",\"children\":[]}],\"readingTime\":{\"minutes\":0.37,\"words\":111},\"filePathRelative\":\"工程架构/性能优化/3.3.3.HTTP Cache.md\",\"autoDesc\":true}")
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
