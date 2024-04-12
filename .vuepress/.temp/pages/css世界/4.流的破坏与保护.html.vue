<template><div><h1 id="流的破坏与保护" tabindex="-1"><a class="header-anchor" href="#流的破坏与保护"><span>流的破坏与保护</span></a></h1>
<h2 id="float" tabindex="-1"><a class="header-anchor" href="#float"><span>float</span></a></h2>
<h3 id="float-的目的" tabindex="-1"><a class="header-anchor" href="#float-的目的"><span>float 的目的</span></a></h3>
<p>float 被创造出来就是为了实现文字环绕效果。</p>
<p>然而，float 被滥用了，最典型的就是 float 布局。浮动布局最大的缺点就是缺乏弹性，像砌砖头。</p>
<p>float 有以下几项特性：</p>
<ul>
<li>
<p>包裹性</p>
</li>
<li>
<p>块状化并格式化上下文</p>
<p>元素一旦浮动( float 不为 none )，则其 display 计算值就是 block 或 table。</p>
</li>
<li>
<p>破坏文档流</p>
<p>在《float 的作用机制》里介绍。</p>
</li>
<li>
<p>没有任何 margin 合并</p>
</li>
</ul>
<p>css 设计的初衷就是表现如水流，富有弹性。css2 是面向图文的，css3 则是为了更绚丽的视觉效果和更丰富的网页布局。</p>
<p>总之，浮动是魔鬼，要少用浮动，更多地去挖掘 css 本身的流动性和自适应性，以构建适用于各种环境的高质量的 网页布局。</p>
<h3 id="float-的作用原理" tabindex="-1"><a class="header-anchor" href="#float-的作用原理"><span>float 的作用原理</span></a></h3>
<p>float 有个著名的特性：高度塌陷。</p>

<CodeDemo id="code-demo-58" type="normal" code="eJyrVsooyc1RslKyScksU0jOSSwuto1RSsqviFGyi8lTULDJzE1XKM9MKckAChsaGcQoKWSkZqZnlIC4BiBuUn5RSmoRiFtQoVCcn5OZoqBsAJbRB5pgow80F0QX2D3Z0fBs3dYX+5pfTt3/fFbLs2ntz+aseb+n5+nsLc93T306Z8XT2fued7Y/nQhkbAGK01S9jX4B0FVKOkrJxcVA3+sBfaxQDfIwxDtWCqi+sY7Jq43JA4VFtUJaTn5iiZVCTmpaibUCULQAKJabWKELDiUrBSNTA6BWoLhSLQAY+adn">
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">width</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>120<span class="token punctuation">"</span></span> <span class="token attr-name">height</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>100<span class="token punctuation">"</span></span> <span class="token attr-name">border</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>1px solid #000<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>一段较长的文本，围绕在图片周围，一段较长的文本，围绕在图片周围，一段较长的文本，围绕在图片周围<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
</code></pre></div><div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">.box</span> <span class="token punctuation">{</span>
  <span class="token property">border</span><span class="token punctuation">:</span> 1px solid #000<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">img</span> <span class="token punctuation">{</span> <span class="token property">float</span><span class="token punctuation">:</span> left<span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token selector">p</span> <span class="token punctuation">{</span> <span class="token property">max-width</span><span class="token punctuation">:</span> 250px <span class="token punctuation">}</span>
</code></pre></div></CodeDemo><p>例子中，图片浮动后，box 高度塌陷为0。值得说明的是，这不是一个 bug，而是有意为之。</p>
<p>高度塌陷是为了<strong>让跟随的内容可以和浮动元素在一个水平线上</strong>，这是实现环绕效果的条件之一；</p>
<p>另一个条件是 <strong>line box 和浮动元素的不可重叠性</strong>，即 line box 如果和浮动元素的垂直高度有重叠，则 line box 只会跟随浮动元素，而不发生重叠。</p>
<p>注意，这里的 line box 指的是 inline 元素所在的那个 box，而不是 p 标签。</p>
<p>我们可以通过给 p 标签和 line box 加上背景色，判断浮动元素对 line box 的影响。</p>

<CodeDemo id="code-demo-77" type="normal" code="eJyrVsooyc1RslKyScksU0jOSSwuto1RSsqviFGyi8lTULDJzE1XKM9MKckAChsaGcQoKWSkZqZnlIC4BiBuUn5RSmoRiFtQoVCcn5OZoqBsAJbRB5pgow80F0QX2D3Z0fBs3dYX+5pfTt3/fFbLs2ntz+aseb+n5+nsLc93T306Z8XT2fued7Y/nQhkbAGK01S9jX4B0FVKOkrJxcVA3+sBfaxQDfIwxDtWCqi+sY7Jq43JA4VFtUJaTn5iiZVCTmpaibUCULQAojE3sUIXHFBWCkamBgUVQC1A0xKTs9OL8kvzUqwUlE1dnY0sDSFGFVilZRYVl+jmZOalQi1GVmpkYOFs6gpRqlQLAIinvv0=">
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">width</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>120<span class="token punctuation">"</span></span> <span class="token attr-name">height</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>100<span class="token punctuation">"</span></span> <span class="token attr-name">border</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>1px solid #000<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>一段较长的文本，围绕在图片周围，一段较长的文本，围绕在图片周围，一段较长的文本，围绕在图片周围<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
</code></pre></div><div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">.box</span> <span class="token punctuation">{</span>
  <span class="token property">border</span><span class="token punctuation">:</span> 1px solid #000<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">img</span> <span class="token punctuation">{</span> <span class="token property">float</span><span class="token punctuation">:</span> left<span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token selector">p</span> <span class="token punctuation">{</span>
  <span class="token property">max-width</span><span class="token punctuation">:</span> 250px<span class="token punctuation">;</span>
  <span class="token property">background</span><span class="token punctuation">:</span> #5EC291<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">p:first-line</span> <span class="token punctuation">{</span>
  <span class="token property">background</span><span class="token punctuation">:</span> #208C5E<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div></CodeDemo><p>可以看到，浮动元素会对 line box 进行限制，使其与浮动元素不重叠，从而实现环绕效果。</p>
<p>总结一下，浮动元素或者说文字环绕效果是由两个特性组成的：</p>
<ul>
<li>父级高度塌陷：使文字和浮动元素同一水平线</li>
<li>line box 区域限制：使文字不和浮动元素重叠</li>
</ul>
<div class="hint-container tip">
<p class="hint-container-title">提示</p>
<p>浮动元素更深入的机制：浮动锚点、浮动参考，float 的流体布局、清除浮动的 clear 。</p>
<p>这些内容不做介绍，除非是文字环绕效果，不然少用 float 属性。</p>
</div>
<h2 id="css-的结界-bfc" tabindex="-1"><a class="header-anchor" href="#css-的结界-bfc"><span>CSS 的结界：BFC</span></a></h2>
<p>BFC 全称为 block formatting context ( 块级格式化上下文 )。</p>
<p>BFC 可以形象地称为 ”CSS 世界的结界“：如果一个元素具有 BFC，它的子元素不受外部元素影响，也不影响外部元素。</p>
<p>参考上节中浮动的例子：</p>

<CodeDemo id="code-demo-119" type="normal" code="eJyrVsooyc1RslKyScksU0jOSSwuto1RSsqviFGyi8lTULDJzE1XKM9MKckAChsaGcQoKWSkZqZnlIC4BiBuUn5RSmoRiFtQoVCcn5OZoqBsAJbRh5hQYPdkR8OzdVtf7Gt+OXX/81ktz6a1P5uz5v2enqeztzzfPfXpnBVPZ+973tn+dCKQsQUoTlP1NvoFQHfZ6AP9C6SVdJSSi4uB/tcD+lmhGuRgiIesFFD9Yw2Syk2s0AUHhpWCsYFBQQVQsDYmDxREYJ1pOfmJJVYKOalpJVDlRemZebpFoPACmgfXUABRnl+WWgTUUm6lkJGZkpKaZ62gr6XwYvmyp/0TFZzcnBW09MGqlWoBUgjAbQ==">
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">width</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>120<span class="token punctuation">"</span></span> <span class="token attr-name">height</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>100<span class="token punctuation">"</span></span> <span class="token attr-name">border</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>1px solid #000<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>一段较长的文本，围绕在图片周围，一段较长的文本，围绕在图片周围，一段较长的文本，围绕在图片周围<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre></div><div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">.box</span> <span class="token punctuation">{</span>
  <span class="token property">border</span><span class="token punctuation">:</span> 1px solid #000<span class="token punctuation">;</span>
  <span class="token property">max-width</span><span class="token punctuation">:</span> 300px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">img</span> <span class="token punctuation">{</span>
  <span class="token property">float</span><span class="token punctuation">:</span> left<span class="token punctuation">;</span>
  <span class="token property">margin-right</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">p</span> <span class="token punctuation">{</span>
  <span class="token property">overflow</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span> <span class="token comment">/* 触发 BFC */</span>
<span class="token punctuation">}</span>
</code></pre></div></CodeDemo><p>通过触发 BFC，使得文字为了不和浮动元素产生任何交集，顺着浮动元素边缘形成自己的封闭上下文。</p>
<p>这样一来，文本内容也产生了自适应性。</p>
<p>常见的 BFC 情形：</p>
<ul>
<li>html 根元素</li>
<li>float 不为 none</li>
<li>overflow: auto、scroll、hidden</li>
<li>display: inline-block、table-cell、table-caption</li>
<li>position: absolute、fixed</li>
</ul>
<h2 id="overflow-hidden" tabindex="-1"><a class="header-anchor" href="#overflow-hidden"><span>overflow: hidden</span></a></h2>
<p>上面提到了各种 BFC，比如 display: inline-block、float 等，但最常用的还是 overflow: hidden。</p>
<p>overflow: hidden 不会影响元素原先的流体特性或宽度表现，可以说是“最佳结界”。</p>
<p>下面来详细了解 overflow: hidden。</p>
<h3 id="overflow-剪裁界限-border-box" tabindex="-1"><a class="header-anchor" href="#overflow-剪裁界限-border-box"><span>overflow 剪裁界限：border-box</span></a></h3>

<CodeDemo id="code-demo-174" type="normal" code="eJw1jkEOgyAQRa8yodumRZM2LbU9CRsUCiQIBqiaGO/eEeNq8l9m3p+FmNw7wkgj7QidEym9OWnDzMmHe4DG9homK7NBXN/unIBRVpuMsXrWGNsQpYpbHGZIwVkJJ0ppuW+uaMVJzqRLCVsuaIZlExcng5rSYX5tYNcyeBygF1Fbz0D8cihgEFJarxlUx8rejeCoLjSMKn5dmBgYK6XyCFf8Yf0DebpMKA==">
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">width</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>256<span class="token punctuation">"</span></span> <span class="token attr-name">height</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>192<span class="token punctuation">"</span></span> <span class="token attr-name">border</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>1px solid #000<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre></div><div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">.box</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 80px<span class="token punctuation">;</span>
  <span class="token property">margin</span><span class="token punctuation">:</span> auto<span class="token punctuation">;</span>
  <span class="token property">padding</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span>
  <span class="token property">border</span><span class="token punctuation">:</span> 1px solid<span class="token punctuation">;</span>
  <span class="token property">overflow</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div></CodeDemo><p>可以看到，图片超出 box 的部分，剪裁的边界是 border-box 的内边缘。</p>
