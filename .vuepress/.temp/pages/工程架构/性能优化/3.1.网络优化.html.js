import comp from "/Users/yams/github/notes-fe/.vuepress/.temp/pages/工程架构/性能优化/3.1.网络优化.html.vue"
const data = JSON.parse("{\"path\":\"/%E5%B7%A5%E7%A8%8B%E6%9E%B6%E6%9E%84/%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96/3.1.%E7%BD%91%E7%BB%9C%E4%BC%98%E5%8C%96.html\",\"title\":\"网络优化\",\"lang\":\"zh-CN\",\"frontmatter\":{\"description\":\"网络优化 http2 http2 并发 浏览器在同一时间对同一域名下的资源的并发请求数是有限的，一般在 2-6 之间，超过限制数的请求会被阻塞，chrome 对 HTTP1.1 最大并发连接数为 6。 http2 一个站点只有一个连接。每个请求为一个流，每个请求被分为多个二进制帧，不同流中的帧可以交错的发送，实现多路复用。这解决了连接数限制的问题。 h...\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://yamsfeer.github.io/notes-fe/%E5%B7%A5%E7%A8%8B%E6%9E%B6%E6%9E%84/%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96/3.1.%E7%BD%91%E7%BB%9C%E4%BC%98%E5%8C%96.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"yamsfeer\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"网络优化\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"网络优化 http2 http2 并发 浏览器在同一时间对同一域名下的资源的并发请求数是有限的，一般在 2-6 之间，超过限制数的请求会被阻塞，chrome 对 HTTP1.1 最大并发连接数为 6。 http2 一个站点只有一个连接。每个请求为一个流，每个请求被分为多个二进制帧，不同流中的帧可以交错的发送，实现多路复用。这解决了连接数限制的问题。 h...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"网络优化\\\",\\\"image\\\":[\\\"\\\"],\\\"dateModified\\\":null,\\\"author\\\":[]}\"]]},\"headers\":[{\"level\":2,\"title\":\"http2\",\"slug\":\"http2\",\"link\":\"#http2\",\"children\":[{\"level\":3,\"title\":\"http2 并发\",\"slug\":\"http2-并发\",\"link\":\"#http2-并发\",\"children\":[]},{\"level\":3,\"title\":\"http2 推送\",\"slug\":\"http2-推送\",\"link\":\"#http2-推送\",\"children\":[]},{\"level\":3,\"title\":\"https\",\"slug\":\"https\",\"link\":\"#https\",\"children\":[]}]},{\"level\":2,\"title\":\"preconnect\",\"slug\":\"preconnect\",\"link\":\"#preconnect\",\"children\":[{\"level\":3,\"title\":\"http preconnect\",\"slug\":\"http-preconnect\",\"link\":\"#http-preconnect\",\"children\":[]},{\"level\":3,\"title\":\"crossorigin\",\"slug\":\"crossorigin\",\"link\":\"#crossorigin\",\"children\":[]}]},{\"level\":2,\"title\":\"DNS prefetch\",\"slug\":\"dns-prefetch\",\"link\":\"#dns-prefetch\",\"children\":[]},{\"level\":2,\"title\":\"brotil 压缩\",\"slug\":\"brotil-压缩\",\"link\":\"#brotil-压缩\",\"children\":[]},{\"level\":2,\"title\":\"CDN\",\"slug\":\"cdn\",\"link\":\"#cdn\",\"children\":[]},{\"level\":2,\"title\":\"参考\",\"slug\":\"参考\",\"link\":\"#参考\",\"children\":[]}],\"readingTime\":{\"minutes\":2.83,\"words\":849},\"filePathRelative\":\"工程架构/性能优化/3.1.网络优化.md\",\"autoDesc\":true}")
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
