<template><div><h1 id="盒-box" tabindex="-1"><a class="header-anchor" href="#盒-box"><span>盒 ( box )</span></a></h1>
<h2 id="盒模型" tabindex="-1"><a class="header-anchor" href="#盒模型"><span>盒模型</span></a></h2>
<p>在 css 中，布局的基本单位是盒 ( box )，box 总是矩形的，它包含 4 部分：</p>
<ul>
<li>content box</li>
<li>padding box</li>
<li>border box</li>
<li>margin box</li>
</ul>
<p>在 css 中可以对盒子的 4 部分内容进行设置：</p>
<div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">.container</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
  <span class="token property">padding</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span>
  <span class="token property">border</span><span class="token punctuation">:</span> 1px solid #000<span class="token punctuation">;</span>
  <span class="token property">margin</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>其盒模型示意图如下：</p>
<p><img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/image-20231117154820156.png" alt="image-20231117154820156"></p>
<p>值得注意的是，container 的宽高设置的是 content box 部分，这是由 box-sizing 决定的。</p>
<div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">.container</span> <span class="token punctuation">{</span>
  <span class="token property">box-sizing</span><span class="token punctuation">:</span> content-box<span class="token punctuation">;</span> <span class="token comment">/* 默认值 */</span>
  <span class="token property">box-sizing</span><span class="token punctuation">:</span> border-box<span class="token punctuation">;</span> <span class="token comment">/* 宽高改为设置 border-box */</span>
