<template><div><h1 id="优化-inp" tabindex="-1"><a class="header-anchor" href="#优化-inp"><span>优化 INP</span></a></h1>
<p>在优化 INP 之前，我们需要收集导致 INP 值高的交互的详细信息。</p>
<p>真实用户监测 ( Real User Monitoring, RUM ) 数据不仅提供 INP 值，还提供上下文数据。比如 INP 是由哪些交互引起的、交互是在页面加载期间还是之后发生、交互类型是 click、keydown 还是 tap 等。</p>
<h2 id="优化" tabindex="-1"><a class="header-anchor" href="#优化"><span>优化</span></a></h2>
<p><img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/Ng0j5yaGYZX9Bm3VQ70c.svg" alt=""></p>
<p>交互延迟由三部分组成：</p>
<ul>
<li>输入延迟 ( input delay )，从交互发生，到事件回调开始运行。</li>
<li>处理时间 ( processing time )，回调运行完成所需时间。</li>
<li>呈现延迟 ( presentation delay )，浏览器呈现交互视觉结果的下一帧所需时间。</li>
</ul>
<p>优化 INP 就是从这三部分入手。</p>
<h3 id="减少输入延迟" tabindex="-1"><a class="header-anchor" href="#减少输入延迟"><span>减少输入延迟</span></a></h3>
<ul>
<li>定时器</li>
<li>长任务</li>
<li>交互重叠</li>
</ul>
<p>主线程上 JavaScript 加载、解析和编译、fetch、定时器等都会造成输入延迟。</p>
<p>因此，减少长任务可减少输入延迟，让主线程尽快开始处理事件及回调。</p>
<img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/PRO5n8DxflhLaM5PdoZv.png" style="zoom:50%;" />
<h3 id="优化事件回调" tabindex="-1"><a class="header-anchor" href="#优化事件回调"><span>优化事件回调</span></a></h3>
<p>将回调分解成单独的任务，防止长任务长期阻塞主线程，从而让主线程更快处理交互。setTimeout 就是分解任务的一种方法。</p>
<p>一种更高级做法是，对事件回调中的代码进行结构化处理，将运行的内容限制在仅为下一帧应用视觉更新所需的逻辑，其他工作都推迟到后续任务中进行。</p>
<p>例如，一个富文本编辑器，用户输入字符后需要做以下四件事：</p>
<ul>
<li>在文本框显示用户输入的内容，并应用格式</li>
<li>更新当前字数</li>
<li>检查拼写错误</li>
<li>保存更改</li>
</ul>
<p>这 4 项中只有第一项需要在下一帧显示之前完成。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code>textBox<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'input'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">inputEvent</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token function">updateTextBox</span><span class="token punctuation">(</span>inputEvent<span class="token punctuation">)</span> <span class="token comment">// 立即更新 UI</span>

  <span class="token comment">// 用 setTimeout 推迟其他工作到至少下一帧</span>
  <span class="token function">requestAnimationFrame</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token function">updateWordCount</span><span class="token punctuation">(</span>text<span class="token punctuation">)</span>
      <span class="token function">checkSpelling</span><span class="token punctuation">(</span>text<span class="token punctuation">)</span>
      <span class="token function">saveChanges</span><span class="token punctuation">(</span>text<span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>下图展示了将非关键更新推迟如何减少交互延迟。</p>
<p><img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/Me4oU1cqMPOqEaEg2XAP.svg" alt=""></p>
<p>requestAnimationFrame 内使用 setTimeout 可确保非关键代码不会阻塞下一帧。</p>
<h4 id="避免布局混乱" tabindex="-1"><a class="header-anchor" href="#避免布局混乱"><span>避免布局混乱</span></a></h4>
<p>如果你在 JavaScript 中更新样式，然后立即请求这些样式的值，这会导致浏览器被迫马上进行一次 layout 以确保返回最新的样式，这就是布局混乱 ( layout thrashing )，也称强制同步布局。</p>
<p><img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/06CXJcBsqO6kdj1Bjml7.png" alt=""></p>
<h3 id="减少呈现延迟" tabindex="-1"><a class="header-anchor" href="#减少呈现延迟"><span>减少呈现延迟</span></a></h3>
<p>呈现延迟主要与渲染相关，提高渲染效率有以下几个方法：</p>
<ul>
<li>
<p>减小 DOM 树大小：扁平化 DOM 或动态添加 DOM</p>
</li>
<li>
<p>使用 content-visibility 减少渲染屏幕外的元素</p>
</li>
<li>
<p>少用 JavaScript 创建大量 HTML</p>
<p>服务器以流的形式发送 HTML 给浏览器，流意味着 HTML 是分块到达的。浏览器会对数据流进行增量解析，并逐位呈现，这是浏览器的性能优化。</p>
<p>SPA 是在客户端使用 JavaScript 创建 HTML，这本身就需要成本，而且浏览器无法做到增量解析等性能优化。因此，SPA 的客户端渲染需要权衡利弊。</p>
</li>
</ul>
<h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h2>
<p>优化 INP 主要从构成交互延迟的三个方面入手</p>
<ul>
<li>输入延迟 ( input delay )</li>
<li>处理时间 ( processing time )</li>
<li>呈现延迟 ( presentation delay )</li>
</ul>
<p>前两个部分的优化手段都是减少长任务的执行，具体来说就是将长任务分割成多个小任务。</p>
<h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考"><span>参考</span></a></h2>
<p><a href="https://web.dev/optimize-inp/" target="_blank" rel="noopener noreferrer">Optimize Interaction to Next Paint - web.dev<ExternalLinkIcon/></a></p>
</div></template>


