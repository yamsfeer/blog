<template><div><h1 id="优化lcp" tabindex="-1"><a class="header-anchor" href="#优化lcp"><span>优化LCP</span></a></h1>
<p>LCP 过高的常见原因有：</p>
<ul>
<li>缓慢的服务器响应速度</li>
<li>阻塞渲染的 JavaScript 和 CSS</li>
<li>缓慢的资源加载速度</li>
<li>客户端渲染</li>
</ul>
<p>下面针对这 4 点原因，提出优化方法。</p>
<h2 id="缓慢的服务器响应速度" tabindex="-1"><a class="header-anchor" href="#缓慢的服务器响应速度"><span>缓慢的服务器响应速度</span></a></h2>
<p>从服务器接收内容的时间越长，浏览器渲染内容的时间自然越长。服务器响应时间可以用 TTFB 衡量。</p>
<p>优化服务器响应时间，有以下方法：</p>
<h3 id="优化服务器" tabindex="-1"><a class="header-anchor" href="#优化服务器"><span>优化服务器</span></a></h3>
<ul>
<li>减少服务端的耗时操作，改善代码执行效率</li>
<li>优化 SSR 速度，很多 SSR 框架都有性能指导可以参考</li>
</ul>
<p>关于服务端优化可以参考 <a href="https://web.dev/overloaded-server/" target="_blank" rel="noopener noreferrer">Fix an overloaded server<ExternalLinkIcon/></a>。</p>
<h3 id="使用-cdn" tabindex="-1"><a class="header-anchor" href="#使用-cdn"><span>使用 CDN</span></a></h3>
<p>内容分发网络 ( CDN ) 通过分布在不同地理位置的服务器，就近为用户提供服务。将资源托管在 CDN 可以减少网络请求时间。</p>
<h3 id="缓存服务器" tabindex="-1"><a class="header-anchor" href="#缓存服务器"><span>缓存服务器</span></a></h3>
<p>通过在磁盘上存储 HTML 副本，服务器端缓存可以减少 TTFB 并最大限度地减少资源使用。</p>
<p>服务器缓存有以下方式：</p>
<ul>
<li>配置 nginx 反向代理，充当客户端和服务器之间的缓存服务器</li>
<li>开启云服务的缓存</li>
<li>开启 CDN 的缓存</li>
</ul>
<h3 id="service-worker-缓存" tabindex="-1"><a class="header-anchor" href="#service-worker-缓存"><span>service worker 缓存</span></a></h3>
<p>Service Worker 会在浏览器后台运行，并可以拦截来自服务器的请求。</p>
<p>Service Worker 级别的缓存控制可以缓存部分或全部 HTML，且只会在内容改变时更新缓存。</p>
<p>参考：<a href="https://philipwalton.com/articles/smaller-html-payloads-with-service-workers/" target="_blank" rel="noopener noreferrer">使用 Service Worker 实现更小的 HTML 负载<ExternalLinkIcon/></a>。</p>
<h3 id="preconnect-尽早建立连接" tabindex="-1"><a class="header-anchor" href="#preconnect-尽早建立连接"><span>preconnect 尽早建立连接</span></a></h3>
<p>使用 preconnect 告知浏览器尽快建立对域名的连接。</p>
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>preconnect<span class="token punctuation">"</span></span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://example.com<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
</code></pre></div><p>还可以使用 dns-prefetch 来更快地完成 DNS 查找。</p>
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>dns-prefetch<span class="token punctuation">"</span></span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://example.com<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
</code></pre></div><p>尽管原理不同，但对于不支持 preconnect 的浏览器，dns-prefetch 可以作为后备。</p>
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>preconnect<span class="token punctuation">"</span></span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://example.com<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>dns-prefetch<span class="token punctuation">"</span></span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://example.com<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>
</code></pre></div><p>参考：<a href="https://web.dev/preconnect-and-dns-prefetch/" target="_blank" rel="noopener noreferrer">尽早建立网络连接来提高页面感知速度<ExternalLinkIcon/></a></p>
<h3 id="使用签名交换" tabindex="-1"><a class="header-anchor" href="#使用签名交换"><span>使用签名交换</span></a></h3>
<p>签名交换 ( SXG ) 是一种交付机制，通过易于缓存的内容格式提升用户体验。</p>
<p>具体来说， Google 搜索会缓存、预获取 SXG。对于通过 Google 搜索获得流量的网站，SXG 可以是改进 LCP 的重要工具。</p>
<p>参考：<a href="https://web.dev/signed-exchanges" target="_blank" rel="noopener noreferrer">签名交换<ExternalLinkIcon/></a>。</p>
<h2 id="阻塞渲染的-javascript-和-css" tabindex="-1"><a class="header-anchor" href="#阻塞渲染的-javascript-和-css"><span>阻塞渲染的 JavaScript 和 CSS</span></a></h2>
<p>浏览器解析 HTML 时，遇到 JavaScript 和 css 都会暂停解析 HTML。css 和 js 都是阻塞渲染的资源，它们会导致 LCP 延迟。</p>
<p>对此，有两个方向解决这个问题：</p>
<ul>
<li>减少阻塞资源体积和个数</li>
<li>延迟加载阻塞资源</li>
</ul>
<h3 id="减小文件体积和个数" tabindex="-1"><a class="header-anchor" href="#减小文件体积和个数"><span>减小文件体积和个数</span></a></h3>
<ul>
<li>
<p>用 webpack 插件对 css 或 js 文件进行混淆压缩，从而减小文件体积。</p>
</li>
<li>
<p>将关键的 css 或 js 代码内联在 html 中，可以减少资源请求数。</p>
<p><a href="https://github.com/GoogleChromeLabs/critters" target="_blank" rel="noopener noreferrer">Critters<ExternalLinkIcon/></a> 是一个 webpack 插件，能够内联关键 css 并对其余部分进行懒加载。</p>
</li>
<li>
<p>尽量减少 JavaScript 的 polyfill。</p>
</li>
</ul>
<h3 id="延迟加载" tabindex="-1"><a class="header-anchor" href="#延迟加载"><span>延迟加载</span></a></h3>
<p>Chrome 开发者工具中的代码覆盖率面板查找网页上未使用的 CSS。</p>
<img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/wjS4NrU5EsJeCuvK0zhn.png" alt="Chrome 开发者工具中的代码覆盖率选项卡" style="zoom:80%;" class="img-mid" />
<ul>
<li>
<p>可以将所有未使用的 CSS 完全删除或移动到另一个样式表。</p>
</li>
<li>
<p>初始渲染时不需要的 CSS，用以下方式延迟加载</p>
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>preload<span class="token punctuation">"</span></span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>style.css<span class="token punctuation">"</span></span> <span class="token attr-name">as</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>style<span class="token punctuation">"</span></span> <span class="token special-attr"><span class="token attr-name">onload</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span><span class="token value javascript language-javascript"><span class="token keyword">this</span><span class="token punctuation">.</span>rel<span class="token operator">=</span><span class="token string">'stylesheet'</span></span><span class="token punctuation">"</span></span></span><span class="token punctuation">></span></span>
</code></pre></div></li>
<li>
<p>html 支持延迟或异步加载 js</p>
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token comment">&lt;!-- defer属性只适用于外部脚本文件 --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>a.js<span class="token punctuation">"</span></span> <span class="token attr-name">defer</span><span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>b.js<span class="token punctuation">"</span></span> <span class="token attr-name">async</span><span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
</code></pre></div></li>
</ul>
<h3 id="动态导入" tabindex="-1"><a class="header-anchor" href="#动态导入"><span>动态导入</span></a></h3>
<p>webpack 插件可以将 js 代码进行拆分，然后按需动态导入。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code>form<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">"submit"</span><span class="token punctuation">,</span> <span class="token parameter">e</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  e<span class="token punctuation">.</span><span class="token function">preventDefault</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">'library.moduleA'</span><span class="token punctuation">)</span> <span class="token comment">// 动态导入</span>
    <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">module</span> <span class="token operator">=></span> module<span class="token punctuation">.</span>default<span class="token punctuation">)</span> <span class="token comment">// 使用默认 export</span>
    <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token function">someFunction</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token function">handleError</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><h2 id="缓慢的资源加载速度" tabindex="-1"><a class="header-anchor" href="#缓慢的资源加载速度"><span>缓慢的资源加载速度</span></a></h2>
