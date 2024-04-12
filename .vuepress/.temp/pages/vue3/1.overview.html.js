import comp from "/Users/yams/github/notes-fe/.vuepress/.temp/pages/vue3/1.overview.html.vue"
const data = JSON.parse("{\"path\":\"/vue3/1.overview.html\",\"title\":\"overview\",\"lang\":\"zh-CN\",\"frontmatter\":{\"description\":\"overview 与 vue2 相比，vue3 的改进可分为三个方面：源码维护、性能优化、逻辑组织优化。 源码维护 vue3 使用 monorepo 管理代码，项目分为三大部分：reactivity、runtime、compiler。 monorepo 使得各个 package 之间相互独立，可单独测试和使用。 除此之外，vue3 还使用了 types...\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://yamsfeer.github.io/notes-fe/vue3/1.overview.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"yamsfeer\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"overview\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"overview 与 vue2 相比，vue3 的改进可分为三个方面：源码维护、性能优化、逻辑组织优化。 源码维护 vue3 使用 monorepo 管理代码，项目分为三大部分：reactivity、runtime、compiler。 monorepo 使得各个 package 之间相互独立，可单独测试和使用。 除此之外，vue3 还使用了 types...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"overview\\\",\\\"image\\\":[\\\"\\\"],\\\"dateModified\\\":null,\\\"author\\\":[]}\"]]},\"headers\":[{\"level\":2,\"title\":\"源码维护\",\"slug\":\"源码维护\",\"link\":\"#源码维护\",\"children\":[]},{\"level\":2,\"title\":\"性能优化\",\"slug\":\"性能优化\",\"link\":\"#性能优化\",\"children\":[{\"level\":3,\"title\":\"更小的代码体积\",\"slug\":\"更小的代码体积\",\"link\":\"#更小的代码体积\",\"children\":[]},{\"level\":3,\"title\":\"数据劫持优化：proxy\",\"slug\":\"数据劫持优化-proxy\",\"link\":\"#数据劫持优化-proxy\",\"children\":[]},{\"level\":3,\"title\":\"编译优化\",\"slug\":\"编译优化\",\"link\":\"#编译优化\",\"children\":[]},{\"level\":3,\"title\":\"重写 diff 算法\",\"slug\":\"重写-diff-算法\",\"link\":\"#重写-diff-算法\",\"children\":[]}]},{\"level\":2,\"title\":\"逻辑组织优化\",\"slug\":\"逻辑组织优化\",\"link\":\"#逻辑组织优化\",\"children\":[]}],\"readingTime\":{\"minutes\":2.44,\"words\":731},\"filePathRelative\":\"vue3/1.overview.md\",\"autoDesc\":true}")
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
