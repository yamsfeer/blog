import comp from "/Users/yams/github/notes-fe/.vuepress/.temp/pages/工程架构/前端监控/3.性能优化.html.vue"
const data = JSON.parse("{\"path\":\"/%E5%B7%A5%E7%A8%8B%E6%9E%B6%E6%9E%84/%E5%89%8D%E7%AB%AF%E7%9B%91%E6%8E%A7/3.%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96.html\",\"title\":\"性能优化\",\"lang\":\"zh-CN\",\"frontmatter\":{\"description\":\"性能优化 按传统指标优化 网络优化 使用 http2 兼容性：当浏览器不支持 http2 时，要降级 早期浏览器会限制同一个域名下的并发请求连接数，因此以前可以将资源放在不同的域名下，但在 http2 中，为了支持多路复用，反而应该放在同一域名下。 开启 brotli 压缩 与 gzip 相比，brotli 压缩具有更高的压缩比和压缩速度。 使用 ht...\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://yamsfeer.github.io/notes-fe/%E5%B7%A5%E7%A8%8B%E6%9E%B6%E6%9E%84/%E5%89%8D%E7%AB%AF%E7%9B%91%E6%8E%A7/3.%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"yamsfeer\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"性能优化\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"性能优化 按传统指标优化 网络优化 使用 http2 兼容性：当浏览器不支持 http2 时，要降级 早期浏览器会限制同一个域名下的并发请求连接数，因此以前可以将资源放在不同的域名下，但在 http2 中，为了支持多路复用，反而应该放在同一域名下。 开启 brotli 压缩 与 gzip 相比，brotli 压缩具有更高的压缩比和压缩速度。 使用 ht...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"性能优化\\\",\\\"image\\\":[\\\"\\\"],\\\"dateModified\\\":null,\\\"author\\\":[]}\"]]},\"headers\":[{\"level\":2,\"title\":\"按传统指标优化\",\"slug\":\"按传统指标优化\",\"link\":\"#按传统指标优化\",\"children\":[{\"level\":3,\"title\":\"网络优化\",\"slug\":\"网络优化\",\"link\":\"#网络优化\",\"children\":[]},{\"level\":3,\"title\":\"缓存优化\",\"slug\":\"缓存优化\",\"link\":\"#缓存优化\",\"children\":[]},{\"level\":3,\"title\":\"资源加载优化\",\"slug\":\"资源加载优化\",\"link\":\"#资源加载优化\",\"children\":[]}]},{\"level\":2,\"title\":\"按用户指标\",\"slug\":\"按用户指标\",\"link\":\"#按用户指标\",\"children\":[{\"level\":3,\"title\":\"优化 FP / FCP\",\"slug\":\"优化-fp-fcp\",\"link\":\"#优化-fp-fcp\",\"children\":[]},{\"level\":3,\"title\":\"FMP 和 LCP\",\"slug\":\"fmp-和-lcp\",\"link\":\"#fmp-和-lcp\",\"children\":[]},{\"level\":3,\"title\":\"FID\",\"slug\":\"fid\",\"link\":\"#fid\",\"children\":[]},{\"level\":3,\"title\":\"CLS\",\"slug\":\"cls\",\"link\":\"#cls\",\"children\":[]},{\"level\":3,\"title\":\"TTI\",\"slug\":\"tti\",\"link\":\"#tti\",\"children\":[]}]}],\"readingTime\":{\"minutes\":2.47,\"words\":742},\"filePathRelative\":\"工程架构/前端监控/3.性能优化.md\",\"autoDesc\":true}")
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
