<template><div><h1 id="page-lifecycle-api" tabindex="-1"><a class="header-anchor" href="#page-lifecycle-api"><span>Page Lifecycle API</span></a></h1>
<p><a href="https://github.com/WICG/page-lifecycle" target="_blank" rel="noopener noreferrer">Page Lifecycle API<ExternalLinkIcon/></a> 是由 WICG ( 不是 W3C ) 制定的标准，它统一了网页生命周期内的行为模式。生命周期的状态，以及这些状态之间转换的事件，可以用下图来表示 ( <a href="https://wd.imgix.net/image/eqprBhZUGfb8WYnumQ9ljAxRrA72/KCIeOsJ0lCWMthBSSBrn.svg" target="_blank" rel="noopener noreferrer">原图链接<ExternalLinkIcon/></a> )：</p>
<p><img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/Page-Lifecycle.svg" alt=""></p>
<h2 id="states" tabindex="-1"><a class="header-anchor" href="#states"><span>States</span></a></h2>
<p>网页的生命周期有 6 种状态，每个时刻只能处于其中一个状态。</p>
<ul>
<li>
<p>Active：网页可见，拥有输入焦点</p>
</li>
<li>
<p>Passive：网页可见，没有输入焦点</p>
</li>
<li>
<p>Hidden：网页不可见，但未进入 frozen 等状态</p>
</li>
<li>
<p>Frozen</p>
<p>Frozen 状态下，网页不会再被分配 CPU 计算资源。定时器、回调函数、网络请求、DOM 操作都不会执行，不过正在运行的任务会执行完。</p>
<p>浏览器允许 Frozen 的页面周期性复苏一小段时间，短暂变回 Hidden 状态，允许一小部分任务执行。</p>
<p>freeze 是保护 CPU、电池一种方式，也是实现更快的前后导航的一种方式，避免重新加载整个页面。</p>
</li>
<li>
<p>Discarded</p>
<p>在资源紧张的情况下，浏览器为了节省资源而卸载页面，进入 Discarded 状态。</p>
<p>这个状态下，不能运行任何任务、事件回调或 JavaScript 代码。</p>
</li>
<li>
<p>Terminated</p>
<p>用户主动关闭窗口，或者超链接到其他页面，浏览器会从内存中清除当前页面，进入 Terminated 状态。</p>
<p>这种状态下不能启动新任务，正在进行的任务如果运行时间过长可能会被终止。</p>
</li>
</ul>
<h2 id="events" tabindex="-1"><a class="header-anchor" href="#events"><span>Events</span></a></h2>
<p>生命周期内，状态的变化都有对应的事件，供开发者指定监听函数。</p>
<ul>
<li>
<p>focus：页面获得输入焦点时触发</p>
</li>
<li>
<p>blur：页面失去焦点时触发</p>
</li>
<li>
<p>visibilitychange</p>
<p>页面可见状态变化时触发。比如用户导航到新页面、切换或关闭 tab、最小化或关闭浏览器、在移动端切换应用。</p>
</li>
<li>
<p>freeze</p>
<p>页面进入 frozen 状态时触发。</p>
<p>freeze 的监听函数，最长只能运行500毫秒，且只能复用已经打开的网络连接，不能发起新的网络请求。</p>
<p>从 Frozen 到 Discarded，不会触发任何事件，因此无法指定回调函数，只能在进入 Frozen 时指定回调函数。</p>
</li>
<li>
<p>resume：页面从 frozen 变为 active、passive hidden 状态时触发</p>
</li>
<li>
<p>pageshow</p>
<p>加载网页时触发。加载方式可以是全新加载，或者是从 bfcache 恢复页面。从 bfcache 恢复时，<code v-pre>event.persisted</code> 为 true。</p>
</li>
<li>
<p>pagehide</p>
<p>用户离开当前页面，进入另一个页面时触发。</p>
<p>如果页面满足 bfcache 的条件，<code v-pre>event.persisted</code> 为true，页面进入 frozen 状态，否则进入 terminated 状态。</p>
</li>
<li>
<p>beforeunload</p>
<p>窗口或文档即将卸载时触发。此时文档仍可见，卸载仍可取消，经过这个事件，页面进入 Terminated 状态</p>
</li>
<li>
<p>unload</p>
<p>页面正在卸载时触发。经过这个事件，页面进入 Terminated 状态。</p>
</li>
</ul>
<p>注意，网页的生命周期事件是在所有帧 ( frame ) 触发，不管是底层的帧，还是内嵌的帧。也就是说，内嵌的 iframe 网页跟顶层网页一样，都会同时监听到下面的事件。</p>
<h3 id="freeze-和-resume" tabindex="-1"><a class="header-anchor" href="#freeze-和-resume"><span>freeze 和 resume</span></a></h3>
<p>以上 9 种页面生命周期事件中，只有 freeze 和 resume 是新标准定义的。</p>
<p>现在的浏览器会 freeze ( 冻结 ) 和 discard ( 丢弃 ) 隐藏的标签页，且时机由浏览器自行决定，开发人员无法知道何时会发生这种情况。</p>
<p>对于 freeze，可以通过监听文档上的 freeze 和 resume 事件来观察页面何时被冻结和解冻。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code>document<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'freeze'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token comment">// The page is now frozen.</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