<span class="token punctuation">}</span>
</code></pre></div><p>元素和盒并不是一一对应的，一个元素可以生成 0 个或多个盒。比如 li 元素就会生成一个 block box 和额外的 marker box。</p>
<p>block box：</p>
<img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/image-20231117163919955.png" alt="image-20231117163919955" style="zoom:50%;" />
<p>marker box：</p>
<img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/image-20231117164109661.png" alt="image-20231117164109661" style="zoom:50%;" />
<p>生成多少个盒子、盒子的类型等都是由元素的 display 属性决定的。</p>
<h2 id="盒类型" tabindex="-1"><a class="header-anchor" href="#盒类型"><span>盒类型</span></a></h2>
<p>元素的 display 属性决定了生成什么类型的 box，也决定了元素如何布局。事实上，display 属性同时定义了一个元素的两种 display type：</p>
<ul>
<li>outer display type：决定元素自身受何种 formatting context 影响</li>
<li>inner display type：决定为子元素创建何种 formatting context，从而影响子元素的排列</li>
</ul>
<p>display 对应生成的盒子类型如下表：</p>
<table>
<thead>
<tr>
<th style="text-align:left">display</th>
<th style="text-align:left">display 全写</th>
<th style="text-align:left">盒子类型</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">none</td>
<td style="text-align:left">—</td>
<td style="text-align:left">subtree omitted from <a href="https://www.w3.org/TR/css-display-3/#box-tree" target="_blank" rel="noopener noreferrer">box tree<ExternalLinkIcon/></a></td>
</tr>
<tr>
<td style="text-align:left">contents</td>
<td style="text-align:left">—</td>
<td style="text-align:left">element replaced by contents in <a href="https://www.w3.org/TR/css-display-3/#box-tree" target="_blank" rel="noopener noreferrer">box tree<ExternalLinkIcon/></a></td>
</tr>
<tr>
<td style="text-align:left">block</td>
<td style="text-align:left">block flow</td>
<td style="text-align:left"><a href="https://www.w3.org/TR/css-display-3/#block-level" target="_blank" rel="noopener noreferrer">block-level<ExternalLinkIcon/></a> <a href="https://www.w3.org/TR/css-display-3/#block-container" target="_blank" rel="noopener noreferrer">block container<ExternalLinkIcon/></a> aka <a href="https://www.w3.org/TR/css-display-3/#block-box" target="_blank" rel="noopener noreferrer">block box<ExternalLinkIcon/></a></td>
</tr>
<tr>
<td style="text-align:left">flow-root</td>
<td style="text-align:left">block flow-root</td>
<td style="text-align:left"><a href="https://www.w3.org/TR/css-display-3/#block-level" target="_blank" rel="noopener noreferrer">block-level<ExternalLinkIcon/></a> <a href="https://www.w3.org/TR/css-display-3/#block-container" target="_blank" rel="noopener noreferrer">block container<ExternalLinkIcon/></a> that establishes a new <a href="https://www.w3.org/TR/css-display-3/#block-formatting-context" target="_blank" rel="noopener noreferrer">block formatting context<ExternalLinkIcon/></a> (<a href="https://www.w3.org/TR/css-display-3/#bfc" target="_blank" rel="noopener noreferrer">BFC<ExternalLinkIcon/></a>)</td>
</tr>
<tr>
<td style="text-align:left">inline</td>
<td style="text-align:left">inline flow</td>
<td style="text-align:left"><a href="https://www.w3.org/TR/css-display-3/#inline-box" target="_blank" rel="noopener noreferrer">inline box<ExternalLinkIcon/></a></td>
</tr>
<tr>
<td style="text-align:left">inline-block</td>
<td style="text-align:left">inline flow-root</td>
<td style="text-align:left"><a href="https://www.w3.org/TR/css-display-3/#inline-level" target="_blank" rel="noopener noreferrer">inline-level<ExternalLinkIcon/></a> <a href="https://www.w3.org/TR/css-display-3/#block-container" target="_blank" rel="noopener noreferrer">block container<ExternalLinkIcon/></a> aka inline block</td>
</tr>
<tr>
<td style="text-align:left">run-in</td>
<td style="text-align:left">run-in flow</td>
<td style="text-align:left"><a href="https://www.w3.org/TR/css-display-3/#run-in" target="_blank" rel="noopener noreferrer">run-in box<ExternalLinkIcon/></a> (<a href="https://www.w3.org/TR/css-display-3/#inline-box" target="_blank" rel="noopener noreferrer">inline box<ExternalLinkIcon/></a> with special box-tree-munging rules)</td>
</tr>
<tr>
<td style="text-align:left">list-item</td>
<td style="text-align:left">block flow list-item</td>
<td style="text-align:left"><a href="https://www.w3.org/TR/css-display-3/#block-box" target="_blank" rel="noopener noreferrer">block box<ExternalLinkIcon/></a> with additional <a href="https://www.w3.org/TR/CSS2/generate.html#lists" target="_blank" rel="noopener noreferrer">marker box<ExternalLinkIcon/></a></td>
</tr>
<tr>
<td style="text-align:left">inline list-item</td>
<td style="text-align:left">inline flow list-item</td>
<td style="text-align:left"><a href="https://www.w3.org/TR/css-display-3/#inline-box" target="_blank" rel="noopener noreferrer">inline box<ExternalLinkIcon/></a> with additional <a href="https://www.w3.org/TR/CSS2/generate.html#lists" target="_blank" rel="noopener noreferrer">marker box<ExternalLinkIcon/></a></td>
</tr>
<tr>
<td style="text-align:left">flex</td>
<td style="text-align:left">block flex</td>
<td style="text-align:left"><a href="https://www.w3.org/TR/css-display-3/#block-level" target="_blank" rel="noopener noreferrer">block-level<ExternalLinkIcon/></a> <a href="https://www.w3.org/TR/css-flexbox-1/#flex-container" target="_blank" rel="noopener noreferrer">flex container<ExternalLinkIcon/></a></td>
</tr>
<tr>
<td style="text-align:left">inline-flex</td>
<td style="text-align:left">inline flex</td>
<td style="text-align:left"><a href="https://www.w3.org/TR/css-display-3/#inline-level" target="_blank" rel="noopener noreferrer">inline-level<ExternalLinkIcon/></a> <a href="https://www.w3.org/TR/css-flexbox-1/#flex-container" target="_blank" rel="noopener noreferrer">flex container<ExternalLinkIcon/></a></td>
</tr>
<tr>
<td style="text-align:left">grid</td>
<td style="text-align:left">block grid</td>
<td style="text-align:left"><a href="https://www.w3.org/TR/css-display-3/#block-level" target="_blank" rel="noopener noreferrer">block-level<ExternalLinkIcon/></a> <a href="https://www.w3.org/TR/css-grid-2/#grid-container" target="_blank" rel="noopener noreferrer">grid container<ExternalLinkIcon/></a></td>
</tr>
<tr>
<td style="text-align:left">inline-grid</td>
<td style="text-align:left">inline grid</td>
<td style="text-align:left"><a href="https://www.w3.org/TR/css-display-3/#inline-level" target="_blank" rel="noopener noreferrer">inline-level<ExternalLinkIcon/></a> <a href="https://www.w3.org/TR/css-grid-2/#grid-container" target="_blank" rel="noopener noreferrer">grid container<ExternalLinkIcon/></a></td>
</tr>
<tr>
<td style="text-align:left">ruby</td>
<td style="text-align:left">inline ruby</td>
<td style="text-align:left"><a href="https://www.w3.org/TR/css-display-3/#inline-level" target="_blank" rel="noopener noreferrer">inline-level<ExternalLinkIcon/></a> <a href="https://www.w3.org/TR/css-ruby-1/#ruby-container" target="_blank" rel="noopener noreferrer">ruby container<ExternalLinkIcon/></a></td>
</tr>
<tr>
<td style="text-align:left">block ruby</td>
<td style="text-align:left">block ruby</td>
<td style="text-align:left"><a href="https://www.w3.org/TR/css-display-3/#block-box" target="_blank" rel="noopener noreferrer">block box<ExternalLinkIcon/></a> containing <a href="https://www.w3.org/TR/css-ruby-1/#ruby-container" target="_blank" rel="noopener noreferrer">ruby container<ExternalLinkIcon/></a></td>
</tr>
<tr>
<td style="text-align:left">table</td>
<td style="text-align:left">block table</td>
<td style="text-align:left"><a href="https://www.w3.org/TR/css-display-3/#block-level" target="_blank" rel="noopener noreferrer">block-level<ExternalLinkIcon/></a> <a href="https://www.w3.org/TR/css-tables-3/#table-wrapper-box" target="_blank" rel="noopener noreferrer">table wrapper box<ExternalLinkIcon/></a> containing <a href="https://www.w3.org/TR/css-tables-3/#table-grid-box" target="_blank" rel="noopener noreferrer">table grid box<ExternalLinkIcon/></a></td>
</tr>
<tr>
<td style="text-align:left">inline-table</td>
<td style="text-align:left">inline table</td>
<td style="text-align:left"><a href="https://www.w3.org/TR/css-display-3/#inline-level" target="_blank" rel="noopener noreferrer">inline-level<ExternalLinkIcon/></a> <a href="https://www.w3.org/TR/css-tables-3/#table-wrapper-box" target="_blank" rel="noopener noreferrer">table wrapper box<ExternalLinkIcon/></a> containing <a href="https://www.w3.org/TR/css-tables-3/#table-grid-box" target="_blank" rel="noopener noreferrer">table grid box<ExternalLinkIcon/></a></td>
</tr>
</tbody>
</table>
<p>以 <code v-pre>display: inline-block</code> 为例，它的完整写法是 <code v-pre>display: inline flow-root</code></p>
<ul>
<li>inline 表示外部类型为 inline-level</li>
<li>flow-root 表示内部类型为 block container</li>
<li>外部类型是 inline-level 内部类型是 block container 的盒子称为 inline block box。</li>
</ul>
<p>注意，一个 div 元素 <code v-pre>display:inline-block</code> 并没有生成两个盒子，而是生成的盒子既是 inline-level 类型，又是 block container 类型，它们一个决定 div 如何受外部上下文影响，一个决定 div 的子元素如何布局。</p>
<h3 id="outer-display-type" tabindex="-1"><a class="header-anchor" href="#outer-display-type"><span>outer display type</span></a></h3>
<p>外部盒子类型通常称为 xx-level box，决定元素自身受哪种 formatting context 影响。</p>
<ul>
<li>
<p>block-level box：元素自身受 BFC 影响</p>
</li>
<li>
<p>inline-level box：元素自身受 IFC 影响</p>
<ul>
<li>
<p>inline box</p>
</li>
<li>
<p>atomic inline-level box</p>
</li>
</ul>
</li>
</ul>
<h3 id="inner-display-type" tabindex="-1"><a class="header-anchor" href="#inner-display-type"><span>inner display type</span></a></h3>
<p>内部盒子类型通常称为 xx container，它会创建对应类型的 formatting context，从而决定元素的后代元素如何布局。</p>
<ul>
<li>block container：建立 BFC | IFC</li>
<li>flex container：建立 FFC ( flex formatting context )</li>
<li>grid container：建立 GFC ( grid formatting context )</li>
</ul>
<p>注意，替换元素的 display 默认值为 inline，由于其本意是显示图片，而并非作为其他元素的容器，因此无论如何设置 display，都不会生成 container box。</p>
<h3 id="text-align-与盒类型" tabindex="-1"><a class="header-anchor" href="#text-align-与盒类型"><span>text-align 与盒类型</span></a></h3>
<p>我们都知道，text-align 可以使文本内容居中。事实上，text-align 属性是设置于 block container，作用于所有 inline-level 的子元素。</p>
<p><img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/text-align.png" alt=""></p>

