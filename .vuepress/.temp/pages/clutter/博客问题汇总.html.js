import comp from "/Users/yams/github/notes-fe/.vuepress/.temp/pages/clutter/博客问题汇总.html.vue"
const data = JSON.parse("{\"path\":\"/clutter/%E5%8D%9A%E5%AE%A2%E9%97%AE%E9%A2%98%E6%B1%87%E6%80%BB.html\",\"title\":\"博客问题汇总\",\"lang\":\"zh-CN\",\"frontmatter\":{\"description\":\"博客问题汇总 打包内存不足 markdown 文件多了以后，除了打包时间加长以外，还会有内存不足的问题。 这是因为 node 对内存的使用的默认上限为 1.7G，文件过多而内存不足时打包失败。解决办法就是手动提高上限。 或者直接修改环境变量。 如果使用 github 工作流，修改方法如下： 图床 原来使用新浪微博作为图床，上传和访问图片都很方便，但微博...\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://yamsfeer.github.io/notes-fe/clutter/%E5%8D%9A%E5%AE%A2%E9%97%AE%E9%A2%98%E6%B1%87%E6%80%BB.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"yamsfeer\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"博客问题汇总\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"博客问题汇总 打包内存不足 markdown 文件多了以后，除了打包时间加长以外，还会有内存不足的问题。 这是因为 node 对内存的使用的默认上限为 1.7G，文件过多而内存不足时打包失败。解决办法就是手动提高上限。 或者直接修改环境变量。 如果使用 github 工作流，修改方法如下： 图床 原来使用新浪微博作为图床，上传和访问图片都很方便，但微博...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"博客问题汇总\\\",\\\"image\\\":[\\\"\\\"],\\\"dateModified\\\":null,\\\"author\\\":[]}\"]]},\"headers\":[{\"level\":2,\"title\":\"打包内存不足\",\"slug\":\"打包内存不足\",\"link\":\"#打包内存不足\",\"children\":[]},{\"level\":2,\"title\":\"图床\",\"slug\":\"图床\",\"link\":\"#图床\",\"children\":[]}],\"readingTime\":{\"minutes\":1.33,\"words\":400},\"filePathRelative\":\"clutter/博客问题汇总.md\",\"autoDesc\":true}")
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
