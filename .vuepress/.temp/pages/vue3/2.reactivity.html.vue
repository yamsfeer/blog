<template><div><h1 id="reactivity" tabindex="-1"><a class="header-anchor" href="#reactivity"><span>Reactivity</span></a></h1>
<p>响应系统的核心在于：当响应式数据 reactive 变化时，自动调用副作用函数 effectFn。</p>
<p>为实现这一点，我们需要监听 reactive 对象的 get 和 set 操作，effectFn 调用时，会触发 reactive 对象的 get 操作，将 effectFn 保存到一个集合中；当 reactive 对象被修改时，会触发 set 操作，找到集合中的函数执行。</p>
<p>应用中可以有多个 reactive 对象，每个对象有多个 key，每个 key 又可以有多个副作用函数。最终，我们可以得到以下结构：</p>
<img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/reactivity-proxyMap.svg" style="zoom:80%;" class="img-mid" />
<h2 id="基本实现" tabindex="-1"><a class="header-anchor" href="#基本实现"><span>基本实现</span></a></h2>
<p>我们通过 Proxy 拦截对一个对象的 get 和 set 操作。在 get 操作中收集副作用函数，set 操作中找出副作用函数执行。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">reactive</span><span class="token punctuation">(</span><span class="token parameter">target</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> proxy <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">,</span> receiver<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">track</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">)</span>
      <span class="token keyword">return</span> Reflect<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">,</span> receiver<span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function">set</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">,</span> receiver<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">trigger</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">)</span>
      <span class="token keyword">return</span> Reflect<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">,</span> receiver<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token keyword">return</span> proxy
<span class="token punctuation">}</span>
</code></pre></div><p>track 函数的作用就是将 reactive 对象的 key 与对应的 effectFn 做映射。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> targetMap <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">WeakMap</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">function</span> <span class="token function">track</span><span class="token punctuation">(</span><span class="token parameter">target<span class="token punctuation">,</span> key</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> depsMap <span class="token operator">=</span> targetMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>depsMap<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    depsMap<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> <span class="token punctuation">(</span>depsMap <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">WeakMap</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">let</span> deps <span class="token operator">=</span> depsMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>deps<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    depsMap<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> <span class="token punctuation">(</span>deps <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  
  deps<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>activeEffect<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><p>trigger 函数就是找到响应式对象的 key 对应的 effectFn 并执行它们。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">trigger</span><span class="token punctuation">(</span><span class="token parameter">target<span class="token punctuation">,</span> key</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> depsMap <span class="token operator">=</span> targetMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>depsMap<span class="token punctuation">)</span> <span class="token keyword">return</span>
  
  <span class="token keyword">const</span> deps <span class="token operator">=</span> depsMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>deps<span class="token punctuation">)</span> <span class="token keyword">return</span>
  
  deps<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">effectFn</span> <span class="token operator">=></span> <span class="token function">effectFn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><p>effect 函数可以将一个函数包装为副作用函数。前面的 track 函数的参数中并没有传入 effectFn，它是由 effect 函数通过修改全局变量 activeEffect 指定的。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> activeEffect <span class="token operator">=</span> <span class="token keyword">null</span>

<span class="token keyword">function</span> <span class="token function">effect</span><span class="token punctuation">(</span><span class="token parameter">fn</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">function</span> <span class="token function">effectFn</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    activeEffect <span class="token operator">=</span> effectFn
    <span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  
  <span class="token function">effectFn</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token keyword">return</span> effectFn
<span class="token punctuation">}</span>
</code></pre></div><h2 id="分支切换与cleanup" tabindex="-1"><a class="header-anchor" href="#分支切换与cleanup"><span>分支切换与cleanup</span></a></h2>
<p>来看一个例子：</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> obj <span class="token operator">=</span> <span class="token function">reactive</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">'vue'</span><span class="token punctuation">,</span> <span class="token literal-property property">ok</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token function">effect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj<span class="token punctuation">.</span>ok <span class="token operator">?</span> obj<span class="token punctuation">.</span>text <span class="token operator">:</span> <span class="token string">''</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre></div><p>这个例子中，当 <code v-pre>obj.ok</code> 的值发生变化时，代码执行的分支也会变化，这就是所谓的分支切换。</p>
<p>初始情况下，<code v-pre>obj.ok</code> 值为 true，effectFn 会执行，且由于 effectFn 读取了 <code v-pre>obj.ok</code> 和 <code v-pre>obj.text</code> 两个属性，effectFn 会被添加到 ok 和 text 两个属性对应的 deps 集合中。</p>
<p><img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/reactivity-cleanup1.svg" alt=""></p>
<p>当 <code v-pre>obj.ok</code> 的值为 false 后，理论上 effectFn 便不会依赖于 <code v-pre>obj.text</code> 的值。也就是说，在 <code v-pre>obj.ok</code> 为 false 的情况下，<code v-pre>obj.text</code> 的值变化时，effectFn 不应该被重新执行。然而现实情况是，effectFn 会被重新执行，这是因为 effectFn 仍在 text 对应的 deps 集合中。</p>
<p>事实上，当 <code v-pre>obj.ok</code> 变化后，当前的 effectFn 的依赖情况已经过时，需要重新收集。</p>
<p>具体来说，每当 effectFn 执行前，我们就把它从 deps 集合中清除，执行 effectFn 时会重新将它加入到合适的 deps 中。</p>
<p><img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/reactivity-cleanup2.svg" alt=""></p>
<p>要做到这一点，effectFn 需要持有对 deps 的引用。</p>
<p><img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/reactivity-cleanup3.svg" alt=""></p>
<p>来看下代码实现：</p>
<p>为 effectFn 增加一个 deps 属性，持有对依赖集合的引用。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">effect</span><span class="token punctuation">(</span><span class="token parameter">fn</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">function</span> <span class="token function">effectFn</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">cleanup</span><span class="token punctuation">(</span>effectFn<span class="token punctuation">)</span>
    activeEffect <span class="token operator">=</span> effectFn
    <span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  
  effectFn<span class="token punctuation">.</span>deps <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token comment">// 与该 effectFn 有关的依赖集合</span>
<span class="token punctuation">}</span>
</code></pre></div><div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">track</span><span class="token punctuation">(</span><span class="token parameter">target<span class="token punctuation">,</span> key</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  deps<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>activeEffect<span class="token punctuation">)</span>
  activeEffect<span class="token punctuation">.</span>deps<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>deps<span class="token punctuation">)</span> <span class="token comment">// 互相持有对方引用</span>
