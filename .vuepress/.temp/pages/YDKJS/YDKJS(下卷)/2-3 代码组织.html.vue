<template><div><h1 id="代码组织" tabindex="-1"><a class="header-anchor" href="#代码组织"><span>代码组织</span></a></h1>
<p>编写 JavaScript 代码是一回事，而合理组织代码则是另一回事。利用通用模式来组织和复用代码显著提高了代码的可读性和可理解性。</p>
<p>记住：<strong>对于代码来说，和其他开发者交流与提供计算机指令同等重要</strong>。</p>
<p>ES6 提供了几个重要的特性，显著改进了以下模式，包括迭代器、生成器、模块和类。</p>
<h2 id="迭代器" tabindex="-1"><a class="header-anchor" href="#迭代器"><span>迭代器</span></a></h2>
<p>迭代器(iterator)是一个结构化的模式，用于从源以一次一个的方式提取数据。这个模式在编程中已经使用相当长的一段时间了。从很久之前开始，JavaScript 开发者就已经在 JavaScript 程序中自发地设计和实现迭代器，所以这不是一个全新的主题。</p>
<h3 id="接口" tabindex="-1"><a class="header-anchor" href="#接口"><span>接口</span></a></h3>
<p>迭代器的接口如下：</p>
<div class="language-text" data-ext="text" data-title="text"><pre v-pre class="language-text"><code>Iterator [required]
  next() {method}: 取得下一个IteratorResult
// 有些迭代器还扩展支持两个可选成员:
Iterator [optional]
	return() {method}: 停止迭代器并返回IteratorResult
	throw() {method}: 报错并返回IteratorResult
// IteratorResult 接口:
IteratorResult
	value {property}: 当前迭代值或者最终返回值(如果undefined为可选的)
	done {property}: 布尔值，指示完成状态
</code></pre></div><p>还有一个 Iterable 接口，用来表述必需能够提供生成器的对象：</p>
<div class="language-text" data-ext="text" data-title="text"><pre v-pre class="language-text"><code>Iterable
  @@iterator() {method}: 产生一个 Iterator
