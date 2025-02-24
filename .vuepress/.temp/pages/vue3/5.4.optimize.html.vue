<template><div><h1 id="optimize" tabindex="-1"><a class="header-anchor" href="#optimize"><span>optimize</span></a></h1>
<p>在 vue 的 diff 算法中，对比新旧 vnode 树时，总是按层级同层比较，这产生了很多无意义的对比操作。</p>
<p>假设有如下模板：</p>
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>foo<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>bar<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>{{ text }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre></div><p>diff 算法对比新旧 vnode 树的过程如下：</p>
<ul>
<li>对比 div 节点及其属性</li>
<li>对比 p 节点及其属性</li>
<li>对比文本节点</li>
</ul>
<p>事实上，这段代码中只有 text 文本节点会发生变化，其余的两项对比是不必要的。</p>
<p>总的来说，vue 的编译优化就是将模板区分为动态内容和静态内容，编译时将动态内容的信息附加到 vnode 中，运行时传递给渲染器。</p>
<h2 id="block-与-patchflag" tabindex="-1"><a class="header-anchor" href="#block-与-patchflag"><span>block 与 patchFlag</span></a></h2>
<h3 id="patchflag" tabindex="-1"><a class="header-anchor" href="#patchflag"><span>patchFlag</span></a></h3>
<p>假设有如下模板：</p>
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>foo<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>{{ bar }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre></div><p>这段模板中，<code v-pre>{{ bar }}</code> 是动态内容。编译优化后，模板的 vnode 结构如下。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> vnode <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">tag</span><span class="token operator">:</span> <span class="token string">'div'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span> <span class="token literal-property property">tag</span><span class="token operator">:</span> <span class="token string">'div'</span><span class="token punctuation">,</span> <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token string">'foo'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span> <span class="token literal-property property">tag</span><span class="token operator">:</span> <span class="token string">'p'</span><span class="token punctuation">,</span> <span class="token literal-property property">children</span><span class="token operator">:</span> ctx<span class="token punctuation">.</span>bar<span class="token punctuation">,</span> <span class="token literal-property property">patchFlag</span><span class="token operator">:</span> <span class="token number">1</span> <span class="token punctuation">}</span> <span class="token comment">// 动态节点</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre></div><p>可以看到，p 标签的 vnode 用 patchFlag 表明它是一个动态节点。</p>
<p>patchFlag 的值是一系列数字，常见的含义有：</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> PatchFlags <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token constant">TEXT</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token comment">// 动态 textContent</span>
  <span class="token constant">CLASS</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token comment">// 动态 class 绑定</span>
  <span class="token constant">STYLE</span><span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token comment">// 动态 style 绑定</span>
<span class="token punctuation">}</span>
</code></pre></div><p>编译优化得到的 patchFlag 体现在生成的代码中。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token function">h</span><span class="token punctuation">(</span><span class="token string">'div'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token string">'foo'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">[</span>
    <span class="token function">h</span><span class="token punctuation">(</span><span class="token string">'p'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token keyword">class</span><span class="token operator">:</span> <span class="token string">'bar'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> text<span class="token punctuation">,</span> PatchFlags<span class="token punctuation">.</span><span class="token constant">TEXT</span><span class="token punctuation">)</span>
  <span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><p>可以看到，当编译器发现一个节点是动态节点，就会在这个节点对应的代码中添加 patchFlag，这是在编译阶段做的工作。运行时，h 函数会得到这个 patchFlag。</p>
<h3 id="block" tabindex="-1"><a class="header-anchor" href="#block"><span>block</span></a></h3>
<p>Block 是一个概念，它指的是带有 dynamicChildren 属性的 vnode。dynamicChildren 存放的是 children 里的动态节点。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> vnode <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token comment">// block</span>
  <span class="token literal-property property">tag</span><span class="token operator">:</span> <span class="token string">'div'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span> <span class="token literal-property property">tag</span><span class="token operator">:</span> <span class="token string">'div'</span><span class="token punctuation">,</span> <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token string">'foo'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span> <span class="token literal-property property">tag</span><span class="token operator">:</span> <span class="token string">'p'</span><span class="token punctuation">,</span> <span class="token literal-property property">children</span><span class="token operator">:</span> ctx<span class="token punctuation">.</span>bar<span class="token punctuation">,</span> <span class="token literal-property property">patchFlag</span><span class="token operator">:</span> <span class="token number">1</span> <span class="token punctuation">}</span> <span class="token comment">// 动态节点</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token comment">// 将 children 中的动态节点提取到 dynamicChildren</span>
  <span class="token literal-property property">dynamicChildren</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span> <span class="token literal-property property">tag</span><span class="token operator">:</span> <span class="token string">'p'</span><span class="token punctuation">,</span> <span class="token literal-property property">children</span><span class="token operator">:</span> ctx<span class="token punctuation">.</span>bar<span class="token punctuation">,</span> <span class="token literal-property property">patchFlag</span><span class="token operator">:</span> <span class="token number">1</span> <span class="token punctuation">}</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre></div><p>需要注意的是，<strong>Block 收集的是所有动态后代节点</strong>。</p>
