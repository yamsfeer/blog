<template><div><p>在浏览器中，渲染就是从代码字符串到图片像素的过程。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code>pixels <span class="token operator">=</span> <span class="token function">render</span><span class="token punctuation">(</span>html<span class="token punctuation">)</span>
</code></pre></div><p>在渲染之前，需要网络进程下载代码，准确来说是下载 html 文档。然后浏览器的网络进程中有多个网络线程，当文档下载完成后，网络线程创建一个渲染任务，进入事件循环队列。</p>
<h2 id="parse" tabindex="-1"><a class="header-anchor" href="#parse"><span>Parse</span></a></h2>
<h3 id="dom" tabindex="-1"><a class="header-anchor" href="#dom"><span>DOM</span></a></h3>
<h3 id="cssom" tabindex="-1"><a class="header-anchor" href="#cssom"><span>CSSOM</span></a></h3>
<ul>
<li>style 内部样式表</li>
<li>link 外部样式表</li>
<li>inline 内联样式表</li>
<li>浏览器默认样式表</li>
</ul>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code>document<span class="token punctuation">.</span>styleSheets <span class="token comment">// StyleSheetList</span>
</code></pre></div><p>StyleSheetList 是根节点，下面是多个 CSSStyleSheet 对象</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code>document<span class="token punctuation">.</span>styleSheets<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">addRule</span><span class="token punctuation">(</span><span class="token string">'div'</span><span class="token punctuation">,</span> <span class="token string">'border: 1px solid #000'</span><span class="token punctuation">)</span>
</code></pre></div><h4 id="css预解析器线程" tabindex="-1"><a class="header-anchor" href="#css预解析器线程"><span>css预解析器线程</span></a></h4>
<h2 id="样式计算" tabindex="-1"><a class="header-anchor" href="#样式计算"><span>样式计算</span></a></h2>
<p>遍历 dom 树，计算每个节点的 computed style</p>
<h3 id="属性计算-comuted-style" tabindex="-1"><a class="header-anchor" href="#属性计算-comuted-style"><span>属性计算 Comuted Style</span></a></h3>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token function">getComputedStyle</span><span class="token punctuation">(</span>document<span class="token punctuation">.</span>body<span class="token punctuation">)</span> <span class="token comment">// 获取 dom 元素的 computed style</span>
</code></pre></div><h2 id="layout" tabindex="-1"><a class="header-anchor" href="#layout"><span>Layout</span></a></h2>
<p>根据 dom 树的每个节点的样式，计算节点的尺寸和位置。</p>
<p>计算一个节点的位置时，需要根据其包含块计算，这是视觉格式化模型的知识。</p>
<p>layout 树和视觉格式化模型息息相关。</p>
<p>现在不再用行级元素块级元素，而是通过 inline box block box 的说法。</p>
<p>html 只负责语义化，各种 box 是由 css 定义的。</p>
<p>layout 树中的对象不是一个 dom 对象，通常无法用 JS 操作，比如一个浮动 box 在 C++ 代码中是一个 FloatObject。</p>
<p>当然，浏览器会暴露一小部分 layout 信息个 JS。比如</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code>document<span class="token punctuation">.</span>body<span class="token punctuation">.</span>clientHeight <span class="token comment">// 布局信息</span>
</code></pre></div><h3 id="dom-树和-layout-树不是一一对应的" tabindex="-1"><a class="header-anchor" href="#dom-树和-layout-树不是一一对应的"><span>dom 树和 layout 树不是一一对应的</span></a></h3>
<p>比如 display none 的节点不存在于 layout 树中。比如 head 元素。</p>
<p>伪元素不存在于 dom 树，但存在于 layout 树。</p>
<h2 id="layer" tabindex="-1"><a class="header-anchor" href="#layer"><span>Layer</span></a></h2>
<p>分层是为了提高重新渲染的效率。</p>
<p>分层类似于贴纸，当其中一张贴纸需要更新，则只重新渲染那一张贴纸即可，不影响其他层。</p>
<p>由于分层需要占用较多内存，因此浏览器会对层数做取舍，兼顾内存和效率。</p>
<p>跟堆叠上下文相关的 css 属性，比如 z-index、opacity、transform、will-change 会影响浏览器的分层结果。其中影响较大的是 will-change 属性。</p>
<div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">.div</span> <span class="token punctuation">{</span>
  <span class="token property">will-change</span><span class="token punctuation">:</span> transform<span class="token punctuation">;</span> <span class="token comment">/* transform 属性会经常改变 */</span>
<span class="token punctuation">}</span>
</code></pre></div><p>以上属性提示浏览器，transform 属性会经常改变，浏览器会决定是否将这个 div 单独作为一层。</p>
<h2 id="paint" tabindex="-1"><a class="header-anchor" href="#paint"><span>Paint</span></a></h2>
<p>所谓绘制，其实是为每一层生成一系列绘制指令。</p>
<p>绘制指令类似于 canvas 中的操作。事实上，canvas 就是浏览器将绘制功能暴露给开发者而来，也就是说，canvas 的操作就是直接操作绘制过程。</p>
<p>以上就是渲染主线程的操作，目前屏幕上仍未得到像素点，只有一系列绘制指令，这些指令会交给合成线程处理。</p>
<h2 id="tiling" tabindex="-1"><a class="header-anchor" href="#tiling"><span>Tiling</span></a></h2>
<p>分块就是将每一层分成多个小区域。</p>
<p>为什么要分块？是为了提高后序光栅化和画的效率，显卡擅长并行绘制。</p>
<p>分块在合成线程中执行，合成线程是渲染进程下的一个线程，和渲染主线程同级。</p>
<p>合成线程会在线程池中获取多个分块器（线程），它们同时工作，提升分块效率。</p>
<p>关于线程池，就是里面有多个创建好的线程，使用者可以申请其中空闲的线程使用，如果没有空闲线程，则排队等待。这是为了减少频繁创建回收线程的开销，同时控制线程的数量，避免创建太多线程。总之，线程池就是一个线程管理者。线程池的思想可以用 tooltip 来理解。</p>
<p><img src="/Users/yams/Desktop/chrome-render-thread.png" alt=""></p>
<h2 id="raster" tabindex="-1"><a class="header-anchor" href="#raster"><span>Raster</span></a></h2>
<p>光栅化就是将每个 tile 变成位图，且为了提高体验，浏览器会优先处理靠近视口的 tile。</p>
<p>光栅化是在浏览器的GPU进程中执行的，GPU 进程内也会开启多个线程执行。</p>
<h2 id="draw" tabindex="-1"><a class="header-anchor" href="#draw"><span>Draw</span></a></h2>
<p>光栅化完成后，合成线程计算每个位图在屏幕上的位置（quad 信息），（同时进行 css 的 transform 转换）。这些信息会交给 GPU 进程，然后由 GPU 进程进行系统调用，从而交给显卡，最终呈现在屏幕上。</p>
<p>之所以要转交给 GPU 进程，是因为合成线程所在的渲染进程是在沙盒中运行的（安全策略），无法进行系统调用。</p>
<div class="language-text" data-ext="text" data-title="text"><pre v-pre class="language-text"><code>网络进程
渲染进程
  渲染主线程
  合成线程
GPU 进程
</code></pre></div><h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考"><span>参考</span></a></h2>
<p><a href="https://cabulous.medium.com/how-does-browser-work-in-2019-part-iii-rendering-phase-i-850c8935958f" target="_blank" rel="noopener noreferrer">How does browser work step by step [latest] — rendering phase (part 3)<ExternalLinkIcon/></a></p>
</div></template>


