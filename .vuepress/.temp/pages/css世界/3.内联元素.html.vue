<template><div><h1 id="内联元素" tabindex="-1"><a class="header-anchor" href="#内联元素"><span>内联元素</span></a></h1>
<h2 id="字母x" tabindex="-1"><a class="header-anchor" href="#字母x"><span>字母x</span></a></h2>
<p><img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/e6c9d24egy1h0lbq3v7wrj22800liwid.jpg" alt=""></p>
<ul>
<li>ascender height：上下线高度</li>
<li>cap height：大写字母高度</li>
<li>median：中线</li>
<li>baseline：基线</li>
<li>descender height：下行线高度</li>
</ul>
<h3 id="基线" tabindex="-1"><a class="header-anchor" href="#基线"><span>基线</span></a></h3>
<p>字母 x 的下边缘就是基线 baseline。</p>
<p>它是 vertical-align 的默认值。</p>
<h3 id="x-height" tabindex="-1"><a class="header-anchor" href="#x-height"><span>x-height</span></a></h3>
<p>小写字母 x 的高度，即基线( baseline )和中线( median )间的距离。</p>
<p>css 中有些属性的定义就和 x-height 有关。</p>
<p>典型代表就是 vertical-align:middle，这里 middle 和上图中的 median 是两个东西。在 css 世界中，middle 指的是基线往上 1/2 x-height 的高度，可以理解为 x 的中点位置。</p>
<h3 id="ex单位" tabindex="-1"><a class="header-anchor" href="#ex单位"><span>ex单位</span></a></h3>
<p>ex 是 css 中的一个标准单位，指的是字母 x 的高度，即 x-height。</p>
<p>ex 不受 font-family 和 font-size 的影响。</p>

