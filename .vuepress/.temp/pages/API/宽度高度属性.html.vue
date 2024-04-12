<template><div><h1 id="宽度高度属性" tabindex="-1"><a class="header-anchor" href="#宽度高度属性"><span>宽度高度属性</span></a></h1>
<h2 id="window" tabindex="-1"><a class="header-anchor" href="#window"><span>window</span></a></h2>
<h3 id="innerwidth、innerheight" tabindex="-1"><a class="header-anchor" href="#innerwidth、innerheight"><span>innerWidth、innerHeight</span></a></h3>
<p>浏览器窗口的视口 ( viewport ) 高度，如果有水平滚动条，也包括滚动条高度。</p>
<h3 id="scrollx、scrolly" tabindex="-1"><a class="header-anchor" href="#scrollx、scrolly"><span>scrollX、scrollY</span></a></h3>
<h3 id="screenx、screeny" tabindex="-1"><a class="header-anchor" href="#screenx、screeny"><span>screenX、screenY</span></a></h3>
<h2 id="document元素" tabindex="-1"><a class="header-anchor" href="#document元素"><span>document元素</span></a></h2>
<h3 id="clientheight" tabindex="-1"><a class="header-anchor" href="#clientheight"><span>clientHeight</span></a></h3>
<p>clientHeight 表示元素内部的高度，包括 css 盒模型中的 height、padding，不包括 border、margin 和水平滚动条。</p>
<div class="language-text" data-ext="text" data-title="text"><pre v-pre class="language-text"><code>clientHeight = CSS height + CSS padding - 水平滚动条高度
</code></pre></div><img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/dimensions-client.png" alt="img" class="img-mid" />
<p>clientHeight 还有以下几个点：</p>
<ul>
<li>只读属性</li>
<li>单位为 px 且是整数</li>
<li>inline 元素的 clientHeight 为 0</li>
<li><code v-pre>html</code> 或 <code v-pre>body</code> 的 clientHeight 为视口高度 ( 不包含任何滚动条 )</li>
</ul>
<h3 id="offsetheight" tabindex="-1"><a class="header-anchor" href="#offsetheight"><span>offsetHeight</span></a></h3>
<p>offsetHeight 包括 border、padding 和 水平滚动条 ( 如果存在且渲染 )，不包含 <code v-pre>:before</code> 或 <code v-pre>:after</code> 等伪类元素的高度。</p>
<div class="language-text" data-ext="text" data-title="text"><pre v-pre class="language-text"><code>offsetHeight = height + padding + border + 水平滚动条高度
</code></pre></div><img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/dimensions-offset.png" alt="Image:Dimensions-offset.png" class="img-mid" />
<p>在 dom API 中获取 offsetHeight：</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code>document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">.</span>offsetHeight<span class="token punctuation">;</span>
</code></pre></div><h3 id="scrollheight" tabindex="-1"><a class="header-anchor" href="#scrollheight"><span>scrollHeight</span></a></h3>
<p><strong><code v-pre>scrollHeight</code></strong> 表示元素内容高度，包括由于溢出导致的视图中不可见内容。</p>
<img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/scrollheight.png" alt="img" class="img-mid" />
<p>没有垂直滚动条的情况下：scrollHeight 与 clientHeight 相同。</p>
<h3 id="getboundingclientrect" tabindex="-1"><a class="header-anchor" href="#getboundingclientrect"><span>getBoundingClientRect</span></a></h3>
<p><code v-pre>getBoundingClientRect()</code> 方法返回一个 DOMRect 对象，包含了元素的大小及其相对于<a href="https://developer.mozilla.org/zh-CN/docs/Glossary/Viewport" target="_blank" rel="noopener noreferrer">视口<ExternalLinkIcon/></a>的位置。</p>
<p>DOMRect 对象使用 <code v-pre>left</code>、<code v-pre>top</code>、<code v-pre>right</code>、<code v-pre>bottom</code>、<code v-pre>x</code>、<code v-pre>y</code>、<code v-pre>width</code> 和 <code v-pre>height</code> 这些属性描述整个矩形的位置和大小。</p>
<img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/element-box-diagram.png" alt="img" style="zoom:40%;" class="img-mid" />
<p>注意，以上这些都是 <code v-pre>border-box</code> 的语境下的，即图中 Element 包含了 <code v-pre>padding</code> 和 <code v-pre>border</code>。</p>
<h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考"><span>参考</span></a></h2>
<p><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Window/innerWidth" target="_blank" rel="noopener noreferrer">Window.innerWidth - MDN<ExternalLinkIcon/></a></p>
<p><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Element/clientHeight" target="_blank" rel="noopener noreferrer">Element.clientHeight - MDN<ExternalLinkIcon/></a></p>
<p><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollHeight" target="_blank" rel="noopener noreferrer">Element.scrollHeight - MDN<ExternalLinkIcon/></a></p>
<p><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/offsetHeight" target="_blank" rel="noopener noreferrer">offsetHeight - MDN<ExternalLinkIcon/></a></p>
<p><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect" target="_blank" rel="noopener noreferrer">Element.getBoundingClientRect - MDN<ExternalLinkIcon/></a></p>
</div></template>


