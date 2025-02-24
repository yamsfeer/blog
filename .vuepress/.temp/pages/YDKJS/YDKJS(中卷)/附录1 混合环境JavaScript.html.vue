<template><div><h1 id="混合环境javascript" tabindex="-1"><a class="header-anchor" href="#混合环境javascript"><span>混合环境JavaScript</span></a></h1>
<p>JavaScript 程序几乎总是在宿主环境中运行，这使得它在一定程度上变得不可预测。</p>
<p>比如：当你的代码在不同的 JavaScript 引擎上运行时，有些地方就会出现差异。</p>
<p>下面将介绍这些差异。</p>
<h2 id="annex-b" tabindex="-1"><a class="header-anchor" href="#annex-b"><span>Annex B</span></a></h2>
<p>JavaScript 语言的官方名称是 ECMAScript，JavaScript 是 ECMAScript 的通用称谓。</p>
<p>确切地说，<strong><em>JavaScript</em> 是 <em>ECMAScript规范</em> 在浏览器上的实现。</strong></p>
<p>ECMAScript 规范包括 Annex B，其中介绍了由于浏览器兼容性问题导致的与官方规范的差异。</p>
<p>因此，可以认为以下这几点只会出现在浏览器，而不会出现在<em>Node.js、Rhino</em>等环境中。</p>
<ul>
<li>
<p>在非严格模式中允许八进制数值常量存在，如 0123(即十进制的 83)。</p>
</li>
<li>
<p><code v-pre>window.escape</code> 和 <code v-pre>window.unescape</code> 让你能够转义(escape)和回转(unescape)</p>
<p>带有%分隔符的十六进制字符串。例如，window.escape( &quot;? foo=97%&amp;bar=3%&quot; )的结果</p>
<p>为 &quot;%3Ffoo%3D97%25%26bar%3D3%25&quot;。</p>
</li>
<li>
<p><code v-pre>String.prototype.substr</code> 和 <code v-pre>String.prototype.substring</code> 十分相似，除了前者的第二个</p>
<p>参数是结束位置索引(非自包含)，后者的第二个参数是长度(需要包含的字符数)。</p>
</li>
</ul>
<h2 id="web-ecmascript" tabindex="-1"><a class="header-anchor" href="#web-ecmascript"><span>Web ECMAScript</span></a></h2>
<p><a href="https://javascript.spec.whatwg.org" target="_blank" rel="noopener noreferrer">Web ECMAScript 规范<ExternalLinkIcon/></a>中介绍了官方ECMAScript 规范和目前基于浏览器的 JavaScript 实现之间的差异。</p>
<p>通常来说，出现这些差异的情况很少，所以了解即可。以下内容在实际开发中很少使用，也不推荐。</p>
<ul>
<li>
<p><code v-pre>&lt;!-- 和 --&gt;</code> 是合法的单行注释分隔符。</p>
</li>
<li>
<p>String.prototype 中返回HTML格式字符串的附加方法:anchor(..)、big(..)、</p>
<p>blink(..)、bold(..)、fixed(..)、fontcolor(..)、fontsize(..)、italics(..)、 link(..)、small(..)、strike(..) 和 sub(..)。</p>
</li>
<li>
<p>RegExp 扩展：<code v-pre>RegExp.$1</code> ... <code v-pre>RegExp.$9</code>(匹配组)和 <code v-pre>RegExp.lastMatch/RegExp[&quot;$&amp;&quot;]</code>(最近匹配)。</p>
</li>
<li>
<p>Function.prototype 附加方法：</p>
<p><code v-pre>Function.prototype.arguments</code>(别名为 arguments 对象) 和 <code v-pre>Function.caller</code>(别名为 arguments.caller)。</p>
</li>
</ul>
<h2 id="宿主对象" tabindex="-1"><a class="header-anchor" href="#宿主对象"><span>宿主对象</span></a></h2>
<p>宿主对象(包括内建对象和函数)是由宿主环境，比如 <em>浏览器、Node.js</em>，创建并提供给 JavaScript 引擎的变量。</p>
<p>考虑一下代码：</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> div <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span> <span class="token string">"div"</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">typeof</span> div<span class="token punctuation">;</span> <span class="token comment">// "object"</span>
<span class="token class-name">Object</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span> div <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// "[object HTMLDivElement]"</span>
div<span class="token punctuation">.</span>tagName<span class="token punctuation">;</span> <span class="token comment">// "DIV"</span>
</code></pre></div><p>上述例子中，<code v-pre>div</code> 是一个特殊的宿主对象，它是一个 DOM 元素。</p>
<p>其内部的 <code v-pre>[[Class]]</code> 值为 <code v-pre>HTMLDivElement</code>，来自预定义的属性(通常也是不可更改的)。</p>
<p>其他需要注意的宿主对象的行为差异有:</p>
<ul>
<li>无法访问正常的 object 内建方法，如 toString();</li>
<li>无法写覆盖;</li>
<li>包含一些预定义的只读属性;</li>
<li>包含无法将 this 重载为其他对象的方法;</li>
<li>其他</li>
</ul>
<p>在针对运行环境进行编码时，宿主对象扮演着一个十分关键的角色，但要特别注意其行为特性，因为它们常常有别于普通的 JavaScript object。</p>
<h3 id="console-对象" tabindex="-1"><a class="header-anchor" href="#console-对象"><span>console 对象</span></a></h3>
<p>console 对象由宿主环境提供，以便从代码中输出各种值。</p>
<ul>
<li>
<p>console 在浏览器中是输出到 <strong>开发工具控制台</strong></p>
</li>
<li>
<p>在 Node.js 中，则是指向 JavaScript 环境系统进程的 <strong>标准输出(stdout)</strong> 和 <strong>标准错误输出(stderr)</strong>。</p>
</li>
</ul>
<h2 id="全局-dom-变量" tabindex="-1"><a class="header-anchor" href="#全局-dom-变量"><span>全局 DOM 变量</span></a></h2>
<p>这是一个浏览器演进的历史遗留问题：在创建带有 id 属性的 DOM 元素时也会创建同名的全局变量。</p>
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>foo<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre></div><div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> foo <span class="token operator">==</span> <span class="token string">"undefined"</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  foo <span class="token operator">=</span> <span class="token number">42</span><span class="token punctuation">;</span> <span class="token comment">// 永远也不会运行</span>
<span class="token punctuation">}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> foo <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// HTML元素</span>
</code></pre></div><p>##原生原型</p>
<p><strong>尽量不要拓展原生原型。</strong></p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token comment">// Netscape 4没有Array.push</span>
<span class="token class-name">Array</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">push</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">item</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">[</span><span class="token keyword">this</span><span class="token punctuation">.</span>length<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> item<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// 上面的push不能添加多个元素，比如[].push(1, 2, 3)</span>
<span class="token comment">// 而且会覆盖高版本浏览器提供的push方法</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token class-name">Array</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>push<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	Array<span class="token punctuation">.</span>push <span class="token class-name">Array</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">push</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">item</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">[</span><span class="token keyword">this</span><span class="token punctuation">.</span>length<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> item<span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="script" tabindex="-1"><a class="header-anchor" href="#script"><span><code v-pre>&lt;script&gt;</code></span></a></h2>
<p>web应用程序中加载Javascript代码的两种方式：</p>
<ul>
<li><code v-pre>&lt;script src='url'&gt;&lt;/script&gt;</code></li>
<li><code v-pre>&lt;script&gt; /* javascript代码 */&lt;/script&gt;</code></li>
</ul>
<p>对于这两种方式加载进来的JavaScript代码：</p>
<ul>
<li>
<p>它们共享 global 对象(在浏览器中则是 window)，也就是说<strong>这些文件中的代码在共享的命名空间中运行，并相互交互</strong>。</p>
<p>但是<em>变量作用域的提升机制</em>在这些边界中不适用。</p>
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code>&lt;-- 以下代码未声明就使用 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>--</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript"><span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript"> <span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span> </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>--</span> <span class="token attr-name">以下代码可用</span> <span class="token attr-name">--</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
  <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
  <span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript"><span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
