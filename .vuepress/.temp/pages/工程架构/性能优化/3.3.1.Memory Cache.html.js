import comp from "/Users/yams/github/notes-fe/.vuepress/.temp/pages/工程架构/性能优化/3.3.1.Memory Cache.html.vue"
const data = JSON.parse("{\"path\":\"/%E5%B7%A5%E7%A8%8B%E6%9E%B6%E6%9E%84/%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96/3.3.1.Memory%20Cache.html\",\"title\":\"Memory Cache\",\"lang\":\"zh-CN\",\"frontmatter\":{\"description\":\"Memory Cache memory cache 就是指内存中的缓存。几乎所有的请求资源都能进入 memory cache，下面介绍 preload cache 和 bfcache。 preload cache 预加载的资源会进入 memory cache 中，而预加载的几种方式前面已经介绍过，包括浏览器本身的 preload scanner 和用户...\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://yamsfeer.github.io/notes-fe/%E5%B7%A5%E7%A8%8B%E6%9E%B6%E6%9E%84/%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96/3.3.1.Memory%20Cache.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"yamsfeer\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"Memory Cache\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"Memory Cache memory cache 就是指内存中的缓存。几乎所有的请求资源都能进入 memory cache，下面介绍 preload cache 和 bfcache。 preload cache 预加载的资源会进入 memory cache 中，而预加载的几种方式前面已经介绍过，包括浏览器本身的 preload scanner 和用户...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:image\",\"content\":\"https://raw.githubusercontent.com/yamsfeer/pic-bed/master/Page-Lifecycle.svg\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"Memory Cache\\\",\\\"image\\\":[\\\"https://raw.githubusercontent.com/yamsfeer/pic-bed/master/Page-Lifecycle.svg\\\"],\\\"dateModified\\\":null,\\\"author\\\":[]}\"]]},\"headers\":[{\"level\":2,\"title\":\"preload cache\",\"slug\":\"preload-cache\",\"link\":\"#preload-cache\",\"children\":[]},{\"level\":2,\"title\":\"BFCache\",\"slug\":\"bfcache\",\"link\":\"#bfcache\",\"children\":[{\"level\":3,\"title\":\"监听 bfcache\",\"slug\":\"监听-bfcache\",\"link\":\"#监听-bfcache\",\"children\":[]},{\"level\":3,\"title\":\"优化 bfcache\",\"slug\":\"优化-bfcache\",\"link\":\"#优化-bfcache\",\"children\":[]},{\"level\":3,\"title\":\"测量 bfcache 命中率\",\"slug\":\"测量-bfcache-命中率\",\"link\":\"#测量-bfcache-命中率\",\"children\":[]},{\"level\":3,\"title\":\"bfcache 对性能指标的影响\",\"slug\":\"bfcache-对性能指标的影响\",\"link\":\"#bfcache-对性能指标的影响\",\"children\":[]}]},{\"level\":2,\"title\":\"参考\",\"slug\":\"参考\",\"link\":\"#参考\",\"children\":[]}],\"readingTime\":{\"minutes\":4.77,\"words\":1432},\"filePathRelative\":\"工程架构/性能优化/3.3.1.Memory Cache.md\",\"autoDesc\":true}")
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
