<template><div><h1 id="statement" tabindex="-1"><a class="header-anchor" href="#statement"><span>Statement</span></a></h1>
<h2 id="简单语句" tabindex="-1"><a class="header-anchor" href="#简单语句"><span>简单语句</span></a></h2>
<p>ExpressionStatement：表达式语句，完成计算</p>
<p>流程控制语句：</p>
<p>ContinueStatement</p>
<p>BreakStatement</p>
<p>ReturnStatement</p>
<p>ThrowStatement</p>
<p>其他语句：</p>
<p>EmptyStatement：单独一个分号</p>
<p>DebuggerStatement：<code v-pre>debugger;</code></p>
<h2 id="复合语句" tabindex="-1"><a class="header-anchor" href="#复合语句"><span>复合语句</span></a></h2>
<p>IfStatement</p>
<p>SwitchStatement</p>
<p>IterationStatement: <code v-pre>for, while...</code></p>
<p>BlockStatement</p>
<p>TryStatement: <code v-pre>try-catch-finally</code></p>
<p>LabelledStatement</p>
<p>WithStatement</p>
<h2 id="声明" tabindex="-1"><a class="header-anchor" href="#声明"><span>声明</span></a></h2>
<p>Let and Const Declarations</p>
<p>Variable Statement</p>
<p>FunctionDeclaration</p>
<p>Destructuring Binding Paaatterns</p>
<h2 id="completetion-record" tabindex="-1"><a class="header-anchor" href="#completetion-record"><span>Completetion Record</span></a></h2>
<p>Completion record 描述的是语句执行的结果，它由 3 个字段组成。</p>
<table>
<thead>
<tr>
<th>field</th>
<th>value</th>
</tr>
</thead>
<tbody>
<tr>
<td>[[Type]]</td>
<td>normal, break, continue, return, throw</td>
</tr>
<tr>
<td>[[Value]]</td>
<td>任何值 ( 不包括 Completion Record )</td>
</tr>
<tr>
<td>[[Target]]</td>
<td>String 或空</td>
</tr>
</tbody>
</table>
<h2 id="词法作用域和预处理" tabindex="-1"><a class="header-anchor" href="#词法作用域和预处理"><span>词法作用域和预处理</span></a></h2>
<p>作用域就是变量影响的范围，词法作用域就是根据代码所在的位置决定其作用域。</p>
<p>注意，作用域并不是一个运行时的概念，JavaScript 在运行时用词法环境 ( LexicalEnvironment ) 实现变量的查找。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> a1 <span class="token operator">=</span> <span class="token number">1</span>
<span class="token keyword">void</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  a1 <span class="token operator">=</span> <span class="token number">2</span>
  <span class="token punctuation">{</span>
    <span class="token keyword">var</span> a2
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a1<span class="token punctuation">)</span> <span class="token comment">// 1</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a2<span class="token punctuation">)</span> <span class="token comment">// undefiend</span>
</code></pre></div><p>以上代码中，变量 a1 的作用域是全局作用域，变量 a2 的作用域是代码所在的块级作用域。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">1</span>
<span class="token keyword">void</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  a <span class="token operator">=</span> <span class="token number">2</span>
  <span class="token keyword">return</span>
  <span class="token keyword">var</span> a
<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span> <span class="token comment">// 1</span>
</code></pre></div><p>用 var 声明的变量会在预处理阶段将变量提升到当前作用域的最上面。</p>
</div></template>


