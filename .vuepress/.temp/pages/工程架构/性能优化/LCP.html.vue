<template><div><h1 id="lcp-最大内容绘制" tabindex="-1"><a class="header-anchor" href="#lcp-最大内容绘制"><span>LCP 最大内容绘制</span></a></h1>
<p>对开发者来说，测量网页主要内容的加载速度并不容易。</p>
<ul>
<li>load 或 DOMContentLoaded 事件不一定与用户在屏幕上看到的内容相对应</li>
<li>FCP 只捕获加载最开始的部分，那可能只是启动画面或加载指示。</li>
<li>FMP 和 SI 可以捕获到初始绘制之后的加载，但它们十分复杂且经常出错。</li>
</ul>
<p>根据 <a href="https://www.w3.org/webperf/" target="_blank" rel="noopener noreferrer">W3C Web 性能工作组<ExternalLinkIcon/></a> 的研究，<strong>最大元素完成渲染</strong>能更准确地描述页面主要内容加载完毕。</p>
<h2 id="什么是-lcp" tabindex="-1"><a class="header-anchor" href="#什么是-lcp"><span>什么是 LCP</span></a></h2>
<p>LCP ( Largest Contentful Paint ) 最大内容绘制，从开始加载，到最大的内容在可视区域内变得可见的时间。</p>
<h3 id="哪些元素在考量范围内" tabindex="-1"><a class="header-anchor" href="#哪些元素在考量范围内"><span>哪些元素在考量范围内</span></a></h3>
<p>LCP 的最大内容主要考虑<strong>图片和文本</strong>，比如：</p>
<ul>
<li>img 图片</li>
<li>内嵌在 svg 元素内的图片</li>
<li>video 的封面图</li>
<li>background image ( 通过 <code v-pre>url()</code> 函数加载 )</li>
<li>包含文本的块级元素</li>
</ul>
<p>随着研究的深入，未来可能会添加其他元素，如 svg、video 元素本身。</p>
<h3 id="如何确定一个元素的大小" tabindex="-1"><a class="header-anchor" href="#如何确定一个元素的大小"><span>如何确定一个元素的大小</span></a></h3>
<p>元素大小通常指<strong>可视区域内可见的大小</strong>。延伸到可视区域之外、被剪裁、不可见的溢出部分不计入元素大小。</p>
<ul>
<li>图片使用原始尺寸和可见尺寸中的较小者。即缩小的图片使用显示尺寸，放大的图像使用原始尺寸。</li>
<li>文本仅考量文本节点的大小，即包含所有文本节点的最小矩形。</li>
<li>元素的 padding、margin 或 border 都不在考虑范围内。</li>
</ul>
<h3 id="何时报告-lcp" tabindex="-1"><a class="header-anchor" href="#何时报告-lcp"><span>何时报告 LCP</span></a></h3>
<p>网页通常是分阶段加载的，页面上的最大元素可能会变化。</p>
<p><strong>每次最大元素变化，浏览器都会报告一次 LCP</strong>。例如，一个文本和图片网页，最初只渲染文本，报告一次，随后图片加载完成，报告第二次。</p>
<p>注意，只有<strong>渲染完成且可见</strong>的元素才可被视为最大内容元素。加载中的图像 、字体阻塞期的文本等都不算完成渲染。</p>
<ul>
<li>动态添加 DOM 元素，且新元素大于先前的最大元素，需要报告。</li>
<li>当前最大元素从可视区域移除，除非有更大的元素渲染，否则该元素将持续作为最大元素。</li>
<li>页面 scroll 频繁改变可见区域内容，这期间浏览器不会报告 LCP。</li>
<li>出于安全考虑，缺少 <code v-pre>Timing-Allow-Origin</code> 响应头的跨域图像，渲染时间不会公开，只公开加载时间。</li>
</ul>
<h3 id="如何处理元素布局和元素大小改变" tabindex="-1"><a class="header-anchor" href="#如何处理元素布局和元素大小改变"><span>如何处理元素布局和元素大小改变</span></a></h3>
<p>出于性能考虑，<strong>元素大小和位置改变</strong>不会报告 LCP。</p>
<p>也就是说，在可视区域外渲染，然后移动到可视区域的不会报告；在可视区域内渲染，然后移出可视区域的只会报告其在可视区域的大小。</p>
<h2 id="lcp-阈值" tabindex="-1"><a class="header-anchor" href="#lcp-阈值"><span>LCP 阈值</span></a></h2>
<img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/8ZW8LQsagLih1ZZoOmMR.svg" alt="良好的 LCP 值为 2.5 秒，较差的值大于 4.0 秒，两者之间的任何东西都需要改进" width="400" class="img-mid" />
<h2 id="如何测量-lcp" tabindex="-1"><a class="header-anchor" href="#如何测量-lcp"><span>如何测量 LCP</span></a></h2>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">new</span> <span class="token class-name">PerformanceObserver</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">list</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> entry <span class="token keyword">of</span> list<span class="token punctuation">.</span><span class="token function">getEntries</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'LCP'</span><span class="token punctuation">,</span> entry<span class="token punctuation">.</span>startTime<span class="token punctuation">,</span> entry<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">observe</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'largest-contentful-paint'</span><span class="token punctuation">,</span> <span class="token literal-property property">buffered</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><h3 id="如果最大元素并非最重要元素" tabindex="-1"><a class="header-anchor" href="#如果最大元素并非最重要元素"><span>如果最大元素并非最重要元素</span></a></h3>
<p>如果页面上最重要的元素不是最大元素，可以用 <a href="https://wicg.github.io/element-timing/" target="_blank" rel="noopener noreferrer">Element Timing API <ExternalLinkIcon/></a> 进行自定义测量。</p>
<h2 id="如何改进-lcp" tabindex="-1"><a class="header-anchor" href="#如何改进-lcp"><span>如何改进 LCP</span></a></h2>
<p>LCP 主要受四个因素影响：</p>
<ul>
<li>缓慢的服务器响应速度</li>
<li>JavaScript 和 CSS 渲染阻塞</li>
<li>资源加载时间</li>
<li>客户端渲染</li>
</ul>
<p>改进 LCP 的方法。</p>
<ul>
<li><a href="https://web.dev/apply-instant-loading-with-prpl" target="_blank" rel="noopener noreferrer">使用 PRPL 模式做到即时加载<ExternalLinkIcon/></a></li>
<li><a href="https://web.dev/critical-rendering-path/" target="_blank" rel="noopener noreferrer">优化关键渲染路径<ExternalLinkIcon/></a></li>
<li><a href="https://web.dev/fast#optimize-your-css" target="_blank" rel="noopener noreferrer">优化 CSS<ExternalLinkIcon/></a></li>
<li><a href="https://web.dev/fast#optimize-your-images" target="_blank" rel="noopener noreferrer">优化图像<ExternalLinkIcon/></a></li>
<li><a href="https://web.dev/fast#optimize-web-fonts" target="_blank" rel="noopener noreferrer">优化网页字体<ExternalLinkIcon/></a></li>
<li><a href="https://web.dev/fast#optimize-your-javascript" target="_blank" rel="noopener noreferrer">优化 JavaScript<ExternalLinkIcon/></a>（针对客户端渲染的网站）</li>
</ul>
<p>深入了解如何改进 LCP 请参阅<a href="https://web.dev/optimize-lcp/" target="_blank" rel="noopener noreferrer">优化 LCP<ExternalLinkIcon/></a>。</p>
</div></template>


