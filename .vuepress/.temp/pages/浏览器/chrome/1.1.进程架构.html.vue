<template><div><h1 id="进程架构" tabindex="-1"><a class="header-anchor" href="#进程架构"><span>进程架构</span></a></h1>
<p>浏览器是一个多进程多线程的应用程序。</p>
<ol>
<li>
<p>浏览器进程：负责界面显示、用户交互、子进程管理等。内部有多个线程处理不同的任务。</p>
</li>
<li>
<p>网络进程：加载网络资源。内部会启动多个线程处理不同的网络任务。</p>
</li>
<li>
<p>渲染进程：绘制页面</p>
</li>
</ol>
<p>渲染进程启动后，会开启一个渲染主线程，主线程负责执行 HTML、CSS、 JS 代码。</p>
<p>默认情况下，浏览器会为每个标签⻚开启一个新的渲染进程，以保证不同的标签⻚之间不相互影响。</p>
<p>浏览器是一个多进程多线程模型。在 chrome 中，包含浏览器进程，网络进程，渲染进程等，其中每个 tag 页面都是一个渲染进程。chrome 以后可能会使用每个域共用一个进程的模式。</p>
<p>渲染进程中包含多个线程，其中最重要的是渲染主线程。</p>
<p><img src="/Users/yams/Desktop/chrome-task-manager.png" alt=""></p>
<h2 id="渲染主线程" tabindex="-1"><a class="header-anchor" href="#渲染主线程"><span>渲染主线程</span></a></h2>
<p>渲染主线程需要处理非常多的任务，包括 html css js 布局 事件处理 等等</p>
<p>由于渲染主线程需要处理的任务太多，因此引发任务调度的问题。</p>
</div></template>


