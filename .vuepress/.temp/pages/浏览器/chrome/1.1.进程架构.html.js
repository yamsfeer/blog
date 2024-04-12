import comp from "/Users/yams/github/notes-fe/.vuepress/.temp/pages/浏览器/chrome/1.1.进程架构.html.vue"
const data = JSON.parse("{\"path\":\"/%E6%B5%8F%E8%A7%88%E5%99%A8/chrome/1.1.%E8%BF%9B%E7%A8%8B%E6%9E%B6%E6%9E%84.html\",\"title\":\"进程架构\",\"lang\":\"zh-CN\",\"frontmatter\":{\"description\":\"进程架构 浏览器是一个多进程多线程的应用程序。 浏览器进程：负责界面显示、用户交互、子进程管理等。内部有多个线程处理不同的任务。 网络进程：加载网络资源。内部会启动多个线程处理不同的网络任务。 渲染进程：绘制页面 渲染进程启动后，会开启一个渲染主线程，主线程负责执行 HTML、CSS、 JS 代码。 默认情况下，浏览器会为每个标签⻚开启一个新的渲染进程...\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://yamsfeer.github.io/notes-fe/%E6%B5%8F%E8%A7%88%E5%99%A8/chrome/1.1.%E8%BF%9B%E7%A8%8B%E6%9E%B6%E6%9E%84.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"yamsfeer\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"进程架构\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"进程架构 浏览器是一个多进程多线程的应用程序。 浏览器进程：负责界面显示、用户交互、子进程管理等。内部有多个线程处理不同的任务。 网络进程：加载网络资源。内部会启动多个线程处理不同的网络任务。 渲染进程：绘制页面 渲染进程启动后，会开启一个渲染主线程，主线程负责执行 HTML、CSS、 JS 代码。 默认情况下，浏览器会为每个标签⻚开启一个新的渲染进程...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:image\",\"content\":\"https://yamsfeer.github.io/notes-fe/Users/yams/Desktop/chrome-task-manager.png\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"进程架构\\\",\\\"image\\\":[\\\"https://yamsfeer.github.io/notes-fe/Users/yams/Desktop/chrome-task-manager.png\\\"],\\\"dateModified\\\":null,\\\"author\\\":[]}\"]]},\"headers\":[{\"level\":2,\"title\":\"渲染主线程\",\"slug\":\"渲染主线程\",\"link\":\"#渲染主线程\",\"children\":[]}],\"readingTime\":{\"minutes\":1.06,\"words\":317},\"filePathRelative\":\"浏览器/chrome/1.1.进程架构.md\",\"autoDesc\":true}")
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
