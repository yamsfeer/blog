import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as n,c as s,a as e}from"./app-BPFsuHku.js";const t={},p=e(`<h1 id="inline-cache" tabindex="-1"><a class="header-anchor" href="#inline-cache"><span>Inline Cache</span></a></h1><p>考虑以下代码。</p><div class="language-javascript" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">load</span> <span class="token operator">=</span> <span class="token parameter">obj</span> <span class="token operator">=&gt;</span> obj<span class="token punctuation">.</span>x

<span class="token keyword">while</span><span class="token punctuation">(</span>i<span class="token operator">++</span> <span class="token operator">&lt;</span> <span class="token number">10000</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">load</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">x</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><p>load 函数获取 <code>obj.x</code> 的过程：查找对象的隐藏类，通过隐藏类获取 x 的偏移量，根据偏移量获取属性地址。</p><p>这个过程会反复执行，内联缓存 ( Inline Cache ) 可以优化这个过程。</p><h2 id="什么是内联缓存" tabindex="-1"><a class="header-anchor" href="#什么是内联缓存"><span>什么是内联缓存</span></a></h2><p>内联缓存是针对函数内对象访问的优化。</p><p>内联缓存为每个函数维护一个反馈向量 ( FeedBack Vector )，记录函数执行过程中的对象访问。</p><img class="img-mid" src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/008i3skNgy1gwcfkuz6cpj31rg0oqtbn.jpg" style="zoom:33%;"><p>反馈向量是一个表结构，表的每一项称为 slot，数据存储在 slot 中。</p><p>假设有一个 load 函数需要多次执行。</p><div class="language-javascript" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">load</span><span class="token punctuation">(</span><span class="token parameter">o</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  o<span class="token punctuation">.</span>y <span class="token operator">=</span> <span class="token number">4</span>     <span class="token comment">// 访问对象</span>
  <span class="token keyword">return</span> o<span class="token punctuation">.</span>x  <span class="token comment">// 访问对象</span>
<span class="token punctuation">}</span>
</code></pre></div><p>load 有两个对象访问点，分别对应一个 slot，load 函数的反馈向量如下图。</p><img class="img-mid" src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/008i3skNgy1gwcfkvocqgj31rg0ougoc.jpg" style="zoom:25%;"><p>下面介绍反馈向量的细节。</p><h2 id="反馈向量的写入过程" tabindex="-1"><a class="header-anchor" href="#反馈向量的写入过程"><span>反馈向量的写入过程</span></a></h2><p>load 函数代码如下。</p><div class="language-javascript" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">load</span><span class="token punctuation">(</span><span class="token parameter">o</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> o<span class="token punctuation">.</span>x
<span class="token punctuation">}</span>
</code></pre></div><p>将 load 转换为字节码。</p><div class="language-assembly" data-ext="assembly" data-title="assembly"><pre class="language-assembly"><code>StackCheck # 检查栈是否溢出
LdaNamedProperty a0, [0], [0] # 取出参数 a0 的第一个属性值，放入累加器
Return # 返回累加器的值
</code></pre></div><p>LdaNamedProperty 有三个参数，它们的含义如下：</p><ul><li>a0：load 函数的第 1 个参数</li><li>[0]：取出对象 a0 的第 1 个属性值</li><li>[0]：将对象访问数据写入第 1 个 slot</li></ul><img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/008i3skNgy1gwcfkx89doj31rg0fx40a.jpg" style="zoom:40%;"><p>slot 的各项含义如下。</p><ul><li>map 表示对象 o 的隐藏类的地址</li><li>offset 表示属性 x 的偏移量</li><li>type 表示操作类型，LOAD 表示访问对象属性值</li></ul><h3 id="load、store-和-call" tabindex="-1"><a class="header-anchor" href="#load、store-和-call"><span>LOAD、STORE 和 CALL</span></a></h3><p>type 支持以下 3 种值：</p><ul><li>LOAD 访问</li><li>STORE 存储</li><li>CALL 调用</li></ul><p>再来看一段代码：</p><div class="language-javascript" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">load</span><span class="token punctuation">(</span><span class="token parameter">o</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  o<span class="token punctuation">.</span>y <span class="token operator">=</span> <span class="token number">4</span>
  <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token keyword">return</span> o<span class="token punctuation">.</span>x
<span class="token punctuation">}</span>
</code></pre></div><p>它的字节码如下：</p><div class="language-assembly" data-ext="assembly" data-title="assembly"><pre class="language-assembly"><code>StackCheck
LdaSmi [4]
StaNamedProperty a0, [0], [0]

LdaGlobal [1], [2]
Star r0
CallUndefinedReceiver0 r0, [4]

LdaNamedProperty a0, [2], [6]
Return
</code></pre></div><p>这段字节码的执行过程如下图：</p><img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/008i3skNgy1gwcfkw5q3pj31jd0u0n0r.jpg" style="zoom:33%;"><p>其中，<code>o.y = 4</code> 对应的字节码是：</p><div class="language-assembly" data-ext="assembly" data-title="assembly"><pre class="language-assembly"><code>LdaSmi [4] # 将常数 4 加载到累加器
StaNamedProperty a0, [0], [0] # 将累加器中的值赋给 o.y
</code></pre></div><p>这是一个 STORE 操作，中间结果存放到反馈向量第 1 个 slot。</p><p>调用 foo 函数的字节码:</p><div class="language-assembly" data-ext="assembly" data-title="assembly"><pre class="language-assembly"><code>LdaGlobal [1], [2] # 加载 foo 函数对象的地址到累加器
Star r0
CallUndefinedReceiver0 r0, [4] # 调用函数
</code></pre></div><p>LdaGlobal：加载 foo 函数的地址到累加器中，将中间结果写入反馈向量第 3 个 slot，这是一个 STORE 操作。</p><p>CallUndefinedReceive：调用函数，将中间结果存入反馈向量第 5 个 slot，这是一个 CALL 操作。</p><p>Return：返回 o.x，这是一个 LOAD 操作。</p><p>最终的反馈向量如下图所示:</p><img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/008i3skNgy1gwcfkws3hoj31rg0k176v.jpg" style="zoom:25%;"><p>根据反馈向量，执行 load 函数时就可以通过 map 和 offset 提高对象操作效率。</p><h2 id="多态与超态" tabindex="-1"><a class="header-anchor" href="#多态与超态"><span>多态与超态</span></a></h2><p>通过缓存信息，就能提升执行函数的效率，但前提是对象的形状是固定的。</p><p>如果形状不固定会怎么样呢？</p><p>来看一段代码：</p><div class="language-javascript" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">load</span><span class="token punctuation">(</span><span class="token parameter">o</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> o<span class="token punctuation">.</span>x
<span class="token punctuation">}</span>
<span class="token keyword">let</span> o1 <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">x</span><span class="token operator">:</span> <span class="token number">1</span> <span class="token punctuation">}</span>
<span class="token keyword">let</span> o2 <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">x</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token literal-property property">y</span><span class="token operator">:</span> <span class="token number">2</span> <span class="token punctuation">}</span>
<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10000</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">load</span><span class="token punctuation">(</span>o1<span class="token punctuation">)</span>
  <span class="token function">load</span><span class="token punctuation">(</span>o2<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><p>可以看到对象 o1 和 o2 是不一样的，这意味着隐藏类是不同的。</p><p>第一次执行时 load 时，记录 o1 的 map 和 offset。</p><p>再次调用 load 时，取出反馈向量中记录的 map，发现和 o2 不同，然后记录新的 map。这时，slot 里包含了两个 map 和 offset。</p><img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/008i3skNgy1gwcfkxk4ndj31rg0magnr.jpg" style="zoom:25%;"><ul><li>一个 slot 中包含 1 个隐藏类，称为单态 ( monomorphic )</li><li>一个 slot 中包含 2~4 个隐藏类，称为多态 ( polymorphic )</li><li>一个 slot 中超过 4 个隐藏类，称为超态 ( magamorphic )</li></ul><p>很明显**单态的性能优于多态和超态，**所以我们需要稍微避免多态和超态的情况。</p><p>要避免多态和超态，就尽量默认所有的对象属性是不变的。比如传入 load 函数的对象的形状要尽量保持一致。</p>`,57),o=[p];function c(l,r){return n(),s("div",null,o)}const d=a(t,[["render",c],["__file","4.2.内联缓存.html.vue"]]),k=JSON.parse('{"path":"/%E6%B5%8F%E8%A7%88%E5%99%A8/chrome/4.2.%E5%86%85%E8%81%94%E7%BC%93%E5%AD%98.html","title":"Inline Cache","lang":"zh-CN","frontmatter":{"description":"Inline Cache 考虑以下代码。 load 函数获取 obj.x 的过程：查找对象的隐藏类，通过隐藏类获取 x 的偏移量，根据偏移量获取属性地址。 这个过程会反复执行，内联缓存 ( Inline Cache ) 可以优化这个过程。 什么是内联缓存 内联缓存是针对函数内对象访问的优化。 内联缓存为每个函数维护一个反馈向量 ( FeedBack V...","head":[["meta",{"property":"og:url","content":"https://yamsfeer.github.io/notes-fe/%E6%B5%8F%E8%A7%88%E5%99%A8/chrome/4.2.%E5%86%85%E8%81%94%E7%BC%93%E5%AD%98.html"}],["meta",{"property":"og:site_name","content":"yamsfeer"}],["meta",{"property":"og:title","content":"Inline Cache"}],["meta",{"property":"og:description","content":"Inline Cache 考虑以下代码。 load 函数获取 obj.x 的过程：查找对象的隐藏类，通过隐藏类获取 x 的偏移量，根据偏移量获取属性地址。 这个过程会反复执行，内联缓存 ( Inline Cache ) 可以优化这个过程。 什么是内联缓存 内联缓存是针对函数内对象访问的优化。 内联缓存为每个函数维护一个反馈向量 ( FeedBack V..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-04-12T16:21:32.000Z"}],["meta",{"property":"article:modified_time","content":"2024-04-12T16:21:32.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Inline Cache\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-04-12T16:21:32.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"什么是内联缓存","slug":"什么是内联缓存","link":"#什么是内联缓存","children":[]},{"level":2,"title":"反馈向量的写入过程","slug":"反馈向量的写入过程","link":"#反馈向量的写入过程","children":[{"level":3,"title":"LOAD、STORE 和 CALL","slug":"load、store-和-call","link":"#load、store-和-call","children":[]}]},{"level":2,"title":"多态与超态","slug":"多态与超态","link":"#多态与超态","children":[]}],"git":{"createdTime":1712938892000,"updatedTime":1712938892000,"contributors":[{"name":"yamsfeer","email":"feer.yams@gmail.com","commits":1}]},"readingTime":{"minutes":3.46,"words":1038},"filePathRelative":"浏览器/chrome/4.2.内联缓存.md","localizedDate":"2024年4月12日","autoDesc":true}');export{d as comp,k as data};
