<template><div><h1 id="js长任务" tabindex="-1"><a class="header-anchor" href="#js长任务"><span>JS长任务</span></a></h1>
<h2 id="什么是任务" tabindex="-1"><a class="header-anchor" href="#什么是任务"><span>什么是任务</span></a></h2>
<p>任务 ( task ) 是浏览器执行的任何独立工作，包括渲染、解析 HTML 和 CSS、运行 JavaScript，以及其他浏览器内部的工作。JavaScript 是产生这些任务的主要来源。</p>
<p>除了 Web Worker 和类似的 API，所有任务都在主线程上进行。</p>
<h2 id="什么是主线程" tabindex="-1"><a class="header-anchor" href="#什么是主线程"><span>什么是主线程</span></a></h2>
<p>主线程是浏览器运行大部分任务的地方，几乎所有 JavaScript 都是在主线程中执行的。</p>
<p>主线程一次只能处理一个任务，执行时间超过 50ms 的任务被归类为长任务。长任务执行期间，其他交互或者渲染更新任务都会延迟处理。</p>
<p>将长任务拆分成多个小任务，浏览器就有更多机会对优先级更高的工作做出响应。</p>
<h2 id="任务管理" tabindex="-1"><a class="header-anchor" href="#任务管理"><span>任务管理</span></a></h2>
<p>假设有一个 saveSettings 函数，它包含以下 5 个工作。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">saveSettings</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">validateForm</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token function">showSpinner</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token function">saveToDatabase</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token function">updateUI</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token function">sendAnalytics</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><p>由于 5 个函数都是在 saveSettings 中执行的，所以 5 个函数会被作为一个任务运行。</p>
<p><img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/1gENo7PnUwPhbTJmQKmX.png" alt=""></p>
<p>之所以如此，是因为 JavaScript 使用了“运行至完成”的任务执行模式：每个任务都运行到完成为止，无论它阻塞主线程多长时间。</p>
<p>所谓拆分长任务，就是在长任务运行期间，主动暂停，相当于让出主线程 ( yield to the main thread )，这样主线程才能处理其他重要任务。</p>
<p>一般来说，有面向用户的重要工作需要尽快执行时，你就应该让出主线程。</p>
<p>下面介绍让出主线程的方法。</p>
<h3 id="settimout-重新入队" tabindex="-1"><a class="header-anchor" href="#settimout-重新入队"><span>setTimout 重新入队</span></a></h3>
<p>setTimeout 可以将创建一个新的任务并入队，从而让出主线程。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">saveSettings</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// Do critical work that is user-visible:</span>
  <span class="token function">validateForm</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token function">showSpinner</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token function">updateUI</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

  <span class="token comment">// Defer work that isn't user-visible to a separate task:</span>
  <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token function">saveToDatabase</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token function">sendAnalytics</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><p>除了 setTimeout，还有一些 API 可以做到这一点。</p>
