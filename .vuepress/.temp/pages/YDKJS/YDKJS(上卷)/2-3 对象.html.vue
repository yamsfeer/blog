<template><div><h1 id="对象" tabindex="-1"><a class="header-anchor" href="#对象"><span>对象</span></a></h1>
<h2 id="对象-1" tabindex="-1"><a class="header-anchor" href="#对象-1"><span>对象</span></a></h2>
<p>对象的两种定义形式：</p>
<ul>
<li>
<p>对象字面量：</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">key</span><span class="token operator">:</span> value
<span class="token punctuation">}</span>
</code></pre></div></li>
<li>
<p>对象构造</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Object</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
obj<span class="token punctuation">.</span>key <span class="token operator">=</span> value
</code></pre></div></li>
</ul>
<h3 id="javascript类型" tabindex="-1"><a class="header-anchor" href="#javascript类型"><span>JavaScript类型</span></a></h3>
<p>ES6以上版本的JavaScript有7中主要类型：</p>
<ul>
<li>string</li>
<li>number</li>
<li>boolean</li>
<li>null</li>
<li>undefined</li>
<li>symbol</li>
<li>object</li>
</ul>
<p>其中<code v-pre>string</code>、<code v-pre>number</code>、<code v-pre>boolean</code>、<code v-pre>null</code>、<code v-pre>undefined</code>、<code v-pre>symbol</code>为<strong>基本类型</strong>。</p>
<p><strong>有一种常见的错误说法是“JavaScript 中万物皆是对象”，这显然是错误的。</strong></p>
<p>JavaScript 中有许多特殊的对象子类型，我们可以称之为复杂基本类型。</p>
<ul>
<li>函数是对象的子类型，是<strong>可调用的对象</strong>。</li>
<li>数组是对象的子类型，<strong>具备一些额外的行为</strong>。比如具有下标。</li>
</ul>
<div class="hint-container warning">
<p class="hint-container-title">注意</p>
<p><code v-pre>typeof null</code>返回“object”是JavaScript的一个著名bug。</p>
<p>原理是这样的，不同的对象在底层都表示为二进制，在 JavaScript 中二进制前三位都为 0 的话会被判断为 object 类型。</p>
<p>null 的二进制表示是全 0，自然前三位也是 0，所以执行 typeof 时会返回“object”。</p>
</div>
<h3 id="javascript-内置对象" tabindex="-1"><a class="header-anchor" href="#javascript-内置对象"><span>JavaScript 内置对象</span></a></h3>
<p>JavaScript 中还有一些对象子类型，通常被称为内置对象。</p>
<p><em>内部标签 [object Array] 表示这是对象的子类型数组。</em></p>
<ul>
<li>String</li>
<li>Number</li>
<li>Boolean</li>
<li>Object</li>
<li>Function</li>
<li>Array</li>
<li>Date</li>
<li>RegExp</li>
<li>Error</li>
</ul>
<p>以上这些看起来类似于Java中的类，但是<strong>JavaScript中没有类</strong>。</p>
<p>它们只是可以使用new操作符的<strong>内置函数</strong>。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> strPrimitive <span class="token operator">=</span> <span class="token string">"I am a string"</span><span class="token punctuation">;</span>
<span class="token keyword">typeof</span> strPrimitive<span class="token punctuation">;</span> <span class="token comment">// "string"</span>
strPrimitive <span class="token keyword">instanceof</span> <span class="token class-name">String</span><span class="token punctuation">;</span> <span class="token comment">// 是字符串字面量，不是对象，且值不可变</span>

<span class="token keyword">var</span> strObject <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span> <span class="token string">"I am a string"</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">typeof</span> strObject<span class="token punctuation">;</span> <span class="token comment">// "object"</span>
strObject <span class="token keyword">instanceof</span> <span class="token class-name">String</span><span class="token punctuation">;</span> <span class="token comment">// true</span>

<span class="token comment">// 检查 sub-type 对象</span>
<span class="token class-name">Object</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span> strObject <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// [object String]</span>
</code></pre></div><p>原始值 &quot;I am a string&quot; 并不是一个对象，它只是一个字面量，并且是一个不可变的值。</p>
<p>如果要在这个字面量上执行一些操作，比如获取长度、访问其中某个字符等，那需要将其转换为 String 对象。</p>
<p><strong>在必要时语言会自动把字符串字面量转换成一个 String 对象</strong>，称之为&quot;<strong>装箱</strong>&quot;。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> strPrimitive <span class="token operator">=</span> <span class="token string">"I am a string"</span><span class="token punctuation">;</span>

<span class="token comment">// 字符串字面量是没有属性和方法的</span>
<span class="token comment">// 引擎自动装箱为String对象</span>
strPrimitive<span class="token punctuation">.</span>length <span class="token comment">// 13</span>
strPrimitive<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span> <span class="token number">3</span> <span class="token punctuation">)</span> <span class="token comment">// "m"</span>
</code></pre></div><ul>
<li>
<p><strong>null 和 undefined 没有对应的构造形式，它们只有文字形式。</strong></p>
</li>
<li>
<p><strong>Date 只有构造，没有文字形式。</strong></p>
</li>
<li>
<p>对于 Object、Array、Function 和 RegExp(正则表达式)来说，<strong>无论使用文字形式还是构造形式，它们都是对象，不是字面量</strong>。</p>
</li>
<li>
<p>通常我们<strong>首选更简单的文字形式</strong>。建议只在需要那些额外选项时使用构造形式。</p>
</li>
</ul>
</div></template>


