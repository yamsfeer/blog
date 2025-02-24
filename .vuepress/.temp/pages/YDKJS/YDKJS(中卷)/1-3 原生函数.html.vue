<template><div><h1 id="原生函数" tabindex="-1"><a class="header-anchor" href="#原生函数"><span>原生函数</span></a></h1>
<p>原生函数（native function）又称内建函数（built-in function）。</p>
<p>常用的原生函数有：</p>
<ul>
<li>String()</li>
<li>Number()</li>
<li>Boolean()</li>
<li>Array()</li>
<li>Object()</li>
<li>Function()</li>
<li>RegExp()</li>
<li>Date()</li>
<li>Error()</li>
<li>Symbol()</li>
</ul>
<p>以String为例：</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> foo <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span><span class="token string">'abc'</span><span class="token punctuation">)</span>
<span class="token keyword">typeof</span> foo <span class="token comment">// 'object'</span>
foo <span class="token keyword">instanceof</span> <span class="token class-name">String</span> <span class="token comment">// true</span>
<span class="token class-name">Object</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span> foo <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// "[object String]"</span>
</code></pre></div><p><strong><code v-pre>new String(&quot;abc&quot;)</code> 创建的是字符串 &quot;abc&quot; 的封装对象，而非基本类型值 &quot;abc&quot;。</strong></p>
<h2 id="内部属性-class" tabindex="-1"><a class="header-anchor" href="#内部属性-class"><span>内部属性[[class]]</span></a></h2>
<p>所有 typeof 返回值为 &quot;object&quot; 的对象(如数组)都包含一个内部属性 <code v-pre>[[Class]]</code>。</p>
<p>这个属性无法直接访问， 一般通过 <code v-pre>Object.prototype.toString</code> 来查看。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token class-name">Object</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">]</span> <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// "[object Array]"</span>
<span class="token class-name">Object</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">regex-literal</span><span class="token regex-delimiter">/</span><span class="token regex-flags">i</span></span> <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// "[object RegExp]"</span>

<span class="token class-name">Object</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span> <span class="token keyword">null</span> <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// "[object Null]"</span>
<span class="token class-name">Object</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span> <span class="token keyword">undefined</span> <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// "[object Undefined]"</span>

<span class="token comment">// 基本类型值被各自的封装对象自动包装，所以它们的内部 [[Class]] 属性值分别为 "String"、"Number" 和 "Boolean"</span>
<span class="token class-name">Object</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span> <span class="token string">"abc"</span> <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// "[object String]"</span>
<span class="token class-name">Object</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span> <span class="token number">42</span> <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// "[object Number]"</span>
<span class="token class-name">Object</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span> <span class="token boolean">true</span> <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// "[object Boolean]"</span>
</code></pre></div><h2 id="包装对象-boxing-与拆封-unboxing" tabindex="-1"><a class="header-anchor" href="#包装对象-boxing-与拆封-unboxing"><span>包装对象（boxing）与拆封（unboxing）</span></a></h2>
<p>基本类型值没有属性和方法，需要通过封装对象才能访问，JavaScript 会在需要时自动为基本类型值包装一个封装对象。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token string">"abc"</span><span class="token punctuation">;</span>

<span class="token comment">// 包装对象才有属性访问，JS会自动包装成对象</span>
a<span class="token punctuation">.</span>length<span class="token punctuation">;</span> <span class="token comment">// 3</span>
a<span class="token punctuation">.</span><span class="token function">toUpperCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// "ABC"</span>
</code></pre></div><p><strong>一般情况下，我们不需要直接使用封装对象</strong>。最好的办法是让 JavaScript 引擎自己决定什么时候应该使用封装对象。</p>
<p>所以应该优先考虑使用 &quot;abc&quot; 和 42 这样的基本类型值，而非 new String(&quot;abc&quot;) 和 new Number(42)。</p>
<p><code v-pre> valueOf</code> 函数可以得到包装对象中的基本类型值。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span> <span class="token string">"abc"</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
a<span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// "abc"</span>
</code></pre></div><p>在需要用到封装对象中的基本类型值的地方会发生<strong>隐式拆封，即强制类型转换</strong>。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span> <span class="token string">"abc"</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> b <span class="token operator">=</span> a <span class="token operator">+</span> <span class="token string">""</span><span class="token punctuation">;</span> <span class="token comment">// 这里发生了拆封，即强制类型转换</span>
<span class="token keyword">typeof</span> a<span class="token punctuation">;</span> <span class="token comment">// "object"</span>
<span class="token keyword">typeof</span> b<span class="token punctuation">;</span> <span class="token comment">// "string"</span>
</code></pre></div><h2 id="原生函数作为构造函数" tabindex="-1"><a class="header-anchor" href="#原生函数作为构造函数"><span>原生函数作为构造函数</span></a></h2>
<p>对于数组、对象、函数、正则表达式，<strong>推荐使用字面量的形式创建</strong>。</p>
<p>应该尽量避免使用构造函数，他们经常会产生意外效果。</p>
<h3 id="array" tabindex="-1"><a class="header-anchor" href="#array"><span>Array</span></a></h3>
<p>使用<code v-pre>new Array(length)</code>创建数组可以预设数组长度，但是必须注意“空单元”的问题。</p>
<p>预设长度只是将数组对象的length属性设置为length，但事实上<strong>数组中不存在任何元素</strong>。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> arr <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Array</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 相当于</span>
<span class="token keyword">var</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
arr<span class="token punctuation">.</span>length <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>

