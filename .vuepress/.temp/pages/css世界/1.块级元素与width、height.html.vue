<template><div><h1 id="块级元素与-width-height" tabindex="-1"><a class="header-anchor" href="#块级元素与-width-height"><span>块级元素与 width / height</span></a></h1>
<h2 id="块级元素" tabindex="-1"><a class="header-anchor" href="#块级元素"><span>块级元素</span></a></h2>
<p>块级元素对应的英文是 block-level element，常见的块级元素有 <code v-pre>&lt;div&gt;、&lt;li&gt;、&lt;table&gt;</code> 等。</p>
<p>需要注意的是，块级元素和 <code v-pre>display: block</code> 的元素不是一个概念。例如 <code v-pre>&lt;li&gt;</code> 默认 <code v-pre>display: list-item</code>，<code v-pre>&lt;table&gt;</code> 默认 <code v-pre>display: table</code>，但它们都是块级元素。因为他们都符合块级元素的基本特征：<strong>一个水平流上只能单独显示一个元素</strong>。</p>
<h3 id="元素的各种盒子-box" tabindex="-1"><a class="header-anchor" href="#元素的各种盒子-box"><span>元素的各种盒子( box )</span></a></h3>
<p>每个元素都有两个盒子：外在盒子和内在盒子。外在盒子负责元素是可以一行显示或换行显示；内在盒子负责宽高、内容呈现等。内在盒子又称容器盒子。</p>
<p>按照 display 的属性值不同，有以下几种情况：</p>
<ul>
<li><code v-pre>display: block</code> 的元素由外在的 block-level box 和内在的 block-level box 组成</li>
<li><code v-pre>display: inline-block</code> 的元素由外在的 inline-box 和内在的 block-level box 组成</li>
<li><code v-pre>display: inline</code> 的元素则都是 inline-box</li>
</ul>
<p>一些特殊元素可能还有其他盒子，比如 <code v-pre>display: list-item</code> 的元素 <code v-pre>&lt;li&gt;</code> 还有一个附加的 “标记盒子( marker box )”，用于显示项目符号。</p>
<p>按这种方式理解，<code v-pre>display: block</code> 可以看成是 <code v-pre>display: block-block</code> 的缩写，<code v-pre>display: table</code> 是 <code v-pre>display: block-table</code> 的缩写。</p>
<h2 id="width-height" tabindex="-1"><a class="header-anchor" href="#width-height"><span>width / height</span></a></h2>
<h3 id="width-auto" tabindex="-1"><a class="header-anchor" href="#width-auto"><span>width: auto</span></a></h3>
<p><code v-pre>width: auto</code> 至少包含了以下 4 中不同的宽度表现：</p>
<ul>
<li>
<p>充分利用可用空间</p>
<p>比如 div、p 这些元素的宽度默认是 100% 于父级容器的。</p>
</li>
<li>
<p>收缩到合适( shrink-to-fit )</p>
<p>典型代表就是浮动、绝对定位、inline-block 或 table 元素。也可称为“包裹性”，css3 中的 fit-content 就是这种表现。</p>
</li>
<li>
<p>收缩到最小 min-content</p>
<p>这个最容易出现在 table-layout: auto 的表格中。比如：</p>

<CodeDemo id="code-demo-77" type="normal" code="eJyrVsooyc1RslKyKUlMyklVSM5JLC62jVEC83RzM/N0k/PzSlLzSmKU7GLyFBRsSorANIiVYvd0w0bDpx3TUSkbfaAMkpq9k593bHu+a3lRak5iSWZZ6vs9PU92THm6bu/TXcue7ut4uqH/+ayWZ9O3PW2YSQ2tQAbIiUAK5AUgS0lHKbm4GOhFPQxPKVSDdJRnppRkWCkYmhoUVFiDBHITi9Iz86wUDBQSS0vywUIlqRUluok5melA4ZzUtBKgYC3Q6FoA+2CMbA==">
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>table</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>table-min-content<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>tr</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>td</span><span class="token punctuation">></span></span>就1列就1列就1列<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>td</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>td</span><span class="token punctuation">></span></span>当父级relative，且宽度很小的时候<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>td</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>td</span><span class="token punctuation">></span></span>当父级relative，且宽度很小的时候<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>td</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>tr</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>table</span><span class="token punctuation">></span></span>
</code></pre></div><div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">.table-min-content</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 150px<span class="token punctuation">;</span>
  <span class="token property">margin</span><span class="token punctuation">:</span> 0 auto<span class="token punctuation">;</span>
  <span class="token property">text-align</span><span class="token punctuation">:</span> left<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div></CodeDemo></li>
