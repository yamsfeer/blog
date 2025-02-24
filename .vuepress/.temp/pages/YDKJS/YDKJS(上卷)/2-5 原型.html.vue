<template><div><h1 id="原型" tabindex="-1"><a class="header-anchor" href="#原型"><span>原型</span></a></h1>
<p><em>第 4 章中介绍的所有模拟类复制行为的方法，如各种混入，都没有使用 [[Prototype]] 链机制。</em></p>
<h2 id="prototype" tabindex="-1"><a class="header-anchor" href="#prototype"><span>[[Prototype]]</span></a></h2>
<p>[[Prototype]] 是JavaScript 对象的一个特殊<strong>内置属性</strong>。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> myObject <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> anotherObject <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>myObject<span class="token punctuation">)</span><span class="token punctuation">;</span>

anotherObject<span class="token punctuation">.</span>a <span class="token comment">// 2</span>
Object<span class="token punctuation">.</span><span class="token function">getPrototypeOf</span><span class="token punctuation">(</span>anotherObject<span class="token punctuation">)</span> <span class="token operator">===</span> myObject <span class="token comment">// true</span>

<span class="token keyword">let</span> obj <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
Object<span class="token punctuation">.</span><span class="token function">getPrototypeOf</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// null</span>
</code></pre></div><h3 id="查找属性与原型链" tabindex="-1"><a class="header-anchor" href="#查找属性与原型链"><span>查找属性与原型链</span></a></h3>
<p>引用对象的属性时会触发 [[Get]] 操作，比如<code v-pre>obj.a</code>。忽略<code v-pre>proxy</code>的情况下，[[Get]]操作的具体步骤为：</p>
<ol>
<li>检查对象本身收否有该属性</li>
<li>如果本身没有，则沿原型链向上查找</li>
<li>如果整条原型链上也没有，返回undefined</li>
</ol>
<p><code v-pre>for-in</code>循环和<code v-pre>in</code>操作也会查找原型链，它们的区别在于<code v-pre>for-in</code>访问的是可枚举的属性（enumerable: true），而<code v-pre>in</code>操作不需要。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> proto <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span>proto<span class="token punctuation">,</span> <span class="token string">'a'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
  <span class="token literal-property property">enumerable</span><span class="token operator">:</span> <span class="token boolean">false</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">var</span> obj <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>proto<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">var</span> key <span class="token keyword">in</span> obj<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 无法枚举到a</span>
<span class="token punctuation">}</span>

<span class="token string">'a'</span> <span class="token keyword">in</span> obj<span class="token punctuation">;</span> <span class="token comment">// true</span>
</code></pre></div><h3 id="属性设置和屏蔽" tabindex="-1"><a class="header-anchor" href="#属性设置和屏蔽"><span>属性设置和屏蔽</span></a></h3>
<p>当属性不直接存在于对象，而是存在于原型链上时，情况有点复杂。</p>
<ol>
<li>
<p>如果在[[Prototype]]链上层存在名为foo的普通数据访问属性并且<strong>没有被标记为只读(writable:false)</strong>，那就会直接在 myObject 中添加一个名为 foo 的新属性，它是屏蔽属性。</p>
</li>
<li>
<p>如果在[[Prototype]]链上层存在foo，但是它被标记为只读(writable:false)，那么无法修改已有属性或者在 obj 上创建屏蔽属性。</p>
<p>如果运行在严格模式下，代码会抛出一个错误。</p>
<p>否则，这条赋值语句会被忽略。总之，不会发生屏蔽。</p>
</li>
<li>
<p>如果在[[Prototype]]链上层存在foo并且它是一个setter，那就<strong>一定会调用这个 setter</strong>。</p>
<p>foo 不会被添加到obj，也不会重新定义 foo 这个 setter。</p>
</li>
</ol>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> proto <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">foo</span><span class="token operator">:</span> <span class="token number">2</span> <span class="token punctuation">}</span>
<span class="token keyword">var</span> obj <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>proto<span class="token punctuation">)</span><span class="token punctuation">;</span>

obj<span class="token punctuation">.</span>foo <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span> <span class="token comment">// 情况1 foo被添加</span>

Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span>proto<span class="token punctuation">,</span> <span class="token string">'foo'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">writable</span><span class="token operator">:</span> <span class="token boolean">false</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

obj<span class="token punctuation">.</span>foo <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span> <span class="token comment">// 情况2 无法修改或报错</span>

Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span>proto<span class="token punctuation">,</span> <span class="token string">'bar'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token function-variable function">set</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">val</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>_bar <span class="token operator">=</span> val<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

