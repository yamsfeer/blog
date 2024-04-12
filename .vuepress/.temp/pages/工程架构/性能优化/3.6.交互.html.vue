<template><div><h1 id="对交互的性能优化" tabindex="-1"><a class="header-anchor" href="#对交互的性能优化"><span>对交互的性能优化</span></a></h1>
<h2 id="输入延迟" tabindex="-1"><a class="header-anchor" href="#输入延迟"><span>输入延迟</span></a></h2>
<p>输入延迟 ( Input delay ) 是指从交互 ( 如 click、tap、keypress ) 开始，到事件回调开始运行的时间。</p>
<p>交互总会有一定的输入延迟，因为操作系统需要时间识别输入事件并传递给浏览器，这是不可避免的。我们可以优化的是页面其他部分对输入延迟的影响。</p>
<h3 id="避免重复的计时器" tabindex="-1"><a class="header-anchor" href="#避免重复的计时器"><span>避免重复的计时器</span></a></h3>
<p>setTimeout 和 setInterval 会导致输入延迟。尤其是 setInterval，它会周期性注册回调事件，这增大了输入延迟增大的概率。</p>
<p>下图显示了 setInterval 是如何导致输入延迟的。</p>
<p><img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/tjzVtS9wFXxd06gaPHNY.png" alt=""></p>
<h3 id="避免长任务" tabindex="-1"><a class="header-anchor" href="#避免长任务"><span>避免长任务</span></a></h3>
<p>浏览器处理交互是在主线程完成的，而 JavaScript 的长任务会阻塞主线程，因此减少长任务可以减少输入延迟。具体做法参考《JS长任务》的内容。</p>
<h3 id="交互重叠" tabindex="-1"><a class="header-anchor" href="#交互重叠"><span>交互重叠</span></a></h3>
<p>交互重叠 ( interaction overlap ) 是指与一个元素交互后，渲染下一帧之前，又进行了交互。其实就是用户在短时间内进行了多次交互，常见于用户键盘输入、鼠标拖拽等。</p>
<p>解决办法如下：</p>
<ul>
<li>用 debounce 限制执行次数</li>
<li>如果事件会触发网络请求，可以使用 <a href="https://developer.mozilla.org/docs/Web/API/AbortController/abort" target="_blank" rel="noopener noreferrer">AbortController<ExternalLinkIcon/></a> 取消 fetch</li>
<li>尽量使用 CSS 动画，尽量不直接操作动画帧。</li>
</ul>
<h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考"><span>参考</span></a></h2>
<p><a href="https://web.dev/optimize-input-delay" target="_blank" rel="noopener noreferrer">optimize-input-delay<ExternalLinkIcon/></a></p>
</div></template>


