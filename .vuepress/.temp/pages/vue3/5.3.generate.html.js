import comp from "/Users/yams/github/notes-fe/.vuepress/.temp/pages/vue3/5.3.generate.html.vue"
const data = JSON.parse("{\"path\":\"/vue3/5.3.generate.html\",\"title\":\"Generate\",\"lang\":\"zh-CN\",\"frontmatter\":{\"description\":\"Generate 代码生成的本质是字符串拼接。 通过 transform 操作，我们已经得到 JavaScript 代码的 AST，代码生成就是遍历这个 AST，拼接字符串得到最终 render 函数的代码。 回顾一下 compile 的主流程。 现在我们要实现的是 generate 函数，解析 AST 树，得到代码文本。 上下文对象 代码生成也需要 ...\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://yamsfeer.github.io/notes-fe/vue3/5.3.generate.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"yamsfeer\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"Generate\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"Generate 代码生成的本质是字符串拼接。 通过 transform 操作，我们已经得到 JavaScript 代码的 AST，代码生成就是遍历这个 AST，拼接字符串得到最终 render 函数的代码。 回顾一下 compile 的主流程。 现在我们要实现的是 generate 函数，解析 AST 树，得到代码文本。 上下文对象 代码生成也需要 ...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"Generate\\\",\\\"image\\\":[\\\"\\\"],\\\"dateModified\\\":null,\\\"author\\\":[]}\"]]},\"headers\":[{\"level\":2,\"title\":\"上下文对象\",\"slug\":\"上下文对象\",\"link\":\"#上下文对象\",\"children\":[]}],\"readingTime\":{\"minutes\":1.33,\"words\":400},\"filePathRelative\":\"vue3/5.3.generate.md\",\"autoDesc\":true}")
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