<li>
<p>超出容器限制 max-content</p>
<p>除非有明确的 width 设置，否则上面 3 中情况尺寸都不会主动超过父级容器宽度。</p>
<p>一个特殊情况是，内容很长的连续的英文和数字，或者内联元素被设置了 white-space: nowrap，则会超出父级容器宽度。</p>

<CodeDemo id="code-demo-92" type="normal" code="eJw9jsFKxDAURX/lEbfOTF0IEqtf0k0miSYY09AUOzIMOK5cKOhmEBRno+6EChUq+DlNtv6Cr1OZzXtw7+WeOyeqPDeEklToC+CGeX+UkRNWKllk5DizAKl3zG4trrQR6MRlHd6vu/Yqfq7j41usm3D/0LXP8Wv5+3OLN9zUcfURmlX3ve7au/D0El6bdNKXYW06QR5+sku498gfD0yY98hKi1JR2NtP3OywFxwTQttTCgf/wjQvhCww4mbgc6MF7CRJsrEqpUs5Qg6XFGxeFcyhvsjseLN9IAjtnWGXFLQ12srR1OT8bIiRxR+T8XG7">
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>father<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>child<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>恰如一江春水向东流，流到断崖也不回头<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre></div><div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">.father</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 150px<span class="token punctuation">;</span>
  <span class="token property">padding</span><span class="token punctuation">:</span> 8px<span class="token punctuation">;</span>
  <span class="token property">border</span><span class="token punctuation">:</span> 1px solid #000<span class="token punctuation">;</span>
  <span class="token property">white-space</span><span class="token punctuation">:</span> nowrap<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.child</span> <span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> inline-block<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div></CodeDemo></li>
</ul>
<p>css 世界中，盒子分内在盒子和外在盒子，尺寸也分内部尺寸( Intrinsic Sizing )和外部尺寸( Extrinsic Sizing )。顾名思义，内部尺寸就是宽度由内存元素决定，外部尺寸就是由外部元素界定。</p>
<p>上面 4 中宽度表现中，只有“充分利用可用空间”是外部尺寸，其余都是内部尺寸。这唯一的外部尺寸就是流式布局的精髓所在。</p>
<h3 id="外部尺寸、内部尺寸与流体特性" tabindex="-1"><a class="header-anchor" href="#外部尺寸、内部尺寸与流体特性"><span>外部尺寸、内部尺寸与流体特性</span></a></h3>
<h4 id="外部尺寸" tabindex="-1"><a class="header-anchor" href="#外部尺寸"><span>外部尺寸</span></a></h4>
<p>典型的外部尺寸场景就是 display: block 的元素。外部尺寸由以下 2 中情况：</p>
<ul>
<li>
<p>正常流宽度</p>
<p>所谓外部尺寸，就是宽度自动铺满父级容器，类似于将水倒入水槽会自动铺满水槽底部。</p>
<p>表现为外部尺寸的块级元素一旦设置了宽度，就失去了流动性。</p>
<p>所谓流动性，不只是宽度 100% 显示那么简单，而是一种 margin/border/padding/content 自动分配空间的机制。</p>
<p>参考下面的例子：</p>