<p>LCP 的最大元素通常是图片和文本。优化这两种资源 ( 尤其是图片 )可以很好地优化 LCP。</p>
<h3 id="优化和压缩图像" tabindex="-1"><a class="header-anchor" href="#优化和压缩图像"><span>优化和压缩图像</span></a></h3>
<ul>
<li>删除与内容无关的图像</li>
<li>使用 <a href="https://web.dev/use-imagemin-to-compress-images" target="_blank" rel="noopener noreferrer">Imagemin<ExternalLinkIcon/></a> 压缩图像</li>
<li>将图像转换为更新的 JPEG 2000、JPEG XR 或 WebP 格式</li>
<li>使用响应式图像</li>
<li>使用图像 CDN</li>
</ul>
<p>参考：<a href="https://web.dev/fast/#optimize-your-images" target="_blank" rel="noopener noreferrer">优化您的图像<ExternalLinkIcon/></a></p>
<h3 id="预加载" tabindex="-1"><a class="header-anchor" href="#预加载"><span>预加载</span></a></h3>
<p>很多种类型的资源都可以预加载，但应该侧重于预加载关键资产，例如字体、首屏图像或视频，以及关键路径 CSS 或 JavaScript。</p>
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>preload<span class="token punctuation">"</span></span> <span class="token attr-name">as</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>script<span class="token punctuation">"</span></span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>script.js<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>preload<span class="token punctuation">"</span></span> <span class="token attr-name">as</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>style<span class="token punctuation">"</span></span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>style.css<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>preload<span class="token punctuation">"</span></span> <span class="token attr-name">as</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>image<span class="token punctuation">"</span></span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>img.png<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>preload<span class="token punctuation">"</span></span> <span class="token attr-name">as</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>video<span class="token punctuation">"</span></span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>vid.webm<span class="token punctuation">"</span></span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>video/webm<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>preload<span class="token punctuation">"</span></span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>font.woff2<span class="token punctuation">"</span></span> <span class="token attr-name">as</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>font<span class="token punctuation">"</span></span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>font/woff2<span class="token punctuation">"</span></span> <span class="token attr-name">crossorigin</span> <span class="token punctuation">/></span></span>
</code></pre></div><p>参考：<a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel/preload" target="_blank" rel="noopener noreferrer">MDN rel=preload<ExternalLinkIcon/></a>、<a href="https://web.dev/preload-critical-assets/" target="_blank" rel="noopener noreferrer">预加载关键资产<ExternalLinkIcon/></a></p>
<h3 id="brotli-压缩算法" tabindex="-1"><a class="header-anchor" href="#brotli-压缩算法"><span>Brotli 压缩算法</span></a></h3>
<p>诸如 Gzip 和 Brotli 的压缩算法可以显著缩减传输的文本大小。所有浏览器都支持 Gzip，新浏览器基本支持 Brotli，并 Brotli 有更好的压缩效果。</p>
<p>参考：<a href="https://web.dev/reduce-network-payloads-using-text-compression/" target="_blank" rel="noopener noreferrer">削减和压缩网络负载<ExternalLinkIcon/></a></p>
<h3 id="资产降级" tabindex="-1"><a class="header-anchor" href="#资产降级"><span>资产降级</span></a></h3>
<p>根据用户的设备或网络条件使用不同登记的资源。例如，网络低于 4G 时显示图像而不是视频。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">if</span> <span class="token punctuation">(</span>navigator<span class="token punctuation">.</span>connection<span class="token punctuation">.</span>effectiveType <span class="token operator">===</span> <span class="token string">'4g'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 加载视频</span>
<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
  <span class="token comment">// 加载图像</span>