document<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'resume'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token comment">// The page has been unfrozen.</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><h3 id="discarded" tabindex="-1"><a class="header-anchor" href="#discarded"><span>Discarded</span></a></h3>
<p>对于 discard，可以通过以下代码判断页面是否曾被丢弃。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">if</span> <span class="token punctuation">(</span>document<span class="token punctuation">.</span>wasDiscarded<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// Page was previously discarded by the browser while in a hidden tab.</span>
<span class="token punctuation">}</span>
</code></pre></div><p>另外，在 chrome 中输入地址 <code v-pre>chrome://discards</code> 可以观察当前所有 tag 页面的状态。</p>
<h2 id="观察页面状态" tabindex="-1"><a class="header-anchor" href="#观察页面状态"><span>观察页面状态</span></a></h2>
<h3 id="获取当前状态" tabindex="-1"><a class="header-anchor" href="#获取当前状态"><span>获取当前状态</span></a></h3>
<p>当页面处于 Active、Passive 或 Hidden 状态时，可以直接获得当前页面状态。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">getState</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>document<span class="token punctuation">.</span>visibilityState <span class="token operator">===</span> <span class="token string">'hidden'</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token string">'hidden'</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>document<span class="token punctuation">.</span><span class="token function">hasFocus</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token string">'active'</span>
  <span class="token keyword">return</span> <span class="token string">'passive'</span>
<span class="token punctuation">}</span>
</code></pre></div><p>Frozen 和 Terminated 状态只能在各自的事件监听器 ( freeze 和 pagehide ) 中检测到，因为状态正在发生变化。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code>document<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'freeze'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token comment">// The page is now frozen.</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

