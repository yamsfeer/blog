import comp from "/Users/yams/github/notes-fe/.vuepress/.temp/pages/工程架构/webpack/3.make.html.vue"
const data = JSON.parse("{\"path\":\"/%E5%B7%A5%E7%A8%8B%E6%9E%B6%E6%9E%84/webpack/3.make.html\",\"title\":\"make\",\"lang\":\"zh-CN\",\"frontmatter\":{\"description\":\"make 初始化过程中，我们创建了 compiler 和 compilation 对象，当调用 compiler.run 函数时，会触发 compiler.hooks.make 钩子，从而进入 make 阶段。 在 make 阶段中，webpack 会从 entry 开始，递归构建所有模块及其依赖模块，最终得到模块依赖关系图 moduleGraph。 ...\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://yamsfeer.github.io/notes-fe/%E5%B7%A5%E7%A8%8B%E6%9E%B6%E6%9E%84/webpack/3.make.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"yamsfeer\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"make\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"make 初始化过程中，我们创建了 compiler 和 compilation 对象，当调用 compiler.run 函数时，会触发 compiler.hooks.make 钩子，从而进入 make 阶段。 在 make 阶段中，webpack 会从 entry 开始，递归构建所有模块及其依赖模块，最终得到模块依赖关系图 moduleGraph。 ...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:image\",\"content\":\"https://raw.githubusercontent.com/yamsfeer/pic-bed/master/make%E6%B5%81%E7%A8%8B.svg\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"make\\\",\\\"image\\\":[\\\"https://raw.githubusercontent.com/yamsfeer/pic-bed/master/make%E6%B5%81%E7%A8%8B.svg\\\",\\\"https://raw.githubusercontent.com/yamsfeer/pic-bed/master/moduleGraph.svg\\\",\\\"https://raw.githubusercontent.com/yamsfeer/pic-bed/master/buildModule.svg\\\"],\\\"dateModified\\\":null,\\\"author\\\":[]}\"]]},\"headers\":[{\"level\":2,\"title\":\"从 Entry 开始\",\"slug\":\"从-entry-开始\",\"link\":\"#从-entry-开始\",\"children\":[{\"level\":3,\"title\":\"Dependency\",\"slug\":\"dependency\",\"link\":\"#dependency\",\"children\":[]},{\"level\":3,\"title\":\"Module\",\"slug\":\"module\",\"link\":\"#module\",\"children\":[]}]},{\"level\":2,\"title\":\"moduleGraph\",\"slug\":\"modulegraph\",\"link\":\"#modulegraph\",\"children\":[]},{\"level\":2,\"title\":\"Module 处理过程\",\"slug\":\"module-处理过程\",\"link\":\"#module-处理过程\",\"children\":[{\"level\":3,\"title\":\"create module\",\"slug\":\"create-module\",\"link\":\"#create-module\",\"children\":[]},{\"level\":3,\"title\":\"build module\",\"slug\":\"build-module\",\"link\":\"#build-module\",\"children\":[]},{\"level\":3,\"title\":\"process dependency\",\"slug\":\"process-dependency\",\"link\":\"#process-dependency\",\"children\":[]}]}],\"readingTime\":{\"minutes\":4.76,\"words\":1427},\"filePathRelative\":\"工程架构/webpack/3.make.md\",\"autoDesc\":true}")
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
