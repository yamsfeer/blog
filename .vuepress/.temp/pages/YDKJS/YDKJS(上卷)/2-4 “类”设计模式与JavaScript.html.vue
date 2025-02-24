<template><div><h1 id="类设计模式与javascript对象机制" tabindex="-1"><a class="header-anchor" href="#类设计模式与javascript对象机制"><span>类设计模式与JavaScript对象机制</span></a></h1>
<h2 id="类设计模式与javascript对象机制-1" tabindex="-1"><a class="header-anchor" href="#类设计模式与javascript对象机制-1"><span>类设计模式与JavaScript对象机制</span></a></h2>
<h3 id="类理论" tabindex="-1"><a class="header-anchor" href="#类理论"><span>类理论</span></a></h3>
<p>类描述了一种<strong>代码的组织结构形式</strong>，即一种在软件中对真实世界中问题领域的建模方法。</p>
<p><strong>面向对象编程强调的是数据和操作数据的行为本质上是互相关联的。</strong></p>
<p>因此好的设计就是把数据以及和它相关的行为封装起来。 这在正式的计算机科学中有时被称为数据结构。</p>
<h3 id="类设计模式" tabindex="-1"><a class="header-anchor" href="#类设计模式"><span>类设计模式</span></a></h3>
<p>可以认为<strong>类是以面向对象编程为基础的一种设计模式</strong>。</p>
<p>对于一些 <em><strong>过程化编程</strong></em> 的代码，可以使用类将其转换成结构清晰、组织良好的代码。</p>
<p>对于 <em><strong>函数式编程</strong></em> ，类也是非常常用的一种设计模式。</p>
<p><em>有些语言(比如 Java)并不会给你选择的机会，类并不是可选的，万物皆是类。</em></p>
<p><em>其他语言(比如 C/C++ 或者 PHP)会提供过程化和面向类这两种语法，开发者可以选择其中一种风格或者混用两种风格。</em></p>
<h3 id="javascript中的-类" tabindex="-1"><a class="header-anchor" href="#javascript中的-类"><span>JavaScript中的“类”</span></a></h3>
<p><strong>JavaScript中没有类，但是可以近似实现类的功能。</strong></p>
<p>JavaScript中只有类似类的一些语法功能，比如 new、instanceof，以及 ES6 新增的 class 关键字。</p>
<p><strong>但这些只是为了满足对于类设计模式的最普遍需求而提供的一些近似类的语法。</strong></p>
<p><strong>在近似类的表象之下，JavaScript 的机制其实和类完全不同。</strong></p>
<p>总的来说，在软件设计中，<strong>类是一种可选的模式</strong>，你需要自己决定是否在 JavaScript 中使用它。</p>
<h3 id="类" tabindex="-1"><a class="header-anchor" href="#类"><span>类</span></a></h3>
<p>面向类的设计模式:实例化(instantiation)、继承(inheritance)和 (相对)多态(polymorphism)。</p>
<ul>
<li>
<p>构造函数</p>
<p>类仅仅是一个抽象的表示，必须先实例化类然后才能对它进行操作。</p>
<p>实例是由一个特殊的类方法构造的，这个方法名通常和类名相同，被称为<strong>构造函数</strong>。</p>
<p>类构造函数属于类，它的任务就是初始化实例需要的所有信息(状态)。</p>
</li>
<li>
<p>继承(inheritance)</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">A</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">B</span> <span class="token keyword">extends</span> <span class="token class-name">A</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre></div></li>
<li>
<p>多态(polymorphism)</p>
<p>父类的通用行为可以被子类用更特殊的行为重写。</p>
<p>实际上，相对多态性允许我们从重写行为中引用基础行为。</p>
</li>
</ul>
<h3 id="混入-mixin" tabindex="-1"><a class="header-anchor" href="#混入-mixin"><span>混入（mixin）</span></a></h3>
<p><em><strong>以下介绍的内容，是为了在JavaScript中模仿类而创造的蹩脚做法，了解即可，不建议使用！</strong></em></p>
<p>在继承或者实例化时，JavaScript 的对象机制并不会自动执行复制行为。</p>
<p>简单来说，<strong>JavaScript 中只有对象，并不存在可以被实例化的“类” 。</strong>。</p>
<p>一个对象并不会被复制到其他对象，它们会被关联起来（引用）。</p>
<p>由于在其他语言中类表现出来的都是复制行为，因此 JavaScript 开发者也想出了一个方法来<strong>模拟类的复制行为</strong>，这个方法就是混入。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 从source“复制到target”，相当于target “继承” source</span>
<span class="token keyword">function</span> <span class="token function">mixin</span><span class="token punctuation">(</span> <span class="token parameter">sourceObj<span class="token punctuation">,</span> targetObj</span> <span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> key <span class="token keyword">in</span> sourceObj<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token punctuation">(</span>key <span class="token keyword">in</span> targetObj<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 注意这里，对于对象类型数据来说，只是赋值（引用），没有真正复制</span>
      targetObj<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> sourceObj<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> targetObj<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> Vehicle <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">engines</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
  <span class="token function-variable function">ignition</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> <span class="token string">"Turning on my engine."</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function-variable function">drive</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">ignition</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> <span class="token string">"Steering and moving forward!"</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> Car <span class="token operator">=</span> <span class="token function">mixin</span><span class="token punctuation">(</span> Vehicle<span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">wheels</span><span class="token operator">:</span> <span class="token number">4</span><span class="token punctuation">,</span>
  <span class="token function-variable function">drive</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    Vehicle<span class="token punctuation">.</span><span class="token function">drive</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span> <span class="token keyword">this</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"Rolling on all "</span> <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>wheels <span class="token operator">+</span> <span class="token string">" wheels!"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p><strong>JavaScript 中的函数无法(用标准、可靠的方法)真正地复制，所以你只能复制对共享函数对象的引用。</strong></p>
<p>如果你修改了共享的函数对象（比如 ignition），比如添加了一个属性，那 Vehicle 和 Car 都会受到影响。</p>
<h2 id="小结" tabindex="-1"><a class="header-anchor" href="#小结"><span>小结</span></a></h2>
<ul>
<li>
<p><strong>类是一种设计模式</strong>。许多语言提供了对于面向类软件设计的原生语法。</p>
</li>
<li>
<p>JavaScript 也有类似的语法，但是和其他语言中的类完全不同。</p>
<p>JavaScript 并不会(像类那样)自动创建对象的副本。</p>
</li>
<li>
<p>传统的类被实例化时，它的行为会被复制到实例中。</p>
<p>类被继承时，行为也会被复制到子类中。</p>
</li>
<li>
<p>多态(在继承链的不同层次名称相同但是功能不同的函数)看起来似乎是从子类引用父类，但是本质上引用的其实是复制的结果。</p>
</li>
<li>
<p>混入模式可以用来模拟类的复制行为，但是通常会产生丑陋并且脆弱的语法，让代码更加难懂并且难以维护。</p>
</li>
<li>
<p>显式混入实际上无法完全模拟类的复制行为，因为对象和函数只能复制引用，无法复制被引用的对象或者函数本身。</p>
<p>忽视这一点会导致许多问题。</p>
</li>
<li>
<p>总地来说，<strong>在 JavaScript 中模拟类是得不偿失的</strong>，虽然能解决当前的问题，但是可能会埋下更多的隐患。</p>
</li>
</ul>
</div></template>


