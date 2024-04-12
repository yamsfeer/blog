<template><div><h1 id="优化fid" tabindex="-1"><a class="header-anchor" href="#优化fid"><span>优化FID</span></a></h1>
<p>FID 延迟主要是由繁重的 JavaScript 导致的，主线程执行 JavaScript 时无法对用户输入作出响应。</p>
<p>优化 JavaScript 的解析、编译和执行将直接降低 FID。</p>
<h2 id="分割长任务" tabindex="-1"><a class="header-anchor" href="#分割长任务"><span>分割长任务</span></a></h2>
<p>执行时间 50ms 以上的任务称为长任务，将长任务分割为更小的任务可以有效减小 FID。</p>
<h2 id="使用-web-worker" tabindex="-1"><a class="header-anchor" href="#使用-web-worker"><span>使用 Web Worker</span></a></h2>
<p>Web Worker 能让 JavaScript 在后台线程运行，将耗时的计算移动到 web worker 可以缩减主线程阻塞时间。</p>
<h2 id="减少-javascript-执行时间" tabindex="-1"><a class="header-anchor" href="#减少-javascript-执行时间"><span>减少 JavaScript 执行时间</span></a></h2>
<p>延迟加载 JavaScript。</p>
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">defer</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>a.js<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">async</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>b.js<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
</code></pre></div><p>动态导入。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">'module.js'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">module</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token comment">// 动态导入模块后的操作</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>减少 polyfill。</p>
<p>polyfill 用于为旧浏览器提供新代码特性的支持。也就是说，新浏览器是不需要 polyfill 的。</p>
<p>要想精简 JavaScript 的文件大小，尽量不使用 polyfill 或只在需要的地方使用。</p>
<ul>
<li>
<p>使用 <code v-pre>@babel/preset-env</code> 插件，只将特定浏览器所需的 polyfill 包括在其中</p>
</li>
<li>
<p>用 esmodule 判断是否是现代浏览器，从而按需加载 polyfill</p>
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>module<span class="token punctuation">"</span></span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>modern.js<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">nomodule</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>legacy.js<span class="token punctuation">"</span></span> <span class="token attr-name">defer</span><span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
</code></pre></div></li>
</ul>
</div></template>


