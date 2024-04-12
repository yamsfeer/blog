<template><div><h1 id="性能标准api" tabindex="-1"><a class="header-anchor" href="#性能标准api"><span>性能标准API</span></a></h1>
<p>有时候，我们需要自定义指标，比如：</p>
<ul>
<li>单页应用程序 ( SPA ) 页面切换需要多长时间</li>
<li>页面针对登录用户显示从数据库获取的数据需要多长时间</li>
<li>服务器端渲染 ( SSR ) 需要多长时间才能<a href="https://addyosmani.com/blog/rehydration/" target="_blank" rel="noopener noreferrer">注水<ExternalLinkIcon/></a></li>
<li>回访者加载资源的缓存命中率</li>
<li>游戏中点击或键盘事件的事件延迟</li>
</ul>
<p>Web 性能工作组推出了一系列较底层的标准化 API，用于实现自定义指标。</p>
<h2 id="performanceobserver" tabindex="-1"><a class="header-anchor" href="#performanceobserver"><span>PerformanceObserver</span></a></h2>
<p>PerformanceObserver 是获取性能 API 数据的方法。它接受一个回调函数，并通过 observe 函数观察某类型的性能数据。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> observer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PerformanceObserver</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">list<span class="token punctuation">,</span> observer</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  list<span class="token punctuation">.</span><span class="token function">getEntries</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">entry</span> <span class="token operator">=></span> entry<span class="token punctuation">.</span><span class="token function">toJSON</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

observer<span class="token punctuation">.</span><span class="token function">observe</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'entry-type'</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>PerformanceObserver 的回调通常在<a href="https://w3c.github.io/requestidlecallback/#idle-periods" target="_blank" rel="noopener noreferrer">空闲期间<ExternalLinkIcon/></a>触发，因此不会干扰页面的性能。</p>
<p>检查浏览器支持哪些性能类型。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code>PerformanceObserver<span class="token punctuation">.</span>supportedEntryTypes
</code></pre></div><div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token punctuation">[</span>
  <span class="token string">'element'</span><span class="token punctuation">,</span>
  <span class="token string">'event'</span><span class="token punctuation">,</span>
  <span class="token string">'first-input'</span><span class="token punctuation">,</span>
  <span class="token string">'largest-contentful-paint'</span><span class="token punctuation">,</span>
  <span class="token string">'layout-shift'</span><span class="token punctuation">,</span>
  <span class="token string">'longtask'</span><span class="token punctuation">,</span>
  <span class="token string">'mark'</span><span class="token punctuation">,</span>
  <span class="token string">'measure'</span><span class="token punctuation">,</span>
  <span class="token string">'navigation'</span><span class="token punctuation">,</span>
  <span class="token string">'paint'</span><span class="token punctuation">,</span>
  <span class="token string">'resource'</span>
