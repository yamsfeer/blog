<template><div><h1 id="seal" tabindex="-1"><a class="header-anchor" href="#seal"><span>seal</span></a></h1>
<p>make 阶段中，我们已经得到模块依赖关系图 moduleGraph，接下来进入 seal 阶段。</p>
<p>seal 过程中的主体调用关系如下图。</p>
<img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/seal流程.svg" style="zoom:75%;" />
<p>可以看到，整个 seal 过程是围绕 chunkGraph 展开的，总体来说可以分为几个部分：</p>
<ul>
<li>创建 chunkGraph</li>
<li>构建 chunkGraph</li>
<li>优化，其中 splitChunkPlugin 的工作尤为重要</li>
<li>生成代码，主要和 webpack 运行时相关</li>
<li>生成模块内容，此时生成的模块资产仍存在于内存中</li>
</ul>
<h2 id="chunkgraph" tabindex="-1"><a class="header-anchor" href="#chunkgraph"><span>chunkGraph</span></a></h2>
<p>chunkGraph 有几个概念：Chunk、ChunkGroup、EntryPoint、ChunkGraph。</p>
<p>chunkGraph 的形成及以上概念都与 webpack 配置中的 entry 对象息息相关。</p>
<p>以下是一个 chunkGraph 的例子。</p>
<img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/chunkGraph.svg" style="zoom:80%;" />
<p>通过这张图，介绍 chunkGraph 的相关概念和它们之间的关系。</p>
<ul>
<li>一个 chunk 对应一个或多个入口模块，比如图中的入口模块 A 和 B 组成一个 chunk。</li>
<li>EntryPoint 是 ChunkGroup 的一种，entry 对象中每一项对应一个 entryPoint，比如 home 和 entry 分别有对应的 entryPoint。</li>
<li>一个 chunkGroup 至少包含一个 chunk，chunkGroup 之间可以成父子关系。</li>
<li>每使用一次动态导入 <code v-pre>import()</code> 函数，就会创建一个 chunkGroup。</li>
</ul>
<p>所有的这些组成了 chunkGraph。来看下内存中 chunkGraph 的相关数据结构。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token literal-property property">compilation</span><span class="token operator">:</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">chunkGraph</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">_blockChunkGroups</span><span class="token operator">:</span> WeakMap<span class="token punctuation">{</span><span class="token parameter">AsyncDependenciesBlock</span> <span class="token operator">=></span> ChunkGroup<span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">_chunks</span><span class="token operator">:</span> WeakMap<span class="token punctuation">{</span><span class="token parameter">Chunk</span> <span class="token operator">=></span> ChunkGraphChunk<span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">_modules</span><span class="token operator">:</span> WeakMap<span class="token punctuation">{</span><span class="token parameter">NormalModule</span> <span class="token operator">=></span> ChunkGraphModule<span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">moduleGraph</span><span class="token operator">:</span> ModuleGraph
  <span class="token punctuation">}</span>
  <span class="token literal-property property">chunkGroups</span><span class="token operator">:</span> <span class="token punctuation">[</span>Entrypoint<span class="token punctuation">,</span> Entrypoint<span class="token punctuation">,</span> ChunkGroup<span class="token punctuation">,</span> ChunkGroup<span class="token punctuation">]</span>
  <span class="token literal-property property">chunks</span><span class="token operator">:</span> Set<span class="token punctuation">{</span>Chunk<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>其实 ChunkGraph 和 ModuleGraph 是很类似的。</p>
<p>ChunkGraph 的节点称为 ChunkGraphChunk，它是装饰过的 Chunk，包含一些属性包括构成 chunk 的模块、chunk 的入口模块等。在 chunkGraph 中，可以看到从 Chunk 到 ChunkGraphChunk 的映射关系。</p>
<img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/image-20230614153831398.png" alt="image-20230614153831398" style="zoom:60%;" />
<p>除此之外，chunkGraph 和 moduleGraph 一样，原型上挂载了非常多工具函数，用于分析整个 graph。</p>
<p>当然，它们也是有区别的。</p>
<p>与 ModuleGraph 相比，ChunkGraph 并不包含关于 Chunk 之间的连接信息，而是把所有必要的信息都保存在 chunk 本身，比如它所属的 ChunkGroups。</p>
<p>ChunkGroup 之间可以是父子关系，而 Module 之间是相互依赖，但没有严格的父模块的概念。</p>
<h2 id="create-chunkgraph" tabindex="-1"><a class="header-anchor" href="#create-chunkgraph"><span>create chunkGraph</span></a></h2>
<p>ChunkGraph 是以递归的方式建立的。</p>
<p>它首先将所有的 entry module 添加到队列中，当一个 entry module 被处理时，意味着其依赖模块将被检查，每个依赖模块也将被添加到队列中。这样一直重复下去，直到队列变空。这个过程的这一部分是模块被访问的地方。然而，这只是第一部分。</p>
<h2 id="build-chunkgraph" tabindex="-1"><a class="header-anchor" href="#build-chunkgraph"><span>build chunkGraph</span></a></h2>
<p><img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/buildChunkGraph.svg" alt=""></p>
<h2 id="codegeneration" tabindex="-1"><a class="header-anchor" href="#codegeneration"><span>codeGeneration</span></a></h2>
<p>产生的文件并不是简单的原始文件的复制粘贴版本，因为为了实现其功能，webpack需要添加一些自定义代码，使一切都按预期工作。</p>
<p>总而言之，一个模块会有它的运行时间要求，这取决于该模块在其源代码中使用的东西。一个块的运行时间要求将是属于该块的所有模块的所有运行时间要求的集合。现在，webpack知道了一个块的所有需求，它将能够正确地生成运行时代码。</p>
<p>这也被称为渲染过程，我们将在一篇专门的文章中详细讨论它。现在，我们只需了解渲染过程在很大程度上依赖于ChunkGraph，因为它包含Chunk组（即ChunkGroup，EntryPoint），这些组包含Chunks，这些Chunks包含模块，这些模块以一种细化的方式包含关于webpack将要生成的运行时代码的信息和提示。</p>
<h2 id="create-module-assets" tabindex="-1"><a class="header-anchor" href="#create-module-assets"><span>create module assets</span></a></h2>
</div></template>


