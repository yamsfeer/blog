# vue 原理

1. 初始化 vue state，比如 data props methods 等
   1. proxy data 属性，检查重名
   2. 使 data 成为响应式对象 即用 observe 函数，对每一个属性用 defineReactive，即 Object.defineProperty 设置 getter 和 setter
   3. getter 和 setter 要做依赖收集和派发更新
2. 编译模板，包括 v-model 指令等
3. 编译模板过程中，用 dep 收集依赖，并添加 watcher 方便派发更新

##响应式

* 
* Observer

### 依赖收集

* Dep
* Watcher

### 派发更新

## 组件化

## 编译

## 参考

[mini-vue3](https://zhuanlan.zhihu.com/p/404116228)