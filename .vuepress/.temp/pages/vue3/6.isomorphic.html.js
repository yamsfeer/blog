import comp from "/Users/yams/github/notes-fe/.vuepress/.temp/pages/vue3/6.isomorphic.html.vue"
const data = JSON.parse("{\"path\":\"/vue3/6.isomorphic.html\",\"title\":\"同构渲染\",\"lang\":\"zh-CN\",\"frontmatter\":{\"description\":\"同构渲染 同构渲染就是，服务器将渲染好的 html 代码发送给浏览器 ( 这一步和 SSR 一样 )，浏览器通过 html 加载 JS 代码后，然后进行激活操作。 激活操作也称注水 ( hydration )，它主要分为两部分工作： 在真实 dom 和虚拟 dom 之间建立联系 为 dom 元素添加事件绑定 激活完成后，整个应用就完全被 vue 接管成...\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://yamsfeer.github.io/notes-fe/vue3/6.isomorphic.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"yamsfeer\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"同构渲染\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"同构渲染 同构渲染就是，服务器将渲染好的 html 代码发送给浏览器 ( 这一步和 SSR 一样 )，浏览器通过 html 加载 JS 代码后，然后进行激活操作。 激活操作也称注水 ( hydration )，它主要分为两部分工作： 在真实 dom 和虚拟 dom 之间建立联系 为 dom 元素添加事件绑定 激活完成后，整个应用就完全被 vue 接管成...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"同构渲染\\\",\\\"image\\\":[\\\"\\\"],\\\"dateModified\\\":null,\\\"author\\\":[]}\"]]},\"headers\":[{\"level\":2,\"title\":\"渲染 vnode 成 html\",\"slug\":\"渲染-vnode-成-html\",\"link\":\"#渲染-vnode-成-html\",\"children\":[{\"level\":3,\"title\":\"将组件渲染成 html 字符串\",\"slug\":\"将组件渲染成-html-字符串\",\"link\":\"#将组件渲染成-html-字符串\",\"children\":[]}]},{\"level\":2,\"title\":\"激活\",\"slug\":\"激活\",\"link\":\"#激活\",\"children\":[]}],\"readingTime\":{\"minutes\":3.69,\"words\":1107},\"filePathRelative\":\"vue3/6.isomorphic.md\",\"autoDesc\":true}")
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
