<template><div><h1 id="性能优化" tabindex="-1"><a class="header-anchor" href="#性能优化"><span>性能优化</span></a></h1>
<h2 id="按传统指标优化" tabindex="-1"><a class="header-anchor" href="#按传统指标优化"><span>按传统指标优化</span></a></h2>
<h3 id="网络优化" tabindex="-1"><a class="header-anchor" href="#网络优化"><span>网络优化</span></a></h3>
<ul>
<li>
<p>使用 http2</p>
<p>兼容性：当浏览器不支持 http2 时，要降级</p>
<p>早期浏览器会限制同一个域名下的并发请求连接数，因此以前可以将资源放在不同的域名下，但在 http2 中，为了支持多路复用，反而应该放在同一域名下。</p>
</li>
<li>
<p>开启 brotli 压缩</p>
<div class="language-http" data-ext="http" data-title="http"><pre v-pre class="language-http"><code><span class="token header"><span class="token header-name keyword">accept-encoding</span><span class="token punctuation">:</span> <span class="token header-value">gzip,deflate,br</span></span>
</code></pre></div><p>与 gzip 相比，brotli 压缩具有更高的压缩比和压缩速度。</p>
</li>
<li>
<p>使用 https</p>
<p>优化手段：如 session resume、OCSP stapling 等可以提升 https 性能</p>
</li>
<li>
<p>CDN 部署静态资源</p>
</li>
<li>
<p>DNS 预解析</p>
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>dns-prefetch<span class="token punctuation">"</span></span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>xx.com<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
</code></pre></div></li>
<li>
<p>提前建立网络连接</p>
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>preconnect<span class="token punctuation">"</span></span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>xx.com<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
</code></pre></div></li>
</ul>
<h3 id="缓存优化" tabindex="-1"><a class="header-anchor" href="#缓存优化"><span>缓存优化</span></a></h3>
<div class="language-text" data-ext="text" data-title="text"><pre v-pre class="language-text"><code>memory cache
cache api
http cache 强缓存与协商缓存
push cache
server
</code></pre></div><h3 id="资源加载优化" tabindex="-1"><a class="header-anchor" href="#资源加载优化"><span>资源加载优化</span></a></h3>
<p>主要有请求时机、文件体积、加载方式等方向。</p>
<ul>
<li>
<p>html</p>
<ul>
<li>控制体积在 30kb 以内</li>
<li>优化 dom 节点</li>
<li>压缩</li>
<li>减少内联</li>
</ul>
</li>
<li>
<p>css、字体、图片</p>
<ul>
<li>关键的先请求</li>
<li>减小文件体积</li>
<li>减少请求数、使用缓存</li>
</ul>
</li>
<li>
<p>js</p>
<ul>
<li>defer、async、动态加载</li>
<li>压缩、tree shaking、按需加载、控制 polyfill</li>
<li>打包、利用缓存</li>
</ul>
</li>
</ul>
<h2 id="按用户指标" tabindex="-1"><a class="header-anchor" href="#按用户指标"><span>按用户指标</span></a></h2>
<h3 id="优化-fp-fcp" tabindex="-1"><a class="header-anchor" href="#优化-fp-fcp"><span>优化 FP / FCP</span></a></h3>
<p>尽快渲染、提高加载、解析、渲染速度。</p>
<h3 id="fmp-和-lcp" tabindex="-1"><a class="header-anchor" href="#fmp-和-lcp"><span>FMP 和 LCP</span></a></h3>
<p>影响 LCP 的元素类型为 img、内嵌在 SVG 中的 image、video、url 函数加载的背景图像</p>
<p>缩短页面关键路径的渲染时间</p>
<p>主要受四个因素影响：</p>
<ul>
<li>
<p>缓慢的服务器响应速度</p>
<p>网络优化：http2、CDN、DNS 与解析、提前建立网络连接。。</p>
</li>
<li>
<p>JS 和 CSS 渲染阻塞</p>
<p>减少 CSS、延迟加载非关键 CSS、内联关键 CSS、</p>
<p>减少压缩 JS、延迟加载未使用的 JS 文件、最大限度减少未使用的 polyfill</p>
</li>
<li>
<p>资源加载时间</p>
<p>优化、压缩图片、预加载重要资源、压缩文本文件</p>
</li>
<li>
<p>客户端渲染</p>
<p>最小化关键 JS、使用服务端渲染、预渲染</p>
</li>
</ul>
<h3 id="fid" tabindex="-1"><a class="header-anchor" href="#fid"><span>FID</span></a></h3>
<ul>
<li>分割长任务</li>
<li>优化页面、尽快做好交互准备
<ul>
<li>移除关键路径上非必要组件加载的脚本</li>
<li>按需加载第三方代码</li>
<li>优先加载可以为用户提供最大价值的内容</li>
</ul>
</li>
<li>使用 Web Worker</li>
<li>减少 JS 执行时间</li>
</ul>
<h3 id="cls" tabindex="-1"><a class="header-anchor" href="#cls"><span>CLS</span></a></h3>
<p>减少布局偏移</p>
<ul>
<li>
<p>无尺寸图像</p>
<p>设置长宽或使用 CSS 容器预留所需空间</p>
</li>
<li>
<p>无尺寸广告、嵌入、iframe</p>
<p>预留空间、避免在可视区域顶部放置广告，使用占位符</p>
</li>
<li>
<p>动态注入的内容</p>
<p>预留空间，比如占位符或骨架屏</p>
</li>
<li>
<p>网络字体会导致不可见文本闪烁（FOIT）/ 无样式文本闪烁（FOUT）</p>
</li>
<li>
<p>更新 DOM 前等待网络响应的操作</p>
<p>使用 transform 动画</p>
</li>
</ul>
<h3 id="tti" tabindex="-1"><a class="header-anchor" href="#tti"><span>TTI</span></a></h3>
<p>尽快渲染、尽早请求、避免长任务</p>
<ul>
<li>预加载关键请求</li>
<li>最小化请求深度</li>
<li>减少 JS 执行时间</li>
<li>最小化主线程工作</li>
<li>保持较低请求数和传输大小</li>
</ul>
</div></template>