</code></pre></div></li>
<li>
<p>如果 script 中的代码(无论是内联代码还是外部代码)发生错误，它会像独立的 JavaScript 程序那样停止，</p>
<p>但是后续的 script 中的代码依然会<strong>继续运行</strong>。</p>
</li>
<li>
<p>动态加载JavaScript代码</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> greeting <span class="token operator">=</span> <span class="token string">"Hello World"</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> el <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span> <span class="token string">"script"</span> <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 创建script标签</span>

el<span class="token punctuation">.</span>text <span class="token operator">=</span> <span class="token string">"function foo(){ alert( greeting )} setTimeout( foo, 1000 );"</span><span class="token punctuation">;</span> <span class="token comment">// 设置script代码内容</span>
<span class="token comment">// 或者</span>
el<span class="token punctuation">.</span>src <span class="token operator">=</span> <span class="token string">'url-to-script-file'</span> <span class="token comment">// 设置为一个URL文件，动态加载外部文件</span>

document<span class="token punctuation">.</span>body<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span> el <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 添加标签</span>
</code></pre></div></li>
<li>
<p>对于外部文件，会根据代码文件的字符集属性(UTF-8、ISO-8859-8 等)来解析外部文件中的代码(或者默认字符集)。</p>
<p>对于内联代码，则使用其所在页面文件的字符集 (或者默认字符集)。<em>内联代码的 script 标签没有 charset 属性</em>。</p>
</li>
</ul>
<h2 id="保留字" tabindex="-1"><a class="header-anchor" href="#保留字"><span>保留字</span></a></h2>
<p>ES5 规范在 7.6.1 节中定义了一些“保留字”，我们不能将它们用作变量名。</p>
<ul>
<li>关键字：比如<code v-pre>function</code></li>
<li>预留关键字：比如<code v-pre>enum</code></li>
<li><code v-pre>null、true、false</code>等</li>
</ul>
<h2 id="实现中的限制" tabindex="-1"><a class="header-anchor" href="#实现中的限制"><span>实现中的限制</span></a></h2>
<p>JavaScript 规范对于函数中参数的个数，以及字符串常量的长度等并没有限制。但是由于JavaScript 引擎实现各异，规范在某些地方有一些限制。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">sum</span><span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>args</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> sum <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
  <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> args<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
 		sum <span class="token operator">+=</span> i<span class="token punctuation">;</span>   
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> sum<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> nums <span class="token operator">=</span> <span class="token function">Array</span><span class="token punctuation">(</span><span class="token number">100000</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">fill</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">item<span class="token punctuation">,</span> i</span><span class="token punctuation">)</span> <span class="token operator">=></span> i<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">sum</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 12</span>
<span class="token function">sum</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> nums<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 应该是: 499950000</span>
</code></pre></div><p>在一些 JavaScript 引擎中你会得到正确答案 499950000，而另外一些引擎(如 Safari 6.x)中则会产生错误<code v-pre>“RangeError: Maximum call stack size exceeded”</code>。</p>
<p>下面列出一些已知的限制:</p>
<ul>
<li>字符串常量中允许的最大字符数(并非只是针对字符串值);</li>
<li>可以作为参数传递到函数中的数据大小(也称为栈大小，以字节为单位);</li>
<li>函数声明中的参数个数;</li>
<li>未经优化的调用栈(例如递归)的最大层数，即函数调用链的最大长度;</li>
<li>JavaScript 程序以阻塞方式在浏览器中运行的最长时间(秒);</li>
<li>变量名的最大长度。</li>
</ul>
<h2 id="小结" tabindex="-1"><a class="header-anchor" href="#小结"><span>小结</span></a></h2>
<ul>
<li>
<p><code v-pre>Annex B</code> 介绍了由于浏览器兼容性问题导致的与官方规范的差异。</p>
</li>
<li>
<p><code v-pre>Web ECMAScript</code> 介绍了官方ECMAScript 规范和目前基于浏览器的 JavaScript 实现之间的差异。</p>
</li>
<li>
<p>JavaScript通常运行在宿主环境中，而宿主通常会提供一些该环境下特有的宿主对象，比如<code v-pre>document、window</code>。</p>
</li>
<li>
<p>在浏览器中，由于浏览器演进的历史遗留问题，在创建带有 id 属性的 DOM 元素时也会创建同名的全局变量。</p>
</li>
<li>
<p>不要扩展原生原型。</p>
</li>
<li>
<p>Web应用程序中加载JavaScript有两种方式，它们之间共享全局变量，并相互交互。</p>
</li>
<li>
<p>保留字有四类：“关键字”、“预留关键字”、null 常量、true/false 布尔常量</p>
</li>
<li>
<p>JavaScript 引擎实现各异，应该了解他们之间对规范作出的限制的差异。</p>
</li>
</ul>
</div></template>