<ul>
<li>postMessage</li>
<li>requestIdleCallback()</li>
</ul>
<p>注意，requestIdleCallback 是以尽可能低的优先级调度任务，且只在浏览器空闲时执行。当主线程拥挤时，requestIdleCallback 调度的任务可能永远无法运行。</p>
<h3 id="利用-async-await" tabindex="-1"><a class="header-anchor" href="#利用-async-await"><span>利用 async/await</span></a></h3>
<p>为方便阅读，我们对 setTimeout 做一层包装。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">yieldToMain</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token parameter">resolve</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token function">setTimeout</span><span class="token punctuation">(</span>resolve<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>注意，这段代码中，promise 创建的是微任务，setTimeout 创建的宏任务，只有宏任务才会让出主线程。之所以创建 promise 是为了方便使用 async/await。</p>
<p>利用 yieldToMain 函数让出主线程。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">saveSettings</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> tasks <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token comment">/* ... */</span><span class="token punctuation">]</span>

  <span class="token keyword">while</span> <span class="token punctuation">(</span>tasks<span class="token punctuation">.</span>length <span class="token operator">></span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    tasks<span class="token punctuation">.</span><span class="token function">shift</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">await</span> <span class="token function">yieldToMain</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>这段代码执行起来的任务流如下图，长任务被分成了 5 个小任务。</p>
<p><img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/mzrFeqjk00zUlKK0xzI8.png" alt=""></p>
<p>当然，没必要每个函数都 yield 一次，重要的任务可以连着执行。</p>
<h3 id="isinputpending" tabindex="-1"><a class="header-anchor" href="#isinputpending"><span>isInputPending</span></a></h3>
<p>isInputPending 是一个可以随时运行的函数，用于判断用户是否试图与页面进行交互。</p>
<p>假如你有一堆任务需要运行，但不想妨碍任何输入。以下代码可以保证用户尝试与页面交互时，输入不会被延迟。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">saveSettings</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> tasks <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token comment">/* ... */</span><span class="token punctuation">]</span>
  
  <span class="token keyword">while</span> <span class="token punctuation">(</span>tasks<span class="token punctuation">.</span>length <span class="token operator">></span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>navigator<span class="token punctuation">.</span>scheduling<span class="token punctuation">.</span><span class="token function">isInputPending</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">await</span> <span class="token function">yieldToMain</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 有交互，先让出主线程处理交互</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      tasks<span class="token punctuation">.</span><span class="token function">shift</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 没交互，直接执行</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>任务执行流程如下图，可以看到当有交互时，会主动让出主线程。</p>
<p><img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/Oz00JZNrYH4dNE3pmYss.png" alt=""></p>
<p>isInputPending 并不总是在用户输入后立即返回 true，因为操作系统需要一定时间才能告知浏览器发生了交互，这一点需要注意。</p>
<p>另外，浏览器不一定都支持 isInputPending，我们还需要做兼容降级处理。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">saveSettings</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> tasks <span class="token operator">=</span> <span class="token punctuation">[</span> <span class="token comment">/* ... */</span><span class="token punctuation">]</span>
  
  <span class="token keyword">let</span> deadline <span class="token operator">=</span> performance<span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">50</span>

  <span class="token keyword">while</span> <span class="token punctuation">(</span>tasks<span class="token punctuation">.</span>length <span class="token operator">></span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>
      navigator<span class="token punctuation">.</span>scheduling<span class="token operator">?.</span><span class="token function">isInputPending</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">||</span>
      performance<span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">>=</span> deadline <span class="token comment">// 降级为用 performance.now 判断时间</span>
    <span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">await</span> <span class="token function">yieldToMain</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      deadline <span class="token operator">=</span> performance<span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">50</span>
      <span class="token keyword">continue</span>
    <span class="token punctuation">}</span>

    tasks<span class="token punctuation">.</span><span class="token function">shift</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="scheduler-api" tabindex="-1"><a class="header-anchor" href="#scheduler-api"><span>Scheduler API</span></a></h2>
<p>setTimeout 有一个问题：任务会进入任务队列的最末端，你无法控制任务的优先级。幸运的是，浏览器提供了专门的调度程序接口 ( Scheduler API )。</p>
<h3 id="scheduler-posttask" tabindex="-1"><a class="header-anchor" href="#scheduler-posttask"><span>scheduler.postTask</span></a></h3>
<p>postTask 可以对任务进行更精细的调度，它有三种优先级：</p>
<ul>
<li>background 低优先级</li>
<li>user-visible 中等优先级，也是默认优先级</li>
<li>user-blocking 高优先级</li>
</ul>
<p>以高优先级运行三个任务，以最低优先级运行其余两个任务。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> low <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">priority</span><span class="token operator">:</span> <span class="token string">'background'</span> <span class="token punctuation">}</span>
<span class="token keyword">const</span> high <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">priority</span><span class="token operator">:</span> <span class="token string">'user-blocking'</span> <span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">saveSettings</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  scheduler<span class="token punctuation">.</span><span class="token function">postTask</span><span class="token punctuation">(</span>validateForm<span class="token punctuation">,</span> high<span class="token punctuation">)</span>
  scheduler<span class="token punctuation">.</span><span class="token function">postTask</span><span class="token punctuation">(</span>showSpinner<span class="token punctuation">,</span> high<span class="token punctuation">)</span>
  scheduler<span class="token punctuation">.</span><span class="token function">postTask</span><span class="token punctuation">(</span>updateUI<span class="token punctuation">,</span> high<span class="token punctuation">)</span>

  scheduler<span class="token punctuation">.</span><span class="token function">postTask</span><span class="token punctuation">(</span>saveToDatabase<span class="token punctuation">,</span> low<span class="token punctuation">)</span>
  scheduler<span class="token punctuation">.</span><span class="token function">postTask</span><span class="token punctuation">(</span>sendAnalytics<span class="token punctuation">,</span> low<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre></div><p>任务执行流程如下。</p>
<p><img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/J6Ec735EReBFCTj1CuVf.png" alt=""></p>
<p>这是 postTask 的一个简单示例。我们还可以实例化不同的 TaskController 对象，这些对象可以在任务之间共享优先级，包括根据需要更改不同 TaskController 实例的优先级。</p>
<h3 id="scheduler-yield" tabindex="-1"><a class="header-anchor" href="#scheduler-yield"><span>scheduler.yield</span></a></h3>
<p>scheduler API 中有一个建议的部分目前还没有在任何浏览器中实现，那就是内置的 yield 机制。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">saveSettings</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> tasks <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token comment">/* ... */</span><span class="token punctuation">]</span>

  <span class="token keyword">while</span> <span class="token punctuation">(</span>tasks<span class="token punctuation">.</span>length <span class="token operator">></span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    tasks<span class="token punctuation">.</span><span class="token function">shift</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">await</span> scheduler<span class="token punctuation">.</span><span class="token function">yield</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>不难看出，scheduler.yield 和 yieldToMain 在使用上非常类似。</p>
<p>scheduler.yield 的优点是连续性，你在一个任务的中间退出，其他任务将在退出点之后以同样的顺序继续执行。这就避免了第三方脚本的代码篡改你的代码执行顺序。</p>
<p><img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/5q9WG0lmBOwlqGYK16hd.png" alt=""></p>
<h2 id="小结" tabindex="-1"><a class="header-anchor" href="#小结"><span>小结</span></a></h2>
<p>管理任务的关键在于：让出主线程，使其能尽快处理面向用户的关键任务。</p>
<ul>
<li>使用 isInputPending 判断用户是否试图与页面交互，有交互才让出主线程</li>
<li>使用 postTask 确定任务的优先级</li>
<li>scheduler.yield 是内置的让出主线程的函数</li>
</ul>
<h2 id="脚本评估" tabindex="-1"><a class="header-anchor" href="#脚本评估"><span>脚本评估</span></a></h2>
<p>脚本评估 ( script evaluation ) 就是对脚本进行解析、查找错误、编译成字节码、执行等一系列工作。</p>
<p>加载脚本时，浏览器创建一个脚本评估的任务</p>
<p><img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/WZyF71IiPWyG8vwKQcdP.png" alt=""></p>
<p>为防止评估任务占据主线程，因此也需要拆分。虽然评估本身要做的事是一样的，但不同的脚本加载方式会产生不同的评估数量。</p>
<h3 id="script-元素加载" tabindex="-1"><a class="header-anchor" href="#script-元素加载"><span>script 元素加载</span></a></h3>
<p>通常来说，每个 script 元素对应一个脚本评估任务。</p>
<p>如果你将所有内容打包到一个 bundle.js 中，就会只产生一个大的评估任务。为防止主线程长期被评估任务阻塞，我们需要将其分解为多个小脚本。</p>
<p><img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/dajGS6urKufQoweVhJQh.png" alt=""></p>
<p>为平衡压缩效率、下载时间和评估时间，建议将脚本大小限制在 100KB。</p>
<h3 id="es-module" tabindex="-1"><a class="header-anchor" href="#es-module"><span>ES module</span></a></h3>
<p>每个 module 同样会产生一个评估任务，且与普通 script 相比，module 的评估任务多了一项 Compile Module 过程。</p>
<p><img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/aEGTjOqtruKet5I6sCLM.png" alt=""></p>
<p>Compile module 完成后会开始 Evaluate module。</p>
<p><img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/CQpGnJmXh9JSUIMuBpeu.png" alt=""></p>
<p>我们知道，defer 脚本会在 DOMContentLoaded 之后执行，ES module 默认是 defer 的。如果 defer 脚本太多，组合起来也会成为一个长任务，因此需要权衡 module 的数量。</p>
<h3 id="动态-import" tabindex="-1"><a class="header-anchor" href="#动态-import"><span>动态 import</span></a></h3>
<p>动态 import() 是另一种加载脚本的方法。它可以减少启动时加载的 JavaScript 数量，从而减少主线程的争用。</p>
<p>动态导入的模块数量和评估任务也是对应的。</p>
<h3 id="web-worker-加载" tabindex="-1"><a class="header-anchor" href="#web-worker-加载"><span>web worker 加载</span></a></h3>
<p>Web Worker 在主线程上注册的，但是 Worker 的代码在自己的线程上运行，这减少了主线程的拥塞。</p>
<p>除了减少主线程工作外，web Worker 还可以通过 importScripts 语句导入新的模块，这些模块都可以在主线程之外评估。</p>
<h3 id="小结-1" tabindex="-1"><a class="header-anchor" href="#小结-1"><span>小结</span></a></h3>
<p>脚本评估就是对脚本的解析、编译、执行等工作。script 文件请求、es module、动态 import 的 script 都会产生对应的评估任务。</p>
<h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考"><span>参考</span></a></h2>
<p><a href="https://web.dev/optimize-long-tasks/" target="_blank" rel="noopener noreferrer">Optimize long tasks<ExternalLinkIcon/></a></p>
<p><a href="https://web.dev/script-evaluation-and-long-tasks/" target="_blank" rel="noopener noreferrer">Script evaluation and long tasks<ExternalLinkIcon/></a></p>
<p><a href="https://developer.chrome.com/blog/modulepreload/" target="_blank" rel="noopener noreferrer">modulepreload hint<ExternalLinkIcon/></a></p>
</div></template>


