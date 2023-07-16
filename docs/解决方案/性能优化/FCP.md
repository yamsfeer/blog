# FCP 首次内容绘制

## 什么是 FCP

FCP ( First Contentful Paint ) 首次内容绘制，从开始加载到页面内容的任何部分在屏幕上完成渲染的时间。内容指的是文本、图像、非白色的 canvas 等。

<img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/3UhlOxRc0j8Vc4DGd4dt.png" alt="来自 google.com 的 FCP 时间轴" style="zoom: 50%;" />

上图的 FCP 发生在第二帧，首批文本和图像完成渲染。

注意，FCP 是部分内容，而非所有内容都完成渲染，这是 FCP 与 LCP 的重要区别，LCP 旨在测量页面的**主要内容**何时完成加载。

## FCP 阈值

<img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/vQKpz0S2SGnnoXHMDidj.svg" alt="良好的 FCP 值是 1.8 秒或更短，差的值大于 3.0 秒，中间的任何东西都需要改进" width="400" class="img-mid" />

## 如何测量 FCP

FCP 基于 [paint timing API](https://w3c.github.io/paint-timing/)。

```javascript
new PerformanceObserver(list => {
  for (const entry of list.getEntries()) {
    console.log('FCP', entry.startTime, entry)
  }
}).observe({ type: 'paint', buffered: true });
```

## 如何改进 FCP

以下列出了一些改进 FCP 的方法。

- [消除阻塞渲染的资源](https://developer.chrome.com/docs/lighthouse/performance/render-blocking-resources/)
- [缩小 CSS](https://developer.chrome.com/docs/lighthouse/performance/unminified-css/)
- [移除未使用的 CSS](https://developer.chrome.com/docs/lighthouse/performance/unused-css-rules/)
- [预连接到所需的来源](https://developer.chrome.com/docs/lighthouse/performance/uses-rel-preconnect/)
- [减少服务器响应时间 (TTFB)](https://web.dev/ttfb/)
- [避免多个页面重定向](https://developer.chrome.com/docs/lighthouse/performance/redirects/)
- [预加载关键请求](https://developer.chrome.com/docs/lighthouse/performance/uses-rel-preload/)
- [避免巨大的网络负载](https://developer.chrome.com/docs/lighthouse/performance/total-byte-weight/)
- [使用高效的缓存策略服务静态资产](https://developer.chrome.com/docs/lighthouse/performance/uses-long-cache-ttl/)
- [避免 DOM 过大](https://developer.chrome.com/docs/lighthouse/performance/dom-size/)
- [最小化关键请求深度](https://developer.chrome.com/docs/lighthouse/performance/critical-request-chains/)
- [确保文本在网页字体加载期间保持可见](https://developer.chrome.com/docs/lighthouse/performance/font-display/)
- [保持较低的请求数和较小的传输大小](https://developer.chrome.com/docs/lighthouse/performance/resource-summary/)

