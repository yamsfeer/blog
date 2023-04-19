# vue 原理

## 初始化

### 代理 state

proxy data 属性，检查重名。

### 使 data 成为响应式对象

用 observe 函数，对每一个属性用 defineReactive，即 Object.defineProperty 设置 getter 和 setter，getter 和 setter 要做依赖收集和派发更新

## 响应式

![](https://raw.githubusercontent.com/yamsfeer/pic-bed/master/6097bb7630dc44a68cb6b4c4dbef62f1~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

vue 的响应式原理是发布订阅模式。

vue 响应式实现里有三个角色：Observer ( Publisher )、Dep ( PubSub )、Watcher ( Subscriber )。

Dep 作为中间人，主要维护一份订阅者列表，并在 Publisher 更新时通知所有订阅者 ( Watcher )。

```javascript
class Dep {
  subs = []

  addSub(watcher) {
    this.subs.push(watcher)
  }
  notify(value) {
    this.subs.forEach(sub => sub.update(value))
  }
}
```

Observer 的作用是将对象转为响应式对象。

简单来说，就是将为对象的每个属性，调用 `defineReactive` 函数。

```javascript
class Observer {
  constructor(value) {
    this.walk(value)
  }
  
  walk(obj) {
    Object.keys(obj).forEach(key => defineReactive(obj, key))
  }
}
```

将对象转为响应式对象的关键在于 `defineReactive` 函数，它为对象的每个属性设置 getter 和 setter。在 setter 中，当属性被设置新值时，会调用 `dep.notify()` 通知发布订阅中心。

这个过程正好是发布订阅模式中，publisher 通知 pubsub，pubsub 通知 subscriber 的过程。

```javascript
function defineReactive(obj, key) {
  let value = obj[key]

  const dep = new Dep() // 该 key 的所有订阅者都由 dep 维护
  Object.defineProperty(obj, key, {
    get() {
      dep.addSub(Dep.target)
      return value
    },
    set(newVal) {
      value = newVal
      dep.notify(newVal)
    }
  })
}
```

另外，谁访问了这个属性，说明其需要得到该属性变化的通知，即需要订阅。

因此，在 getter 中会调用 `dep.addSub` 来设置依赖当前属性的 watcher，称为依赖收集，前面 setter 的过程称为派发更新。

订阅者 watcher 要做的事情相对简单，只需要指定属性变化时的回调函数即可，watcher 的实例在 dep 中维护，dep 会在合适的时候调用 update 函数执行回调。

```javascript
class Watcher {
  constructor(obj, key, cb) {
    this.obj = obj
    this.cb = cb
    
    Dep.target = this
    this._oldVal = obj[key] // 触发 getter，执行 dep.addSub(Dep.target)
    Dep.target = null
  }
  update(value) {
    this.cb.call(this.obj, value) // 也可以通过 obj[key] 获取新值
  }
}
```

从使用上来讲，整个响应式的过程就是：

* 将对象转为响应式对象
* 实例化 watcher，订阅属性的变化
* observer 和 watcher 由看不见的 dep 负责管理通信

```javascript
const $data = { message: 'hello world' }

defineReactive($data) // 设置 getter setter
new Watcher($data, 'message', msg => console.log(msg))
```

## 组件化

## 模板编译

## 参考

[mini-vue3](https://zhuanlan.zhihu.com/p/404116228)