<span class="token punctuation">}</span>
</code></pre></div><p>执行 effectFn 之前，调用 cleanup 函数清空旧的依赖引用。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">cleanup</span><span class="token punctuation">(</span><span class="token parameter">effectFn</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  effectFn<span class="token punctuation">.</span>deps<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter"><span class="token keyword">set</span></span> <span class="token operator">=></span> set<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span>effectFn<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 清空</span>
  effectFn<span class="token punctuation">.</span>deps<span class="token punctuation">.</span>length <span class="token operator">=</span> <span class="token number">0</span> <span class="token comment">// 重置</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="cleanup-的无限循环问题" tabindex="-1"><a class="header-anchor" href="#cleanup-的无限循环问题"><span>cleanup 的无限循环问题</span></a></h3>
<p>现在我们已经可以避免 effectFn 产生的遗留了。但是目前执行代码的话会出现死循环。原因出在 trigger 函数中。</p>
<p>来看下 trigger 函数的代码。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">trigger</span><span class="token punctuation">(</span><span class="token parameter">target<span class="token punctuation">,</span> key</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> depsMap <span class="token operator">=</span> targetMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span>
  <span class="token keyword">const</span> deps <span class="token operator">=</span> depsMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span> <span class="token comment">// 找到 key 对应的依赖几何</span>
 
  deps<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">effectFn</span> <span class="token operator">=></span> <span class="token function">effectFn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 执行，问题出在这里</span>
<span class="token punctuation">}</span>
</code></pre></div><p>回到下面这张图上来。</p>
<p><img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/reactivity-cleanup1.svg" alt=""></p>
<p>注意看出问题的这行代码：</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code>deps<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">effectFn</span> <span class="token operator">=></span> <span class="token function">effectFn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre></div><p>在执行 effectFn 时，cleanup 函数将 effectFn 从 deps 中删除，执行 effectFn 时触发 get 又会将它重新加入 deps 中。也就是说，执行 <code v-pre>effectFn()</code> 过程中会持续往 deps 集合中加入数据，deps 永远循环不完。</p>
<p>解决办法是构造临时集合用于循环。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">trigger</span><span class="token punctuation">(</span><span class="token parameter">target<span class="token punctuation">,</span> key</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> deps <span class="token operator">=</span> depsMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span>
  
  <span class="token keyword">const</span> effectsToRun <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span>deps<span class="token punctuation">)</span> <span class="token comment">// 创建临时集合用于循环</span>
  effectsToRun<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">effectFn</span> <span class="token operator">=></span> <span class="token function">effectFn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><p>这样一来，<code v-pre>effectFn()</code> 过程中仍会往 deps 集合添加数据，却不影响 effectsTorun 集合，因而不会造成无限循环。</p>
