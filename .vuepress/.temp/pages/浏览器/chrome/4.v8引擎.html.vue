<template><div><h1 id="execution-pipeline" tabindex="-1"><a class="header-anchor" href="#execution-pipeline"><span>Execution Pipeline</span></a></h1>
<p><img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/js-engine-pipeline.svg" alt="img"></p>
<h2 id="parser" tabindex="-1"><a class="header-anchor" href="#parser"><span>Parser</span></a></h2>
<p>paser 可以将 JavaScript 文本解析成 AST。</p>
<h2 id="ignition" tabindex="-1"><a class="header-anchor" href="#ignition"><span>Ignition</span></a></h2>
<p>JavaScript 代码解析成 AST 后，Ignition 解释器会将其转化为字节码并执行。</p>
<p>字节码是机器代码的抽象。</p>
<p>如果字节码采用和物理 CPU 相同的计算模型进行设计，则将字节码编译为机器代码更容易。这就是为什么解释器 ( interpreter ) 常常是基于寄存器或堆栈的。</p>
<p><strong>Ignition 是具有累加器的寄存器虚拟机</strong>。</p>
<h2 id="turbofan" tabindex="-1"><a class="header-anchor" href="#turbofan"><span>Turbofan</span></a></h2>
<p>Ignition 执行字节码时，如果检测到频繁使用的函数，Turbofan 会将这些函数编译成二进制代码。如果函数的类型发生变化，则需要对已编译的代码进行去优化，变回字节码，</p>
<p>这个过程称为 JIT ( Just-in-Time, 即时编译 )，JIT 结合了解释和编译两种执行方式。</p>
<h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考"><span>参考</span></a></h2>
<p><a href="https://dev.to/lydiahallie/javascript-visualized-the-javascript-engine-4cdf" target="_blank" rel="noopener noreferrer">JavaScript Visualized: the JavaScript Engine<ExternalLinkIcon/></a></p>
<p><a href="https://zhuanlan.zhihu.com/p/28590489" target="_blank" rel="noopener noreferrer">理解 V8 的字节码「译」<ExternalLinkIcon/></a></p>
<p><a href="https://benediktmeurer.de/2017/12/13/an-introduction-to-speculative-optimization-in-v8/" target="_blank" rel="noopener noreferrer">An Introduction to Speculative Optimization in V8<ExternalLinkIcon/></a></p>
<p><a href="https://www.bilibili.com/video/BV1cD4y1s7S1" target="_blank" rel="noopener noreferrer">JavaScript 性能优化<ExternalLinkIcon/></a></p>
<p><a href="https://mathiasbynens.be/notes/shapes-ics" target="_blank" rel="noopener noreferrer">JavaScript engine fundamentals: Shapes and Inline Caches<ExternalLinkIcon/></a></p>
<p><a href="https://v8.dev/docs/hidden-classes" target="_blank" rel="noopener noreferrer">hidden classes - v8.dev<ExternalLinkIcon/></a></p>
</div></template>


