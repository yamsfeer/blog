<template><div><h1 id="memory-cache" tabindex="-1"><a class="header-anchor" href="#memory-cache"><span>Memory Cache</span></a></h1>
<p>memory cache 就是指内存中的缓存。几乎所有的请求资源都能进入 memory cache，下面介绍 preload cache 和 bfcache。</p>
<h2 id="preload-cache" tabindex="-1"><a class="header-anchor" href="#preload-cache"><span>preload cache</span></a></h2>
<p>预加载的资源会进入 memory cache 中，而预加载的几种方式前面已经介绍过，包括浏览器本身的 preload scanner 和用户的 preload hint。</p>
<h2 id="bfcache" tabindex="-1"><a class="header-anchor" href="#bfcache"><span>BFCache</span></a></h2>
<p>前进/后退缓存 ( back/forward cache, bfcache ) 是一种浏览器优化，可实现即时前进后退导航。</p>
<p><strong>bfcache 是一种内存缓存</strong>，在用户离开时缓存页面的完整快照。由于整个页面都在内存中，浏览器可以快速、轻松地恢复页面。</p>
<p>用户点击前进、后退按钮时，如果没有启用 bfcache，浏览器可能需要重新下载、解析和执行部分或全部资源；启用 bfcache 后，加载前一个页面基本上是即时的，因为整个页面是从内存中恢复的，无需访问网络。</p>
<p>与 HTTP 缓存不同的是，HTTP Cache 缓存的是请求的响应，属于<strong>文件级别缓存</strong>，而 bfcache 缓存的是页面在内存中的快照 ( 包括 JavaScript 堆 )，属于<strong>内存级别缓存</strong>。</p>
<p>bfcache 涉及到一个问题：<strong>如何处理正在执行的代码</strong>。例如 setTimeout 的回调函数？</p>
<p>事实上，浏览器会暂停处理定时器和 Promise ( 基本上包含了 JavaScript 任务队列中所有的待处理任务 )，当页面从 bfcache 中恢复时，才会继续处理。</p>
<h3 id="监听-bfcache" tabindex="-1"><a class="header-anchor" href="#监听-bfcache"><span>监听 bfcache</span></a></h3>
<p>下图是 Page Lifecycle 的示意图 ( <a href="https://wd.imgix.net/image/eqprBhZUGfb8WYnumQ9ljAxRrA72/KCIeOsJ0lCWMthBSSBrn.svg" target="_blank" rel="noopener noreferrer">原图链接<ExternalLinkIcon/></a> )。</p>
<p><img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/Page-Lifecycle.svg" alt=""></p>
<p>监听 bfcache 主要通过 pageshow 和 pagehide 事件。</p>
<h4 id="从-bfcache-恢复" tabindex="-1"><a class="header-anchor" href="#从-bfcache-恢复"><span>从 bfcache 恢复</span></a></h4>
<p>pageshow 会在初始加载或页面从 bfcache 恢复时触发。可以使用 persistent 属性来区分常规加载和 bfcache 恢复。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code>window<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'pageshow'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>event<span class="token punctuation">.</span>persisted<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'This page was restored from the bfcache.'</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'This page was loaded normally.'</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>当页面从 bfcache 中恢复或者用户重新访问 frozen 的 tab 时，会触发 resume。</p>
<p>如果为解冻页面恢复状态，使用 resume 事件；如果想测量 bfcache 命中率，则用 pageshow 事件。</p>
<h4 id="进入-bfcache" tabindex="-1"><a class="header-anchor" href="#进入-bfcache"><span>进入 bfcache</span></a></h4>
<p>与 pageshow 类似，pagehide 事件在页面正常卸载或浏览器试图进行 bfcache 时触发。</p>
<p>如果 pagehide 的 persistent 为 false，则页面肯定不会进入 bfcache；但如果为true，并不能保证页面会被缓存，后面会介绍。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code>window<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'pagehide'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>event<span class="token punctuation">.</span>persisted<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'This page *might* be entering the bfcache.'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'This page will unload normally and be discarded.'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>同样的，freeze 将在 pagehide 之后立即触发，但这同样只意味着浏览器打算缓存页面，不保证一定会进入 bfcache。</p>
<h3 id="优化-bfcache" tabindex="-1"><a class="header-anchor" href="#优化-bfcache"><span>优化 bfcache</span></a></h3>
<p>并不是所有页面都会进入 bfcache，下面列出了进入 bfcache 的最佳实践。</p>
<ul>
<li>
<p>不使用 unload 事件</p>
</li>
<li>
<p>减少 Cache-Control: no-store</p>
<p>目前任何使用 Cache-Control: no-store 的页面都不符合 bfcache 的条件。</p>
<p>请使用 Cache-Control: no-cache 或 Cache-Control: max-age=0。这些指令指示浏览器在提供内容之前进行重新验证，不会影响页面的 bfcache 资格。</p>
</li>
<li>
<p>bfcache 恢复后更新过期或敏感数据</p>
<p>如果网站保存了敏感的用户信息，那么从 bfcache 恢复后，需要更新或清除这些数据。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code>window<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'pageshow'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>event<span class="token punctuation">.</span>persisted<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    location<span class="token punctuation">.</span><span class="token function">reload</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div></li>
<li>
<p>避免引用 window.opener</p>
<p>除了存在安全隐患之外，带有 window.opener 引用的页面无法安全地放入 bfcache，因为这可能会破坏试图访问它的任何页面。</p>
</li>
<li>
<p>在离开之前关闭打开的连接</p>
<p>由于 bfcache 会暂停执行任务，而暂停 IndexedDB、Web Locks、WebSockets 这些任务可能会影响到其他 tab。因此，以下情况的页面不具有 bfcache 的条件。</p>
<ul>
<li>打开 IndexedDB 连接的页面</li>
<li>正在进行 fetch 或 XMLHttpRequest 的页面</li>
<li>打开 WebSocket 或 WebRTC 连接的页面</li>
</ul>
<p>在 <strong>pagehide 或 freeze</strong> 事件中关闭这些 API，浏览器才可以安全地缓存页面，而不会影响其他 tab。</p>
<p>当然，从 bfcache 中恢复时，需要重新启用这些 API ( 在 <strong>pageshow 或 resume</strong> 事件中 )。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> dbPromise<span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">openDB</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>dbPromise<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    dbPromise <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> req <span class="token operator">=</span> indexedDB<span class="token punctuation">.</span><span class="token function">open</span><span class="token punctuation">(</span><span class="token string">'my-db'</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      req<span class="token punctuation">.</span><span class="token function-variable function">onupgradeneeded</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> req<span class="token punctuation">.</span>result<span class="token punctuation">.</span><span class="token function">createObjectStore</span><span class="token punctuation">(</span><span class="token string">'keyval'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      req<span class="token punctuation">.</span><span class="token function-variable function">onerror</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">reject</span><span class="token punctuation">(</span>req<span class="token punctuation">.</span>error<span class="token punctuation">)</span><span class="token punctuation">;</span>
      req<span class="token punctuation">.</span><span class="token function-variable function">onsuccess</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">resolve</span><span class="token punctuation">(</span>req<span class="token punctuation">.</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> dbPromise<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// Close the connection to the database when the user is leaving.</span>
