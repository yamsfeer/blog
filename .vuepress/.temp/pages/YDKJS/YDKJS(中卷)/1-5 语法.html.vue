<template><div><h1 id="语法" tabindex="-1"><a class="header-anchor" href="#语法"><span>语法</span></a></h1>
<div class="hint-container info">
<p class="hint-container-title">相关信息</p>
<p>语法(grammar)是本部分讨论的最后一个重点。</p>
</div>
<h2 id="语句与表达式" tabindex="-1"><a class="header-anchor" href="#语句与表达式"><span>语句与表达式</span></a></h2>
<p>开发人员常常将<code v-pre>“语句”(statement)</code>和<code v-pre>“表达式”(expression)</code>混为一谈，其实它们在 JavaScript 中存在一些重要差别。</p>
<blockquote>
<p>英语的语法：</p>
<p>句子”(sentence)是完整表达某个意思的一组词，由一个或多个“短语”(phrase)组成， 由标点符号或连接词(and 和 or 等)连接。</p>
<p>短语可以由更小的短语组成。有些短语是不完整的，不能独立表达意思；有些短语则相对完整，并且能够独立表达某个意思。</p>
</blockquote>
<p><strong>JavaScript 的语法也是如此，语句相当于句子，表达式相当于短语，运算符则相当于标点符号和连接词。</strong></p>
<p>JavaScript 中表达式可以返回一个结果值。例如:</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">3</span> <span class="token operator">*</span> <span class="token number">6</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> b <span class="token operator">=</span> a<span class="token punctuation">;</span>
b<span class="token punctuation">;</span>
</code></pre></div><p><code v-pre>3 * 6</code> 是一个表达式(结果为18)。</p>
<p>第二行的 <code v-pre>a</code>，第三行的 <code v-pre>b</code> 都是表达式，且结果值都是 18。</p>
<p><code v-pre>var a = 3 * 6</code> 和 <code v-pre>var b = a</code> 称为“声明语句” (declaration statement)，因为它们声明了变量(还可以为其赋值)。</p>
<p><code v-pre>a = 3 * 6</code> 和 <code v-pre>b = a</code> 叫作“赋值表达式”。</p>
<p>第三行代码中只有一个表达式 <code v-pre>b</code>，同时它也是一个语句(虽然没有太大意义)。这样的情况通常叫作“表达式语句”(expression statement)。</p>
<h3 id="语句的结果值" tabindex="-1"><a class="header-anchor" href="#语句的结果值"><span>语句的结果值</span></a></h3>
<p><strong>语句都有一个结果值(statement completion value，undefined 也算)。</strong></p>
<p>获得结果值最直接的方法是<strong>在浏览器开发控制台中输入语句</strong>，默认情况下控制台会显示所执行的最后一条语句的结果值。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> foo <span class="token operator">=</span> <span class="token number">20</span><span class="token punctuation">;</span> <span class="token comment">// 语句结果值为undefined</span>
foo <span class="token operator">=</span> <span class="token number">10</span> <span class="token operator">+</span> <span class="token number">10</span><span class="token punctuation">;</span> <span class="token comment">// 加法表达式结果值和整个语句结果值都为20</span>
</code></pre></div><p>代码块 { .. } 的结果值是其最后一个语句 / 表达式的结果，比如：</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> b<span class="token punctuation">;</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  b <span class="token operator">=</span> <span class="token number">1</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token comment">// 结果值为2</span>
</code></pre></div><p>一般来说，我们在代码中是没有办法获得语句的结果值的，但还是有两个方法可以获得：</p>
<ul>
<li>
<p>eval函数（不建议使用）</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> b<span class="token punctuation">;</span>
<span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token function">eval</span><span class="token punctuation">(</span> <span class="token string">"if (true) { b = 1; }"</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
a<span class="token punctuation">;</span> <span class="token comment">// 1</span>
</code></pre></div></li>
<li>
<p>ES7的“do表达式”</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> a<span class="token punctuation">,</span> b<span class="token punctuation">;</span>
a <span class="token operator">=</span> <span class="token keyword">do</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    b <span class="token operator">=</span> <span class="token number">4</span> <span class="token operator">+</span> <span class="token number">38</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
a<span class="token punctuation">;</span> <span class="token comment">// 42</span>
</code></pre></div><p>其目的是将语句当作表达式来处理(语句中可以包含其他语句)，从而不需要将语句封装为函数再调用 return 来返回值。</p>
<p>虽然目前语句的结果值还无关紧要，但随着 JavaScript 语言的演进，它可能会扮演越来越重要的角色。</p>
</li>
</ul>
<h3 id="表达式的副作用" tabindex="-1"><a class="header-anchor" href="#表达式的副作用"><span>表达式的副作用</span></a></h3>
<p>首先说明什么是表达式的副作用，参考以下代码：</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> b <span class="token operator">=</span> a <span class="token operator">+</span> <span class="token number">3</span><span class="token punctuation">;</span> <span class="token comment">// 加法表达式 a + 3 本身没有副作用(比如改变a的值)</span>