<h2 id="嵌套-effect" tabindex="-1"><a class="header-anchor" href="#嵌套-effect"><span>嵌套 effect</span></a></h2>
<p>effect 函数调用是可以嵌套的。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token function">effect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span> <span class="token comment">// effectFn1</span>
  <span class="token function">effect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token comment">// effectFn2</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>上一节提到过，track 函数中的 effectFn 是由 effect 函数通过全局变量 activeEffect 指定的。</p>
<p>嵌套的 effect 函数形成了一个调用栈，为防止 track 函数找到错误的 activeEffect，activeEffect 也需要用一个栈来维护。</p>
<img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/reactivity-effectStack1.svg" class="img-mid" />
<p>每当 effectFn 执行完成就出栈，activeEffect 始终指向栈顶元素。</p>
<img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/reactivity-effectStack2.svg" class="img-mid" />
<p>在代码中加入 effectStack 的实现。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> activeEffect
<span class="token keyword">let</span> effectStack <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token comment">// 副作用函数栈</span>

<span class="token keyword">function</span> <span class="token function">effect</span><span class="token punctuation">(</span><span class="token parameter">fn</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">function</span> <span class="token function">effectFn</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">cleanup</span><span class="token punctuation">(</span>activeEffect<span class="token punctuation">)</span>
    
    <span class="token comment">// effectFn 入栈</span>
    activeEffect <span class="token operator">=</span> effectFn
    effectStack<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>effectFn<span class="token punctuation">)</span>
    
    <span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 执行 effectFn</span>

    <span class="token comment">// effectFn 执行完后出栈</span>
    effectStack<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    activeEffect <span class="token operator">=</span> effectStack<span class="token punctuation">[</span>effectStack<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="避免无限递归循环" tabindex="-1"><a class="header-anchor" href="#避免无限递归循环"><span>避免无限递归循环</span></a></h2>
<p>来看一个例子：</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> obj <span class="token operator">=</span> <span class="token function">reactive</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">foo</span><span class="token operator">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token function">effect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> obj<span class="token punctuation">.</span>foo<span class="token operator">++</span><span class="token punctuation">)</span>
</code></pre></div><p>这段代码相当于：</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token function">effect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> obj<span class="token punctuation">.</span>foo <span class="token operator">=</span> obj<span class="token punctuation">.</span>foo <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span>
</code></pre></div><p>以上代码会导致 effectStack 溢出。因为这个函数既读取 obj.foo 的值，又设置 obj.foo 的值。</p>
<p>读取值时触发 track 操作，将副作用函数添加到集合；设置值时触发 trigger 操作，将副作用函数取出执行。而此时第一次执行还未结束，这相当于无限递归调用自己，所以产生栈溢出。</p>
<p>无论 track 收集的还是 trigger 触发的，都是 activeEffect 函数。为避免栈溢出，可以在 trigger 函数中过滤掉这种情况。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">trigger</span><span class="token punctuation">(</span><span class="token parameter">target<span class="token punctuation">,</span> key</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> effects <span class="token operator">=</span> depsMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span>
  
  <span class="token keyword">const</span> effectsToRun <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  effects <span class="token operator">&amp;&amp;</span> effects<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">effectFn</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token comment">// 如果 trigger 触发的副作用函数等于当前正在执行的 activeEffect，则不执行</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>effectFn <span class="token operator">!==</span> activeEffect<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      effectsToRun<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>effectFn<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  
  effectsToRun<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">effectFn</span> <span class="token operator">=></span> <span class="token function">effectFn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="调度执行" tabindex="-1"><a class="header-anchor" href="#调度执行"><span>调度执行</span></a></h2>
