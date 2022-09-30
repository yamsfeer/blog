# Promise

为深入理解 Promise，根据 [Promise / A+ 规范](https://promisesaplus.com/) ( [中文版](https://www.ituring.com.cn/article/66566) ) 手写 promise。

## 宏任务微任务

JavaScript 是单线程的，为了解决高耗时操作带来的阻塞问题，JavaScript 有两种任务执行模式：同步模式 ( Synchronous ) 和异步模式 ( Asynchronous )。

异步模式有宏任务和微任务两种。宏任务 ( Macrotask ) 称为 Task， 微任务 ( Microtask ) 称为 Jobs。宏任务由宿主 ( 浏览器、Node ) 发起，微任务由 JS 自身发起。

关于异步模式可以参考：[图解V8 / 异步编程](../浏览器/图解V8/4.异步编程.md)

创建宏任务和微任务的方式：

| 宏任务 ( Macrotask )       | 微任务 ( Microtask )             |
| -------------------------- | -------------------------------- |
| setTimeout                 | requestAnimationFrame ( 有争议 ) |
| setInterval                | MutationObserver ( 浏览器环境 )  |
| MessageChannel             | Promise.[then/catch/finally]     |
| I/O，事件队列              | process.nextTick ( Node 环境 )   |
| setImmediate ( Node 环境 ) | queueMicrotask                   |
| script ( 代码块 )          |                                  |

由于 Promise 是创建微任务的，我们选择 [queueMicrotask](https://developer.mozilla.org/zh-CN/docs/Web/API/HTML_DOM_API/Microtask_guide) 作为模拟 Promise 创建微任务的方式。

## 核心逻辑



>1. Promise 是一个类，new Promise 时会传入一个执行函数，执行函数会立即执行
>
>2. Promise 会有三种状态
>   * Pending 等待
>   * Fulfilled 完成
>   * Rejected 失败
>
>3. 状态只能由 Pending 转为 Fulfilled 或者 Pending 转为 Rejected，且只能改变一次
>
>4. Promise 中使用 resolve 和 reject 函数来更改状态，这两个函数会传入执行函数
>
>5. then 方法会判断状态
>   * 如果状态是 Fulfilled，调用成功回调函数
>   * 如果状态是 Rejected，调用失败回调函数

### 初始化

```javascript
const PENDING = Symbol('pending')
const FULFILLED = Symbol('fulfilled')
const REJECTED = Symbol('rejected')

class Promise {
  constructor(executor) {
    executor(this.resolve, this.reject)
  }
  
  state = PENDING
  value = null
  reason = null

  resolve = () => {}
  reject = () => {}
}
```

### 管理状态

```javascript
class Promise {
  state = PENDING
  value = null
  reason = null

  resolve = value => {
    if (this.state !== PENDING)
      return
    this.value = value
    this.state = FULFILLED
  }
  reject = reason => {
    if (this.state !== PENDING)
      return
    this.reason = reason
    this.state = REJECTED
  }
}
```



### 异步逻辑

### then 链式调用

### 捕获错误并 reject

## ES6 的 promise

[ecma262--Properties of the Promise Constructor](https://tc39.es/ecma262/multipage/control-abstraction-objects.html#sec-properties-of-the-promise-constructor)

### Promise.resolve

### Promise.reject

### catch

### finally

### Promise.all

### Promise.race

### Promise.any

### Promise.allSettled

## 总结

Promise 是观察者模式

* resolve, reject

  将 state 转为 fulfilled 或 rejected，保存 value 或 reason，调用 then 方法保存的 callback 函数并传入 value 或 reason，callback 是用 queueMicrotask 包装的微任务

* then

  提供默认 onfilfill 或 onreject 处理函数。

  并把处理函数包装成微任务，如果处理函数中返回了新的 promise，需要等这个 promise resolve，具体就是调用 `promise.then(resolve, reject)`

* resolvePromise
* catch 是 then(null, rejection) 的别名，用于指定发生错误时的回调
* then、all、race 等方法都会返回一个新的 promise，以便实现链式调用

## 异步测试



[手写promise，通俗版本](https://juejin.cn/post/6994594642280857630#heading-14)

[深入分析 Promise 实现细节](https://juejin.cn/post/6945319439772434469)

[手写一个promise/A+](https://segmentfault.com/a/1190000023157856)