<span class="token comment">// arr有3个空单元</span>
arr <span class="token comment">// chrome: [empty × 3] , firefox: Array [&lt;3 empty slots>]</span>
</code></pre></div><p><em><em>注意</em>“空单元”<em>和</em>“元素为undefined”<em>是不同的。</em></em></p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Array</span><span class="token punctuation">(</span> <span class="token number">3</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> b <span class="token operator">=</span> <span class="token punctuation">[</span> <span class="token keyword">undefined</span><span class="token punctuation">,</span> <span class="token keyword">undefined</span><span class="token punctuation">,</span> <span class="token keyword">undefined</span> <span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token comment">// join函数会使用length属性做循环</span>
a<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span> <span class="token string">"-"</span> <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// "--"</span>
b<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span> <span class="token string">"-"</span> <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// "--"</span>

<span class="token comment">// map函数只关心元素是否存在，即是这个元素的值是undefined</span>
a<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">v<span class="token punctuation">,</span>i</span><span class="token punctuation">)</span> <span class="token operator">=></span> i<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// [ undefined x 3 ]</span>
b<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">v<span class="token punctuation">,</span>i</span><span class="token punctuation">)</span> <span class="token operator">=></span> i<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// [ 0, 1, 2 ]</span>
</code></pre></div><div class="hint-container caution">
<p class="hint-container-title">警告</p>
<p><strong>总之，永远不要创建和使用空单元数组。</strong></p>
</div>
<h3 id="object、function、regexp" tabindex="-1"><a class="header-anchor" href="#object、function、regexp"><span>Object、Function、RegExp</span></a></h3>
<p>除非万不得已，否则尽量不要使用 Object、Function、RegExp，建议使用字面量创建：</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token keyword">var</span> <span class="token function-variable function">fun</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token function">fun</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">fun</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token keyword">var</span> regexp <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">regexp</span><span class="token regex-delimiter">/</span><span class="token regex-flags">ig</span></span>
</code></pre></div><h3 id="date、error" tabindex="-1"><a class="header-anchor" href="#date、error"><span>Date、Error</span></a></h3>
<p><code v-pre>Date、Error</code>没有字面量创建的形式，只能使用构造函数创建。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> date <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">if</span> <span class="token punctuation">(</span>somethingWrong<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">'error-message'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="symbol" tabindex="-1"><a class="header-anchor" href="#symbol"><span>Symbol</span></a></h3>
<p><code v-pre>Symbol</code>没有字面量形式，且不能带new关键字创建：</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> sym <span class="token operator">=</span> <span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token string">'sym'</span><span class="token punctuation">)</span>
sym<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Symbol(sym)</span>
<span class="token keyword">typeof</span> sym<span class="token punctuation">;</span> <span class="token comment">// "symbol"</span>

<span class="token keyword">var</span> foo <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token punctuation">[</span>mysym<span class="token punctuation">]</span><span class="token operator">:</span> <span class="token string">'foo'</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
Object<span class="token punctuation">.</span><span class="token function">getOwnPropertySymbols</span><span class="token punctuation">(</span> a <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// [ Symbol(sym) ]</span>
</code></pre></div><h3 id="原生函数的prototype属性" tabindex="-1"><a class="header-anchor" href="#原生函数的prototype属性"><span>原生函数的prototype属性</span></a></h3>
<p>原生构造函数有自己的 .prototype 对象，如 Array.prototype、String.prototype 等。</p>
<p><em>根据文档约定， 我们将 String.prototype.XYZ 简写为 String#XYZ， 对其他 .prototypes 也同样如此。</em></p>
<ul>
<li>String#indexOf(..) 在字符串中找到指定子字符串的位置。</li>
<li>String#charAt(..) 获得字符串指定位置上的字符。</li>
<li>String#substr(..)、String#substring(..) 和 String#slice(..) 获得字符串的指定部分。</li>
<li>String#toUpperCase() 和 String#toLowerCase() 将字符串转换为大写或小写。</li>
<li>String#trim() 去掉字符串前后的空格，返回新的字符串。</li>
</ul>
<p>几个特殊例子：</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">typeof</span> <span class="token class-name">Function</span><span class="token punctuation">.</span>prototype<span class="token punctuation">;</span> <span class="token comment">// "function"</span>
<span class="token class-name">Function</span><span class="token punctuation">.</span><span class="token function">prototype</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 空函数</span>

<span class="token class-name">RegExp</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// "/(?:)/"——空正则表达式</span>
<span class="token string">"abc"</span><span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span> <span class="token class-name">RegExp</span><span class="token punctuation">.</span>prototype <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// [""]</span>
</code></pre></div><h2 id="小结" tabindex="-1"><a class="header-anchor" href="#小结"><span>小结</span></a></h2>
<p>JavaScript 为基本数据类型值提供了封装对象，称为原生函数(如 String、Number、Boolean 等)。</p>
<p>访问<code v-pre>内部属性[[class]]</code>，可以使用toString方法，比如<code v-pre>Object.prototype.toString.call([])</code>。</p>
<p>对于基本类型值，比如<code v-pre>'abc'</code>，如果要访问它的属性或方法，JavaScript 引擎会自动对该值进行包装。</p>
<p>不到万不得已，不要使用构造函数创建对象，比如<code v-pre>new Array()</code>，而是用字面量的形式，比如<code v-pre>var arr = []</code>。</p>
</div></template>