<CodeDemo id="code-demo-130" type="normal" code="eJydkL1OwzAQx1/lZMQEaV0KRUoDT5LFsZvGqmtHdihFVaWyoYqdESa+BphYUHmcVGy8ApeEfk5Allh3v//dzx6RJOsr4pMgOTyd39zlLx/5+/3X7Dqf3ObTp/nbZT59nE8egjr2Qx0IOQCumHMnIdFsEBIsAgQMEtuJsRaS9bbHEMhfZ59Xz42gzn7LHlRsUMdtxR9Xn0uRJX6D0t3/mkA54i8+W4ktK7JPuHP4crUSg1ExrNKEwrMd6nGoQ13DWVUzYrzXteZMC48bZawPO1xQ/BBdRpuUpsMqWyTRoswK6VLFLnyIlOG9MtBntiu1DxTXlRGAlAkhddeHo3S4qkbGio71IpNlpo9y2HNGSQE70fFy/Q+UmXSDEJ1mq9kqiYVzHMfrfn4srcs8nkglYLQxh7ZhdY092D4s4YUZbSNOxt940uci">
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h4</span><span class="token punctuation">></span></span>无宽度，借助流动性<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h4</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>nav<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span><span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>nav-a<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>导航1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span><span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>nav-a<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>导航2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h4</span><span class="token punctuation">></span></span>width:100%<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h4</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>nav<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span><span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>nav-a width<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>导航1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span><span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>nav-a width<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>导航2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre></div><div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">.width</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.nav</span> <span class="token punctuation">{</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> #cd0000<span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 300px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.nav-a</span> <span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> block<span class="token punctuation">;</span>
  <span class="token property">margin</span><span class="token punctuation">:</span> 0 10px<span class="token punctuation">;</span>
  <span class="token property">padding</span><span class="token punctuation">:</span> 5px 10px<span class="token punctuation">;</span>
  <span class="token property">border-bottom</span><span class="token punctuation">:</span> 1px solid #b70000<span class="token punctuation">;</span>
  <span class="token property">border-top</span><span class="token punctuation">:</span> 1px solid #de3636<span class="token punctuation">;</span>
  <span class="token property">color</span><span class="token punctuation">:</span> #fff<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.nav-a:first-child</span> <span class="token punctuation">{</span> <span class="token property">border-top</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token selector">.nav-a + .nav-a + .nav-a</span> <span class="token punctuation">{</span> <span class="token property">border-bottom</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span><span class="token punctuation">}</span>
</code></pre></div></CodeDemo></li>
<li>
<p>格式化宽度</p>
<p>格式化宽度仅出现在绝对定位模型中，即 position: absolute / position: fixed 的元素中。</p>
<p>默认情况下，绝对定位元素的宽度表现是包裹性，宽度由内部元素决定。但是，有个特殊情况：</p>
<p>对于<strong>非替换元素</strong>，当 left / right 或 bottom / top 这两对属性存在时，其宽度根据祖先元素（非 static 定位）计算。举个例子：</p>

<CodeDemo id="code-demo-148" type="normal" code="eJxlkE1OAzEMha9ihW1VpiyHwgk4wmw8iZmxlD8Sp61U9e54Oiq0sIr8nPfpk89mluBNb/aOD2A91vo2mGPBPJj3IQI85Dhq+pEKBeBcWwCXfCpQWQADyQZsipWskLQC6DhztRwnIM+6rOS0AMSthuRAKGQtc7Ts2LUo0AQ8jooHkhVNEHCKCOj5q+EW9s+qo16312yMrVX1t4synBfjnNSHU+yhkEfhA70usXIdlR52+QQ1eXbw1HXddXVkJ3MPL12XT9dgJp5m+U0uQ9zi+BePo3KarHhPn1rY3QhlBfzMkvLdNCaRFO6CjM7poR6+/NO11q4u5vINAryUqA==">
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>wrap<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>ab<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre></div><div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">.wrap</span> <span class="token punctuation">{</span>
  <span class="token property">position</span><span class="token punctuation">:</span> relative<span class="token punctuation">;</span>
  <span class="token property">border</span><span class="token punctuation">:</span> 1px solid #000<span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.ab</span> <span class="token punctuation">{</span>
  <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span>
  <span class="token property">left</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span>
  <span class="token property">right</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span>
  <span class="token property">top</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span>
  <span class="token property">bottom</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span>
  <span class="token property">padding</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span>
  <span class="token property">border</span><span class="token punctuation">:</span> 1px solid #ccc<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div></CodeDemo></li>
