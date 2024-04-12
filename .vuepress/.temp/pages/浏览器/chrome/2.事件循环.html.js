import comp from "/Users/yams/github/notes-fe/.vuepress/.temp/pages/浏览器/chrome/2.事件循环.html.vue"
const data = JSON.parse("{\"path\":\"/%E6%B5%8F%E8%A7%88%E5%99%A8/chrome/2.%E4%BA%8B%E4%BB%B6%E5%BE%AA%E7%8E%AF.html\",\"title\":\"事件循环 ( Event Loop )\",\"lang\":\"zh-CN\",\"frontmatter\":{\"description\":\"事件循环 ( Event Loop ) 【摘要】 由于主线程过于繁忙，引发了任务调度的问题。主线程的任务调度就是排队。 为什么无法用多线程处理？因为任务之间不是独立的。 事件循环模型 异步 由于渲染主线程是单线程的，为了避免阻塞，提出了异步的解决办法，即事件循环模型。 单线程是异步产生的原因，事件循环是异步的实现方式 这里可以联想到一个完整的任务调度模...\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://yamsfeer.github.io/notes-fe/%E6%B5%8F%E8%A7%88%E5%99%A8/chrome/2.%E4%BA%8B%E4%BB%B6%E5%BE%AA%E7%8E%AF.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"yamsfeer\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"事件循环 ( Event Loop )\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"事件循环 ( Event Loop ) 【摘要】 由于主线程过于繁忙，引发了任务调度的问题。主线程的任务调度就是排队。 为什么无法用多线程处理？因为任务之间不是独立的。 事件循环模型 异步 由于渲染主线程是单线程的，为了避免阻塞，提出了异步的解决办法，即事件循环模型。 单线程是异步产生的原因，事件循环是异步的实现方式 这里可以联想到一个完整的任务调度模...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"事件循环 ( Event Loop )\\\",\\\"image\\\":[\\\"\\\"],\\\"dateModified\\\":null,\\\"author\\\":[]}\"]]},\"headers\":[{\"level\":2,\"title\":\"事件循环模型\",\"slug\":\"事件循环模型\",\"link\":\"#事件循环模型\",\"children\":[{\"level\":3,\"title\":\"异步\",\"slug\":\"异步\",\"link\":\"#异步\",\"children\":[]},{\"level\":3,\"title\":\"事件循环队列\",\"slug\":\"事件循环队列\",\"link\":\"#事件循环队列\",\"children\":[]},{\"level\":3,\"title\":\"例子\",\"slug\":\"例子\",\"link\":\"#例子\",\"children\":[]}]},{\"level\":2,\"title\":\"任务队列的类型及优先级\",\"slug\":\"任务队列的类型及优先级\",\"link\":\"#任务队列的类型及优先级\",\"children\":[]},{\"level\":2,\"title\":\"微任务队列\",\"slug\":\"微任务队列\",\"link\":\"#微任务队列\",\"children\":[]}],\"readingTime\":{\"minutes\":1.92,\"words\":575},\"filePathRelative\":\"浏览器/chrome/2.事件循环.md\",\"autoDesc\":true}")
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
