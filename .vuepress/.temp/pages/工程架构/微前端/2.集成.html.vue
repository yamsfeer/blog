<template><div><h1 id="应用集成" tabindex="-1"><a class="header-anchor" href="#应用集成"><span>应用集成</span></a></h1>
<p>子应用路由、注册、挂载、卸载</p>
<h2 id="iframe" tabindex="-1"><a class="header-anchor" href="#iframe"><span>iframe</span></a></h2>
<h3 id="集成" tabindex="-1"><a class="header-anchor" href="#集成"><span>集成</span></a></h3>
<p>使用 iframe 集成微应用的代码如下。</p>
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>iframe</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>iframe<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>iframe</span><span class="token punctuation">></span></span>
</code></pre></div><div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> routes <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token string-property property">'/app1'</span><span class="token operator">:</span> <span class="token string">'https://app1.com/'</span><span class="token punctuation">,</span>
  <span class="token string-property property">'/app2'</span><span class="token operator">:</span> <span class="token string">'https://app2.com/'</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> iframe <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'iframe'</span><span class="token punctuation">)</span>
iframe<span class="token punctuation">.</span>src <span class="token operator">=</span> routes<span class="token punctuation">[</span>window<span class="token punctuation">.</span>location<span class="token punctuation">.</span>pathname<span class="token punctuation">]</span>
</code></pre></div><h3 id="隔离" tabindex="-1"><a class="header-anchor" href="#隔离"><span>隔离</span></a></h3>
<p>iframe 是浏览器原生的方案，可以轻松实现 js 隔离和样式隔离。但这种隔离太强，使得应用间上下文无法被共享。</p>
<ol>
<li>url 不同步。浏览器刷新时，iframe url 状态丢失、后退前进按钮无法使用。</li>
<li>UI 不同步，DOM 结构不共享。想象一下屏幕右下角 1/4 的 iframe 里来一个带遮罩层的弹框，同时我们要求这个弹框要浏览器居中显示，还要浏览器 resize 时自动居中..</li>
<li>全局上下文完全隔离，内存变量不共享。iframe 内外系统的通信、数据同步等需求，主应用的 cookie 要透传到根域名都不同的子应用中实现免登效果。</li>
<li>慢。每次子应用进入都是一次浏览器上下文重建、资源重新加载的过程。</li>
</ol>
<h3 id="通信" tabindex="-1"><a class="header-anchor" href="#通信"><span>通信</span></a></h3>
<p>当父页面和 iframe 页面同源时，可以用直接通信。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 访问子 iframe</span>
<span class="token keyword">const</span> iframe <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'iFrame'</span><span class="token punctuation">)</span><span class="token punctuation">.</span>contentWindow
<span class="token keyword">const</span> iframeDoc <span class="token operator">=</span> iframe<span class="token punctuation">.</span>document

<span class="token comment">// iframe 访问父页面</span>
<span class="token keyword">const</span> parent <span class="token operator">=</span> window<span class="token punctuation">.</span>parent
</code></pre></div><p>如果父页面和 iframe 不同源，可以通过 postmessage 通信。</p>
<p>在 iframe 页面中发送消息：</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code>window<span class="token punctuation">.</span><span class="token function">postMessage</span><span class="token punctuation">(</span><span class="token string">'Hello from iframe'</span><span class="token punctuation">,</span> <span class="token string">'https://parent-domain.com'</span><span class="token punctuation">)</span>
</code></pre></div><p>在父页面中监听消息：</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code>window<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">"message"</span><span class="token punctuation">,</span> <span class="token parameter">event</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>event<span class="token punctuation">.</span>origin <span class="token operator">===</span> <span class="token string">"https://iframe-domain.com"</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"Received message: "</span> <span class="token operator">+</span> event<span class="token punctuation">.</span>data<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><h3 id="共享" tabindex="-1"><a class="header-anchor" href="#共享"><span>共享</span></a></h3>
<h3 id="优缺点" tabindex="-1"><a class="header-anchor" href="#优缺点"><span>优缺点</span></a></h3>
<p>用 iframe 实现微前端的优点是：集成应用简单，隔离性好，有通信渠道，技术栈无关。可以说，iframe 天然适合微前端。</p>
<p>缺点是：性能较差，且隔离性太强，应用间上下文无法被共享。</p>
<h2 id="直接挂载" tabindex="-1"><a class="header-anchor" href="#直接挂载"><span>直接挂载</span></a></h2>
<h2 id="shadow-dom" tabindex="-1"><a class="header-anchor" href="#shadow-dom"><span>shadow dom</span></a></h2>
<h2 id="web-component" tabindex="-1"><a class="header-anchor" href="#web-component"><span>web component</span></a></h2>
<p>用 web component 实现微前端应用的挂载大概如下：</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> apps <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token string-property property">'/app1'</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">'app1.js'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token string-property property">'/app2'</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">'app2.js'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token keyword">await</span> apps<span class="token punctuation">[</span>window<span class="token punctuation">.</span>location<span class="token punctuation">.</span>pathname<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// web component class</span>

<span class="token keyword">const</span> container <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'micro-app-container'</span><span class="token punctuation">)</span>
container<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>app<span class="token punctuation">)</span>
</code></pre></div><p>事实上，基于 web component 和前面基于路由的挂载并无太大区别。</p>
<h2 id="module-federation" tabindex="-1"><a class="header-anchor" href="#module-federation"><span>module federation</span></a></h2>
</div></template>


