<template><div><h1 id="ttfb-第一字节时间" tabindex="-1"><a class="header-anchor" href="#ttfb-第一字节时间"><span>TTFB 第一字节时间</span></a></h1>
<h2 id="什么是-ttfb" tabindex="-1"><a class="header-anchor" href="#什么是-ttfb"><span>什么是 TTFB</span></a></h2>
<p>TTFB ( Time to First Byte ) 第一字节时间，从资源请求开始到第一个字节到达的时间。</p>
<p><img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/timestamp-diagram.svg" alt=""></p>
<p>上图中 startTime 到 responseStart 的时间就是 TTFB。</p>
<p>具体来说，TTFB 包含以下时间损耗：</p>
<ul>
<li>Redirect 重定向</li>
<li>Service worker 启动</li>
<li>DNS 查询</li>
<li>建立连接</li>
<li>请求直到响应的第一个字节到达</li>
</ul>
<h2 id="ttfb-阈值" tabindex="-1"><a class="header-anchor" href="#ttfb-阈值"><span>TTFB 阈值</span></a></h2>
<img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/eNXaxPi9NdUVSTDRJFkV.svg" alt="良好的 TTFB 应该小于 0.8 秒" width="400" class="img-mid" />
<h2 id="如何测量-ttfb" tabindex="-1"><a class="header-anchor" href="#如何测量-ttfb"><span>如何测量 TTFB</span></a></h2>
<p>TTFB 基于 <a href="https://w3c.github.io/navigation-timing/" target="_blank" rel="noopener noreferrer">Navigation Timing API<ExternalLinkIcon/></a>。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">new</span> <span class="token class-name">PerformanceObserver</span><span class="token punctuation">(</span><span class="token parameter">list</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token punctuation">[</span>nav<span class="token punctuation">]</span> <span class="token operator">=</span> list<span class="token punctuation">.</span><span class="token function">getEntriesByType</span><span class="token punctuation">(</span><span class="token string">'navigation'</span><span class="token punctuation">)</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'TTFB'</span><span class="token punctuation">,</span> nav<span class="token punctuation">.</span>responseStart<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">observe</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'navigation'</span><span class="token punctuation">,</span> <span class="token literal-property property">buffered</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><h3 id="测量资源请求" tabindex="-1"><a class="header-anchor" href="#测量资源请求"><span>测量资源请求</span></a></h3>
<p>实际上，TTFB 不仅适用于导航请求，而是适用于所有请求，比如图片资源。要想测量资源请求的 TTFB，需要使用 <a href="https://w3c.github.io/resource-timing/" target="_blank" rel="noopener noreferrer">Resource Timing API<ExternalLinkIcon/></a>。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">new</span> <span class="token class-name">PerformanceObserver</span><span class="token punctuation">(</span><span class="token parameter">list</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> entry <span class="token keyword">of</span> list<span class="token punctuation">.</span><span class="token function">getEntries</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>entry<span class="token punctuation">.</span>responseStart <span class="token operator">></span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'TTFB'</span><span class="token punctuation">,</span> entry<span class="token punctuation">.</span>responseStart<span class="token punctuation">,</span> entry<span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">observe</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'resource'</span><span class="token punctuation">,</span> <span class="token literal-property property">buffered</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>资源的 responseStart 为 0，原因可能有：</p>
<ul>
<li>资源是从缓存中获取的</li>
<li>跨域资源未设置 <code v-pre>Timing-Allow-Origin</code> 响应头，跨域请求的 TTFB 就无法测量</li>
</ul>
<h2 id="如何优化-ttfb" tabindex="-1"><a class="header-anchor" href="#如何优化-ttfb"><span>如何优化 TTFB</span></a></h2>
<p>TTFB 高很可能是网络或服务器原因造成的。</p>
<p>优化 TTFB 方法：</p>
<ul>
<li><a href="https://developer.chrome.com/docs/lighthouse/performance/redirects/" target="_blank" rel="noopener noreferrer">避免多次重定向<ExternalLinkIcon/></a>.</li>
<li>提前向跨域资源源<a href="https://developer.chrome.com/docs/lighthouse/performance/uses-rel-preconnect/" target="_blank" rel="noopener noreferrer">建立连接 Preconnect<ExternalLinkIcon/></a> 。</li>
<li>将源提交给<a href="https://hstspreload.org/" target="_blank" rel="noopener noreferrer">HSTS预加载列表<ExternalLinkIcon/></a>，以消除 HTTP-HTTPS 重定向延迟。</li>
<li>使用 <a href="https://developer.chrome.com/docs/lighthouse/best-practices/uses-http2/" target="_blank" rel="noopener noreferrer">HTTP2<ExternalLinkIcon/></a> 或 <a href="https://en.wikipedia.org/wiki/HTTP/3" target="_blank" rel="noopener noreferrer">HTTP3<ExternalLinkIcon/></a></li>
<li>考虑<a href="https://web.dev/predictive-prefetching/" target="_blank" rel="noopener noreferrer">预测性预取<ExternalLinkIcon/></a>，为没有指定<a href="https://developer.mozilla.org/docs/Web/CSS/@media/prefers-reduced-data" target="_blank" rel="noopener noreferrer">减少数据使用偏好<ExternalLinkIcon/></a>的用户提供快速页面导航。</li>
<li>使用服务器端生成 ( SSG ) 来代替 SSR 的标记。</li>
</ul>
</div></template>


