<template><div><h1 id="server-push" tabindex="-1"><a class="header-anchor" href="#server-push"><span>Server Push</span></a></h1>
<h2 id="http2-server-push" tabindex="-1"><a class="header-anchor" href="#http2-server-push"><span>http2 Server Push</span></a></h2>
<p>http2 push ( 以下统称 push ) 和 http preload ( 以下统称 preload ) 有相似之处，但它们是两个不同的功能。</p>
<h3 id="什么是-http2-push" tabindex="-1"><a class="header-anchor" href="#什么是-http2-push"><span>什么是 http2 push</span></a></h3>
<p>push 允许开发者将 HTML 文件与特定资产一起推送给客户端。</p>
<p>传统上，客户端最初会收到 HTML 文件，并解析以确定接下来需要哪些资产，然后进一步向服务器提出请求。启用 push 后，服务器可以在客户端开始解析 HTML 之前主动推送已知需要的资产。</p>
<p>例如，我们有 index.html 和 style.css 两个文件，传统上浏览器会先请求 index.html，解析后再请求 style.css。既然无论如何都会请求 style.css，我们让服务器在发送 index.html 同时发送 style.css。</p>
<h3 id="什么是-http-preload" tabindex="-1"><a class="header-anchor" href="#什么是-http-preload"><span>什么是 http preload</span></a></h3>
<p>preload 允许优先下载高优先级资产。</p>
<p>例如，浏览器请求 index.html，在解析时发现它需要 style.css，而 css 中引用了 font.ttf 文件。与其依次请求 style.css 和 font.ttf，不如同时请求。</p>
<h3 id="push-和-preload-的异同" tabindex="-1"><a class="header-anchor" href="#push-和-preload-的异同"><span>push 和 preload 的异同</span></a></h3>
<p>preload 和 push 都是预加载的机制，区别在于：</p>
<ul>
<li>
<p>语法略有不同。http 报文中的 preload 指令可以启动 push，如果你想明确地 preload 资产而不是 push，你可以使用 nopush。</p>
<div class="language-http" data-ext="http" data-title="http"><pre v-pre class="language-http"><code><span class="token header"><span class="token header-name keyword">Link</span><span class="token punctuation">:</span> <span class="token header-value">rel=preload; &lt;/app/script.js>; as=script; nopush</span></span>
</code></pre></div></li>
<li>
<p>服务器可以在收到请求后立即 push。浏览器只有在收到并解析 HTML 后才可以 preload。</p>
</li>
<li>
<p>第三方域名资产可以 preload，只能 push 自己域名的资产。</p>
</li>
<li>
<p>浏览器对 preload 的支持还不完善。push 是 HTTP2 的一个功能，有更好的支持。</p>
</li>
<li>
<p>preload 可以用 as 属性更好地定义优先级，而 push 的优先级由客户端和服务器共享。</p>
</li>
</ul>
<p>下图显示了顺序加载、preload、push 之间的区别。</p>
<img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/preload and server push.png" alt="image-20230519175521127" style="zoom:80%;" class="img-mid" />
<h3 id="如何选用" tabindex="-1"><a class="header-anchor" href="#如何选用"><span>如何选用</span></a></h3>
<p>preload 的好处是下载与执行分离。通过 onload 事件，你可以控制资源的使用细节，比如在空闲时执行 JS。</p>
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>preload<span class="token punctuation">"</span></span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>script.js<span class="token punctuation">"</span></span> <span class="token special-attr"><span class="token attr-name">onload</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span><span class="token value javascript language-javascript">console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'加载完成'</span><span class="token punctuation">)</span></span><span class="token punctuation">"</span></span></span><span class="token punctuation">></span></span>
</code></pre></div><p>push 可以有效缩短获取资源的时间，但是它绕过了浏览器的资源优先级逻辑，如果运用不好，反而会损害性能。</p>
<p>综上所述，</p>
<ul>
<li>当你需要控制使用细节时，使用 preload</li>
<li>当你清楚资源的加载顺序，且有 service worker 防止缓存资源被再次推送时，使用 push。</li>
</ul>
<h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考"><span>参考</span></a></h2>
<p><a href="https://jakearchibald.com/2017/h2-push-tougher-than-i-thought/#anything-can-use-the-push-cache" target="_blank" rel="noopener noreferrer">HTTP/2 push is tougher than I thought<ExternalLinkIcon/></a></p>
</div></template>


