import comp from "/Users/yams/github/notes-fe/.vuepress/.temp/pages/vue3/3.3.diff.html.vue"
const data = JSON.parse("{\"path\":\"/vue3/3.3.diff.html\",\"title\":\"diff\",\"lang\":\"zh-CN\",\"frontmatter\":{\"description\":\"diff diff 算法用来计算两组子节点的差异，并最大程度复用 dom 元素。 算法的整体策略是：深度优先，同层比较。即比较只会在同层级进行, 不会跨层级比较。 以下 diff 算法的讲解针对的都是某一层的新旧节点列表。 双端 diff 双端 diff 算法的特点是，从新旧节点的两边向中间比较。 比较过程可以分为 3 步： 新旧列表两端各有两个节点，...\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://yamsfeer.github.io/notes-fe/vue3/3.3.diff.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"yamsfeer\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"diff\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"diff diff 算法用来计算两组子节点的差异，并最大程度复用 dom 元素。 算法的整体策略是：深度优先，同层比较。即比较只会在同层级进行, 不会跨层级比较。 以下 diff 算法的讲解针对的都是某一层的新旧节点列表。 双端 diff 双端 diff 算法的特点是，从新旧节点的两边向中间比较。 比较过程可以分为 3 步： 新旧列表两端各有两个节点，...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:image\",\"content\":\"https://raw.githubusercontent.com/yamsfeer/pic-bed/master/diff%E7%AE%97%E6%B3%95-%E6%9C%80%E9%95%BF%E9%80%92%E5%A2%9E%E5%AD%90%E5%BA%8F%E5%88%97.svg\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"diff\\\",\\\"image\\\":[\\\"https://raw.githubusercontent.com/yamsfeer/pic-bed/master/diff%E7%AE%97%E6%B3%95-%E6%9C%80%E9%95%BF%E9%80%92%E5%A2%9E%E5%AD%90%E5%BA%8F%E5%88%97.svg\\\"],\\\"dateModified\\\":null,\\\"author\\\":[]}\"]]},\"headers\":[{\"level\":2,\"title\":\"双端 diff\",\"slug\":\"双端-diff\",\"link\":\"#双端-diff\",\"children\":[{\"level\":3,\"title\":\"两端比较\",\"slug\":\"两端比较\",\"link\":\"#两端比较\",\"children\":[]},{\"level\":3,\"title\":\"中间遍历\",\"slug\":\"中间遍历\",\"link\":\"#中间遍历\",\"children\":[]},{\"level\":3,\"title\":\"处理剩余节点\",\"slug\":\"处理剩余节点\",\"link\":\"#处理剩余节点\",\"children\":[]}]},{\"level\":2,\"title\":\"快速 diff\",\"slug\":\"快速-diff\",\"link\":\"#快速-diff\",\"children\":[{\"level\":3,\"title\":\"预处理\",\"slug\":\"预处理\",\"link\":\"#预处理\",\"children\":[]},{\"level\":3,\"title\":\"source 列表\",\"slug\":\"source-列表\",\"link\":\"#source-列表\",\"children\":[]},{\"level\":3,\"title\":\"最长递增子序列\",\"slug\":\"最长递增子序列\",\"link\":\"#最长递增子序列\",\"children\":[]}]}],\"readingTime\":{\"minutes\":3.61,\"words\":1084},\"filePathRelative\":\"vue3/3.3.diff.md\",\"autoDesc\":true}")
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
