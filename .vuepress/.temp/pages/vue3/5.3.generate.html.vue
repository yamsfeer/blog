<template><div><h1 id="generate" tabindex="-1"><a class="header-anchor" href="#generate"><span>Generate</span></a></h1>
<p>代码生成的本质是字符串拼接。</p>
<p>通过 transform 操作，我们已经得到 JavaScript 代码的 AST，代码生成就是遍历这个 AST，拼接字符串得到最终 render 函数的代码。</p>
<p>回顾一下 compile 的主流程。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">compile</span><span class="token punctuation">(</span><span class="token parameter">template</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> ast <span class="token operator">=</span> <span class="token function">parse</span><span class="token punctuation">(</span>template<span class="token punctuation">)</span>
  <span class="token function">transform</span><span class="token punctuation">(</span>ast<span class="token punctuation">)</span>
  <span class="token keyword">const</span> code <span class="token operator">=</span> <span class="token function">generate</span><span class="token punctuation">(</span>ast<span class="token punctuation">.</span>jsNode<span class="token punctuation">)</span>
  
  <span class="token keyword">return</span> code
<span class="token punctuation">}</span>
</code></pre></div><p>现在我们要实现的是 generate 函数，解析 AST 树，得到代码文本。</p>
<h2 id="上下文对象" tabindex="-1"><a class="header-anchor" href="#上下文对象"><span>上下文对象</span></a></h2>
<p>代码生成也需要 context 对象，用以保存代码生成过程中的运行状态。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> context <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">code</span><span class="token operator">:</span> <span class="token string">''</span><span class="token punctuation">,</span>
  <span class="token function">push</span><span class="token punctuation">(</span><span class="token parameter">code</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> context<span class="token punctuation">.</span>code <span class="token operator">+=</span> code <span class="token punctuation">}</span><span class="token punctuation">,</span>
  
  <span class="token literal-property property">currentIndent</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token comment">// 缩进</span>
  <span class="token function">newline</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 两个空格为一个缩进</span>
    context<span class="token punctuation">.</span>code <span class="token operator">+=</span> <span class="token string">'\n'</span> <span class="token operator">+</span> <span class="token string">'  '</span><span class="token punctuation">.</span><span class="token function">repeat</span><span class="token punctuation">(</span>context<span class="token punctuation">.</span>currentIndent<span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">indent</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    context<span class="token punctuation">.</span>currentIndent<span class="token operator">++</span>
    context<span class="token punctuation">.</span><span class="token function">newline</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token function">deindent</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    context<span class="token punctuation">.</span>currentIndent<span class="token operator">--</span>
    context<span class="token punctuation">.</span><span class="token function">newline</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>在 context 中，我们用 code 保存已生成的代码文本，并提供了缩进相关的函数，使得生成的代码有较好的可读性。</p>
<p>上节提到过，上下文就像是全局变量。可以预见，这个 context 对象将在代码生成的过程中被传递和修改。</p>
<p>代码生成的原理很简单，只需针对 JavaScript AST 的节点类型，调用生成函数即可。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">genNode</span><span class="token punctuation">(</span><span class="token parameter">node<span class="token punctuation">,</span> context</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">swtich</span><span class="token punctuation">(</span><span class="token parameter">node<span class="token punctuation">.</span>type</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> <span class="token string">'FunctionDecl'</span><span class="token operator">:</span> <span class="token function">genFunctionDecl</span><span class="token punctuation">(</span>node<span class="token punctuation">,</span> context<span class="token punctuation">)</span> <span class="token keyword">break</span>
    <span class="token keyword">case</span> <span class="token string">'ReturnStatement'</span><span class="token operator">:</span> <span class="token function">genReturnStatement</span><span class="token punctuation">(</span>node<span class="token punctuation">,</span> context<span class="token punctuation">)</span> <span class="token keyword">break</span>
    <span class="token keyword">case</span> <span class="token string">'CallExpression'</span><span class="token operator">:</span> <span class="token function">genCallExpression</span><span class="token punctuation">(</span>node<span class="token punctuation">,</span> context<span class="token punctuation">)</span> <span class="token keyword">break</span>
    <span class="token keyword">case</span> <span class="token string">'StringLiteral'</span><span class="token operator">:</span> <span class="token function">genStringLiteral</span><span class="token punctuation">(</span>node<span class="token punctuation">,</span> context<span class="token punctuation">)</span> <span class="token keyword">break</span>
    <span class="token keyword">case</span> <span class="token string">'ArrayExpression'</span><span class="token operator">:</span> <span class="token function">genArrayExpression</span><span class="token punctuation">(</span>node<span class="token punctuation">,</span> context<span class="token punctuation">)</span> <span class="token keyword">break</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>以生产函数声明代码为例，genFunctionDecl 的过程如下：</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">genFunctionDecl</span><span class="token punctuation">(</span><span class="token parameter">node<span class="token punctuation">,</span> context</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token punctuation">{</span> push<span class="token punctuation">,</span> indent<span class="token punctuation">,</span> deindent <span class="token punctuation">}</span> <span class="token operator">=</span> context
  
  <span class="token function">push</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">function </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>node<span class="token punctuation">.</span>id<span class="token punctuation">.</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span> <span class="token comment">// render</span>
  <span class="token function">push</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">(</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span>
  
  <span class="token function">genNodeList</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>params<span class="token punctuation">,</span> context<span class="token punctuation">)</span> <span class="token comment">// params</span>
  
  <span class="token function">push</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">)</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span>
  <span class="token function">push</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">{</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span>
  
  <span class="token function">indent</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  node<span class="token punctuation">.</span>body<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">n</span> <span class="token operator">=></span> <span class="token function">genNode</span><span class="token punctuation">(</span>n<span class="token punctuation">,</span> context<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// body</span>
  <span class="token function">deindent</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

  <span class="token function">push</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">}</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><p>期间，对于数组类型的节点，则用 genNodeList 函数处理。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">genNodeList</span><span class="token punctuation">(</span><span class="token parameter">nodes<span class="token punctuation">,</span> context</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  nodes<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">node<span class="token punctuation">,</span> i</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token function">genNode</span><span class="token punctuation">(</span>node<span class="token punctuation">,</span> context<span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>i <span class="token operator">&lt;</span> nodes<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      context<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token string">', '</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></div></template>