<p>如果想实现图片四周都留有空隙，可以使用透明边框。</p>
<h3 id="overflow-与滚动条" tabindex="-1"><a class="header-anchor" href="#overflow-与滚动条"><span>overflow 与滚动条</span></a></h3>
<p>HTML 中有两个元素是默认可以产生滚动条的：html 和 textarea，它们默认 overflow: auto。也就是说，平常没有滚动条，内容溢出时才有。</p>
<p>关于浏览器的滚动条，有以下两点：</p>
<ul>
<li>
<p>在桌面端，无论什么浏览器，默认滚动条均来自 html 而不是 body。</p>
</li>
<li>
<p>滚动条会占用可用宽度高度。</p>
<p>假设一个 div 是 400x100，当出现滚动条时，其可用空间将会变小。</p>
<div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">.box</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 400px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
  <span class="token property">overflow</span><span class="token punctuation">:</span> auto<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>而在移动端则不是如此，移动端屏幕空间有限，滚动条一般是悬浮的。</p>
<div class="hint-container tip">
<p class="hint-container-title">提示</p>
<p>桌面端各浏览器的滚动条宽度都是 17px。</p>
</div>
</li>
</ul>
<p>滚动条占用宽度造成的最大问题是：页面加载时会产生晃动。</p>
<p>因为平时是没有滚动条的，页面加载中途出现的滚动条会使可用宽度发生变化。</p>
<p>为此，可以使用一个小技巧：</p>
<div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">:root</span> <span class="token punctuation">{</span>
  <span class="token property">overflow-y</span><span class="token punctuation">:</span> auto<span class="token punctuation">;</span>
  <span class="token property">overflow-x</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">:root body</span> <span class="token punctuation">{</span>
  <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">body</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 100vw<span class="token punctuation">;</span>
  <span class="token property">overflow</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><h4 id="自定义滚动条" tabindex="-1"><a class="header-anchor" href="#自定义滚动条"><span>自定义滚动条</span></a></h4>
<p>以 chrome 为例：</p>
<ul>
<li>整体部分，::-webkit-scrollbar</li>
<li>两端按钮，::-webkit-scrollbar-button</li>
<li>外层轨道，::-webkit-scrollbar-track</li>
<li>内层轨道，::-webkit-scrollbar-track-piece</li>
<li>滚动滑块，::-webkit-scrollbar-thumb</li>
<li>边角，        ::-webkit-scrollbar-corner</li>
</ul>
<p>常用属性：</p>