obj<span class="token punctuation">.</span>bar <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span> <span class="token comment">// 情况3 无法修改</span>
</code></pre></div><h2 id="类" tabindex="-1"><a class="header-anchor" href="#类"><span>“类”</span></a></h2>
<p>请记住：<em><strong>JavaScript中没有类，只有对象。</strong></em></p>
<p>实际上，JavaScript 才是真正应该被称为“面向对象”的语言，因为它是少有的可以不通过类，直接创建对象的语言。</p>
<p>在面向类的语言中，类可以被复制(或者说实例化)多次，就像用模具制作东西一样。</p>
<p>JavaScript 中，并没有类似类的复制机制。</p>
<p>你不能创建一个类的多个实例，只能创建多个对象，它们 [[Prototype]] 关联的是同一个对象。但是在默认情况下并不会进行复制。</p>
<h3 id="用原型模仿类" tabindex="-1"><a class="header-anchor" href="#用原型模仿类"><span>用原型模仿类</span></a></h3>
<p><em>JavaScript 中有一种奇怪的行为一直在被无耻地滥用，那就是模仿类。</em></p>
<p>要模仿类，通常利用了函数的一种特殊特性:</p>
<p><strong>所有的函数默认都会拥有一个 名为 prototype 的公有并且不可枚举的属性，它会指向另一个对象。</strong></p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">Foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token class-name">Foo</span><span class="token punctuation">.</span>prototype<span class="token punctuation">;</span> <span class="token comment">// {}</span>
</code></pre></div><p>这里要特别注意，<strong><code v-pre>一个对象的原型</code> 和 <code v-pre>一个对象的prototype属性</code> 的区别。</strong></p>
<p>Foo函数的prototype属性不是Foo函数这个对象本身的原型，而是Foo函数构造产生的对象的原型。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">Foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

