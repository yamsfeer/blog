<template><div><h1 id="patch" tabindex="-1"><a class="header-anchor" href="#patch"><span>patch</span></a></h1>
<p>回顾 patch 函数的结构。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">patch</span><span class="token punctuation">(</span><span class="token parameter">n1<span class="token punctuation">,</span> n2<span class="token punctuation">,</span> container</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>n1<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 旧 vnode 不存在，直接 mount</span>
    <span class="token function">mountElement</span><span class="token punctuation">(</span>n2<span class="token punctuation">,</span> container<span class="token punctuation">)</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token function">patchElement</span><span class="token punctuation">(</span>n1<span class="token punctuation">,</span> n2<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>以上逻辑都是基于新节点是 div 这类普通标签的判断。</p>
<p>事实上，patch 还有其他几种情况。比如：n1 存在但 n1 和 n2 的类型不同的情况下，n1 肯定不能再通过打补丁使其可用，因此可以直接卸载；n2.type 是对象时表示它描述的是组件，组件有一套和元素不同的 mount 和 patch 方法。</p>
<p>考虑到这些情况，patch 函数的代码如下表示：</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">patch</span><span class="token punctuation">(</span><span class="token parameter">n1<span class="token punctuation">,</span> n2<span class="token punctuation">,</span> container</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>n1 <span class="token operator">&amp;&amp;</span> n1<span class="token punctuation">.</span>type <span class="token operator">!==</span> n2<span class="token punctuation">.</span>type<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// vnode 类型不同</span>
    <span class="token function">unmount</span><span class="token punctuation">(</span>n1<span class="token punctuation">)</span>
    n1 <span class="token operator">=</span> <span class="token keyword">null</span> <span class="token comment">// 下面相当于 patch(null, n2, container)</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> n2<span class="token punctuation">.</span>type <span class="token operator">===</span> <span class="token string">'string'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 普通标签</span>
    n1 <span class="token operator">?</span> <span class="token function">patchElement</span><span class="token punctuation">(</span>n1<span class="token punctuation">,</span> n2<span class="token punctuation">,</span> container<span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token function">mountElement</span><span class="token punctuation">(</span>n2<span class="token punctuation">,</span> container<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> n2<span class="token punctuation">.</span>type <span class="token operator">===</span> <span class="token string">'object'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">/* 组件 */</span> <span class="token punctuation">}</span>
  <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>n2<span class="token punctuation">.</span>type <span class="token operator">===</span> Fragment<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">/* Fragment 类型 */</span> <span class="token punctuation">}</span>
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre></div><p>对于普通元素的更新操作调用的是 patchElement 函数。</p>
<h2 id="patchelement" tabindex="-1"><a class="header-anchor" href="#patchelement"><span>patchElement</span></a></h2>
<p>patchElement 的工作可以分为两部分：更新 props 和更新子节点。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">patchElement</span><span class="token punctuation">(</span><span class="token parameter">n1<span class="token punctuation">,</span> n2<span class="token punctuation">,</span> container</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// patch props</span>
  <span class="token comment">// patch children</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="patchprops" tabindex="-1"><a class="header-anchor" href="#patchprops"><span>patchProps</span></a></h3>
