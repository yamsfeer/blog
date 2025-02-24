<template><div><h1 id="声明提升" tabindex="-1"><a class="header-anchor" href="#声明提升"><span>声明提升</span></a></h1>
<h2 id="声明提升-1" tabindex="-1"><a class="header-anchor" href="#声明提升-1"><span>声明提升</span></a></h2>
<p>参考如下代码：</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// undefined</span>
  <span class="token keyword">var</span> foo <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>在第二章中提到，JavaScript引擎在执行代码前会对其进行编译，编译阶段中的一部分工作就是<strong>找到所有的声明，并用合适的作用域将它们关联起来</strong>。这正是<strong>词法作用域的核心内容</strong>。</p>
<p>因此，包括<strong>变量和函数在内的所有声明都会在任何代码被执行前首先被处理</strong>。</p>
<p>以上代码相当于：</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> foo<span class="token punctuation">;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>foo<span class="token punctuation">)</span><span class="token punctuation">;</span>
  foo <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="函数表达式不会被提升" tabindex="-1"><a class="header-anchor" href="#函数表达式不会被提升"><span>函数表达式不会被提升</span></a></h3>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// TypeError</span>
<span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// ReferenceError</span>
<span class="token keyword">var</span> <span class="token function-variable function">foo</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre></div><p>这个代码片段经过提升后，实际上会被理解为以下形式:</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> foo<span class="token punctuation">;</span>
<span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// TypeError</span>
<span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// ReferenceError</span>
<span class="token function-variable function">foo</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> bar <span class="token operator">=</span> <span class="token operator">...</span>self<span class="token operator">...</span> <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="函数优先于变量提升" tabindex="-1"><a class="header-anchor" href="#函数优先于变量提升"><span>函数优先于变量提升</span></a></h3>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 3</span>
<span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> <span class="token number">1</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> <span class="token function-variable function">foo</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> <span class="token number">2</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> <span class="token number">3</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h2>
<ul>
<li>
<p>JavaScript引擎将<code v-pre>var a = 2</code>视为<code v-pre>var a</code>和<code v-pre>a = 2</code>，第一个是编译阶段的任务，而第二个则是执行阶段的任务。</p>
</li>
<li>
<p>无论作用域中的声明出现在什么地方，都将在代码本身被执行前首先进行处理。</p>
<p>可以将这个过程形象地想象成所有的声明(变量和函数)都会被“移动”到各自作用域的最顶端，这个过程被称为提升。</p>
</li>
<li>
<p>声明本身会被提升，而包括函数表达式的赋值在内的赋值操作并不会提升。</p>
</li>
</ul>
</div></template>


