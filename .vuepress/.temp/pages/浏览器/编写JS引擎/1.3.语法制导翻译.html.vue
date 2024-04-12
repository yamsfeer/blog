<template><div><h1 id="语法制导翻译" tabindex="-1"><a class="header-anchor" href="#语法制导翻译"><span>语法制导翻译</span></a></h1>
<h3 id="三地址代码" tabindex="-1"><a class="header-anchor" href="#三地址代码"><span>三地址代码</span></a></h3>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">if</span> <span class="token punctuation">(</span>a <span class="token operator">+</span> b <span class="token operator">></span> <span class="token number">10</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  c <span class="token operator">=</span> <span class="token number">100</span>
<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
  c <span class="token operator">=</span> <span class="token number">1000</span>
<span class="token punctuation">}</span>
</code></pre></div><div class="language-assembly" data-ext="assembly" data-title="assembly"><pre v-pre class="language-assembly"><code>p0 = a + b
p1 = p0 &gt; 10

IF p1 else L0
c = 100
GOTO L1
L0:
c = 1000
L1:
...
</code></pre></div><div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  sun <span class="token operator">+=</span> i
<span class="token punctuation">}</span>
</code></pre></div><div class="language-assembly" data-ext="assembly" data-title="assembly"><pre v-pre class="language-assembly"><code>i = 0
L0:
p0 = i &lt; 10

IF p0 ELSE L1
sum = sum + i
i = i + 1
p0 = i &lt; 10
GOTO L0

L1:
...
</code></pre></div><div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code>func <span class="token function">foo</span><span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b<span class="token punctuation">,</span> c</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> x
<span class="token punctuation">}</span>
<span class="token function">foo</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span>
</code></pre></div><div class="language-assembly" data-ext="assembly" data-title="assembly"><pre v-pre class="language-assembly"><code>FOO:
RETURN x

PUSH 1
PUSH 2
PUSH 3
CALL FOO
</code></pre></div><h3 id="语法制导定义-sdd" tabindex="-1"><a class="header-anchor" href="#语法制导定义-sdd"><span>语法制导定义（SDD）</span></a></h3>
<p>语法制导定义（<em>Syntax Directed Definition，SDD</em>），定义 <em>AST</em> 如何被翻译。</p>
<p><em>SDD</em> 通常包含</p>
<ul>
<li>文法：上下文无关文法 <em>G</em></li>
<li>规则：文法中的每条产生式</li>
<li>属性：定义每条产生式的如何计算</li>
</ul>
<p>举个例子，四则运算的 <em>SDD</em>：</p>
<p>文法：</p>
<div class="language-text" data-ext="text" data-title="text"><pre v-pre class="language-text"><code>E -> E + T
	 | T
T -> T * F
   | F