</ul>
<h4 id="内部尺寸" tabindex="-1"><a class="header-anchor" href="#内部尺寸"><span>内部尺寸</span></a></h4>
<p>典型的内部尺寸是 display: inline-block 的元素。内部尺寸有以下 3 种表现形式：</p>
<ul>
<li>
<p>包裹性 ( shrink-to-fit )</p>
<p>包裹性指的是元素尺寸由内部元素决定，但永远小于父级容器的尺寸，除非容器的尺寸小于元素的“首选最小宽度”（后面会介绍）。</p>
<p>来看个例子，button 是极具代表性的 inline-block 元素，它呈现出包裹性。</p>

<CodeDemo id="code-demo-171" type="normal" code="eJyrVsooyc1RslKyScksU0jOSSwuto1RSsqviFGyi8lTULBJKi0pyc+ze9bT+XLSOht9KBdTCpnEp2xa+9O1019s63q6ZNbTdXuf7loGYq/b+35Px9Oe1heLd77f0/O0rfVl84qnG3Y9Xb/jeefOZw3L3+/pBIo/2dv2ZEfvkz2zXmxrfbG//em6nU9nroAYAtT+on3Vy4amp7umQNQjucFGH+g3IK2ko5RcXAz0qx7QfwrVIMeVZ6aUZFgpGJkYFFRYx+TVAhXVAgA13Y/U">
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span><span class="token punctuation">></span></span>按钮<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span><span class="token punctuation">></span></span>按钮按钮按钮<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span><span class="token punctuation">></span></span>按钮文字越多宽度越宽（包裹，内部尺寸特性），但不会超过容器宽度（自适应性）<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre></div><div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">.box</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 240px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div></CodeDemo><p>“包裹性”有什么用呢？假如有个需求：某模块的文字内容是动态的，如何做到文字少时居中显示，文字超过一行时左对齐。</p>

<CodeDemo id="code-demo-178" type="normal" code="eJx9kLFOwzAURX/lyR3SijYNiCmkDEiVQCobY5bEdltT145it6SqOgJ/UCSQGBAriIGFD0q/g+c6nZCYbN13j+99XpOpnUsSk4SJJVCZGTNISa6rlJynCiApQDBUqFaWK4vqbvtYfzzVD/f150/SL9CV9JF1Z76wVisP5FY588t3/f7skaTv5+gkXUKNwdQQk2Dtgu4Es9MYTk6jojpzQpExJtQkhuODkuuS8RKFogKjpWDQiqJoP7K8sr1MiomKgWJPXqK8SVWr6e0zmDCFzFYxCCWF4r1cajr7w0s+tp7Gmreu5TIrAfeBATBNF3N8L5xwO5TcXS9WV6wd4DjoIOWsh8x/7I1ljyAa4q7DJQojYVDnJTqkoLOgC+OFolbgr7Y7fokGDYVC3+XN9QiOBhDstl/126v/6MC172D9zS/28q8G">
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>content<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>文字内容<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>btn<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>更多文字<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>
</code></pre></div><div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">.box</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 240px<span class="token punctuation">;</span>
  <span class="token property">padding</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span>
  <span class="token property">border</span><span class="token punctuation">:</span> 1px solid #000<span class="token punctuation">;</span>
  <span class="token property">text-align</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">#content</span> <span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> inline-block<span class="token punctuation">;</span>
  <span class="token property">text-align</span><span class="token punctuation">:</span> left<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> btn <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'btn'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> content <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'content'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
btn<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'click'</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  content<span class="token punctuation">.</span>innerHTML <span class="token operator">+=</span> <span class="token string">'新增文字'</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div></CodeDemo><p>文字较少时，#content 的宽度只有“文字内容”的宽度，当文字越来越多，#content 随之增大，但不会超过 box 的宽度。</p>
<p>除了 inline-block 元素，浮动元素和绝对定位元素都具有包裹性。</p>
</li>
<li>
<p>首选最小宽度</p>
<p>所谓首选最小宽度，就是元素最合适的最小宽度。</p>
<p>上面包裹性的例子中，box 的宽度为 240，如果 box 宽度设为 0，content 的宽度也不会为0。</p>
<p>这是因为 <strong>在 css 中，图片和文字的重要性远大于布局</strong>，css 一开始就是为图文编排而生的。</p>

