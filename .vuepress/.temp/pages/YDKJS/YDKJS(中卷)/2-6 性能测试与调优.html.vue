<template><div><h1 id="性能测试与调优" tabindex="-1"><a class="header-anchor" href="#性能测试与调优"><span>性能测试与调优</span></a></h1>
<p>本部分的前四章都是关于异步与并发编码模式的性能，第 5 章是关于宏观程序架构级的性能。</p>
<p>这一章要讨论的主题则是微观性能，关注点在<strong>单个表达式和语句</strong>。</p>
<p>需要说明的是，本章的目的不是为了满足对微观性能调优的沉迷，比如某个 JavaScript 引擎上运行 ++a 是不是会比 a++ 快。更重要的目标是弄清楚<strong>哪些种类的 JavaScript 性能更重要，哪些种类则无关紧要，以及如何区分</strong>。</p>
<h2 id="如何进行性能测试" tabindex="-1"><a class="header-anchor" href="#如何进行性能测试"><span>如何进行性能测试</span></a></h2>
<p>错误的性能测试范例：</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> start <span class="token operator">=</span> Date<span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment">// 进行一些操作</span>
<span class="token keyword">var</span> end <span class="token operator">=</span> Date<span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> <span class="token string">"Duration:"</span><span class="token punctuation">,</span> end <span class="token operator">-</span> start <span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>上面这段性能测试带来的结果有很大的不确定性，比如：</p>
<ul>
<li>
<p>有些平台的精度不够</p>
</li>
<li>
<p>引擎或系统有没有受到什么影响，其他时候会不会运行得更快？</p>
</li>
<li>
<p>获得 start 或 end 时间戳之间也可能有其他一些延误</p>
</li>
<li>
<p>运算测试的环境是否过度优化？</p>
</li>
</ul>
<p>你可能会用重复多次执行，然后总时间除以次数的方法来测试。</p>
<p>然而，简单的数学平均值绝对不足以对你要外推到整个应用范围的性能作出判断。迭代 100 次， 即使只有几个(过高或过低的)的异常值也可以影响整个平均值，然后在重复应用这个结论的时候，你还会扩散这个误差，产生更大的欺骗性。</p>
<h3 id="benchmark-js" tabindex="-1"><a class="header-anchor" href="#benchmark-js"><span>Benchmark.js</span></a></h3>
<p>任何有意义且可靠的性能测试都应该基于统计学上合理的实践。比如标准差、方差、误差幅度。</p>
<p><a href="http://benchmarkjs.com/" target="_blank" rel="noopener noreferrer">Benchmark.js<ExternalLinkIcon/></a>就是一个这样的工具。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 要测试的运算</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> bench <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Benchmark</span><span class="token punctuation">(</span>
  <span class="token string">'test'</span><span class="token punctuation">,</span> <span class="token comment">// 测试名称</span>
  foo<span class="token punctuation">,</span> <span class="token comment">// 要测试的函数(也即内容)</span>
	<span class="token punctuation">{</span> <span class="token comment">/* .. */</span> <span class="token punctuation">}</span> <span class="token comment">// 可选的额外选项(参见文档)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
bench<span class="token punctuation">.</span>hz<span class="token punctuation">;</span> <span class="token comment">// 每秒运算数</span>
bench<span class="token punctuation">.</span>stats<span class="token punctuation">.</span>moe<span class="token punctuation">;</span> <span class="token comment">// 出错边界</span>
bench<span class="token punctuation">.</span>stats<span class="token punctuation">.</span>variance<span class="token punctuation">;</span> <span class="token comment">// 样本方差</span>
<span class="token comment">// ..</span>
</code></pre></div><h2 id="大局" tabindex="-1"><a class="header-anchor" href="#大局"><span>大局</span></a></h2>
<p><strong>过早优化是万恶之源。</strong></p>
<blockquote>
<p>程序员们浪费了大量的时间用于思考，或担心他们程序中非关键部分的速度，这些针对效率的努力在调试和维护方面带来了强烈的负面效果。我们应该在，比如说 97% 的时间里，忘掉小处的效率，过早优化是万恶之源。但我们不应该错过关键的 3% 中的机会。</p>
</blockquote>
<p>花费在优化关键路径上的时间不是浪费，不管节省的时间多么少；而花在非关键路径优化上的时间都不值得，不管节省的时间多么多。</p>
<p>如果你的代码在关键路径上，比如是一段将要反复运行多次的“热”代码，或者在用户会注意到的 UX 关键位置上，如动画循环或 CSS 风格更新，那你应该采用有意义的、可测量的有效优化。</p>
<p>考虑一下：一个关键路径动画循环需要把一个字符串类型转换到数字，那种写法更快？</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> x <span class="token operator">=</span> <span class="token string">"42"</span><span class="token punctuation">;</span> <span class="token comment">// 需要数字42</span>
<span class="token keyword">var</span> y <span class="token operator">=</span> x <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">;</span> <span class="token comment">// 让隐式类型转换自动发生</span>
<span class="token keyword">var</span> y <span class="token operator">=</span> <span class="token function">parseInt</span><span class="token punctuation">(</span> x<span class="token punctuation">,</span> <span class="token number">0</span> <span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">;</span> <span class="token comment">// parseInt</span>
<span class="token keyword">var</span> y <span class="token operator">=</span> <span class="token function">Number</span><span class="token punctuation">(</span> x <span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">;</span> <span class="token comment">// Number</span>
<span class="token keyword">var</span> y <span class="token operator">=</span> <span class="token operator">+</span>x <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">;</span> <span class="token comment">// 一元运算符 +</span>
<span class="token keyword">var</span> y <span class="token operator">=</span> <span class="token punctuation">(</span>x <span class="token operator">|</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">;</span> <span class="token comment">// 一元运算符 |</span>
</code></pre></div><p>请记住，沉迷于 <code v-pre>+x</code> 与 <code v-pre>x | 0</code> 的对比在绝大多数情况下都是浪费时间。这是一个微观性能问题，不应该让其影响程序可读性。</p>
<p>尽管程序关键路径上的性能非常重要，但这并不是唯一要考虑的因素。在性能方面大体相似的几个选择中，<strong>可读性</strong>应该是另外一个重要的考量因素。</p>
<h2 id="尾调用优化" tabindex="-1"><a class="header-anchor" href="#尾调用优化"><span>尾调用优化</span></a></h2>
<p>ES6 包含了一个性能领域的特殊要求。这与一个涉及函数调用的特定优化形式相关：尾调用优化(Tail Call Optimization，TCO)。</p>
<p>简单地说，尾调用就是一个出现在另一个函数“结尾”处的函数调用。这个调用结束后就没有其余事情要做了(除了可能要返回结果值)。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token parameter">x</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> x<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">bar</span><span class="token punctuation">(</span><span class="token parameter">y</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token function">foo</span><span class="token punctuation">(</span> y <span class="token operator">+</span> <span class="token number">1</span> <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 尾调用</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">baz</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token number">1</span> <span class="token operator">+</span> <span class="token function">bar</span><span class="token punctuation">(</span> <span class="token number">40</span> <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 非尾调用</span>
<span class="token punctuation">}</span>
</code></pre></div><p>调用一个新的函数需要额外的一块预留内存来管理调用栈，称为栈帧。所以前面的代码一般会同时为 baz、bar 和 foo 保留一个栈帧。</p>
<p>然而，如果支持 TCO 的引擎能够意识到 foo(y+1) 调用位于尾部，这意味着 bar 基本上已经完成了，那么在调用 foo 时，它就不需要创建一个新的栈帧，而是可以重用已有的 bar 的栈帧。这样不仅<strong>速度更快，也更节省内存</strong>。</p>
<p>尾调用在递归中有很大帮助。</p>
<p>递归是 JavaScript 中一个纷繁复杂的主题。因为如果没有 TCO 的话，引擎需要实现一个随意(还彼此不同!)的限制来界定递归栈的深度，达到了就得停止，以防止内存耗尽。<strong>有了 TCO，尾调用的递归函数本质上就可以任意运行，因为再也不需要使用额外的内存!</strong></p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token comment">// TCO友好的斐波那契数列求和</span>
<span class="token keyword">function</span> <span class="token function">factorial</span><span class="token punctuation">(</span><span class="token parameter">n</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">function</span> <span class="token function">fact</span><span class="token punctuation">(</span><span class="token parameter">n<span class="token punctuation">,</span>res</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>n <span class="token operator">&lt;</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token keyword">return</span> res<span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token function">fact</span><span class="token punctuation">(</span> n <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">,</span> n <span class="token operator">*</span> res <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 尾调用</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> <span class="token function">fact</span><span class="token punctuation">(</span> n<span class="token punctuation">,</span> <span class="token number">1</span> <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 尾调用</span>
<span class="token punctuation">}</span>
<span class="token function">factorial</span><span class="token punctuation">(</span> <span class="token number">5</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><div class="hint-container warning">
<p class="hint-container-title">注意</p>
<p>TCO 只用于有实际的尾调用的情况。如果你写了一个没有尾调用的递归函数，那么性能还是会回到普通栈帧分配的情形，引 擎对这样的递归调用栈的限制也仍然有效。很多递归函数都可以改写，就像刚刚展示的 factorial 那样，但是需要认真注意细节。</p>
</div>
<h2 id="小结" tabindex="-1"><a class="header-anchor" href="#小结"><span>小结</span></a></h2>
<ul>
<li>建议使用Benchmark.js进行性能测试，得到可靠结果。</li>
<li>从尽可能多的环境中得到尽可能多的测试结果以消除硬件 / 设备的偏差，这一点很重要。 jsPerf.com 是很好的网站，用于众包性能测试运行。</li>
<li><strong>过早优化是万恶之源</strong>。</li>
<li>尾调用优化是 ES6 要求的一种优化方法。TCO 允许一个函数在结尾处调用另外一个函数来执行，不需要任何额外资源。这意味着，对递归算法来说，引擎不再需要限制栈深度。</li>
</ul>
</div></template>


