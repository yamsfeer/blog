import comp from "/Users/yams/github/notes-fe/.vuepress/.temp/pages/工程架构/性能优化/INP.html.vue"
const data = JSON.parse("{\"path\":\"/%E5%B7%A5%E7%A8%8B%E6%9E%B6%E6%9E%84/%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96/INP.html\",\"title\":\"INP 与下一次绘制的交互\",\"lang\":\"zh-CN\",\"frontmatter\":{\"description\":\"INP 与下一次绘制的交互 什么是 INP INP ( Interaction to Next Paint ) 与下一次绘制的交互，描述页面对用户输入的响应速度。 具体来说，INP 会收集所有交互延迟，将其中的最大值作为 INP。 INP 是在用户离开页面时计算的，它代表了页面在整个生命周期中的总体响应性。低 INP 意味着页面能够可靠地响应用户输入。...\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://yamsfeer.github.io/notes-fe/%E5%B7%A5%E7%A8%8B%E6%9E%B6%E6%9E%84/%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96/INP.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"yamsfeer\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"INP 与下一次绘制的交互\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"INP 与下一次绘制的交互 什么是 INP INP ( Interaction to Next Paint ) 与下一次绘制的交互，描述页面对用户输入的响应速度。 具体来说，INP 会收集所有交互延迟，将其中的最大值作为 INP。 INP 是在用户离开页面时计算的，它代表了页面在整个生命周期中的总体响应性。低 INP 意味着页面能够可靠地响应用户输入。...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"INP 与下一次绘制的交互\\\",\\\"image\\\":[\\\"\\\"],\\\"dateModified\\\":null,\\\"author\\\":[]}\"]]},\"headers\":[{\"level\":2,\"title\":\"什么是 INP\",\"slug\":\"什么是-inp\",\"link\":\"#什么是-inp\",\"children\":[{\"level\":3,\"title\":\"什么是交互延迟 ( interaction latency )\",\"slug\":\"什么是交互延迟-interaction-latency\",\"link\":\"#什么是交互延迟-interaction-latency\",\"children\":[]},{\"level\":3,\"title\":\"INP 中的交互类型\",\"slug\":\"inp-中的交互类型\",\"link\":\"#inp-中的交互类型\",\"children\":[]},{\"level\":3,\"title\":\"一次交互有多个事件\",\"slug\":\"一次交互有多个事件\",\"link\":\"#一次交互有多个事件\",\"children\":[]},{\"level\":3,\"title\":\"INP 与 FID 的区别\",\"slug\":\"inp-与-fid-的区别\",\"link\":\"#inp-与-fid-的区别\",\"children\":[]},{\"level\":3,\"title\":\"INP 没有报告\",\"slug\":\"inp-没有报告\",\"link\":\"#inp-没有报告\",\"children\":[]}]},{\"level\":2,\"title\":\"INP 阈值\",\"slug\":\"inp-阈值\",\"link\":\"#inp-阈值\",\"children\":[]},{\"level\":2,\"title\":\"如何测量 INP\",\"slug\":\"如何测量-inp\",\"link\":\"#如何测量-inp\",\"children\":[]},{\"level\":2,\"title\":\"如何改进 INP\",\"slug\":\"如何改进-inp\",\"link\":\"#如何改进-inp\",\"children\":[]},{\"level\":2,\"title\":\"参考\",\"slug\":\"参考\",\"link\":\"#参考\",\"children\":[]}],\"readingTime\":{\"minutes\":2.51,\"words\":753},\"filePathRelative\":\"工程架构/性能优化/INP.md\",\"autoDesc\":true}")
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
