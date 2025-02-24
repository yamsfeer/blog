<template><div><h1 id="类型" tabindex="-1"><a class="header-anchor" href="#类型"><span>类型</span></a></h1>
<p><a href="http://www.ecma-international.org/ecma-262/5.1/" target="_blank" rel="noopener noreferrer">ES5.1<ExternalLinkIcon/></a>中对<em>类型</em>的定义：</p>
<blockquote>
<p>本规范中的运算法则所操纵的值均有相应的类型。本节中定义了所有可能出现的类型。ECMAScript 类型又进一步细分为语言类型和规范类型。</p>
<p>ECMAScript 语言中所有的值都有一个对应的语言类型。ECMAScript 语言类型包括 Undefined、Null、Boolean、String、Number 和 Object。</p>
</blockquote>
<p>本书中，我们这样来定义“类型”(与规范类似):</p>
<blockquote>
<p>对语言引擎和开发人员来说，类型是值的内部特征，它定义了值的行为，以使其区别于其他值。</p>
</blockquote>
<h2 id="理解类型的作用" tabindex="-1"><a class="header-anchor" href="#理解类型的作用"><span>理解类型的作用</span></a></h2>
<p><strong>要正确合理地进行类型转换(第 4 章)，我们必须掌握 JavaScript 中的各个类型及其内在行为。</strong></p>
<p>几乎所有的 JavaScript 程序都会涉及某种形式的强制类型转换，处理这些情况时我们需要有充分的把握和自信。</p>
<p>强制类型转换形式多样，有时方便，有时危险。全面掌握 JavaScript 的类型之后，才能正确对待和使用它们。</p>
<h2 id="内置类型和typeof操作" tabindex="-1"><a class="header-anchor" href="#内置类型和typeof操作"><span>内置类型和<code v-pre>typeof</code>操作</span></a></h2>
<p>JavaScript 有七种内置类型：</p>
<ul>
<li>string</li>
<li>boolean</li>
<li>number</li>
<li>undefined</li>
<li>null</li>
<li>symbol</li>
<li>object</li>
</ul>
<div class="hint-container tip">
<p class="hint-container-title">提示</p>
<p>除对象外，其余称为<strong>基本类型</strong></p>
</div>
<p>typeof总是会返回一个字符串，用typeof检查值的类型：</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">typeof</span> string       <span class="token comment">// "string"</span>
<span class="token keyword">typeof</span> boolean      <span class="token comment">// "boolean"</span>
<span class="token keyword">typeof</span> number       <span class="token comment">// "number"</span>
<span class="token keyword">typeof</span> <span class="token keyword">undefined</span>    <span class="token comment">// "undefined"</span>
<span class="token keyword">typeof</span> <span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token punctuation">)</span>     <span class="token comment">// "symbol"</span>
<span class="token keyword">typeof</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>           <span class="token comment">// "object"</span>

<span class="token comment">// 对象的子类型基本都返回 object</span>
<span class="token keyword">typeof</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>           <span class="token comment">// "object"</span>
<span class="token keyword">typeof</span> <span class="token operator">/</span>regexp<span class="token operator">/</span>     <span class="token comment">// "object"</span>
<span class="token keyword">typeof</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token comment">// "object"</span>
<span class="token keyword">typeof</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// "object"</span>

<span class="token comment">// 一些特殊情况</span>
<span class="token keyword">typeof</span> <span class="token keyword">null</span>         <span class="token comment">// "object"</span>
<span class="token keyword">typeof</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token comment">// "function"</span>
</code></pre></div><ul>
<li>
<p><code v-pre>typeof null === 'object'</code> 是一个由来已久的bug，但因为牵涉到太多的 Web 系统，一直未被修复。</p>
<p>可用<code v-pre>(!a &amp;&amp; typeof a === &quot;object&quot;)</code>判断null类型。</p>
</li>
<li>
<p><strong>function类型是 object 的一个“子类型”。</strong></p>
<p>具体来说，<strong>函数是“可调用对象”，它有一个内部属性 [[Call]]，该属性使其可以被调用。</strong></p>
</li>
<li>
<p>数组类型也是 object 的一个“子类型”。</p>
</li>
</ul>
<h2 id="值和类型" tabindex="-1"><a class="header-anchor" href="#值和类型"><span>值和类型</span></a></h2>
<p><strong>JavaScript 中的变量是没有类型的，只有值才有。</strong></p>
<p><strong>变量可以随时持有任何类型的值。</strong></p>
<p>在对变量执行 typeof 操作时，得到的并不是该变量的类型，而是<strong>该变量持有的值的类型</strong>，因为 JavaScript 中的变量没有类型。</p>
<h3 id="undefined-和-undeclared" tabindex="-1"><a class="header-anchor" href="#undefined-和-undeclared"><span>undefined 和 undeclared</span></a></h3>
<p>已在作用域中声明但还没有赋值的变量，是 <code v-pre>undefined</code> 的。</p>
<p>相反，还没有在作用域中声明过的变量，是 <code v-pre>undeclared</code> 的。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> a<span class="token punctuation">;</span>