<CodeDemo id="code-demo-203" type="normal" code="eJwdzEEOwiAQheGrTMatsXXhBtGTsGkZUkgQSCGWpOnaG3gL9x7IeA4HV5P58/KtaMvNo0BJ7g7aDzlfFI6xKryqACATOOKiYygmFK6f9+v7fIAJk3fZwhJnkl3iseyY4It71DkzeWAG1qYsjooV0J/bkwYiFyYBp1T/YWTCzAKOqUKO3hHs+r5tN8a2H9z+NuU=">
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>content<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>中文 english word<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre></div><div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">.box</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">padding</span><span class="token punctuation">:</span> 5px<span class="token punctuation">;</span>
  <span class="token property">border</span><span class="token punctuation">:</span> 1px solid #000<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div></CodeDemo></li>
<li>
<p>最大宽度</p>
<p>如果内部没有块级元素或块级元素未设定宽度，则最大宽度就是最大的连续内联盒子的宽度。</p>
<p>有点绕，举个例子：</p>

<CodeDemo id="code-demo-218" type="normal" code="eJxlkMFKw0AQhl9lmF6Nidca8yR7SbKlLm53l+wqgVLworFYKHoQwR705kGrF6Gn+jLNtr6FkxCo4GmW/f5/5ucf46kbSexjzMUF5DK19oRhpkuGCVPMMfQ3d/7xwz9UfvEGQQBCSaEGDJkCiK1JVUKKevHaAfDP1fZ9XV9f7cVx2OpaR3bunCbPbPpzv9xLgkzq/CwOO9xKxWgItsgpT48hpNLRq35ab6fV3xwQdouLdjLcrG43q8vdy+xfWpMQ8MsvP5/vvj8b3F01ZI1DaoAmHmBuLTVySC3AuDFmuuCDog9HpgSrpeDQi6LouEEm5VyoIbHIlPQzoQWTX40egoU=">
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
	"我是文本 -- inline"
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span><span class="token punctuation">></span></span>我在 inline 标签内 -- inline<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span><span class="token punctuation">></span></span>按钮 -- inline-block<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>#<span class="token punctuation">"</span></span> <span class="token attr-name">alt</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>图片 -- inline<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>br</span><span class="token punctuation">></span></span>
  "下一行 -- inline"
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>一段描述 -- block<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre></div><div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">.box</span> <span class="token punctuation">{</span>
  <span class="token property">border</span><span class="token punctuation">:</span> 1px solid #000<span class="token punctuation">;</span>
  <span class="token property">padding</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div></CodeDemo><p>上面这段代码中，连续 4 个内联盒子，直到遇到了换行标签，宽度表现为连续内联盒子的宽度。</p>
