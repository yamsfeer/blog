<template><div><h1 id="异步-现在与将来" tabindex="-1"><a class="header-anchor" href="#异步-现在与将来"><span>异步：现在与将来</span></a></h1>
<p>在等待用户输入、从数据库或文件系统中请求数据、通过网络发送数据并等待响应，或者是在以固定时间间隔执行重复任务(比如动画)。</p>
<p>在诸如此类的场景中，程序都需要管理这段时间间隙的状态。</p>
<p><strong>程序中现在运行的部分和将来运行的部分之间的关系就是异步编程的核心。</strong></p>
<h2 id="分块的程序" tabindex="-1"><a class="header-anchor" href="#分块的程序"><span>分块的程序</span></a></h2>
<p>若将一个程序分为若干个块，那么这些块中只有一个是<em>现在执行</em>，其余将会在<em>未来执行</em>。最常见的块是<strong>函数</strong>。</p>
<p>任何时候，只要把一段代码包装成一个函数，并指定它在响应某个事件(定时器、鼠标点 击、Ajax 响应等)时执行，你就是在代码中创建了一个将来执行的块，也由此在这个程序中引入了异步机制。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token number">21</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> answer <span class="token operator">=</span> <span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">setTimeout</span><span class="token punctuation">(</span> later<span class="token punctuation">,</span> <span class="token number">1000</span> <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 42</span>

<span class="token comment">// 将来执行</span>
<span class="token keyword">function</span> <span class="token function">later</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  answer <span class="token operator">=</span> answer <span class="token operator">*</span> <span class="token number">2</span><span class="token punctuation">;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>answer <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="异步的-console" tabindex="-1"><a class="header-anchor" href="#异步的-console"><span>异步的 <code v-pre>console.*</code></span></a></h3>
<p><code v-pre>console.*</code> 方法族不属于JavaScript规范的内容，它是由**“宿主环境”**提供的（参考“类型和语法”部分）。</p>
<p>因此，不同的浏览器和 JavaScript 环境可以按照自己的意愿来实现，有时候这会引起混淆。因为在许多程序(不只是 JavaScript)中，I/O 是非常低速的阻塞部分。所以，(从页面 /UI 的角度来说)浏览器在后台异步处理控制台 I/O 能够提高性能，这时用户甚至可能根本意识不到其发生。</p>
<p>考虑以下代码：</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">index</span><span class="token operator">:</span> <span class="token number">1</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> a<span class="token punctuation">.</span>index <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 可能是1，也可能是2</span>
a<span class="token punctuation">.</span>index<span class="token operator">++</span><span class="token punctuation">;</span>
</code></pre></div><p>上述代码中，浏览器可能会认为需要把控制台 I/O 延迟到后台，等到浏览器控制台输出内容时，<code v-pre>a.index++</code> 可能已经执行。</p>
<p>因此，最好的选择是在 JavaScript 调试器中使用断点， 而不要依赖控制台输出。次优的方案是把对象序列化到一个字符串中，以强制执行一次“快照”，比如通过 <code v-pre>JSON.stringify()</code>。</p>
<h2 id="事件循环" tabindex="-1"><a class="header-anchor" href="#事件循环"><span>事件循环</span></a></h2>
<p>*JavaScript“宿主环境”*都提供了一种机制来处理程序中多个块的执行，且执行每块时调用 JavaScript 引擎，这种机制被称为<strong>事件循环</strong>。</p>
<p>换句话说，JavaScript 引擎本身并没有时间的概念，只是一个按需执行 JavaScript 任意代码片段的环境。“事件”调度总是由包含它的环境进行。</p>
<p>用一段伪代码表示时间循环：</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 时间循环是一个队列</span>
<span class="token keyword">var</span> eventLoop <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
<span class="token keyword">var</span> event

<span class="token keyword">while</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 一次tick</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>eventLoop<span class="token punctuation">.</span>length <span class="token operator">></span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 拿到队列中的下一个事件</span>
    <span class="token comment">// 对每个 tick 而言，如果在队列中有等待事件，那么就会从队列中摘下一个事件并执行。</span>
    event <span class="token operator">=</span> eventLoop<span class="token punctuation">.</span><span class="token function">shift</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
      <span class="token function">event</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">reportErr</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>考虑以下情形：JavaScript程序发起一个ajax请求，从服务器获取数据并处理。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 这里的callback函数会在服务器返回后，入队eventLoop</span>
<span class="token function">ajax</span><span class="token punctuation">(</span>url<span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token function">callback</span> <span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">handle</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>同理，<code v-pre>setTimeout(callback, 0)</code>会设定一个定时器，定时器到时后，将回调函数放在事件循环中，这样在未来某个时刻的 tick 会摘下并执行这个回调。</p>
<p>因此，<code v-pre>setTimeout</code>并不准时，因为时间循环中可能有其他非常耗时的任务，它只是在经过给定的时间后，将任务进入队列等待执行。</p>
<p>总的来说，程序通常分成了很多小块，在事件循环队列中一个接一个地执行。严格地说，和你的程序不直接相关的其他事件也可能会插入到队列中。</p>
<h2 id="异步与并行" tabindex="-1"><a class="header-anchor" href="#异步与并行"><span>异步与并行</span></a></h2>
<p>异步是关于现在和将来的时间间隙，而并行是关于能够<strong>同时发生</strong>的事情。</p>
<p>**并行计算最常见的工具就是<em>进程</em> 和<em>线程</em>。**其中，多个线程能够共享单个进程的内存。</p>
<p>与之相对的是，事件循环把自身的工作分成一个个任务并顺序执行，不允许对共享内存的并行访问和修改。</p>
<p>**JavaScript引擎是单线程的。**也就是说，在每一个时刻，都只有一段代码在执行。</p>
<h3 id="完整运行-特性" tabindex="-1"><a class="header-anchor" href="#完整运行-特性"><span>“完整运行”特性</span></a></h3>
<p>考虑以下代码：</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> b <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 对a，b进行访问修改</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
 <span class="token comment">// 对a，b进行访问修改</span>
<span class="token punctuation">}</span>
<span class="token function">ajax</span><span class="token punctuation">(</span> <span class="token string">"http://some.url.1"</span><span class="token punctuation">,</span> foo <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">ajax</span><span class="token punctuation">(</span> <span class="token string">"http://some.url.2"</span><span class="token punctuation">,</span> bar <span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>由于 JavaScript 的单线程特性，foo、bar中的代码具有原子性。也就是说，一旦 foo 开始运行，它的所有代码都会在 bar 中的任意代码运行之前完成，或者相反。 这称为完整运行(run-to-completion)特性。</p>
<p>上述代码仍存在不确定性，因为不知道哪个请求会先返回结果，因此foo和bar的执行顺序不能确定。</p>
<p>在 JavaScript 的特性中，这种函数顺序的不确定性就是通常所说的竞态条件(race condition)，foo() 和 bar() 相互竞争，看谁先运行。具体来说，因为无法可靠预测 a 和 b 的最终结果，所以才是竞态条件。</p>
<h2 id="并发任务间的关系" tabindex="-1"><a class="header-anchor" href="#并发任务间的关系"><span>并发任务间的关系</span></a></h2>
<p>设想有一个下拉更新新闻列表的功能需求，包含两个任务，</p>
<ul>
<li>在用户向下滚动页面触发 onscroll 事件时响应这些事件(发起 Ajax 请求要求新的内容)</li>
<li>接收 Ajax 响应(把内容展示到页面)。</li>
</ul>
<p>当用户滚动页面足够快，会出现onscroll事件和多个响应可能会交替出现，加上JavaScript单线程的特性，可能会处理响应顺序异常。</p>
<p>由此引出并发任务间的关系：</p>
<ul>
<li>
<p>非交互</p>
<p>如果进程间没有相互影响的话，不确定性是完全可以接受的。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> res <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token parameter">results</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  res<span class="token punctuation">.</span>foo <span class="token operator">=</span> results<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">bar</span><span class="token punctuation">(</span><span class="token parameter">results</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  res<span class="token punctuation">.</span>bar <span class="token operator">=</span> results<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// 两个任务执行顺序不确定，但是都会被执行且互不影响</span>
<span class="token function">ajax</span><span class="token punctuation">(</span> <span class="token string">"http://some.url.1"</span><span class="token punctuation">,</span> foo <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">ajax</span><span class="token punctuation">(</span> <span class="token string">"http://some.url.2"</span><span class="token punctuation">,</span> bar <span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div></li>
<li>
<p>交互</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> a<span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token parameter">x</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  a <span class="token operator">=</span> x <span class="token operator">*</span> <span class="token number">2</span><span class="token punctuation">;</span>
  <span class="token function">baz</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">bar</span><span class="token punctuation">(</span><span class="token parameter">x</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  a <span class="token operator">=</span> x <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">;</span>
  <span class="token function">baz</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">baz</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> a <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// 不管哪一个后被触发，都不仅会覆盖另外一个给 a 赋的值，也会重复调用 baz()(很可能并不是想要的结果)</span>
<span class="token function">ajax</span><span class="token punctuation">(</span> <span class="token string">"http://some.url.1"</span><span class="token punctuation">,</span> foo <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">ajax</span><span class="token punctuation">(</span> <span class="token string">"http://some.url.2"</span><span class="token punctuation">,</span> bar <span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div></li>
<li>
<p>协作（分割任务）</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> res <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token comment">// response(..)从Ajax调用中取得结果数组</span>
<span class="token keyword">function</span> <span class="token function">response</span><span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 一次处理1000个</span>
  <span class="token keyword">var</span> chunk <span class="token operator">=</span> data<span class="token punctuation">.</span><span class="token function">splice</span><span class="token punctuation">(</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1000</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
  res <span class="token operator">=</span> res<span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span>chunk<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span> <span class="token parameter">val</span> <span class="token operator">=></span> val <span class="token operator">*</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">if</span> <span class="token punctuation">(</span>data<span class="token punctuation">.</span>length <span class="token operator">></span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 异步调度下一次批处理</span>
   	<span class="token function">setTimeout</span><span class="token punctuation">(</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token function">response</span><span class="token punctuation">(</span> data <span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">0</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token function">ajax</span><span class="token punctuation">(</span> <span class="token string">"http://some.url.1"</span><span class="token punctuation">,</span> response <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">ajax</span><span class="token punctuation">(</span> <span class="token string">"http://some.url.2"</span><span class="token punctuation">,</span> response <span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div></li>
</ul>
<h2 id="时间循环与promise" tabindex="-1"><a class="header-anchor" href="#时间循环与promise"><span>时间循环与Promise</span></a></h2>
<p>任务队列是<strong>挂在事件循环队列的每个 tick 之后 的一个队列</strong>。</p>
<p>在事件循环的每个 tick 中，可能出现的异步动作不会导致一个完整的新事件添加到事件循环队列中，而会在当前 tick 的任务队列末尾添加一个项目(一个任务)。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> <span class="token string">"A"</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">setTimeout</span><span class="token punctuation">(</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> <span class="token string">"B"</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">0</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 理论上的"任务API"</span>
<span class="token function">schedule</span><span class="token punctuation">(</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> <span class="token string">"C"</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">schedule</span><span class="token punctuation">(</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> <span class="token string">"D"</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 实际打印的结果是 A C D B</span>
</code></pre></div><p>Promise 的异步特性是<strong>基于任务</strong>的，所以一定要清楚它和事件循环特性的关系。</p>
<h2 id="小结" tabindex="-1"><a class="header-anchor" href="#小结"><span>小结</span></a></h2>
<p>JavaScript 程序总是至少分为两个块：第一块现在运行;下一块将来运行，以响应某个事件。</p>
<p>JavaScript中处理异步事件的机制是<strong>事件循环</strong>。一旦有事件需要运行，事件循环就会运行，直到队列清空。事件循环的每一轮称为一个 tick。</p>
<p><strong>注意理解以下几个词</strong></p>
<ul>
<li>
<p>异步：<strong>异步的意义在于时间上的异步</strong>，一部分现在运行，一部分将来运行。通常见于一些等待的情况，比如用户交互、IO 和定时器。</p>
</li>
<li>
<p>并行：并行和异步是完全不同的，<strong>并行是关于能够同时发生的事情</strong>。并行计算最常见的工具就是进程和线程。</p>
</li>
<li>
<p>并发</p>
<p>并发关注任务的数量，平时说的“高并发”是指能“同时”处理大量任务，比如高并发服务器能接收大量的网络请求。</p>
<p>但是注意“同时”的意思，他可以是”同一时刻“，比如每个请求创建一个线程来处理（虽然这样不会很高效）；也可以是”几乎同时“，比如单线程的Nodejs服务器，只要足够快，也可认为是高并发。因此<strong>单线程事件循环是并发的一种形式。</strong></p>
<p>针对并发的任务来说，每个任务之间的关系又有“非交互”、“交互”、“协作”三种。</p>
</li>
<li>
<p>任务：Promise 的异步特性是<strong>基于任务</strong>的，相当于每个事件循环的tick中可以包含多个小任务。</p>
</li>
</ul>
</div></template>


