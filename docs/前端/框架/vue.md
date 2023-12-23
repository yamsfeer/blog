# vue

数据驱动 + 声明式

VS

响应式 + 组件化

## 设计 vdom 的原因

* 框架设计

  vue 是数据驱动的，当数据变化时，如果做全量更新，效率太低，因此用虚拟 dom 做 diff 算法，只做必要的更新

* 跨平台

  用对象代替真实 dom 可以做到跨平台

## 响应式

响应式就是：当数据变化时，自动执行一些操作，比如函数

## 组件化

理解 vue 组件的各个部分

### vue 组件配置对象，vue 组件实例对象

```javascript
const Hello = {
  template: '<div></div>',
  data() {},
  computed() {}
}
```

Hello 其实是一个组件配置对象，这个配置对象经过 Vue 实例化后得到的才是真正的 vue componennt 实例。

```javascript
const app = createApp({})
app.component('hello', Hello)
```



```vue
<script setup>
  import Hello from 'Hello.vue' // 编译后，得到的是组件配置对象
</script>
```



### vnode 就是一个对象

vnode 就是普通的 JS 对象，它的的数据结构如下：

```javascript

```



### render 函数

单文件组件中的 template 就是组件配置对象中的 template，而它们都会被编译成 render 函数。

vue 最终只调用 render 函数。

```javascript
import { h } from 'vue'

const vnode = h(
  'div', // type
  { id: 'foo', class: 'bar' }, // props
  [ /* children */ ]
)
```

h 函数就是用来创建 vnode 的，它的原名应该是 createVnode。

在组件配置对象中直接编写 render 函数。

```javascript
import Hello from 'Hello.vue'

export default {
  setup() {
    return () => h(Hello) // 返回渲染函数
  }
}
```



### 组件实例数据结构

```javascript
const instance = {}
```



### setup 函数

setup的返回值与render 函数冲突？

### 异步组件

### 其他

#### data 必须是一个函数

data 之所以是一个函数，返回一个对象，是为了避免多次实例化一个组件时，它们共用了一个同一个 data 对象，使用函数则没有这个问题。

#### 单向数据流

千万不要在组件中修改 props 传过来的数据，会造成父组件和当前组件数据不一致。

只有数据的拥有者，才有资格修改数据。

应该用事件将新数据传递给父组件，让父组件更新数据，从而保持数据的一致性

```vue
<child-comp :value="propValue" @input="propValue = $event" />
```



```vue
<script setup>
  emit('input', newValue)
</script>
```



用 v-model 

## 编译器