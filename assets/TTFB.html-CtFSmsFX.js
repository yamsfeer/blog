import{_ as o}from"./plugin-vue_export-helper-DlAUqK2U.js";import{r as p,o as r,c,b as t,d as n,e as s,a as e}from"./app-BPFsuHku.js";const i={},l=e('<h1 id="ttfb-第一字节时间" tabindex="-1"><a class="header-anchor" href="#ttfb-第一字节时间"><span>TTFB 第一字节时间</span></a></h1><h2 id="什么是-ttfb" tabindex="-1"><a class="header-anchor" href="#什么是-ttfb"><span>什么是 TTFB</span></a></h2><p>TTFB ( Time to First Byte ) 第一字节时间，从资源请求开始到第一个字节到达的时间。</p><p><img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/timestamp-diagram.svg" alt=""></p><p>上图中 startTime 到 responseStart 的时间就是 TTFB。</p><p>具体来说，TTFB 包含以下时间损耗：</p><ul><li>Redirect 重定向</li><li>Service worker 启动</li><li>DNS 查询</li><li>建立连接</li><li>请求直到响应的第一个字节到达</li></ul><h2 id="ttfb-阈值" tabindex="-1"><a class="header-anchor" href="#ttfb-阈值"><span>TTFB 阈值</span></a></h2><img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/eNXaxPi9NdUVSTDRJFkV.svg" alt="良好的 TTFB 应该小于 0.8 秒" width="400" class="img-mid"><h2 id="如何测量-ttfb" tabindex="-1"><a class="header-anchor" href="#如何测量-ttfb"><span>如何测量 TTFB</span></a></h2>',10),u={href:"https://w3c.github.io/navigation-timing/",target:"_blank",rel:"noopener noreferrer"},d=e(`<div class="language-javascript" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">new</span> <span class="token class-name">PerformanceObserver</span><span class="token punctuation">(</span><span class="token parameter">list</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token punctuation">[</span>nav<span class="token punctuation">]</span> <span class="token operator">=</span> list<span class="token punctuation">.</span><span class="token function">getEntriesByType</span><span class="token punctuation">(</span><span class="token string">&#39;navigation&#39;</span><span class="token punctuation">)</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;TTFB&#39;</span><span class="token punctuation">,</span> nav<span class="token punctuation">.</span>responseStart<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">observe</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;navigation&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">buffered</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><h3 id="测量资源请求" tabindex="-1"><a class="header-anchor" href="#测量资源请求"><span>测量资源请求</span></a></h3>`,2),k={href:"https://w3c.github.io/resource-timing/",target:"_blank",rel:"noopener noreferrer"},T=e(`<div class="language-javascript" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">new</span> <span class="token class-name">PerformanceObserver</span><span class="token punctuation">(</span><span class="token parameter">list</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> entry <span class="token keyword">of</span> list<span class="token punctuation">.</span><span class="token function">getEntries</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>entry<span class="token punctuation">.</span>responseStart <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;TTFB&#39;</span><span class="token punctuation">,</span> entry<span class="token punctuation">.</span>responseStart<span class="token punctuation">,</span> entry<span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">observe</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;resource&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">buffered</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>资源的 responseStart 为 0，原因可能有：</p><ul><li>资源是从缓存中获取的</li><li>跨域资源未设置 <code>Timing-Allow-Origin</code> 响应头，跨域请求的 TTFB 就无法测量</li></ul><h2 id="如何优化-ttfb" tabindex="-1"><a class="header-anchor" href="#如何优化-ttfb"><span>如何优化 TTFB</span></a></h2><p>TTFB 高很可能是网络或服务器原因造成的。</p><p>优化 TTFB 方法：</p>`,6),h={href:"https://developer.chrome.com/docs/lighthouse/performance/redirects/",target:"_blank",rel:"noopener noreferrer"},m={href:"https://developer.chrome.com/docs/lighthouse/performance/uses-rel-preconnect/",target:"_blank",rel:"noopener noreferrer"},g={href:"https://hstspreload.org/",target:"_blank",rel:"noopener noreferrer"},f={href:"https://developer.chrome.com/docs/lighthouse/best-practices/uses-http2/",target:"_blank",rel:"noopener noreferrer"},b={href:"https://en.wikipedia.org/wiki/HTTP/3",target:"_blank",rel:"noopener noreferrer"},B={href:"https://web.dev/predictive-prefetching/",target:"_blank",rel:"noopener noreferrer"},_={href:"https://developer.mozilla.org/docs/Web/CSS/@media/prefers-reduced-data",target:"_blank",rel:"noopener noreferrer"},y=t("li",null,"使用服务器端生成 ( SSG ) 来代替 SSR 的标记。",-1);function F(v,E){const a=p("ExternalLinkIcon");return r(),c("div",null,[l,t("p",null,[n("TTFB 基于 "),t("a",u,[n("Navigation Timing API"),s(a)]),n("。")]),d,t("p",null,[n("实际上，TTFB 不仅适用于导航请求，而是适用于所有请求，比如图片资源。要想测量资源请求的 TTFB，需要使用 "),t("a",k,[n("Resource Timing API"),s(a)]),n("。")]),T,t("ul",null,[t("li",null,[t("a",h,[n("避免多次重定向"),s(a)]),n(".")]),t("li",null,[n("提前向跨域资源源"),t("a",m,[n("建立连接 Preconnect"),s(a)]),n(" 。")]),t("li",null,[n("将源提交给"),t("a",g,[n("HSTS预加载列表"),s(a)]),n("，以消除 HTTP-HTTPS 重定向延迟。")]),t("li",null,[n("使用 "),t("a",f,[n("HTTP2"),s(a)]),n(" 或 "),t("a",b,[n("HTTP3"),s(a)])]),t("li",null,[n("考虑"),t("a",B,[n("预测性预取"),s(a)]),n("，为没有指定"),t("a",_,[n("减少数据使用偏好"),s(a)]),n("的用户提供快速页面导航。")]),y])])}const x=o(i,[["render",F],["__file","TTFB.html.vue"]]),N=JSON.parse('{"path":"/%E5%B7%A5%E7%A8%8B%E6%9E%B6%E6%9E%84/%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96/TTFB.html","title":"TTFB 第一字节时间","lang":"zh-CN","frontmatter":{"description":"TTFB 第一字节时间 什么是 TTFB TTFB ( Time to First Byte ) 第一字节时间，从资源请求开始到第一个字节到达的时间。 上图中 startTime 到 responseStart 的时间就是 TTFB。 具体来说，TTFB 包含以下时间损耗： Redirect 重定向 Service worker 启动 DNS 查询 建...","head":[["meta",{"property":"og:url","content":"https://yamsfeer.github.io/notes-fe/%E5%B7%A5%E7%A8%8B%E6%9E%B6%E6%9E%84/%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96/TTFB.html"}],["meta",{"property":"og:site_name","content":"yamsfeer"}],["meta",{"property":"og:title","content":"TTFB 第一字节时间"}],["meta",{"property":"og:description","content":"TTFB 第一字节时间 什么是 TTFB TTFB ( Time to First Byte ) 第一字节时间，从资源请求开始到第一个字节到达的时间。 上图中 startTime 到 responseStart 的时间就是 TTFB。 具体来说，TTFB 包含以下时间损耗： Redirect 重定向 Service worker 启动 DNS 查询 建..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://raw.githubusercontent.com/yamsfeer/pic-bed/master/timestamp-diagram.svg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-04-12T16:21:32.000Z"}],["meta",{"property":"article:modified_time","content":"2024-04-12T16:21:32.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"TTFB 第一字节时间\\",\\"image\\":[\\"https://raw.githubusercontent.com/yamsfeer/pic-bed/master/timestamp-diagram.svg\\"],\\"dateModified\\":\\"2024-04-12T16:21:32.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"什么是 TTFB","slug":"什么是-ttfb","link":"#什么是-ttfb","children":[]},{"level":2,"title":"TTFB 阈值","slug":"ttfb-阈值","link":"#ttfb-阈值","children":[]},{"level":2,"title":"如何测量 TTFB","slug":"如何测量-ttfb","link":"#如何测量-ttfb","children":[{"level":3,"title":"测量资源请求","slug":"测量资源请求","link":"#测量资源请求","children":[]}]},{"level":2,"title":"如何优化 TTFB","slug":"如何优化-ttfb","link":"#如何优化-ttfb","children":[]}],"git":{"createdTime":1712938892000,"updatedTime":1712938892000,"contributors":[{"name":"yamsfeer","email":"feer.yams@gmail.com","commits":1}]},"readingTime":{"minutes":1.38,"words":415},"filePathRelative":"工程架构/性能优化/TTFB.md","localizedDate":"2024年4月12日","autoDesc":true}');export{x as comp,N as data};
