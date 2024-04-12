import comp from "/Users/yams/github/notes-fe/.vuepress/.temp/pages/index.html.vue"
const data = JSON.parse("{\"path\":\"/\",\"title\":\"\",\"lang\":\"zh-CN\",\"frontmatter\":{\"home\":true,\"heroText\":\"yamsfeer 笔记\",\"tagline\":false,\"navbar\":false,\"actions\":[{\"text\":\"JS\",\"link\":\"/JS/\"},{\"text\":\"css\",\"link\":\"/css/\"},{\"text\":\"浏览器\",\"link\":\"/浏览器/\"},{\"text\":\"源码\",\"link\":\"/源码/\"},{\"text\":\"工程架构\",\"link\":\"/工程架构/\"},{\"text\":\"解决方案\",\"link\":\"/解决方案/\"}],\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://yamsfeer.github.io/notes-fe/\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"yamsfeer\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"website\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"WebPage\\\",\\\"name\\\":\\\"\\\"}\"]]},\"headers\":[],\"readingTime\":{\"minutes\":0.2,\"words\":61},\"filePathRelative\":\"index.md\"}")
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