document<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'pagehide'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token comment">// The page has been terminated.</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>Discarded 状态无法被获取到，只能判断当前页面是否曾被丢弃。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">if</span> <span class="token punctuation">(</span>document<span class="token punctuation">.</span>wasDiscarded<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// Page was previously discarded by the browser while in a hidden tab.</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="通过事件观察状态变化" tabindex="-1"><a class="header-anchor" href="#通过事件观察状态变化"><span>通过事件观察状态变化</span></a></h3>
<p>基于 getState 函数，我们来编写观察所有状态变化的代码。</p>
<p>用 logStateChange 判断新旧状态是否改变。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> state <span class="token operator">=</span> <span class="token function">getState</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">function</span> <span class="token function">logStateChange</span><span class="token punctuation">(</span><span class="token parameter">nextState</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> prevState <span class="token operator">=</span> state
  <span class="token keyword">if</span> <span class="token punctuation">(</span>nextState <span class="token operator">!==</span> prevState<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>prevState<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> => </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>nextState<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span>
    state <span class="token operator">=</span> nextState
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>监听页面生命周期事件。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> events <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">'pageshow'</span><span class="token punctuation">,</span> <span class="token string">'focus'</span><span class="token punctuation">,</span> <span class="token string">'blur'</span><span class="token punctuation">,</span> <span class="token string">'visibilitychange'</span><span class="token punctuation">,</span> <span class="token string">'resume'</span><span class="token punctuation">]</span>

events<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">type</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  window<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span>
    type<span class="token punctuation">,</span>
    <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">logStateChange</span><span class="token punctuation">(</span><span class="token function">getState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span> <span class="token literal-property property">capture</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span>
  <span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>用 freeze 和 pagehide 事件观察 frozen 和 terminated 状态。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code>window<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'freeze'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token function">logStateChange</span><span class="token punctuation">(</span><span class="token string">'frozen'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">capture</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code>window<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'pagehide'</span><span class="token punctuation">,</span> <span class="token parameter">event</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token function">logStateChange</span><span class="token punctuation">(</span>event<span class="token punctuation">.</span>persisted <span class="token operator">?</span> <span class="token string">'frozen'</span> <span class="token operator">:</span> <span class="token string">'terminated'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">capture</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>以上所有的 addEventListener 都是在捕获阶段获取的，这是因为并非所有事件都有相同的 target。</p>
<ul>
<li>pagehide、pageshow 在 window 上触发</li>
<li>visibilitychange、freeze、resume 在 document 上触发</li>
<li>focus 和 blur 在 DOM 元素上触发</li>
</ul>
<p>这些事件大多不会冒泡，因此不可能通过一个共同的祖先元素观察所有事件，只能在捕获阶段获取 ( 捕获阶段在目标或冒泡阶段之前执行 )。</p>
<h2 id="应避免使用的事件" tabindex="-1"><a class="header-anchor" href="#应避免使用的事件"><span>应避免使用的事件</span></a></h2>
<h3 id="unload-事件" tabindex="-1"><a class="header-anchor" href="#unload-事件"><span>unload 事件</span></a></h3>
<p>不要在现代浏览器中使用 unload 事件。</p>
<p>许多开发者将 unload 事件作为会话结束信号来保存状态和发送分析数据，这样做非常不可靠。在许多情况下，unload 事件不会触发，比如在移动设备上关闭 tab 或退出浏览器。</p>
<p>此外，注册 unload 事件处理也会使得页面失去进入 bfcache 的资格。</p>
<p>因此，最好用 visibilitychange 事件来确定会话何时结束，并<strong>将 Hidden 状态视为保存数据的最后可靠时间</strong>。在现代浏览器中，建议使用 <strong>pagehide</strong> 事件来检测页面的卸载。</p>
<h3 id="beforeunload-事件" tabindex="-1"><a class="header-anchor" href="#beforeunload-事件"><span>beforeunload 事件</span></a></h3>
<p>与 unload 类似，当 beforeunload 事件出现时，浏览器无法在 bfcache 中缓存页面。</p>
<p>建议当您想警告用户，退出页面将丢失未保存的更改时，可以使用 beforeunload 事件，并且在未保存的更改被保存后移除监听器。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">beforeUnloadListener</span><span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  event<span class="token punctuation">.</span><span class="token function">preventDefault</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span>event<span class="token punctuation">.</span>returnValue <span class="token operator">=</span> <span class="token string">'Are you sure you want to exit?'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token function">onPageHasUnsavedChanges</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'beforeunload'</span><span class="token punctuation">,</span> beforeUnloadListener<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token function">onAllChangesSaved</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token function">removeEventListener</span><span class="token punctuation">(</span><span class="token string">'beforeunload'</span><span class="token punctuation">,</span> beforeUnloadListener<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><h2 id="针对页面状态的建议" tabindex="-1"><a class="header-anchor" href="#针对页面状态的建议"><span>针对页面状态的建议</span></a></h2>
<ul>
<li>
<p>Active</p>
<p>Active 是页面响应用户输入的最重要时间，阻塞主线程的任务可以用 Web Worker 执行。</p>
</li>
<li>
<p>Passive</p>
<p>Passive 状态下，用户不与页面交互，但仍可以看到页面，因此页面更新和动画仍应流畅。</p>
<p><strong>从 Active 变为 Passive 时，是保存应用程序状态的好时机</strong>。</p>
</li>
<li>
<p>Hidden</p>
<p>页面从 Passive 变为 Hidden 时，用户可能不会再与之交互，直到重新加载。</p>
<p>向 Hidden 的转换通常也是开发人员能够<strong>可靠观察到</strong>的最后一次状态变化。在移动设备上尤其如此，用户关闭 tab 或浏览器，都不会触发 beforeunload、pagehide、unload 事件。</p>
<p>因此，<strong>应将 Hidden 视为用户会话已经结束</strong>。换句话说，此时应该：</p>
<ul>
<li>持久化任何未保存的应用状态，发送分析数据</li>
<li>停止进行 UI 更新 ( 反正用户看不到 )</li>
<li>停止不必要的后台任务</li>
</ul>
</li>
<li>
<p>Frozen</p>
<p>在 Frozen 状态下，任务队列中的任务会被暂停。</p>
<p>因此当页面从 Hidden 变为 Frozen 时，应停止定时器并关闭所有连接。</p>
<ul>
<li>关闭所有打开的 IndexedDB 连接。</li>
<li>关闭打开的 BroadcastChannel 连接。</li>
<li>关闭活动的 WebRTC 连接。</li>
<li>停止网络轮询，关闭 Web Socket 连接。</li>
<li>释放 Web 锁。</li>
</ul>
<p>此外，还应将视图状态，如列表的滚动位置，持久化到 sessionStorage 或 IndexedDB 中。</p>
</li>
<li>
<p>Terminated</p>
<p>页面变为 Terminated 时，通常不需要采取任何操作。</p>
<p>因为用户主动离开的页面在进入 Terminated 之前总要经过 Hidden 状态，Hidden 才是会话结束逻辑 ( 例如保存应用状态和发送分析报告 ) 执行的时机。</p>
</li>
<li>
<p>Discarded</p>
<p>页面被 discard ( 丢弃 ) 时，开发者无法观察到丢弃状态。因为页面通常是在资源有限的情况下才被丢弃的，为了让脚本响应丢弃事件而解冻页面是不可能的。</p>
<p>因此，您应该在 Hidden 变化为 Frozen 时提前做好准备，在页面加载时检查 document.wasDiscarded 对丢弃页面的恢复做出反应。</p>
</li>
</ul>
<p>总结一下。</p>
<ul>
<li>页面处于 Active 时，应尽量使页面能快速响应用户</li>
<li>从 Active 变为 Passive 时，应保存应用状态</li>
<li>变为 Hidden 时，应视为用户会话已经结束，保存状态、发送分析数据等工作要尽快完成</li>
<li>Hidden 之后可能会变成 Frozen、Discarded、Terminated 等，这几个状态不太受开发者控制，都不适合执行会话结束逻辑。</li>
</ul>
<h2 id="安全的-freeze-和-discard" tabindex="-1"><a class="header-anchor" href="#安全的-freeze-和-discard"><span>安全的 freeze 和 discard</span></a></h2>
<p>网页在 Hidden 状态下运行但不应该被冻结的情况有很多，最明显的例子就是播放音乐。</p>
<p>目前，Chrome 对丢弃是<strong>保守</strong>的，只有在确信不会对用户造成影响时才会丢弃页面。如果页面在 Hidden 下执行以下操作，则不会丢弃，除非资源极度紧张：</p>
<ul>
<li>播放音频</li>
<li>使用WebRTC</li>
<li>更新表格标题或图标</li>
<li>显示提醒</li>
<li>发送推送通知</li>
</ul>
<p>关于如何确定是否安全冻结或丢弃，请参阅：<a href="https://docs.google.com/document/d/1QJpuBTdllLVflMJSov0tlFX3e3yfSfd_-al2IBavbQM/edit?usp=sharing" target="_blank" rel="noopener noreferrer">Chrome 冻结和丢弃的启发式方法<ExternalLinkIcon/></a>。</p>
<h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考"><span>参考</span></a></h2>
<p><a href="https://developer.chrome.com/blog/page-lifecycle-api/" target="_blank" rel="noopener noreferrer">Page Lifecycle API<ExternalLinkIcon/></a></p>
<p><a href="http://www.ruanyifeng.com/blog/2018/11/page_lifecycle_api.html" target="_blank" rel="noopener noreferrer">Page Lifecycle API 教程<ExternalLinkIcon/></a></p>
</div></template>


