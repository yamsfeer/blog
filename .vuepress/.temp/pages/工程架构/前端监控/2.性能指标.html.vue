<template><div><h1 id="性能指标" tabindex="-1"><a class="header-anchor" href="#性能指标"><span>性能指标</span></a></h1>
<h2 id="性能标准" tabindex="-1"><a class="header-anchor" href="#性能标准"><span>性能标准</span></a></h2>
<ul>
<li>
<p>Navigation Timing：一个文档从发起请求到加载完毕各阶段的性能消耗</p>
</li>
<li>
<p>Resource Timing：计算文档中资源的即时信息</p>
</li>
<li>
<p>Paint Timing：页面加载期间的关键时间点</p>
</li>
<li>
<p>Long Tasks API：长任务检测</p>
</li>
<li>
<p>Performance Timeline：navigation、resource、paint 等各种类型的性能计算方法</p>
</li>
</ul>
<h2 id="传统性能指标" tabindex="-1"><a class="header-anchor" href="#传统性能指标"><span>传统性能指标</span></a></h2>
<p>navigation timing</p>
<p><img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/bum9j4-20230420025053873.png" alt=""></p>
<p>navigation timing 2</p>
<p><img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/timestamp-diagram.svg" alt=""></p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token comment">// navigation timing</span>
window<span class="token punctuation">.</span>performance<span class="token punctuation">.</span>timing