a<span class="token punctuation">;</span> <span class="token comment">// undefined</span>
b<span class="token punctuation">;</span> <span class="token comment">// ReferenceError: b is not defined</span>

<span class="token keyword">typeof</span> a<span class="token punctuation">;</span> <span class="token comment">// "undefined"</span>
<span class="token keyword">typeof</span> b<span class="token punctuation">;</span> <span class="token comment">// "undefined"</span>
</code></pre></div><h3 id="typeof的安全防范机制" tabindex="-1"><a class="header-anchor" href="#typeof的安全防范机制"><span>typeof的安全防范机制</span></a></h3>
<p><code v-pre>typeof 一个未声明的变量</code> 返回 <code v-pre>undefined</code> 而不是报错或返回 <code v-pre>undeclared</code>之类的信息，这是因为typeof的安全防范机制。</p>
<p>在实际开发中，经常需要判断某个变量是否存在，这时这个安全防范机制就很有帮助。</p>
<p>参考以下代码：</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 这样会抛出错误</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>atob<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// ReferenceError: atob is not defined</span>
  <span class="token comment">// 依赖atob的代码</span>
<span class="token punctuation">}</span>
<span class="token comment">// 这样是安全的</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> atob <span class="token operator">===</span> <span class="token string">"undefined"</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 不写成 var atob = function() {} 是为了防止声明提升</span>
	<span class="token function-variable function">atob</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">/*..*/</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>从技术角度来说，typeof 的安全防范机制对于非全局变量也很管用，虽然这种情况并不多见，也有一些开发人员不大愿意这样做。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">void</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">function</span> <span class="token function">FeatureXYZ</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">/*.. my XYZ feature ..*/</span> <span class="token punctuation">}</span>
  
  <span class="token comment">// 其他程序可能只复制了doSomethingCool的代码，这会让FeatureXYZ为undefined</span>
	<span class="token keyword">function</span> <span class="token function">doSomethingCool</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> helper <span class="token operator">=</span>
       <span class="token punctuation">(</span><span class="token keyword">typeof</span> FeatureXYZ <span class="token operator">!==</span> <span class="token string">"undefined"</span><span class="token punctuation">)</span> <span class="token operator">?</span>
       <span class="token function-variable function">FeatureXYZ</span> <span class="token operator">:</span>
       <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">/*.. default feature ..*/</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token keyword">var</span> val <span class="token operator">=</span> <span class="token function">helper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// ..</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre></div><p>其他模块和程序引入 doSomethingCool 时，会检查 FeatureXYZ 是否已经在宿主程序中定义过，如果是，就用现成的，否则自己定义。</p>
<p>也可以用“依赖注入“的设计模式，就是将依赖通过参数显式地传递到函数中：</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">doSomethingCool</span><span class="token punctuation">(</span><span class="token parameter">FeatureXYZ</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> helper <span class="token operator">=</span> FeatureXYZ <span class="token operator">||</span>
     <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">/*.. default feature ..*/</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token keyword">var</span> val <span class="token operator">=</span> <span class="token function">helper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// ..</span>
<span class="token punctuation">}</span>
</code></pre></div><p>上述种种选择和方法各有利弊。好在 typeof 的安全防范机制为我们提供了更多选择。</p>
<h2 id="小结" tabindex="-1"><a class="header-anchor" href="#小结"><span>小结</span></a></h2>
<p>JavaScript 有七种内置类型：null、undefined、boolean、number、string、object 和symbol，可以使用 typeof 运算符来查看。</p>
<p><strong>变量没有类型，但它们持有的值有类型。类型定义了值的行为特征。</strong></p>
<p>在 JavaScript 中 undefined 和 undeclared 是两码事。 undefined 是值的一种。undeclared 则表示变量还没有被声明过。</p>
<p>遗憾的是，JavaScript 却将它们混为一谈，在我们试图访问 &quot;undeclared&quot; 变量时报错：ReferenceError: a is not defined，
并且 typeof 对 undefined 和 undeclared 变量都返回 &quot;undefined&quot;。</p>
<p>然而，通过 typeof 的安全防范机制(阻止报错)来检查 undeclared 变量，有时是个不错的办法。</p>
</div></template>


