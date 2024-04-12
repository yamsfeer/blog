import comp from "/Users/yams/github/notes-fe/.vuepress/.temp/pages/工程架构/性能优化/3.6.交互.html.vue"
const data = JSON.parse("{\"path\":\"/%E5%B7%A5%E7%A8%8B%E6%9E%B6%E6%9E%84/%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96/3.6.%E4%BA%A4%E4%BA%92.html\",\"title\":\"对交互的性能优化\",\"lang\":\"zh-CN\",\"frontmatter\":{\"description\":\"对交互的性能优化 输入延迟 输入延迟 ( Input delay ) 是指从交互 ( 如 click、tap、keypress ) 开始，到事件回调开始运行的时间。 交互总会有一定的输入延迟，因为操作系统需要时间识别输入事件并传递给浏览器，这是不可避免的。我们可以优化的是页面其他部分对输入延迟的影响。 避免重复的计时器 setTimeout 和 set...\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://yamsfeer.github.io/notes-fe/%E5%B7%A5%E7%A8%8B%E6%9E%B6%E6%9E%84/%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96/3.6.%E4%BA%A4%E4%BA%92.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"yamsfeer\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"对交互的性能优化\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"对交互的性能优化 输入延迟 输入延迟 ( Input delay ) 是指从交互 ( 如 click、tap、keypress ) 开始，到事件回调开始运行的时间。 交互总会有一定的输入延迟，因为操作系统需要时间识别输入事件并传递给浏览器，这是不可避免的。我们可以优化的是页面其他部分对输入延迟的影响。 避免重复的计时器 setTimeout 和 set...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:image\",\"content\":\"https://raw.githubusercontent.com/yamsfeer/pic-bed/master/tjzVtS9wFXxd06gaPHNY.png\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"对交互的性能优化\\\",\\\"image\\\":[\\\"https://raw.githubusercontent.com/yamsfeer/pic-bed/master/tjzVtS9wFXxd06gaPHNY.png\\\"],\\\"dateModified\\\":null,\\\"author\\\":[]}\"]]},\"headers\":[{\"level\":2,\"title\":\"输入延迟\",\"slug\":\"输入延迟\",\"link\":\"#输入延迟\",\"children\":[{\"level\":3,\"title\":\"避免重复的计时器\",\"slug\":\"避免重复的计时器\",\"link\":\"#避免重复的计时器\",\"children\":[]},{\"level\":3,\"title\":\"避免长任务\",\"slug\":\"避免长任务\",\"link\":\"#避免长任务\",\"children\":[]},{\"level\":3,\"title\":\"交互重叠\",\"slug\":\"交互重叠\",\"link\":\"#交互重叠\",\"children\":[]}]},{\"level\":2,\"title\":\"参考\",\"slug\":\"参考\",\"link\":\"#参考\",\"children\":[]}],\"readingTime\":{\"minutes\":1.19,\"words\":356},\"filePathRelative\":\"工程架构/性能优化/3.6.交互.md\",\"autoDesc\":true}")
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
