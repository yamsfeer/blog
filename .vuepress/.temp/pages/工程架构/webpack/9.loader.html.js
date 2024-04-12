import comp from "/Users/yams/github/notes-fe/.vuepress/.temp/pages/工程架构/webpack/9.loader.html.vue"
const data = JSON.parse("{\"path\":\"/%E5%B7%A5%E7%A8%8B%E6%9E%B6%E6%9E%84/webpack/9.loader.html\",\"title\":\"loader\",\"lang\":\"zh-CN\",\"frontmatter\":{\"description\":\"loader loader 机制是 webpack 的核心。 webpack 从入口文件开始，根据 import、require 等语句，找出整个项目的依赖关系树，然后遍历这棵树，将不同的文件类型交给相应的 loader 处理，然后将处理结果添加到最后的 bundle.js 文件中。 webpack 本身只能处理 js 文件，当遇到其他资源比如 css...\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://yamsfeer.github.io/notes-fe/%E5%B7%A5%E7%A8%8B%E6%9E%B6%E6%9E%84/webpack/9.loader.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"yamsfeer\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"loader\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"loader loader 机制是 webpack 的核心。 webpack 从入口文件开始，根据 import、require 等语句，找出整个项目的依赖关系树，然后遍历这棵树，将不同的文件类型交给相应的 loader 处理，然后将处理结果添加到最后的 bundle.js 文件中。 webpack 本身只能处理 js 文件，当遇到其他资源比如 css...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"loader\\\",\\\"image\\\":[\\\"\\\"],\\\"dateModified\\\":null,\\\"author\\\":[]}\"]]},\"headers\":[{\"level\":3,\"title\":\"data-url\",\"slug\":\"data-url\",\"link\":\"#data-url\",\"children\":[]},{\"level\":3,\"title\":\"编写一个 loader\",\"slug\":\"编写一个-loader\",\"link\":\"#编写一个-loader\",\"children\":[]}],\"readingTime\":{\"minutes\":2.3,\"words\":691},\"filePathRelative\":\"工程架构/webpack/9.loader.md\",\"autoDesc\":true}")
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