<CodeDemo id="code-demo-66" type="normal" code="eJxFjs0OwiAQhF9lw0kTW9TEC/48SS8IG9hIFwI0rZq+u7UePE6+zHzzFr72QSjx8prdRDwNFwITdCnXTpCJ3Oic49iJ20XSrWOxE6aUpdD+Ibw7BrBUUtBPBcSBGJt7iOZx/pKRbPUKjvs0rdkjOV8VHPCX79o8XI4DWwVDDhtfaypKSot9bBfbGHOwrWFJvXZY5Emu2jax2wLHJmNCXcEgV8zL4rzcnD8sNEwT">
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code>zhangxinxu<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>i</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>icon-arrow<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>i</span><span class="token punctuation">></span></span>
</code></pre></div><div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">.icon-arrow</span> <span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> inline-block<span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 20px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 1ex<span class="token punctuation">;</span>
  <span class="token property">background</span><span class="token punctuation">:</span> <span class="token url"><span class="token function">url</span><span class="token punctuation">(</span>https://demo.cssworld.cn/images/5/arrow.png<span class="token punctuation">)</span></span> no-repeat center<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div></CodeDemo><p>上面例子中，即使把字体修改，或字号设置得很大，也居中对齐。</p>
<h2 id="内联元素的基石-line-height" tabindex="-1"><a class="header-anchor" href="#内联元素的基石-line-height"><span>内联元素的基石：line-height</span></a></h2>
<p>先来复习一下内联盒模型，对理解 line-height 很重要：</p>
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>这是一行普通的文字<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>em</span><span class="token punctuation">></span></span>em<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>em</span><span class="token punctuation">></span></span>另一行文字<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
</code></pre></div><p>这里包含了多种盒子：</p>
<ul>
<li>
<p>内容区域( content area )</p>
<p>内容区域就是鼠标选中文本时浏览器高亮显示的区域。</p>
</li>
<li>
<p>内联盒子( inline box )</p>
<p>“这是一行普通的文字”、em 标签、“另一行文字”分别为三个内联盒子</p>
</li>
<li>
<p>行框盒子( line box )</p>
<p>”这是一行普通的文字<em>em</em>另一行文字“整体就是一个行框盒子，它由内联盒子组成。</p>
</li>
<li>
<p>包含盒子( containing box )</p>
<p>p 标签就是包含盒子，它由一个个行框盒子组成，多行文本时较明显。</p>
</li>
</ul>
<h3 id="内联元素的高度之本-line-height" tabindex="-1"><a class="header-anchor" href="#内联元素的高度之本-line-height"><span>内联元素的高度之本：line-height</span></a></h3>
<p>空 div 的高度是 0，当在里面写入文字，高度便有了。</p>
<p>本质上，高度不是由文字撑开的，而是 line-height。下面的例子中，即使 font-size 为 0，div 一样有高度。</p>

<CodeDemo id="code-demo-126" type="normal" code="eJyrVsooyc1RslKyScksU0jOSSwuto1RKkktLjGMUbJ71jHx+ayWl6tnPN217NmM9e/3zLfRB6qzi8nDUG6EV7mSjlJycTHQGj2w0ToKYNpIoTomT0EhN7EoPTPPSsHIpKBCwcAaJJSUX5SSWmSlYAgUKc7PyUxRUE5OToZIJSZnpxfll+alWCkop6amAgVrY/Ig5kLMS8vPK9EtzqxKBeo3K6gA68rJzEvVzUjNTM8osQLbAdMDdQOSHogLUDRAjQHqUaoFAH8ycvE=">
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>test1<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>我的高度是？<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>test2<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>我的高度是？<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre></div><div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">.test1, .test2</span> <span class="token punctuation">{</span>
  <span class="token property">margin</span><span class="token punctuation">:</span> 24px 0<span class="token punctuation">;</span>
  <span class="token property">border</span><span class="token punctuation">:</span> 1px solid #ccc<span class="token punctuation">;</span>
  <span class="token property">background</span><span class="token punctuation">:</span> #eee<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.test1</span> <span class="token punctuation">{</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 16px<span class="token punctuation">;</span>
  <span class="token property">line-height</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.test2</span> <span class="token punctuation">{</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">line-height</span><span class="token punctuation">:</span> 16px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div></CodeDemo><p><strong>对于非替换元素的纯 inline 元素，其可视高度完全由 line-height 决定。</strong></p>
<p>而 line-height 的高度作用细节是用行距来解释的。传统印刷的行距是上下两行文字之间的间隙，这也意味着第一行文字上方是没有行距的。</p>
<p>在 css 中，一个行距分散在文字的上方和下方，它们称为半行距。</p>

<CodeDemo id="code-demo-139" type="normal" code="eJxljsuOwjAMRX/Fyno6MDPSLELpl2QTUtNYpE5VG1pA/Dt9CDasLB/fa527idomY01Z0wVC8iJ7ZxRFnakcA5TSea6ki8RjuVkWx+VmSk/TfJkgMrW/5wbc58IxsxZH31K6WhBq5cy7Nxe6oYX/bTcuLBFjEZGaqBZ+fl/44MOp6fOZ6yLklHsLV0wpD8txoFqjhb/tK604auETNWwhICv2E344Xp0qmJ1Xtc+/QyTFNW4eT+DVXGQ=">
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>test<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span><span class="token punctuation">></span></span>sphinx<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre></div><div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">.test</span> <span class="token punctuation">{</span>
  <span class="token property">font-family</span><span class="token punctuation">:</span> simsun<span class="token punctuation">;</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 60px<span class="token punctuation">;</span>
  <span class="token property">line-height</span><span class="token punctuation">:</span> 120px<span class="token punctuation">;</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> yellow<span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 300px<span class="token punctuation">;</span>
  <span class="token property">text-align</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.test > span</span> <span class="token punctuation">{</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> white<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div></CodeDemo><p>上面例子中，白色和黄色背景上下的间距就是半间距。</p>
<p>了解了行距，那么 line-height 是如何通过改变行距实现文字排版？</p>
<p>有个公式：行距 = lineHeight - fontSize</p>
<ul>
<li>当 line-height: 2 时，行距 = fontSize，则两行文本的间距就是 fontSize。</li>
<li>当 line-height: 1 时，行距 = 0，此时两行文本间紧挨在一起</li>
<li>当 line-height: 0.5 时，行距为负值，两行文字重叠。</li>
</ul>

<CodeDemo id="code-demo-169" type="normal" code="eJy1kDFOwzAUhq/y5BGRRklhMSES9/CSOk5j1bUj26UtVRc2oOUECAErFWIvx4GmG1fAaVoIUjfEYsvv/e/7f78Jym1fIIyilJ8DFYkxpwRZZixUhxcQFBMJEJkikXG5WATrx1nkb15RR8ff9fCnTmTkO1p174eG/wFt/wmKDhE1xu2htSFOKhJAyk0hkjEGLgWXzOsIRXsndS9T0npZ0ufC9Q3vm4Fsdgy/YBjCo2K0rXYS2utqNZCpR5VQGsOYCaGGrj0lsraNoYq1c1cDW7liCIoRGCV4Cpqltd4/gNX8yf3k4+W+vH39fJtR58qkLZ8f1teXq7ur9+VNuZzDgf8bjjOu3bZozkWKk8wyvbPbAjAQRMgZQdvcw5xb5rlR6pIUmjXyesFudrOdnPFu7ubDpiTcKwmakvZeSeu41qDpF7Cf+jg=">
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>test test-1<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span><span class="token punctuation">></span></span>第1行<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>br</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span><span class="token punctuation">></span></span>第2行<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>test test-2<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span><span class="token punctuation">></span></span>第1行<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>br</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span><span class="token punctuation">></span></span>第2行<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>test test-3<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span><span class="token punctuation">></span></span>第1行<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>br</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span><span class="token punctuation">></span></span>第2行<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre></div><div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">.test</span> <span class="token punctuation">{</span>
    <span class="token property">display</span><span class="token punctuation">:</span> inline-block<span class="token punctuation">;</span>
    <span class="token property">font-family</span><span class="token punctuation">:</span> simsun<span class="token punctuation">;</span>
    <span class="token property">font-size</span><span class="token punctuation">:</span> 24px<span class="token punctuation">;</span>
    <span class="token property">background-color</span><span class="token punctuation">:</span> yellow<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.test > span</span> <span class="token punctuation">{</span>
    <span class="token property">outline</span><span class="token punctuation">:</span> 1px solid red<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">/* 换行实现，content章节有介绍 */</span>
<span class="token selector">.test > span:first-child:after</span> <span class="token punctuation">{</span>
    <span class="token property">content</span><span class="token punctuation">:</span> <span class="token string">"\A"</span><span class="token punctuation">;</span>
    <span class="token property">white-space</span><span class="token punctuation">:</span> pre<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.test-1</span> <span class="token punctuation">{</span>
    <span class="token property">line-height</span><span class="token punctuation">:</span> 2<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.test-2</span> <span class="token punctuation">{</span>
    <span class="token property">line-height</span><span class="token punctuation">:</span> 1<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.test-3</span> <span class="token punctuation">{</span>
    <span class="token property">line-height</span><span class="token punctuation">:</span> .5<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div></CodeDemo><p>上面介绍的是纯 inline 元素，对于替换元素和块状元素：</p>
<ul>
<li>line-height 不影响替换元素（比如图片）的高度</li>
<li>line-height 不影响块级元素本身，但可以改变其内部的 inline 元素</li>
</ul>

<CodeDemo id="code-demo-188" type="normal" code="eJwljUsKwzAMRK8yqNt+3EC7CG5P4k0Tm1jgxCUybSDk7pHJSjxJ82alWMZELVnPP/TpI/Jy1OXF0dtNgOVxwJ99ibq+N8YRYuAhloqmYpdnH+aK3wWSE3ucTL1o3t7UqpPO1Itoy1XNWJF4CpfD06J5PDW56de2A3p8LJA=">
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">width</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>120<span class="token punctuation">"</span></span> <span class="token attr-name">height</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>100<span class="token punctuation">"</span></span> <span class="token attr-name">border</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>1px solid #000<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre></div><div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">.box</span> <span class="token punctuation">{</span> <span class="token property">line-height</span><span class="token punctuation">:</span> 256px <span class="token punctuation">}</span>
</code></pre></div></CodeDemo><p>这个例子中，box 的高度是 256px，但不是因为 line-height 影响了图片使其撑开，而是因为幽灵空白节点。</p>
<p>图片为 inline 元素，会构成一个行框盒子( line box )，在 HTML5 的模式下，每个 line box 前面都有一个幽灵空白节点，line-height 作用于它，使其高度为 256px。</p>
<p><strong>实际开发中，图文混排是很常见的</strong>。</p>
<p>比如一张图片后面跟一段文本，它们都是 inline 元素，会构成一个 line box，line-height 只影响其中的文本内容。</p>
<p>对于“文字后跟一个图标”这种场景，有时会很奇怪，比如设置了 line-height: 20px，line box 的高度却是 21 或 22px。这种现象是 vertical-align 造成的，后面会介绍。</p>
<h3 id="line-height-实现近似垂直居中" tabindex="-1"><a class="header-anchor" href="#line-height-实现近似垂直居中"><span>line-height 实现近似垂直居中</span></a></h3>
<p>有这样一种场景：让一个标题的文字垂直居中。通常会用以下代码：</p>
<div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">.title</span> <span class="token punctuation">{</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 24px<span class="token punctuation">;</span> <span class="token comment">/* 不需要 */</span>
  <span class="token property">line-height</span><span class="token punctuation">:</span> 24px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>这里有两个问题：</p>
<ul>
<li>
<p>为什么可以用 line-height 实现居中</p>
<p><strong>事实上，行高可以实现垂直居中原因在于 css 中行距是上下等分的</strong>。</p>
<p>另外，多行文本也可以用这个技巧，只是要借助 vertical-align。</p>

<CodeDemo id="code-demo-228" type="normal" code="eJxlj91KAkEYhm9lmE7TzE5qsq5kT8bZ2d3BcUZ2RzNEMCmKEM/6wWQjiCJCSehApLvJ2dWjbqFxty2kow+eD97nfVvQU1UOESzZrAEIx0FwYMGybFrw0BIArGEihaJCmZe+n81n/cVDb/l6q8dh3H+LB6f6cWBIdH2uRzc67MZ373pyNp+OoquLKBx+ffSWw87i6aRBfcUI5jnMmSv0JIw6z3o61pcvn51uacsIjTm7cBOSIDD98qYTaK0qHTFbeQgUdwu15v4KcCZozqPM9RQC28UMlzGpuL6sCztHJJc+AhtOwdlx9pJvFfsuEwjgupIGtC2R/5mXWmwW1Dg+RoCJJL/MJan81/3asrzCH1K0qdKRCHDqqASur0egymyb07QBbH8DBzmi3w==">
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>content<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>基于行高实现的多行文字垂直居中效果，需要vertical-align属性帮助。<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre></div><div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">.box</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 280px<span class="token punctuation">;</span>
  <span class="token property">line-height</span><span class="token punctuation">:</span> 120px<span class="token punctuation">;</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> #f0f3f9<span class="token punctuation">;</span>
  <span class="token property">margin</span><span class="token punctuation">:</span> auto<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.content</span> <span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> inline-block<span class="token punctuation">;</span>
  <span class="token property">line-height</span><span class="token punctuation">:</span> 20px<span class="token punctuation">;</span>
  <span class="token property">margin</span><span class="token punctuation">:</span> 0 20px<span class="token punctuation">;</span>
  <span class="token property">text-align</span><span class="token punctuation">:</span> left<span class="token punctuation">;</span>
  <span class="token property">vertical-align</span><span class="token punctuation">:</span> middle<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div></CodeDemo><p>实现原理有两点：</p>
<ul>
<li>用 display: inline-block 产生 line box，随之产生的是幽灵空白节点，line-height 则作用于这个空白节点，使高度撑高到 120px。</li>
<li>然后用 vertical-align 调整多行文本的对齐</li>
</ul>
</li>
<li>
<p>这种垂直居中只是近似的，文字的垂直中线普遍要比 line box 的中线要低一点点。</p>

<CodeDemo id="code-demo-252" type="normal" code="eJyrVsooyc1RslKyKbB7um/di73rX85ufbl7oo1+gV1MnpKOUnJxMVC2QKE6Jk9BIS0/r0S3OLMq1UrBwqCgwhoklpOZl6qbkZqZnlFipWBoBBPOTSxKz8yzUjAA85ISk7PTi/JL81KsFJTNzMzAgmDT0hJzM3MqrRTUczOTi/KL89NKFCoTgcapg5Uk5+fkFwG1pKWlAfm1QBfVAgDf4T6m">
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>微软雅黑<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
</code></pre></div><div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">p</span> <span class="token punctuation">{</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 80px<span class="token punctuation">;</span>
  <span class="token property">line-height</span><span class="token punctuation">:</span> 120px<span class="token punctuation">;</span>
  <span class="token property">margin</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">background</span><span class="token punctuation">:</span> #666<span class="token punctuation">;</span>
  <span class="token property">font-family</span><span class="token punctuation">:</span> <span class="token string">'microsoft yahei'</span><span class="token punctuation">;</span>
  <span class="token property">color</span><span class="token punctuation">:</span> #fff<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div></CodeDemo><p>这个例子中，文字是稍微偏下的。平时注意不到可能是字体太小没发现。</p>
<p>至于为什么，它和 line-height 无关，和 vertical-align 有关。这已经是第二个由 vertical-align 造成的奇怪现象了。后面 vertical-align 的章节会介绍。</p>
</li>
</ul>
<h3 id="line-height-的属性值" tabindex="-1"><a class="header-anchor" href="#line-height-的属性值"><span>line-height 的属性值</span></a></h3>
<p>line-height 的默认值是 normal，还支持 数值、百分比、长度值。</p>
<p><strong>line-height: normal 和 font-family 有密切关联</strong>。也就是说，不同字体的 line-height: normal 行高是不同的。</p>
<p>几种浏览器不同字体的 line-height: normal 对比：</p>
<table>
<thead>
<tr>
<th style="text-align:center">字体</th>
<th style="text-align:center">Chrome</th>
<th style="text-align:center">Firefox</th>
<th style="text-align:center">IE</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">微软雅黑</td>
<td style="text-align:center">1.32</td>
<td style="text-align:center">1.321</td>
<td style="text-align:center">1.32</td>
</tr>
<tr>
<td style="text-align:center">宋体</td>
<td style="text-align:center">1.141</td>
<td style="text-align:center">1.142</td>
<td style="text-align:center">1.141</td>
</tr>
</tbody>
</table>
<p>可见，相同字体在各个浏览器的表现是一样的，只是不同字体的行高会不同。</p>
<p>因此，实际开发中，对 line-height 的重置是很有必要的。</p>
<p>Line-height 是根据 font-size 计算的，本来以下三种的计算值都是 21 px：</p>
<div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">body</span> <span class="token punctuation">{</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 14px<span class="token punctuation">;</span>
  <span class="token property">line-height</span><span class="token punctuation">:</span> 1.5<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">body</span> <span class="token punctuation">{</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 14px<span class="token punctuation">;</span>
  <span class="token property">line-height</span><span class="token punctuation">:</span> 150%<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">body</span> <span class="token punctuation">{</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 14px<span class="token punctuation">;</span>
  <span class="token property">line-height</span><span class="token punctuation">:</span> 15em<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>但是它们的继承方式不同，数值方式会被直接继承，另外两种则是继承计算值。</p>
<p>参考以下例子：</p>

<CodeDemo id="code-demo-340" type="normal" code="eJyrVsooyc1RslKyScksU0jOSSwuto1RSsqvUABiXcMYJbuYPAUgsMkwtnu2oP3lohk2+kAmVLDA7mlb69N1O230C4BCNvpAM0A0NqOMqGeUMVlGKekoJRcXA32qBzJHQaFaIS0/r0S3OLMq1UrB0KSgwlqhNiYPJKlrCJTMycxL1c1IzUzPKAFK65kiZI0wZE0NVBHSxlg0p+aC5WPyMox1FAqACnITi9Iz86wUDMDiGSA9SK4xNoK6pgDNmUYGUAmlWgAzMJWG">
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box box-1<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h3</span><span class="token punctuation">></span></span>标题<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h3</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>内容<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box box-2<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h3</span><span class="token punctuation">></span></span>标题<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h3</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>内容<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box box-3<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h3</span><span class="token punctuation">></span></span>标题<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h3</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>内容<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre></div><div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">.box</span>   <span class="token punctuation">{</span> <span class="token property">font-size</span><span class="token punctuation">:</span> 14px<span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token selector">.box-1</span> <span class="token punctuation">{</span> <span class="token property">line-height</span><span class="token punctuation">:</span> 1.5<span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token selector">.box-2</span> <span class="token punctuation">{</span> <span class="token property">line-height</span><span class="token punctuation">:</span> 150%<span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token selector">.box-3</span> <span class="token punctuation">{</span> <span class="token property">line-height</span><span class="token punctuation">:</span> 1.5em<span class="token punctuation">;</span> <span class="token punctuation">}</span>

<span class="token selector">h3, p</span> <span class="token punctuation">{</span> <span class="token property">margin</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token selector">h3</span> <span class="token punctuation">{</span> <span class="token property">font-size</span><span class="token punctuation">:</span> 32px<span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token selector">p</span>  <span class="token punctuation">{</span> <span class="token property">font-size</span><span class="token punctuation">:</span> 20px<span class="token punctuation">;</span> <span class="token punctuation">}</span>
</code></pre></div></CodeDemo><p>百分比和 em 方式的之所以会重叠，是因为 p 元素继承的不是 150% 或 1.5em，而是 21px 这个计算值，这小于它们的 font-size，造成了重叠。</p>
<p>总的来说，对于一个重图文内容展示的网页，比如博客、论坛等，建议用数值类型的 line-height: 1.6 ~ 1.8 较合适。</p>
<h3 id="inline-元素-line-height-的大值特性" tabindex="-1"><a class="header-anchor" href="#inline-元素-line-height-的大值特性"><span>inline 元素 line-height 的大值特性</span></a></h3>
<p>参考以下例子：</p>

<CodeDemo id="code-demo-356" type="normal" code="eJydj8HOwiAQhF9lg9ffX1sTo1h9Ei6UblsihaZQbWJ8d1lM1IMmxgOQzM5+M1xYGzrDOCsqfQJlpPd7wUo3QTyZYAdhAQrfS3ugi4PRFuct6qYNPF/2U7FIQ2GLRSTQ+waU/wJif0x5H6v9E+VC+2ddhZZDvon+HQmdHBodYRl2IMfgkujGQPCo9hN4Z3QFsxIVYpnGAacwl0Y3cU+hDTgkuZTq2AxutBWHWb2sV/U26ldhKT675792hu06lXg4qP4bG/3tacu/cHwAPfPY9QbbYJRG">
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box box1<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span><span class="token punctuation">></span></span>span: line-height:20px<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box box2<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span><span class="token punctuation">></span></span>span: line-height:20px<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre></div><div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">.box</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 280px<span class="token punctuation">;</span>
  <span class="token property">margin</span><span class="token punctuation">:</span> 1em auto<span class="token punctuation">;</span>
  <span class="token property">outline</span><span class="token punctuation">:</span> 1px solid #beceeb<span class="token punctuation">;</span>
  <span class="token property">text-align</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
  <span class="token property">background</span><span class="token punctuation">:</span> #f0f3f9<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.box1</span> <span class="token punctuation">{</span>
  <span class="token property">line-height</span><span class="token punctuation">:</span> 96px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.box1 span</span> <span class="token punctuation">{</span>
  <span class="token property">line-height</span><span class="token punctuation">:</span> 20px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.box2</span> <span class="token punctuation">{</span>
  <span class="token property">line-height</span><span class="token punctuation">:</span> 20px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.box2 span</span> <span class="token punctuation">{</span>
  <span class="token property">line-height</span><span class="token punctuation">:</span> 96px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div></CodeDemo><p>这两个盒子最终的行高都表现为 96px。</p>
<p>也就是说，无论 inline 元素的 line-height 如何设置，最终父级元素的高度都是由数值大的 line-height 决定的。</p>
<p>在 box1 中，span 的 line-height: 20px 确实覆盖了父级元素，但是，由于 strut 节点的存在，它的 line-height 是继承自 .box 的 96px。</p>
<div class="hint-container tip">
<p class="hint-container-title">提示</p>
<p>在 HTML5 文档中，每个 line box 前面都有一个 strut 节点。</p>
<p>span 是 inline box，有 inline box 就会产生 line box，line box 将多个 inline box 包裹起来的。</p>
</div>
<h2 id="vertical-align" tabindex="-1"><a class="header-anchor" href="#vertical-align"><span>vertical-align</span></a></h2>
<div class="hint-container tip">
<p class="hint-container-title">提示</p>
<p>凡是 line-height 起作用的地方 vertical-align 也一定起作用。</p>
</div>
<p>来看一个表现怪异的例子：</p>

<CodeDemo id="code-demo-388" type="normal" code="eJyrVsooyc1RslKyScksU0jOSSwuto1RSsqviFGyi8lTULApLkjMs3s2rf3p2uk2+mBOTJ6NPlAxkFbSUUouLgZq1gNqUKhWyMnMS9XNSM1MzyixUjA2KqiwVqiNyQNpAkqm5eeV6BZnVqVaKRiZQKWUagFXPix4">
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span><span class="token punctuation">></span></span>文字<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre></div><div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">.box</span> <span class="token punctuation">{</span> <span class="token property">line-height</span><span class="token punctuation">:</span> 32px<span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token selector">span</span> <span class="token punctuation">{</span> <span class="token property">font-size</span><span class="token punctuation">:</span> 24px<span class="token punctuation">;</span> <span class="token punctuation">}</span>
</code></pre></div></CodeDemo><p>按正常理解，box 的高度应该是 32px，但事实上并不是，高度会比 32 大几像素，具体受 font-family 影响。在这个例子中，box 高度为 35px，文字高度 28px。</p>
<p>这是由 vertical-align 造成的。</p>
<h3 id="vertical-align-的属性值" tabindex="-1"><a class="header-anchor" href="#vertical-align-的属性值"><span>vertical-align 的属性值</span></a></h3>
<p>vertical-align 的属性值可以分为几类：</p>
<ul>
<li>线类：baseilne( 默认值 )、top、middle、bottom</li>
<li>文本类：text-top、text-bottom</li>
<li>上标下标：sub、super</li>
<li>数值百分比：20px、2em、20%</li>
</ul>
<p>对于数值百分比类，效果都是根据计算值，相对 baseline 偏移。</p>

<CodeDemo id="code-demo-429" type="normal" code="eJyFkr9OwzAQxl/lZET/SDRNkVggjQQSAzMSU5Y0uSZGjhMlbmhVVWJAYmIFqe+AeIG+TsvIK3C2U8qAwuLz5X7fd7HPS5aqTLBz5lVFKIHH44DVl4InMmD+9v1t9/Ey94a65gfS41kCDzxWKVGjUzdgkCJPUqVTV6eTvIyx1GkxhyoXPIYjV1e0uvB3r8/k+bl+qrFUPArFINStto+br82aiAoFRsr+hd0bJYCXF4rnEupQzJCKk5DKXCKV91tvaJk/+ZFbzInVoZUbNKCJ7Y6YaUP8z89gFNq5M/eYMFrb3Symwy+OxmOuyveGBaXshN1XNNA6LIG+39orHUOcR7MMpXISVNcC9fZqcRP3ulbd7V8EstHcmam0aewTMZpA8in0Dp06nYNFH5b6HD9FJ5dRGsoEyXs6k5E+Qa+BDGZlTqUWAp39IzG9SKFSXjnmLqgtwIrWFZ139Q2n3faL">
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>vAlign<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>字母x<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">width</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>120<span class="token punctuation">"</span></span> <span class="token attr-name">height</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>100<span class="token punctuation">"</span></span> <span class="token attr-name">border</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>1px solid #000<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>文字的vertical-align值：
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>select</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>select<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>option</span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>baseline<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>baseline<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>option</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>option</span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>10px<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>10px<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>option</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>option</span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>-10px<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>-10px<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>option</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>option</span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>1em<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>1ex<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>option</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>option</span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>-1em<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>-1ex<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>option</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>option</span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>50%<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>50%<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>option</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>option</span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>-50%<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>-50%<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>option</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>select</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
</code></pre></div><div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> eleSelect <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'select'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> eleValign <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'vAlign'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">if</span> <span class="token punctuation">(</span>eleSelect <span class="token operator">&amp;&amp;</span> eleValign<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  eleSelect<span class="token punctuation">.</span><span class="token function-variable function">onchange</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    eleValign<span class="token punctuation">.</span>style<span class="token punctuation">.</span>verticalAlign <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>value<span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div></CodeDemo><p>由于 vertical-align 的默认值是 baseline，即相对字母 x 的下边缘对齐，而<strong>中文和部分英文字形的下边缘要低于字母 x 的下边缘</strong>，会给人感觉文字是偏下的。对此，可以给文字内容设置 vertical-align: xxpx 进行调整。</p>
<h4 id="vertical-align-middle-不是真正的垂直居中" tabindex="-1"><a class="header-anchor" href="#vertical-align-middle-不是真正的垂直居中"><span>vertical-align: middle 不是真正的垂直居中</span></a></h4>
<p>来看一个文字加小图标的例子：有一个 display: inline-block 的 20x20 的图标，要和左侧文字垂直居中。</p>

<CodeDemo id="code-demo-442" type="normal" code="eJydkDFOwzAUhq/yZAkJJBK3RV1C6EmyuLZJnuo4ke02RVElmBDqwAFYWJkYYeI0tIJbYKcCBYRUxPj8fn+f/bekcKUiCUnrSaYB3h6f3i9vtuuHMKQIXDFrzzKCvNIRM6ZqMjJJKXbh1NZMTxbSOORMRUxhrpMps1KhlinttplOaUD/mQ+LjhMN94lKFEJJ2Ny9bO+vN1e3r8/rYb380vpb/xOP9omjcU+zk5Bjwq31NcY9XhsIAm2t2EUCqEMr0VRVfHYaNg0KVyQwGtTLbi4k5oXrHUwZn+WmmmuRwNyow8K52iaUCllWsdc1lVEi5ppiyXJp6Zh23tgu8iPgUjtp6HAwOPCwVabDe6GFkpkcdaTkuVedBBX4ZfxZuk/8+C3sev4WG/0SC610IbL6AKYw2LE=">
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>
  请选择
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>i</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>icon-arrow<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>i</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span><span class="token punctuation">></span></span>vertical-align:baseline<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>
  请选择
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>i</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>icon-arrow valign-1<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>i</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span><span class="token punctuation">></span></span>vertical-align:middle 图标偏下1px<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>
  请选择
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>i</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>icon-arrow valign-2<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>i</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span><span class="token punctuation">></span></span>vertical-align:-5px<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
</code></pre></div><div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">.icon-arrow</span> <span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> inline-block<span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 20px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 20px<span class="token punctuation">;</span>
  <span class="token property">background</span><span class="token punctuation">:</span> <span class="token url"><span class="token function">url</span><span class="token punctuation">(</span>https://demo.cssworld.cn/images/5/arrow.svg<span class="token punctuation">)</span></span> center/100%<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">span</span> <span class="token punctuation">{</span> <span class="token property">margin-left</span><span class="token punctuation">:</span> 30px<span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token selector">.valign-1</span> <span class="token punctuation">{</span> <span class="token property">vertical-align</span><span class="token punctuation">:</span> middle<span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token selector">.valign-2</span> <span class="token punctuation">{</span> <span class="token property">vertical-align</span><span class="token punctuation">:</span> -5px<span class="token punctuation">;</span> <span class="token punctuation">}</span>
</code></pre></div></CodeDemo><ul>
<li>
<p>默认情况下，vertical-align: baseline 使得文字明显偏下，甚至比整个 icon-arrow 还要偏下一点，这是因为 icon-arrow 的下边缘就是 baseline，而中文比 baseline 还要低一点。</p>
<img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/e6c9d24egy1h0pk80r7pdj20m6088q3j.jpg" alt="image-20220328140226422" style="zoom:50%;" />
</li>
<li>
<p>vertical-align: middle 和真正的居中还有像素级的误差，误差大小和 font-family、font-size 均相关。本例中，图标往下偏移使得整行的高度为 21.29px。</p>
</li>
<li>
<p>vertical-align: -5px 则可以精确控制位置，最终行高为 20px，不过还是无法根据 font-family、font-size 变化。</p>
</li>
</ul>
<h3 id="vertical-align-与-line-height" tabindex="-1"><a class="header-anchor" href="#vertical-align-与-line-height"><span>vertical-align 与 line-height</span></a></h3>
<p>对于 inline 元素，vertical-align 和 line-height 都是同时出现的。</p>
<p>回顾一下 vertical-align 章节开头的怪异例子：</p>

<CodeDemo id="code-demo-473" type="normal" code="eJyrVsooyc1RslKyScksU0jOSSwuto1RSsqviFGyi8lTULApLkjMs3s2rf3p2uk2+mBOTJ6NPlAxkFbSUUouLgZq1gNqUKhWyMnMS9XNSM1MzyixUjA2KqiwVqiNyQNpAkqm5eeV6BZnVqVaKRiZQKWUagFXPix4">
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span><span class="token punctuation">></span></span>文字<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre></div><div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">.box</span> <span class="token punctuation">{</span> <span class="token property">line-height</span><span class="token punctuation">:</span> 32px<span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token selector">span</span> <span class="token punctuation">{</span> <span class="token property">font-size</span><span class="token punctuation">:</span> 24px<span class="token punctuation">;</span> <span class="token punctuation">}</span>
</code></pre></div></CodeDemo><p>box 的最终高度不是 32px 而是 35px。这又是 strut 节点造成的。</p>
<img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/e6c9d24egy1h0pnrifbd5j20as04o0so.jpg" alt="image-20220328160237401" style="zoom:50%;" />
<p>我们在其中加入一个可见的字母 x 替代 strut 节点，方便判断 baseline 的位置。</p>

<CodeDemo id="code-demo-484" type="normal" code="eJyrVsooyc1RslKyScksU0jOSSwuto1RSsqviFGyi8lTUKiwKS5IzLN7Nq396drpFTb6YF5Mno0+UDmQVtJRSi4uBmrXA2pRqFbIycxL1c1IzUzPKLFSMDYqqLBWqI3JA2kCSqbl55XoFmdWpVopGJlApZRqAcf+LWg=">
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  x<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span><span class="token punctuation">></span></span>文字x<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre></div><div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">.box</span> <span class="token punctuation">{</span> <span class="token property">line-height</span><span class="token punctuation">:</span> 32px<span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token selector">span</span> <span class="token punctuation">{</span> <span class="token property">font-size</span><span class="token punctuation">:</span> 24px<span class="token punctuation">;</span> <span class="token punctuation">}</span>
</code></pre></div></CodeDemo><p>注意 x 的 font-size 是继承于 .box 的( 这个例子是 16px )，不是 span 的 24px。关键的来了，对于 x，font-size 越大 baseline 越往下，而“文字”又与 baseline 对齐。所以，当 font-size 不一样的两个文字在一起时，彼此就会上下偏移，当偏移足够大，就会超出 line-height 的限制。</p>
<img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/e6c9d24egy1h0po6fqvhij207k03u747.jpg" alt="image-20220328162011253" style="zoom:50%;" />
<p>要解决这个问题，就是让 .box 的 font-size 和 span 一样。</p>
<div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">.box</span> <span class="token punctuation">{</span>
  <span class="token property">line-height</span><span class="token punctuation">:</span> 32px<span class="token punctuation">;</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 24px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>再来看另外一个怪异例子：</p>

<CodeDemo id="code-demo-499" type="normal" code="eJxNjsEOwiAQRH9ls16NYg9GsfolXGhpCgmFpqCSkP67u42HnjYzk3mzFW2ePEpsjftA73VKT4VdLApfKgC0bhrh60y2ZF8aoRDs4EabWQqWXVzMsLCcC6TonYGD4IT67ZmodPGIfUq0ciIyVAZvTAnNTczlwUZ8Z+/CIGHH0VpTtqqw9fiV+p+XcL9SESjD9QcDTz7i">
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">width</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>120<span class="token punctuation">"</span></span> <span class="token attr-name">height</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>100<span class="token punctuation">"</span></span> <span class="token attr-name">border</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>1px solid #000<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre></div><div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">.box</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 280px<span class="token punctuation">;</span>
  <span class="token property">outline</span><span class="token punctuation">:</span> 1px solid #aaa<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.box img</span> <span class="token punctuation">{</span> <span class="token property">height</span><span class="token punctuation">:</span> 96px<span class="token punctuation">;</span> <span class="token punctuation">}</span>
</code></pre></div></CodeDemo><p>图片的地步莫名其妙多了一些空隙。间隙产生的三大元凶：strut 节点、line-height、vertical-align。</p>
<p>为了解原因，同样地写入一个字母 x。</p>

<CodeDemo id="code-demo-509" type="normal" code="eJxNjsEOwiAQRH9ls16NYg9GsfolXGhpCgmFpqCSkP67u42HnjYzk3mzFW2ePEpsjftA73VKT4VdLApfKgCU1k0jfJ3JlvxLIxSCHdxoM0vBsouLGRaWc4EUvTNwEJwQoD0Tli4esU+JZk6EhsrkjSmhuYm5PNiI7+xdGCTsOFprylYVth6/Uv/zEu5XKgJluP4AW28/Wg==">
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  x<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">width</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>120<span class="token punctuation">"</span></span> <span class="token attr-name">height</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>100<span class="token punctuation">"</span></span> <span class="token attr-name">border</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>1px solid #000<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre></div><div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">.box</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 280px<span class="token punctuation">;</span>
  <span class="token property">outline</span><span class="token punctuation">:</span> 1px solid #aaa<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.box img</span> <span class="token punctuation">{</span> <span class="token property">height</span><span class="token punctuation">:</span> 96px<span class="token punctuation">;</span> <span class="token punctuation">}</span>
</code></pre></div></CodeDemo><p>可以看到，多出的空隙就是 x 撑开的。</p>
<img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/e6c9d24egy1h0pxxy59bbj207c054t8l.jpg" alt="image-20220328215600310" style="zoom:50%;" />
<p>总的来说，就是 inline 元素产生了 strut 节点，line-height 作用于 strut 节点，而 vertical-align 对齐的 baseline 和 line-height 底部不在一条线上。</p>
<p>解决办法有：</p>
<ul>
<li>图片 block 化，这样可以消除 strut 节点，line-height 和 vertical-align 无法作用于 块级元素</li>
<li>容器 line-height 足够小，比如 line-height: 0。</li>
<li>容器 font-size 足够小，比如 font-size: 0。</li>
<li>图片设置其他 vertical-align</li>
</ul>
<p>具体效果见下面的例子：</p>

<CodeDemo id="code-demo-548" type="normal" code="eJy1ksFOwkAQhl9lst6ItaUQo7X6JL0sbW03brukXbBKuGmMXjwpAeONgycuGiNGeRtaOfkK7m4hcDHGBE7NzN/5/29nt4NCHlFkITusH816L7NBvxi+5xe33x8DWxc9J7Y90gaX4jQ9dFCDZQ4STQCbRAGcEo+Hol01DQdB6JMg5LI0ZNlgiecnsmxmkDJKPNgypCJNdeEqvyJi+jAprq8alLkn08decfOav13O+sOS5ncO4Z9p1fXTjMbT/tMxi7mWknPfMv5BY25oN20/4QRTDVMSxF+jSfE5Kqn+4KmtlQdtIzdNxVvZkf4daaw8LTD3jGZ2IBusxSmJfQtWfDDGQus6sZqTKJ15vAX7u2IQhObEegXKJZdHy+/H+fMdVPRyTquWkzLEI2mT4jML1JtRuRFOAhJbgFucLcM0U0RJHm2RZ6gwpdWEtrzmVaU+h1Rrdxd7F3GMcxap/1D3BzPvMbk=">
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h4</span><span class="token punctuation">></span></span>间隙示意：<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h4</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">width</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>120<span class="token punctuation">"</span></span> <span class="token attr-name">height</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>100<span class="token punctuation">"</span></span> <span class="token attr-name">border</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>1px solid #000<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h4</span><span class="token punctuation">></span></span>图片block块状清除间隙：<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h4</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box box-1<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">width</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>120<span class="token punctuation">"</span></span> <span class="token attr-name">height</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>100<span class="token punctuation">"</span></span> <span class="token attr-name">border</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>1px solid #000<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h4</span><span class="token punctuation">></span></span>容器font-size:0清除间隙：<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h4</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box box-2<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">width</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>120<span class="token punctuation">"</span></span> <span class="token attr-name">height</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>100<span class="token punctuation">"</span></span> <span class="token attr-name">border</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>1px solid #000<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h4</span><span class="token punctuation">></span></span>图片vertial-align设置清除：<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h4</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box box-3<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">width</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>120<span class="token punctuation">"</span></span> <span class="token attr-name">height</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>100<span class="token punctuation">"</span></span> <span class="token attr-name">border</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>1px solid #000<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre></div><div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">.box</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 280px<span class="token punctuation">;</span>
  <span class="token property">outline</span><span class="token punctuation">:</span> 1px solid #aaa<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.box img</span> <span class="token punctuation">{</span> <span class="token property">height</span><span class="token punctuation">:</span> 96px<span class="token punctuation">;</span> <span class="token punctuation">}</span>

<span class="token comment">/* 间隙清除方法 */</span>
<span class="token selector">.box-1 img</span> <span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> block<span class="token punctuation">;</span>
  <span class="token property">margin</span><span class="token punctuation">:</span> auto<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.box-2</span> <span class="token punctuation">{</span> <span class="token property">line-height</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token selector">.box-3</span> <span class="token punctuation">{</span> <span class="token property">font-size</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token selector">.box-4 img</span> <span class="token punctuation">{</span> <span class="token property">vertical-align</span><span class="token punctuation">:</span> bottom<span class="token punctuation">;</span> <span class="token punctuation">}</span>
</code></pre></div></CodeDemo><h3 id="深入理解-vertical-align-线性类属性值" tabindex="-1"><a class="header-anchor" href="#深入理解-vertical-align-线性类属性值"><span>深入理解 vertical-align 线性类属性值</span></a></h3>
<h4 id="inline-block-与-baseline" tabindex="-1"><a class="header-anchor" href="#inline-block-与-baseline"><span>inline-block 与 baseline</span></a></h4>
<p>一个 inlien-block 元素，如果里面没有 inline 元素，或者 overflow 不是 visible，则该元素的 baseline 就是其 margin 底边缘；否则 baseline 就是最后一行 inline 元素的 baseline。</p>

<CodeDemo id="code-demo-561" type="normal" code="eJyrVsooyc1RslKyKS5IzFNIzkksLraNUUrKr4hRsrPRBwnaxeRhkyzOz01VeDat/ena6U/bWp+u2wlXraSjlFxcDDRTD6hSoTomT0EhJbO4ICex0kohMy8nMy9VNyknPznbGiRTnplSkmGlYGhgUFABFshIzUzPKEEWSUpMzk4vyi/NS7FSUDZ1dTayNASK1wItqgUAGk1DaA==">
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>some 文字内容<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
</code></pre></div><div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">.box</span> <span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> inline-block<span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
  <span class="token property">background</span><span class="token punctuation">:</span> #5EC291<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div></CodeDemo><p>这个例子中， 第一个 box 的 baseline 是其 margin 底边缘；第二个 box 有 inline 元素，baseline 是文字第二行的 baseline。</p>

<CodeDemo id="code-demo-568" type="normal" code="eJyrVsooyc1RslKyKS5IzFNIzkksLraNUUrKr4hRsrPRBwnaxeRhSCoAsRFQRXF+bqrCs2ntT9dOf9rW+nTdTrgWJR2l5OJioMF6IOXVMXkKCimZxQU5iZVWCpl5OZl5qbpJOfnJ2dYgmfLMlJIMKwVDA4OCCrBARmpmekYJskhSYnJ2elF+aV6KlYKyqauzkaUhULw2Jg9kvpFCtQLYSJg+A2sFoJRSLQAd2E3h">
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box box2<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>some 文字内容<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
</code></pre></div><div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">.box</span> <span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> inline-block<span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
  <span class="token property">background</span><span class="token punctuation">:</span> #5EC291<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.box2</span> <span class="token punctuation">{</span> <span class="token property">line-height</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span> <span class="token punctuation">}</span>
</code></pre></div></CodeDemo><p>下面来看一个 背景图标和文字对齐的问题。例如，一个删除图标，通常有两种写法：</p>
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>i</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>icon-delete<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>i</span><span class="token punctuation">></span></span>删除
</code></pre></div><div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>i</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>icon-delete<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>删除<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>i</span><span class="token punctuation">></span></span><span class="token comment">&lt;!-->保证可访问性&lt;/--></span>
</code></pre></div><p>这两种写法，图标的 baseline 都是 icon 的下边缘。</p>
<ul>
<li>第一种写法，i 标签是空标签</li>
<li>第二种，有文字内容，但是通常不显示，又会设置 overflow: hidden，这又使得元素下边缘对齐</li>
</ul>
<p>如果图标和文字能一致，且基线相同，则它们就天然对齐了。</p>
<p>解决办法：</p>
<ul>
<li>设置图标高度和当前行高都是 20px，具体可调整</li>
<li>令图标标签内部有内容，可以用伪元素生成一个空文本</li>
<li>图标不设置 overflow: hidden，可用 text-indent 隐藏文本</li>
</ul>
<p>最佳实践如下：</p>
<div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">.icon</span> <span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> inline-block<span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span>20px<span class="token punctuation">;</span> <span class="token property">height</span><span class="token punctuation">:</span>20px<span class="token punctuation">;</span>
  <span class="token property">white-space</span><span class="token punctuation">:</span> nowrap<span class="token punctuation">;</span>
  <span class="token property">letter-spacing</span><span class="token punctuation">:</span> -1em<span class="token punctuation">;</span>
  <span class="token property">text-indent</span><span class="token punctuation">:</span> -999em<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.icon:before</span> <span class="token punctuation">{</span> <span class="token property">content</span><span class="token punctuation">:</span><span class="token string">'\3000'</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
</code></pre></div>
<CodeDemo id="code-demo-619" type="normal" code="eJydkc9q20AQxl9l0CUtVJLjtAdvVNEH0UWWJtKS9WrZ3dRuTcA3p1DqnvoPh4YSKIXmHNpC+i7Bcuq36Gj9JzmFJBeJnfn2932zM/RK2xMe86Kcv4RMpMY8T7xuNUi8OJEAUfk03g7g6sfv+cn46uyifv9ucfzt3/nXxZfJ/MN4Pv0ZhSRxUhVHfIPgWSWh+fg5CrRIvCjkcX10svh8GoVqQ28HsEQvxm8JPZ++uRxNl7LL0fF9PdZ8HlPA2cXf2Z/R7NcRUeqzjzdddwKgSj05ryef6tPvNww2dJHqokE2ZWrccTQHWRs9DHbbDNf4KKSN0d974mXG0AYD2hoMG4HgEv0SeVFaBu2WGuwm8jCRgfNyipwbJdJXDLh04q6osn1SAfR5bkvmLsEKsSJQr+QWfaPSDBnIqq9T5eqU26J2DS4LBv429lzD4sD6XOYoKYjf6XRcfR2FdXGv0ghDoINtNFtJstNqtbZ2Ya1ZvQppumm2X+jqQOYMDrR4VFqrDAvDHHtVQC/Qr7TIg0yGvJcWaMJn1GmuvmgPAiWLxxTY16gwtZCRF+qliVsM4fcogm/4a5psOTw1vcP/1zI3nA==">
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h4</span><span class="token punctuation">></span></span>1. 空标签后面跟随文本<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h4</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>i</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>icon icon-delete<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>i</span><span class="token punctuation">></span></span>删除<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h4</span><span class="token punctuation">></span></span>2. 标签里面有“删除”文本<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h4</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>i</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>icon icon-delete<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>删除<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>i</span><span class="token punctuation">></span></span>随便什么文字<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h4</span><span class="token punctuation">></span></span>3. 字号变大<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h4</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>large<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>i</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>icon icon-delete<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>i</span><span class="token punctuation">></span></span>删除
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>large<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>i</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>icon icon-delete<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>删除<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>i</span><span class="token punctuation">></span></span>随便什么文字
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre></div><div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">.box</span> <span class="token punctuation">{</span>
  <span class="token property">line-height</span><span class="token punctuation">:</span> 20px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.icon</span> <span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> inline-block<span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span>20px<span class="token punctuation">;</span> <span class="token property">height</span><span class="token punctuation">:</span>20px<span class="token punctuation">;</span>
  <span class="token property">white-space</span><span class="token punctuation">:</span> nowrap<span class="token punctuation">;</span>
  <span class="token property">letter-spacing</span><span class="token punctuation">:</span> -1em<span class="token punctuation">;</span>
  <span class="token property">text-indent</span><span class="token punctuation">:</span> -999em<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.icon:before</span> <span class="token punctuation">{</span> <span class="token property">content</span><span class="token punctuation">:</span><span class="token string">'\3000'</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token selector">.icon-delete</span> <span class="token punctuation">{</span> <span class="token property">background</span><span class="token punctuation">:</span> <span class="token url"><span class="token function">url</span><span class="token punctuation">(</span>https://demo.cssworld.cn/images/5/delete@2x.png<span class="token punctuation">)</span></span> no-repeat center<span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token selector">.large</span> <span class="token punctuation">{</span> <span class="token property">font-size</span><span class="token punctuation">:</span> 20px<span class="token punctuation">;</span> <span class="token punctuation">}</span>
</code></pre></div></CodeDemo><p>这样，小图标和文字对齐就完全不受 font-size 影响了。</p>
<h4 id="了解-vertical-align-top-bottom" tabindex="-1"><a class="header-anchor" href="#了解-vertical-align-top-bottom"><span>了解 vertical-align: top / bottom</span></a></h4>
<p>vertical-align: top / bottom 是针对 line box 对齐的。</p>
<p>比如 vertical-align: top 就是元素底部和 line box 的顶部对齐。</p>
<h4 id="vertical-align-middle-与近似垂直居中" tabindex="-1"><a class="header-anchor" href="#vertical-align-middle-与近似垂直居中"><span>vertical-align: middle 与近似垂直居中</span></a></h4>
<p>前面提到过，vertical-align: middle 只是近似垂直居中。原因和它的定义有关。</p>
<p>对于 inline 元素，vertical-align: middle 就是元素的垂直中心点对齐基线往上 1/2 个 x-height 的位置，也就是字母 x 的中心点。</p>
<p>基本上所有的字体中，字符 x 的位置都是偏下一点的，font-size 越大偏移越明显，这才导致近似垂直居中的问题。</p>

<CodeDemo id="code-demo-647" type="normal" code="eJxNUL1u2zAQfpWDMshGI1lOg8BRFQ8FMhTollULTVISW5pkSUqVG+Qt+hzdO/Vlij5H76g4yXa8+375mA3xqLM6a4SagGsWwl2bHezcZvvWADTq2MN3JeKA621VtRkcrBfS09PNEKxWAi4quuzn1jQb1EFm4xZ6cMy8yIqIoL9/fv37+buzJhZB/ZB1c/D71fbGzcX1zs3rZkOUZ2/jxgjx5CSSPTO9RHsl3jzOyuf3URkKdkMjm3G83uE4MT2SBO0p24bCZZcZDwGbl9gWHskw9azhale5+QMttDKyGKTqh1jD9grzpfWB8a+9t6MRBbfa+houuqp7392m62s1oFq4e2pNMqG/TEZnydvlDjBJHxVnumBa9abGHkJouVAx6BfKOTEPqSfcgbB8PEoTy17Gey1p/Hj6JFZ5AuTr1hCaPN9gv43Snx6kljxav8opEiFbk0glE+J+QtxnFaI0EhF8SGqX0I2GR2XNSq6XAkgtQzxpWVLbByyLRotM+mx4B7mbc8yPBtnTf2HCzvg=">
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">width</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>100<span class="token punctuation">"</span></span> <span class="token attr-name">border</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>1px solid #000<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>x
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>dt<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>修改font-size:<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>br</span><span class="token punctuation">></span></span>(16px-48px)<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>range<span class="token punctuation">"</span></span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>range<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>range<span class="token punctuation">"</span></span> <span class="token attr-name">min</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>16<span class="token punctuation">"</span></span> <span class="token attr-name">max</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>48<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>16<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
</code></pre></div><div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">.box</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 280px<span class="token punctuation">;</span>
  <span class="token property">line-height</span><span class="token punctuation">:</span> 128px<span class="token punctuation">;</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> #f0f3f9<span class="token punctuation">;</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 16px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.box img</span> <span class="token punctuation">{</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 96px<span class="token punctuation">;</span>
  <span class="token property">vertical-align</span><span class="token punctuation">:</span> middle<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> range <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'range'</span><span class="token punctuation">)</span>
<span class="token keyword">var</span> box <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">'.box'</span><span class="token punctuation">)</span>

range<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'change'</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  box<span class="token punctuation">.</span>style<span class="token punctuation">.</span>fontSize <span class="token operator">=</span> range<span class="token punctuation">.</span>value <span class="token operator">+</span> <span class="token string">'px'</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div></CodeDemo><p>例子中，图片中线距离 x 的中心点很近，但不重合，font-size 越大越是如此。</p>
<p>要想让字符 x 的中心就是容器的垂直中心，通常是设置 font-size: 0。</p>
<p>日常开发中，肉眼看不出的偏差可以忽略。</p>
<h3 id="无处不在的-vertical-align" tabindex="-1"><a class="header-anchor" href="#无处不在的-vertical-align"><span>无处不在的 vertical-align</span></a></h3>
<p>本节是对前面内容的小结。</p>
<ul>
<li>
<p>对于 inline 元素，如果遇到不好理解的现象，请一定意识到 strut 节点的存在和无处不在的 vertical-align。</p>
</li>
<li>
<p>vertical-align 中，top / bottom 和 baseline / middle 是不同的，前者根据 line box 对齐，后者根据字母 x 对齐。</p>
</li>
</ul>
<p>vertical-align 可以说是 css 的最难点，需要深入了解 inline 盒模型，它的最终表现与字符 x、line-height、font-size、font-family 密切相关。</p>
<h3 id="基于-vertical-align-属性的水平垂直居中-dialog" tabindex="-1"><a class="header-anchor" href="#基于-vertical-align-属性的水平垂直居中-dialog"><span>基于 vertical-align 属性的水平垂直居中 dialog</span></a></h3>

<CodeDemo id="code-demo-685" type="normal" code="eJx1UUtOHDEQvUrJUSQg0z2DRFDGw2QRKYtcIKveVNvunhJuu2V7YAJiGXbcgROwZ8FtmHtgu5s/yAuXXj2/V/V8zlah04yzI0knIDR6v6yYsCYgGeUq9rMyAK+aklDbduy86aWHyoTY3F7+397cbq+u7++ujqaRMwiN1ePNJkx4H+3LJ0s4T8TeegpkDQesvdXroBYJDrbnMFuAo3YVclXbEGyXS62ajCXidA8a6+DP7x+wN01AjeK4dXZtJIe10zsSA3LqsFXT3rSLGr06PJjQ319lWbbL5e5rlfm3D2RcW+PObJJO+X13AsaacUq1CQVqauP4IsahXIZPVxRU4XsUikfyqcM+401cvfB0FtG4RfQcvc4KMlJtOMznkXdRmeeQODZRdYhqzJxDxSqWBSX5XuM/DmR0ZBe1tuI4d1ZqCG5/NvuagRPlAgnUj+N2JKVOWyS74acHl881P5F4sUhtnVSucChp7Tkc9pv88DnLQlhtHYcvTdO8SzB960f5uQ712/z2D7J2HJ5dPAC/CvUP">
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>container<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>dialog<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>content<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>内容占位<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre></div><div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">.container</span> <span class="token punctuation">{</span>
  <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span>
  <span class="token property">top</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span> <span class="token property">right</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span> <span class="token property">bottom</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span> <span class="token property">left</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token comment">/* for IE8 */</span>
  <span class="token property">background</span><span class="token punctuation">:</span> <span class="token url"><span class="token function">url</span><span class="token punctuation">(</span>data:image/png;base64,iVB...g==<span class="token punctuation">)</span></span><span class="token punctuation">;</span>
  <span class="token comment">/* for IE9+ */</span>
  <span class="token property">background</span><span class="token punctuation">:</span> <span class="token function">rgba</span><span class="token punctuation">(</span>0<span class="token punctuation">,</span>0<span class="token punctuation">,</span>0<span class="token punctuation">,</span>.5<span class="token punctuation">)</span><span class="token punctuation">,</span> none<span class="token punctuation">;</span>
  <span class="token property">text-align</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
  <span class="token property">white-space</span><span class="token punctuation">:</span> nowrap<span class="token punctuation">;</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span> <span class="token comment">/*  */</span>
  <span class="token property">z-index</span><span class="token punctuation">:</span> 99<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.container:after</span> <span class="token punctuation">{</span>
  <span class="token property">content</span><span class="token punctuation">:</span> <span class="token string">""</span><span class="token punctuation">;</span>
  <span class="token property">display</span><span class="token punctuation">:</span> inline-block<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
  <span class="token property">vertical-align</span><span class="token punctuation">:</span> middle<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.dialog</span> <span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> inline-block<span class="token punctuation">;</span>
  <span class="token property">vertical-align</span><span class="token punctuation">:</span> middle<span class="token punctuation">;</span> <span class="token comment">/*  */</span>
  <span class="token property">border-radius</span><span class="token punctuation">:</span> 6px<span class="token punctuation">;</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> #fff<span class="token punctuation">;</span>
  <span class="token property">text-align</span><span class="token punctuation">:</span> left<span class="token punctuation">;</span>
  <span class="token property">white-space</span><span class="token punctuation">:</span> normal<span class="token punctuation">;</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 14px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div></CodeDemo><p>此时，无论浏览器尺寸、dialog 尺寸多少，都是居中的。这比使用 JavaScript 计算位置要强壮方便得多。</p>
<p>实现原理：</p>
<ul>
<li>font-size: 0 使得 x 的中心位置就是 .container 的上边缘，此时，高度 100% 宽度 0 的伪元素 vertical-align: middle 使其对齐 x 的中心位置。</li>
<li>由于伪元素高度 100%，使得 x 的中心位置下移至容器的垂直中点。</li>
<li>.dialog 的 vertical-align: middle 使 dialog 对齐 x 的中心位置，即容器的垂直中心。</li>
<li>最后用 text-align: center 水平居中</li>
</ul>
</div></template>