</li>
</ul>
<h3 id="width-与盒模型的-content-box" tabindex="-1"><a class="header-anchor" href="#width-与盒模型的-content-box"><span>width 与盒模型的 content box</span></a></h3>
<p>盒模型后面会详细介绍，这里先参考一张图。</p>
<img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/css盒模型.jpg" style="zoom:80%;" />
<p>盒模型有 4 个盒子，分别为 content box、padding box、border box、margin box；</p>
<p>width 数值是作用在 content box 上的。这是因为 css2.1 是面向图文信息设计的，所以 width 设计成了直接作用在 content 上。</p>
<h3 id="height-auto" tabindex="-1"><a class="header-anchor" href="#height-auto"><span>height: auto</span></a></h3>
<p>height: auto 要比 width: auto 简单得多。因为 css 默认流是水平方向的，宽度是稀缺的，而高度是无限的。</p>
<h3 id="height-100" tabindex="-1"><a class="header-anchor" href="#height-100"><span>height: 100%</span></a></h3>
<p>height 和 width 有一个明显的区别就是对百分比的支持。</p>
<p>对于 width 属性，即时父元素 width: auto，子元素 width: 100% 也是支持的；而对于 height 属性，父元素 height: auto，只要子元素还在文档流中，其百分比值会被忽略。</p>
<p>这是因为，<strong>百分比高度要想起作用，父级必须有一个可以生效的高度值</strong>。</p>
<p>假如想要一个满屏的 div：</p>
<div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">div</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span> <span class="token comment">/* 这是多余的 */</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span> <span class="token comment">/* 这是无效的 */</span>
<span class="token punctuation">}</span>
</code></pre></div><p>为了实现效果，需要设置：</p>
<div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">html, body</span> <span class="token punctuation">{</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>仅仅设置 body 是不行的，因为 body 高度是根据 html 计算的。</p>
<h4 id="为何-height-100-失效" tabindex="-1"><a class="header-anchor" href="#为何-height-100-失效"><span>为何 height: 100% 失效</span></a></h4>
<p>在 css 规范中，如果容器高度没有显式指定（即高度由内容决定），且子元素不是绝对定位，则容器高度计算值为 auto。</p>
<p>百分比 和 auto 计算，是计算不了的：auto * 100 / 100 = NaN。</p>
<p>但是对于宽度的解释是：如果容器的宽度取决于子元素的宽度，属于未定义行为。也就是说，浏览器可以自己理解发挥。</p>
<p>幸运的是，各个浏览器的行为是一致的：先渲染父元素，后渲染子元素，渲染到子元素时，父元素宽度已经固定，此时 width: 100% 就是父元素的宽度，如果宽度不够，则溢出。</p>
<p>width: 100% 参考下面的例子：</p>

<CodeDemo id="code-demo-287" type="normal" code="eJyFj8sOwiAQRX9lMsadD9zW6pewoYDtRAqkEFtj+u8ONerGxBXkXOae4YFd7h1WWBu6gXYqpZPEJkwSz9ID1NS3kAbNcCURlMt8o1619v0gReU/g9lOmYOFjWRyV8FBiDXU+4J4oN6zh0/coE6JvTt2waM0GUrRqXsF5B15u21c0NdjScaOst1yg7YV+DAOKi48KmPIt8URJxALa8Jg7MCISQqODKyEKNEs/a6s90/2o+CyFPAe3x+9CnF+Ao5/aNE=">
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>#<span class="token punctuation">"</span></span> <span class="token attr-name">alt</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>image<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>text<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>span width: 100% <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre></div><div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">.box</span> <span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> inline-block<span class="token punctuation">;</span>
  <span class="token property">white-space</span><span class="token punctuation">:</span> nowrap<span class="token punctuation">;</span>
  <span class="token property">padding</span><span class="token punctuation">:</span> 10px 0<span class="token punctuation">;</span>
  <span class="token property">border</span><span class="token punctuation">:</span> 1px solid #000<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.text</span> <span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> inline-block<span class="token punctuation">;</span>
  <span class="token property">border</span><span class="token punctuation">:</span> 1px solid #f00<span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div></CodeDemo><h4 id="如何使-height-100-生效" tabindex="-1"><a class="header-anchor" href="#如何使-height-100-生效"><span>如何使 height: 100% 生效</span></a></h4>
<p>要使 height: 100% 生效，有两种方法：</p>
<ul>
<li>
<p>显示设置父级的高度值</p>
<p>这个很简单，不是 auto 便可以计算。比如：</p>
<div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">html, body</span> <span class="token punctuation">{</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
  <span class="token comment">/* height: 600px */</span>
<span class="token punctuation">}</span>
</code></pre></div></li>
<li>
<p>子元素使用绝对定位</p>
<div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">div</span> <span class="token punctuation">{</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
  <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p><strong>此时即时祖先元素是 height: auto 也有计算值</strong>。</p>
<p>需要注意的是，绝对定位的宽高百分比计算是相对于 padding box 的，非绝对定位是相对于 content box 的。</p>

