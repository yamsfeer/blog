import comp from "/Users/yams/github/notes-fe/.vuepress/.temp/pages/框架/vue.html.vue"
const data = JSON.parse("{\"path\":\"/%E6%A1%86%E6%9E%B6/vue.html\",\"title\":\"vue\",\"lang\":\"zh-CN\",\"frontmatter\":{\"description\":\"vue 数据驱动 + 声明式 VS 响应式 + 组件化 设计 vdom 的原因 框架设计 vue 是数据驱动的，当数据变化时，如果做全量更新，效率太低，因此用虚拟 dom 做 diff 算法，只做必要的更新 跨平台 用对象代替真实 dom 可以做到跨平台 响应式 响应式就是：当数据变化时，自动执行一些操作，比如函数 组件化 理解 vue 组件的各个部分...\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://yamsfeer.github.io/notes-fe/%E6%A1%86%E6%9E%B6/vue.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"yamsfeer\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"vue\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"vue 数据驱动 + 声明式 VS 响应式 + 组件化 设计 vdom 的原因 框架设计 vue 是数据驱动的，当数据变化时，如果做全量更新，效率太低，因此用虚拟 dom 做 diff 算法，只做必要的更新 跨平台 用对象代替真实 dom 可以做到跨平台 响应式 响应式就是：当数据变化时，自动执行一些操作，比如函数 组件化 理解 vue 组件的各个部分...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"vue\\\",\\\"image\\\":[\\\"\\\"],\\\"dateModified\\\":null,\\\"author\\\":[]}\"]]},\"headers\":[{\"level\":2,\"title\":\"设计 vdom 的原因\",\"slug\":\"设计-vdom-的原因\",\"link\":\"#设计-vdom-的原因\",\"children\":[]},{\"level\":2,\"title\":\"响应式\",\"slug\":\"响应式\",\"link\":\"#响应式\",\"children\":[]},{\"level\":2,\"title\":\"组件化\",\"slug\":\"组件化\",\"link\":\"#组件化\",\"children\":[{\"level\":3,\"title\":\"vue 组件配置对象，vue 组件实例对象\",\"slug\":\"vue-组件配置对象-vue-组件实例对象\",\"link\":\"#vue-组件配置对象-vue-组件实例对象\",\"children\":[]},{\"level\":3,\"title\":\"vnode 就是一个对象\",\"slug\":\"vnode-就是一个对象\",\"link\":\"#vnode-就是一个对象\",\"children\":[]},{\"level\":3,\"title\":\"render 函数\",\"slug\":\"render-函数\",\"link\":\"#render-函数\",\"children\":[]},{\"level\":3,\"title\":\"组件实例数据结构\",\"slug\":\"组件实例数据结构\",\"link\":\"#组件实例数据结构\",\"children\":[]},{\"level\":3,\"title\":\"setup 函数\",\"slug\":\"setup-函数\",\"link\":\"#setup-函数\",\"children\":[]},{\"level\":3,\"title\":\"异步组件\",\"slug\":\"异步组件\",\"link\":\"#异步组件\",\"children\":[]},{\"level\":3,\"title\":\"其他\",\"slug\":\"其他\",\"link\":\"#其他\",\"children\":[]}]},{\"level\":2,\"title\":\"编译器\",\"slug\":\"编译器\",\"link\":\"#编译器\",\"children\":[]}],\"readingTime\":{\"minutes\":1.85,\"words\":554},\"filePathRelative\":\"框架/vue.md\",\"autoDesc\":true}")
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