<p>props 的设置是相对复杂的，但我们已经在 mountElement 中介绍过如何设置属性，具体的工作交给 patchProps 函数即可。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">patchElement</span><span class="token punctuation">(</span><span class="token parameter">n1<span class="token punctuation">,</span> n2<span class="token punctuation">,</span> container</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> el <span class="token operator">=</span> n1<span class="token punctuation">.</span>el
  <span class="token keyword">const</span> oldProps <span class="token operator">=</span> n1<span class="token punctuation">.</span>props<span class="token punctuation">,</span> newProps <span class="token operator">=</span> n2<span class="token punctuation">.</span>props
  
  <span class="token comment">// 更新新props</span>
  <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">const</span> key <span class="token keyword">of</span> Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span>newProps<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>newProps<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">!==</span> oldProps<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">patchProps</span><span class="token punctuation">(</span>el<span class="token punctuation">,</span> key<span class="token punctuation">,</span> oldProps<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">,</span> newProps<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  
  <span class="token comment">// 删除旧props</span>
  <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">const</span> key <span class="token keyword">of</span> Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span>oldProps<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>newProps<span class="token punctuation">.</span><span class="token function">hasOwnProperty</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">patchProps</span><span class="token punctuation">(</span>el<span class="token punctuation">,</span> key<span class="token punctuation">,</span> oldProps<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  
  <span class="token function">patchChildren</span><span class="token punctuation">(</span>n1<span class="token punctuation">,</span> n2<span class="token punctuation">,</span> container<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="patchchildren" tabindex="-1"><a class="header-anchor" href="#patchchildren"><span>patchChildren</span></a></h3>
<p>对于一个元素来说，它的子节点有以下几种情况：</p>
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span> <span class="token comment">&lt;!-- 没有子节点 --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>some text<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span> <span class="token comment">&lt;!-- 文本子节点 --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">/></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">/></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span> <span class="token comment">&lt;!-- 多个子节点 --></span>
</code></pre></div><p>从 vnode 对象角度看，以上三种情况分别对应 vnode.children 的值为 null、字符串、数组三种情况。</p>
<p>元素的子节点有三种情况，而 patch 过程中又有新旧节点的区别，所以总共有 3*3=9 种情况。虽然 n1 和 n2 的组合有比较多种判断分支，但在代码中并不需要全部写出来。</p>
<p>我们从新子节点的情况入手，如前面所说，它有三种情况：null、字符串、数组。</p>
<p>新子节点是字符串。旧子节点同样有三种可能，但只有当旧子节点是数组的情况下需要逐个 unmount，为容器设置文本就可以覆盖其余两种情况。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">patchChildren</span><span class="token punctuation">(</span><span class="token parameter">n1<span class="token punctuation">,</span> n2<span class="token punctuation">,</span> container</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> n2<span class="token punctuation">.</span>children <span class="token operator">===</span> <span class="token string">'string'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> 
    <span class="token keyword">if</span> <span class="token punctuation">(</span>Array<span class="token punctuation">.</span><span class="token function">isArray</span><span class="token punctuation">(</span>n1<span class="token punctuation">.</span>children<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 逐个 unmount 旧子节点</span>
      n1<span class="token punctuation">.</span>children<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">child</span> <span class="token operator">=></span> <span class="token function">unmount</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    
    <span class="token function">setElementRext</span><span class="token punctuation">(</span>container<span class="token punctuation">,</span> n2<span class="token punctuation">.</span>children<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>新子节点是数组。<strong>如果旧子节点也是数组，这时涉及到核心的 diff 算法</strong>，目前暂且用逐个卸载旧子节点，然后逐个挂载新子节点的方法；旧子节点其余两种情况直接清空，然后逐个挂载新子节点。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">patchChildren</span><span class="token punctuation">(</span><span class="token parameter">n1<span class="token punctuation">,</span> n2<span class="token punctuation">,</span> container</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> n2<span class="token punctuation">.</span>children <span class="token operator">===</span> <span class="token string">'string'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">/* */</span> <span class="token punctuation">}</span>
  <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>Array<span class="token punctuation">.</span><span class="token function">isArray</span><span class="token punctuation">(</span>n2<span class="token punctuation">.</span>children<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>Array<span class="token punctuation">.</span><span class="token function">isArray</span><span class="token punctuation">(</span>n1<span class="token punctuation">.</span>children<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 新旧子节点都是数组，需要 diff</span>
      n1<span class="token punctuation">.</span>children<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">c</span> <span class="token operator">=></span> <span class="token function">unmount</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span><span class="token punctuation">)</span>
      n2<span class="token punctuation">.</span>children<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">c</span> <span class="token operator">=></span> <span class="token function">patch</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> c<span class="token punctuation">,</span> container<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token function">setElementText</span><span class="token punctuation">(</span>container<span class="token punctuation">,</span> <span class="token string">''</span><span class="token punctuation">)</span>
      n2<span class="token punctuation">.</span>children<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">c</span> <span class="token operator">=></span> <span class="token function">patch</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> c<span class="token punctuation">,</span> container<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>新子节点不存在。旧子节点按情况清空即可。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">patchChildren</span><span class="token punctuation">(</span><span class="token parameter">n1<span class="token punctuation">,</span> n2<span class="token punctuation">,</span> container</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> n2<span class="token punctuation">.</span>children <span class="token operator">===</span> <span class="token string">'string'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">/* */</span> <span class="token punctuation">}</span>
  <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>Array<span class="token punctuation">.</span><span class="token function">isArray</span><span class="token punctuation">(</span>n2<span class="token punctuation">.</span>children<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">/* */</span> <span class="token punctuation">}</span>
  <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>Array<span class="token punctuation">.</span><span class="token function">isArray</span><span class="token punctuation">(</span>n1<span class="token punctuation">.</span>children<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      n1<span class="token punctuation">.</span>children<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">child</span> <span class="token operator">=></span> <span class="token function">unmount</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token function">setElementText</span><span class="token punctuation">(</span>container<span class="token punctuation">,</span> <span class="token string">''</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div></div></template>


