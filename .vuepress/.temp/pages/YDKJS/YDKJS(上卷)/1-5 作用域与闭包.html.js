import comp from "/Users/yams/github/notes-fe/.vuepress/.temp/pages/YDKJS/YDKJS(上卷)/1-5 作用域与闭包.html.vue"
const data = JSON.parse("{\"path\":\"/YDKJS/YDKJS(%E4%B8%8A%E5%8D%B7)/1-5%20%E4%BD%9C%E7%94%A8%E5%9F%9F%E4%B8%8E%E9%97%AD%E5%8C%85.html\",\"title\":\"作用域与闭包\",\"lang\":\"zh-CN\",\"frontmatter\":{\"description\":\"作用域与闭包 闭包 当函数可以记住并访问所在的词法作用域时，就产生了闭包，即使函数是在当前词法作用域之外执行。 参考以下例子1： 这里确切的说没有产生闭包，因为bar函数只是正常地根据作用域查找规则，向上查找到了变量a。 参考例子2: 可以不太严谨地认为能够记住当前作用域的函数，就是闭包。 通常闭包效果的产生都与函数作为值被传递，然后在词法作用域之外被...\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://yamsfeer.github.io/notes-fe/YDKJS/YDKJS(%E4%B8%8A%E5%8D%B7)/1-5%20%E4%BD%9C%E7%94%A8%E5%9F%9F%E4%B8%8E%E9%97%AD%E5%8C%85.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"yamsfeer\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"作用域与闭包\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"作用域与闭包 闭包 当函数可以记住并访问所在的词法作用域时，就产生了闭包，即使函数是在当前词法作用域之外执行。 参考以下例子1： 这里确切的说没有产生闭包，因为bar函数只是正常地根据作用域查找规则，向上查找到了变量a。 参考例子2: 可以不太严谨地认为能够记住当前作用域的函数，就是闭包。 通常闭包效果的产生都与函数作为值被传递，然后在词法作用域之外被...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"作用域与闭包\\\",\\\"image\\\":[\\\"\\\"],\\\"dateModified\\\":null,\\\"author\\\":[]}\"]]},\"headers\":[{\"level\":2,\"title\":\"闭包\",\"slug\":\"闭包\",\"link\":\"#闭包\",\"children\":[{\"level\":3,\"title\":\"循环与闭包\",\"slug\":\"循环与闭包\",\"link\":\"#循环与闭包\",\"children\":[]},{\"level\":3,\"title\":\"模块\",\"slug\":\"模块\",\"link\":\"#模块\",\"children\":[]}]},{\"level\":2,\"title\":\"总结\",\"slug\":\"总结\",\"link\":\"#总结\",\"children\":[]}],\"readingTime\":{\"minutes\":3.69,\"words\":1106},\"filePathRelative\":\"YDKJS/YDKJS(上卷)/1-5 作用域与闭包.md\",\"autoDesc\":true}")
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
