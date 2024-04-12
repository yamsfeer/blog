<template><div><h1 id="js-异常监控" tabindex="-1"><a class="header-anchor" href="#js-异常监控"><span>JS 异常监控</span></a></h1>
<h2 id="异常捕获" tabindex="-1"><a class="header-anchor" href="#异常捕获"><span>异常捕获</span></a></h2>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token comment">// error</span>
window<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'error'</span><span class="token punctuation">,</span> <span class="token parameter">err</span> <span class="token operator">=></span> <span class="token function">report</span><span class="token punctuation">(</span><span class="token function">normalize</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment">// unhandled rejection</span>
window<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'unhandledrejection'</span><span class="token punctuation">,</span> <span class="token parameter">reject</span> <span class="token operator">=></span> <span class="token function">report</span><span class="token punctuation">(</span><span class="token function">normalize</span><span class="token punctuation">(</span>reject<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre></div><div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code>window<span class="token punctuation">.</span><span class="token function-variable function">onerror</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre></div><p>onerror 和 addEventListener 的区别。</p>
<h3 id="script-error" tabindex="-1"><a class="header-anchor" href="#script-error"><span>script error</span></a></h3>
<p>处于安全的考虑，浏览器会隐藏来自跨域JS的错误。</p>
<p>解决办法：</p>
<ol>
<li>
<p>为 script 添加 crossorigin</p>
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://xx.com/xx.js<span class="token punctuation">"</span></span> <span class="token attr-name">crossorigin</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>anonymous<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
</code></pre></div></li>
<li>
<p>添加跨域头</p>
<div class="language-http" data-ext="http" data-title="http"><pre v-pre class="language-http"><code><span class="token header"><span class="token header-name keyword">access-allow-origin</span><span class="token punctuation">:</span> <span class="token header-value">*</span></span>
</code></pre></div></li>
</ol>
<h2 id="堆栈解析" tabindex="-1"><a class="header-anchor" href="#堆栈解析"><span>堆栈解析</span></a></h2>
<h2 id="异常聚合" tabindex="-1"><a class="header-anchor" href="#异常聚合"><span>异常聚合</span></a></h2>
<p>将 error 相关的信息提取为指纹 fingerprint</p>
<h2 id="自动分配处理人" tabindex="-1"><a class="header-anchor" href="#自动分配处理人"><span>自动分配处理人</span></a></h2>
<div class="language-bash" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="token function">git</span> blame <span class="token parameter variable">-L</span> <span class="token operator">&lt;</span>range<span class="token operator">></span> <span class="token operator">&lt;</span>file<span class="token operator">></span>
</code></pre></div><h2 id="异常报警" tabindex="-1"><a class="header-anchor" href="#异常报警"><span>异常报警</span></a></h2>
</div></template>


