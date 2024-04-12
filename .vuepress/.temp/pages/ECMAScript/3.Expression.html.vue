<template><div><h1 id="expression" tabindex="-1"><a class="header-anchor" href="#expression"><span>Expression</span></a></h1>
<h2 id="left-hand-side-expression" tabindex="-1"><a class="header-anchor" href="#left-hand-side-expression"><span>Left-Hand-Side Expression</span></a></h2>
<ul>
<li>Property Accessors: <code v-pre>obj.prop</code></li>
<li>new Operator: <code v-pre>new</code></li>
<li>Function Calls: <code v-pre>func()</code></li>
<li>Optional Chains: <code v-pre>a?.b?.c</code></li>
<li>...</li>
</ul>
<h2 id="right-hand-side-expression" tabindex="-1"><a class="header-anchor" href="#right-hand-side-expression"><span>Right-Hand-Side Expression</span></a></h2>
<ul>
<li>Update Expressions: <code v-pre>a++, a--, --a, ++a</code></li>
<li>Unary Expressions: <code v-pre>delete a.b, typeof a, +a, -a, ~a, !a, await a...</code></li>
<li>Exponentiation Operator: <code v-pre>3 ** 2 ** 3 === 3 ** ( 2 ** 3 )</code></li>
<li>Multiplicative Operators: <code v-pre>*, /, %</code></li>
<li>Additive Operators: <code v-pre>+, -</code></li>
<li>Bitwise Shift Operators: <code v-pre>&lt;&lt;, &gt;&gt;, &gt;&gt;&gt;</code></li>
<li>Relational Operators: <code v-pre>&lt;, &gt;, &lt;=, &gt;=, instanceof, in</code></li>
<li>Equality Operators: <code v-pre>==, !=, ===, !==</code></li>
<li>Binary Bitwise Operators: <code v-pre>&amp;, ^, |</code></li>
<li>Binary Logical Operators: <code v-pre>&amp;&amp;, ||</code></li>
<li>Conditional Operator: <code v-pre>condition ? a : b</code></li>
<li>Assignment Operators: <code v-pre>=</code></li>
<li>Comma Operator: <code v-pre>,</code></li>
</ul>
<p>值得注意的是，大部分运算符是左结合的，而 Exponentiation Operator 是右结合的。</p>
<h2 id="type-convertion" tabindex="-1"><a class="header-anchor" href="#type-convertion"><span>Type Convertion</span></a></h2>
<p>类型转换规则表：</p>
<table>
<thead>
<tr>
<th></th>
<th>Number</th>
<th>String</th>
<th>Boolean</th>
<th>Undefined</th>
<th>Null</th>
<th>Object</th>
<th>Symbol</th>
</tr>
</thead>
<tbody>
<tr>
<td>Number</td>
<td>X</td>
<td>1 =&gt; '1'</td>
<td>0 =&gt; false</td>
<td>X</td>
<td></td>
<td>Boxing</td>
<td></td>
</tr>
<tr>
<td>String</td>
<td>'1' =&gt; 1</td>
<td>X</td>
<td>&quot;&quot; =&gt; false</td>
<td></td>
<td></td>
<td>Boxing</td>
<td>X</td>
</tr>
<tr>
<td>Boolean</td>
<td>true =&gt;1,false =&gt; 0</td>
<td>true =&gt; 'true', false =&gt; 'false'</td>
<td>X</td>
<td>X</td>
<td>X</td>
<td>Boxing</td>
<td>X</td>
</tr>
<tr>
<td>Undefined</td>
<td>NaN</td>
<td>'Undefined'</td>
<td>false</td>
<td>X</td>
<td>X</td>
<td>X</td>
<td>X</td>
</tr>
<tr>
<td>Null</td>
<td>0</td>
<td>'null'</td>
<td>false</td>
<td>X</td>
<td>X</td>
<td>X</td>
<td>X</td>
</tr>
<tr>
<td>Object</td>
<td>valueOf</td>
<td>valueOf, toString</td>
<td>true</td>
<td>X</td>
<td>X</td>
<td>X</td>
<td>X</td>
</tr>
<tr>
<td>Symbol</td>
<td>X</td>
<td>X</td>
<td>X</td>
<td>X</td>
<td>X</td>
<td>Boxing</td>
<td>X</td>
</tr>
</tbody>
</table>
<h3 id="boxing" tabindex="-1"><a class="header-anchor" href="#boxing"><span>boxing</span></a></h3>
<p>boxing 操作的规则举例：</p>
<table>
<thead>
<tr>
<th>type</th>
<th>value</th>
<th>Object</th>
</tr>
</thead>
<tbody>
<tr>
<td>Number</td>
<td>1</td>
<td>new Number(1)</td>
</tr>
<tr>
<td>String</td>
<td>'str'</td>
<td>new String('str')</td>
</tr>
<tr>
<td>Boolean</td>
<td>true</td>
<td>new Boolean(true)</td>
</tr>
<tr>
<td>Symbol</td>
<td>Symbol('text')</td>
<td>new Object(Symbol('text'))</td>
</tr>
</tbody>
</table>
<p>Undefined 和 Null 没有 boxing 操作。</p>
<h3 id="unboxing" tabindex="-1"><a class="header-anchor" href="#unboxing"><span>unboxing</span></a></h3>
<p>unboxing 就是把一个 object 转换为基本类型。</p>
<p>unboxing 主要由 ToPrimitive 完成，这是一个引用内部函数。有 3 个函数可以影响 ToPrimitive 的执行结果：</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token string">'1'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">valueOf</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token number">2</span> <span class="token punctuation">}</span>
  <span class="token punctuation">[</span>Symbol<span class="token punctuation">.</span>toPrimitive<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token number">3</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>如果对象内提供了 <code v-pre>Symbol.toPrimitive</code> 方法，则使用它的返回值作为 unboxing 的结果，否则根据实际情况选择 toString 或 valueOf，比如两个对象相加，则优先使用 valueOf 函数。</p>
</div></template>


