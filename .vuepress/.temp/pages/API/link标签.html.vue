<template><div><h1 id="link-标签" tabindex="-1"><a class="header-anchor" href="#link-标签"><span>link 标签</span></a></h1>
<p>link 元素用于引入外部资源，常用于链接样式表。</p>
<h2 id="属性" tabindex="-1"><a class="header-anchor" href="#属性"><span>属性</span></a></h2>
<p>下表列出了 link 元素的属性。</p>
<table>
<thead>
<tr>
<th style="text-align:center">属性</th>
<th style="text-align:center">说明</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">href</td>
<td style="text-align:center">外部资源的 URL，可以是绝对链接或相对链接。</td>
</tr>
<tr>
<td style="text-align:center">crossorigin</td>
<td style="text-align:center">是否跨域请求资源</td>
</tr>
<tr>
<td style="text-align:center">rel</td>
<td style="text-align:center">外部资源与当前文档的关系</td>
</tr>
<tr>
<td style="text-align:center">media</td>
<td style="text-align:center">外部资源适用的媒体类型</td>
</tr>
<tr>
<td style="text-align:center">integrity</td>
<td style="text-align:center">资源文件的哈希值，以 base64 编码方式加密，可以验证资源是否被篡改</td>
</tr>
<tr>
<td style="text-align:center">hreflang</td>
<td style="text-align:center">资源的语言</td>
</tr>
<tr>
<td style="text-align:center">type</td>
<td style="text-align:center">资源的内容类型，例如 text/html，text/css 等 MIME 类型。</td>
</tr>
<tr>
<td style="text-align:center">referrerpolicy</td>
<td style="text-align:center">设置请求资源时的 referrer 头</td>
</tr>
<tr>
<td style="text-align:center">sizes</td>
<td style="text-align:center"><code v-pre>rel=&quot;icon&quot;</code> 时可用，设置 icon 的大小</td>
</tr>
<tr>
<td style="text-align:center">imagesrcset</td>
<td style="text-align:center"><code v-pre>rel=&quot;preload&quot;</code> 时可用，预加载图片的地址</td>
</tr>
<tr>
<td style="text-align:center">imagesizes</td>
<td style="text-align:center"><code v-pre>rel=&quot;preload&quot;</code> 时可用，预加载图片的大小</td>
</tr>
<tr>
<td style="text-align:center">as</td>
<td style="text-align:center"><code v-pre>rel=&quot;preload&quot;</code> 或 <code v-pre>rel=&quot;modulepreload&quot;</code> 时可用，加载内容的类型</td>
</tr>
<tr>
<td style="text-align:center">blocking</td>
<td style="text-align:center">资源文件的元素是否渲染阻塞</td>
</tr>
<tr>
<td style="text-align:center">color</td>
<td style="text-align:center"><code v-pre>rel=&quot;mask-icon&quot;</code> 时可用，icon 的颜色</td>
</tr>
<tr>
<td style="text-align:center">disabled</td>
<td style="text-align:center">是否禁用该外部资源</td>
</tr>
<tr>
<td style="text-align:center">fetchpriority</td>
<td style="text-align:center">请求该外部资源的优先级</td>
</tr>
</tbody>
</table>
<h2 id="rel-属性" tabindex="-1"><a class="header-anchor" href="#rel-属性"><span>rel 属性</span></a></h2>
<p><strong><code v-pre>rel</code></strong> 属性定义了外部资源与当前文档的关系。<code v-pre>a</code>、<code v-pre>area</code>、<code v-pre>link</code> 元素支持该属性，不同元素支持的属性值不同，且可以有多个值，每个以空格分隔。</p>
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>preload stylesheet<span class="token punctuation">"</span></span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>style.css<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
</code></pre></div><p>下表列出了 link 元素支持的 rel 属性取值。</p>
<table>
<thead>
<tr>
<th style="text-align:center">属性</th>
<th style="text-align:center">说明</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">alternate</td>
<td style="text-align:center">文档的替代描述</td>
</tr>
<tr>
<td style="text-align:center">author</td>
<td style="text-align:center">文档或文章的作者</td>
</tr>
<tr>
<td style="text-align:center">canonical</td>
<td style="text-align:center">文档的首要 URL</td>
</tr>
<tr>
<td style="text-align:center">dns-prefetch</td>
<td style="text-align:center">为目标资源的来源预先执行 DNS 解析</td>
</tr>
<tr>
<td style="text-align:center">help</td>
<td style="text-align:center">链接到上下文相关的帮助</td>
</tr>
<tr>
<td style="text-align:center">icon</td>
<td style="text-align:center">代表当前文档的图标</td>
</tr>
<tr>
<td style="text-align:center">license</td>
<td style="text-align:center">表示当前文档的主要内容由被引用文件描述的版权许可所涵盖</td>
</tr>
<tr>
<td style="text-align:center">manifest</td>
<td style="text-align:center">Web 应用清单</td>
</tr>
<tr>
<td style="text-align:center">modulepreload</td>
<td style="text-align:center">预先获取该脚本，并将其存储在文档的模块映射中。</td>
</tr>
<tr>
<td style="text-align:center">pingback</td>
<td style="text-align:center">当前文档 pingback 的 pingback 服务器的地址</td>
</tr>
<tr>
<td style="text-align:center">preconnect</td>
<td style="text-align:center">预先连接到目标资源的服务器。</td>
</tr>
<tr>
<td style="text-align:center">prefetch</td>
<td style="text-align:center">预先获取并缓存目标资源</td>
</tr>
<tr>
<td style="text-align:center">preload</td>
<td style="text-align:center">根据 as 属性的内容类型和优先级，预先获取和缓存目标资源。</td>
</tr>
<tr>
<td style="text-align:center">search</td>
<td style="text-align:center">给出一个资源的链接，可以用来搜索当前文件及其相关页面。</td>
</tr>
<tr>
<td style="text-align:center">stylesheet</td>
<td style="text-align:center">导入样式表。</td>
</tr>
</tbody>
</table>
<h2 id="as-属性" tabindex="-1"><a class="header-anchor" href="#as-属性"><span>as 属性</span></a></h2>
<p>as 属性仅在 link 元素设置了 <code v-pre>rel=&quot;preload&quot;</code> 或 <code v-pre>rel=&quot;prefetch&quot;</code> 时才能使用。</p>
<p>它规定了 link 元素加载的内容的类型，as 属性可帮助浏览器根据内容类型设置预获取资源的优先级、设置正确的标头、以及确定资源是否已存在于缓存中。</p>
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>preload<span class="token punctuation">"</span></span> <span class="token attr-name">as</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>style<span class="token punctuation">"</span></span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>style.css<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
<span class="token comment">&lt;!-- 相当于 --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css"><span class="token comment">/* style.css 的内容 */</span></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>
</code></pre></div><p>link 元素设置内容优先级、请求匹配、内容安全策略以及 Accept 请求头时，as 属性是必需的。</p>
<table>
<thead>
<tr>
<th style="text-align:center">值</th>
<th style="text-align:center">应用于</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">audio</td>
<td style="text-align:center">audio 元素</td>
</tr>
<tr>
<td style="text-align:center">document</td>
<td style="text-align:center">iframe 元素</td>
</tr>
<tr>
<td style="text-align:center">embed</td>
<td style="text-align:center">embed 元素</td>
</tr>
<tr>
<td style="text-align:center">fetch</td>
<td style="text-align:center">fetch, XHR，需要 link 包含 crossorigin 属性</td>
</tr>
<tr>
<td style="text-align:center">font</td>
<td style="text-align:center">CSS @font-face</td>
</tr>
<tr>
<td style="text-align:center">image</td>
<td style="text-align:center">img 元素、picture 元素、SVG、CSS 背景图</td>
</tr>
<tr>
<td style="text-align:center">object</td>
<td style="text-align:center">object 元素</td>
</tr>
<tr>
<td style="text-align:center">script</td>
<td style="text-align:center">script 元素，Web Worker 的 importScript</td>
</tr>
<tr>
<td style="text-align:center">style</td>
<td style="text-align:center"><code v-pre>link rel=&quot;stylesheet&quot;</code> 元素、CSS <code v-pre>@import</code></td>
</tr>
<tr>
<td style="text-align:center">track</td>
<td style="text-align:center">track 元素</td>
</tr>
<tr>
<td style="text-align:center">video</td>
<td style="text-align:center">video 元素</td>
</tr>
<tr>
<td style="text-align:center">worker</td>
<td style="text-align:center">Worker, SharedWorker</td>
</tr>
</tbody>
</table>
<h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考"><span>参考</span></a></h2>
<p><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/link#%E5%B1%9E%E6%80%A7" target="_blank" rel="noopener noreferrer">HTML link 标签 - MDN<ExternalLinkIcon/></a></p>
<p><a href="https://html.spec.whatwg.org/multipage/semantics.html#the-link-element" target="_blank" rel="noopener noreferrer">link 标签 - whatwg<ExternalLinkIcon/></a></p>
<p><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes" target="_blank" rel="noopener noreferrer">HTML 全局属性 - MDN<ExternalLinkIcon/></a></p>
<p><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Attributes/rel" target="_blank" rel="noopener noreferrer">HTML rel 属性 - MDN<ExternalLinkIcon/></a></p>
</div></template>