<span class="token comment">// 最常见的有副作用(也可能没有)的表达式是函数调用</span>
<span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  a <span class="token operator">=</span> a <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 结果值：undefined，副作用：a的值被改变。</span>

<span class="token comment">// 递增运算符 ++ 和递减运算符 -- 会有副作用</span>
<span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">42</span><span class="token punctuation">;</span>
a<span class="token operator">++</span><span class="token punctuation">;</span> <span class="token comment">// 42</span>
<span class="token operator">++</span>a<span class="token punctuation">;</span> <span class="token comment">// 44</span>
</code></pre></div><p>多个赋值语句串联时(链式赋值，chained assignment)，赋值表达式和语句的结果值就能派上用场，比如：</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> a<span class="token punctuation">,</span> b<span class="token punctuation">,</span> c<span class="token punctuation">;</span>
a <span class="token operator">=</span> b <span class="token operator">=</span> c <span class="token operator">=</span> <span class="token number">42</span><span class="token punctuation">;</span>
</code></pre></div><ul>
<li><code v-pre>c = 42</code> 的结果值为42，副作用是将c赋值42</li>
<li><code v-pre>b = c</code> 的结果值为42，副作用是将 b 赋值 42</li>
<li><code v-pre>a = b</code> 的结果值为42，副作用是将 a 赋值 42。</li>
</ul>
<p>利用赋值表达式的副作用合并if条件：</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> str<span class="token punctuation">,</span> matches<span class="token punctuation">;</span>

<span class="token comment">// 一般写法</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>str<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  matches <span class="token operator">=</span> str<span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">[aeiou]</span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>matches<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> matches<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 合并，将 matches = str.match 放到括号中是必要的，参考运算符优先级</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>str <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span>matches <span class="token operator">=</span> str<span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">[aeiou]</span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span> <span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> matches<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="上下文规则" tabindex="-1"><a class="header-anchor" href="#上下文规则"><span>上下文规则</span></a></h3>
<p>在 JavaScript 语法规则中，有时候同样的语法在不同的情况下会有不同的解释。</p>
<p>这里以 <code v-pre>{...}</code> 为例，总结它可能出现的情况（即解释当出现 <code v-pre>{}</code> 时，JavaScript的语法怎么解读）。</p>
<ul>
<li>
<p>对象字面量：<code v-pre>var obj = {...}</code></p>
</li>
<li>
<p>代码块：<code v-pre>{ let a = 0 }</code></p>
</li>
<li>
<p>对象解构:  <code v-pre>var { a, b } = { a: 1, b: 2}</code></p>
</li>
<li>
<p><code v-pre>if - else</code> 语句： <code v-pre>if (true) { ... }</code></p>
</li>
</ul>
<h2 id="运算符优先级" tabindex="-1"><a class="header-anchor" href="#运算符优先级"><span>运算符优先级</span></a></h2>
<h2 id="自动分号" tabindex="-1"><a class="header-anchor" href="#自动分号"><span>自动分号</span></a></h2>
<h2 id="错误" tabindex="-1"><a class="header-anchor" href="#错误"><span>错误</span></a></h2>
<h2 id="函数参数" tabindex="-1"><a class="header-anchor" href="#函数参数"><span>函数参数</span></a></h2>
<h2 id="try-catch" tabindex="-1"><a class="header-anchor" href="#try-catch"><span><code v-pre>try / catch</code></span></a></h2>
<h2 id="switch" tabindex="-1"><a class="header-anchor" href="#switch"><span><code v-pre>switch</code></span></a></h2>
<h2 id="小结" tabindex="-1"><a class="header-anchor" href="#小结"><span>小结</span></a></h2>
<ul>
<li>
<p>语句就像英语中的句子，表达式就像短语。表达式可以是简单独立的，否则可能会产生副作用。</p>
</li>
<li>
<p>JavaScript语法规则之上是语义规则(也称作上下文)。</p>
<p>例如，<code v-pre>{ }</code>在不同情况下，可以是语句块、对象常量、解构赋值或者命名函数参数解构。</p>
</li>
<li>
<p>JavaScript 详细定义了运算符的优先级(运算符执行的先后顺序)和关联(多个运算符的 组合方式)。</p>
<p>只要熟练掌握了这些规则，就能对如何合理地运用它们作出自己的判断。</p>
</li>
<li>
<p>ASI(自动分号插入)是 JavaScript 引擎的代码解析纠错机制，它会在需要的地方自动插入分号来纠正解析错误。</p>
</li>
<li>
<p>JavaScript 中有很多错误类型，分为两大类：</p>
<ul>
<li>早期错误(编译时错误，无法被捕获)</li>
<li>运行时错误(可以通过 try..catch 来捕获)。</li>
</ul>
<p>所有语法错误都是早期错误，程序有语法错误则无法运行。</p>
</li>
<li>
<p>尽量不要使用 arguments</p>
</li>
<li>
<p>finally 中代码的处理顺序需要特别注意。</p>
</li>
<li>
<p>switch相对于if..else if..来说更为简洁。需要注意的一点是，如果对其理解得不够透彻，稍不注意就很容易出错。</p>
</li>
</ul>
</div></template>


