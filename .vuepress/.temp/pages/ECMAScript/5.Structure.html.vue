<template><div><h1 id="structure" tabindex="-1"><a class="header-anchor" href="#structure"><span>Structure</span></a></h1>
<p>JavaScript 运行时的执行粒度：</p>
<ul>
<li>宏任务 MacroTask ( Job )</li>
<li>微任务 MicroTask</li>
<li>函数</li>
<li>语句</li>
<li>表达式</li>
<li>直接量、变量</li>
</ul>
<h2 id="宏任务微任务" tabindex="-1"><a class="header-anchor" href="#宏任务微任务"><span>宏任务微任务</span></a></h2>
<p>宏任务就是传给 JavaScript 引擎的任务，它是 JavaScript 中执行的粒度最大的任务，微任务就是在 JavaScript 引擎内部的任务。</p>
<p>宏任务通常从 JavaScript 引擎外部传入，比如事件循环队列，微任务则由 Promise 创建。</p>
<p>来看一段代码：</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">1</span>
<span class="token keyword">var</span> b <span class="token operator">=</span> Promise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> a <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">)</span>
<span class="token keyword">var</span> c <span class="token operator">=</span> <span class="token number">3</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">,</span> c<span class="token punctuation">)</span> <span class="token comment">// 1 3 2</span>
</code></pre></div><p>上面这块代码是一个宏任务，promise 创建的 <code v-pre>() =&gt; a = 2</code> 是一个微任务。</p>
<h2 id="函数调用" tabindex="-1"><a class="header-anchor" href="#函数调用"><span>函数调用</span></a></h2>
<p>函数调用的关键设施是执行上下文 ( Execution Context )，它是函数执行的上下文环境。</p>
</div></template>


