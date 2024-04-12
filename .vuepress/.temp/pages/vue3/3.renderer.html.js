import comp from "/Users/yams/github/notes-fe/.vuepress/.temp/pages/vue3/3.renderer.html.vue"
const data = JSON.parse("{\"path\":\"/vue3/3.renderer.html\",\"title\":\"renderer\",\"lang\":\"zh-CN\",\"frontmatter\":{\"description\":\"renderer renderer 的作用就是将 vnode 渲染成真实 dom。一个 renderer 的结构大概是这样的： renderer 有一个 render 函数，它接受 vnode 以及 container 作为参数，将 vnode 渲染成真实的 dom 节点并挂载到 container 上。 利用响应式系统，我们可以让渲染过程自动化。 上...\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://yamsfeer.github.io/notes-fe/vue3/3.renderer.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"yamsfeer\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"renderer\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"renderer renderer 的作用就是将 vnode 渲染成真实 dom。一个 renderer 的结构大概是这样的： renderer 有一个 render 函数，它接受 vnode 以及 container 作为参数，将 vnode 渲染成真实的 dom 节点并挂载到 container 上。 利用响应式系统，我们可以让渲染过程自动化。 上...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"renderer\\\",\\\"image\\\":[\\\"\\\"],\\\"dateModified\\\":null,\\\"author\\\":[]}\"]]},\"headers\":[{\"level\":2,\"title\":\"renderer 的基本概念\",\"slug\":\"renderer-的基本概念\",\"link\":\"#renderer-的基本概念\",\"children\":[{\"level\":3,\"title\":\"vnode\",\"slug\":\"vnode\",\"link\":\"#vnode\",\"children\":[]},{\"level\":3,\"title\":\"mount&patch\",\"slug\":\"mount-patch\",\"link\":\"#mount-patch\",\"children\":[]}]}],\"readingTime\":{\"minutes\":2.04,\"words\":613},\"filePathRelative\":\"vue3/3.renderer.md\",\"autoDesc\":true}")
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
