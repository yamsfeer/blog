import comp from "/Users/yams/github/notes-fe/.vuepress/.temp/pages/vue3/5.1.parse.html.vue"
const data = JSON.parse("{\"path\":\"/vue3/5.1.parse.html\",\"title\":\"parse\",\"lang\":\"zh-CN\",\"frontmatter\":{\"description\":\"parse parser 需要完成词法分析和语法分析两个工作。 词法分析 词法分析通常是用状态机来完成的，解析 vue 模板的状态机如下图。 先定义各个状态。 tokenize 过程就是从当前状态和字符，不断转移到下一个状态，并持续消耗 ( consume ) 当前字符的过程。 tokenize 函数的执行结果如下。 我们用正则表达式也可以完成相同的功...\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://yamsfeer.github.io/notes-fe/vue3/5.1.parse.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"yamsfeer\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"parse\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"parse parser 需要完成词法分析和语法分析两个工作。 词法分析 词法分析通常是用状态机来完成的，解析 vue 模板的状态机如下图。 先定义各个状态。 tokenize 过程就是从当前状态和字符，不断转移到下一个状态，并持续消耗 ( consume ) 当前字符的过程。 tokenize 函数的执行结果如下。 我们用正则表达式也可以完成相同的功...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"parse\\\",\\\"image\\\":[\\\"\\\"],\\\"dateModified\\\":null,\\\"author\\\":[]}\"]]},\"headers\":[{\"level\":2,\"title\":\"词法分析\",\"slug\":\"词法分析\",\"link\":\"#词法分析\",\"children\":[]},{\"level\":2,\"title\":\"构造 AST\",\"slug\":\"构造-ast\",\"link\":\"#构造-ast\",\"children\":[]}],\"readingTime\":{\"minutes\":1.69,\"words\":506},\"filePathRelative\":\"vue3/5.1.parse.md\",\"autoDesc\":true}")
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
