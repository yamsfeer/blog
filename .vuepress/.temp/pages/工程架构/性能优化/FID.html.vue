<template><div><h1 id="fid-首次输入延迟" tabindex="-1"><a class="header-anchor" href="#fid-首次输入延迟"><span>FID 首次输入延迟</span></a></h1>
<h2 id="什么是-fid" tabindex="-1"><a class="header-anchor" href="#什么是-fid"><span>什么是 FID</span></a></h2>
<p>FID ( First Input Delay ) 首次输入延迟，从用户第一次与页面交互，到浏览器能开始处理的时间。</p>
<h2 id="什么是输入延迟" tabindex="-1"><a class="header-anchor" href="#什么是输入延迟"><span>什么是输入延迟</span></a></h2>
<p>下图是一个典型的网页加载时间轴：</p>
<p><img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/9tm3f6pwlHMqNKuFvaP0.svg" alt="示例页面加载跟踪"></p>
<p>页面发出网络资源请求，资源下载完后，在主线程上进行处理 ( 图中黄色块 )，此时主线程处于忙碌状态，无法响应用户输入，因而产生输入延迟 ( input delay )。</p>
<p>FID 通常发生在 FCP 和 TTI 之间，因为在这期间，页面已经渲染出部分内容，但交互还不可靠。</p>
<p>为了说明这种情况，我们在时间轴中加入 FCP 和 TTI。</p>
<p><img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/24Y3T5sWNuZD9fKhkuER.svg" alt="带有 FCP 和 TTI 的示例页面加载跟踪"></p>
<p>图中 FCP 和 TTI 之间有三段长任务 ( 执行时间超过 50ms )，假设用户在最长的任务刚开始时交互，就会产生如下图所示的 input delay。</p>
<p><img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/krOoeuQ4TWCbt9t6v5Wf.svg" alt="带有 FCP、TTI 和 FID 的示例页面加载跟踪"></p>
<h3 id="如果交互没有事件监听器" tabindex="-1"><a class="header-anchor" href="#如果交互没有事件监听器"><span>如果交互没有事件监听器</span></a></h3>
<p>FID 测量的是 input 的时间点到主线程下一次空闲的时间点的差值。也就是说，即使没有注册监听器，FID 也可以测量。</p>
<p>事实上，许多交互的执行并不需要监听器，但需要主线程处于空闲期。例如，input、textarea、select 等元素都需要主线程空闲才能响应。</p>
<h3 id="为什么只考虑首次输入" tabindex="-1"><a class="header-anchor" href="#为什么只考虑首次输入"><span>为什么只考虑首次输入</span></a></h3>
<p>FID 是用户对网站响应速度的第一印象，这对于塑造整体印象至关重要。</p>
<h3 id="fid-的输入类型" tabindex="-1"><a class="header-anchor" href="#fid-的输入类型"><span>FID 的输入类型</span></a></h3>
<p>FID 只关注 click、tap 和 keystroke 等不连续的操作，不关心 scroll 和 resize 等连续操作。</p>
<p>换句话说，FID 侧重于 <a href="https://web.dev/rail/" target="_blank" rel="noopener noreferrer">RAIL 性能模型<ExternalLinkIcon/></a>中的 R ( 响应度 )，而 scroll 和 resize 与 A ( 动画 ) 更为相关，这些操作的性能应该单独进行评估。</p>
<h2 id="fid-阈值" tabindex="-1"><a class="header-anchor" href="#fid-阈值"><span>FID 阈值</span></a></h2>
<img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/Se4TiXIdp8jtLJVScWed.svg" alt="好的 fid 值为 2.5 秒，差的值大于 4.0 秒，中间的任何值都需要改进" width="400" class="img-mid" />
<h2 id="如何测量-fid" tabindex="-1"><a class="header-anchor" href="#如何测量-fid"><span>如何测量 FID</span></a></h2>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">new</span> <span class="token class-name">PerformanceObserver</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">list<span class="token punctuation">,</span> obs</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token punctuation">[</span>firstInput<span class="token punctuation">]</span> <span class="token operator">=</span> list<span class="token punctuation">.</span><span class="token function">getEntries</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token keyword">const</span> firstInputDelay <span class="token operator">=</span> firstInput<span class="token punctuation">.</span>processingStart <span class="token operator">-</span> firstInput<span class="token punctuation">.</span>startTime
  <span class="token keyword">const</span> firstInputDuration <span class="token operator">=</span> firstInput<span class="token punctuation">.</span>duration

  obs<span class="token punctuation">.</span><span class="token function">disconnect</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">observe</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'first-input'</span><span class="token punctuation">,</span> <span class="token literal-property property">buffered</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><h2 id="如何改进-fid" tabindex="-1"><a class="header-anchor" href="#如何改进-fid"><span>如何改进 FID</span></a></h2>
<p>改进 FID 方法：</p>
<ul>
<li><a href="https://developer.chrome.com/docs/lighthouse/performance/third-party-summary/" target="_blank" rel="noopener noreferrer">减少第三方代码的影响<ExternalLinkIcon/></a></li>
<li><a href="https://developer.chrome.com/docs/lighthouse/performance/bootup-time/" target="_blank" rel="noopener noreferrer">减少 JavaScript 执行时间<ExternalLinkIcon/></a></li>
<li><a href="https://developer.chrome.com/docs/lighthouse/performance/mainthread-work-breakdown/" target="_blank" rel="noopener noreferrer">最小化主线程工作<ExternalLinkIcon/></a></li>
<li><a href="https://developer.chrome.com/docs/lighthouse/performance/resource-summary/" target="_blank" rel="noopener noreferrer">保持较低的请求数和较小的传输大小<ExternalLinkIcon/></a></li>
</ul>
<p>深入了解如何改进 FID 请参阅<a href="https://web.dev/optimize-fid/" target="_blank" rel="noopener noreferrer">优化 FID<ExternalLinkIcon/></a>。</p>
</div></template>


