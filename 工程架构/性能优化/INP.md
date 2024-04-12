# INP 与下一次绘制的交互

## 什么是 INP

INP ( Interaction to Next Paint ) 与下一次绘制的交互，描述页面对用户输入的响应速度。

具体来说，INP 会收集所有交互延迟，将其中的最大值作为 INP。

INP 是在用户离开页面时计算的，它代表了页面在整个生命周期中的总体响应性。低 INP 意味着页面能够可靠地响应用户输入。

### 什么是交互延迟 ( interaction latency )

<img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/Ng0j5yaGYZX9Bm3VQ70c.svg" class="img-mid" />

上图展示的是交互的生命周期。先收到用户输入，然后处理事件，完成后浏览器再渲染绘制，最终呈现视觉反馈。

总的来说，交互延迟就是从用户交互到下一帧呈现视觉反馈的时间。具体包括三部分：

* 输入延迟 ( input delay )，可能由主线程上的长任务等因素造成
* 交互处理时间 ( processing time )
* 展示延迟 ( presentation delay )

需要注意的是，每个浏览上下文都有自己的主线程：顶层页面有一个主线程，每个 iframe 也有自己的主线程，INP 是包含了 iframe 的。

### INP 中的交互类型

INP 只观察以下交互类型:

* 鼠标 click
* 触摸屏 tap
* 键盘按键 keystroke 

不观察以下类型

* 鼠标 hover 和 scroll 不影响INP。
* iframe 中的交互，web api 无法访问 iframe 的内容

### 一次交互有多个事件

交互可能由两个部分组成，每个部分有多个事件。例如，keystroke 包含 keydown、keypress 和 keyup；tap 包含 pointerup 和 pointerdown。我们把其中持续时间最长的事件视作整个交互的延迟。

<img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/vNosnKDYgBRnFmEvwm0c.svg" class="img-mid" />

上图是一个 click 交互的处理过程。

* 按下鼠标时，接收到一个输入，进行 mousedown 事件处理，显示一帧
* 释放鼠标，接收到另一个输入，进行 pointerup 和 click 的事件处理，显示下一帧

第二部分的持续时间较长，它将作为整个交互的交互延迟。

### INP 与 FID 的区别

INP 考虑页面的所有交互，FID 只考虑第一次交互。且 FID 只测量第一个交互的 input delay，不包含 processing time 和 presentation delay。

总的来说，FID 考虑的是用户对页面响应性的第一印象，INP 则可以全面评估。

### INP 没有报告

如果页面不返回 INP，原因可能是：

* 页面被加载，但用户从未做出 click、tap 等交互操作。
* 页面被加载，但用户只使用 hover 或 scroll 交互，INP 不支持这些方式。
* 页面是由 bot 访问的，比如爬虫或者无头浏览器。

## INP 阈值

<img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/INP.svg" width="300" class="img-mid" />

## 如何测量 INP

INP 是基于 Event Timing API 的。

```javascript
new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (entry.interactionId) {
      const duration = entry.processingEnd - entry.startTime;
      console.log('Interaction:', entry.name, duration, entry);
    }
  }
}).observe({type: 'event', buffered: true, durationThreshold: 16});
```

## 如何改进 INP

[Optimize INP](https://web.dev/optimize-inp/)

## 参考

[Interaction to Next Paint (INP) - web.dev](https://web.dev/inp/)
