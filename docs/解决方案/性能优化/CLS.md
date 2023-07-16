# CLS 累积布局偏移

CLS ( Cumulative Layout Shift ) 累积布局偏移。

理解 CLS 前需要介绍三个概念：

* 布局偏移 ( layout shift )：可见元素的起始位置在两帧之间发生改变
* 会话窗口 ( session window )：连续的布局偏移，每次偏移相隔不超过 1s，整个窗口不超过 5s。
* 最大窗口：布局偏移分数之和最大的会话窗口。

<img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/Screenshot%202023-05-09%20at%2020.52.22.png" alt="累计布局偏移" style="zoom:40%;" class="img-mid" />

图中每个蓝条表示一次布局偏移，两条虚线构成一个会话窗口，每个窗口不超过 5s，窗口内的蓝条之间间隔不超过 1s，蓝条高度之和是该窗口的布局偏移分数，蓝条高度之和最大的窗口就是最大窗口。

CLS 描述的是页面生命周期内，元素的移动程度。具体来说，就是最大窗口的布局偏移分数。

## 什么是布局偏移 ( layout shift )

可见元素的起始位置在两帧之间发生改变，就产生了布局偏移。这些元素称为**不稳定元素**。

注意是元素的**起始位置改变**才算布局偏移。动态添加 DOM 元素、元素改变大小都不算布局偏移。

## 如何计算布局偏移

不稳定元素的位移有两个度量：影响分数和距离分数。

```
布局偏移分数 = 影响分数 * 距离分数
```

### 影响分数 ( Impact fraction )

变化过程中，不稳定元素所占的可见区域与总可视区域的比值，就是影响分数。

影响分数衡量的是不稳定元素对可视区域的影响程度。

<img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/BbpE9rFQbF8aU6iXN1U6.png" alt="包含一个*不稳定元素*的影响分数示例" style="zoom: 40%;" class="img-mid" />

上图中，文本元素原本占 50% 可视区域，后来元素下移了可视区域高度的 25%。红色虚线框表示的是受不稳定元素影响的区域，它占总可视区域的 75%，因此影响分数为 0.75 。

### 距离分数 ( Distance fraction )

距离分数衡量的是不稳定元素位移的距离。

不稳定元素的最大位移，与可视区域的最大维度的比值就是距离分数。

* 最大位移：水平或垂直位移的较大者
* 最大维度：宽高中的较大者

<img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/ASnfpVs2n9winu6mmzdk.png" alt="包含一个*不稳定元素*的距离分数示例" style="zoom: 40%;" class="img-mid" />

上图中，不稳定元素的最大位移为高度的 25%，最大维度是可视区域的高度，因此距离分数为 0.25。

综上，可计算布局偏移分数。

```
布局偏移分数 = 影响分数 * 距离分数 = 0.75 * 0.25 = 0.1875
```

:::info

最初，布局偏移分数只根据影响分数计算。引入距离分数是为了避免在大元素发生微小位移的情况下进行过度惩罚。

:::

### 动态添加 DOM 元素

<img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/xhN81DazXCs8ZawoCj0T.png" alt="包含稳定和*不稳定元素*及可视区域剪裁的布局偏移示例" style="zoom:40%;" class="img-mid" />

假设按钮被动态添加到灰色元素底部，使得绿色背景元素被往下推，且有一部分超出可视区域。

这个过程中，区分哪些是稳定与不稳定元素。

* 灰色元素大小改变，但起始位置不变，是稳定元素。

* 按钮一开始不在 DOM 中，起始位置不变，是稳定元素

* 绿色元素的起始位置发生了变化，是不稳定元素

  注意，绿色元素的一部分在可视区域外，计算影响分数时忽略不可见区域。

绿色元素的移动区域 ( 红色虚线框 ) 占可视区域的 50%，因此影响分数为 0.5 。

向下移动的距离为可视区域高度的 14%，因此距离分数为 0.14。

```
布局偏移分数 = 0.5 * 0.14 = 0.07
```

### 多个不稳定元素

<img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/FdCETo2dLwGmzw0V5lNT.png" alt="包含多个稳定和*不稳定元素*的布局偏移示例" style="zoom:40%;" class="img-mid" />

上图中，不稳定元素为：Dog、Horse、Zebra。

红色框表示这三个不稳定元素的影响区域，占可视区域的 38%，所以影响分数为 0.38 。

箭头表示不稳定元素相对于起始位置的位移距离。Zebra 的位移距离最大 ( 蓝色箭头 )，约为可视区域高度的 30%，所以距离分数为 0.3。

```
布局偏移分数 = 0.38 x 0.3 = 0.1172
```

### 预期布局偏移与意外布局偏移

预期内的布局偏移是可接受的，意外的布局偏移是要避免的。

#### 用户发起的布局偏移

为响应用户交互造成布局偏移，只要偏移与交互时间上足够接近，就是预期内的。

在用户输入后 500ms 内发生的偏移会有 `hadRecentInput` 标志，表明它们可能是由用户交互引起预期偏移。

注意，hadRecentInput 只适用于不连续输入，如 tap、click 等。scroll、drag 等属于连续性输入。

#### 动画

动画是在更新页面内容时不让用户感到突兀的好方法。CSS transform 动画可以在不触发布局偏移的情况下设置动画。

## CLS 阈值

<img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/uqclEgIlTHhwIgNTXN3Y.svg" alt="良好的 CLS 值低于 0.1，较差的值大于 0.25 并且介于两者之间的任何东西都需要改进" width="400" class="img-mid" />

## 如何测量 CLS

在 JavaScript 中测量 CLS 可以使用[布局不稳定性 API](https://github.com/WICG/layout-instability)。

```javascript
let clsValue = 0;
let clsEntries = [];

let sessionValue = 0;
let sessionEntries = [];

new PerformanceObserver(list => {
  for (const entry of list.getEntries()) {
    // 只考虑没有 hadRecentInput 的布局偏移。
    if (entry.hadRecentInput) {
      continue
    }

    const [firstSessionEntry, ..., lastSessionEntry] = sessionEntries

    // 偏移相隔少于 1s，且与会话第一个偏移相差不超过 5s
    // 属于同一个会话窗口
    if (
      sessionValue &&
      entry.startTime - lastSessionEntry.startTime < 1000 &&
      entry.startTime - firstSessionEntry.startTime < 5000
    ) {
      sessionValue += entry.value;
      sessionEntries.push(entry);
    } else {
      sessionValue = entry.value;
      sessionEntries = [entry];
    }

    // 如果当前会话大于已有 CLS 值，更新 CLS。
    if (sessionValue > clsValue) {
      clsValue = sessionValue;
      clsEntries = sessionEntries;

      console.log('CLS:', clsValue, clsEntries)
    }
  }
}).observe({type: 'layout-shift', buffered: true});
```

## 如何改进 CLS

- 为 img 和 video 提供 width、height 属性，或使用 aspect-radio 预留所需空间
- 尽量不在现有内容的上方动态插入内容
- 使用 transform 动画

深入了解如何改进 CLS 请参阅：

* [optimize CLS](https://web.dev/optimize-cls/)
* [调试布局偏移](https://web.dev/debug-layout-shifts)
* [最小化布局偏移](https://developers.google.com/doubleclick-gpt/guides/minimize-layout-shift)
