import comp from "/Users/yams/github/notes-fe/.vuepress/.temp/pages/浏览器/chrome/4.2.内联缓存.html.vue"
const data = JSON.parse("{\"path\":\"/%E6%B5%8F%E8%A7%88%E5%99%A8/chrome/4.2.%E5%86%85%E8%81%94%E7%BC%93%E5%AD%98.html\",\"title\":\"Inline Cache\",\"lang\":\"zh-CN\",\"frontmatter\":{\"description\":\"Inline Cache 考虑以下代码。 load 函数获取 obj.x 的过程：查找对象的隐藏类，通过隐藏类获取 x 的偏移量，根据偏移量获取属性地址。 这个过程会反复执行，内联缓存 ( Inline Cache ) 可以优化这个过程。 什么是内联缓存 内联缓存是针对函数内对象访问的优化。 内联缓存为每个函数维护一个反馈向量 ( FeedBack V...\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://yamsfeer.github.io/notes-fe/%E6%B5%8F%E8%A7%88%E5%99%A8/chrome/4.2.%E5%86%85%E8%81%94%E7%BC%93%E5%AD%98.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"yamsfeer\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"Inline Cache\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"Inline Cache 考虑以下代码。 load 函数获取 obj.x 的过程：查找对象的隐藏类，通过隐藏类获取 x 的偏移量，根据偏移量获取属性地址。 这个过程会反复执行，内联缓存 ( Inline Cache ) 可以优化这个过程。 什么是内联缓存 内联缓存是针对函数内对象访问的优化。 内联缓存为每个函数维护一个反馈向量 ( FeedBack V...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"Inline Cache\\\",\\\"image\\\":[\\\"\\\"],\\\"dateModified\\\":null,\\\"author\\\":[]}\"]]},\"headers\":[{\"level\":2,\"title\":\"什么是内联缓存\",\"slug\":\"什么是内联缓存\",\"link\":\"#什么是内联缓存\",\"children\":[]},{\"level\":2,\"title\":\"反馈向量的写入过程\",\"slug\":\"反馈向量的写入过程\",\"link\":\"#反馈向量的写入过程\",\"children\":[{\"level\":3,\"title\":\"LOAD、STORE 和 CALL\",\"slug\":\"load、store-和-call\",\"link\":\"#load、store-和-call\",\"children\":[]}]},{\"level\":2,\"title\":\"多态与超态\",\"slug\":\"多态与超态\",\"link\":\"#多态与超态\",\"children\":[]}],\"readingTime\":{\"minutes\":3.46,\"words\":1038},\"filePathRelative\":\"浏览器/chrome/4.2.内联缓存.md\",\"autoDesc\":true}")
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
