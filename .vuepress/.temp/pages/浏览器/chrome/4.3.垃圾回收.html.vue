<template><div><h1 id="garbage-collection" tabindex="-1"><a class="header-anchor" href="#garbage-collection"><span>Garbage Collection</span></a></h1>
<p>垃圾回收分为以下三步：</p>
<ol>
<li>
<p>标记堆中的活动对象和非活动对象</p>
<p>从 GC Root ( window、document 等对象 ) 出发，遍历所有能到达的对象，能到达就是可访问的 ( reachable )，称为活动对象，不能到达的 ( unreachable ) 称为非活动对象。</p>
</li>
<li>
<p>回收非活动对象占据的内存</p>
<p>标记完成之后，统一清理内存中的非活动对象。</p>
</li>
<li>
<p>内存整理</p>
<p>一般来说，频繁回收对象后，内存中会存在大量不连续空间，称为内存碎片，因此需要整理内存。</p>
</li>
</ol>
<p>代际假说是垃圾回收的一个重要术语，它有两个特点:</p>
<ul>
<li>
<p>大部分对象存活的时间很短，比如函数内部的变量等。</p>
</li>
<li>
<p>不死的对象会活得很久，比如 window 对象等。</p>
</li>
</ul>
<p>V8 把堆分为新生代和老生代两个区域，</p>
<ul>
<li>新生代：存放生存时间短的对象，通常只有 1~8M 的容量</li>
<li>老生代：存放生存时间长的对象，容量比新生代大得多。</li>
</ul>
<p>V8 采用了两个垃圾回收器：</p>
<ul>
<li>主回收器 Major GC，负责老生代的垃圾回收</li>
<li>副回收器 Minor GC，负责新生代的垃圾回收</li>
</ul>
<h2 id="副垃圾回收器-scavenge" tabindex="-1"><a class="header-anchor" href="#副垃圾回收器-scavenge"><span>副垃圾回收器 ( Scavenge )</span></a></h2>
<p>通常小对象会被分配到新生代，所以新生代的垃圾回收比较频繁。</p>
<p>副垃圾回收器把新生代空间<strong>对半划分</strong>为对象区和空闲区。</p>
<img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/008i3skNgy1gwdwab0z9lj31hc0u0gnq.jpg" style="zoom:25%;" />
<p>新对象会被放入对象区，对象区快被写满时，会进行一次垃圾回收操作。</p>
<p>垃圾回收过程：</p>
<ol>
<li>标记：将对象区中的活动对象、非活动对象做标记</li>
<li>复制：把活动对象复制到空闲区</li>
<li>内存整理：把这些对象有序地排列起来</li>
<li>角色互换：对象区和空闲区角色互换</li>
<li>对象晋升：经过两次垃圾回收依然存活的对象晋升为老生代</li>
</ol>
<p>标记、复制、内存整理过程示意图：</p>
<img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/008i3skNgy1gwdwabg73nj31hc0u0t9y.jpg" style="zoom:25%;" />
<p>角色转换：</p>
<img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/008i3skNgy1gwdwabziqej31hc0u0abb.jpg" style="zoom:25%;" />
<h2 id="主垃圾回收器-mark-compact" tabindex="-1"><a class="header-anchor" href="#主垃圾回收器-mark-compact"><span>主垃圾回收器 ( mark-compact )</span></a></h2>
<p>主垃圾回收负责老生代的垃圾回收。</p>
<p>除了从新生代晋升的对象，大的对象会直接分配到老生代里。因此，老生代中的对象有两个特点：占用空间大、存活时间长。</p>
<p>主回收器采用标记-整理 ( Mark-Compact ) 算法。</p>
<ol>
<li>标记：对老生代中的活动对象、非活动对象做标记</li>
<li>整理、清除：将所有活动对象整理到一端，清理之外的内存。</li>
</ol>
<img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/008i3skNgy1gwdwacjv5fj31rg0s575d.jpg" style="zoom:25%;" />
<h2 id="优化回收效率" tabindex="-1"><a class="header-anchor" href="#优化回收效率"><span>优化回收效率</span></a></h2>
<p>JavaScript 和垃圾回收都是主线程上运行的，垃圾回收时，JavaScript 需要暂停执行。</p>
<img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/008i3skNgy1gwdwa7t011j31rg0jpq4a.jpg" style="zoom:25%;" />
<p>为优化回收效率，V8 采用了并行、增量、并发回收技术。</p>
<h3 id="并行回收" tabindex="-1"><a class="header-anchor" href="#并行回收"><span>并行回收</span></a></h3>
<p>并行回收就是，用多线程执行回收工作。</p>
<img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/008i3skNgy1gwdwa9l1emj31rg0m1gnc.jpg" style="zoom:25%;" />
<p>副回收器采用的就是并行策略。</p>
<p>值得注意的是，这仍是一种全停顿的回收方式。</p>
<h3 id="增量回收" tabindex="-1"><a class="header-anchor" href="#增量回收"><span>增量回收</span></a></h3>
<p>增量回收就是，将标记工作分解为小块，在主线程中穿插执行，</p>
<img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/008i3skNgy1gwdwa92nlhj31rg0jnt9x.jpg" style="zoom:25%;" />
<p>要实现增量执行，需要解决两个问题:</p>
<ol>
<li>垃圾回收可以随时暂停和恢复，暂停前保存工作进度。</li>
<li>暂停期间，标记好的垃圾如果被 JavaScript 修改了，垃圾回收器需要正确地处理。</li>
</ol>
<h4 id="如何实现垃圾回收的暂停和恢复" tabindex="-1"><a class="header-anchor" href="#如何实现垃圾回收的暂停和恢复"><span>如何实现垃圾回收的暂停和恢复</span></a></h4>
<p>为解决这个问题，V8 采用了三色标记法，即黑白灰三色。</p>
<ol>
<li>黑色 ( 标记完成 )：该节点被 GC Root 引用到，且该节点的子节点都已标记完成。</li>
<li>灰色 ( 正在进行 )：该节点被 GC Root 引用到，但子节点还没被标记，表明正在处理这个节点。</li>
<li>白色 ( 未引用 )：没有被引用或还没访问到</li>
</ol>
<img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/008i3skNgy1gwdwa87n3pj31hc0u0gne.jpg" style="zoom:25%;" />
<p>恢复工作时：</p>
<ul>
<li>如果没有灰节点，可以进行清理工作 ( 清除白色节点 )</li>
<li>如果有灰节点，从灰节点开始继续执行。</li>
</ul>
<h4 id="已标记数据被-javascript-修改" tabindex="-1"><a class="header-anchor" href="#已标记数据被-javascript-修改"><span>已标记数据被 JavaScript 修改</span></a></h4>
<p>来看个例子：</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code>window<span class="token punctuation">.</span>a <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
window<span class="token punctuation">.</span>a<span class="token punctuation">.</span>b <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
window<span class="token punctuation">.</span>a<span class="token punctuation">.</span>b<span class="token punctuation">.</span>c <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre></div><p>这段代码执行完后，回收器把它们被标记为黑色。</p>
<p>此时，执行如下代码：</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code>window<span class="token punctuation">.</span>a<span class="token punctuation">.</span>b <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre></div><img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/008i3skNgy1gwdwaa0wxmj31rg0lbq4b.jpg" style="zoom:25%;" />
<p>当 b 节点被标记为黑色后被续上一个白节点 ( d 还没被访问过 )，垃圾回收器不会再将这个白节点标记为黑节点了，因为这个路径已经遍历过了。</p>
<p>解决办法是：<strong>不让黑色节点指向白色节点</strong>。每当黑节点指向白节点，强制将白节点变成灰节点。</p>
<p>这个方法称为强三色不变性，它保证了 GC 能够正确地回收数据，因为在标记结束时，所有白节点对于垃圾回收器来说，都是不可到达的，可以安全释放。</p>
<h3 id="并发回收" tabindex="-1"><a class="header-anchor" href="#并发回收"><span>并发回收</span></a></h3>
<p>并发回收就是 JavaScript 和垃圾回收同时执行。</p>
<img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/008i3skNgy1gwdwaakhaij31ki0u0wgc.jpg" style="zoom:25%;" />
<p>并发回收是三种技术中最难的，它主要有两个问题：</p>
<ul>
<li>执行 JavaScript 时，堆中内容随时会变化</li>
<li>主线程和辅助线程极有可能在同一时间更改同一对象，这需要锁来解决</li>
</ul>
<p>主回收器融合了这三种机制。</p>
<img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/008i3skNgy1gwdwa8ozpvj31q00u0mzs.jpg" style="zoom:25%;" />
<ul>
<li>
<p>并发标记。主线程执行 JavaScript，辅助线程开始标记。</p>
</li>
<li>
<p>并行清理。主线程在执行清理操作时，辅助线程也在执行清理操作。</p>
</li>
<li>
<p>增量标记。清理任务穿插在 JavaScript 之间执行。</p>
</li>
</ul>
<p>整个过程中，辅助线程进行标记，且采用增量标记的方式，这样既不阻塞主线程，也不会一次标记太多使得整理过程耗时过长；当主线程进行整理时（阻塞），辅助线程帮助整理，加快速度。</p>
<p>总结就是，辅助线程独立增量标记，帮忙主线程整理。</p>
<h3 id="小结" tabindex="-1"><a class="header-anchor" href="#小结"><span>小结</span></a></h3>
<p>总的来说，它们主要是从两方面来解决效率问题的：</p>
<ul>
<li>将垃圾回收任务拆分成多个小任务，这样就消灭了单个时间长的任务;</li>
<li>将标记对象、移动对象等任务转移到后台线程进行，减少主线程暂停的时间。</li>
</ul>
<h2 id="优化内存问题" tabindex="-1"><a class="header-anchor" href="#优化内存问题"><span>优化内存问题</span></a></h2>
<h3 id="内存泄漏-memory-leak" tabindex="-1"><a class="header-anchor" href="#内存泄漏-memory-leak"><span>内存泄漏 ( Memory leak )</span></a></h3>
<p>内存泄露是指内存占用越来越大，它会导致页面的性能越来越差，通常是因为没有回收不需要的资源。</p>
<p>下面举三个例子：</p>
<ol>
<li>
<p>全局变量</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  arr <span class="token operator">=</span> <span class="token function">Array</span><span class="token punctuation">(</span><span class="token number">10000</span><span class="token punctuation">)</span> <span class="token comment">// 相当于 window.arr = Array(10000)</span>
<span class="token punctuation">}</span>
</code></pre></div><p>window 对 arr 的引用使其不会被垃圾回收。</p>
</li>
<li>
<p>闭包引用</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">x</span><span class="token operator">:</span> <span class="token function">Array</span><span class="token punctuation">(</span><span class="token number">10000</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token literal-property property">y</span><span class="token operator">:</span> <span class="token number">1</span> <span class="token punctuation">}</span>

  <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> obj<span class="token punctuation">.</span>y <span class="token comment">// 为了访问 obj.y，保持对 obj 的引用</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>解决办法：</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">x</span><span class="token operator">:</span> <span class="token function">Array</span><span class="token punctuation">(</span><span class="token number">10000</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token literal-property property">y</span><span class="token operator">:</span> <span class="token number">1</span> <span class="token punctuation">}</span>
  <span class="token keyword">const</span> closure <span class="token operator">=</span> obj<span class="token punctuation">.</span>y <span class="token comment">// 消除对 obj.x 的引用</span>

  <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> obj<span class="token punctuation">.</span>y
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div></li>
<li>
<p>detached dom 节点</p>
<p>只有 dom 树和 JavaScript 都不引用某个 dom 节点，该节点才会被被垃圾回收。已从 dom 树移除，但仍被 JavaScript 引用的节点称为 detached 节点。</p>
<p>detached 节点是内存泄漏的常见原因。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> detachedTree
<span class="token keyword">function</span> <span class="token function">createTree</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> ul <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">'ul'</span><span class="token punctuation">)</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">1000</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    ul<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">'li'</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  detachedTree <span class="token operator">=</span> ul
<span class="token punctuation">}</span>
<span class="token function">createTree</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre></div><p>ul 被移除后，detachedTree 仍保留对它的引用，无法回收。</p>
</li>
</ol>
<h3 id="内存膨胀-memory-bloat" tabindex="-1"><a class="header-anchor" href="#内存膨胀-memory-bloat"><span>内存膨胀 ( Memory bloat )</span></a></h3>
<p>内存膨胀表现为内存在一段时间内快速增长，然后达到一个平稳的峰值继续运行。</p>
<p><img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/008i3skNgy1gwdx96vx7nj31rg0q9q4b.jpg" alt=""></p>
<p>要避免内存膨胀，需要尽量减少不必要的内存申请。</p>
<h3 id="频繁垃圾回收" tabindex="-1"><a class="header-anchor" href="#频繁垃圾回收"><span>频繁垃圾回收</span></a></h3>
<p>频繁使用大的临时变量，导致新生代空间很快被装满，从而频繁触发垃圾回收。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">repeatFun</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> arr <span class="token operator">=</span> <span class="token function">Array</span><span class="token punctuation">(</span><span class="token number">10000</span><span class="token punctuation">)</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">100000</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">repeatFun</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><p>可以考虑将 Array(10000) 设置为全局变量。</p>
</div></template>


