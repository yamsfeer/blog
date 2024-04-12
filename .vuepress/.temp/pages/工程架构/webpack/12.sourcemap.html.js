import comp from "/Users/yams/github/notes-fe/.vuepress/.temp/pages/工程架构/webpack/12.sourcemap.html.vue"
const data = JSON.parse("{\"path\":\"/%E5%B7%A5%E7%A8%8B%E6%9E%B6%E6%9E%84/webpack/12.sourcemap.html\",\"title\":\"source map\",\"lang\":\"zh-CN\",\"frontmatter\":{\"description\":\"source map 由于打包后的代码通常难以阅读和调试，我们可以通过 source map 来构建源代码和打包后代码间的联系。 在 webpack 中加入配置启用 source map： 可以看到打包后 dist 目录多出一个 main.js.map 文件，里面存储的是代码映射的内容。 在 main.js 中，最后一行也通过注释的方式指定了 sour...\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://yamsfeer.github.io/notes-fe/%E5%B7%A5%E7%A8%8B%E6%9E%B6%E6%9E%84/webpack/12.sourcemap.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"yamsfeer\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"source map\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"source map 由于打包后的代码通常难以阅读和调试，我们可以通过 source map 来构建源代码和打包后代码间的联系。 在 webpack 中加入配置启用 source map： 可以看到打包后 dist 目录多出一个 main.js.map 文件，里面存储的是代码映射的内容。 在 main.js 中，最后一行也通过注释的方式指定了 sour...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"source map\\\",\\\"image\\\":[\\\"\\\"],\\\"dateModified\\\":null,\\\"author\\\":[]}\"]]},\"headers\":[],\"readingTime\":{\"minutes\":2.42,\"words\":726},\"filePathRelative\":\"工程架构/webpack/12.sourcemap.md\",\"autoDesc\":true}")
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
