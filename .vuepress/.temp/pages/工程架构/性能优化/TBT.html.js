import comp from "/Users/yams/github/notes-fe/.vuepress/.temp/pages/工程架构/性能优化/TBT.html.vue"
const data = JSON.parse("{\"path\":\"/%E5%B7%A5%E7%A8%8B%E6%9E%B6%E6%9E%84/%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96/TBT.html\",\"title\":\"TBT 总阻塞时间\",\"lang\":\"zh-CN\",\"frontmatter\":{\"description\":\"TBT 总阻塞时间 主线程上运行超过 50ms 的任务称为长任务，超出 50ms 的部分称为任务的阻塞时间。 TBT ( Total Blocking Time ) 总阻塞时间，FCP 到 TTI 之间，所有长任务的阻塞时间之和。 什么是 TBT 执行长任务时，主线程处于阻塞状态。在阻塞状态下交互，浏览器必须等到任务完成后才能作出响应。响应时间超过 5...\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://yamsfeer.github.io/notes-fe/%E5%B7%A5%E7%A8%8B%E6%9E%B6%E6%9E%84/%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96/TBT.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"yamsfeer\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"TBT 总阻塞时间\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"TBT 总阻塞时间 主线程上运行超过 50ms 的任务称为长任务，超出 50ms 的部分称为任务的阻塞时间。 TBT ( Total Blocking Time ) 总阻塞时间，FCP 到 TTI 之间，所有长任务的阻塞时间之和。 什么是 TBT 执行长任务时，主线程处于阻塞状态。在阻塞状态下交互，浏览器必须等到任务完成后才能作出响应。响应时间超过 5...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:image\",\"content\":\"https://raw.githubusercontent.com/yamsfeer/pic-bed/master/clHG8Yv239lXsGWD6Iu6.svg\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"TBT 总阻塞时间\\\",\\\"image\\\":[\\\"https://raw.githubusercontent.com/yamsfeer/pic-bed/master/clHG8Yv239lXsGWD6Iu6.svg\\\",\\\"https://raw.githubusercontent.com/yamsfeer/pic-bed/master/xKxwKagiz8RliuOI2Xtc.svg\\\",\\\"https://raw.githubusercontent.com/yamsfeer/pic-bed/master/tbt_ux.svg\\\"],\\\"dateModified\\\":null,\\\"author\\\":[]}\"]]},\"headers\":[{\"level\":2,\"title\":\"什么是 TBT\",\"slug\":\"什么是-tbt\",\"link\":\"#什么是-tbt\",\"children\":[{\"level\":3,\"title\":\"TBT 与 TTI 有什么关系\",\"slug\":\"tbt-与-tti-有什么关系\",\"link\":\"#tbt-与-tti-有什么关系\",\"children\":[]}]},{\"level\":2,\"title\":\"TBT 阈值\",\"slug\":\"tbt-阈值\",\"link\":\"#tbt-阈值\",\"children\":[]},{\"level\":2,\"title\":\"如何测量 TBT\",\"slug\":\"如何测量-tbt\",\"link\":\"#如何测量-tbt\",\"children\":[]},{\"level\":2,\"title\":\"如何改进 TBT\",\"slug\":\"如何改进-tbt\",\"link\":\"#如何改进-tbt\",\"children\":[]}],\"readingTime\":{\"minutes\":1.45,\"words\":435},\"filePathRelative\":\"工程架构/性能优化/TBT.md\",\"autoDesc\":true}")
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
