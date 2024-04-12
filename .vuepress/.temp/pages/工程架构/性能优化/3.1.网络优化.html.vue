<template><div><h1 id="网络优化" tabindex="-1"><a class="header-anchor" href="#网络优化"><span>网络优化</span></a></h1>
<h2 id="http2" tabindex="-1"><a class="header-anchor" href="#http2"><span>http2</span></a></h2>
<h3 id="http2-并发" tabindex="-1"><a class="header-anchor" href="#http2-并发"><span>http2 并发</span></a></h3>
<p>浏览器在同一时间对同一域名下的资源的并发请求数是有限的，一般在 2-6 之间，超过限制数的请求会被阻塞，chrome 对 HTTP1.1 最大并发连接数为 6。</p>
<p>http2 一个站点只有一个连接。每个请求为一个流，每个请求被分为多个二进制帧，不同流中的帧可以交错的发送，实现多路复用。这解决了连接数限制的问题。</p>
<h3 id="http2-推送" tabindex="-1"><a class="header-anchor" href="#http2-推送"><span>http2 推送</span></a></h3>
<p>http2 的 Server Push 允许开发者将 HTML 文件与特定资产一起推送给客户端。</p>
<p>传统上，客户端最初会收到 HTML 文件，并解析以确定接下来需要哪些资产，然后进一步向服务器提出请求。启用 push 后，服务器可以在客户端开始解析 HTML 之前主动推送已知需要的资产。</p>
<p>假设有 index.html 和 style.css 两个文件，传统上浏览器会先请求 index.html，解析后再请求 style.css。既然无论如何都会请求 style.css，我们让服务器在发送 index.html 同时推送 style.css。</p>
<h3 id="https" tabindex="-1"><a class="header-anchor" href="#https"><span>https</span></a></h3>
<p>https 相关的优化手段：</p>
<ul>
<li>session resume</li>
<li>OCSP stapling</li>
</ul>
<h2 id="preconnect" tabindex="-1"><a class="header-anchor" href="#preconnect"><span>preconnect</span></a></h2>
<p>网页下载资源，需要经过 dns 解析，建立连接，下载文件等阶段。</p>
<p>提前建立网络连接可以减少资源下载所需时间。</p>
<img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/image-20230717183553759.png" alt="image-20230717183553759" style="zoom:50%;" />
<p>通过 link 元素可以提前建立连接。</p>
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>preconnect<span class="token punctuation">"</span></span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://example.com<span class="token punctuation">"</span></span><span class="token punctuation">></span></span> 
</code></pre></div><p>需要注意的是：</p>
<ul>
<li>preconnect 只是对浏览器的提示，并不是强制性说明，它们最终由浏览器决定是否执行。</li>
<li>preconnect 仅对第三方域有效。</li>
<li>浏览器会关闭 10 秒内未使用的连接，不必要的连接可能会延迟其他重要资源</li>
</ul>
<p>因此，建议<strong>只预连接关键域</strong>。</p>
<h3 id="http-preconnect" tabindex="-1"><a class="header-anchor" href="#http-preconnect"><span>http preconnect</span></a></h3>
<p>除了 link 元素，我们还可以用在 http header 中提示预连接。</p>
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code>Link: &lt;https://example.com/>; rel=preconnect
</code></pre></div><p>在 http 中指定预连接的好处是，它不依赖于标记解析，而且可以由样式表、脚本等请求触发。例如，Google Fonts 会在样式表响应中发送一个 Link，以预连接到托管字体文件的域。</p>
<h3 id="crossorigin" tabindex="-1"><a class="header-anchor" href="#crossorigin"><span>crossorigin</span></a></h3>
<p>字体文件是以匿名模式加载的，这类资源的 preconnect 需要设置 crossorigin 属性。</p>
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>preconnect<span class="token punctuation">"</span></span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://example.com/fonts<span class="token punctuation">"</span></span> <span class="token attr-name">crossorigin</span><span class="token punctuation">></span></span>
</code></pre></div><p>如果省略crossorigin属性，浏览器将仅执行 DNS 查询。</p>
<h2 id="dns-prefetch" tabindex="-1"><a class="header-anchor" href="#dns-prefetch"><span>DNS prefetch</span></a></h2>
<p>如果一个页面需要与许多第三方域建立连接，preconnect 所有域将适得其反。</p>
<p>前面提到过，preconnect 最好只用于最关键的连接，其他连接请用 dns-prefetch 节省 DNS 时间。</p>
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>dns-prefetch<span class="token punctuation">"</span></span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://example.com<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
</code></pre></div><p>浏览器对 dns-prefetch 与 preconnect 的支持略有不同，因此 dns-prefetch 可作为不支持 preconnect 的浏览器的备用方案。</p>
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>preconnect<span class="token punctuation">"</span></span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://example.com<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>dns-prefetch<span class="token punctuation">"</span></span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://example.com<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
</code></pre></div><h2 id="brotil-压缩" tabindex="-1"><a class="header-anchor" href="#brotil-压缩"><span>brotil 压缩</span></a></h2>
<p>brotil 是一种新的压缩算法。与 gzip 相比，brotli 具有更高的压缩比和压缩速度。</p>
<ul>
<li>14% smaller than <code v-pre>gzip</code> for JavaScript</li>
<li>21% smaller than <code v-pre>gzip</code> for HTML</li>
<li>17% smaller than <code v-pre>gzip</code> for CSS</li>
</ul>
<p>在 http header 中表示启用 brotil 压缩。</p>
<div class="language-http" data-ext="http" data-title="http"><pre v-pre class="language-http"><code><span class="token header"><span class="token header-name keyword">Accept-Encoding</span><span class="token punctuation">:</span> <span class="token header-value">gzip, deflate, br</span></span>
</code></pre></div><h2 id="cdn" tabindex="-1"><a class="header-anchor" href="#cdn"><span>CDN</span></a></h2>
<p>用 CDN 部署图片等静态资源。</p>
<h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考"><span>参考</span></a></h2>
<p><a href="https://www.cnblogs.com/jiujuan/p/16939688.html" target="_blank" rel="noopener noreferrer">HTTP2协议长文详解<ExternalLinkIcon/></a></p>
<p><a href="https://zhuanlan.zhihu.com/p/431672713" target="_blank" rel="noopener noreferrer">深入剖析HTTP3协议<ExternalLinkIcon/></a></p>
<p><a href="https://web.dev/preconnect-and-dns-prefetch/" target="_blank" rel="noopener noreferrer">Establish network connections early to improve perceived page speed<ExternalLinkIcon/></a></p>
<p><a href="https://web.dev/content-delivery-networks/" target="_blank" rel="noopener noreferrer">Content delivery networks (CDNs)<ExternalLinkIcon/></a></p>
</div></template>


