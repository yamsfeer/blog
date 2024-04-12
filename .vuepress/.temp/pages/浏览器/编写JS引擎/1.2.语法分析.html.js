import comp from "/Users/yams/github/notes-fe/.vuepress/.temp/pages/浏览器/编写JS引擎/1.2.语法分析.html.vue"
const data = JSON.parse("{\"path\":\"/%E6%B5%8F%E8%A7%88%E5%99%A8/%E7%BC%96%E5%86%99JS%E5%BC%95%E6%93%8E/1.2.%E8%AF%AD%E6%B3%95%E5%88%86%E6%9E%90.html\",\"title\":\"语法分析\",\"lang\":\"zh-CN\",\"frontmatter\":{\"description\":\"语法分析 抽象语法树的节点主要有 因子（Factor）、表达式（Expr）、语句（Stmt）三大类型。其中 Factor 有变量和字面量（直接量），语句也有 if 语句、for 语句等。它们的关系如下图： 推导关系 程序由语句构成，有如下推导关系： Program→Stmts→Stmt Stmts ∣ ϵStmt→ForStmt ∣ DeclStmt ...\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://yamsfeer.github.io/notes-fe/%E6%B5%8F%E8%A7%88%E5%99%A8/%E7%BC%96%E5%86%99JS%E5%BC%95%E6%93%8E/1.2.%E8%AF%AD%E6%B3%95%E5%88%86%E6%9E%90.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"yamsfeer\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"语法分析\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"语法分析 抽象语法树的节点主要有 因子（Factor）、表达式（Expr）、语句（Stmt）三大类型。其中 Factor 有变量和字面量（直接量），语句也有 if 语句、for 语句等。它们的关系如下图： 推导关系 程序由语句构成，有如下推导关系： Program→Stmts→Stmt Stmts ∣ ϵStmt→ForStmt ∣ DeclStmt ...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:image\",\"content\":\"https://raw.githubusercontent.com/yamsfeer/pic-bed/master/008i3skNgy1gx3fqsg90dj30jl011wef.jpg\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"语法分析\\\",\\\"image\\\":[\\\"https://raw.githubusercontent.com/yamsfeer/pic-bed/master/008i3skNgy1gx3fqsg90dj30jl011wef.jpg\\\",\\\"https://raw.githubusercontent.com/yamsfeer/pic-bed/master/008i3skNgy1gx3fqop3rwj30fj011gli.jpg\\\",\\\"https://raw.githubusercontent.com/yamsfeer/pic-bed/master/008i3skNgy1gx3fqnu6i6j30om03e3ym.jpg\\\"],\\\"dateModified\\\":null,\\\"author\\\":[]}\"]]},\"headers\":[{\"level\":3,\"title\":\"推导关系\",\"slug\":\"推导关系\",\"link\":\"#推导关系\",\"children\":[]},{\"level\":3,\"title\":\"声明语句\",\"slug\":\"声明语句\",\"link\":\"#声明语句\",\"children\":[]},{\"level\":3,\"title\":\"赋值语句\",\"slug\":\"赋值语句\",\"link\":\"#赋值语句\",\"children\":[]},{\"level\":3,\"title\":\"if 语句\",\"slug\":\"if-语句\",\"link\":\"#if-语句\",\"children\":[]},{\"level\":3,\"title\":\"function\",\"slug\":\"function\",\"link\":\"#function\",\"children\":[]}],\"readingTime\":{\"minutes\":0.65,\"words\":196},\"filePathRelative\":\"浏览器/编写JS引擎/1.2.语法分析.md\",\"autoDesc\":true}")
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