<span class="token comment">// navigation timing 2</span>
window<span class="token punctuation">.</span>performance<span class="token punctuation">.</span><span class="token function">getEntriesByType</span><span class="token punctuation">(</span><span class="token string">'navigation'</span><span class="token punctuation">)</span>
</code></pre></div><div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code>window<span class="token punctuation">.</span><span class="token function">onload</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  window<span class="token punctuation">.</span>performance<span class="token punctuation">.</span><span class="token function">getEntriesByType</span><span class="token punctuation">(</span><span class="token string">'navigation'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><h2 id="以用户为中心的性能指标" tabindex="-1"><a class="header-anchor" href="#以用户为中心的性能指标"><span>以用户为中心的性能指标</span></a></h2>
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
<td style="text-align:center">FP ( First Paint ), FCP ( First Contenful Paint )</td>
</tr>
<tr>
<td style="text-align:center">内容有用吗</td>
<td style="text-align:center">FMP ( First Meanintful Paint ), SI ( Speed Index )</td>
</tr>
<tr>
<td style="text-align:center">内容可用吗</td>
<td style="text-align:center">TTI ( Time To Interactive )</td>
</tr>
<tr>
<td style="text-align:center">令人愉悦吗</td>
<td style="text-align:center">FID ( First Input Delay )</td>
</tr>
</tbody>
</table>
<ul>
<li>
<p>FP ( First Paint )</p>
<p>首次渲染的时间点</p>
</li>
<li>
<p>FCP ( First Contenful Paint )</p>
<p>首次有内容的渲染时间点</p>
</li>
<li>
<p>FMP ( First Meaningful Paint )</p>
<p>首次绘制有意义内容的时间点。</p>
<p>FMP 的计算方式：页面加载渲染过程中最大布局变动之后的时间点。</p>
<p>假定 DOM 结构变化和渲染时间点近似相同，则 FMP 的时间点为 DOM 结构变化最剧烈的时间点，DOM 结构变化的时间点可以用 <code v-pre>MutationObserver</code> 获得。</p>
<p>用 MutationObserver 监听页面整体的 DOM 变化，在回调中计算当前 DOM 树的分数，分数变化最剧烈的时刻，即为 FMP 的时间点。</p>
</li>
<li>
<p>SI ( Speed Index )</p>
<p>衡量页面可视区域加载速度</p>
</li>
<li>
<p>TTI ( Time To Interactive )</p>
<p>测量页面从开始加载到主要资源渲染完成，并能快速、可靠地响应用户输入的时间</p>
<p>TTI 是反应页面可用性的重要指标。TTI 值越小，说明用户可以更早地操作页面。</p>
<p>TTI 的计算方式比较复杂</p>
</li>
<li>
<p>FID ( First Input Delay )</p>
<p>从用户第一次与页面交互（如点击链接或按钮）到浏览器对交互做出响应的时间。</p>
<p>FID 源自 Event Timing 标准，通常情况下，Input Delay 是因为浏览器主线程忙于执行其他操作，无暇处理用户的交互操作。</p>
</li>
</ul>
<p>随着对用户体验的理解和测量能力的增强，业界提出了三个全新的性能指标：</p>
<ul>
<li>
<p>LCP ( Largest Contentful Paint )</p>
<p>最大的内容在可视区域内变得可见的时间点。</p>
</li>
<li>
<p>TBT ( Total Blocking Time )</p>
<p>量化主线程在空闲之前的繁忙程度，有助于理解在加载期间，页面无法响应用户输入的时间有多久。</p>
<p>在主线程上运行超过 50ms 的任务称为长任务，超出 50ms 的时间算作任务的阻塞时间。</p>
<p>一个页面的 TBT 是从 FCP 到 TTI 之间所有长任务的阻塞时间之和。</p>
</li>
<li>
<p>CLS ( Cumulative Layout Shift )</p>
<p>量化页面加载期间，视口中元素的移动程度。</p>
</li>
</ul>
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
<td style="text-align:center">FP ( First Paint ), FCP ( FIrst Contenful Paint )</td>
</tr>
<tr>
<td style="text-align:center">内容有用吗</td>
<td style="text-align:center">FMP ( First Meanintful Paint ), SI ( Speed Index ), LCP ( Largest Contentful Paint )</td>
</tr>
<tr>
<td style="text-align:center">内容可用吗</td>
<td style="text-align:center">TTI ( Time To Interactive ), TBT ( Total Blocking Time )</td>
</tr>
<tr>
<td style="text-align:center">令人愉悦吗</td>
<td style="text-align:center">FID ( First Input Delay ), CLS ( Cumulative Layout Shift )</td>
</tr>
</tbody>
</table>
<h2 id="根据性能指标衡量站点满意度" tabindex="-1"><a class="header-anchor" href="#根据性能指标衡量站点满意度"><span>根据性能指标衡量站点满意度</span></a></h2>
<table>
<thead>
<tr>
<th>Metric Name</th>
<th>Good(ms)</th>
<th style="text-align:center">Needs Improvement(ms)</th>
<th style="text-align:center">Poor(ms)</th>
</tr>
</thead>
<tbody>
<tr>
<td>FP ( First Paint )</td>
<td>0 ~ 1000</td>
<td style="text-align:center">1000 ~ 2500</td>
<td style="text-align:center">Over 2500</td>
</tr>
<tr>
<td>FCP ( FIrst Contenful Paint )</td>
<td>0 ~ 1800</td>
<td style="text-align:center">1800 ~ 3000</td>
<td style="text-align:center">Over 3000</td>
</tr>
<tr>
<td>LCP ( Largest Contentful Paint )</td>
<td>0 ~ 2500</td>
<td style="text-align:center">2500~4000</td>
<td style="text-align:center">Over 4000</td>
</tr>
<tr>
<td>TTI ( Time To Interactive )</td>
<td>0 ~ 3800</td>
<td style="text-align:center">3800~7300</td>
<td style="text-align:center">Over 7300</td>
</tr>
<tr>
<td>FID ( First Input Delay )</td>
<td>0 ~ 100</td>
<td style="text-align:center">100~300</td>
<td style="text-align:center">Over 300</td>
</tr>
<tr>
<td>CLS ( Cumulative Layout Shift )</td>
<td>0 ~ 0.1</td>
<td style="text-align:center">0.1~0.25</td>
<td style="text-align:center">Over 0.25</td>
</tr>
</tbody>
</table>
<ul>
<li>经过测试，LCP 非常近似于 FMP，可以用 LCP 取代 FMP</li>
<li>SI 的计算比较复杂，且更常用于 lighthouse 而非线上监控</li>
<li>用户交互会影响 TBT 的结果，从而导致报告中出现大量差异，线上监控推荐使用  FID</li>
</ul>
</div></template>


