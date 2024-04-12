<template><div><h1 id="fcp-首次内容绘制" tabindex="-1"><a class="header-anchor" href="#fcp-首次内容绘制"><span>FCP 首次内容绘制</span></a></h1>
<h2 id="什么是-fcp" tabindex="-1"><a class="header-anchor" href="#什么是-fcp"><span>什么是 FCP</span></a></h2>
<p>FCP ( First Contentful Paint ) 首次内容绘制，从开始加载到页面内容的任何部分在屏幕上完成渲染的时间。内容指的是文本、图像、非白色的 canvas 等。</p>
<img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/3UhlOxRc0j8Vc4DGd4dt.png" alt="来自 google.com 的 FCP 时间轴" style="zoom: 50%;" />
<p>上图的 FCP 发生在第二帧，首批文本和图像完成渲染。</p>
<p>注意，FCP 是部分内容，而非所有内容都完成渲染，这是 FCP 与 LCP 的重要区别，LCP 旨在测量页面的<strong>主要内容</strong>何时完成加载。</p>
<h2 id="fcp-阈值" tabindex="-1"><a class="header-anchor" href="#fcp-阈值"><span>FCP 阈值</span></a></h2>
<img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/vQKpz0S2SGnnoXHMDidj.svg" alt="良好的 FCP 值是 1.8 秒或更短，差的值大于 3.0 秒，中间的任何东西都需要改进" width="400" class="img-mid" />
<h2 id="如何测量-fcp" tabindex="-1"><a class="header-anchor" href="#如何测量-fcp"><span>如何测量 FCP</span></a></h2>
<p>FCP 基于 <a href="https://w3c.github.io/paint-timing/" target="_blank" rel="noopener noreferrer">paint timing API<ExternalLinkIcon/></a>。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">new</span> <span class="token class-name">PerformanceObserver</span><span class="token punctuation">(</span><span class="token parameter">list</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> entry <span class="token keyword">of</span> list<span class="token punctuation">.</span><span class="token function">getEntries</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'FCP'</span><span class="token punctuation">,</span> entry<span class="token punctuation">.</span>startTime<span class="token punctuation">,</span> entry<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">observe</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'paint'</span><span class="token punctuation">,</span> <span class="token literal-property property">buffered</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h2 id="如何改进-fcp" tabindex="-1"><a class="header-anchor" href="#如何改进-fcp"><span>如何改进 FCP</span></a></h2>
<p>以下列出了一些改进 FCP 的方法。</p>
<ul>
<li><a href="https://developer.chrome.com/docs/lighthouse/performance/render-blocking-resources/" target="_blank" rel="noopener noreferrer">消除阻塞渲染的资源<ExternalLinkIcon/></a></li>
<li><a href="https://developer.chrome.com/docs/lighthouse/performance/unminified-css/" target="_blank" rel="noopener noreferrer">缩小 CSS<ExternalLinkIcon/></a></li>
<li><a href="https://developer.chrome.com/docs/lighthouse/performance/unused-css-rules/" target="_blank" rel="noopener noreferrer">移除未使用的 CSS<ExternalLinkIcon/></a></li>
<li><a href="https://developer.chrome.com/docs/lighthouse/performance/uses-rel-preconnect/" target="_blank" rel="noopener noreferrer">预连接到所需的来源<ExternalLinkIcon/></a></li>
<li><a href="https://web.dev/ttfb/" target="_blank" rel="noopener noreferrer">减少服务器响应时间 (TTFB)<ExternalLinkIcon/></a></li>
<li><a href="https://developer.chrome.com/docs/lighthouse/performance/redirects/" target="_blank" rel="noopener noreferrer">避免多个页面重定向<ExternalLinkIcon/></a></li>
<li><a href="https://developer.chrome.com/docs/lighthouse/performance/uses-rel-preload/" target="_blank" rel="noopener noreferrer">预加载关键请求<ExternalLinkIcon/></a></li>
<li><a href="https://developer.chrome.com/docs/lighthouse/performance/total-byte-weight/" target="_blank" rel="noopener noreferrer">避免巨大的网络负载<ExternalLinkIcon/></a></li>
<li><a href="https://developer.chrome.com/docs/lighthouse/performance/uses-long-cache-ttl/" target="_blank" rel="noopener noreferrer">使用高效的缓存策略服务静态资产<ExternalLinkIcon/></a></li>
<li><a href="https://developer.chrome.com/docs/lighthouse/performance/dom-size/" target="_blank" rel="noopener noreferrer">避免 DOM 过大<ExternalLinkIcon/></a></li>
<li><a href="https://developer.chrome.com/docs/lighthouse/performance/critical-request-chains/" target="_blank" rel="noopener noreferrer">最小化关键请求深度<ExternalLinkIcon/></a></li>
<li><a href="https://developer.chrome.com/docs/lighthouse/performance/font-display/" target="_blank" rel="noopener noreferrer">确保文本在网页字体加载期间保持可见<ExternalLinkIcon/></a></li>
<li><a href="https://developer.chrome.com/docs/lighthouse/performance/resource-summary/" target="_blank" rel="noopener noreferrer">保持较低的请求数和较小的传输大小<ExternalLinkIcon/></a></li>
</ul>
</div></template>


