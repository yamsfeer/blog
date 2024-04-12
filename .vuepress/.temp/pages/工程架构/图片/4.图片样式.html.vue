<template><div><h1 id="图片样式" tabindex="-1"><a class="header-anchor" href="#图片样式"><span>图片样式</span></a></h1>
<h2 id="aspect-ratio" tabindex="-1"><a class="header-anchor" href="#aspect-ratio"><span>aspect-ratio</span></a></h2>
<p><code v-pre>aspect-ratio</code> 用于设置一个元素的宽高比。</p>
<div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">div</span> <span class="token punctuation">{</span>
  <span class="token property">aspect-ratio</span><span class="token punctuation">:</span> 3 / 2
<span class="token punctuation">}</span>
</code></pre></div><p><code v-pre>aspect-ratio</code> 适用于响应式布局中的图片容器，设置了宽高比，即使宽度随窗口变化，布局也不会变乱。当然，容器里的图片可能因此变形，所以我们还需要  <code v-pre>object-fit</code> 设置图片。</p>

<CodeDemo id="code-demo-13" type="normal" code="eJy1U0tu2zAQvcpAbRAbsH5Wosiq7UWBLAr0CAYaiqQluhJJkJRiw/DdO5Qa1+giO6803zfzhk/noHFdG5TBWkjdOxBsswsMkTXfBeBOmt+4nZDoZYk3yRHNNEF7u5M7uWZimHqpko4Iyc2YAfCZ7Vp0NVhDMd84p20Zx4a8R7VwTV/1lhvfxaWLqOriE+nsnnMTa0HDirO4I9Z5t1FOhWleLLM8zV6S/KkIn5cpo/xpRapqiQPXsZ92r7FpkWfP2UuxCvOcZslqWVRsz+40FjF+PaNheHTQ9R2H0IZIQf4b8vENFgG1FuXx5fqucPY7MGF1S04l1Eawbz7yLphrSlglD6PbEVMLWQLpnRoDlTKMmxKsagWDqiX0N6T6OOY8SOh4h5COh1S1fSdtCYZrTtzMQ4R74RZegai8WVok+riAdG/m86mf6BJSDI6eJowJWV8jF6/QGwJb3H6YaBCrOXWhIU6oEjKIYfnR4O871vwlhmKfmDVc1I27Cajq4EFwwxKoGri5jWplBYLjJSi+xphDeLzrgQzEUiO0w/PictbB+KPBBpiifeffrubuteXe/H76wWaPY8HjfCen+n+UPum5Fvm+ESDC+7wOWPBToAowg0UoAkRewGwOm+3E+9oYWXdqeTTeASe9fT1PMANpe355eENGCB1c/gAAP3kI">
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>range<span class="token punctuation">"</span></span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>range<span class="token punctuation">"</span></span> <span class="token attr-name">min</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>30<span class="token punctuation">"</span></span> <span class="token attr-name">max</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>100<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>container<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://raw.githubusercontent.com/yamsfeer/pic-bed/master/photo-1682361370648-521dce49abb2<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://raw.githubusercontent.com/yamsfeer/pic-bed/master/photo-1682186353789-66c30928bdfd<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://raw.githubusercontent.com/yamsfeer/pic-bed/master/img_5terre.jpg<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://raw.githubusercontent.com/yamsfeer/pic-bed/master/img_chania.jpg<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre></div><div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">#container</span> <span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> grid<span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 90%<span class="token punctuation">;</span>
  <span class="token property">margin</span><span class="token punctuation">:</span> auto<span class="token punctuation">;</span>
  <span class="token property">border</span><span class="token punctuation">:</span> solid black 1px<span class="token punctuation">;</span>
  <span class="token property">grid-template-columns</span><span class="token punctuation">:</span> <span class="token function">repeat</span><span class="token punctuation">(</span>auto-fit<span class="token punctuation">,</span> <span class="token function">minmax</span><span class="token punctuation">(</span>180px<span class="token punctuation">,</span> 1fr<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token property">gap</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span>
  <span class="token property">padding</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">#container > div</span> <span class="token punctuation">{</span>
  <span class="token property">aspect-ratio</span><span class="token punctuation">:</span> 3 / 2<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">img</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
  <span class="token property">object-fit</span><span class="token punctuation">:</span> cover<span class="token punctuation">;</span>
  <span class="token property">object-position</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> range <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'range'</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> container <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'container'</span><span class="token punctuation">)</span>
range<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'change'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  container<span class="token punctuation">.</span>style<span class="token punctuation">.</span>width <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>range<span class="token punctuation">.</span>value<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">%</span><span class="token template-punctuation string">`</span></span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div></CodeDemo><p><code v-pre>aspect-ratio</code> 支持以下几种值：</p>
<ul>
<li>number / number，分别对应 width 和 height</li>
<li>number，第二个数字省略，表示 height 为 1</li>
<li>initial，设为初始值 auto</li>
<li>inherit，继承于父元素</li>
</ul>
<h2 id="object-fit" tabindex="-1"><a class="header-anchor" href="#object-fit"><span>object-fit</span></a></h2>
<p><code v-pre>object-fit</code> 用于设置<strong>可替换元素</strong> ( 如 img 或 video ) 如何缩放以适应容器。</p>
<div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">img</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 400px<span class="token punctuation">;</span>
  <span class="token property">object-fit</span><span class="token punctuation">:</span> cover<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p><code v-pre>object-fit</code> 的值有：</p>
<ul>
<li><code v-pre>fill</code> - 默认值。图像缩放至填充容器。如果有必要，图像将被拉长或压扁</li>
<li><code v-pre>contain</code> - 图像保持长宽比，但被调整为适合容器。</li>
<li><code v-pre>cover</code> - 图像保持其长宽比并填充容器。图像将被裁剪</li>
<li><code v-pre>none</code> - 图像不缩放</li>
<li><code v-pre>scale-down</code> - 图像缩减到最小的 <code v-pre>none</code> 或 <code v-pre>contain</code></li>
</ul>
<img class="img-mid" src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/1Bf6d.png" alt="object-fit diagram">
<p>下面来看具体例子：</p>

<CodeDemo id="code-demo-84" type="normal" code="eJzNVct22yAU/JV76DZ6OnFT1c2mXbb5Am8QQoIeHjqAq6Q5+fdeFFt2ajlL20tmRsycQXBfiAhakYqsPGdBWvOwNgArUT5YJztpqAKpacdXGUIjJXUHTFHvv62JsU5TtSbgHcOlCKH3VZY5OqSdDGJTbzx3zJrATUiZ1dkz1b7l3GW9ZEnNm0xTH+JS2GCTYnlfLpbF4nO+vL1P7sqiYfz2C63rEi0ytJ+y1b8xbdLKUEErlZpPF5nzZZsxB0Ods8Nl+4nbU2nmK9qSF2tp638lRf3h7lRNSF2wJHS/ioqMNSdfAsMvVlA0v4p+PKOKJ40dTly3PX+enFQFtPj14xF+2s6uyUeJzlrgTLBVtp9A5IYw73EqiRJeYuYWbZOWaqmeK/huN07ijXjkww1oa6zvKeNfJ52Xf3kFBdcjpKnDOTauIYc8XYz4azzA9G1+vVkMsgkCZXd5/7QTxKbmSADBZSfwxIt8h9TWNdwh0j+Bt0o28CnP8/cRUAsR2rqPhb83mLabDA7zpONUGT/4fwROkt2TeqTaEgfC+KzMyBA+aAiv1pEmopPk4Bc6Eu65nZy8/gPTa9ep">
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>section</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h2</span><span class="token punctuation">></span></span>original image<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h2</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>normal<span class="token punctuation">"</span></span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://raw.githubusercontent.com/yamsfeer/pic-bed/master/photo-1682361370648-521dce49abb2<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>

  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h2</span><span class="token punctuation">></span></span>object-fit: fill<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h2</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>fill<span class="token punctuation">"</span></span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://raw.githubusercontent.com/yamsfeer/pic-bed/master/photo-1682361370648-521dce49abb2<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>fill narrow<span class="token punctuation">"</span></span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://raw.githubusercontent.com/yamsfeer/pic-bed/master/photo-1682361370648-521dce49abb2<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>

  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h2</span><span class="token punctuation">></span></span>object-fit: contain<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h2</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>contain<span class="token punctuation">"</span></span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://raw.githubusercontent.com/yamsfeer/pic-bed/master/photo-1682361370648-521dce49abb2<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>contain narrow<span class="token punctuation">"</span></span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://raw.githubusercontent.com/yamsfeer/pic-bed/master/photo-1682361370648-521dce49abb2<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>

  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h2</span><span class="token punctuation">></span></span>object-fit: cover<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h2</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>cover<span class="token punctuation">"</span></span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://raw.githubusercontent.com/yamsfeer/pic-bed/master/photo-1682361370648-521dce49abb2<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>cover narrow<span class="token punctuation">"</span></span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://raw.githubusercontent.com/yamsfeer/pic-bed/master/photo-1682361370648-521dce49abb2<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>

  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h2</span><span class="token punctuation">></span></span>object-fit: none<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h2</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>none<span class="token punctuation">"</span></span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://raw.githubusercontent.com/yamsfeer/pic-bed/master/photo-1682361370648-521dce49abb2<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>none narrow<span class="token punctuation">"</span></span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://raw.githubusercontent.com/yamsfeer/pic-bed/master/photo-1682361370648-521dce49abb2<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>

  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h2</span><span class="token punctuation">></span></span>object-fit: scale-down<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h2</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>scale-down<span class="token punctuation">"</span></span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://raw.githubusercontent.com/yamsfeer/pic-bed/master/photo-1682361370648-521dce49abb2<span class="token punctuation">"</span></span> <span class="token attr-name">alt</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>MDN Logo<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>scale-down narrow<span class="token punctuation">"</span></span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://raw.githubusercontent.com/yamsfeer/pic-bed/master/photo-1682361370648-521dce49abb2<span class="token punctuation">"</span></span> <span class="token attr-name">alt</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>MDN Logo<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>section</span><span class="token punctuation">></span></span>
</code></pre></div><div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">h2</span> <span class="token punctuation">{</span>
  <span class="token property">font-family</span><span class="token punctuation">:</span> Courier New<span class="token punctuation">,</span> monospace<span class="token punctuation">;</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 1em<span class="token punctuation">;</span>
  <span class="token property">margin</span><span class="token punctuation">:</span> 1em 0 0.3em<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.normal</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 150px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">img</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 150px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
  <span class="token property">border</span><span class="token punctuation">:</span> 1px solid #000<span class="token punctuation">;</span>
  <span class="token property">margin</span><span class="token punctuation">:</span> 10px 0<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.narrow</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 150px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.fill</span> <span class="token punctuation">{</span>
  <span class="token property">object-fit</span><span class="token punctuation">:</span> fill<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.contain</span> <span class="token punctuation">{</span>
  <span class="token property">object-fit</span><span class="token punctuation">:</span> contain<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.cover</span> <span class="token punctuation">{</span>
  <span class="token property">object-fit</span><span class="token punctuation">:</span> cover<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.none</span> <span class="token punctuation">{</span>
  <span class="token property">object-fit</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.scale-down</span> <span class="token punctuation">{</span>
  <span class="token property">object-fit</span><span class="token punctuation">:</span> scale-down<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre></div></CodeDemo><p><code v-pre>object-fit</code> 有一个相关属性 <code v-pre>object-position</code>，它可以控制图片在容器中的位置，类似 <code v-pre>background-position</code>，其默认值是 <code v-pre>object-position: 50% 50%</code>，即居中。</p>
<h2 id="image-rendering" tabindex="-1"><a class="header-anchor" href="#image-rendering"><span>image-rendering</span></a></h2>
<p><code v-pre>image-rendering</code> 用于设置图像缩放算法。</p>
<div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">img</span> <span class="token punctuation">{</span>
  <span class="token property">image-rendering</span><span class="token punctuation">:</span> auto<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>当页面作者指定的尺寸不是图像的原始尺寸时，用户代理将缩放图像。缩放也可能由于用户互动 ( 双指缩放 ) 而发生。</p>
<p>举个例子，如果有一张 <code v-pre>100×100px</code> 的图片，但作者将尺寸设置为 <code v-pre>200×200px</code>，图片便会根据 <code v-pre>image-rendering</code> 指定的算法缩小或放大。对于未缩放的图像没有影响。</p>
<p><code v-pre>image-rendering</code> 可以有以下几种值：</p>
<ul>
<li>auto：默认值，由浏览器选择缩放算法</li>
<li>smooth：用能最大化图像客观观感的算法来缩放图像，例如双线性插值</li>
<li>high-quality：与 smooth 相同，但更倾向于更高质量的缩放。</li>
<li>crisp-edges：保护图像的对比度和边缘，适用于像素图，例如一些网页游戏图像</li>
<li>pixelated：放大图像时，使用最近邻居算法，图像看着像是由大块像素组成的；缩小图像时，算法与 <code v-pre>auto</code> 相同</li>
</ul>
<p>现代浏览器暂时只支持：<code v-pre>auto</code>、<code v-pre>pixelated</code>、以及 <code v-pre>-webkit-optimize-contrast</code> ( Chrome 下的 smooth )。</p>

<CodeDemo id="code-demo-137" type="normal" code="eJy1U8tuwyAQ/BXEucRtT5Wb9kt8IXgDqxpMYdPEjfLvBRO57sNSLj7Zy87sDDCcuSHb8ZpvW/xgqpMxvjRc9Y4kOggNf20cY7lZftDqCSUP1DecxaBSYYh8rKsqyONGI5nD7hAh5EHgaKN6Ww3Sxj1AqDwqsYO2sjJSKqPFDoZE2qdhVZHxr3n4tvKp3FZF/X8T0fY9mdVslPG3GDGojXg/yA5pWM3OXOQWUypg9AJaDXE1TzONWyx5PEEnCdrVDE0Kv+xcv/yOqxhT5NPoa8zZOVPbtI9ODjXbd3B6zita+po93vtcXRqXn8iIJDiRSJegXc1UMgmhAPI+R8ARWzI1eypUxgyki6NpIUF9AVoZNDpBfRJ6mJqbnP4CQCs1iACuhYBO12x8dSOoZHMBVpqj+J+eOMLuDUn0ntDiJ4h8ECEd6VV9nrKF8T/SPpJmMVjgzMM4UqaLWiB8RyXD+eUL9Hqq/w==">
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>container<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>auto<span class="token punctuation">"</span></span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://raw.githubusercontent.com/yamsfeer/pic-bed/master/smiley.gif<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>auto<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>smooth<span class="token punctuation">"</span></span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://raw.githubusercontent.com/yamsfeer/pic-bed/master/smiley.gif<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>smooth<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>high-quality<span class="token punctuation">"</span></span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://raw.githubusercontent.com/yamsfeer/pic-bed/master/smiley.gif<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>high-quality<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>crisp-edges<span class="token punctuation">"</span></span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://raw.githubusercontent.com/yamsfeer/pic-bed/master/smiley.gif<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>crisp-edges<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>pixelated<span class="token punctuation">"</span></span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://raw.githubusercontent.com/yamsfeer/pic-bed/master/smiley.gif<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>pixelated<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre></div><div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">.container</span> <span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
  <span class="token property">gap</span><span class="token punctuation">:</span> 20px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">div</span> <span class="token punctuation">{</span>
  <span class="token property">text-align</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">img</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 80px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 80px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">p</span> <span class="token punctuation">{</span>
  <span class="token property">margin-top</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.auto</span> <span class="token punctuation">{</span>
  <span class="token property">image-rendering</span><span class="token punctuation">:</span> auto
<span class="token punctuation">}</span>
<span class="token selector">.smooth</span> <span class="token punctuation">{</span>
  <span class="token property">image-rendering</span><span class="token punctuation">:</span> smooth<span class="token punctuation">;</span>
  <span class="token property">image-rendering</span><span class="token punctuation">:</span> -webkit-optimize-contrast<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.high-quality</span> <span class="token punctuation">{</span>
  <span class="token property">image-rendering</span><span class="token punctuation">:</span> high-quality
<span class="token punctuation">}</span>
<span class="token selector">.crisp-edges</span> <span class="token punctuation">{</span>
  <span class="token property">image-rendering</span><span class="token punctuation">:</span> crisp-edges
<span class="token punctuation">}</span>
<span class="token selector">.pixelated</span> <span class="token punctuation">{</span>
  <span class="token property">image-rendering</span><span class="token punctuation">:</span> pixelated
<span class="token punctuation">}</span>
</code></pre></div></CodeDemo><h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考"><span>参考</span></a></h2>
<p><a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/aspect-ratio" target="_blank" rel="noopener noreferrer">mdn - aspect-ratio<ExternalLinkIcon/></a></p>
<p><a href="https://www.w3schools.com/cssref/css_pr_aspect-ratio.php" target="_blank" rel="noopener noreferrer">w3schools - CSS aspect-ratio Property<ExternalLinkIcon/></a></p>
<p><a href="https://www.w3schools.com/cssref/css3_pr_object-fit.php" target="_blank" rel="noopener noreferrer">w3schools - CSS object-fit Property<ExternalLinkIcon/></a></p>
<p><a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/image-rendering" target="_blank" rel="noopener noreferrer">md - image-rendering<ExternalLinkIcon/></a></p>
</div></template>


