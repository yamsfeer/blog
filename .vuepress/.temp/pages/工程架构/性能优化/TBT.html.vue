<template><div><h1 id="tbt-总阻塞时间" tabindex="-1"><a class="header-anchor" href="#tbt-总阻塞时间"><span>TBT 总阻塞时间</span></a></h1>
<p>主线程上运行超过 50ms 的任务称为长任务，超出 50ms 的部分称为任务的阻塞时间。</p>
<p>TBT ( Total Blocking Time ) 总阻塞时间，FCP 到 TTI 之间，所有长任务的阻塞时间之和。</p>
<h2 id="什么是-tbt" tabindex="-1"><a class="header-anchor" href="#什么是-tbt"><span>什么是 TBT</span></a></h2>
<p>执行长任务时，主线程处于<strong>阻塞状态</strong>。在阻塞状态下交互，浏览器必须等到任务完成后才能作出响应。响应时间超过 50ms，用户就会感到卡顿。</p>
<p>下图是一个页面加载期间主线程的时间轴：</p>
<p><img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/clHG8Yv239lXsGWD6Iu6.svg" alt="主线程上的任务时间轴"></p>
<p>如图所示，有 5 个任务，其中 3 个是长任务，它们的阻塞时间如下图：</p>
<p><img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/xKxwKagiz8RliuOI2Xtc.svg" alt="显示阻塞时间的主线程任务时间轴"></p>
<p>可见，执行任务的时间为 560ms，其中阻塞时间为 345ms。</p>
<h3 id="tbt-与-tti-有什么关系" tabindex="-1"><a class="header-anchor" href="#tbt-与-tti-有什么关系"><span>TBT 与 TTI 有什么关系</span></a></h3>
<p>TTI 描述的是页面可交互需要多少时间，TBT 描述的是 TTI 之前，不可交互的程度。</p>
<p>举个例子，TTI 认为当主线程连续 5s 没有长任务时，页面可交互。10s 里的 3 个 51ms 长任务与 1 个 10s 长任务的 TTI 是相同的。但对用户来说，两种使用体验是截然不同的。第一种情况下，TBT 为 3ms；第二种的 TBT 为 9950ms。</p>
<h2 id="tbt-阈值" tabindex="-1"><a class="header-anchor" href="#tbt-阈值"><span>TBT 阈值</span></a></h2>
<p><img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/tbt_ux.svg" alt="TBT"></p>
<h2 id="如何测量-tbt" tabindex="-1"><a class="header-anchor" href="#如何测量-tbt"><span>如何测量 TBT</span></a></h2>
<p>TBT 可以线上测量，但用户交互会影响 TBT，所以最好线下测量。</p>
<h2 id="如何改进-tbt" tabindex="-1"><a class="header-anchor" href="#如何改进-tbt"><span>如何改进 TBT</span></a></h2>
<ul>
<li><a href="https://developer.chrome.com/docs/lighthouse/performance/third-party-summary/" target="_blank" rel="noopener noreferrer">减少第三方代码的影响<ExternalLinkIcon/></a></li>
<li><a href="https://developer.chrome.com/docs/lighthouse/performance/bootup-time/" target="_blank" rel="noopener noreferrer">减少 JavaScript 执行时间<ExternalLinkIcon/></a></li>
<li><a href="https://developer.chrome.com/docs/lighthouse/performance/mainthread-work-breakdown/" target="_blank" rel="noopener noreferrer">最小化主线程工作<ExternalLinkIcon/></a></li>
<li><a href="https://developer.chrome.com/docs/lighthouse/performance/resource-summary/" target="_blank" rel="noopener noreferrer">保持较低的请求数和较小的传输大小<ExternalLinkIcon/></a></li>
</ul>
</div></template>


