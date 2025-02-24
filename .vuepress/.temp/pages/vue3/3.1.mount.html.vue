<template><div><h1 id="mount" tabindex="-1"><a class="header-anchor" href="#mount"><span>mount</span></a></h1>
<p>渲染器的核心功能有两个：挂载 mount 和更新 patch。</p>
<p>上一节介绍过，<strong>render 的核心入口是 patch 函数</strong>，如果是首次渲染，则调用 mountElement。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">patch</span><span class="token punctuation">(</span><span class="token parameter">n1<span class="token punctuation">,</span> n2<span class="token punctuation">,</span> container</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>n1<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 旧 vnode 不存在，直接 mount</span>
    <span class="token function">mountElement</span><span class="token punctuation">(</span>n2<span class="token punctuation">,</span> container<span class="token punctuation">)</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token comment">// patch</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="mountelement" tabindex="-1"><a class="header-anchor" href="#mountelement"><span>mountElement</span></a></h2>
<p>假设有如下 vnode：</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> vnode <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'div'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token string">'foo'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>
    <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'p'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token string">'hello'</span>
  <span class="token punctuation">}</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre></div><p>mountElement 实现如下：</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">mountElement</span><span class="token punctuation">(</span><span class="token parameter">vnode<span class="token punctuation">,</span> container</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> el <span class="token operator">=</span> <span class="token function">createElement</span><span class="token punctuation">(</span>vnode<span class="token punctuation">.</span>type<span class="token punctuation">)</span>
  
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> vnode<span class="token punctuation">.</span>children <span class="token operator">===</span> <span class="token string">'string'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">setElementText</span><span class="token punctuation">(</span>el<span class="token punctuation">,</span> vnode<span class="token punctuation">.</span>children<span class="token punctuation">)</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>Array<span class="token punctuation">.</span><span class="token function">isArray</span><span class="token punctuation">(</span>vnode<span class="token punctuation">.</span>children<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// patch 子节点的 vnode</span>
    vnode<span class="token punctuation">.</span>children<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">child</span> <span class="token operator">=></span> <span class="token function">patch</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> child<span class="token punctuation">,</span> el<span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token function">insert</span><span class="token punctuation">(</span>el<span class="token punctuation">,</span> container<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><p>这里重要的是子节点的处理逻辑：<strong>当子节点是数组时，循环调用 patch 处理子节点</strong>。</p>
<p>这里验证了前面的结论：patch 才是渲染 vnode 的核心入口。每当有新的 vnode，调用的都是 patch 函数。</p>
<h3 id="html-attribute-与-dom-property" tabindex="-1"><a class="header-anchor" href="#html-attribute-与-dom-property"><span>HTML Attribute 与 DOM Property</span></a></h3>
<p>HTML Attribute 指的是定义在 HTML 标签上的属性。</p>
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>text<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>foo<span class="token punctuation">"</span></span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>input<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
</code></pre></div><p>上面的 input 元素有 type、value、id 这些 HTML Attribute。</p>
<p>浏览器解析 HTML 后，会创建对应的 DOM 元素对象，对象上包含了很多 DOM Property。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> el <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">'#input'</span><span class="token punctuation">)</span>

Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span>el<span class="token punctuation">)</span> <span class="token comment">// DOM Property</span>
</code></pre></div><p>HTML Attribute ( 以下称 attr ) 与 DOM Property ( 以下称 prop ) 之间的关系很复杂。</p>
<ul>
<li>
<p>有时它们只是名字不一样，比如 attr 的 class 和 prop 的 className</p>
</li>
<li>
<p>有些是 attr 独有的属性，比如 aria-* 类的 attr</p>
</li>
<li>
<p>有些是 prop 独有的属性，比如 el.textContent</p>
</li>
<li>
<p>有时一个 attr 对应多个 prop，比如 value 对应 value 和 defaultValue</p>
</li>
</ul>
<p>虽然很复杂，但只需要记住一个核心原则：<strong>HTML Attribute 是对应的 DOM Property 的初始值</strong>。</p>
<h3 id="设置元素属性" tabindex="-1"><a class="header-anchor" href="#设置元素属性"><span>设置元素属性</span></a></h3>
<p>在 vnode 中，元素的属性是由 props 对象描述的。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> vnode <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'input'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'text'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">'vue'</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>我们在创建 vnode 对应的元素的属性时，有两种办法：</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> el <span class="token operator">=</span> <span class="token function">createElement</span><span class="token punctuation">(</span>vnode<span class="token punctuation">.</span>type<span class="token punctuation">)</span>

  el<span class="token punctuation">.</span><span class="token function">setAttribtute</span><span class="token punctuation">(</span><span class="token string">'type'</span><span class="token punctuation">,</span> <span class="token string">'text'</span><span class="token punctuation">)</span>
