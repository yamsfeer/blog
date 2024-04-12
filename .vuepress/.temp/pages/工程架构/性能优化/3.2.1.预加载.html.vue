<template><div><h1 id="预加载" tabindex="-1"><a class="header-anchor" href="#预加载"><span>预加载</span></a></h1>
<p>网页预加载资源有两个方向：preload、prefetch。</p>
<p>preload 和 prefetch 都可以预加载资源，使用起来大概如下：</p>
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>preload<span class="token punctuation">"</span></span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>style.css<span class="token punctuation">"</span></span> <span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>prefetch<span class="token punctuation">"</span></span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>script.js<span class="token punctuation">"</span></span> <span class="token punctuation">></span></span>
</code></pre></div><p>preload 和 prefetch 都用于获取页面的关键资源，比如脚本、字体和图像。</p>
<p>它们的不同之处在于：</p>
<ul>
<li>preload 是尽快获取，当前页面很快要用</li>
<li>prefetch 是尽快获取，下个页面准备要用</li>
</ul>
<p>如果页面 A 为页面 B 的关键资源发起 prefetch 请求，关键资源和当前页面的请求可以并行完成；如果发起的是 preload 请求，它将在页面 A 卸载时取消，页面 B 也许会错过这次预加载。</p>
<p>值得注意的是，在 Chrome 中，如果用户离开一个页面，其他页面正在进行中的 prefetch 不会被终止。无论资源的可缓存性如何，prefetch 在网络堆栈缓存至少 5 分钟。</p>
<p>除了以上区别，preload 和 prefetch 在使用上是类似的，下面以 preload 为例介绍。</p>
<h2 id="preload-scanner" tabindex="-1"><a class="header-anchor" href="#preload-scanner"><span>preload scanner</span></a></h2>
<p>preload 和 prefetch 都是用户给浏览器的提示。事实上，浏览器本身也会对资源进行预加载，称之为 preloader scanner 或者 preloader。</p>
<p>preloader 首先通过 tokenize 的结果，找出包含资源请求的 tag。当主线程开始解析 token 并构建 dom 树时，这些资源请求被发送给 fetcher，fetcher 根据它们对页面加载速度的影响，为它们附加优先级，然后进行下载。</p>
<p>preloader 并不是一个标准功能，各浏览器的 preloader 也不尽相同，但平均而言，preloader 可将页面加载时间缩短约 20%。</p>
<p>关于 preloader 详情参考<a href="https://calendar.perfplanet.com/2013/big-bad-preloader/" target="_blank" rel="noopener noreferrer">这篇文章<ExternalLinkIcon/></a>。</p>
<h2 id="preload-和-prefetch" tabindex="-1"><a class="header-anchor" href="#preload-和-prefetch"><span>preload 和 prefetch</span></a></h2>
<h3 id="缓存行为" tabindex="-1"><a class="header-anchor" href="#缓存行为"><span>缓存行为</span></a></h3>
<p>Chrome 有四个缓存：memory cache、Service Worker cache、HTTP cache ( disk cache ) 和 Push cache。</p>
<p>preload 和 prefetch 的资源都存储在 <strong>HTTP cache</strong> 中。</p>
<p>当一个资源被 preload 或 prefetch 时，它从网络请求栈上升到 HTTP cache 并进入渲染器的 memory cache。</p>
<ul>
<li>如果该资源可以被缓存 ( 具有有效的 cache-control 和有效的 max-age )，它会被存储在 HTTP cache 中。</li>
<li>如果不可缓存，则不会进入 HTTP cache，而是进入 memory cache。</li>
</ul>
<h3 id="优先级" tabindex="-1"><a class="header-anchor" href="#优先级"><span>优先级</span></a></h3>
<p>Chrome 分两个阶段加载资源：严格模式 ( tight mode ) 和条件严格模式。</p>
<p>在严格模式下，限制加载低优先级的资源 ( 正在进行的请求少于 2 个才会加载 )。head 标签中的 script 基本执行完后，进入条件严格模式。</p>
<ul>
<li>每个资源类型都有一个默认的优先级，fetchpriority 可以影响这个优先级。</li>
<li>同一优先级的资源按其被发现的顺序排序获取。</li>
</ul>
<p>chrome 的资源优先级如下表：</p>
<p>◉ : fetchpriority=”auto”</p>
<p>⬆ : fetchpriority=”high”</p>
<p>⬇ : fetchpriority=”low”</p>
<img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/image-20230518124317778.png" alt="image-20230518124317778" style="zoom:50%;" />
<img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/image-20230518125659437.png" alt="image-20230518125659437" style="zoom:50%;" />
<p>* 使用 as 进行 preload 或使用 type 进行 prefetch 时，使用他们所请求的类型的优先级。例如，<code v-pre>&lt;link rel=&quot;preload&quot; as=&quot;style&quot;&gt;</code> 将使用最高优先级，如果没有 as，它们的行为就像 XHR。</p>
<p>** early 表示在非预载图像之前 ( late 为之后 )。</p>
<p>*** media type 不匹配的 CSS 不会被 preload，所以它会较晚获取且有一个 late 优先级。</p>
<p>上图来自 <a href="https://docs.google.com/document/d/1bCDuq9H1ih9iNjgzyAL0gpwNFiEP4TZS-YLRp_RuMlc/edit#" target="_blank" rel="noopener noreferrer">Resource Fetch Prioritization and Scheduling in Chromium<ExternalLinkIcon/></a>。</p>
<h4 id="优先级变化" tabindex="-1"><a class="header-anchor" href="#优先级变化"><span>优先级变化</span></a></h4>
<ul>
<li>image 的默认优先级是 low，如果在布局时，发现图像在视口内，优先级会提升到 high。</li>
<li>script 的默认优先级是 medium，HTML 解析到 script 时，优先级会提升到 high。</li>
</ul>
<p>chrome 的 Dev tools 显示的是资源在完成加载时的最终优先级，一个图像从 low 提升到 high，它将显示为 high。优先级可以在 chrome 的 timeline / performance / network 面板中查看。</p>
<h4 id="网络堆栈优先级名称" tabindex="-1"><a class="header-anchor" href="#网络堆栈优先级名称"><span>网络堆栈优先级名称</span></a></h4>
<p>Chrome 网络栈使用的 5 个优先级与上文介绍的优先级相同，只是名称略有不同。网络优先级的名称通常是全大写的。完整的映射是：</p>
<img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/image-20230518125557361.png" alt="image-20230518125557361" style="zoom:50%;" />
<h3 id="preload-的使用" tabindex="-1"><a class="header-anchor" href="#preload-的使用"><span>preload 的使用</span></a></h3>
<p>根据 <a href="https://httparchive.org/" target="_blank" rel="noopener noreferrer">HTTPArchive<ExternalLinkIcon/></a>，大多数网站使用 preload 来做以下工作：</p>
<ul>
<li>预加载 <a href="https://www.zachleat.com/web/preload/" target="_blank" rel="noopener noreferrer">Web 字体<ExternalLinkIcon/></a></li>
<li>通过 <a href="https://github.com/filamentgroup/loadCSS" target="_blank" rel="noopener noreferrer">loadCSS<ExternalLinkIcon/></a> 异步加载 CSS</li>
<li>PWA 程序使用 <a href="https://web.dev/apply-instant-loading-with-prpl/" target="_blank" rel="noopener noreferrer">PRPL<ExternalLinkIcon/></a> 等模式，预加载当前页面所需的脚本</li>
</ul>
<p>总的来说，你可以预加载脚本、图像，样式，字体，媒体等等。</p>
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>preload<span class="token punctuation">"</span></span> <span class="token attr-name">as</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>script<span class="token punctuation">"</span></span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>critical.js<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>preload<span class="token punctuation">"</span></span> <span class="token attr-name">as</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>stylesheet<span class="token punctuation">"</span></span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>critical.css<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>preload<span class="token punctuation">"</span></span> <span class="token attr-name">as</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>image<span class="token punctuation">"</span></span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>critical.webp<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>preload<span class="token punctuation">"</span></span> <span class="token attr-name">as</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>font<span class="token punctuation">"</span></span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>ComicSans.woff2<span class="token punctuation">"</span></span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>font/woff2<span class="token punctuation">"</span></span> <span class="token attr-name">crossorigin</span><span class="token punctuation">></span></span>
</code></pre></div><h4 id="link-元素的-onload-事件" tabindex="-1"><a class="header-anchor" href="#link-元素的-onload-事件"><span>link 元素的 onload 事件</span></a></h4>
<p>link 元素 preload 的文档支持 onload 事件，我们可以在回调中让预加载样式表应用到文档。</p>
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>preload<span class="token punctuation">"</span></span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>style.css<span class="token punctuation">"</span></span> <span class="token special-attr"><span class="token attr-name">onload</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span><span class="token value javascript language-javascript"><span class="token keyword">this</span><span class="token punctuation">.</span>rel<span class="token operator">=</span>stylesheet</span><span class="token punctuation">"</span></span></span><span class="token punctuation">></span></span>
</code></pre></div><h4 id="http-格式的-preload" tabindex="-1"><a class="header-anchor" href="#http-格式的-preload"><span>http 格式的 preload</span></a></h4>
<p>除了用 link 标签，http 的 link header 也可以指定预加载资源。</p>
<div class="language-http" data-ext="http" data-title="http"><pre v-pre class="language-http"><code><span class="token header"><span class="token header-name keyword">Link</span><span class="token punctuation">:</span> <span class="token header-value">&lt;https://example.com>; rel="preload";</span></span>
</code></pre></div><p>无论哪种方式，preload 都会引导浏览器将资源加载到 memory cache 中，这表明页面想尽快使用它，而不想等待 preload scanner 或 HTML 解析器发现。</p>
<p>值得注意的是，许多服务器在遇到 http header 形式的 preload 时会启动 http2 的 Server Push，Server Push 与 preload 是不同的，后面会介绍。</p>
<p>所以，你应该使用 link 标签而不是 http header 的方式，从而避免意料之外的 push。</p>
<h3 id="关于-preload-的建议" tabindex="-1"><a class="header-anchor" href="#关于-preload-的建议"><span>关于 preload 的建议</span></a></h3>
<p>某些情况下，preload 和 prefetch 会导致重复下载资源。以下是防止重复获取的建议。</p>
<ul>
<li>
<p>不要把 prefetch 作为 preload 的后备手段。</p>
<p>前面提过，preload 是当前页面用，prefetch 是下个页面用，它们的目的不完全一样。</p>
</li>
<li>
<p>不要用 fetch API 进行 preload</p>
<p>在 Chrome 中，用 fetch 进行 preload 会触发重复下载。</p>
</li>
<li>
<p>在 preload 时提供 as 属性</p>
<p>没有有效的 as 属性会重复下载。</p>
</li>
<li>
<p>preload 字体时，提供 crossorigin 属性</p>
<p>preload 字体是匿名模式 CORS 请求的，不设置 crossorigin 将重复下载。即使字体与页面在同源，也建议写上 crossorigin。</p>
</li>
<li>
<p>暂不使用 integrity 属性</p>
<p>link 元素的 integrity 属性表示资源文件的哈希值。它还不完善，可能导致重复请求且无法缓存。</p>
</li>
</ul>
<h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考"><span>参考</span></a></h2>
<ul>
<li><a href="https://medium.com/reloading/preload-prefetch-and-priorities-in-chrome-776165961bbf" target="_blank" rel="noopener noreferrer">Preload, Prefetch And Priorities in Chrome<ExternalLinkIcon/></a></li>
<li><a href="https://www.smashingmagazine.com/2016/02/preload-what-is-it-good-for/" target="_blank" rel="noopener noreferrer">Preload — what is it good for?<ExternalLinkIcon/></a></li>
<li><a href="https://twitter.com/ChromiumDev/status/837715866078752768" target="_blank" rel="noopener noreferrer">A  study<ExternalLinkIcon/></a> by the Chrome Data Saver team</li>
<li><a href="https://www.youtube.com/watch?v=RWLzUnESylc" target="_blank" rel="noopener noreferrer">Planning for performance<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/googlechrome/preload-webpack-plugin" target="_blank" rel="noopener noreferrer">Webpack plugin<ExternalLinkIcon/></a> for auto-wiring up <code v-pre>&lt;link rel=&quot;preload&quot;&gt;</code></li>
<li><a href="https://www.keycdn.com/blog/resource-hints/" target="_blank" rel="noopener noreferrer">What is preload, prefetch and preconnect?<ExternalLinkIcon/></a></li>
<li><a href="https://www.zachleat.com/web/preload/" target="_blank" rel="noopener noreferrer">Web Fonts preloaded<ExternalLinkIcon/></a></li>
<li><a href="https://www.keycdn.com/blog/http-preload-vs-http2-push" target="_blank" rel="noopener noreferrer">Exploring Differences Between HTTP Preload vs HTTP/2 Push<ExternalLinkIcon/></a></li>
<li><a href="https://calendar.perfplanet.com/2013/big-bad-preloader/" target="_blank" rel="noopener noreferrer">Who’s Afraid of the Big Bad Preloader?<ExternalLinkIcon/></a></li>
</ul>
</div></template>


