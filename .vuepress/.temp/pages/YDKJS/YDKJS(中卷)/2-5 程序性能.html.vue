<template><div><h1 id="程序性能" tabindex="-1"><a class="header-anchor" href="#程序性能"><span>程序性能</span></a></h1>
<h2 id="web-worker" tabindex="-1"><a class="header-anchor" href="#web-worker"><span>Web Worker</span></a></h2>
<p><code v-pre>web worker</code>是一种<strong>任务并行</strong>，其重点在于把程序划分为多个块来并发运行。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> w <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Worker</span><span class="token punctuation">(</span><span class="token string">'http://xx.com/worker.js'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// worker 和创建它的程序之间是一对一的关系，所以不用担心message事件来自其他wokrer</span>
w<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'message'</span><span class="token punctuation">,</span> <span class="token parameter">event</span> <span class="token operator">=></span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>event<span class="token punctuation">.</span>data<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// worker => 主线程</span>
w<span class="token punctuation">.</span><span class="token function">postMessage</span><span class="token punctuation">(</span><span class="token string">'主线程 => worker'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 终止worker</span>
<span class="token comment">// 突然终止 Worker 线程不会给它任何机会完成它的工作或者清理任何资源，类似于关闭浏览器标签页</span>
w<span class="token punctuation">.</span><span class="token function">terminate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// worker.js</span>
<span class="token function">addEventListener</span><span class="token punctuation">(</span> <span class="token string">"message"</span><span class="token punctuation">,</span> <span class="token parameter">event</span> <span class="token operator">=></span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>event<span class="token punctuation">.</span>data<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 主线程 => worker</span>
<span class="token function">postMessage</span><span class="token punctuation">(</span><span class="token string">'worker => 主线程'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p><code v-pre>web worker</code>是浏览器，即宿主环境的功能，实际上和 JavaScript 语言本身几乎没什 么关系。也就是说，<strong>JavaScript 当前并没有任何支持多线程执行的功能</strong>。</p>
<p>Worker 之间以及它们和主程序之间，<strong>不会共享任何作用域或资源</strong>，那会把所有多线程编程的噩梦带到前端领域，而是通过<strong>一个基本的事件消息机制</strong>相互联系。</p>
<p>如果浏览器中有两个或多个页面(或同一页上的多个 tab )试图从同一个文件 URL 创建 Worker，那么最终得到的实际上是<strong>完全独立的 Worker</strong>。后面我们会简单介绍如何共享 Worker。</p>
<h3 id="worker环境" tabindex="-1"><a class="header-anchor" href="#worker环境"><span>worker环境</span></a></h3>
<p>在 Worker 内部是无法访问主程序的任何资源的。这意味着你不能访问它的任何全局变量，也不能访问页面的 DOM 或者其他资源。</p>
<p><strong>记住，这是一个完全独立的线程。</strong></p>
<p>但是，你可以执行网络操作(Ajax、WebSockets)以及设定定时器，还可以访问几个重要的全局变量和功能的<strong>本地复本</strong>，包括 navigator、location、JSON 和 applicationCache。</p>
<p>也可以通过 importScripts 向 Worker 加载额外的 JavaScript 脚本：</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token comment">// worker.js</span>
<span class="token comment">// 脚本加载是同步的，importScripts 会阻塞余下 Worker 的执行，直到文件加载和执行完成。</span>
<span class="token function">importScripts</span><span class="token punctuation">(</span> <span class="token string">"foo.js"</span><span class="token punctuation">,</span> <span class="token string">"bar.js"</span> <span class="token punctuation">)</span><span class="token punctuation">;</span> 
</code></pre></div><div class="hint-container info">
<p class="hint-container-title">相关信息</p>
<p>已经有一些讨论涉及把 canvas API 暴露给 Worker，以及把 canvas 变为 Transferable，这将使 Worker 可以执行更高级的 off-thread 图形处理，这对于高性能游戏(WebGL)和其他类似的应用是很有用的。尽管目前的浏览器中还不存在这种支持。</p>
</div>
<p>Web Worker 通常应用于哪些方面呢?</p>
<ul>
<li>处理密集型数学计算</li>
<li>大数据集排序</li>
<li>数据处理(压缩、音频分析、图像处理等)</li>
<li>高流量网络通信</li>
</ul>
<h3 id="数据传递" tabindex="-1"><a class="header-anchor" href="#数据传递"><span>数据传递</span></a></h3>
<p>上面提到，worker线程之间是通过事件消息机制来双向通信的。通信时可能需要传递庞大复杂的数据量，在早期的 Worker 中，唯一的选择就是把所有数据序列化到一个字符串值中。这带来了双向序列化的速度损失和双倍的内存占用（及其引起的垃圾收集方面的波动）。</p>
<p>为此，worker提供了两个方案：</p>
<ul>
<li>
<p><a href="https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/The_structured_clone_algorithm" target="_blank" rel="noopener noreferrer">结构化克隆算法<ExternalLinkIcon/></a></p>
<p>如果要传递一个对象，使用结构化克隆算法(structured clone algorithm)把这个对象复制到另一边。这个算法非常高级，甚至可以处理要复制的对象有循环引用的情况。这样就不用付出 to-string 和 from-string 的性能损失了，但是还是要使用双倍的内存。</p>
</li>
<li>
<p>transferable对象</p>
<p>对于大数据集而言，就是使用 Transferable 对象。这时发生的是<strong>对象所有权的转移，数据本身并没有移动</strong>。一旦你把对象传递到一个 Worker 中，在原来的位置上，它就<strong>变为空的或者是不可访问的</strong>，这样就消除了多线程编程作用域共享带来的混乱。 当然，所有权传递是可以双向进行的。</p>
<p>任何实现了 <a href="http://developer.mozilla.org/en-US/docs/Web/API/Transferable" target="_blank" rel="noopener noreferrer">Transferable 接口<ExternalLinkIcon/></a> 的数据结构就自动按照这种方式传输(Firefox 和 Chrome 都支持)。</p>
<p>比如Uint8Array 这样的带类型的数组</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 比如foo是一个Uint8Array</span>
<span class="token comment">// 第一个参数是一个原始缓冲区，第二个是一个要传输的内容的列表。</span>
<span class="token function">postMessage</span><span class="token punctuation">(</span> foo<span class="token punctuation">.</span>buffer<span class="token punctuation">,</span> <span class="token punctuation">[</span> foo<span class="token punctuation">.</span>buffer <span class="token punctuation">]</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div></li>
</ul>
<p>不支持 Transferable 对象的浏览器就<strong>降级到结构化克隆</strong>，这会带来性能下降而不是彻底的功能失效。</p>
<h3 id="共享worker" tabindex="-1"><a class="header-anchor" href="#共享worker"><span>共享worker</span></a></h3>
<p>如果你的站点或 app 允许加载同一个页面的多个 tab(一个常见的功能)，那你可能非常希望通过防止重复专用 Worker 来降低系统的资源使用。比如常见的有限资源就是 socket 网络连接，因为浏览器限制了到同一个主机的同时连接数目。</p>
<p>在这种情况下，创建一个整个站点或 app 的所有页面实例都可以共享的中心 Worker 就非常有用了。</p>
<p>因为共享 Worker 可以与站点的多个程序实例或多个页面连接，所以这个 Worker 需要通过端口来得知消息来自于哪个程序。可以类比网络 socket 的端口。因此，调用程序必须使用 Worker 的 port 对象用于通信。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> w1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SharedWorker</span><span class="token punctuation">(</span> <span class="token string">"http://some.url.1/mycoolworker.js"</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>

w1<span class="token punctuation">.</span>port<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span> <span class="token string">"message"</span><span class="token punctuation">,</span> handleMessages <span class="token punctuation">)</span><span class="token punctuation">;</span>
w1<span class="token punctuation">.</span>port<span class="token punctuation">.</span><span class="token function">postMessage</span><span class="token punctuation">(</span> <span class="token string">"something cool"</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
w1<span class="token punctuation">.</span>port<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>在共享 Worker 内部，必须要处理额外的一个事件：connect。这个事件为这个特定的连接提供了端口对象。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 在共享Worker内部</span>
<span class="token function">addEventListener</span><span class="token punctuation">(</span> <span class="token string">"connect"</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">evt</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
<span class="token comment">// 这个连接分配的端口</span>
  <span class="token keyword">var</span> port <span class="token operator">=</span> evt<span class="token punctuation">.</span>ports<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
  port<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span> <span class="token string">"message"</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">evt</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    port<span class="token punctuation">.</span><span class="token function">postMessage</span><span class="token punctuation">(</span><span class="token string">'..'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// 初始化端口连接</span>
  port<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h3 id="模拟web-worker" tabindex="-1"><a class="header-anchor" href="#模拟web-worker"><span>模拟web worker</span></a></h3>
<p><a href="https://gist.github.com/getify/1b26accb1a09aa53ad25" target="_blank" rel="noopener noreferrer">一个模拟web worker的例子<ExternalLinkIcon/></a></p>
<h2 id="simd" tabindex="-1"><a class="header-anchor" href="#simd"><span>SIMD</span></a></h2>
<p>SIMD，单指令多数据，是一种数据并行(data parallelism)方式，与 Web Worker 的任务并行(task parallelism)相对，因为这里的重点实际上不再是把程序逻辑分成并行的块，而是并行处理数据的多个位。</p>
<p>SIMD JavaScript 计划向 JavaScript 代码暴露短向量类型和 API。在支持 SIMD 的那些系统中，这些运算将会直接映射到等价的 CPU 指令，而在非 SIMD 系统中就会退化回非并行化的运算。</p>
<p>对于数据密集型的应用(信号分析、关于图形的矩阵运算，等等)，这样的并行数学处理 带来的性能收益是非常明显的!</p>
<p>早期提案中的 API 形式类似如下：</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> v1 <span class="token operator">=</span> <span class="token constant">SIMD</span><span class="token punctuation">.</span><span class="token function">float32x4</span><span class="token punctuation">(</span> <span class="token number">3.14159</span><span class="token punctuation">,</span> <span class="token number">21.0</span><span class="token punctuation">,</span> <span class="token number">32.3</span><span class="token punctuation">,</span> <span class="token number">55.55</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> v2 <span class="token operator">=</span> <span class="token constant">SIMD</span><span class="token punctuation">.</span><span class="token function">float32x4</span><span class="token punctuation">(</span> <span class="token number">2.1</span><span class="token punctuation">,</span> <span class="token number">3.2</span><span class="token punctuation">,</span> <span class="token number">4.3</span><span class="token punctuation">,</span> <span class="token number">5.4</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> v3 <span class="token operator">=</span> <span class="token constant">SIMD</span><span class="token punctuation">.</span><span class="token function">int32x4</span><span class="token punctuation">(</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">101</span><span class="token punctuation">,</span> <span class="token number">1001</span><span class="token punctuation">,</span> <span class="token number">10001</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> v4 <span class="token operator">=</span> <span class="token constant">SIMD</span><span class="token punctuation">.</span><span class="token function">int32x4</span><span class="token punctuation">(</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">,</span> <span class="token number">30</span><span class="token punctuation">,</span> <span class="token number">40</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token constant">SIMD</span><span class="token punctuation">.</span>float32x4<span class="token punctuation">.</span><span class="token function">mul</span><span class="token punctuation">(</span> v1<span class="token punctuation">,</span> v2 <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// [ 6.597339, 67.2, 138.89, 299.97 ]</span>
<span class="token constant">SIMD</span><span class="token punctuation">.</span>int32x4<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span> v3<span class="token punctuation">,</span> v4 <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// [ 20, 121, 1031, 10041 ]</span>
</code></pre></div><p><a href="https://www.bookstack.cn/read/es6-3rd/docs-simd.md" target="_blank" rel="noopener noreferrer">一篇SIMD的相关文章<ExternalLinkIcon/></a></p>
<h2 id="asm-js" tabindex="-1"><a class="header-anchor" href="#asm-js"><span>asm.js</span></a></h2>
<p><a href="https://www.ruanyifeng.com/blog/2017/09/asmjs_emscripten.html" target="_blank" rel="noopener noreferrer">asm.js<ExternalLinkIcon/></a></p>
<h2 id="小结" tabindex="-1"><a class="header-anchor" href="#小结"><span>小结</span></a></h2>
<p>本部分的前四章都是基于这样一个前提:异步编码模式使我们能够编写更高效的代码，通常能够带来非常大的改进。但是，异步特性只能让你走这么远，因为它本质上还是绑定在 一个单事件循环线程上。</p>
<p>因此，在这一章里，我们介绍了几种能够进一步提高性能的程序级别的机制。</p>
<p>Web Worker 让你可以在独立的线程运行一个 JavaScript 文件(即程序)，使用异步事件在线程之间传递消息。它们非常适用于把长时间的或资源密集型的任务卸载到不同的线程 中，以提高主 UI 线程的响应性。</p>
<p>SIMD 打算把 CPU 级的并行数学运算映射到 JavaScript API，以获得高性能的数据并行运算，比如在大数据集上的数字处理。</p>
<p>asm.js 描述了 JavaScript 的一个很小的子集，它避免了 JavaScript 难以优化的部分 (比如垃圾收集和强制类型转换)，并且让 JavaScript 引擎识别并通过激进的优化运行这样的代码。</p>
</div></template>


