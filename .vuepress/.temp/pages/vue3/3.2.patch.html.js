import comp from "/Users/yams/github/notes-fe/.vuepress/.temp/pages/vue3/3.2.patch.html.vue"
const data = JSON.parse("{\"path\":\"/vue3/3.2.patch.html\",\"title\":\"patch\",\"lang\":\"zh-CN\",\"frontmatter\":{\"description\":\"patch 回顾 patch 函数的结构。 以上逻辑都是基于新节点是 div 这类普通标签的判断。 事实上，patch 还有其他几种情况。比如：n1 存在但 n1 和 n2 的类型不同的情况下，n1 肯定不能再通过打补丁使其可用，因此可以直接卸载；n2.type 是对象时表示它描述的是组件，组件有一套和元素不同的 mount 和 patch 方法。 考...\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://yamsfeer.github.io/notes-fe/vue3/3.2.patch.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"yamsfeer\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"patch\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"patch 回顾 patch 函数的结构。 以上逻辑都是基于新节点是 div 这类普通标签的判断。 事实上，patch 还有其他几种情况。比如：n1 存在但 n1 和 n2 的类型不同的情况下，n1 肯定不能再通过打补丁使其可用，因此可以直接卸载；n2.type 是对象时表示它描述的是组件，组件有一套和元素不同的 mount 和 patch 方法。 考...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"patch\\\",\\\"image\\\":[\\\"\\\"],\\\"dateModified\\\":null,\\\"author\\\":[]}\"]]},\"headers\":[{\"level\":2,\"title\":\"patchElement\",\"slug\":\"patchelement\",\"link\":\"#patchelement\",\"children\":[{\"level\":3,\"title\":\"patchProps\",\"slug\":\"patchprops\",\"link\":\"#patchprops\",\"children\":[]},{\"level\":3,\"title\":\"patchChildren\",\"slug\":\"patchchildren\",\"link\":\"#patchchildren\",\"children\":[]}]}],\"readingTime\":{\"minutes\":2.7,\"words\":809},\"filePathRelative\":\"vue3/3.2.patch.md\",\"autoDesc\":true}")
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
