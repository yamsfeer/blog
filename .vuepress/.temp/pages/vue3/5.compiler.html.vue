<template><div><h1 id="compiler" tabindex="-1"><a class="header-anchor" href="#compiler"><span>compiler</span></a></h1>
<p>对于 vue 而言，编译就是将模板转化成 JavaScript 代码的过程。具体来说，是将模板编译成渲染函数。</p>
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span> <span class="token attr-name">:id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>appId<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>vue<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre></div><p>以上 vue 模板编译后的 render 函数如下。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token function">h</span><span class="token punctuation">(</span><span class="token string">'div'</span><span class="token punctuation">,</span> <span class="token punctuation">[</span>
    <span class="token function">h</span><span class="token punctuation">(</span><span class="token string">'h1'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">id</span><span class="token operator">:</span> appId <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token string">'vue'</span><span class="token punctuation">)</span>
  <span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><p>vue 模板编译器的工作流程如下图。</p>
<p><img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/compiler-workflow.svg" alt=""></p>
<p>我们用 parse 函数完成词法分析和语法分析，整个编译过程可以分成三步：parse、transform、generate。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> template <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">&lt;div>&lt;h1 v-if="ok">vue template&lt;/h1>&lt;/div></span><span class="token template-punctuation string">`</span></span>

<span class="token keyword">const</span> templateAST <span class="token operator">=</span> <span class="token function">parse</span><span class="token punctuation">(</span>template<span class="token punctuation">)</span>
<span class="token keyword">const</span> jsAST <span class="token operator">=</span> <span class="token function">transform</span><span class="token punctuation">(</span>templateAST<span class="token punctuation">)</span>
<span class="token keyword">const</span> code <span class="token operator">=</span> <span class="token function">generate</span><span class="token punctuation">(</span>jsAST<span class="token punctuation">)</span>
</code></pre></div></div></template>


