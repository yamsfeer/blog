import comp from "/Users/yams/github/notes-fe/.vuepress/.temp/pages/工程架构/性能优化/CLS.html.vue"
const data = JSON.parse("{\"path\":\"/%E5%B7%A5%E7%A8%8B%E6%9E%B6%E6%9E%84/%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96/CLS.html\",\"title\":\"CLS 累积布局偏移\",\"lang\":\"zh-CN\",\"frontmatter\":{\"description\":\"CLS 累积布局偏移 CLS ( Cumulative Layout Shift ) 累积布局偏移。 理解 CLS 前需要介绍三个概念： 布局偏移 ( layout shift )：可见元素的起始位置在两帧之间发生改变 会话窗口 ( session window )：连续的布局偏移，每次偏移相隔不超过 1s，整个窗口不超过 5s。 最大窗口：布局偏移分...\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://yamsfeer.github.io/notes-fe/%E5%B7%A5%E7%A8%8B%E6%9E%B6%E6%9E%84/%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96/CLS.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"yamsfeer\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"CLS 累积布局偏移\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"CLS 累积布局偏移 CLS ( Cumulative Layout Shift ) 累积布局偏移。 理解 CLS 前需要介绍三个概念： 布局偏移 ( layout shift )：可见元素的起始位置在两帧之间发生改变 会话窗口 ( session window )：连续的布局偏移，每次偏移相隔不超过 1s，整个窗口不超过 5s。 最大窗口：布局偏移分...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"CLS 累积布局偏移\\\",\\\"image\\\":[\\\"\\\"],\\\"dateModified\\\":null,\\\"author\\\":[]}\"]]},\"headers\":[{\"level\":2,\"title\":\"什么是布局偏移 ( layout shift )\",\"slug\":\"什么是布局偏移-layout-shift\",\"link\":\"#什么是布局偏移-layout-shift\",\"children\":[]},{\"level\":2,\"title\":\"如何计算布局偏移\",\"slug\":\"如何计算布局偏移\",\"link\":\"#如何计算布局偏移\",\"children\":[{\"level\":3,\"title\":\"影响分数 ( Impact fraction )\",\"slug\":\"影响分数-impact-fraction\",\"link\":\"#影响分数-impact-fraction\",\"children\":[]},{\"level\":3,\"title\":\"距离分数 ( Distance fraction )\",\"slug\":\"距离分数-distance-fraction\",\"link\":\"#距离分数-distance-fraction\",\"children\":[]},{\"level\":3,\"title\":\"动态添加 DOM 元素\",\"slug\":\"动态添加-dom-元素\",\"link\":\"#动态添加-dom-元素\",\"children\":[]},{\"level\":3,\"title\":\"多个不稳定元素\",\"slug\":\"多个不稳定元素\",\"link\":\"#多个不稳定元素\",\"children\":[]},{\"level\":3,\"title\":\"预期布局偏移与意外布局偏移\",\"slug\":\"预期布局偏移与意外布局偏移\",\"link\":\"#预期布局偏移与意外布局偏移\",\"children\":[]}]},{\"level\":2,\"title\":\"CLS 阈值\",\"slug\":\"cls-阈值\",\"link\":\"#cls-阈值\",\"children\":[]},{\"level\":2,\"title\":\"如何测量 CLS\",\"slug\":\"如何测量-cls\",\"link\":\"#如何测量-cls\",\"children\":[]},{\"level\":2,\"title\":\"如何改进 CLS\",\"slug\":\"如何改进-cls\",\"link\":\"#如何改进-cls\",\"children\":[]}],\"readingTime\":{\"minutes\":5.41,\"words\":1622},\"filePathRelative\":\"工程架构/性能优化/CLS.md\",\"autoDesc\":true}")
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
