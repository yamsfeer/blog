<template><div><h1 id="web-component" tabindex="-1"><a class="header-anchor" href="#web-component"><span>web component</span></a></h1>
<p>web component 是一系列 web 标准的集合。包括：</p>
<ul>
<li>custom element</li>
<li>shadow dom</li>
<li>html template</li>
<li>es module</li>
</ul>
<p>一个 web component 大概如下：</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> template <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">'template'</span><span class="token punctuation">)</span>
template<span class="token punctuation">.</span>innerHTML <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">
  &lt;style>
    .my-component { font-size: 20px }
  &lt;/style>
  &lt;div class="my-component">hello world&lt;/div>
</span><span class="token template-punctuation string">`</span></span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">MyComponent</span> <span class="token keyword">extends</span> <span class="token class-name">HTMLElement</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>shadowRoot <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">attachShadow</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">mode</span><span class="token operator">:</span> open <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token comment">// 创建一个 shadow dom</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 渲染</span>
  <span class="token punctuation">}</span>
  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> content <span class="token operator">=</span> template<span class="token punctuation">.</span>content<span class="token punctuation">.</span><span class="token function">cloneNode</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token comment">// 获取模板</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>shadowRoot<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>content<span class="token punctuation">)</span> <span class="token comment">// 挂载节点</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

window<span class="token punctuation">.</span>customElement<span class="token punctuation">.</span><span class="token function">define</span><span class="token punctuation">(</span><span class="token string">'my-component'</span><span class="token punctuation">,</span> MyComponent<span class="token punctuation">)</span>
</code></pre></div><p>在 html 中使用如下。</p>
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>my-component</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>my-component</span><span class="token punctuation">></span></span>
</code></pre></div><p>注意，自定义元素的名称必须包含连词线，用与区别原生的 HTML 元素，且不能用自闭合标签。</p>
<h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考"><span>参考</span></a></h2>
<p><a href="https://www.robinwieruch.de/web-components-tutorial/" target="_blank" rel="noopener noreferrer">Web Components Tutorial for Beginners<ExternalLinkIcon/></a></p>
<p><a href="https://web.dev/custom-elements-v1/" target="_blank" rel="noopener noreferrer">Custom Elements v1 - Reusable Web Components<ExternalLinkIcon/></a></p>
</div></template>


