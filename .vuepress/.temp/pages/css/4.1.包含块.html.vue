<template><div><h1 id="包含块-containing-block" tabindex="-1"><a class="header-anchor" href="#包含块-containing-block"><span>包含块 ( containing block )</span></a></h1>
<p>一个元素的尺寸和位置会受它的包含块的影响。</p>
<p>对于 width, height, padding, margin，定位元素的偏移值 ( left, top 等 )，这些属性为百分比时，其计算值是通过元素的包含块计算得来。</p>

<CodeDemo id="code-demo-9" type="normal" code="eJxljcsKwyAQRX9lGOiuTQOlG5v2S9wYlSgxWtT0Qci/RwkJSFbDnMs9d0IVB4MEG6E/wA0L4UmROxuZttJTfFELUIQ6yiHx5ppgSreLZ+QhJFO1t6fc/WoRFYF7Xb9/jwyU1J2KBG47aRnvO+9GKy7cGecJhP7fmlGmdKa2youl61SYtv/o8VKsDpwXBhJO1w==">
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>container<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>item<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre></div><div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">.container</span><span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 500px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 300px<span class="token punctuation">;</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> skyblue<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.item</span><span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 50%<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 50%<span class="token punctuation">;</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div></CodeDemo><p>item 的宽高为 250 * 150。</p>
<p>事实上，item 的宽高不是根据其父元素宽高计算，而是根据它的包含块计算得到的，item 的包含块的大小，正是 item 最近的祖先块元素的内容区。</p>
<h2 id="html-元素的包含块" tabindex="-1"><a class="header-anchor" href="#html-元素的包含块"><span>html 元素的包含块</span></a></h2>
<p>html 元素所在的包含块，被称之为初始包含块 <em>( initial containing block )</em>。</p>
<p>对于浏览器而言，初始包含块的的大小等于视口 viewport 的大小，它位于视口左上角。初始包含块是 position 为 absolute 和 fixed 元素定位的参照物。</p>
<h2 id="非-html-元素的包含块" tabindex="-1"><a class="header-anchor" href="#非-html-元素的包含块"><span>非 html 元素的包含块</span></a></h2>
<p>非 html 元素的包含块判定有以下几种情况：</p>
<ul>
<li>static 或 relative 元素的包含块为：最近祖先块容器 ( block container ) 的内容区 ( content area )。</li>
<li>absolute 元素的包含块为：它最近的非 static 的祖先元素的 padding 区域。非 static 定位包含 fixed、absolute、relative、sticky。</li>
<li>fixed 元素的包含块为 viewport。</li>
</ul>
<p>关于 absolute 元素的包含块，举个例子：</p>

<CodeDemo id="code-demo-54" type="normal" code="eJx9T0FOwzAQ/MrKx4o2pSiXtPCSXBzbJFYdO7KdUhT1hCrxAm4gLvyAL1UVv8BuYpdItCd7Z2Z3ZjpU2VqgDK0o3wAR2Jj7HBElLeaS6Rw95BJgRHLL6gH/h1k4apU4tF8cfuFFN4gY4+xm0QI6L3zi1FYZpPN5s116oGK8rGwGdxEpMFmXWrWSTokSSmdg1s+FaNmJbZThliuZgWYCW75hS0gm8PP+Aca6mcDx6+2wfz3sX47fnzBJcrnL5cxHhs4rL6litnOSkO02jdmUpswlSpstGCU4PaE11iWXU8EevXhYD66LUfHA/jl+pbhmvcG5NC6cbWv70mGAUY0QY7hqVRMnlwntfgEVUrdK">
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>container<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>item<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>item2<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre></div><div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">.container</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 500px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 300px<span class="token punctuation">;</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> skyblue<span class="token punctuation">;</span>
  <span class="token property">position</span><span class="token punctuation">:</span> relative<span class="token punctuation">;</span> <span class="token comment">/* 非 static 祖先元素 */</span>