window<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'pagehide'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>dbPromise<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    dbPromise<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">db</span> <span class="token operator">=></span> db<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    dbPromise <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// Open the connection when the page is loaded or restored from bfcache.</span>
window<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'pageshow'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">openDB</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div></li>
</ul>
<p>在 chrome 的开发者工具中，在 <strong>Application</strong> &gt; <strong>Back-forward Cache</strong> 面板中点击 <strong>Run Test</strong> 按钮可以测试页面的 bfcache 使用情况。</p>
<h3 id="测量-bfcache-命中率" tabindex="-1"><a class="header-anchor" href="#测量-bfcache-命中率"><span>测量 bfcache 命中率</span></a></h3>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code>window<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'pageshow'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> navigationType <span class="token operator">=</span> performance<span class="token punctuation">.</span><span class="token function">getEntriesByType</span><span class="token punctuation">(</span><span class="token string">'navigation'</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>type<span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>event<span class="token punctuation">.</span>persisted <span class="token operator">||</span> navigationType <span class="token operator">==</span> <span class="token string">'back_forward'</span> <span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'isBFCache'</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>事实上，bfcache 会在一段时间后丢弃以节省内存。因此，不应该期望 100% 的 bfcache 命中率。</p>
<p>Chrome团队正在开发 <a href="https://github.com/rubberyuzu/bfcache-not-retored-reason/blob/main/NotRestoredReason.md" target="_blank" rel="noopener noreferrer">NotRestoredReasons API<ExternalLinkIcon/></a> 提供 bfcache 未被使用的原因。</p>
<h3 id="bfcache-对性能指标的影响" tabindex="-1"><a class="header-anchor" href="#bfcache-对性能指标的影响"><span>bfcache 对性能指标的影响</span></a></h3>
<p>bfcache 会对收集的性能指标产生负面影响，特别是衡量页面加载时间的指标。</p>
<p>有几种方法可以解决这个问题。</p>
<ul>
<li>在所有指标中标注 navigation type：navigate、reload、back_forward、prerender。这种方法推荐用于非以用户为中心的指标，如 TTFB。</li>
<li>对于以用户为中心的指标，则直接报告测量值。</li>
</ul>
<p>目前还没有专门的 Performance API 测量从 bfcache 恢复时的指标，但可以使用现有 API 近似计算。</p>
<ul>
<li>LCP：使用 pageshow 事件与下一个绘制帧之间的时间差（因为帧中的所有元素在同一时间绘制）。注意，在 bfcache 还原的情况下，LCP 和 FCP 是相同的。</li>
<li>FID：在 pageshow 事件中重新添加监听器，并将 FID 报告为 bfcache 还原后首次输入的延迟。</li>
<li>CLS：继续使用 Performance Observer，将当前的 CLS 值重置为 0。</li>
</ul>
<h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考"><span>参考</span></a></h2>
<p><a href="https://calendar.perfplanet.com/2013/big-bad-preloader/" target="_blank" rel="noopener noreferrer">Who’s Afraid of the Big Bad Preloader?<ExternalLinkIcon/></a></p>
<p><a href="https://web.dev/bfcache/" target="_blank" rel="noopener noreferrer">Back/forward cache - web.dev<ExternalLinkIcon/></a></p>
</div></template>