<p>调度执行是响应系统非常重要的特性。它允许当 trigger 触发执行 effectFn 时，决定函数执行的时机、次数及方式。</p>
<p>从代码上来说，<strong>调度执行就是将 effectFn 传给用户，由用户决定如何执行</strong>。</p>
<p>接下来实现代码。我们为 effect 函数增加参数 options，用于提供调度器，调度器会接收到 effectFn。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token function">effect</span><span class="token punctuation">(</span>fn<span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token function">scheduler</span><span class="token punctuation">(</span><span class="token parameter">effectFn</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 调度器是一个函数</span>
    <span class="token comment">// effect 函数对 fn 包一层后，传给调度器</span>
    <span class="token comment">// 用户可以决定如何执行 effectFn</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>effect 函数将接收到的 options 保存在 effectFn 上。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">effect</span><span class="token punctuation">(</span><span class="token parameter">fn<span class="token punctuation">,</span> options <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">function</span> <span class="token function">effectFn</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    activeEffect <span class="token operator">=</span> effectFn
    <span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  effectFn<span class="token punctuation">.</span>options <span class="token operator">=</span> options <span class="token comment">// 等待 trigger 时判断</span>
  <span class="token function">effectFn</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><p>trigger 函数执行 effectFn 时，如果有调度器，则将 effectFn 传给调度器。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">trigger</span><span class="token punctuation">(</span><span class="token parameter">target<span class="token punctuation">,</span> key</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  effectToRun<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">effectFn</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    effectFn<span class="token punctuation">.</span>options<span class="token punctuation">.</span>scheduler
      <span class="token operator">?</span> effectFn<span class="token punctuation">.</span>options<span class="token punctuation">.</span><span class="token function">scheduler</span><span class="token punctuation">(</span>effectFn<span class="token punctuation">)</span> <span class="token comment">// 如果有调度器，则回传 effectFn</span>
      <span class="token operator">:</span> <span class="token function">effectFn</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 否则直接执行</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="调度执行的例子" tabindex="-1"><a class="header-anchor" href="#调度执行的例子"><span>调度执行的例子</span></a></h3>
<p>假设有如下代码：</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> obj <span class="token operator">=</span> <span class="token function">reactive</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">foo</span><span class="token operator">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token function">effect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj<span class="token punctuation">.</span>foo<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 1</span>

obj<span class="token punctuation">.</span>foo <span class="token operator">=</span> <span class="token number">2</span> <span class="token comment">// 2</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span> <span class="token comment">// 3</span>
</code></pre></div><p>effect 首次执行输出 1，赋值语句触发 trigger 输出 2，最后输出 3。</p>
<p>我们用调度器控制输出结果为 <code v-pre>1,3,2</code>。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token function">effect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj<span class="token punctuation">.</span>foo<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token function">scheduler</span><span class="token punctuation">(</span><span class="token parameter">effectFn</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">setTimeout</span><span class="token punctuation">(</span>Fn<span class="token punctuation">)</span> <span class="token comment">// 异步执行</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>除了控制 effectFn 的执行顺序，还可以调度它的执行次数。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> obj <span class="token operator">=</span> <span class="token function">reactive</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">foo</span><span class="token operator">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token function">effect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj<span class="token punctuation">.</span>foo<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 1</span>

obj<span class="token punctuation">.</span>foo <span class="token operator">=</span> <span class="token number">2</span> <span class="token comment">// 2</span>
obj<span class="token punctuation">.</span>foo <span class="token operator">=</span> <span class="token number">3</span> <span class="token comment">// 3</span>
obj<span class="token punctuation">.</span>foo <span class="token operator">=</span> <span class="token number">4</span> <span class="token comment">// 4</span>
</code></pre></div><p>这段代码的输出为 <code v-pre>1,2,3,4</code>，假设我们只需要输出 <code v-pre>1,4</code>，即无论中间 <code v-pre>obj.foo</code> 的值修改多少次，都只输出最后一次。</p>
<p>下面用调度器实现以上功能。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> queue <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">let</span> isFlushing <span class="token operator">=</span> <span class="token boolean">false</span>

<span class="token keyword">function</span> <span class="token function">flush</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>isFlushing<span class="token punctuation">)</span> <span class="token comment">// 正在清空</span>
    <span class="token keyword">return</span>
  
  isFlushing <span class="token operator">=</span> <span class="token boolean">true</span>
  Promise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> queue<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">job</span> <span class="token operator">=></span> <span class="token function">job</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 在微任务中清空 queue</span>
  	<span class="token punctuation">.</span><span class="token function">finally</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      isFlushing <span class="token operator">=</span> <span class="token boolean">false</span>
      queue<span class="token punctuation">.</span><span class="token function">clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  
<span class="token punctuation">}</span>
</code></pre></div><div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token function">effect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj<span class="token punctuation">.</span>foo<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token function">scheduler</span><span class="token punctuation">(</span><span class="token parameter">effectFn</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    queue<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>effectFn<span class="token punctuation">)</span> <span class="token comment">// 加入队列</span>
    <span class="token function">flush</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 清空队列</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>观察上面的代码，每次调度执行时，都先将 effectFn 入队，然后调用 flush 函数清空队列。flush 函数中用 isFlushing flag 防止清空过程重复执行，也就是说，无论 flush 函数调用多少次，一个周期内都只执行一次清空。</p>
<p>整段代码的效果是，<code v-pre>obj.foo</code> 被连续赋值，effectFn 被多次添加到 queue 中，由于 Set 的去重特性，最终只有一个 effectFn 会进入 queue。</p>
<p>flush 虽然被调用多次，但由于 isFlushing 的存在，实际的 flush 过程只进行了一次，且根据 promise 微任务的特性，flush 过程是在一次事件循环内完成的。</p>
<p>综上，<code v-pre>console.log</code> 只会执行一次 ( 只有一个 effectFn 入队 )，且执行时 <code v-pre>obj.foo</code> 的值为 3 ( 一次事件循环内完成清空 )。</p>
</div></template>


