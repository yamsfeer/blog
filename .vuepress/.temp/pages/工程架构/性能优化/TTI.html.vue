<template><div><h1 id="tti-可交互时间" tabindex="-1"><a class="header-anchor" href="#tti-可交互时间"><span>TTI 可交互时间</span></a></h1>
<h2 id="什么是-tti" tabindex="-1"><a class="header-anchor" href="#什么是-tti"><span>什么是 TTI</span></a></h2>
<p>TTI ( Time to Interactive ) 可交互时间，从页面开始加载，到主要资源渲染完成并能快速响应用户输入的时间。</p>
<p>具体来说，可以用以下步骤测量 TTI。</p>
<ol>
<li>从 FCP 开始</li>
<li>向右寻找至少 5 秒的安静窗口 ( 没有<a href="https://web.dev/custom-metrics/#long-tasks-api" target="_blank" rel="noopener noreferrer">长任务<ExternalLinkIcon/></a>且不超过两个正在处理的 GET 请求 )。</li>
<li>向左寻找安静窗口前的最后一个长任务，如果没有长任务，则在 FCP 处停止。</li>
<li><strong>安静窗口前最后一个长任务的结束时间就是 TTI</strong>，如果没有长任务，则 TTI 与 FCP 值相同。</li>
</ol>
<img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/WZM0n4aXah67lEyZugOT.svg" alt="显示 TTI 计算方式的页面加载时间轴" width="500" class="img-mid" />
<h3 id="为什么要优化-tti" tabindex="-1"><a class="header-anchor" href="#为什么要优化-tti"><span>为什么要优化 TTI</span></a></h3>
<p>服务端渲染 ( SSR ) 可以让页面看似具备交互性 ( 按钮在屏幕上可见 )，但实际上并不是，主线程也许正阻塞，或者 JavaScript 未完成加载。</p>
<p>当用户尝试与看似具备交互性的页面交互时，他们可能会：</p>
<ul>
<li>认为页面响应缓慢</li>
<li>认为页面已损坏，然后直接离开</li>
</ul>
<p>为避免这个问题，请将 FCP 和 TTI 之间的差值降至最低。如果难以优化，请指示当前还无法进行交互。</p>
<h2 id="tti-阈值" tabindex="-1"><a class="header-anchor" href="#tti-阈值"><span>TTI 阈值</span></a></h2>
<p><img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/TTI-acceptable-score.png" alt=""></p>
<h2 id="如何测量" tabindex="-1"><a class="header-anchor" href="#如何测量"><span>如何测量</span></a></h2>
<p>虽然 TTI 可以线上测量，但用户交互会影响 TTI，所以最好线下测量。</p>
<h2 id="如何优化-tti" tabindex="-1"><a class="header-anchor" href="#如何优化-tti"><span>如何优化 TTI</span></a></h2>
<ul>
<li><a href="https://developer.chrome.com/docs/lighthouse/performance/unminified-javascript/" target="_blank" rel="noopener noreferrer">缩小 JavaScript<ExternalLinkIcon/></a></li>
<li><a href="https://developer.chrome.com/docs/lighthouse/performance/uses-rel-preconnect/" target="_blank" rel="noopener noreferrer">预连接到所需的来源<ExternalLinkIcon/></a></li>
<li><a href="https://developer.chrome.com/docs/lighthouse/performance/uses-rel-preload/" target="_blank" rel="noopener noreferrer">预加载关键请求<ExternalLinkIcon/></a></li>
<li><a href="https://developer.chrome.com/docs/lighthouse/performance/third-party-summary/" target="_blank" rel="noopener noreferrer">减少第三方代码的影响<ExternalLinkIcon/></a></li>
<li><a href="https://developer.chrome.com/docs/lighthouse/performance/critical-request-chains/" target="_blank" rel="noopener noreferrer">最小化关键请求深度<ExternalLinkIcon/></a></li>
<li><a href="https://developer.chrome.com/docs/lighthouse/performance/bootup-time/" target="_blank" rel="noopener noreferrer">减少 JavaScript 执行时间<ExternalLinkIcon/></a></li>
<li><a href="https://developer.chrome.com/docs/lighthouse/performance/mainthread-work-breakdown/" target="_blank" rel="noopener noreferrer">最小化主线程工作<ExternalLinkIcon/></a></li>
<li><a href="https://developer.chrome.com/docs/lighthouse/performance/resource-summary/" target="_blank" rel="noopener noreferrer">保持较低的请求数和较小的传输大小<ExternalLinkIcon/></a></li>
</ul>
</div></template>


