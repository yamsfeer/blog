<template><div><h1 id="setup-函数" tabindex="-1"><a class="header-anchor" href="#setup-函数"><span>setup 函数</span></a></h1>
<p>setup 函数内可以创建响应式数据、注册生命周期函数等，在组件的生命周期中，setup 函数只会在 mountComponent 中执行一次。</p>
<p>setup 函数有两种返回值：</p>
<ul>
<li>
<p>返回 render 函数</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> Comp <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'div'</span><span class="token punctuation">,</span> <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token string">'hello'</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div></li>
<li>
<p>返回一个数据对象供 render 函数使用</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> Comp <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span> <span class="token literal-property property">count</span><span class="token operator">:</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span> <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'div'</span><span class="token punctuation">,</span> <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>count <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div></li>
</ul>
<p>setup 函数接收的参数也有两个：props 和 setupContext，props 就是组件接收到的 props，setupContext 包括 slots、emit、attrs 等数据。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> Comp <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">foo</span><span class="token operator">:</span> String <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">setup</span><span class="token punctuation">(</span><span class="token parameter">props<span class="token punctuation">,</span> setupContext</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> <span class="token punctuation">{</span> slots<span class="token punctuation">,</span> emit<span class="token punctuation">,</span> attrs <span class="token punctuation">}</span> <span class="token operator">=</span> setupContext
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>setup 函数的实现如下：</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">mountComoonent</span><span class="token punctuation">(</span><span class="token parameter">vnode<span class="token punctuation">,</span> container</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token punctuation">{</span> setup<span class="token punctuation">,</span> data<span class="token punctuation">,</span> render <span class="token punctuation">}</span> <span class="token operator">=</span> vnode<span class="token punctuation">.</span>type

  <span class="token keyword">const</span> <span class="token punctuation">[</span>props<span class="token punctuation">,</span> attrs<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">resolveProps</span><span class="token punctuation">(</span>propsOptions<span class="token punctuation">,</span> vnode<span class="token punctuation">.</span>props<span class="token punctuation">)</span>
  <span class="token keyword">const</span> setupContext <span class="token operator">=</span> <span class="token punctuation">{</span> attrs <span class="token punctuation">}</span>
 
  <span class="token comment">// shallowReadonly 防止意外修改 props</span>
  <span class="token keyword">const</span> setupResult <span class="token operator">=</span> <span class="token function">setup</span><span class="token punctuation">(</span><span class="token function">shallowReadonly</span><span class="token punctuation">(</span>props<span class="token punctuation">)</span><span class="token punctuation">,</span> setupContext<span class="token punctuation">)</span>
  
  <span class="token keyword">let</span> setupState <span class="token operator">=</span> <span class="token keyword">null</span>
  <span class="token keyword">typeof</span> setupResult <span class="token operator">===</span> <span class="token string">'function'</span>
    <span class="token operator">?</span> render <span class="token operator">=</span> setupResult <span class="token comment">// 返回 render 函数</span>
    <span class="token operator">:</span> setupState <span class="token operator">=</span> setupResult <span class="token comment">// 返回 state</span>
  
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre></div><p>这是 setup 函数的基本实现，接下来实现 emit 和 slots 相关的内容。</p>
<h2 id="emit-自定义事件" tabindex="-1"><a class="header-anchor" href="#emit-自定义事件"><span>emit 自定义事件</span></a></h2>
<p>emit 函数可以在 setup 函数中发布自定义事件。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> MyComponent <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function">setup</span><span class="token punctuation">(</span><span class="token parameter">props<span class="token punctuation">,</span> setupContext</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    setupContext<span class="token punctuation">.</span><span class="token function">emit</span><span class="token punctuation">(</span><span class="token string">'change'</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token comment">// emit 名为 change 的自定义事件</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>使用组件时可以监听 emit 函数发布的事件。</p>
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>MyComponent</span> <span class="token attr-name">@change</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>handler<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
</code></pre></div><p>这段模板编译后得到的 vnode 为：</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> vnode <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">onChange</span><span class="token operator">:</span> handler
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>在 setupContext 中添加 emit 函数。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">mountComponent</span><span class="token punctuation">(</span><span class="token parameter">vnode<span class="token punctuation">,</span> container</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> instance <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token function">resolveProps</span><span class="token punctuation">(</span>props<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  
  <span class="token keyword">function</span> <span class="token function">emit</span><span class="token punctuation">(</span><span class="token parameter">event<span class="token punctuation">,</span> <span class="token operator">...</span>payload</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> eventName <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">on</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>event<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">toUpperCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> event<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span>
    <span class="token keyword">const</span> handler <span class="token operator">=</span> instance<span class="token punctuation">.</span>props<span class="token punctuation">[</span>eventName<span class="token punctuation">]</span>

    <span class="token function">handler</span><span class="token punctuation">(</span><span class="token operator">...</span>payload<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  
  <span class="token keyword">const</span> setupContext <span class="token operator">=</span> <span class="token punctuation">{</span> attrs<span class="token punctuation">,</span> emit <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>在处理 props 中添加事件相关的处理。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">resolveProps</span><span class="token punctuation">(</span><span class="token parameter">propsDefs<span class="token punctuation">,</span> propsData</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> key <span class="token keyword">in</span> propsData<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    key <span class="token keyword">in</span> options <span class="token operator">||</span> key<span class="token punctuation">.</span><span class="token function">startsWith</span><span class="token punctuation">(</span><span class="token string">'on'</span><span class="token punctuation">)</span>
      <span class="token operator">?</span> props<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> propsData<span class="token punctuation">[</span>key<span class="token punctuation">]</span>
      <span class="token operator">:</span> attrs<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> propsData<span class="token punctuation">[</span>key<span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="slot-插槽" tabindex="-1"><a class="header-anchor" href="#slot-插槽"><span>slot 插槽</span></a></h2>
<p>假设有一个 Page 组件，组件定义的 slot 的格式如下。</p>
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>header</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>slot</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>header<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>header</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>slot</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>body<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span>
</code></pre></div><p>在 Home 组件中使用组件 Page，并为其提供 slot 的内容。</p>
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span> <span class="token comment">&lt;!-- Home.vue --></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Page</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span> <span class="token attr-name">#header</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">></span></span>title<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span> <span class="token attr-name">#body</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>content<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Page</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span>
</code></pre></div><p>Home 的模板编译后得到下面的 render 函数。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> HomeComponent <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span> <span class="token comment">// home vnode</span>
      <span class="token literal-property property">type</span><span class="token operator">:</span> PageComponent<span class="token punctuation">,</span>
      <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token comment">// slot 函数，会被子组件调用，获得 vnode</span>
        <span class="token function">header</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token punctuation">{</span> <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'h1'</span><span class="token punctuation">,</span> <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token string">'title'</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token function">body</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token punctuation">{</span> <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'div'</span><span class="token punctuation">,</span> <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token string">'content'</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>可以看到，Home 中使用了组件 Page，且 slot 内容会被编译成函数的形式。</p>
<p>Page 的 render 函数如下。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> PageComponent <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">[</span> <span class="token comment">// page vnode</span>
      <span class="token punctuation">{</span> <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'header'</span><span class="token punctuation">,</span> <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token keyword">this</span><span class="token punctuation">.</span>$slots<span class="token punctuation">.</span><span class="token function">header</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span> <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'body'</span><span class="token punctuation">,</span> <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token keyword">this</span><span class="token punctuation">.</span>$slots<span class="token punctuation">.</span><span class="token function">body</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>结合以上两个 render 函数，可以看出 <strong>slot 就像 props 一样</strong>，由父组件 ( Home ) 传递给子组件 ( Page )，Page 通过调用 <code v-pre>this.$slots.header()</code> 获得 Home 传过来的 vnode 节点。</p>
<p>要想 Page 能通过 <code v-pre>this.$slots</code> 获得 slot 函数，我们需要将 slot 函数放入 setupContext 和 renderContext 中。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">mountComponent</span><span class="token punctuation">(</span><span class="token parameter">vnode<span class="token punctuation">,</span> container</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> slots <span class="token operator">=</span> vnode<span class="token punctuation">.</span>children
  <span class="token keyword">const</span> instance <span class="token operator">=</span> <span class="token punctuation">{</span>
    slots
  <span class="token punctuation">}</span>
  
  <span class="token keyword">const</span> renderContext <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span>instance<span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">,</span> receiver<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>key <span class="token operator">===</span> <span class="token string">'$slots'</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> target<span class="token punctuation">.</span>slots
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token keyword">const</span> setupContext <span class="token operator">=</span> <span class="token punctuation">{</span> attrs<span class="token punctuation">,</span> emit<span class="token punctuation">,</span> slots <span class="token punctuation">}</span>
  
  <span class="token function">setup</span><span class="token punctuation">(</span><span class="token function">shallowReadonly</span><span class="token punctuation">(</span>props<span class="token punctuation">)</span><span class="token punctuation">,</span> setupContext<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><p>之所以要在这两个地方，是因为 render 函数和 setup 返回的 render 函数都需要能访问 slot，虽然它们不会同时使用。</p>
<h2 id="注册生命周期" tabindex="-1"><a class="header-anchor" href="#注册生命周期"><span>注册生命周期</span></a></h2>
<p>在 composition API 中，注册生命周期钩子函数的方式如下：</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> Comp <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">onMounted</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token function">onMounted</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>为了让钩子函数注册到正确的组件上，我们需要一个指向当前组件实例的变量 currentInstance。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> currentInstance <span class="token operator">=</span> <span class="token keyword">null</span>
<span class="token keyword">function</span> <span class="token function">setCurrentInstance</span><span class="token punctuation">(</span><span class="token parameter">instance</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  currentInstance <span class="token operator">=</span> instance
<span class="token punctuation">}</span>
</code></pre></div><p>并且在注册前后维护好这个变量。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">mountComponent</span><span class="token punctuation">(</span><span class="token parameter">vnode<span class="token punctuation">,</span> container</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> instance <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">mounted</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
  <span class="token function">setCurrentInstance</span><span class="token punctuation">(</span>instance<span class="token punctuation">)</span> <span class="token comment">// 设置当前组件实例</span>
  <span class="token function">setup</span><span class="token punctuation">(</span>readonlyProps<span class="token punctuation">,</span> setupContext<span class="token punctuation">)</span> <span class="token comment">// 调用 setup 函数</span>
  <span class="token function">setCurrentInstance</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token comment">// 重置</span>
<span class="token punctuation">}</span>
</code></pre></div><p>注册的钩子函数存储在组件实例的钩子数组上。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">onMounted</span><span class="token punctuation">(</span><span class="token parameter">fn</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  currentInstance<span class="token punctuation">.</span>mounted<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>fn<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><p>最后在合适的位置调用执行。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">mountComponent</span><span class="token punctuation">(</span><span class="token parameter">vnode<span class="token punctuation">,</span> container</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">//...</span>

  <span class="token function">effect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> subTree <span class="token operator">=</span> <span class="token function">render</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>renderContext<span class="token punctuation">)</span>
    
    <span class="token keyword">if</span> <span class="token punctuation">(</span>instance<span class="token punctuation">.</span>isMounted<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      instance<span class="token punctuation">.</span>mounted<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">hook</span> <span class="token operator">=></span> <span class="token function">hook</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>renderContext<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></div></template>


