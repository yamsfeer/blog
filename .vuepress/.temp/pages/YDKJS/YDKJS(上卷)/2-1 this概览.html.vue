<template><div><h1 id="this概览" tabindex="-1"><a class="header-anchor" href="#this概览"><span>this概览</span></a></h1>
<h2 id="this概览-1" tabindex="-1"><a class="header-anchor" href="#this概览-1"><span>this概览</span></a></h2>
<p><strong>this既不指向函数对象本身，也不指向该函数的作用域</strong>。</p>
<div class="hint-container info">
<p class="hint-container-title">相关信息</p>
<p>在 JavaScript 内部，作用域确实和对象类似，可见的标识符都是它的属性。</p>
<p>但是作用域“对象”无法通过 JavaScript 代码访问，它<strong>存在于 JavaScript 引擎内部</strong>。</p>
</div>
<p>函数执行上下文：</p>
<div class="hint-container info">
<p class="hint-container-title">相关信息</p>
<p>当一个函数被调用时，会创建一个活动记录(有时候也称为<strong>执行上下文</strong>)。</p>
<p>这个记录会包含函数在<strong>哪里被调用(调用栈)</strong>、<strong>函数的调用方法</strong>、<strong>传入的参数</strong>等信息。</p>
<p>this 就是记录的其中一个属性，会在函数执行的过程中用到。</p>
</div>
<h2 id="小结" tabindex="-1"><a class="header-anchor" href="#小结"><span>小结</span></a></h2>
<p><strong>this 实际上是在函数被调用时发生的绑定，它指向什么完全取决于函数在哪里被调用。</strong></p>
</div></template>


