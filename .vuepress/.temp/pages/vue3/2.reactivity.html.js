import comp from "/Users/yams/github/notes-fe/.vuepress/.temp/pages/vue3/2.reactivity.html.vue"
const data = JSON.parse("{\"path\":\"/vue3/2.reactivity.html\",\"title\":\"Reactivity\",\"lang\":\"zh-CN\",\"frontmatter\":{\"description\":\"Reactivity 响应系统的核心在于：当响应式数据 reactive 变化时，自动调用副作用函数 effectFn。 为实现这一点，我们需要监听 reactive 对象的 get 和 set 操作，effectFn 调用时，会触发 reactive 对象的 get 操作，将 effectFn 保存到一个集合中；当 reactive 对象被修改时，会...\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://yamsfeer.github.io/notes-fe/vue3/2.reactivity.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"yamsfeer\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"Reactivity\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"Reactivity 响应系统的核心在于：当响应式数据 reactive 变化时，自动调用副作用函数 effectFn。 为实现这一点，我们需要监听 reactive 对象的 get 和 set 操作，effectFn 调用时，会触发 reactive 对象的 get 操作，将 effectFn 保存到一个集合中；当 reactive 对象被修改时，会...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:image\",\"content\":\"https://raw.githubusercontent.com/yamsfeer/pic-bed/master/reactivity-cleanup1.svg\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"Reactivity\\\",\\\"image\\\":[\\\"https://raw.githubusercontent.com/yamsfeer/pic-bed/master/reactivity-cleanup1.svg\\\",\\\"https://raw.githubusercontent.com/yamsfeer/pic-bed/master/reactivity-cleanup2.svg\\\",\\\"https://raw.githubusercontent.com/yamsfeer/pic-bed/master/reactivity-cleanup3.svg\\\",\\\"https://raw.githubusercontent.com/yamsfeer/pic-bed/master/reactivity-cleanup1.svg\\\"],\\\"dateModified\\\":null,\\\"author\\\":[]}\"]]},\"headers\":[{\"level\":2,\"title\":\"基本实现\",\"slug\":\"基本实现\",\"link\":\"#基本实现\",\"children\":[]},{\"level\":2,\"title\":\"分支切换与cleanup\",\"slug\":\"分支切换与cleanup\",\"link\":\"#分支切换与cleanup\",\"children\":[{\"level\":3,\"title\":\"cleanup 的无限循环问题\",\"slug\":\"cleanup-的无限循环问题\",\"link\":\"#cleanup-的无限循环问题\",\"children\":[]}]},{\"level\":2,\"title\":\"嵌套 effect\",\"slug\":\"嵌套-effect\",\"link\":\"#嵌套-effect\",\"children\":[]},{\"level\":2,\"title\":\"避免无限递归循环\",\"slug\":\"避免无限递归循环\",\"link\":\"#避免无限递归循环\",\"children\":[]},{\"level\":2,\"title\":\"调度执行\",\"slug\":\"调度执行\",\"link\":\"#调度执行\",\"children\":[{\"level\":3,\"title\":\"调度执行的例子\",\"slug\":\"调度执行的例子\",\"link\":\"#调度执行的例子\",\"children\":[]}]}],\"readingTime\":{\"minutes\":7.06,\"words\":2119},\"filePathRelative\":\"vue3/2.reactivity.md\",\"autoDesc\":true}")
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
