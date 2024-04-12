<template><div><h1 id="对渲染的性能优化" tabindex="-1"><a class="header-anchor" href="#对渲染的性能优化"><span>对渲染的性能优化</span></a></h1>
<h2 id="布局" tabindex="-1"><a class="header-anchor" href="#布局"><span>布局</span></a></h2>
<p>所谓布局 ( layout ) 就是浏览器计算元素几何信息，即页面中元素的大小和位置。</p>
<p>布局是非常耗时的，因为布局几乎总是针对整个文档，文档的元素越多，所需时间越长。因此，我们需要减少不必要的 layout 操作。</p>
<p>下面是几种不必要的 layout 操作，应尽量避免。</p>
<h3 id="强制同步布局" tabindex="-1"><a class="header-anchor" href="#强制同步布局"><span>强制同步布局</span></a></h3>
<p>在获取 offsetLeft、offsetTop、offsetWidth、offsetHeight 等几何属性时，浏览器为了返回正确的值，会立即进行一次 layout。</p>
<p><a href="https://gist.github.com/paulirish/5d52fb081b3570c81e3a" target="_blank" rel="noopener noreferrer">更多会触发 layout 的属性<ExternalLinkIcon/></a>。</p>
<h3 id="layout-trashing" tabindex="-1"><a class="header-anchor" href="#layout-trashing"><span>layout trashing</span></a></h3>
<p>比同步布局更糟的是<strong>大量连续的同步布局</strong>。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">resizeParagraphs</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  paragraphs<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">p</span> <span class="token operator">=></span> p<span class="token punctuation">.</span>style<span class="token punctuation">.</span>width <span class="token operator">=</span> box<span class="token punctuation">.</span>offsetWidth<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><p>上面代码中，既读取 offsetWidth，又更新元素的宽度，触发了大量的 layout 操作。</p>
<p>解决方法如下：</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> width <span class="token operator">=</span> box<span class="token punctuation">.</span>offsetWidth<span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">resizeAllParagraphsToMatchBlockWidth</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  paragraphs<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">p</span> <span class="token operator">=></span> p<span class="token punctuation">.</span>style<span class="token punctuation">.</span>width <span class="token operator">=</span> width<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考"><span>参考</span></a></h2>
<p><a href="https://web.dev/avoid-large-complex-layouts-and-layout-thrashing/" target="_blank" rel="noopener noreferrer">Avoid large, complex layouts and layout thrashing<ExternalLinkIcon/></a></p>
<p><a href="https://web.dev/dom-size-and-interactivity/" target="_blank" rel="noopener noreferrer">dom-size-and-interactivity<ExternalLinkIcon/></a></p>
</div></template>