<CodeDemo id="code-demo-372" type="normal" code="eJxVjDEKgEAMBL8SUtiJ/aG+5JrzDBqMUTSIIv7dQ7SwWnYY5sTeRkGHZcsbrHYIVR6NdsuDcKcukhotHmuvAD+p5XWWcDhgFVbKG5nikMT3Cm0kkMGDIU5qIeGlLFIjxb7F6wblcC5L">
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span><span class="token value css language-css"><span class="token property">text-align</span><span class="token punctuation">:</span>center</span><span class="token punctuation">"</span></span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span><span class="token value css language-css"><span class="token property">display</span><span class="token punctuation">:</span> inline-block</span><span class="token punctuation">"</span></span></span><span class="token punctuation">></span></span>inline-level &amp; block container<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre></div></CodeDemo><p>上面父 div 的内部类型为 block container，设置了 text-align:center 后，外部类型为 inline-level 的资源都会居中。</p>
<p>当父 div 的外部类型不为 block container 时，text-align 自然就失效了。</p>

<CodeDemo id="code-demo-381" type="normal" code="eJx9jLsKhUAMRH8lpLid3H59fMk26xo0GKNoEEX8dxfR1mqYw8w5sLNB0GHR8AqL7UKlx4aXScLugFVYKQejzbIg3KqLpEazx8orwNcrq2WMfRo+VWglgR/cGOKoFhKei39yJNmbeF49tjR1">
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span><span class="token value css language-css"><span class="token property">display</span><span class="token punctuation">:</span> inline<span class="token punctuation">;</span> <span class="token property">text-align</span><span class="token punctuation">:</span>center</span><span class="token punctuation">"</span></span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span><span class="token value css language-css"><span class="token property">display</span><span class="token punctuation">:</span> inline-block</span><span class="token punctuation">"</span></span></span><span class="token punctuation">></span></span>inline-level &amp; block container<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre></div></CodeDemo><h2 id="line-box" tabindex="-1"><a class="header-anchor" href="#line-box"><span>line box</span></a></h2>
<h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h2>
<p>display 决定元素生成的盒子个数和类型。一个盒子同时存在外部和内部两种类型，外部类型决定自身如何布局，内部类型决定生成何种格式化上下文，从而决定其子元素如何布局。</p>
<p>outer display type:</p>
<ul>
<li>
<p>block-level box：元素自身受 BFC 影响</p>
</li>
<li>
<p>inline-level box：元素自身受 IFC 影响</p>
<ul>
<li>
<p>inline box</p>
</li>
<li>
<p>atomic inline-level box</p>
</li>
</ul>
</li>
</ul>
<p>inner display type:</p>
<ul>
<li>block container：建立 BFC | IFC</li>
<li>flex container：建立 FFC</li>
<li>grid container：建立 GFC</li>
</ul>
<h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考"><span>参考</span></a></h2>
<p><a href="https://www.w3.org/TR/css-display-3/" target="_blank" rel="noopener noreferrer">display - www.w3.org<ExternalLinkIcon/></a></p>
<p><a href="https://yachen168.github.io/article/display.html" target="_blank" rel="noopener noreferrer">你不知道的display - yachen168.github.io<ExternalLinkIcon/></a></p>
</div></template>


