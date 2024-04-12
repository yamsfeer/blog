<template><div><h1 id="tree-shaking" tabindex="-1"><a class="header-anchor" href="#tree-shaking"><span>tree shaking</span></a></h1>
<p>tree shaking 不是 webpack 的某个配置选项，而是一组功能搭配使用的优化效果。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">optimization</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">usedExports</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">// bundle 中不导出未被使用的 export 代码</span>
    <span class="token literal-property property">minimize</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">// 压缩代码，删除未引用代码</span>
    <span class="token literal-property property">concatenateModules</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">// 将模块代码合并为一个模块</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="sideeffect" tabindex="-1"><a class="header-anchor" href="#sideeffect"><span>sideEffect</span></a></h3>
<p>sideEffect 可以指定某个文件是否是有副作用的，如果是没有副作用且没有被导入引用的文件，则可以直接跳过。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token comment">// log.js</span>
<span class="token class-name">Object</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">log</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token function">log</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>

<span class="token comment">// index.js</span>
<span class="token keyword">import</span> <span class="token string">'./log.js'</span>

<span class="token keyword">let</span> ojb <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
obj<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre></div><p>log.js 的内容虽然没有被 export，但它在 Object.prototype 上挂载了 log 方法，这就是有副作用的代码。</p>
<p>如果我们能确定没有类似的有副作用的代码，则可以通过以下配置排除这些文件。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">optimization</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">sideEffects</span><span class="token operator">:</span> <span class="token boolean">false</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>对于含有副作用的文件 ，也可以在 package.json 中指定。</p>
<div class="language-json" data-ext="json" data-title="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"sideEffects"</span><span class="token operator">:</span> <span class="token punctuation">[</span>'./src/log.js'<span class="token punctuation">,</span> 'style.css'<span class="token punctuation">]</span>
  <span class="token comment">// "sideEffects": false // 所有文件都不含副作用</span>
<span class="token punctuation">}</span>
</code></pre></div><p>在代码语句层面，我们也可以用注释 <code v-pre>/*#__PURE__*/</code> 表示这个语句时不含有副作用的，从而使其能被 tree shaking。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token comment">/*#__PURE__*/</span> <span class="token function">double</span><span class="token punctuation">(</span><span class="token number">55</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div></div></template>