<CodeDemo id="code-demo-268" type="normal" code="eJx9zN1qwzAMBeBXEd7NBnVrVhjDy/YkvvFPFps60ZCdplD67lMaNrbSFl0IHXS+o4i1z0KLJqQ9+GxLeTfC4cGIDzMANKnvYEqhRo63ShkBsU1drL/nhv+aDbd5i5XwpbC2ZgGOM3DuanhW6uvwNgdL/W+C+5Y+M04a7FiRo5MZtJZT63apyuIJc3aW/nmvF9pyc/FqVdY49m4BnPW7jnAcgvSYkTRQ5+yjWs2z3j6dWYcUWpJkQxqLhpcf/apNLN6yH0IId0Vx+gYrTYI6">
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">width</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>300<span class="token punctuation">"</span></span> <span class="token attr-name">height</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>300<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre></div><div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">.box</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
  <span class="token property">overflow</span><span class="token punctuation">:</span> auto<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">::-webkit-scrollbar</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 8px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 8px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">::-webkit-scrollbar-thumb</span> <span class="token punctuation">{</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> <span class="token function">rgba</span><span class="token punctuation">(</span>0<span class="token punctuation">,</span>0<span class="token punctuation">,</span>0<span class="token punctuation">,</span>.3<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token property">border-radius</span><span class="token punctuation">:</span> 6px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">::-webkit-scrollbar-track</span> <span class="token punctuation">{</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> #ddd<span class="token punctuation">;</span>
  <span class="token property">border-radius</span><span class="token punctuation">:</span> 6px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div></CodeDemo><h3 id="overflow-与文字省略" tabindex="-1"><a class="header-anchor" href="#overflow-与文字省略"><span>overflow 与文字省略</span></a></h3>
<ul>
<li>
<p>单行文字溢出省略</p>
<div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">.ellipsis</span> <span class="token punctuation">{</span>
  <span class="token property">text-overflow</span><span class="token punctuation">:</span> ellipsis<span class="token punctuation">;</span>
  <span class="token property">white-space</span><span class="token punctuation">:</span> nowrap<span class="token punctuation">;</span>
  <span class="token property">overflow</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div></li>
<li>
<p>多行文字溢出省略</p>
<p>最多显示 2 行内容，再多就省略。</p>
<div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token property">display</span><span class="token punctuation">:</span> -webkit-box<span class="token punctuation">;</span>
<span class="token property">-webkit-box-orient</span><span class="token punctuation">:</span> vertical<span class="token punctuation">;</span>
<span class="token property">-webkit-line-clamp</span><span class="token punctuation">:</span> 2<span class="token punctuation">;</span>
</code></pre></div></li>
</ul>
<h3 id="overflow-与锚点定位" tabindex="-1"><a class="header-anchor" href="#overflow-与锚点定位"><span>overflow 与锚点定位</span></a></h3>
<p>锚点，通俗来说就是让页面定位到某个位置的点。</p>
<p>锚点的实现方式有两种：</p>
<ul>
<li>
<p>a 标签和 name 属性</p>
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>#1<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>跳转<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>1<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span>
</code></pre></div></li>
<li>
<p>标签的 id 属性</p>
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>#1<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>跳转<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>1<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">></span></span>
</code></pre></div></li>
</ul>
<h4 id="锚点的触发条件" tabindex="-1"><a class="header-anchor" href="#锚点的触发条件"><span>锚点的触发条件</span></a></h4>
<p>以下两种情况可以触发锚点跳转：</p>
<ul>
<li>
<p>URL 地址中的锚链改变</p>
<p>可以直接在 URL 地址栏输入锚链，也可以通过点击链接。</p>
</li>
<li>
<p>可 focus 的锚点元素处于 focus 状态</p>
<p>典型的就是使用 Tab 键对表单元素进行 focus，这是浏览器自动定位 focus 的元素。</p>
</li>
</ul>
<p>第一种会让元素定位在浏览器上边缘，第二种只要正常显示即可。</p>
<h4 id="锚点的本质" tabindex="-1"><a class="header-anchor" href="#锚点的本质"><span>锚点的本质</span></a></h4>
<p>锚点定位，本质上是通过容器的滚动来实现的。容器不特指浏览器，由于平时锚点定位都是浏览器窗体滚动，这很容易误会。</p>
<p>事实上，普通容器元素也可以发生锚点定位，且定位是由内而外的。</p>
<p>来看个例子：</p>

<CodeDemo id="code-demo-354" type="normal" code="eJxVjztuAjEQhq8y8rYRSxDVxuEk29jrAVtx7JVtyEqIIlKkFFH6KEoRpUmTLgU03AbBcguGp0T7/Y/5Z8p0erSsYFyZCVRWxHhfMumbkg1KB3CFK+8SukQSz4kfDboPRpGYTLJI0ubrbbV4b3+fN58v6+/X7c8Hz3WfvOcMrwdcgA44pFR2jrXz/3b5x3NB3TW52A2rYqRhHRoD0/0pjWakUwG3vW7d3O2J9EFhIFI3EL01CjIp5UHyEwxD658KEOPkCc1K1zk9cF3X617qRPUwCn7sVAEZIh5TbLYDWZhpTg==">
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>content<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h4</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>title<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>看不见的标题<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h4</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>#title<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>跳转<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
</code></pre></div><div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">.box</span> <span class="token punctuation">{</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 120px<span class="token punctuation">;</span>
  <span class="token property">border</span><span class="token punctuation">:</span> 1px solid #bbb<span class="token punctuation">;</span>
  <span class="token property">overflow</span><span class="token punctuation">:</span> auto<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.content</span> <span class="token punctuation">{</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
  <span class="token property">background</span><span class="token punctuation">:</span> #eee<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div></CodeDemo><p>当点击跳转时：</p>
<ol>
<li>
<p>先触发 .box 的锚点定位，即 .box 滚动到“看不见的标题”的位置，</p>
</li>
<li>
<p>然后触发窗体的锚点定位，使“看不见的标题”与浏览器窗口上边缘对齐。</p>
</li>
</ol>
<p>另外，设置了 overflow: hidden 的元素也是可以滚动的，这也是本小节的核心。</p>

<CodeDemo id="code-demo-376" type="normal" code="eJxVj8FOAjEURX/lpbMjhiJhNVS+pJvptNDG2k7aipMQFiYmLIzRnYa4MGzcuHOhIfFvFIa/8KFAwvbce9+9b0J0urAkJ0yaMZS2iPGME+FrTgbcARzh0rukXEKJUeT/Bt0DI1FMJlmF0vr59vvzrnm9Xs9vVi+zzeKJUd1D7z7DqgErQAc1xFS2jzUf783XG6MF3q7QRU5IGSMOa+MYmGyrtDIjnXI47Xaqur8lwgepApKqhuitkZAJIf4kP1ZhaP1VDtpIqVwfaAtWy8XPbLmZPzSP99Ci3E25a+++Ou7odg4dRXk+Cv7SyRwypRRCTJHpLyLFc5w=">
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>content<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h4</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>title<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>看不见的标题<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h4</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>#title<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>跳转<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
</code></pre></div><div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">.box</span> <span class="token punctuation">{</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 120px<span class="token punctuation">;</span>
  <span class="token property">border</span><span class="token punctuation">:</span> 1px solid #bbb<span class="token punctuation">;</span>
  <span class="token property">overflow</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span> <span class="token comment">/* 溢出隐藏 */</span>
<span class="token punctuation">}</span>
<span class="token selector">.content</span> <span class="token punctuation">{</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
  <span class="token property">background</span><span class="token punctuation">:</span> #eee<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div></CodeDemo><p>点击跳转后，依然定位到了“看不见的标题”。</p>
<p>锚点定位本质上是改变了 scrollTop 或 scrollLeft 值。因此，上面的代码相当于执行了</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code>document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">'.box'</span><span class="token punctuation">)</span><span class="token punctuation">.</span>scrollTop <span class="token operator">=</span> <span class="token number">200</span><span class="token punctuation">;</span> <span class="token comment">// 一个足够大的值</span>
</code></pre></div><h4 id="利用锚点定位实现选项卡切换效果" tabindex="-1"><a class="header-anchor" href="#利用锚点定位实现选项卡切换效果"><span>利用锚点定位实现选项卡切换效果</span></a></h4>

<CodeDemo id="code-demo-390" type="normal" code="eJyNUttugzAM/RUrfR3dWiZtot2+hJeQBIhI4yqkpVvVf5+BBnrTinggPj6xfY5zZKXfGJawtdR7EIbX9VfKBFrPtVUuZd+pBbhKZng4wzcJo2ufMtCSzmgVkRbrVyI84/oGibucxi2daivHk9g57loJ7yP54nR9yVajKD4aYbSgBFDXnMLZIIs/5w6ypnBHWRPYo6yeHESFP3thoq5pqfNhkXAErw4+4kYXNgGhrFduBafUzmmfcGzLNFr6MoHlm9qs2rhUuih9AosAkEsqukMzdFI5ArYHqNFoCTMpZZfCvXK5wSaBUkupbAduuCs0zcB3HgloR2h31s+Q08BRrX9VAp+hPhdV4XBnZTJWfiAmlLIVie2bRB63NBgV6pR2PvZ9pK63hv8koG2nKjMoqq5ycOHGhBBfeRDABxYIIe6nzz/ar8MFGqQbsziOu/hCeDvvADXnVhmaf5SfYakEOu41Us7SW+09Yac/TftGBA==">
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>container<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>list<span class="token punctuation">"</span></span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>one<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>list<span class="token punctuation">"</span></span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>two<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>list<span class="token punctuation">"</span></span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>three<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>3<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>list<span class="token punctuation">"</span></span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>four<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>4<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>link<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>click<span class="token punctuation">"</span></span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>#one<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>click<span class="token punctuation">"</span></span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>#two<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>click<span class="token punctuation">"</span></span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>#three<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>3<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>click<span class="token punctuation">"</span></span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>#four<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>4<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre></div><div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">.container</span> <span class="token punctuation">{</span> <span class="token property">text-align</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token selector">.box</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 20em<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 10em<span class="token punctuation">;</span>
  <span class="token property">line-height</span><span class="token punctuation">:</span> 10em<span class="token punctuation">;</span>
  <span class="token property">border</span><span class="token punctuation">:</span> 1px solid #ddd<span class="token punctuation">;</span>
  <span class="token property">overflow</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span>
  <span class="token property">margin</span><span class="token punctuation">:</span> auto<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.list</span> <span class="token punctuation">{</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 8em<span class="token punctuation">;</span>
  <span class="token property">background</span><span class="token punctuation">:</span> #ddd<span class="token punctuation">;</span>
  <span class="token property">text-align</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.link</span> <span class="token punctuation">{</span> <span class="token property">margin-top</span><span class="token punctuation">:</span> 1em<span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token selector">.click</span> <span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> inline-block<span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 2em<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 2em<span class="token punctuation">;</span>
  <span class="token property">line-height</span><span class="token punctuation">:</span> 2em<span class="token punctuation">;</span>
  <span class="token property">border</span><span class="token punctuation">:</span> 1px solid #ccc<span class="token punctuation">;</span>
  <span class="token property">background</span><span class="token punctuation">:</span> #f7f7f7<span class="token punctuation">;</span>
  <span class="token property">color</span><span class="token punctuation">:</span> #333<span class="token punctuation">;</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 1em<span class="token punctuation">;</span>
  <span class="token property">font-weight</span><span class="token punctuation">:</span> bold<span class="token punctuation">;</span>
  <span class="token property">text-align</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
  <span class="token property">text-decoration</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div></CodeDemo><p>上面的例子，利用了 overflow: hidden 也可以锚点滚动的特点进行定位。</p>
<p>然而这种定位会触发浏览器窗体对的重定位，体验不太好。</p>
<p>我们可以用 focus 锚点定位来实现：</p>

<CodeDemo id="code-demo-403" type="normal" code="eJyVk9FuozAQRX9lRLXSrrTp0malXUGaL+HF2ANYcTzImCRt1H/v2NQhSasqFQ/ga+547mE4Zp3fmqzIVkrvQBoxDE9VJsl6oS26KltXFuBis6bDu3y1YfTgeWelbT960Iolslhl4FAosuZ5/bD6w4YbvX5P597Hb3k7hxcnL7/jbmjk5LP572w+e7osYjczFCNqNDNMoyVvQkMuEQkg4ku3OCKHEP92x5Q+hL7ZM2UOUWdLCpvu2e9MDgMPy/1pQOAIHg9+IYxubQESrUdXwmtl73lO4BjK7LXyXQGPOW7LsO5Qt50v4CEJTA8XH9SanELHQn+AgYxWcKeUilu0Q9cY2hfQaaXQRnErXKu5BzF6YiG0EL7t1EPDDS8G/YIF/E/1hdy0jkarirnyJ2GC3NOgvSYWHRrh9Q5PJ9gNM5jOXnjquV+uHwFEwNPxSg+9Ec8FaBvD1obkJlZOcK7YpPUFmiR+QkZK+TFU8y9cUZdkiB13y+Uyrs94hH5P0v79qJrMl0CirFCSYxqBi+XBnpgk7msOG36pCGAGKGpuefRYQqCVX01E/qNMSDjdedq8hF4opW1bAD+nrz0VYNRM3qH0P3OI16+pmez1DScNnw8=">
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>container<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>list<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>one<span class="token punctuation">"</span></span> <span class="token attr-name">readonly</span><span class="token punctuation">></span></span>1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>list<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>two<span class="token punctuation">"</span></span> <span class="token attr-name">readonly</span><span class="token punctuation">></span></span>2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>list<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>three<span class="token punctuation">"</span></span> <span class="token attr-name">readonly</span><span class="token punctuation">></span></span>3<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>list<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>four<span class="token punctuation">"</span></span> <span class="token attr-name">readonly</span><span class="token punctuation">></span></span>4<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>link<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>label</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>click<span class="token punctuation">"</span></span> <span class="token attr-name">for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>one<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>label</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>label</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>click<span class="token punctuation">"</span></span> <span class="token attr-name">for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>two<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>label</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>label</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>click<span class="token punctuation">"</span></span> <span class="token attr-name">for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>three<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>3<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>label</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>label</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>click<span class="token punctuation">"</span></span> <span class="token attr-name">for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>four<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>4<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>label</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre></div><div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">.container</span> <span class="token punctuation">{</span> <span class="token property">text-align</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token selector">.box</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 20em<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 10em<span class="token punctuation">;</span>
  <span class="token property">line-height</span><span class="token punctuation">:</span> 10em<span class="token punctuation">;</span>
  <span class="token property">border</span><span class="token punctuation">:</span> 1px solid #ddd<span class="token punctuation">;</span>
  <span class="token property">overflow</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span>
  <span class="token property">margin</span><span class="token punctuation">:</span> auto<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.list</span> <span class="token punctuation">{</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 8em<span class="token punctuation">;</span>
  <span class="token property">background</span><span class="token punctuation">:</span> #ddd<span class="token punctuation">;</span>
  <span class="token property">text-align</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
  <span class="token property">position</span><span class="token punctuation">:</span> relative<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.link</span> <span class="token punctuation">{</span> <span class="token property">margin-top</span><span class="token punctuation">:</span> 1em<span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token selector">.click</span> <span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> inline-block<span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 2em<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 2em<span class="token punctuation">;</span>
  <span class="token property">line-height</span><span class="token punctuation">:</span> 2em<span class="token punctuation">;</span>
  <span class="token property">border</span><span class="token punctuation">:</span> 1px solid #ccc<span class="token punctuation">;</span>
  <span class="token property">background</span><span class="token punctuation">:</span> #f7f7f7<span class="token punctuation">;</span>
  <span class="token property">color</span><span class="token punctuation">:</span> #333<span class="token punctuation">;</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 1em<span class="token punctuation">;</span>
  <span class="token property">font-weight</span><span class="token punctuation">:</span> bold<span class="token punctuation">;</span>
  <span class="token property">text-align</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
  <span class="token property">text-decoration</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.list > input</span> <span class="token punctuation">{</span>
  <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span> <span class="token property">top</span><span class="token punctuation">:</span>0<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span> <span class="token property">width</span><span class="token punctuation">:</span> 1px<span class="token punctuation">;</span>
  <span class="token property">border</span><span class="token punctuation">:</span>0<span class="token punctuation">;</span> <span class="token property">padding</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span> <span class="token property">margin</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">clip</span><span class="token punctuation">:</span> <span class="token function">rect</span><span class="token punctuation">(</span>0 0 0 0<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div></CodeDemo><p>原理其实很简单，每个列表加入一个隐藏的 input，并将 label 通过 for 属性进行关联，当 label 被 focus，就会触发锚点定位。</p>
<p>这种方式还有个优点，就是可以使用 Tab 键切换。</p>
<h2 id="position-absolute" tabindex="-1"><a class="header-anchor" href="#position-absolute"><span>position: absolute</span></a></h2>
<p>position: absolute 和 float 都具有块状化、包裹性、破坏性的特点，且它们同时存在时，float 是没有效果的。</p>
<ul>
<li>
<p>块状化</p>
<p>和 float 一样，元素一旦设置 position 为 absolute 或 fixed，其 display 计算值就是 block 或 table。</p>
</li>
<li>
<p>包裹性</p>
<p>包裹性就是尺寸收缩包裹，同时具有自适应性。</p>
</li>
<li>
<p>破坏性</p>
<p>破坏性指的是破坏正常的流特性。</p>
<p>虽然 absolute 破坏正常流来实现自己的特性，但本身仍受普通流元素布局相关的 CSS 属性影响。</p>
</li>
</ul>
<h3 id="absolute-的包含块-containing-block" tabindex="-1"><a class="header-anchor" href="#absolute-的包含块-containing-block"><span>absolute 的包含块( containing block )</span></a></h3>
<p>所谓包含块( containing block )，就是元素用来计算和定位的一个参照物。</p>
<p>普通元素的百分比宽度是相对父元素的 content box 宽度计算的，而 absolute 元素宽度则是相对于第一个 position 不为 static 的祖先元素计算的。</p>
<p>对于包含块( containing block )，有以下几点：</p>
<ul>
<li>html 标签是初始包含块</li>
<li>relative 和 static 的元素，其 containing box 为最近的块级元素的 content box</li>
<li>fixed 的 containing box 为初始包含块，即 html</li>
<li>absolute 元素的 containing box 为最近的非 static 元素</li>
</ul>
<p>和普通元素相比，absolute 元素的包含块有 3 个明显差异：</p>
<ul>
<li>inline 元素也可以作为包含块元素（不常用且难理解，忽略）</li>
<li>absolute 元素的 containing box 为最近的非 static 元素</li>
<li>边界是 padding box 而不是 content box</li>
</ul>
<div class="hint-container tip">
<p class="hint-container-title">提示</p>
<p>对于 absolute 元素来说，height: 100% 是相对于最近的非 static 元素的高度，而 height: inherit 则是单纯的父元素的高度继承。</p>
<p>这在某些场景下很好用。</p>
</div>
<h4 id="absolute-元素的包裹性" tabindex="-1"><a class="header-anchor" href="#absolute-元素的包裹性"><span>absolute 元素的包裹性</span></a></h4>
<p>对于一个 absolute 的元素，其内部文本的宽度就是文字的宽度（包裹性），但宽度不会无限大下去，当超过包含块的宽度时会自动换行。</p>

<CodeDemo id="code-demo-516" type="normal" code="eJxVkF9LwlAYxr/Ky+k2bHU5q0+ym+kGHlibbMsEESSb9kdFCLKkwP6QYn8sCJk26cN03uO82lfozNDy6oXneZ8Hfk+BZNw9g8hkW6M5SBuq4+woJG2ZrkpN3VbIrmICrJgpKy9kHIzYuMH8EvP7oKYcy9h3dZi2j9ArTz86UVBDb4gVb1bu8Ysqv36OrdcJjh/x7Z1fDoSIL62lGAXHWPPC+xEvdaPgRMTZpPJrMb/OgjZvdWZXTXzoMv8MG59x/+Q8HHrhV1UEsfmEN39tvDUUkbDax9Mer9+Ft7Xv0uEcZEOQCKTFJesk7TgCP7FEhkL8mLUc6lLLlMHWDdWlOT0ZywdUczMybElSNj8XUpat6bYMm9k8iA2oBmuSJAmrqJgJsRQU/lUtZkqCcEnxB9oCwAc=">
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>container<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>对于一个 absolute 的元素，其内部文本的宽度就是文字的宽度（包裹性），但宽度不会无限大下去，当超过包含块的宽度时会自动换行。
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre></div><div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">.container</span> <span class="token punctuation">{</span>
  <span class="token property">position</span><span class="token punctuation">:</span> relative<span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
  <span class="token property">border</span><span class="token punctuation">:</span> 1px solid #000<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.box</span> <span class="token punctuation">{</span> <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span> <span class="token punctuation">}</span>
</code></pre></div></CodeDemo><p>很明显，.container 的高度塌陷了，这是因为 absolute 会破坏文档流。</p>
<p>当包含块宽度不足以放下文字内容时，则会出现一柱擎天的情况。常见的例子是图标按钮的 tip</p>

<CodeDemo id="code-demo-526" type="normal" code="eJyFU81uEzEQfpWREVIrdfNDRIVM6XMgsRyc9ezuUMe27EkaqHrnFbhx4NU48BbMepMmSgo9JLJnxt83832zD6rnlVNa3RjoE7YfavXFbExuEkXWtYLGmZwlSk3wlUWHjMAUs6SsYVMxsUPJ//7+88+PX7W6HQ83U3Nbe3WlmpwFfTI8+XR48Bkeag8QQyam4DUkdIZpg+9r/1j7s3Ktl9iGhFfP5kzLmE4RzTIHt+YBEcBhyxrezl6XGyfjs8Ct9HgUavx4UUn6suQ3lGlJjvirhp6sRf9CWyO3KMTohccwp4tD2QjKIWqoFou4LddorCXfaXgTtzCfyd8+48hj1SN1vUDN3+2iy5AspioZS+tcXo1h09x1Kay9rZrgQtLwarFYjIS45co46kSMYf4S3Be1bVvurfRcZfqGQjViPj/nkcRPY9aqVke9abiWKUR0sqOs0SSpO+5eNDhvs+gyKPAv8j5sBP1/G7CrOGqyNLDbhIOdMJnn4Xfmcjm73fYJw/G2FzxLOTojleSLP0sXmrsCc0+WezFkHABg79xT4GCRhnVyFz1zzHo6tbgKE/k87kNydtL4Ka1Mh3l6LZmBeBJ9dwk+VAkjGoZGxMR06vrOO5H+1M/ZOI16/AsJMF65">
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>javascript:<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>icon-delete tips<span class="token punctuation">"</span></span> <span class="token attr-name">data-title</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>删除<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>删除<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span>
</code></pre></div><div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">.tips[data-title]</span> <span class="token punctuation">{</span>
  <span class="token property">position</span><span class="token punctuation">:</span> relative<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.tips[data-title]::before,
.tips[data-title]::after</span> <span class="token punctuation">{</span>
  <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span>
  <span class="token property">left</span><span class="token punctuation">:</span> 50%<span class="token punctuation">;</span>
  <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">translateX</span><span class="token punctuation">(</span>-50%<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token property">visibility</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.tips[data-title]::before</span> <span class="token punctuation">{</span>
  <span class="token property">content</span><span class="token punctuation">:</span> <span class="token function">attr</span><span class="token punctuation">(</span>data-title<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token property">top</span><span class="token punctuation">:</span> -33px<span class="token punctuation">;</span>
  <span class="token property">padding</span><span class="token punctuation">:</span> 2px 10px 3px<span class="token punctuation">;</span>
  <span class="token property">line-height</span><span class="token punctuation">:</span> 18px<span class="token punctuation">;</span>
  <span class="token property">border-radius</span><span class="token punctuation">:</span> 2px<span class="token punctuation">;</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> #333<span class="token punctuation">;</span>
  <span class="token property">text-align</span><span class="token punctuation">:</span> left<span class="token punctuation">;</span>
  <span class="token property">color</span><span class="token punctuation">:</span> #fff<span class="token punctuation">;</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 12px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.tips[data-title]::after</span> <span class="token punctuation">{</span>
  <span class="token property">content</span><span class="token punctuation">:</span> <span class="token string">""</span><span class="token punctuation">;</span>
  <span class="token property">border</span><span class="token punctuation">:</span> 6px solid transparent<span class="token punctuation">;</span>
  <span class="token property">border-top-color</span><span class="token punctuation">:</span> #333<span class="token punctuation">;</span>
  <span class="token property">top</span><span class="token punctuation">:</span> -10px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.tips[data-title]:hover::before,
.tips[data-title]:hover::after</span> <span class="token punctuation">{</span>
  <span class="token property">transition</span><span class="token punctuation">:</span> visibility .1s .1s<span class="token punctuation">;</span>
  <span class="token property">visibility</span><span class="token punctuation">:</span> visible<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.icon-delete</span> <span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> inline-block<span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 20px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 20px<span class="token punctuation">;</span>
  <span class="token property">background</span><span class="token punctuation">:</span> <span class="token url"><span class="token function">url</span><span class="token punctuation">(</span>https://demo.cssworld.cn/images/6/delete.png<span class="token punctuation">)</span></span> no-repeat center<span class="token punctuation">;</span>
  <span class="token property">background-size</span><span class="token punctuation">:</span> 16px<span class="token punctuation">;</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div></CodeDemo><p>解决办法也简单，设置 white-space: nowrap，让宽度表现从包裹性变成最大可用宽度。</p>
<h3 id="无依赖绝对定位" tabindex="-1"><a class="header-anchor" href="#无依赖绝对定位"><span>无依赖绝对定位</span></a></h3>
<p>一个绝对定位元素，没有任何 left/right/top/bottom 属性设置，且祖先都是 static 元素，其位置在哪里？</p>
<p>很多人认为在浏览器左上方。实际上，<strong>还是当前位置</strong>。</p>
<p>来验证一下。假设有如下代码：</p>
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h3</span><span class="token punctuation">></span></span>标题<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>follow<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>span<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h3</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h3</span><span class="token punctuation">></span></span>标题<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>follow<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>div<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h3</span><span class="token punctuation">></span></span>
</code></pre></div><p>显然，span 会直接跟在标题后面，而 div 换行显示。</p>
<p>如果设置绝对定位。</p>
<div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">.follow</span> <span class="token punctuation">{</span> <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span> <span class="token punctuation">}</span>
</code></pre></div><p>结果是它们的位置和设置绝对定位前一样。</p>

<CodeDemo id="code-demo-556" type="normal" code="eJyrVsooyc1RslKyyTC2i8lTUHi2oP3lohk2xQWJeQrJOYnFxbYxSmn5OTn55TFKdiBRG30QCVRrow/WgqYxJbMMUx9Q0EYfSCB0KekoJRcXA+3VgyhSqFYoyC/OLMnMz7NSSEwqzs8pLUm1VqgFqqwFAHaSO2o=">
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h3</span><span class="token punctuation">></span></span>
  标题<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>follow<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>span<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h3</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h3</span><span class="token punctuation">></span></span>
  标题<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>follow<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>div<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h3</span><span class="token punctuation">></span></span>
</code></pre></div><div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">.follow</span> <span class="token punctuation">{</span> <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span> <span class="token punctuation">}</span>
</code></pre></div></CodeDemo><p>假如 HTML 代码是这样的：</p>
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h3</span><span class="token punctuation">></span></span>标题<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h3</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>follow<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>span<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h3</span><span class="token punctuation">></span></span>标题<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h3</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>follow<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>div<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre></div><p>此时再设置绝对定位，可想而知它们都会在标题下面。</p>
<h4 id="独立的-absolute" tabindex="-1"><a class="header-anchor" href="#独立的-absolute"><span>独立的 absolute</span></a></h4>
<div class="hint-container tip">
<p class="hint-container-title">提示</p>
<p>请记住，absolute 是非常独立的属性，其样式和行为不依赖其他 css 属性。</p>
</div>
<p>来看个例子，要实现左上角 top 图标，以下是一种方案：</p>
<div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">.father</span> <span class="token punctuation">{</span> <span class="token property">position</span><span class="token punctuation">:</span> relative<span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token selector">.shape</span> <span class="token punctuation">{</span>
  <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span>
  <span class="token property">left</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span> <span class="token property">top</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>实际上，只需要一行就够了。</p>
<div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">.shape</span> <span class="token punctuation">{</span> <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span> <span class="token punctuation">}</span>
</code></pre></div>
<CodeDemo id="code-demo-583" type="normal" code="eJwdjkkOwyAMRa9i0W0FaRddpMNJsiGAAIlJ2FUqRbl7TZbvT/YuAuUkZvGK2QN2815YoYazUtblKg3iVnuy0hQVs/YO1UNRbTfZil8EmKQRuYRBN8esPks5t7ZoKbBxu08sBxd9oIHTwLV26/rA9gOsKVq4TKcz+uIq+Cw/Jc9V2KFVjBRrmUGvHP+Se8LBweMP/Jk+3Q==">
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://demo.cssworld.cn/images/6/top1.png<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>shape<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">width</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>120<span class="token punctuation">"</span></span> <span class="token attr-name">height</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>100<span class="token punctuation">"</span></span> <span class="token attr-name">border</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>1px solid #000<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
</code></pre></div><div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">.shape</span> <span class="token punctuation">{</span> <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span> <span class="token punctuation">}</span>
</code></pre></div></CodeDemo><p>所谓“无依赖绝对定位”，本质上就是相对定位，只是不在正常流中，不占据空间。</p>
<h4 id="各类图标定位" tabindex="-1"><a class="header-anchor" href="#各类图标定位"><span>各类图标定位</span></a></h4>
<p>在导航右上方添加一个 NEW 或者 HOT 的图标，直接绝对定位，然后用 margin 调整位置即可。</p>
<div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">.icon-hot</span> <span class="token punctuation">{</span>
  <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 28px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 11px<span class="token punctuation">;</span>
  <span class="token property">margin</span><span class="token punctuation">:</span> -6px 0 0 2px<span class="token punctuation">;</span>
  <span class="token property">background</span><span class="token punctuation">:</span> <span class="token url"><span class="token function">url</span><span class="token punctuation">(</span>new.png<span class="token punctuation">)</span></span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div>
<CodeDemo id="code-demo-597" type="normal" code="eJytkltq3DAUhrciXAoNVJbnwlBctyuZF1mSLRFZMpI84xIChb50BS3tCkohlwVkO7ntIse3zCTMQwhhGGz/5/znfP6tk0iGSkdplHG1QUxT77+sI0M36+jr2iCUyeW+irXyYSxBkSLpRPGkgUL15s/5/fe/1xdXdz//Z4QOg4hcvn7i7Y+z+9//xonqsayYNVjazp8RBf+32HXz6/LwIiO2hxdlBMKDa/QxYt5DmDHMQiddB1e+1vRbigLNtfjcSf0dBtE2IUWFagXv9a3iQaZoliTv++eKtnjUVklSt6PoSmWgS1SINsH2Yk7ZcelsYzhmVluXoneLxWJYJtqAqVYleJgwQTiQT9emI+zjOISJmdC6txfWBLwVqpSAukySPTN95sy1Zce9SSsjsBxN84m8ppwrU+4pE2ue5ztWLph1NCgLwMaaLrLHjam0G+GGvZO5KIqhBZqm4zB01NarYQ7NvdVNGOIfI51/Ago0Uc5mz/LFq7pFCfzmY2GXcYoapz/IEGqfEsJFZWP46lvrNI+ZIaqipfBkRQAkLlVxNL7BdIReAjfrtu7gFm8PByBxbcojyBg7UQsanhyP6PQBXwZotA==">
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>nav<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h4</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>nav-list<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>nav-a<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>普通导航<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h4</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h4</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>nav-list<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>nav-a<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>热门导航<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>i</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>icon-hot<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>i</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h4</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h4</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>nav-list<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>nav-a<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>新导航<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>i</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>icon-new<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>i</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h4</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre></div><div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">.nav</span> <span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> table<span class="token punctuation">;</span>
  <span class="token property">table-layout</span><span class="token punctuation">:</span> fixed<span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
  <span class="token property">max-width</span><span class="token punctuation">:</span> 600px<span class="token punctuation">;</span>
  <span class="token property">margin</span><span class="token punctuation">:</span> 1em auto<span class="token punctuation">;</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> #333<span class="token punctuation">;</span>
  <span class="token property">text-align</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.nav-list</span> <span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> table-cell<span class="token punctuation">;</span>
  <span class="token property">font-weight</span><span class="token punctuation">:</span> 400<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.nav-a</span> <span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> block<span class="token punctuation">;</span>
  <span class="token property">line-height</span><span class="token punctuation">:</span> 20px<span class="token punctuation">;</span>
  <span class="token property">padding</span><span class="token punctuation">:</span> 20px<span class="token punctuation">;</span>
  <span class="token property">color</span><span class="token punctuation">:</span> #bbb<span class="token punctuation">;</span>
  <span class="token property">text-decoration</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.nav-a:hover</span> <span class="token punctuation">{</span>
  <span class="token property">color</span><span class="token punctuation">:</span> #fff<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.icon-hot</span> <span class="token punctuation">{</span>
  <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 28px<span class="token punctuation">;</span> <span class="token property">height</span><span class="token punctuation">:</span> 11px<span class="token punctuation">;</span>
  <span class="token property">margin</span><span class="token punctuation">:</span> -6px 0 0 2px<span class="token punctuation">;</span>
  <span class="token property">background</span><span class="token punctuation">:</span> <span class="token url"><span class="token function">url</span><span class="token punctuation">(</span>https://demo.cssworld.cn/images/6/hot.gif<span class="token punctuation">)</span></span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.icon-new</span> <span class="token punctuation">{</span>
  <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 12px<span class="token punctuation">;</span> <span class="token property">height</span><span class="token punctuation">:</span> 13px<span class="token punctuation">;</span>
  <span class="token property">margin</span><span class="token punctuation">:</span> -6px 0 0 2px<span class="token punctuation">;</span>
  <span class="token property">background</span><span class="token punctuation">:</span> <span class="token url"><span class="token function">url</span><span class="token punctuation">(</span>https://demo.cssworld.cn/images/6/new.png<span class="token punctuation">)</span></span> no-repeat center<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div></CodeDemo><p>设想一下，如果给父元素 relative 定位，然后 right / top 定位，文字长度一旦发生变化，就得重新调整位置，无依赖绝对定位则适配良好，图片是直接跟在文字后面的。</p>
<p>即使是普通的水平对齐图标，也可以用无依赖定位实现。</p>

<CodeDemo id="code-demo-607" type="normal" code="eJxljzFOxDAQRa9imQYkEgeEKELYk6Tx2l5nhDO2bEeJtNqGHnEFEDWR6Cj2OLArboFDAIG2/TPz/ps1bWJraEmr4DgSYXgI1zUFYTEbarqokZAK/uc995hGFYPFx+24H192D9v37f3b693u+Wn/ONZYsYmWjukpFSEkfD4TyXoCGkCVNQp0E0tyXrjhakodlxJQHyaZUau0ePETL62XypfkzA0kWAOSHBVFkUabGmucmybHuczZABEsloQv03YX1Rek5V4DfqOz38oeZGz+KBxYLrm40d52KEvSeXPcxOhCyZhUrc3Tr731RuYCGbRcq8Au2aSSa1idELSZV07xSITCqPysTDefdt2LbA==">
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>icon-x<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>i</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>icon-warn<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>i</span><span class="token punctuation">></span></span>邮箱格式不正确
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
</code></pre></div><div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">.icon-x</span> <span class="token punctuation">{</span>
  <span class="token property">line-height</span><span class="token punctuation">:</span> 20px<span class="token punctuation">;</span>
  <span class="token property">padding</span><span class="token punctuation">:</span> 20px<span class="token punctuation">;</span>
  <span class="token property">padding-left</span><span class="token punctuation">:</span> 40px<span class="token punctuation">;</span>
  <span class="token property">border</span><span class="token punctuation">:</span> 1px solid #000<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.icon-warn</span> <span class="token punctuation">{</span>
  <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span>
  <span class="token property">margin-left</span><span class="token punctuation">:</span> -20px<span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 20px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 20px<span class="token punctuation">;</span>
  <span class="token property">background</span><span class="token punctuation">:</span> <span class="token url"><span class="token function">url</span><span class="token punctuation">(</span>https://demo.cssworld.cn/images/6/warn.gif<span class="token punctuation">)</span></span> no-repeat center<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div></CodeDemo><p>这种方法兼容性良好。与 inline-block 相比，好处在于 inline-block 对齐最终行框高度并不是 20px，因为中文下沉，而图标居中，要想视觉上居中，图标的 vertical-align 需要调整得往下一点，这导致最终行框高度大于 20px。</p>
<p>无依赖定位则不需担心这个问题，因为绝对定位元素不改变正常流的尺寸。</p>
<h4 id="超越常规布局的排版" tabindex="-1"><a class="header-anchor" href="#超越常规布局的排版"><span>超越常规布局的排版</span></a></h4>
<p>在表单布局中，通常会有输入错误提示，如果提示放在输入框下面，整个容器的高度会突然变化，体验不好。</p>
<p>如果把提示放在输入框右边，这也有表单容器宽度不够的问题。</p>
<p>这就需要用到无依赖绝对定位了。</p>
<div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">.remark</span> <span class="token punctuation">{</span>
  <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span>
  <span class="token property">margin-left</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div>
<CodeDemo id="code-demo-630" type="normal" code="eJy9Vdlu00AU/ZVReIGK1CmLARP4krxM7EkydDJj2ZO2CPHA0pZCqyBA7IiyKgiRsIgtpOVnMnby1F/gjpesZREV5CX2Xc89d/G5TEVWWcbK5B26gGyGff9UIeORMvVltiiWCpnTBY7QbtqyJ2puogcLhouETdpEQrDJ+y7mk0pfYg90M3lDa0/3LzbD5ru8EfmkUXfJaxOmQ8YGYEK5W5NInnUJ2JAqpqCd9IlsRpzAbTdEHrh78yh5W8QeH/PRyQYu1BY8NckbNIEfbHZUp979sqFWV8InzZ3OlfB5O7hc3+msjeSOC05KNKDGmOTh03+gW7VWws0Le6TbBdNF4Tm/Z/wXfINVr/W5t31TLb8ws3Nmd2sjBrfTWQcme5e2ulvfw1uN8FUb6P3n5AVr14KHbVX/vHd6pA74a2b+soLhHE62Hkbxz9FiVPFICfRn8AL2bY+60ppGXJR6yMPX19TGh+BDQ62s5w38U/zpf+ZgxvZ9OC2zoyWgc9oW2l6m3EKHcu4Syp3UIrFAvBITixaqUMchHITnCzz1jTsW+S5SR1YsdAxcI0cXOw7l5awUroXmUimEwtJCjJTkeCRNQRzIob7L8FkLUc4oJ9kiE/b8uHHczci6Qmi5AhE15ChD5DMlTdAdMifgWegElHo0ERZhZ4gHcEHmC0YdtM/JOaZzItICE5LamGUxo2VgCSqLYRW4MYNU86u611DNLdV+2f22fDSnOZwxhqDhbI8xFVlEgVPacwjXpIhjQsTkdF190b91r3/xWX91Pbx/uffmJZwu9bauHmwHm6tjGfTZi1Ok5GueoRwzSWQLJqC8fUWSg1/C6eBiJq7Cp5IKgIOLwEFNkhGMScDs3PFxXqMM070oYntejxd3LFTz2P6KlK5vGYZDqmIWphBuFHNmbW7QKi4T3zANjWO2TEsHEBdwh1yCJbIJl8Qb0KKa9/UpetgIH9xQb66r57f7lxrATNh+2lt7H9x9DDdijBZ9YX9aG4KIwZ3N7vaj3sfb4bdHqvU1ThCFmKqbVOMxFlxmS7hKGcypT6t+TS/GkODS4YRdiN77tKxW28l4vG2r1hcAG9SvQxu7358EF1pjYJNv3d7gxgsH85Qbbl4KzTTNdGoHkymT3g9WL925kQbvul9HpjudnRqyEVpKpehdkiWZbtGgu4nYIbbwcFw2F1xPH4DNnP8BZetpzQ==">
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>regist-box<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>regist-group<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>label</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>regist-label<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>regist-star<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>*<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>邮箱<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>label</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>regist-cell<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>email<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>regist-input<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>regist-remark regist-warn<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
          <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>i</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>icon-warn<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>i</span><span class="token punctuation">></span></span>邮箱格式不准确（示意）
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>regist-group<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>label</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>regist-label<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>regist-star<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>*<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>密码<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>label</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>regist-cell<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>password<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>regist-input<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>regist-remark<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>请输入6-16位密码，不能使用空格<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>regist-group<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>label</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>regist-label<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>手机号码<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>label</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>regist-cell<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>tel<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>regist-input<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>regist-group<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>i</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>regist-label<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>i</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>regist-cell<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>javascript:<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>regist-btn<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>立即注册<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre></div><div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">.regist-group</span> <span class="token punctuation">{</span>
  <span class="token property">margin</span><span class="token punctuation">:</span> 20px 0<span class="token punctuation">;</span>
  <span class="token property">overflow</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.regist-label</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 70px<span class="token punctuation">;</span>
  <span class="token property">padding-top</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span>
  <span class="token property">float</span><span class="token punctuation">:</span> left<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.regist-cell</span> <span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> inline-block<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.regist-input</span> <span class="token punctuation">{</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 20px<span class="token punctuation">;</span>
  <span class="token property">line-height</span><span class="token punctuation">:</span> 20px<span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 260px<span class="token punctuation">;</span>
  <span class="token property">padding</span><span class="token punctuation">:</span> 9px 5px<span class="token punctuation">;</span>
  <span class="token property">border</span><span class="token punctuation">:</span> 1px solid #d0d6d9<span class="token punctuation">;</span>
  <span class="token property">vertical-align</span><span class="token punctuation">:</span> top<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">/* 容器宽度仅500px */</span>
<span class="token selector">.regist-box</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 500px<span class="token punctuation">;</span>
  <span class="token property">margin</span><span class="token punctuation">:</span> 0 auto<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">/* 邮箱报错那里的警示小图标 */</span>
<span class="token selector">.regist-warn</span> <span class="token punctuation">{</span>
  <span class="token property">padding-left</span><span class="token punctuation">:</span> 16px<span class="token punctuation">;</span>
  <span class="token property">color</span><span class="token punctuation">:</span> #be0000<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.icon-warn</span> <span class="token punctuation">{</span>
  <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span>
  <span class="token property">margin-left</span><span class="token punctuation">:</span> -18px<span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 16px<span class="token punctuation">;</span> <span class="token property">height</span><span class="token punctuation">:</span> 20px<span class="token punctuation">;</span>
  <span class="token property">background</span><span class="token punctuation">:</span> <span class="token url"><span class="token function">url</span><span class="token punctuation">(</span>https://demo.cssworld.cn/images/6/warn.gif<span class="token punctuation">)</span></span> no-repeat center<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">/* 定位在盒子外部的红色星号 */</span>
<span class="token selector">.regist-star</span> <span class="token punctuation">{</span>
  <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span> <span class="token comment">/* 无依赖绝对定位 */</span>
  <span class="token property">margin-left</span><span class="token punctuation">:</span> -1em<span class="token punctuation">;</span>
  <span class="token property">font-family</span><span class="token punctuation">:</span> simsun<span class="token punctuation">;</span>
  <span class="token property">color</span><span class="token punctuation">:</span> #f30<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">/* 超出容器尺寸的提示信息 */</span>
<span class="token selector">.regist-remark</span> <span class="token punctuation">{</span>
  <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span> <span class="token comment">/* 无依赖绝对定位 */</span>
  <span class="token property">margin</span><span class="token punctuation">:</span> 10px 0 0 10px<span class="token punctuation">;</span>
  <span class="token property">color</span><span class="token punctuation">:</span> #666<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.regist-btn</span> <span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> block<span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 160px<span class="token punctuation">;</span>
  <span class="token property">line-height</span><span class="token punctuation">:</span> 40px<span class="token punctuation">;</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> #be0000<span class="token punctuation">;</span>
  <span class="token property">color</span><span class="token punctuation">:</span> #fff<span class="token punctuation">;</span>
  <span class="token property">text-align</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
  <span class="token property">text-decoration</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div></CodeDemo><p>这样一来，提示的显示隐藏不影响原本布局，也跳出了容器宽度的限制。</p>
<p>更智能的是，提示信息的位置智能跟随输入框。比如将输入框宽度变小，提示会自动往前走。与 relative 定位然后 left 定位的做法相比，更简洁、容错性更强。</p>
<p>强调必填项的星号也是无依赖绝对定位实现的。自身绝对定位，保证所有输入框左对齐，同时不影响原先的布局，也就是星号有没有都对布局没影响。</p>
<h4 id="搜索结果定位" tabindex="-1"><a class="header-anchor" href="#搜索结果定位"><span>搜索结果定位</span></a></h4>
<p>在搜索框输入内容时，输入框下显示搜索结果列表。这个列表就可以用无依赖绝对定位。</p>

<CodeDemo id="code-demo-649" type="normal" code="eJyNVc1u20YQfhVCubRRFMkyJVuKU4AUKVn/EhnKFqHLirsiV6ZJiqREykF66iFB2iJogaYwkqLtpT2ll7ZoETRPY8vJW3T5Z8V/dUVQJGe+3fm+4czwcUpzD/VUObUD8YJSdOA4D0cpBwFb0TJj0x+lPhsZFLWDDWvuXvaHxlGKsnSgIM3UIbKJc/Xi1dnvPxNzNloKKM1GE+KYggVwFBtbbpl4L8dyDRIrWruTBdHSazjZyJnrJGgIuB4CgQt07KxB5yTi/c/efrv64dVGEuYmQP42wOZtAPo2QGEN2MkSKZHs+C65pu6lFMch7+j+x3mnHgdYD0NXK1P5XM7yHwQGDWFVcwNLbNCxgTJXrIfAVrFRpnLhkwUgxIZapkqWT20Gf/EZesemTd5smdogNsfUMaTuQAhDl2sDw8EuNslWESyjmLppU/c3Cg5BPBkZ2btUpHj15bMP37w5O/5i9fLHk3ev3//x3dnb16e//X365vjkn6+ou9mRkQgkxXBJXkzlGn1rfgHnmN9kMkmcQDlQbXNuwHJIm5rb+idBhZTxIVBR1jLUB2PgoCJ9Dw/YruDlmjXVZMivI0oaL6nkju0Hz1KFGZJLpYOFXCcw1PaF6t6u8Gicl3MwX13KfZaVayUsi2xjvFc15EFDH+4JBUXR9V6woAcbAl+VUMfC6YOS7rUFRh5yLa/SYXYZg28fcG1uJk1N1KIZedaaeB2/qjFHdJtX04M0vaj78yFjSVO2W6/RuzSncVmt0+xIu3xtxs0qrFZkt+1DJl1RuyUJaduq3y/tq1NZnEm2yuKm72ksW1+oW02DZyxOAdMO9PDBtOX24aDJ7/dUUXQcEfOK3Ozlm1KrLmilZq8iTOkqP2vx01afl8xFI8+pQ6y5wlJtc4X2cEmjhjicyEJT5niertBGmud6flXgC5pXU0zGKy7UsfeIkXLgqMoUWVPr9fubLBBVribuS/vLZa2gd3CdkzltjxdbbF9CW12WKKlXPdZvS8sKj/x2VxM9memSRLaZQaOd5vt52+6G74oRpUFXaBYqw3r94aeUYZI5YSFAJhYyXGTHteAi3yXNA4mtTGVK6DC2W2ZSw2BMCmjuotiRdElQ+TlyZOh11V0o/fMiu1j+Ac5cIHuim16Z0jAkoc+74uSv56vnz06fvnz/06//qyuSuRa1xg2kk46ht2/uXlRE26gUeS8xJ02S9A6Z/hlHAzCgTmSHG+TJeQcW4Bbcjvo/yCghpRIaOpq4ofEozLFPQkZar/AHkQKIHfLlWJL06aZycHVYbRZjCfF4ygQRyK6ERGhOCBdQcKz5QKSYNohyY5hG4CEsPppE65x//+7D8YvV17+cPv3zQqqjr8wlmuu9Lgzi8sRU5g71OfWfixONZHXqyb8887H0">
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>search-box<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>search-input<span class="token punctuation">"</span></span> <span class="token attr-name">placeholder</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>搜索<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>javascript:<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>search-btn<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>搜索<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>search-result<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>search-datalist<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token punctuation">></span></span>搜索结果1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token punctuation">></span></span>搜索结果2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token punctuation">></span></span>搜索结果3<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token punctuation">></span></span>搜索结果4<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token punctuation">></span></span>搜索结果5<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre></div><div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">.search-input</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 20px<span class="token punctuation">;</span>
  <span class="token property">line-height</span><span class="token punctuation">:</span> 20px<span class="token punctuation">;</span>
  <span class="token property">margin</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">padding</span><span class="token punctuation">:</span> 9px 39px 9px 9px<span class="token punctuation">;</span>
  <span class="token property">border</span><span class="token punctuation">:</span> 1px solid #ddd<span class="token punctuation">;</span>
  <span class="token property">transition</span><span class="token punctuation">:</span> border-color .15s<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">/* 搜索按钮的无依赖绝对定位 */</span>
<span class="token selector">.search-btn</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 20px<span class="token punctuation">;</span>
    <span class="token property">height</span><span class="token punctuation">:</span> 20px<span class="token punctuation">;</span>
    <span class="token property">border</span><span class="token punctuation">:</span> 9px solid #fff<span class="token punctuation">;</span>
    <span class="token property">background</span><span class="token punctuation">:</span> #ddd <span class="token url"><span class="token function">url</span><span class="token punctuation">(</span>data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAPdJREFUeNpi+k9lwMRAZYDLwCNAHAnEMkDMDqUjoeL4AZqLfwNxFhAz4MEg+V+4vIxuYApUjBOIG4H4DhD/hNKNUHEGqDqCBh6B8rmA+CgO9Ueh8gxQ9XgjZSqUrgBiKxwhBBIvg7KnEApDcajNdwikjLtQdVKEXPgSSssSiEcZKP2KULIRh9KPCRj4FEqLEjLQEUovJ2DgYihtRygMD5MYy4eJSYfZRKZDEE4C4n+EDPxFRE5hwGcoAw6vgbwTAU0azFA6BohPQQ3BaSgDGSXUXyyG5lNiIDZDhWESLBQUe7OBmA+IFwBxMUyCEexMOhSwZAOAAAMAVJM+EQ2rrOoAAAAASUVORK5CYII=<span class="token punctuation">)</span></span> no-repeat center<span class="token punctuation">;</span>
    <span class="token property">text-indent</span><span class="token punctuation">:</span> -9em<span class="token punctuation">;</span>
    <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span>
    <span class="token property">margin</span><span class="token punctuation">:</span> 1px 0 0 -40px<span class="token punctuation">;</span>
    <span class="token property">transition</span><span class="token punctuation">:</span> background-color .15s<span class="token punctuation">;</span>
    <span class="token property">overflow</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">/* 下拉列表的无依赖绝对定位 */</span>
<span class="token selector">.search-datalist</span> <span class="token punctuation">{</span>
  <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 248px<span class="token punctuation">;</span>
  <span class="token property">border</span><span class="token punctuation">:</span> 1px solid #e6e8e9<span class="token punctuation">;</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> #fff<span class="token punctuation">;</span>
  <span class="token property">box-shadow</span><span class="token punctuation">:</span> 0px 1px 2px #d5d7d8<span class="token punctuation">;</span>
  <span class="token property">text-align</span><span class="token punctuation">:</span> left<span class="token punctuation">;</span>
  <span class="token property">z-index</span><span class="token punctuation">:</span> 1<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.search-datalist a</span> <span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> block<span class="token punctuation">;</span>
  <span class="token property">line-height</span><span class="token punctuation">:</span> 36px<span class="token punctuation">;</span>
  <span class="token property">padding-left</span><span class="token punctuation">:</span> 12px<span class="token punctuation">;</span>
  <span class="token property">color</span><span class="token punctuation">:</span> #5e5e5e<span class="token punctuation">;</span>
  <span class="token property">text-decoration</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">/* 搜索列表的显隐控制 */</span>
<span class="token selector">.search-result</span> <span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.search-input:focus ~ .search-result</span> <span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> block<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div></CodeDemo><p>当输入框高度变化，列表依然与输入框底部完美对齐，这是父元素 relative，然后用 top 定位做不到的。</p>
<div class="hint-container tip">
<p class="hint-container-title">提示</p>
<p>虽然无依赖绝对定位好用，但只建议用在静态交互效果上。如果是动态呈现的列表，建议还是用 JavaScript 计算定位。</p>
</div>
<h3 id="absolute-与-text-align" tabindex="-1"><a class="header-anchor" href="#absolute-与-text-align"><span>absolute 与 text-align</span></a></h3>
<p>按道理说，absolute 和 float 一样，会使元素块状化，应该不受针对 inline 元素的 text-align 的影响。</p>

<CodeDemo id="code-demo-667" type="normal" code="eJwljksOgyAURbfygtM2ooN+0HboKpioECBVMPBsTYx7L+DwnpucnJ1onCfCSCvM980tQGtmBT8jUL84qWrKCWhplMY0aZqD80L6NJcNgpuMgILmp4yGtjxN5ELGEKI5TtiTGeWG134yyjIYpUXpm4SHfvwo71YrGBRd97zdq8xzA4P6QZctgzODQYzK5OA2te6wuGDQuKjth9izomwgnuT4AzoER04=">
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">width</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>120<span class="token punctuation">"</span></span> <span class="token attr-name">height</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>100<span class="token punctuation">"</span></span> <span class="token attr-name">border</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>1px solid #000<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre></div><div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">div</span> <span class="token punctuation">{</span>
  <span class="token property">text-align</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
  <span class="token property">background</span><span class="token punctuation">:</span> #FF9671<span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 280px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 120px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">img</span> <span class="token punctuation">{</span> <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span> <span class="token punctuation">}</span>
</code></pre></div></CodeDemo><p>然而，结果是图片左侧边缘居中了。</p>
<p>事实上，text-align 确实没有影响到块状化的图片，这其实是 strut 节点和无依赖绝对定位共同作用的结果。</p>
<p>具体渲染原理如下：</p>
<ul>
<li>img 是 inline 水平，div 中因而存在一个 strut 节点，strut 节点受 text-align: center 的影响水平居中</li>
<li>img 设置了 absolute，表现为无依赖绝对定位，因此，它会在 strut 节点后面显示，也就形成了图片左侧居中的效果</li>
</ul>
<p>此时只需要设置图片 margin 一半负值大小即可图片居中。这种做法与父级 relative 子级 left: 50% 相比，优势在于不用改变父级的定位，避免可能的层级问题。</p>
<p>利用 text-align 控制 absolute 元素最合适的使用场景是：”返回顶部“ 等小按钮的布局实现。</p>

<CodeDemo id="code-demo-698" type="normal" code="eJyVUcFu1DAQ/ZWREZfCxqFICNzSL8nFsZ3EquOJbG93UdUDB9QeEBcucEHcEBfg1ANq1a/Jtv2LOs423e2tp8TzZt689+aYNKE1hJF9qY9AGO79+4IItIFrq1xBDgoLsAVyo2s7c7puwhqODb7jduqo0BhcTGCEdVuDdyJiTQidZ5RK1WImvF+gMzITluqW18rTN1RoJ4zKOls/keGBouTiMGC3xbFPB42jHRr9xL/7L3lJIk8MIZuMw/HQuNAyNAze5s/3hmejBtMMdvO8W6ZKy12tLQM+D5gKw+ba4dzKmUCDjsGzKq9eV+8ielLYbCO8cUVQyzBLVQapvAd0Z6MKqy+/+rNz4KVHMw8KduimlDxtxSPlqhg5g0ZLqWzi6C+/Pkzdfjztz/5NjYnlkR5WqgqdGmUNQSgbFxSkKKLf3YIk0uvf/1c/L+7HI8F463GoQ6+DxiGP9d40c3P1/fb0c//pvP/zY/XtL1R6qSS8gBJDwHaSsmY6gOHUiU9q3xn+gUFpUBxuBf5qvECcIyd3KTr5RQ==">
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>container<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>align-right<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>follow<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://demo.cssworld.cn/images/6/circle.png<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://demo.cssworld.cn//images/6/backtop.png<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre></div><div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">.container</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 80%<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
  <span class="token property">margin</span><span class="token punctuation">:</span> auto<span class="token punctuation">;</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> #f0f3f9<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.align-right</span> <span class="token punctuation">{</span>
  <span class="token property">text-align</span><span class="token punctuation">:</span> right<span class="token punctuation">;</span> <span class="token comment">/* text-align 控制 absolute */</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">overflow</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span> <span class="token comment">/* 当 absolute 遇到 overflow */</span>
<span class="token punctuation">}</span>
<span class="token selector">.align-right:before</span> <span class="token punctuation">{</span>
  <span class="token property">content</span><span class="token punctuation">:</span> <span class="token string">"\2002"</span><span class="token punctuation">;</span> <span class="token comment">/* 空格 */</span>
<span class="token punctuation">}</span>

<span class="token selector">.follow</span> <span class="token punctuation">{</span>
  <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span> <span class="token comment">/* 这里其实是 fixed + bottom */</span>
<span class="token punctuation">}</span>
<span class="token selector">.follow > img</span> <span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> block<span class="token punctuation">;</span>
  <span class="token property">margin</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div></CodeDemo><p>在 .align-right 的前面插入一个空格，text-align 会使空格处于 .align-right 的右边缘，然后无依赖绝对定位的图片的左边缘正好就是 .align-right 的右边缘。</p>
<p>然而插入的空格会占据一定高度，需要设置 height:0 和 overflow: hidden。</p>
<p>至于 overflow: hidden 会不会裁剪掉图片，这是下节的内容。</p>
<h2 id="absolute-与-overflow" tabindex="-1"><a class="header-anchor" href="#absolute-与-overflow"><span>absolute 与 overflow</span></a></h2>
<p>根据官方文档，overflow 对 absolute 元素的裁剪规则用一句话表示就是：</p>
<blockquote>
<p>绝对定位元素不总是被父级 overflow 裁剪，尤其当 overflow 在绝对定位元素及其包含块之间的时候。</p>
</blockquote>
<p>因此，下面的 HTML 中的图片不会被裁剪：</p>

<CodeDemo id="code-demo-725" type="normal" code="eJxVkLFOwzAURX/lyWwValIm5AALEl/hJYlNbOHake2mkaJO0IkKIZZOSAxsrF3ge2oh/gI7bap2su+90nvnvg5xN5UIoysqGihlbu01QYVuCbohCuDE1g0z91LP91lIxbSCuaCOh3RykRIEnImKuyjTKAttKDNR1i1YLQWFs7RPINktSMKG8BtedI5KawPQOEBAB7W2wgmtMBgmcycalsGCqPHAAl2cMigMXFDKVAbJ6GCC/3za/rxAXgSAmWPgl4+/mw//tvKrpX/98u/r7ffz33oDoyQO6wthCAXqNovGrtOxU+TlQ2X0TFEc+1xObu+CH7jiQY6hh509NFr8AxFjgt4=">
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>overflow<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">width</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>120<span class="token punctuation">"</span></span> <span class="token attr-name">height</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>100<span class="token punctuation">"</span></span> <span class="token attr-name">border</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>1px solid #000<span class="token punctuation">"</span></span>  <span class="token punctuation">/></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre></div><div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">.box</span> <span class="token punctuation">{</span> <span class="token property">position</span><span class="token punctuation">:</span> relative<span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token selector">.overflow</span> <span class="token punctuation">{</span>
  <span class="token property">overflow</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span> <span class="token comment">/* overflow 处于 absolute 元素和包含块之间 */</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
  <span class="token property">background</span><span class="token punctuation">:</span> #0081CF<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">img</span> <span class="token punctuation">{</span> <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span> <span class="token punctuation">}</span>
</code></pre></div></CodeDemo><h2 id="absolute-与-clip" tabindex="-1"><a class="header-anchor" href="#absolute-与-clip"><span>absolute 与 clip</span></a></h2>
<p>css 中有些属性必须和其他属性一起才有效，比如 剪裁属性 clip。</p>
<p>clip 要想起作用，元素必须是 absolute 元素或 fixed 元素。</p>
<h3 id="重新认识-clip-属性" tabindex="-1"><a class="header-anchor" href="#重新认识-clip-属性"><span>重新认识 clip 属性</span></a></h3>
<p>clip 属性语法如下：</p>
<div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token property">clip</span><span class="token punctuation">:</span> <span class="token function">rect</span><span class="token punctuation">(</span>top<span class="token punctuation">,</span> right<span class="token punctuation">,</span> bottom<span class="token punctuation">,</span> left<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">/* 可以用空格替代逗号 */</span>
</code></pre></div><p>clip 属性非常有用，对以下两种场景有不可替代地位：</p>
<ul>
<li>
<p>fixed 元素的裁剪</p>
<p>对于 fixed 元素，overflow 无法对其裁剪，因为其包括含快是 html 元素。但是可以用 clip：</p>
<div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">.fixed-clip</span> <span class="token punctuation">{</span>
  <span class="token property">position</span><span class="token punctuation">:</span> fixed<span class="token punctuation">;</span>
  <span class="token property">clip</span><span class="token punctuation">:</span> <span class="token function">rect</span><span class="token punctuation">(</span>100px 200px 300px 400px<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div></li>
<li>
<p>最佳可访问性隐藏</p>
<p>“可访问性隐藏”指的是内容虽然看不见，却可以被辅助设备识别。</p>
<p>举个例子，为了更好地 SEO，网站名称的代码通常写成：</p>
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>/<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>logo<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">></span></span>css 世界<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span>
</code></pre></div><p>隐藏 h1 标签中的文字，通常有以下几种办法：</p>
<ul>
<li>
<p>下策是 display: none 或 visibility: hidden，因为屏幕阅读器会忽略这里的文字</p>
</li>
<li>
<p>中策是 text-indent 缩进，但如果缩进过大，屏幕阅读器也是不会读取的</p>
</li>
<li>
<p>color: transparent 是移动端上策，但却是桌面端中策，因为很难用简单的方式阻止文本被选中</p>
</li>
<li>
<p>clip 剪裁隐藏是上策，视觉上能隐藏，对屏幕阅读器也友好</p>
<div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">.logo h1</span> <span class="token punctuation">{</span>
  <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span>
  <span class="token property">clip</span><span class="token punctuation">:</span> <span class="token function">rect</span><span class="token punctuation">(</span>0 0 0 0<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div></li>
</ul>
<p>clip 具有很强的适应性，任何元素，任何场景都可以无障碍使用。</p>
</li>
</ul>
<h3 id="深入了解-clip-的渲染" tabindex="-1"><a class="header-anchor" href="#深入了解-clip-的渲染"><span>深入了解 clip 的渲染</span></a></h3>

<CodeDemo id="code-demo-803" type="normal" code="eJxdjt0OgjAMhV+lmbdGEKIJE30SbgZsbHGshI2fhPDuFmI0etXm68n5ujAdWss4y2szQmWF9/eClTgX7FE4gNy0TURbHtGdJjuyynvKnygDyxaZTB00hzSOu/m2AS1NowOH84eUono2PQ6u5nBQsUpVtvMOvQkGHYdeWhHMKHeMo+yVxYmDGAISWgu3++iZH2dyuf47s+RNvt2i9GiHsHVTEVtf+/5ROQ==">
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span><span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre></div><div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">.box</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 300px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
  <span class="token property">background</span><span class="token punctuation">:</span> #f0f3f9<span class="token punctuation">;</span>
  <span class="token property">position</span><span class="token punctuation">:</span> relative<span class="token punctuation">;</span>
  <span class="token property">overflow</span><span class="token punctuation">:</span> auto<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.box img</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 256px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 192px<span class="token punctuation">;</span>
  <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div></CodeDemo><p>此时，滚动条显示得很好。如果对图片进行 clip：</p>

<CodeDemo id="code-demo-810" type="normal" code="eJxdjt0OgjAMRl+lmTeaGEGIJkz0SbgZY2OLYyNs/CSEd3cMo9H0os3pl57OSLhGIYzySg5AFbH2XqDSTAV6FBogl00d+SmP/N53dETUWp8/+QzMa2SUlRMY0jhup9sKBJO1cBjOH1IS+qw70+sKw47HPOVZ4K2x0kmjMXRMEScHFrAZWMeVGTGQ3hmPlkIHn3/mx5lcrv/OLHmT721SWqN6t92mSrarjrp9DKEOmwAtL9/mV58=">
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span><span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre></div><div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">.box</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 300px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
  <span class="token property">background</span><span class="token punctuation">:</span> #f0f3f9<span class="token punctuation">;</span>
  <span class="token property">position</span><span class="token punctuation">:</span> relative<span class="token punctuation">;</span>
  <span class="token property">overflow</span><span class="token punctuation">:</span> auto<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.box img</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 256px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 192px<span class="token punctuation">;</span>
  <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span>
  <span class="token property">clip</span><span class="token punctuation">:</span> <span class="token function">rect</span><span class="token punctuation">(</span>0 0 0 0<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div></CodeDemo><p>滚动条不见了，然而元素的 clientWidth 和 clientHeight 还是和原来一样，只是隐藏的区域无法响应点击行为。总结一下，clip 隐藏仅仅决定那部分是可见的，不可见的部分无法响应事件；虽然视觉上隐藏，尺寸却没有改变。</p>
<h2 id="absolute-的流体特性" tabindex="-1"><a class="header-anchor" href="#absolute-的流体特性"><span>absolute 的流体特性</span></a></h2>
<p>当 absolute 遇到 left/top/right/bottom 时元素才真正的绝对定位。</p>
<p>当在对立方向定位时，absolute 元素具有类似普通 div 的流体特性。</p>
<div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">.div</span> <span class="token punctuation">{</span>
  <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span>
  <span class="token property">left</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span> <span class="token property">right</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span> <span class="token comment">/* 对立方向的定位 */</span>
  <span class="token property">top</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span> <span class="token property">bottom</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span> <span class="token comment">/* 对立方向的定位 */</span>
<span class="token punctuation">}</span>
</code></pre></div><p>与普通元素相比，绝对定位元素的流体特性要强大，因为它可以在水平垂直两个方向同时保持流动性。</p>
<h3 id="absolute-的-margin-auto-居中" tabindex="-1"><a class="header-anchor" href="#absolute-的-margin-auto-居中"><span>absolute 的 margin: auto 居中</span></a></h3>
<p>当 absolute 元素处于流体状态时，各盒模型属性的解析和普通流体元素是一样的，margin 负值可以让元素尺寸变大，margin: auto 可以使元素居中。</p>
<ul>
<li>如果一侧定值一侧 auto，auto 为剩余空间大小</li>
<li>两侧均是 auto，则平分剩余空间</li>
</ul>
<p>因此。以下这种水平垂直居中用法可以淘汰了。</p>
<div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">.center</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
  <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span>
  <span class="token property">left</span><span class="token punctuation">:</span> 50%<span class="token punctuation">;</span>
  <span class="token property">top</span><span class="token punctuation">:</span> 50%<span class="token punctuation">;</span>
  <span class="token property">margin-left</span><span class="token punctuation">:</span> -100px<span class="token punctuation">;</span>
  <span class="token property">margin-top</span><span class="token punctuation">:</span> -100px<span class="token punctuation">;</span>
  <span class="token comment">/* 或者 transform */</span>
  <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">translate</span><span class="token punctuation">(</span>-50%<span class="token punctuation">,</span> -50%<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>推荐的做法是利用 absolute 元素的流体特性和 margin: auto 的自动分配机制实现：</p>
<div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">.center</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
  <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span>
  <span class="token property">left</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span> <span class="token property">right</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span> <span class="token property">top</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span> <span class="token property">bottom</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">margin</span><span class="token punctuation">:</span> auto<span class="token punctuation">;</span> <span class="token comment">/* 自动分配水平垂直的剩余空间 */</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="position-relative" tabindex="-1"><a class="header-anchor" href="#position-relative"><span>position: relative</span></a></h2>
<p>说到 relative 定位，最常用的就是对 absolute 元素的定位参考。</p>
<p>虽然 relative/absolute/fixed 都能对 absolute 元素的定位产生限制，但只有 relative 可以让元素保持在正常文档流中。</p>
<p>说回 relative 定位本身，relative 定位会相对自身偏移，且一般不会影响周围元素的局部。</p>
<p>来看个 relative 偏移和 margin 偏移的对比例子：</p>

<CodeDemo id="code-demo-871" type="normal" code="eJy9kj1OwzAUx69imYGFfDTAkqY5AifIksameapjW7EpRVUXloqBrRNcgIkdUOEyjXoN/JGCQELqxGS///s9v/e3vcC1bhhOcUZghipWKjUqsC7HjBY4LzhCPxOkV41en+Xbzcdu/dSU7QR49/yw3dxnkZF7AJoJugaia1M4SOICo5rCpNY2jG04Fi2hrQ3lHCnBgKCj2GUErxhUU9uxBhW69hdlQ0fHchoMjoffU8h8d/vSrd66x/fd3ap7XZuBskoQmocWzSK3zyLpzUTGzYG2WspKDTP6f8aSw40lfxjbr/gEV0qZdw3dW6KFhdzMKTqNYzkfWoGAkqy8SRFwBpwGjnUZtwtMTlzpFF3CnBKjLwseauIP+6r1aEUZ6wl7757xPyPQQqYoOPddeyLxhBQKNAieov11+/a/KvDyE+Xk8XA=">
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>table<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>td<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h4</span><span class="token punctuation">></span></span>使用margin定位<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h4</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">width</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>120<span class="token punctuation">"</span></span> <span class="token attr-name">height</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>100<span class="token punctuation">"</span></span> <span class="token attr-name">border</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>1px solid #000<span class="token punctuation">"</span></span> <span class="token special-attr"><span class="token attr-name">onclick</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span><span class="token value javascript language-javascript"><span class="token keyword">this</span><span class="token punctuation">.</span>className<span class="token operator">=</span><span class="token string">'pk-1'</span><span class="token punctuation">;</span></span><span class="token punctuation">"</span></span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>点击图片应用<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>code</span><span class="token punctuation">></span></span>.pk-1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>code</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>td<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h4</span><span class="token punctuation">></span></span>使用relative定位<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h4</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">width</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>120<span class="token punctuation">"</span></span> <span class="token attr-name">height</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>100<span class="token punctuation">"</span></span> <span class="token attr-name">border</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>1px solid #000<span class="token punctuation">"</span></span> <span class="token special-attr"><span class="token attr-name">onclick</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span><span class="token value javascript language-javascript"><span class="token keyword">this</span><span class="token punctuation">.</span>className<span class="token operator">=</span><span class="token string">'pk-2'</span><span class="token punctuation">;</span></span><span class="token punctuation">"</span></span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>点击图片应用<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>code</span><span class="token punctuation">></span></span>.pk-2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>code</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre></div><div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">.table</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 300px<span class="token punctuation">;</span>
  <span class="token property">display</span><span class="token punctuation">:</span> inline-table<span class="token punctuation">;</span>
  <span class="token property">table-layout</span><span class="token punctuation">:</span> fixed<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.td</span> <span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> table-cell<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.pk-1</span> <span class="token punctuation">{</span>
  <span class="token property">margin-top</span><span class="token punctuation">:</span> -50px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.pk-2</span> <span class="token punctuation">{</span>
  <span class="token property">position</span><span class="token punctuation">:</span> relative<span class="token punctuation">;</span>
  <span class="token property">top</span><span class="token punctuation">:</span> -50px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div></CodeDemo><p>两者都进行了偏移，但是 margin 偏移后面的文字跟上来了，而 relative 则没有。</p>
<h3 id="relative-的最小化影响原则" tabindex="-1"><a class="header-anchor" href="#relative-的最小化影响原则"><span>relative 的最小化影响原则</span></a></h3>
<ul>
<li>尽量不使用 relative，如果想定位元素，尝试使用无依赖绝对定位</li>
<li>如果一定要用 relative，则务必使其影响最小</li>
</ul>
<p>第一点的无依赖定位前面介绍过，第二点来看个例子：假设为一个模块提供右上角的关闭按钮，通常写法是：</p>
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span><span class="token value css language-css"><span class="token property">position</span><span class="token punctuation">:</span> relative</span><span class="token punctuation">"</span></span></span><span class="token punctuation">></span></span><span class="token comment">&lt;!-- 直接父元素 relative --></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span><span class="token value css language-css"><span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span> <span class="token property">top</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span> <span class="token property">right</span><span class="token punctuation">:</span> 0</span><span class="token punctuation">"</span></span></span> <span class="token punctuation">/></span></span><span class="token comment">&lt;!-- icon 绝对定位 --></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>一些内容<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre></div><p>但是，根据 relative 的最小化元素，应该这样实现：</p>
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span><span class="token value css language-css"><span class="token property">position</span><span class="token punctuation">:</span> relative</span><span class="token punctuation">"</span></span></span><span class="token punctuation">></span></span><span class="token comment">&lt;!-- 另外提供 relative 父级 --></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span><span class="token value css language-css"><span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span> <span class="token property">top</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span> <span class="token property">right</span><span class="token punctuation">:</span> 0</span><span class="token punctuation">"</span></span></span> <span class="token punctuation">/></span></span><span class="token comment">&lt;!-- icon 绝对定位 --></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>一些内容<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre></div><p>此时，relative 只影响到 icon 图标。</p>
<h2 id="position-fixed" tabindex="-1"><a class="header-anchor" href="#position-fixed"><span>position: fixed</span></a></h2>
<p>蒙层弹窗是常见的交互，其中半透明全屏覆盖的蒙层基本都是用 fixed 定位的。但是，这样蒙层无法覆盖浏览器右侧的滚动条，且鼠标滚动时，蒙层后的内容也可以滚动，体验不好。</p>
<p>那么，如何实现背景锁定？</p>
<p>之所以如此，是因为滚动的是 html 元素，它正好是 fixed 元素的包含块。所以，可以让滚动条由 html 内的一个元素提供。</p>
<p>如果结构调整不方便，可以用 JavaScript 调整。</p>
<p>对于移动端，阻止 touchmove 事件即可；桌面端可以让 html 元素 overflow: hidden，但是这样滚动条的消失会有宽度变化，因此我们需要找个东西填充消失的宽度，比如透明 border：</p>
<p>蒙层出现时：</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> barWidth <span class="token operator">=</span> <span class="token number">17</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> root <span class="token operator">=</span> document<span class="token punctuation">.</span>documentElement<span class="token punctuation">;</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> window<span class="token punctuation">.</span>innerWidth <span class="token operator">===</span> <span class="token string">'number'</span><span class="token punctuation">)</span>
  barWidth <span class="token operator">=</span> window<span class="token punctuation">.</span>innerWidth <span class="token operator">-</span> root<span class="token punctuation">.</span>clientWidth<span class="token punctuation">;</span>
root<span class="token punctuation">.</span>style<span class="token punctuation">.</span>overflow <span class="token operator">=</span> <span class="token string">'hidden'</span><span class="token punctuation">;</span>
root<span class="token punctuation">.</span>style<span class="token punctuation">.</span>borderRight <span class="token operator">=</span> barWidth <span class="token operator">+</span> <span class="token string">'px solid transparent'</span><span class="token punctuation">;</span>
</code></pre></div><p>蒙层隐藏时：</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> root <span class="token operator">=</span> document<span class="token punctuation">.</span>documentElement<span class="token punctuation">;</span>
root<span class="token punctuation">.</span>style<span class="token punctuation">.</span>overflow <span class="token operator">=</span> <span class="token string">''</span><span class="token punctuation">;</span>
root<span class="token punctuation">.</span>style<span class="token punctuation">.</span>borderRight <span class="token operator">=</span> <span class="token string">''</span><span class="token punctuation">;</span>
</code></pre></div></div></template>


