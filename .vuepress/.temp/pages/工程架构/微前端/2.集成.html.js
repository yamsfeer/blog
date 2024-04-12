import comp from "/Users/yams/github/notes-fe/.vuepress/.temp/pages/工程架构/微前端/2.集成.html.vue"
const data = JSON.parse("{\"path\":\"/%E5%B7%A5%E7%A8%8B%E6%9E%B6%E6%9E%84/%E5%BE%AE%E5%89%8D%E7%AB%AF/2.%E9%9B%86%E6%88%90.html\",\"title\":\"应用集成\",\"lang\":\"zh-CN\",\"frontmatter\":{\"description\":\"应用集成 子应用路由、注册、挂载、卸载 iframe 集成 使用 iframe 集成微应用的代码如下。 隔离 iframe 是浏览器原生的方案，可以轻松实现 js 隔离和样式隔离。但这种隔离太强，使得应用间上下文无法被共享。 url 不同步。浏览器刷新时，iframe url 状态丢失、后退前进按钮无法使用。 UI 不同步，DOM 结构不共享。想象一下...\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://yamsfeer.github.io/notes-fe/%E5%B7%A5%E7%A8%8B%E6%9E%B6%E6%9E%84/%E5%BE%AE%E5%89%8D%E7%AB%AF/2.%E9%9B%86%E6%88%90.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"yamsfeer\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"应用集成\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"应用集成 子应用路由、注册、挂载、卸载 iframe 集成 使用 iframe 集成微应用的代码如下。 隔离 iframe 是浏览器原生的方案，可以轻松实现 js 隔离和样式隔离。但这种隔离太强，使得应用间上下文无法被共享。 url 不同步。浏览器刷新时，iframe url 状态丢失、后退前进按钮无法使用。 UI 不同步，DOM 结构不共享。想象一下...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"应用集成\\\",\\\"image\\\":[\\\"\\\"],\\\"dateModified\\\":null,\\\"author\\\":[]}\"]]},\"headers\":[{\"level\":2,\"title\":\"iframe\",\"slug\":\"iframe\",\"link\":\"#iframe\",\"children\":[{\"level\":3,\"title\":\"集成\",\"slug\":\"集成\",\"link\":\"#集成\",\"children\":[]},{\"level\":3,\"title\":\"隔离\",\"slug\":\"隔离\",\"link\":\"#隔离\",\"children\":[]},{\"level\":3,\"title\":\"通信\",\"slug\":\"通信\",\"link\":\"#通信\",\"children\":[]},{\"level\":3,\"title\":\"共享\",\"slug\":\"共享\",\"link\":\"#共享\",\"children\":[]},{\"level\":3,\"title\":\"优缺点\",\"slug\":\"优缺点\",\"link\":\"#优缺点\",\"children\":[]}]},{\"level\":2,\"title\":\"直接挂载\",\"slug\":\"直接挂载\",\"link\":\"#直接挂载\",\"children\":[]},{\"level\":2,\"title\":\"shadow dom\",\"slug\":\"shadow-dom\",\"link\":\"#shadow-dom\",\"children\":[]},{\"level\":2,\"title\":\"web component\",\"slug\":\"web-component\",\"link\":\"#web-component\",\"children\":[]},{\"level\":2,\"title\":\"module federation\",\"slug\":\"module-federation\",\"link\":\"#module-federation\",\"children\":[]}],\"readingTime\":{\"minutes\":1.75,\"words\":524},\"filePathRelative\":\"工程架构/微前端/2.集成.md\",\"autoDesc\":true}")
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
