<template><div><h1 id="延迟加载" tabindex="-1"><a class="header-anchor" href="#延迟加载"><span>延迟加载</span></a></h1>
<h2 id="延迟加载-javascript" tabindex="-1"><a class="header-anchor" href="#延迟加载-javascript"><span>延迟加载 JavaScript</span></a></h2>
<p>浏览器解析 HTML 时遇到 script 标签，就会暂停构建 DOM，转而下载并执行 JavaScript，执行完成后，继续处理剩余页面。也就是说，script 会阻塞 HTML 的解析过程。</p>
<p>将 script 放在页面底部虽然可以解决但是并不完美，因为浏览器只有在解析了全部 HTML 之后才会获知 script 的存在。对于的 HTML 文档来说，这会造成明显的延迟。</p>
<p>对此，我们需要 script 的两个属性：defer 和 async。</p>
<h3 id="defer" tabindex="-1"><a class="header-anchor" href="#defer"><span>defer</span></a></h3>
<p>defer 告诉浏览器不要等待脚本，而是继续处理 HTML，脚本会在后台下载，DOM 构建完成后，脚本才会执行。</p>
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>script.js<span class="token punctuation">"</span></span> <span class="token attr-name">defer</span><span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
</code></pre></div><p>总的来说，defer 脚本有三个特性：</p>
<p><strong>defer 脚本不会阻塞页面，会在 DOM 解析完毕之后，DOMContentLoaded 之前执行。</strong></p>
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>before scripts<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
  document<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span>
    <span class="token string">'DOMContentLoaded'</span><span class="token punctuation">,</span>
    <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"DOM ready after defer"</span><span class="token punctuation">)</span>
  <span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">defer</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>script.js<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>after scripts<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
</code></pre></div><p>以上示例中，页面内容立即显示，defer 脚本下载且执行结束后触发 DOMContentLoaded 事件。</p>
<p><strong>defer 脚本之间保持相对顺序执行。</strong></p>
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>long.js<span class="token punctuation">"</span></span> <span class="token attr-name">defer</span><span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>small.js<span class="token punctuation">"</span></span> <span class="token attr-name">defer</span><span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
</code></pre></div><p>上面的示例中，两个脚本是并行下载的，small.js 可能会先下载完成。</p>
<p>defer 会确保脚本执行的相对顺序。因此，即使 small.js 先加载完成，它也会等 long.js 执行结束才会被执行。</p>
<p><strong>defer 脚本仅适用于外部脚本。</strong></p>
<p>如果 script 标签没有 src，则会忽略 defer。</p>
<h3 id="async" tabindex="-1"><a class="header-anchor" href="#async"><span>async</span></a></h3>
<p>async 和 defer 类似但也有不同。</p>
<ul>
<li>
<p>与 defer 类似，async 脚本不阻塞页面，且只适用于外部脚本</p>
</li>
<li>
<p>其他脚本不会等待 async 脚本加载完成，async 脚本也不会等待其他脚本</p>
</li>
<li>
<p>DOMContentLoaded 和 async 脚本不会彼此等待</p>
<p>如果 async 脚本在页面完成后才加载完成，DOMContentLoaded 会发生在 async 脚本之前，否则在 async 之后。</p>
</li>
</ul>
<p>总的来说，<strong>async 脚本是在后台加载运行的完全独立的脚本</strong>。</p>
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>before scripts<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
  document<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span>
    <span class="token string">'DOMContentLoaded'</span><span class="token punctuation">,</span>
    <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"DOM ready"</span><span class="token punctuation">)</span>
  <span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">async</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>long.js<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">async</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>small.js<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>after scripts<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
</code></pre></div><p>以上示例中，首先，页面内容立即显示，small.js 和 long.js 谁先加载完成谁就先执行，DOMContentLoaded 事件可能在两个脚本之前或之后触发。总之，它们之间互不影响。</p>
<p><strong>独立的第三方脚本</strong> ( 比如广告 ) 很适合 async 方式加载，这些脚本和页面的脚本互不依赖。</p>
<h3 id="动态脚本" tabindex="-1"><a class="header-anchor" href="#动态脚本"><span>动态脚本</span></a></h3>
<p>动态脚本也是添加脚本的一种方式。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> script <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">'script'</span><span class="token punctuation">)</span>
script<span class="token punctuation">.</span>src <span class="token operator">=</span> <span class="token string">"/script.js"</span>

document<span class="token punctuation">.</span>body<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span>script<span class="token punctuation">)</span> <span class="token comment">// 立即开始加载</span>
</code></pre></div><p><strong>默认情况下，动态脚本添加的是 async 脚本。</strong></p>
<p>如果我们显式设置了 <code v-pre>script.async=false</code>，就会变成 defer 脚本，然后按照在文档中的顺序执行。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">loadScript</span><span class="token punctuation">(</span><span class="token parameter">src</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> script <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">'script'</span><span class="token punctuation">)</span>
  script<span class="token punctuation">.</span>src <span class="token operator">=</span> src
  script<span class="token punctuation">.</span>async <span class="token operator">=</span> <span class="token boolean">false</span> <span class="token comment">// async 为 false，相当于 defer 脚本</span>
  document<span class="token punctuation">.</span>body<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span>script<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token function">loadScript</span><span class="token punctuation">(</span><span class="token string">"long.js"</span><span class="token punctuation">)</span>
<span class="token function">loadScript</span><span class="token punctuation">(</span><span class="token string">"small.js"</span><span class="token punctuation">)</span>
</code></pre></div><p>以上示例中，long.js 总会先执行。</p>
<h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h3>
<p>defer 和 async 都不会阻塞页面渲染。</p>
<table>
<thead>
<tr>
<th style="text-align:center"></th>
<th style="text-align:center">执行顺序</th>
<th style="text-align:center">DOMContentLoaded</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">defer</td>
<td style="text-align:center">按文档顺序</td>
<td style="text-align:center">文档解析完成之后，DOMContentLoaded 之前执行</td>
</tr>
<tr>
<td style="text-align:center">async</td>
<td style="text-align:center">先加载完先执行</td>
<td style="text-align:center">互不影响</td>
</tr>
</tbody>
</table>
<h2 id="延迟加载图片" tabindex="-1"><a class="header-anchor" href="#延迟加载图片"><span>延迟加载图片</span></a></h2>
<p>图片的延迟加载使用 <code v-pre>loading=&quot;lazy&quot;</code> 属性，具体参考“解决方案/图片”。</p>
<h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考"><span>参考</span></a></h2>
<p><a href="https://zh.javascript.info/script-async-defer" target="_blank" rel="noopener noreferrer">脚本：async，defer - javascript.info<ExternalLinkIcon/></a></p>
</div></template>