</code></pre></div><p><code v-pre>@@iterator</code> 是一个特殊的内置符号，表示可以为这个对象产生迭代器的方法，就是<code v-pre>[Symbol.iterator]</code> 方法。</p>
<h3 id="next" tabindex="-1"><a class="header-anchor" href="#next"><span>next()</span></a></h3>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> greeting <span class="token operator">=</span> <span class="token string">"hello world"</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> it <span class="token operator">=</span> greeting<span class="token punctuation">[</span>Symbol<span class="token punctuation">.</span>iterator<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
it<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// { value: "h", done: false }</span>
it<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// { value: "e", done: false }</span>
<span class="token comment">// ...</span>
it<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// { value: undefined, done: true }</span>
</code></pre></div><p>严格来说，基本值本身不是 iterable，但是感谢“封箱”技术，&quot;hello world&quot; 被<strong>强制转换 / 变换为 String 对象封装形式</strong>，而这是一个 iterable。</p>
<p>迭代器的 next() 方法可以接受一个或多个可选参数。绝大多数内置迭代器没有利用这个功能，生成器的迭代器可以通过这些参数向生成器传递数据（参考中卷的生成器部分）。</p>
<h3 id="可选的-return-和-throw" tabindex="-1"><a class="header-anchor" href="#可选的-return-和-throw"><span>可选的 return() 和 throw()</span></a></h3>
<p>多数内置迭代器都没有实现这两个接口。然而，在生成器的上下文中它们肯定是有意义的。</p>
<p>return 被定义为向迭代器发送一个信号，表明消费者代码已经完毕，不会再从其中提取任何值。这个信号可以用于通知生产者执行可能需要的清理工作，比如释放 / 关闭网络、数据库或者文件句柄资源。</p>
<p>如果迭代器存在 return，并且出现了任何可以自动被解释为异常或者对迭代器消耗的提前终止的条件，就会自动调用 return。你也可以手动调用 return。</p>
<p>return 就像 next 一样会返回一个 IteratorResult 对象。一般来说，发送给 return 的可选值将会在这个 IteratorResult 中作为 value 返回，但在一些微妙的情况下并非如此。</p>
<p>throw 用于向迭代器报告一个异常 / 错误，和对于 return 的反应不一样，它并不一定意味着迭代器的完全停止。</p>
<p>例如，通过生成器迭代器，throw 实际上向生成器的停滞执行上下文中插入了一个抛出的异常，这个异常可以用 try..catch 捕获。未捕获的 throw 异常最终会异常终止生成器迭代器。</p>
<div class="hint-container tip">
<p class="hint-container-title">提示</p>
<p>通用的惯例是，迭代器不应该在调用 return 或者 throw 之后再产生任何值。</p>
</div>
<h3 id="迭代器的使用" tabindex="-1"><a class="header-anchor" href="#迭代器的使用"><span>迭代器的使用</span></a></h3>
<p>下面介绍三种迭代器的使用方法：调用next方法、for-of循环、<code v-pre>...</code> 运算。</p>
<ul>
<li>
<p>调用next方法</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> str <span class="token operator">=</span> <span class="token string">'hello'</span>
<span class="token keyword">var</span> it <span class="token operator">=</span> str<span class="token punctuation">[</span>Symbol<span class="token punctuation">.</span>iterator<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
it<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// ...</span>
</code></pre></div></li>
<li>
<p>for-of循环</p>
<p>ES6 的 for-of 循环直接消耗一个符合规范的 iterable。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token punctuation">[</span>Symbol<span class="token punctuation">.</span>iterator<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> n <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span> <span class="token comment">// 返回一个迭代器</span>
      <span class="token comment">// 使迭代器成为iterable，使得可以对迭代器进行for-of循环</span>
      <span class="token punctuation">[</span>Symbol<span class="token punctuation">.</span>iterator<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> n <span class="token operator">></span> <span class="token number">3</span>
          <span class="token operator">?</span> <span class="token punctuation">{</span> <span class="token literal-property property">done</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span>
          <span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">value</span><span class="token operator">:</span> n<span class="token operator">++</span><span class="token punctuation">,</span> <span class="token literal-property property">done</span><span class="token operator">:</span> <span class="token boolean">false</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> v <span class="token keyword">of</span> obj<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>v<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 1 2 3</span>
<span class="token punctuation">}</span>

<span class="token comment">// 以下代码等价于用for-of循环迭代一个iterable</span>
<span class="token keyword">var</span> it <span class="token operator">=</span> obj<span class="token punctuation">[</span>Symbol<span class="token punctuation">.</span>iterator<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> v<span class="token punctuation">,</span> res<span class="token punctuation">;</span> <span class="token punctuation">(</span>res <span class="token operator">=</span> it<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>res<span class="token punctuation">.</span>done<span class="token punctuation">;</span> <span class="token punctuation">)</span> <span class="token punctuation">{</span>
  v <span class="token operator">=</span> res<span class="token punctuation">.</span>value<span class="token punctuation">;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> v <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre></div></li>
<li>
<p><code v-pre>...</code> 运算</p>
<p>当使用 <code v-pre>...</code> 进行 spread 操作一个对象时，会调用该对象的 <code v-pre>[Symbol.iterator]</code> 方法，并将其迭代完成。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token operator">...</span>arr<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 1 2 3</span>
</code></pre></div><p>数组解构也可以消耗迭代器：</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> it <span class="token operator">=</span> a<span class="token punctuation">[</span>Symbol<span class="token punctuation">.</span>iterator<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> <span class="token punctuation">[</span>x<span class="token punctuation">,</span>y<span class="token punctuation">]</span> <span class="token operator">=</span> it<span class="token punctuation">;</span> <span class="token comment">// 从it中获取前两个元素</span>
x<span class="token punctuation">;</span> <span class="token comment">// 1</span>
y<span class="token punctuation">;</span> <span class="token comment">// 2</span>

<span class="token keyword">var</span> <span class="token punctuation">[</span>z<span class="token punctuation">,</span> <span class="token operator">...</span>w<span class="token punctuation">]</span> <span class="token operator">=</span> it<span class="token punctuation">;</span> <span class="token comment">// 获取第三个元素，然后一次取得其余所有元素</span>
z<span class="token punctuation">;</span> <span class="token comment">// 3</span>
w<span class="token punctuation">;</span> <span class="token comment">// [4,5]</span>

it<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// { value: undefined, done: true }</span>
</code></pre></div></li>
</ul>
<h3 id="自定义迭代器" tabindex="-1"><a class="header-anchor" href="#自定义迭代器"><span>自定义迭代器</span></a></h3>
<p>为一个对象实现 <code v-pre>[Symbol.iterator]</code> 方法，且该方法中返回了标准的Iterator迭代器，则这个对象可以被for-of 循环、spread操作符迭代循环。这里举一个为数字自定义一个迭代器的例子：</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token class-name">Number</span><span class="token punctuation">.</span>prototype<span class="token punctuation">[</span>Symbol<span class="token punctuation">.</span>iterator<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span> <span class="token comment">// 将[Symbol.iterator]方法挂上Number.prototype</span>
    <span class="token class-name">Number</span><span class="token punctuation">.</span>prototype<span class="token punctuation">,</span>
    Symbol<span class="token punctuation">.</span>iterator<span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token literal-property property">writable</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
      <span class="token literal-property property">configurable</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
      <span class="token literal-property property">enumerable</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token comment">// 不可枚举</span>
      <span class="token function-variable function">value</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token function">iterator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">var</span> i<span class="token punctuation">,</span> inc<span class="token punctuation">,</span> done <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">,</span> top <span class="token operator">=</span> <span class="token operator">+</span><span class="token keyword">this</span><span class="token punctuation">;</span>
        inc <span class="token operator">=</span> <span class="token number">1</span> <span class="token operator">*</span> <span class="token punctuation">(</span>top <span class="token operator">&lt;</span> <span class="token number">0</span> <span class="token operator">?</span> <span class="token operator">-</span><span class="token number">1</span> <span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 正向还是反向迭代?</span>
        <span class="token keyword">return</span> <span class="token punctuation">{</span>
          <span class="token punctuation">[</span>Symbol<span class="token punctuation">.</span>iterator<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// 使得迭代器本身成为iterable!</span>
          <span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>done<span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token punctuation">{</span> <span class="token literal-property property">done</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>

            <span class="token keyword">if</span> <span class="token punctuation">(</span>i <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">{</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token punctuation">}</span> <span class="token comment">// 初始迭代总是0</span>
            <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>top <span class="token operator">>=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> i <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">min</span><span class="token punctuation">(</span>top<span class="token punctuation">,</span> i <span class="token operator">+</span> inc<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token punctuation">}</span> <span class="token comment">// 正向迭代</span>
            <span class="token keyword">else</span> <span class="token punctuation">{</span> i <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span>top<span class="token punctuation">,</span> i <span class="token operator">+</span> inc<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>

            <span class="token keyword">if</span> <span class="token punctuation">(</span>i <span class="token operator">==</span> top<span class="token punctuation">)</span> done <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span> <span class="token comment">// 本次迭代后结束?</span>
            <span class="token keyword">return</span> <span class="token punctuation">{</span> <span class="token literal-property property">value</span><span class="token operator">:</span> i<span class="token punctuation">,</span> <span class="token literal-property property">done</span><span class="token operator">:</span> <span class="token boolean">false</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token keyword">of</span> <span class="token number">3</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> i <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token comment">// 0 1 2 3</span>
<span class="token punctuation">[</span><span class="token operator">...</span><span class="token operator">-</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// [0,-1,-2,-3]</span>
</code></pre></div><h2 id="生成器" tabindex="-1"><a class="header-anchor" href="#生成器"><span>生成器</span></a></h2>
<h2 id="模块" tabindex="-1"><a class="header-anchor" href="#模块"><span>模块</span></a></h2>
<h2 id="类" tabindex="-1"><a class="header-anchor" href="#类"><span>类</span></a></h2>
</div></template>


