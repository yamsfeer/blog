import comp from "/Users/yams/github/notes-fe/.vuepress/.temp/pages/YDKJS/YDKJS(上卷)/2-5 原型.html.vue"
const data = JSON.parse("{\"path\":\"/YDKJS/YDKJS(%E4%B8%8A%E5%8D%B7)/2-5%20%E5%8E%9F%E5%9E%8B.html\",\"title\":\"原型\",\"lang\":\"zh-CN\",\"frontmatter\":{\"description\":\"原型 第 4 章中介绍的所有模拟类复制行为的方法，如各种混入，都没有使用 [[Prototype]] 链机制。 [[Prototype]] [[Prototype]] 是JavaScript 对象的一个特殊内置属性。 查找属性与原型链 引用对象的属性时会触发 [[Get]] 操作，比如obj.a。忽略proxy的情况下，[[Get]]操作的具体步骤为：...\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://yamsfeer.github.io/notes-fe/YDKJS/YDKJS(%E4%B8%8A%E5%8D%B7)/2-5%20%E5%8E%9F%E5%9E%8B.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"yamsfeer\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"原型\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"原型 第 4 章中介绍的所有模拟类复制行为的方法，如各种混入，都没有使用 [[Prototype]] 链机制。 [[Prototype]] [[Prototype]] 是JavaScript 对象的一个特殊内置属性。 查找属性与原型链 引用对象的属性时会触发 [[Get]] 操作，比如obj.a。忽略proxy的情况下，[[Get]]操作的具体步骤为：...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"原型\\\",\\\"image\\\":[\\\"\\\"],\\\"dateModified\\\":null,\\\"author\\\":[]}\"]]},\"headers\":[{\"level\":2,\"title\":\"[[Prototype]]\",\"slug\":\"prototype\",\"link\":\"#prototype\",\"children\":[{\"level\":3,\"title\":\"查找属性与原型链\",\"slug\":\"查找属性与原型链\",\"link\":\"#查找属性与原型链\",\"children\":[]},{\"level\":3,\"title\":\"属性设置和屏蔽\",\"slug\":\"属性设置和屏蔽\",\"link\":\"#属性设置和屏蔽\",\"children\":[]}]},{\"level\":2,\"title\":\"“类”\",\"slug\":\"类\",\"link\":\"#类\",\"children\":[{\"level\":3,\"title\":\"用原型模仿类\",\"slug\":\"用原型模仿类\",\"link\":\"#用原型模仿类\",\"children\":[]},{\"level\":3,\"title\":\"那些为模仿类而生的名字\",\"slug\":\"那些为模仿类而生的名字\",\"link\":\"#那些为模仿类而生的名字\",\"children\":[]}]},{\"level\":2,\"title\":\"原型继承\",\"slug\":\"原型继承\",\"link\":\"#原型继承\",\"children\":[{\"level\":3,\"title\":\"检查“实例”所属的\\\"类\\\"\",\"slug\":\"检查-实例-所属的-类\",\"link\":\"#检查-实例-所属的-类\",\"children\":[]}]},{\"level\":2,\"title\":\"Object.create\",\"slug\":\"object-create\",\"link\":\"#object-create\",\"children\":[]},{\"level\":2,\"title\":\"小结\",\"slug\":\"小结\",\"link\":\"#小结\",\"children\":[]}],\"readingTime\":{\"minutes\":7.25,\"words\":2174},\"filePathRelative\":\"YDKJS/YDKJS(上卷)/2-5 原型.md\",\"autoDesc\":true}")
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
