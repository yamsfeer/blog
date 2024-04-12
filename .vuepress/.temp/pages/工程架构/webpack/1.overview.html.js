import comp from "/Users/yams/github/notes-fe/.vuepress/.temp/pages/工程架构/webpack/1.overview.html.vue"
const data = JSON.parse("{\"path\":\"/%E5%B7%A5%E7%A8%8B%E6%9E%B6%E6%9E%84/webpack/1.overview.html\",\"title\":\"overview\",\"lang\":\"zh-CN\",\"frontmatter\":{\"description\":\"overview webpack 的打包流程大概如下图： 核心可以分为以下 4 部分： 初始化 ( createCompiler ) 构建 ( make ) 封装 ( seal ) 生成 ( emit assets ) 在介绍 webpack 的构建流程之前，需要了解一些概念。 Entry：webpack 编译的入口 Compiler：管理 webpa...\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://yamsfeer.github.io/notes-fe/%E5%B7%A5%E7%A8%8B%E6%9E%B6%E6%9E%84/webpack/1.overview.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"yamsfeer\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"overview\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"overview webpack 的打包流程大概如下图： 核心可以分为以下 4 部分： 初始化 ( createCompiler ) 构建 ( make ) 封装 ( seal ) 生成 ( emit assets ) 在介绍 webpack 的构建流程之前，需要了解一些概念。 Entry：webpack 编译的入口 Compiler：管理 webpa...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:image\",\"content\":\"https://raw.githubusercontent.com/yamsfeer/pic-bed/master/webpack%E4%B8%BB%E6%B5%81%E7%A8%8B.svg\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"overview\\\",\\\"image\\\":[\\\"https://raw.githubusercontent.com/yamsfeer/pic-bed/master/webpack%E4%B8%BB%E6%B5%81%E7%A8%8B.svg\\\"],\\\"dateModified\\\":null,\\\"author\\\":[]}\"]]},\"headers\":[{\"level\":2,\"title\":\"参考\",\"slug\":\"参考\",\"link\":\"#参考\",\"children\":[]}],\"readingTime\":{\"minutes\":1.82,\"words\":547},\"filePathRelative\":\"工程架构/webpack/1.overview.md\",\"autoDesc\":true}")
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