Object<span class="token punctuation">.</span><span class="token function">getPrototypeOf</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token class-name">Foo</span><span class="token punctuation">.</span>prototype <span class="token comment">// true</span>
Object<span class="token punctuation">.</span><span class="token function">getPrototypeOf</span><span class="token punctuation">(</span>Foo<span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token class-name">Function</span><span class="token punctuation">.</span>prototype <span class="token comment">// true</span>
Object<span class="token punctuation">.</span><span class="token function">getPrototypeOf</span><span class="token punctuation">(</span>Function<span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token class-name">Function</span><span class="token punctuation">.</span>prototype <span class="token comment">// true</span>
</code></pre></div><p>第二章中提到过，用new操作符调用一个函数时的具体操作：</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">Foo</span><span class="token punctuation">(</span><span class="token parameter">bar</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>bar <span class="token operator">=</span> bar<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Foo</span><span class="token punctuation">(</span><span class="token string">'bar'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
Object<span class="token punctuation">.</span><span class="token function">getPrototypeOf</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token class-name">Foo</span><span class="token punctuation">.</span>prototype <span class="token comment">// true</span>
</code></pre></div><ol>
<li>创建一个全新的对象。</li>
<li>这个新对象会被执行[[原型]]连接。</li>
<li>这个新对象会绑定到函数调用的this。</li>
<li>如果函数没有返回其他对象，则返回第一步中创建的对象。</li>
</ol>
<h3 id="那些为模仿类而生的名字" tabindex="-1"><a class="header-anchor" href="#那些为模仿类而生的名字"><span>那些为模仿类而生的名字</span></a></h3>
<ul>
<li>
<p>继承</p>
<p>在 JavaScript 中，我们并不会将一个对象(“类”)复制到另一个对象(“实例”)，只是将它们关联起来。</p>
<p>这个机制通常被称为<em>原型继承</em>。</p>
<p>“继承”这两个字让人想起面向类编程，容易引起误解。</p>
</li>
<li>
<p>构造函数</p>
<p>Foo.prototype 默认有一个公有并且<strong>不可枚举</strong>的属性 <code v-pre>constructor</code>，这个属性引用的是对象关联的函数。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">Foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token class-name">Foo</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>constructor <span class="token operator">===</span> Foo<span class="token punctuation">;</span> <span class="token comment">// true</span>

<span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
a<span class="token punctuation">.</span><span class="token function">hasOwnProperty</span><span class="token punctuation">(</span><span class="token string">'constructor'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// false</span>
a<span class="token punctuation">.</span>constructor <span class="token operator">===</span> Foo<span class="token punctuation">;</span>
</code></pre></div><p>Foo函数不会因为它是大写开头就变得特殊，它与其他函数没有任何区别。</p>
<p>事实上，按模仿类的话来说，所有用new调用的函数都可以称之为“构造函数”。</p>
<p>可以认为constructor属性是为了在模仿类的做法下，创建对象后方便找到它的构造函数而添加的一个引用，而这个constructor是<strong>非常不可靠的</strong>。</p>
</li>
<li>
<p>是否是实例 ( <code v-pre>instanceof</code> )</p>
</li>
</ul>
<h2 id="原型继承" tabindex="-1"><a class="header-anchor" href="#原型继承"><span>原型继承</span></a></h2>
<Mermaid id="mermaid-182" code="eJxLL0osyFDwCeJySiwKKMovyY8GMvQKQKySyoLUWAVdXTuFmqd985/O636+e/mzzv01bvn5EJVABpJKrkTD6ERDiAaYEq5Eo+hEIzSxJMPoJKg6mKVcSUbRSVB1cDEAH2Q3YA=="></Mermaid><div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">Foo</span><span class="token punctuation">(</span><span class="token parameter">name</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token class-name">Foo</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">myName</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">Bar</span><span class="token punctuation">(</span><span class="token parameter">name<span class="token punctuation">,</span>label</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">Foo</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span> <span class="token keyword">this</span><span class="token punctuation">,</span> name <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 相当于super()</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>label <span class="token operator">=</span> label<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token class-name">Bar</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">myLabel</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>label<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token class-name">Bar</span><span class="token punctuation">.</span>prototype <span class="token comment">// {}</span>
<span class="token string">'constructor'</span> <span class="token keyword">in</span> <span class="token class-name">Bar</span><span class="token punctuation">.</span>prototype<span class="token punctuation">;</span> <span class="token comment">// true</span>

<span class="token comment">/* 我们创建了一个新的 Bar.prototype 对象并关联到Foo.prototype
	 注意!现在没有 Bar.prototype.constructor 了，
	 如果你需要这个属性的话可能需要手动修复一下它
	 比如 Bar.prototype.constructor = Bar */</span>
<span class="token class-name">Bar</span><span class="token punctuation">.</span>prototype <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span> <span class="token class-name">Foo</span><span class="token punctuation">.</span>prototype <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// “继承”</span>
<span class="token comment">// ES6可用setPrototypeOf</span>
<span class="token comment">// Object.setPrototypeOf( Bar.prototype, Foo.prototype );</span>

<span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Bar</span><span class="token punctuation">(</span> <span class="token string">"a"</span><span class="token punctuation">,</span> <span class="token string">"obj a"</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
a<span class="token punctuation">.</span><span class="token function">myName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// "a"</span>
a<span class="token punctuation">.</span><span class="token function">myLabel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// "obj a"</span>
</code></pre></div><p>这段代码的核心部分就是语句 <code v-pre>Bar.prototype = Object.create(Foo.prototype)</code>。</p>
<p>原型继承的错误做法：</p>
<ul>
<li>
<p>Bar.prototype = Foo.prototype; // 和你想要的机制不一样!</p>
<p>这样引用，对Bar.prototype的任何修改都会影响到Foo.prototype。</p>
</li>
<li>
<p>Bar.prototype = new Foo(); // 基本上满足你的需求，但是可能会产生一些副作用</p>
<p>如果函数 Foo 有一些副作用(比如写日志、修改状态、注册到其他对象、给 this 添加数据属性等等)的话，就会影响到 Bar() 的“后代”，后果不堪设想。</p>
</li>
</ul>
<p>原型继承的正确做法：</p>
<ul>
<li>
<p><code v-pre>Bar.ptototype = Object.create( Foo.prototype );</code>  // ES6 之前需要抛弃默认的 Bar.prototype</p>
</li>
<li>
<p><code v-pre>Object.setPrototypeOf( Bar.prototype, Foo.prototype );</code>// ES6 开始可以直接修改现有的 Bar.prototype</p>
</li>
</ul>
<h3 id="检查-实例-所属的-类" tabindex="-1"><a class="header-anchor" href="#检查-实例-所属的-类"><span>检查“实例”所属的&quot;类&quot;</span></a></h3>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">Foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token keyword">var</span> foo <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

foo <span class="token keyword">instanceof</span> <span class="token class-name">Foo</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
</code></pre></div><p>instanceof 操作符的左操作数是一个普通的对象，<strong>右操作数是一个函数</strong>。</p>
<p>instanceof 回答的问题是: <strong>在 foo 的整条 [[Prototype]] 链中是否有指向 Foo.prototype 的对象?</strong></p>
<p><em>同样地，可以认为 <code v-pre>instanceof</code> 是为了模仿类而加入的，目的类似 <code v-pre>new</code> 操作符</em>。</p>
<p>然而，<code v-pre>instanceof</code> 只能判断对象与函数之间的关系，不能判断两个普通对象间的关系。</p>
<p>为了判断两个普通对象的关系：</p>
<ul>
<li>
<p>荒谬的办法</p>
<p>下面这段荒谬的代码试图站在“类”的角度使用 instanceof 来判断两个对象的关系</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">isRelatedTo</span><span class="token punctuation">(</span><span class="token parameter">o1<span class="token punctuation">,</span> o2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">function</span> <span class="token constant">F</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token class-name">F</span><span class="token punctuation">.</span>prototype <span class="token operator">=</span> o2<span class="token punctuation">;</span>
  <span class="token keyword">return</span> o1 <span class="token keyword">instanceof</span> <span class="token class-name">F</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> b <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span> a <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">isRelatedTo</span><span class="token punctuation">(</span> b<span class="token punctuation">,</span> a <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
</code></pre></div></li>
<li>
<p>标准做法</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token class-name">Foo</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">isPrototypeOf</span><span class="token punctuation">(</span> foo <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
Object<span class="token punctuation">.</span><span class="token function">getPrototypeOf</span><span class="token punctuation">(</span> foo <span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token class-name">Foo</span><span class="token punctuation">.</span>prototype<span class="token punctuation">;</span> <span class="token comment">// true</span>
</code></pre></div></li>
<li>
<p>非标准做法</p>
<p>大部分浏览器提供以下非标准的做法：</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token comment">// __proto__ 可直接访问一个对象的原型</span>
foo<span class="token punctuation">.</span>__proto__ <span class="token operator">===</span> <span class="token class-name">Foo</span><span class="token punctuation">.</span>prototype<span class="token punctuation">;</span> <span class="token comment">// true</span>
</code></pre></div><p><code v-pre>__proto__</code> 看起来很像一个属性，但是实际上它更像一个 getter/setter。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code>Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span> <span class="token class-name">Object</span><span class="token punctuation">.</span>prototype<span class="token punctuation">,</span> <span class="token string">"__proto__"</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token function-variable function">get</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> Object<span class="token punctuation">.</span><span class="token function">getPrototypeOf</span><span class="token punctuation">(</span> <span class="token keyword">this</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function-variable function">set</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">o</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    Object<span class="token punctuation">.</span><span class="token function">setPrototypeOf</span><span class="token punctuation">(</span> <span class="token keyword">this</span><span class="token punctuation">,</span> o <span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> o<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div></li>
</ul>
<h2 id="object-create" tabindex="-1"><a class="header-anchor" href="#object-create"><span>Object.create</span></a></h2>
<p><code v-pre>Object.create(null) </code> 会创建一个拥有空[[Prototype]] 链接的对象，这个对象无法进行委托。
这些特殊的空 [[Prototype]] 对象通常被称作“字典”，它们完全不会受到原型链的干扰，因此非常适合用来存储数据。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> foo <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> plainObj <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

plainObj<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// [object Object]</span>
foo<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// TypeError: obj.toString is not a function</span>
</code></pre></div><p>低版本下Object.create的polyfill：</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>Object<span class="token punctuation">.</span>create<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  Object<span class="token punctuation">.</span><span class="token function-variable function">create</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">proto</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">function</span> <span class="token constant">F</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token class-name">F</span><span class="token punctuation">.</span>prototype <span class="token operator">=</span> proto<span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">F</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="小结" tabindex="-1"><a class="header-anchor" href="#小结"><span>小结</span></a></h2>
<ul>
<li>
<p><strong>[[Prototype]] 机制就是指对象中的一个内部链接引用另一个对象。</strong></p>
</li>
<li>
<p>查询对象属性时进行的[[Get]]操作，如果对象本身没有该属性，会沿原型链查找，直至找到或返回undefined。</p>
</li>
<li>
<p>对象原型链的顶端是<code v-pre>Object.prototype</code>，toString()、valueOf() 和其他一些通用的功能都存在于 Object.prototype 对象上，因此语言中所有的对象都可以使用它们。</p>
</li>
<li>
<p>JavaScript中有很多模仿类的机制，但是不建议使用。</p>
</li>
<li>
<p>虽然这些 JavaScript 机制和传统面向类语言中的“类初始化”和“类继承”很相似，</p>
<p>但是中有一个核心区别，那就是<strong>JavaScript不会进行复制，对象之间是通过内部的 [[Prototype]] 链关联的</strong>。</p>
</li>
<li>
<p>以“继承”结尾的术语(包括“原型继承”)和其他面向对象的术语都无法帮助你理解 JavaScript 的真实机制，</p>
<p>相比之下，“委托”是一个更合适的术语，因为<strong>对象之间的关系不是复制而是委托</strong>。</p>
</li>
</ul>
</div></template>


