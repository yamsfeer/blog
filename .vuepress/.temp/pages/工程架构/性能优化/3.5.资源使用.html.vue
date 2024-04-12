<template><div><h1 id="资源使用" tabindex="-1"><a class="header-anchor" href="#资源使用"><span>资源使用</span></a></h1>
<p>资源使用这部分的性能优化，都是围绕<strong>浏览器主线程</strong>展开的。</p>
<p>当我们把各种资源如 html、css、js 文本、图片等下载到本地，浏览器需要做大量工作才能得到最终的网页。这其中浏览器主线程负责了大部分的重要工作，比如解析 html、构建 dom 树，执行 JS 代码等等。</p>
<p>我们可以从渲染和 JS 执行这几部分来分析。</p>
<h2 id="渲染" tabindex="-1"><a class="header-anchor" href="#渲染"><span>渲染</span></a></h2>
<p>不渲染大量 dom</p>
<p>少渲染屏幕外元素</p>
<h2 id="js-执行" tabindex="-1"><a class="header-anchor" href="#js-执行"><span>JS 执行</span></a></h2>
<p>长任务，让位主线程</p>
<p>web worker</p>
</div></template>