<p>渲染器的更新操作是<strong>以 Block 为维度</strong>的。也就是说，渲染器更新 Block 时，会忽略 children，而只更新 dynamicChildren 中的动态节点。</p>
<p>vnode 的 patchFlag 属性包含两个信息：这是动态节点、动态节点的类型。patchFlag 的值使得更新时能做到靶向更新。例如，当 patchFlag 为 1 时，说明存在动态文本节点，所以只需要更新文本即可。</p>
<p>既然 block 收集的是所有动态的后代节点，那么什么时候需要创建 block 节点呢？</p>
<p>首先，模板代码的根节点都会创建 block 节点；其次，任何带有 v-for、v-if、v-else 等指令的节点都需要作为 block 节点，这些会在后面介绍。</p>
<h3 id="如何收集动态节点" tabindex="-1"><a class="header-anchor" href="#如何收集动态节点"><span>如何收集动态节点</span></a></h3>
<p>动态节点的收集是在运行时完成的。</p>
<p>观察 render 函数中，createVnode 函数的调用。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token function">h</span><span class="token punctuation">(</span><span class="token string">'div'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">[</span>
    <span class="token function">h</span><span class="token punctuation">(</span><span class="token string">'div'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">[</span>
      <span class="token function">h</span><span class="token punctuation">(</span><span class="token string">'div'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">[</span>
        <span class="token comment">// ...</span>
      <span class="token punctuation">]</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><p>在 render 函数内，createVnode 的函数调用是嵌套的，其执行顺序是内层先执行，外层后执行。当外层 createVnode 执行时，内层已执行完毕。</p>
<p>因此，为了让外层 block 收集到内层的动态节点，我们需要一个栈。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> stack <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
<span class="token keyword">let</span> dynamicChildren

<span class="token keyword">function</span> <span class="token function">openBlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  stack<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
  dynamicChildren <span class="token operator">=</span> stack<span class="token punctuation">[</span>stack<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">closeBlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  dynamicChildren <span class="token operator">=</span> stack<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><p>上面代码中，我们用全局变量 dynamicChildren 存储当前的动态节点，在 createVnode 时如果是动态节点就直接保存在 dynamicChildren 中。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">createVnode</span><span class="token punctuation">(</span><span class="token parameter">tag<span class="token punctuation">,</span> props<span class="token punctuation">,</span> children<span class="token punctuation">,</span> flags</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> vnode <span class="token operator">=</span> <span class="token punctuation">{</span>
    tag<span class="token punctuation">,</span>
    children<span class="token punctuation">,</span>
    <span class="token literal-property property">patchFlags</span><span class="token operator">:</span> flags
  <span class="token punctuation">}</span>
  <span class="token comment">// 当前 vnode 是动态节点，添加到集合</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> flags <span class="token operator">!==</span> <span class="token string">'undefined'</span> <span class="token operator">&amp;&amp;</span> dynamicChildren<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    dynamicChildren<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>vnode<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> vnode
<span class="token punctuation">}</span>
</code></pre></div><p>下面是创建 block 的函数，block 就是一个特殊的 vnode。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">createBlock</span><span class="token punctuation">(</span><span class="token parameter">tag<span class="token punctuation">,</span> props<span class="token punctuation">,</span> children</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">openBlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token keyword">const</span> block <span class="token operator">=</span> <span class="token function">createVnode</span><span class="token punctuation">(</span>tag<span class="token punctuation">,</span> props<span class="token punctuation">,</span> children<span class="token punctuation">)</span>
  block<span class="token punctuation">.</span>dynamicChildren <span class="token operator">=</span> dynamicChildren
  <span class="token function">closeBlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token keyword">return</span> block
<span class="token punctuation">}</span>
</code></pre></div><p>在 render 函数中创建 block。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token function">createBlock</span><span class="token punctuation">(</span><span class="token string">'div'</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token punctuation">[</span>
    <span class="token function">createVnode</span><span class="token punctuation">(</span><span class="token string">'p'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token keyword">class</span><span class="token operator">:</span> <span class="token string">'foo'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
    <span class="token function">createVnode</span><span class="token punctuation">(</span><span class="token string">'p'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token keyword">class</span><span class="token operator">:</span> <span class="token string">'foo'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
  <span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="渲染器运行时支持" tabindex="-1"><a class="header-anchor" href="#渲染器运行时支持"><span>渲染器运行时支持</span></a></h3>
<p>传统的节点更新有两部分：更新 props 和 children。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">patchElement</span><span class="token punctuation">(</span><span class="token parameter">n1<span class="token punctuation">,</span> n2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// patchProps</span>
  <span class="token comment">// patchChildren</span>
<span class="token punctuation">}</span>
</code></pre></div><p>对于 block，则只需更新 dynamicChildren 里的内容。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">patchElement</span><span class="token punctuation">(</span><span class="token parameter">n1<span class="token punctuation">,</span> n2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  n2<span class="token punctuation">.</span>dynamicChildren
    <span class="token operator">?</span> <span class="token function">patchBlockChildren</span><span class="token punctuation">(</span>n1<span class="token punctuation">,</span> n2<span class="token punctuation">)</span>
    <span class="token operator">:</span> <span class="token function">patchChildren</span><span class="token punctuation">(</span>n1<span class="token punctuation">,</span> n2<span class="token punctuation">,</span> el<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><p>可以看到，patchElement 判断了节点是否是 block，如果是，则调用 patchBlockChildren。patchBlockChildren 则遍历 dynamicChildren 里的节点进行更新。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">patchBlockChildren</span><span class="token punctuation">(</span><span class="token parameter">n1<span class="token punctuation">,</span> n2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> n2<span class="token punctuation">.</span>dynamicChildren<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">patchElement</span><span class="token punctuation">(</span>n1<span class="token punctuation">.</span>dynamicChildren<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">,</span> n2<span class="token punctuation">.</span>dynamicChildren<span class="token punctuation">[</span>i<span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>在更新节点时，如果节点有 patchFlag，则根据 patchFlag 的值做相应更新，比如更新文本、props 等。如果没有 patchFlag，则回到以前全量更新的做法。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">patchElement</span><span class="token punctuation">(</span><span class="token parameter">n1<span class="token punctuation">,</span> n2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>n2<span class="token punctuation">.</span>patchFlags<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">switch</span><span class="token punctuation">(</span>n2<span class="token punctuation">.</span>patchFlags<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">case</span> <span class="token number">1</span><span class="token operator">:</span> <span class="token comment">// text</span>
      <span class="token keyword">case</span> <span class="token number">2</span><span class="token operator">:</span> <span class="token comment">// class</span>
      <span class="token comment">// ...</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token comment">// 全量更新</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="静态提升" tabindex="-1"><a class="header-anchor" href="#静态提升"><span>静态提升</span></a></h2>
<p>假设有如下模板：</p>
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>static text<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>{{ title }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre></div><p>在静态提升之前，渲染函数代码为：</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token function">createBlock</span><span class="token punctuation">(</span><span class="token string">'div'</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token punctuation">[</span>
    <span class="token function">h</span><span class="token punctuation">(</span><span class="token string">'p'</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token string">'static text'</span><span class="token punctuation">)</span>
    <span class="token function">h</span><span class="token punctuation">(</span><span class="token string">'p'</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> ctx<span class="token punctuation">.</span>title<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token comment">// patchFlag 1</span>
  <span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><p>很明显，static text 节点是不会变化的，但是在 title 变化时，整个 render函数会重新执行，因而 static text 也会重新创建，这是不必要的。</p>
<p>静态提升就是将纯静态的节点提升到渲染函数外。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> hoist <span class="token operator">=</span> <span class="token function">h</span><span class="token punctuation">(</span><span class="token string">'p'</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token string">'static text'</span><span class="token punctuation">)</span> <span class="token comment">// 提升</span>

<span class="token keyword">function</span> <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token function">createBlock</span><span class="token punctuation">(</span><span class="token string">'div'</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token punctuation">[</span>
    hoist<span class="token punctuation">,</span> <span class="token comment">// 静态节点引用</span>
    <span class="token function">h</span><span class="token punctuation">(</span><span class="token string">'p'</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> ctx<span class="token punctuation">.</span>title<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
  <span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><p>需要强调的是，<strong>静态提升是以树为单位的</strong>。</p>
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>section</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span><span class="token punctuation">></span></span>abc<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>section</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre></div><p>这段模板中，根节点的 div 作为 Block 是不会被提升的，section 及其后代节点都会被提升，如果 abc 是动态绑定的数据，则整棵树都不会被提升。</p>
<p>除了整个节点，节点的属性也是可以提升的。</p>
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span> <span class="token attr-name">foo</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>bar<span class="token punctuation">"</span></span> <span class="token attr-name">bar</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>baz<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>{{ abc }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre></div><p>p 标签虽然因为动态绑定的 abc 而无法提升，但 foo 属性可以。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> hoistProp <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">foo</span><span class="token operator">:</span> <span class="token string">'bar'</span><span class="token punctuation">,</span> <span class="token literal-property property">bar</span><span class="token operator">:</span> <span class="token string">'baz'</span> <span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token function">createBlock</span><span class="token punctuation">(</span><span class="token string">'div'</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token punctuation">[</span>
    <span class="token function">h</span><span class="token punctuation">(</span><span class="token string">'p'</span><span class="token punctuation">,</span> hoistProp<span class="token punctuation">,</span> ctx<span class="token punctuation">.</span>abc<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
  <span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="预字符串化" tabindex="-1"><a class="header-anchor" href="#预字符串化"><span>预字符串化</span></a></h2>
<p>假设模板中存在<strong>大量连续的静态节点</strong>，预字符串化可以将这些节点序列化成字符串。</p>
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>
  p * 20
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre></div><p>预字符串化生成一个 static 类型的 vnode。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> hoistStatic <span class="token operator">=</span> <span class="token function">createStaticVnode</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">&lt;p>&lt;/p> * 20</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span>

<span class="token keyword">function</span> <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token function">createBlock</span><span class="token punctuation">(</span><span class="token string">'div'</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token punctuation">[</span>
    hoistStatic <span class="token comment">// 由 20 个 p 标签生成的 static 类型 vnode</span>
  <span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></div></template>


