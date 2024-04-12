import comp from "/Users/yams/github/notes-fe/.vuepress/.temp/pages/工程架构/性能优化/FID.html.vue"
const data = JSON.parse("{\"path\":\"/%E5%B7%A5%E7%A8%8B%E6%9E%B6%E6%9E%84/%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96/FID.html\",\"title\":\"FID 首次输入延迟\",\"lang\":\"zh-CN\",\"frontmatter\":{\"description\":\"FID 首次输入延迟 什么是 FID FID ( First Input Delay ) 首次输入延迟，从用户第一次与页面交互，到浏览器能开始处理的时间。 什么是输入延迟 下图是一个典型的网页加载时间轴： 示例页面加载跟踪 页面发出网络资源请求，资源下载完后，在主线程上进行处理 ( 图中黄色块 )，此时主线程处于忙碌状态，无法响应用户输入，因而产生输入...\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://yamsfeer.github.io/notes-fe/%E5%B7%A5%E7%A8%8B%E6%9E%B6%E6%9E%84/%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96/FID.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"yamsfeer\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"FID 首次输入延迟\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"FID 首次输入延迟 什么是 FID FID ( First Input Delay ) 首次输入延迟，从用户第一次与页面交互，到浏览器能开始处理的时间。 什么是输入延迟 下图是一个典型的网页加载时间轴： 示例页面加载跟踪 页面发出网络资源请求，资源下载完后，在主线程上进行处理 ( 图中黄色块 )，此时主线程处于忙碌状态，无法响应用户输入，因而产生输入...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:image\",\"content\":\"https://raw.githubusercontent.com/yamsfeer/pic-bed/master/9tm3f6pwlHMqNKuFvaP0.svg\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"FID 首次输入延迟\\\",\\\"image\\\":[\\\"https://raw.githubusercontent.com/yamsfeer/pic-bed/master/9tm3f6pwlHMqNKuFvaP0.svg\\\",\\\"https://raw.githubusercontent.com/yamsfeer/pic-bed/master/24Y3T5sWNuZD9fKhkuER.svg\\\",\\\"https://raw.githubusercontent.com/yamsfeer/pic-bed/master/krOoeuQ4TWCbt9t6v5Wf.svg\\\"],\\\"dateModified\\\":null,\\\"author\\\":[]}\"]]},\"headers\":[{\"level\":2,\"title\":\"什么是 FID\",\"slug\":\"什么是-fid\",\"link\":\"#什么是-fid\",\"children\":[]},{\"level\":2,\"title\":\"什么是输入延迟\",\"slug\":\"什么是输入延迟\",\"link\":\"#什么是输入延迟\",\"children\":[{\"level\":3,\"title\":\"如果交互没有事件监听器\",\"slug\":\"如果交互没有事件监听器\",\"link\":\"#如果交互没有事件监听器\",\"children\":[]},{\"level\":3,\"title\":\"为什么只考虑首次输入\",\"slug\":\"为什么只考虑首次输入\",\"link\":\"#为什么只考虑首次输入\",\"children\":[]},{\"level\":3,\"title\":\"FID 的输入类型\",\"slug\":\"fid-的输入类型\",\"link\":\"#fid-的输入类型\",\"children\":[]}]},{\"level\":2,\"title\":\"FID 阈值\",\"slug\":\"fid-阈值\",\"link\":\"#fid-阈值\",\"children\":[]},{\"level\":2,\"title\":\"如何测量 FID\",\"slug\":\"如何测量-fid\",\"link\":\"#如何测量-fid\",\"children\":[]},{\"level\":2,\"title\":\"如何改进 FID\",\"slug\":\"如何改进-fid\",\"link\":\"#如何改进-fid\",\"children\":[]}],\"readingTime\":{\"minutes\":2.16,\"words\":647},\"filePathRelative\":\"工程架构/性能优化/FID.md\",\"autoDesc\":true}")
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