<span class="token punctuation">}</span>
</code></pre></div><p>参考：<a href="https://web.dev/adaptive-serving-based-on-network-quality/" target="_blank" rel="noopener noreferrer">基于网络质量的自适应服务<ExternalLinkIcon/></a></p>
<h3 id="使用-service-worker-缓存资产" tabindex="-1"><a class="header-anchor" href="#使用-service-worker-缓存资产"><span>使用 Service Worker 缓存资产</span></a></h3>
<p>使用 Service Worker 预缓存关键资源可以显著减少资源加载时间，特别是对于使用较弱连接重新加载网页，甚至离线访问的用户。</p>
<p>参考：<a href="https://web.dev/reliable/" target="_blank" rel="noopener noreferrer">网络可靠性<ExternalLinkIcon/></a></p>
<h2 id="客户端渲染" tabindex="-1"><a class="header-anchor" href="#客户端渲染"><span>客户端渲染</span></a></h2>
<p>React、Vue 使得构建 SPA 变得容易，但它们的源文件通常较大，这会对 LCP 有影响。</p>
<h3 id="服务端渲染" tabindex="-1"><a class="header-anchor" href="#服务端渲染"><span>服务端渲染</span></a></h3>
<p>SSR 的原理是，在服务端渲染 HTML，在客户端将 JavaScript 及数据 hydrate 到 DOM 中。</p>
<p>这个做法可以让页面的主要内容首先在服务器进行渲染，从而改进 LCP。但该做法也有弊端：</p>
<ul>
<li>服务器和客户端维护相同的由 JavaScript 渲染的应用，增加复杂性。</li>
<li>在服务器上执行 JavaScript 渲染 HTML 会增加服务器响应时间，影响 TTFB。</li>
<li>SSR 的页面在相关 JavaScript 执行完毕之前，页面无法响应用户输入，影响 TTI 。</li>
</ul>
<h3 id="预渲染" tabindex="-1"><a class="header-anchor" href="#预渲染"><span>预渲染</span></a></h3>
<p>预渲染就是，用无头浏览器生成每个路由的静态 HTML 文件，然后将这些文件与 JavaScript 一起发送给客户端。</p>
<p>预渲染与 SSR 相比，服务器响应时间获得优化，TTI 没有优化。</p>
<p>深入了解 SSR 架构参考<a href="https://web.dev/rendering-on-the-web/" target="_blank" rel="noopener noreferrer">web中的渲染<ExternalLinkIcon/></a>。</p>
</div></template>


