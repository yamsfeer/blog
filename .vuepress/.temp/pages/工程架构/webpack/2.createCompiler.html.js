import comp from "/Users/yams/github/notes-fe/.vuepress/.temp/pages/工程架构/webpack/2.createCompiler.html.vue"
const data = JSON.parse("{\"path\":\"/%E5%B7%A5%E7%A8%8B%E6%9E%B6%E6%9E%84/webpack/2.createCompiler.html\",\"title\":\"createCompiler\",\"lang\":\"zh-CN\",\"frontmatter\":{\"description\":\"createCompiler 从用户角度，使用 webpack 打包的代码大概如下： webpack 函数会调用 createCompiler 函数创建 compiler，它包含了大部分初始化工作。 createCompiler 函数主要做了以下几个工作： 初始化参数 创建 Compiler 对象 注册用户插件和内置插件 createCompiler ...\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://yamsfeer.github.io/notes-fe/%E5%B7%A5%E7%A8%8B%E6%9E%B6%E6%9E%84/webpack/2.createCompiler.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"yamsfeer\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"createCompiler\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"createCompiler 从用户角度，使用 webpack 打包的代码大概如下： webpack 函数会调用 createCompiler 函数创建 compiler，它包含了大部分初始化工作。 createCompiler 函数主要做了以下几个工作： 初始化参数 创建 Compiler 对象 注册用户插件和内置插件 createCompiler ...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"createCompiler\\\",\\\"image\\\":[\\\"\\\"],\\\"dateModified\\\":null,\\\"author\\\":[]}\"]]},\"headers\":[{\"level\":3,\"title\":\"new Compiler\",\"slug\":\"new-compiler\",\"link\":\"#new-compiler\",\"children\":[]},{\"level\":3,\"title\":\"注册插件\",\"slug\":\"注册插件\",\"link\":\"#注册插件\",\"children\":[]},{\"level\":3,\"title\":\"处理入口文件\",\"slug\":\"处理入口文件\",\"link\":\"#处理入口文件\",\"children\":[]},{\"level\":3,\"title\":\"compiler.run\",\"slug\":\"compiler-run\",\"link\":\"#compiler-run\",\"children\":[]},{\"level\":3,\"title\":\"小结\",\"slug\":\"小结\",\"link\":\"#小结\",\"children\":[]}],\"readingTime\":{\"minutes\":2.25,\"words\":674},\"filePathRelative\":\"工程架构/webpack/2.createCompiler.md\",\"autoDesc\":true}")
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
