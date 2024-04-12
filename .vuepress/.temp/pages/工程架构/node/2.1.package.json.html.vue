<template><div><h1 id="package-json-的若干字段" tabindex="-1"><a class="header-anchor" href="#package-json-的若干字段"><span>package.json 的若干字段</span></a></h1>
<h2 id="导入导出和执行" tabindex="-1"><a class="header-anchor" href="#导入导出和执行"><span>导入导出和执行</span></a></h2>
<h3 id="module、main、browser" tabindex="-1"><a class="header-anchor" href="#module、main、browser"><span>module、main、browser</span></a></h3>
<p>module：用 esm 导入包时引入的文件。</p>
<div class="language-json" data-ext="json" data-title="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"module"</span><span class="token operator">:</span> <span class="token string">"./dist/vue.esm.js"</span>
<span class="token punctuation">}</span>
</code></pre></div><div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> Vue <span class="token keyword">from</span> <span class="token string">'vue'</span>
<span class="token comment">// 编译后，实际导入</span>
<span class="token keyword">import</span> Vue <span class="token keyword">from</span> <span class="token string">'node_modules/vue/dist/vue.esm.js'</span>
</code></pre></div><p>main：用 commonjs 导入包时引入的文件</p>
<div class="language-json" data-ext="json" data-title="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"main"</span><span class="token operator">:</span> <span class="token string">"dist/vue.cjs.js"</span>
<span class="token punctuation">}</span>
</code></pre></div><div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> vue <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'vue'</span><span class="token punctuation">)</span>
<span class="token comment">// 相当于</span>
<span class="token keyword">const</span> vue <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'node_modules/vue/dist/vue.cjs.js'</span><span class="token punctuation">)</span>
</code></pre></div><p>browser：当 browser 为字符串时，它会替换 main 作为浏览器环境下的包入口文件。</p>
<h3 id="exports" tabindex="-1"><a class="header-anchor" href="#exports"><span>exports</span></a></h3>
<p>exports 可以更精确地控制模块的导出方式。</p>
<p>最简单的 exports 形式如下：</p>
<div class="language-json" data-ext="json" data-title="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"my-package"</span><span class="token punctuation">,</span>
  <span class="token property">"exports"</span><span class="token operator">:</span> <span class="token string">"./lib/index.js"</span>
<span class="token punctuation">}</span>
</code></pre></div><p>这等价于：</p>
<div class="language-json" data-ext="json" data-title="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"exports"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"."</span><span class="token operator">:</span> <span class="token string">"./lib/index.js"</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><h4 id="根据路径" tabindex="-1"><a class="header-anchor" href="#根据路径"><span>根据路径</span></a></h4>
<div class="language-json" data-ext="json" data-title="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"my-package"</span><span class="token punctuation">,</span>
  <span class="token property">"exports"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"."</span><span class="token operator">:</span> <span class="token string">"./lib/index.js"</span><span class="token punctuation">,</span>
    <span class="token property">"./sub"</span><span class="token operator">:</span> <span class="token string">"./lib/sub.js"</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>导入 sub 模块。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> sub <span class="token keyword">from</span> <span class="token string">'my-package/sub'</span>
</code></pre></div><h4 id="根据导入方式" tabindex="-1"><a class="header-anchor" href="#根据导入方式"><span>根据导入方式</span></a></h4>
<div class="language-json" data-ext="json" data-title="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"exports"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"import"</span><span class="token operator">:</span> <span class="token string">"./module.ejs"</span><span class="token punctuation">,</span> <span class="token comment">// esm 导入</span>
    <span class="token property">"require"</span><span class="token operator">:</span> <span class="token string">"./module.cjs"</span> <span class="token comment">// commonjs d导入</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre></div><p>以上写法等价于：</p>
<div class="language-json" data-ext="json" data-title="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"exports"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"import"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">"."</span><span class="token operator">:</span>  <span class="token string">"./module.ejs"</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">"require"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">"."</span><span class="token operator">:</span> <span class="token string">"./module.cjs"</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre></div><p>以上写法相当与 package.json 的 main 和 module 字段。</p>
<p>以下写法也是可以的：</p>
<div class="language-json" data-ext="json" data-title="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"exports"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"."</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">"import"</span><span class="token operator">:</span> <span class="token string">"./module.ejs"</span><span class="token punctuation">,</span>
      <span class="token property">"require"</span><span class="token operator">:</span> <span class="token string">"./module.mjs"</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">"./sub"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">"import"</span><span class="token operator">:</span> <span class="token string">"./sub-module.ejs"</span><span class="token punctuation">,</span>
      <span class="token property">"require"</span><span class="token operator">:</span> <span class="token string">"./sub-module.cjs"</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><h4 id="export-keys" tabindex="-1"><a class="header-anchor" href="#export-keys"><span>export keys</span></a></h4>
