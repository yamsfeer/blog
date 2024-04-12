import comp from "/Users/yams/github/notes-fe/.vuepress/.temp/pages/vue3/5.compiler.html.vue"
const data = JSON.parse("{\"path\":\"/vue3/5.compiler.html\",\"title\":\"compiler\",\"lang\":\"zh-CN\",\"frontmatter\":{\"description\":\"compiler 对于 vue 而言，编译就是将模板转化成 JavaScript 代码的过程。具体来说，是将模板编译成渲染函数。 以上 vue 模板编译后的 render 函数如下。 vue 模板编译器的工作流程如下图。 我们用 parse 函数完成词法分析和语法分析，整个编译过程可以分成三步：parse、transform、generate。\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://yamsfeer.github.io/notes-fe/vue3/5.compiler.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"yamsfeer\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"compiler\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"compiler 对于 vue 而言，编译就是将模板转化成 JavaScript 代码的过程。具体来说，是将模板编译成渲染函数。 以上 vue 模板编译后的 render 函数如下。 vue 模板编译器的工作流程如下图。 我们用 parse 函数完成词法分析和语法分析，整个编译过程可以分成三步：parse、transform、generate。\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:image\",\"content\":\"https://raw.githubusercontent.com/yamsfeer/pic-bed/master/compiler-workflow.svg\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"compiler\\\",\\\"image\\\":[\\\"https://raw.githubusercontent.com/yamsfeer/pic-bed/master/compiler-workflow.svg\\\"],\\\"dateModified\\\":null,\\\"author\\\":[]}\"]]},\"headers\":[],\"readingTime\":{\"minutes\":0.48,\"words\":144},\"filePathRelative\":\"vue3/5.compiler.md\",\"autoDesc\":true}")
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
