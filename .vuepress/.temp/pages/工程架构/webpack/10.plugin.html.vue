<template><div><h1 id="plugin" tabindex="-1"><a class="header-anchor" href="#plugin"><span>plugin</span></a></h1>
<p>loader 专注于实现模块资源加载，而 plugin 则是用来解决除了资源加载以外的自动化工作。</p>
<p>常用的插件：</p>
<ul>
<li>clean-webpack-plugin：打包生成文件前，清除上一次打包结果</li>
<li>html-webpack-plugin：自动生成导入 bundle 的 html 文件</li>
<li>copy-webpack-plugin：将不需要参与构建的静态文件加入 dist 目录，比如 favicon.ico</li>
<li>define-plugin：webpack 自带的插件，向代码中注入常量，比如 <code v-pre>process.env.NODE_ENV</code></li>
</ul>
<h3 id="编写一个-plugin" tabindex="-1"><a class="header-anchor" href="#编写一个-plugin"><span>编写一个 plugin</span></a></h3>
<p>plugin 是通过钩子机制实现的。其本质是一个函数或一个包含 apply 方法的对象。</p>
<p>我们通常以类的形式编写 plugin，下面来编写一个去除 bundle 中无效注释的插件 DelComment。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">DelComment</span> <span class="token punctuation">{</span>
  <span class="token function">apply</span><span class="token punctuation">(</span><span class="token parameter">compiler</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    compiler<span class="token punctuation">.</span>hooks<span class="token punctuation">.</span>emit<span class="token punctuation">.</span><span class="token function">tap</span><span class="token punctuation">(</span><span class="token string">'delComment'</span><span class="token punctuation">,</span> <span class="token parameter">compilation</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> name <span class="token keyword">in</span> compilation<span class="token punctuation">.</span>assets<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>name<span class="token punctuation">.</span><span class="token function">endsWith</span><span class="token punctuation">(</span><span class="token string">'.js'</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">const</span> content <span class="token operator">=</span> compilation<span class="token punctuation">.</span>assets<span class="token punctuation">[</span>name<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">source</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
          <span class="token keyword">const</span> withOutComment <span class="token operator">=</span> content<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\/\*+\*\/</span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">,</span> <span class="token string">''</span><span class="token punctuation">)</span>

          compilation<span class="token punctuation">.</span>assets<span class="token punctuation">[</span>name<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
            <span class="token function-variable function">source</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> withOutComment<span class="token punctuation">,</span>
            <span class="token function-variable function">size</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> withOutComment<span class="token punctuation">.</span>length
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>可以看到，apply 函数接收 webpack 编译过程中的上下文 compiler，我们在 webpack 的 <code v-pre>emit hook</code> 中添加了一个函数，针对 js 文件，将其注释代码去除后重新写回即可。</p>
<p>编写完插件后，在 webpack.config.js 中创建一个插件实例。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token keyword">new</span> <span class="token class-name">DelComment</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre></div><p>总的来说，插件就是在生命周期钩子中挂载函数，plugin 的细节内容参考<a href="https://webpack.docschina.org/contribute/writing-a-plugin" target="_blank" rel="noopener noreferrer">文档<ExternalLinkIcon/></a>。</p>
</div></template>


