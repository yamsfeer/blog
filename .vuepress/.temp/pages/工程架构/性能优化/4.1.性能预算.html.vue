<template><div><h1 id="性能预算-performance-budgets" tabindex="-1"><a class="header-anchor" href="#性能预算-performance-budgets"><span>性能预算 ( Performance budgets )</span></a></h1>
<h2 id="什么是性能预算" tabindex="-1"><a class="header-anchor" href="#什么是性能预算"><span>什么是性能预算</span></a></h2>
<p>性能预算是针对影响性能的因素的一系列限制。比如页面大小、加载时间，HTTP 请求数等。</p>
<p>性能预算的指标大概有以下 3 个方向：</p>
<ul>
<li>
<p>基于资源数量</p>
<p>常见的资源数量上的性能预算指标有：</p>
<ul>
<li>图片的最大尺寸</li>
<li>网页字体的最大数量</li>
<li>脚本的最大大小</li>
<li>第三方脚本总数</li>
</ul>
</li>
<li>
<p>基于性能指标</p>
<p>以用户为中心的性能指标如 LCP、FID、CLS 等，各指标的 &quot;Good&quot; 阈值可以用作性能预算。</p>
</li>
<li>
<p>基于性能分析工具的规则</p>
<p><a href="https://developer.chrome.com/docs/lighthouse/overview/" target="_blank" rel="noopener noreferrer">Lighthouse<ExternalLinkIcon/></a>、<a href="https://www.webpagetest.org/" target="_blank" rel="noopener noreferrer">webpagetest<ExternalLinkIcon/></a> 等工具会根据最佳实践计算性能分数，这个分数可以用作性能预算。</p>
</li>
</ul>
<p>一个可靠的性能预算应结合不同类型的指标。综合以上 3 种类型，一个可能的性能预算大概是这样的：</p>
<ul>
<li>在移动端，产品页面必须包含少于 170KB 的 JavaScript</li>
<li>在桌面端，搜索页面必须包含少于 2MB 的图片</li>
<li>主页必须在慢速 3G 环境下在小于 5 秒内加载并交互</li>
<li>在 Lighthouse 中的得分必须大于 80 分</li>
</ul>
<p>有了性能预算，在构建过程中，我们还需要检验是否超出预算，具体可以使用以下工具。</p>
<ul>
<li><a href="https://webpack.js.org/configuration/performance/" target="_blank" rel="noopener noreferrer">Webpack performance features<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/siddharthkp/bundlesize" target="_blank" rel="noopener noreferrer">bundlesize<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/GoogleChrome/lighthouse-ci" target="_blank" rel="noopener noreferrer">Lighthouse CI<ExternalLinkIcon/></a></li>
</ul>
<p>以 webpack 为例，在 webpack.config.js 中添加如下配置。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">performance</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">maxAssetSize</span><span class="token operator">:</span> <span class="token number">100000</span><span class="token punctuation">,</span> <span class="token comment">// 单个资源体积不超过 100000 字节</span>
    <span class="token literal-property property">maxEntrypointSize</span><span class="token operator">:</span> <span class="token number">400000</span><span class="token punctuation">,</span> <span class="token comment">// 单个入口打包的 bundle 不超过 400000 字节</span>
    <span class="token literal-property property">hints</span><span class="token operator">:</span> <span class="token string">"warning"</span> <span class="token comment">// 超出预算时，webpack 抛出一个错误或警告</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="规划性能预算的例子" tabindex="-1"><a class="header-anchor" href="#规划性能预算的例子"><span>规划性能预算的例子</span></a></h2>
