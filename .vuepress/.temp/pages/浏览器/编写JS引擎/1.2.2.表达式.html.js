import comp from "/Users/yams/github/notes-fe/.vuepress/.temp/pages/浏览器/编写JS引擎/1.2.2.表达式.html.vue"
const data = JSON.parse("{\"path\":\"/%E6%B5%8F%E8%A7%88%E5%99%A8/%E7%BC%96%E5%86%99JS%E5%BC%95%E6%93%8E/1.2.2.%E8%A1%A8%E8%BE%BE%E5%BC%8F.html\",\"title\":\"表达式\",\"lang\":\"zh-CN\",\"frontmatter\":{\"description\":\"表达式 左递归和表达式优先级 假设有一个产生式： A→Aα∣β 这个产生式只能推导出以 β 开头的句子，比如： β,βα,βαα,βααα,… 且这个产生式存在左递归，无法使用递归向下算法求解。 为了消除左递归，对产生式做等效替换，得到新的产生式： A→βA′A′→αA′∣ϵ 一般情况的左递归处理 针对以下产生式： A→Aα∣Aβ∣Aγ∣λ 该产生式有...\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://yamsfeer.github.io/notes-fe/%E6%B5%8F%E8%A7%88%E5%99%A8/%E7%BC%96%E5%86%99JS%E5%BC%95%E6%93%8E/1.2.2.%E8%A1%A8%E8%BE%BE%E5%BC%8F.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"yamsfeer\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"表达式\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"表达式 左递归和表达式优先级 假设有一个产生式： A→Aα∣β 这个产生式只能推导出以 β 开头的句子，比如： β,βα,βαα,βααα,… 且这个产生式存在左递归，无法使用递归向下算法求解。 为了消除左递归，对产生式做等效替换，得到新的产生式： A→βA′A′→αA′∣ϵ 一般情况的左递归处理 针对以下产生式： A→Aα∣Aβ∣Aγ∣λ 该产生式有...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"表达式\\\",\\\"image\\\":[\\\"\\\"],\\\"dateModified\\\":null,\\\"author\\\":[]}\"]]},\"headers\":[{\"level\":2,\"title\":\"左递归和表达式优先级\",\"slug\":\"左递归和表达式优先级\",\"link\":\"#左递归和表达式优先级\",\"children\":[{\"level\":3,\"title\":\"一般情况的左递归处理\",\"slug\":\"一般情况的左递归处理\",\"link\":\"#一般情况的左递归处理\",\"children\":[]},{\"level\":3,\"title\":\"优先级\",\"slug\":\"优先级\",\"link\":\"#优先级\",\"children\":[]},{\"level\":3,\"title\":\"优先级产生式的去左递归\",\"slug\":\"优先级产生式的去左递归\",\"link\":\"#优先级产生式的去左递归\",\"children\":[]},{\"level\":3,\"title\":\"操作符优先级的一般情况\",\"slug\":\"操作符优先级的一般情况\",\"link\":\"#操作符优先级的一般情况\",\"children\":[]}]}],\"readingTime\":{\"minutes\":1.98,\"words\":593},\"filePathRelative\":\"浏览器/编写JS引擎/1.2.2.表达式.md\",\"autoDesc\":true}")
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
