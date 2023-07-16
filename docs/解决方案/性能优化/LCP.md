# LCP 最大内容绘制

对开发者来说，测量网页主要内容的加载速度并不容易。

* load 或 DOMContentLoaded 事件不一定与用户在屏幕上看到的内容相对应
* FCP 只捕获加载最开始的部分，那可能只是启动画面或加载指示。
* FMP 和 SI 可以捕获到初始绘制之后的加载，但它们十分复杂且经常出错。

根据 [W3C Web 性能工作组](https://www.w3.org/webperf/) 的研究，**最大元素完成渲染**能更准确地描述页面主要内容加载完毕。

## 什么是 LCP

LCP ( Largest Contentful Paint ) 最大内容绘制，从开始加载，到最大的内容在可视区域内变得可见的时间。

### 哪些元素在考量范围内

LCP 的最大内容主要考虑**图片和文本**，比如：

- img 图片
- 内嵌在 svg 元素内的图片
- video 的封面图
- background image ( 通过 `url()` 函数加载 )
- 包含文本的块级元素

随着研究的深入，未来可能会添加其他元素，如 svg、video 元素本身。

### 如何确定一个元素的大小

元素大小通常指**可视区域内可见的大小**。延伸到可视区域之外、被剪裁、不可见的溢出部分不计入元素大小。

* 图片使用原始尺寸和可见尺寸中的较小者。即缩小的图片使用显示尺寸，放大的图像使用原始尺寸。
* 文本仅考量文本节点的大小，即包含所有文本节点的最小矩形。
* 元素的 padding、margin 或 border 都不在考虑范围内。

### 何时报告 LCP

网页通常是分阶段加载的，页面上的最大元素可能会变化。

**每次最大元素变化，浏览器都会报告一次 LCP**。例如，一个文本和图片网页，最初只渲染文本，报告一次，随后图片加载完成，报告第二次。

注意，只有**渲染完成且可见**的元素才可被视为最大内容元素。加载中的图像 、字体阻塞期的文本等都不算完成渲染。

* 动态添加 DOM 元素，且新元素大于先前的最大元素，需要报告。
* 当前最大元素从可视区域移除，除非有更大的元素渲染，否则该元素将持续作为最大元素。
* 页面 scroll 频繁改变可见区域内容，这期间浏览器不会报告 LCP。
* 出于安全考虑，缺少 `Timing-Allow-Origin` 响应头的跨域图像，渲染时间不会公开，只公开加载时间。

### 如何处理元素布局和元素大小改变

出于性能考虑，**元素大小和位置改变**不会报告 LCP。

也就是说，在可视区域外渲染，然后移动到可视区域的不会报告；在可视区域内渲染，然后移出可视区域的只会报告其在可视区域的大小。

## LCP 阈值

<img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/8ZW8LQsagLih1ZZoOmMR.svg" alt="良好的 LCP 值为 2.5 秒，较差的值大于 4.0 秒，两者之间的任何东西都需要改进" width="400" class="img-mid" />

## 如何测量 LCP

```javascript
new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.log('LCP', entry.startTime, entry)
  }
}).observe({type: 'largest-contentful-paint', buffered: true})
```

### 如果最大元素并非最重要元素

如果页面上最重要的元素不是最大元素，可以用 [Element Timing API ](https://wicg.github.io/element-timing/) 进行自定义测量。

## 如何改进 LCP

LCP 主要受四个因素影响：

- 缓慢的服务器响应速度
- JavaScript 和 CSS 渲染阻塞
- 资源加载时间
- 客户端渲染

改进 LCP 的方法。

- [使用 PRPL 模式做到即时加载](https://web.dev/apply-instant-loading-with-prpl)
- [优化关键渲染路径](https://web.dev/critical-rendering-path/)
- [优化 CSS](https://web.dev/fast#optimize-your-css)
- [优化图像](https://web.dev/fast#optimize-your-images)
- [优化网页字体](https://web.dev/fast#optimize-web-fonts)
- [优化 JavaScript](https://web.dev/fast#optimize-your-javascript)（针对客户端渲染的网站）

深入了解如何改进 LCP 请参阅[优化 LCP](https://web.dev/optimize-lcp/)。