# Page Lifecycle API

[Page Lifecycle API](https://github.com/WICG/page-lifecycle) 是由 WICG ( 不是 W3C ) 制定的标准，它统一了网页生命周期内的行为模式。生命周期的状态，以及这些状态之间转换的事件，可以用下图来表示 ( [原图链接](https://wd.imgix.net/image/eqprBhZUGfb8WYnumQ9ljAxRrA72/KCIeOsJ0lCWMthBSSBrn.svg) )：

![](https://raw.githubusercontent.com/yamsfeer/pic-bed/master/Page-Lifecycle.svg)

## States

网页的生命周期有 6 种状态，每个时刻只能处于其中一个状态。

* Active：网页可见，拥有输入焦点

* Passive：网页可见，没有输入焦点

* Hidden：网页不可见，但未进入 frozen 等状态

* Frozen

  Frozen 状态下，网页不会再被分配 CPU 计算资源。定时器、回调函数、网络请求、DOM 操作都不会执行，不过正在运行的任务会执行完。

  浏览器允许 Frozen 的页面周期性复苏一小段时间，短暂变回 Hidden 状态，允许一小部分任务执行。

  freeze 是保护 CPU、电池一种方式，也是实现更快的前后导航的一种方式，避免重新加载整个页面。

* Discarded

  在资源紧张的情况下，浏览器为了节省资源而卸载页面，进入 Discarded 状态。

  这个状态下，不能运行任何任务、事件回调或 JavaScript 代码。

* Terminated

  用户主动关闭窗口，或者超链接到其他页面，浏览器会从内存中清除当前页面，进入 Terminated 状态。

  这种状态下不能启动新任务，正在进行的任务如果运行时间过长可能会被终止。

## Events

生命周期内，状态的变化都有对应的事件，供开发者指定监听函数。

* focus：页面获得输入焦点时触发

* blur：页面失去焦点时触发

* visibilitychange

  页面可见状态变化时触发。比如用户导航到新页面、切换或关闭 tab、最小化或关闭浏览器、在移动端切换应用。

* freeze

  页面进入 frozen 状态时触发。

  freeze 的监听函数，最长只能运行500毫秒，且只能复用已经打开的网络连接，不能发起新的网络请求。

  从 Frozen 到 Discarded，不会触发任何事件，因此无法指定回调函数，只能在进入 Frozen 时指定回调函数。

* resume：页面从 frozen 变为 active、passive hidden 状态时触发

* pageshow

  加载网页时触发。加载方式可以是全新加载，或者是从 bfcache 恢复页面。从 bfcache 恢复时，`event.persisted` 为 true。

* pagehide

  用户离开当前页面，进入另一个页面时触发。

  如果页面满足 bfcache 的条件，`event.persisted` 为true，页面进入 frozen 状态，否则进入 terminated 状态。

* beforeunload

  窗口或文档即将卸载时触发。此时文档仍可见，卸载仍可取消，经过这个事件，页面进入 Terminated 状态

* unload

  页面正在卸载时触发。经过这个事件，页面进入 Terminated 状态。

注意，网页的生命周期事件是在所有帧 ( frame ) 触发，不管是底层的帧，还是内嵌的帧。也就是说，内嵌的 iframe 网页跟顶层网页一样，都会同时监听到下面的事件。

### freeze 和 resume

以上 9 种页面生命周期事件中，只有 freeze 和 resume 是新标准定义的。

现在的浏览器会 freeze ( 冻结 ) 和 discard ( 丢弃 ) 隐藏的标签页，且时机由浏览器自行决定，开发人员无法知道何时会发生这种情况。

对于 freeze，可以通过监听文档上的 freeze 和 resume 事件来观察页面何时被冻结和解冻。

```javascript
document.addEventListener('freeze', (event) => {
  // The page is now frozen.
})

document.addEventListener('resume', (event) => {
  // The page has been unfrozen.
})
```

### Discarded

对于 discard，可以通过以下代码判断页面是否曾被丢弃。

```javascript
if (document.wasDiscarded) {
  // Page was previously discarded by the browser while in a hidden tab.
}
```

另外，在 chrome 中输入地址 `chrome://discards` 可以观察当前所有 tag 页面的状态。

## 观察页面状态

### 获取当前状态

当页面处于 Active、Passive 或 Hidden 状态时，可以直接获得当前页面状态。

```javascript
function getState() {
  if (document.visibilityState === 'hidden') return 'hidden'
  if (document.hasFocus()) return 'active'
  return 'passive'
}
```

Frozen 和 Terminated 状态只能在各自的事件监听器 ( freeze 和 pagehide ) 中检测到，因为状态正在发生变化。

```javascript
document.addEventListener('freeze', (event) => {
  // The page is now frozen.
})

document.addEventListener('pagehide', (event) => {
  // The page has been terminated.
})
```

Discarded 状态无法被获取到，只能判断当前页面是否曾被丢弃。

```javascript
if (document.wasDiscarded) {
  // Page was previously discarded by the browser while in a hidden tab.
}
```

### 通过事件观察状态变化

基于 getState 函数，我们来编写观察所有状态变化的代码。

用 logStateChange 判断新旧状态是否改变。

```javascript
let state = getState()

function logStateChange(nextState) {
  const prevState = state
  if (nextState !== prevState) {
    console.log(`${prevState} => ${nextState}`)
    state = nextState
  }
}
```

监听页面生命周期事件。

```javascript
const events = ['pageshow', 'focus', 'blur', 'visibilitychange', 'resume']

events.forEach(type => {
  window.addEventListener(
    type,
    () => logStateChange(getState()),
    { capture: true }
  )
})
```

用 freeze 和 pagehide 事件观察 frozen 和 terminated 状态。

```javascript
window.addEventListener('freeze', () => {
  logStateChange('frozen')
}, { capture: true })
```

```javascript
window.addEventListener('pagehide', event => {
  logStateChange(event.persisted ? 'frozen' : 'terminated')
}, { capture: true })
```

以上所有的 addEventListener 都是在捕获阶段获取的，这是因为并非所有事件都有相同的 target。

* pagehide、pageshow 在 window 上触发
* visibilitychange、freeze、resume 在 document 上触发
* focus 和 blur 在 DOM 元素上触发

这些事件大多不会冒泡，因此不可能通过一个共同的祖先元素观察所有事件，只能在捕获阶段获取 ( 捕获阶段在目标或冒泡阶段之前执行 )。

## 应避免使用的事件

### unload 事件

不要在现代浏览器中使用 unload 事件。

许多开发者将 unload 事件作为会话结束信号来保存状态和发送分析数据，这样做非常不可靠。在许多情况下，unload 事件不会触发，比如在移动设备上关闭 tab 或退出浏览器。

此外，注册 unload 事件处理也会使得页面失去进入 bfcache 的资格。

因此，最好用 visibilitychange 事件来确定会话何时结束，并**将 Hidden 状态视为保存数据的最后可靠时间**。在现代浏览器中，建议使用 **pagehide** 事件来检测页面的卸载。

### beforeunload 事件

与 unload 类似，当 beforeunload 事件出现时，浏览器无法在 bfcache 中缓存页面。

建议当您想警告用户，退出页面将丢失未保存的更改时，可以使用 beforeunload 事件，并且在未保存的更改被保存后移除监听器。

```javascript
function beforeUnloadListener(event) {
  event.preventDefault()
  return (event.returnValue = 'Are you sure you want to exit?')
}

onPageHasUnsavedChanges(() => {
  addEventListener('beforeunload', beforeUnloadListener)
})

onAllChangesSaved(() => {
  removeEventListener('beforeunload', beforeUnloadListener)
})
```

## 针对页面状态的建议

* Active

  Active 是页面响应用户输入的最重要时间，阻塞主线程的任务可以用 Web Worker 执行。

* Passive

  Passive 状态下，用户不与页面交互，但仍可以看到页面，因此页面更新和动画仍应流畅。

  **从 Active 变为 Passive 时，是保存应用程序状态的好时机**。

* Hidden

  页面从 Passive 变为 Hidden 时，用户可能不会再与之交互，直到重新加载。

  向 Hidden 的转换通常也是开发人员能够**可靠观察到**的最后一次状态变化。在移动设备上尤其如此，用户关闭 tab 或浏览器，都不会触发 beforeunload、pagehide、unload 事件。

  因此，**应将 Hidden 视为用户会话已经结束**。换句话说，此时应该：

  * 持久化任何未保存的应用状态，发送分析数据
  * 停止进行 UI 更新 ( 反正用户看不到 )
  * 停止不必要的后台任务

* Frozen

  在 Frozen 状态下，任务队列中的任务会被暂停。

  因此当页面从 Hidden 变为 Frozen 时，应停止定时器并关闭所有连接。

  * 关闭所有打开的 IndexedDB 连接。
  * 关闭打开的 BroadcastChannel 连接。
  * 关闭活动的 WebRTC 连接。
  * 停止网络轮询，关闭 Web Socket 连接。
  * 释放 Web 锁。
  
  此外，还应将视图状态，如列表的滚动位置，持久化到 sessionStorage 或 IndexedDB 中。

* Terminated

  页面变为 Terminated 时，通常不需要采取任何操作。

  因为用户主动离开的页面在进入 Terminated 之前总要经过 Hidden 状态，Hidden 才是会话结束逻辑 ( 例如保存应用状态和发送分析报告 ) 执行的时机。

* Discarded

  页面被 discard ( 丢弃 ) 时，开发者无法观察到丢弃状态。因为页面通常是在资源有限的情况下才被丢弃的，为了让脚本响应丢弃事件而解冻页面是不可能的。

  因此，您应该在 Hidden 变化为 Frozen 时提前做好准备，在页面加载时检查 document.wasDiscarded 对丢弃页面的恢复做出反应。

总结一下。

* 页面处于 Active 时，应尽量使页面能快速响应用户
* 从 Active 变为 Passive 时，应保存应用状态
* 变为 Hidden 时，应视为用户会话已经结束，保存状态、发送分析数据等工作要尽快完成
* Hidden 之后可能会变成 Frozen、Discarded、Terminated 等，这几个状态不太受开发者控制，都不适合执行会话结束逻辑。

## 安全的 freeze 和 discard

网页在 Hidden 状态下运行但不应该被冻结的情况有很多，最明显的例子就是播放音乐。

目前，Chrome 对丢弃是**保守**的，只有在确信不会对用户造成影响时才会丢弃页面。如果页面在 Hidden 下执行以下操作，则不会丢弃，除非资源极度紧张：

* 播放音频
* 使用WebRTC
* 更新表格标题或图标
* 显示提醒
* 发送推送通知

关于如何确定是否安全冻结或丢弃，请参阅：[Chrome 冻结和丢弃的启发式方法](https://docs.google.com/document/d/1QJpuBTdllLVflMJSov0tlFX3e3yfSfd_-al2IBavbQM/edit?usp=sharing)。

## 参考

[Page Lifecycle API](https://developer.chrome.com/blog/page-lifecycle-api/)

[Page Lifecycle API 教程](http://www.ruanyifeng.com/blog/2018/11/page_lifecycle_api.html)