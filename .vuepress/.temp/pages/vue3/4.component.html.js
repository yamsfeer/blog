import comp from "/Users/yams/github/notes-fe/.vuepress/.temp/pages/vue3/4.component.html.vue"
const data = JSON.parse("{\"path\":\"/vue3/4.component.html\",\"title\":\"component\",\"lang\":\"zh-CN\",\"frontmatter\":{\"description\":\"component 回顾之前的 patch 函数。 在 patch 一个 vnode 时，会根据 vnode.type 做出相应的操作。当 vnode.type 是一个对象时，这个对象描述的是一个组件。 一个组件对象基本结构如下，其中 render 函数是必不可少的，且 render 函数返回的应该是 vnode。 对于一个组件类型的 vnode 而言...\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://yamsfeer.github.io/notes-fe/vue3/4.component.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"yamsfeer\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"component\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"component 回顾之前的 patch 函数。 在 patch 一个 vnode 时，会根据 vnode.type 做出相应的操作。当 vnode.type 是一个对象时，这个对象描述的是一个组件。 一个组件对象基本结构如下，其中 render 函数是必不可少的，且 render 函数返回的应该是 vnode。 对于一个组件类型的 vnode 而言...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"component\\\",\\\"image\\\":[\\\"\\\"],\\\"dateModified\\\":null,\\\"author\\\":[]}\"]]},\"headers\":[{\"level\":2,\"title\":\"mountComponent\",\"slug\":\"mountcomponent\",\"link\":\"#mountcomponent\",\"children\":[{\"level\":3,\"title\":\"响应系统与组件\",\"slug\":\"响应系统与组件\",\"link\":\"#响应系统与组件\",\"children\":[]},{\"level\":3,\"title\":\"组件更新调度器\",\"slug\":\"组件更新调度器\",\"link\":\"#组件更新调度器\",\"children\":[]}]},{\"level\":2,\"title\":\"组件实例\",\"slug\":\"组件实例\",\"link\":\"#组件实例\",\"children\":[]},{\"level\":2,\"title\":\"组件生命周期\",\"slug\":\"组件生命周期\",\"link\":\"#组件生命周期\",\"children\":[]},{\"level\":2,\"title\":\"组件的 props\",\"slug\":\"组件的-props\",\"link\":\"#组件的-props\",\"children\":[{\"level\":3,\"title\":\"渲染上下文 renderContext\",\"slug\":\"渲染上下文-rendercontext\",\"link\":\"#渲染上下文-rendercontext\",\"children\":[]}]},{\"level\":2,\"title\":\"patchComponent\",\"slug\":\"patchcomponent\",\"link\":\"#patchcomponent\",\"children\":[]}],\"readingTime\":{\"minutes\":5.82,\"words\":1746},\"filePathRelative\":\"vue3/4.component.md\",\"autoDesc\":true}")
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
