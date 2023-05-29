# FID 首次输入延迟

## 什么是 FID

FID ( First Input Delay ) 首次输入延迟，从用户第一次与页面交互，到浏览器能开始处理的时间。

## 什么是输入延迟

下图是一个典型的网页加载时间轴：

![示例页面加载跟踪](https://raw.githubusercontent.com/yamsfeer/pic-bed/master/9tm3f6pwlHMqNKuFvaP0.svg)

页面发出网络资源请求，资源下载完后，在主线程上进行处理 ( 图中黄色块 )，此时主线程处于忙碌状态，无法响应用户输入，因而产生输入延迟 ( input delay )。

FID 通常发生在 FCP 和 TTI 之间，因为在这期间，页面已经渲染出部分内容，但交互还不可靠。

为了说明这种情况，我们在时间轴中加入 FCP 和 TTI。

![带有 FCP 和 TTI 的示例页面加载跟踪](https://raw.githubusercontent.com/yamsfeer/pic-bed/master/24Y3T5sWNuZD9fKhkuER.svg)

图中 FCP 和 TTI 之间有三段长任务 ( 执行时间超过 50ms )，假设用户在最长的任务刚开始时交互，就会产生如下图所示的 input delay。

![带有 FCP、TTI 和 FID 的示例页面加载跟踪](https://raw.githubusercontent.com/yamsfeer/pic-bed/master/krOoeuQ4TWCbt9t6v5Wf.svg)

### 如果交互没有事件监听器

FID 测量的是 input 的时间点到主线程下一次空闲的时间点的差值。也就是说，即使没有注册监听器，FID 也可以测量。

事实上，许多交互的执行并不需要监听器，但需要主线程处于空闲期。例如，input、textarea、select 等元素都需要主线程空闲才能响应。

### 为什么只考虑首次输入

FID 是用户对网站响应速度的第一印象，这对于塑造整体印象至关重要。

### FID 的输入类型

FID 只关注 click、tap 和 keystroke 等不连续的操作，不关心 scroll 和 resize 等连续操作。

换句话说，FID 侧重于 [RAIL 性能模型](https://web.dev/rail/)中的 R ( 响应度 )，而 scroll 和 resize 与 A ( 动画 ) 更为相关，这些操作的性能应该单独进行评估。

## FID 阈值

<img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/Se4TiXIdp8jtLJVScWed.svg" alt="好的 fid 值为 2.5 秒，差的值大于 4.0 秒，中间的任何值都需要改进" width="400" class="img-mid" />

## 如何测量 FID

```javascript
new PerformanceObserver((list, obs) => {
  const [firstInput] = list.getEntries()
  const firstInputDelay = firstInput.processingStart - firstInput.startTime
  const firstInputDuration = firstInput.duration

  obs.disconnect()
}).observe({type: 'first-input', buffered: true})
```

## 如何改进 FID

改进 FID 方法：

- [减少第三方代码的影响](https://developer.chrome.com/docs/lighthouse/performance/third-party-summary/)
- [减少 JavaScript 执行时间](https://developer.chrome.com/docs/lighthouse/performance/bootup-time/)
- [最小化主线程工作](https://developer.chrome.com/docs/lighthouse/performance/mainthread-work-breakdown/)
- [保持较低的请求数和较小的传输大小](https://developer.chrome.com/docs/lighthouse/performance/resource-summary/)

深入了解如何改进 FID 请参阅[优化 FID](https://web.dev/optimize-fid/)。