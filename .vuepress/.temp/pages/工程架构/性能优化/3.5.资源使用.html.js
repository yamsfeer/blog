import comp from "/Users/yams/github/notes-fe/.vuepress/.temp/pages/工程架构/性能优化/3.5.资源使用.html.vue"
const data = JSON.parse("{\"path\":\"/%E5%B7%A5%E7%A8%8B%E6%9E%B6%E6%9E%84/%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96/3.5.%E8%B5%84%E6%BA%90%E4%BD%BF%E7%94%A8.html\",\"title\":\"资源使用\",\"lang\":\"zh-CN\",\"frontmatter\":{\"description\":\"资源使用 资源使用这部分的性能优化，都是围绕浏览器主线程展开的。 当我们把各种资源如 html、css、js 文本、图片等下载到本地，浏览器需要做大量工作才能得到最终的网页。这其中浏览器主线程负责了大部分的重要工作，比如解析 html、构建 dom 树，执行 JS 代码等等。 我们可以从渲染和 JS 执行这几部分来分析。 渲染 不渲染大量 dom 少渲...\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://yamsfeer.github.io/notes-fe/%E5%B7%A5%E7%A8%8B%E6%9E%B6%E6%9E%84/%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96/3.5.%E8%B5%84%E6%BA%90%E4%BD%BF%E7%94%A8.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"yamsfeer\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"资源使用\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"资源使用 资源使用这部分的性能优化，都是围绕浏览器主线程展开的。 当我们把各种资源如 html、css、js 文本、图片等下载到本地，浏览器需要做大量工作才能得到最终的网页。这其中浏览器主线程负责了大部分的重要工作，比如解析 html、构建 dom 树，执行 JS 代码等等。 我们可以从渲染和 JS 执行这几部分来分析。 渲染 不渲染大量 dom 少渲...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"资源使用\\\",\\\"image\\\":[\\\"\\\"],\\\"dateModified\\\":null,\\\"author\\\":[]}\"]]},\"headers\":[{\"level\":2,\"title\":\"渲染\",\"slug\":\"渲染\",\"link\":\"#渲染\",\"children\":[]},{\"level\":2,\"title\":\"JS 执行\",\"slug\":\"js-执行\",\"link\":\"#js-执行\",\"children\":[]}],\"readingTime\":{\"minutes\":0.51,\"words\":153},\"filePathRelative\":\"工程架构/性能优化/3.5.资源使用.md\",\"autoDesc\":true}")
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
