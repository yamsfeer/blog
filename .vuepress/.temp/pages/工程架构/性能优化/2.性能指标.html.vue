<template><div><h1 id="性能指标" tabindex="-1"><a class="header-anchor" href="#性能指标"><span>性能指标</span></a></h1>
<h2 id="以用户为中心的性能指标" tabindex="-1"><a class="header-anchor" href="#以用户为中心的性能指标"><span>以用户为中心的性能指标</span></a></h2>
<table>
<thead>
<tr>
<th style="text-align:left">指标</th>
<th style="text-align:left">说明</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">TTFB ( Time to First Byte )</td>
<td style="text-align:left">从资源请求开始到第一个字节到达的时间</td>
</tr>
<tr>
<td style="text-align:left">FP ( First Paint )</td>
<td style="text-align:left">首次渲染的时间点</td>
</tr>
<tr>
<td style="text-align:left">FCP ( First Contenful Paint )</td>
<td style="text-align:left">首次有内容的渲染时间点</td>
</tr>
<tr>
<td style="text-align:left">LCP ( Largest Contentful Paint )</td>
<td style="text-align:left">最大的内容在可视区域内变得可见的时间点。</td>
</tr>
<tr>
<td style="text-align:left">TTI ( Time To Interactive )</td>
<td style="text-align:left">从开始加载到主要资源渲染完成，并能快速可靠响应用户输入的时间</td>
</tr>
<tr>
<td style="text-align:left">FID ( First Input Delay )</td>
<td style="text-align:left">从用户第一次与页面交互，到浏览器能对交互做出响应的时间</td>
</tr>
<tr>
<td style="text-align:left">TBT ( Total Blocking Time )</td>
<td style="text-align:left">从 FCP 到 TTI 之间所有长任务的阻塞时间之和，量化页面无法响应用户输入的时间有多久。</td>
</tr>
<tr>
<td style="text-align:left">CLS ( Cumulative Layout Shift )</td>
<td style="text-align:left">量化页面加载期间，视口中元素的移动程度。</td>
</tr>
<tr>
<td style="text-align:left">INP ( Interaction to Next Paint )</td>
<td style="text-align:left">与下一次绘制的交互，描述页面对用户输入的响应速度。</td>
</tr>
</tbody>
</table>
<h2 id="性能指标分类" tabindex="-1"><a class="header-anchor" href="#性能指标分类"><span>性能指标分类</span></a></h2>
<p>从用户体验的角度，这些指标可以分为 4 类。</p>
<table>
<thead>
<tr>
<th style="text-align:center">用户体验</th>
<th style="text-align:center">指标</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">发生了吗</td>
<td style="text-align:center">FP, FCP</td>
</tr>
<tr>
<td style="text-align:center">内容有用吗</td>
<td style="text-align:center">LCP</td>
</tr>
<tr>
<td style="text-align:center">内容可用吗</td>
<td style="text-align:center">TTI, TBT</td>
</tr>
<tr>
<td style="text-align:center">令人愉悦吗</td>
<td style="text-align:center">FID, CLS</td>
</tr>
</tbody>
</table>
<p>从指标的功能划分，可以分为 3 类。</p>
<table>
<thead>
<tr>
<th style="text-align:center">指标功能</th>
<th style="text-align:center">指标</th>
<th style="text-align:center">核心</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">加载性能</td>
<td style="text-align:center">TTFB, FCP, LCP,</td>
<td style="text-align:center">LCP</td>
</tr>
<tr>
<td style="text-align:center">交互性</td>
<td style="text-align:center">FID, INP, TBT, TTI</td>
<td style="text-align:center">FID,INP</td>
</tr>
<tr>
<td style="text-align:center">视觉稳定性</td>
<td style="text-align:center">CLS</td>
<td style="text-align:center">CLS</td>
</tr>
</tbody>
</table>
<h2 id="指标阈值" tabindex="-1"><a class="header-anchor" href="#指标阈值"><span>指标阈值</span></a></h2>
<p>指标阈值由高到低可以分为 3 个等级：Good、Needs Improvement、Poor。</p>
<p>下表列出个各个重要指标的阈值。</p>
<table>
<thead>
<tr>
<th style="text-align:center">Metric Name</th>
<th style="text-align:center">Good(ms)</th>
<th style="text-align:center">Poor(ms)</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">TTFB ( Time to First Byte )</td>
<td style="text-align:center">800</td>
<td style="text-align:center">1800</td>
</tr>
<tr>
<td style="text-align:center">FCP ( FIrst Contenful Paint )</td>
<td style="text-align:center">1800</td>
<td style="text-align:center">3000</td>
</tr>
<tr>
<td style="text-align:center">LCP ( Largest Contentful Paint )</td>
<td style="text-align:center">2500</td>
<td style="text-align:center">4000</td>
</tr>
<tr>
<td style="text-align:center">FID ( First Input Delay )</td>
<td style="text-align:center">100</td>
<td style="text-align:center">300</td>
</tr>
<tr>
<td style="text-align:center">TBT ( Total Block Time )</td>
<td style="text-align:center">300</td>
<td style="text-align:center">600</td>
</tr>
<tr>
<td style="text-align:center">TTI ( Time To Interactive )</td>
<td style="text-align:center">3800</td>
<td style="text-align:center">7300</td>
</tr>
<tr>
<td style="text-align:center">INP ( Interaction to Next Paint )</td>
<td style="text-align:center">200</td>
<td style="text-align:center">500</td>
</tr>
<tr>
<td style="text-align:center">CLS ( Cumulative Layout Shift )</td>
<td style="text-align:center">0.1</td>
<td style="text-align:center">0.25</td>
</tr>
</tbody>
</table>
<p>如果一个网站 75% 以上的页面达到&quot;良好&quot;，则该网站这项指标性能&quot;良好&quot;。</p>
<h2 id="满意度计算" tabindex="-1"><a class="header-anchor" href="#满意度计算"><span>满意度计算</span></a></h2>
<p>如果我们要对一个网站的性能进行整体评估，得到一个最终分数，各项指标所占权重如下表。</p>
<table>
<thead>
<tr>
<th style="text-align:center">Audit</th>
<th style="text-align:center">Weight</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">FCP ( First Contentful Paint )</td>
<td style="text-align:center">10%</td>
</tr>
<tr>
<td style="text-align:center">Speed Index</td>
<td style="text-align:center">10%</td>
</tr>
<tr>
<td style="text-align:center">LCP ( Largest Contentful Paint )</td>
<td style="text-align:center">25%</td>
</tr>
<tr>
<td style="text-align:center">TBT ( Total Blocking Time )</td>
<td style="text-align:center">30%</td>
</tr>
<tr>
<td style="text-align:center">CLS ( Cumulative Layout Shift )</td>
<td style="text-align:center">25%</td>
</tr>
</tbody>
</table>
<h2 id="指标测量工具" tabindex="-1"><a class="header-anchor" href="#指标测量工具"><span>指标测量工具</span></a></h2>
<p>下图列出了常见的指标测量工具。</p>
<p><img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/V00vjrHmwzljYo04f3d3.png" alt="支持各项核心 Web 指标的 Chrome 和搜索工具摘要"></p>
<h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考"><span>参考</span></a></h2>
<p><a href="https://web.dev/metrics/" target="_blank" rel="noopener noreferrer">以用户为中心的性能指标<ExternalLinkIcon/></a></p>
<p><a href="https://web.dev/vitals-tools/" target="_blank" rel="noopener noreferrer">核心 Web 指标的测量工具<ExternalLinkIcon/></a></p>
</div></template>


