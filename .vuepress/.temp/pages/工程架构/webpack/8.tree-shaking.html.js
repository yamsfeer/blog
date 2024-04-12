import comp from "/Users/yams/github/notes-fe/.vuepress/.temp/pages/工程架构/webpack/8.tree-shaking.html.vue"
const data = JSON.parse("{\"path\":\"/%E5%B7%A5%E7%A8%8B%E6%9E%B6%E6%9E%84/webpack/8.tree-shaking.html\",\"title\":\"tree shaking\",\"lang\":\"zh-CN\",\"frontmatter\":{\"description\":\"tree shaking tree shaking 不是 webpack 的某个配置选项，而是一组功能搭配使用的优化效果。 sideEffect sideEffect 可以指定某个文件是否是有副作用的，如果是没有副作用且没有被导入引用的文件，则可以直接跳过。 log.js 的内容虽然没有被 export，但它在 Object.prototype 上挂载...\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://yamsfeer.github.io/notes-fe/%E5%B7%A5%E7%A8%8B%E6%9E%B6%E6%9E%84/webpack/8.tree-shaking.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"yamsfeer\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"tree shaking\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"tree shaking tree shaking 不是 webpack 的某个配置选项，而是一组功能搭配使用的优化效果。 sideEffect sideEffect 可以指定某个文件是否是有副作用的，如果是没有副作用且没有被导入引用的文件，则可以直接跳过。 log.js 的内容虽然没有被 export，但它在 Object.prototype 上挂载...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"tree shaking\\\",\\\"image\\\":[\\\"\\\"],\\\"dateModified\\\":null,\\\"author\\\":[]}\"]]},\"headers\":[{\"level\":3,\"title\":\"sideEffect\",\"slug\":\"sideeffect\",\"link\":\"#sideeffect\",\"children\":[]}],\"readingTime\":{\"minutes\":0.96,\"words\":288},\"filePathRelative\":\"工程架构/webpack/8.tree-shaking.md\",\"autoDesc\":true}")
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
