import comp from "/Users/yams/github/notes-fe/.vuepress/.temp/pages/vue3/3.1.mount.html.vue"
const data = JSON.parse("{\"path\":\"/vue3/3.1.mount.html\",\"title\":\"mount\",\"lang\":\"zh-CN\",\"frontmatter\":{\"description\":\"mount 渲染器的核心功能有两个：挂载 mount 和更新 patch。 上一节介绍过，render 的核心入口是 patch 函数，如果是首次渲染，则调用 mountElement。 mountElement 假设有如下 vnode： mountElement 实现如下： 这里重要的是子节点的处理逻辑：当子节点是数组时，循环调用 patch 处理子...\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://yamsfeer.github.io/notes-fe/vue3/3.1.mount.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"yamsfeer\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"mount\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"mount 渲染器的核心功能有两个：挂载 mount 和更新 patch。 上一节介绍过，render 的核心入口是 patch 函数，如果是首次渲染，则调用 mountElement。 mountElement 假设有如下 vnode： mountElement 实现如下： 这里重要的是子节点的处理逻辑：当子节点是数组时，循环调用 patch 处理子...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"mount\\\",\\\"image\\\":[\\\"\\\"],\\\"dateModified\\\":null,\\\"author\\\":[]}\"]]},\"headers\":[{\"level\":2,\"title\":\"mountElement\",\"slug\":\"mountelement\",\"link\":\"#mountelement\",\"children\":[{\"level\":3,\"title\":\"HTML Attribute 与 DOM Property\",\"slug\":\"html-attribute-与-dom-property\",\"link\":\"#html-attribute-与-dom-property\",\"children\":[]},{\"level\":3,\"title\":\"设置元素属性\",\"slug\":\"设置元素属性\",\"link\":\"#设置元素属性\",\"children\":[]}]},{\"level\":2,\"title\":\"unmount\",\"slug\":\"unmount\",\"link\":\"#unmount\",\"children\":[{\"level\":3,\"title\":\"移除事件监听器\",\"slug\":\"移除事件监听器\",\"link\":\"#移除事件监听器\",\"children\":[]}]}],\"readingTime\":{\"minutes\":3.55,\"words\":1065},\"filePathRelative\":\"vue3/3.1.mount.md\",\"autoDesc\":true}")
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