<span class="token punctuation">}</span>
<span class="token selector">.item</span> <span class="token punctuation">{</span> <span class="token comment">/* static 祖先元素 */</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 300px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 150px<span class="token punctuation">;</span>
  <span class="token property">border</span><span class="token punctuation">:</span> 5px solid<span class="token punctuation">;</span>
  <span class="token property">margin-left</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.item2</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
  <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span> <span class="token comment">/* absolute 元素 */</span>
  <span class="token property">left</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span>
  <span class="token property">top</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div></CodeDemo><p>item2 的包含块是 container 而非 item。</p>
<h3 id="特殊情况" tabindex="-1"><a class="header-anchor" href="#特殊情况"><span>特殊情况</span></a></h3>
<p>对于非 html 元素 absolute 和 fixed 定位，其父级元素满足以下情况时，父元素的 padding area 也可以作为包含块。</p>
<ul>
<li>transform 或 perspective 的值不是 none</li>
<li>will-change 是 transform 或 perspective</li>
<li>contain 是 paint</li>
</ul>
<p>上面的例子，item 只需加上一个 transform，就会变成 item2 的包含块。</p>

<CodeDemo id="code-demo-87" type="normal" code="eJx9kEFOwzAQRa8y8goq2oaibNLCSbJx4mli1fFE9qQUVT0Ce27BlgMhzoHTNI4iIVa2/5+Z/8ZnUXNjRCZ2Sh+hNNL751yUZFlqiy4XL7kFmJmasbnpfzibYO3WQR0ab7fxFA+i9D7ErWIEnPvCV624ziBNkva07YUadVVzBk9RKWR5qBx1Vi1LMuQy8Ie3wnR4dVvymjXZDBwayfrYy5fcrnqoWcY0ccx4TGMGOYVhctqewJPR6qo20lXaLg3u++LYzk5avyfXhExiyXiXKKzut7BeTB58f73/fHyCJYuwWE9MmxnUNDVC/bO4wwFsWloWAbfj4S9G0JGT2vgK6eLyC3tUqVA=">
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>container<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>item<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>item2<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre></div><div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">.container</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 500px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 300px<span class="token punctuation">;</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> skyblue<span class="token punctuation">;</span>
  <span class="token property">position</span><span class="token punctuation">:</span> relative<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.item</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 300px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 150px<span class="token punctuation">;</span>
  <span class="token property">border</span><span class="token punctuation">:</span> 5px solid<span class="token punctuation">;</span>
  <span class="token property">margin-left</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
  <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">rotate</span><span class="token punctuation">(</span>0deg<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">/* transform 不是 none */</span>
<span class="token punctuation">}</span>
<span class="token selector">.item2</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
  <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span>
  <span class="token property">left</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span>
  <span class="token property">top</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div></CodeDemo><h2 id="具体例子" tabindex="-1"><a class="header-anchor" href="#具体例子"><span>具体例子</span></a></h2>
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span>Illustration of containing blocks<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>body<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>div1<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>p1<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>This is text in the first paragraph...<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>p2<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        This is text
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>em</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>em1<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
          in the
          <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>strong</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>strong1<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>second<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>strong</span><span class="token punctuation">></span></span>
          paragraph.
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>em</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre></div><p>以上 html 代码，在没有添加任何 CSS 的情况下，各元素的包含块如下：</p>
<table>
<thead>
<tr>
<th>元素</th>
<th>包含块</th>
</tr>
</thead>
<tbody>
<tr>
<td>html</td>
<td>initial containing block (UA-dependent)</td>
</tr>
<tr>
<td>body</td>
<td>html</td>
</tr>
<tr>
<td>div1</td>
<td>body</td>
</tr>
<tr>
<td>p1</td>
<td>div1</td>
</tr>
<tr>
<td>p2</td>
<td>div1</td>
</tr>
<tr>
<td>em1</td>
<td>p2</td>
</tr>
<tr>
<td>strong1</td>
<td>p2</td>
</tr>
</tbody>
</table>
<p>html 元素的包含块为初始包含块，这通常是浏览器决定的。</p>
<p>strong 元素的包含块之所以不是 em 而是 p2，是因为 em 不是块容器，参考：</p>
<blockquote>
<p>static 或 relative 元素的包含块为: 离它最近的块容器 ( block container ) 的内容区 ( content area )。</p>
</blockquote>
<p>我们添加以下 css 代码：</p>
<div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">#div1</span> <span class="token punctuation">{</span> 
  <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span> 
  <span class="token property">left</span><span class="token punctuation">:</span> 50px<span class="token punctuation">;</span> 
  <span class="token property">top</span><span class="token punctuation">:</span> 50px 
<span class="token punctuation">}</span>
<span class="token selector">#em1</span>  <span class="token punctuation">{</span> 
  <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span> 
  <span class="token property">left</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span> 
  <span class="token property">top</span><span class="token punctuation">:</span> 100px 
<span class="token punctuation">}</span>
</code></pre></div><p>此时包含块的结果如下：</p>
<table>
<thead>
<tr>
<th>元素</th>
<th>包含块</th>
</tr>
</thead>
<tbody>
<tr>
<td>html</td>
<td>initial C.B. (UA-dependent)</td>
</tr>
<tr>
<td>body</td>
<td>html</td>
</tr>
<tr>
<td>div1</td>
<td>initial C.B. (UA-dependent)</td>
</tr>
<tr>
<td>p1</td>
<td>div1</td>
</tr>
<tr>
<td>p2</td>
<td>div1</td>
</tr>
<tr>
<td>em1</td>
<td>div1 ( 因为定位了 )</td>
</tr>
<tr>
<td>strong1</td>
<td>em1 ( 因为 em 变为了块容器 )</td>
</tr>
</tbody>
</table>
<p>对 div1 进行 absolute 定位，其包含块变成初始包含块，然后对 em1 进行 absolute 定位，em1 的包含块就会变成 div1。</p>
<p>最特别的是，strong 元素的包含块会变成 em，因为 em 在上一步已经成为了块容器，满足作为 strong 包含块的全部条件。</p>
<h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h2>
<p>一个元素的尺寸和位置经常受其包含块 ( containing block ) 的影响。</p>
<p>对于 width, height, padding, margin，定位元素的偏移值 ( left, top 等 )，这些属性为百分比时，其计算值是通过元素的包含块计算得来。</p>
<p>大多数情况下，包含块就是这个元素最近的祖先块元素的内容区域。</p>
<ul>
<li>
<p>html 元素的包含块：视口 viewport</p>
</li>
<li>
<p>非 html 元素的包含块：</p>
<ul>
<li>static 或 relative 元素：最近的祖先块容器的内容区 ( 最常见情况 ) 。</li>
<li>absolute 元素：它最近的非 static 的祖先元素的 padding 区域。</li>
<li>fixed 元素：viewport。</li>
</ul>
<p>对于 absolute 和 fixed 元素，如果其父元素的 transform 不为 none，也可以作为包含块。</p>
</li>
</ul>
<p>关于包含块的内容参考 <a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/Containing_block" target="_blank" rel="noopener noreferrer">MDN<ExternalLinkIcon/></a>。</p>
</div></template>