F -> 0|1|2|3|4|5|6|7|8|9
</code></pre></div><p>规则及属性：</p>
<table>
<thead>
<tr>
<th>规则</th>
<th>属性</th>
</tr>
</thead>
<tbody>
<tr>
<td><span v-pre class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>E</mi><mo>→</mo><msup><mi>E</mi><mo mathvariant="normal" lspace="0em" rspace="0em">′</mo></msup><mo>+</mo><mi>T</mi></mrow><annotation encoding="application/x-tex">E \to E&#x27; + T</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord mathnormal" style="margin-right:0.05764em;">E</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">→</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:0.8352em;vertical-align:-0.0833em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.05764em;">E</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.7519em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">′</span></span></span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord mathnormal" style="margin-right:0.13889em;">T</span></span></span></span></td>
<td><span v-pre class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>E</mi><mi mathvariant="normal">.</mi><mi>v</mi><mi>a</mi><mi>l</mi><mo>=</mo><msup><mi>E</mi><mo mathvariant="normal" lspace="0em" rspace="0em">′</mo></msup><mi mathvariant="normal">.</mi><mi>v</mi><mi>a</mi><mi>l</mi><mo>+</mo><mi>T</mi><mi mathvariant="normal">.</mi><mi>v</mi><mi>a</mi><mi>l</mi></mrow><annotation encoding="application/x-tex">E.val = E&#x27;.val + T.val</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6944em;"></span><span class="mord mathnormal" style="margin-right:0.05764em;">E</span><span class="mord">.</span><span class="mord mathnormal" style="margin-right:0.03588em;">v</span><span class="mord mathnormal">a</span><span class="mord mathnormal" style="margin-right:0.01968em;">l</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:0.8352em;vertical-align:-0.0833em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.05764em;">E</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.7519em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">′</span></span></span></span></span></span></span></span></span><span class="mord">.</span><span class="mord mathnormal" style="margin-right:0.03588em;">v</span><span class="mord mathnormal">a</span><span class="mord mathnormal" style="margin-right:0.01968em;">l</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.6944em;"></span><span class="mord mathnormal" style="margin-right:0.13889em;">T</span><span class="mord">.</span><span class="mord mathnormal" style="margin-right:0.03588em;">v</span><span class="mord mathnormal">a</span><span class="mord mathnormal" style="margin-right:0.01968em;">l</span></span></span></span></td>
</tr>
<tr>
<td><span v-pre class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>E</mi><mo>→</mo><mi>T</mi></mrow><annotation encoding="application/x-tex">E \to T</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord mathnormal" style="margin-right:0.05764em;">E</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">→</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord mathnormal" style="margin-right:0.13889em;">T</span></span></span></span></td>
<td><span v-pre class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>E</mi><mi mathvariant="normal">.</mi><mi>v</mi><mi>a</mi><mi>l</mi><mo>=</mo><mi>T</mi><mi mathvariant="normal">.</mi><mi>v</mi><mi>a</mi><mi>l</mi></mrow><annotation encoding="application/x-tex">E.val = T.val</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6944em;"></span><span class="mord mathnormal" style="margin-right:0.05764em;">E</span><span class="mord">.</span><span class="mord mathnormal" style="margin-right:0.03588em;">v</span><span class="mord mathnormal">a</span><span class="mord mathnormal" style="margin-right:0.01968em;">l</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:0.6944em;"></span><span class="mord mathnormal" style="margin-right:0.13889em;">T</span><span class="mord">.</span><span class="mord mathnormal" style="margin-right:0.03588em;">v</span><span class="mord mathnormal">a</span><span class="mord mathnormal" style="margin-right:0.01968em;">l</span></span></span></span></td>
</tr>
<tr>
<td><span v-pre class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>T</mi><mo>→</mo><msup><mi>T</mi><mo mathvariant="normal" lspace="0em" rspace="0em">′</mo></msup><mo>∗</mo><mi>F</mi></mrow><annotation encoding="application/x-tex">T \to T&#x27; * F</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord mathnormal" style="margin-right:0.13889em;">T</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">→</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:0.7519em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.13889em;">T</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.7519em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">′</span></span></span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">∗</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord mathnormal" style="margin-right:0.13889em;">F</span></span></span></span></td>
<td><span v-pre class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>T</mi><mi mathvariant="normal">.</mi><mi>v</mi><mi>a</mi><mi>l</mi><mo>=</mo><msup><mi>T</mi><mo mathvariant="normal" lspace="0em" rspace="0em">′</mo></msup><mi mathvariant="normal">.</mi><mi>v</mi><mi>a</mi><mi>l</mi><mo>∗</mo><mi>F</mi><mi mathvariant="normal">.</mi><mi>v</mi><mi>a</mi><mi>l</mi></mrow><annotation encoding="application/x-tex">T.val = T&#x27;.val * F.val</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6944em;"></span><span class="mord mathnormal" style="margin-right:0.13889em;">T</span><span class="mord">.</span><span class="mord mathnormal" style="margin-right:0.03588em;">v</span><span class="mord mathnormal">a</span><span class="mord mathnormal" style="margin-right:0.01968em;">l</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:0.7519em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.13889em;">T</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.7519em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">′</span></span></span></span></span></span></span></span></span><span class="mord">.</span><span class="mord mathnormal" style="margin-right:0.03588em;">v</span><span class="mord mathnormal">a</span><span class="mord mathnormal" style="margin-right:0.01968em;">l</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">∗</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.6944em;"></span><span class="mord mathnormal" style="margin-right:0.13889em;">F</span><span class="mord">.</span><span class="mord mathnormal" style="margin-right:0.03588em;">v</span><span class="mord mathnormal">a</span><span class="mord mathnormal" style="margin-right:0.01968em;">l</span></span></span></span></td>
</tr>
<tr>
<td><span v-pre class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>T</mi><mo>→</mo><mi>F</mi></mrow><annotation encoding="application/x-tex">T \to F</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord mathnormal" style="margin-right:0.13889em;">T</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">→</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord mathnormal" style="margin-right:0.13889em;">F</span></span></span></span></td>
<td><span v-pre class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>T</mi><mi mathvariant="normal">.</mi><mi>v</mi><mi>a</mi><mi>l</mi><mo>=</mo><mi>F</mi><mi mathvariant="normal">.</mi><mi>v</mi><mi>a</mi><mi>l</mi></mrow><annotation encoding="application/x-tex">T.val = F.val</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6944em;"></span><span class="mord mathnormal" style="margin-right:0.13889em;">T</span><span class="mord">.</span><span class="mord mathnormal" style="margin-right:0.03588em;">v</span><span class="mord mathnormal">a</span><span class="mord mathnormal" style="margin-right:0.01968em;">l</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:0.6944em;"></span><span class="mord mathnormal" style="margin-right:0.13889em;">F</span><span class="mord">.</span><span class="mord mathnormal" style="margin-right:0.03588em;">v</span><span class="mord mathnormal">a</span><span class="mord mathnormal" style="margin-right:0.01968em;">l</span></span></span></span></td>
</tr>
</tbody>
</table>
<table>
<thead>
<tr>
<th>规则</th>
<th>属性</th>
</tr>
</thead>
<tbody>
<tr>
<td><span v-pre class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>E</mi><mo>→</mo><msup><mi>E</mi><mo mathvariant="normal" lspace="0em" rspace="0em">′</mo></msup><mo>+</mo><mi>T</mi></mrow><annotation encoding="application/x-tex">E \to E&#x27; + T</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord mathnormal" style="margin-right:0.05764em;">E</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">→</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:0.8352em;vertical-align:-0.0833em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.05764em;">E</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.7519em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">′</span></span></span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord mathnormal" style="margin-right:0.13889em;">T</span></span></span></span></td>
<td>E.var = assign()<br />pro.add('var E.var = E'.var + T.var')</td>
</tr>
<tr>
<td><span v-pre class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>E</mi><mo>→</mo><mi>T</mi></mrow><annotation encoding="application/x-tex">E \to T</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord mathnormal" style="margin-right:0.05764em;">E</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">→</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord mathnormal" style="margin-right:0.13889em;">T</span></span></span></span></td>
<td>E.var = assign()<br />program.add('var E.var = T.var')`</td>
</tr>
<tr>
<td><span v-pre class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>T</mi><mo>→</mo><msup><mi>T</mi><mo mathvariant="normal" lspace="0em" rspace="0em">′</mo></msup><mo>∗</mo><mi>F</mi></mrow><annotation encoding="application/x-tex">T \to T&#x27; * F</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord mathnormal" style="margin-right:0.13889em;">T</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">→</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:0.7519em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.13889em;">T</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.7519em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">′</span></span></span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">∗</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord mathnormal" style="margin-right:0.13889em;">F</span></span></span></span></td>
<td>T.var = assign()<br />program.add('var T.var = T'.var * F.val)</td>
</tr>
<tr>
<td><span v-pre class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>T</mi><mo>→</mo><mi>F</mi></mrow><annotation encoding="application/x-tex">T \to F</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord mathnormal" style="margin-right:0.13889em;">T</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">→</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord mathnormal" style="margin-right:0.13889em;">F</span></span></span></span></td>
<td>T.var = assign()<br />program.add('var T.var = F.val')</td>
</tr>
</tbody>
</table>
<p><em>（assign() 表示在符号表中插入一个变量）</em></p>
<h3 id="词法作用域" tabindex="-1"><a class="header-anchor" href="#词法作用域"><span>词法作用域</span></a></h3>
<p>一个符号的可见范围称为这个符号的<strong>作用域</strong>。</p>
<p>词法作用域的意思是符号的作用域和源代码的书写位置（词法）相关。</p>
<p>一个变量的变换过程</p>
<p>词法符号 -&gt; ASTNode -&gt; 三地址代码中的地址 -&gt; 运行时环境的操作数</p>
<h3 id="符号表-symbol-table" tabindex="-1"><a class="header-anchor" href="#符号表-symbol-table"><span>符号表（Symbol Table）</span></a></h3>
<p>符号表用于存储符号 Symbol （常量、变量、标签）在源代码中的位置、数据类型，以及位置信息决定的词法作用域和运行时的相对内存地址。</p>
<h4 id="静态符号表" tabindex="-1"><a class="header-anchor" href="#静态符号表"><span>静态符号表</span></a></h4>
<p>静态符号表用哈希表实现，存储常量在常量区的位置</p>
<h4 id="符号表" tabindex="-1"><a class="header-anchor" href="#符号表"><span>符号表</span></a></h4>
<p>符号表用 树 + 哈希表 实现，存储每个符号的词法作用域，以及它在词法作用域的相对位置。</p>
<img class="img-mid" src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/008i3skNgy1gx5ilbumjnj30a3088mxc.jpg"  />
<img class="img-mid" src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/008i3skNgy1gx5ilcb17lj30bb06cglo.jpg"  />
<img class="img-mid" src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/008i3skNgy1gx5ilb8hfkj308m06rjrg.jpg"  /></div></template>


