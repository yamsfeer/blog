<template><div><h1 id="vue" tabindex="-1"><a class="header-anchor" href="#vue"><span>vue</span></a></h1>
<p>数据驱动 + 声明式</p>
<p>VS</p>
<p>响应式 + 组件化</p>
<h2 id="设计-vdom-的原因" tabindex="-1"><a class="header-anchor" href="#设计-vdom-的原因"><span>设计 vdom 的原因</span></a></h2>
<ul>
<li>
<p>框架设计</p>
<p>vue 是数据驱动的，当数据变化时，如果做全量更新，效率太低，因此用虚拟 dom 做 diff 算法，只做必要的更新</p>
</li>
<li>
<p>跨平台</p>
<p>用对象代替真实 dom 可以做到跨平台</p>
</li>
</ul>
<h2 id="响应式" tabindex="-1"><a class="header-anchor" href="#响应式"><span>响应式</span></a></h2>
<p>响应式就是：当数据变化时，自动执行一些操作，比如函数</p>
<h2 id="组件化" tabindex="-1"><a class="header-anchor" href="#组件化"><span>组件化</span></a></h2>
<p>理解 vue 组件的各个部分</p>
<h3 id="vue-组件配置对象-vue-组件实例对象" tabindex="-1"><a class="header-anchor" href="#vue-组件配置对象-vue-组件实例对象"><span>vue 组件配置对象，vue 组件实例对象</span></a></h3>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> Hello <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token string">'&lt;div>&lt;/div>'</span><span class="token punctuation">,</span>
  <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">computed</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>Hello 其实是一个组件配置对象，这个配置对象经过 Vue 实例化后得到的才是真正的 vue componennt 实例。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token function">createApp</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
app<span class="token punctuation">.</span><span class="token function">component</span><span class="token punctuation">(</span><span class="token string">'hello'</span><span class="token punctuation">,</span> Hello<span class="token punctuation">)</span>
</code></pre></div><div class="language-vue" data-ext="vue" data-title="vue"><pre v-pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
  <span class="token keyword">import</span> Hello <span class="token keyword">from</span> <span class="token string">'Hello.vue'</span> <span class="token comment">// 编译后，得到的是组件配置对象</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
</code></pre></div><h3 id="vnode-就是一个对象" tabindex="-1"><a class="header-anchor" href="#vnode-就是一个对象"><span>vnode 就是一个对象</span></a></h3>
<p>vnode 就是普通的 JS 对象，它的的数据结构如下：</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code>
</code></pre></div><h3 id="render-函数" tabindex="-1"><a class="header-anchor" href="#render-函数"><span>render 函数</span></a></h3>
<p>单文件组件中的 template 就是组件配置对象中的 template，而它们都会被编译成 render 函数。</p>
<p>vue 最终只调用 render 函数。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> h <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'vue'</span>

<span class="token keyword">const</span> vnode <span class="token operator">=</span> <span class="token function">h</span><span class="token punctuation">(</span>
  <span class="token string">'div'</span><span class="token punctuation">,</span> <span class="token comment">// type</span>
  <span class="token punctuation">{</span> <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token string">'foo'</span><span class="token punctuation">,</span> <span class="token keyword">class</span><span class="token operator">:</span> <span class="token string">'bar'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// props</span>
  <span class="token punctuation">[</span> <span class="token comment">/* children */</span> <span class="token punctuation">]</span>
<span class="token punctuation">)</span>
</code></pre></div><p>h 函数就是用来创建 vnode 的，它的原名应该是 createVnode。</p>
<p>在组件配置对象中直接编写 render 函数。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> Hello <span class="token keyword">from</span> <span class="token string">'Hello.vue'</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">h</span><span class="token punctuation">(</span>Hello<span class="token punctuation">)</span> <span class="token comment">// 返回渲染函数</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="组件实例数据结构" tabindex="-1"><a class="header-anchor" href="#组件实例数据结构"><span>组件实例数据结构</span></a></h3>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> instance <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre></div><h3 id="setup-函数" tabindex="-1"><a class="header-anchor" href="#setup-函数"><span>setup 函数</span></a></h3>
<p>setup的返回值与render 函数冲突？</p>
<h3 id="异步组件" tabindex="-1"><a class="header-anchor" href="#异步组件"><span>异步组件</span></a></h3>
<h3 id="其他" tabindex="-1"><a class="header-anchor" href="#其他"><span>其他</span></a></h3>
<h4 id="data-必须是一个函数" tabindex="-1"><a class="header-anchor" href="#data-必须是一个函数"><span>data 必须是一个函数</span></a></h4>
<p>data 之所以是一个函数，返回一个对象，是为了避免多次实例化一个组件时，它们共用了一个同一个 data 对象，使用函数则没有这个问题。</p>
<h4 id="单向数据流" tabindex="-1"><a class="header-anchor" href="#单向数据流"><span>单向数据流</span></a></h4>
<p>千万不要在组件中修改 props 传过来的数据，会造成父组件和当前组件数据不一致。</p>
<p>只有数据的拥有者，才有资格修改数据。</p>
<p>应该用事件将新数据传递给父组件，让父组件更新数据，从而保持数据的一致性</p>
<div class="language-vue" data-ext="vue" data-title="vue"><pre v-pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>child-comp</span> <span class="token attr-name">:value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>propValue<span class="token punctuation">"</span></span> <span class="token attr-name">@input</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>propValue = $event<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
</code></pre></div><div class="language-vue" data-ext="vue" data-title="vue"><pre v-pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
  <span class="token function">emit</span><span class="token punctuation">(</span><span class="token string">'input'</span><span class="token punctuation">,</span> newValue<span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
</code></pre></div><p>用 v-model</p>
<h2 id="编译器" tabindex="-1"><a class="header-anchor" href="#编译器"><span>编译器</span></a></h2>
</div></template>


