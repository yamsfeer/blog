# vue3 的改进

vue3 的改进总体可分为三个方面：源码维护、性能优化、逻辑组织优化。

## 源码维护

* vue3 使用 [monorepo](https://monorepo.tools/) 管理代码，项目整体分为三大模块：reactivity、runtime、compiler。

  ```
  packages
  ├── compiler-core
  ├── compiler-dom
  ├── compiler-sfc
  ├── compiler-ssr
  ├── reactivity
  ├── reactivity-transform
  ├── runtime-core
  ├── runtime-dom
  ├── runtime-test
  ├── shared
  ├── vue
  └── ...
  ```

  monorepo 使得各个 package 之间相互独立，可单独测试和使用。

* vue3 用 typescript 编写代码。

  与 flow 相比，typescript 有更好的类型定义和检查，在使用 vue 时也能提供更好的语法类型提示。

## 性能优化

### 更小的代码体积

* tree-shaking

  根据 ES module 的 import 和 export 做静态分析，找到没有引用的模块

* 移除冷门 feature
  
  vue3 移除了 Filters、Inline templates 等 API，具体见[文档](https://v3-migration.vuejs.org/breaking-changes/#removed-apis)。


### 数据劫持优化：proxy

vue2.x 的响应式原理是用 `Object.defineProperty` 为对象的每个属性添加 getter 和 setter 从而监听对象属性的变化并触发更新。vue3 则使用 proxy 完成响应式功能。它们的对比如下：

使用 getter / setter 实现：

- 默认会递归遍历深层对象属性，当对象深层嵌套时性能消耗较大
- 无法监听新增 / 删除属性
- 支持数组的响应式需要额外实现
- 无法监听 Map、Set、Class 等特殊对象

使用 proxy 实现：

- 直接监听对象而非属性，因而可以监听新增 / 删除属性
- 不需要修改源对象, `Object.defineProperty` 需要直接修改对象
- proxy 有 13 种拦截方法，比如 `apply`、`ownKeys`、`deleteProperty`、`has` 等
- 可以监听数组、Map、Set 等特殊对象的变化
- proxy 只劫持最外层对象，当访问到深层对象时，再转为响应式，这种 lazy 操作使得性能消耗更低。( proxy 也无法监听到深层对象的变化 )

### 编译优化

vue3 在编译阶段做了以下几种优化：

* 编译阶段进行静态模板分析，生成 block tree

* 优化编译结果，标记 patchFlag 方便运行时判断是否也需要更新

  关于 patchFlag 及其相关的位运算可以参考：[shapeFlag & patchFlag](https://juejin.cn/post/7049358090445160462#heading-3)、[位运算](https://wumanho.cn/posts/vueshapeflags/#%E6%B7%BB%E5%8A%A0-shapeflag)

* 事件监听函数缓存、slot 编译优化

vue3 还提供了一个[编译工具](https://vue-next-template-explorer.netlify.app/)，可以直接得到编译结果。

### 重写 diff 算法

vue3 重写了 diff 算法，主要使用预处理和最长递增子序列来优化。

## 逻辑组织优化

vue3 提供了 composition API 来进行逻辑组织和复用，与 vue2 的 options API 相比，composition API 有以下几个优点：

* 代码逻辑清晰
* 逻辑复用
* 利于类型推导
* 代码体积更小，利于 tree-shaking



在 vue2 中，可以用 mixins 实现逻辑复用，但当一个组件内使用多个 mixin 时有两个问题：

* 命名冲突
* 数据来源不清晰

composition API 则很好地解决了这个问题。
