import comp from "/Users/yams/github/notes-fe/.vuepress/.temp/pages/工程架构/webpack/6.runtime.html.vue"
const data = JSON.parse("{\"path\":\"/%E5%B7%A5%E7%A8%8B%E6%9E%B6%E6%9E%84/webpack/6.runtime.html\",\"title\":\"runtime\",\"lang\":\"zh-CN\",\"frontmatter\":{\"description\":\"runtime 假设将项目代码如下： webpack 打包后的代码是个立即执行函数，整体 bootstrap 过程分 4 步。\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://yamsfeer.github.io/notes-fe/%E5%B7%A5%E7%A8%8B%E6%9E%B6%E6%9E%84/webpack/6.runtime.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"yamsfeer\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"runtime\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"runtime 假设将项目代码如下： webpack 打包后的代码是个立即执行函数，整体 bootstrap 过程分 4 步。\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"runtime\\\",\\\"image\\\":[\\\"\\\"],\\\"dateModified\\\":null,\\\"author\\\":[]}\"]]},\"headers\":[],\"readingTime\":{\"minutes\":1.13,\"words\":339},\"filePathRelative\":\"工程架构/webpack/6.runtime.md\",\"autoDesc\":true}")
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
