<template><div><h1 id="事件循环-event-loop" tabindex="-1"><a class="header-anchor" href="#事件循环-event-loop"><span>事件循环 ( Event Loop )</span></a></h1>
<blockquote>
<p>【摘要】</p>
</blockquote>
<p>由于主线程过于繁忙，引发了任务调度的问题。主线程的任务调度就是排队。</p>
<p>为什么无法用多线程处理？因为任务之间不是独立的。</p>
<h2 id="事件循环模型" tabindex="-1"><a class="header-anchor" href="#事件循环模型"><span>事件循环模型</span></a></h2>
<h3 id="异步" tabindex="-1"><a class="header-anchor" href="#异步"><span>异步</span></a></h3>
<p>由于渲染主线程是单线程的，为了避免阻塞，提出了异步的解决办法，即事件循环模型。</p>
<p>单线程是异步产生的原因，事件循环是异步的实现方式</p>
<p>这里可以联想到一个完整的任务调度模型，在现实中可类比为银行排队，如果其中一个人缺少材料，则让这个人到旁边处理完毕，然后重新排队。</p>
<p>银行窗口可以有多个，但渲染主线程这个语境下，相当于只有一个窗口，即单线程。</p>
<h3 id="事件循环队列" tabindex="-1"><a class="header-anchor" href="#事件循环队列"><span>事件循环队列</span></a></h3>
<p>事件循环队列中的任务是由回调函数包装而成的，它是一个任务对象。</p>
<h3 id="例子" tabindex="-1"><a class="header-anchor" href="#例子"><span>例子</span></a></h3>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> h1 <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">'h1'</span><span class="token punctuation">)</span>
<span class="token keyword">var</span> btn <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">'button'</span><span class="token punctuation">)</span>

<span class="token keyword">function</span> <span class="token function">delay</span><span class="token punctuation">(</span><span class="token parameter">duration</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> start <span class="token operator">=</span> Date<span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">while</span> <span class="token punctuation">(</span>Date<span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> start <span class="token operator">&lt;</span> duration<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>

btn<span class="token punctuation">.</span><span class="token function-variable function">onclick</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  h1<span class="token punctuation">.</span>textContent <span class="token operator">=</span> <span class="token string">'袁老师很帅!'</span> <span class="token comment">// 立即生效，将重新渲染任务入队</span>
  <span class="token function">delay</span><span class="token punctuation">(</span><span class="token number">3000</span><span class="token punctuation">)</span> <span class="token comment">// 阻塞重新渲染</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="任务队列的类型及优先级" tabindex="-1"><a class="header-anchor" href="#任务队列的类型及优先级"><span>任务队列的类型及优先级</span></a></h2>
<p>每个任务都有一个任务类型，同一个类型的任务必须在一个队列，不同类型 的任务可以分属于不同的队列。 在一次事件循环中，浏览器可以根据实际情况从不同的队列中取出任务执 行。 浏览器必须准备好一个微队列，微队列中的任务优先所有其他任务执行</p>
<div class="language-text" data-ext="text" data-title="text"><pre v-pre class="language-text"><code>    https://html.spec.whatwg.org/multipage/webappapis.html#p
    erform-a-microtask-checkpoint
</code></pre></div><p>随着浏览器的复杂度急剧提升，W3C 不再使用宏队列的说法。</p>
<ul>
<li>延时队列:用于存放计时器到达后的回调任务，优先级「中」</li>
<li>交互队列:用于存放用户操作后产生的事件处理任务，优先级「高」</li>
<li>微队列:用户存放需要最快执行的任务，优先级「最高」</li>
<li>。。。</li>
</ul>
<p>chrome 认为交互更重要，因此，交互队列的优先级要高于延时队列</p>
<h2 id="微任务队列" tabindex="-1"><a class="header-anchor" href="#微任务队列"><span>微任务队列</span></a></h2>
<p>添加任务到微队列的主要方式主要是使用 Promise、MutationObserver、queueMicroTask</p>
</div></template>


