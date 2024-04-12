<template><div><h1 id="http-cache" tabindex="-1"><a class="header-anchor" href="#http-cache"><span>HTTP Cache</span></a></h1>
<p>HTTP Cache 会存储与 HTTP 请求关联的响应，并复用于后续请求。由于这些响应存储在磁盘上，所以又称 Disk Cache。</p>
<p>HTTP Cache 可以分为两种：强缓存和协商缓存。</p>
<h2 id="强缓存" tabindex="-1"><a class="header-anchor" href="#强缓存"><span>强缓存</span></a></h2>
<h3 id="expires" tabindex="-1"><a class="header-anchor" href="#expires"><span>Expires</span></a></h3>
<p>这是 HTTP 1.0 的响应头，表示缓存的过期时间。</p>
<div class="language-http" data-ext="http" data-title="http"><pre v-pre class="language-http"><code><span class="token header"><span class="token header-name keyword">Expires</span><span class="token punctuation">:</span> <span class="token header-value">Tue, 28 Feb 2022 22:22:22 GMT</span></span>
</code></pre></div><h3 id="cache-control" tabindex="-1"><a class="header-anchor" href="#cache-control"><span>Cache-control</span></a></h3>
<h2 id="协商缓存" tabindex="-1"><a class="header-anchor" href="#协商缓存"><span>协商缓存</span></a></h2>
<h3 id="if-modified-since-last-modified" tabindex="-1"><a class="header-anchor" href="#if-modified-since-last-modified"><span>If-Modified-Since &amp; Last-Modified</span></a></h3>
<h3 id="if-none-match-etag" tabindex="-1"><a class="header-anchor" href="#if-none-match-etag"><span>If-None-match &amp; ETag</span></a></h3>
<h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考"><span>参考</span></a></h2>
<p><a href="https://http.dev/caching" target="_blank" rel="noopener noreferrer">HTTP Caching<ExternalLinkIcon/></a>, http.dev</p>
</div></template>