<CodeDemo id="code-demo-318" type="normal" code="eJx9kE1KAzEYhq8SIu5snSL4M9aCgp5iNmkyP8E0GZK0FktvoK5FqUs3gm616m06lK68gl9mhnFGqquQJ1/e500mOLEDgX3cZXyEqCDGHAW4r8YB7gUSoQamCRcMDlazh+X7LHt5y57vFp/XXx9Xy/tX2C7mN4gqaUNpEUQAXz3dZvPHjuel4+42REFmtf4SIh2K/6R/GlPCGJdx07i7xoi3MDUG3tp2uokzXXBmEx/tuIKHDiQhjxProzwgJ2W8GyrJgOiYyxqAuJbhl/lUX2kW6hag4ojQ81iroWQ+2vC8/bO945xTJZQGFEUR7KeBbOfvLFpVJTxvc23K6cFJs1unqOJy4BuLlFQZbrmCooCI5aOwNtFDdWH5DZXv5yrpGyWGtryKp9/+ttUe">
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>child<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>非绝对定位，相对于 content box，高度100px<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box rel<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>child<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>绝对定位，相对于 padding box，高度160px<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre></div><div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">.box</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 300px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 160px<span class="token punctuation">;</span>
  <span class="token property">padding</span><span class="token punctuation">:</span> 30px<span class="token punctuation">;</span>
  <span class="token property">margin</span><span class="token punctuation">:</span> 30px<span class="token punctuation">;</span>
  <span class="token property">box-sizing</span><span class="token punctuation">:</span> border-box<span class="token punctuation">;</span>
  <span class="token property">background</span><span class="token punctuation">:</span> #008F7A<span class="token punctuation">;</span>
  <span class="token property">color</span><span class="token punctuation">:</span> #fff<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.child</span> <span class="token punctuation">{</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
  <span class="token property">background</span><span class="token punctuation">:</span> #008E9B<span class="token punctuation">;</span>
  <span class="token property">padding</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.rel</span> <span class="token punctuation">{</span>
  <span class="token property">position</span><span class="token punctuation">:</span> relative<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.rel > .child</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
  <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div></CodeDemo></li>
</ul>
<h2 id="min-max-width-min-max-height" tabindex="-1"><a class="header-anchor" href="#min-max-width-min-max-height"><span>min / max-width , min / max-height</span></a></h2>
<p>这两对属性常用于流式布局，对于设定宽高的布局它们不起作用。</p>
<p>min-* 的初始值是 auto，max-* 的初始值是none。这和它们的优先级有关系。</p>
<p>用一句话表示它们的优先级就是：超越 !important，超越最大。</p>
<ul>
<li>
<p>超越 !important</p>
<p>max-* 会覆盖对应的 width / height 的设置，即时它们是 !important 的。</p>
</li>
<li>
<p>超越最大</p>
<p>min-width 的优先级又超过 max-width。</p>
</li>
</ul>

<CodeDemo id="code-demo-354" type="normal" code="eJyrVsooyc1RslKyScksUyguqcxJtY1RKs9MKcmwUjAzMDAoqFDMzC3ILypJzCuJUbKz0Qeqs4vJU9JRSi4uBuoDaauOyVNQyE2s0IXqMwJpswYJZqRmpmeUIIskJSZnpxfll+alWCkoGzmbG7sYAcVrgSbWAgCfqS0v">
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span><span class="token value css language-css"><span class="token property">width</span><span class="token punctuation">:</span> 6000px<span class="token important">!important</span></span><span class="token punctuation">"</span></span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre></div><div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">div</span> <span class="token punctuation">{</span>
  <span class="token property">max-width</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
  <span class="token property">background</span><span class="token punctuation">:</span> #2C73D2<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div></CodeDemo><p>上面这个例子中，宽度 6000 是用 !important 修饰的，但是只有最大宽度 200 生效，如果还加一条最小宽度 400，也会覆盖掉，这里就不在演示了。</p>
<p>总结来说优先级就是：min-width &gt; max-width &gt; important。</p>
<h3 id="任意高度元素的收起展开动画" tabindex="-1"><a class="header-anchor" href="#任意高度元素的收起展开动画"><span>任意高度元素的收起展开动画</span></a></h3>
<p>如何用 css 动画实现类似 jquery 的 slideUp / slideDown 动画？</p>
<p>如果对 height 做 transition动画是不行的，前面讲说，height: auto 是无法计算的。</p>
<div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">.element</span> <span class="token punctuation">{</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">overflow</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span>
  <span class="token property">transition</span><span class="token punctuation">:</span> height .2s<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.element.active</span> <span class="token punctuation">{</span>
  <span class="token property">height</span><span class="token punctuation">:</span> auto<span class="token punctuation">;</span> <span class="token comment">/* 没有 transition 效果 */</span>
<span class="token punctuation">}</span>
</code></pre></div><p>如果对 max-height 做 transition：</p>
<div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">.element</span> <span class="token punctuation">{</span>
  <span class="token property">max-height</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">overflow</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span>
  <span class="token property">transition</span><span class="token punctuation">:</span> max-height .2s<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.element.active</span> <span class="token punctuation">{</span>
  <span class="token comment">/* 给一个足够大的值，当然，不能太大，毕竟是在0.2秒内变化完成 */</span>
  <span class="token property">max-height</span><span class="token punctuation">:</span> 10000px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="内联元素" tabindex="-1"><a class="header-anchor" href="#内联元素"><span>内联元素</span></a></h2>
<p>前面说过，css 是为图文展示而设计的。所谓图文，就是图片，文字，它们都是典型的内联元素。</p>
<p>所以，内联元素是最为重要的，涉及的 css 属性也非常多，这些 css 属性又通常具有<strong>继承性</strong>，这使得内联元素的解析比块级元素更难理解。</p>
<h3 id="哪些是内联元素" tabindex="-1"><a class="header-anchor" href="#哪些是内联元素"><span>哪些是内联元素</span></a></h3>
<ul>
<li>
<p>从定义看</p>
<p>内联元素的“内联”指的是外在盒子，内联元素不只有 “display: inline 的元素”，前者范围要大于后者。</p>
<p>比如：display: inline-block、display: inline-table 的元素。</p>
</li>
<li>
<p>从表现看</p>
<p>就行为来看，内联元素的特征就是<strong>可以和文字在一行显示</strong>。</p>
<p>需要注意的是，浮动元素表面上看也可以和文字一行显示，但它已经在文档流之外了。</p>
<p>浮动元素会生成“块盒子”，后面章节会介绍。</p>
</li>
</ul>
<h3 id="内联盒模型" tabindex="-1"><a class="header-anchor" href="#内联盒模型"><span>内联盒模型</span></a></h3>
<p>参考以下代码：</p>
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
<h3 id="幽灵空白节点" tabindex="-1"><a class="header-anchor" href="#幽灵空白节点"><span>幽灵空白节点</span></a></h3>
<p>幽灵空白节点是内联盒模型中非常重要的概念，具体指：在 HTML5 文档声明中，内联元素的所有渲染表现如同每个<strong>行框盒子</strong>的前面有一个空白节点。</p>
<p>幽灵空白节点永远透明，不占据宽度，无法获取。</p>
<p>注意，它只存在于 HTML5 文档中：</p>

<CodeDemo id="code-demo-473" type="normal" code="eJwtjEEKwyAQRa8ynW5bsioFO7gpeAo3RkMrsaPUJBBC7h4lrj483n8bfqdfQIF0cdFOaxqgAqmZ2gKQ84uknAxL6tpUVJyuSXhDm3PJFA5bPfXGjp9/nNkJuCr1fj7US/OuuQZOxfmcglkFeA6eh3sfoh1PCfcDgj40MA==">
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">doctype</span> <span class="token name">html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre></div><div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">div</span> <span class="token punctuation">{</span>
  <span class="token property">background</span><span class="token punctuation">:</span> #FFC75F<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">span</span> <span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> inline-block<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div></CodeDemo><p>上面这个例子，由于空白节点的存在，div 高度不为 0。</p>
<p>实际上，空白节点也是个盒子，不过是个假想盒，称为 struct (支柱)，它是一个存在于每个行框盒子前，同时具有行框内元素的字体和行高的 0 宽度的内联盒子。</p>
<p><em>Each line box starts with a zero-width inline box with the element's font and line height properties.We call that imaginary box a &quot;struct&quot;.</em></p>
<p>理解空白节点是后续很多内联元素的表现的基础。</p>
</div></template>


