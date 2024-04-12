import comp from "/Users/yams/github/notes-fe/.vuepress/.temp/pages/vue3/2.1.computed.html.vue"
const data = JSON.parse("{\"path\":\"/vue3/2.1.computed.html\",\"title\":\"computed\",\"lang\":\"zh-CN\",\"frontmatter\":{\"description\":\"computed computed 使用起来大概是这样的： computed 函数接受一个 getter 函数，getter 函数将访问 reactive 对象的属性并返回一个计算值，当 reactive 对象变化时，computed 可以自动获得新的计算值。 基本实现 回顾之前的 effect 函数。 可以看到 effectFn 在注册时是立即执行一...\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://yamsfeer.github.io/notes-fe/vue3/2.1.computed.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"yamsfeer\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"computed\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"computed computed 使用起来大概是这样的： computed 函数接受一个 getter 函数，getter 函数将访问 reactive 对象的属性并返回一个计算值，当 reactive 对象变化时，computed 可以自动获得新的计算值。 基本实现 回顾之前的 effect 函数。 可以看到 effectFn 在注册时是立即执行一...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:image\",\"content\":\"https://raw.githubusercontent.com/yamsfeer/pic-bed/master/reactivity-%E5%B5%8C%E5%A5%97effect.svg\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"computed\\\",\\\"image\\\":[\\\"https://raw.githubusercontent.com/yamsfeer/pic-bed/master/reactivity-%E5%B5%8C%E5%A5%97effect.svg\\\"],\\\"dateModified\\\":null,\\\"author\\\":[]}\"]]},\"headers\":[{\"level\":2,\"title\":\"基本实现\",\"slug\":\"基本实现\",\"link\":\"#基本实现\",\"children\":[]},{\"level\":2,\"title\":\"缓存 computed 值\",\"slug\":\"缓存-computed-值\",\"link\":\"#缓存-computed-值\",\"children\":[]},{\"level\":2,\"title\":\"在 effect 中读取 computed 的值\",\"slug\":\"在-effect-中读取-computed-的值\",\"link\":\"#在-effect-中读取-computed-的值\",\"children\":[]}],\"readingTime\":{\"minutes\":3.67,\"words\":1100},\"filePathRelative\":\"vue3/2.1.computed.md\",\"autoDesc\":true}")
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
