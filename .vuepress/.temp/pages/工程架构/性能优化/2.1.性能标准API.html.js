import comp from "/Users/yams/github/notes-fe/.vuepress/.temp/pages/工程架构/性能优化/2.1.性能标准API.html.vue"
const data = JSON.parse("{\"path\":\"/%E5%B7%A5%E7%A8%8B%E6%9E%B6%E6%9E%84/%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96/2.1.%E6%80%A7%E8%83%BD%E6%A0%87%E5%87%86API.html\",\"title\":\"性能标准API\",\"lang\":\"zh-CN\",\"frontmatter\":{\"description\":\"性能标准API 有时候，我们需要自定义指标，比如： 单页应用程序 ( SPA ) 页面切换需要多长时间 页面针对登录用户显示从数据库获取的数据需要多长时间 服务器端渲染 ( SSR ) 需要多长时间才能注水 回访者加载资源的缓存命中率 游戏中点击或键盘事件的事件延迟 Web 性能工作组推出了一系列较底层的标准化 API，用于实现自定义指标。 Perfo...\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://yamsfeer.github.io/notes-fe/%E5%B7%A5%E7%A8%8B%E6%9E%B6%E6%9E%84/%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96/2.1.%E6%80%A7%E8%83%BD%E6%A0%87%E5%87%86API.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"yamsfeer\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"性能标准API\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"性能标准API 有时候，我们需要自定义指标，比如： 单页应用程序 ( SPA ) 页面切换需要多长时间 页面针对登录用户显示从数据库获取的数据需要多长时间 服务器端渲染 ( SSR ) 需要多长时间才能注水 回访者加载资源的缓存命中率 游戏中点击或键盘事件的事件延迟 Web 性能工作组推出了一系列较底层的标准化 API，用于实现自定义指标。 Perfo...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"性能标准API\\\",\\\"image\\\":[\\\"\\\"],\\\"dateModified\\\":null,\\\"author\\\":[]}\"]]},\"headers\":[{\"level\":2,\"title\":\"PerformanceObserver\",\"slug\":\"performanceobserver\",\"link\":\"#performanceobserver\",\"children\":[{\"level\":3,\"title\":\"旧版性能 API\",\"slug\":\"旧版性能-api\",\"link\":\"#旧版性能-api\",\"children\":[]}]},{\"level\":2,\"title\":\"性能标准 API\",\"slug\":\"性能标准-api\",\"link\":\"#性能标准-api\",\"children\":[{\"level\":3,\"title\":\"User Timing API\",\"slug\":\"user-timing-api\",\"link\":\"#user-timing-api\",\"children\":[]},{\"level\":3,\"title\":\"Long Tasks API\",\"slug\":\"long-tasks-api\",\"link\":\"#long-tasks-api\",\"children\":[]},{\"level\":3,\"title\":\"Element Timing API\",\"slug\":\"element-timing-api\",\"link\":\"#element-timing-api\",\"children\":[]},{\"level\":3,\"title\":\"Event Timing API\",\"slug\":\"event-timing-api\",\"link\":\"#event-timing-api\",\"children\":[]},{\"level\":3,\"title\":\"Resource Timing API\",\"slug\":\"resource-timing-api\",\"link\":\"#resource-timing-api\",\"children\":[]},{\"level\":3,\"title\":\"Navigation Timing API\",\"slug\":\"navigation-timing-api\",\"link\":\"#navigation-timing-api\",\"children\":[]},{\"level\":3,\"title\":\"Server Timing API\",\"slug\":\"server-timing-api\",\"link\":\"#server-timing-api\",\"children\":[]}]}],\"readingTime\":{\"minutes\":4.82,\"words\":1445},\"filePathRelative\":\"工程架构/性能优化/2.1.性能标准API.md\",\"autoDesc\":true}")
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
