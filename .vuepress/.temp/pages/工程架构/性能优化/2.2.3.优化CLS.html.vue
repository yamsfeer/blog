<template><div><h1 id="优化-cls" tabindex="-1"><a class="header-anchor" href="#优化-cls"><span>优化 CLS</span></a></h1>
<p>CLS 是衡量页面布局偏移的，布局偏移通常由以下情况产生：</p>
<ul>
<li>无尺寸的图像</li>
<li>无尺寸的广告、嵌入内容和 iframe</li>
<li>动态添加 DOM</li>
<li>导致 FOIT / FOUT 的网络字体</li>
<li>属性动画</li>
</ul>
<p>减少布局偏移就可优化 CLS。</p>
<h2 id="无尺寸图像" tabindex="-1"><a class="header-anchor" href="#无尺寸图像"><span>无尺寸图像</span></a></h2>
<p>为图片提供 width / height 属性，或者设置 aspect-ratio，使得浏览器在获取图像前，在页面上预先分配足够的空间，从而最大限度减少重排。</p>
<h2 id="广告、嵌入内容和-iframe" tabindex="-1"><a class="header-anchor" href="#广告、嵌入内容和-iframe"><span>广告、嵌入内容和 iframe</span></a></h2>
<p>要想这些内容不产生布局偏移，最好的办法是设置占位符，即<strong>预留足够空间</strong>。</p>
<h2 id="动态添加-dom" tabindex="-1"><a class="header-anchor" href="#动态添加-dom"><span>动态添加 DOM</span></a></h2>
<p>在某些情况下，动态添加 DOM 节点是用户体验的一部分。例如，加载更多项目到列表或更新列表。在这些情况下，有几种方法可以避免意外布局偏移。</p>
<ul>
<li>
<p>在固定宽高的容器中更新内容。</p>
</li>
<li>
<p>让用户主动加载新内容，这样他们就不会对偏移感到惊讶。</p>
<p>在用户输入后 500ms 内发生的布局偏移不计入 CLS。</p>
</li>
<li>
<p>无缝加载屏幕外的内容，并向用户叠加一个通知，说明内容已经可用</p>
<p>例如，显示一个 &quot;向上滚动 &quot;按钮。</p>
</li>
</ul>
<h2 id="导致-foit-fout-的网络字体" tabindex="-1"><a class="header-anchor" href="#导致-foit-fout-的网络字体"><span>导致 FOIT / FOUT 的网络字体</span></a></h2>
<p>下载和渲染网络字体可能通过两种方式导致布局偏移：</p>
<ul>
<li>后备字体替换为新字体 ( 无样式文本闪烁, FOUT )</li>
<li>新字体完成渲染前显示&quot;不可见&quot;文本 ( 不可见文本闪烁, FOIT )</li>
</ul>
<p>以下方法可以减少这种情况：</p>
<ul>
<li>
<p><code v-pre>font-display</code> 能够修改自定义字体的渲染行为。</p>
<p>可选项有 <code v-pre>auto</code>、<code v-pre>swap</code>、<code v-pre>block</code>、<code v-pre>fallback</code> 和 <code v-pre>optional</code>，只有 <code v-pre>optional</code> 不会导致重排。</p>
</li>
<li>
<p><a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/webfont-optimization#the_font_loading_api" target="_blank" rel="noopener noreferrer">字体加载 API<ExternalLinkIcon/></a> 可以减少获取字体的时间。</p>
</li>
<li>
<p>关键网络字体预加载 <code v-pre>&lt;link rel=preload&gt;</code></p>
</li>
<li>
<p>结合使用 <code v-pre>&lt;link rel=preload&gt;</code> 和 <code v-pre>font-display: optional</code></p>
</li>
</ul>
<p>参考：<a href="https://web.dev/preload-optional-fonts/" target="_blank" rel="noopener noreferrer">通过预加载可选字体来防止布局偏移和不可见文本闪烁 (FOIT)<ExternalLinkIcon/></a>。</p>
<h2 id="动画" tabindex="-1"><a class="header-anchor" href="#动画"><span>动画</span></a></h2>
<p>使用 transform 动画，而不是触发布局偏移的属性动画。</p>
</div></template>


