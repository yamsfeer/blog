import comp from "/Users/yams/github/notes-fe/.vuepress/.temp/pages/浏览器/chrome/3.渲染引擎.html.vue"
const data = JSON.parse("{\"path\":\"/%E6%B5%8F%E8%A7%88%E5%99%A8/chrome/3.%E6%B8%B2%E6%9F%93%E5%BC%95%E6%93%8E.html\",\"title\":\"\",\"lang\":\"zh-CN\",\"frontmatter\":{\"description\":\"在浏览器中，渲染就是从代码字符串到图片像素的过程。 在渲染之前，需要网络进程下载代码，准确来说是下载 html 文档。然后浏览器的网络进程中有多个网络线程，当文档下载完成后，网络线程创建一个渲染任务，进入事件循环队列。 Parse DOM CSSOM style 内部样式表 link 外部样式表 inline 内联样式表 浏览器默认样式表 StyleS...\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://yamsfeer.github.io/notes-fe/%E6%B5%8F%E8%A7%88%E5%99%A8/chrome/3.%E6%B8%B2%E6%9F%93%E5%BC%95%E6%93%8E.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"yamsfeer\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"在浏览器中，渲染就是从代码字符串到图片像素的过程。 在渲染之前，需要网络进程下载代码，准确来说是下载 html 文档。然后浏览器的网络进程中有多个网络线程，当文档下载完成后，网络线程创建一个渲染任务，进入事件循环队列。 Parse DOM CSSOM style 内部样式表 link 外部样式表 inline 内联样式表 浏览器默认样式表 StyleS...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:image\",\"content\":\"https://yamsfeer.github.io/notes-fe/Users/yams/Desktop/chrome-render-thread.png\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"\\\",\\\"image\\\":[\\\"https://yamsfeer.github.io/notes-fe/Users/yams/Desktop/chrome-render-thread.png\\\"],\\\"dateModified\\\":null,\\\"author\\\":[]}\"]]},\"headers\":[{\"level\":2,\"title\":\"Parse\",\"slug\":\"parse\",\"link\":\"#parse\",\"children\":[{\"level\":3,\"title\":\"DOM\",\"slug\":\"dom\",\"link\":\"#dom\",\"children\":[]},{\"level\":3,\"title\":\"CSSOM\",\"slug\":\"cssom\",\"link\":\"#cssom\",\"children\":[]}]},{\"level\":2,\"title\":\"样式计算\",\"slug\":\"样式计算\",\"link\":\"#样式计算\",\"children\":[{\"level\":3,\"title\":\"属性计算 Comuted Style\",\"slug\":\"属性计算-comuted-style\",\"link\":\"#属性计算-comuted-style\",\"children\":[]}]},{\"level\":2,\"title\":\"Layout\",\"slug\":\"layout\",\"link\":\"#layout\",\"children\":[{\"level\":3,\"title\":\"dom 树和 layout 树不是一一对应的\",\"slug\":\"dom-树和-layout-树不是一一对应的\",\"link\":\"#dom-树和-layout-树不是一一对应的\",\"children\":[]}]},{\"level\":2,\"title\":\"Layer\",\"slug\":\"layer\",\"link\":\"#layer\",\"children\":[]},{\"level\":2,\"title\":\"Paint\",\"slug\":\"paint\",\"link\":\"#paint\",\"children\":[]},{\"level\":2,\"title\":\"Tiling\",\"slug\":\"tiling\",\"link\":\"#tiling\",\"children\":[]},{\"level\":2,\"title\":\"Raster\",\"slug\":\"raster\",\"link\":\"#raster\",\"children\":[]},{\"level\":2,\"title\":\"Draw\",\"slug\":\"draw\",\"link\":\"#draw\",\"children\":[]},{\"level\":2,\"title\":\"参考\",\"slug\":\"参考\",\"link\":\"#参考\",\"children\":[]}],\"readingTime\":{\"minutes\":3.85,\"words\":1156},\"filePathRelative\":\"浏览器/chrome/3.渲染引擎.md\",\"autoDesc\":true}")
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