<span class="token punctuation">]</span>
</code></pre></div><p>observe 函数接受的 options 有三个选项：</p>
<div class="language-typescript" data-ext="ts" data-title="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token class-name">PerformanceObserverInit</span> <span class="token punctuation">{</span>
  buffered<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">;</span>
  entryTypes<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
  type<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>type 可以是 supportedEntryTypes 里的值，entryTypes 则可以一次传多个 type 值。</p>
<p>默认情况下， PerformanceObserver 只能获取 observe 之后发生的事件。要获取历史事件，可以将 buffered 设置为 true，浏览器将在第一次回调中提供缓冲区中的数据。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code>observer<span class="token punctuation">.</span><span class="token function">observe</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'entry-type'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">buffered</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>使用 performance Observer 测量指标通常有几点需要注意：</p>
<ul>
<li>后台 tab 页面也会报告，但实际上应忽略这些页面</li>
<li>页面通过前进后退按钮恢复时，不会报告，但实际应该报告，因为这是不同的页面访问方式。</li>
<li>不考虑 iframe 中的元素</li>
</ul>
<p>值得一提的是，MDN 文档中关于 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/PerformanceObserver" target="_blank" rel="noopener noreferrer">PerformanceObserver<ExternalLinkIcon/></a> 的文档有些过时，建议通过 w3c 的文档查看 <a href="https://w3c.github.io/performance-timeline/" target="_blank" rel="noopener noreferrer">Performance Observer API<ExternalLinkIcon/></a>。</p>
<h3 id="旧版性能-api" tabindex="-1"><a class="header-anchor" href="#旧版性能-api"><span>旧版性能 API</span></a></h3>
<p>在 PerformanceObserver 之前，开发者通过 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Performance" target="_blank" rel="noopener noreferrer">Performance<ExternalLinkIcon/></a> 对象的方法测量性能。</p>
<ul>
<li>getEntries</li>
<li>getEntriesByName</li>
<li>getEntriesByType</li>
</ul>
<p>这些是旧的 API，它们无法监听何时发出新 entry，也无法获取新类型 entry，因此不建议使用。</p>
<p><strong>除非需要兼容 IE，否则建议统一使用 PerformanceObserver</strong>。</p>
<h2 id="性能标准-api" tabindex="-1"><a class="header-anchor" href="#性能标准-api"><span>性能标准 API</span></a></h2>
<h3 id="user-timing-api" tabindex="-1"><a class="header-anchor" href="#user-timing-api"><span>User Timing API</span></a></h3>
<p><a href="https://w3c.github.io/user-timing/" target="_blank" rel="noopener noreferrer">User Timing API<ExternalLinkIcon/></a> 单纯用于计时，它可以标记时间点，然后测量标记之间的时长。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token comment">// Record the time immediately before running a task.</span>
performance<span class="token punctuation">.</span><span class="token function">mark</span><span class="token punctuation">(</span><span class="token string">'myTask:start'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">await</span> <span class="token function">doMyTask</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// Record the time immediately after running a task.</span>
performance<span class="token punctuation">.</span><span class="token function">mark</span><span class="token punctuation">(</span><span class="token string">'myTask:end'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// Measure the delta between the start and end of the task</span>
performance<span class="token punctuation">.</span><span class="token function">measure</span><span class="token punctuation">(</span><span class="token string">'myTask'</span><span class="token punctuation">,</span> <span class="token string">'myTask:start'</span><span class="token punctuation">,</span> <span class="token string">'myTask:end'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>虽然 <code v-pre>Date.now()</code> 或 <code v-pre>performance.now()</code> 可以提供相似功能，但 User Timing API 可以与性能工具很好地集成。例如，Chrome DevTools 可以使 <a href="https://developers.google.com/web/updates/2018/04/devtools#tabs" target="_blank" rel="noopener noreferrer">Performance 面板中的 User Timing 测量值<ExternalLinkIcon/></a>可视化。</p>
<p>PerformanceObserver 观察 measure 类型 entry。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">new</span> <span class="token class-name">PerformanceObserver</span><span class="token punctuation">(</span><span class="token parameter">list</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> entry <span class="token keyword">of</span> list<span class="token punctuation">.</span><span class="token function">getEntries</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>entry<span class="token punctuation">.</span><span class="token function">toJSON</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">.</span><span class="token function">observe</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'measure'</span><span class="token punctuation">,</span> <span class="token literal-property property">buffered</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><h3 id="long-tasks-api" tabindex="-1"><a class="header-anchor" href="#long-tasks-api"><span>Long Tasks API</span></a></h3>
<p><a href="https://w3c.github.io/longtasks/" target="_blank" rel="noopener noreferrer">Long Tasks API<ExternalLinkIcon/></a> 报告执行时间超过 50ms 的任务。</p>
<p>每当运行开销大的代码，跟踪是否阻塞主线程都是很有用的。事实上，许多高级指标如 TTI 和 TBT，都是建立在 Long Tasks API 上的。</p>
<p>PerformanceObserver 观察 longtask 类型 entry：</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code>observer<span class="token punctuation">.</span><span class="token function">observe</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'longtask'</span><span class="token punctuation">,</span> <span class="token literal-property property">buffered</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><h3 id="element-timing-api" tabindex="-1"><a class="header-anchor" href="#element-timing-api"><span>Element Timing API</span></a></h3>
<p>LCP 测量的是最大图像或文本的绘制时间。如果需要测量其他元素，可以使用 <a href="https://wicg.github.io/element-timing/" target="_blank" rel="noopener noreferrer">Element Timing API<ExternalLinkIcon/></a>。实际上，LCP 就是在 Element Timing API 的基础上，添加了对最大元素的自动报告。</p>
<p>为元素添加 elementtiming 属性。</p>
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">elementtiming</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>hero-image<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span> <span class="token attr-name">elementtiming</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>important-paragraph<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>This is text I care about.<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
</code></pre></div><p>然后 PerformanceObserver 观察这些元素。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code>observer<span class="token punctuation">.</span><span class="token function">observe</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'element'</span><span class="token punctuation">,</span> <span class="token literal-property property">buffered</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>LCP 支持的元素类型与 Element Timing API 相同，将 <code v-pre>elementtiming</code> 添加到不属于这些类型的元素将被忽略。</p>
<h3 id="event-timing-api" tabindex="-1"><a class="header-anchor" href="#event-timing-api"><span>Event Timing API</span></a></h3>
<p><a href="https://wicg.github.io/event-timing/" target="_blank" rel="noopener noreferrer">Event Timing API<ExternalLinkIcon/></a>  提供了事件生命周期中的许多时间戳，包括：</p>
<ul>
<li>startTime：接收到事件时间。</li>
<li>processingStart：能够开始处理事件时间。</li>
<li>processingEnd：完成事件处理时间。</li>
<li>duration：事件持续时间，出于安全原因，四舍五入到 8ms。</li>
</ul>
<p>以下示例显示了如何使用这些值来创建自定义测量：</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">new</span> <span class="token class-name">PerformanceObserver</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">entryList</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> firstInput <span class="token operator">=</span> entryList<span class="token punctuation">.</span><span class="token function">getEntries</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>

  <span class="token comment">// FID</span>
  <span class="token keyword">const</span> firstInputDelay <span class="token operator">=</span> firstInput<span class="token punctuation">.</span>processingStart <span class="token operator">-</span> firstInput<span class="token punctuation">.</span>startTime<span class="token punctuation">;</span>

  <span class="token comment">// 完成所有事件处理器所用时间</span>
  <span class="token comment">// 不包含异步任务，如 requestAnimationFrame setTimeout.</span>
  <span class="token keyword">const</span> firstInputProcessingTime <span class="token operator">=</span> firstInput<span class="token punctuation">.</span>processingEnd <span class="token operator">-</span> firstInput<span class="token punctuation">.</span>processingStart<span class="token punctuation">;</span>

  <span class="token comment">// 不包含异步任务</span>
  <span class="token keyword">const</span> firstInputDuration <span class="token operator">=</span> firstInput<span class="token punctuation">.</span>duration
<span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">observe</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'first-input'</span><span class="token punctuation">,</span> <span class="token literal-property property">buffered</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><h3 id="resource-timing-api" tabindex="-1"><a class="header-anchor" href="#resource-timing-api"><span>Resource Timing API</span></a></h3>
<p><a href="https://w3c.github.io/resource-timing/" target="_blank" rel="noopener noreferrer">Resource Timing API<ExternalLinkIcon/></a> 可以获取页面的资源是如何加载的，除了计时数据，还包括：</p>
<ul>
<li>initiatorType：资源获取方式。如 script、link 标签，或者 fetch 函数获取</li>
<li>nextHopProtocol：获取资源的协议，如 http2</li>
<li>encodedBodySize / decodedBodySize：资源大小</li>
<li>transferSize：通过网络传输的资源的大小。当资源通过缓存获取时，该值为 0。</li>
</ul>
<p>通过 <code v-pre>transferSize</code> 可以计算缓存命中率，总缓存资源大小，这对优化资源缓存策略很有用。</p>
<p>以下示例检查资源是否通过缓存实现。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">new</span> <span class="token class-name">PerformanceObserver</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">list</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> entry <span class="token keyword">of</span> list<span class="token punctuation">.</span><span class="token function">getEntries</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// If transferSize is 0, the resource was fulfilled via the cache.</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>entry<span class="token punctuation">.</span>name<span class="token punctuation">,</span> entry<span class="token punctuation">.</span>transferSize <span class="token operator">===</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">.</span><span class="token function">observe</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'resource'</span><span class="token punctuation">,</span> <span class="token literal-property property">buffered</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h3 id="navigation-timing-api" tabindex="-1"><a class="header-anchor" href="#navigation-timing-api"><span>Navigation Timing API</span></a></h3>
<p><a href="https://w3c.github.io/navigation-timing/" target="_blank" rel="noopener noreferrer">Navigation Timing API<ExternalLinkIcon/></a> 可以获取 navigation 过程中的信息，比如 DOMContentLoaded 和 load 事件触发时间。</p>
<p>TTFB ( Time to First Byte ) 其实就是 Navigation Timing 中的 responseStart 时间点。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">new</span> <span class="token class-name">PerformanceObserver</span><span class="token punctuation">(</span><span class="token parameter">list</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> entry <span class="token keyword">of</span> list<span class="token punctuation">.</span><span class="token function">getEntries</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'Time to first byte'</span><span class="token punctuation">,</span> entry<span class="token punctuation">.</span>responseStart<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">.</span><span class="token function">observe</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'navigation'</span><span class="token punctuation">,</span> <span class="token literal-property property">buffered</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><h3 id="server-timing-api" tabindex="-1"><a class="header-anchor" href="#server-timing-api"><span>Server Timing API</span></a></h3>
<p><a href="https://w3c.github.io/server-timing/" target="_blank" rel="noopener noreferrer">Server Timing API<ExternalLinkIcon/></a> 可以获取请求响应中，服务器传过来的计时数据。例如数据库查询花费的时间 。</p>
<p>以下示例中，服务器使用 <code v-pre>Server-Timing</code> 传递计时数据。</p>
<div class="language-http" data-ext="http" data-title="http"><pre v-pre class="language-http"><code><span class="token response-status"><span class="token http-version property">HTTP/1.1</span> <span class="token status-code number">200</span> <span class="token reason-phrase string">OK</span></span>

<span class="token header"><span class="token header-name keyword">Server-Timing</span><span class="token punctuation">:</span> <span class="token header-value">miss, db;dur=53, app;dur=47.2</span></span>
</code></pre></div><p>客户端可以通过 resource 或 navigation 类型 entry 读取此数据。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">new</span> <span class="token class-name">PerformanceObserver</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">list</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> entry <span class="token keyword">of</span> list<span class="token punctuation">.</span><span class="token function">getEntries</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// Logs all server timing data for this response</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'Server Timing'</span><span class="token punctuation">,</span> entry<span class="token punctuation">.</span>serverTiming<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">.</span><span class="token function">observe</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'navigation'</span><span class="token punctuation">,</span> <span class="token literal-property property">buffered</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div></div></template>


