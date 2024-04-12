<template><div><h1 id="prpl-模式" tabindex="-1"><a class="header-anchor" href="#prpl-模式"><span>PRPL 模式</span></a></h1>
<p>PRPL 是四个英文单词的首字母缩写，它描述了一种可以提高网页加载速度和交互性的模式。</p>
<ul>
<li>Push / Preload 服务器推送或预加载关键资源。</li>
<li>Render 尽快渲染初始页面。</li>
<li>Pre-cache 预缓存剩余资产。</li>
<li>Lazy load 延迟加载其他页面和非关键资产。</li>
</ul>
<p>通过link 标签预加载关键资源。</p>
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>preload<span class="token punctuation">"</span></span> <span class="token attr-name">as</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>style<span class="token punctuation">"</span></span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>css/style.css<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
</code></pre></div><p>内联关键 JavaScript 并使用 async 推迟其余部分，内联首屏的关键 CSS。这样可以减少服务器请求往返，提高性能。但内联代码更难维护，并且无法被浏览器单独缓存。因此，首屏渲染的优化方案需要权衡利弊再决定。</p>
<p>service worker cache 缓存的资源不用从服务器获取。它使得应用不仅可以在离线时使用，还可以在重复访问时加快页面的加载速度。</p>
<p>对 JavaScript 包进行拆分并延迟加载代码块。</p>
</div></template>


