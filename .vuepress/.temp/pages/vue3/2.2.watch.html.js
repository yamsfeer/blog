import comp from "/Users/yams/github/notes-fe/.vuepress/.temp/pages/vue3/2.2.watch.html.vue"
const data = JSON.parse("{\"path\":\"/vue3/2.2.watch.html\",\"title\":\"watch\",\"lang\":\"zh-CN\",\"frontmatter\":{\"description\":\"watch watch 的本质就是：观测一个 reactive 数据，当数据变化时执行回调函数。 从实现上来说，watch 利用了 effect 以及它的 scheduler 特性。 为什么要用 traverse 函数？当我们 watch target 对象时，意思是希望 target 任意属性变化时都执行回调。所以我们需要 traverse 函数遍历...\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://yamsfeer.github.io/notes-fe/vue3/2.2.watch.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"yamsfeer\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"watch\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"watch watch 的本质就是：观测一个 reactive 数据，当数据变化时执行回调函数。 从实现上来说，watch 利用了 effect 以及它的 scheduler 特性。 为什么要用 traverse 函数？当我们 watch target 对象时，意思是希望 target 任意属性变化时都执行回调。所以我们需要 traverse 函数遍历...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"watch\\\",\\\"image\\\":[\\\"\\\"],\\\"dateModified\\\":null,\\\"author\\\":[]}\"]]},\"headers\":[{\"level\":2,\"title\":\"旧值与新值\",\"slug\":\"旧值与新值\",\"link\":\"#旧值与新值\",\"children\":[]},{\"level\":2,\"title\":\"立即执行 watch 和回调执行时机\",\"slug\":\"立即执行-watch-和回调执行时机\",\"link\":\"#立即执行-watch-和回调执行时机\",\"children\":[{\"level\":3,\"title\":\"回调执行时机\",\"slug\":\"回调执行时机\",\"link\":\"#回调执行时机\",\"children\":[]}]}],\"readingTime\":{\"minutes\":2.52,\"words\":756},\"filePathRelative\":\"vue3/2.2.watch.md\",\"autoDesc\":true}")
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
