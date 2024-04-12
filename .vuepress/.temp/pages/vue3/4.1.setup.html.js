import comp from "/Users/yams/github/notes-fe/.vuepress/.temp/pages/vue3/4.1.setup.html.vue"
const data = JSON.parse("{\"path\":\"/vue3/4.1.setup.html\",\"title\":\"setup 函数\",\"lang\":\"zh-CN\",\"frontmatter\":{\"description\":\"setup 函数 setup 函数内可以创建响应式数据、注册生命周期函数等，在组件的生命周期中，setup 函数只会在 mountComponent 中执行一次。 setup 函数有两种返回值： 返回 render 函数 返回一个数据对象供 render 函数使用 setup 函数接收的参数也有两个：props 和 setupContext，props...\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://yamsfeer.github.io/notes-fe/vue3/4.1.setup.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"yamsfeer\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"setup 函数\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"setup 函数 setup 函数内可以创建响应式数据、注册生命周期函数等，在组件的生命周期中，setup 函数只会在 mountComponent 中执行一次。 setup 函数有两种返回值： 返回 render 函数 返回一个数据对象供 render 函数使用 setup 函数接收的参数也有两个：props 和 setupContext，props...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"setup 函数\\\",\\\"image\\\":[\\\"\\\"],\\\"dateModified\\\":null,\\\"author\\\":[]}\"]]},\"headers\":[{\"level\":2,\"title\":\"emit 自定义事件\",\"slug\":\"emit-自定义事件\",\"link\":\"#emit-自定义事件\",\"children\":[]},{\"level\":2,\"title\":\"slot 插槽\",\"slug\":\"slot-插槽\",\"link\":\"#slot-插槽\",\"children\":[]},{\"level\":2,\"title\":\"注册生命周期\",\"slug\":\"注册生命周期\",\"link\":\"#注册生命周期\",\"children\":[]}],\"readingTime\":{\"minutes\":3,\"words\":900},\"filePathRelative\":\"vue3/4.1.setup.md\",\"autoDesc\":true}")
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
