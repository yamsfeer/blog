<template><div><h1 id="overview" tabindex="-1"><a class="header-anchor" href="#overview"><span>overview</span></a></h1>
<p>webpack 的打包流程大概如下图：</p>
<img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/webpack流程概览.svg" style="zoom:85%;" />
<p>核心可以分为以下 4 部分：</p>
<ul>
<li>初始化 ( createCompiler )</li>
<li>构建 ( make )</li>
<li>封装 ( seal )</li>
<li>生成 ( emit assets )</li>
</ul>
<p>在介绍 webpack 的构建流程之前，需要了解一些概念。</p>
<ul>
<li>Entry：webpack 编译的入口</li>
<li>Compiler：管理 webpack 整个编译流程的对象</li>
<li>Compilation：webpack 生命周期内只有一个 compiler，但可以创建多次 compilation，它负责编译的主要工作。</li>
<li>Dependence：一个模块依赖另一个模块，便会创建一个 Dependency 对象，webpack 基于它记录模块的依赖关系。</li>
<li>Module：webpack 内所有资源都是模块，它是资源操作的基本单位</li>
<li>Chunk：模块编译完成后会得到模块关系图，webpack 将这些 module 按特定规则划分成不同的 chunk</li>
<li>Loader：将资源转换为另一种形式，通常转化为 JS 代码</li>
<li>Plugin：通过监听 webpack 生命周期内的各种事件，plugin 可以在特定时间点介入编译过程</li>
</ul>
<p>初始化阶段主要完成创建 compiler，初始化 hooks，注册插件等前期准备工作。</p>
<p>在 make 阶段，处理的对象主要是 module，从 entry 开始，目标是得到 module 的关系图，在 webpack 中有一个非常重要的数据结构 moduleGraph 表示 module 之间的依赖关系。</p>
<p>在 seal 阶段，处理的对象是 moduleGraph，根据 entry 处理 moduleGraph 得到 chunkGraph。</p>
<p>emitAssets 阶段则是通过 chunkGraph 将文件写入到文件系统。</p>
<p>因此，从资源变化的角度，webpack 打包主流程也可以用下图表示。</p>
<p><img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/webpack主流程.svg" alt=""></p>
<h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考"><span>参考</span></a></h2>
<p><a href="https://indepth.dev/posts/1482/an-in-depth-perspective-on-webpacks-bundling-process" target="_blank" rel="noopener noreferrer">An in-depth perspective on webpack's bundling process<ExternalLinkIcon/></a></p>
<p><a href="https://indepth.dev/posts/1490/webpack-an-in-depth-introduction-to-splitchunksplugin" target="_blank" rel="noopener noreferrer">Webpack: An in-depth introduction to SplitChunksPlugin<ExternalLinkIcon/></a></p>
<p><a href="https://juejin.cn/post/6949040393165996040" target="_blank" rel="noopener noreferrer">[万字总结] 一文吃透 Webpack 核心原理<ExternalLinkIcon/></a></p>
<p><a href="https://juejin.cn/post/6966785086473633806" target="_blank" rel="noopener noreferrer">Webpack 原理系列七：如何开发 Loader<ExternalLinkIcon/></a></p>
<p><a href="https://juejin.cn/post/7233407035773173819" target="_blank" rel="noopener noreferrer">「Webpack5源码」make阶段（流程图）分析<ExternalLinkIcon/></a></p>
<p><a href="https://juejin.cn/post/7236010202381189157" target="_blank" rel="noopener noreferrer">「Webpack5源码」seal阶段（流程图）分析(一)<ExternalLinkIcon/></a></p>
<p><a href="https://juejin.cn/post/7238978524031041595" target="_blank" rel="noopener noreferrer">「Webpack5源码」seal阶段分析(二)-SplitChunksPlugin源码深度剖析<ExternalLinkIcon/></a></p>
<p><a href="https://juejin.cn/post/7112692753028349959#heading-12" target="_blank" rel="noopener noreferrer">sourcemap的原理<ExternalLinkIcon/></a></p>
<p><a href="https://juejin.cn/post/7098213874788204580" target="_blank" rel="noopener noreferrer">精读 Webpack SplitChunksPlugin 插件源码<ExternalLinkIcon/></a></p>
</div></template>


