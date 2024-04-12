<template><div><h1 id="微前端" tabindex="-1"><a class="header-anchor" href="#微前端"><span>微前端</span></a></h1>
<h2 id="为什么要用微前端" tabindex="-1"><a class="header-anchor" href="#为什么要用微前端"><span>为什么要用微前端</span></a></h2>
<p>微前端是为了解决前端复杂性的问题而提出来的，简单来说，就是将多个独立交付的前端应用组合成一个整体。</p>
<p><img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/deployment.png" alt=""></p>
<p>当遇到以下几种场景时，可以考虑使用微前端。</p>
<ul>
<li>需要拆分一个巨石项目</li>
<li>需要将多个独立应用合并，其中包含老旧项目</li>
<li>需要多团队协作开发，团队间存在多个技术栈</li>
</ul>
<p>微前端有以下几个优点：</p>
<ul>
<li>多团队独立开发，技术栈无关</li>
<li>单个项目粒度小，易于管理维护</li>
<li>应用间解耦，灵活，可以实现增量开发</li>
</ul>
<h3 id="技术栈无关" tabindex="-1"><a class="header-anchor" href="#技术栈无关"><span>技术栈无关</span></a></h3>
<p>在<a href="https://www.yuque.com/kuitos/gky7yw/rhduwc" target="_blank" rel="noopener noreferrer">这篇文章<ExternalLinkIcon/></a>中，微前端框架 qiankun 的作者介绍了为什么技术栈无关才是微前端的核心价值。</p>
<p>总的来说，无论是拆分巨石项目，还是在老旧项目上添加功能，微前端解决的是一个工程问题。</p>
<blockquote>
<p><strong>微前端首先解决的，是如何解构巨石应用</strong>，从而解决巨石应用随着技术更迭、产品升级、人员流动带来的工程上的问题。</p>
<p>解构之后还需要再重组，重组的过程中我们就会碰到各种隔离性、依赖去重、通信、应用编排等问题。</p>
<p>在解决了这些问题之后，才是产品的自由组合、widget 输出等能力。</p>
</blockquote>
<h2 id="如何设计" tabindex="-1"><a class="header-anchor" href="#如何设计"><span>如何设计</span></a></h2>
<p>通常微前端中会有一个主应用 ( 基座 ) 和多个子应用。应用之间的关系如下：</p>
<ul>
<li>应用集成：如何注册、挂载、卸载子应用</li>
<li>应用隔离：应用间需要互相隔离，通常包含 JS 和 CSS 隔离</li>
<li>应用通信：主应用和子应用、子应用之间需要一套通信机制</li>
<li>模块共享：应用间共有的模块，比如第三方模块或共用的业务组件</li>
</ul>
<h2 id="实现方案" tabindex="-1"><a class="header-anchor" href="#实现方案"><span>实现方案</span></a></h2>
<p>以上 4 点中，多个应用如何集成到一起是最重要的，决定了这一点才能考虑其余 3 点如何解决。</p>
<h3 id="服务端模板组合" tabindex="-1"><a class="header-anchor" href="#服务端模板组合"><span>服务端模板组合</span></a></h3>
<p>在服务端渲染的场景中，多个应用的模板可以在服务端组合完毕后一起发送给浏览器。</p>
<p>想要更高独立性的话，可以为每个微前端单独安排一个服务器负责呈现和服务，再安排一个服务器专门向其他服务器发出请求。</p>
<p>这种方式有个缺点：在切换应用时会触发浏览器刷新，影响体验。它适用于服务端渲染的多页应用。</p>
<h3 id="构建时" tabindex="-1"><a class="header-anchor" href="#构建时"><span>构建时</span></a></h3>
<p>将每个微前端应用单独构建成一个 npm 包，然后在容器应用中依赖这个包。</p>
<div class="language-json" data-ext="json" data-title="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"@micro-app/container"</span><span class="token punctuation">,</span>
  <span class="token property">"dependencies"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"@micro-app/app1"</span><span class="token operator">:</span> <span class="token string">"^1.0.0"</span><span class="token punctuation">,</span>
    <span class="token property">"@micro-app/app2"</span><span class="token operator">:</span> <span class="token string">"^1.1.1"</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>这种方法有个明显的缺点，每次修改代码，我们都需要重新编译和发布每一个子应用。不建议使用这种方法。</p>
<h3 id="运行时" tabindex="-1"><a class="header-anchor" href="#运行时"><span>运行时</span></a></h3>
<p>与前面两种方式相比，微前端更适合在运行时加载子应用，以下是运行时加载的各种微前端方案。</p>
<ul>
<li>single-spa</li>
<li>qiankun</li>
<li>Micro-app</li>
<li>webpack module federation</li>
<li>iframe</li>
</ul>
<p>后面会比较详细地介绍这些方案。</p>
<h2 id="微前端的工程化" tabindex="-1"><a class="header-anchor" href="#微前端的工程化"><span>微前端的工程化</span></a></h2>
<h2 id="其他问题" tabindex="-1"><a class="header-anchor" href="#其他问题"><span>其他问题</span></a></h2>
<h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考"><span>参考</span></a></h2>
<p><a href="https://martinfowler.com/articles/micro-frontends.html" target="_blank" rel="noopener noreferrer">Micro Frontends -<ExternalLinkIcon/></a> martinfowler.com</p>
<p><a href="https://juejin.cn/post/7210747150815936569" target="_blank" rel="noopener noreferrer">在造一个微前端轮子之前，你需要知道这些<ExternalLinkIcon/></a> - juejin.cn</p>
</div></template>


