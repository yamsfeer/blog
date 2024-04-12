import comp from "/Users/yams/github/notes-fe/.vuepress/.temp/pages/工程架构/性能优化/LCP.html.vue"
const data = JSON.parse("{\"path\":\"/%E5%B7%A5%E7%A8%8B%E6%9E%B6%E6%9E%84/%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96/LCP.html\",\"title\":\"LCP 最大内容绘制\",\"lang\":\"zh-CN\",\"frontmatter\":{\"description\":\"LCP 最大内容绘制 对开发者来说，测量网页主要内容的加载速度并不容易。 load 或 DOMContentLoaded 事件不一定与用户在屏幕上看到的内容相对应 FCP 只捕获加载最开始的部分，那可能只是启动画面或加载指示。 FMP 和 SI 可以捕获到初始绘制之后的加载，但它们十分复杂且经常出错。 根据 W3C Web 性能工作组 的研究，最大元素...\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://yamsfeer.github.io/notes-fe/%E5%B7%A5%E7%A8%8B%E6%9E%B6%E6%9E%84/%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96/LCP.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"yamsfeer\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"LCP 最大内容绘制\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"LCP 最大内容绘制 对开发者来说，测量网页主要内容的加载速度并不容易。 load 或 DOMContentLoaded 事件不一定与用户在屏幕上看到的内容相对应 FCP 只捕获加载最开始的部分，那可能只是启动画面或加载指示。 FMP 和 SI 可以捕获到初始绘制之后的加载，但它们十分复杂且经常出错。 根据 W3C Web 性能工作组 的研究，最大元素...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"LCP 最大内容绘制\\\",\\\"image\\\":[\\\"\\\"],\\\"dateModified\\\":null,\\\"author\\\":[]}\"]]},\"headers\":[{\"level\":2,\"title\":\"什么是 LCP\",\"slug\":\"什么是-lcp\",\"link\":\"#什么是-lcp\",\"children\":[{\"level\":3,\"title\":\"哪些元素在考量范围内\",\"slug\":\"哪些元素在考量范围内\",\"link\":\"#哪些元素在考量范围内\",\"children\":[]},{\"level\":3,\"title\":\"如何确定一个元素的大小\",\"slug\":\"如何确定一个元素的大小\",\"link\":\"#如何确定一个元素的大小\",\"children\":[]},{\"level\":3,\"title\":\"何时报告 LCP\",\"slug\":\"何时报告-lcp\",\"link\":\"#何时报告-lcp\",\"children\":[]},{\"level\":3,\"title\":\"如何处理元素布局和元素大小改变\",\"slug\":\"如何处理元素布局和元素大小改变\",\"link\":\"#如何处理元素布局和元素大小改变\",\"children\":[]}]},{\"level\":2,\"title\":\"LCP 阈值\",\"slug\":\"lcp-阈值\",\"link\":\"#lcp-阈值\",\"children\":[]},{\"level\":2,\"title\":\"如何测量 LCP\",\"slug\":\"如何测量-lcp\",\"link\":\"#如何测量-lcp\",\"children\":[{\"level\":3,\"title\":\"如果最大元素并非最重要元素\",\"slug\":\"如果最大元素并非最重要元素\",\"link\":\"#如果最大元素并非最重要元素\",\"children\":[]}]},{\"level\":2,\"title\":\"如何改进 LCP\",\"slug\":\"如何改进-lcp\",\"link\":\"#如何改进-lcp\",\"children\":[]}],\"readingTime\":{\"minutes\":3.36,\"words\":1007},\"filePathRelative\":\"工程架构/性能优化/LCP.md\",\"autoDesc\":true}")
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
