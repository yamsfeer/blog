<template><div><h1 id="atom" tabindex="-1"><a class="header-anchor" href="#atom"><span>Atom</span></a></h1>
<p>在 JavaScript 中，Atom 级的元素有以下几种：</p>
<ul>
<li>直接量 Literal</li>
<li>变量 Variable</li>
<li>关键字 Keywords</li>
<li>空格 Whitespace</li>
<li>换行符 Line Terminator</li>
</ul>
<h2 id="types" tabindex="-1"><a class="header-anchor" href="#types"><span>Types</span></a></h2>
<p>JavaScript 的类型包含以下几种：</p>
<ul>
<li>Number</li>
<li>String</li>
<li>Boolean</li>
<li>Null</li>
<li>Undefined</li>
<li>Symbol</li>
<li>BigInt</li>
<li>Object</li>
</ul>
<h3 id="number" tabindex="-1"><a class="header-anchor" href="#number"><span>Number</span></a></h3>
<p>Number 的语法：</p>
<ul>
<li>十进制 DecimalLiteral：0, 0.1,1e3</li>
<li>二进制 BinaryIntegerLiteral：0b111</li>
<li>八进制 OctalIntegerLiteral：0o10</li>
<li>十六进制 HexIntegerLiteral：0xff</li>
</ul>
<p>在运行时，JavaScript 采用 IEEE 754 标准存储一个 Number。Number 是一个双精度浮点数，它由以下几个部分组成：</p>
<div class="language-text" data-ext="text" data-title="text"><pre v-pre class="language-text"><code>1  个符号位
11 个指数位
52 个精度位
</code></pre></div><h3 id="string" tabindex="-1"><a class="header-anchor" href="#string"><span>String</span></a></h3>
<p>String 的语法：</p>
<ul>
<li>单引号：<code v-pre>'abc'</code></li>
<li>双引号：<code v-pre>&quot;abc&quot;</code></li>
<li>反引号模板字符串</li>
</ul>
<p>常见的字符集是 ascii unicode，常见的编码方式有 utf-8、utf-16。字符集的码点 ( code point ) 对应一个个字符，编码方式表示字符在内存中的保存方式。</p>
<h3 id="boolean" tabindex="-1"><a class="header-anchor" href="#boolean"><span>Boolean</span></a></h3>
<p>有 true 和 false 两种值。</p>
<h3 id="null" tabindex="-1"><a class="header-anchor" href="#null"><span>Null</span></a></h3>
<p>值得注意的是 <code v-pre>typeof null === 'object'</code>， 这是一个设计缺陷且不会被修复。</p>
<h3 id="undefined" tabindex="-1"><a class="header-anchor" href="#undefined"><span>Undefined</span></a></h3>
<p>undefined 表示声明但未被定义的值，而且它不是关键字，而是一个全局变量，这是另一个设计缺陷。</p>
<p>最简洁的得到 undefined 的值的方法：<code v-pre>void 0</code>，void 运算符不管后面跟什么，都返回 undefined。</p>
<h3 id="symbol" tabindex="-1"><a class="header-anchor" href="#symbol"><span>Symbol</span></a></h3>
<p><code v-pre>Symbol()</code> 返回一个唯一值，symbol 通常用作对象属性的 key，用于控制对属性的访问。</p>
<h3 id="object" tabindex="-1"><a class="header-anchor" href="#object"><span>Object</span></a></h3>
<p>对象是属性的集合，JavaScript 的对象由两部分组成：</p>
<ul>
<li>property</li>
<li>[[prototype]]</li>
</ul>
<p>property 是一个 key-value 对，其中 key 可以是 string 或 symbol。</p>
<p>property 有两种：数据属性、访问器属性。</p>
<table>
<thead>
<tr>
<th style="text-align:center">Attribute Name</th>
<th style="text-align:center">Types</th>
<th style="text-align:center">Default Value</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">[[value]]</td>
<td style="text-align:center">data property</td>
<td style="text-align:center">undefined</td>
</tr>
<tr>
<td style="text-align:center">[[writable]]</td>
<td style="text-align:center">data property</td>
<td style="text-align:center">false</td>
</tr>
<tr>
<td style="text-align:center">[[enumable]]</td>
<td style="text-align:center">data property or accessor property</td>
<td style="text-align:center">false</td>
</tr>
<tr>
<td style="text-align:center">[[configurable]]</td>
<td style="text-align:center">data property or accessor property</td>
<td style="text-align:center">false</td>
</tr>
<tr>
<td style="text-align:center">[[Get]]</td>
<td style="text-align:center">accessor property</td>
<td style="text-align:center">undefined</td>
</tr>
<tr>
<td style="text-align:center">[[Set]]</td>
<td style="text-align:center">accessor property</td>
<td style="text-align:center">undefined</td>
</tr>
</tbody>
</table>
<p>关于 Object 的 property 参考<a href="https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-property-attributes" target="_blank" rel="noopener noreferrer">文档<ExternalLinkIcon/></a>。</p>
<p>JavaScript 中面向对象的方式有两种：基于原型的、基于类的。</p>
<p>基于原型的 API：<code v-pre>Object.create</code>、<code v-pre>Object.setPrototypeOf</code>、<code v-pre>Object.getPrototypeOf</code></p>
<p>基于类的 API：<code v-pre>new, class, extends</code></p>
<h4 id="function" tabindex="-1"><a class="header-anchor" href="#function"><span>Function</span></a></h4>
<p>function 就是拥有 [[call]] 和 [[construct]] 两种内部属性的特殊对象。[[call]] 使得函数可以被调用，[[construct]] 使得函数可以使用 new 操作符。</p>
<h3 id="bigint" tabindex="-1"><a class="header-anchor" href="#bigint"><span>BigInt</span></a></h3>
</div></template>


