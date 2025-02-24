<template><div><h1 id="watch" tabindex="-1"><a class="header-anchor" href="#watch"><span>watch</span></a></h1>
<p>watch 的本质就是：观测一个 reactive 数据，当数据变化时执行回调函数。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> obj <span class="token operator">=</span> <span class="token function">reactive</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">foo</span><span class="token operator">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token function">watch</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">newVal<span class="token punctuation">,</span> oldVal</span><span class="token punctuation">)</span> <span class="token operator">=></span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>newVal<span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre></div><p>从实现上来说，watch 利用了 effect 以及它的 scheduler 特性。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">watch</span><span class="token punctuation">(</span><span class="token parameter">target<span class="token punctuation">,</span> cb</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">effect</span><span class="token punctuation">(</span>
    <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">traverse</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token comment">// 访问 target 的所有属性</span>
    <span class="token punctuation">{</span>
      <span class="token function">scheduler</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">cb</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 数据变化时，执行回调</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><p>为什么要用 traverse 函数？当我们 watch target 对象时，意思是希望 target 任意属性变化时都执行回调。所以我们需要 traverse 函数遍历 target 的所有属性，并执行 track 函数。</p>
<p>traverse 函数的实现如下：</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">traverse</span><span class="token punctuation">(</span>value<span class="token punctuation">,</span> hasSeen <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isPrimitive</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span> <span class="token operator">||</span> hasSeen<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span>

  hasSeen<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>
  Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">k</span> <span class="token operator">=></span> <span class="token function">traverse</span><span class="token punctuation">(</span>value<span class="token punctuation">[</span>k<span class="token punctuation">]</span><span class="token punctuation">,</span> hasSeen<span class="token punctuation">)</span><span class="token punctuation">)</span>

  <span class="token keyword">return</span> value
<span class="token punctuation">}</span>
</code></pre></div><p>watch 除了观测整个响应式对象外，还可以由用户指定观测哪个属性。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token function">watch</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> obj<span class="token punctuation">.</span>foo<span class="token punctuation">,</span> cb<span class="token punctuation">)</span>
</code></pre></div><p>对此，我们要做一层判断。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">watch</span><span class="token punctuation">(</span><span class="token parameter">source<span class="token punctuation">,</span> cb</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> getter <span class="token operator">=</span> <span class="token keyword">typeof</span> source <span class="token operator">===</span> <span class="token string">'function'</span>
    <span class="token operator">?</span> source <span class="token comment">// 传递函数指定观测属性</span>
    <span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">traverse</span><span class="token punctuation">(</span>source<span class="token punctuation">)</span> <span class="token comment">// 传入对象则遍历所有属性</span>

  <span class="token function">effect</span><span class="token punctuation">(</span>getter<span class="token punctuation">,</span> options<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="旧值与新值" tabindex="-1"><a class="header-anchor" href="#旧值与新值"><span>旧值与新值</span></a></h2>
<p>要想获取 watch 前后的新值与旧值，需要用到 lazy effect。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">watch</span><span class="token punctuation">(</span><span class="token parameter">getter<span class="token punctuation">,</span> cb</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> oldVal<span class="token punctuation">,</span> newVal

  <span class="token keyword">const</span> effectFn <span class="token operator">=</span> <span class="token function">effect</span><span class="token punctuation">(</span>getter<span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">lazy</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">// 注册 effect 时不执行 effectFn</span>
    <span class="token function">scheduler</span><span class="token punctuation">(</span><span class="token parameter">effectFn</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 两个 effectFn 其实是一样的</span>
      newVal <span class="token operator">=</span> <span class="token function">effectFn</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token function">cb</span><span class="token punctuation">(</span>newVal<span class="token punctuation">,</span> oldVal<span class="token punctuation">)</span>
      oldVal <span class="token operator">=</span> newVal <span class="token comment">// cb之后，newVal 变 oldVal</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  
  oldVal <span class="token operator">=</span> <span class="token function">effectFn</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 手动调用拿到的是旧值</span>
<span class="token punctuation">}</span>
</code></pre></div><p>这里之所以要用 lazy effect，是因为我们需要拿到第一次执行 effectFn 执行的返回值，它同时也是 oldVal 的初始值。</p>
<p>effect 函数的返回值是未执行的 effectFn，所以我们需要在外部手动调用一次 effectFn 从而拿到 oldVal。</p>
<p>当数据变化并触发 scheduler 执行，会重新调用 effectFn 拿到 newVal，这样就有了 oldVal 和 newVal。每次调用完 cb，newVal 就会变成 oldVal，等待下次执行。</p>
<h2 id="立即执行-watch-和回调执行时机" tabindex="-1"><a class="header-anchor" href="#立即执行-watch-和回调执行时机"><span>立即执行 watch 和回调执行时机</span></a></h2>
<p>默认情况下，watch 的 cb 只有在响应式数据变化时才会执行。而我们可以添加 options.immediate 参数指定是否需要立即执行。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token function">watch</span><span class="token punctuation">(</span>
  obj<span class="token punctuation">,</span>
  <span class="token parameter">newVal</span> <span class="token operator">=></span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>newVal<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token comment">// cb</span>
  <span class="token punctuation">{</span> <span class="token literal-property property">immediate</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span> <span class="token comment">// 注册 watch 时立即执行一次</span>
<span class="token punctuation">)</span>
</code></pre></div><p>watch 函数做出相应修改。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">watch</span><span class="token punctuation">(</span><span class="token parameter">getter<span class="token punctuation">,</span> cb<span class="token punctuation">,</span> options</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> newVal<span class="token punctuation">,</span> oldVal

  <span class="token keyword">const</span> <span class="token function-variable function">call</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    newVal <span class="token operator">=</span> <span class="token function">effectFn</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token function">cb</span><span class="token punctuation">(</span>newVal<span class="token punctuation">,</span> oldVal<span class="token punctuation">)</span>
    oldVal <span class="token operator">=</span> newVal
  <span class="token punctuation">}</span>
  
  <span class="token keyword">const</span> effectFn <span class="token operator">=</span> <span class="token function">effect</span><span class="token punctuation">(</span>getter<span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">lazy</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token literal-property property">scheduler</span><span class="token operator">:</span> call <span class="token comment">// 后续执行</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  
  options<span class="token punctuation">.</span>immediate
    <span class="token operator">?</span> <span class="token function">call</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 立即执行</span>
    <span class="token operator">:</span> oldVal <span class="token operator">=</span> <span class="token function">effectFn</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><p>上述代码中，无论立即执行还是后续执行，执行的步骤是一样的，所以我们用 call 函数封装起来。immediate 属性很好判断。</p>
<h3 id="回调执行时机" tabindex="-1"><a class="header-anchor" href="#回调执行时机"><span>回调执行时机</span></a></h3>
<p>除了用 immediate 指定回调立即执行外，还可以通过 flush 参数指定回调的执行时机。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token function">watch</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> cb<span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">flush</span><span class="token operator">:</span> <span class="token string">'pre'</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>flush 有三种可选项：pre、sync、post，它们分别组件更新前、中、后三个时机。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">watch</span><span class="token punctuation">(</span><span class="token parameter">getter<span class="token punctuation">,</span> cb<span class="token punctuation">,</span> options</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> effectFn <span class="token operator">=</span> <span class="token function">effect</span><span class="token punctuation">(</span>getter<span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">lazy</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token function">scheduler</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      options<span class="token punctuation">.</span>flush <span class="token operator">===</span> <span class="token string">'post'</span>
        <span class="token operator">?</span> Pormise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>job<span class="token punctuation">)</span> <span class="token comment">// 放入微任务队列</span>
        <span class="token operator">:</span> <span class="token function">job</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// sync</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  options<span class="token punctuation">.</span>immediate
    <span class="token operator">?</span> <span class="token function">call</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 立即执行</span>
    <span class="token operator">:</span> oldVal <span class="token operator">=</span> <span class="token function">effectFn</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><p>以上代码模拟了 sync 和 post 的情况，pre 暂时无法模拟。</p>
</div></template>


