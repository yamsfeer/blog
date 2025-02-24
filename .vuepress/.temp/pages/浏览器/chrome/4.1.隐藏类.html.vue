<template><div><h1 id="hidden-class" tabindex="-1"><a class="header-anchor" href="#hidden-class"><span>Hidden Class</span></a></h1>
<p>在介绍 hidden class 之前，需要先了解什么是 element 和 property</p>
<h2 id="element-和-property" tabindex="-1"><a class="header-anchor" href="#element-和-property"><span>element 和 property</span></a></h2>
<p>执行以下代码。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">Foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">this</span><span class="token punctuation">[</span><span class="token number">100</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">'100'</span>
  <span class="token keyword">this</span><span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">'3'</span>
	<span class="token keyword">this</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">'1'</span>
	<span class="token keyword">this</span><span class="token punctuation">[</span><span class="token string">"B"</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">'B'</span>
	<span class="token keyword">this</span><span class="token punctuation">[</span><span class="token string">"A"</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">'A'</span>
	<span class="token keyword">this</span><span class="token punctuation">[</span><span class="token string">"C"</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">'C'</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> bar <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">for</span><span class="token punctuation">(</span>key <span class="token keyword">in</span> bar<span class="token punctuation">)</span><span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">index:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>key<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> value:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>bar<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><p>输出结果为：</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token literal-property property">index</span><span class="token operator">:</span><span class="token number">1</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">1</span>
<span class="token literal-property property">index</span><span class="token operator">:</span><span class="token number">3</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">3</span>
<span class="token literal-property property">index</span><span class="token operator">:</span><span class="token number">100</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">100</span>
<span class="token literal-property property">index</span><span class="token operator">:</span><span class="token constant">B</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token constant">B</span>
<span class="token literal-property property">index</span><span class="token operator">:</span><span class="token constant">A</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token constant">A</span>
<span class="token literal-property property">index</span><span class="token operator">:</span><span class="token constant">C</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token constant">C</span>
</code></pre></div><p>观察结果，可以看出：</p>
<ul>
<li>
<p>数字属性被先打印，且按照数字大小打印</p>
</li>
<li>
<p>字符串属性按代码中顺序打印</p>
</li>
</ul>
<p>这是因为 ECMAScript 规范中定义了：数字属性按值大小升序排列，字符串属性按创建顺序排列。</p>
<p>V8 把对象的数字属性称为 elements，字符串属性称为 properties。</p>
<p>为提升存储和访问性能，V8 使用了两个线性数据结构保存 elements 和 properties。</p>
<img class="img-mid" src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/008i3skNgy1gwaejef67fj30vq0nijsu.jpg" style="zoom: 50%;" />
<p>访问对象属性时，V8 先在 elements 中顺序查找，然后在 properties 中查找。</p>
<h3 id="in-object-property" tabindex="-1"><a class="header-anchor" href="#in-object-property"><span>in-object property</span></a></h3>
<p>将字符串属性保存到 property 中，使得查找元素时需要先找到 property。虽然只是一步，但是对象属性访问是非常频繁的。</p>
<p>对此，V8 将部分 properties 直接存储到对象本身，称为 in-object properties。</p>
<img class="img-mid" src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/008i3skNgy1gwaejdypwaj30vq0dm0tl.jpg" style="zoom:67%;" />
<p>in-object property 最多有 10 个，超出的还是保存在 property。</p>
<img class="img-mid" src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/008i3skNgy1gwaejdh2n5j30vq0ocwgb.jpg" style="zoom:50%;" />
<h2 id="hidden-class-1" tabindex="-1"><a class="header-anchor" href="#hidden-class-1"><span>hidden class</span></a></h2>
<p>静态编译语言是根据属性的偏移量查找对象属性的。由于 JavaScript 对象可以在运行时改变，因此无法确定偏移量，只能在 element、property 查找。</p>
<p>隐藏类 ( hidden class ) 就是对偏移量访问属性的实现。</p>
<p>每个对象都有一个 map 属性指向它的隐藏类，它记录了属性相对于对象地址的偏移量。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> point <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">x</span><span class="token operator">:</span> <span class="token number">100</span><span class="token punctuation">,</span> <span class="token literal-property property">y</span><span class="token operator">:</span> <span class="token number">200</span> <span class="token punctuation">}</span>
</code></pre></div><p>point 对象的隐藏类如下。</p>
<img class="img-mid" src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/e6c9d24egy1h66elj1c06j20v00j4ta2.jpg" style="zoom:40%;" />
<p>访问对象属性时，先在隐藏类中找到偏移量，根据偏移量计算出属性的地址。与在 properties 中查找相比，大大提升了查找效率。</p>
<h3 id="多个对象共用隐藏类" tabindex="-1"><a class="header-anchor" href="#多个对象共用隐藏类"><span>多个对象共用隐藏类</span></a></h3>
<p>如果两个对象的 shape 相同 ( 属性名称、个数、顺序相同 )，它们可以共用同一个隐藏类。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> point <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">x</span><span class="token operator">:</span> <span class="token number">100</span><span class="token punctuation">,</span> <span class="token literal-property property">y</span><span class="token operator">:</span> <span class="token number">200</span> <span class="token punctuation">}</span>
<span class="token keyword">let</span> point2 <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">x</span><span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token literal-property property">y</span><span class="token operator">:</span> <span class="token number">4</span> <span class="token punctuation">}</span>
</code></pre></div><img class="img-mid" src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/e6c9d24egy1h66eznnz7pj20ny0i4gm8.jpg" alt="image-20220914203809619" style="zoom:50%;" />
<p>关于复用隐藏类，有以下几点需要注意：</p>
<ul>
<li>如果 shape 改变，需要重新创建隐藏类。</li>
<li>属性值的类型改变不会创建新的隐藏类。</li>
</ul>
<p>通过 <code v-pre>%DebugPrint(point)</code> 查看 point 的隐藏类地址。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> point <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token operator">%</span> <span class="token function">DebugPrint</span><span class="token punctuation">(</span>point<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 0x2c2a080499ad &lt;Object map = 0x2c2a082022d1></span>
point<span class="token punctuation">.</span>x <span class="token operator">=</span> <span class="token number">100</span><span class="token punctuation">;</span>
<span class="token operator">%</span> <span class="token function">DebugPrint</span><span class="token punctuation">(</span>point<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 0x2c2a080499ad &lt;Object map = 0x2c2a08207a79></span>
point<span class="token punctuation">.</span>y <span class="token operator">=</span> <span class="token number">200</span><span class="token punctuation">;</span>
<span class="token operator">%</span> <span class="token function">DebugPrint</span><span class="token punctuation">(</span>point<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 0x2c2a080499ad &lt;Object map = 0x2c2a08207aa1></span>

point<span class="token punctuation">.</span>y <span class="token operator">=</span> <span class="token string">'abc'</span><span class="token punctuation">;</span> <span class="token comment">// 改变值类型不会创建新的隐藏类</span>
<span class="token operator">%</span> <span class="token function">DebugPrint</span><span class="token punctuation">(</span>point<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 0x2c2a080499ad &lt;Object map = 0x2c2a08207aa1></span>
</code></pre></div><p>为了尽量利用隐藏类，需要做到以下几点：</p>
<ul>
<li>保持对象 shape 不变</li>
<li>一次性初始化全部对象属性</li>
<li>避免使用 delete 方法</li>
</ul>
</div></template>


