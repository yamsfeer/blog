import comp from "/Users/yams/github/notes-fe/.vuepress/.temp/pages/vue3/5.2.transform.html.vue"
const data = JSON.parse("{\"path\":\"/vue3/5.2.transform.html\",\"title\":\"transform\",\"lang\":\"zh-CN\",\"frontmatter\":{\"description\":\"transform 通过 parse 函数，我们已经将模板转换为 AST。transform 函数要做的事将模板 AST 转换为 JavaScript AST。 遍历 AST 为了转换 AST，我们需要遍历 AST 的每个节点，并对特定节点进行修改、删除等操作。 traverse 函数是一个先序遍历 AST 的函数，在 process node 的位置...\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://yamsfeer.github.io/notes-fe/vue3/5.2.transform.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"yamsfeer\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"transform\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"transform 通过 parse 函数，我们已经将模板转换为 AST。transform 函数要做的事将模板 AST 转换为 JavaScript AST。 遍历 AST 为了转换 AST，我们需要遍历 AST 的每个节点，并对特定节点进行修改、删除等操作。 traverse 函数是一个先序遍历 AST 的函数，在 process node 的位置...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"transform\\\",\\\"image\\\":[\\\"\\\"],\\\"dateModified\\\":null,\\\"author\\\":[]}\"]]},\"headers\":[{\"level\":2,\"title\":\"遍历 AST\",\"slug\":\"遍历-ast\",\"link\":\"#遍历-ast\",\"children\":[]},{\"level\":2,\"title\":\"转换上下文 transformContext\",\"slug\":\"转换上下文-transformcontext\",\"link\":\"#转换上下文-transformcontext\",\"children\":[{\"level\":3,\"title\":\"节点操作\",\"slug\":\"节点操作\",\"link\":\"#节点操作\",\"children\":[]},{\"level\":3,\"title\":\"进入与退出\",\"slug\":\"进入与退出\",\"link\":\"#进入与退出\",\"children\":[]}]},{\"level\":2,\"title\":\"transform\",\"slug\":\"transform-1\",\"link\":\"#transform-1\",\"children\":[{\"level\":3,\"title\":\"JavaScript AST 的数据结构\",\"slug\":\"javascript-ast-的数据结构\",\"link\":\"#javascript-ast-的数据结构\",\"children\":[]},{\"level\":3,\"title\":\"转换函数\",\"slug\":\"转换函数\",\"link\":\"#转换函数\",\"children\":[]}]}],\"readingTime\":{\"minutes\":5.01,\"words\":1504},\"filePathRelative\":\"vue3/5.2.transform.md\",\"autoDesc\":true}")
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
