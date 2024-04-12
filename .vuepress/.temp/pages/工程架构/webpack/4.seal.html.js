import comp from "/Users/yams/github/notes-fe/.vuepress/.temp/pages/工程架构/webpack/4.seal.html.vue"
const data = JSON.parse("{\"path\":\"/%E5%B7%A5%E7%A8%8B%E6%9E%B6%E6%9E%84/webpack/4.seal.html\",\"title\":\"seal\",\"lang\":\"zh-CN\",\"frontmatter\":{\"description\":\"seal make 阶段中，我们已经得到模块依赖关系图 moduleGraph，接下来进入 seal 阶段。 seal 过程中的主体调用关系如下图。 可以看到，整个 seal 过程是围绕 chunkGraph 展开的，总体来说可以分为几个部分： 创建 chunkGraph 构建 chunkGraph 优化，其中 splitChunkPlugin 的工作...\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://yamsfeer.github.io/notes-fe/%E5%B7%A5%E7%A8%8B%E6%9E%B6%E6%9E%84/webpack/4.seal.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"yamsfeer\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"seal\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"seal make 阶段中，我们已经得到模块依赖关系图 moduleGraph，接下来进入 seal 阶段。 seal 过程中的主体调用关系如下图。 可以看到，整个 seal 过程是围绕 chunkGraph 展开的，总体来说可以分为几个部分： 创建 chunkGraph 构建 chunkGraph 优化，其中 splitChunkPlugin 的工作...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:image\",\"content\":\"https://raw.githubusercontent.com/yamsfeer/pic-bed/master/buildChunkGraph.svg\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"seal\\\",\\\"image\\\":[\\\"https://raw.githubusercontent.com/yamsfeer/pic-bed/master/buildChunkGraph.svg\\\"],\\\"dateModified\\\":null,\\\"author\\\":[]}\"]]},\"headers\":[{\"level\":2,\"title\":\"chunkGraph\",\"slug\":\"chunkgraph\",\"link\":\"#chunkgraph\",\"children\":[]},{\"level\":2,\"title\":\"create chunkGraph\",\"slug\":\"create-chunkgraph\",\"link\":\"#create-chunkgraph\",\"children\":[]},{\"level\":2,\"title\":\"build chunkGraph\",\"slug\":\"build-chunkgraph\",\"link\":\"#build-chunkgraph\",\"children\":[]},{\"level\":2,\"title\":\"codeGeneration\",\"slug\":\"codegeneration\",\"link\":\"#codegeneration\",\"children\":[]},{\"level\":2,\"title\":\"create module assets\",\"slug\":\"create-module-assets\",\"link\":\"#create-module-assets\",\"children\":[]}],\"readingTime\":{\"minutes\":3.04,\"words\":912},\"filePathRelative\":\"工程架构/webpack/4.seal.md\",\"autoDesc\":true}")
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
