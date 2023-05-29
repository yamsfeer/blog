# TTFB 第一字节时间

## 什么是 TTFB

TTFB ( Time to First Byte ) 第一字节时间，从资源请求开始到第一个字节到达的时间。

![](https://raw.githubusercontent.com/yamsfeer/pic-bed/master/timestamp-diagram.svg)

上图中 startTime 到 responseStart 的时间就是 TTFB。

具体来说，TTFB 包含以下时间损耗：

- Redirect 重定向
- Service worker 启动
- DNS 查询
- 建立连接
- 请求直到响应的第一个字节到达

## TTFB 阈值

<img src="https://web-dev.imgix.net/image/W3z1f5ZkBJSgL1V1IfloTIctbIF3/eNXaxPi9NdUVSTDRJFkV.svg" alt="良好的 TTFB 应该小于 0.8 秒" width="400" class="img-mid" />

## 如何测量 TTFB

TTFB 基于 [Navigation Timing API](https://w3c.github.io/navigation-timing/)。

```javascript
new PerformanceObserver(list => {
  const [nav] = list.getEntriesByType('navigation')
  console.log('TTFB', nav.responseStart)
}).observe({type: 'navigation', buffered: true})
```

### 测量资源请求

实际上，TTFB 不仅适用于导航请求，而是适用于所有请求，比如图片资源。要想测量资源请求的 TTFB，需要使用 [Resource Timing API](https://w3c.github.io/resource-timing/)。

```javascript
new PerformanceObserver(list => {
  for (const entry of list.getEntries()) {
    if (entry.responseStart > 0) {
      console.log('TTFB', entry.responseStart, entry.name);
    }
  }
}).observe({type: 'resource', buffered: true})
```

资源的 responseStart 为 0，原因可能有：

* 资源是从缓存中获取的
* 跨域资源未设置 `Timing-Allow-Origin` 响应头，跨域请求的 TTFB 就无法测量

## 如何优化 TTFB

TTFB 高很可能是网络或服务器原因造成的。

优化 TTFB 方法：

- [避免多次重定向](https://developer.chrome.com/docs/lighthouse/performance/redirects/).
- 提前向跨域资源源[建立连接 Preconnect](https://developer.chrome.com/docs/lighthouse/performance/uses-rel-preconnect/) 。
- 将源提交给[HSTS预加载列表](https://hstspreload.org/)，以消除 HTTP-HTTPS 重定向延迟。
- 使用 [HTTP2](https://developer.chrome.com/docs/lighthouse/best-practices/uses-http2/) 或 [HTTP3](https://en.wikipedia.org/wiki/HTTP/3)
- 考虑[预测性预取](https://web.dev/predictive-prefetching/)，为没有指定[减少数据使用偏好](https://developer.mozilla.org/docs/Web/CSS/@media/prefers-reduced-data)的用户提供快速页面导航。
- 使用服务器端生成 ( SSG ) 来代替 SSR 的标记。