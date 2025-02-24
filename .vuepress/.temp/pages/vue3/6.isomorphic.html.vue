<template><div><h1 id="同构渲染" tabindex="-1"><a class="header-anchor" href="#同构渲染"><span>同构渲染</span></a></h1>
<p>同构渲染就是，服务器将渲染好的 html 代码发送给浏览器 ( 这一步和 SSR 一样 )，浏览器通过 html 加载 JS 代码后，然后进行激活操作。</p>
<p>激活操作也称注水 ( hydration )，它主要分为两部分工作：</p>
<ul>
<li>在真实 dom 和虚拟 dom 之间建立联系</li>
<li>为 dom 元素添加事件绑定</li>
</ul>
<p>激活完成后，整个应用就完全被 vue 接管成 CSR 应用了。</p>
<h2 id="渲染-vnode-成-html" tabindex="-1"><a class="header-anchor" href="#渲染-vnode-成-html"><span>渲染 vnode 成 html</span></a></h2>
<p>假设有如下 vnode：</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> vnode <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'div'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token string">'foo'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span> <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'p'</span><span class="token punctuation">,</span> <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token string">'hello'</span> <span class="token punctuation">}</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre></div><p>我们需要将它渲染成 html 字符串并返回给客户端，这本质上是一个字符串拼接的过程。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">renderElementVnode</span><span class="token punctuation">(</span><span class="token parameter">vnode</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token punctuation">{</span> <span class="token literal-property property">type</span><span class="token operator">:</span> tag<span class="token punctuation">,</span> props<span class="token punctuation">,</span> children <span class="token punctuation">}</span> <span class="token operator">=</span> vnode
  
  <span class="token keyword">const</span> html <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">&lt;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>tag<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span>

  props <span class="token operator">&amp;&amp;</span> Object<span class="token punctuation">.</span><span class="token function">entries</span><span class="token punctuation">(</span>pros<span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">[</span>k<span class="token punctuation">,</span> v<span class="token punctuation">]</span></span><span class="token punctuation">)</span> <span class="token operator">=></span> html <span class="token operator">+=</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>k<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">="</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>v<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">"</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span>
  html <span class="token operator">+=</span> <span class="token string">'>'</span>
  
  <span class="token keyword">typeof</span> children <span class="token operator">===</span> <span class="token string">'string'</span>
    <span class="token operator">?</span> html <span class="token operator">+=</span> children
    <span class="token operator">:</span> children<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">child</span> <span class="token operator">=></span> html <span class="token operator">+=</span> <span class="token function">renderElementVnode</span><span class="token punctuation">(</span>child<span class="token punctuation">)</span><span class="token punctuation">)</span>

  html <span class="token operator">+=</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">&lt;/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>tag<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span>
  
  <span class="token keyword">return</span> html
<span class="token punctuation">}</span>
</code></pre></div><p>以上只是一个基本实现，还有很多边界情况，比如自闭合标签、props 的处理细节、html 文本转义等等，这里暂不考虑。</p>
<h3 id="将组件渲染成-html-字符串" tabindex="-1"><a class="header-anchor" href="#将组件渲染成-html-字符串"><span>将组件渲染成 html 字符串</span></a></h3>
<p>一个组件 vnode 结构如下：</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> CompVnode <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">type</span><span class="token operator">:</span> MyComponent
<span class="token punctuation">}</span>
</code></pre></div><p>MyComponent 组件对象的结构如下：</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> MyComponent <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'div'</span><span class="token punctuation">,</span>
        <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token string">'hello'</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>我们调用 setup 函数得到的是组件的 render 函数，render 函数返回的是组件的 subTree。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">renderComponentVnode</span><span class="token punctuation">(</span><span class="token parameter">vnode</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token punctuation">{</span> setup <span class="token punctuation">}</span> <span class="token operator">=</span> vnode
  <span class="token keyword">const</span> render <span class="token operator">=</span> <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token keyword">const</span> subTree <span class="token operator">=</span> <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> subTree<span class="token punctuation">.</span>type <span class="token operator">===</span> <span class="token string">'object'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">renderComponentVnode</span><span class="token punctuation">(</span>subTree<span class="token punctuation">)</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> subTree<span class="token punctuation">.</span>type <span class="token operator">===</span> <span class="token string">'string'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">renderElementVnode</span><span class="token punctuation">(</span>subTree<span class="token punctuation">)</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">...</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><p>如果 subTree.type 是一个对象，说明它是一个子组件，则递归调用 renderComponentVnode，否则调用上一节的 renderElementVnode 获得 html 字符串。</p>
<p>以上是渲染组件获取 html 的大致过程，对一个组件来说，我们的目标是 subTree 对应的 html 代码。然而，在 执行 setup 函数时，我们还需要提供 setupContext，这涉及到组件实例化的过程。</p>
<p>renderComponentVnode 的相对详细版本：</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">renderComponentVnode</span><span class="token punctuation">(</span><span class="token parameter">vnode</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> component <span class="token operator">=</span> vnode<span class="token punctuation">.</span>type
  <span class="token keyword">const</span> <span class="token punctuation">{</span> render<span class="token punctuation">,</span> data<span class="token punctuation">,</span> setup<span class="token punctuation">,</span> <span class="token literal-property property">props</span><span class="token operator">:</span> propsOption <span class="token punctuation">}</span> <span class="token operator">=</span> component
  <span class="token keyword">const</span> <span class="token punctuation">[</span>props<span class="token punctuation">,</span> attrs<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">resolveProps</span><span class="token punctuation">(</span>propsOption<span class="token punctuation">,</span> vnode<span class="token punctuation">.</span>props<span class="token punctuation">)</span>
  
  <span class="token keyword">const</span> instance <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">state</span><span class="token operator">:</span> <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token comment">// 不需要转为 reactive</span>
    props<span class="token punctuation">,</span> <span class="token comment">// 无需 shallowReactive</span>
    <span class="token literal-property property">subTree</span><span class="token operator">:</span> <span class="token keyword">null</span>
  <span class="token punctuation">}</span>
  
  <span class="token keyword">const</span> setupContext <span class="token operator">=</span> <span class="token punctuation">{</span> attrs<span class="token punctuation">,</span> emit<span class="token punctuation">,</span> slots <span class="token punctuation">}</span>
  <span class="token keyword">const</span> renderContext <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span>instance<span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token comment">/* ... */</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
  
  <span class="token function">setup</span><span class="token punctuation">(</span><span class="token function">shallowReadonly</span><span class="token punctuation">(</span>instance<span class="token punctuation">.</span>props<span class="token punctuation">)</span><span class="token punctuation">,</span> setupContext<span class="token punctuation">)</span>
  <span class="token keyword">const</span> subTree <span class="token operator">=</span> <span class="token function">render</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>renderContext<span class="token punctuation">,</span> renderContext<span class="token punctuation">)</span>
  
  <span class="token keyword">return</span> <span class="token function">renderVnode</span><span class="token punctuation">(</span>subTree<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><p>可以看到，在服务端将组件渲染成 html，与客户端渲染的逻辑基本一致，区别在于，<strong>服务端渲染的是应用的当前快照，不存在数据变更重新渲染的情况</strong>。</p>
<p>因此，data 和 props 等不需要是响应式对象，也不需要创建 render effect 重新渲染。</p>
<h2 id="激活" tabindex="-1"><a class="header-anchor" href="#激活"><span>激活</span></a></h2>
<p>激活主要分为两步：</p>
<ul>
<li>在真实 dom 和虚拟 dom 之间建立联系</li>
<li>为 dom 元素添加事件绑定</li>
</ul>
<p>我们知道，renderer 中有 render 函数负责渲染，对于同构应用，则有 hydrate 函数进行激活。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">createRenderer</span><span class="token punctuation">(</span><span class="token parameter">options</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">function</span> <span class="token function">render</span><span class="token punctuation">(</span><span class="token parameter">vnode<span class="token punctuation">,</span> container</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token keyword">function</span> <span class="token function">hydrate</span><span class="token punctuation">(</span><span class="token parameter">vnode<span class="token punctuation">,</span> containe</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  
  <span class="token keyword">return</span> <span class="token punctuation">{</span>
    render<span class="token punctuation">,</span>
    hydrate
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

renderer<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span>vnode<span class="token punctuation">,</span> container<span class="token punctuation">)</span>
renderer<span class="token punctuation">.</span><span class="token function">hydrate</span><span class="token punctuation">(</span>vnode<span class="token punctuation">,</span> container<span class="token punctuation">)</span>
</code></pre></div><p>从服务端渲染到客户端激活的过程如下：</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> html <span class="token operator">=</span> <span class="token function">renderComponentVnode</span><span class="token punctuation">(</span>vnode<span class="token punctuation">)</span> <span class="token comment">// ssr 获取 html 发送给客户端</span>

<span class="token keyword">const</span> container <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">'#app'</span><span class="token punctuation">)</span>
container<span class="token punctuation">.</span>innerHTML <span class="token operator">=</span> html <span class="token comment">// 渲染 ssr 内容</span>

renderer<span class="token punctuation">.</span><span class="token function">hydrate</span><span class="token punctuation">(</span>vnode<span class="token punctuation">,</span> container<span class="token punctuation">)</span> <span class="token comment">// 激活</span>
</code></pre></div><p>假设有如下组件：</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> MyComponent <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> str <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token string">'foo'</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'div'</span><span class="token punctuation">,</span>
        <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>
          <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'span'</span><span class="token punctuation">,</span>
          <span class="token literal-property property">children</span><span class="token operator">:</span> str<span class="token punctuation">.</span>value<span class="token punctuation">,</span>
          <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token function-variable function">onClick</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> str<span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token string">'bar'</span> <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'span'</span><span class="token punctuation">,</span> <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token string">'baz'</span> <span class="token punctuation">}</span><span class="token punctuation">]</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>渲染该组件的 vnode：</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> vnode <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">type</span><span class="token operator">:</span> MyComponent <span class="token punctuation">}</span>
</code></pre></div><p>假设 container 为 #app，MyComponent 组件渲染成真实 dom 的结果是这样的：</p>
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>app<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span><span class="token punctuation">></span></span>foo<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span><span class="token punctuation">></span></span>baz<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre></div><p>hydrate 要做的第一步就是将真实 dom 和虚拟 dom 关联起来。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">hydrate</span><span class="token punctuation">(</span><span class="token parameter">vnode<span class="token punctuation">,</span> container</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">hydrateNode</span><span class="token punctuation">(</span>container<span class="token punctuation">.</span>firstChild<span class="token punctuation">,</span> vnode<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><p>注意，container 本身并不与 vnode 对应，所以我们要从 container.firstChild 开始。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">hydrateNode</span><span class="token punctuation">(</span><span class="token parameter">node<span class="token punctuation">,</span> vnode</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token punctuation">{</span> type <span class="token punctuation">}</span> <span class="token operator">=</span> vnode
  vnode<span class="token punctuation">.</span>el <span class="token operator">=</span> node
  
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> type <span class="token operator">===</span> <span class="token string">'object'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">mountComponent</span><span class="token punctuation">(</span>vnode<span class="token punctuation">,</span> container<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> type <span class="token operator">===</span> <span class="token string">'string'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">hydrateElement</span><span class="token punctuation">(</span>node<span class="token punctuation">,</span> vnode<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  
  <span class="token keyword">return</span> node<span class="token punctuation">.</span>nextSibling
<span class="token punctuation">}</span>
</code></pre></div><p>hydrateNode 的返回值非常重要，它的用途体现在 hydrateElement 内。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">hydrateElement</span><span class="token punctuation">(</span><span class="token parameter">el<span class="token punctuation">,</span> vnode</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>vnode<span class="token punctuation">.</span>props<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    Object
      <span class="token punctuation">.</span><span class="token function">entries</span><span class="token punctuation">(</span>vnode<span class="token punctuation">.</span>props<span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">[</span>key<span class="token punctuation">,</span> value<span class="token punctuation">]</span></span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">^on</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 事件以 on 开始</span>
          <span class="token function">patchProps</span><span class="token punctuation">(</span>el<span class="token punctuation">,</span> key<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> value<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  
  <span class="token keyword">if</span> <span class="token punctuation">(</span>Array<span class="token punctuation">.</span><span class="token function">isArray</span><span class="token punctuation">(</span>vnode<span class="token punctuation">.</span>children<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> nextNode <span class="token operator">=</span> el<span class="token punctuation">.</span>firstChild
    vnode<span class="token punctuation">.</span>children<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">child</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      nextNode <span class="token operator">=</span> <span class="token function">hydrateNode</span><span class="token punctuation">(</span>nextNode<span class="token punctuation">,</span> child<span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>hydrateElement 有两个关键点：</p>
<ul>
<li>ssr 是忽略事件的，浏览器在激活之前只是渲染了静态的 html 而已，所以激活 dom 元素的操作之一是为其添加事件处理。</li>
<li>从 el.firstChild 开始，递归调用 hydrateNode 完成激活。</li>
</ul>
<p>对于组件的激活，由于 SSR 页面中已经存在真实 dom，所以 mountComponent 时无需再次创建。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">mountComponent</span><span class="token punctuation">(</span><span class="token parameter">vnode<span class="token punctuation">,</span> container</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  instance<span class="token punctuation">.</span>update <span class="token operator">=</span> <span class="token function">effect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> subTree <span class="token operator">=</span> <span class="token function">render</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>renderContext<span class="token punctuation">,</span> renderContext<span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>instance<span class="token punctuation">.</span>isMounted<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>vnode<span class="token punctuation">.</span>el<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// vnode.el 存在，意味着激活</span>
        <span class="token function">hydrateNode</span><span class="token punctuation">(</span>vnode<span class="token punctuation">.</span>el<span class="token punctuation">,</span> subTree<span class="token punctuation">)</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token function">patch</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> subTree<span class="token punctuation">,</span> container<span class="token punctuation">)</span> <span class="token comment">// 否则正常 patch</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></div></template>


