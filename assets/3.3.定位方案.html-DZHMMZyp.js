import{_ as t}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as e,c as a,a as s}from"./app-BPFsuHku.js";const n={},i=s(`<h1 id="position-定位" tabindex="-1"><a class="header-anchor" href="#position-定位"><span>position 定位</span></a></h1><p>position 有以下几种定位方案：</p><div class="language-text" data-ext="text" data-title="text"><pre class="language-text"><code>position: static | relative | absolute | fixed | sticky
</code></pre></div><p>元素 position 定位的影响主要有三点：</p><ul><li>是否脱离文档流</li><li>元素的 left、right、bottom、top、宽高百分比等根据其包含块计算</li><li>是否创建新的 BFC</li></ul><h2 id="static" tabindex="-1"><a class="header-anchor" href="#static"><span>static</span></a></h2><ul><li>默认值</li><li>元素在文档流内</li><li>left、right、bottom、top 属性无效</li><li>z-index 属性无效</li></ul><h2 id="relative" tabindex="-1"><a class="header-anchor" href="#relative"><span>relative</span></a></h2><ul><li>元素在文档流内</li><li>left、right、bottom、top 根据原本的位置偏移</li><li>对 display: table-cell 等表格相关的元素无效</li></ul><h2 id="absolute" tabindex="-1"><a class="header-anchor" href="#absolute"><span>absolute</span></a></h2><ul><li>脱离文档流</li><li>left、right、bottom、top 相对其包含块偏移</li><li>宽高百分比值相对其包含块计算</li><li>创建新的 BFC</li></ul><h2 id="fixed" tabindex="-1"><a class="header-anchor" href="#fixed"><span>fixed</span></a></h2><ul><li>脱离文档流</li><li>与 absolute 类似，但其包含块为初始包含块 ( viewport ) 或 transform 元素</li><li>创建新的 BFC</li></ul><h2 id="sticky" tabindex="-1"><a class="header-anchor" href="#sticky"><span>sticky</span></a></h2><p>relative 和 fixed 的结合，和滚动相关。</p><p>达到一定阈值前 ( specified threshold ) 为 relative，超过之后为 fixed。</p><ul><li>元素在文档流内</li><li>必须指定 left、right、bottom、top 中的一个作为阈值</li><li>相对于最近可滚动祖先元素或包含块定位</li><li>创建新的 BFC</li></ul><div class="language-css" data-ext="css" data-title="css"><pre class="language-css"><code><span class="token selector">.container</span><span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 280px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 1850px<span class="token punctuation">;</span>  <span class="token comment">/*  scroll   */</span>
<span class="token punctuation">}</span>

<span class="token selector">.box</span><span class="token punctuation">{</span>
  <span class="token property">position</span><span class="token punctuation">:</span> sticky<span class="token punctuation">;</span>
  <span class="token property">top</span><span class="token punctuation">:</span> 150px<span class="token punctuation">;</span>  <span class="token comment">/*  阈值（必须）  */</span> 
  <span class="token property">width</span><span class="token punctuation">:</span> 70px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 70px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div>`,18),o=[i];function l(p,c){return e(),a("div",null,o)}const u=t(n,[["render",l],["__file","3.3.定位方案.html.vue"]]),h=JSON.parse('{"path":"/css/3.3.%E5%AE%9A%E4%BD%8D%E6%96%B9%E6%A1%88.html","title":"position 定位","lang":"zh-CN","frontmatter":{"description":"position 定位 position 有以下几种定位方案： 元素 position 定位的影响主要有三点： 是否脱离文档流 元素的 left、right、bottom、top、宽高百分比等根据其包含块计算 是否创建新的 BFC static 默认值 元素在文档流内 left、right、bottom、top 属性无效 z-index 属性无效 re...","head":[["meta",{"property":"og:url","content":"https://yamsfeer.github.io/notes-fe/css/3.3.%E5%AE%9A%E4%BD%8D%E6%96%B9%E6%A1%88.html"}],["meta",{"property":"og:site_name","content":"yamsfeer"}],["meta",{"property":"og:title","content":"position 定位"}],["meta",{"property":"og:description","content":"position 定位 position 有以下几种定位方案： 元素 position 定位的影响主要有三点： 是否脱离文档流 元素的 left、right、bottom、top、宽高百分比等根据其包含块计算 是否创建新的 BFC static 默认值 元素在文档流内 left、right、bottom、top 属性无效 z-index 属性无效 re..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-04-12T16:21:32.000Z"}],["meta",{"property":"article:modified_time","content":"2024-04-12T16:21:32.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"position 定位\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-04-12T16:21:32.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"static","slug":"static","link":"#static","children":[]},{"level":2,"title":"relative","slug":"relative","link":"#relative","children":[]},{"level":2,"title":"absolute","slug":"absolute","link":"#absolute","children":[]},{"level":2,"title":"fixed","slug":"fixed","link":"#fixed","children":[]},{"level":2,"title":"sticky","slug":"sticky","link":"#sticky","children":[]}],"git":{"createdTime":1712938892000,"updatedTime":1712938892000,"contributors":[{"name":"yamsfeer","email":"feer.yams@gmail.com","commits":1}]},"readingTime":{"minutes":0.98,"words":294},"filePathRelative":"css/3.3.定位方案.md","localizedDate":"2024年4月12日","autoDesc":true}');export{u as comp,h as data};
