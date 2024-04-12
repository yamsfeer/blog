import comp from "/Users/yams/github/notes-fe/.vuepress/.temp/pages/工程架构/webpack/11.hmr.html.vue"
const data = JSON.parse("{\"path\":\"/%E5%B7%A5%E7%A8%8B%E6%9E%B6%E6%9E%84/webpack/11.hmr.html\",\"title\":\"HMR\",\"lang\":\"zh-CN\",\"frontmatter\":{\"description\":\"HMR HMR ( hot module replacement ) 是 webpack 的一个强大功能，它能使我们在修改代码后 ( 如修改 css 代码 ) 部分更新页面而不是重新刷新，这提供了良好的开发体验。 webpack 开启 hmr 有两种方式，一个是使用命令 还有一种方法是通过配置文件。 HMR 不是一个开箱即用的功能，我们需要告诉 web...\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://yamsfeer.github.io/notes-fe/%E5%B7%A5%E7%A8%8B%E6%9E%B6%E6%9E%84/webpack/11.hmr.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"yamsfeer\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"HMR\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"HMR HMR ( hot module replacement ) 是 webpack 的一个强大功能，它能使我们在修改代码后 ( 如修改 css 代码 ) 部分更新页面而不是重新刷新，这提供了良好的开发体验。 webpack 开启 hmr 有两种方式，一个是使用命令 还有一种方法是通过配置文件。 HMR 不是一个开箱即用的功能，我们需要告诉 web...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"HMR\\\",\\\"image\\\":[\\\"\\\"],\\\"dateModified\\\":null,\\\"author\\\":[]}\"]]},\"headers\":[{\"level\":2,\"title\":\"dev server\",\"slug\":\"dev-server\",\"link\":\"#dev-server\",\"children\":[{\"level\":3,\"title\":\"proxy\",\"slug\":\"proxy\",\"link\":\"#proxy\",\"children\":[]}]}],\"readingTime\":{\"minutes\":2.87,\"words\":861},\"filePathRelative\":\"工程架构/webpack/11.hmr.md\",\"autoDesc\":true}")
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
