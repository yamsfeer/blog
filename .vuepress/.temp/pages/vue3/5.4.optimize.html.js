import comp from "/Users/yams/github/notes-fe/.vuepress/.temp/pages/vue3/5.4.optimize.html.vue"
const data = JSON.parse("{\"path\":\"/vue3/5.4.optimize.html\",\"title\":\"optimize\",\"lang\":\"zh-CN\",\"frontmatter\":{\"description\":\"optimize 在 vue 的 diff 算法中，对比新旧 vnode 树时，总是按层级同层比较，这产生了很多无意义的对比操作。 假设有如下模板： diff 算法对比新旧 vnode 树的过程如下： 对比 div 节点及其属性 对比 p 节点及其属性 对比文本节点 事实上，这段代码中只有 text 文本节点会发生变化，其余的两项对比是不必要的。 总的...\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://yamsfeer.github.io/notes-fe/vue3/5.4.optimize.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"yamsfeer\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"optimize\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"optimize 在 vue 的 diff 算法中，对比新旧 vnode 树时，总是按层级同层比较，这产生了很多无意义的对比操作。 假设有如下模板： diff 算法对比新旧 vnode 树的过程如下： 对比 div 节点及其属性 对比 p 节点及其属性 对比文本节点 事实上，这段代码中只有 text 文本节点会发生变化，其余的两项对比是不必要的。 总的...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"optimize\\\",\\\"image\\\":[\\\"\\\"],\\\"dateModified\\\":null,\\\"author\\\":[]}\"]]},\"headers\":[{\"level\":2,\"title\":\"block 与 patchFlag\",\"slug\":\"block-与-patchflag\",\"link\":\"#block-与-patchflag\",\"children\":[{\"level\":3,\"title\":\"patchFlag\",\"slug\":\"patchflag\",\"link\":\"#patchflag\",\"children\":[]},{\"level\":3,\"title\":\"block\",\"slug\":\"block\",\"link\":\"#block\",\"children\":[]},{\"level\":3,\"title\":\"如何收集动态节点\",\"slug\":\"如何收集动态节点\",\"link\":\"#如何收集动态节点\",\"children\":[]},{\"level\":3,\"title\":\"渲染器运行时支持\",\"slug\":\"渲染器运行时支持\",\"link\":\"#渲染器运行时支持\",\"children\":[]}]},{\"level\":2,\"title\":\"静态提升\",\"slug\":\"静态提升\",\"link\":\"#静态提升\",\"children\":[]},{\"level\":2,\"title\":\"预字符串化\",\"slug\":\"预字符串化\",\"link\":\"#预字符串化\",\"children\":[]}],\"readingTime\":{\"minutes\":5.05,\"words\":1516},\"filePathRelative\":\"vue3/5.4.optimize.md\",\"autoDesc\":true}")
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
