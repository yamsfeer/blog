import{_ as t}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as a,c as e,a as n}from"./app-BPFsuHku.js";const s={},o=n(`<h1 id="prpl-模式" tabindex="-1"><a class="header-anchor" href="#prpl-模式"><span>PRPL 模式</span></a></h1><p>PRPL 是四个英文单词的首字母缩写，它描述了一种可以提高网页加载速度和交互性的模式。</p><ul><li>Push / Preload 服务器推送或预加载关键资源。</li><li>Render 尽快渲染初始页面。</li><li>Pre-cache 预缓存剩余资产。</li><li>Lazy load 延迟加载其他页面和非关键资产。</li></ul><p>通过link 标签预加载关键资源。</p><div class="language-html" data-ext="html" data-title="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>preload<span class="token punctuation">&quot;</span></span> <span class="token attr-name">as</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>style<span class="token punctuation">&quot;</span></span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>css/style.css<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
</code></pre></div><p>内联关键 JavaScript 并使用 async 推迟其余部分，内联首屏的关键 CSS。这样可以减少服务器请求往返，提高性能。但内联代码更难维护，并且无法被浏览器单独缓存。因此，首屏渲染的优化方案需要权衡利弊再决定。</p><p>service worker cache 缓存的资源不用从服务器获取。它使得应用不仅可以在离线时使用，还可以在重复访问时加快页面的加载速度。</p><p>对 JavaScript 包进行拆分并延迟加载代码块。</p>`,8),p=[o];function c(l,r){return a(),e("div",null,p)}const m=t(s,[["render",c],["__file","3.7.PRPL模式.html.vue"]]),d=JSON.parse('{"path":"/%E5%B7%A5%E7%A8%8B%E6%9E%B6%E6%9E%84/%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96/3.7.PRPL%E6%A8%A1%E5%BC%8F.html","title":"PRPL 模式","lang":"zh-CN","frontmatter":{"description":"PRPL 模式 PRPL 是四个英文单词的首字母缩写，它描述了一种可以提高网页加载速度和交互性的模式。 Push / Preload 服务器推送或预加载关键资源。 Render 尽快渲染初始页面。 Pre-cache 预缓存剩余资产。 Lazy load 延迟加载其他页面和非关键资产。 通过link 标签预加载关键资源。 内联关键 JavaScript...","head":[["meta",{"property":"og:url","content":"https://yamsfeer.github.io/notes-fe/%E5%B7%A5%E7%A8%8B%E6%9E%B6%E6%9E%84/%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96/3.7.PRPL%E6%A8%A1%E5%BC%8F.html"}],["meta",{"property":"og:site_name","content":"yamsfeer"}],["meta",{"property":"og:title","content":"PRPL 模式"}],["meta",{"property":"og:description","content":"PRPL 模式 PRPL 是四个英文单词的首字母缩写，它描述了一种可以提高网页加载速度和交互性的模式。 Push / Preload 服务器推送或预加载关键资源。 Render 尽快渲染初始页面。 Pre-cache 预缓存剩余资产。 Lazy load 延迟加载其他页面和非关键资产。 通过link 标签预加载关键资源。 内联关键 JavaScript..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-04-12T16:21:32.000Z"}],["meta",{"property":"article:modified_time","content":"2024-04-12T16:21:32.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"PRPL 模式\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-04-12T16:21:32.000Z\\",\\"author\\":[]}"]]},"headers":[],"git":{"createdTime":1712938892000,"updatedTime":1712938892000,"contributors":[{"name":"yamsfeer","email":"feer.yams@gmail.com","commits":1}]},"readingTime":{"minutes":0.85,"words":255},"filePathRelative":"工程架构/性能优化/3.7.PRPL模式.md","localizedDate":"2024年4月12日","autoDesc":true}');export{m as comp,d as data};
