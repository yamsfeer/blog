<template><div><h1 id="词法作用域" tabindex="-1"><a class="header-anchor" href="#词法作用域"><span>词法作用域</span></a></h1>
<h2 id="词法作用域-1" tabindex="-1"><a class="header-anchor" href="#词法作用域-1"><span>词法作用域</span></a></h2>
<p>我们将“作用域”定义为一套规则，这套规则用来管理引擎如何在当前作用域以及嵌套的子作用域中根据标识符名称进行变量查找。</p>
<p>作用域有两种主要的工作模式：</p>
<ul>
<li>
<p><strong>词法作用域</strong></p>
<p>这是最为普遍的，被大多数编程语言所采用。</p>
<p>简单来说，词法作用域就是由写代码时变量写在哪里来决定作用域。</p>
<p>另外，JavaScript也提供了修改作用域的方法，比如<code v-pre>eval</code>、<code v-pre>with</code>。</p>
</li>
<li>
<p><strong>动态作用域</strong>：比如bash脚本、Perl等。</p>
</li>
</ul>
<p>考虑以下代码：</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token parameter">a</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> b <span class="token operator">=</span> a <span class="token operator">*</span> <span class="token number">2</span><span class="token punctuation">;</span>
	<span class="token keyword">function</span> <span class="token function">bar</span><span class="token punctuation">(</span><span class="token parameter">c</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> a<span class="token punctuation">,</span> b<span class="token punctuation">,</span> c <span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	<span class="token function">bar</span><span class="token punctuation">(</span> b <span class="token operator">*</span> <span class="token number">3</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">foo</span><span class="token punctuation">(</span> <span class="token number">2</span> <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 2, 4, 12</span>
</code></pre></div><p>其作用域可表示为下图，由此可见，代码的写法决定了其作用域。</p>
<img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/0081Kckwgy1gmbrhvnk6xj30la0d8abt.jpg" alt="image-20210104165125637" style="zoom:50%;" />
<p><strong>作用域查找会在找到第一个匹配的标识符时停止</strong>。</p>
<p>在多层的嵌套作用域中可以定义同名的标识符，这叫作“遮蔽效应”(内部的标识符“遮蔽”了外部的标识符)。</p>
<p>抛开遮蔽效应， 作用域查找始终从运行时所处的最内部作用域开始，逐级向外或者说向上进行，直到遇见第一个匹配的标识符为止。</p>
<h2 id="用eval和with修改作用域" tabindex="-1"><a class="header-anchor" href="#用eval和with修改作用域"><span>用<code v-pre>eval</code>和<code v-pre>with</code>修改作用域</span></a></h2>
<h3 id="eval" tabindex="-1"><a class="header-anchor" href="#eval"><span>eval</span></a></h3>
<p>考虑以下代码：</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token parameter">str<span class="token punctuation">,</span> a</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">eval</span><span class="token punctuation">(</span> str <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 欺骗!</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> a<span class="token punctuation">,</span> b <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> b <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
<span class="token function">foo</span><span class="token punctuation">(</span> <span class="token string">"var b = 3;"</span><span class="token punctuation">,</span> <span class="token number">1</span> <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 1, 3</span>
</code></pre></div><p><strong>默认情况下，如果 <code v-pre>eval</code> 中所执行的代码包含有一个或多个声明(无论是变量还是函数)，就会对 <code v-pre>eval</code> 所处的词法作用域进行修改。</strong></p>
<p><strong>实际上，在严格模式下，eval函数运行时有自己的词法作用域，这意味着它无法修改eval函数所处的作用域。</strong></p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token parameter">str</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token string">"use strict"</span><span class="token punctuation">;</span>
	<span class="token function">eval</span><span class="token punctuation">(</span> str <span class="token punctuation">)</span><span class="token punctuation">;</span>
	console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> a <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// ReferenceError: a is not defined</span>
<span class="token punctuation">}</span>
<span class="token function">foo</span><span class="token punctuation">(</span> <span class="token string">"var a = 2"</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>与<code v-pre>eval</code>相似的函数：</p>
<ul>
<li>
<p><code v-pre>setTimeout</code> 和 <code v-pre>setInterval</code> 函数的第一个参数可以是字符串，字符串的内容可以被解释为一段动态生成的函数代码。</p>
<p>这些功能已经过时且并不被提倡。不要使用它们!</p>
</li>
<li>
<p><code v-pre>new Function()</code> 函数的行为也很类似，最后一个参数可以接受代码字符串，并将其转化为动态生成的函数。</p>
<p>这个也要尽量避免使用。</p>
</li>
</ul>
<h3 id="with" tabindex="-1"><a class="header-anchor" href="#with"><span>with</span></a></h3>
<p><strong><code v-pre>eval</code> 函数如果接受了含有一个或多个声明的代码，就会修改其所处的词法作用域，</strong></p>
<p><strong>而 <code v-pre>with</code> 声明实际上是根据你传递给它的对象凭空创建了一个全新的词法作用域。</strong></p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
	<span class="token literal-property property">b</span><span class="token operator">:</span> <span class="token number">2</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// 单调乏味的重复 "obj"</span>
obj<span class="token punctuation">.</span>a <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
obj<span class="token punctuation">.</span>b <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>

<span class="token comment">// 简单的快捷方式</span>
<span class="token keyword">with</span> <span class="token punctuation">(</span>obj<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  a <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
  b <span class="token operator">=</span> <span class="token number">4</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p><strong><code v-pre>with</code> 的行为非常令人费解，在严格模式下被禁止。</strong></p>
<h3 id="eval-和-with-对性能的影响" tabindex="-1"><a class="header-anchor" href="#eval-和-with-对性能的影响"><span>eval 和 with 对性能的影响</span></a></h3>
<ul>
<li>
<p><code v-pre>eval</code> 和<code v-pre> with</code> 会在运行时修改或创建新的作用域，以此来欺骗其他在书写时定义的词法作用域。</p>
</li>
<li>
<p><strong><code v-pre>JavaScript</code> 引擎会在编译阶段进行数项的性能优化。</strong></p>
<p>其中有些优化<strong>依赖于能够根据代码的词法进行静态分析，并预先确定所有变量和函数的定义位置</strong>，才能在执行过程中快速找到标识符。</p>
</li>
<li>
<p>如果引擎在代码中发现了 <code v-pre>eval</code> 或 <code v-pre>with</code>，那么作用域会变得无法预测。</p>
<p>最坏情况下，所有的优化都是无意义的，<strong>因此最简单的做法就是不做任何优化</strong>。</p>
</li>
<li>
<p>如果代码中大量使用 <code v-pre>eval</code> 或<code v-pre> with</code>，那么运行起来<strong>一定会变得非常慢</strong>。</p>
</li>
</ul>
<h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h2>
<ul>
<li>
<p>词法作用域意思是作用域是<strong>由代码编写时变量声明的位置决定</strong>。</p>
<p>编译过程的词法阶段基本能知道这些变量的位置，从而在运行时快速找到他们</p>
</li>
<li>
<p><code v-pre>eval</code> 可以<strong>在运行时对作用域进行修改</strong>， <code v-pre>with</code> 可以根据传给它的对象<strong>创建一个新的作用域</strong>。</p>
</li>
<li>
<p><strong>这两个的副作用是引擎无法在编译时对作用域查找进行优化，因为引擎只能谨慎地认为这样的优化是无效的。</strong></p>
<p><strong>使用这其中任何一个机制都将导致代码运行变慢。</strong></p>
</li>
</ul>
</div></template>


