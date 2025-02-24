<template><div><h2 id="动态作用域" tabindex="-1"><a class="header-anchor" href="#动态作用域"><span>动态作用域</span></a></h2>
<p>词法作用域是一套关于<strong>引擎如何寻找变量以及会在何处找到变量的规则</strong>。</p>
<p>词法作用域最重要的特征是<strong>它的定义过程发生在代码的书写阶段</strong>(假设你没有使用 eval() 或 with)。</p>
<p>词法作用域是在写代码或者说<strong>定义时确定</strong>的，而动态作用域是在<strong>运行时确定</strong>的。(this 也是!)</p>
<p>词法作用域关注函数<strong>在何处声明</strong>，而动态作用域关注函数<strong>从何处调用</strong>。</p>
<h2 id="es6中的class" tabindex="-1"><a class="header-anchor" href="#es6中的class"><span>ES6中的Class</span></a></h2>
<p>一句话总结本书第二部分的第4-6章：<strong>类是一种可选的设计模式，而且在 JavaScript 这样的 [[Prototype]] 语言中实现类是很别扭的</strong>。</p>
<p>别扭的原因：</p>
<ul>
<li>
<p>语法原因</p>
<ul>
<li>繁琐杂乱的 .prototype 引用</li>
<li>试图调用原型链上层同名函数时的显式伪多态(参见第 4 章)<code v-pre>FatherClass.prototype.foo.call(this)</code>。</li>
<li>不可靠、不美观而且容易被误解成“构造函数”的constructor。</li>
</ul>
</li>
<li>
<p>传统面向类的语言中父类和子类、子类和实例之间其实是复制操作，但是在 [[Prototype]] 中并没有复制，相反，它们之间只有委托关联。</p>
</li>
</ul>
<h3 id="class语法解决的问题" tabindex="-1"><a class="header-anchor" href="#class语法解决的问题"><span>class语法解决的问题</span></a></h3>
<ul>
<li>
<p>语法变简洁</p>
<ul>
<li>没有杂乱的prototype</li>
<li>提供了extends关键字来“继承”，取代了原来的<code v-pre>Object.create</code>或<code v-pre>Object.setPrototypeOf</code></li>
</ul>
</li>
<li>
<p>可以通过<code v-pre>super</code>来实现相对多态，方便引用原型链上层的同名方法。</p>
<p>这可以解决第 4 章提到的: 构造函数不属于类，所以无法互相引用。</p>
<p>super() 可以完美解决构造函数的问题。</p>
</li>
<li>
<p><strong>class 字面语法不能声明属性只能声明方法</strong>。这可以帮助你避免犯错。</p>
</li>
<li>
<p>可以通过extends很自然地扩展对象类型，甚至是内置的对象，比如 Array 或 RegExp。</p>
<p>没有 extends 语法时，想实现这一点是非常困难的，基本上只有框架的作者才能搞清楚这一点。但是现在可以轻而易举地做到。</p>
</li>
</ul>
<h3 id="class语法带来的问题" tabindex="-1"><a class="header-anchor" href="#class语法带来的问题"><span>class语法带来的问题</span></a></h3>
<p><strong>class 基本上只是现有 [[Prototype]]机制的一种语法糖。</strong></p>
<ul>
<li>
<p>class 并不会像传统面向类的语言一样在声明时静态复制所有行为。</p>
<p>对“父类”方法的修改会影响到所有子类和实例。传统的面向类语言在类定义后便不可修改。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">C</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token function">rand</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'foo'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> c1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">C</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
c1<span class="token punctuation">.</span><span class="token function">rand</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// foo</span>
<span class="token class-name">C</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">rand</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 仍是基于原型的设计</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> <span class="token string">'bar'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> c2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">C</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
c2<span class="token punctuation">.</span><span class="token function">rand</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// bar</span>
ci<span class="token punctuation">.</span><span class="token function">rand</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// bar 已创建的实例也被影响到</span>
</code></pre></div></li>
<li>
<p>class 语法无法定义类成员属性(只能定义方法)。如果实在要跟踪实例之间共享状态，只好挂在prototype上。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">C</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 确保修改的是共享状态而不是在实例上创建一个屏蔽属性!</span>
    <span class="token class-name">C</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>count<span class="token operator">++</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> <span class="token string">"Hello: "</span> <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>count <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">// 直接向 prototype 对象上添加一个共享状态</span>
