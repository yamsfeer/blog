#  TTI 可交互时间

## 什么是 TTI

TTI ( Time to Interactive ) 可交互时间，从页面开始加载，到主要资源渲染完成并能快速响应用户输入的时间。

具体来说，可以用以下步骤测量 TTI。

1. 从 FCP 开始
2. 向右寻找至少 5 秒的安静窗口 ( 没有[长任务](https://web.dev/custom-metrics/#long-tasks-api)且不超过两个正在处理的 GET 请求 )。
3. 向左寻找安静窗口前的最后一个长任务，如果没有长任务，则在 FCP 处停止。
4. **安静窗口前最后一个长任务的结束时间就是 TTI**，如果没有长任务，则 TTI 与 FCP 值相同。

<img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/WZM0n4aXah67lEyZugOT.svg" alt="显示 TTI 计算方式的页面加载时间轴" width="500" class="img-mid" />

### 为什么要优化 TTI

服务端渲染 ( SSR ) 可以让页面看似具备交互性 ( 按钮在屏幕上可见 )，但实际上并不是，主线程也许正阻塞，或者 JavaScript 未完成加载。

当用户尝试与看似具备交互性的页面交互时，他们可能会：

- 认为页面响应缓慢
- 认为页面已损坏，然后直接离开

为避免这个问题，请将 FCP 和 TTI 之间的差值降至最低。如果难以优化，请指示当前还无法进行交互。

## TTI 阈值

![](https://raw.githubusercontent.com/yamsfeer/pic-bed/master/TTI-acceptable-score.png)

## 如何测量

虽然 TTI 可以线上测量，但用户交互会影响 TTI，所以最好线下测量。

## 如何优化 TTI

- [缩小 JavaScript](https://developer.chrome.com/docs/lighthouse/performance/unminified-javascript/)
- [预连接到所需的来源](https://developer.chrome.com/docs/lighthouse/performance/uses-rel-preconnect/)
- [预加载关键请求](https://developer.chrome.com/docs/lighthouse/performance/uses-rel-preload/)
- [减少第三方代码的影响](https://developer.chrome.com/docs/lighthouse/performance/third-party-summary/)
- [最小化关键请求深度](https://developer.chrome.com/docs/lighthouse/performance/critical-request-chains/)
- [减少 JavaScript 执行时间](https://developer.chrome.com/docs/lighthouse/performance/bootup-time/)
- [最小化主线程工作](https://developer.chrome.com/docs/lighthouse/performance/mainthread-work-breakdown/)
- [保持较低的请求数和较小的传输大小](https://developer.chrome.com/docs/lighthouse/performance/resource-summary/)