<p>假设我们要对 Doggos.com 这个网站提出性能预算。</p>
<h3 id="初步分析" tabindex="-1"><a class="header-anchor" href="#初步分析"><span>初步分析</span></a></h3>
<p>初步分析主要有以下两步：</p>
<ol>
<li>确定最重要的页面，例如，主页或用户流量最大的页面。</li>
<li>确定最能衡量用户体验的性能指标，比如 FCP 和 TTI</li>
</ol>
<p>桌面端各项指标数据如下。</p>
<table>
<thead>
<tr>
<th style="text-align:left">Desktop</th>
<th style="text-align:left">FCP</th>
<th style="text-align:left">TTI</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">Homepage</td>
<td style="text-align:left">1,680 ms</td>
<td style="text-align:left">5,550 ms</td>
</tr>
<tr>
<td style="text-align:left">Results page</td>
<td style="text-align:left">2,060 ms</td>
<td style="text-align:left">6,690 ms</td>
</tr>
</tbody>
</table>
<p>移动端各项指标数据如下。</p>
<table>
<thead>
<tr>
<th style="text-align:left">Mobile</th>
<th style="text-align:left">FCP</th>
<th style="text-align:left">TTI</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">Homepage</td>
<td style="text-align:left">1,800 ms</td>
<td style="text-align:left">6,150 ms</td>
</tr>
<tr>
<td style="text-align:left">Results page</td>
<td style="text-align:left">1,100 ms</td>
<td style="text-align:left">7,870 ms</td>
</tr>
</tbody>
</table>
<h3 id="竞品分析" tabindex="-1"><a class="header-anchor" href="#竞品分析"><span>竞品分析</span></a></h3>
<p>初步分析完自己的网站后，就该分析竞争对手的网站了。</p>
<p>和类似的网站的比较是计算性能预算的好方法。为了解实际情况，请尝试寻找 10 个左右的竞争对手。</p>
<p>如果你不知道自己的竞争对手有哪些，可以用以下工具：</p>
<ul>
<li>在 google 搜索中输入 <code v-pre>related:</code> 关键字</li>
<li><a href="https://www.similarweb.com/" target="_blank" rel="noopener noreferrer">SimilarWeb<ExternalLinkIcon/></a></li>
</ul>
<h3 id="基于性能指标" tabindex="-1"><a class="header-anchor" href="#基于性能指标"><span>基于性能指标</span></a></h3>
<p>假设我们针对移动端下的主页做分析。</p>
<p>将所有竞争对手的性能数据用表格列出，并找出其中最优的竞争对手。</p>
<table>
<thead>
<tr>
<th style="text-align:left">Site/Homepage</th>
<th style="text-align:left">FCP</th>
<th style="text-align:left">TTI</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">goggles.com</td>
<td style="text-align:left"><strong>880 ms</strong></td>
<td style="text-align:left"><strong>3,150 ms ( fastest )</strong></td>
</tr>
<tr>
<td style="text-align:left">Doggos.com</td>
<td style="text-align:left">1,800 ms</td>
<td style="text-align:left">6,500 ms</td>
</tr>
<tr>
<td style="text-align:left">quackquackgo.com</td>
<td style="text-align:left">2,680 ms</td>
<td style="text-align:left">4,740 ms</td>
</tr>
<tr>
<td style="text-align:left">ding.xyz</td>
<td style="text-align:left">2,420 ms</td>
<td style="text-align:left">7,040 ms</td>
</tr>
</tbody>
</table>
<p>可以看到，在移动端，goggles.com 主页的 FCP 和 TTI 是最快的。</p>
<p>研究表明，当响应时间的差异大于 20% 时，用户就能识别出来。因此你至少需要快 20%。</p>
<table>
<thead>
<tr>
<th style="text-align:left">Measure</th>
<th style="text-align:left">Current time</th>
<th style="text-align:left">Budget (20% faster than competition)</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">FCP</td>
<td style="text-align:left">1,800 ms</td>
<td style="text-align:left">704 ms</td>
</tr>
<tr>
<td style="text-align:left">TTI</td>
<td style="text-align:left">6,500 ms</td>
<td style="text-align:left">2,520 ms</td>
</tr>
</tbody>
</table>
<p>一次性超过对手 20% 也许并不容易，我们可以先将预算设定为比自己速度快20%，在此基础上继续优化。</p>
<p>最终，修订后的预算可以是这样的。</p>
<table>
<thead>
<tr>
<th style="text-align:left">Measure</th>
<th style="text-align:left">Current time</th>
<th style="text-align:left">Initial budget (20% faster than the current time)</th>
<th style="text-align:left">Long-term goal (20% faster than competition)</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">FCP</td>
<td style="text-align:left">1,800 ms</td>
<td style="text-align:left">1,440 ms</td>
<td style="text-align:left">704 ms</td>
</tr>
<tr>
<td style="text-align:left">TTI</td>
<td style="text-align:left">6,500 ms</td>
<td style="text-align:left">5,200 ms</td>
<td style="text-align:left">2,520 ms</td>
</tr>
</tbody>
</table>
<h3 id="基于资源数量" tabindex="-1"><a class="header-anchor" href="#基于资源数量"><span>基于资源数量</span></a></h3>
<p>下面是一个 TTI 预算的例子：</p>
<table>
<thead>
<tr>
<th style="text-align:left">Network</th>
<th style="text-align:left">Device</th>
<th style="text-align:left">JS</th>
<th style="text-align:left">Images</th>
<th style="text-align:left">CSS</th>
<th style="text-align:left">HTML</th>
<th style="text-align:left">Fonts</th>
<th style="text-align:left">Total</th>
<th style="text-align:left">TTI budget</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">Slow 3G</td>
<td style="text-align:left">Moto G4</td>
<td style="text-align:left">100</td>
<td style="text-align:left">30</td>
<td style="text-align:left">10</td>
<td style="text-align:left">10</td>
<td style="text-align:left">20</td>
<td style="text-align:left">~170KB</td>
<td style="text-align:left">5s</td>
</tr>
<tr>
<td style="text-align:left">Slow 4G</td>
<td style="text-align:left">Moto G4</td>
<td style="text-align:left">200</td>
<td style="text-align:left">50</td>
<td style="text-align:left">35</td>
<td style="text-align:left">30</td>
<td style="text-align:left">30</td>
<td style="text-align:left">~345KB</td>
<td style="text-align:left">3s</td>
</tr>
<tr>
<td style="text-align:left">WiFi</td>
<td style="text-align:left">Desktop</td>
<td style="text-align:left">300</td>
<td style="text-align:left">250</td>
<td style="text-align:left">50</td>
<td style="text-align:left">50</td>
<td style="text-align:left">100</td>
<td style="text-align:left">~750KB</td>
<td style="text-align:left">2s</td>
</tr>
</tbody>
</table>
<p>当关键资源低于 170KB，将保证网站即使在慢速 3G 网络上也能快速运行。</p>
<p>根据 <a href="https://httparchive.org/reports/page-weight" target="_blank" rel="noopener noreferrer">http archive<ExternalLinkIcon/></a> 数据，移动端和桌面端的 page weight 中位数都超过了 1MB。要想性能更优，你的目标必须远低于中位数。</p>
<p>事实上，带有大量图片的网站和以文字为主的网站是截然不同的，资源数量的预算需要根据情况而定。</p>
<h3 id="基于性能分析工具的规则" tabindex="-1"><a class="header-anchor" href="#基于性能分析工具的规则"><span>基于性能分析工具的规则</span></a></h3>
<p>一个优秀网站的 Lighthouse 性能评分预算至少为 85 分 ( 满分 100 分 )。</p>
<h3 id="优先级" tabindex="-1"><a class="header-anchor" href="#优先级"><span>优先级</span></a></h3>
<p>不同类型的网站的性能预算有不同的着重点和优先级。</p>
<p>对于新闻网站，用户的主要目标是阅读内容，因此需要较低的 FCP。Doggos.com 的访问者希望尽快点击相关链接，因此首要任务是降低 TTI。</p>
<p>通过 <a href="https://developer.chrome.com/blog/chrome-ux-report-looker-studio-dashboard/" target="_blank" rel="noopener noreferrer">Chrome用户体验报告<ExternalLinkIcon/></a> 可以查看网站的用户情况，从而根据数据制定不同的优先级。</p>
<img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/ycZwOrFNzjdjquriM9rJ.png" style="zoom:45%;" />
<h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考"><span>参考</span></a></h2>
<p><a href="https://web.dev/performance-budgets-101/" target="_blank" rel="noopener noreferrer">performance-budgets-101<ExternalLinkIcon/></a></p>
<p><a href="https://web.dev/your-first-performance-budget/" target="_blank" rel="noopener noreferrer">your-first-performance-budget<ExternalLinkIcon/></a></p>
</div></template>