<span class="token class-name">C</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>count <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> c1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">C</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Hello: 1</span>
<span class="token keyword">var</span> c2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">C</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Hello: 2</span>
c1<span class="token punctuation">.</span>count <span class="token operator">===</span> <span class="token number">2</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
c1<span class="token punctuation">.</span>count <span class="token operator">===</span> c2<span class="token punctuation">.</span>count<span class="token punctuation">;</span> <span class="token comment">// true</span>
</code></pre></div><p>这种方法最大的问题是，它违背了 class 语法的本意，在实现中暴露了 prototype。</p>
<p>如果使用 this.count++ 的话，我们会很惊讶地发现在对象 c1 和 c2 上都创建了 .count 属性，而不是更新共享状态。</p>
<p>class 没有办法解决这个问题，并且干脆就不提供相应的语法支持，<strong>所以你根本就不应该这样做</strong>。</p>
</li>
<li>
<p>属性屏蔽方法</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">C</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">id</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>id <span class="token operator">=</span> id<span class="token punctuation">;</span> <span class="token comment">// id属性屏蔽了id方法</span>
  <span class="token punctuation">}</span>
  <span class="token function">id</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
c1<span class="token punctuation">.</span><span class="token function">id</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// TypeError</span>
</code></pre></div></li>
<li>
<p>super函数的绑定</p>
<p><strong>super 并不是动态绑定的，它会在声明时“静态”绑定。</strong></p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">P</span> <span class="token punctuation">{</span>
  <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> <span class="token string">"P.foo"</span> <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">C</span> <span class="token keyword">extends</span> <span class="token class-name">P</span> <span class="token punctuation">{</span>
  <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> c1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">C</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
c1<span class="token punctuation">.</span><span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// "P.foo" 符合预期</span>
<span class="token keyword">var</span> <span class="token constant">D</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> <span class="token string">"D.foo"</span> <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> <span class="token constant">E</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">foo</span><span class="token operator">:</span> <span class="token class-name">C</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>foo
<span class="token punctuation">}</span><span class="token punctuation">;</span>

Object<span class="token punctuation">.</span><span class="token function">setPrototypeOf</span><span class="token punctuation">(</span> <span class="token constant">E</span><span class="token punctuation">,</span> <span class="token constant">D</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// E的原型是D，按动态绑定super来说E.foo中的super应该调用D.foo</span>
<span class="token constant">E</span><span class="token punctuation">.</span><span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// "P.foo"</span>
</code></pre></div><p><strong>出于性能考虑，super 并不像 this 一样是晚绑定(late bound，或者说动态绑定)的，它在 [[HomeObject]].[[Prototype]] 上，[[HomeObject]] 会在创建时静态绑定。</strong></p>
<p>在本例中，super() 会调用 P.foo()，因为super的 [[HomeObject]] 仍然是 C，C.[[Prototype]] 是 P。</p>
<p>解决办法：</p>
<p>toMethod 会复制方法并把 homeObject 当作第一个参数，第二个参数(可选)是新方法的名称(默认是原方法名)。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> <span class="token constant">E</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">foo</span><span class="token operator">:</span> <span class="token class-name">C</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>foo<span class="token punctuation">.</span><span class="token function">toMethod</span><span class="token punctuation">(</span> <span class="token constant">E</span><span class="token punctuation">,</span> <span class="token string">"foo"</span> <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 将HomeObject改为E</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre></div></li>
</ul>
<h3 id="class的静态与动态问题" tabindex="-1"><a class="header-anchor" href="#class的静态与动态问题"><span>class的静态与动态问题</span></a></h3>
<p>在传统面向类的语言中，类定义之后就不会进行修改，所以类的设计模式就不支持修改。</p>
<p>但是 JavaScript 最强大的特性之一就是它的动态性，任何对象的定义都可以修改(除非你把它设置成不可变)。</p>
<p>class 似乎不赞成这样做，所以强制让你使用丑陋的 prototype 语法以及 super 。</p>
<p>而且对于这种动态产生的问题，class 基本上都没有提供解决方案。</p>
<p>总地来说，ES6 的 class 想伪装成一种很好的语法问题的解决方案，但是实际上却让问题更难解决而且让 JavaScript 更加难以理解。</p>
<h2 id="小结" tabindex="-1"><a class="header-anchor" href="#小结"><span>小结</span></a></h2>
<p>class 很好地伪装成 JavaScript 中类和继承设计模式的解决方案，但是它实际上起到了反作用:它隐藏了许多问题并且带来了更多更细小但是危险的问题。</p>
<p>class 加深了过去 20 年中对于 JavaScript 中“类”的误解，在某些方面，它产生的问题比解决的多，而且让本来优雅简洁的 [[Prototype]]机制变得非常别扭。</p>
<p>结论：ES6 的 class 让 [[Prototype]] 变得更加难用而且隐藏了 JavaScript 对象最重要的机制——对象之间的实时委托关联，应该抵制这种设计模式。</p>
</div></template>