<p>常见的 export keys 包含以下几种：</p>
<ul>
<li>import：esm 导入时匹配</li>
<li>require：commonjs 导入时匹配</li>
<li>node：node 环境下适用</li>
<li>default：默认导入值</li>
</ul>
<p>exports keys 还支持许多社区中的关键字条件。</p>
<ul>
<li>types：指定 typescipt 类型定义文件</li>
<li>browser：Web 浏览器环境适用</li>
<li>development：定义开发环境入口点，例如提供额外的调试上下文</li>
<li>production：定义生产环境入口点，与 development 互斥</li>
</ul>
<h4 id="综合例子" tabindex="-1"><a class="header-anchor" href="#综合例子"><span>综合例子</span></a></h4>
<div class="language-json" data-ext="json" data-title="json"><pre v-pre class="language-json"><code><span class="token property">"exports"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
  <span class="token property">"."</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"import"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">"types"</span><span class="token operator">:</span> <span class="token string">"./dist/vue.d.mts"</span><span class="token punctuation">,</span>
      <span class="token property">"node"</span><span class="token operator">:</span> <span class="token string">"./index.mjs"</span><span class="token punctuation">,</span>
      <span class="token property">"default"</span><span class="token operator">:</span> <span class="token string">"./dist/vue.runtime.esm-bundler.js"</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">"require"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">"types"</span><span class="token operator">:</span> <span class="token string">"./dist/vue.d.ts"</span><span class="token punctuation">,</span>
      <span class="token property">"default"</span><span class="token operator">:</span> <span class="token string">"./index.js"</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">"./server-renderer"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"import"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">"types"</span><span class="token operator">:</span> <span class="token string">"./server-renderer/index.d.mts"</span><span class="token punctuation">,</span>
      <span class="token property">"default"</span><span class="token operator">:</span> <span class="token string">"./server-renderer/index.mjs"</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">"require"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">"types"</span><span class="token operator">:</span> <span class="token string">"./server-renderer/index.d.ts"</span><span class="token punctuation">,</span>
      <span class="token property">"default"</span><span class="token operator">:</span> <span class="token string">"./server-renderer/index.js"</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="bin" tabindex="-1"><a class="header-anchor" href="#bin"><span>bin</span></a></h3>
<p>在命令行中执行命令时，相当与执行 bin 字段指定的文件。</p>
<div class="language-json" data-ext="json" data-title="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"bin"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"webpack"</span><span class="token operator">:</span> <span class="token string">"./cli.js"</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>执行 <code v-pre>npm link</code> 命令后，当前 npm 包会被链接到 npm 全局环境，webpack 就可以作为一个命令在命令行中执行，实际上就是执行 cli.js 文件。</p>
<h2 id="发布包相关" tabindex="-1"><a class="header-anchor" href="#发布包相关"><span>发布包相关</span></a></h2>
<h3 id="publishconfig" tabindex="-1"><a class="header-anchor" href="#publishconfig"><span>publishConfig</span></a></h3>
<p>配置 publish 包时的相关信息。</p>
<div class="language-json" data-ext="json" data-title="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"publishConfig"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"tag"</span><span class="token operator">:</span> <span class="token string">"1.0.0"</span><span class="token punctuation">,</span>
    <span class="token property">"registry"</span><span class="token operator">:</span> <span class="token string">"https://easyest.npmjs.org/"</span><span class="token punctuation">,</span>
    <span class="token property">"access"</span><span class="token operator">:</span> <span class="token string">"public"</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="files" tabindex="-1"><a class="header-anchor" href="#files"><span>files</span></a></h3>
<p>将 private 设置为 true 可以防止将其发布到 npm 上。</p>
<h3 id="private" tabindex="-1"><a class="header-anchor" href="#private"><span>private</span></a></h3>
<h2 id="其他" tabindex="-1"><a class="header-anchor" href="#其他"><span>其他</span></a></h2>
<h3 id="workspaces" tabindex="-1"><a class="header-anchor" href="#workspaces"><span>workspaces</span></a></h3>
<div class="language-json" data-ext="json" data-title="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"workspaces"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"packages/*"</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre></div><p>以上配置设定 packages 下的所有文件夹都是一个 npm 包。</p>
<h3 id="sideeffects" tabindex="-1"><a class="header-anchor" href="#sideeffects"><span>sideEffects</span></a></h3>
<p>告知打包工具，模块中哪些文件是无&quot;副作用&quot;的，从而可以安全地进行 tree shaking。</p>
<div class="language-json" data-ext="json" data-title="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"sideEffects"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"*.css"</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="types" tabindex="-1"><a class="header-anchor" href="#types"><span>types</span></a></h3>
<p>指定 npm 包的类型声明文件。</p>
<div class="language-json" data-ext="json" data-title="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"types"</span><span class="token operator">:</span> <span class="token string">"dist/vue.d.ts"</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考"><span>参考</span></a></h2>
<p><a href="https://docs.npmjs.com/cli/v10/configuring-npm/package-json" target="_blank" rel="noopener noreferrer">package.json - npmjs.com<ExternalLinkIcon/></a></p>
<p><a href="https://juejin.cn/post/7231457691679309861#heading-2" target="_blank" rel="noopener noreferrer">如何发布一个现代化的NPM包<ExternalLinkIcon/></a></p>
<p><a href="https://juejin.cn/post/7277786940161982505" target="_blank" rel="noopener noreferrer">关于 package.json 你了解多少?<ExternalLinkIcon/></a></p>
</div></template>


