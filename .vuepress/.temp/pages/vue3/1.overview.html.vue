<template><div><h1 id="overview" tabindex="-1"><a class="header-anchor" href="#overview"><span>overview</span></a></h1>
<p>与 vue2 相比，vue3 的改进可分为三个方面：源码维护、性能优化、逻辑组织优化。</p>
<h2 id="源码维护" tabindex="-1"><a class="header-anchor" href="#源码维护"><span>源码维护</span></a></h2>
<p>vue3 使用 <a href="https://monorepo.tools/" target="_blank" rel="noopener noreferrer">monorepo<ExternalLinkIcon/></a> 管理代码，项目分为三大部分：reactivity、runtime、compiler。</p>
<div class="language-text" data-ext="text" data-title="text"><pre v-pre class="language-text"><code>packages
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
</code></pre></div><p>monorepo 使得各个 package 之间相互独立，可单独测试和使用。</p>
<p>除此之外，vue3 还使用了 typescript 编写代码，与 flow 相比，typescript 有更好的类型定义、检查和语法提示。</p>
<h2 id="性能优化" tabindex="-1"><a class="header-anchor" href="#性能优化"><span>性能优化</span></a></h2>
<h3 id="更小的代码体积" tabindex="-1"><a class="header-anchor" href="#更小的代码体积"><span>更小的代码体积</span></a></h3>
<ul>
<li>更好的 tree-shaking，根据 ESM 的 import 和 export 做静态分析，找出没有引用的模块</li>
<li>移除冷门 feature，比如 Filters、Inline templates 等 API，具体见<a href="https://v3-migration.vuejs.org/breaking-changes/#removed-apis" target="_blank" rel="noopener noreferrer">文档<ExternalLinkIcon/></a>。</li>
</ul>
<h3 id="数据劫持优化-proxy" tabindex="-1"><a class="header-anchor" href="#数据劫持优化-proxy"><span>数据劫持优化：proxy</span></a></h3>
<p>vue2 的响应式原理是用 <code v-pre>Object.defineProperty</code> 为对象的每个属性添加 getter 和 setter，从而监听对象属性的变化并触发更新。</p>
<p>vue3 则是使用 proxy 完成响应式功能。它们的对比如下：</p>
<p>使用 getter / setter 实现：</p>
<ul>
<li>默认会递归遍历深层对象属性，当对象深层嵌套时性能消耗较大</li>
<li>无法监听新增 / 删除属性</li>
<li>支持数组的响应式需要额外实现</li>
<li>无法监听 Map、Set、Class 等特殊对象</li>
</ul>
<p>使用 proxy 实现：</p>
<ul>
<li>直接监听对象而非属性，因而可以监听新增 / 删除属性</li>
<li>不需要修改源对象, <code v-pre>Object.defineProperty</code> 需要直接修改对象</li>
<li>proxy 有 13 种拦截方法，比如 <code v-pre>apply</code>、<code v-pre>ownKeys</code>、<code v-pre>deleteProperty</code>、<code v-pre>has</code> 等</li>
<li>可以监听数组、Map、Set 等特殊对象的变化</li>
<li>proxy 只劫持最外层对象，当访问到深层对象时，再转为响应式，这种 lazy 操作使得性能消耗更低。( proxy 也无法监听到深层对象的变化 )</li>
</ul>
<h3 id="编译优化" tabindex="-1"><a class="header-anchor" href="#编译优化"><span>编译优化</span></a></h3>
<p>vue3 在编译阶段做了以下几种优化：</p>
<ul>
<li>编译阶段进行静态模板分析，生成 block tree</li>
<li>优化编译结果，标记 patchFlag 方便运行时判断是否也需要更新</li>
<li>事件监听函数缓存、slot 编译优化</li>
</ul>
<p>vue3 还提供了一个<a href="https://vue-next-template-explorer.netlify.app/" target="_blank" rel="noopener noreferrer">编译工具<ExternalLinkIcon/></a>，可以直接得到编译结果。</p>
<p>关于 patchFlag 及其相关的位运算可以参考：<a href="https://juejin.cn/post/7049358090445160462#heading-3" target="_blank" rel="noopener noreferrer">shapeFlag &amp; patchFlag<ExternalLinkIcon/></a>、<a href="https://wumanho.cn/posts/vueshapeflags/#%E6%B7%BB%E5%8A%A0-shapeflag" target="_blank" rel="noopener noreferrer">位运算<ExternalLinkIcon/></a>。</p>
<h3 id="重写-diff-算法" tabindex="-1"><a class="header-anchor" href="#重写-diff-算法"><span>重写 diff 算法</span></a></h3>
<p>vue3 使用预处理和最长递增子序列算法重写了 diff 算法。</p>
<h2 id="逻辑组织优化" tabindex="-1"><a class="header-anchor" href="#逻辑组织优化"><span>逻辑组织优化</span></a></h2>
<p>vue3 提供了 composition API 来进行逻辑组织和复用，与 option API 相比，composition API 有以下几个优点：</p>
<ul>
<li>代码逻辑清晰、逻辑可复用</li>
<li>利于类型推导</li>
<li>代码体积更小，有利于 tree-shaking</li>
</ul>
<p>虽然在 vue2 的 mixins 也可以实现逻辑复用，但当一个组件内使用多个 mixin 时有两个问题：</p>
<ul>
<li>命名冲突</li>
<li>数据来源不清晰</li>
</ul>
<p>composition API 则很好地解决了这些问题。</p>
</div></template>