el<span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token string">'vue'</span>
</code></pre></div><p>从上一节 HTML Attribute 与 DOM Property 的区别来看，无论是 setAttribute 函数，还是设置元素的 property，都无法涵盖所有情况。</p>
<p>对此，解决办法是：<strong>优先设置 Property，其余用 setAttribute</strong>。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">mountElement</span><span class="token punctuation">(</span><span class="token parameter">vnode<span class="token punctuation">,</span> container</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> el <span class="token operator">=</span> <span class="token function">createElement</span><span class="token punctuation">(</span>vnode<span class="token punctuation">.</span>type<span class="token punctuation">)</span>
  
  <span class="token comment">// 设置 vnode.props</span>
  <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">const</span> <span class="token punctuation">[</span>key<span class="token punctuation">,</span> prop<span class="token punctuation">]</span> <span class="token keyword">of</span> Object<span class="token punctuation">.</span><span class="token function">entries</span><span class="token punctuation">(</span>vnode<span class="token punctuation">.</span>props<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>el<span class="token punctuation">.</span><span class="token function">hasOwnProperty</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// prop 型属性</span>
      el<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> prop
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      el<span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> prop<span class="token punctuation">)</span> <span class="token comment">// 其余属性都用 setAttribute 设置</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>上面代码中，用 hasOwnProperty 判断是否存在这样的 property，如果有，则优先设置，否则用 setAttribute。</p>
<p>以上方案下，特殊情况还要特殊处理，比如 disabled prop 的值应该是 boolean 类型，而 vnode 对象中往往是空字符串，这种对应还要判断。</p>
<p>最后，回顾一下目前的 mountElement 函数的实现情况。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">mountElement</span><span class="token punctuation">(</span><span class="token parameter">vnode<span class="token punctuation">,</span> container</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> el <span class="token operator">=</span> <span class="token function">createElement</span><span class="token punctuation">(</span>vnode<span class="token punctuation">.</span>type<span class="token punctuation">)</span>
  
  <span class="token comment">// 处理子节点</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> vnode<span class="token punctuation">.</span>children <span class="token operator">===</span> <span class="token string">'string'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">setElementText</span><span class="token punctuation">(</span>el<span class="token punctuation">,</span> vnode<span class="token punctuation">.</span>children<span class="token punctuation">)</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>Array<span class="token punctuation">.</span><span class="token function">isArray</span><span class="token punctuation">(</span>vnode<span class="token punctuation">.</span>children<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    vnode<span class="token punctuation">.</span>children<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">child</span> <span class="token operator">=></span> <span class="token function">patch</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> child<span class="token punctuation">,</span> el<span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  
  <span class="token comment">// 设置 props</span>
  <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">const</span> <span class="token punctuation">[</span>key<span class="token punctuation">,</span> value<span class="token punctuation">]</span> <span class="token keyword">of</span> Object<span class="token punctuation">.</span><span class="token function">entries</span><span class="token punctuation">(</span>vnode<span class="token punctuation">.</span>props<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">patchProps</span><span class="token punctuation">(</span>el<span class="token punctuation">,</span> key<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> value<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token function">insert</span><span class="token punctuation">(</span>el<span class="token punctuation">,</span> container<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><p>我们把处理 props 的逻辑抽离成函数，由渲染器提供。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> renderer <span class="token operator">=</span> <span class="token function">createRenderer</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token function-variable function">createElement</span><span class="token operator">:</span> <span class="token parameter">tag</span> <span class="token operator">=></span> document<span class="token punctuation">.</span><span class="token function">creatElement</span><span class="token punctuation">(</span>tag<span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token function">patchProps</span><span class="token punctuation">(</span><span class="token parameter">el<span class="token punctuation">,</span> key<span class="token punctuation">,</span> preValue<span class="token punctuation">,</span> nextValue</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>el<span class="token punctuation">.</span><span class="token function">hasOwnProperty</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// prop 型属性</span>
      el<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> prop
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      el<span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> prop<span class="token punctuation">)</span> <span class="token comment">// 其余属性都用 setAttribute 设置</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><h2 id="unmount" tabindex="-1"><a class="header-anchor" href="#unmount"><span>unmount</span></a></h2>
<p>回顾 renderer 的结构。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> renderer <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function">render</span><span class="token punctuation">(</span><span class="token parameter">vnode<span class="token punctuation">,</span> container</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>vnode<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 新旧 vnode 一起传给 patch，如果旧 vnode 不存在，则直接 mount</span>
      <span class="token function">patch</span><span class="token punctuation">(</span>container<span class="token punctuation">.</span>_vnode<span class="token punctuation">,</span> vnode<span class="token punctuation">,</span> container<span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>container<span class="token punctuation">.</span>_vnode<span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token function">umount</span><span class="token punctuation">(</span>container<span class="token punctuation">.</span>_vnode<span class="token punctuation">)</span> <span class="token comment">// 有旧 vnode 无新 vnode，是 unmount 操作</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    container<span class="token punctuation">.</span>_vnode <span class="token operator">=</span> vnode <span class="token comment">// _vnode 就是旧 vnode</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>在 unmount 过程中，大概需要以下几件事：</p>
<ul>
<li>移除 dom 节点</li>
<li>调用 unmount 相关的生命周期函数和指令 hook 函数</li>
<li>移除 dom 上的事件监听器</li>
</ul>
<p>为了做到这些，我们首先需要在 vnode 和真实 dom 之间建立联系。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">mountElement</span><span class="token punctuation">(</span><span class="token parameter">vnode<span class="token punctuation">,</span> container</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> el <span class="token operator">=</span> <span class="token function">createElement</span><span class="token punctuation">(</span>vnode<span class="token punctuation">.</span>type<span class="token punctuation">)</span>
  vnode<span class="token punctuation">.</span>el <span class="token operator">=</span> el <span class="token comment">// vnode 引用真实 dom</span>
<span class="token punctuation">}</span>
</code></pre></div><p>然后在 unmount 函数中拿到真实 dom 对象。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">unmount</span><span class="token punctuation">(</span><span class="token parameter">vnode</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> el <span class="token operator">=</span> vnode<span class="token punctuation">.</span>el <span class="token comment">// vnode 对应的真实 dom</span>
  <span class="token keyword">const</span> parent <span class="token operator">=</span> el<span class="token punctuation">.</span>parentNode <span class="token comment">// 挂载 vnode 的容器</span>
  
  parent<span class="token punctuation">.</span><span class="token function">removeChild</span><span class="token punctuation">(</span>el<span class="token punctuation">)</span> <span class="token comment">// 移除 dom 节点</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="移除事件监听器" tabindex="-1"><a class="header-anchor" href="#移除事件监听器"><span>移除事件监听器</span></a></h3>
<p>在 vnode 中描述事件监听大概如下：</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> vnode <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'div'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function-variable function">onclick</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'div click'</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>然后在 patchProps 中为 dom 元素添加事件监听。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">patchProps</span><span class="token punctuation">(</span><span class="token parameter">el<span class="token punctuation">,</span> key<span class="token punctuation">,</span> preValue<span class="token punctuation">,</span> nextValue</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">^on</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> eventName <span class="token operator">=</span> key<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toLowerCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    preValue <span class="token operator">&amp;&amp;</span> el<span class="token punctuation">.</span><span class="token function">removeEventListener</span><span class="token punctuation">(</span>eventName<span class="token punctuation">,</span> preValue<span class="token punctuation">)</span> <span class="token comment">// 移除旧事件</span>
    el<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span>eventName<span class="token punctuation">,</span> nextValue<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>key <span class="token operator">===</span> <span class="token string">'class'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">/* ... */</span> <span class="token punctuation">}</span>
  <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>key <span class="token operator">===</span> <span class="token string">'...'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">/* ... */</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>vue 的事件处理比较复杂，这里只选简单的情况说明。</p>
</div></template>


